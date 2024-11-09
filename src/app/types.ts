export type GenericObject<T = unknown> = {
  [key: symbol]: T
}

export type AppSetupParamsType = GenericObject & {
  context?: HTMLElement
  props?: GenericObject
}

export type AppPropsType = AppSetupParamsType & {}

export type AppParamsType = {
  onMount: (context: HTMLElement, params?: AppPropsType) => void
}

export type AppType = {
  mount: () => void
  unmount: () => void
  setup: (params: AppSetupParamsType) => void
}
