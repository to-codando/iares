import { IRoute, IRouteConfig, IRouteKey } from "./interfaces";
import { eventDrive, render } from "./render";

export const router = (params: IRouteConfig) => {
  const { routes } = params;

  const _hasActiveRoute = (): boolean => {
    return !!window.location.hash;
  };

  const _getRouteByKey = ({ key }: IRouteKey): IRoute | null => {
    const route = routes.find((route) => route.hasOwnProperty(key));
    if (!route) throw new Error(`${key} route is not defined and must be.`);
    return route;
  };

  const _getDefaultRoute = (): IRoute => {
    const route = _getRouteByKey({ key: "default" });
    if (!route) throw new Error("default route is not defined and must be.");
    return route;
  };

  const _createSelector = (value: string): string => {
    const regex = /(?=[A-Z])/;
    return value.split(regex).join("-").toLocaleLowerCase();
  };

  const _createElement = (selector: string): HTMLElement => {
    return document.createElement(selector);
  };

  const _renderRoute = async (route: IRoute) => {
    const { element, props } = params.context;
    const selector = "[data-component=router-view]";
    const routerElement = element.querySelector(selector) as Element;
    const { component } = await route.mount(routerElement);
    const componentSelector = _createSelector(component.name);
    const componentElement = _createElement("div");
    componentElement.dataset.component = componentSelector;

    if (routerElement) {
      routerElement.innerHTML = "";
      routerElement.insertAdjacentElement("beforeend", componentElement);
      const newProps = { ...props, isRouted: true };
      render(component, { element, props: newProps });
    }
  };

  const _getRouteByHash = (hash: string): IRoute => {
    const route = routes.find((route) => route.regex.test(hash));
    if (!route) return _getDefaultRoute();
    return route;
  };

  const _reloadActiveRoute = () => {
    const currentHash = window.location.hash;
    const currentRoute = _getRouteByHash(currentHash);
    _renderRoute(currentRoute);
  };

  const _getStartRoute = () => {
    return _getRouteByKey({ key: "start" });
  };

  const _redirectTo = (hash: string): void => {
    window.location.hash = hash;
  };

  const _throwError = (errorMessage: string) => {
    throw new Error(errorMessage);
  };

  const _bindListeners = () => {
    window.addEventListener("hashchange", async () => {
      const route = _getRouteByHash(window.location.hash);
      const { component } = await route.mount();
      eventDrive.emit("unmount", { componentName: _createSelector(component.name) });
      _renderRoute(route);
    });

    window.addEventListener("DOMContentLoaded", async () => {
      if (!_hasActiveRoute()) {
        const route = _getStartRoute();
        route?.start
          ? _redirectTo(route?.start)
          : _throwError("route start property is not defined and must be.");

        return;
      }

      _reloadActiveRoute();
    });
  };

  const init = () => {
    _bindListeners();
  };

  return { init };
};
