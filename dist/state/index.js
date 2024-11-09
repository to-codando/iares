export const createState = (value) => {
    const _state = value;
    const _handlers = new Set();
    const _notifyHandlers = (value) => {
        for (const handler of _handlers) {
            handler(value);
        }
    };
    const set = (payload) => {
        const payloadCopy = JSON.parse(JSON.stringify(payload));
        const stateCopy = JSON.parse(JSON.stringify(_state));
        const newState = { ...stateCopy, ...payloadCopy };
        Object.assign(_state, newState);
        _notifyHandlers(newState);
    };
    const get = (filter) => {
        const state = JSON.parse(JSON.stringify(_state));
        if (filter)
            return filter(state);
        return state;
    };
    const watch = (handler) => {
        _handlers.add(handler);
        return () => _handlers.delete(handler);
    };
    return { get, set, watch };
};
//# sourceMappingURL=index.js.map