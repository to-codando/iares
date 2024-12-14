import type { StateWatcher, State, StateManager } from "./types";

const _createUUID = (): string => Math.random().toString(36).substring(2, 11);

export const createState = <S = unknown>(
  initialState: State<S>,
): StateManager<S> => {
  const _state = JSON.parse(JSON.stringify(initialState));
  const _watchers = new Set<StateWatcher<S>>();

  const _notifyHandlers = (payload: State<S>) => {
    for (const stateWatcher of _watchers) {
      stateWatcher(payload);
    }
  };

  const set = (payload: State<S>) => {
    Object.assign(_state, JSON.parse(JSON.stringify(payload)));
    _notifyHandlers(JSON.parse(JSON.stringify(_state)));
  };

  const get = (): State<S> => {
    return JSON.parse(JSON.stringify(_state));
  };

  const watch = (callback: StateWatcher<S>) => {
    _watchers.add(callback);
  };

  return { set, get, watch };
};
