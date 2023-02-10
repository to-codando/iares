import {
  GenericObjectType,
  factoryType,
  ComponentFactoryType,
  CallbackRenderType,
  HTMType,
  ChildrenNodeType,
  TemplateElementType
} from './types'

import { ICreateComponentParams, IComponent } from './interfaces'

const _createSelector = (value: string): string => {
  const regex = /(?=[A-Z])/
  return value.split(regex).join('-').toLocaleLowerCase()
}

const _createElement = (selector: string): HTMLElement => {
  return document.createElement(selector)
}

const _getComponentSelector = (factoryName: string): string => {
  const selectorValue = _createSelector(factoryName)
  return `[data-component="${selectorValue}"]`
}

const _getComponentElementRefs = (selector: string, context: Element): Array<Element> => {
  const componentElementRefs = context.querySelectorAll(selector)
  return Array.from(componentElementRefs)
}

const _setPropsElement = (element: Element, props: GenericObjectType | null): void => {
  if(!props) return
  const isEvent =  /^on/

  for( let key in props) {

    if(!isEvent.test(key)) element.setAttribute(key, props[key])

    if (isEvent.test(key)) {
      const eventName = key.replace(/on/, '').toLocaleLowerCase()
      element.addEventListener(eventName, props[key])
    }
  }
}

const _setChildrenElement = (element: Element, children: ChildrenNodeType ): void => {
  children.forEach( child => {
    if (typeof child === 'string') {
      element.textContent = child
      return
    }

    const childElement = _createTemplateByObject(child)
    childElement && element.insertAdjacentElement('beforeend', childElement)
  })
}

const _createTemplateByObject = (schema: HTMType): TemplateElementType => {
  return _createTemplateByArray([schema])
}

const _createTemplateByArray = (schema: GenericObjectType): TemplateElementType => {
  let templateElement: TemplateElementType = null

  schema.forEach(( elementMap: HTMType): void => {
    const element = _createElement(elementMap.type)
    _setPropsElement(element, elementMap.props)
    _setChildrenElement(element, elementMap.children)
    templateElement = element
  })

  return templateElement
}

const _createTemplateElement = (schema: HTMType ): TemplateElementType => {
  return Array.isArray(schema) ? _createTemplateByArray(schema) : _createTemplateByObject(schema)
}

const _createComponent = (factory: ComponentFactoryType, params: ICreateComponentParams): IComponent => {
  const componentSchema = factory()

  const mount = () => {
    const componentElement = params.element
    const state = componentSchema?.state?.getState() || {}
    const templateSchema = componentSchema.template({ state  })

    const templateElement = _createTemplateElement(templateSchema)
    templateElement && componentElement.insertAdjacentElement('beforeend', templateElement)
  }

  const unmount = () => {}
  const setup = () => {}

  return {
    ...componentSchema,
    element: params.element,
    selector: params.selector,
    mount,
    unmount,
    setup
  }
}

export const render = (factory: factoryType, context: Element, callback?: CallbackRenderType) => {
  const componentSelector = _getComponentSelector(factory.name)
  const componentElementRefs = _getComponentElementRefs(componentSelector, context)

  componentElementRefs.forEach(componentElement => {

    const component = _createComponent(factory, {
      selector: componentSelector,
      element: componentElement
    })

    component.mount()
    callback && callback(component.element)
  })
}