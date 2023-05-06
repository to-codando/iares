export const createApp = (params) => {
    const hostElement = document.body;
    const appConfig = {};
    const mount = () => {
        params.onMount(appConfig?.context || hostElement);
    };
    const unmount = () => { };
    const setup = (params) => {
        Object.assign(appConfig, params);
    };
    return { mount, unmount, setup };
};
//# sourceMappingURL=index.js.map