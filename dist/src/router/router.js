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
  const _bindListeners = /* @__PURE__ */ __name(() => {
    window.addEventListener("hashchange", () => {
      _mountRouteByHash(null);
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vc3JjL3JvdXRlci9yb3V0ZXIudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCB0eXBlIHsgUm91dGVyLCBFeGVjdXRlIH0gZnJvbSBcIi4vdHlwZXNcIjtcbi8vaW1wb3J0IHsgZXZlbnREcml2ZSB9IGZyb20gXCIuLi9yZW5kZXJcIjtcblxuZXhwb3J0IGNvbnN0IHJvdXRlcjogUm91dGVyID0gKHsgcm91dGVzLCBjb250ZXh0IH0pID0+IHtcbiAgY29uc3QgX3JvdXRlcyA9IHJvdXRlcztcbiAgbGV0IF9yb3V0ZXJFbGVtZW50ITogSFRNTEVsZW1lbnQ7XG5cbiAgY29uc3QgZXhlY3V0ZTogRXhlY3V0ZSA9ICh2YWxpZGF0b3IsIGNhbGxiYWNrLCBlcnJvcikgPT4ge1xuICAgIGlmICh2YWxpZGF0b3IoKSkgcmV0dXJuIGNhbGxiYWNrKHsgaXNWYWxpZDogdmFsaWRhdG9yKCkgfSk7XG5cbiAgICBpZiAoZXJyb3IpIHtcbiAgICAgIGNvbnN0IGVycm8gPSBuZXcgRXJyb3IoZXJyb3IoKS5tZXNzYWdlKTtcbiAgICAgIGVycm8ubmFtZSA9IGVycm9yKCkubmFtZTtcbiAgICAgIHRocm93IGVycm87XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IF9iaW5kTGlzdGVuZXJzID0gKCkgPT4ge1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiaGFzaGNoYW5nZVwiLCAoKSA9PiB7XG4gICAgICAvL2NvbnN0IHBheWxvYWQ6IFJvdXRlck9iamVjdCA9IHsgc3RhdHVzOiB0cnVlIH07XG4gICAgICAvL2V2ZW50RHJpdmUuZW1pdChcIk9OLURFU1RST1lcIiwgcGF5bG9hZCk7XG4gICAgICBfbW91bnRSb3V0ZUJ5SGFzaChudWxsKTtcbiAgICB9KTtcbiAgfTtcblxuICBjb25zdCBfc2V0Um91dGVyRWxlbWVudCA9ICgpID0+IHtcbiAgICBjb25zdCByb3V0ZXJFbGVtZW50ID0gY29udGV4dD8ucXVlcnlTZWxlY3RvcihcInJvdXRlci12aWV3XCIpO1xuXG4gICAgZXhlY3V0ZShcbiAgICAgICgpID0+ICEhcm91dGVyRWxlbWVudCxcbiAgICAgICgpID0+IHtcbiAgICAgICAgX3JvdXRlckVsZW1lbnQgPSByb3V0ZXJFbGVtZW50IGFzIEhUTUxFbGVtZW50O1xuICAgICAgICByZXR1cm4gX3JvdXRlckVsZW1lbnQ7XG4gICAgICB9LFxuICAgICAgKCkgPT4gKHtcbiAgICAgICAgbmFtZTogXCJSb3V0ZXIgRXJyb3JcIixcbiAgICAgICAgbWVzc2FnZTogXCJSb3V0ZXIgZWxlbWVudCAocm91dGVyLXZpZXcpIGlzIG5vdCBkZWZpbmVkIGFuZCBtdXN0IGJlLlwiLFxuICAgICAgfSksXG4gICAgKTtcbiAgfTtcblxuICBjb25zdCBfbG9hZE1haW5Sb3V0ZSA9ICgpID0+IHtcbiAgICBjb25zdCBtYWluUm91dGUgPSBfZ2V0TWFpblJvdXRlKCk7XG4gICAgZXhlY3V0ZShcbiAgICAgICgpID0+ICEhbWFpblJvdXRlPy5zdGFydCxcbiAgICAgICgpID0+IG1haW5Sb3V0ZT8uc3RhcnQgJiYgbmF2aWdhdGUobWFpblJvdXRlLnN0YXJ0KSxcbiAgICAgICgpID0+ICh7XG4gICAgICAgIG5hbWU6IFwiUm91dGVyIEVycm9yXCIsXG4gICAgICAgIG1lc3NhZ2U6IFwiU3RhcnQgcm91dGVyIGlzIG5vdCBkZWZpbmVkIGFuZCBtdXN0IGJlLlwiLFxuICAgICAgfSksXG4gICAgKTtcbiAgfTtcblxuICBjb25zdCBfZ2V0TWFpblJvdXRlID0gKCkgPT4gX3JvdXRlcy5maW5kKChyb3V0ZSkgPT4gISFyb3V0ZT8uc3RhcnQpO1xuXG4gIGNvbnN0IF9nZXRSb3V0ZUJ5SGFzaCA9IChoYXNoOiBzdHJpbmcpID0+IHtcbiAgICByZXR1cm4gX3JvdXRlcy5maW5kKChyb3V0ZSkgPT4gcm91dGUucmVnZXgudGVzdChoYXNoKSk7XG4gIH07XG5cbiAgY29uc3QgX2dldFJvdXRlRGVmYXVsdCA9ICgpID0+IF9yb3V0ZXMuZmluZCgocm91dGUpID0+IHJvdXRlPy5kZWZhdWx0KTtcblxuICBjb25zdCBfbW91bnRSb3V0ZUJ5SGFzaCA9IGFzeW5jIChoYXNoOiBzdHJpbmcgfCBudWxsKSA9PiB7XG4gICAgY29uc3QgaGFzaFZhbHVlID0gaGFzaCB8fCB3aW5kb3cubG9jYXRpb24uaGFzaCB8fCBcIlwiO1xuICAgIGNvbnN0IHJvdXRlID0gX2dldFJvdXRlQnlIYXNoKGhhc2hWYWx1ZSkgfHwgX2dldFJvdXRlRGVmYXVsdCgpO1xuICAgIF9yb3V0ZXJFbGVtZW50LmlubmVySFRNTCA9IFwiXCI7XG4gICAgcm91dGU/Lm1vdW50KHsgY29udGV4dDogX3JvdXRlckVsZW1lbnQgfSk7XG4gIH07XG5cbiAgY29uc3QgX2dldEhhc2ggPSAoKSA9PiB3aW5kb3cubG9jYXRpb24uaGFzaCB8fCBudWxsO1xuXG4gIGNvbnN0IF9oYXNBY3RpdmVSb3V0ZSA9ICgpID0+ICEhX2dldEhhc2goKTtcblxuICBjb25zdCBuYXZpZ2F0ZSA9IChwYXRoOiBzdHJpbmcpID0+IHtcbiAgICB3aW5kb3cubG9jYXRpb24uaGFzaCA9IHBhdGg7XG4gIH07XG5cbiAgY29uc3QgaW5pdCA9ICgpID0+IHtcbiAgICBfYmluZExpc3RlbmVycygpO1xuICAgIF9zZXRSb3V0ZXJFbGVtZW50KCk7XG4gICAgX2hhc0FjdGl2ZVJvdXRlKCkgPyBfbW91bnRSb3V0ZUJ5SGFzaChfZ2V0SGFzaCgpKSA6IF9sb2FkTWFpblJvdXRlKCk7XG4gIH07XG5cbiAgcmV0dXJuIHsgaW5pdCwgbmF2aWdhdGUgfTtcbn07XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7O0FBR08sSUFBTSxTQUFpQix3QkFBQyxFQUFFLFFBQVEsUUFBUSxNQUFNO0FBQ3JELFFBQU0sVUFBVTtBQUNoQixNQUFJO0FBRUosUUFBTSxVQUFtQix3QkFBQyxXQUFXLFVBQVUsVUFBVTtBQUN2RCxRQUFJLFVBQVUsRUFBRyxRQUFPLFNBQVMsRUFBRSxTQUFTLFVBQVUsRUFBRSxDQUFDO0FBRXpELFFBQUksT0FBTztBQUNULFlBQU0sT0FBTyxJQUFJLE1BQU0sTUFBTSxFQUFFLE9BQU87QUFDdEMsV0FBSyxPQUFPLE1BQU0sRUFBRTtBQUNwQixZQUFNO0FBQUEsSUFDUjtBQUFBLEVBQ0YsR0FSeUI7QUFVekIsUUFBTSxpQkFBaUIsNkJBQU07QUFDM0IsV0FBTyxpQkFBaUIsY0FBYyxNQUFNO0FBRzFDLHdCQUFrQixJQUFJO0FBQUEsSUFDeEIsQ0FBQztBQUFBLEVBQ0gsR0FOdUI7QUFRdkIsUUFBTSxvQkFBb0IsNkJBQU07QUFDOUIsVUFBTSxnQkFBZ0IsU0FBUyxjQUFjLGFBQWE7QUFFMUQ7QUFBQSxNQUNFLE1BQU0sQ0FBQyxDQUFDO0FBQUEsTUFDUixNQUFNO0FBQ0oseUJBQWlCO0FBQ2pCLGVBQU87QUFBQSxNQUNUO0FBQUEsTUFDQSxPQUFPO0FBQUEsUUFDTCxNQUFNO0FBQUEsUUFDTixTQUFTO0FBQUEsTUFDWDtBQUFBLElBQ0Y7QUFBQSxFQUNGLEdBZDBCO0FBZ0IxQixRQUFNLGlCQUFpQiw2QkFBTTtBQUMzQixVQUFNLFlBQVksY0FBYztBQUNoQztBQUFBLE1BQ0UsTUFBTSxDQUFDLENBQUMsV0FBVztBQUFBLE1BQ25CLE1BQU0sV0FBVyxTQUFTLFNBQVMsVUFBVSxLQUFLO0FBQUEsTUFDbEQsT0FBTztBQUFBLFFBQ0wsTUFBTTtBQUFBLFFBQ04sU0FBUztBQUFBLE1BQ1g7QUFBQSxJQUNGO0FBQUEsRUFDRixHQVZ1QjtBQVl2QixRQUFNLGdCQUFnQiw2QkFBTSxRQUFRLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQyxPQUFPLEtBQUssR0FBNUM7QUFFdEIsUUFBTSxrQkFBa0Isd0JBQUMsU0FBaUI7QUFDeEMsV0FBTyxRQUFRLEtBQUssQ0FBQyxVQUFVLE1BQU0sTUFBTSxLQUFLLElBQUksQ0FBQztBQUFBLEVBQ3ZELEdBRndCO0FBSXhCLFFBQU0sbUJBQW1CLDZCQUFNLFFBQVEsS0FBSyxDQUFDLFVBQVUsT0FBTyxPQUFPLEdBQTVDO0FBRXpCLFFBQU0sb0JBQW9CLDhCQUFPLFNBQXdCO0FBQ3ZELFVBQU0sWUFBWSxRQUFRLE9BQU8sU0FBUyxRQUFRO0FBQ2xELFVBQU0sUUFBUSxnQkFBZ0IsU0FBUyxLQUFLLGlCQUFpQjtBQUM3RCxtQkFBZSxZQUFZO0FBQzNCLFdBQU8sTUFBTSxFQUFFLFNBQVMsZUFBZSxDQUFDO0FBQUEsRUFDMUMsR0FMMEI7QUFPMUIsUUFBTSxXQUFXLDZCQUFNLE9BQU8sU0FBUyxRQUFRLE1BQTlCO0FBRWpCLFFBQU0sa0JBQWtCLDZCQUFNLENBQUMsQ0FBQyxTQUFTLEdBQWpCO0FBRXhCLFFBQU0sV0FBVyx3QkFBQyxTQUFpQjtBQUNqQyxXQUFPLFNBQVMsT0FBTztBQUFBLEVBQ3pCLEdBRmlCO0FBSWpCLFFBQU0sT0FBTyw2QkFBTTtBQUNqQixtQkFBZTtBQUNmLHNCQUFrQjtBQUNsQixvQkFBZ0IsSUFBSSxrQkFBa0IsU0FBUyxDQUFDLElBQUksZUFBZTtBQUFBLEVBQ3JFLEdBSmE7QUFNYixTQUFPLEVBQUUsTUFBTSxTQUFTO0FBQzFCLEdBaEY4QjsiLAogICJuYW1lcyI6IFtdCn0K
