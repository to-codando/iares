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
var isTemplateData = /* @__PURE__ */ __name((payload) => () => {
  return typeof payload === "string" || typeof payload === "number";
}, "isTemplateData");

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
var renderChildren = /* @__PURE__ */ __name((children, parentElement, state = {}) => {
  parentElement.innerHTML = "";
  if (!Array.isArray(children) && typeof children === "object") {
    render(children, parentElement, state);
    return;
  }
  for (const child of children) {
    render(child, parentElement, state);
  }
}, "renderChildren");

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
var createHash = /* @__PURE__ */ __name((text, selector) => {
  let hash = 5381;
  for (let i = 0; i < text.length; i++) {
    hash = hash * 33 ^ text.charCodeAt(i);
  }
  return `${selector}-${(hash >>> 0).toString(36)}`;
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

// src/style/cssParser.ts
var wrapLooseRulesOutsideMediaQuery = /* @__PURE__ */ __name(({
  style,
  selector
}) => {
  const lines = style.split("\n");
  const ruleRegex = /^\s*([\w-]+)\s*:\s*[^;]+;/;
  const initialState = {
    insideBlock: 0,
    globalRules: "",
    result: ""
  };
  const processGlobalRules = /* @__PURE__ */ __name((globalRules2, result2, selector2) => ({
    globalRules: "",
    result: `${result2}${selector2} {
${globalRules2}}

`
  }), "processGlobalRules");
  const processRegularLine = /* @__PURE__ */ __name((line, result2) => ({
    globalRules: "",
    result: `${result2}${line}
`
  }), "processRegularLine");
  const addGlobalRule = /* @__PURE__ */ __name((line, globalRules2) => ({
    globalRules: `${globalRules2}${line}
`,
    result: ""
  }), "addGlobalRule");
  const countBlocks = /* @__PURE__ */ __name((line) => {
    const openings = (line.match(/{/g) || []).length;
    const closings = (line.match(/}/g) || []).length;
    return openings - closings;
  }, "countBlocks");
  const processLine = /* @__PURE__ */ __name((acc, line) => {
    acc.insideBlock += countBlocks(line);
    if (acc.insideBlock === 0 && ruleRegex.test(line)) {
      const { globalRules: globalRules3, result: result3 } = addGlobalRule(line, acc.globalRules);
      return { ...acc, globalRules: globalRules3, result: acc.result + result3 };
    }
    if (acc.globalRules) {
      const { globalRules: globalRules3, result: result3 } = processGlobalRules(
        acc.globalRules,
        acc.result,
        selector
      );
      const processedLine = processRegularLine(line, "");
      return {
        ...acc,
        globalRules: globalRules3,
        result: result3 + processedLine.result
      };
    }
    const { globalRules: globalRules2, result: result2 } = processRegularLine(line, acc.result);
    return { ...acc, globalRules: globalRules2, result: result2 };
  }, "processLine");
  const { result, globalRules } = lines.reduce(processLine, initialState);
  return globalRules ? `${result}${selector} {
${globalRules}}
`.trim() : result.trim();
}, "wrapLooseRulesOutsideMediaQuery");
var wrapLooseRulesInsideMediaQuery = /* @__PURE__ */ __name(({
  style,
  selector
}) => {
  const regex = /@media\s*([^{]+)\s*\{([\s\S]*?)\}/g;
  const ruleRegex = /^\s*([\w-]+)\s*:\s*[^;]+;/;
  return style.replace(regex, (match, mediaQuery, innerCss) => {
    const rules = innerCss.trim().split("\n").map((line) => line.trim()).filter((line) => line);
    const wrappedRules = rules.filter((rule) => ruleRegex.test(rule)).map((rule) => `${selector} {
${rule.trim()}
}`).join("\n");
    return `@media ${mediaQuery.trim()} {
${wrappedRules}
}`;
  });
}, "wrapLooseRulesInsideMediaQuery");
var applyClassNameScope = /* @__PURE__ */ __name(({ style, selector }) => {
  const regex = /\.(\w+)/g;
  return style.replace(regex, `.${selector}_$1`);
}, "applyClassNameScope");
var transformStyle = /* @__PURE__ */ __name((rawStyle, selector) => {
  let style = rawStyle;
  const className = `.${selector}`;
  style = applyClassNameScope({ style, selector });
  style = wrapLooseRulesOutsideMediaQuery({ style, selector: className });
  style = wrapLooseRulesInsideMediaQuery({ style, selector: className });
  return style;
}, "transformStyle");

// src/style/css.ts
var cssCache = /* @__PURE__ */ new Map();
var css = /* @__PURE__ */ __name((selector, handler = () => {
}) => (strings, ...interpolations) => {
  const rawCSS = strings.reduce(
    (accumulator, str, index) => `${accumulator}${str}${interpolations[index] !== void 0 ? interpolations[index] : ""}`,
    ""
  );
  const cachedClassName = cssCache.get(rawCSS);
  if (cachedClassName !== void 0) {
    return cachedClassName;
  }
  const hashId = createHash(rawCSS, selector);
  const scopedStyle = transformStyle(rawCSS, `${hashId}`);
  const styleElement = createStyleElement(`${hashId}`);
  handler({ hashId, scopedStyle, styleElement });
  if (!styleElement.innerHTML.includes(scopedStyle)) {
    styleElement.innerHTML += scopedStyle;
  }
  cssCache.set(rawCSS, hashId);
  return hashId;
}, "css");

// src/actions/template/setElementAttributes.ts
var setElementAttributes = /* @__PURE__ */ __name((element, attributes) => {
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

// src/actions/template/createElementByFactoryName.ts
var _attributes = {};
var _createTagByFactoryName = /* @__PURE__ */ __name((factory) => {
  return factory.name.split(/(?=[A-Z])/).join("-").toLowerCase();
}, "_createTagByFactoryName");
var _createUseState = /* @__PURE__ */ __name((state) => {
  const currentState = {};
  const useState = /* @__PURE__ */ __name((initialState) => {
    const latestState = state.get();
    state.set({ ...initialState, ...latestState });
    Object.assign(currentState, state.get());
    return { get: state.get, set: state.set, watch: state.watch };
  }, "useState");
  return { currentState, useState };
}, "_createUseState");
var _createUseStyle = /* @__PURE__ */ __name(({ props, state, css: css2 }) => {
  const stylesheet = {};
  const useStyle = /* @__PURE__ */ __name((cssHandlerFactory) => {
    const handlers = cssHandlerFactory();
    const styles = {};
    for (const key in handlers) {
      const handler = handlers[key];
      const style = handler({ props, state, css: css2 });
      styles[key] = style;
    }
    Object.assign(stylesheet, styles);
    return styles;
  }, "useStyle");
  return { styles: stylesheet, useStyle };
}, "_createUseStyle");
var _createUseTemplate = /* @__PURE__ */ __name((params) => {
  const useTemplate = /* @__PURE__ */ __name((templateHandler, templateInjections) => {
    return templateHandler(params, templateInjections);
  }, "useTemplate");
  return useTemplate;
}, "_createUseTemplate");
var _createUseAction = /* @__PURE__ */ __name(({ props, state }) => {
  const actions = {};
  const useAction = /* @__PURE__ */ __name((actionHandlerFactory) => {
    const handlerActions = actionHandlerFactory({ props, state });
    Object.assign(actions, handlerActions);
  }, "useAction");
  return { actions, useAction };
}, "_createUseAction");
var createElementByFactoryName = /* @__PURE__ */ __name((template, parentElement, latestState = {}) => {
  return () => {
    const factory = template.type;
    const tagName = _createTagByFactoryName(factory);
    const selector = tagName.toLowerCase();
    const element = document.createElement(tagName);
    const props = template.props;
    const latestDeepState = JSON.parse(JSON.stringify(latestState));
    const stateManager = createState(latestDeepState);
    const { currentState: state, useState } = _createUseState(stateManager);
    const styled = css(selector, ({ hashId }) => {
      element.classList.add(hashId);
      Object.assign(_attributes, { class: hashId });
    });
    const { styles, useStyle } = _createUseStyle({ props, state, css: styled });
    const { actions, useAction } = _createUseAction({
      props,
      state: stateManager
    });
    const useTemplate = _createUseTemplate({
      props,
      state,
      html,
      jsx: html,
      tsx: html,
      styles,
      actions
    });
    const children = factory({
      props,
      useState,
      useStyle,
      useTemplate,
      useAction
    });
    const oldElement = parentElement.querySelector(selector);
    setElementAttributes(element, _attributes);
    oldElement ? oldElement.replaceWith(element) : parentElement.insertAdjacentElement("beforeend", element);
    renderChildren(children, element, state);
    stateManager.watch((payload) => {
      element.innerHTML = "";
      render(template, parentElement, payload);
    });
  };
}, "createElementByFactoryName");

// src/actions/template/createElementByTagName.ts
var createElementByTagName = /* @__PURE__ */ __name((template, parentElement, state = {}) => () => {
  const tagName = template.type;
  const selector = tagName.toLowerCase();
  const element = document.createElement(tagName);
  const hashId = parentElement.getAttribute("class");
  const className = template?.props?.class;
  if (className) {
    if (!className.includes(hashId)) {
      const newClassName = `${hashId}_${className}`;
      setElementAttributes(element, { class: newClassName });
      parentElement.insertAdjacentElement("beforeend", element);
      renderChildren(template.children, element, state);
      return;
    }
  }
  setElementAttributes(element, template.props);
  parentElement.insertAdjacentElement("beforeend", element);
  renderChildren(template.children, element, state);
}, "createElementByTagName");

// src/actions/template/renderTemplateData.ts
var renderTemplateData = /* @__PURE__ */ __name((templateData, element, state = {}) => () => {
  if (typeof templateData === "string") {
    element.insertAdjacentHTML("beforeend", templateData);
  }
  if (typeof templateData === "number") {
    const data = Number(templateData);
    const value = data.toString();
    element.insertAdjacentHTML("beforeend", value);
  }
}, "renderTemplateData");

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
  chain.add({
    validator: isTemplateData(template),
    action: renderTemplateData(template, componentElement, state)
  });
  chain.execute();
  return componentElement;
}, "render");
export {
  CreateApp,
  createState,
  css,
  html,
  html as jsx,
  render,
  html as tsx
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vc3JjL0NyZWF0ZUFwcC9DcmVhdGVBcHAudHMiLCAiLi4vLi4vc3JjL3N0YXRlL2NyZWF0ZVN0YXRlLnRzIiwgIi4uLy4uL3NyYy9mYWN0b3JpZXMvY3JlYXRlQ2hhaW4vaW5kZXgudHMiLCAiLi4vLi4vc3JjL3V0aWxzL2luZGV4LnRzIiwgIi4uLy4uL3NyYy92YWxpZGF0b3JzL3RlbXBsYXRlL2luZGV4LnRzIiwgIi4uLy4uL3NyYy9hY3Rpb25zL3RlbXBsYXRlL3JlbmRlclRlbXBsYXRlT2JqZWN0LnRzIiwgIi4uLy4uL3NyYy9hY3Rpb25zL3RlbXBsYXRlL3JlbmRlclRlbXBsYXRlQXJyYXkudHMiLCAiLi4vLi4vc3JjL2FjdGlvbnMvdGVtcGxhdGUvcmVuZGVyQ2hpbGRyZW4udHMiLCAiLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL2h0bUAzLjEuMS9ub2RlX21vZHVsZXMvaHRtL2Rpc3QvaHRtLm1vZHVsZS5qcyIsICIuLi8uLi9zcmMvdGVtcGxhdGUvaHRtbC50cyIsICIuLi8uLi9zcmMvc3R5bGUvY3JlYXRlSGFzaC50cyIsICIuLi8uLi9zcmMvc3R5bGUvY3JlYXRlU3R5bGVFbGVtZW50LnRzIiwgIi4uLy4uL3NyYy9zdHlsZS9jc3NQYXJzZXIudHMiLCAiLi4vLi4vc3JjL3N0eWxlL2Nzcy50cyIsICIuLi8uLi9zcmMvYWN0aW9ucy90ZW1wbGF0ZS9zZXRFbGVtZW50QXR0cmlidXRlcy50cyIsICIuLi8uLi9zcmMvYWN0aW9ucy90ZW1wbGF0ZS9jcmVhdGVFbGVtZW50QnlGYWN0b3J5TmFtZS50cyIsICIuLi8uLi9zcmMvYWN0aW9ucy90ZW1wbGF0ZS9jcmVhdGVFbGVtZW50QnlUYWdOYW1lLnRzIiwgIi4uLy4uL3NyYy9hY3Rpb25zL3RlbXBsYXRlL3JlbmRlclRlbXBsYXRlRGF0YS50cyIsICIuLi8uLi9zcmMvcmVuZGVyL2luZGV4LnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgdHlwZSB7XG4gIEFwcGxpY2F0aW9uLFxuICBDb250ZXh0RWxlbWVudCxcbiAgQ29udGV4dEhhbmRsZXIsXG4gIENhbGxiYWNrSGFuZGxlcixcbn0gZnJvbSBcIi4vdHlwZXNcIjtcblxuZXhwb3J0IGNvbnN0IENyZWF0ZUFwcCA9ICgpOiBBcHBsaWNhdGlvbiA9PiB7XG4gIGxldCBfZWxlbWVudCE6IENvbnRleHRFbGVtZW50O1xuXG4gIGNvbnN0IHNldHVwID0gKGNhbGxiYWNrOiBDb250ZXh0SGFuZGxlcikgPT4ge1xuICAgIF9lbGVtZW50ID0gY2FsbGJhY2soKTtcbiAgICByZXR1cm4gY2FsbGJhY2soKTtcbiAgfTtcblxuICBjb25zdCBtb3VudCA9IChjYWxsYmFjazogQ2FsbGJhY2tIYW5kbGVyKSA9PiB7XG4gICAgcmV0dXJuIGNhbGxiYWNrKF9lbGVtZW50KTtcbiAgfTtcblxuICBjb25zdCB1bm1vdW50ID0gKGNhbGxiYWNrOiBDYWxsYmFja0hhbmRsZXIpID0+IHtcbiAgICByZXR1cm4gY2FsbGJhY2soX2VsZW1lbnQpO1xuICB9O1xuXG4gIHJldHVybiB7IHNldHVwLCBtb3VudCwgdW5tb3VudCB9O1xufTtcbiIsICJpbXBvcnQgdHlwZSB7IFN0YXRlV2F0Y2hlciwgU3RhdGUsIFN0YXRlTWFuYWdlciB9IGZyb20gXCIuL3R5cGVzXCI7XG5cbmNvbnN0IF9jcmVhdGVVVUlEID0gKCk6IHN0cmluZyA9PiBNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKDM2KS5zdWJzdHJpbmcoMiwgMTEpO1xuXG5leHBvcnQgY29uc3QgY3JlYXRlU3RhdGUgPSA8UyA9IHVua25vd24+KFxuICBpbml0aWFsU3RhdGU6IFN0YXRlPFM+LFxuKTogU3RhdGVNYW5hZ2VyPFM+ID0+IHtcbiAgY29uc3QgX3N0YXRlID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShpbml0aWFsU3RhdGUpKTtcbiAgY29uc3QgX3dhdGNoZXJzID0gbmV3IFNldDxTdGF0ZVdhdGNoZXI8Uz4+KCk7XG5cbiAgY29uc3QgX25vdGlmeUhhbmRsZXJzID0gKHBheWxvYWQ6IFN0YXRlPFM+KSA9PiB7XG4gICAgZm9yIChjb25zdCBzdGF0ZVdhdGNoZXIgb2YgX3dhdGNoZXJzKSB7XG4gICAgICBzdGF0ZVdhdGNoZXIocGF5bG9hZCk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IHNldCA9IChwYXlsb2FkOiBTdGF0ZTxTPikgPT4ge1xuICAgIE9iamVjdC5hc3NpZ24oX3N0YXRlLCBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHBheWxvYWQpKSk7XG4gICAgX25vdGlmeUhhbmRsZXJzKEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoX3N0YXRlKSkpO1xuICB9O1xuXG4gIGNvbnN0IGdldCA9ICgpOiBTdGF0ZTxTPiA9PiB7XG4gICAgcmV0dXJuIEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoX3N0YXRlKSk7XG4gIH07XG5cbiAgY29uc3Qgd2F0Y2ggPSAoY2FsbGJhY2s6IFN0YXRlV2F0Y2hlcjxTPikgPT4ge1xuICAgIF93YXRjaGVycy5hZGQoY2FsbGJhY2spO1xuICB9O1xuXG4gIHJldHVybiB7IHNldCwgZ2V0LCB3YXRjaCB9O1xufTtcbiIsICJpbXBvcnQgdHlwZSB7IENoYWluTGluayB9IGZyb20gXCIuL3R5cGVzXCI7XG5cbmV4cG9ydCBjb25zdCBjcmVhdGVDaGFpbiA9ICgpID0+IHtcbiAgY29uc3QgX2NoYWluID0gbmV3IFNldDxDaGFpbkxpbms8dW5rbm93bj4+KCk7XG5cbiAgY29uc3QgYWRkID0gPFQ+KGNoYWluTGluazogQ2hhaW5MaW5rPFQ+KSA9PiB7XG4gICAgX2NoYWluLmFkZChjaGFpbkxpbmspO1xuICB9O1xuXG4gIGNvbnN0IGV4ZWN1dGUgPSAoKSA9PiB7XG4gICAgZm9yIChjb25zdCB7IGFjdGlvbiwgdmFsaWRhdG9yIH0gb2YgX2NoYWluKSB7XG4gICAgICBpZiAodmFsaWRhdG9yKCkpIGFjdGlvbigpO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4geyBhZGQsIGV4ZWN1dGUgfTtcbn07XG4iLCAiZXhwb3J0IGNvbnN0IGVzY2FwZVRlbXBsYXRlU3RyaW5nID0gKHRlbXBsYXRlU3RyaW5nOiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xuICBpZiAodHlwZW9mIHRlbXBsYXRlU3RyaW5nICE9PSBcInN0cmluZ1wiKSByZXR1cm4gdGVtcGxhdGVTdHJpbmc7XG4gIHJldHVybiB0ZW1wbGF0ZVN0cmluZ1xuICAgIC5yZXBsYWNlKC8mL2csIFwiJmFtcDtcIilcbiAgICAucmVwbGFjZSgvPC9nLCBcIiZsdDtcIilcbiAgICAucmVwbGFjZSgvPi9nLCBcIiZndDtcIilcbiAgICAucmVwbGFjZSgvXCIvZywgXCImcXVvdDtcIilcbiAgICAucmVwbGFjZSgvJy9nLCBcIiYjMzk7XCIpXG4gICAgLnJlcGxhY2UoL1xcLy9nLCBcIiYjeDJGO1wiKTtcbn07XG5cbmV4cG9ydCBjb25zdCBiaW5kU3R5bGVTY29wZSA9IChzY29wZUlkOiBzdHJpbmcsIHN0cmluZ3M6IHN0cmluZyk6IHN0cmluZyA9PiB7XG4gIGNvbnN0IHJlZ2V4ID0gLyhcXC4oXFx3KykoXFwtKnxcXF8qKT8pK1xcdysvZ2k7XG4gIHJldHVybiBzdHJpbmdzLnJlcGxhY2UocmVnZXgsICh2YWx1ZXMpID0+IHtcbiAgICByZXR1cm4gYC4ke3Njb3BlSWR9LSR7dmFsdWVzLnJlcGxhY2UoL1xcLi8sIFwiXCIpfWA7XG4gIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IGNyZWF0ZVVVSUQgPSAoKSA9PiBNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKDM2KS5zbGljZSgyLCA2KTtcblxuZXhwb3J0IGNvbnN0IEhUTUxFdmVudHMgPSBbXG4gIC8vIEV2ZW50b3MgZGUgTW91c2VcbiAgXCJvbmNsaWNrXCIsXG4gIFwib25kYmxjbGlja1wiLFxuICBcIm9ubW91c2Vkb3duXCIsXG4gIFwib25tb3VzZXVwXCIsXG4gIFwib25tb3VzZW92ZXJcIixcbiAgXCJvbm1vdXNlb3V0XCIsXG4gIFwib25tb3VzZW1vdmVcIixcbiAgXCJvbm1vdXNlZW50ZXJcIixcbiAgXCJvbm1vdXNlbGVhdmVcIixcbiAgXCJvbmNvbnRleHRtZW51XCIsXG5cbiAgLy8gRXZlbnRvcyBkZSBUZWNsYWRvXG4gIFwib25rZXlkb3duXCIsXG4gIFwib25rZXl1cFwiLFxuICBcIm9ua2V5cHJlc3NcIixcblxuICAvLyBFdmVudG9zIGRlIEZvY29cbiAgXCJvbmZvY3VzXCIsXG4gIFwib25ibHVyXCIsXG5cbiAgLy8gRXZlbnRvcyBkZSBGb3JtdWxcdTAwRTFyaW9cbiAgXCJvbnN1Ym1pdFwiLFxuICBcIm9uY2hhbmdlXCIsXG4gIFwib25pbnB1dFwiLFxuICBcIm9ucmVzZXRcIixcbiAgXCJvbmludmFsaWRcIixcblxuICAvLyBFdmVudG9zIGRlIE1cdTAwRURkaWFcbiAgXCJvbnBsYXlcIixcbiAgXCJvbnBhdXNlXCIsXG4gIFwib25lbmRlZFwiLFxuICBcIm9udm9sdW1lY2hhbmdlXCIsXG5cbiAgLy8gRXZlbnRvcyBkZSBUb3F1ZSAoVG91Y2gpIC0gcGFyYSBkaXNwb3NpdGl2b3MgbVx1MDBGM3ZlaXNcbiAgXCJvbnRvdWNoc3RhcnRcIixcbiAgXCJvbnRvdWNobW92ZVwiLFxuICBcIm9udG91Y2hlbmRcIixcbiAgXCJvbnRvdWNoY2FuY2VsXCIsXG5cbiAgLy8gRXZlbnRvcyBkZSBBbmltYVx1MDBFN1x1MDBFM28gZSBUcmFuc2lcdTAwRTdcdTAwRTNvXG4gIFwib25hbmltYXRpb25zdGFydFwiLFxuICBcIm9uYW5pbWF0aW9uZW5kXCIsXG4gIFwib25hbmltYXRpb25pdGVyYXRpb25cIixcbiAgXCJvbnRyYW5zaXRpb25lbmRcIixcblxuICAvLyBFdmVudG9zIGRlIE91dHJvcyBJbnRlcmF0aXZvc1xuICBcIm9ubG9hZFwiLFxuICBcIm9uZXJyb3JcIixcbiAgXCJvbnJlc2l6ZVwiLFxuICBcIm9uc2Nyb2xsXCIsXG5dO1xuIiwgImltcG9ydCB7IEhUTUxFdmVudHMgfSBmcm9tIFwiQC91dGlsc1wiO1xuXG5jb25zdCBpc09iamVjdCA9XG4gIDxUPihwYXlsb2FkOiBUKSA9PlxuICAgICgpID0+IHtcbiAgICAgIHJldHVybiAhIXBheWxvYWQgJiYgIUFycmF5LmlzQXJyYXkocGF5bG9hZCkgJiYgdHlwZW9mIHBheWxvYWQgPT09IFwib2JqZWN0XCI7XG4gICAgfTtcblxuY29uc3QgaXNBcnJheSA9XG4gIDxUPihwYXlsb2FkOiBUKSA9PlxuICAgICgpID0+IHtcbiAgICAgIHJldHVybiAhIXBheWxvYWQgJiYgQXJyYXkuaXNBcnJheShwYXlsb2FkKTtcbiAgICB9O1xuXG5jb25zdCBpc0Z1bmN0aW9uID1cbiAgPFQgPSB2b2lkPihwYXlsb2FkOiBUKSA9PlxuICAgICgpID0+IHtcbiAgICAgIHJldHVybiAhIXBheWxvYWQgJiYgdHlwZW9mIHBheWxvYWQgPT09IFwiZnVuY3Rpb25cIjtcbiAgICB9O1xuXG5jb25zdCBpc1N0cmluZyA9XG4gIDxUID0gdm9pZD4ocGF5bG9hZDogVCkgPT5cbiAgICAoKSA9PiB7XG4gICAgICByZXR1cm4gdHlwZW9mIHBheWxvYWQgPT09IFwic3RyaW5nXCI7XG4gICAgfTtcblxuY29uc3QgaXNFdmVudE5hbWUgPVxuICA8VCA9IHZvaWQ+KHBheWxvYWQ6IFQpID0+XG4gICAgKCkgPT4ge1xuICAgICAgaWYgKHR5cGVvZiBwYXlsb2FkICE9PSBcInN0cmluZ1wiKSByZXR1cm4gZmFsc2U7XG4gICAgICByZXR1cm4gSFRNTEV2ZW50cy5pbmNsdWRlcyhwYXlsb2FkLnRvTG93ZXJDYXNlKCkpO1xuICAgIH07XG5cbmNvbnN0IGlzVGVtcGxhdGVEYXRhID1cbiAgPFQgPSB2b2lkPihwYXlsb2FkOiBUKSA9PlxuICAgICgpID0+IHtcbiAgICAgIHJldHVybiB0eXBlb2YgcGF5bG9hZCA9PT0gXCJzdHJpbmdcIiB8fCB0eXBlb2YgcGF5bG9hZCA9PT0gXCJudW1iZXJcIjtcbiAgICB9O1xuXG5leHBvcnQgeyBpc09iamVjdCwgaXNBcnJheSwgaXNGdW5jdGlvbiwgaXNTdHJpbmcsIGlzRXZlbnROYW1lLCBpc1RlbXBsYXRlRGF0YSB9O1xuIiwgImltcG9ydCB0eXBlIHsgVGVtcGxhdGVTY2hlbWEgfSBmcm9tIFwiQC90eXBlc1wiO1xuaW1wb3J0IHsgY3JlYXRlQ2hhaW4gfSBmcm9tIFwiQC9mYWN0b3JpZXNcIjtcbmltcG9ydCB7IGNyZWF0ZUVsZW1lbnRCeUZhY3RvcnlOYW1lLCBjcmVhdGVFbGVtZW50QnlUYWdOYW1lIH0gZnJvbSBcIkAvYWN0aW9uc1wiO1xuaW1wb3J0IHsgaXNGdW5jdGlvbiwgaXNTdHJpbmcgfSBmcm9tIFwiQC92YWxpZGF0b3JzXCI7XG5pbXBvcnQgdHlwZSB7IFN0YXRlIH0gZnJvbSBcIkAvc3RhdGVcIjtcblxuZXhwb3J0IGNvbnN0IHJlbmRlclRlbXBsYXRlT2JqZWN0ID1cbiAgKHRlbXBsYXRlOiBUZW1wbGF0ZVNjaGVtYSwgY29udGV4dEVsZW1lbnQ6IEVsZW1lbnQsIHN0YXRlOiBTdGF0ZSA9IHt9KSA9PlxuICAgICgpOiB2b2lkID0+IHtcbiAgICAgIGNvbnN0IF9jaGFpbiA9IGNyZWF0ZUNoYWluKCk7XG5cbiAgICAgIF9jaGFpbi5hZGQoe1xuICAgICAgICB2YWxpZGF0b3I6IGlzU3RyaW5nKHRlbXBsYXRlLnR5cGUpLFxuICAgICAgICBhY3Rpb246IGNyZWF0ZUVsZW1lbnRCeVRhZ05hbWUodGVtcGxhdGUsIGNvbnRleHRFbGVtZW50LCBzdGF0ZSksXG4gICAgICB9KTtcblxuICAgICAgX2NoYWluLmFkZCh7XG4gICAgICAgIHZhbGlkYXRvcjogaXNGdW5jdGlvbih0ZW1wbGF0ZS50eXBlKSxcbiAgICAgICAgYWN0aW9uOiBjcmVhdGVFbGVtZW50QnlGYWN0b3J5TmFtZSh0ZW1wbGF0ZSwgY29udGV4dEVsZW1lbnQsIHN0YXRlKSxcbiAgICAgIH0pO1xuXG4gICAgICBfY2hhaW4uZXhlY3V0ZSgpO1xuICAgIH07XG4iLCAiaW1wb3J0IHsgcmVuZGVyIH0gZnJvbSBcIkAvcmVuZGVyXCI7XG5pbXBvcnQgdHlwZSB7IFRlbXBsYXRlU2NoZW1hIH0gZnJvbSBcIkAvdHlwZXNcIjtcbmltcG9ydCB0eXBlIHsgU3RhdGUgfSBmcm9tIFwiQC9zdGF0ZVwiO1xuXG5leHBvcnQgY29uc3QgcmVuZGVyVGVtcGxhdGVBcnJheSA9XG4gIChcbiAgICB0ZW1wbGF0ZVNjaGVtYTogVGVtcGxhdGVTY2hlbWFbXSxcbiAgICBjb250ZXh0RWxlbWVudDogRWxlbWVudCxcbiAgICBzdGF0ZTogU3RhdGUgPSB7fSxcbiAgKSA9PlxuICAgICgpID0+IHtcbiAgICAgIGZvciAoY29uc3QgdGVtcGxhdGUgb2YgdGVtcGxhdGVTY2hlbWEpIHtcbiAgICAgICAgcmVuZGVyKHRlbXBsYXRlLCBjb250ZXh0RWxlbWVudCwgc3RhdGUpO1xuICAgICAgfVxuICAgIH07XG4iLCAiaW1wb3J0IHsgcmVuZGVyIH0gZnJvbSBcIkAvcmVuZGVyXCI7XG5pbXBvcnQgdHlwZSB7IFRlbXBsYXRlU2NoZW1hIH0gZnJvbSBcIkAvdGVtcGxhdGVcIjtcbmltcG9ydCB0eXBlIHsgU3RhdGUgfSBmcm9tIFwiQC9zdGF0ZVwiO1xuXG5leHBvcnQgY29uc3QgcmVuZGVyQ2hpbGRyZW4gPSAoXG4gIGNoaWxkcmVuOiBUZW1wbGF0ZVNjaGVtYVtdLFxuICBwYXJlbnRFbGVtZW50OiBFbGVtZW50LFxuICBzdGF0ZTogU3RhdGUgPSB7fSxcbikgPT4ge1xuICBwYXJlbnRFbGVtZW50LmlubmVySFRNTCA9IFwiXCI7XG4gIGlmICghQXJyYXkuaXNBcnJheShjaGlsZHJlbikgJiYgdHlwZW9mIGNoaWxkcmVuID09PSBcIm9iamVjdFwiKSB7XG4gICAgcmVuZGVyKGNoaWxkcmVuLCBwYXJlbnRFbGVtZW50LCBzdGF0ZSk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgZm9yIChjb25zdCBjaGlsZCBvZiBjaGlsZHJlbikge1xuICAgIHJlbmRlcihjaGlsZCwgcGFyZW50RWxlbWVudCwgc3RhdGUpO1xuICB9XG59O1xuIiwgInZhciBuPWZ1bmN0aW9uKHQscyxyLGUpe3ZhciB1O3NbMF09MDtmb3IodmFyIGg9MTtoPHMubGVuZ3RoO2grKyl7dmFyIHA9c1toKytdLGE9c1toXT8oc1swXXw9cD8xOjIscltzW2grK11dKTpzWysraF07Mz09PXA/ZVswXT1hOjQ9PT1wP2VbMV09T2JqZWN0LmFzc2lnbihlWzFdfHx7fSxhKTo1PT09cD8oZVsxXT1lWzFdfHx7fSlbc1srK2hdXT1hOjY9PT1wP2VbMV1bc1srK2hdXSs9YStcIlwiOnA/KHU9dC5hcHBseShhLG4odCxhLHIsW1wiXCIsbnVsbF0pKSxlLnB1c2godSksYVswXT9zWzBdfD0yOihzW2gtMl09MCxzW2hdPXUpKTplLnB1c2goYSl9cmV0dXJuIGV9LHQ9bmV3IE1hcDtleHBvcnQgZGVmYXVsdCBmdW5jdGlvbihzKXt2YXIgcj10LmdldCh0aGlzKTtyZXR1cm4gcnx8KHI9bmV3IE1hcCx0LnNldCh0aGlzLHIpKSwocj1uKHRoaXMsci5nZXQocyl8fChyLnNldChzLHI9ZnVuY3Rpb24obil7Zm9yKHZhciB0LHMscj0xLGU9XCJcIix1PVwiXCIsaD1bMF0scD1mdW5jdGlvbihuKXsxPT09ciYmKG58fChlPWUucmVwbGFjZSgvXlxccypcXG5cXHMqfFxccypcXG5cXHMqJC9nLFwiXCIpKSk/aC5wdXNoKDAsbixlKTozPT09ciYmKG58fGUpPyhoLnB1c2goMyxuLGUpLHI9Mik6Mj09PXImJlwiLi4uXCI9PT1lJiZuP2gucHVzaCg0LG4sMCk6Mj09PXImJmUmJiFuP2gucHVzaCg1LDAsITAsZSk6cj49NSYmKChlfHwhbiYmNT09PXIpJiYoaC5wdXNoKHIsMCxlLHMpLHI9NiksbiYmKGgucHVzaChyLG4sMCxzKSxyPTYpKSxlPVwiXCJ9LGE9MDthPG4ubGVuZ3RoO2ErKyl7YSYmKDE9PT1yJiZwKCkscChhKSk7Zm9yKHZhciBsPTA7bDxuW2FdLmxlbmd0aDtsKyspdD1uW2FdW2xdLDE9PT1yP1wiPFwiPT09dD8ocCgpLGg9W2hdLHI9Myk6ZSs9dDo0PT09cj9cIi0tXCI9PT1lJiZcIj5cIj09PXQ/KHI9MSxlPVwiXCIpOmU9dCtlWzBdOnU/dD09PXU/dT1cIlwiOmUrPXQ6J1wiJz09PXR8fFwiJ1wiPT09dD91PXQ6XCI+XCI9PT10PyhwKCkscj0xKTpyJiYoXCI9XCI9PT10PyhyPTUscz1lLGU9XCJcIik6XCIvXCI9PT10JiYocjw1fHxcIj5cIj09PW5bYV1bbCsxXSk/KHAoKSwzPT09ciYmKGg9aFswXSkscj1oLChoPWhbMF0pLnB1c2goMiwwLHIpLHI9MCk6XCIgXCI9PT10fHxcIlxcdFwiPT09dHx8XCJcXG5cIj09PXR8fFwiXFxyXCI9PT10PyhwKCkscj0yKTplKz10KSwzPT09ciYmXCIhLS1cIj09PWUmJihyPTQsaD1oWzBdKX1yZXR1cm4gcCgpLGh9KHMpKSxyKSxhcmd1bWVudHMsW10pKS5sZW5ndGg+MT9yOnJbMF19XG4iLCAiaW1wb3J0IGh0bSBmcm9tIFwiaHRtXCI7XG5pbXBvcnQgdHlwZSB7IFRhZ2dlZFRlbXBsYXRlLCBUZW1wbGF0ZVByb3BzLCBUZW1wbGF0ZVNjaGVtYSB9IGZyb20gXCIuL3R5cGVzXCI7XG5cbmNvbnN0IGh5cGVydGV4dCA9IChcbiAgdHlwZTogdW5rbm93bixcbiAgcHJvcHM6IFRlbXBsYXRlUHJvcHMsXG4gIC4uLmNoaWxkcmVuOiBUZW1wbGF0ZVNjaGVtYVtdXG4pID0+IHtcbiAgcmV0dXJuIHsgdHlwZSwgcHJvcHMsIGNoaWxkcmVuIH07XG59O1xuXG5jb25zdCBodG1sID0gaHRtLmJpbmQ8VGFnZ2VkVGVtcGxhdGU+KGh5cGVydGV4dCk7XG5cbmV4cG9ydCB7IGh0bWwgfTtcbmV4cG9ydCB7IGh0bWwgYXMganN4IH07XG5leHBvcnQgeyBodG1sIGFzIHRzeCB9O1xuIiwgIi8qKlxuICogR2VyYSB1bSBoYXNoIFx1MDBGQW5pY28gYmFzZWFkbyBubyBhbGdvcml0bW8gREpCMi5cbiAqIEBwYXJhbSBzdHIgLSBPIGNvbnRlXHUwMEZBZG8gYSBwYXJ0aXIgZG8gcXVhbCBvIGhhc2ggc2VyXHUwMEUxIGdlcmFkby5cbiAqIEByZXR1cm5zIE8gaGFzaCBnZXJhZG8gY29tbyB1bWEgc3RyaW5nLlxuICovXG5leHBvcnQgY29uc3QgY3JlYXRlSGFzaCA9ICh0ZXh0OiBzdHJpbmcsIHNlbGVjdG9yOiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xuICBsZXQgaGFzaCA9IDUzODE7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgdGV4dC5sZW5ndGg7IGkrKykge1xuICAgIGhhc2ggPSAoaGFzaCAqIDMzKSBeIHRleHQuY2hhckNvZGVBdChpKTtcbiAgfVxuICByZXR1cm4gYCR7c2VsZWN0b3J9LSR7KGhhc2ggPj4+IDApLnRvU3RyaW5nKDM2KX1gO1xufTtcbiIsICJjb25zdCBzdHlsZUVsZW1lbnRDYWNoZTogTWFwPHN0cmluZywgSFRNTFN0eWxlRWxlbWVudD4gPSBuZXcgTWFwKCk7XG5cbmV4cG9ydCBjb25zdCBjcmVhdGVTdHlsZUVsZW1lbnQgPSAoY29tcG9uZW50SWQ6IHN0cmluZyk6IEhUTUxTdHlsZUVsZW1lbnQgPT4ge1xuICBjb25zdCBzdHlsZUVsZW1lbnQgPSBzdHlsZUVsZW1lbnRDYWNoZS5nZXQoY29tcG9uZW50SWQpO1xuXG4gIGlmIChzdHlsZUVsZW1lbnQgIT09IHVuZGVmaW5lZCkge1xuICAgIHJldHVybiBzdHlsZUVsZW1lbnQ7XG4gIH1cblxuICBjb25zdCBzdHlsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgc3R5bGUuc2V0QXR0cmlidXRlKFwiZGF0YS1jb21wb25lbnRcIiwgY29tcG9uZW50SWQpO1xuICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHN0eWxlKTtcbiAgc3R5bGVFbGVtZW50Q2FjaGUuc2V0KGNvbXBvbmVudElkLCBzdHlsZSk7XG5cbiAgcmV0dXJuIHN0eWxlO1xufTtcbiIsICJ0eXBlIFdyYXBTdHlsZVBhcmFtcyA9IHtcbiAgc3R5bGU6IHN0cmluZztcbiAgc2VsZWN0b3I6IHN0cmluZztcbn07XG5cbnR5cGUgQWNjdW11bGF0b3IgPSB7XG4gIGluc2lkZUJsb2NrOiBudW1iZXI7XG4gIGdsb2JhbFJ1bGVzOiBzdHJpbmc7XG4gIHJlc3VsdDogc3RyaW5nO1xufTtcblxudHlwZSBMaW5lUHJvY2Vzc2luZyA9IHtcbiAgZ2xvYmFsUnVsZXM6IHN0cmluZztcbiAgcmVzdWx0OiBzdHJpbmc7XG59O1xuXG5jb25zdCB3cmFwTG9vc2VSdWxlc091dHNpZGVNZWRpYVF1ZXJ5ID0gKHtcbiAgc3R5bGUsXG4gIHNlbGVjdG9yLFxufTogV3JhcFN0eWxlUGFyYW1zKTogc3RyaW5nID0+IHtcbiAgY29uc3QgbGluZXMgPSBzdHlsZS5zcGxpdChcIlxcblwiKTtcbiAgY29uc3QgcnVsZVJlZ2V4ID0gL15cXHMqKFtcXHctXSspXFxzKjpcXHMqW147XSs7LztcblxuICBjb25zdCBpbml0aWFsU3RhdGU6IEFjY3VtdWxhdG9yID0ge1xuICAgIGluc2lkZUJsb2NrOiAwLFxuICAgIGdsb2JhbFJ1bGVzOiBcIlwiLFxuICAgIHJlc3VsdDogXCJcIixcbiAgfTtcblxuICBjb25zdCBwcm9jZXNzR2xvYmFsUnVsZXMgPSAoXG4gICAgZ2xvYmFsUnVsZXM6IHN0cmluZyxcbiAgICByZXN1bHQ6IHN0cmluZyxcbiAgICBzZWxlY3Rvcjogc3RyaW5nLFxuICApOiBMaW5lUHJvY2Vzc2luZyA9PiAoe1xuICAgIGdsb2JhbFJ1bGVzOiBcIlwiLFxuICAgIHJlc3VsdDogYCR7cmVzdWx0fSR7c2VsZWN0b3J9IHtcXG4ke2dsb2JhbFJ1bGVzfX1cXG5cXG5gLFxuICB9KTtcblxuICBjb25zdCBwcm9jZXNzUmVndWxhckxpbmUgPSAoXG4gICAgbGluZTogc3RyaW5nLFxuICAgIHJlc3VsdDogc3RyaW5nLFxuICApOiBMaW5lUHJvY2Vzc2luZyA9PiAoe1xuICAgIGdsb2JhbFJ1bGVzOiBcIlwiLFxuICAgIHJlc3VsdDogYCR7cmVzdWx0fSR7bGluZX1cXG5gLFxuICB9KTtcblxuICBjb25zdCBhZGRHbG9iYWxSdWxlID0gKFxuICAgIGxpbmU6IHN0cmluZyxcbiAgICBnbG9iYWxSdWxlczogc3RyaW5nLFxuICApOiBMaW5lUHJvY2Vzc2luZyA9PiAoe1xuICAgIGdsb2JhbFJ1bGVzOiBgJHtnbG9iYWxSdWxlc30ke2xpbmV9XFxuYCxcbiAgICByZXN1bHQ6IFwiXCIsXG4gIH0pO1xuXG4gIGNvbnN0IGNvdW50QmxvY2tzID0gKGxpbmU6IHN0cmluZyk6IG51bWJlciA9PiB7XG4gICAgY29uc3Qgb3BlbmluZ3MgPSAobGluZS5tYXRjaCgvey9nKSB8fCBbXSkubGVuZ3RoO1xuICAgIGNvbnN0IGNsb3NpbmdzID0gKGxpbmUubWF0Y2goL30vZykgfHwgW10pLmxlbmd0aDtcbiAgICByZXR1cm4gb3BlbmluZ3MgLSBjbG9zaW5ncztcbiAgfTtcblxuICBjb25zdCBwcm9jZXNzTGluZSA9IChhY2M6IEFjY3VtdWxhdG9yLCBsaW5lOiBzdHJpbmcpOiBBY2N1bXVsYXRvciA9PiB7XG4gICAgYWNjLmluc2lkZUJsb2NrICs9IGNvdW50QmxvY2tzKGxpbmUpO1xuXG4gICAgLy8gQ2FzZSAxOiBMaW5lIGlzIGEgZ2xvYmFsIHJ1bGVcbiAgICBpZiAoYWNjLmluc2lkZUJsb2NrID09PSAwICYmIHJ1bGVSZWdleC50ZXN0KGxpbmUpKSB7XG4gICAgICBjb25zdCB7IGdsb2JhbFJ1bGVzLCByZXN1bHQgfSA9IGFkZEdsb2JhbFJ1bGUobGluZSwgYWNjLmdsb2JhbFJ1bGVzKTtcbiAgICAgIHJldHVybiB7IC4uLmFjYywgZ2xvYmFsUnVsZXMsIHJlc3VsdDogYWNjLnJlc3VsdCArIHJlc3VsdCB9O1xuICAgIH1cblxuICAgIC8vIENhc2UgMjogVGhlcmUgYXJlIGFjY3VtdWxhdGVkIGdsb2JhbCBydWxlc1xuICAgIGlmIChhY2MuZ2xvYmFsUnVsZXMpIHtcbiAgICAgIGNvbnN0IHsgZ2xvYmFsUnVsZXMsIHJlc3VsdCB9ID0gcHJvY2Vzc0dsb2JhbFJ1bGVzKFxuICAgICAgICBhY2MuZ2xvYmFsUnVsZXMsXG4gICAgICAgIGFjYy5yZXN1bHQsXG4gICAgICAgIHNlbGVjdG9yLFxuICAgICAgKTtcbiAgICAgIGNvbnN0IHByb2Nlc3NlZExpbmUgPSBwcm9jZXNzUmVndWxhckxpbmUobGluZSwgXCJcIik7XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5hY2MsXG4gICAgICAgIGdsb2JhbFJ1bGVzLFxuICAgICAgICByZXN1bHQ6IHJlc3VsdCArIHByb2Nlc3NlZExpbmUucmVzdWx0LFxuICAgICAgfTtcbiAgICB9XG5cbiAgICAvLyBDYXNlIDM6IFJlZ3VsYXIgbGluZVxuICAgIGNvbnN0IHsgZ2xvYmFsUnVsZXMsIHJlc3VsdCB9ID0gcHJvY2Vzc1JlZ3VsYXJMaW5lKGxpbmUsIGFjYy5yZXN1bHQpO1xuICAgIHJldHVybiB7IC4uLmFjYywgZ2xvYmFsUnVsZXMsIHJlc3VsdCB9O1xuICB9O1xuXG4gIGNvbnN0IHsgcmVzdWx0LCBnbG9iYWxSdWxlcyB9ID0gbGluZXMucmVkdWNlKHByb2Nlc3NMaW5lLCBpbml0aWFsU3RhdGUpO1xuXG4gIHJldHVybiBnbG9iYWxSdWxlc1xuICAgID8gYCR7cmVzdWx0fSR7c2VsZWN0b3J9IHtcXG4ke2dsb2JhbFJ1bGVzfX1cXG5gLnRyaW0oKVxuICAgIDogcmVzdWx0LnRyaW0oKTtcbn07XG5cbmNvbnN0IHdyYXBMb29zZVJ1bGVzSW5zaWRlTWVkaWFRdWVyeSA9ICh7XG4gIHN0eWxlLFxuICBzZWxlY3Rvcixcbn06IFdyYXBTdHlsZVBhcmFtcyk6IHN0cmluZyA9PiB7XG4gIGNvbnN0IHJlZ2V4ID0gL0BtZWRpYVxccyooW157XSspXFxzKlxceyhbXFxzXFxTXSo/KVxcfS9nO1xuICBjb25zdCBydWxlUmVnZXggPSAvXlxccyooW1xcdy1dKylcXHMqOlxccypbXjtdKzsvO1xuXG4gIHJldHVybiBzdHlsZS5yZXBsYWNlKHJlZ2V4LCAobWF0Y2gsIG1lZGlhUXVlcnksIGlubmVyQ3NzKSA9PiB7XG4gICAgY29uc3QgcnVsZXMgPSBpbm5lckNzc1xuICAgICAgLnRyaW0oKVxuICAgICAgLnNwbGl0KFwiXFxuXCIpXG4gICAgICAubWFwKChsaW5lOiBzdHJpbmcpID0+IGxpbmUudHJpbSgpKVxuICAgICAgLmZpbHRlcigobGluZTogc3RyaW5nKSA9PiBsaW5lKTtcblxuICAgIGNvbnN0IHdyYXBwZWRSdWxlcyA9IHJ1bGVzXG4gICAgICAuZmlsdGVyKChydWxlOiBzdHJpbmcpID0+IHJ1bGVSZWdleC50ZXN0KHJ1bGUpKVxuICAgICAgLm1hcCgocnVsZTogc3RyaW5nKSA9PiBgJHtzZWxlY3Rvcn0ge1xcbiR7cnVsZS50cmltKCl9XFxufWApXG4gICAgICAuam9pbihcIlxcblwiKTtcblxuICAgIHJldHVybiBgQG1lZGlhICR7bWVkaWFRdWVyeS50cmltKCl9IHtcXG4ke3dyYXBwZWRSdWxlc31cXG59YDtcbiAgfSk7XG59O1xuXG5jb25zdCBhcHBseUNsYXNzTmFtZVNjb3BlID0gKHsgc3R5bGUsIHNlbGVjdG9yIH06IFdyYXBTdHlsZVBhcmFtcyk6IHN0cmluZyA9PiB7XG4gIGNvbnN0IHJlZ2V4ID0gL1xcLihcXHcrKS9nO1xuICByZXR1cm4gc3R5bGUucmVwbGFjZShyZWdleCwgYC4ke3NlbGVjdG9yfV8kMWApO1xufTtcblxuZXhwb3J0IGNvbnN0IHRyYW5zZm9ybVN0eWxlID0gKHJhd1N0eWxlOiBzdHJpbmcsIHNlbGVjdG9yOiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xuICBsZXQgc3R5bGUgPSByYXdTdHlsZTtcbiAgY29uc3QgY2xhc3NOYW1lID0gYC4ke3NlbGVjdG9yfWA7XG4gIHN0eWxlID0gYXBwbHlDbGFzc05hbWVTY29wZSh7IHN0eWxlLCBzZWxlY3RvciB9KTtcbiAgc3R5bGUgPSB3cmFwTG9vc2VSdWxlc091dHNpZGVNZWRpYVF1ZXJ5KHsgc3R5bGUsIHNlbGVjdG9yOiBjbGFzc05hbWUgfSk7XG4gIHN0eWxlID0gd3JhcExvb3NlUnVsZXNJbnNpZGVNZWRpYVF1ZXJ5KHsgc3R5bGUsIHNlbGVjdG9yOiBjbGFzc05hbWUgfSk7XG5cbiAgcmV0dXJuIHN0eWxlO1xufTtcbiIsICJpbXBvcnQgdHlwZSB7IFRhZ2dlZFN0eWxlIH0gZnJvbSBcIi4vdHlwZXNcIjtcbmltcG9ydCB7IGNyZWF0ZUhhc2ggfSBmcm9tIFwiLi9jcmVhdGVIYXNoXCI7XG5pbXBvcnQgeyB0cmFuc2Zvcm1TdHlsZSB9IGZyb20gXCIuL2Nzc1BhcnNlclwiO1xuaW1wb3J0IHsgY3JlYXRlU3R5bGVFbGVtZW50IH0gZnJvbSBcIi4vY3JlYXRlU3R5bGVFbGVtZW50XCI7XG5cbnR5cGUgSGFuZGxlclBhcmFtcyA9IHtcbiAgaGFzaElkOiBzdHJpbmc7XG4gIHNjb3BlZFN0eWxlOiBzdHJpbmc7XG4gIHN0eWxlRWxlbWVudDogRWxlbWVudDtcbn07XG50eXBlIEhhbmRsZXIgPSAocGF5bG9hZDogSGFuZGxlclBhcmFtcykgPT4gdm9pZDtcblxuY29uc3QgY3NzQ2FjaGU6IE1hcDxzdHJpbmcsIHN0cmluZz4gPSBuZXcgTWFwKCk7XG5cbmV4cG9ydCBjb25zdCBjc3MgPVxuICAoc2VsZWN0b3I6IHN0cmluZywgaGFuZGxlcjogSGFuZGxlciA9ICgpID0+IHt9KTogVGFnZ2VkU3R5bGUgPT5cbiAgKFxuICAgIHN0cmluZ3M6IFRlbXBsYXRlU3RyaW5nc0FycmF5LFxuICAgIC4uLmludGVycG9sYXRpb25zOiAoc3RyaW5nIHwgbnVtYmVyKVtdXG4gICk6IHN0cmluZyA9PiB7XG4gICAgY29uc3QgcmF3Q1NTID0gc3RyaW5ncy5yZWR1Y2UoXG4gICAgICAoYWNjdW11bGF0b3IsIHN0ciwgaW5kZXgpID0+XG4gICAgICAgIGAke2FjY3VtdWxhdG9yfSR7c3RyfSR7aW50ZXJwb2xhdGlvbnNbaW5kZXhdICE9PSB1bmRlZmluZWQgPyBpbnRlcnBvbGF0aW9uc1tpbmRleF0gOiBcIlwifWAsXG4gICAgICBcIlwiLFxuICAgICk7XG5cbiAgICBjb25zdCBjYWNoZWRDbGFzc05hbWUgPSBjc3NDYWNoZS5nZXQocmF3Q1NTKTtcbiAgICBpZiAoY2FjaGVkQ2xhc3NOYW1lICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiBjYWNoZWRDbGFzc05hbWU7XG4gICAgfVxuXG4gICAgY29uc3QgaGFzaElkID0gY3JlYXRlSGFzaChyYXdDU1MsIHNlbGVjdG9yKTtcbiAgICBjb25zdCBzY29wZWRTdHlsZSA9IHRyYW5zZm9ybVN0eWxlKHJhd0NTUywgYCR7aGFzaElkfWApO1xuICAgIGNvbnN0IHN0eWxlRWxlbWVudCA9IGNyZWF0ZVN0eWxlRWxlbWVudChgJHtoYXNoSWR9YCk7XG5cbiAgICBoYW5kbGVyKHsgaGFzaElkLCBzY29wZWRTdHlsZSwgc3R5bGVFbGVtZW50IH0pO1xuXG4gICAgaWYgKCFzdHlsZUVsZW1lbnQuaW5uZXJIVE1MLmluY2x1ZGVzKHNjb3BlZFN0eWxlKSkge1xuICAgICAgc3R5bGVFbGVtZW50LmlubmVySFRNTCArPSBzY29wZWRTdHlsZTtcbiAgICB9XG5cbiAgICBjc3NDYWNoZS5zZXQocmF3Q1NTLCBoYXNoSWQpO1xuXG4gICAgcmV0dXJuIGhhc2hJZDtcbiAgfTtcbiIsICJpbXBvcnQgeyBpc0V2ZW50TmFtZSB9IGZyb20gXCJAL3ZhbGlkYXRvcnNcIjtcblxudHlwZSBBdHRyaWJ1dGUgPSBvYmplY3QgJiB7XG4gIFtrZXk6IHN5bWJvbCB8IHN0cmluZ106IHVua25vd247XG59O1xuXG50eXBlIEV2ZW50SGFuZGxlciA9IDxLIGV4dGVuZHMga2V5b2YgSFRNTEVsZW1lbnRFdmVudE1hcD4oXG4gIGV2ZW50OiBIVE1MRWxlbWVudEV2ZW50TWFwW0tdLFxuKSA9PiB2b2lkO1xuXG5leHBvcnQgY29uc3Qgc2V0RWxlbWVudEF0dHJpYnV0ZXMgPSAoXG4gIGVsZW1lbnQ6IEVsZW1lbnQsXG4gIGF0dHJpYnV0ZXM6IEF0dHJpYnV0ZSxcbik6IEVsZW1lbnQgPT4ge1xuICBjb25zdCBhdHRyaWJ1dGVLZXlzID0gYXR0cmlidXRlcyA/IE9iamVjdC5rZXlzKGF0dHJpYnV0ZXMpIDogW107XG4gIGZvciAoY29uc3Qga2V5IG9mIGF0dHJpYnV0ZUtleXMpIHtcbiAgICBpZiAoIWlzRXZlbnROYW1lKGtleSkoKSkge1xuICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoa2V5LCBhdHRyaWJ1dGVzW2tleV0gYXMgc3RyaW5nKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgZXZlbnROYW1lID0ga2V5XG4gICAgICAgIC5yZXBsYWNlKC9vbi8sIFwiXCIpXG4gICAgICAgIC50b0xvd2VyQ2FzZSgpIGFzIGtleW9mIEhUTUxFbGVtZW50RXZlbnRNYXA7XG4gICAgICBjb25zdCBldmVudEhhbmRsZXIgPSBhdHRyaWJ1dGVzW2tleV0gYXMgRXZlbnRIYW5kbGVyO1xuICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgZXZlbnRIYW5kbGVyKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGVsZW1lbnQ7XG59O1xuIiwgImltcG9ydCB0eXBlIHsgVGVtcGxhdGVTY2hlbWEgfSBmcm9tIFwiQC90ZW1wbGF0ZVwiO1xuaW1wb3J0IHR5cGUgeyBHZW5lcmljT2JqZWN0LCBTdGF0ZSwgU3RhdGVNYW5hZ2VyIH0gZnJvbSBcIkAvc3RhdGVcIjtcbmltcG9ydCB7IGNyZWF0ZVN0YXRlIH0gZnJvbSBcIkAvc3RhdGVcIjtcbmltcG9ydCB7IHJlbmRlciB9IGZyb20gXCJAL3JlbmRlclwiO1xuaW1wb3J0IHsgaHRtbCwganN4LCB0c3ggfSBmcm9tIFwiQC90ZW1wbGF0ZVwiO1xuaW1wb3J0IHsgY3NzIH0gZnJvbSBcIkAvc3R5bGVcIjtcbmltcG9ydCB7IHJlbmRlckNoaWxkcmVuIH0gZnJvbSBcIi4vcmVuZGVyQ2hpbGRyZW5cIjtcbmltcG9ydCB7IHNldEVsZW1lbnRBdHRyaWJ1dGVzIH0gZnJvbSBcIi4vc2V0RWxlbWVudEF0dHJpYnV0ZXNcIjtcblxudHlwZSBGYWN0b3J5ID0gKHBhcmFtcz86IHVua25vd24pID0+IHVua25vd247XG5cbnR5cGUgU3R5bGVQYXJhbXMgPSB7XG4gIHByb3BzOiBTdGF0ZTtcbiAgc3RhdGU6IFN0YXRlO1xuICBjc3M6IFJldHVyblR5cGU8dHlwZW9mIGNzcz47XG59O1xuXG50eXBlIFN0eWxlcyA9IHsgW2tleTogc3RyaW5nXTogc3RyaW5nIH07XG50eXBlIFN0eWxlc09iamVjdCA9IEdlbmVyaWNPYmplY3Q8eyBba2V5OiBzdHJpbmddOiAoKSA9PiBzdHJpbmcgfT47XG50eXBlIFN0eWxlSGFuZGxlckZhY3RvcnkgPSAoKSA9PiBTdHlsZXNPYmplY3Q7XG50eXBlIFN0eWxlSGFuZGxlciA9IChwYXJhbXM6IFN0eWxlUGFyYW1zKSA9PiBzdHJpbmc7XG5cbnR5cGUgVGVtcGxhdGVQYXJhbXMgPSB7XG4gIHByb3BzOiBTdGF0ZTtcbiAgc3RhdGU6IFN0YXRlO1xuICBodG1sOiB0eXBlb2YgaHRtbDtcbiAganN4OiB0eXBlb2YganN4O1xuICB0c3g6IHR5cGVvZiB0c3g7XG4gIHN0eWxlczogU3R5bGVzO1xuICBhY3Rpb25zOiBBY3Rpb25zO1xufTtcblxudHlwZSBUZW1wbGF0ZUluamVjdGlvbnMgPSA8VCA9IHVua25vd24+KCkgPT4gR2VuZXJpY09iamVjdDxUPjtcblxudHlwZSBUZW1wbGF0ZUhhbmRsZXIgPSAoXG4gIHBhcmFtczogVGVtcGxhdGVQYXJhbXMsXG4gIGluamVjdGlvbnM6IFRlbXBsYXRlSW5qZWN0aW9ucyxcbikgPT4gdm9pZDtcblxudHlwZSBBY3Rpb25zID0gR2VuZXJpY09iamVjdDtcblxudHlwZSBBY3Rpb25QYXJhbXMgPSB7XG4gIHByb3BzOiBTdGF0ZTtcbiAgc3RhdGU6IFN0YXRlTWFuYWdlcjtcbn07XG50eXBlIEFjdGlvbkhhbmRsZXJGYWN0b3J5ID0gKHBhcmFtczogQWN0aW9uUGFyYW1zKSA9PiBHZW5lcmljT2JqZWN0O1xuXG50eXBlIEF0dHJpYnV0ZSA9IG9iamVjdCAmIHtcbiAgW2tleTogc3ltYm9sIHwgc3RyaW5nXTogdW5rbm93bjtcbn07XG5cbmNvbnN0IF9hdHRyaWJ1dGVzID0ge307XG5cbmNvbnN0IF9jcmVhdGVUYWdCeUZhY3RvcnlOYW1lID0gKGZhY3Rvcnk6IEZhY3RvcnkpID0+IHtcbiAgcmV0dXJuIGZhY3RvcnkubmFtZVxuICAgIC5zcGxpdCgvKD89W0EtWl0pLylcbiAgICAuam9pbihcIi1cIilcbiAgICAudG9Mb3dlckNhc2UoKTtcbn07XG5cbmNvbnN0IF9jcmVhdGVVc2VTdGF0ZSA9IChzdGF0ZTogU3RhdGVNYW5hZ2VyKSA9PiB7XG4gIGNvbnN0IGN1cnJlbnRTdGF0ZSA9IHt9O1xuICBjb25zdCB1c2VTdGF0ZSA9IDxUPihpbml0aWFsU3RhdGU6IFN0YXRlPFQ+KTogU3RhdGVNYW5hZ2VyID0+IHtcbiAgICBjb25zdCBsYXRlc3RTdGF0ZSA9IHN0YXRlLmdldCgpIGFzIFN0YXRlPFQ+O1xuICAgIHN0YXRlLnNldCh7IC4uLmluaXRpYWxTdGF0ZSwgLi4ubGF0ZXN0U3RhdGUgfSk7XG5cbiAgICBPYmplY3QuYXNzaWduKGN1cnJlbnRTdGF0ZSwgc3RhdGUuZ2V0KCkpO1xuICAgIHJldHVybiB7IGdldDogc3RhdGUuZ2V0LCBzZXQ6IHN0YXRlLnNldCwgd2F0Y2g6IHN0YXRlLndhdGNoIH07XG4gIH07XG4gIHJldHVybiB7IGN1cnJlbnRTdGF0ZSwgdXNlU3RhdGUgfTtcbn07XG5cbmNvbnN0IF9jcmVhdGVVc2VTdHlsZSA9ICh7IHByb3BzLCBzdGF0ZSwgY3NzIH06IFN0eWxlUGFyYW1zKSA9PiB7XG4gIGNvbnN0IHN0eWxlc2hlZXQgPSB7fTtcbiAgY29uc3QgdXNlU3R5bGUgPSAoY3NzSGFuZGxlckZhY3Rvcnk6IFN0eWxlSGFuZGxlckZhY3RvcnkpID0+IHtcbiAgICBjb25zdCBoYW5kbGVycyA9IGNzc0hhbmRsZXJGYWN0b3J5KCk7XG4gICAgY29uc3Qgc3R5bGVzOiBTdHlsZXMgPSB7fTtcblxuICAgIGZvciAoY29uc3Qga2V5IGluIGhhbmRsZXJzKSB7XG4gICAgICBjb25zdCBoYW5kbGVyID0gaGFuZGxlcnNba2V5XSBhcyBTdHlsZUhhbmRsZXI7XG4gICAgICBjb25zdCBzdHlsZSA9IGhhbmRsZXIoeyBwcm9wcywgc3RhdGUsIGNzcyB9KTtcbiAgICAgIHN0eWxlc1trZXldID0gc3R5bGU7XG4gICAgfVxuXG4gICAgT2JqZWN0LmFzc2lnbihzdHlsZXNoZWV0LCBzdHlsZXMpO1xuICAgIHJldHVybiBzdHlsZXM7XG4gIH07XG5cbiAgcmV0dXJuIHsgc3R5bGVzOiBzdHlsZXNoZWV0LCB1c2VTdHlsZSB9O1xufTtcblxuY29uc3QgX2NyZWF0ZVVzZVRlbXBsYXRlID0gKHBhcmFtczogVGVtcGxhdGVQYXJhbXMpID0+IHtcbiAgY29uc3QgdXNlVGVtcGxhdGUgPSAoXG4gICAgdGVtcGxhdGVIYW5kbGVyOiBUZW1wbGF0ZUhhbmRsZXIsXG4gICAgdGVtcGxhdGVJbmplY3Rpb25zOiBUZW1wbGF0ZUluamVjdGlvbnMsXG4gICkgPT4ge1xuICAgIHJldHVybiB0ZW1wbGF0ZUhhbmRsZXIocGFyYW1zLCB0ZW1wbGF0ZUluamVjdGlvbnMpO1xuICB9O1xuXG4gIHJldHVybiB1c2VUZW1wbGF0ZTtcbn07XG5cbmNvbnN0IF9jcmVhdGVVc2VBY3Rpb24gPSAoeyBwcm9wcywgc3RhdGUgfTogQWN0aW9uUGFyYW1zKSA9PiB7XG4gIGNvbnN0IGFjdGlvbnM6IEdlbmVyaWNPYmplY3QgPSB7fTtcblxuICBjb25zdCB1c2VBY3Rpb24gPSAoYWN0aW9uSGFuZGxlckZhY3Rvcnk6IEFjdGlvbkhhbmRsZXJGYWN0b3J5KSA9PiB7XG4gICAgY29uc3QgaGFuZGxlckFjdGlvbnMgPSBhY3Rpb25IYW5kbGVyRmFjdG9yeSh7IHByb3BzLCBzdGF0ZSB9KTtcbiAgICBPYmplY3QuYXNzaWduKGFjdGlvbnMsIGhhbmRsZXJBY3Rpb25zKTtcbiAgfTtcblxuICByZXR1cm4geyBhY3Rpb25zLCB1c2VBY3Rpb24gfTtcbn07XG5cbmV4cG9ydCBjb25zdCBjcmVhdGVFbGVtZW50QnlGYWN0b3J5TmFtZSA9IChcbiAgdGVtcGxhdGU6IFRlbXBsYXRlU2NoZW1hLFxuICBwYXJlbnRFbGVtZW50OiBFbGVtZW50LFxuICBsYXRlc3RTdGF0ZTogU3RhdGUgPSB7fSxcbikgPT4ge1xuICByZXR1cm4gKCkgPT4ge1xuICAgIGNvbnN0IGZhY3RvcnkgPSB0ZW1wbGF0ZS50eXBlIGFzIEZhY3Rvcnk7XG4gICAgY29uc3QgdGFnTmFtZSA9IF9jcmVhdGVUYWdCeUZhY3RvcnlOYW1lKGZhY3RvcnkpO1xuICAgIGNvbnN0IHNlbGVjdG9yID0gdGFnTmFtZS50b0xvd2VyQ2FzZSgpO1xuICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRhZ05hbWUpO1xuXG4gICAgY29uc3QgcHJvcHMgPSB0ZW1wbGF0ZS5wcm9wcztcbiAgICBjb25zdCBsYXRlc3REZWVwU3RhdGUgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGxhdGVzdFN0YXRlKSk7XG4gICAgY29uc3Qgc3RhdGVNYW5hZ2VyID0gY3JlYXRlU3RhdGUobGF0ZXN0RGVlcFN0YXRlKTtcbiAgICBjb25zdCB7IGN1cnJlbnRTdGF0ZTogc3RhdGUsIHVzZVN0YXRlIH0gPSBfY3JlYXRlVXNlU3RhdGUoc3RhdGVNYW5hZ2VyKTtcbiAgICBjb25zdCBzdHlsZWQgPSBjc3Moc2VsZWN0b3IsICh7IGhhc2hJZCB9KSA9PiB7XG4gICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoaGFzaElkKTtcbiAgICAgIE9iamVjdC5hc3NpZ24oX2F0dHJpYnV0ZXMsIHsgY2xhc3M6IGhhc2hJZCB9KTtcbiAgICB9KTtcbiAgICBjb25zdCB7IHN0eWxlcywgdXNlU3R5bGUgfSA9IF9jcmVhdGVVc2VTdHlsZSh7IHByb3BzLCBzdGF0ZSwgY3NzOiBzdHlsZWQgfSk7XG4gICAgY29uc3QgeyBhY3Rpb25zLCB1c2VBY3Rpb24gfSA9IF9jcmVhdGVVc2VBY3Rpb24oe1xuICAgICAgcHJvcHMsXG4gICAgICBzdGF0ZTogc3RhdGVNYW5hZ2VyLFxuICAgIH0pO1xuXG4gICAgY29uc3QgdXNlVGVtcGxhdGUgPSBfY3JlYXRlVXNlVGVtcGxhdGUoe1xuICAgICAgcHJvcHMsXG4gICAgICBzdGF0ZSxcbiAgICAgIGh0bWwsXG4gICAgICBqc3gsXG4gICAgICB0c3gsXG4gICAgICBzdHlsZXMsXG4gICAgICBhY3Rpb25zLFxuICAgIH0pO1xuXG4gICAgY29uc3QgY2hpbGRyZW4gPSBmYWN0b3J5KHtcbiAgICAgIHByb3BzLFxuICAgICAgdXNlU3RhdGUsXG4gICAgICB1c2VTdHlsZSxcbiAgICAgIHVzZVRlbXBsYXRlLFxuICAgICAgdXNlQWN0aW9uLFxuICAgIH0pIGFzIFRlbXBsYXRlU2NoZW1hW107XG5cbiAgICBjb25zdCBvbGRFbGVtZW50ID0gcGFyZW50RWxlbWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKSBhcyBFbGVtZW50O1xuICAgIHNldEVsZW1lbnRBdHRyaWJ1dGVzKGVsZW1lbnQsIF9hdHRyaWJ1dGVzKTtcblxuICAgIG9sZEVsZW1lbnRcbiAgICAgID8gb2xkRWxlbWVudC5yZXBsYWNlV2l0aChlbGVtZW50KVxuICAgICAgOiBwYXJlbnRFbGVtZW50Lmluc2VydEFkamFjZW50RWxlbWVudChcImJlZm9yZWVuZFwiLCBlbGVtZW50KTtcblxuICAgIHJlbmRlckNoaWxkcmVuKGNoaWxkcmVuLCBlbGVtZW50LCBzdGF0ZSk7XG5cbiAgICBzdGF0ZU1hbmFnZXIud2F0Y2goKHBheWxvYWQpID0+IHtcbiAgICAgIGVsZW1lbnQuaW5uZXJIVE1MID0gXCJcIjtcbiAgICAgIHJlbmRlcih0ZW1wbGF0ZSwgcGFyZW50RWxlbWVudCwgcGF5bG9hZCk7XG4gICAgfSk7XG4gIH07XG59O1xuIiwgImltcG9ydCB0eXBlIHsgU3RhdGUgfSBmcm9tIFwiQC9zdGF0ZVwiO1xuaW1wb3J0IHR5cGUgeyBUZW1wbGF0ZVNjaGVtYSB9IGZyb20gXCJAL3RlbXBsYXRlXCI7XG5pbXBvcnQgeyBzZXRFbGVtZW50QXR0cmlidXRlcyB9IGZyb20gXCIuL3NldEVsZW1lbnRBdHRyaWJ1dGVzXCI7XG5pbXBvcnQgeyByZW5kZXJDaGlsZHJlbiB9IGZyb20gXCIuL3JlbmRlckNoaWxkcmVuXCI7XG5cbmV4cG9ydCBjb25zdCBjcmVhdGVFbGVtZW50QnlUYWdOYW1lID1cbiAgKHRlbXBsYXRlOiBUZW1wbGF0ZVNjaGVtYSwgcGFyZW50RWxlbWVudDogRWxlbWVudCwgc3RhdGU6IFN0YXRlID0ge30pID0+XG4gICgpID0+IHtcbiAgICBjb25zdCB0YWdOYW1lID0gdGVtcGxhdGUudHlwZSBhcyBzdHJpbmc7XG4gICAgY29uc3Qgc2VsZWN0b3IgPSB0YWdOYW1lLnRvTG93ZXJDYXNlKCk7XG4gICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnTmFtZSk7XG4gICAgY29uc3QgaGFzaElkID0gcGFyZW50RWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJjbGFzc1wiKSBhcyBzdHJpbmc7XG4gICAgY29uc3QgY2xhc3NOYW1lID0gdGVtcGxhdGU/LnByb3BzPy5jbGFzcyBhcyBzdHJpbmc7XG4gICAgaWYgKGNsYXNzTmFtZSkge1xuICAgICAgaWYgKCFjbGFzc05hbWUuaW5jbHVkZXMoaGFzaElkKSkge1xuICAgICAgICBjb25zdCBuZXdDbGFzc05hbWUgPSBgJHtoYXNoSWR9XyR7Y2xhc3NOYW1lfWA7XG4gICAgICAgIHNldEVsZW1lbnRBdHRyaWJ1dGVzKGVsZW1lbnQsIHsgY2xhc3M6IG5ld0NsYXNzTmFtZSB9KTtcbiAgICAgICAgcGFyZW50RWxlbWVudC5pbnNlcnRBZGphY2VudEVsZW1lbnQoXCJiZWZvcmVlbmRcIiwgZWxlbWVudCk7XG4gICAgICAgIHJlbmRlckNoaWxkcmVuKHRlbXBsYXRlLmNoaWxkcmVuLCBlbGVtZW50LCBzdGF0ZSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG4gICAgc2V0RWxlbWVudEF0dHJpYnV0ZXMoZWxlbWVudCwgdGVtcGxhdGUucHJvcHMpO1xuICAgIHBhcmVudEVsZW1lbnQuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KFwiYmVmb3JlZW5kXCIsIGVsZW1lbnQpO1xuICAgIHJlbmRlckNoaWxkcmVuKHRlbXBsYXRlLmNoaWxkcmVuLCBlbGVtZW50LCBzdGF0ZSk7XG4gIH07XG4iLCAiaW1wb3J0IHsgcmVuZGVyIH0gZnJvbSBcIkAvcmVuZGVyXCI7XG5pbXBvcnQgdHlwZSB7IFRlbXBsYXRlU2NoZW1hLCBUYWdnZWRUZW1wbGF0ZSB9IGZyb20gXCJAL3R5cGVzXCI7XG5pbXBvcnQgdHlwZSB7IFN0YXRlIH0gZnJvbSBcIkAvc3RhdGVcIjtcblxuZXhwb3J0IGNvbnN0IHJlbmRlclRlbXBsYXRlRGF0YSA9XG4gICh0ZW1wbGF0ZURhdGE6IFRhZ2dlZFRlbXBsYXRlLCBlbGVtZW50OiBFbGVtZW50LCBzdGF0ZTogU3RhdGUgPSB7fSkgPT5cbiAgICAoKSA9PiB7XG4gICAgICBpZiAodHlwZW9mIHRlbXBsYXRlRGF0YSA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICBlbGVtZW50Lmluc2VydEFkamFjZW50SFRNTChcImJlZm9yZWVuZFwiLCB0ZW1wbGF0ZURhdGEpO1xuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIHRlbXBsYXRlRGF0YSA9PT0gXCJudW1iZXJcIikge1xuICAgICAgICBjb25zdCBkYXRhID0gTnVtYmVyKHRlbXBsYXRlRGF0YSk7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gZGF0YS50b1N0cmluZygpO1xuICAgICAgICBlbGVtZW50Lmluc2VydEFkamFjZW50SFRNTChcImJlZm9yZWVuZFwiLCB2YWx1ZSk7XG4gICAgICB9XG4gICAgfTtcbiIsICJpbXBvcnQgdHlwZSB7IFRhZ2dlZFRlbXBsYXRlLCBUZW1wbGF0ZVNjaGVtYSB9IGZyb20gXCJAL3RlbXBsYXRlXCI7XG5pbXBvcnQge1xuICByZW5kZXJUZW1wbGF0ZUFycmF5LFxuICByZW5kZXJUZW1wbGF0ZU9iamVjdCxcbiAgcmVuZGVyVGVtcGxhdGVEYXRhLFxufSBmcm9tIFwiQC9hY3Rpb25zXCI7XG5pbXBvcnQgeyBpc0FycmF5LCBpc09iamVjdCwgaXNUZW1wbGF0ZURhdGEgfSBmcm9tIFwiQC92YWxpZGF0b3JzXCI7XG5cbnR5cGUgQ29udGV4dEVsZW1lbnQgPSBFbGVtZW50O1xuaW1wb3J0IHsgY3JlYXRlQ2hhaW4gfSBmcm9tIFwiQC9mYWN0b3JpZXNcIjtcbmltcG9ydCB7IGNyZWF0ZVN0YXRlLCB0eXBlIFN0YXRlIH0gZnJvbSBcIkAvc3RhdGVcIjtcblxuLy9jb25zdCBnbG9iYWxTdGF0ZSA9IGNyZWF0ZVN0YXRlKHt9KTtcblxuZXhwb3J0IGNvbnN0IHJlbmRlciA9IChcbiAgdGVtcGxhdGU6IFRhZ2dlZFRlbXBsYXRlLFxuICBjb250ZXh0OiBDb250ZXh0RWxlbWVudCA9IGRvY3VtZW50LmJvZHksXG4gIHN0YXRlOiBTdGF0ZSA9IHt9LFxuKTogQ29udGV4dEVsZW1lbnQgPT4ge1xuICBjb25zdCBjaGFpbiA9IGNyZWF0ZUNoYWluKCk7XG4gIGNvbnN0IGNvbXBvbmVudEVsZW1lbnQgPSBjb250ZXh0IHx8IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJib2R5XCIpO1xuXG4gIGNoYWluLmFkZCh7XG4gICAgdmFsaWRhdG9yOiBpc0FycmF5KHRlbXBsYXRlKSxcbiAgICBhY3Rpb246IHJlbmRlclRlbXBsYXRlQXJyYXkoXG4gICAgICB0ZW1wbGF0ZSBhcyBUZW1wbGF0ZVNjaGVtYVtdLFxuICAgICAgY29tcG9uZW50RWxlbWVudCxcbiAgICAgIHN0YXRlLFxuICAgICksXG4gIH0pO1xuXG4gIGNoYWluLmFkZCh7XG4gICAgdmFsaWRhdG9yOiBpc09iamVjdCh0ZW1wbGF0ZSksXG4gICAgYWN0aW9uOiByZW5kZXJUZW1wbGF0ZU9iamVjdChcbiAgICAgIHRlbXBsYXRlIGFzIFRlbXBsYXRlU2NoZW1hLFxuICAgICAgY29tcG9uZW50RWxlbWVudCxcbiAgICAgIHN0YXRlLFxuICAgICksXG4gIH0pO1xuXG4gIGNoYWluLmFkZCh7XG4gICAgdmFsaWRhdG9yOiBpc1RlbXBsYXRlRGF0YSh0ZW1wbGF0ZSksXG4gICAgYWN0aW9uOiByZW5kZXJUZW1wbGF0ZURhdGEodGVtcGxhdGUsIGNvbXBvbmVudEVsZW1lbnQsIHN0YXRlKSxcbiAgfSk7XG5cbiAgY2hhaW4uZXhlY3V0ZSgpO1xuICByZXR1cm4gY29tcG9uZW50RWxlbWVudDtcbn07XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7O0FBT08sSUFBTSxZQUFZLDZCQUFtQjtBQUMxQyxNQUFJO0FBRUosUUFBTSxRQUFRLHdCQUFDLGFBQTZCO0FBQzFDLGVBQVcsU0FBUztBQUNwQixXQUFPLFNBQVM7QUFBQSxFQUNsQixHQUhjO0FBS2QsUUFBTSxRQUFRLHdCQUFDLGFBQThCO0FBQzNDLFdBQU8sU0FBUyxRQUFRO0FB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QWMsc0JBQXNCLGFBQWEsT0FBTztBQUN4RCxpQkFBZSxTQUFTLFVBQVUsU0FBUyxLQUFLO0FBQ2xELEdBbkJBOzs7QUNGSyxJQUFNLHFCQUNYLHdCQUFDLGNBQThCLFNBQWtCLFFBQWUsQ0FBQyxNQUMvRCxNQUFNO0FBQ0osTUFBSSxPQUFPLGlCQUFpQixVQUFVO0FBQ3BDLFlBQVEsbUJBQW1CLGFBQWEsWUFBWTtBQUFBLEVBQ3REO0FBRUEsTUFBSSxPQUFPLGlCQUFpQixVQUFVO0FBQ3BDLFVBQU0sT0FBTyxPQUFPLFlBQVk7QUFDaEMsVUFBTSxRQUFRLEtBQUssU0FBUztBQUM1QixZQUFRLG1CQUFtQixhQUFhLEtBQUs7QUFBQSxFQUMvQztBQUNGLEdBWEY7OztBQ1NLLElBQU0sU0FBUyx3QkFDcEIsVUFDQSxVQUEwQixTQUFTLE1BQ25DLFFBQWUsQ0FBQyxNQUNHO0FBQ25CLFFBQU0sUUFBUSxZQUFZO0FBQzFCLFFBQU0sbUJBQW1CLFdBQVcsU0FBUyxjQUFjLE1BQU07QUFFakUsUUFBTSxJQUFJO0FBQUEsSUFDUixXQUFXLFFBQVEsUUFBUTtBQUFBLElBQzNCLFFBQVE7QUFBQSxNQUNOO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxJQUNGO0FBQUEsRUFDRixDQUFDO0FBRUQsUUFBTSxJQUFJO0FBQUEsSUFDUixXQUFXLFNBQVMsUUFBUTtBQUFBLElBQzVCLFFBQVE7QUFBQSxNQUNOO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxJQUNGO0FBQUEsRUFDRixDQUFDO0FBRUQsUUFBTSxJQUFJO0FBQUEsSUFDUixXQUFXLGVBQWUsUUFBUTtBQUFBLElBQ2xDLFFBQVEsbUJBQW1CLFVBQVUsa0JBQWtCLEtBQUs7QUFBQSxFQUM5RCxDQUFDO0FBRUQsUUFBTSxRQUFRO0FBQ2QsU0FBTztBQUNULEdBakNzQjsiLAogICJuYW1lcyI6IFsidCIsICJuIiwgInMiLCAiciIsICJnbG9iYWxSdWxlcyIsICJyZXN1bHQiLCAic2VsZWN0b3IiLCAiY3NzIl0KfQo=
