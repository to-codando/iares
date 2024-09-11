import type { HTMType } from './types'
import { html } from './html'
import { render } from '../render'
import markdownIt from 'markdown-it'

type TTemplate = HTMType | HTMType[]

type TTemplateParams = {
  templateString: TemplateStringsArray
  values: unknown[]
}

type TAdapterParams = {
  index: number
  adapters: TAdapter[]
  partial: TTemplate
}

type TCallback = (params: TAdapterParams) => HTMType | HTMType[]
type TAdapter = (params: TTemplateParams) => TCallback

type TCustomObject = {
  [key: string | symbol]: unknown
}

type TComponentTemplateParams = {
  state?: TCustomObject
  props?: TCustomObject
  actions?: TCustomObject
}

type TComponent = {
  template: (params: TComponentTemplateParams) => HTMType | HTMType[]
}

type TComponentFactory = () => TComponent & { name: string }

type TComponentRegister = Map<string, TComponentFactory>

type TComponentData = { name: string; id: string }

const createComponentManger = () => {
  const components: TComponentRegister = new Map()

  const add = (id: string, factory: TComponentFactory) => {
    components.set(id, factory)
  }

  const get = (id: string) => components.get(id)

  const remove = (id: string) => components.delete(id)

  return { add, get, remove }
}

const componentManger = createComponentManger()

const _createUUID = (): string => {
  return Math.random().toString(36).substring(2, 8)
}

const _extractComponentData = (input: string): TComponentData[] => {
  const regex = /\{\{([a-zA-Z0-9]+)-([a-z0-9]+)\}\}/g

  const matches = input.matchAll(regex)
  const data: TComponentData[] = []

  for (const match of matches) {
    const [, name, id] = match
    data.push({ name, id })
  }

  return data
}

function _getElementsByPattern(regex: RegExp): HTMLElement[] {
  const elementsWithPattern: HTMLElement[] = []

  const bodyElement = document.querySelector('body')

  if (!bodyElement) return elementsWithPattern

  function searchNodes(node: Node): void {
    if (
      node.nodeType === Node.TEXT_NODE &&
      node.textContent &&
      regex.test(node.textContent)
    ) {
      const parentElement = node.parentElement
      if (parentElement) {
        elementsWithPattern.push(parentElement)
      }
    }

    node.childNodes.forEach(searchNodes)
  }

  bodyElement.childNodes.forEach(searchNodes)

  return Array.from(elementsWithPattern)
}

const _Map = (params: TTemplateParams, ...adapters: TAdapter[]): TTemplate => {
  let partial!: TTemplate

  const template = adapters.map((adapter, index) => {
    const callback = adapter(params)
    partial = callback({ index, adapters, partial })
    return partial
  })

  return html`${template.pop()}`
}

const _getPlaceholder = (factory: TComponentFactory, uuid: string) =>
  `{{${factory.name}-${uuid}}}`

const _factoryToString = (templateParams: TTemplateParams): TCallback => {
  const { templateString, values } = templateParams

  const regex = /~~~/g
  return () => {
    const newTemplate = templateString.map((strings, index) => {
      const uuid = _createUUID()
      const hasCodeBlock = regex.test(strings)
      const factory = values[index] as TComponentFactory
      const hasFactory =
        factory && typeof factory === 'function' && 'name' in factory

      if (!hasCodeBlock) {
        if (!hasFactory) return `${strings}${values[index] || ''}`
        componentManger.add(uuid, factory)
        return `${strings}${_getPlaceholder(factory, uuid)}`
      }

      const value =
        values[index] && typeof values[index] === 'function'
          ? factory.name
          : values[index] || ''

      return `${strings}${value}`
    })
    return html`${newTemplate.join('')}`
  }
}

const _markdownToHTML = (): TCallback => {
  const markdown = markdownIt()
  return ({ partial }) => {
    const newTemplate = markdown.render(partial as unknown as string)
    return html`${newTemplate}`
  }
}

const _mdxRender = (): TCallback => {
  return ({ partial }) => {
    setTimeout(() => {
      const placeholders = _extractComponentData(partial as unknown as string)
      if (!placeholders.length) return

      for (const placeholder of placeholders) {
        const { id } = placeholder
        const component = componentManger.get(id)
        if (component) {
          const contextElement = document.createElement('div')
          const regex = /\{\{([a-zA-Z0-9]+)-([a-z0-9]+)\}\}/g
          const targetElements = _getElementsByPattern(regex)

          for (const target of targetElements) {
            const regexId = new RegExp(id)
            const textContent = target?.textContent || ''
            if (!regexId.test(textContent)) return
            render(html`<${component}/>`, contextElement)
            target.replaceWith(contextElement)
          }
        }
      }
    }, 100)
    return html`${partial}`
  }
}

export const mdx = (
  templateString: TemplateStringsArray,
  ...values: unknown[]
): HTMType | HTMType[] => {
  const params = { templateString, values }
  const template = _Map(params, _factoryToString, _markdownToHTML, _mdxRender)
  return html`${template}`
}
