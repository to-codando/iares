import type {
  TState,
  TStateFilter,
  TStateHandler,
  TStateHandlerRemove,
} from './types'
type PrimitiveObject = {
  [key: symbol]: string | number | boolean | object | null | undefined | unknown
}
export const createState = <S extends PrimitiveObject>(value: S): TState<S> => {
  const _state: S = value
  const _handlers = new Set<TStateHandler<S>>()

  const _notifyHandlers = (value: S): void => {
    for (const handler of _handlers) {
      handler<S>(value)
    }
  }

  const set = (payload: S): void => {
    const payloadCopy = JSON.parse(JSON.stringify(payload))
    const stateCopy = JSON.parse(JSON.stringify(_state))
    const newState = { ...stateCopy, ...payloadCopy }
    Object.assign(_state, newState)
    _notifyHandlers(newState)
  }

  const get = <R = S>(filter?: TStateFilter<S, R>): R => {
    const state = JSON.parse(JSON.stringify(_state))
    if (filter) return filter(state) as unknown as R
    return state as unknown as R
  }

  const watch = (handler: TStateHandler<S>): TStateHandlerRemove => {
    _handlers.add(handler)
    return () => _handlers.delete(handler)
  }

  return { get, set, watch }
}
