export var createState = function (payload) {
    if (payload === void 0) { payload = {}; }
    var data = payload;
    var watchers = [];
    var setState = function (payload) {
        var newValue = JSON.stringify(payload);
        var state = Object.assign(data, JSON.parse(newValue));
        watchers.forEach(function (watcher) { return watcher(state); });
    };
    var getState = function () {
        var state = JSON.stringify(data);
        return JSON.parse(state);
    };
    var watchState = function (handler) {
        var watcher = function (payload) { return handler(payload); };
        watchers.push(watcher);
        return watcher;
    };
    return { setState: setState, getState: getState, watchState: watchState };
};
//# sourceMappingURL=createState.js.map