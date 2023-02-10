import { GenericObjectType } from './types'

type factoryTye = () => GenericObjectType

export const render = (
    factory: factoryTye,
    context: HTMLElement,
    options: GenericObjectType
  ) => {
  console.log(factory.name)
}