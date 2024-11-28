var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// src/CreateApp/CreateApp.ts
var CreateApp = /* @__PURE__ */ __name(() => {
  let _element;
  const setup = /* @__PURE__ */ __name((callback) => {
    _element = callback();
    return callback();
  }, "setup");
  const mount = /* @__PURE__ */ __name((callback) => {
    return callback(_element);
  }, "mount");
  const unmount = /* @__PURE__ */ __name((callback) => {
    return callback(_element);
  }, "unmount");
  return { setup, mount, unmount };
}, "CreateApp");

// src/state/createState.ts
var _createUUID = /* @__PURE__ */ __name(() => Math.random().toString(36).substring(2, 11), "_createUUID");
var createState = /* @__PURE__ */ __name((initialState) => {
  const _state = JSON.parse(JSON.stringify(initialState));
  const _handlers = /* @__PURE__ */ new Set();
  const _id = _createUUID();
  const _notifyHandlers = /* @__PURE__ */ __name((payload) => {
    for (const stateHandler of _handlers) {
      stateHandler(payload);
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
    _handlers.add(callback);
  }, "watch");
  return { set, get, watch };
}, "createState");

// src/factories/createChain/index.ts
var createChain = /* @__PURE__ */ __name(() => {
  const _chain = /* @__PURE__ */ new Set();
  const add = /* @__PURE__ */ __name((chainLink) => {
    _chain.add(chainLink);
  }, "add");
  const execute = /* @__PURE__ */ __name(() => {
    for (const { action, validator } of _chain) {
      if (validator()) action();
    }
  }, "execute");
  return { add, execute };
}, "createChain");

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

// src/actions/template/renderTemplateObject.ts
var renderTemplateObject = /* @__PURE__ */ __name((template, contextElement, state = {}) => () => {
  const _chain = createChain();
  _chain.add({
    validator: isString(template.type),
    action: createElementByTagName(template, contextElement, state)
  });
  _chain.add({
    validator: isFunction(template.type),
    action: createElementByFactoryName(template, contextElement, state)
  });
  _chain.execute();
}, "renderTemplateObject");

// src/actions/template/renderTemplateArray.ts
var renderTemplateArray = /* @__PURE__ */ __name((templateSchema, contextElement, state = {}) => () => {
  for (const template of templateSchema) {
    render(template, contextElement, state);
  }
}, "renderTemplateArray");

// src/actions/template/renderChildren.ts
var renderChildren2 = /* @__PURE__ */ __name((children, element, state = {}) => {
  for (const child of children) {
    if (typeof child === "string") {
      element.innerHTML = child;
    } else render(child, element, state);
  }
}, "renderChildren");

// src/actions/template/createElementByFactoryName.ts
var _createTagByFactoryName = /* @__PURE__ */ __name((factory) => {
  return factory.name.split(/(?=[A-Z])/).join("-").toLowerCase();
}, "_createTagByFactoryName");
var _mergeState = /* @__PURE__ */ __name((state) => {
  const mergeState = /* @__PURE__ */ __name((initialState) => {
    const latestState = state.get();
    state.set({ ...initialState, ...latestState });
    return { get: state.get, set: state.set, watch: state.watch };
  }, "mergeState");
  return mergeState;
}, "_mergeState");
var _createStyles = /* @__PURE__ */ __name(({ props, state }) => {
  return (cssHandler) => {
    return cssHandler({ props, state });
  };
}, "_createStyles");
var createElementByFactoryName = /* @__PURE__ */ __name((template, parentElement, latestState = {}) => {
  return () => {
    const factory = template.type;
    const tagName = _createTagByFactoryName(factory);
    const element = document.createElement(tagName);
    const props = template.props;
    const currentState = JSON.parse(JSON.stringify(latestState));
    const state = createState(currentState);
    const useState = _mergeState(state);
    const useStyles = _createStyles({ props, state });
    const children = factory({
      props,
      useState,
      useStyles
    });
    parentElement.insertAdjacentElement("beforeend", element);
    renderChildren2(children, element, currentState);
    state.watch((payload) => {
      element.innerHTML = "";
      render(template, element, payload);
    });
  };
}, "createElementByFactoryName");

// src/actions/template/setElementAttributes.ts
var setElementAttributes2 = /* @__PURE__ */ __name((element, attributes) => {
  const attributeKeys = attributes ? Object.keys(attributes) : [];
  for (const key of attributeKeys) {
    if (!isEventName(key)()) {
      element.setAttribute(key, attributes[key]);
    } else {
      const eventName = key.replace(/on/, "").toLowerCase();
      const eventHandler = attributes[key];
      element.addEventListener(eventName, eventHandler);
    }
  }
  return element;
}, "setElementAttributes");

// src/actions/template/createElementByTagName.ts
var createElementByTagName = /* @__PURE__ */ __name((template, parentElement, state = {}) => () => {
  const tagName = template.type;
  const element = document.createElement(tagName);
  setElementAttributes2(element, template.props);
  parentElement.insertAdjacentElement("beforeend", element);
  renderChildren2(template.children, element, state);
}, "createElementByTagName");

// src/render/index.ts
var render = /* @__PURE__ */ __name((template, context = document.body, state = {}) => {
  const chain = createChain();
  const componentElement = context || document.querySelector("body");
  chain.add({
    validator: isArray(template),
    action: renderTemplateArray(
      template,
      componentElement,
      state
    )
  });
  chain.add({
    validator: isObject(template),
    action: renderTemplateObject(
      template,
      componentElement,
      state
    )
  });
  chain.execute();
  return componentElement;
}, "render");

// ../../node_modules/.pnpm/htm@3.1.1/node_modules/htm/dist/htm.module.js
var n = /* @__PURE__ */ __name(function(t2, s, r, e) {
  var u;
  s[0] = 0;
  for (var h = 1; h < s.length; h++) {
    var p = s[h++], a = s[h] ? (s[0] |= p ? 1 : 2, r[s[h++]]) : s[++h];
    3 === p ? e[0] = a : 4 === p ? e[1] = Object.assign(e[1] || {}, a) : 5 === p ? (e[1] = e[1] || {})[s[++h]] = a : 6 === p ? e[1][s[++h]] += a + "" : p ? (u = t2.apply(a, n(t2, a, r, ["", null])), e.push(u), a[0] ? s[0] |= 2 : (s[h - 2] = 0, s[h] = u)) : e.push(a);
  }
  return e;
}, "n"), t = /* @__PURE__ */ new Map();
function htm_module_default(s) {
  var r = t.get(this);
  return r || (r = /* @__PURE__ */ new Map(), t.set(this, r)), (r = n(this, r.get(s) || (r.set(s, r = function(n2) {
    for (var t2, s2, r2 = 1, e = "", u = "", h = [0], p = function(n3) {
      1 === r2 && (n3 || (e = e.replace(/^\s*\n\s*|\s*\n\s*$/g, ""))) ? h.push(0, n3, e) : 3 === r2 && (n3 || e) ? (h.push(3, n3, e), r2 = 2) : 2 === r2 && "..." === e && n3 ? h.push(4, n3, 0) : 2 === r2 && e && !n3 ? h.push(5, 0, true, e) : r2 >= 5 && ((e || !n3 && 5 === r2) && (h.push(r2, 0, e, s2), r2 = 6), n3 && (h.push(r2, n3, 0, s2), r2 = 6)), e = "";
    }, a = 0; a < n2.length; a++) {
      a && (1 === r2 && p(), p(a));
      for (var l = 0; l < n2[a].length; l++) t2 = n2[a][l], 1 === r2 ? "<" === t2 ? (p(), h = [h], r2 = 3) : e += t2 : 4 === r2 ? "--" === e && ">" === t2 ? (r2 = 1, e = "") : e = t2 + e[0] : u ? t2 === u ? u = "" : e += t2 : '"' === t2 || "'" === t2 ? u = t2 : ">" === t2 ? (p(), r2 = 1) : r2 && ("=" === t2 ? (r2 = 5, s2 = e, e = "") : "/" === t2 && (r2 < 5 || ">" === n2[a][l + 1]) ? (p(), 3 === r2 && (h = h[0]), r2 = h, (h = h[0]).push(2, 0, r2), r2 = 0) : " " === t2 || "	" === t2 || "\n" === t2 || "\r" === t2 ? (p(), r2 = 2) : e += t2), 3 === r2 && "!--" === e && (r2 = 4, h = h[0]);
    }
    return p(), h;
  }(s)), r), arguments, [])).length > 1 ? r : r[0];
}
__name(htm_module_default, "default");

// src/template/html.ts
var hypertext = /* @__PURE__ */ __name((type, props, ...children) => {
  return { type, props, children };
}, "hypertext");
var html = htm_module_default.bind(hypertext);

// src/style/createHash.ts
var createHash = /* @__PURE__ */ __name((str) => {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = hash * 33 ^ str.charCodeAt(i);
  }
  return `css-${(hash >>> 0).toString(36)}`;
}, "createHash");

// src/style/createStyleElement.ts
var styleElementCache = /* @__PURE__ */ new Map();
var createStyleElement = /* @__PURE__ */ __name((componentId) => {
  const styleElement = styleElementCache.get(componentId);
  if (styleElement !== void 0) {
    return styleElement;
  }
  const style = document.createElement("style");
  style.setAttribute("data-component", componentId);
  document.head.appendChild(style);
  styleElementCache.set(componentId, style);
  return style;
}, "createStyleElement");

// src/style/createStyleScope.ts
var splitIntoRules = /* @__PURE__ */ __name((css2) => {
  return css2.split("}").map((rule) => rule.trim()).filter((rule) => rule.length > 0);
}, "splitIntoRules");
var parseRule = /* @__PURE__ */ __name((rule) => {
  const parts = rule.split("{").map((part) => part.trim());
  if (parts.length !== 2) {
    console.warn(`Regra CSS inv\xE1lida omitida: "${rule}"`);
    return null;
  }
  const [selectorPart, declarationPart] = parts;
  if (!selectorPart || !declarationPart) {
    console.warn(`Regra CSS incompleta omitida: "${rule}"`);
    return null;
  }
  const selectors = selectorPart.split(",").map((selector) => selector.trim());
  const declarations = declarationPart.trim();
  return [selectors, declarations];
}, "parseRule");
var prefixSelector = /* @__PURE__ */ __name((selector, className) => {
  if (selector.startsWith("&")) {
    return selector.replace("&", `.${className}`);
  }
  return `.${className}${selector}`;
}, "prefixSelector");
var scopeRule = /* @__PURE__ */ __name((rule, className) => {
  const parsedRule = parseRule(rule);
  if (!parsedRule) {
    return "";
  }
  const [selectors, declarations] = parsedRule;
  const scopedSelectors = selectors.map(
    (selector) => (
      // Substituir diretamente o seletor original pelo da classe única
      selector.startsWith(".") ? `.${className}` : prefixSelector(selector, className)
    )
  );
  return `${scopedSelectors.join(", ")} { ${declarations} }
`;
}, "scopeRule");
var createStyleScope = /* @__PURE__ */ __name((className, css2) => {
  return splitIntoRules(css2).map((rule) => scopeRule(rule, className)).filter((scopedRule) => scopedRule.length > 0).join("");
}, "createStyleScope");

