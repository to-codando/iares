import {
  EventBusType,
  GenericCallbackType,
  GenericObjectType,
  PubsubHandlerType,
  PubsubListenerType,
} from "./types";

export const createEventBus = (): EventBusType => {
  let listeners: PubsubListenerType = {};

  const emit = (eventName: string, payload: GenericObjectType) => {
    const handlers = listeners[eventName];
    handlers.forEach((handler) => {
      handler.callback({ payload });
    });
  };

  const on = ({ eventName, callback }: PubsubHandlerType): PubsubHandlerType => {
    if (!listeners[eventName]) {
      listeners[eventName] = [];
      listeners[eventName].push({ eventName, callback });
    }
    listeners[eventName].push({ eventName, callback });

    return { eventName, callback };
  };

  const off = (removeHandler: PubsubHandlerType) => {
    const { eventName, callback: callbackTarget } = removeHandler;
    const handlers = listeners[eventName];
    listeners[eventName] = handlers.filter(({ callback }) => callback !== callbackTarget);
  };

  return { emit, on, off };
};
