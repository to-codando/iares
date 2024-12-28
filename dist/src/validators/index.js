var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// src/utils/index.ts
var escapeTemplateString = /* @__PURE__ */ __name((templateString) => {
  if (typeof templateString !== "string") return templateString;
  return templateString.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;").replace(/\//g, "&#x2F;");
}, "escapeTemplateString");
var bindStyleScope = /* @__PURE__ */ __name((scopeId, strings) => {
  const regex = /(\.(\w+)(\-*|\_*)?)+\w+/gi;
  return strings.replace(regex, (values) => {
    return `.${scopeId}-${values.replace(/\./, "")}`;
  });
}, "bindStyleScope");
var createUUID = /* @__PURE__ */ __name(() => Math.random().toString(36).slice(2, 6), "createUUID");
var HTMLEvents = [
  // Eventos de Mouse
  "onclick",
  "ondblclick",
  "onmousedown",
  "onmouseup",
  "onmouseover",
  "onmouseout",
  "onmousemove",
  "onmouseenter",
  "onmouseleave",
  "oncontextmenu",
  // Eventos de Teclado
  "onkeydown",
  "onkeyup",
  "onkeypress",
  // Eventos de Foco
  "onfocus",
  "onblur",
  // Eventos de Formulário
  "onsubmit",
  "onchange",
  "oninput",
  "onreset",
  "oninvalid",
  // Eventos de Mídia
  "onplay",
  "onpause",
  "onended",
  "onvolumechange",
  // Eventos de Toque (Touch) - para dispositivos móveis
  "ontouchstart",
  "ontouchmove",
  "ontouchend",
  "ontouchcancel",
  // Eventos de Animação e Transição
  "onanimationstart",
  "onanimationend",
  "onanimationiteration",
  "ontransitionend",
  // Eventos de Outros Interativos
  "onload",
  "onerror",
  "onresize",
  "onscroll"
];