// src/style/css.ts
var cssCache = /* @__PURE__ */ new Map();
var classToComponentId = /* @__PURE__ */ new Map();
var generateComponentId = /* @__PURE__ */ __name(() => {
  return `component-${Math.random().toString(36).substring(2, 8)}`;
}, "generateComponentId");
var css = /* @__PURE__ */ __name((strings, ...interpolations) => {
  const rawCSS = strings.reduce((accumulator, str, index) => {
    return accumulator + str + (interpolations[index] !== void 0 ? interpolations[index] : "");
  }, "");
  const cachedClassName = cssCache.get(rawCSS);
  if (cachedClassName !== void 0) {
    return cachedClassName;
  }
  const className = createHash(rawCSS);
  let componentId;
  const existingComponentId = classToComponentId.get(className);
  if (existingComponentId !== void 0) {
    componentId = existingComponentId;
  } else {
    componentId = generateComponentId();
    classToComponentId.set(className, componentId);
  }
  const scopedCSS = createStyleScope(className, rawCSS);
  const styleElement = createStyleElement(componentId);
  if (!styleElement.innerHTML.includes(scopedCSS)) {
    styleElement.innerHTML += scopedCSS;
  }
  cssCache.set(rawCSS, className);
  return className;
}, "css");
export {
  CreateApp,
  createState,
  css,
  html,
  html as jsx,
  render,
  html as tsx
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vc3JjL0NyZWF0ZUFwcC9DcmVhdGVBcHAudHMiLCAiLi4vLi4vc3JjL3N0YXRlL2NyZWF0ZVN0YXRlLnRzIiwgIi4uLy4uL3NyYy9mYWN0b3JpZXMvY3JlYXRlQ2hhaW4vaW5kZXgudHMiLCAiLi4vLi4vc3JjL3V0aWxzL2luZGV4LnRzIiwgIi4uLy4uL3NyYy92YWxpZGF0b3JzL3RlbXBsYXRlL2luZGV4LnRzIiwgIi4uLy4uL3NyYy9hY3Rpb25zL3RlbXBsYXRlL3JlbmRlclRlbXBsYXRlT2JqZWN0LnRzIiwgIi4uLy4uL3NyYy9hY3Rpb25zL3RlbXBsYXRlL3JlbmRlclRlbXBsYXRlQXJyYXkudHMiLCAiLi4vLi4vc3JjL2FjdGlvbnMvdGVtcGxhdGUvcmVuZGVyQ2hpbGRyZW4udHMiLCAiLi4vLi4vc3JjL2FjdGlvbnMvdGVtcGxhdGUvY3JlYXRlRWxlbWVudEJ5RmFjdG9yeU5hbWUudHMiLCAiLi4vLi4vc3JjL2FjdGlvbnMvdGVtcGxhdGUvc2V0RWxlbWVudEF0dHJpYnV0ZXMudHMiLCAiLi4vLi4vc3JjL2FjdGlvbnMvdGVtcGxhdGUvY3JlYXRlRWxlbWVudEJ5VGFnTmFtZS50cyIsICIuLi8uLi9zcmMvcmVuZGVyL2luZGV4LnRzIiwgIi4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy8ucG5wbS9odG1AMy4xLjEvbm9kZV9tb2R1bGVzL2h0bS9kaXN0L2h0bS5tb2R1bGUuanMiLCAiLi4vLi4vc3JjL3RlbXBsYXRlL2h0bWwudHMiLCAiLi4vLi4vc3JjL3N0eWxlL2NyZWF0ZUhhc2gudHMiLCAiLi4vLi4vc3JjL3N0eWxlL2NyZWF0ZVN0eWxlRWxlbWVudC50cyIsICIuLi8uLi9zcmMvc3R5bGUvY3JlYXRlU3R5bGVTY29wZS50cyIsICIuLi8uLi9zcmMvc3R5bGUvY3NzLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgdHlwZSB7XG4gIEFwcGxpY2F0aW9uLFxuICBDb250ZXh0RWxlbWVudCxcbiAgQ29udGV4dEhhbmRsZXIsXG4gIENhbGxiYWNrSGFuZGxlcixcbn0gZnJvbSBcIi4vdHlwZXNcIjtcblxuZXhwb3J0IGNvbnN0IENyZWF0ZUFwcCA9ICgpOiBBcHBsaWNhdGlvbiA9PiB7XG4gIGxldCBfZWxlbWVudCE6IENvbnRleHRFbGVtZW50O1xuXG4gIGNvbnN0IHNldHVwID0gKGNhbGxiYWNrOiBDb250ZXh0SGFuZGxlcikgPT4ge1xuICAgIF9lbGVtZW50ID0gY2FsbGJhY2soKTtcbiAgICByZXR1cm4gY2FsbGJhY2soKTtcbiAgfTtcblxuICBjb25zdCBtb3VudCA9IChjYWxsYmFjazogQ2FsbGJhY2tIYW5kbGVyKSA9PiB7XG4gICAgcmV0dXJuIGNhbGxiYWNrKF9lbGVtZW50KTtcbiAgfTtcblxuICBjb25zdCB1bm1vdW50ID0gKGNhbGxiYWNrOiBDYWxsYmFja0hhbmRsZXIpID0+IHtcbiAgICByZXR1cm4gY2FsbGJhY2soX2VsZW1lbnQpO1xuICB9O1xuXG4gIHJldHVybiB7IHNldHVwLCBtb3VudCwgdW5tb3VudCB9O1xufTtcbiIsICJpbXBvcnQgdHlwZSB7IFN0YXRlSGFuZGxlciwgU3RhdGUsIFN0YXRlTWFuYWdlciB9IGZyb20gXCIuL3R5cGVzXCI7XG5cbmNvbnN0IF9jcmVhdGVVVUlEID0gKCk6IHN0cmluZyA9PiBNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKDM2KS5zdWJzdHJpbmcoMiwgMTEpO1xuXG5leHBvcnQgY29uc3QgY3JlYXRlU3RhdGUgPSA8Uz4oaW5pdGlhbFN0YXRlOiBTdGF0ZTxTPik6IFN0YXRlTWFuYWdlcjxTPiA9PiB7XG4gIGNvbnN0IF9zdGF0ZSA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoaW5pdGlhbFN0YXRlKSk7XG4gIGNvbnN0IF9oYW5kbGVycyA9IG5ldyBTZXQ8U3RhdGVIYW5kbGVyPigpO1xuICBjb25zdCBfaWQ6IFJlYWRvbmx5PHN0cmluZz4gPSBfY3JlYXRlVVVJRCgpO1xuXG4gIGNvbnN0IF9ub3RpZnlIYW5kbGVycyA9IChwYXlsb2FkOiBTdGF0ZTxTPikgPT4ge1xuICAgIGZvciAoY29uc3Qgc3RhdGVIYW5kbGVyIG9mIF9oYW5kbGVycykge1xuICAgICAgc3RhdGVIYW5kbGVyPFM+KHBheWxvYWQpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBzZXQgPSAocGF5bG9hZDogU3RhdGU8Uz4pID0+IHtcbiAgICBPYmplY3QuYXNzaWduKF9zdGF0ZSwgSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShwYXlsb2FkKSkpO1xuICAgIF9ub3RpZnlIYW5kbGVycyhKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KF9zdGF0ZSkpKTtcbiAgfTtcblxuICBjb25zdCBnZXQgPSAoKTogU3RhdGU8Uz4gPT4ge1xuICAgIHJldHVybiBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KF9zdGF0ZSkpO1xuICB9O1xuXG4gIGNvbnN0IHdhdGNoID0gKGNhbGxiYWNrOiBTdGF0ZUhhbmRsZXIpID0+IHtcbiAgICBfaGFuZGxlcnMuYWRkKGNhbGxiYWNrKTtcbiAgfTtcblxuICByZXR1cm4geyBzZXQsIGdldCwgd2F0Y2ggfTtcbn07XG4iLCAiaW1wb3J0IHR5cGUgeyBDaGFpbkxpbmsgfSBmcm9tIFwiLi90eXBlc1wiO1xuXG5leHBvcnQgY29uc3QgY3JlYXRlQ2hhaW4gPSAoKSA9PiB7XG4gIGNvbnN0IF9jaGFpbiA9IG5ldyBTZXQ8Q2hhaW5MaW5rPHVua25vd24+PigpO1xuXG4gIGNvbnN0IGFkZCA9IDxUPihjaGFpbkxpbms6IENoYWluTGluazxUPikgPT4ge1xuICAgIF9jaGFpbi5hZGQoY2hhaW5MaW5rKTtcbiAgfTtcblxuICBjb25zdCBleGVjdXRlID0gKCkgPT4ge1xuICAgIGZvciAoY29uc3QgeyBhY3Rpb24sIHZhbGlkYXRvciB9IG9mIF9jaGFpbikge1xuICAgICAgaWYgKHZhbGlkYXRvcigpKSBhY3Rpb24oKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIHsgYWRkLCBleGVjdXRlIH07XG59O1xuIiwgImV4cG9ydCBjb25zdCBlc2NhcGVUZW1wbGF0ZVN0cmluZyA9ICh0ZW1wbGF0ZVN0cmluZzogc3RyaW5nKTogc3RyaW5nID0+IHtcbiAgaWYgKHR5cGVvZiB0ZW1wbGF0ZVN0cmluZyAhPT0gXCJzdHJpbmdcIikgcmV0dXJuIHRlbXBsYXRlU3RyaW5nO1xuICByZXR1cm4gdGVtcGxhdGVTdHJpbmdcbiAgICAucmVwbGFjZSgvJi9nLCBcIiZhbXA7XCIpXG4gICAgLnJlcGxhY2UoLzwvZywgXCImbHQ7XCIpXG4gICAgLnJlcGxhY2UoLz4vZywgXCImZ3Q7XCIpXG4gICAgLnJlcGxhY2UoL1wiL2csIFwiJnF1b3Q7XCIpXG4gICAgLnJlcGxhY2UoLycvZywgXCImIzM5O1wiKVxuICAgIC5yZXBsYWNlKC9cXC8vZywgXCImI3gyRjtcIik7XG59O1xuXG5leHBvcnQgY29uc3QgYmluZFN0eWxlU2NvcGUgPSAoc2NvcGVJZDogc3RyaW5nLCBzdHJpbmdzOiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xuICBjb25zdCByZWdleCA9IC8oXFwuKFxcdyspKFxcLSp8XFxfKik/KStcXHcrL2dpO1xuICByZXR1cm4gc3RyaW5ncy5yZXBsYWNlKHJlZ2V4LCAodmFsdWVzKSA9PiB7XG4gICAgcmV0dXJuIGAuJHtzY29wZUlkfS0ke3ZhbHVlcy5yZXBsYWNlKC9cXC4vLCBcIlwiKX1gO1xuICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBjcmVhdGVVVUlEID0gKCkgPT4gTWF0aC5yYW5kb20oKS50b1N0cmluZygzNikuc2xpY2UoMiwgNik7XG5cbmV4cG9ydCBjb25zdCBIVE1MRXZlbnRzID0gW1xuICAvLyBFdmVudG9zIGRlIE1vdXNlXG4gIFwib25jbGlja1wiLFxuICBcIm9uZGJsY2xpY2tcIixcbiAgXCJvbm1vdXNlZG93blwiLFxuICBcIm9ubW91c2V1cFwiLFxuICBcIm9ubW91c2VvdmVyXCIsXG4gIFwib25tb3VzZW91dFwiLFxuICBcIm9ubW91c2Vtb3ZlXCIsXG4gIFwib25tb3VzZWVudGVyXCIsXG4gIFwib25tb3VzZWxlYXZlXCIsXG4gIFwib25jb250ZXh0bWVudVwiLFxuXG4gIC8vIEV2ZW50b3MgZGUgVGVjbGFkb1xuICBcIm9ua2V5ZG93blwiLFxuICBcIm9ua2V5dXBcIixcbiAgXCJvbmtleXByZXNzXCIsXG5cbiAgLy8gRXZlbnRvcyBkZSBGb2NvXG4gIFwib25mb2N1c1wiLFxuICBcIm9uYmx1clwiLFxuXG4gIC8vIEV2ZW50b3MgZGUgRm9ybXVsXHUwMEUxcmlvXG4gIFwib25zdWJtaXRcIixcbiAgXCJvbmNoYW5nZVwiLFxuICBcIm9uaW5wdXRcIixcbiAgXCJvbnJlc2V0XCIsXG4gIFwib25pbnZhbGlkXCIsXG5cbiAgLy8gRXZlbnRvcyBkZSBNXHUwMEVEZGlhXG4gIFwib25wbGF5XCIsXG4gIFwib25wYXVzZVwiLFxuICBcIm9uZW5kZWRcIixcbiAgXCJvbnZvbHVtZWNoYW5nZVwiLFxuXG4gIC8vIEV2ZW50b3MgZGUgVG9xdWUgKFRvdWNoKSAtIHBhcmEgZGlzcG9zaXRpdm9zIG1cdTAwRjN2ZWlzXG4gIFwib250b3VjaHN0YXJ0XCIsXG4gIFwib250b3VjaG1vdmVcIixcbiAgXCJvbnRvdWNoZW5kXCIsXG4gIFwib250b3VjaGNhbmNlbFwiLFxuXG4gIC8vIEV2ZW50b3MgZGUgQW5pbWFcdTAwRTdcdTAwRTNvIGUgVHJhbnNpXHUwMEU3XHUwMEUzb1xuICBcIm9uYW5pbWF0aW9uc3RhcnRcIixcbiAgXCJvbmFuaW1hdGlvbmVuZFwiLFxuICBcIm9uYW5pbWF0aW9uaXRlcmF0aW9uXCIsXG4gIFwib250cmFuc2l0aW9uZW5kXCIsXG5cbiAgLy8gRXZlbnRvcyBkZSBPdXRyb3MgSW50ZXJhdGl2b3NcbiAgXCJvbmxvYWRcIixcbiAgXCJvbmVycm9yXCIsXG4gIFwib25yZXNpemVcIixcbiAgXCJvbnNjcm9sbFwiLFxuXTtcbiIsICJpbXBvcnQgeyBIVE1MRXZlbnRzIH0gZnJvbSBcIkAvdXRpbHNcIjtcblxuY29uc3QgaXNPYmplY3QgPVxuICA8VD4ocGF5bG9hZDogVCkgPT5cbiAgICAoKSA9PiB7XG4gICAgICByZXR1cm4gISFwYXlsb2FkICYmICFBcnJheS5pc0FycmF5KHBheWxvYWQpICYmIHR5cGVvZiBwYXlsb2FkID09PSBcIm9iamVjdFwiO1xuICAgIH07XG5cbmNvbnN0IGlzQXJyYXkgPVxuICA8VD4ocGF5bG9hZDogVCkgPT5cbiAgICAoKSA9PiB7XG4gICAgICByZXR1cm4gISFwYXlsb2FkICYmIEFycmF5LmlzQXJyYXkocGF5bG9hZCk7XG4gICAgfTtcblxuY29uc3QgaXNGdW5jdGlvbiA9XG4gIDxUID0gdm9pZD4ocGF5bG9hZDogVCkgPT5cbiAgICAoKSA9PiB7XG4gICAgICByZXR1cm4gISFwYXlsb2FkICYmIHR5cGVvZiBwYXlsb2FkID09PSBcImZ1bmN0aW9uXCI7XG4gICAgfTtcblxuY29uc3QgaXNTdHJpbmcgPVxuICA8VCA9IHZvaWQ+KHBheWxvYWQ6IFQpID0+XG4gICAgKCkgPT4ge1xuICAgICAgcmV0dXJuIHR5cGVvZiBwYXlsb2FkID09PSBcInN0cmluZ1wiO1xuICAgIH07XG5cbmNvbnN0IGlzRXZlbnROYW1lID1cbiAgPFQgPSB2b2lkPihwYXlsb2FkOiBUKSA9PlxuICAgICgpID0+IHtcbiAgICAgIGlmICh0eXBlb2YgcGF5bG9hZCAhPT0gXCJzdHJpbmdcIikgcmV0dXJuIGZhbHNlO1xuICAgICAgcmV0dXJuIEhUTUxFdmVudHMuaW5jbHVkZXMocGF5bG9hZC50b0xvd2VyQ2FzZSgpKTtcbiAgICB9O1xuXG5leHBvcnQgeyBpc09iamVjdCwgaXNBcnJheSwgaXNGdW5jdGlvbiwgaXNTdHJpbmcsIGlzRXZlbnROYW1lIH07XG4iLCAiaW1wb3J0IHR5cGUgeyBUZW1wbGF0ZVNjaGVtYSB9IGZyb20gXCJAL3R5cGVzXCI7XG5pbXBvcnQgeyBjcmVhdGVDaGFpbiB9IGZyb20gXCJAL2ZhY3Rvcmllc1wiO1xuaW1wb3J0IHtcbiAgY3JlYXRlRWxlbWVudEJ5RmFjdG9yeU5hbWUsXG4gIGNyZWF0ZUVsZW1lbnRCeVRhZ05hbWUsXG4gIHJlbmRlckNoaWxkcmVuLFxuICBzZXRFbGVtZW50QXR0cmlidXRlcyxcbn0gZnJvbSBcIkAvYWN0aW9uc1wiO1xuaW1wb3J0IHsgaXNGdW5jdGlvbiwgaXNTdHJpbmcgfSBmcm9tIFwiQC92YWxpZGF0b3JzXCI7XG5pbXBvcnQgdHlwZSB7IFN0YXRlIH0gZnJvbSBcIkAvc3RhdGVcIjtcblxudHlwZSBGYWN0b3J5ID0gKHBhcmFtcz86IHVua25vd24pID0+IHVua25vd247XG5cbmV4cG9ydCBjb25zdCByZW5kZXJUZW1wbGF0ZU9iamVjdCA9XG4gICh0ZW1wbGF0ZTogVGVtcGxhdGVTY2hlbWEsIGNvbnRleHRFbGVtZW50OiBFbGVtZW50LCBzdGF0ZTogU3RhdGUgPSB7fSkgPT5cbiAgICAoKTogdm9pZCA9PiB7XG4gICAgICBjb25zdCBfY2hhaW4gPSBjcmVhdGVDaGFpbigpO1xuXG4gICAgICBfY2hhaW4uYWRkKHtcbiAgICAgICAgdmFsaWRhdG9yOiBpc1N0cmluZyh0ZW1wbGF0ZS50eXBlKSxcbiAgICAgICAgYWN0aW9uOiBjcmVhdGVFbGVtZW50QnlUYWdOYW1lKHRlbXBsYXRlLCBjb250ZXh0RWxlbWVudCwgc3RhdGUpLFxuICAgICAgfSk7XG5cbiAgICAgIF9jaGFpbi5hZGQoe1xuICAgICAgICB2YWxpZGF0b3I6IGlzRnVuY3Rpb24odGVtcGxhdGUudHlwZSksXG4gICAgICAgIGFjdGlvbjogY3JlYXRlRWxlbWVudEJ5RmFjdG9yeU5hbWUodGVtcGxhdGUsIGNvbnRleHRFbGVtZW50LCBzdGF0ZSksXG4gICAgICB9KTtcblxuICAgICAgX2NoYWluLmV4ZWN1dGUoKTtcbiAgICB9O1xuIiwgImltcG9ydCB7IHJlbmRlciB9IGZyb20gXCJAL3JlbmRlclwiO1xuaW1wb3J0IHR5cGUgeyBUZW1wbGF0ZVNjaGVtYSB9IGZyb20gXCJAL3R5cGVzXCI7XG5pbXBvcnQgdHlwZSB7IFN0YXRlIH0gZnJvbSBcIkAvc3RhdGVcIjtcblxuZXhwb3J0IGNvbnN0IHJlbmRlclRlbXBsYXRlQXJyYXkgPVxuICAoXG4gICAgdGVtcGxhdGVTY2hlbWE6IFRlbXBsYXRlU2NoZW1hW10sXG4gICAgY29udGV4dEVsZW1lbnQ6IEVsZW1lbnQsXG4gICAgc3RhdGU6IFN0YXRlID0ge30sXG4gICkgPT5cbiAgICAoKSA9PiB7XG4gICAgICBmb3IgKGNvbnN0IHRlbXBsYXRlIG9mIHRlbXBsYXRlU2NoZW1hKSB7XG4gICAgICAgIHJlbmRlcih0ZW1wbGF0ZSwgY29udGV4dEVsZW1lbnQsIHN0YXRlKTtcbiAgICAgIH1cbiAgICB9O1xuIiwgImltcG9ydCB7IHJlbmRlciB9IGZyb20gXCJAL3JlbmRlclwiO1xuaW1wb3J0IHR5cGUgeyBUZW1wbGF0ZSwgVGVtcGxhdGVTY2hlbWEgfSBmcm9tIFwiQC90ZW1wbGF0ZVwiO1xuaW1wb3J0IHR5cGUgeyBTdGF0ZSB9IGZyb20gXCJAL3N0YXRlXCI7XG5cbmV4cG9ydCBjb25zdCByZW5kZXJDaGlsZHJlbiA9IChcbiAgY2hpbGRyZW46IFRlbXBsYXRlU2NoZW1hW10sXG4gIGVsZW1lbnQ6IEVsZW1lbnQsXG4gIHN0YXRlOiBTdGF0ZSA9IHt9LFxuKSA9PiB7XG4gIGZvciAoY29uc3QgY2hpbGQgb2YgY2hpbGRyZW4pIHtcbiAgICBpZiAodHlwZW9mIGNoaWxkID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBlbGVtZW50LmlubmVySFRNTCA9IGNoaWxkO1xuICAgICAgLy9jb25zb2xlLmxvZyhjaGlsZHJlbiwgc3RhdGUpO1xuICAgIH0gZWxzZSByZW5kZXIoY2hpbGQsIGVsZW1lbnQsIHN0YXRlKTtcbiAgfVxufTtcbiIsICJpbXBvcnQgeyByZW5kZXIgfSBmcm9tIFwiQC9yZW5kZXJcIjtcbmltcG9ydCB0eXBlIHsgVGVtcGxhdGUsIFRlbXBsYXRlU2NoZW1hIH0gZnJvbSBcIkAvdGVtcGxhdGVcIjtcbmltcG9ydCB7XG4gIHR5cGUgU3RhdGUsXG4gIHR5cGUgU3RhdGVDcmVhdG9yLFxuICB0eXBlIFN0YXRlSGFuZGxlcixcbiAgdHlwZSBTdGF0ZU1hbmFnZXIsXG4gIGNyZWF0ZVN0YXRlLFxufSBmcm9tIFwiQC9zdGF0ZVwiO1xuaW1wb3J0IHsgcmVuZGVyQ2hpbGRyZW4gfSBmcm9tIFwiLi9yZW5kZXJDaGlsZHJlblwiO1xuXG50eXBlIEZhY3RvcnkgPSAocGFyYW1zPzogdW5rbm93bikgPT4gdW5rbm93bjtcblxudHlwZSBTdHlsZVBhcmFtcyA9IHtcbiAgcHJvcHM6IFN0YXRlO1xuICBzdGF0ZTogU3RhdGU7XG59O1xuXG50eXBlIENzc0hhbmRsZXIgPSAocGFyYW1zOiBTdHlsZVBhcmFtcykgPT4gdm9pZDtcblxuY29uc3QgX2NyZWF0ZVRhZ0J5RmFjdG9yeU5hbWUgPSAoZmFjdG9yeTogRmFjdG9yeSkgPT4ge1xuICByZXR1cm4gZmFjdG9yeS5uYW1lXG4gICAgLnNwbGl0KC8oPz1bQS1aXSkvKVxuICAgIC5qb2luKFwiLVwiKVxuICAgIC50b0xvd2VyQ2FzZSgpO1xufTtcblxuY29uc3QgX21lcmdlU3RhdGUgPSAoc3RhdGU6IFN0YXRlTWFuYWdlcikgPT4ge1xuICBjb25zdCBtZXJnZVN0YXRlID0gPFQ+KGluaXRpYWxTdGF0ZTogU3RhdGU8VD4pOiBTdGF0ZU1hbmFnZXIgPT4ge1xuICAgIGNvbnN0IGxhdGVzdFN0YXRlID0gc3RhdGUuZ2V0KCkgYXMgU3RhdGU8VD47XG4gICAgc3RhdGUuc2V0KHsgLi4uaW5pdGlhbFN0YXRlLCAuLi5sYXRlc3RTdGF0ZSB9KTtcblxuICAgIHJldHVybiB7IGdldDogc3RhdGUuZ2V0LCBzZXQ6IHN0YXRlLnNldCwgd2F0Y2g6IHN0YXRlLndhdGNoIH07XG4gIH07XG4gIHJldHVybiBtZXJnZVN0YXRlO1xufTtcblxuY29uc3QgX2NyZWF0ZVN0eWxlcyA9ICh7IHByb3BzLCBzdGF0ZSB9OiBTdHlsZVBhcmFtcykgPT4ge1xuICByZXR1cm4gKGNzc0hhbmRsZXI6IENzc0hhbmRsZXIpID0+IHtcbiAgICByZXR1cm4gY3NzSGFuZGxlcih7IHByb3BzLCBzdGF0ZSB9KTtcbiAgfTtcbn07XG5cbmV4cG9ydCBjb25zdCBjcmVhdGVFbGVtZW50QnlGYWN0b3J5TmFtZSA9IChcbiAgdGVtcGxhdGU6IFRlbXBsYXRlU2NoZW1hLFxuICBwYXJlbnRFbGVtZW50OiBFbGVtZW50LFxuICBsYXRlc3RTdGF0ZTogU3RhdGUgPSB7fSxcbikgPT4ge1xuICByZXR1cm4gKCkgPT4ge1xuICAgIGNvbnN0IGZhY3RvcnkgPSB0ZW1wbGF0ZS50eXBlIGFzIEZhY3Rvcnk7XG4gICAgY29uc3QgdGFnTmFtZSA9IF9jcmVhdGVUYWdCeUZhY3RvcnlOYW1lKGZhY3RvcnkpO1xuICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRhZ05hbWUpO1xuICAgIGNvbnN0IHByb3BzID0gdGVtcGxhdGUucHJvcHM7XG5cbiAgICBjb25zdCBjdXJyZW50U3RhdGUgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGxhdGVzdFN0YXRlKSk7XG4gICAgY29uc3Qgc3RhdGUgPSBjcmVhdGVTdGF0ZShjdXJyZW50U3RhdGUpO1xuICAgIGNvbnN0IHVzZVN0YXRlID0gX21lcmdlU3RhdGUoc3RhdGUpO1xuICAgIGNvbnN0IHVzZVN0eWxlcyA9IF9jcmVhdGVTdHlsZXMoeyBwcm9wcywgc3RhdGUgfSk7XG5cbiAgICBjb25zdCBjaGlsZHJlbiA9IGZhY3Rvcnkoe1xuICAgICAgcHJvcHMsXG4gICAgICB1c2VTdGF0ZSxcbiAgICAgIHVzZVN0eWxlcyxcbiAgICB9KSBhcyBUZW1wbGF0ZVNjaGVtYVtdO1xuXG4gICAgcGFyZW50RWxlbWVudC5pbnNlcnRBZGphY2VudEVsZW1lbnQoXCJiZWZvcmVlbmRcIiwgZWxlbWVudCk7XG4gICAgcmVuZGVyQ2hpbGRyZW4oY2hpbGRyZW4sIGVsZW1lbnQsIGN1cnJlbnRTdGF0ZSk7XG5cbiAgICBzdGF0ZS53YXRjaCgocGF5bG9hZCkgPT4ge1xuICAgICAgZWxlbWVudC5pbm5lckhUTUwgPSBcIlwiO1xuICAgICAgcmVuZGVyKHRlbXBsYXRlLCBlbGVtZW50LCBwYXlsb2FkKTtcbiAgICB9KTtcbiAgfTtcbn07XG4iLCAiaW1wb3J0IHsgaXNFdmVudE5hbWUgfSBmcm9tIFwiQC92YWxpZGF0b3JzXCI7XG5cbnR5cGUgQXR0cmlidXRlID0gb2JqZWN0ICYge1xuICBba2V5OiBzeW1ib2wgfCBzdHJpbmddOiB1bmtub3duO1xufTtcblxudHlwZSBFdmVudEhhbmRsZXIgPSA8SyBleHRlbmRzIGtleW9mIEhUTUxFbGVtZW50RXZlbnRNYXA+KFxuICBldmVudDogSFRNTEVsZW1lbnRFdmVudE1hcFtLXSxcbikgPT4gdm9pZDtcblxuZXhwb3J0IGNvbnN0IHNldEVsZW1lbnRBdHRyaWJ1dGVzID0gKFxuICBlbGVtZW50OiBFbGVtZW50LFxuICBhdHRyaWJ1dGVzOiBBdHRyaWJ1dGUsXG4pOiBFbGVtZW50ID0+IHtcbiAgY29uc3QgYXR0cmlidXRlS2V5cyA9IGF0dHJpYnV0ZXMgPyBPYmplY3Qua2V5cyhhdHRyaWJ1dGVzKSA6IFtdO1xuICBmb3IgKGNvbnN0IGtleSBvZiBhdHRyaWJ1dGVLZXlzKSB7XG4gICAgaWYgKCFpc0V2ZW50TmFtZShrZXkpKCkpIHtcbiAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKGtleSwgYXR0cmlidXRlc1trZXldIGFzIHN0cmluZyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGV2ZW50TmFtZSA9IGtleVxuICAgICAgICAucmVwbGFjZSgvb24vLCBcIlwiKVxuICAgICAgICAudG9Mb3dlckNhc2UoKSBhcyBrZXlvZiBIVE1MRWxlbWVudEV2ZW50TWFwO1xuICAgICAgY29uc3QgZXZlbnRIYW5kbGVyID0gYXR0cmlidXRlc1trZXldIGFzIEV2ZW50SGFuZGxlcjtcbiAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGV2ZW50SGFuZGxlcik7XG4gICAgfVxuICB9XG4gIHJldHVybiBlbGVtZW50O1xufTtcbiIsICJpbXBvcnQgdHlwZSB7IFN0YXRlIH0gZnJvbSBcIkAvc3RhdGVcIjtcbmltcG9ydCB0eXBlIHsgVGVtcGxhdGVTY2hlbWEgfSBmcm9tIFwiQC90ZW1wbGF0ZVwiO1xuaW1wb3J0IHsgc2V0RWxlbWVudEF0dHJpYnV0ZXMgfSBmcm9tIFwiLi9zZXRFbGVtZW50QXR0cmlidXRlc1wiO1xuaW1wb3J0IHsgcmVuZGVyQ2hpbGRyZW4gfSBmcm9tIFwiLi9yZW5kZXJDaGlsZHJlblwiO1xuXG5leHBvcnQgY29uc3QgY3JlYXRlRWxlbWVudEJ5VGFnTmFtZSA9XG4gICh0ZW1wbGF0ZTogVGVtcGxhdGVTY2hlbWEsIHBhcmVudEVsZW1lbnQ6IEVsZW1lbnQsIHN0YXRlOiBTdGF0ZSA9IHt9KSA9PlxuICAgICgpID0+IHtcbiAgICAgIGNvbnN0IHRhZ05hbWUgPSB0ZW1wbGF0ZS50eXBlIGFzIHN0cmluZztcbiAgICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRhZ05hbWUpO1xuICAgICAgc2V0RWxlbWVudEF0dHJpYnV0ZXMoZWxlbWVudCwgdGVtcGxhdGUucHJvcHMpO1xuXG4gICAgICBwYXJlbnRFbGVtZW50Lmluc2VydEFkamFjZW50RWxlbWVudChcImJlZm9yZWVuZFwiLCBlbGVtZW50KTtcbiAgICAgIHJlbmRlckNoaWxkcmVuKHRlbXBsYXRlLmNoaWxkcmVuLCBlbGVtZW50LCBzdGF0ZSk7XG4gICAgfTtcbiIsICJpbXBvcnQgdHlwZSB7IFRlbXBsYXRlLCBUZW1wbGF0ZVNjaGVtYSB9IGZyb20gXCJAL3RlbXBsYXRlXCI7XG5pbXBvcnQgeyByZW5kZXJUZW1wbGF0ZUFycmF5LCByZW5kZXJUZW1wbGF0ZU9iamVjdCB9IGZyb20gXCJAL2FjdGlvbnNcIjtcbmltcG9ydCB7IGlzQXJyYXksIGlzT2JqZWN0LCBpc0Z1bmN0aW9uIH0gZnJvbSBcIkAvdmFsaWRhdG9yc1wiO1xuXG50eXBlIENvbnRleHRFbGVtZW50ID0gRWxlbWVudDtcbmltcG9ydCB7IGNyZWF0ZUNoYWluIH0gZnJvbSBcIkAvZmFjdG9yaWVzXCI7XG5pbXBvcnQgeyBjcmVhdGVTdGF0ZSwgdHlwZSBTdGF0ZSB9IGZyb20gXCJAL3N0YXRlXCI7XG5cbi8vY29uc3QgZ2xvYmFsU3RhdGUgPSBjcmVhdGVTdGF0ZSh7fSk7XG5cbmV4cG9ydCBjb25zdCByZW5kZXIgPSAoXG4gIHRlbXBsYXRlOiBUZW1wbGF0ZSxcbiAgY29udGV4dDogQ29udGV4dEVsZW1lbnQgPSBkb2N1bWVudC5ib2R5LFxuICBzdGF0ZTogU3RhdGUgPSB7fSxcbik6IENvbnRleHRFbGVtZW50ID0+IHtcbiAgY29uc3QgY2hhaW4gPSBjcmVhdGVDaGFpbigpO1xuICBjb25zdCBjb21wb25lbnRFbGVtZW50ID0gY29udGV4dCB8fCBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiYm9keVwiKTtcblxuICBjaGFpbi5hZGQoe1xuICAgIHZhbGlkYXRvcjogaXNBcnJheSh0ZW1wbGF0ZSksXG4gICAgYWN0aW9uOiByZW5kZXJUZW1wbGF0ZUFycmF5KFxuICAgICAgdGVtcGxhdGUgYXMgVGVtcGxhdGVTY2hlbWFbXSxcbiAgICAgIGNvbXBvbmVudEVsZW1lbnQsXG4gICAgICBzdGF0ZSxcbiAgICApLFxuICB9KTtcblxuICBjaGFpbi5hZGQoe1xuICAgIHZhbGlkYXRvcjogaXNPYmplY3QodGVtcGxhdGUpLFxuICAgIGFjdGlvbjogcmVuZGVyVGVtcGxhdGVPYmplY3QoXG4gICAgICB0ZW1wbGF0ZSBhcyBUZW1wbGF0ZVNjaGVtYSxcbiAgICAgIGNvbXBvbmVudEVsZW1lbnQsXG4gICAgICBzdGF0ZSxcbiAgICApLFxuICB9KTtcblxuICBjaGFpbi5leGVjdXRlKCk7XG4gIHJldHVybiBjb21wb25lbnRFbGVtZW50O1xufTtcbiIsICJ2YXIgbj1mdW5jdGlvbih0LHMscixlKXt2YXIgdTtzWzBdPTA7Zm9yKHZhciBoPTE7aDxzLmxlbmd0aDtoKyspe3ZhciBwPXNbaCsrXSxhPXNbaF0/KHNbMF18PXA/MToyLHJbc1toKytdXSk6c1srK2hdOzM9PT1wP2VbMF09YTo0PT09cD9lWzFdPU9iamVjdC5hc3NpZ24oZVsxXXx8e30sYSk6NT09PXA/KGVbMV09ZVsxXXx8e30pW3NbKytoXV09YTo2PT09cD9lWzFdW3NbKytoXV0rPWErXCJcIjpwPyh1PXQuYXBwbHkoYSxuKHQsYSxyLFtcIlwiLG51bGxdKSksZS5wdXNoKHUpLGFbMF0/c1swXXw9Mjooc1toLTJdPTAsc1toXT11KSk6ZS5wdXNoKGEpfXJldHVybiBlfSx0PW5ldyBNYXA7ZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24ocyl7dmFyIHI9dC5nZXQodGhpcyk7cmV0dXJuIHJ8fChyPW5ldyBNYXAsdC5zZXQodGhpcyxyKSksKHI9bih0aGlzLHIuZ2V0KHMpfHwoci5zZXQocyxyPWZ1bmN0aW9uKG4pe2Zvcih2YXIgdCxzLHI9MSxlPVwiXCIsdT1cIlwiLGg9WzBdLHA9ZnVuY3Rpb24obil7MT09PXImJihufHwoZT1lLnJlcGxhY2UoL15cXHMqXFxuXFxzKnxcXHMqXFxuXFxzKiQvZyxcIlwiKSkpP2gucHVzaCgwLG4sZSk6Mz09PXImJihufHxlKT8oaC5wdXNoKDMsbixlKSxyPTIpOjI9PT1yJiZcIi4uLlwiPT09ZSYmbj9oLnB1c2goNCxuLDApOjI9PT1yJiZlJiYhbj9oLnB1c2goNSwwLCEwLGUpOnI+PTUmJigoZXx8IW4mJjU9PT1yKSYmKGgucHVzaChyLDAsZSxzKSxyPTYpLG4mJihoLnB1c2gocixuLDAscykscj02KSksZT1cIlwifSxhPTA7YTxuLmxlbmd0aDthKyspe2EmJigxPT09ciYmcCgpLHAoYSkpO2Zvcih2YXIgbD0wO2w8blthXS5sZW5ndGg7bCsrKXQ9blthXVtsXSwxPT09cj9cIjxcIj09PXQ/KHAoKSxoPVtoXSxyPTMpOmUrPXQ6ND09PXI/XCItLVwiPT09ZSYmXCI+XCI9PT10PyhyPTEsZT1cIlwiKTplPXQrZVswXTp1P3Q9PT11P3U9XCJcIjplKz10OidcIic9PT10fHxcIidcIj09PXQ/dT10OlwiPlwiPT09dD8ocCgpLHI9MSk6ciYmKFwiPVwiPT09dD8ocj01LHM9ZSxlPVwiXCIpOlwiL1wiPT09dCYmKHI8NXx8XCI+XCI9PT1uW2FdW2wrMV0pPyhwKCksMz09PXImJihoPWhbMF0pLHI9aCwoaD1oWzBdKS5wdXNoKDIsMCxyKSxyPTApOlwiIFwiPT09dHx8XCJcXHRcIj09PXR8fFwiXFxuXCI9PT10fHxcIlxcclwiPT09dD8ocCgpLHI9Mik6ZSs9dCksMz09PXImJlwiIS0tXCI9PT1lJiYocj00LGg9aFswXSl9cmV0dXJuIHAoKSxofShzKSksciksYXJndW1lbnRzLFtdKSkubGVuZ3RoPjE/cjpyWzBdfVxuIiwgImltcG9ydCBodG0gZnJvbSBcImh0bVwiO1xuaW1wb3J0IHR5cGUgeyBUZW1wbGF0ZSwgVGVtcGxhdGVQcm9wcywgVGVtcGxhdGVTY2hlbWEgfSBmcm9tIFwiLi90eXBlc1wiO1xuXG5jb25zdCBoeXBlcnRleHQgPSAoXG4gIHR5cGU6IHVua25vd24sXG4gIHByb3BzOiBUZW1wbGF0ZVByb3BzLFxuICAuLi5jaGlsZHJlbjogVGVtcGxhdGVTY2hlbWFbXVxuKSA9PiB7XG4gIHJldHVybiB7IHR5cGUsIHByb3BzLCBjaGlsZHJlbiB9O1xufTtcblxuY29uc3QgaHRtbCA9IGh0bS5iaW5kPFRlbXBsYXRlPihoeXBlcnRleHQpO1xuXG5leHBvcnQgeyBodG1sIH07XG5leHBvcnQgeyBodG1sIGFzIGpzeCB9O1xuZXhwb3J0IHsgaHRtbCBhcyB0c3ggfTtcbiIsICJleHBvcnQgY29uc3QgY3JlYXRlSGFzaCA9IChzdHI6IHN0cmluZyk6IHN0cmluZyA9PiB7XG4gIGxldCBoYXNoID0gNTM4MTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdHIubGVuZ3RoOyBpKyspIHtcbiAgICBoYXNoID0gKGhhc2ggKiAzMykgXiBzdHIuY2hhckNvZGVBdChpKTtcbiAgfVxuICByZXR1cm4gYGNzcy0keyhoYXNoID4+PiAwKS50b1N0cmluZygzNil9YDtcbn07XG4iLCAiY29uc3Qgc3R5bGVFbGVtZW50Q2FjaGU6IE1hcDxzdHJpbmcsIEhUTUxTdHlsZUVsZW1lbnQ+ID0gbmV3IE1hcCgpO1xuXG5leHBvcnQgY29uc3QgY3JlYXRlU3R5bGVFbGVtZW50ID0gKGNvbXBvbmVudElkOiBzdHJpbmcpOiBIVE1MU3R5bGVFbGVtZW50ID0+IHtcbiAgY29uc3Qgc3R5bGVFbGVtZW50ID0gc3R5bGVFbGVtZW50Q2FjaGUuZ2V0KGNvbXBvbmVudElkKTtcblxuICBpZiAoc3R5bGVFbGVtZW50ICE9PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gc3R5bGVFbGVtZW50O1xuICB9XG5cbiAgY29uc3Qgc3R5bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gIHN0eWxlLnNldEF0dHJpYnV0ZShcImRhdGEtY29tcG9uZW50XCIsIGNvbXBvbmVudElkKTtcbiAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzdHlsZSk7XG4gIHN0eWxlRWxlbWVudENhY2hlLnNldChjb21wb25lbnRJZCwgc3R5bGUpO1xuXG4gIHJldHVybiBzdHlsZTtcbn07XG4iLCAiY29uc3Qgc3BsaXRJbnRvUnVsZXMgPSAoY3NzOiBzdHJpbmcpOiBzdHJpbmdbXSA9PiB7XG4gIHJldHVybiBjc3NcbiAgICAuc3BsaXQoXCJ9XCIpXG4gICAgLm1hcCgocnVsZSkgPT4gcnVsZS50cmltKCkpXG4gICAgLmZpbHRlcigocnVsZSkgPT4gcnVsZS5sZW5ndGggPiAwKTtcbn07XG5cbmNvbnN0IHBhcnNlUnVsZSA9IChydWxlOiBzdHJpbmcpOiBbc3RyaW5nW10sIHN0cmluZ10gfCBudWxsID0+IHtcbiAgY29uc3QgcGFydHMgPSBydWxlLnNwbGl0KFwie1wiKS5tYXAoKHBhcnQpID0+IHBhcnQudHJpbSgpKTtcblxuICBpZiAocGFydHMubGVuZ3RoICE9PSAyKSB7XG4gICAgY29uc29sZS53YXJuKGBSZWdyYSBDU1MgaW52XHUwMEUxbGlkYSBvbWl0aWRhOiBcIiR7cnVsZX1cImApO1xuICAgIHJldHVybiBudWxsOyAvLyBSZXRvcm5hIG51bGwgcGFyYSBpbmRpY2FyIHVtYSByZWdyYSBpbnZcdTAwRTFsaWRhXG4gIH1cblxuICBjb25zdCBbc2VsZWN0b3JQYXJ0LCBkZWNsYXJhdGlvblBhcnRdID0gcGFydHM7XG5cbiAgaWYgKCFzZWxlY3RvclBhcnQgfHwgIWRlY2xhcmF0aW9uUGFydCkge1xuICAgIGNvbnNvbGUud2FybihgUmVncmEgQ1NTIGluY29tcGxldGEgb21pdGlkYTogXCIke3J1bGV9XCJgKTtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGNvbnN0IHNlbGVjdG9ycyA9IHNlbGVjdG9yUGFydC5zcGxpdChcIixcIikubWFwKChzZWxlY3RvcikgPT4gc2VsZWN0b3IudHJpbSgpKTtcbiAgY29uc3QgZGVjbGFyYXRpb25zID0gZGVjbGFyYXRpb25QYXJ0LnRyaW0oKTtcblxuICByZXR1cm4gW3NlbGVjdG9ycywgZGVjbGFyYXRpb25zXTtcbn07XG5cbmNvbnN0IHByZWZpeFNlbGVjdG9yID0gKHNlbGVjdG9yOiBzdHJpbmcsIGNsYXNzTmFtZTogc3RyaW5nKTogc3RyaW5nID0+IHtcbiAgaWYgKHNlbGVjdG9yLnN0YXJ0c1dpdGgoXCImXCIpKSB7XG4gICAgcmV0dXJuIHNlbGVjdG9yLnJlcGxhY2UoXCImXCIsIGAuJHtjbGFzc05hbWV9YCk7XG4gIH1cbiAgcmV0dXJuIGAuJHtjbGFzc05hbWV9JHtzZWxlY3Rvcn1gO1xufTtcblxuY29uc3Qgc2NvcGVSdWxlID0gKHJ1bGU6IHN0cmluZywgY2xhc3NOYW1lOiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xuICBjb25zdCBwYXJzZWRSdWxlID0gcGFyc2VSdWxlKHJ1bGUpO1xuICBpZiAoIXBhcnNlZFJ1bGUpIHtcbiAgICByZXR1cm4gXCJcIjtcbiAgfVxuXG4gIGNvbnN0IFtzZWxlY3RvcnMsIGRlY2xhcmF0aW9uc10gPSBwYXJzZWRSdWxlO1xuICBjb25zdCBzY29wZWRTZWxlY3RvcnMgPSBzZWxlY3RvcnMubWFwKChzZWxlY3RvcikgPT5cbiAgICAvLyBTdWJzdGl0dWlyIGRpcmV0YW1lbnRlIG8gc2VsZXRvciBvcmlnaW5hbCBwZWxvIGRhIGNsYXNzZSBcdTAwRkFuaWNhXG4gICAgc2VsZWN0b3Iuc3RhcnRzV2l0aChcIi5cIilcbiAgICAgID8gYC4ke2NsYXNzTmFtZX1gXG4gICAgICA6IHByZWZpeFNlbGVjdG9yKHNlbGVjdG9yLCBjbGFzc05hbWUpLFxuICApO1xuXG4gIHJldHVybiBgJHtzY29wZWRTZWxlY3RvcnMuam9pbihcIiwgXCIpfSB7ICR7ZGVjbGFyYXRpb25zfSB9XFxuYDtcbn07XG5cbmV4cG9ydCBjb25zdCBjcmVhdGVTdHlsZVNjb3BlID0gKGNsYXNzTmFtZTogc3RyaW5nLCBjc3M6IHN0cmluZyk6IHN0cmluZyA9PiB7XG4gIHJldHVybiBzcGxpdEludG9SdWxlcyhjc3MpXG4gICAgLm1hcCgocnVsZSkgPT4gc2NvcGVSdWxlKHJ1bGUsIGNsYXNzTmFtZSkpXG4gICAgLmZpbHRlcigoc2NvcGVkUnVsZSkgPT4gc2NvcGVkUnVsZS5sZW5ndGggPiAwKVxuICAgIC5qb2luKFwiXCIpOyAvLyBDZXJ0aWZpcXVlLXNlIGRlIHF1ZSBjYWRhIHJlZ3JhIGZpbmFsIGVzdFx1MDBFMSBjb3JyZXRhbWVudGUgZm9ybWF0YWRhXG59O1xuIiwgIi8vIGNzcy50c1xuXG5pbXBvcnQgeyBjcmVhdGVIYXNoIH0gZnJvbSBcIi4vY3JlYXRlSGFzaFwiO1xuaW1wb3J0IHsgY3JlYXRlU3R5bGVTY29wZSB9IGZyb20gXCIuL2NyZWF0ZVN0eWxlU2NvcGVcIjtcbmltcG9ydCB7IGNyZWF0ZVN0eWxlRWxlbWVudCB9IGZyb20gXCIuL2NyZWF0ZVN0eWxlRWxlbWVudFwiO1xuXG4vKipcbiAqIENhY2hlIHBhcmEgbWFwZWFyIG8gQ1NTIGJydXRvIHBhcmEgbm9tZXMgZGUgY2xhc3NlcyBnZXJhZGFzLlxuICovXG5jb25zdCBjc3NDYWNoZTogTWFwPHN0cmluZywgc3RyaW5nPiA9IG5ldyBNYXAoKTtcblxuLyoqXG4gKiBDYWNoZSBwYXJhIG1hcGVhciBub21lcyBkZSBjbGFzc2VzIHBhcmEgSURzIGRlIGNvbXBvbmVudGVzLlxuICovXG5jb25zdCBjbGFzc1RvQ29tcG9uZW50SWQ6IE1hcDxzdHJpbmcsIHN0cmluZz4gPSBuZXcgTWFwKCk7XG5cbi8qKlxuICogR2VyYSB1bSBpZGVudGlmaWNhZG9yIFx1MDBGQW5pY28gcGFyYSB1bSBjb21wb25lbnRlLlxuICogQHJldHVybnMgSWRlbnRpZmljYWRvciBcdTAwRkFuaWNvLlxuICovXG5jb25zdCBnZW5lcmF0ZUNvbXBvbmVudElkID0gKCk6IHN0cmluZyA9PiB7XG4gIHJldHVybiBgY29tcG9uZW50LSR7TWF0aC5yYW5kb20oKS50b1N0cmluZygzNikuc3Vic3RyaW5nKDIsIDgpfWA7XG59O1xuXG4vKipcbiAqIFRlbXBsYXRlIHRhZyBgY3NzYCBwYXJhIHByb2Nlc3NhciBDU1MgY29tIHN1cG9ydGUgYSBpbnRlcnBvbGFcdTAwRTdcdTAwRTNvIGRlIHZhcmlcdTAwRTF2ZWlzIGRpblx1MDBFMm1pY2FzLFxuICogZ2VyYXIgY2xhc3NlcyBcdTAwRkFuaWNhcywgZXNjb3BhciBlc3RpbG9zIGUgaW5qZXRhciBDU1MgZGUgZm9ybWEgb3RpbWl6YWRhLlxuICpcbiAqIEBwYXJhbSBzdHJpbmdzIFBhcnRlcyBlc3RcdTAwRTF0aWNhcyBkYSBzdHJpbmcuXG4gKiBAcGFyYW0gaW50ZXJwb2xhdGlvbnMgUGFydGVzIGRpblx1MDBFMm1pY2FzIGRhIHN0cmluZy5cbiAqIEByZXR1cm5zIE5vbWUgZGEgY2xhc3NlIGdlcmFkYS5cbiAqL1xuZXhwb3J0IGNvbnN0IGNzcyA9IChcbiAgc3RyaW5nczogVGVtcGxhdGVTdHJpbmdzQXJyYXksXG4gIC4uLmludGVycG9sYXRpb25zOiAoc3RyaW5nIHwgbnVtYmVyKVtdXG4pOiBzdHJpbmcgPT4ge1xuICAvLyBDb25jYXRlbmFyIHN0cmluZ3MgZSBpbnRlcnBvbGF0aW9ucyBwYXJhIGZvcm1hciBvIENTUyBjb21wbGV0b1xuICBjb25zdCByYXdDU1MgPSBzdHJpbmdzLnJlZHVjZSgoYWNjdW11bGF0b3IsIHN0ciwgaW5kZXgpID0+IHtcbiAgICByZXR1cm4gKFxuICAgICAgYWNjdW11bGF0b3IgK1xuICAgICAgc3RyICtcbiAgICAgIChpbnRlcnBvbGF0aW9uc1tpbmRleF0gIT09IHVuZGVmaW5lZCA/IGludGVycG9sYXRpb25zW2luZGV4XSA6IFwiXCIpXG4gICAgKTtcbiAgfSwgXCJcIik7XG5cbiAgLy8gVmVyaWZpY2Egc2UgbyBDU1Mgalx1MDBFMSBmb2kgcHJvY2Vzc2Fkb1xuICBjb25zdCBjYWNoZWRDbGFzc05hbWUgPSBjc3NDYWNoZS5nZXQocmF3Q1NTKTtcbiAgaWYgKGNhY2hlZENsYXNzTmFtZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIGNhY2hlZENsYXNzTmFtZTtcbiAgfVxuXG4gIC8vIEdlcmEgdW0gbm9tZSBkZSBjbGFzc2UgXHUwMEZBbmljbyBiYXNlYWRvIG5vIGNvbnRlXHUwMEZBZG8gZG8gQ1NTXG4gIGNvbnN0IGNsYXNzTmFtZSA9IGNyZWF0ZUhhc2gocmF3Q1NTKTtcblxuICAvLyBBc3NvY2lhIGEgY2xhc3NlIGEgdW0gY29tcG9uZW50ZVxuICBsZXQgY29tcG9uZW50SWQ6IHN0cmluZztcbiAgY29uc3QgZXhpc3RpbmdDb21wb25lbnRJZCA9IGNsYXNzVG9Db21wb25lbnRJZC5nZXQoY2xhc3NOYW1lKTtcbiAgaWYgKGV4aXN0aW5nQ29tcG9uZW50SWQgIT09IHVuZGVmaW5lZCkge1xuICAgIGNvbXBvbmVudElkID0gZXhpc3RpbmdDb21wb25lbnRJZDtcbiAgfSBlbHNlIHtcbiAgICBjb21wb25lbnRJZCA9IGdlbmVyYXRlQ29tcG9uZW50SWQoKTtcbiAgICBjbGFzc1RvQ29tcG9uZW50SWQuc2V0KGNsYXNzTmFtZSwgY29tcG9uZW50SWQpO1xuICB9XG5cbiAgLy8gRXNjb3BhIG8gQ1NTIHBhcmEgZXZpdGFyIGNvbmZsaXRvcyBkZSBlc3RpbG9zXG4gIGNvbnN0IHNjb3BlZENTUyA9IGNyZWF0ZVN0eWxlU2NvcGUoY2xhc3NOYW1lLCByYXdDU1MpO1xuXG4gIC8vIE9idFx1MDBFOW0gb3UgY3JpYSBvIGVsZW1lbnRvIDxzdHlsZT4gY29ycmVzcG9uZGVudGUgYW8gY29tcG9uZW50ZVxuICBjb25zdCBzdHlsZUVsZW1lbnQgPSBjcmVhdGVTdHlsZUVsZW1lbnQoY29tcG9uZW50SWQpO1xuXG4gIC8vIFZlcmlmaWNhIHNlIGEgcmVncmEgQ1NTIGVzY29wYWRhIGpcdTAwRTEgZm9pIGluc2VyaWRhIG5vIGVsZW1lbnRvIDxzdHlsZT5cbiAgaWYgKCFzdHlsZUVsZW1lbnQuaW5uZXJIVE1MLmluY2x1ZGVzKHNjb3BlZENTUykpIHtcbiAgICBzdHlsZUVsZW1lbnQuaW5uZXJIVE1MICs9IHNjb3BlZENTUztcbiAgfVxuXG4gIC8vIEFybWF6ZW5hIG8gbWFwZWFtZW50byBubyBjYWNoZSBwYXJhIHJldXRpbGl6YVx1MDBFN1x1MDBFM28gZnV0dXJhXG4gIGNzc0NhY2hlLnNldChyYXdDU1MsIGNsYXNzTmFtZSk7XG5cbiAgcmV0dXJuIGNsYXNzTmFtZTtcbn07XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7O0FBT08sSUFBTSxZQUFZLDZCQUFtQjtBQUMxQyxNQUFJO0FBRUosUUFBTSxRQUFRLHdCQUFDLGFBQTZCO0FBQzFDLGVBQVcsU0FBUztBQUNwQixXQUFPLFNBQVM7QUFBQSxFQUNsQixHQUhjO0FBS2QsUUFBTSxRQUFRLHdCQUFDLGFBQThCO0FBQzNDLFdBQU8sU0FBUyxRQUFRO0FBQUEsRUFDMUIsR0FGYztBQUlkLFFBQU0sVUFBVSx3QkFBQyxhQUE4QjtBQUM3QyxXQUFPLFNBQVMsUUFBUTtBQUFBLEVBQzFCLEdBRmdCO0FBSWhCLFNBQU8sRUFBRSxPQUFPLE9BQU8sUUFBUTtBQUNqQyxHQWpCeUI7OztBQ0x6QixJQUFNLGNBQWMsNkJBQWMsS0FBSyxPQUFPLEVBQUUsU0FBUyxFQUFFLEVBQUUsVUFBVSxHQUFHLEVBQUUsR0FBeEQ7QUFFYixJQUFNLGNBQWMsd0JBQUksaUJBQTRDO0FBQ3pFLFFBQU0sU0FBUyxLQUFLLE1BQU0sS0FBSyxVQUFVLFlBQVksQ0FBQztBQUN0RCxRQUFNLFlBQVksb0JBQUksSUFBa0I7QUFDeEMsUUFBTSxNQUF3QixZQUFZO0FBRTFDLFFBQU0sa0JBQWtCLHdCQUFDLFlBQXNCO0FBQzdDLGVBQVcsZ0JBQWdCLFdBQVc7QUFDcEMsbUJBQWdCLE9BQU87QUFBQSxJQUN6QjtBQUFBLEVBQ0YsR0FKd0I7QUFNeEIsUUFBTSxNQUFNLHdCQUFD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O0FBQUUsV0FBUSxJQUFFLEdBQUUsSUFBRSxFQUFFLFFBQU8sS0FBSTtBQUFDLFFBQUksSUFBRSxFQUFFLEdBQUcsR0FBRSxJQUFFLEVBQUUsQ0FBQyxLQUFHLEVBQUUsQ0FBQyxLQUFHLElBQUUsSUFBRSxHQUFFLEVBQUUsRUFBRSxHQUFHLENBQUMsS0FBRyxFQUFFLEVBQUUsQ0FBQztBQUFFLFVBQUksSUFBRSxFQUFFLENBQUMsSUFBRSxJQUFFLE1BQUksSUFBRSxFQUFFLENBQUMsSUFBRSxPQUFPLE9BQU8sRUFBRSxDQUFDLEtBQUcsQ0FBQyxHQUFFLENBQUMsSUFBRSxNQUFJLEtBQUcsRUFBRSxDQUFDLElBQUUsRUFBRSxDQUFDLEtBQUcsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUMsSUFBRSxJQUFFLE1BQUksSUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDLEtBQUcsSUFBRSxLQUFHLEtBQUcsSUFBRUEsR0FBRSxNQUFNLEdBQUUsRUFBRUEsSUFBRSxHQUFFLEdBQUUsQ0FBQyxJQUFHLElBQUksQ0FBQyxDQUFDLEdBQUUsRUFBRSxLQUFLLENBQUMsR0FBRSxFQUFFLENBQUMsSUFBRSxFQUFFLENBQUMsS0FBRyxLQUFHLEVBQUUsSUFBRSxDQUFDLElBQUUsR0FBRSxFQUFFLENBQUMsSUFBRSxNQUFJLEVBQUUsS0FBSyxDQUFDO0FBQUEsRUFBQztBQUFDLFNBQU87QUFBQyxHQUF4VCxNQUEwVCxJQUFFLG9CQUFJO0FBQW1CLFNBQVIsbUJBQWlCLEdBQUU7QUFBQyxNQUFJLElBQUUsRUFBRSxJQUFJLElBQUk7QUFBRSxTQUFPLE1BQUksSUFBRSxvQkFBSSxPQUFJLEVBQUUsSUFBSSxNQUFLLENBQUMsS0FBSSxJQUFFLEVBQUUsTUFBSyxFQUFFLElBQUksQ0FBQyxNQUFJLEVBQUUsSUFBSSxHQUFFLElBQUUsU0FBU0MsSUFBRTtBQUFDLGFBQVFELElBQUVFLElBQUVDLEtBQUUsR0FBRSxJQUFFLElBQUcsSUFBRSxJQUFHLElBQUUsQ0FBQyxDQUFDLEdBQUUsSUFBRSxTQUFTRixJQUFFO0FBQUMsWUFBSUUsT0FBSUYsT0FBSSxJQUFFLEVBQUUsUUFBUSx3QkFBdUIsRUFBRSxNQUFJLEVBQUUsS0FBSyxHQUFFQSxJQUFFLENBQUMsSUFBRSxNQUFJRSxPQUFJRixNQUFHLE1BQUksRUFBRSxLQUFLLEdBQUVBLElBQUUsQ0FBQyxHQUFFRSxLQUFFLEtBQUcsTUFBSUEsTUFBRyxVQUFRLEtBQUdGLEtBQUUsRUFBRSxLQUFLLEdBQUVBLElBQUUsQ0FBQyxJQUFFLE1BQUlFLE1BQUcsS0FBRyxDQUFDRixLQUFFLEVBQUUsS0FBSyxHQUFFLEdBQUUsTUFBRyxDQUFDLElBQUVFLE1BQUcsT0FBSyxLQUFHLENBQUNGLE1BQUcsTUFBSUUsUUFBSyxFQUFFLEtBQUtBLElBQUUsR0FBRSxHQUFFRCxFQUFDLEdBQUVDLEtBQUUsSUFBR0YsT0FBSSxFQUFFLEtBQUtFLElBQUVGLElBQUUsR0FBRUMsRUFBQyxHQUFFQyxLQUFFLEtBQUksSUFBRTtBQUFBLElBQUUsR0FBRSxJQUFFLEdBQUUsSUFBRUYsR0FBRSxRQUFPLEtBQUk7QUFBQyxZQUFJLE1BQUlFLE1BQUcsRUFBRSxHQUFFLEVBQUUsQ0FBQztBQUFHLGVBQVEsSUFBRSxHQUFFLElBQUVGLEdBQUUsQ0FBQyxFQUFFLFFBQU8sSUFBSSxDQUFBRCxLQUFFQyxHQUFFLENBQUMsRUFBRSxDQUFDLEdBQUUsTUFBSUUsS0FBRSxRQUFNSCxNQUFHLEVBQUUsR0FBRSxJQUFFLENBQUMsQ0FBQyxHQUFFRyxLQUFFLEtBQUcsS0FBR0gsS0FBRSxNQUFJRyxLQUFFLFNBQU8sS0FBRyxRQUFNSCxNQUFHRyxLQUFFLEdBQUUsSUFBRSxNQUFJLElBQUVILEtBQUUsRUFBRSxDQUFDLElBQUUsSUFBRUEsT0FBSSxJQUFFLElBQUUsS0FBRyxLQUFHQSxLQUFFLFFBQU1BLE1BQUcsUUFBTUEsS0FBRSxJQUFFQSxLQUFFLFFBQU1BLE1BQUcsRUFBRSxHQUFFRyxLQUFFLEtBQUdBLE9BQUksUUFBTUgsTUFBR0csS0FBRSxHQUFFRCxLQUFFLEdBQUUsSUFBRSxNQUFJLFFBQU1GLE9BQUlHLEtBQUUsS0FBRyxRQUFNRixHQUFFLENBQUMsRUFBRSxJQUFFLENBQUMsTUFBSSxFQUFFLEdBQUUsTUFBSUUsT0FBSSxJQUFFLEVBQUUsQ0FBQyxJQUFHQSxLQUFFLElBQUcsSUFBRSxFQUFFLENBQUMsR0FBRyxLQUFLLEdBQUUsR0FBRUEsRUFBQyxHQUFFQSxLQUFFLEtBQUcsUUFBTUgsTUFBRyxRQUFPQSxNQUFHLFNBQU9BLE1BQUcsU0FBT0EsTUFBRyxFQUFFLEdBQUVHLEtBQUUsS0FBRyxLQUFHSCxLQUFHLE1BQUlHLE1BQUcsVUFBUSxNQUFJQSxLQUFFLEdBQUUsSUFBRSxFQUFFLENBQUM7QUFBQSxJQUFFO0FBQUMsV0FBTyxFQUFFLEdBQUU7QUFBQSxFQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUUsSUFBRyxXQUFVLENBQUMsQ0FBQyxHQUFHLFNBQU8sSUFBRSxJQUFFLEVBQUUsQ0FBQztBQUFDO0FBQXAyQjs7O0FDR2pWLElBQU0sWUFBWSx3QkFDaEIsTUFDQSxVQUNHLGFBQ0E7QUFDSCxTQUFPLEVBQUUsTUFBTSxPQUFPLFNBQVM7QUFDakMsR0FOa0I7QUFRbEIsSUFBTSxPQUFPLG1CQUFJLEtBQWUsU0FBUzs7O0FDWGxDLElBQU0sYUFBYSx3QkFBQyxRQUF3QjtBQUNqRCxNQUFJLE9BQU87QUFDWCxXQUFTLElBQUksR0FBRyxJQUFJLElBQUksUUFBUSxLQUFLO0FBQ25DLFdBQVEsT0FBTyxLQUFNLElBQUksV0FBVyxDQUFDO0FBQUEsRUFDdkM7QUFDQSxTQUFPLFFBQVEsU0FBUyxHQUFHLFNBQVMsRUFBRSxDQUFDO0FBQ3pDLEdBTjBCOzs7QUNBMUIsSUFBTSxvQkFBbUQsb0JBQUksSUFBSTtBQUUxRCxJQUFNLHFCQUFxQix3QkFBQyxnQkFBMEM7QUFDM0UsUUFBTSxlQUFlLGtCQUFrQixJQUFJLFdBQVc7QUFFdEQsTUFBSSxpQkFBaUIsUUFBVztBQUM5QixXQUFPO0FBQUEsRUFDVDtBQUVBLFFBQU0sUUFBUSxTQUFTLGNBQWMsT0FBTztBQUM1QyxRQUFNLGFBQWEsa0JBQWtCLFdBQVc7QUFDaEQsV0FBUyxLQUFLLFlBQVksS0FBSztBQUMvQixvQkFBa0IsSUFBSSxhQUFhLEtBQUs7QUFFeEMsU0FBTztBQUNULEdBYmtDOzs7QUNGbEMsSUFBTSxpQkFBaUIsd0JBQUNDLFNBQTBCO0FBQ2hELFNBQU9BLEtBQ0osTUFBTSxHQUFHLEVBQ1QsSUFBSSxDQUFDLFNBQVMsS0FBSyxLQUFLLENBQUMsRUFDekIsT0FBTyxDQUFDLFNBQVMsS0FBSyxTQUFTLENBQUM7QUFDckMsR0FMdUI7QUFPdkIsSUFBTSxZQUFZLHdCQUFDLFNBQTRDO0FBQzdELFFBQU0sUUFBUSxLQUFLLE1BQU0sR0FBRyxFQUFFLElBQUksQ0FBQyxTQUFTLEtBQUssS0FBSyxDQUFDO0FBRXZELE1BQUksTUFBTSxXQUFXLEdBQUc7QUFDdEIsWUFBUSxLQUFLLG1DQUFnQyxJQUFJLEdBQUc7QUFDcEQsV0FBTztBQUFBLEVBQ1Q7QUFFQSxRQUFNLENBQUMsY0FBYyxlQUFlLElBQUk7QUFFeEMsTUFBSSxDQUFDLGdCQUFnQixDQUFDLGlCQUFpQjtBQUNyQyxZQUFRLEtBQUssa0NBQWtDLElBQUksR0FBRztBQUN0RCxXQUFPO0FBQUEsRUFDVDtBQUVBLFFBQU0sWUFBWSxhQUFhLE1BQU0sR0FBRyxFQUFFLElBQUksQ0FBQyxhQUFhLFNBQVMsS0FBSyxDQUFDO0FBQzNFLFFBQU0sZUFBZSxnQkFBZ0IsS0FBSztBQUUxQyxTQUFPLENBQUMsV0FBVyxZQUFZO0FBQ2pDLEdBbkJrQjtBQXFCbEIsSUFBTSxpQkFBaUIsd0JBQUMsVUFBa0IsY0FBOEI7QUFDdEUsTUFBSSxTQUFTLFdBQVcsR0FBRyxHQUFHO0FBQzVCLFdBQU8sU0FBUyxRQUFRLEtBQUssSUFBSSxTQUFTLEVBQUU7QUFBQSxFQUM5QztBQUNBLFNBQU8sSUFBSSxTQUFTLEdBQUcsUUFBUTtBQUNqQyxHQUx1QjtBQU92QixJQUFNLFlBQVksd0JBQUMsTUFBYyxjQUE4QjtBQUM3RCxRQUFNLGFBQWEsVUFBVSxJQUFJO0FBQ2pDLE1BQUksQ0FBQyxZQUFZO0FBQ2YsV0FBTztBQUFBLEVBQ1Q7QUFFQSxRQUFNLENBQUMsV0FBVyxZQUFZLElBQUk7QUFDbEMsUUFBTSxrQkFBa0IsVUFBVTtBQUFBLElBQUksQ0FBQztBQUFBO0FBQUEsTUFFckMsU0FBUyxXQUFXLEdBQUcsSUFDbkIsSUFBSSxTQUFTLEtBQ2IsZUFBZSxVQUFVLFNBQVM7QUFBQTtBQUFBLEVBQ3hDO0FBRUEsU0FBTyxHQUFHLGdCQUFnQixLQUFLLElBQUksQ0FBQyxNQUFNLFlBQVk7QUFBQTtBQUN4RCxHQWZrQjtBQWlCWCxJQUFNLG1CQUFtQix3QkFBQyxXQUFtQkEsU0FBd0I7QUFDMUUsU0FBTyxlQUFlQSxJQUFHLEVBQ3RCLElBQUksQ0FBQyxTQUFTLFVBQVUsTUFBTSxTQUFTLENBQUMsRUFDeEMsT0FBTyxDQUFDLGVBQWUsV0FBVyxTQUFTLENBQUMsRUFDNUMsS0FBSyxFQUFFO0FBQ1osR0FMZ0M7OztBQzNDaEMsSUFBTSxXQUFnQyxvQkFBSSxJQUFJO0FBSzlDLElBQU0scUJBQTBDLG9CQUFJLElBQUk7QUFNeEQsSUFBTSxzQkFBc0IsNkJBQWM7QUFDeEMsU0FBTyxhQUFhLEtBQUssT0FBTyxFQUFFLFNBQVMsRUFBRSxFQUFFLFVBQVUsR0FBRyxDQUFDLENBQUM7QUFDaEUsR0FGNEI7QUFZckIsSUFBTSxNQUFNLHdCQUNqQixZQUNHLG1CQUNRO0FBRVgsUUFBTSxTQUFTLFFBQVEsT0FBTyxDQUFDLGFBQWEsS0FBSyxVQUFVO0FBQ3pELFdBQ0UsY0FDQSxPQUNDLGVBQWUsS0FBSyxNQUFNLFNBQVksZUFBZSxLQUFLLElBQUk7QUFBQSxFQUVuRSxHQUFHLEVBQUU7QUFHTCxRQUFNLGtCQUFrQixTQUFTLElBQUksTUFBTTtBQUMzQyxNQUFJLG9CQUFvQixRQUFXO0FBQ2pDLFdBQU87QUFBQSxFQUNUO0FBR0EsUUFBTSxZQUFZLFdBQVcsTUFBTTtBQUduQyxNQUFJO0FBQ0osUUFBTSxzQkFBc0IsbUJBQW1CLElBQUksU0FBUztBQUM1RCxNQUFJLHdCQUF3QixRQUFXO0FBQ3JDLGtCQUFjO0FBQUEsRUFDaEIsT0FBTztBQUNMLGtCQUFjLG9CQUFvQjtBQUNsQyx1QkFBbUIsSUFBSSxXQUFXLFdBQVc7QUFBQSxFQUMvQztBQUdBLFFBQU0sWUFBWSxpQkFBaUIsV0FBVyxNQUFNO0FBR3BELFFBQU0sZUFBZSxtQkFBbUIsV0FBVztBQUduRCxNQUFJLENBQUMsYUFBYSxVQUFVLFNBQVMsU0FBUyxHQUFHO0FBQy9DLGlCQUFhLGFBQWE7QUFBQSxFQUM1QjtBQUdBLFdBQVMsSUFBSSxRQUFRLFNBQVM7QUFFOUIsU0FBTztBQUNULEdBL0NtQjsiLAogICJuYW1lcyI6IFsicmVuZGVyQ2hpbGRyZW4iLCAicmVuZGVyQ2hpbGRyZW4iLCAic2V0RWxlbWVudEF0dHJpYnV0ZXMiLCAic2V0RWxlbWVudEF0dHJpYnV0ZXMiLCAicmVuZGVyQ2hpbGRyZW4iLCAidCIsICJuIiwgInMiLCAiciIsICJjc3MiXQp9Cg==
