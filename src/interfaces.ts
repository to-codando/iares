import { GenericObject } from './types'

export interface IConfigApp {
  onMount: (context: HTMLElement, params?: GenericObject) => void
}

export interface IApp {
  setup: (params: any) => void,
  mount: (context: HTMLElement) => void,
  unmount: (context: HTMLElement) => void,
}