// src/validators/template/index.ts
var isObject = /* @__PURE__ */ __name((payload) => () => {
  return !!payload && !Array.isArray(payload) && typeof payload === "object";
}, "isObject");
var isArray = /* @__PURE__ */ __name((payload) => () => {
  return !!payload && Array.isArray(payload);
}, "isArray");
var isFunction = /* @__PURE__ */ __name((payload) => () => {
  return !!payload && typeof payload === "function";
}, "isFunction");
var isString = /* @__PURE__ */ __name((payload) => () => {
  return typeof payload === "string";
}, "isString");
var isEventName = /* @__PURE__ */ __name((payload) => () => {
  if (typeof payload !== "string") return false;
  return HTMLEvents.includes(payload.toLowerCase());
}, "isEventName");
var isTemplateData = /* @__PURE__ */ __name((payload) => () => {
  return typeof payload === "string" || typeof payload === "number";
}, "isTemplateData");
export {
  isArray,
  isEventName,
  isFunction,
  isObject,
  isString,
  isTemplateData
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vc3JjL3V0aWxzL2luZGV4LnRzIiwgIi4uLy4uLy4uL3NyYy92YWxpZGF0b3JzL3RlbXBsYXRlL2luZGV4LnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJleHBvcnQgY29uc3QgZXNjYXBlVGVtcGxhdGVTdHJpbmcgPSAodGVtcGxhdGVTdHJpbmc6IHN0cmluZyk6IHN0cmluZyA9PiB7XG4gIGlmICh0eXBlb2YgdGVtcGxhdGVTdHJpbmcgIT09IFwic3RyaW5nXCIpIHJldHVybiB0ZW1wbGF0ZVN0cmluZztcbiAgcmV0dXJuIHRlbXBsYXRlU3RyaW5nXG4gICAgLnJlcGxhY2UoLyYvZywgXCImYW1wO1wiKVxuICAgIC5yZXBsYWNlKC88L2csIFwiJmx0O1wiKVxuICAgIC5yZXBsYWNlKC8+L2csIFwiJmd0O1wiKVxuICAgIC5yZXBsYWNlKC9cIi9nLCBcIiZxdW90O1wiKVxuICAgIC5yZXBsYWNlKC8nL2csIFwiJiMzOTtcIilcbiAgICAucmVwbGFjZSgvXFwvL2csIFwiJiN4MkY7XCIpO1xufTtcblxuZXhwb3J0IGNvbnN0IGJpbmRTdHlsZVNjb3BlID0gKHNjb3BlSWQ6IHN0cmluZywgc3RyaW5nczogc3RyaW5nKTogc3RyaW5nID0+IHtcbiAgY29uc3QgcmVnZXggPSAvKFxcLihcXHcrKShcXC0qfFxcXyopPykrXFx3Ky9naTtcbiAgcmV0dXJuIHN0cmluZ3MucmVwbGFjZShyZWdleCwgKHZhbHVlcykgPT4ge1xuICAgIHJldHVybiBgLiR7c2NvcGVJZH0tJHt2YWx1ZXMucmVwbGFjZSgvXFwuLywgXCJcIil9YDtcbiAgfSk7XG59O1xuXG5leHBvcnQgY29uc3QgY3JlYXRlVVVJRCA9ICgpID0+IE1hdGgucmFuZG9tKCkudG9TdHJpbmcoMzYpLnNsaWNlKDIsIDYpO1xuXG5leHBvcnQgY29uc3QgSFRNTEV2ZW50cyA9IFtcbiAgLy8gRXZlbnRvcyBkZSBNb3VzZVxuICBcIm9uY2xpY2tcIixcbiAgXCJvbmRibGNsaWNrXCIsXG4gIFwib25tb3VzZWRvd25cIixcbiAgXCJvbm1vdXNldXBcIixcbiAgXCJvbm1vdXNlb3ZlclwiLFxuICBcIm9ubW91c2VvdXRcIixcbiAgXCJvbm1vdXNlbW92ZVwiLFxuICBcIm9ubW91c2VlbnRlclwiLFxuICBcIm9ubW91c2VsZWF2ZVwiLFxuICBcIm9uY29udGV4dG1lbnVcIixcblxuICAvLyBFdmVudG9zIGRlIFRlY2xhZG9cbiAgXCJvbmtleWRvd25cIixcbiAgXCJvbmtleXVwXCIsXG4gIFwib25rZXlwcmVzc1wiLFxuXG4gIC8vIEV2ZW50b3MgZGUgRm9jb1xuICBcIm9uZm9jdXNcIixcbiAgXCJvbmJsdXJcIixcblxuICAvLyBFdmVudG9zIGRlIEZvcm11bFx1MDBFMXJpb1xuICBcIm9uc3VibWl0XCIsXG4gIFwib25jaGFuZ2VcIixcbiAgXCJvbmlucHV0XCIsXG4gIFwib25yZXNldFwiLFxuICBcIm9uaW52YWxpZFwiLFxuXG4gIC8vIEV2ZW50b3MgZGUgTVx1MDBFRGRpYVxuICBcIm9ucGxheVwiLFxuICBcIm9ucGF1c2VcIixcbiAgXCJvbmVuZGVkXCIsXG4gIFwib252b2x1bWVjaGFuZ2VcIixcblxuICAvLyBFdmVudG9zIGRlIFRvcXVlIChUb3VjaCkgLSBwYXJhIGRpc3Bvc2l0aXZvcyBtXHUwMEYzdmVpc1xuICBcIm9udG91Y2hzdGFydFwiLFxuICBcIm9udG91Y2htb3ZlXCIsXG4gIFwib250b3VjaGVuZFwiLFxuICBcIm9udG91Y2hjYW5jZWxcIixcblxuICAvLyBFdmVudG9zIGRlIEFuaW1hXHUwMEU3XHUwMEUzbyBlIFRyYW5zaVx1MDBFN1x1MDBFM29cbiAgXCJvbmFuaW1hdGlvbnN0YXJ0XCIsXG4gIFwib25hbmltYXRpb25lbmRcIixcbiAgXCJvbmFuaW1hdGlvbml0ZXJhdGlvblwiLFxuICBcIm9udHJhbnNpdGlvbmVuZFwiLFxuXG4gIC8vIEV2ZW50b3MgZGUgT3V0cm9zIEludGVyYXRpdm9zXG4gIFwib25sb2FkXCIsXG4gIFwib25lcnJvclwiLFxuICBcIm9ucmVzaXplXCIsXG4gIFwib25zY3JvbGxcIixcbl07XG4iLCAiaW1wb3J0IHsgSFRNTEV2ZW50cyB9IGZyb20gXCJAL3V0aWxzXCI7XG5cbmNvbnN0IGlzT2JqZWN0ID1cbiAgPFQ+KHBheWxvYWQ6IFQpID0+XG4gICAgKCkgPT4ge1xuICAgICAgcmV0dXJuICEhcGF5bG9hZCAmJiAhQXJyYXkuaXNBcnJheShwYXlsb2FkKSAmJiB0eXBlb2YgcGF5bG9hZCA9PT0gXCJvYmplY3RcIjtcbiAgICB9O1xuXG5jb25zdCBpc0FycmF5ID1cbiAgPFQ+KHBheWxvYWQ6IFQpID0+XG4gICAgKCkgPT4ge1xuICAgICAgcmV0dXJuICEhcGF5bG9hZCAmJiBBcnJheS5pc0FycmF5KHBheWxvYWQpO1xuICAgIH07XG5cbmNvbnN0IGlzRnVuY3Rpb24gPVxuICA8VCA9IHZvaWQ+KHBheWxvYWQ6IFQpID0+XG4gICAgKCkgPT4ge1xuICAgICAgcmV0dXJuICEhcGF5bG9hZCAmJiB0eXBlb2YgcGF5bG9hZCA9PT0gXCJmdW5jdGlvblwiO1xuICAgIH07XG5cbmNvbnN0IGlzU3RyaW5nID1cbiAgPFQgPSB2b2lkPihwYXlsb2FkOiBUKSA9PlxuICAgICgpID0+IHtcbiAgICAgIHJldHVybiB0eXBlb2YgcGF5bG9hZCA9PT0gXCJzdHJpbmdcIjtcbiAgICB9O1xuXG5jb25zdCBpc0V2ZW50TmFtZSA9XG4gIDxUID0gdm9pZD4ocGF5bG9hZDogVCkgPT5cbiAgICAoKSA9PiB7XG4gICAgICBpZiAodHlwZW9mIHBheWxvYWQgIT09IFwic3RyaW5nXCIpIHJldHVybiBmYWxzZTtcbiAgICAgIHJldHVybiBIVE1MRXZlbnRzLmluY2x1ZGVzKHBheWxvYWQudG9Mb3dlckNhc2UoKSk7XG4gICAgfTtcblxuY29uc3QgaXNUZW1wbGF0ZURhdGEgPVxuICA8VCA9IHZvaWQ+KHBheWxvYWQ6IFQpID0+XG4gICAgKCkgPT4ge1xuICAgICAgcmV0dXJuIHR5cGVvZiBwYXlsb2FkID09PSBcInN0cmluZ1wiIHx8IHR5cGVvZiBwYXlsb2FkID09PSBcIm51bWJlclwiO1xuICAgIH07XG5cbmV4cG9ydCB7IGlzT2JqZWN0LCBpc0FycmF5LCBpc0Z1bmN0aW9uLCBpc1N0cmluZywgaXNFdmVudE5hbWUsIGlzVGVtcGxhdGVEYXRhIH07XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7O0FBQU8sSUFBTSx1QkFBdUIsd0JBQUMsbUJBQW1DO0FBQ3RFLE1BQUksT0FBTyxtQkFBbUIsU0FBVSxRQUFPO0FBQy9DLFNBQU8sZUFDSixRQUFRLE1BQU0sT0FBTyxFQUNyQixRQUFRLE1BQU0sTUFBTSxFQUNwQixRQUFRLE1BQU0sTUFBTSxFQUNwQixRQUFRLE1BQU0sUUFBUSxFQUN0QixRQUFRLE1BQU0sT0FBTyxFQUNyQixRQUFRLE9BQU8sUUFBUTtBQUM1QixHQVRvQztBQVc3QixJQUFNLGlCQUFpQix3QkFBQyxTQUFpQixZQUE0QjtBQUMxRSxRQUFNLFFBQVE7QUFDZCxTQUFPLFFBQVEsUUFBUSxPQUFPLENBQUMsV0FBVztBQUN4QyxXQUFPLElBQUksT0FBTyxJQUFJLE9BQU8sUUFBUSxNQUFNLEVBQUUsQ0FBQztBQUFBLEVBQ2hELENBQUM7QUFDSCxHQUw4QjtBQU92QixJQUFNLGFBQWEsNkJBQU0sS0FBSyxPQUFPLEVBQUUsU0FBUyxFQUFFLEVBQUUsTUFBTSxHQUFHLENBQUMsR0FBM0M7QUFFbkIsSUFBTSxhQUFhO0FBQUE7QUFBQSxFQUV4QjtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBO0FBQUEsRUFHQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUE7QUFBQSxFQUdBO0FBQUEsRUFDQTtBQUFBO0FBQUEsRUFHQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQTtBQUFBLEVBR0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQTtBQUFBLEVBR0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQTtBQUFBLEVBR0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQTtBQUFBLEVBR0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFDRjs7O0FDdEVBLElBQU0sV0FDSix3QkFBSSxZQUNGLE1BQU07QUFDSixTQUFPLENBQUMsQ0FBQyxXQUFXLENBQUMsTUFBTSxRQUFRLE9BQU8sS0FBSyxPQUFPLFlBQVk7QUFDcEUsR0FIRjtBQUtGLElBQU0sVUFDSix3QkFBSSxZQUNGLE1BQU07QUFDSixTQUFPLENBQUMsQ0FBQyxXQUFXLE1BQU0sUUFBUSxPQUFPO0FBQzNDLEdBSEY7QUFLRixJQUFNLGFBQ0osd0JBQVcsWUFDVCxNQUFNO0FBQ0osU0FBTyxDQUFDLENBQUMsV0FBVyxPQUFPLFlBQVk7QUFDekMsR0FIRjtBQUtGLElBQU0sV0FDSix3QkFBVyxZQUNULE1BQU07QUFDSixTQUFPLE9BQU8sWUFBWTtBQUM1QixHQUhGO0FBS0YsSUFBTSxjQUNKLHdCQUFXLFlBQ1QsTUFBTTtBQUNKLE1BQUksT0FBTyxZQUFZLFNBQVUsUUFBTztBQUN4QyxTQUFPLFdBQVcsU0FBUyxRQUFRLFlBQVksQ0FBQztBQUNsRCxHQUpGO0FBTUYsSUFBTSxpQkFDSix3QkFBVyxZQUNULE1BQU07QUFDSixTQUFPLE9BQU8sWUFBWSxZQUFZLE9BQU8sWUFBWTtBQUMzRCxHQUhGOyIsCiAgIm5hbWVzIjogW10KfQo=
