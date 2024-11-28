export type CustomObject<T> = { [key: string | symbol]: T };
export type GenericObject<T = unknown> = object & T;
export type State<T = unknown> = object & T;

export type StateHandler = <T = unknown>(payload: State<T>) => void;

export type StateManager<T = unknown> = object & {
  set: (payload: State<T>) => void;
  get: () => State<T>;
  watch: (callback: StateHandler) => void;
};

export type StateCreator = <T>(payload: State<T>) => StateManager<T>;
