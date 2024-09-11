export const createState = (value) => {
    const state = value;
    const handlers = new Set();
    const _notifyHandlers = (value) => {
        handlers.forEach((handler) => handler(value));
    };
    const setState = (payload) => {
        const payloadCopy = JSON.parse(JSON.stringify(payload));
        const stateCopy = JSON.parse(JSON.stringify(state));
        const newState = { ...stateCopy, ...payloadCopy };
        Object.assign(state, newState);
        _notifyHandlers(newState);
    };
    const watchState = (handler) => {
        handlers.add(handler);
        return () => handlers.delete(handler);
    };
    return { state, setState, watchState };
};
//# sourceMappingURL=index.js.map