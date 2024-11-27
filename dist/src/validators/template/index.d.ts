declare const isObject: <T>(payload: T) => () => boolean;
declare const isArray: <T>(payload: T) => () => boolean;
declare const isFunction: <T = void>(payload: T) => () => boolean;
declare const isString: <T = void>(payload: T) => () => boolean;
declare const isEventName: <T = void>(payload: T) => () => boolean;
export { isObject, isArray, isFunction, isString, isEventName };
//# sourceMappingURL=index.d.ts.map