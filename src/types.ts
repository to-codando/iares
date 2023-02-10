export type GenericObjectType = { [key: string]: any }
export type CallbackType = (payload: GenericObjectType) => void
export type watcherStateType = (payload: GenericObjectType) => any