

export type GenericObjectType = { [key: string]: any }
export type CallbackRenderType = (context: Element) => void
export type watcherStateType = (payload: GenericObjectType) => any

export type StateType = {
  setState: (payload: GenericObjectType) => void
  getState: () => GenericObjectType
  watchState: (handler: watcherStateType) => watcherStateType
}

export type HTMType = {
  type: string
  props: GenericObjectType | null
  children: Array<string> | Array<HTMType>
}

export type GenericComponentType = {
  template: (params: GenericObjectType) => HTMType
  actions?: (params: GenericObjectType) => GenericObjectType
  styles?: (params: GenericObjectType) => string
  hooks?: (params: any) => void
  state?: StateType
}

export type factoryType = () => GenericComponentType

type ComponentType =  GenericComponentType & {
  setup: (params: any) => void
  mount: () => void
  unmount: () => void
}

export type ComponentFactoryType = (params?: GenericObjectType) => GenericComponentType

export type ChildrenNodeType =  Array<string> | Array<HTMType>

export type TemplateElementType = Element | null