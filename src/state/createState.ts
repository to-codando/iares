import type { StateHandler, State, StateManager } from "./types";

const _createUUID = (): string => Math.random().toString(36).substring(2, 11);

export const createState = <S>(initialState: State<S>): StateManager<S> => {
  const _state = JSON.parse(JSON.stringify(initialState));
  const _handlers = new Set<StateHandler>();
  const _id: Readonly<string> = _createUUID();

  const _notifyHandlers = (payload: State<S>) => {
    for (const stateHandler of _handlers) {
      stateHandler<S>(payload);
    }
  };

  const set = (payload: State<S>) => {
    Object.assign(_state, JSON.parse(JSON.stringify(payload)));
    _notifyHandlers(JSON.parse(JSON.stringify(_state)));
  };

  const get = (): State<S> => {
    return JSON.parse(JSON.stringify(_state));
  };

  const watch = (callback: StateHandler) => {
    _handlers.add(callback);
  };

  return { set, get, watch };
};
