export var createEventBus = function () {
    var listeners = {};
    var emit = function (eventName, payload) {
        var handlers = listeners[eventName];
        handlers.forEach(function (handler) {
            handler.callback({ payload: payload });
        });
    };
    var on = function (_a) {
        var eventName = _a.eventName, callback = _a.callback;
        if (!listeners[eventName]) {
            listeners[eventName] = [];
            listeners[eventName].push({ eventName: eventName, callback: callback });
        }
        listeners[eventName].push({ eventName: eventName, callback: callback });
        return { eventName: eventName, callback: callback };
    };
    var off = function (removeHandler) {
        var eventName = removeHandler.eventName, callbackTarget = removeHandler.callback;
        var handlers = listeners[eventName];
        listeners[eventName] = handlers.filter(function (_a) {
            var callback = _a.callback;
            return callback !== callbackTarget;
        });
    };
    return { emit: emit, on: on, off: off };
};
//# sourceMappingURL=eventBus.js.map