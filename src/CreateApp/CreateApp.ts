import type {
  Application,
  ContextElement,
  ContextHandler,
  CallbackHandler,
} from "./types";

export const CreateApp = (): Application => {
  let _element!: ContextElement;

  const setup = (callback: ContextHandler) => {
    _element = callback();
    return callback();
  };

  const mount = (callback: CallbackHandler) => {
    return callback(_element);
  };

  const unmount = (callback: CallbackHandler) => {
    return callback(_element);
  };

  return { setup, mount, unmount };
};
