var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

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

// src/state/createState.ts
var _createUUID = /* @__PURE__ */ __name(() => Math.random().toString(36).substring(2, 11), "_createUUID");
var createState2 = /* @__PURE__ */ __name((initialState) => {
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
    const stateManager = createState2(latestDeepState);
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
export {
  renderTemplateObject
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vLi4vc3JjL2ZhY3Rvcmllcy9jcmVhdGVDaGFpbi9pbmRleC50cyIsICIuLi8uLi8uLi8uLi9zcmMvdXRpbHMvaW5kZXgudHMiLCAiLi4vLi4vLi4vLi4vc3JjL3ZhbGlkYXRvcnMvdGVtcGxhdGUvaW5kZXgudHMiLCAiLi4vLi4vLi4vLi4vc3JjL3JlbmRlci9pbmRleC50cyIsICIuLi8uLi8uLi8uLi9zcmMvYWN0aW9ucy90ZW1wbGF0ZS9yZW5kZXJUZW1wbGF0ZUFycmF5LnRzIiwgIi4uLy4uLy4uLy4uL3NyYy9hY3Rpb25zL3RlbXBsYXRlL3JlbmRlckNoaWxkcmVuLnRzIiwgIi4uLy4uLy4uLy4uL3NyYy9zdGF0ZS9jcmVhdGVTdGF0ZS50cyIsICIuLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vaHRtQDMuMS4xL25vZGVfbW9kdWxlcy9odG0vZGlzdC9odG0ubW9kdWxlLmpzIiwgIi4uLy4uLy4uLy4uL3NyYy90ZW1wbGF0ZS9odG1sLnRzIiwgIi4uLy4uLy4uLy4uL3NyYy9zdHlsZS9jcmVhdGVIYXNoLnRzIiwgIi4uLy4uLy4uLy4uL3NyYy9zdHlsZS9jcmVhdGVTdHlsZUVsZW1lbnQudHMiLCAiLi4vLi4vLi4vLi4vc3JjL3N0eWxlL2Nzc1BhcnNlci50cyIsICIuLi8uLi8uLi8uLi9zcmMvc3R5bGUvY3NzLnRzIiwgIi4uLy4uLy4uLy4uL3NyYy9hY3Rpb25zL3RlbXBsYXRlL3NldEVsZW1lbnRBdHRyaWJ1dGVzLnRzIiwgIi4uLy4uLy4uLy4uL3NyYy9hY3Rpb25zL3RlbXBsYXRlL2NyZWF0ZUVsZW1lbnRCeUZhY3RvcnlOYW1lLnRzIiwgIi4uLy4uLy4uLy4uL3NyYy9hY3Rpb25zL3RlbXBsYXRlL2NyZWF0ZUVsZW1lbnRCeVRhZ05hbWUudHMiLCAiLi4vLi4vLi4vLi4vc3JjL2FjdGlvbnMvdGVtcGxhdGUvcmVuZGVyVGVtcGxhdGVEYXRhLnRzIiwgIi4uLy4uLy4uLy4uL3NyYy9hY3Rpb25zL3RlbXBsYXRlL3JlbmRlclRlbXBsYXRlT2JqZWN0LnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgdHlwZSB7IENoYWluTGluayB9IGZyb20gXCIuL3R5cGVzXCI7XG5cbmV4cG9ydCBjb25zdCBjcmVhdGVDaGFpbiA9ICgpID0+IHtcbiAgY29uc3QgX2NoYWluID0gbmV3IFNldDxDaGFpbkxpbms8dW5rbm93bj4+KCk7XG5cbiAgY29uc3QgYWRkID0gPFQ+KGNoYWluTGluazogQ2hhaW5MaW5rPFQ+KSA9PiB7XG4gICAgX2NoYWluLmFkZChjaGFpbkxpbmspO1xuICB9O1xuXG4gIGNvbnN0IGV4ZWN1dGUgPSAoKSA9PiB7XG4gICAgZm9yIChjb25zdCB7IGFjdGlvbiwgdmFsaWRhdG9yIH0gb2YgX2NoYWluKSB7XG4gICAgICBpZiAodmFsaWRhdG9yKCkpIGFjdGlvbigpO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4geyBhZGQsIGV4ZWN1dGUgfTtcbn07XG4iLCAiZXhwb3J0IGNvbnN0IGVzY2FwZVRlbXBsYXRlU3RyaW5nID0gKHRlbXBsYXRlU3RyaW5nOiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xuICBpZiAodHlwZW9mIHRlbXBsYXRlU3RyaW5nICE9PSBcInN0cmluZ1wiKSByZXR1cm4gdGVtcGxhdGVTdHJpbmc7XG4gIHJldHVybiB0ZW1wbGF0ZVN0cmluZ1xuICAgIC5yZXBsYWNlKC8mL2csIFwiJmFtcDtcIilcbiAgICAucmVwbGFjZSgvPC9nLCBcIiZsdDtcIilcbiAgICAucmVwbGFjZSgvPi9nLCBcIiZndDtcIilcbiAgICAucmVwbGFjZSgvXCIvZywgXCImcXVvdDtcIilcbiAgICAucmVwbGFjZSgvJy9nLCBcIiYjMzk7XCIpXG4gICAgLnJlcGxhY2UoL1xcLy9nLCBcIiYjeDJGO1wiKTtcbn07XG5cbmV4cG9ydCBjb25zdCBiaW5kU3R5bGVTY29wZSA9IChzY29wZUlkOiBzdHJpbmcsIHN0cmluZ3M6IHN0cmluZyk6IHN0cmluZyA9PiB7XG4gIGNvbnN0IHJlZ2V4ID0gLyhcXC4oXFx3KykoXFwtKnxcXF8qKT8pK1xcdysvZ2k7XG4gIHJldHVybiBzdHJpbmdzLnJlcGxhY2UocmVnZXgsICh2YWx1ZXMpID0+IHtcbiAgICByZXR1cm4gYC4ke3Njb3BlSWR9LSR7dmFsdWVzLnJlcGxhY2UoL1xcLi8sIFwiXCIpfWA7XG4gIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IGNyZWF0ZVVVSUQgPSAoKSA9PiBNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKDM2KS5zbGljZSgyLCA2KTtcblxuZXhwb3J0IGNvbnN0IEhUTUxFdmVudHMgPSBbXG4gIC8vIEV2ZW50b3MgZGUgTW91c2VcbiAgXCJvbmNsaWNrXCIsXG4gIFwib25kYmxjbGlja1wiLFxuICBcIm9ubW91c2Vkb3duXCIsXG4gIFwib25tb3VzZXVwXCIsXG4gIFwib25tb3VzZW92ZXJcIixcbiAgXCJvbm1vdXNlb3V0XCIsXG4gIFwib25tb3VzZW1vdmVcIixcbiAgXCJvbm1vdXNlZW50ZXJcIixcbiAgXCJvbm1vdXNlbGVhdmVcIixcbiAgXCJvbmNvbnRleHRtZW51XCIsXG5cbiAgLy8gRXZlbnRvcyBkZSBUZWNsYWRvXG4gIFwib25rZXlkb3duXCIsXG4gIFwib25rZXl1cFwiLFxuICBcIm9ua2V5cHJlc3NcIixcblxuICAvLyBFdmVudG9zIGRlIEZvY29cbiAgXCJvbmZvY3VzXCIsXG4gIFwib25ibHVyXCIsXG5cbiAgLy8gRXZlbnRvcyBkZSBGb3JtdWxcdTAwRTFyaW9cbiAgXCJvbnN1Ym1pdFwiLFxuICBcIm9uY2hhbmdlXCIsXG4gIFwib25pbnB1dFwiLFxuICBcIm9ucmVzZXRcIixcbiAgXCJvbmludmFsaWRcIixcblxuICAvLyBFdmVudG9zIGRlIE1cdTAwRURkaWFcbiAgXCJvbnBsYXlcIixcbiAgXCJvbnBhdXNlXCIsXG4gIFwib25lbmRlZFwiLFxuICBcIm9udm9sdW1lY2hhbmdlXCIsXG5cbiAgLy8gRXZlbnRvcyBkZSBUb3F1ZSAoVG91Y2gpIC0gcGFyYSBkaXNwb3NpdGl2b3MgbVx1MDBGM3ZlaXNcbiAgXCJvbnRvdWNoc3RhcnRcIixcbiAgXCJvbnRvdWNobW92ZVwiLFxuICBcIm9udG91Y2hlbmRcIixcbiAgXCJvbnRvdWNoY2FuY2VsXCIsXG5cbiAgLy8gRXZlbnRvcyBkZSBBbmltYVx1MDBFN1x1MDBFM28gZSBUcmFuc2lcdTAwRTdcdTAwRTNvXG4gIFwib25hbmltYXRpb25zdGFydFwiLFxuICBcIm9uYW5pbWF0aW9uZW5kXCIsXG4gIFwib25hbmltYXRpb25pdGVyYXRpb25cIixcbiAgXCJvbnRyYW5zaXRpb25lbmRcIixcblxuICAvLyBFdmVudG9zIGRlIE91dHJvcyBJbnRlcmF0aXZvc1xuICBcIm9ubG9hZFwiLFxuICBcIm9uZXJyb3JcIixcbiAgXCJvbnJlc2l6ZVwiLFxuICBcIm9uc2Nyb2xsXCIsXG5dO1xuIiwgImltcG9ydCB7IEhUTUxFdmVudHMgfSBmcm9tIFwiQC91dGlsc1wiO1xuXG5jb25zdCBpc09iamVjdCA9XG4gIDxUPihwYXlsb2FkOiBUKSA9PlxuICAgICgpID0+IHtcbiAgICAgIHJldHVybiAhIXBheWxvYWQgJiYgIUFycmF5LmlzQXJyYXkocGF5bG9hZCkgJiYgdHlwZW9mIHBheWxvYWQgPT09IFwib2JqZWN0XCI7XG4gICAgfTtcblxuY29uc3QgaXNBcnJheSA9XG4gIDxUPihwYXlsb2FkOiBUKSA9PlxuICAgICgpID0+IHtcbiAgICAgIHJldHVybiAhIXBheWxvYWQgJiYgQXJyYXkuaXNBcnJheShwYXlsb2FkKTtcbiAgICB9O1xuXG5jb25zdCBpc0Z1bmN0aW9uID1cbiAgPFQgPSB2b2lkPihwYXlsb2FkOiBUKSA9PlxuICAgICgpID0+IHtcbiAgICAgIHJldHVybiAhIXBheWxvYWQgJiYgdHlwZW9mIHBheWxvYWQgPT09IFwiZnVuY3Rpb25cIjtcbiAgICB9O1xuXG5jb25zdCBpc1N0cmluZyA9XG4gIDxUID0gdm9pZD4ocGF5bG9hZDogVCkgPT5cbiAgICAoKSA9PiB7XG4gICAgICByZXR1cm4gdHlwZW9mIHBheWxvYWQgPT09IFwic3RyaW5nXCI7XG4gICAgfTtcblxuY29uc3QgaXNFdmVudE5hbWUgPVxuICA8VCA9IHZvaWQ+KHBheWxvYWQ6IFQpID0+XG4gICAgKCkgPT4ge1xuICAgICAgaWYgKHR5cGVvZiBwYXlsb2FkICE9PSBcInN0cmluZ1wiKSByZXR1cm4gZmFsc2U7XG4gICAgICByZXR1cm4gSFRNTEV2ZW50cy5pbmNsdWRlcyhwYXlsb2FkLnRvTG93ZXJDYXNlKCkpO1xuICAgIH07XG5cbmNvbnN0IGlzVGVtcGxhdGVEYXRhID1cbiAgPFQgPSB2b2lkPihwYXlsb2FkOiBUKSA9PlxuICAgICgpID0+IHtcbiAgICAgIHJldHVybiB0eXBlb2YgcGF5bG9hZCA9PT0gXCJzdHJpbmdcIiB8fCB0eXBlb2YgcGF5bG9hZCA9PT0gXCJudW1iZXJcIjtcbiAgICB9O1xuXG5leHBvcnQgeyBpc09iamVjdCwgaXNBcnJheSwgaXNGdW5jdGlvbiwgaXNTdHJpbmcsIGlzRXZlbnROYW1lLCBpc1RlbXBsYXRlRGF0YSB9O1xuIiwgImltcG9ydCB0eXBlIHsgVGFnZ2VkVGVtcGxhdGUsIFRlbXBsYXRlU2NoZW1hIH0gZnJvbSBcIkAvdGVtcGxhdGVcIjtcbmltcG9ydCB7XG4gIHJlbmRlclRlbXBsYXRlQXJyYXksXG4gIHJlbmRlclRlbXBsYXRlT2JqZWN0LFxuICByZW5kZXJUZW1wbGF0ZURhdGEsXG59IGZyb20gXCJAL2FjdGlvbnNcIjtcbmltcG9ydCB7IGlzQXJyYXksIGlzT2JqZWN0LCBpc1RlbXBsYXRlRGF0YSB9IGZyb20gXCJAL3ZhbGlkYXRvcnNcIjtcblxudHlwZSBDb250ZXh0RWxlbWVudCA9IEVsZW1lbnQ7XG5pbXBvcnQgeyBjcmVhdGVDaGFpbiB9IGZyb20gXCJAL2ZhY3Rvcmllc1wiO1xuaW1wb3J0IHsgY3JlYXRlU3RhdGUsIHR5cGUgU3RhdGUgfSBmcm9tIFwiQC9zdGF0ZVwiO1xuXG4vL2NvbnN0IGdsb2JhbFN0YXRlID0gY3JlYXRlU3RhdGUoe30pO1xuXG5leHBvcnQgY29uc3QgcmVuZGVyID0gKFxuICB0ZW1wbGF0ZTogVGFnZ2VkVGVtcGxhdGUsXG4gIGNvbnRleHQ6IENvbnRleHRFbGVtZW50ID0gZG9jdW1lbnQuYm9keSxcbiAgc3RhdGU6IFN0YXRlID0ge30sXG4pOiBDb250ZXh0RWxlbWVudCA9PiB7XG4gIGNvbnN0IGNoYWluID0gY3JlYXRlQ2hhaW4oKTtcbiAgY29uc3QgY29tcG9uZW50RWxlbWVudCA9IGNvbnRleHQgfHwgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImJvZHlcIik7XG5cbiAgY2hhaW4uYWRkKHtcbiAgICB2YWxpZGF0b3I6IGlzQXJyYXkodGVtcGxhdGUpLFxuICAgIGFjdGlvbjogcmVuZGVyVGVtcGxhdGVBcnJheShcbiAgICAgIHRlbXBsYXRlIGFzIFRlbXBsYXRlU2NoZW1hW10sXG4gICAgICBjb21wb25lbnRFbGVtZW50LFxuICAgICAgc3RhdGUsXG4gICAgKSxcbiAgfSk7XG5cbiAgY2hhaW4uYWRkKHtcbiAgICB2YWxpZGF0b3I6IGlzT2JqZWN0KHRlbXBsYXRlKSxcbiAgICBhY3Rpb246IHJlbmRlclRlbXBsYXRlT2JqZWN0KFxuICAgICAgdGVtcGxhdGUgYXMgVGVtcGxhdGVTY2hlbWEsXG4gICAgICBjb21wb25lbnRFbGVtZW50LFxuICAgICAgc3RhdGUsXG4gICAgKSxcbiAgfSk7XG5cbiAgY2hhaW4uYWRkKHtcbiAgICB2YWxpZGF0b3I6IGlzVGVtcGxhdGVEYXRhKHRlbXBsYXRlKSxcbiAgICBhY3Rpb246IHJlbmRlclRlbXBsYXRlRGF0YSh0ZW1wbGF0ZSwgY29tcG9uZW50RWxlbWVudCwgc3RhdGUpLFxuICB9KTtcblxuICBjaGFpbi5leGVjdXRlKCk7XG4gIHJldHVybiBjb21wb25lbnRFbGVtZW50O1xufTtcbiIsICJpbXBvcnQgeyByZW5kZXIgfSBmcm9tIFwiQC9yZW5kZXJcIjtcbmltcG9ydCB0eXBlIHsgVGVtcGxhdGVTY2hlbWEgfSBmcm9tIFwiQC90eXBlc1wiO1xuaW1wb3J0IHR5cGUgeyBTdGF0ZSB9IGZyb20gXCJAL3N0YXRlXCI7XG5cbmV4cG9ydCBjb25zdCByZW5kZXJUZW1wbGF0ZUFycmF5ID1cbiAgKFxuICAgIHRlbXBsYXRlU2NoZW1hOiBUZW1wbGF0ZVNjaGVtYVtdLFxuICAgIGNvbnRleHRFbGVtZW50OiBFbGVtZW50LFxuICAgIHN0YXRlOiBTdGF0ZSA9IHt9LFxuICApID0+XG4gICAgKCkgPT4ge1xuICAgICAgZm9yIChjb25zdCB0ZW1wbGF0ZSBvZiB0ZW1wbGF0ZVNjaGVtYSkge1xuICAgICAgICByZW5kZXIodGVtcGxhdGUsIGNvbnRleHRFbGVtZW50LCBzdGF0ZSk7XG4gICAgICB9XG4gICAgfTtcbiIsICJpbXBvcnQgeyByZW5kZXIgfSBmcm9tIFwiQC9yZW5kZXJcIjtcbmltcG9ydCB0eXBlIHsgVGVtcGxhdGVTY2hlbWEgfSBmcm9tIFwiQC90ZW1wbGF0ZVwiO1xuaW1wb3J0IHR5cGUgeyBTdGF0ZSB9IGZyb20gXCJAL3N0YXRlXCI7XG5cbmV4cG9ydCBjb25zdCByZW5kZXJDaGlsZHJlbiA9IChcbiAgY2hpbGRyZW46IFRlbXBsYXRlU2NoZW1hW10sXG4gIHBhcmVudEVsZW1lbnQ6IEVsZW1lbnQsXG4gIHN0YXRlOiBTdGF0ZSA9IHt9LFxuKSA9PiB7XG4gIHBhcmVudEVsZW1lbnQuaW5uZXJIVE1MID0gXCJcIjtcbiAgaWYgKCFBcnJheS5pc0FycmF5KGNoaWxkcmVuKSAmJiB0eXBlb2YgY2hpbGRyZW4gPT09IFwib2JqZWN0XCIpIHtcbiAgICByZW5kZXIoY2hpbGRyZW4sIHBhcmVudEVsZW1lbnQsIHN0YXRlKTtcbiAgICByZXR1cm47XG4gIH1cblxuICBmb3IgKGNvbnN0IGNoaWxkIG9mIGNoaWxkcmVuKSB7XG4gICAgcmVuZGVyKGNoaWxkLCBwYXJlbnRFbGVtZW50LCBzdGF0ZSk7XG4gIH1cbn07XG4iLCAiaW1wb3J0IHR5cGUgeyBTdGF0ZVdhdGNoZXIsIFN0YXRlLCBTdGF0ZU1hbmFnZXIgfSBmcm9tIFwiLi90eXBlc1wiO1xuXG5jb25zdCBfY3JlYXRlVVVJRCA9ICgpOiBzdHJpbmcgPT4gTWF0aC5yYW5kb20oKS50b1N0cmluZygzNikuc3Vic3RyaW5nKDIsIDExKTtcblxuZXhwb3J0IGNvbnN0IGNyZWF0ZVN0YXRlID0gPFMgPSB1bmtub3duPihcbiAgaW5pdGlhbFN0YXRlOiBTdGF0ZTxTPixcbik6IFN0YXRlTWFuYWdlcjxTPiA9PiB7XG4gIGNvbnN0IF9zdGF0ZSA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoaW5pdGlhbFN0YXRlKSk7XG4gIGNvbnN0IF93YXRjaGVycyA9IG5ldyBTZXQ8U3RhdGVXYXRjaGVyPFM+PigpO1xuXG4gIGNvbnN0IF9ub3RpZnlIYW5kbGVycyA9IChwYXlsb2FkOiBTdGF0ZTxTPikgPT4ge1xuICAgIGZvciAoY29uc3Qgc3RhdGVXYXRjaGVyIG9mIF93YXRjaGVycykge1xuICAgICAgc3RhdGVXYXRjaGVyKHBheWxvYWQpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBzZXQgPSAocGF5bG9hZDogU3RhdGU8Uz4pID0+IHtcbiAgICBPYmplY3QuYXNzaWduKF9zdGF0ZSwgSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShwYXlsb2FkKSkpO1xuICAgIF9ub3RpZnlIYW5kbGVycyhKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KF9zdGF0ZSkpKTtcbiAgfTtcblxuICBjb25zdCBnZXQgPSAoKTogU3RhdGU8Uz4gPT4ge1xuICAgIHJldHVybiBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KF9zdGF0ZSkpO1xuICB9O1xuXG4gIGNvbnN0IHdhdGNoID0gKGNhbGxiYWNrOiBTdGF0ZVdhdGNoZXI8Uz4pID0+IHtcbiAgICBfd2F0Y2hlcnMuYWRkKGNhbGxiYWNrKTtcbiAgfTtcblxuICByZXR1cm4geyBzZXQsIGdldCwgd2F0Y2ggfTtcbn07XG4iLCAidmFyIG49ZnVuY3Rpb24odCxzLHIsZSl7dmFyIHU7c1swXT0wO2Zvcih2YXIgaD0xO2g8cy5sZW5ndGg7aCsrKXt2YXIgcD1zW2grK10sYT1zW2hdPyhzWzBdfD1wPzE6MixyW3NbaCsrXV0pOnNbKytoXTszPT09cD9lWzBdPWE6ND09PXA/ZVsxXT1PYmplY3QuYXNzaWduKGVbMV18fHt9LGEpOjU9PT1wPyhlWzFdPWVbMV18fHt9KVtzWysraF1dPWE6Nj09PXA/ZVsxXVtzWysraF1dKz1hK1wiXCI6cD8odT10LmFwcGx5KGEsbih0LGEscixbXCJcIixudWxsXSkpLGUucHVzaCh1KSxhWzBdP3NbMF18PTI6KHNbaC0yXT0wLHNbaF09dSkpOmUucHVzaChhKX1yZXR1cm4gZX0sdD1uZXcgTWFwO2V4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHMpe3ZhciByPXQuZ2V0KHRoaXMpO3JldHVybiByfHwocj1uZXcgTWFwLHQuc2V0KHRoaXMscikpLChyPW4odGhpcyxyLmdldChzKXx8KHIuc2V0KHMscj1mdW5jdGlvbihuKXtmb3IodmFyIHQscyxyPTEsZT1cIlwiLHU9XCJcIixoPVswXSxwPWZ1bmN0aW9uKG4pezE9PT1yJiYobnx8KGU9ZS5yZXBsYWNlKC9eXFxzKlxcblxccyp8XFxzKlxcblxccyokL2csXCJcIikpKT9oLnB1c2goMCxuLGUpOjM9PT1yJiYobnx8ZSk/KGgucHVzaCgzLG4sZSkscj0yKToyPT09ciYmXCIuLi5cIj09PWUmJm4/aC5wdXNoKDQsbiwwKToyPT09ciYmZSYmIW4/aC5wdXNoKDUsMCwhMCxlKTpyPj01JiYoKGV8fCFuJiY1PT09cikmJihoLnB1c2gociwwLGUscykscj02KSxuJiYoaC5wdXNoKHIsbiwwLHMpLHI9NikpLGU9XCJcIn0sYT0wO2E8bi5sZW5ndGg7YSsrKXthJiYoMT09PXImJnAoKSxwKGEpKTtmb3IodmFyIGw9MDtsPG5bYV0ubGVuZ3RoO2wrKyl0PW5bYV1bbF0sMT09PXI/XCI8XCI9PT10PyhwKCksaD1baF0scj0zKTplKz10OjQ9PT1yP1wiLS1cIj09PWUmJlwiPlwiPT09dD8ocj0xLGU9XCJcIik6ZT10K2VbMF06dT90PT09dT91PVwiXCI6ZSs9dDonXCInPT09dHx8XCInXCI9PT10P3U9dDpcIj5cIj09PXQ/KHAoKSxyPTEpOnImJihcIj1cIj09PXQ/KHI9NSxzPWUsZT1cIlwiKTpcIi9cIj09PXQmJihyPDV8fFwiPlwiPT09blthXVtsKzFdKT8ocCgpLDM9PT1yJiYoaD1oWzBdKSxyPWgsKGg9aFswXSkucHVzaCgyLDAscikscj0wKTpcIiBcIj09PXR8fFwiXFx0XCI9PT10fHxcIlxcblwiPT09dHx8XCJcXHJcIj09PXQ/KHAoKSxyPTIpOmUrPXQpLDM9PT1yJiZcIiEtLVwiPT09ZSYmKHI9NCxoPWhbMF0pfXJldHVybiBwKCksaH0ocykpLHIpLGFyZ3VtZW50cyxbXSkpLmxlbmd0aD4xP3I6clswXX1cbiIsICJpbXBvcnQgaHRtIGZyb20gXCJodG1cIjtcbmltcG9ydCB0eXBlIHsgVGFnZ2VkVGVtcGxhdGUsIFRlbXBsYXRlUHJvcHMsIFRlbXBsYXRlU2NoZW1hIH0gZnJvbSBcIi4vdHlwZXNcIjtcblxuY29uc3QgaHlwZXJ0ZXh0ID0gKFxuICB0eXBlOiB1bmtub3duLFxuICBwcm9wczogVGVtcGxhdGVQcm9wcyxcbiAgLi4uY2hpbGRyZW46IFRlbXBsYXRlU2NoZW1hW11cbikgPT4ge1xuICByZXR1cm4geyB0eXBlLCBwcm9wcywgY2hpbGRyZW4gfTtcbn07XG5cbmNvbnN0IGh0bWwgPSBodG0uYmluZDxUYWdnZWRUZW1wbGF0ZT4oaHlwZXJ0ZXh0KTtcblxuZXhwb3J0IHsgaHRtbCB9O1xuZXhwb3J0IHsgaHRtbCBhcyBqc3ggfTtcbmV4cG9ydCB7IGh0bWwgYXMgdHN4IH07XG4iLCAiLyoqXG4gKiBHZXJhIHVtIGhhc2ggXHUwMEZBbmljbyBiYXNlYWRvIG5vIGFsZ29yaXRtbyBESkIyLlxuICogQHBhcmFtIHN0ciAtIE8gY29udGVcdTAwRkFkbyBhIHBhcnRpciBkbyBxdWFsIG8gaGFzaCBzZXJcdTAwRTEgZ2VyYWRvLlxuICogQHJldHVybnMgTyBoYXNoIGdlcmFkbyBjb21vIHVtYSBzdHJpbmcuXG4gKi9cbmV4cG9ydCBjb25zdCBjcmVhdGVIYXNoID0gKHRleHQ6IHN0cmluZywgc2VsZWN0b3I6IHN0cmluZyk6IHN0cmluZyA9PiB7XG4gIGxldCBoYXNoID0gNTM4MTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCB0ZXh0Lmxlbmd0aDsgaSsrKSB7XG4gICAgaGFzaCA9IChoYXNoICogMzMpIF4gdGV4dC5jaGFyQ29kZUF0KGkpO1xuICB9XG4gIHJldHVybiBgJHtzZWxlY3Rvcn0tJHsoaGFzaCA+Pj4gMCkudG9TdHJpbmcoMzYpfWA7XG59O1xuIiwgImNvbnN0IHN0eWxlRWxlbWVudENhY2hlOiBNYXA8c3RyaW5nLCBIVE1MU3R5bGVFbGVtZW50PiA9IG5ldyBNYXAoKTtcblxuZXhwb3J0IGNvbnN0IGNyZWF0ZVN0eWxlRWxlbWVudCA9IChjb21wb25lbnRJZDogc3RyaW5nKTogSFRNTFN0eWxlRWxlbWVudCA9PiB7XG4gIGNvbnN0IHN0eWxlRWxlbWVudCA9IHN0eWxlRWxlbWVudENhY2hlLmdldChjb21wb25lbnRJZCk7XG5cbiAgaWYgKHN0eWxlRWxlbWVudCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIHN0eWxlRWxlbWVudDtcbiAgfVxuXG4gIGNvbnN0IHN0eWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICBzdHlsZS5zZXRBdHRyaWJ1dGUoXCJkYXRhLWNvbXBvbmVudFwiLCBjb21wb25lbnRJZCk7XG4gIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xuICBzdHlsZUVsZW1lbnRDYWNoZS5zZXQoY29tcG9uZW50SWQsIHN0eWxlKTtcblxuICByZXR1cm4gc3R5bGU7XG59O1xuIiwgInR5cGUgV3JhcFN0eWxlUGFyYW1zID0ge1xuICBzdHlsZTogc3RyaW5nO1xuICBzZWxlY3Rvcjogc3RyaW5nO1xufTtcblxudHlwZSBBY2N1bXVsYXRvciA9IHtcbiAgaW5zaWRlQmxvY2s6IG51bWJlcjtcbiAgZ2xvYmFsUnVsZXM6IHN0cmluZztcbiAgcmVzdWx0OiBzdHJpbmc7XG59O1xuXG50eXBlIExpbmVQcm9jZXNzaW5nID0ge1xuICBnbG9iYWxSdWxlczogc3RyaW5nO1xuICByZXN1bHQ6IHN0cmluZztcbn07XG5cbmNvbnN0IHdyYXBMb29zZVJ1bGVzT3V0c2lkZU1lZGlhUXVlcnkgPSAoe1xuICBzdHlsZSxcbiAgc2VsZWN0b3IsXG59OiBXcmFwU3R5bGVQYXJhbXMpOiBzdHJpbmcgPT4ge1xuICBjb25zdCBsaW5lcyA9IHN0eWxlLnNwbGl0KFwiXFxuXCIpO1xuICBjb25zdCBydWxlUmVnZXggPSAvXlxccyooW1xcdy1dKylcXHMqOlxccypbXjtdKzsvO1xuXG4gIGNvbnN0IGluaXRpYWxTdGF0ZTogQWNjdW11bGF0b3IgPSB7XG4gICAgaW5zaWRlQmxvY2s6IDAsXG4gICAgZ2xvYmFsUnVsZXM6IFwiXCIsXG4gICAgcmVzdWx0OiBcIlwiLFxuICB9O1xuXG4gIGNvbnN0IHByb2Nlc3NHbG9iYWxSdWxlcyA9IChcbiAgICBnbG9iYWxSdWxlczogc3RyaW5nLFxuICAgIHJlc3VsdDogc3RyaW5nLFxuICAgIHNlbGVjdG9yOiBzdHJpbmcsXG4gICk6IExpbmVQcm9jZXNzaW5nID0+ICh7XG4gICAgZ2xvYmFsUnVsZXM6IFwiXCIsXG4gICAgcmVzdWx0OiBgJHtyZXN1bHR9JHtzZWxlY3Rvcn0ge1xcbiR7Z2xvYmFsUnVsZXN9fVxcblxcbmAsXG4gIH0pO1xuXG4gIGNvbnN0IHByb2Nlc3NSZWd1bGFyTGluZSA9IChcbiAgICBsaW5lOiBzdHJpbmcsXG4gICAgcmVzdWx0OiBzdHJpbmcsXG4gICk6IExpbmVQcm9jZXNzaW5nID0+ICh7XG4gICAgZ2xvYmFsUnVsZXM6IFwiXCIsXG4gICAgcmVzdWx0OiBgJHtyZXN1bHR9JHtsaW5lfVxcbmAsXG4gIH0pO1xuXG4gIGNvbnN0IGFkZEdsb2JhbFJ1bGUgPSAoXG4gICAgbGluZTogc3RyaW5nLFxuICAgIGdsb2JhbFJ1bGVzOiBzdHJpbmcsXG4gICk6IExpbmVQcm9jZXNzaW5nID0+ICh7XG4gICAgZ2xvYmFsUnVsZXM6IGAke2dsb2JhbFJ1bGVzfSR7bGluZX1cXG5gLFxuICAgIHJlc3VsdDogXCJcIixcbiAgfSk7XG5cbiAgY29uc3QgY291bnRCbG9ja3MgPSAobGluZTogc3RyaW5nKTogbnVtYmVyID0+IHtcbiAgICBjb25zdCBvcGVuaW5ncyA9IChsaW5lLm1hdGNoKC97L2cpIHx8IFtdKS5sZW5ndGg7XG4gICAgY29uc3QgY2xvc2luZ3MgPSAobGluZS5tYXRjaCgvfS9nKSB8fCBbXSkubGVuZ3RoO1xuICAgIHJldHVybiBvcGVuaW5ncyAtIGNsb3NpbmdzO1xuICB9O1xuXG4gIGNvbnN0IHByb2Nlc3NMaW5lID0gKGFjYzogQWNjdW11bGF0b3IsIGxpbmU6IHN0cmluZyk6IEFjY3VtdWxhdG9yID0+IHtcbiAgICBhY2MuaW5zaWRlQmxvY2sgKz0gY291bnRCbG9ja3MobGluZSk7XG5cbiAgICAvLyBDYXNlIDE6IExpbmUgaXMgYSBnbG9iYWwgcnVsZVxuICAgIGlmIChhY2MuaW5zaWRlQmxvY2sgPT09IDAgJiYgcnVsZVJlZ2V4LnRlc3QobGluZSkpIHtcbiAgICAgIGNvbnN0IHsgZ2xvYmFsUnVsZXMsIHJlc3VsdCB9ID0gYWRkR2xvYmFsUnVsZShsaW5lLCBhY2MuZ2xvYmFsUnVsZXMpO1xuICAgICAgcmV0dXJuIHsgLi4uYWNjLCBnbG9iYWxSdWxlcywgcmVzdWx0OiBhY2MucmVzdWx0ICsgcmVzdWx0IH07XG4gICAgfVxuXG4gICAgLy8gQ2FzZSAyOiBUaGVyZSBhcmUgYWNjdW11bGF0ZWQgZ2xvYmFsIHJ1bGVzXG4gICAgaWYgKGFjYy5nbG9iYWxSdWxlcykge1xuICAgICAgY29uc3QgeyBnbG9iYWxSdWxlcywgcmVzdWx0IH0gPSBwcm9jZXNzR2xvYmFsUnVsZXMoXG4gICAgICAgIGFjYy5nbG9iYWxSdWxlcyxcbiAgICAgICAgYWNjLnJlc3VsdCxcbiAgICAgICAgc2VsZWN0b3IsXG4gICAgICApO1xuICAgICAgY29uc3QgcHJvY2Vzc2VkTGluZSA9IHByb2Nlc3NSZWd1bGFyTGluZShsaW5lLCBcIlwiKTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLmFjYyxcbiAgICAgICAgZ2xvYmFsUnVsZXMsXG4gICAgICAgIHJlc3VsdDogcmVzdWx0ICsgcHJvY2Vzc2VkTGluZS5yZXN1bHQsXG4gICAgICB9O1xuICAgIH1cblxuICAgIC8vIENhc2UgMzogUmVndWxhciBsaW5lXG4gICAgY29uc3QgeyBnbG9iYWxSdWxlcywgcmVzdWx0IH0gPSBwcm9jZXNzUmVndWxhckxpbmUobGluZSwgYWNjLnJlc3VsdCk7XG4gICAgcmV0dXJuIHsgLi4uYWNjLCBnbG9iYWxSdWxlcywgcmVzdWx0IH07XG4gIH07XG5cbiAgY29uc3QgeyByZXN1bHQsIGdsb2JhbFJ1bGVzIH0gPSBsaW5lcy5yZWR1Y2UocHJvY2Vzc0xpbmUsIGluaXRpYWxTdGF0ZSk7XG5cbiAgcmV0dXJuIGdsb2JhbFJ1bGVzXG4gICAgPyBgJHtyZXN1bHR9JHtzZWxlY3Rvcn0ge1xcbiR7Z2xvYmFsUnVsZXN9fVxcbmAudHJpbSgpXG4gICAgOiByZXN1bHQudHJpbSgpO1xufTtcblxuY29uc3Qgd3JhcExvb3NlUnVsZXNJbnNpZGVNZWRpYVF1ZXJ5ID0gKHtcbiAgc3R5bGUsXG4gIHNlbGVjdG9yLFxufTogV3JhcFN0eWxlUGFyYW1zKTogc3RyaW5nID0+IHtcbiAgY29uc3QgcmVnZXggPSAvQG1lZGlhXFxzKihbXntdKylcXHMqXFx7KFtcXHNcXFNdKj8pXFx9L2c7XG4gIGNvbnN0IHJ1bGVSZWdleCA9IC9eXFxzKihbXFx3LV0rKVxccyo6XFxzKlteO10rOy87XG5cbiAgcmV0dXJuIHN0eWxlLnJlcGxhY2UocmVnZXgsIChtYXRjaCwgbWVkaWFRdWVyeSwgaW5uZXJDc3MpID0+IHtcbiAgICBjb25zdCBydWxlcyA9IGlubmVyQ3NzXG4gICAgICAudHJpbSgpXG4gICAgICAuc3BsaXQoXCJcXG5cIilcbiAgICAgIC5tYXAoKGxpbmU6IHN0cmluZykgPT4gbGluZS50cmltKCkpXG4gICAgICAuZmlsdGVyKChsaW5lOiBzdHJpbmcpID0+IGxpbmUpO1xuXG4gICAgY29uc3Qgd3JhcHBlZFJ1bGVzID0gcnVsZXNcbiAgICAgIC5maWx0ZXIoKHJ1bGU6IHN0cmluZykgPT4gcnVsZVJlZ2V4LnRlc3QocnVsZSkpXG4gICAgICAubWFwKChydWxlOiBzdHJpbmcpID0+IGAke3NlbGVjdG9yfSB7XFxuJHtydWxlLnRyaW0oKX1cXG59YClcbiAgICAgIC5qb2luKFwiXFxuXCIpO1xuXG4gICAgcmV0dXJuIGBAbWVkaWEgJHttZWRpYVF1ZXJ5LnRyaW0oKX0ge1xcbiR7d3JhcHBlZFJ1bGVzfVxcbn1gO1xuICB9KTtcbn07XG5cbmNvbnN0IGFwcGx5Q2xhc3NOYW1lU2NvcGUgPSAoeyBzdHlsZSwgc2VsZWN0b3IgfTogV3JhcFN0eWxlUGFyYW1zKTogc3RyaW5nID0+IHtcbiAgY29uc3QgcmVnZXggPSAvXFwuKD88IVtcXGRdKSg/IVtcXGRdKShbXFx3LV0rKS9nO1xuICByZXR1cm4gc3R5bGUucmVwbGFjZShyZWdleCwgYC4ke3NlbGVjdG9yfV8kMWApO1xufTtcblxuZXhwb3J0IGNvbnN0IHRyYW5zZm9ybVN0eWxlID0gKHJhd1N0eWxlOiBzdHJpbmcsIHNlbGVjdG9yOiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xuICBsZXQgc3R5bGUgPSByYXdTdHlsZTtcbiAgY29uc3QgY2xhc3NOYW1lID0gYC4ke3NlbGVjdG9yfWA7XG4gIHN0eWxlID0gYXBwbHlDbGFzc05hbWVTY29wZSh7IHN0eWxlLCBzZWxlY3RvciB9KTtcbiAgc3R5bGUgPSB3cmFwTG9vc2VSdWxlc091dHNpZGVNZWRpYVF1ZXJ5KHsgc3R5bGUsIHNlbGVjdG9yOiBjbGFzc05hbWUgfSk7XG4gIHN0eWxlID0gd3JhcExvb3NlUnVsZXNJbnNpZGVNZWRpYVF1ZXJ5KHsgc3R5bGUsIHNlbGVjdG9yOiBjbGFzc05hbWUgfSk7XG5cbiAgcmV0dXJuIHN0eWxlO1xufTtcbiIsICJpbXBvcnQgdHlwZSB7IFRhZ2dlZFN0eWxlIH0gZnJvbSBcIi4vdHlwZXNcIjtcbmltcG9ydCB7IGNyZWF0ZUhhc2ggfSBmcm9tIFwiLi9jcmVhdGVIYXNoXCI7XG5pbXBvcnQgeyB0cmFuc2Zvcm1TdHlsZSB9IGZyb20gXCIuL2Nzc1BhcnNlclwiO1xuaW1wb3J0IHsgY3JlYXRlU3R5bGVFbGVtZW50IH0gZnJvbSBcIi4vY3JlYXRlU3R5bGVFbGVtZW50XCI7XG5cbnR5cGUgSGFuZGxlclBhcmFtcyA9IHtcbiAgaGFzaElkOiBzdHJpbmc7XG4gIHNjb3BlZFN0eWxlOiBzdHJpbmc7XG4gIHN0eWxlRWxlbWVudDogRWxlbWVudDtcbn07XG50eXBlIEhhbmRsZXIgPSAocGF5bG9hZDogSGFuZGxlclBhcmFtcykgPT4gdm9pZDtcblxuY29uc3QgY3NzQ2FjaGU6IE1hcDxzdHJpbmcsIHN0cmluZz4gPSBuZXcgTWFwKCk7XG5cbmV4cG9ydCBjb25zdCBjc3MgPVxuICAoc2VsZWN0b3I6IHN0cmluZywgaGFuZGxlcjogSGFuZGxlciA9ICgpID0+IHt9KTogVGFnZ2VkU3R5bGUgPT5cbiAgKFxuICAgIHN0cmluZ3M6IFRlbXBsYXRlU3RyaW5nc0FycmF5LFxuICAgIC4uLmludGVycG9sYXRpb25zOiAoc3RyaW5nIHwgbnVtYmVyKVtdXG4gICk6IHN0cmluZyA9PiB7XG4gICAgY29uc3QgcmF3Q1NTID0gc3RyaW5ncy5yZWR1Y2UoXG4gICAgICAoYWNjdW11bGF0b3IsIHN0ciwgaW5kZXgpID0+XG4gICAgICAgIGAke2FjY3VtdWxhdG9yfSR7c3RyfSR7aW50ZXJwb2xhdGlvbnNbaW5kZXhdICE9PSB1bmRlZmluZWQgPyBpbnRlcnBvbGF0aW9uc1tpbmRleF0gOiBcIlwifWAsXG4gICAgICBcIlwiLFxuICAgICk7XG5cbiAgICBjb25zdCBjYWNoZWRDbGFzc05hbWUgPSBjc3NDYWNoZS5nZXQocmF3Q1NTKTtcbiAgICBpZiAoY2FjaGVkQ2xhc3NOYW1lICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiBjYWNoZWRDbGFzc05hbWU7XG4gICAgfVxuXG4gICAgY29uc3QgaGFzaElkID0gY3JlYXRlSGFzaChyYXdDU1MsIHNlbGVjdG9yKTtcbiAgICBjb25zdCBzY29wZWRTdHlsZSA9IHRyYW5zZm9ybVN0eWxlKHJhd0NTUywgYCR7aGFzaElkfWApO1xuICAgIGNvbnN0IHN0eWxlRWxlbWVudCA9IGNyZWF0ZVN0eWxlRWxlbWVudChgJHtoYXNoSWR9YCk7XG5cbiAgICBoYW5kbGVyKHsgaGFzaElkLCBzY29wZWRTdHlsZSwgc3R5bGVFbGVtZW50IH0pO1xuXG4gICAgaWYgKCFzdHlsZUVsZW1lbnQuaW5uZXJIVE1MLmluY2x1ZGVzKHNjb3BlZFN0eWxlKSkge1xuICAgICAgc3R5bGVFbGVtZW50LmlubmVySFRNTCArPSBzY29wZWRTdHlsZTtcbiAgICB9XG5cbiAgICBjc3NDYWNoZS5zZXQocmF3Q1NTLCBoYXNoSWQpO1xuXG4gICAgcmV0dXJuIGhhc2hJZDtcbiAgfTtcbiIsICJpbXBvcnQgeyBpc0V2ZW50TmFtZSB9IGZyb20gXCJAL3ZhbGlkYXRvcnNcIjtcblxudHlwZSBBdHRyaWJ1dGUgPSBvYmplY3QgJiB7XG4gIFtrZXk6IHN5bWJvbCB8IHN0cmluZ106IHVua25vd247XG59O1xuXG50eXBlIEV2ZW50SGFuZGxlciA9IDxLIGV4dGVuZHMga2V5b2YgSFRNTEVsZW1lbnRFdmVudE1hcD4oXG4gIGV2ZW50OiBIVE1MRWxlbWVudEV2ZW50TWFwW0tdLFxuKSA9PiB2b2lkO1xuXG5leHBvcnQgY29uc3Qgc2V0RWxlbWVudEF0dHJpYnV0ZXMgPSAoXG4gIGVsZW1lbnQ6IEVsZW1lbnQsXG4gIGF0dHJpYnV0ZXM6IEF0dHJpYnV0ZSxcbik6IEVsZW1lbnQgPT4ge1xuICBjb25zdCBhdHRyaWJ1dGVLZXlzID0gYXR0cmlidXRlcyA/IE9iamVjdC5rZXlzKGF0dHJpYnV0ZXMpIDogW107XG4gIGZvciAoY29uc3Qga2V5IG9mIGF0dHJpYnV0ZUtleXMpIHtcbiAgICBpZiAoIWlzRXZlbnROYW1lKGtleSkoKSkge1xuICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoa2V5LCBhdHRyaWJ1dGVzW2tleV0gYXMgc3RyaW5nKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgZXZlbnROYW1lID0ga2V5XG4gICAgICAgIC5yZXBsYWNlKC9vbi8sIFwiXCIpXG4gICAgICAgIC50b0xvd2VyQ2FzZSgpIGFzIGtleW9mIEhUTUxFbGVtZW50RXZlbnRNYXA7XG4gICAgICBjb25zdCBldmVudEhhbmRsZXIgPSBhdHRyaWJ1dGVzW2tleV0gYXMgRXZlbnRIYW5kbGVyO1xuICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgZXZlbnRIYW5kbGVyKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGVsZW1lbnQ7XG59O1xuIiwgImltcG9ydCB0eXBlIHsgVGVtcGxhdGVTY2hlbWEgfSBmcm9tIFwiQC90ZW1wbGF0ZVwiO1xuaW1wb3J0IHR5cGUgeyBHZW5lcmljT2JqZWN0LCBTdGF0ZSwgU3RhdGVNYW5hZ2VyIH0gZnJvbSBcIkAvc3RhdGVcIjtcbmltcG9ydCB7IGNyZWF0ZVN0YXRlIH0gZnJvbSBcIkAvc3RhdGVcIjtcbmltcG9ydCB7IHJlbmRlciB9IGZyb20gXCJAL3JlbmRlclwiO1xuaW1wb3J0IHsgaHRtbCwganN4LCB0c3ggfSBmcm9tIFwiQC90ZW1wbGF0ZVwiO1xuaW1wb3J0IHsgY3NzIH0gZnJvbSBcIkAvc3R5bGVcIjtcbmltcG9ydCB7IHJlbmRlckNoaWxkcmVuIH0gZnJvbSBcIi4vcmVuZGVyQ2hpbGRyZW5cIjtcbmltcG9ydCB7IHNldEVsZW1lbnRBdHRyaWJ1dGVzIH0gZnJvbSBcIi4vc2V0RWxlbWVudEF0dHJpYnV0ZXNcIjtcblxudHlwZSBGYWN0b3J5ID0gKHBhcmFtcz86IHVua25vd24pID0+IHVua25vd247XG5cbnR5cGUgU3R5bGVQYXJhbXMgPSB7XG4gIHByb3BzOiBTdGF0ZTtcbiAgc3RhdGU6IFN0YXRlO1xuICBjc3M6IFJldHVyblR5cGU8dHlwZW9mIGNzcz47XG59O1xuXG50eXBlIFN0eWxlcyA9IHsgW2tleTogc3RyaW5nXTogc3RyaW5nIH07XG50eXBlIFN0eWxlc09iamVjdCA9IEdlbmVyaWNPYmplY3Q8eyBba2V5OiBzdHJpbmddOiAoKSA9PiBzdHJpbmcgfT47XG50eXBlIFN0eWxlSGFuZGxlckZhY3RvcnkgPSAoKSA9PiBTdHlsZXNPYmplY3Q7XG50eXBlIFN0eWxlSGFuZGxlciA9IChwYXJhbXM6IFN0eWxlUGFyYW1zKSA9PiBzdHJpbmc7XG5cbnR5cGUgVGVtcGxhdGVQYXJhbXMgPSB7XG4gIHByb3BzOiBTdGF0ZTtcbiAgc3RhdGU6IFN0YXRlO1xuICBodG1sOiB0eXBlb2YgaHRtbDtcbiAganN4OiB0eXBlb2YganN4O1xuICB0c3g6IHR5cGVvZiB0c3g7XG4gIHN0eWxlczogU3R5bGVzO1xuICBhY3Rpb25zOiBBY3Rpb25zO1xufTtcblxudHlwZSBUZW1wbGF0ZUluamVjdGlvbnMgPSA8VCA9IHVua25vd24+KCkgPT4gR2VuZXJpY09iamVjdDxUPjtcblxudHlwZSBUZW1wbGF0ZUhhbmRsZXIgPSAoXG4gIHBhcmFtczogVGVtcGxhdGVQYXJhbXMsXG4gIGluamVjdGlvbnM6IFRlbXBsYXRlSW5qZWN0aW9ucyxcbikgPT4gdm9pZDtcblxudHlwZSBBY3Rpb25zID0gR2VuZXJpY09iamVjdDtcblxudHlwZSBBY3Rpb25QYXJhbXMgPSB7XG4gIHByb3BzOiBTdGF0ZTtcbiAgc3RhdGU6IFN0YXRlTWFuYWdlcjtcbn07XG50eXBlIEFjdGlvbkhhbmRsZXJGYWN0b3J5ID0gKHBhcmFtczogQWN0aW9uUGFyYW1zKSA9PiBHZW5lcmljT2JqZWN0O1xuXG50eXBlIEF0dHJpYnV0ZSA9IG9iamVjdCAmIHtcbiAgW2tleTogc3ltYm9sIHwgc3RyaW5nXTogdW5rbm93bjtcbn07XG5cbmNvbnN0IF9hdHRyaWJ1dGVzID0ge307XG5cbmNvbnN0IF9jcmVhdGVUYWdCeUZhY3RvcnlOYW1lID0gKGZhY3Rvcnk6IEZhY3RvcnkpID0+IHtcbiAgcmV0dXJuIGZhY3RvcnkubmFtZVxuICAgIC5zcGxpdCgvKD89W0EtWl0pLylcbiAgICAuam9pbihcIi1cIilcbiAgICAudG9Mb3dlckNhc2UoKTtcbn07XG5cbmNvbnN0IF9jcmVhdGVVc2VTdGF0ZSA9IChzdGF0ZTogU3RhdGVNYW5hZ2VyKSA9PiB7XG4gIGNvbnN0IGN1cnJlbnRTdGF0ZSA9IHt9O1xuICBjb25zdCB1c2VTdGF0ZSA9IDxUPihpbml0aWFsU3RhdGU6IFN0YXRlPFQ+KTogU3RhdGVNYW5hZ2VyID0+IHtcbiAgICBjb25zdCBsYXRlc3RTdGF0ZSA9IHN0YXRlLmdldCgpIGFzIFN0YXRlPFQ+O1xuICAgIHN0YXRlLnNldCh7IC4uLmluaXRpYWxTdGF0ZSwgLi4ubGF0ZXN0U3RhdGUgfSk7XG5cbiAgICBPYmplY3QuYXNzaWduKGN1cnJlbnRTdGF0ZSwgc3RhdGUuZ2V0KCkpO1xuICAgIHJldHVybiB7IGdldDogc3RhdGUuZ2V0LCBzZXQ6IHN0YXRlLnNldCwgd2F0Y2g6IHN0YXRlLndhdGNoIH07XG4gIH07XG4gIHJldHVybiB7IGN1cnJlbnRTdGF0ZSwgdXNlU3RhdGUgfTtcbn07XG5cbmNvbnN0IF9jcmVhdGVVc2VTdHlsZSA9ICh7IHByb3BzLCBzdGF0ZSwgY3NzIH06IFN0eWxlUGFyYW1zKSA9PiB7XG4gIGNvbnN0IHN0eWxlc2hlZXQgPSB7fTtcbiAgY29uc3QgdXNlU3R5bGUgPSAoY3NzSGFuZGxlckZhY3Rvcnk6IFN0eWxlSGFuZGxlckZhY3RvcnkpID0+IHtcbiAgICBjb25zdCBoYW5kbGVycyA9IGNzc0hhbmRsZXJGYWN0b3J5KCk7XG4gICAgY29uc3Qgc3R5bGVzOiBTdHlsZXMgPSB7fTtcblxuICAgIGZvciAoY29uc3Qga2V5IGluIGhhbmRsZXJzKSB7XG4gICAgICBjb25zdCBoYW5kbGVyID0gaGFuZGxlcnNba2V5XSBhcyBTdHlsZUhhbmRsZXI7XG4gICAgICBjb25zdCBzdHlsZSA9IGhhbmRsZXIoeyBwcm9wcywgc3RhdGUsIGNzcyB9KTtcbiAgICAgIHN0eWxlc1trZXldID0gc3R5bGU7XG4gICAgfVxuXG4gICAgT2JqZWN0LmFzc2lnbihzdHlsZXNoZWV0LCBzdHlsZXMpO1xuICAgIHJldHVybiBzdHlsZXM7XG4gIH07XG5cbiAgcmV0dXJuIHsgc3R5bGVzOiBzdHlsZXNoZWV0LCB1c2VTdHlsZSB9O1xufTtcblxuY29uc3QgX2NyZWF0ZVVzZVRlbXBsYXRlID0gKHBhcmFtczogVGVtcGxhdGVQYXJhbXMpID0+IHtcbiAgY29uc3QgdXNlVGVtcGxhdGUgPSAoXG4gICAgdGVtcGxhdGVIYW5kbGVyOiBUZW1wbGF0ZUhhbmRsZXIsXG4gICAgdGVtcGxhdGVJbmplY3Rpb25zOiBUZW1wbGF0ZUluamVjdGlvbnMsXG4gICkgPT4ge1xuICAgIHJldHVybiB0ZW1wbGF0ZUhhbmRsZXIocGFyYW1zLCB0ZW1wbGF0ZUluamVjdGlvbnMpO1xuICB9O1xuXG4gIHJldHVybiB1c2VUZW1wbGF0ZTtcbn07XG5cbmNvbnN0IF9jcmVhdGVVc2VBY3Rpb24gPSAoeyBwcm9wcywgc3RhdGUgfTogQWN0aW9uUGFyYW1zKSA9PiB7XG4gIGNvbnN0IGFjdGlvbnM6IEdlbmVyaWNPYmplY3QgPSB7fTtcblxuICBjb25zdCB1c2VBY3Rpb24gPSAoYWN0aW9uSGFuZGxlckZhY3Rvcnk6IEFjdGlvbkhhbmRsZXJGYWN0b3J5KSA9PiB7XG4gICAgY29uc3QgaGFuZGxlckFjdGlvbnMgPSBhY3Rpb25IYW5kbGVyRmFjdG9yeSh7IHByb3BzLCBzdGF0ZSB9KTtcbiAgICBPYmplY3QuYXNzaWduKGFjdGlvbnMsIGhhbmRsZXJBY3Rpb25zKTtcbiAgfTtcblxuICByZXR1cm4geyBhY3Rpb25zLCB1c2VBY3Rpb24gfTtcbn07XG5cbmV4cG9ydCBjb25zdCBjcmVhdGVFbGVtZW50QnlGYWN0b3J5TmFtZSA9IChcbiAgdGVtcGxhdGU6IFRlbXBsYXRlU2NoZW1hLFxuICBwYXJlbnRFbGVtZW50OiBFbGVtZW50LFxuICBsYXRlc3RTdGF0ZTogU3RhdGUgPSB7fSxcbikgPT4ge1xuICByZXR1cm4gKCkgPT4ge1xuICAgIGNvbnN0IGZhY3RvcnkgPSB0ZW1wbGF0ZS50eXBlIGFzIEZhY3Rvcnk7XG4gICAgY29uc3QgdGFnTmFtZSA9IF9jcmVhdGVUYWdCeUZhY3RvcnlOYW1lKGZhY3RvcnkpO1xuICAgIGNvbnN0IHNlbGVjdG9yID0gdGFnTmFtZS50b0xvd2VyQ2FzZSgpO1xuICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRhZ05hbWUpO1xuXG4gICAgY29uc3QgcHJvcHMgPSB0ZW1wbGF0ZS5wcm9wcztcbiAgICBjb25zdCBsYXRlc3REZWVwU3RhdGUgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGxhdGVzdFN0YXRlKSk7XG4gICAgY29uc3Qgc3RhdGVNYW5hZ2VyID0gY3JlYXRlU3RhdGUobGF0ZXN0RGVlcFN0YXRlKTtcbiAgICBjb25zdCB7IGN1cnJlbnRTdGF0ZTogc3RhdGUsIHVzZVN0YXRlIH0gPSBfY3JlYXRlVXNlU3RhdGUoc3RhdGVNYW5hZ2VyKTtcbiAgICBjb25zdCBzdHlsZWQgPSBjc3Moc2VsZWN0b3IsICh7IGhhc2hJZCB9KSA9PiB7XG4gICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoaGFzaElkKTtcbiAgICAgIE9iamVjdC5hc3NpZ24oX2F0dHJpYnV0ZXMsIHsgY2xhc3M6IGhhc2hJZCB9KTtcbiAgICB9KTtcbiAgICBjb25zdCB7IHN0eWxlcywgdXNlU3R5bGUgfSA9IF9jcmVhdGVVc2VTdHlsZSh7IHByb3BzLCBzdGF0ZSwgY3NzOiBzdHlsZWQgfSk7XG4gICAgY29uc3QgeyBhY3Rpb25zLCB1c2VBY3Rpb24gfSA9IF9jcmVhdGVVc2VBY3Rpb24oe1xuICAgICAgcHJvcHMsXG4gICAgICBzdGF0ZTogc3RhdGVNYW5hZ2VyLFxuICAgIH0pO1xuXG4gICAgY29uc3QgdXNlVGVtcGxhdGUgPSBfY3JlYXRlVXNlVGVtcGxhdGUoe1xuICAgICAgcHJvcHMsXG4gICAgICBzdGF0ZSxcbiAgICAgIGh0bWwsXG4gICAgICBqc3gsXG4gICAgICB0c3gsXG4gICAgICBzdHlsZXMsXG4gICAgICBhY3Rpb25zLFxuICAgIH0pO1xuXG4gICAgY29uc3QgY2hpbGRyZW4gPSBmYWN0b3J5KHtcbiAgICAgIHByb3BzLFxuICAgICAgdXNlU3RhdGUsXG4gICAgICB1c2VTdHlsZSxcbiAgICAgIHVzZVRlbXBsYXRlLFxuICAgICAgdXNlQWN0aW9uLFxuICAgIH0pIGFzIFRlbXBsYXRlU2NoZW1hW107XG5cbiAgICBjb25zdCBvbGRFbGVtZW50ID0gcGFyZW50RWxlbWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKSBhcyBFbGVtZW50O1xuICAgIHNldEVsZW1lbnRBdHRyaWJ1dGVzKGVsZW1lbnQsIF9hdHRyaWJ1dGVzKTtcblxuICAgIG9sZEVsZW1lbnRcbiAgICAgID8gb2xkRWxlbWVudC5yZXBsYWNlV2l0aChlbGVtZW50KVxuICAgICAgOiBwYXJlbnRFbGVtZW50Lmluc2VydEFkamFjZW50RWxlbWVudChcImJlZm9yZWVuZFwiLCBlbGVtZW50KTtcblxuICAgIHJlbmRlckNoaWxkcmVuKGNoaWxkcmVuLCBlbGVtZW50LCBzdGF0ZSk7XG5cbiAgICBzdGF0ZU1hbmFnZXIud2F0Y2goKHBheWxvYWQpID0+IHtcbiAgICAgIGVsZW1lbnQuaW5uZXJIVE1MID0gXCJcIjtcbiAgICAgIHJlbmRlcih0ZW1wbGF0ZSwgcGFyZW50RWxlbWVudCwgcGF5bG9hZCk7XG4gICAgfSk7XG4gIH07XG59O1xuIiwgImltcG9ydCB0eXBlIHsgU3RhdGUgfSBmcm9tIFwiQC9zdGF0ZVwiO1xuaW1wb3J0IHR5cGUgeyBUZW1wbGF0ZVNjaGVtYSB9IGZyb20gXCJAL3RlbXBsYXRlXCI7XG5pbXBvcnQgeyBzZXRFbGVtZW50QXR0cmlidXRlcyB9IGZyb20gXCIuL3NldEVsZW1lbnRBdHRyaWJ1dGVzXCI7XG5pbXBvcnQgeyByZW5kZXJDaGlsZHJlbiB9IGZyb20gXCIuL3JlbmRlckNoaWxkcmVuXCI7XG5cbmV4cG9ydCBjb25zdCBjcmVhdGVFbGVtZW50QnlUYWdOYW1lID1cbiAgKHRlbXBsYXRlOiBUZW1wbGF0ZVNjaGVtYSwgcGFyZW50RWxlbWVudDogRWxlbWVudCwgc3RhdGU6IFN0YXRlID0ge30pID0+XG4gICgpID0+IHtcbiAgICBjb25zdCB0YWdOYW1lID0gdGVtcGxhdGUudHlwZSBhcyBzdHJpbmc7XG4gICAgY29uc3Qgc2VsZWN0b3IgPSB0YWdOYW1lLnRvTG93ZXJDYXNlKCk7XG4gICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnTmFtZSk7XG4gICAgY29uc3QgaGFzaElkID0gcGFyZW50RWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJjbGFzc1wiKSBhcyBzdHJpbmc7XG4gICAgY29uc3QgY2xhc3NOYW1lID0gdGVtcGxhdGU/LnByb3BzPy5jbGFzcyBhcyBzdHJpbmc7XG4gICAgaWYgKGNsYXNzTmFtZSkge1xuICAgICAgaWYgKCFjbGFzc05hbWUuaW5jbHVkZXMoaGFzaElkKSkge1xuICAgICAgICBjb25zdCBuZXdDbGFzc05hbWUgPSBgJHtoYXNoSWR9XyR7Y2xhc3NOYW1lfWA7XG4gICAgICAgIHNldEVsZW1lbnRBdHRyaWJ1dGVzKGVsZW1lbnQsIHsgY2xhc3M6IG5ld0NsYXNzTmFtZSB9KTtcbiAgICAgICAgcGFyZW50RWxlbWVudC5pbnNlcnRBZGphY2VudEVsZW1lbnQoXCJiZWZvcmVlbmRcIiwgZWxlbWVudCk7XG4gICAgICAgIHJlbmRlckNoaWxkcmVuKHRlbXBsYXRlLmNoaWxkcmVuLCBlbGVtZW50LCBzdGF0ZSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG4gICAgc2V0RWxlbWVudEF0dHJpYnV0ZXMoZWxlbWVudCwgdGVtcGxhdGUucHJvcHMpO1xuICAgIHBhcmVudEVsZW1lbnQuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KFwiYmVmb3JlZW5kXCIsIGVsZW1lbnQpO1xuICAgIHJlbmRlckNoaWxkcmVuKHRlbXBsYXRlLmNoaWxkcmVuLCBlbGVtZW50LCBzdGF0ZSk7XG4gIH07XG4iLCAiaW1wb3J0IHsgcmVuZGVyIH0gZnJvbSBcIkAvcmVuZGVyXCI7XG5pbXBvcnQgdHlwZSB7IFRlbXBsYXRlU2NoZW1hLCBUYWdnZWRUZW1wbGF0ZSB9IGZyb20gXCJAL3R5cGVzXCI7XG5pbXBvcnQgdHlwZSB7IFN0YXRlIH0gZnJvbSBcIkAvc3RhdGVcIjtcblxuZXhwb3J0IGNvbnN0IHJlbmRlclRlbXBsYXRlRGF0YSA9XG4gICh0ZW1wbGF0ZURhdGE6IFRhZ2dlZFRlbXBsYXRlLCBlbGVtZW50OiBFbGVtZW50LCBzdGF0ZTogU3RhdGUgPSB7fSkgPT5cbiAgICAoKSA9PiB7XG4gICAgICBpZiAodHlwZW9mIHRlbXBsYXRlRGF0YSA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICBlbGVtZW50Lmluc2VydEFkamFjZW50SFRNTChcImJlZm9yZWVuZFwiLCB0ZW1wbGF0ZURhdGEpO1xuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIHRlbXBsYXRlRGF0YSA9PT0gXCJudW1iZXJcIikge1xuICAgICAgICBjb25zdCBkYXRhID0gTnVtYmVyKHRlbXBsYXRlRGF0YSk7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gZGF0YS50b1N0cmluZygpO1xuICAgICAgICBlbGVtZW50Lmluc2VydEFkamFjZW50SFRNTChcImJlZm9yZWVuZFwiLCB2YWx1ZSk7XG4gICAgICB9XG4gICAgfTtcbiIsICJpbXBvcnQgdHlwZSB7IFRlbXBsYXRlU2NoZW1hIH0gZnJvbSBcIkAvdHlwZXNcIjtcbmltcG9ydCB7IGNyZWF0ZUNoYWluIH0gZnJvbSBcIkAvZmFjdG9yaWVzXCI7XG5pbXBvcnQgeyBjcmVhdGVFbGVtZW50QnlGYWN0b3J5TmFtZSwgY3JlYXRlRWxlbWVudEJ5VGFnTmFtZSB9IGZyb20gXCJAL2FjdGlvbnNcIjtcbmltcG9ydCB7IGlzRnVuY3Rpb24sIGlzU3RyaW5nIH0gZnJvbSBcIkAvdmFsaWRhdG9yc1wiO1xuaW1wb3J0IHR5cGUgeyBTdGF0ZSB9IGZyb20gXCJAL3N0YXRlXCI7XG5cbmV4cG9ydCBjb25zdCByZW5kZXJUZW1wbGF0ZU9iamVjdCA9XG4gICh0ZW1wbGF0ZTogVGVtcGxhdGVTY2hlbWEsIGNvbnRleHRFbGVtZW50OiBFbGVtZW50LCBzdGF0ZTogU3RhdGUgPSB7fSkgPT5cbiAgICAoKTogdm9pZCA9PiB7XG4gICAgICBjb25zdCBfY2hhaW4gPSBjcmVhdGVDaGFpbigpO1xuXG4gICAgICBfY2hhaW4uYWRkKHtcbiAgICAgICAgdmFsaWRhdG9yOiBpc1N0cmluZyh0ZW1wbGF0ZS50eXBlKSxcbiAgICAgICAgYWN0aW9uOiBjcmVhdGVFbGVtZW50QnlUYWdOYW1lKHRlbXBsYXRlLCBjb250ZXh0RWxlbWVudCwgc3RhdGUpLFxuICAgICAgfSk7XG5cbiAgICAgIF9jaGFpbi5hZGQoe1xuICAgICAgICB2YWxpZGF0b3I6IGlzRnVuY3Rpb24odGVtcGxhdGUudHlwZSksXG4gICAgICAgIGFjdGlvbjogY3JlYXRlRWxlbWVudEJ5RmFjdG9yeU5hbWUodGVtcGxhdGUsIGNvbnRleHRFbGVtZW50LCBzdGF0ZSksXG4gICAgICB9KTtcblxuICAgICAgX2NoYWluLmV4ZWN1dGUoKTtcbiAgICB9O1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7OztBQUVPLElBQU0sY0FBYyw2QkFBTTtBQUMvQixRQUFNLFNBQVMsb0JBQUksSUFBd0I7QUFFM0MsUUFBTSxNQUFNLHdCQUFJLGNBQTRCO0FBQzFDLFdBQU8sSUFBSSxTQUFTO0FBQUEsRUFDdEIsR0FGWTtBQUlaLFFBQU0sVUFBVSw2QkFBTTtBQUNwQixlQUFXLEVBQUUsUUFBUSxVQUFVLEtBQUssUUFBUTtBQUMxQyxVQUFJLFVBQVUsRUFBRyxRQUFPO0FBQUEsSUFDMUI7QUFBQSxFQUNGLEdBSmdCO0FBTWhCLFNBQU8sRUFBRSxLQUFLLFFBQVE7QUFDeEIsR0FkMkI7OztBQ0ZwQixJQUFNLHVCQUF1Qix3QkFBQyxtQkFBbUM7QUFDdEUsTUFBSSxPQUFPLG1CQUFtQixTQUFVLFFBQU87QUFDL0MsU0FBTyxlQUNKLFFBQVEsTUFBTSxPQUFPLEVBQ3JCLFFBQVEsTUFBTSxNQUFNLEVBQ3BCLFFBQVEsTUFBTSxNQUFNLEVBQ3BCLFFBQVEsTUFBTSxRQUFRLEVBQ3RCLFFBQVEsTUFBTSxPQUFPLEVBQ3JCLFFBQVEsT0FBTyxRQUFRO0FBQzVCLEdBVG9DO0FBVzdCLElBQU0saUJBQWlCLHdCQUFDLFNBQWlCLFlBQTRCO0FBQzFFLFFBQU0sUUFBUTtBQUNkLFNBQU8sUUFBUSxRQUFRLE9BQU8sQ0FBQyxXQUFXO0FBQ3hDLFdBQU8sSUFBSSxPQUFPLElBQUksT0FBTyxR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RUEsSUFBRSxDQUFDLEdBQUVFLEtBQUUsS0FBRyxNQUFJQSxNQUFHLFVBQVEsS0FBR0YsS0FBRSxFQUFFLEtBQUssR0FBRUEsSUFBRSxDQUFDLElBQUUsTUFBSUUsTUFBRyxLQUFHLENBQUNGLEtBQUUsRUFBRSxLQUFLLEdBQUUsR0FBRSxNQUFHLENBQUMsSUFBRUUsTUFBRyxPQUFLLEtBQUcsQ0FBQ0YsTUFBRyxNQUFJRSxRQUFLLEVBQUUsS0FBS0EsSUFBRSxHQUFFLEdBQUVELEVBQUMsR0FBRUMsS0FBRSxJQUFHRixPQUFJLEVBQUUsS0FBS0UsSUFBRUYsSUFBRSxHQUFFQyxFQUFDLEdBQUVDLEtBQUUsS0FBSSxJQUFFO0FBQUEsSUFBRSxHQUFFLElBQUUsR0FBRSxJQUFFRixHQUFFLFFBQU8sS0FBSTtBQUFDLFlBQUksTUFBSUUsTUFBRyxFQUFFLEdBQUUsRUFBRSxDQUFDO0FBQUcsZUFBUSxJQUFFLEdBQUUsSUFBRUYsR0FBRSxDQUFDLEVBQUUsUUFBTyxJQUFJLENBQUFELEtBQUVDLEdBQUUsQ0FBQyxFQUFFLENBQUMsR0FBRSxNQUFJRSxLQUFFLFFBQU1ILE1BQUcsRUFBRSxHQUFFLElBQUUsQ0FBQyxDQUFDLEdBQUVHLEtBQUUsS0FBRyxLQUFHSCxLQUFFLE1BQUlHLEtBQUUsU0FBTyxLQUFHLFFBQU1ILE1BQUdHLEtBQUUsR0FBRSxJQUFFLE1BQUksSUFBRUgsS0FBRSxFQUFFLENBQUMsSUFBRSxJQUFFQSxPQUFJLElBQUUsSUFBRSxLQUFHLEtBQUdBLEtBQUUsUUFBTUEsTUFBRyxRQUFNQSxLQUFFLElBQUVBLEtBQUUsUUFBTUEsTUFBRyxFQUFFLEdBQUVHLEtBQUUsS0FBR0EsT0FBSSxRQUFNSCxNQUFHRyxLQUFFLEdBQUVELEtBQUUsR0FBRSxJQUFFLE1BQUksUUFBTUYsT0FBSUcsS0FBRSxLQUFHLFFBQU1GLEdBQUUsQ0FBQyxFQUFFLElBQUUsQ0FBQyxNQUFJLEVBQUUsR0FBRSxNQUFJRSxPQUFJLElBQUUsRUFBRSxDQUFDLElBQUdBLEtBQUUsSUFBRyxJQUFFLEVBQUUsQ0FBQyxH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QUFXLFFBQVEsWUFBWTtBQUNyQyxRQUFNLFVBQVUsU0FBUyxjQUFjLE9BQU87QUFDOUMsUUFBTSxTQUFTLGNBQWMsYUFBYSxPQUFPO0FBQ2pELFFBQU0sWUFBWSxVQUFVLE9BQU87QUFDbkMsTUFBSSxXQUFXO0FBQ2IsUUFBSSxDQUFDLFVBQVUsU0FBUyxNQUFNLEdBQUc7QUFDL0IsWUFBTSxlQUFlLEdBQUcsTUFBTSxJQUFJLFNBQVM7QUFDM0MsMkJBQXFCLFNBQVMsRUFBRSxPQUFPLGFBQWEsQ0FBQztBQUNyRCxvQkFBYyxzQkFBc0IsYUFBYSxPQUFPO0FBQ3hELHFCQUFlLFNBQVMsVUFBVSxTQUFTLEtBQUs7QUFDaEQ7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNBLHVCQUFxQixTQUFTLFNBQVMsS0FBSztBQUM1QyxnQkFBYyxzQkFBc0IsYUFBYSxPQUFPO0FBQ3hELGlCQUFlLFNBQVMsVUFBVSxTQUFTLEtBQUs7QUFDbEQsR0FuQkE7OztBQ0ZLLElBQU0scUJBQ1gsd0JBQUMsY0FBOEIsU0FBa0IsUUFBZSxDQUFDLE1BQy9ELE1BQU07QUFDSixNQUFJLE9BQU8saUJBQWlCLFVBQVU7QUFDcEMsWUFBUSxtQkFBbUIsYUFBYSxZQUFZO0FBQUEsRUFDdEQ7QUFFQSxNQUFJLE9BQU8saUJBQWlCLFVBQVU7QUFDcEMsVUFBTSxPQUFPLE9BQU8sWUFBWTtBQUNoQyxVQUFNLFFBQVEsS0FBSyxTQUFTO0FBQzVCLFlBQVEsbUJBQW1CLGFBQWEsS0FBSztBQUFBLEVBQy9DO0FBQ0YsR0FYRjs7O0FDQ0ssSUFBTSx1QkFDWCx3QkFBQyxVQUEwQixnQkFBeUIsUUFBZSxDQUFDLE1BQ2xFLE1BQVk7QUFDVixRQUFNLFNBQVMsWUFBWTtBQUUzQixTQUFPLElBQUk7QUFBQSxJQUNULFdBQVcsU0FBUyxTQUFTLElBQUk7QUFBQSxJQUNqQyxRQUFRLHVCQUF1QixVQUFVLGdCQUFnQixLQUFLO0FBQUEsRUFDaEUsQ0FBQztBQUVELFNBQU8sSUFBSTtBQUFBLElBQ1QsV0FBVyxXQUFXLFNBQVMsSUFBSTtBQUFBLElBQ25DLFFBQVEsMkJBQTJCLFVBQVUsZ0JBQWdCLEtBQUs7QUFBQSxFQUNwRSxDQUFDO0FBRUQsU0FBTyxRQUFRO0FBQ2pCLEdBZkY7IiwKICAibmFtZXMiOiBbImNyZWF0ZVN0YXRlIiwgInQiLCAibiIsICJzIiwgInIiLCAiZ2xvYmFsUnVsZXMiLCAicmVzdWx0IiwgInNlbGVjdG9yIiwgImNzcyIsICJjcmVhdGVTdGF0ZSJdCn0K
