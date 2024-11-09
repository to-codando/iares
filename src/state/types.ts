export type TEmpty = null | undefined

export type TGenericObject<T> = {
  [key: symbol]: T
}

export type TStateValue<T> = TGenericObject<T>

export type TStateFilter<S, R> = (state: S) => R

export type TStateHandler<A> = <T extends A>(payload: T) => void

export type TStateHandlerRemove = () => boolean

export type TState<S> = {
  get: <R = S>(filter?: TStateFilter<S, R>) => R
  set: (payload: S) => void
  watch: (handler: TStateHandler<S>) => TStateHandlerRemove
}
