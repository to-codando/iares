import type { Router, Execute } from "./types";
//import { eventDrive } from "../render";

export const router: Router = ({ routes, context }) => {
  const _routes = routes;
  let _routerElement!: HTMLElement;

  const execute: Execute = (validator, callback, error) => {
    if (validator()) return callback({ isValid: validator() });

    if (error) {
      const erro = new Error(error().message);
      erro.name = error().name;
      throw erro;
    }
  };

  const cleanupStyles = async (selector: string) => {
    if (!selector) return;

    const styleElement = document.head.querySelector(
      `[data-component=${selector}]`,
    );
    if (styleElement) {
      styleElement.remove();
    }
  };

  const cleanupDOM = async () => {
    _routerElement.replaceChildren();
  };

  const getChildSelector = (): string => {
    const child = _routerElement.firstElementChild;
    const selector = child ? Object.values(child.classList).shift() : "";
    return selector as string;
  };

  const cleanupCurrentRoute = async () => {
    try {
      const selector = getChildSelector();
      await cleanupStyles(selector);
      await cleanupDOM();
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const _bindListeners = () => {
    window.addEventListener("hashchange", async () => {
      try {
        await cleanupCurrentRoute();
        await _mountRouteByHash(null);
      } catch (error) {
        console.error("Error during route change:", error);
        // Aqui você pode adicionar lógica de fallback ou recuperação de erro
      }
    });
  };

  const _setRouterElement = () => {
    const routerElement = context?.querySelector("router-view");

    execute(
      () => !!routerElement,
      () => {
        _routerElement = routerElement as HTMLElement;
        return _routerElement;
      },
      () => ({
        name: "Router Error",
        message: "Router element (router-view) is not defined and must be.",
      }),
    );
  };

  const _loadMainRoute = () => {
    const mainRoute = _getMainRoute();
    execute(
      () => !!mainRoute?.start,
      () => mainRoute?.start && navigate(mainRoute.start),
      () => ({
        name: "Router Error",
        message: "Start router is not defined and must be.",
      }),
    );
  };

  const _getMainRoute = () => _routes.find((route) => !!route?.start);

  const _getRouteByHash = (hash: string) => {
    return _routes.find((route) => route.regex.test(hash));
  };

  const _getRouteDefault = () => _routes.find((route) => route?.default);

  const _mountRouteByHash = async (hash: string | null) => {
    const hashValue = hash || window.location.hash || "";
    const route = _getRouteByHash(hashValue) || _getRouteDefault();
    _routerElement.innerHTML = "";
    route?.mount({ context: _routerElement });
  };

  const _getHash = () => window.location.hash || null;

  const _hasActiveRoute = () => !!_getHash();

  const navigate = (path: string) => {
    window.location.hash = path;
  };

  const init = () => {
    _bindListeners();
    _setRouterElement();
    _hasActiveRoute() ? _mountRouteByHash(_getHash()) : _loadMainRoute();
  };

  return { init, navigate };
};
