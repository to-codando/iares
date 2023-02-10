import { IApp, IConfigApp } from './interfaces'
import { GenericObjectType } from './types'

export const createApp = ({ onMount }: IConfigApp): IApp => {
  const bodyElement = document.body
  const customParams: GenericObjectType = {}

  const mount = (context: HTMLElement): void => {
    onMount(bodyElement || context, customParams)
  }

  const unmount = (): void => {
    bodyElement.innerHTML = ""
  }

  const setup = (params: GenericObjectType): void => {
    Object.assign(customParams, params)
  }

  return { mount, unmount, setup }
}