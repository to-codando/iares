export type ContextElement = HTMLElement;

export type ContextHandler = () => ContextElement;

export type CallbackHandler = (context: ContextElement) => ContextElement;

export type Application = {
  setup: (callback: ContextHandler) => ContextElement;
  mount: (callback: CallbackHandler) => ContextElement;
  unmount: (callback: CallbackHandler) => ContextElement;
};
