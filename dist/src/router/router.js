var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// src/router/router.ts
var router = /* @__PURE__ */ __name(({ routes, context }) => {
  const _routes = routes;
  let _routerElement;
  const execute = /* @__PURE__ */ __name((validator, callback, error) => {
    if (validator()) return callback({ isValid: validator() });
    if (error) {
      const erro = new Error(error().message);
      erro.name = error().name;
      throw erro;
    }
  }, "execute");
  const cleanupStyles = /* @__PURE__ */ __name(async (selector) => {
    if (!selector) return;
    const styleElement = document.head.querySelector(
      `[data-component=${selector}]`
    );
    if (styleElement) {
      styleElement.remove();
    }
  }, "cleanupStyles");
  const cleanupDOM = /* @__PURE__ */ __name(async () => {
    _routerElement.replaceChildren();
  }, "cleanupDOM");
  const getChildSelector = /* @__PURE__ */ __name(() => {
    const child = _routerElement.firstElementChild;
    const selector = child ? Object.values(child.classList).shift() : "";
    return selector;
  }, "getChildSelector");
  const cleanupCurrentRoute = /* @__PURE__ */ __name(async () => {
    try {
      const selector = getChildSelector();
      await cleanupStyles(selector);
      await cleanupDOM();
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  }, "cleanupCurrentRoute");
  const _bindListeners = /* @__PURE__ */ __name(() => {
    window.addEventListener("hashchange", async () => {
      try {
        await cleanupCurrentRoute();
        await _mountRouteByHash(null);
      } catch (error) {
        console.error("Error during route change:", error);
      }
    });
  }, "_bindListeners");
  const _setRouterElement = /* @__PURE__ */ __name(() => {
    const routerElement = context?.querySelector("router-view");
    execute(
      () => !!routerElement,
      () => {
        _routerElement = routerElement;
        return _routerElement;
      },
      () => ({
        name: "Router Error",
        message: "Router element (router-view) is not defined and must be."
      })
    );
  }, "_setRouterElement");
  const _loadMainRoute = /* @__PURE__ */ __name(() => {
    const mainRoute = _getMainRoute();
    execute(
      () => !!mainRoute?.start,
      () => mainRoute?.start && navigate(mainRoute.start),
      () => ({
        name: "Router Error",
        message: "Start router is not defined and must be."
      })
    );
  }, "_loadMainRoute");
  const _getMainRoute = /* @__PURE__ */ __name(() => _routes.find((route) => !!route?.start), "_getMainRoute");
  const _getRouteByHash = /* @__PURE__ */ __name((hash) => {
    return _routes.find((route) => route.regex.test(hash));
  }, "_getRouteByHash");
  const _getRouteDefault = /* @__PURE__ */ __name(() => _routes.find((route) => route?.default), "_getRouteDefault");
  const _mountRouteByHash = /* @__PURE__ */ __name(async (hash) => {
    const hashValue = hash || window.location.hash || "";
    const route = _getRouteByHash(hashValue) || _getRouteDefault();
    _routerElement.innerHTML = "";
    route?.mount({ context: _routerElement });
  }, "_mountRouteByHash");
  const _getHash = /* @__PURE__ */ __name(() => window.location.hash || null, "_getHash");
  const _hasActiveRoute = /* @__PURE__ */ __name(() => !!_getHash(), "_hasActiveRoute");
  const navigate = /* @__PURE__ */ __name((path) => {
    window.location.hash = path;
  }, "navigate");
  const init = /* @__PURE__ */ __name(() => {
    _bindListeners();
    _setRouterElement();
    _hasActiveRoute() ? _mountRouteByHash(_getHash()) : _loadMainRoute();
  }, "init");
  return { init, navigate };
}, "router");
export {
  router
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vc3JjL3JvdXRlci9yb3V0ZXIudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCB0eXBlIHsgUm91dGVyLCBFeGVjdXRlIH0gZnJvbSBcIi4vdHlwZXNcIjtcbi8vaW1wb3J0IHsgZXZlbnREcml2ZSB9IGZyb20gXCIuLi9yZW5kZXJcIjtcblxuZXhwb3J0IGNvbnN0IHJvdXRlcjogUm91dGVyID0gKHsgcm91dGVzLCBjb250ZXh0IH0pID0+IHtcbiAgY29uc3QgX3JvdXRlcyA9IHJvdXRlcztcbiAgbGV0IF9yb3V0ZXJFbGVtZW50ITogSFRNTEVsZW1lbnQ7XG5cbiAgY29uc3QgZXhlY3V0ZTogRXhlY3V0ZSA9ICh2YWxpZGF0b3IsIGNhbGxiYWNrLCBlcnJvcikgPT4ge1xuICAgIGlmICh2YWxpZGF0b3IoKSkgcmV0dXJuIGNhbGxiYWNrKHsgaXNWYWxpZDogdmFsaWRhdG9yKCkgfSk7XG5cbiAgICBpZiAoZXJyb3IpIHtcbiAgICAgIGNvbnN0IGVycm8gPSBuZXcgRXJyb3IoZXJyb3IoKS5tZXNzYWdlKTtcbiAgICAgIGVycm8ubmFtZSA9IGVycm9yKCkubmFtZTtcbiAgICAgIHRocm93IGVycm87XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGNsZWFudXBTdHlsZXMgPSBhc3luYyAoc2VsZWN0b3I6IHN0cmluZykgPT4ge1xuICAgIGlmICghc2VsZWN0b3IpIHJldHVybjtcblxuICAgIGNvbnN0IHN0eWxlRWxlbWVudCA9IGRvY3VtZW50LmhlYWQucXVlcnlTZWxlY3RvcihcbiAgICAgIGBbZGF0YS1jb21wb25lbnQ9JHtzZWxlY3Rvcn1dYCxcbiAgICApO1xuICAgIGlmIChzdHlsZUVsZW1lbnQpIHtcbiAgICAgIHN0eWxlRWxlbWVudC5yZW1vdmUoKTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgY2xlYW51cERPTSA9IGFzeW5jICgpID0+IHtcbiAgICBfcm91dGVyRWxlbWVudC5yZXBsYWNlQ2hpbGRyZW4oKTtcbiAgfTtcblxuICBjb25zdCBnZXRDaGlsZFNlbGVjdG9yID0gKCk6IHN0cmluZyA9PiB7XG4gICAgY29uc3QgY2hpbGQgPSBfcm91dGVyRWxlbWVudC5maXJzdEVsZW1lbnRDaGlsZDtcbiAgICBjb25zdCBzZWxlY3RvciA9IGNoaWxkID8gT2JqZWN0LnZhbHVlcyhjaGlsZC5jbGFzc0xpc3QpLnNoaWZ0KCkgOiBcIlwiO1xuICAgIHJldHVybiBzZWxlY3RvciBhcyBzdHJpbmc7XG4gIH07XG5cbiAgY29uc3QgY2xlYW51cEN1cnJlbnRSb3V0ZSA9IGFzeW5jICgpID0+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3Qgc2VsZWN0b3IgPSBnZXRDaGlsZFNlbGVjdG9yKCk7XG4gICAgICBhd2FpdCBjbGVhbnVwU3R5bGVzKHNlbGVjdG9yKTtcbiAgICAgIGF3YWl0IGNsZWFudXBET00oKTtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGVycm9yKTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgX2JpbmRMaXN0ZW5lcnMgPSAoKSA9PiB7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJoYXNoY2hhbmdlXCIsIGFzeW5jICgpID0+IHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGF3YWl0IGNsZWFudXBDdXJyZW50Um91dGUoKTtcbiAgICAgICAgYXdhaXQgX21vdW50Um91dGVCeUhhc2gobnVsbCk7XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgZHVyaW5nIHJvdXRlIGNoYW5nZTpcIiwgZXJyb3IpO1xuICAgICAgICAvLyBBcXVpIHZvY1x1MDBFQSBwb2RlIGFkaWNpb25hciBsXHUwMEYzZ2ljYSBkZSBmYWxsYmFjayBvdSByZWN1cGVyYVx1MDBFN1x1MDBFM28gZGUgZXJyb1xuICAgICAgfVxuICAgIH0pO1xuICB9O1xuXG4gIGNvbnN0IF9zZXRSb3V0ZXJFbGVtZW50ID0gKCkgPT4ge1xuICAgIGNvbnN0IHJvdXRlckVsZW1lbnQgPSBjb250ZXh0Py5xdWVyeVNlbGVjdG9yKFwicm91dGVyLXZpZXdcIik7XG5cbiAgICBleGVjdXRlKFxuICAgICAgKCkgPT4gISFyb3V0ZXJFbGVtZW50LFxuICAgICAgKCkgPT4ge1xuICAgICAgICBfcm91dGVyRWxlbWVudCA9IHJvdXRlckVsZW1lbnQgYXMgSFRNTEVsZW1lbnQ7XG4gICAgICAgIHJldHVybiBfcm91dGVyRWxlbWVudDtcbiAgICAgIH0sXG4gICAgICAoKSA9PiAoe1xuICAgICAgICBuYW1lOiBcIlJvdXRlciBFcnJvclwiLFxuICAgICAgICBtZXNzYWdlOiBcIlJvdXRlciBlbGVtZW50IChyb3V0ZXItdmlldykgaXMgbm90IGRlZmluZWQgYW5kIG11c3QgYmUuXCIsXG4gICAgICB9KSxcbiAgICApO1xuICB9O1xuXG4gIGNvbnN0IF9sb2FkTWFpblJvdXRlID0gKCkgPT4ge1xuICAgIGNvbnN0IG1haW5Sb3V0ZSA9IF9nZXRNYWluUm91dGUoKTtcbiAgICBleGVjdXRlKFxuICAgICAgKCkgPT4gISFtYWluUm91dGU/LnN0YXJ0LFxuICAgICAgKCkgPT4gbWFpblJvdXRlPy5zdGFydCAmJiBuYXZpZ2F0ZShtYWluUm91dGUuc3RhcnQpLFxuICAgICAgKCkgPT4gKHtcbiAgICAgICAgbmFtZTogXCJSb3V0ZXIgRXJyb3JcIixcbiAgICAgICAgbWVzc2FnZTogXCJTdGFydCByb3V0ZXIgaXMgbm90IGRlZmluZWQgYW5kIG11c3QgYmUuXCIsXG4gICAgICB9KSxcbiAgICApO1xuICB9O1xuXG4gIGNvbnN0IF9nZXRNYWluUm91dGUgPSAoKSA9PiBfcm91dGVzLmZpbmQoKHJvdXRlKSA9PiAhIXJvdXRlPy5zdGFydCk7XG5cbiAgY29uc3QgX2dldFJvdXRlQnlIYXNoID0gKGhhc2g6IHN0cmluZykgPT4ge1xuICAgIHJldHVybiBfcm91dGVzLmZpbmQoKHJvdXRlKSA9PiByb3V0ZS5yZWdleC50ZXN0KGhhc2gpKTtcbiAgfTtcblxuICBjb25zdCBfZ2V0Um91dGVEZWZhdWx0ID0gKCkgPT4gX3JvdXRlcy5maW5kKChyb3V0ZSkgPT4gcm91dGU/LmRlZmF1bHQpO1xuXG4gIGNvbnN0IF9tb3VudFJvdXRlQnlIYXNoID0gYXN5bmMgKGhhc2g6IHN0cmluZyB8IG51bGwpID0+IHtcbiAgICBjb25zdCBoYXNoVmFsdWUgPSBoYXNoIHx8IHdpbmRvdy5sb2NhdGlvbi5oYXNoIHx8IFwiXCI7XG4gICAgY29uc3Qgcm91dGUgPSBfZ2V0Um91dGVCeUhhc2goaGFzaFZhbHVlKSB8fCBfZ2V0Um91dGVEZWZhdWx0KCk7XG4gICAgX3JvdXRlckVsZW1lbnQuaW5uZXJIVE1MID0gXCJcIjtcbiAgICByb3V0ZT8ubW91bnQoeyBjb250ZXh0OiBfcm91dGVyRWxlbWVudCB9KTtcbiAgfTtcblxuICBjb25zdCBfZ2V0SGFzaCA9ICgpID0+IHdpbmRvdy5sb2NhdGlvbi5oYXNoIHx8IG51bGw7XG5cbiAgY29uc3QgX2hhc0FjdGl2ZVJvdXRlID0gKCkgPT4gISFfZ2V0SGFzaCgpO1xuXG4gIGNvbnN0IG5hdmlnYXRlID0gKHBhdGg6IHN0cmluZykgPT4ge1xuICAgIHdpbmRvdy5sb2NhdGlvbi5oYXNoID0gcGF0aDtcbiAgfTtcblxuICBjb25zdCBpbml0ID0gKCkgPT4ge1xuICAgIF9iaW5kTGlzdGVuZXJzKCk7XG4gICAgX3NldFJvdXRlckVsZW1lbnQoKTtcbiAgICBfaGFzQWN0aXZlUm91dGUoKSA/IF9tb3VudFJvdXRlQnlIYXNoKF9nZXRIYXNoKCkpIDogX2xvYWRNYWluUm91dGUoKTtcbiAgfTtcblxuICByZXR1cm4geyBpbml0LCBuYXZpZ2F0ZSB9O1xufTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7QUFHTyxJQUFNLFNBQWlCLHdCQUFDLEVBQUUsUUFBUSxRQUFRLE1BQU07QUFDckQsUUFBTSxVQUFVO0FBQ2hCLE1BQUk7QUFFSixRQUFNLFVBQW1CLHdCQUFDLFdBQVcsVUFBVSxVQUFVO0FB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
