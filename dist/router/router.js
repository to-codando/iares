import { eventDrive } from "../render";
export const router = ({ routes, context }) => {
    const _routes = routes;
    let _routerElement;
    const execute = (validator, callback, error) => {
        if (validator())
            return callback({ isValid: validator() });
        if (error) {
            const erro = new Error(error().message);
            erro.name = error().name;
            throw erro;
        }
    };
    const _bindListeners = () => {
        window.addEventListener("hashchange", () => {
            const payload = { status: true };
            eventDrive.emit("ON-DESTROY", payload);
            _mountRouteByHash(null);
        });
    };
    const _setRouterElement = () => {
        const routerElement = context?.querySelector("router-view");
        execute(() => !!routerElement, () => (_routerElement = routerElement), () => ({
            name: "Router Error",
            message: "Router element (router-view) is not defined and must be.",
        }));
    };
    const _loadMainRoute = () => {
        const mainRoute = _getMainRoute();
        execute(() => !!mainRoute?.start, () => mainRoute?.start && navigate(mainRoute.start), () => ({
            name: "Router Error",
            message: "Start router is not defined and must be.",
        }));
    };
    const _getMainRoute = () => _routes.find((route) => !!route?.start);
    const _getRouteByHash = (hash) => {
        return _routes.find((route) => route.regex.test(hash));
    };
    const _getRouteDefault = () => _routes.find((route) => route?.default);
    const _mountRouteByHash = async (hash) => {
        const hashValue = hash || window.location.hash || "";
        const route = _getRouteByHash(hashValue) || _getRouteDefault();
        _routerElement.innerHTML = "";
        route?.mount({ context: _routerElement });
    };
    const _getHash = () => window.location.hash || null;
    const _hasActiveRoute = () => !!_getHash();
    const navigate = (path) => (window.location.hash = path);
    const init = () => {
        _bindListeners();
        _setRouterElement();
        _hasActiveRoute() ? _mountRouteByHash(_getHash()) : _loadMainRoute();
    };
    return { init, navigate };
};
//# sourceMappingURL=router.js.map