var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// src/state/createState.ts
var _createUUID = /* @__PURE__ */ __name(() => Math.random().toString(36).substring(2, 11), "_createUUID");
var createState = /* @__PURE__ */ __name((initialState) => {
  const _state = JSON.parse(JSON.stringify(initialState));
  const _watchers = /* @__PURE__ */ new Set();
  const _notifyHandlers = /* @__PURE__ */ __name((payload) => {
    for (const stateWatcher of _watchers) {
      stateWatcher(payload);
    }
  }, "_notifyHandlers");
  const set = /* @__PURE__ */ __name((payload) => {
    Object.assign(_state, JSON.parse(JSON.stringify(payload)));
    _notifyHandlers(JSON.parse(JSON.stringify(_state)));
  }, "set");
  const get = /* @__PURE__ */ __name(() => {
    return JSON.parse(JSON.stringify(_state));
  }, "get");
  const watch = /* @__PURE__ */ __name((callback) => {
    _watchers.add(callback);
  }, "watch");
  return { set, get, watch };
}, "createState");
export {
  createState
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vc3JjL3N0YXRlL2NyZWF0ZVN0YXRlLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgdHlwZSB7IFN0YXRlV2F0Y2hlciwgU3RhdGUsIFN0YXRlTWFuYWdlciB9IGZyb20gXCIuL3R5cGVzXCI7XG5cbmNvbnN0IF9jcmVhdGVVVUlEID0gKCk6IHN0cmluZyA9PiBNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKDM2KS5zdWJzdHJpbmcoMiwgMTEpO1xuXG5leHBvcnQgY29uc3QgY3JlYXRlU3RhdGUgPSA8UyA9IHVua25vd24+KFxuICBpbml0aWFsU3RhdGU6IFN0YXRlPFM+LFxuKTogU3RhdGVNYW5hZ2VyPFM+ID0+IHtcbiAgY29uc3QgX3N0YXRlID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShpbml0aWFsU3RhdGUpKTtcbiAgY29uc3QgX3dhdGNoZXJzID0gbmV3IFNldDxTdGF0ZVdhdGNoZXI8Uz4+KCk7XG5cbiAgY29uc3QgX25vdGlmeUhhbmRsZXJzID0gKHBheWxvYWQ6IFN0YXRlPFM+KSA9PiB7XG4gICAgZm9yIChjb25zdCBzdGF0ZVdhdGNoZXIgb2YgX3dhdGNoZXJzKSB7XG4gICAgICBzdGF0ZVdhdGNoZXIocGF5bG9hZCk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IHNldCA9IChwYXlsb2FkOiBTdGF0ZTxTPikgPT4ge1xuICAgIE9iamVjdC5hc3NpZ24oX3N0YXRlLCBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHBheWxvYWQpKSk7XG4gICAgX25vdGlmeUhhbmRsZXJzKEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoX3N0YXRlKSkpO1xuICB9O1xuXG4gIGNvbnN0IGdldCA9ICgpOiBTdGF0ZTxTPiA9PiB7XG4gICAgcmV0dXJuIEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoX3N0YXRlKSk7XG4gIH07XG5cbiAgY29uc3Qgd2F0Y2ggPSAoY2FsbGJhY2s6IFN0YXRlV2F0Y2hlcjxTPikgPT4ge1xuICAgIF93YXRjaGVycy5hZGQoY2FsbGJhY2spO1xuICB9O1xuXG4gIHJldHVybiB7IHNldCwgZ2V0LCB3YXRjaCB9O1xufTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7QUFFQSxJQUFNLGNBQWMsNkJBQWMsS0FBSyxPQUFPLEVBQUUsU0FBUyxFQUFFLEVBQUUsVUFBVSxHQUFHLEVBQUUsR0FBeEQ7QUFFYixJQUFNLGNBQWMsd0JBQ3pCLGlCQUNvQjtBQUNwQixRQUFNLFNBQVMsS0FBSyxNQUFNLEtBQUssVUFBVSxZQUFZLENBQUM7QUFDdEQsUUFBTSxZQUFZLG9CQUFJLElBQXFCO0FBRTNDLFFBQU0sa0JBQWtCLHdCQUFDLFlBQXNCO0FBQzdDLGVBQVcsZ0JBQWdCLFdBQVc7QUFDcEMsbUJBQWEsT0FBTztBQUFBLElBQ3RCO0FBQUEsRUFDRixHQUp3QjtBQU14QixRQUFNLE1BQU0sd0JBQUMsWUFBc0I7QUFDakMsV0FBTyxPQUFPLFFBQVEsS0FBSyxNQUFNLEtBQUssVUFBVSxPQUFPLENBQUMsQ0FBQztBQUN6RCxvQkFBZ0IsS0FBSyxNQUFNLEtBQUssVUFBVSxNQUFNLENBQUMsQ0FBQztBQUFBLEVBQ3BELEdBSFk7QUFLWixRQUFNLE1BQU0sNkJBQWdCO0FBQzFCLFdBQU8sS0FBSyxNQUFNLEtBQUssVUFBVSxNQUFNLENBQUM7QUFBQSxFQUMxQyxHQUZZO0FBSVosUUFBTSxRQUFRLHdCQUFDLGFBQThCO0FBQzNDLGNBQVUsSUFBSSxRQUFRO0FBQUEsRUFDeEIsR0FGYztBQUlkLFNBQU8sRUFBRSxLQUFLLEtBQUssTUFBTTtBQUMzQixHQTFCMkI7IiwKICAibmFtZXMiOiBbXQp9Cg==
