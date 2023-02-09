import { IApp, IConfigApp } from './interfaces'
import { GenericObject } from './types'

export const createApp = ({ onMount }: IConfigApp): IApp => {
  const bodyElement = document.body
  const customParams: GenericObject = {}

  const mount = (context: HTMLElement): void => {
    onMount(bodyElement || context, customParams)
  }

  const unmount = (): void => {
    bodyElement.innerHTML = ""
  }

  const setup = (params: GenericObject): void => {
    Object.assign(customParams, params)
  }

  return { mount, unmount, setup }
}