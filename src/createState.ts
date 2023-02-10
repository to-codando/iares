import { GenericObjectType, watcherStateType, StateType } from './types'

export const createState = (payload: GenericObjectType = {}): StateType => {
  const data: GenericObjectType = payload
  const watchers: Array<(data: GenericObjectType) => void> = []

  const setState = (payload: GenericObjectType): void => {
    const newValue = JSON.stringify(payload)
    const state = Object.assign(data, JSON.parse(newValue))
    watchers.forEach(watcher => watcher(state))
  }

  const getState = (): GenericObjectType => {
    const state = JSON.stringify(data)
    return JSON.parse(state)
  }

  const watchState = (handler: watcherStateType): watcherStateType => {
    const watcher = (payload: GenericObjectType) => handler(payload)
    watchers.push(watcher)
    return watcher
  }

  return { setState, getState, watchState }
}
