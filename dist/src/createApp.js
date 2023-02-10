export var createApp = function (_a) {
    var onMount = _a.onMount;
    var bodyElement = document.body;
    var customParams = {};
    var mount = function (context) {
        onMount(bodyElement || context, customParams);
    };
    var unmount = function () {
        bodyElement.innerHTML = "";
    };
    var setup = function (params) {
        Object.assign(customParams, params);
    };
    return { mount: mount, unmount: unmount, setup: setup };
};
//# sourceMappingURL=createApp.js.map