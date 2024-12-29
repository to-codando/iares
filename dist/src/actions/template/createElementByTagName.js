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
  const regex = /\.(?<![\d])(?![\d])([\w-]+)/g;
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
export {
  createElementByTagName
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vLi4vc3JjL3V0aWxzL2luZGV4LnRzIiwgIi4uLy4uLy4uLy4uL3NyYy92YWxpZGF0b3JzL3RlbXBsYXRlL2luZGV4LnRzIiwgIi4uLy4uLy4uLy4uL3NyYy9hY3Rpb25zL3RlbXBsYXRlL3NldEVsZW1lbnRBdHRyaWJ1dGVzLnRzIiwgIi4uLy4uLy4uLy4uL3NyYy9mYWN0b3JpZXMvY3JlYXRlQ2hhaW4vaW5kZXgudHMiLCAiLi4vLi4vLi4vLi4vc3JjL2FjdGlvbnMvdGVtcGxhdGUvcmVuZGVyVGVtcGxhdGVPYmplY3QudHMiLCAiLi4vLi4vLi4vLi4vc3JjL2FjdGlvbnMvdGVtcGxhdGUvcmVuZGVyVGVtcGxhdGVBcnJheS50cyIsICIuLi8uLi8uLi8uLi9zcmMvc3RhdGUvY3JlYXRlU3RhdGUudHMiLCAiLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL2h0bUAzLjEuMS9ub2RlX21vZHVsZXMvaHRtL2Rpc3QvaHRtLm1vZHVsZS5qcyIsICIuLi8uLi8uLi8uLi9zcmMvdGVtcGxhdGUvaHRtbC50cyIsICIuLi8uLi8uLi8uLi9zcmMvc3R5bGUvY3JlYXRlSGFzaC50cyIsICIuLi8uLi8uLi8uLi9zcmMvc3R5bGUvY3JlYXRlU3R5bGVFbGVtZW50LnRzIiwgIi4uLy4uLy4uLy4uL3NyYy9zdHlsZS9jc3NQYXJzZXIudHMiLCAiLi4vLi4vLi4vLi4vc3JjL3N0eWxlL2Nzcy50cyIsICIuLi8uLi8uLi8uLi9zcmMvYWN0aW9ucy90ZW1wbGF0ZS9jcmVhdGVFbGVtZW50QnlGYWN0b3J5TmFtZS50cyIsICIuLi8uLi8uLi8uLi9zcmMvYWN0aW9ucy90ZW1wbGF0ZS9yZW5kZXJUZW1wbGF0ZURhdGEudHMiLCAiLi4vLi4vLi4vLi4vc3JjL3JlbmRlci9pbmRleC50cyIsICIuLi8uLi8uLi8uLi9zcmMvYWN0aW9ucy90ZW1wbGF0ZS9yZW5kZXJDaGlsZHJlbi50cyIsICIuLi8uLi8uLi8uLi9zcmMvYWN0aW9ucy90ZW1wbGF0ZS9jcmVhdGVFbGVtZW50QnlUYWdOYW1lLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJleHBvcnQgY29uc3QgZXNjYXBlVGVtcGxhdGVTdHJpbmcgPSAodGVtcGxhdGVTdHJpbmc6IHN0cmluZyk6IHN0cmluZyA9PiB7XG4gIGlmICh0eXBlb2YgdGVtcGxhdGVTdHJpbmcgIT09IFwic3RyaW5nXCIpIHJldHVybiB0ZW1wbGF0ZVN0cmluZztcbiAgcmV0dXJuIHRlbXBsYXRlU3RyaW5nXG4gICAgLnJlcGxhY2UoLyYvZywgXCImYW1wO1wiKVxuICAgIC5yZXBsYWNlKC88L2csIFwiJmx0O1wiKVxuICAgIC5yZXBsYWNlKC8+L2csIFwiJmd0O1wiKVxuICAgIC5yZXBsYWNlKC9cIi9nLCBcIiZxdW90O1wiKVxuICAgIC5yZXBsYWNlKC8nL2csIFwiJiMzOTtcIilcbiAgICAucmVwbGFjZSgvXFwvL2csIFwiJiN4MkY7XCIpO1xufTtcblxuZXhwb3J0IGNvbnN0IGJpbmRTdHlsZVNjb3BlID0gKHNjb3BlSWQ6IHN0cmluZywgc3RyaW5nczogc3RyaW5nKTogc3RyaW5nID0+IHtcbiAgY29uc3QgcmVnZXggPSAvKFxcLihcXHcrKShcXC0qfFxcXyopPykrXFx3Ky9naTtcbiAgcmV0dXJuIHN0cmluZ3MucmVwbGFjZShyZWdleCwgKHZhbHVlcykgPT4ge1xuICAgIHJldHVybiBgLiR7c2NvcGVJZH0tJHt2YWx1ZXMucmVwbGFjZSgvXFwuLywgXCJcIil9YDtcbiAgfSk7XG59O1xuXG5leHBvcnQgY29uc3QgY3JlYXRlVVVJRCA9ICgpID0+IE1hdGgucmFuZG9tKCkudG9TdHJpbmcoMzYpLnNsaWNlKDIsIDYpO1xuXG5leHBvcnQgY29uc3QgSFRNTEV2ZW50cyA9IFtcbiAgLy8gRXZlbnRvcyBkZSBNb3VzZVxuICBcIm9uY2xpY2tcIixcbiAgXCJvbmRibGNsaWNrXCIsXG4gIFwib25tb3VzZWRvd25cIixcbiAgXCJvbm1vdXNldXBcIixcbiAgXCJvbm1vdXNlb3ZlclwiLFxuICBcIm9ubW91c2VvdXRcIixcbiAgXCJvbm1vdXNlbW92ZVwiLFxuICBcIm9ubW91c2VlbnRlclwiLFxuICBcIm9ubW91c2VsZWF2ZVwiLFxuICBcIm9uY29udGV4dG1lbnVcIixcblxuICAvLyBFdmVudG9zIGRlIFRlY2xhZG9cbiAgXCJvbmtleWRvd25cIixcbiAgXCJvbmtleXVwXCIsXG4gIFwib25rZXlwcmVzc1wiLFxuXG4gIC8vIEV2ZW50b3MgZGUgRm9jb1xuICBcIm9uZm9jdXNcIixcbiAgXCJvbmJsdXJcIixcblxuICAvLyBFdmVudG9zIGRlIEZvcm11bFx1MDBFMXJpb1xuICBcIm9uc3VibWl0XCIsXG4gIFwib25jaGFuZ2VcIixcbiAgXCJvbmlucHV0XCIsXG4gIFwib25yZXNldFwiLFxuICBcIm9uaW52YWxpZFwiLFxuXG4gIC8vIEV2ZW50b3MgZGUgTVx1MDBFRGRpYVxuICBcIm9ucGxheVwiLFxuICBcIm9ucGF1c2VcIixcbiAgXCJvbmVuZGVkXCIsXG4gIFwib252b2x1bWVjaGFuZ2VcIixcblxuICAvLyBFdmVudG9zIGRlIFRvcXVlIChUb3VjaCkgLSBwYXJhIGRpc3Bvc2l0aXZvcyBtXHUwMEYzdmVpc1xuICBcIm9udG91Y2hzdGFydFwiLFxuICBcIm9udG91Y2htb3ZlXCIsXG4gIFwib250b3VjaGVuZFwiLFxuICBcIm9udG91Y2hjYW5jZWxcIixcblxuICAvLyBFdmVudG9zIGRlIEFuaW1hXHUwMEU3XHUwMEUzbyBlIFRyYW5zaVx1MDBFN1x1MDBFM29cbiAgXCJvbmFuaW1hdGlvbnN0YXJ0XCIsXG4gIFwib25hbmltYXRpb25lbmRcIixcbiAgXCJvbmFuaW1hdGlvbml0ZXJhdGlvblwiLFxuICBcIm9udHJhbnNpdGlvbmVuZFwiLFxuXG4gIC8vIEV2ZW50b3MgZGUgT3V0cm9zIEludGVyYXRpdm9zXG4gIFwib25sb2FkXCIsXG4gIFwib25lcnJvclwiLFxuICBcIm9ucmVzaXplXCIsXG4gIFwib25zY3JvbGxcIixcbl07XG4iLCAiaW1wb3J0IHsgSFRNTEV2ZW50cyB9IGZyb20gXCJAL3V0aWxzXCI7XG5cbmNvbnN0IGlzT2JqZWN0ID1cbiAgPFQ+KHBheWxvYWQ6IFQpID0+XG4gICAgKCkgPT4ge1xuICAgICAgcmV0dXJuICEhcGF5bG9hZCAmJiAhQXJyYXkuaXNBcnJheShwYXlsb2FkKSAmJiB0eXBlb2YgcGF5bG9hZCA9PT0gXCJvYmplY3RcIjtcbiAgICB9O1xuXG5jb25zdCBpc0FycmF5ID1cbiAgPFQ+KHBheWxvYWQ6IFQpID0+XG4gICAgKCkgPT4ge1xuICAgICAgcmV0dXJuICEhcGF5bG9hZCAmJiBBcnJheS5pc0FycmF5KHBheWxvYWQpO1xuICAgIH07XG5cbmNvbnN0IGlzRnVuY3Rpb24gPVxuICA8VCA9IHZvaWQ+KHBheWxvYWQ6IFQpID0+XG4gICAgKCkgPT4ge1xuICAgICAgcmV0dXJuICEhcGF5bG9hZCAmJiB0eXBlb2YgcGF5bG9hZCA9PT0gXCJmdW5jdGlvblwiO1xuICAgIH07XG5cbmNvbnN0IGlzU3RyaW5nID1cbiAgPFQgPSB2b2lkPihwYXlsb2FkOiBUKSA9PlxuICAgICgpID0+IHtcbiAgICAgIHJldHVybiB0eXBlb2YgcGF5bG9hZCA9PT0gXCJzdHJpbmdcIjtcbiAgICB9O1xuXG5jb25zdCBpc0V2ZW50TmFtZSA9XG4gIDxUID0gdm9pZD4ocGF5bG9hZDogVCkgPT5cbiAgICAoKSA9PiB7XG4gICAgICBpZiAodHlwZW9mIHBheWxvYWQgIT09IFwic3RyaW5nXCIpIHJldHVybiBmYWxzZTtcbiAgICAgIHJldHVybiBIVE1MRXZlbnRzLmluY2x1ZGVzKHBheWxvYWQudG9Mb3dlckNhc2UoKSk7XG4gICAgfTtcblxuY29uc3QgaXNUZW1wbGF0ZURhdGEgPVxuICA8VCA9IHZvaWQ+KHBheWxvYWQ6IFQpID0+XG4gICAgKCkgPT4ge1xuICAgICAgcmV0dXJuIHR5cGVvZiBwYXlsb2FkID09PSBcInN0cmluZ1wiIHx8IHR5cGVvZiBwYXlsb2FkID09PSBcIm51bWJlclwiO1xuICAgIH07XG5cbmV4cG9ydCB7IGlzT2JqZWN0LCBpc0FycmF5LCBpc0Z1bmN0aW9uLCBpc1N0cmluZywgaXNFdmVudE5hbWUsIGlzVGVtcGxhdGVEYXRhIH07XG4iLCAiaW1wb3J0IHsgaXNFdmVudE5hbWUgfSBmcm9tIFwiQC92YWxpZGF0b3JzXCI7XG5cbnR5cGUgQXR0cmlidXRlID0gb2JqZWN0ICYge1xuICBba2V5OiBzeW1ib2wgfCBzdHJpbmddOiB1bmtub3duO1xufTtcblxudHlwZSBFdmVudEhhbmRsZXIgPSA8SyBleHRlbmRzIGtleW9mIEhUTUxFbGVtZW50RXZlbnRNYXA+KFxuICBldmVudDogSFRNTEVsZW1lbnRFdmVudE1hcFtLXSxcbikgPT4gdm9pZDtcblxuZXhwb3J0IGNvbnN0IHNldEVsZW1lbnRBdHRyaWJ1dGVzID0gKFxuICBlbGVtZW50OiBFbGVtZW50LFxuICBhdHRyaWJ1dGVzOiBBdHRyaWJ1dGUsXG4pOiBFbGVtZW50ID0+IHtcbiAgY29uc3QgYXR0cmlidXRlS2V5cyA9IGF0dHJpYnV0ZXMgPyBPYmplY3Qua2V5cyhhdHRyaWJ1dGVzKSA6IFtdO1xuICBmb3IgKGNvbnN0IGtleSBvZiBhdHRyaWJ1dGVLZXlzKSB7XG4gICAgaWYgKCFpc0V2ZW50TmFtZShrZXkpKCkpIHtcbiAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKGtleSwgYXR0cmlidXRlc1trZXldIGFzIHN0cmluZyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGV2ZW50TmFtZSA9IGtleVxuICAgICAgICAucmVwbGFjZSgvb24vLCBcIlwiKVxuICAgICAgICAudG9Mb3dlckNhc2UoKSBhcyBrZXlvZiBIVE1MRWxlbWVudEV2ZW50TWFwO1xuICAgICAgY29uc3QgZXZlbnRIYW5kbGVyID0gYXR0cmlidXRlc1trZXldIGFzIEV2ZW50SGFuZGxlcjtcbiAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGV2ZW50SGFuZGxlcik7XG4gICAgfVxuICB9XG4gIHJldHVybiBlbGVtZW50O1xufTtcbiIsICJpbXBvcnQgdHlwZSB7IENoYWluTGluayB9IGZyb20gXCIuL3R5cGVzXCI7XG5cbmV4cG9ydCBjb25zdCBjcmVhdGVDaGFpbiA9ICgpID0+IHtcbiAgY29uc3QgX2NoYWluID0gbmV3IFNldDxDaGFpbkxpbms8dW5rbm93bj4+KCk7XG5cbiAgY29uc3QgYWRkID0gPFQ+KGNoYWluTGluazogQ2hhaW5MaW5rPFQ+KSA9PiB7XG4gICAgX2NoYWluLmFkZChjaGFpbkxpbmspO1xuICB9O1xuXG4gIGNvbnN0IGV4ZWN1dGUgPSAoKSA9PiB7XG4gICAgZm9yIChjb25zdCB7IGFjdGlvbiwgdmFsaWRhdG9yIH0gb2YgX2NoYWluKSB7XG4gICAgICBpZiAodmFsaWRhdG9yKCkpIGFjdGlvbigpO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4geyBhZGQsIGV4ZWN1dGUgfTtcbn07XG4iLCAiaW1wb3J0IHR5cGUgeyBUZW1wbGF0ZVNjaGVtYSB9IGZyb20gXCJAL3R5cGVzXCI7XG5pbXBvcnQgeyBjcmVhdGVDaGFpbiB9IGZyb20gXCJAL2ZhY3Rvcmllc1wiO1xuaW1wb3J0IHsgY3JlYXRlRWxlbWVudEJ5RmFjdG9yeU5hbWUsIGNyZWF0ZUVsZW1lbnRCeVRhZ05hbWUgfSBmcm9tIFwiQC9hY3Rpb25zXCI7XG5pbXBvcnQgeyBpc0Z1bmN0aW9uLCBpc1N0cmluZyB9IGZyb20gXCJAL3ZhbGlkYXRvcnNcIjtcbmltcG9ydCB0eXBlIHsgU3RhdGUgfSBmcm9tIFwiQC9zdGF0ZVwiO1xuXG5leHBvcnQgY29uc3QgcmVuZGVyVGVtcGxhdGVPYmplY3QgPVxuICAodGVtcGxhdGU6IFRlbXBsYXRlU2NoZW1hLCBjb250ZXh0RWxlbWVudDogRWxlbWVudCwgc3RhdGU6IFN0YXRlID0ge30pID0+XG4gICAgKCk6IHZvaWQgPT4ge1xuICAgICAgY29uc3QgX2NoYWluID0gY3JlYXRlQ2hhaW4oKTtcblxuICAgICAgX2NoYWluLmFkZCh7XG4gICAgICAgIHZhbGlkYXRvcjogaXNTdHJpbmcodGVtcGxhdGUudHlwZSksXG4gICAgICAgIGFjdGlvbjogY3JlYXRlRWxlbWVudEJ5VGFnTmFtZSh0ZW1wbGF0ZSwgY29udGV4dEVsZW1lbnQsIHN0YXRlKSxcbiAgICAgIH0pO1xuXG4gICAgICBfY2hhaW4uYWRkKHtcbiAgICAgICAgdmFsaWRhdG9yOiBpc0Z1bmN0aW9uKHRlbXBsYXRlLnR5cGUpLFxuICAgICAgICBhY3Rpb246IGNyZWF0ZUVsZW1lbnRCeUZhY3RvcnlOYW1lKHRlbXBsYXRlLCBjb250ZXh0RWxlbWVudCwgc3RhdGUpLFxuICAgICAgfSk7XG5cbiAgICAgIF9jaGFpbi5leGVjdXRlKCk7XG4gICAgfTtcbiIsICJpbXBvcnQgeyByZW5kZXIgfSBmcm9tIFwiQC9yZW5kZXJcIjtcbmltcG9ydCB0eXBlIHsgVGVtcGxhdGVTY2hlbWEgfSBmcm9tIFwiQC90eXBlc1wiO1xuaW1wb3J0IHR5cGUgeyBTdGF0ZSB9IGZyb20gXCJAL3N0YXRlXCI7XG5cbmV4cG9ydCBjb25zdCByZW5kZXJUZW1wbGF0ZUFycmF5ID1cbiAgKFxuICAgIHRlbXBsYXRlU2NoZW1hOiBUZW1wbGF0ZVNjaGVtYVtdLFxuICAgIGNvbnRleHRFbGVtZW50OiBFbGVtZW50LFxuICAgIHN0YXRlOiBTdGF0ZSA9IHt9LFxuICApID0+XG4gICAgKCkgPT4ge1xuICAgICAgZm9yIChjb25zdCB0ZW1wbGF0ZSBvZiB0ZW1wbGF0ZVNjaGVtYSkge1xuICAgICAgICByZW5kZXIodGVtcGxhdGUsIGNvbnRleHRFbGVtZW50LCBzdGF0ZSk7XG4gICAgICB9XG4gICAgfTtcbiIsICJpbXBvcnQgdHlwZSB7IFN0YXRlV2F0Y2hlciwgU3RhdGUsIFN0YXRlTWFuYWdlciB9IGZyb20gXCIuL3R5cGVzXCI7XG5cbmNvbnN0IF9jcmVhdGVVVUlEID0gKCk6IHN0cmluZyA9PiBNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKDM2KS5zdWJzdHJpbmcoMiwgMTEpO1xuXG5leHBvcnQgY29uc3QgY3JlYXRlU3RhdGUgPSA8UyA9IHVua25vd24+KFxuICBpbml0aWFsU3RhdGU6IFN0YXRlPFM+LFxuKTogU3RhdGVNYW5hZ2VyPFM+ID0+IHtcbiAgY29uc3QgX3N0YXRlID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShpbml0aWFsU3RhdGUpKTtcbiAgY29uc3QgX3dhdGNoZXJzID0gbmV3IFNldDxTdGF0ZVdhdGNoZXI8Uz4+KCk7XG5cbiAgY29uc3QgX25vdGlmeUhhbmRsZXJzID0gKHBheWxvYWQ6IFN0YXRlPFM+KSA9PiB7XG4gICAgZm9yIChjb25zdCBzdGF0ZVdhdGNoZXIgb2YgX3dhdGNoZXJzKSB7XG4gICAgICBzdGF0ZVdhdGNoZXIocGF5bG9hZCk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IHNldCA9IChwYXlsb2FkOiBTdGF0ZTxTPikgPT4ge1xuICAgIE9iamVjdC5hc3NpZ24oX3N0YXRlLCBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHBheWxvYWQpKSk7XG4gICAgX25vdGlmeUhhbmRsZXJzKEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoX3N0YXRlKSkpO1xuICB9O1xuXG4gIGNvbnN0IGdldCA9ICgpOiBTdGF0ZTxTPiA9PiB7XG4gICAgcmV0dXJuIEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoX3N0YXRlKSk7XG4gIH07XG5cbiAgY29uc3Qgd2F0Y2ggPSAoY2FsbGJhY2s6IFN0YXRlV2F0Y2hlcjxTPikgPT4ge1xuICAgIF93YXRjaGVycy5hZGQoY2FsbGJhY2spO1xuICB9O1xuXG4gIHJldHVybiB7IHNldCwgZ2V0LCB3YXRjaCB9O1xufTtcbiIsICJ2YXIgbj1mdW5jdGlvbih0LHMscixlKXt2YXIgdTtzWzBdPTA7Zm9yKHZhciBoPTE7aDxzLmxlbmd0aDtoKyspe3ZhciBwPXNbaCsrXSxhPXNbaF0/KHNbMF18PXA/MToyLHJbc1toKytdXSk6c1srK2hdOzM9PT1wP2VbMF09YTo0PT09cD9lWzFdPU9iamVjdC5hc3NpZ24oZVsxXXx8e30sYSk6NT09PXA/KGVbMV09ZVsxXXx8e30pW3NbKytoXV09YTo2PT09cD9lWzFdW3NbKytoXV0rPWErXCJcIjpwPyh1PXQuYXBwbHkoYSxuKHQsYSxyLFtcIlwiLG51bGxdKSksZS5wdXNoKHUpLGFbMF0/c1swXXw9Mjooc1toLTJdPTAsc1toXT11KSk6ZS5wdXNoKGEpfXJldHVybiBlfSx0PW5ldyBNYXA7ZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24ocyl7dmFyIHI9dC5nZXQodGhpcyk7cmV0dXJuIHJ8fChyPW5ldyBNYXAsdC5zZXQodGhpcyxyKSksKHI9bih0aGlzLHIuZ2V0KHMpfHwoci5zZXQocyxyPWZ1bmN0aW9uKG4pe2Zvcih2YXIgdCxzLHI9MSxlPVwiXCIsdT1cIlwiLGg9WzBdLHA9ZnVuY3Rpb24obil7MT09PXImJihufHwoZT1lLnJlcGxhY2UoL15cXHMqXFxuXFxzKnxcXHMqXFxuXFxzKiQvZyxcIlwiKSkpP2gucHVzaCgwLG4sZSk6Mz09PXImJihufHxlKT8oaC5wdXNoKDMsbixlKSxyPTIpOjI9PT1yJiZcIi4uLlwiPT09ZSYmbj9oLnB1c2goNCxuLDApOjI9PT1yJiZlJiYhbj9oLnB1c2goNSwwLCEwLGUpOnI+PTUmJigoZXx8IW4mJjU9PT1yKSYmKGgucHVzaChyLDAsZSxzKSxyPTYpLG4mJihoLnB1c2gocixuLDAscykscj02KSksZT1cIlwifSxhPTA7YTxuLmxlbmd0aDthKyspe2EmJigxPT09ciYmcCgpLHAoYSkpO2Zvcih2YXIgbD0wO2w8blthXS5sZW5ndGg7bCsrKXQ9blthXVtsXSwxPT09cj9cIjxcIj09PXQ/KHAoKSxoPVtoXSxyPTMpOmUrPXQ6ND09PXI/XCItLVwiPT09ZSYmXCI+XCI9PT10PyhyPTEsZT1cIlwiKTplPXQrZVswXTp1P3Q9PT11P3U9XCJcIjplKz10OidcIic9PT10fHxcIidcIj09PXQ/dT10OlwiPlwiPT09dD8ocCgpLHI9MSk6ciYmKFwiPVwiPT09dD8ocj01LHM9ZSxlPVwiXCIpOlwiL1wiPT09dCYmKHI8NXx8XCI+XCI9PT1uW2FdW2wrMV0pPyhwKCksMz09PXImJihoPWhbMF0pLHI9aCwoaD1oWzBdKS5wdXNoKDIsMCxyKSxyPTApOlwiIFwiPT09dHx8XCJcXHRcIj09PXR8fFwiXFxuXCI9PT10fHxcIlxcclwiPT09dD8ocCgpLHI9Mik6ZSs9dCksMz09PXImJlwiIS0tXCI9PT1lJiYocj00LGg9aFswXSl9cmV0dXJuIHAoKSxofShzKSksciksYXJndW1lbnRzLFtdKSkubGVuZ3RoPjE/cjpyWzBdfVxuIiwgImltcG9ydCBodG0gZnJvbSBcImh0bVwiO1xuaW1wb3J0IHR5cGUgeyBUYWdnZWRUZW1wbGF0ZSwgVGVtcGxhdGVQcm9wcywgVGVtcGxhdGVTY2hlbWEgfSBmcm9tIFwiLi90eXBlc1wiO1xuXG5jb25zdCBoeXBlcnRleHQgPSAoXG4gIHR5cGU6IHVua25vd24sXG4gIHByb3BzOiBUZW1wbGF0ZVByb3BzLFxuICAuLi5jaGlsZHJlbjogVGVtcGxhdGVTY2hlbWFbXVxuKSA9PiB7XG4gIHJldHVybiB7IHR5cGUsIHByb3BzLCBjaGlsZHJlbiB9O1xufTtcblxuY29uc3QgaHRtbCA9IGh0bS5iaW5kPFRhZ2dlZFRlbXBsYXRlPihoeXBlcnRleHQpO1xuXG5leHBvcnQgeyBodG1sIH07XG5leHBvcnQgeyBodG1sIGFzIGpzeCB9O1xuZXhwb3J0IHsgaHRtbCBhcyB0c3ggfTtcbiIsICIvKipcbiAqIEdlcmEgdW0gaGFzaCBcdTAwRkFuaWNvIGJhc2VhZG8gbm8gYWxnb3JpdG1vIERKQjIuXG4gKiBAcGFyYW0gc3RyIC0gTyBjb250ZVx1MDBGQWRvIGEgcGFydGlyIGRvIHF1YWwgbyBoYXNoIHNlclx1MDBFMSBnZXJhZG8uXG4gKiBAcmV0dXJucyBPIGhhc2ggZ2VyYWRvIGNvbW8gdW1hIHN0cmluZy5cbiAqL1xuZXhwb3J0IGNvbnN0IGNyZWF0ZUhhc2ggPSAodGV4dDogc3RyaW5nLCBzZWxlY3Rvcjogc3RyaW5nKTogc3RyaW5nID0+IHtcbiAgbGV0IGhhc2ggPSA1MzgxO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IHRleHQubGVuZ3RoOyBpKyspIHtcbiAgICBoYXNoID0gKGhhc2ggKiAzMykgXiB0ZXh0LmNoYXJDb2RlQXQoaSk7XG4gIH1cbiAgcmV0dXJuIGAke3NlbGVjdG9yfS0keyhoYXNoID4+PiAwKS50b1N0cmluZygzNil9YDtcbn07XG4iLCAiY29uc3Qgc3R5bGVFbGVtZW50Q2FjaGU6IE1hcDxzdHJpbmcsIEhUTUxTdHlsZUVsZW1lbnQ+ID0gbmV3IE1hcCgpO1xuXG5leHBvcnQgY29uc3QgY3JlYXRlU3R5bGVFbGVtZW50ID0gKGNvbXBvbmVudElkOiBzdHJpbmcpOiBIVE1MU3R5bGVFbGVtZW50ID0+IHtcbiAgY29uc3Qgc3R5bGVFbGVtZW50ID0gc3R5bGVFbGVtZW50Q2FjaGUuZ2V0KGNvbXBvbmVudElkKTtcblxuICBpZiAoc3R5bGVFbGVtZW50ICE9PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gc3R5bGVFbGVtZW50O1xuICB9XG5cbiAgY29uc3Qgc3R5bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gIHN0eWxlLnNldEF0dHJpYnV0ZShcImRhdGEtY29tcG9uZW50XCIsIGNvbXBvbmVudElkKTtcbiAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzdHlsZSk7XG4gIHN0eWxlRWxlbWVudENhY2hlLnNldChjb21wb25lbnRJZCwgc3R5bGUpO1xuXG4gIHJldHVybiBzdHlsZTtcbn07XG4iLCAidHlwZSBXcmFwU3R5bGVQYXJhbXMgPSB7XG4gIHN0eWxlOiBzdHJpbmc7XG4gIHNlbGVjdG9yOiBzdHJpbmc7XG59O1xuXG50eXBlIEFjY3VtdWxhdG9yID0ge1xuICBpbnNpZGVCbG9jazogbnVtYmVyO1xuICBnbG9iYWxSdWxlczogc3RyaW5nO1xuICByZXN1bHQ6IHN0cmluZztcbn07XG5cbnR5cGUgTGluZVByb2Nlc3NpbmcgPSB7XG4gIGdsb2JhbFJ1bGVzOiBzdHJpbmc7XG4gIHJlc3VsdDogc3RyaW5nO1xufTtcblxuY29uc3Qgd3JhcExvb3NlUnVsZXNPdXRzaWRlTWVkaWFRdWVyeSA9ICh7XG4gIHN0eWxlLFxuICBzZWxlY3Rvcixcbn06IFdyYXBTdHlsZVBhcmFtcyk6IHN0cmluZyA9PiB7XG4gIGNvbnN0IGxpbmVzID0gc3R5bGUuc3BsaXQoXCJcXG5cIik7XG4gIGNvbnN0IHJ1bGVSZWdleCA9IC9eXFxzKihbXFx3LV0rKVxccyo6XFxzKlteO10rOy87XG5cbiAgY29uc3QgaW5pdGlhbFN0YXRlOiBBY2N1bXVsYXRvciA9IHtcbiAgICBpbnNpZGVCbG9jazogMCxcbiAgICBnbG9iYWxSdWxlczogXCJcIixcbiAgICByZXN1bHQ6IFwiXCIsXG4gIH07XG5cbiAgY29uc3QgcHJvY2Vzc0dsb2JhbFJ1bGVzID0gKFxuICAgIGdsb2JhbFJ1bGVzOiBzdHJpbmcsXG4gICAgcmVzdWx0OiBzdHJpbmcsXG4gICAgc2VsZWN0b3I6IHN0cmluZyxcbiAgKTogTGluZVByb2Nlc3NpbmcgPT4gKHtcbiAgICBnbG9iYWxSdWxlczogXCJcIixcbiAgICByZXN1bHQ6IGAke3Jlc3VsdH0ke3NlbGVjdG9yfSB7XFxuJHtnbG9iYWxSdWxlc319XFxuXFxuYCxcbiAgfSk7XG5cbiAgY29uc3QgcHJvY2Vzc1JlZ3VsYXJMaW5lID0gKFxuICAgIGxpbmU6IHN0cmluZyxcbiAgICByZXN1bHQ6IHN0cmluZyxcbiAgKTogTGluZVByb2Nlc3NpbmcgPT4gKHtcbiAgICBnbG9iYWxSdWxlczogXCJcIixcbiAgICByZXN1bHQ6IGAke3Jlc3VsdH0ke2xpbmV9XFxuYCxcbiAgfSk7XG5cbiAgY29uc3QgYWRkR2xvYmFsUnVsZSA9IChcbiAgICBsaW5lOiBzdHJpbmcsXG4gICAgZ2xvYmFsUnVsZXM6IHN0cmluZyxcbiAgKTogTGluZVByb2Nlc3NpbmcgPT4gKHtcbiAgICBnbG9iYWxSdWxlczogYCR7Z2xvYmFsUnVsZXN9JHtsaW5lfVxcbmAsXG4gICAgcmVzdWx0OiBcIlwiLFxuICB9KTtcblxuICBjb25zdCBjb3VudEJsb2NrcyA9IChsaW5lOiBzdHJpbmcpOiBudW1iZXIgPT4ge1xuICAgIGNvbnN0IG9wZW5pbmdzID0gKGxpbmUubWF0Y2goL3svZykgfHwgW10pLmxlbmd0aDtcbiAgICBjb25zdCBjbG9zaW5ncyA9IChsaW5lLm1hdGNoKC99L2cpIHx8IFtdKS5sZW5ndGg7XG4gICAgcmV0dXJuIG9wZW5pbmdzIC0gY2xvc2luZ3M7XG4gIH07XG5cbiAgY29uc3QgcHJvY2Vzc0xpbmUgPSAoYWNjOiBBY2N1bXVsYXRvciwgbGluZTogc3RyaW5nKTogQWNjdW11bGF0b3IgPT4ge1xuICAgIGFjYy5pbnNpZGVCbG9jayArPSBjb3VudEJsb2NrcyhsaW5lKTtcblxuICAgIC8vIENhc2UgMTogTGluZSBpcyBhIGdsb2JhbCBydWxlXG4gICAgaWYgKGFjYy5pbnNpZGVCbG9jayA9PT0gMCAmJiBydWxlUmVnZXgudGVzdChsaW5lKSkge1xuICAgICAgY29uc3QgeyBnbG9iYWxSdWxlcywgcmVzdWx0IH0gPSBhZGRHbG9iYWxSdWxlKGxpbmUsIGFjYy5nbG9iYWxSdWxlcyk7XG4gICAgICByZXR1cm4geyAuLi5hY2MsIGdsb2JhbFJ1bGVzLCByZXN1bHQ6IGFjYy5yZXN1bHQgKyByZXN1bHQgfTtcbiAgICB9XG5cbiAgICAvLyBDYXNlIDI6IFRoZXJlIGFyZSBhY2N1bXVsYXRlZCBnbG9iYWwgcnVsZXNcbiAgICBpZiAoYWNjLmdsb2JhbFJ1bGVzKSB7XG4gICAgICBjb25zdCB7IGdsb2JhbFJ1bGVzLCByZXN1bHQgfSA9IHByb2Nlc3NHbG9iYWxSdWxlcyhcbiAgICAgICAgYWNjLmdsb2JhbFJ1bGVzLFxuICAgICAgICBhY2MucmVzdWx0LFxuICAgICAgICBzZWxlY3RvcixcbiAgICAgICk7XG4gICAgICBjb25zdCBwcm9jZXNzZWRMaW5lID0gcHJvY2Vzc1JlZ3VsYXJMaW5lKGxpbmUsIFwiXCIpO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uYWNjLFxuICAgICAgICBnbG9iYWxSdWxlcyxcbiAgICAgICAgcmVzdWx0OiByZXN1bHQgKyBwcm9jZXNzZWRMaW5lLnJlc3VsdCxcbiAgICAgIH07XG4gICAgfVxuXG4gICAgLy8gQ2FzZSAzOiBSZWd1bGFyIGxpbmVcbiAgICBjb25zdCB7IGdsb2JhbFJ1bGVzLCByZXN1bHQgfSA9IHByb2Nlc3NSZWd1bGFyTGluZShsaW5lLCBhY2MucmVzdWx0KTtcbiAgICByZXR1cm4geyAuLi5hY2MsIGdsb2JhbFJ1bGVzLCByZXN1bHQgfTtcbiAgfTtcblxuICBjb25zdCB7IHJlc3VsdCwgZ2xvYmFsUnVsZXMgfSA9IGxpbmVzLnJlZHVjZShwcm9jZXNzTGluZSwgaW5pdGlhbFN0YXRlKTtcblxuICByZXR1cm4gZ2xvYmFsUnVsZXNcbiAgICA/IGAke3Jlc3VsdH0ke3NlbGVjdG9yfSB7XFxuJHtnbG9iYWxSdWxlc319XFxuYC50cmltKClcbiAgICA6IHJlc3VsdC50cmltKCk7XG59O1xuXG5jb25zdCB3cmFwTG9vc2VSdWxlc0luc2lkZU1lZGlhUXVlcnkgPSAoe1xuICBzdHlsZSxcbiAgc2VsZWN0b3IsXG59OiBXcmFwU3R5bGVQYXJhbXMpOiBzdHJpbmcgPT4ge1xuICBjb25zdCByZWdleCA9IC9AbWVkaWFcXHMqKFtee10rKVxccypcXHsoW1xcc1xcU10qPylcXH0vZztcbiAgY29uc3QgcnVsZVJlZ2V4ID0gL15cXHMqKFtcXHctXSspXFxzKjpcXHMqW147XSs7LztcblxuICByZXR1cm4gc3R5bGUucmVwbGFjZShyZWdleCwgKG1hdGNoLCBtZWRpYVF1ZXJ5LCBpbm5lckNzcykgPT4ge1xuICAgIGNvbnN0IHJ1bGVzID0gaW5uZXJDc3NcbiAgICAgIC50cmltKClcbiAgICAgIC5zcGxpdChcIlxcblwiKVxuICAgICAgLm1hcCgobGluZTogc3RyaW5nKSA9PiBsaW5lLnRyaW0oKSlcbiAgICAgIC5maWx0ZXIoKGxpbmU6IHN0cmluZykgPT4gbGluZSk7XG5cbiAgICBjb25zdCB3cmFwcGVkUnVsZXMgPSBydWxlc1xuICAgICAgLmZpbHRlcigocnVsZTogc3RyaW5nKSA9PiBydWxlUmVnZXgudGVzdChydWxlKSlcbiAgICAgIC5tYXAoKHJ1bGU6IHN0cmluZykgPT4gYCR7c2VsZWN0b3J9IHtcXG4ke3J1bGUudHJpbSgpfVxcbn1gKVxuICAgICAgLmpvaW4oXCJcXG5cIik7XG5cbiAgICByZXR1cm4gYEBtZWRpYSAke21lZGlhUXVlcnkudHJpbSgpfSB7XFxuJHt3cmFwcGVkUnVsZXN9XFxufWA7XG4gIH0pO1xufTtcblxuY29uc3QgYXBwbHlDbGFzc05hbWVTY29wZSA9ICh7IHN0eWxlLCBzZWxlY3RvciB9OiBXcmFwU3R5bGVQYXJhbXMpOiBzdHJpbmcgPT4ge1xuICBjb25zdCByZWdleCA9IC9cXC4oPzwhW1xcZF0pKD8hW1xcZF0pKFtcXHctXSspL2c7XG4gIHJldHVybiBzdHlsZS5yZXBsYWNlKHJlZ2V4LCBgLiR7c2VsZWN0b3J9XyQxYCk7XG59O1xuXG5leHBvcnQgY29uc3QgdHJhbnNmb3JtU3R5bGUgPSAocmF3U3R5bGU6IHN0cmluZywgc2VsZWN0b3I6IHN0cmluZyk6IHN0cmluZyA9PiB7XG4gIGxldCBzdHlsZSA9IHJhd1N0eWxlO1xuICBjb25zdCBjbGFzc05hbWUgPSBgLiR7c2VsZWN0b3J9YDtcbiAgc3R5bGUgPSBhcHBseUNsYXNzTmFtZVNjb3BlKHsgc3R5bGUsIHNlbGVjdG9yIH0pO1xuICBzdHlsZSA9IHdyYXBMb29zZVJ1bGVzT3V0c2lkZU1lZGlhUXVlcnkoeyBzdHlsZSwgc2VsZWN0b3I6IGNsYXNzTmFtZSB9KTtcbiAgc3R5bGUgPSB3cmFwTG9vc2VSdWxlc0luc2lkZU1lZGlhUXVlcnkoeyBzdHlsZSwgc2VsZWN0b3I6IGNsYXNzTmFtZSB9KTtcblxuICByZXR1cm4gc3R5bGU7XG59O1xuIiwgImltcG9ydCB0eXBlIHsgVGFnZ2VkU3R5bGUgfSBmcm9tIFwiLi90eXBlc1wiO1xuaW1wb3J0IHsgY3JlYXRlSGFzaCB9IGZyb20gXCIuL2NyZWF0ZUhhc2hcIjtcbmltcG9ydCB7IHRyYW5zZm9ybVN0eWxlIH0gZnJvbSBcIi4vY3NzUGFyc2VyXCI7XG5pbXBvcnQgeyBjcmVhdGVTdHlsZUVsZW1lbnQgfSBmcm9tIFwiLi9jcmVhdGVTdHlsZUVsZW1lbnRcIjtcblxudHlwZSBIYW5kbGVyUGFyYW1zID0ge1xuICBoYXNoSWQ6IHN0cmluZztcbiAgc2NvcGVkU3R5bGU6IHN0cmluZztcbiAgc3R5bGVFbGVtZW50OiBFbGVtZW50O1xufTtcbnR5cGUgSGFuZGxlciA9IChwYXlsb2FkOiBIYW5kbGVyUGFyYW1zKSA9PiB2b2lkO1xuXG5jb25zdCBjc3NDYWNoZTogTWFwPHN0cmluZywgc3RyaW5nPiA9IG5ldyBNYXAoKTtcblxuZXhwb3J0IGNvbnN0IGNzcyA9XG4gIChzZWxlY3Rvcjogc3RyaW5nLCBoYW5kbGVyOiBIYW5kbGVyID0gKCkgPT4ge30pOiBUYWdnZWRTdHlsZSA9PlxuICAoXG4gICAgc3RyaW5nczogVGVtcGxhdGVTdHJpbmdzQXJyYXksXG4gICAgLi4uaW50ZXJwb2xhdGlvbnM6IChzdHJpbmcgfCBudW1iZXIpW11cbiAgKTogc3RyaW5nID0+IHtcbiAgICBjb25zdCByYXdDU1MgPSBzdHJpbmdzLnJlZHVjZShcbiAgICAgIChhY2N1bXVsYXRvciwgc3RyLCBpbmRleCkgPT5cbiAgICAgICAgYCR7YWNjdW11bGF0b3J9JHtzdHJ9JHtpbnRlcnBvbGF0aW9uc1tpbmRleF0gIT09IHVuZGVmaW5lZCA/IGludGVycG9sYXRpb25zW2luZGV4XSA6IFwiXCJ9YCxcbiAgICAgIFwiXCIsXG4gICAgKTtcblxuICAgIGNvbnN0IGNhY2hlZENsYXNzTmFtZSA9IGNzc0NhY2hlLmdldChyYXdDU1MpO1xuICAgIGlmIChjYWNoZWRDbGFzc05hbWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIGNhY2hlZENsYXNzTmFtZTtcbiAgICB9XG5cbiAgICBjb25zdCBoYXNoSWQgPSBjcmVhdGVIYXNoKHJhd0NTUywgc2VsZWN0b3IpO1xuICAgIGNvbnN0IHNjb3BlZFN0eWxlID0gdHJhbnNmb3JtU3R5bGUocmF3Q1NTLCBgJHtoYXNoSWR9YCk7XG4gICAgY29uc3Qgc3R5bGVFbGVtZW50ID0gY3JlYXRlU3R5bGVFbGVtZW50KGAke2hhc2hJZH1gKTtcblxuICAgIGhhbmRsZXIoeyBoYXNoSWQsIHNjb3BlZFN0eWxlLCBzdHlsZUVsZW1lbnQgfSk7XG5cbiAgICBpZiAoIXN0eWxlRWxlbWVudC5pbm5lckhUTUwuaW5jbHVkZXMoc2NvcGVkU3R5bGUpKSB7XG4gICAgICBzdHlsZUVsZW1lbnQuaW5uZXJIVE1MICs9IHNjb3BlZFN0eWxlO1xuICAgIH1cblxuICAgIGNzc0NhY2hlLnNldChyYXdDU1MsIGhhc2hJZCk7XG5cbiAgICByZXR1cm4gaGFzaElkO1xuICB9O1xuIiwgImltcG9ydCB0eXBlIHsgVGVtcGxhdGVTY2hlbWEgfSBmcm9tIFwiQC90ZW1wbGF0ZVwiO1xuaW1wb3J0IHR5cGUgeyBHZW5lcmljT2JqZWN0LCBTdGF0ZSwgU3RhdGVNYW5hZ2VyIH0gZnJvbSBcIkAvc3RhdGVcIjtcbmltcG9ydCB7IGNyZWF0ZVN0YXRlIH0gZnJvbSBcIkAvc3RhdGVcIjtcbmltcG9ydCB7IHJlbmRlciB9IGZyb20gXCJAL3JlbmRlclwiO1xuaW1wb3J0IHsgaHRtbCwganN4LCB0c3ggfSBmcm9tIFwiQC90ZW1wbGF0ZVwiO1xuaW1wb3J0IHsgY3NzIH0gZnJvbSBcIkAvc3R5bGVcIjtcbmltcG9ydCB7IHJlbmRlckNoaWxkcmVuIH0gZnJvbSBcIi4vcmVuZGVyQ2hpbGRyZW5cIjtcbmltcG9ydCB7IHNldEVsZW1lbnRBdHRyaWJ1dGVzIH0gZnJvbSBcIi4vc2V0RWxlbWVudEF0dHJpYnV0ZXNcIjtcblxudHlwZSBGYWN0b3J5ID0gKHBhcmFtcz86IHVua25vd24pID0+IHVua25vd247XG5cbnR5cGUgU3R5bGVQYXJhbXMgPSB7XG4gIHByb3BzOiBTdGF0ZTtcbiAgc3RhdGU6IFN0YXRlO1xuICBjc3M6IFJldHVyblR5cGU8dHlwZW9mIGNzcz47XG59O1xuXG50eXBlIFN0eWxlcyA9IHsgW2tleTogc3RyaW5nXTogc3RyaW5nIH07XG50eXBlIFN0eWxlc09iamVjdCA9IEdlbmVyaWNPYmplY3Q8eyBba2V5OiBzdHJpbmddOiAoKSA9PiBzdHJpbmcgfT47XG50eXBlIFN0eWxlSGFuZGxlckZhY3RvcnkgPSAoKSA9PiBTdHlsZXNPYmplY3Q7XG50eXBlIFN0eWxlSGFuZGxlciA9IChwYXJhbXM6IFN0eWxlUGFyYW1zKSA9PiBzdHJpbmc7XG5cbnR5cGUgVGVtcGxhdGVQYXJhbXMgPSB7XG4gIHByb3BzOiBTdGF0ZTtcbiAgc3RhdGU6IFN0YXRlO1xuICBodG1sOiB0eXBlb2YgaHRtbDtcbiAganN4OiB0eXBlb2YganN4O1xuICB0c3g6IHR5cGVvZiB0c3g7XG4gIHN0eWxlczogU3R5bGVzO1xuICBhY3Rpb25zOiBBY3Rpb25zO1xufTtcblxudHlwZSBUZW1wbGF0ZUluamVjdGlvbnMgPSA8VCA9IHVua25vd24+KCkgPT4gR2VuZXJpY09iamVjdDxUPjtcblxudHlwZSBUZW1wbGF0ZUhhbmRsZXIgPSAoXG4gIHBhcmFtczogVGVtcGxhdGVQYXJhbXMsXG4gIGluamVjdGlvbnM6IFRlbXBsYXRlSW5qZWN0aW9ucyxcbikgPT4gdm9pZDtcblxudHlwZSBBY3Rpb25zID0gR2VuZXJpY09iamVjdDtcblxudHlwZSBBY3Rpb25QYXJhbXMgPSB7XG4gIHByb3BzOiBTdGF0ZTtcbiAgc3RhdGU6IFN0YXRlTWFuYWdlcjtcbn07XG50eXBlIEFjdGlvbkhhbmRsZXJGYWN0b3J5ID0gKHBhcmFtczogQWN0aW9uUGFyYW1zKSA9PiBHZW5lcmljT2JqZWN0O1xuXG50eXBlIEF0dHJpYnV0ZSA9IG9iamVjdCAmIHtcbiAgW2tleTogc3ltYm9sIHwgc3RyaW5nXTogdW5rbm93bjtcbn07XG5cbmNvbnN0IF9hdHRyaWJ1dGVzID0ge307XG5cbmNvbnN0IF9jcmVhdGVUYWdCeUZhY3RvcnlOYW1lID0gKGZhY3Rvcnk6IEZhY3RvcnkpID0+IHtcbiAgcmV0dXJuIGZhY3RvcnkubmFtZVxuICAgIC5zcGxpdCgvKD89W0EtWl0pLylcbiAgICAuam9pbihcIi1cIilcbiAgICAudG9Mb3dlckNhc2UoKTtcbn07XG5cbmNvbnN0IF9jcmVhdGVVc2VTdGF0ZSA9IChzdGF0ZTogU3RhdGVNYW5hZ2VyKSA9PiB7XG4gIGNvbnN0IGN1cnJlbnRTdGF0ZSA9IHt9O1xuICBjb25zdCB1c2VTdGF0ZSA9IDxUPihpbml0aWFsU3RhdGU6IFN0YXRlPFQ+KTogU3RhdGVNYW5hZ2VyID0+IHtcbiAgICBjb25zdCBsYXRlc3RTdGF0ZSA9IHN0YXRlLmdldCgpIGFzIFN0YXRlPFQ+O1xuICAgIHN0YXRlLnNldCh7IC4uLmluaXRpYWxTdGF0ZSwgLi4ubGF0ZXN0U3RhdGUgfSk7XG5cbiAgICBPYmplY3QuYXNzaWduKGN1cnJlbnRTdGF0ZSwgc3RhdGUuZ2V0KCkpO1xuICAgIHJldHVybiB7IGdldDogc3RhdGUuZ2V0LCBzZXQ6IHN0YXRlLnNldCwgd2F0Y2g6IHN0YXRlLndhdGNoIH07XG4gIH07XG4gIHJldHVybiB7IGN1cnJlbnRTdGF0ZSwgdXNlU3RhdGUgfTtcbn07XG5cbmNvbnN0IF9jcmVhdGVVc2VTdHlsZSA9ICh7IHByb3BzLCBzdGF0ZSwgY3NzIH06IFN0eWxlUGFyYW1zKSA9PiB7XG4gIGNvbnN0IHN0eWxlc2hlZXQgPSB7fTtcbiAgY29uc3QgdXNlU3R5bGUgPSAoY3NzSGFuZGxlckZhY3Rvcnk6IFN0eWxlSGFuZGxlckZhY3RvcnkpID0+IHtcbiAgICBjb25zdCBoYW5kbGVycyA9IGNzc0hhbmRsZXJGYWN0b3J5KCk7XG4gICAgY29uc3Qgc3R5bGVzOiBTdHlsZXMgPSB7fTtcblxuICAgIGZvciAoY29uc3Qga2V5IGluIGhhbmRsZXJzKSB7XG4gICAgICBjb25zdCBoYW5kbGVyID0gaGFuZGxlcnNba2V5XSBhcyBTdHlsZUhhbmRsZXI7XG4gICAgICBjb25zdCBzdHlsZSA9IGhhbmRsZXIoeyBwcm9wcywgc3RhdGUsIGNzcyB9KTtcbiAgICAgIHN0eWxlc1trZXldID0gc3R5bGU7XG4gICAgfVxuXG4gICAgT2JqZWN0LmFzc2lnbihzdHlsZXNoZWV0LCBzdHlsZXMpO1xuICAgIHJldHVybiBzdHlsZXM7XG4gIH07XG5cbiAgcmV0dXJuIHsgc3R5bGVzOiBzdHlsZXNoZWV0LCB1c2VTdHlsZSB9O1xufTtcblxuY29uc3QgX2NyZWF0ZVVzZVRlbXBsYXRlID0gKHBhcmFtczogVGVtcGxhdGVQYXJhbXMpID0+IHtcbiAgY29uc3QgdXNlVGVtcGxhdGUgPSAoXG4gICAgdGVtcGxhdGVIYW5kbGVyOiBUZW1wbGF0ZUhhbmRsZXIsXG4gICAgdGVtcGxhdGVJbmplY3Rpb25zOiBUZW1wbGF0ZUluamVjdGlvbnMsXG4gICkgPT4ge1xuICAgIHJldHVybiB0ZW1wbGF0ZUhhbmRsZXIocGFyYW1zLCB0ZW1wbGF0ZUluamVjdGlvbnMpO1xuICB9O1xuXG4gIHJldHVybiB1c2VUZW1wbGF0ZTtcbn07XG5cbmNvbnN0IF9jcmVhdGVVc2VBY3Rpb24gPSAoeyBwcm9wcywgc3RhdGUgfTogQWN0aW9uUGFyYW1zKSA9PiB7XG4gIGNvbnN0IGFjdGlvbnM6IEdlbmVyaWNPYmplY3QgPSB7fTtcblxuICBjb25zdCB1c2VBY3Rpb24gPSAoYWN0aW9uSGFuZGxlckZhY3Rvcnk6IEFjdGlvbkhhbmRsZXJGYWN0b3J5KSA9PiB7XG4gICAgY29uc3QgaGFuZGxlckFjdGlvbnMgPSBhY3Rpb25IYW5kbGVyRmFjdG9yeSh7IHByb3BzLCBzdGF0ZSB9KTtcbiAgICBPYmplY3QuYXNzaWduKGFjdGlvbnMsIGhhbmRsZXJBY3Rpb25zKTtcbiAgfTtcblxuICByZXR1cm4geyBhY3Rpb25zLCB1c2VBY3Rpb24gfTtcbn07XG5cbmV4cG9ydCBjb25zdCBjcmVhdGVFbGVtZW50QnlGYWN0b3J5TmFtZSA9IChcbiAgdGVtcGxhdGU6IFRlbXBsYXRlU2NoZW1hLFxuICBwYXJlbnRFbGVtZW50OiBFbGVtZW50LFxuICBsYXRlc3RTdGF0ZTogU3RhdGUgPSB7fSxcbikgPT4ge1xuICByZXR1cm4gKCkgPT4ge1xuICAgIGNvbnN0IGZhY3RvcnkgPSB0ZW1wbGF0ZS50eXBlIGFzIEZhY3Rvcnk7XG4gICAgY29uc3QgdGFnTmFtZSA9IF9jcmVhdGVUYWdCeUZhY3RvcnlOYW1lKGZhY3RvcnkpO1xuICAgIGNvbnN0IHNlbGVjdG9yID0gdGFnTmFtZS50b0xvd2VyQ2FzZSgpO1xuICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRhZ05hbWUpO1xuXG4gICAgY29uc3QgcHJvcHMgPSB0ZW1wbGF0ZS5wcm9wcztcbiAgICBjb25zdCBsYXRlc3REZWVwU3RhdGUgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGxhdGVzdFN0YXRlKSk7XG4gICAgY29uc3Qgc3RhdGVNYW5hZ2VyID0gY3JlYXRlU3RhdGUobGF0ZXN0RGVlcFN0YXRlKTtcbiAgICBjb25zdCB7IGN1cnJlbnRTdGF0ZTogc3RhdGUsIHVzZVN0YXRlIH0gPSBfY3JlYXRlVXNlU3RhdGUoc3RhdGVNYW5hZ2VyKTtcbiAgICBjb25zdCBzdHlsZWQgPSBjc3Moc2VsZWN0b3IsICh7IGhhc2hJZCB9KSA9PiB7XG4gICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoaGFzaElkKTtcbiAgICAgIE9iamVjdC5hc3NpZ24oX2F0dHJpYnV0ZXMsIHsgY2xhc3M6IGhhc2hJZCB9KTtcbiAgICB9KTtcbiAgICBjb25zdCB7IHN0eWxlcywgdXNlU3R5bGUgfSA9IF9jcmVhdGVVc2VTdHlsZSh7IHByb3BzLCBzdGF0ZSwgY3NzOiBzdHlsZWQgfSk7XG4gICAgY29uc3QgeyBhY3Rpb25zLCB1c2VBY3Rpb24gfSA9IF9jcmVhdGVVc2VBY3Rpb24oe1xuICAgICAgcHJvcHMsXG4gICAgICBzdGF0ZTogc3RhdGVNYW5hZ2VyLFxuICAgIH0pO1xuXG4gICAgY29uc3QgdXNlVGVtcGxhdGUgPSBfY3JlYXRlVXNlVGVtcGxhdGUoe1xuICAgICAgcHJvcHMsXG4gICAgICBzdGF0ZSxcbiAgICAgIGh0bWwsXG4gICAgICBqc3gsXG4gICAgICB0c3gsXG4gICAgICBzdHlsZXMsXG4gICAgICBhY3Rpb25zLFxuICAgIH0pO1xuXG4gICAgY29uc3QgY2hpbGRyZW4gPSBmYWN0b3J5KHtcbiAgICAgIHByb3BzLFxuICAgICAgdXNlU3RhdGUsXG4gICAgICB1c2VTdHlsZSxcbiAgICAgIHVzZVRlbXBsYXRlLFxuICAgICAgdXNlQWN0aW9uLFxuICAgIH0pIGFzIFRlbXBsYXRlU2NoZW1hW107XG5cbiAgICBjb25zdCBvbGRFbGVtZW50ID0gcGFyZW50RWxlbWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKSBhcyBFbGVtZW50O1xuICAgIHNldEVsZW1lbnRBdHRyaWJ1dGVzKGVsZW1lbnQsIF9hdHRyaWJ1dGVzKTtcblxuICAgIG9sZEVsZW1lbnRcbiAgICAgID8gb2xkRWxlbWVudC5yZXBsYWNlV2l0aChlbGVtZW50KVxuICAgICAgOiBwYXJlbnRFbGVtZW50Lmluc2VydEFkamFjZW50RWxlbWVudChcImJlZm9yZWVuZFwiLCBlbGVtZW50KTtcblxuICAgIHJlbmRlckNoaWxkcmVuKGNoaWxkcmVuLCBlbGVtZW50LCBzdGF0ZSk7XG5cbiAgICBzdGF0ZU1hbmFnZXIud2F0Y2goKHBheWxvYWQpID0+IHtcbiAgICAgIGVsZW1lbnQuaW5uZXJIVE1MID0gXCJcIjtcbiAgICAgIHJlbmRlcih0ZW1wbGF0ZSwgcGFyZW50RWxlbWVudCwgcGF5bG9hZCk7XG4gICAgfSk7XG4gIH07XG59O1xuIiwgImltcG9ydCB7IHJlbmRlciB9IGZyb20gXCJAL3JlbmRlclwiO1xuaW1wb3J0IHR5cGUgeyBUZW1wbGF0ZVNjaGVtYSwgVGFnZ2VkVGVtcGxhdGUgfSBmcm9tIFwiQC90eXBlc1wiO1xuaW1wb3J0IHR5cGUgeyBTdGF0ZSB9IGZyb20gXCJAL3N0YXRlXCI7XG5cbmV4cG9ydCBjb25zdCByZW5kZXJUZW1wbGF0ZURhdGEgPVxuICAodGVtcGxhdGVEYXRhOiBUYWdnZWRUZW1wbGF0ZSwgZWxlbWVudDogRWxlbWVudCwgc3RhdGU6IFN0YXRlID0ge30pID0+XG4gICAgKCkgPT4ge1xuICAgICAgaWYgKHR5cGVvZiB0ZW1wbGF0ZURhdGEgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgZWxlbWVudC5pbnNlcnRBZGphY2VudEhUTUwoXCJiZWZvcmVlbmRcIiwgdGVtcGxhdGVEYXRhKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiB0ZW1wbGF0ZURhdGEgPT09IFwibnVtYmVyXCIpIHtcbiAgICAgICAgY29uc3QgZGF0YSA9IE51bWJlcih0ZW1wbGF0ZURhdGEpO1xuICAgICAgICBjb25zdCB2YWx1ZSA9IGRhdGEudG9TdHJpbmcoKTtcbiAgICAgICAgZWxlbWVudC5pbnNlcnRBZGphY2VudEhUTUwoXCJiZWZvcmVlbmRcIiwgdmFsdWUpO1xuICAgICAgfVxuICAgIH07XG4iLCAiaW1wb3J0IHR5cGUgeyBUYWdnZWRUZW1wbGF0ZSwgVGVtcGxhdGVTY2hlbWEgfSBmcm9tIFwiQC90ZW1wbGF0ZVwiO1xuaW1wb3J0IHtcbiAgcmVuZGVyVGVtcGxhdGVBcnJheSxcbiAgcmVuZGVyVGVtcGxhdGVPYmplY3QsXG4gIHJlbmRlclRlbXBsYXRlRGF0YSxcbn0gZnJvbSBcIkAvYWN0aW9uc1wiO1xuaW1wb3J0IHsgaXNBcnJheSwgaXNPYmplY3QsIGlzVGVtcGxhdGVEYXRhIH0gZnJvbSBcIkAvdmFsaWRhdG9yc1wiO1xuXG50eXBlIENvbnRleHRFbGVtZW50ID0gRWxlbWVudDtcbmltcG9ydCB7IGNyZWF0ZUNoYWluIH0gZnJvbSBcIkAvZmFjdG9yaWVzXCI7XG5pbXBvcnQgeyBjcmVhdGVTdGF0ZSwgdHlwZSBTdGF0ZSB9IGZyb20gXCJAL3N0YXRlXCI7XG5cbi8vY29uc3QgZ2xvYmFsU3RhdGUgPSBjcmVhdGVTdGF0ZSh7fSk7XG5cbmV4cG9ydCBjb25zdCByZW5kZXIgPSAoXG4gIHRlbXBsYXRlOiBUYWdnZWRUZW1wbGF0ZSxcbiAgY29udGV4dDogQ29udGV4dEVsZW1lbnQgPSBkb2N1bWVudC5ib2R5LFxuICBzdGF0ZTogU3RhdGUgPSB7fSxcbik6IENvbnRleHRFbGVtZW50ID0+IHtcbiAgY29uc3QgY2hhaW4gPSBjcmVhdGVDaGFpbigpO1xuICBjb25zdCBjb21wb25lbnRFbGVtZW50ID0gY29udGV4dCB8fCBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiYm9keVwiKTtcblxuICBjaGFpbi5hZGQoe1xuICAgIHZhbGlkYXRvcjogaXNBcnJheSh0ZW1wbGF0ZSksXG4gICAgYWN0aW9uOiByZW5kZXJUZW1wbGF0ZUFycmF5KFxuICAgICAgdGVtcGxhdGUgYXMgVGVtcGxhdGVTY2hlbWFbXSxcbiAgICAgIGNvbXBvbmVudEVsZW1lbnQsXG4gICAgICBzdGF0ZSxcbiAgICApLFxuICB9KTtcblxuICBjaGFpbi5hZGQoe1xuICAgIHZhbGlkYXRvcjogaXNPYmplY3QodGVtcGxhdGUpLFxuICAgIGFjdGlvbjogcmVuZGVyVGVtcGxhdGVPYmplY3QoXG4gICAgICB0ZW1wbGF0ZSBhcyBUZW1wbGF0ZVNjaGVtYSxcbiAgICAgIGNvbXBvbmVudEVsZW1lbnQsXG4gICAgICBzdGF0ZSxcbiAgICApLFxuICB9KTtcblxuICBjaGFpbi5hZGQoe1xuICAgIHZhbGlkYXRvcjogaXNUZW1wbGF0ZURhdGEodGVtcGxhdGUpLFxuICAgIGFjdGlvbjogcmVuZGVyVGVtcGxhdGVEYXRhKHRlbXBsYXRlLCBjb21wb25lbnRFbGVtZW50LCBzdGF0ZSksXG4gIH0pO1xuXG4gIGNoYWluLmV4ZWN1dGUoKTtcbiAgcmV0dXJuIGNvbXBvbmVudEVsZW1lbnQ7XG59O1xuIiwgImltcG9ydCB7IHJlbmRlciB9IGZyb20gXCJAL3JlbmRlclwiO1xuaW1wb3J0IHR5cGUgeyBUZW1wbGF0ZVNjaGVtYSB9IGZyb20gXCJAL3RlbXBsYXRlXCI7XG5pbXBvcnQgdHlwZSB7IFN0YXRlIH0gZnJvbSBcIkAvc3RhdGVcIjtcblxuZXhwb3J0IGNvbnN0IHJlbmRlckNoaWxkcmVuID0gKFxuICBjaGlsZHJlbjogVGVtcGxhdGVTY2hlbWFbXSxcbiAgcGFyZW50RWxlbWVudDogRWxlbWVudCxcbiAgc3RhdGU6IFN0YXRlID0ge30sXG4pID0+IHtcbiAgcGFyZW50RWxlbWVudC5pbm5lckhUTUwgPSBcIlwiO1xuICBpZiAoIUFycmF5LmlzQXJyYXkoY2hpbGRyZW4pICYmIHR5cGVvZiBjaGlsZHJlbiA9PT0gXCJvYmplY3RcIikge1xuICAgIHJlbmRlcihjaGlsZHJlbiwgcGFyZW50RWxlbWVudCwgc3RhdGUpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGZvciAoY29uc3QgY2hpbGQgb2YgY2hpbGRyZW4pIHtcbiAgICByZW5kZXIoY2hpbGQsIHBhcmVudEVsZW1lbnQsIHN0YXRlKTtcbiAgfVxufTtcbiIsICJpbXBvcnQgdHlwZSB7IFN0YXRlIH0gZnJvbSBcIkAvc3RhdGVcIjtcbmltcG9ydCB0eXBlIHsgVGVtcGxhdGVTY2hlbWEgfSBmcm9tIFwiQC90ZW1wbGF0ZVwiO1xuaW1wb3J0IHsgc2V0RWxlbWVudEF0dHJpYnV0ZXMgfSBmcm9tIFwiLi9zZXRFbGVtZW50QXR0cmlidXRlc1wiO1xuaW1wb3J0IHsgcmVuZGVyQ2hpbGRyZW4gfSBmcm9tIFwiLi9yZW5kZXJDaGlsZHJlblwiO1xuXG5leHBvcnQgY29uc3QgY3JlYXRlRWxlbWVudEJ5VGFnTmFtZSA9XG4gICh0ZW1wbGF0ZTogVGVtcGxhdGVTY2hlbWEsIHBhcmVudEVsZW1lbnQ6IEVsZW1lbnQsIHN0YXRlOiBTdGF0ZSA9IHt9KSA9PlxuICAoKSA9PiB7XG4gICAgY29uc3QgdGFnTmFtZSA9IHRlbXBsYXRlLnR5cGUgYXMgc3RyaW5nO1xuICAgIGNvbnN0IHNlbGVjdG9yID0gdGFnTmFtZS50b0xvd2VyQ2FzZSgpO1xuICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRhZ05hbWUpO1xuICAgIGNvbnN0IGhhc2hJZCA9IHBhcmVudEVsZW1lbnQuZ2V0QXR0cmlidXRlKFwiY2xhc3NcIikgYXMgc3RyaW5nO1xuICAgIGNvbnN0IGNsYXNzTmFtZSA9IHRlbXBsYXRlPy5wcm9wcz8uY2xhc3MgYXMgc3RyaW5nO1xuICAgIGlmIChjbGFzc05hbWUpIHtcbiAgICAgIGlmICghY2xhc3NOYW1lLmluY2x1ZGVzKGhhc2hJZCkpIHtcbiAgICAgICAgY29uc3QgbmV3Q2xhc3NOYW1lID0gYCR7aGFzaElkfV8ke2NsYXNzTmFtZX1gO1xuICAgICAgICBzZXRFbGVtZW50QXR0cmlidXRlcyhlbGVtZW50LCB7IGNsYXNzOiBuZXdDbGFzc05hbWUgfSk7XG4gICAgICAgIHBhcmVudEVsZW1lbnQuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KFwiYmVmb3JlZW5kXCIsIGVsZW1lbnQpO1xuICAgICAgICByZW5kZXJDaGlsZHJlbih0ZW1wbGF0ZS5jaGlsZHJlbiwgZWxlbWVudCwgc3RhdGUpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfVxuICAgIHNldEVsZW1lbnRBdHRyaWJ1dGVzKGVsZW1lbnQsIHRlbXBsYXRlLnByb3BzKTtcbiAgICBwYXJlbnRFbGVtZW50Lmluc2VydEFkamFjZW50RWxlbWVudChcImJlZm9yZWVuZFwiLCBlbGVtZW50KTtcbiAgICByZW5kZXJDaGlsZHJlbih0ZW1wbGF0ZS5jaGlsZHJlbiwgZWxlbWVudCwgc3RhdGUpO1xuICB9O1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7OztBQUFPLElBQU0sdUJBQXVCLHdCQUFDLG1CQUFtQztBQUN0RSxNQUFJLE9BQU8sbUJBQW1CLFNBQVUsUUFBTztBQUMvQyxTQUFPLGVBQ0osUUFBUSxNQUFNLE9BQU8sRUFDckIsUUFBUSxNQUFNLE1BQU0sRUFDcEIsUUFBUSxNQUFNLE1BQU0sRUFDcEIsUUFBUSxNQUFNLFFBQVEsRUFDdEIsUUFBUSxNQUFNLE9BQU8sRUFDckIsUUFBUSxPQUFPLFFBQVE7QUFDNUIsR0FUb0M7QUFXN0IsSUFBTSxpQkFBaUIsd0JBQUMsU0FBaUIsWUFBNEI7QUFDMUUsUUFBTSxRQUFRO0FBQ2QsU0FBTyxRQUFRLFFBQVEsT0FBTyxDQUFDLFdBQVc7QUFDeEMsV0FBTyxJQUFJLE9BQU8sSUFBSSxPQUFPLFFBQVEsTUFBTSxFQUFFLENBQUM7QUFBQSxFQUNoRCxDQUFDO0FBQ0gsR0FMOEI7QUFPdkIsSUFBTSxhQUFhLDZCQUFNLEtBQUssT0FBTyxFQUFFLFNBQVMsRUFBRSxFQUFFLE1BQU0sR0FBRyxDQUFDLEdBQTNDO0FBRW5CLElBQU0sYUFBYTtBQUFBO0FBQUEsRUFFeEI7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQTtBQUFBLEVBR0E7QUFBQSxFQUNB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SyxHQUFFQSxJQUFFLENBQUMsSUFBRSxNQUFJRSxNQUFHLEtBQUcsQ0FBQ0YsS0FBRSxFQUFFLEtBQUssR0FBRSxHQUFFLE1BQUcsQ0FBQyxJQUFFRSxNQUFHLE9BQUssS0FBRyxDQUFDRixNQUFHLE1BQUlFLFFBQUssRUFBRSxLQUFLQSxJQUFFLEdBQUUsR0FBRUQsRUFBQyxHQUFFQyxLQUFFLElBQUdGLE9BQUksRUFBRSxLQUFLRSxJQUFFRixJQUFFLEdBQUVDLEVBQUMsR0FBRUMsS0FBRSxLQUFJLElBQUU7QUFBQSxJQUFFLEdBQUUsSUFBRSxHQUFFLElBQUVGLEdBQUUsUUFBTyxLQUFJO0FBQUMsWUFBSSxNQUFJRSxNQUFHLEVBQUUsR0FBRSxFQUFFLENBQUM7QUFBRyxlQUFRLElBQUUsR0FBRSxJQUFFRixHQUFFLENBQUMsRUFBRSxRQUFPLElBQUksQ0FBQUQsS0FBRUMsR0FBRSxDQUFDLEVBQUUsQ0FBQyxHQUFFLE1BQUlFLEtBQUUsUUFBTUgsTUFBRyxFQUFFLEdBQUUsSUFBRSxDQUFDLENBQUMsR0FBRUcsS0FBRSxLQUFHLEtBQUdILEtBQUUsTUFBSUcsS0FBRSxTQUFPLEtBQUcsUUFBTUgsTUFBR0csS0FBRSxHQUFFLElBQUUsTUFBSSxJQUFFSCxLQUFFLEVBQUUsQ0FBQyxJQUFFLElBQUVBLE9BQUksSUFBRSxJQUFFLEtBQUcsS0FBR0EsS0FBRSxRQUFNQSxNQUFHLFFBQU1BLEtBQUUsSUFBRUEsS0FBRSxRQUFNQSxNQUFHLEVBQUUsR0FBRUcsS0FBRSxLQUFHQSxPQUFJLFFBQU1ILE1BQUdHLEtBQUUsR0FBRUQsS0FBRSxHQUFFLElBQUUsTUFBSSxRQUFNRixPQUFJRyxLQUFFLEtBQUcsUUFBTUYsR0FBRSxDQUFDLEVBQUUsSUFBRSxDQUFDLE1BQUksRUFBRSxHQUFFLE1BQUlFLE9BQUksSUFBRSxFQUFFLENBQUMsSUFBR0EsS0FBRSxJQUFHLElBQUUsRUFBRSxDQUFDLEdBQUcsS0FBSyxHQUFFLEdBQUVBLEVBQUMsR0FBRUEsS0FBRSxLQUFHLFFBQU1ILE1BQUcsUUFBT0EsTUFBRyxT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
