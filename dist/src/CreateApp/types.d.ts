export type ContextElement = Element;
export type ContextHandler = () => ContextElement;
export type CallbackHandler = (context: ContextElement) => ContextElement;
export type Application = {
    setup: (callback: ContextHandler) => ContextElement;
    mount: (callback: CallbackHandler) => ContextElement;
    unmount: (callback: CallbackHandler) => ContextElement;
};
//# sourceMappingURL=types.d.ts.map