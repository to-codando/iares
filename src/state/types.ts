export type CustomObject<T> = { [key: string | symbol]: T };
export type GenericObject<T = unknown> = object & T;
export type State<T = unknown> = object & T;

export type StateWatcherParams<T> = {
  payload: GenericObject<T>;
};

export type StateWatcher<T> = (params: T) => void;

export type StateManager<T = unknown> = {
  set: (value: State<T>) => void;
  get: () => State<T>;
  watch: (callback: StateWatcher<T>) => void;
};

export type StateCreator = <T>(payload: State<T>) => StateManager<T>;
