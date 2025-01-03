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
    const existingStyle = document.head.querySelector(
      `[data-component="${cachedClassName}"]`
    );
    if (!existingStyle) {
      const scopedStyle2 = transformStyle(rawCSS, cachedClassName);
      const styleElement2 = createStyleElement(cachedClassName);
      styleElement2.innerHTML += scopedStyle2;
      handler({ hashId: cachedClassName, scopedStyle: scopedStyle2, styleElement: styleElement2 });
    }
    return cachedClassName;
  }
  const hashId = createHash(rawCSS, selector);
  const scopedStyle = transformStyle(rawCSS, hashId);
  const styleElement = createStyleElement(hashId);
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
export {
  createElementByFactoryName
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vLi4vc3JjL3N0YXRlL2NyZWF0ZVN0YXRlLnRzIiwgIi4uLy4uLy4uLy4uL3NyYy9mYWN0b3JpZXMvY3JlYXRlQ2hhaW4vaW5kZXgudHMiLCAiLi4vLi4vLi4vLi4vc3JjL3V0aWxzL2luZGV4LnRzIiwgIi4uLy4uLy4uLy4uL3NyYy92YWxpZGF0b3JzL3RlbXBsYXRlL2luZGV4LnRzIiwgIi4uLy4uLy4uLy4uL3NyYy9hY3Rpb25zL3RlbXBsYXRlL3JlbmRlclRlbXBsYXRlT2JqZWN0LnRzIiwgIi4uLy4uLy4uLy4uL3NyYy9hY3Rpb25zL3RlbXBsYXRlL3JlbmRlclRlbXBsYXRlQXJyYXkudHMiLCAiLi4vLi4vLi4vLi4vc3JjL2FjdGlvbnMvdGVtcGxhdGUvcmVuZGVyQ2hpbGRyZW4udHMiLCAiLi4vLi4vLi4vLi4vc3JjL2FjdGlvbnMvdGVtcGxhdGUvc2V0RWxlbWVudEF0dHJpYnV0ZXMudHMiLCAiLi4vLi4vLi4vLi4vc3JjL2FjdGlvbnMvdGVtcGxhdGUvY3JlYXRlRWxlbWVudEJ5VGFnTmFtZS50cyIsICIuLi8uLi8uLi8uLi9zcmMvYWN0aW9ucy90ZW1wbGF0ZS9yZW5kZXJUZW1wbGF0ZURhdGEudHMiLCAiLi4vLi4vLi4vLi4vc3JjL3JlbmRlci9pbmRleC50cyIsICIuLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vaHRtQDMuMS4xL25vZGVfbW9kdWxlcy9odG0vZGlzdC9odG0ubW9kdWxlLmpzIiwgIi4uLy4uLy4uLy4uL3NyYy90ZW1wbGF0ZS9odG1sLnRzIiwgIi4uLy4uLy4uLy4uL3NyYy9zdHlsZS9jcmVhdGVIYXNoLnRzIiwgIi4uLy4uLy4uLy4uL3NyYy9zdHlsZS9jcmVhdGVTdHlsZUVsZW1lbnQudHMiLCAiLi4vLi4vLi4vLi4vc3JjL3N0eWxlL2Nzc1BhcnNlci50cyIsICIuLi8uLi8uLi8uLi9zcmMvc3R5bGUvY3NzLnRzIiwgIi4uLy4uLy4uLy4uL3NyYy9hY3Rpb25zL3RlbXBsYXRlL2NyZWF0ZUVsZW1lbnRCeUZhY3RvcnlOYW1lLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgdHlwZSB7IFN0YXRlV2F0Y2hlciwgU3RhdGUsIFN0YXRlTWFuYWdlciB9IGZyb20gXCIuL3R5cGVzXCI7XG5cbmNvbnN0IF9jcmVhdGVVVUlEID0gKCk6IHN0cmluZyA9PiBNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKDM2KS5zdWJzdHJpbmcoMiwgMTEpO1xuXG5leHBvcnQgY29uc3QgY3JlYXRlU3RhdGUgPSA8UyA9IHVua25vd24+KFxuICBpbml0aWFsU3RhdGU6IFN0YXRlPFM+LFxuKTogU3RhdGVNYW5hZ2VyPFM+ID0+IHtcbiAgY29uc3QgX3N0YXRlID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShpbml0aWFsU3RhdGUpKTtcbiAgY29uc3QgX3dhdGNoZXJzID0gbmV3IFNldDxTdGF0ZVdhdGNoZXI8Uz4+KCk7XG5cbiAgY29uc3QgX25vdGlmeUhhbmRsZXJzID0gKHBheWxvYWQ6IFN0YXRlPFM+KSA9PiB7XG4gICAgZm9yIChjb25zdCBzdGF0ZVdhdGNoZXIgb2YgX3dhdGNoZXJzKSB7XG4gICAgICBzdGF0ZVdhdGNoZXIocGF5bG9hZCk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IHNldCA9IChwYXlsb2FkOiBTdGF0ZTxTPikgPT4ge1xuICAgIE9iamVjdC5hc3NpZ24oX3N0YXRlLCBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHBheWxvYWQpKSk7XG4gICAgX25vdGlmeUhhbmRsZXJzKEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoX3N0YXRlKSkpO1xuICB9O1xuXG4gIGNvbnN0IGdldCA9ICgpOiBTdGF0ZTxTPiA9PiB7XG4gICAgcmV0dXJuIEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoX3N0YXRlKSk7XG4gIH07XG5cbiAgY29uc3Qgd2F0Y2ggPSAoY2FsbGJhY2s6IFN0YXRlV2F0Y2hlcjxTPikgPT4ge1xuICAgIF93YXRjaGVycy5hZGQoY2FsbGJhY2spO1xuICB9O1xuXG4gIHJldHVybiB7IHNldCwgZ2V0LCB3YXRjaCB9O1xufTtcbiIsICJpbXBvcnQgdHlwZSB7IENoYWluTGluayB9IGZyb20gXCIuL3R5cGVzXCI7XG5cbmV4cG9ydCBjb25zdCBjcmVhdGVDaGFpbiA9ICgpID0+IHtcbiAgY29uc3QgX2NoYWluID0gbmV3IFNldDxDaGFpbkxpbms8dW5rbm93bj4+KCk7XG5cbiAgY29uc3QgYWRkID0gPFQ+KGNoYWluTGluazogQ2hhaW5MaW5rPFQ+KSA9PiB7XG4gICAgX2NoYWluLmFkZChjaGFpbkxpbmspO1xuICB9O1xuXG4gIGNvbnN0IGV4ZWN1dGUgPSAoKSA9PiB7XG4gICAgZm9yIChjb25zdCB7IGFjdGlvbiwgdmFsaWRhdG9yIH0gb2YgX2NoYWluKSB7XG4gICAgICBpZiAodmFsaWRhdG9yKCkpIGFjdGlvbigpO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4geyBhZGQsIGV4ZWN1dGUgfTtcbn07XG4iLCAiZXhwb3J0IGNvbnN0IGVzY2FwZVRlbXBsYXRlU3RyaW5nID0gKHRlbXBsYXRlU3RyaW5nOiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xuICBpZiAodHlwZW9mIHRlbXBsYXRlU3RyaW5nICE9PSBcInN0cmluZ1wiKSByZXR1cm4gdGVtcGxhdGVTdHJpbmc7XG4gIHJldHVybiB0ZW1wbGF0ZVN0cmluZ1xuICAgIC5yZXBsYWNlKC8mL2csIFwiJmFtcDtcIilcbiAgICAucmVwbGFjZSgvPC9nLCBcIiZsdDtcIilcbiAgICAucmVwbGFjZSgvPi9nLCBcIiZndDtcIilcbiAgICAucmVwbGFjZSgvXCIvZywgXCImcXVvdDtcIilcbiAgICAucmVwbGFjZSgvJy9nLCBcIiYjMzk7XCIpXG4gICAgLnJlcGxhY2UoL1xcLy9nLCBcIiYjeDJGO1wiKTtcbn07XG5cbmV4cG9ydCBjb25zdCBiaW5kU3R5bGVTY29wZSA9IChzY29wZUlkOiBzdHJpbmcsIHN0cmluZ3M6IHN0cmluZyk6IHN0cmluZyA9PiB7XG4gIGNvbnN0IHJlZ2V4ID0gLyhcXC4oXFx3KykoXFwtKnxcXF8qKT8pK1xcdysvZ2k7XG4gIHJldHVybiBzdHJpbmdzLnJlcGxhY2UocmVnZXgsICh2YWx1ZXMpID0+IHtcbiAgICByZXR1cm4gYC4ke3Njb3BlSWR9LSR7dmFsdWVzLnJlcGxhY2UoL1xcLi8sIFwiXCIpfWA7XG4gIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IGNyZWF0ZVVVSUQgPSAoKSA9PiBNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKDM2KS5zbGljZSgyLCA2KTtcblxuZXhwb3J0IGNvbnN0IEhUTUxFdmVudHMgPSBbXG4gIC8vIEV2ZW50b3MgZGUgTW91c2VcbiAgXCJvbmNsaWNrXCIsXG4gIFwib25kYmxjbGlja1wiLFxuICBcIm9ubW91c2Vkb3duXCIsXG4gIFwib25tb3VzZXVwXCIsXG4gIFwib25tb3VzZW92ZXJcIixcbiAgXCJvbm1vdXNlb3V0XCIsXG4gIFwib25tb3VzZW1vdmVcIixcbiAgXCJvbm1vdXNlZW50ZXJcIixcbiAgXCJvbm1vdXNlbGVhdmVcIixcbiAgXCJvbmNvbnRleHRtZW51XCIsXG5cbiAgLy8gRXZlbnRvcyBkZSBUZWNsYWRvXG4gIFwib25rZXlkb3duXCIsXG4gIFwib25rZXl1cFwiLFxuICBcIm9ua2V5cHJlc3NcIixcblxuICAvLyBFdmVudG9zIGRlIEZvY29cbiAgXCJvbmZvY3VzXCIsXG4gIFwib25ibHVyXCIsXG5cbiAgLy8gRXZlbnRvcyBkZSBGb3JtdWxcdTAwRTFyaW9cbiAgXCJvbnN1Ym1pdFwiLFxuICBcIm9uY2hhbmdlXCIsXG4gIFwib25pbnB1dFwiLFxuICBcIm9ucmVzZXRcIixcbiAgXCJvbmludmFsaWRcIixcblxuICAvLyBFdmVudG9zIGRlIE1cdTAwRURkaWFcbiAgXCJvbnBsYXlcIixcbiAgXCJvbnBhdXNlXCIsXG4gIFwib25lbmRlZFwiLFxuICBcIm9udm9sdW1lY2hhbmdlXCIsXG5cbiAgLy8gRXZlbnRvcyBkZSBUb3F1ZSAoVG91Y2gpIC0gcGFyYSBkaXNwb3NpdGl2b3MgbVx1MDBGM3ZlaXNcbiAgXCJvbnRvdWNoc3RhcnRcIixcbiAgXCJvbnRvdWNobW92ZVwiLFxuICBcIm9udG91Y2hlbmRcIixcbiAgXCJvbnRvdWNoY2FuY2VsXCIsXG5cbiAgLy8gRXZlbnRvcyBkZSBBbmltYVx1MDBFN1x1MDBFM28gZSBUcmFuc2lcdTAwRTdcdTAwRTNvXG4gIFwib25hbmltYXRpb25zdGFydFwiLFxuICBcIm9uYW5pbWF0aW9uZW5kXCIsXG4gIFwib25hbmltYXRpb25pdGVyYXRpb25cIixcbiAgXCJvbnRyYW5zaXRpb25lbmRcIixcblxuICAvLyBFdmVudG9zIGRlIE91dHJvcyBJbnRlcmF0aXZvc1xuICBcIm9ubG9hZFwiLFxuICBcIm9uZXJyb3JcIixcbiAgXCJvbnJlc2l6ZVwiLFxuICBcIm9uc2Nyb2xsXCIsXG5dO1xuIiwgImltcG9ydCB7IEhUTUxFdmVudHMgfSBmcm9tIFwiQC91dGlsc1wiO1xuXG5jb25zdCBpc09iamVjdCA9XG4gIDxUPihwYXlsb2FkOiBUKSA9PlxuICAgICgpID0+IHtcbiAgICAgIHJldHVybiAhIXBheWxvYWQgJiYgIUFycmF5LmlzQXJyYXkocGF5bG9hZCkgJiYgdHlwZW9mIHBheWxvYWQgPT09IFwib2JqZWN0XCI7XG4gICAgfTtcblxuY29uc3QgaXNBcnJheSA9XG4gIDxUPihwYXlsb2FkOiBUKSA9PlxuICAgICgpID0+IHtcbiAgICAgIHJldHVybiAhIXBheWxvYWQgJiYgQXJyYXkuaXNBcnJheShwYXlsb2FkKTtcbiAgICB9O1xuXG5jb25zdCBpc0Z1bmN0aW9uID1cbiAgPFQgPSB2b2lkPihwYXlsb2FkOiBUKSA9PlxuICAgICgpID0+IHtcbiAgICAgIHJldHVybiAhIXBheWxvYWQgJiYgdHlwZW9mIHBheWxvYWQgPT09IFwiZnVuY3Rpb25cIjtcbiAgICB9O1xuXG5jb25zdCBpc1N0cmluZyA9XG4gIDxUID0gdm9pZD4ocGF5bG9hZDogVCkgPT5cbiAgICAoKSA9PiB7XG4gICAgICByZXR1cm4gdHlwZW9mIHBheWxvYWQgPT09IFwic3RyaW5nXCI7XG4gICAgfTtcblxuY29uc3QgaXNFdmVudE5hbWUgPVxuICA8VCA9IHZvaWQ+KHBheWxvYWQ6IFQpID0+XG4gICAgKCkgPT4ge1xuICAgICAgaWYgKHR5cGVvZiBwYXlsb2FkICE9PSBcInN0cmluZ1wiKSByZXR1cm4gZmFsc2U7XG4gICAgICByZXR1cm4gSFRNTEV2ZW50cy5pbmNsdWRlcyhwYXlsb2FkLnRvTG93ZXJDYXNlKCkpO1xuICAgIH07XG5cbmNvbnN0IGlzVGVtcGxhdGVEYXRhID1cbiAgPFQgPSB2b2lkPihwYXlsb2FkOiBUKSA9PlxuICAgICgpID0+IHtcbiAgICAgIHJldHVybiB0eXBlb2YgcGF5bG9hZCA9PT0gXCJzdHJpbmdcIiB8fCB0eXBlb2YgcGF5bG9hZCA9PT0gXCJudW1iZXJcIjtcbiAgICB9O1xuXG5leHBvcnQgeyBpc09iamVjdCwgaXNBcnJheSwgaXNGdW5jdGlvbiwgaXNTdHJpbmcsIGlzRXZlbnROYW1lLCBpc1RlbXBsYXRlRGF0YSB9O1xuIiwgImltcG9ydCB0eXBlIHsgVGVtcGxhdGVTY2hlbWEgfSBmcm9tIFwiQC90eXBlc1wiO1xuaW1wb3J0IHsgY3JlYXRlQ2hhaW4gfSBmcm9tIFwiQC9mYWN0b3JpZXNcIjtcbmltcG9ydCB7IGNyZWF0ZUVsZW1lbnRCeUZhY3RvcnlOYW1lLCBjcmVhdGVFbGVtZW50QnlUYWdOYW1lIH0gZnJvbSBcIkAvYWN0aW9uc1wiO1xuaW1wb3J0IHsgaXNGdW5jdGlvbiwgaXNTdHJpbmcgfSBmcm9tIFwiQC92YWxpZGF0b3JzXCI7XG5pbXBvcnQgdHlwZSB7IFN0YXRlIH0gZnJvbSBcIkAvc3RhdGVcIjtcblxuZXhwb3J0IGNvbnN0IHJlbmRlclRlbXBsYXRlT2JqZWN0ID1cbiAgKHRlbXBsYXRlOiBUZW1wbGF0ZVNjaGVtYSwgY29udGV4dEVsZW1lbnQ6IEVsZW1lbnQsIHN0YXRlOiBTdGF0ZSA9IHt9KSA9PlxuICAgICgpOiB2b2lkID0+IHtcbiAgICAgIGNvbnN0IF9jaGFpbiA9IGNyZWF0ZUNoYWluKCk7XG5cbiAgICAgIF9jaGFpbi5hZGQoe1xuICAgICAgICB2YWxpZGF0b3I6IGlzU3RyaW5nKHRlbXBsYXRlLnR5cGUpLFxuICAgICAgICBhY3Rpb246IGNyZWF0ZUVsZW1lbnRCeVRhZ05hbWUodGVtcGxhdGUsIGNvbnRleHRFbGVtZW50LCBzdGF0ZSksXG4gICAgICB9KTtcblxuICAgICAgX2NoYWluLmFkZCh7XG4gICAgICAgIHZhbGlkYXRvcjogaXNGdW5jdGlvbih0ZW1wbGF0ZS50eXBlKSxcbiAgICAgICAgYWN0aW9uOiBjcmVhdGVFbGVtZW50QnlGYWN0b3J5TmFtZSh0ZW1wbGF0ZSwgY29udGV4dEVsZW1lbnQsIHN0YXRlKSxcbiAgICAgIH0pO1xuXG4gICAgICBfY2hhaW4uZXhlY3V0ZSgpO1xuICAgIH07XG4iLCAiaW1wb3J0IHsgcmVuZGVyIH0gZnJvbSBcIkAvcmVuZGVyXCI7XG5pbXBvcnQgdHlwZSB7IFRlbXBsYXRlU2NoZW1hIH0gZnJvbSBcIkAvdHlwZXNcIjtcbmltcG9ydCB0eXBlIHsgU3RhdGUgfSBmcm9tIFwiQC9zdGF0ZVwiO1xuXG5leHBvcnQgY29uc3QgcmVuZGVyVGVtcGxhdGVBcnJheSA9XG4gIChcbiAgICB0ZW1wbGF0ZVNjaGVtYTogVGVtcGxhdGVTY2hlbWFbXSxcbiAgICBjb250ZXh0RWxlbWVudDogRWxlbWVudCxcbiAgICBzdGF0ZTogU3RhdGUgPSB7fSxcbiAgKSA9PlxuICAgICgpID0+IHtcbiAgICAgIGZvciAoY29uc3QgdGVtcGxhdGUgb2YgdGVtcGxhdGVTY2hlbWEpIHtcbiAgICAgICAgcmVuZGVyKHRlbXBsYXRlLCBjb250ZXh0RWxlbWVudCwgc3RhdGUpO1xuICAgICAgfVxuICAgIH07XG4iLCAiaW1wb3J0IHsgcmVuZGVyIH0gZnJvbSBcIkAvcmVuZGVyXCI7XG5pbXBvcnQgdHlwZSB7IFRlbXBsYXRlU2NoZW1hIH0gZnJvbSBcIkAvdGVtcGxhdGVcIjtcbmltcG9ydCB0eXBlIHsgU3RhdGUgfSBmcm9tIFwiQC9zdGF0ZVwiO1xuXG5leHBvcnQgY29uc3QgcmVuZGVyQ2hpbGRyZW4gPSAoXG4gIGNoaWxkcmVuOiBUZW1wbGF0ZVNjaGVtYVtdLFxuICBwYXJlbnRFbGVtZW50OiBFbGVtZW50LFxuICBzdGF0ZTogU3RhdGUgPSB7fSxcbikgPT4ge1xuICBwYXJlbnRFbGVtZW50LmlubmVySFRNTCA9IFwiXCI7XG4gIGlmICghQXJyYXkuaXNBcnJheShjaGlsZHJlbikgJiYgdHlwZW9mIGNoaWxkcmVuID09PSBcIm9iamVjdFwiKSB7XG4gICAgcmVuZGVyKGNoaWxkcmVuLCBwYXJlbnRFbGVtZW50LCBzdGF0ZSk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgZm9yIChjb25zdCBjaGlsZCBvZiBjaGlsZHJlbikge1xuICAgIHJlbmRlcihjaGlsZCwgcGFyZW50RWxlbWVudCwgc3RhdGUpO1xuICB9XG59O1xuIiwgImltcG9ydCB7IGlzRXZlbnROYW1lIH0gZnJvbSBcIkAvdmFsaWRhdG9yc1wiO1xuXG50eXBlIEF0dHJpYnV0ZSA9IG9iamVjdCAmIHtcbiAgW2tleTogc3ltYm9sIHwgc3RyaW5nXTogdW5rbm93bjtcbn07XG5cbnR5cGUgRXZlbnRIYW5kbGVyID0gPEsgZXh0ZW5kcyBrZXlvZiBIVE1MRWxlbWVudEV2ZW50TWFwPihcbiAgZXZlbnQ6IEhUTUxFbGVtZW50RXZlbnRNYXBbS10sXG4pID0+IHZvaWQ7XG5cbmV4cG9ydCBjb25zdCBzZXRFbGVtZW50QXR0cmlidXRlcyA9IChcbiAgZWxlbWVudDogRWxlbWVudCxcbiAgYXR0cmlidXRlczogQXR0cmlidXRlLFxuKTogRWxlbWVudCA9PiB7XG4gIGNvbnN0IGF0dHJpYnV0ZUtleXMgPSBhdHRyaWJ1dGVzID8gT2JqZWN0LmtleXMoYXR0cmlidXRlcykgOiBbXTtcbiAgZm9yIChjb25zdCBrZXkgb2YgYXR0cmlidXRlS2V5cykge1xuICAgIGlmICghaXNFdmVudE5hbWUoa2V5KSgpKSB7XG4gICAgICBlbGVtZW50LnNldEF0dHJpYnV0ZShrZXksIGF0dHJpYnV0ZXNba2V5XSBhcyBzdHJpbmcpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBldmVudE5hbWUgPSBrZXlcbiAgICAgICAgLnJlcGxhY2UoL29uLywgXCJcIilcbiAgICAgICAgLnRvTG93ZXJDYXNlKCkgYXMga2V5b2YgSFRNTEVsZW1lbnRFdmVudE1hcDtcbiAgICAgIGNvbnN0IGV2ZW50SGFuZGxlciA9IGF0dHJpYnV0ZXNba2V5XSBhcyBFdmVudEhhbmRsZXI7XG4gICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBldmVudEhhbmRsZXIpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gZWxlbWVudDtcbn07XG4iLCAiaW1wb3J0IHR5cGUgeyBTdGF0ZSB9IGZyb20gXCJAL3N0YXRlXCI7XG5pbXBvcnQgdHlwZSB7IFRlbXBsYXRlU2NoZW1hIH0gZnJvbSBcIkAvdGVtcGxhdGVcIjtcbmltcG9ydCB7IHNldEVsZW1lbnRBdHRyaWJ1dGVzIH0gZnJvbSBcIi4vc2V0RWxlbWVudEF0dHJpYnV0ZXNcIjtcbmltcG9ydCB7IHJlbmRlckNoaWxkcmVuIH0gZnJvbSBcIi4vcmVuZGVyQ2hpbGRyZW5cIjtcblxuZXhwb3J0IGNvbnN0IGNyZWF0ZUVsZW1lbnRCeVRhZ05hbWUgPVxuICAodGVtcGxhdGU6IFRlbXBsYXRlU2NoZW1hLCBwYXJlbnRFbGVtZW50OiBFbGVtZW50LCBzdGF0ZTogU3RhdGUgPSB7fSkgPT5cbiAgKCkgPT4ge1xuICAgIGNvbnN0IHRhZ05hbWUgPSB0ZW1wbGF0ZS50eXBlIGFzIHN0cmluZztcbiAgICBjb25zdCBzZWxlY3RvciA9IHRhZ05hbWUudG9Mb3dlckNhc2UoKTtcbiAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0YWdOYW1lKTtcbiAgICBjb25zdCBoYXNoSWQgPSBwYXJlbnRFbGVtZW50LmdldEF0dHJpYnV0ZShcImNsYXNzXCIpIGFzIHN0cmluZztcbiAgICBjb25zdCBjbGFzc05hbWUgPSB0ZW1wbGF0ZT8ucHJvcHM/LmNsYXNzIGFzIHN0cmluZztcbiAgICBpZiAoY2xhc3NOYW1lKSB7XG4gICAgICBpZiAoIWNsYXNzTmFtZS5pbmNsdWRlcyhoYXNoSWQpKSB7XG4gICAgICAgIGNvbnN0IG5ld0NsYXNzTmFtZSA9IGAke2hhc2hJZH1fJHtjbGFzc05hbWV9YDtcbiAgICAgICAgc2V0RWxlbWVudEF0dHJpYnV0ZXMoZWxlbWVudCwgeyBjbGFzczogbmV3Q2xhc3NOYW1lIH0pO1xuICAgICAgICBwYXJlbnRFbGVtZW50Lmluc2VydEFkamFjZW50RWxlbWVudChcImJlZm9yZWVuZFwiLCBlbGVtZW50KTtcbiAgICAgICAgcmVuZGVyQ2hpbGRyZW4odGVtcGxhdGUuY2hpbGRyZW4sIGVsZW1lbnQsIHN0YXRlKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH1cbiAgICBzZXRFbGVtZW50QXR0cmlidXRlcyhlbGVtZW50LCB0ZW1wbGF0ZS5wcm9wcyk7XG4gICAgcGFyZW50RWxlbWVudC5pbnNlcnRBZGphY2VudEVsZW1lbnQoXCJiZWZvcmVlbmRcIiwgZWxlbWVudCk7XG4gICAgcmVuZGVyQ2hpbGRyZW4odGVtcGxhdGUuY2hpbGRyZW4sIGVsZW1lbnQsIHN0YXRlKTtcbiAgfTtcbiIsICJpbXBvcnQgeyByZW5kZXIgfSBmcm9tIFwiQC9yZW5kZXJcIjtcbmltcG9ydCB0eXBlIHsgVGVtcGxhdGVTY2hlbWEsIFRhZ2dlZFRlbXBsYXRlIH0gZnJvbSBcIkAvdHlwZXNcIjtcbmltcG9ydCB0eXBlIHsgU3RhdGUgfSBmcm9tIFwiQC9zdGF0ZVwiO1xuXG5leHBvcnQgY29uc3QgcmVuZGVyVGVtcGxhdGVEYXRhID1cbiAgKHRlbXBsYXRlRGF0YTogVGFnZ2VkVGVtcGxhdGUsIGVsZW1lbnQ6IEVsZW1lbnQsIHN0YXRlOiBTdGF0ZSA9IHt9KSA9PlxuICAgICgpID0+IHtcbiAgICAgIGlmICh0eXBlb2YgdGVtcGxhdGVEYXRhID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgIGVsZW1lbnQuaW5zZXJ0QWRqYWNlbnRIVE1MKFwiYmVmb3JlZW5kXCIsIHRlbXBsYXRlRGF0YSk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2YgdGVtcGxhdGVEYXRhID09PSBcIm51bWJlclwiKSB7XG4gICAgICAgIGNvbnN0IGRhdGEgPSBOdW1iZXIodGVtcGxhdGVEYXRhKTtcbiAgICAgICAgY29uc3QgdmFsdWUgPSBkYXRhLnRvU3RyaW5nKCk7XG4gICAgICAgIGVsZW1lbnQuaW5zZXJ0QWRqYWNlbnRIVE1MKFwiYmVmb3JlZW5kXCIsIHZhbHVlKTtcbiAgICAgIH1cbiAgICB9O1xuIiwgImltcG9ydCB0eXBlIHsgVGFnZ2VkVGVtcGxhdGUsIFRlbXBsYXRlU2NoZW1hIH0gZnJvbSBcIkAvdGVtcGxhdGVcIjtcbmltcG9ydCB7XG4gIHJlbmRlclRlbXBsYXRlQXJyYXksXG4gIHJlbmRlclRlbXBsYXRlT2JqZWN0LFxuICByZW5kZXJUZW1wbGF0ZURhdGEsXG59IGZyb20gXCJAL2FjdGlvbnNcIjtcbmltcG9ydCB7IGlzQXJyYXksIGlzT2JqZWN0LCBpc1RlbXBsYXRlRGF0YSB9IGZyb20gXCJAL3ZhbGlkYXRvcnNcIjtcblxudHlwZSBDb250ZXh0RWxlbWVudCA9IEVsZW1lbnQ7XG5pbXBvcnQgeyBjcmVhdGVDaGFpbiB9IGZyb20gXCJAL2ZhY3Rvcmllc1wiO1xuaW1wb3J0IHsgY3JlYXRlU3RhdGUsIHR5cGUgU3RhdGUgfSBmcm9tIFwiQC9zdGF0ZVwiO1xuXG4vL2NvbnN0IGdsb2JhbFN0YXRlID0gY3JlYXRlU3RhdGUoe30pO1xuXG5leHBvcnQgY29uc3QgcmVuZGVyID0gKFxuICB0ZW1wbGF0ZTogVGFnZ2VkVGVtcGxhdGUsXG4gIGNvbnRleHQ6IENvbnRleHRFbGVtZW50ID0gZG9jdW1lbnQuYm9keSxcbiAgc3RhdGU6IFN0YXRlID0ge30sXG4pOiBDb250ZXh0RWxlbWVudCA9PiB7XG4gIGNvbnN0IGNoYWluID0gY3JlYXRlQ2hhaW4oKTtcbiAgY29uc3QgY29tcG9uZW50RWxlbWVudCA9IGNvbnRleHQgfHwgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImJvZHlcIik7XG5cbiAgY2hhaW4uYWRkKHtcbiAgICB2YWxpZGF0b3I6IGlzQXJyYXkodGVtcGxhdGUpLFxuICAgIGFjdGlvbjogcmVuZGVyVGVtcGxhdGVBcnJheShcbiAgICAgIHRlbXBsYXRlIGFzIFRlbXBsYXRlU2NoZW1hW10sXG4gICAgICBjb21wb25lbnRFbGVtZW50LFxuICAgICAgc3RhdGUsXG4gICAgKSxcbiAgfSk7XG5cbiAgY2hhaW4uYWRkKHtcbiAgICB2YWxpZGF0b3I6IGlzT2JqZWN0KHRlbXBsYXRlKSxcbiAgICBhY3Rpb246IHJlbmRlclRlbXBsYXRlT2JqZWN0KFxuICAgICAgdGVtcGxhdGUgYXMgVGVtcGxhdGVTY2hlbWEsXG4gICAgICBjb21wb25lbnRFbGVtZW50LFxuICAgICAgc3RhdGUsXG4gICAgKSxcbiAgfSk7XG5cbiAgY2hhaW4uYWRkKHtcbiAgICB2YWxpZGF0b3I6IGlzVGVtcGxhdGVEYXRhKHRlbXBsYXRlKSxcbiAgICBhY3Rpb246IHJlbmRlclRlbXBsYXRlRGF0YSh0ZW1wbGF0ZSwgY29tcG9uZW50RWxlbWVudCwgc3RhdGUpLFxuICB9KTtcblxuICBjaGFpbi5leGVjdXRlKCk7XG4gIHJldHVybiBjb21wb25lbnRFbGVtZW50O1xufTtcbiIsICJ2YXIgbj1mdW5jdGlvbih0LHMscixlKXt2YXIgdTtzWzBdPTA7Zm9yKHZhciBoPTE7aDxzLmxlbmd0aDtoKyspe3ZhciBwPXNbaCsrXSxhPXNbaF0/KHNbMF18PXA/MToyLHJbc1toKytdXSk6c1srK2hdOzM9PT1wP2VbMF09YTo0PT09cD9lWzFdPU9iamVjdC5hc3NpZ24oZVsxXXx8e30sYSk6NT09PXA/KGVbMV09ZVsxXXx8e30pW3NbKytoXV09YTo2PT09cD9lWzFdW3NbKytoXV0rPWErXCJcIjpwPyh1PXQuYXBwbHkoYSxuKHQsYSxyLFtcIlwiLG51bGxdKSksZS5wdXNoKHUpLGFbMF0/c1swXXw9Mjooc1toLTJdPTAsc1toXT11KSk6ZS5wdXNoKGEpfXJldHVybiBlfSx0PW5ldyBNYXA7ZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24ocyl7dmFyIHI9dC5nZXQodGhpcyk7cmV0dXJuIHJ8fChyPW5ldyBNYXAsdC5zZXQodGhpcyxyKSksKHI9bih0aGlzLHIuZ2V0KHMpfHwoci5zZXQocyxyPWZ1bmN0aW9uKG4pe2Zvcih2YXIgdCxzLHI9MSxlPVwiXCIsdT1cIlwiLGg9WzBdLHA9ZnVuY3Rpb24obil7MT09PXImJihufHwoZT1lLnJlcGxhY2UoL15cXHMqXFxuXFxzKnxcXHMqXFxuXFxzKiQvZyxcIlwiKSkpP2gucHVzaCgwLG4sZSk6Mz09PXImJihufHxlKT8oaC5wdXNoKDMsbixlKSxyPTIpOjI9PT1yJiZcIi4uLlwiPT09ZSYmbj9oLnB1c2goNCxuLDApOjI9PT1yJiZlJiYhbj9oLnB1c2goNSwwLCEwLGUpOnI+PTUmJigoZXx8IW4mJjU9PT1yKSYmKGgucHVzaChyLDAsZSxzKSxyPTYpLG4mJihoLnB1c2gocixuLDAscykscj02KSksZT1cIlwifSxhPTA7YTxuLmxlbmd0aDthKyspe2EmJigxPT09ciYmcCgpLHAoYSkpO2Zvcih2YXIgbD0wO2w8blthXS5sZW5ndGg7bCsrKXQ9blthXVtsXSwxPT09cj9cIjxcIj09PXQ/KHAoKSxoPVtoXSxyPTMpOmUrPXQ6ND09PXI/XCItLVwiPT09ZSYmXCI+XCI9PT10PyhyPTEsZT1cIlwiKTplPXQrZVswXTp1P3Q9PT11P3U9XCJcIjplKz10OidcIic9PT10fHxcIidcIj09PXQ/dT10OlwiPlwiPT09dD8ocCgpLHI9MSk6ciYmKFwiPVwiPT09dD8ocj01LHM9ZSxlPVwiXCIpOlwiL1wiPT09dCYmKHI8NXx8XCI+XCI9PT1uW2FdW2wrMV0pPyhwKCksMz09PXImJihoPWhbMF0pLHI9aCwoaD1oWzBdKS5wdXNoKDIsMCxyKSxyPTApOlwiIFwiPT09dHx8XCJcXHRcIj09PXR8fFwiXFxuXCI9PT10fHxcIlxcclwiPT09dD8ocCgpLHI9Mik6ZSs9dCksMz09PXImJlwiIS0tXCI9PT1lJiYocj00LGg9aFswXSl9cmV0dXJuIHAoKSxofShzKSksciksYXJndW1lbnRzLFtdKSkubGVuZ3RoPjE/cjpyWzBdfVxuIiwgImltcG9ydCBodG0gZnJvbSBcImh0bVwiO1xuaW1wb3J0IHR5cGUgeyBUYWdnZWRUZW1wbGF0ZSwgVGVtcGxhdGVQcm9wcywgVGVtcGxhdGVTY2hlbWEgfSBmcm9tIFwiLi90eXBlc1wiO1xuXG5jb25zdCBoeXBlcnRleHQgPSAoXG4gIHR5cGU6IHVua25vd24sXG4gIHByb3BzOiBUZW1wbGF0ZVByb3BzLFxuICAuLi5jaGlsZHJlbjogVGVtcGxhdGVTY2hlbWFbXVxuKSA9PiB7XG4gIHJldHVybiB7IHR5cGUsIHByb3BzLCBjaGlsZHJlbiB9O1xufTtcblxuY29uc3QgaHRtbCA9IGh0bS5iaW5kPFRhZ2dlZFRlbXBsYXRlPihoeXBlcnRleHQpO1xuXG5leHBvcnQgeyBodG1sIH07XG5leHBvcnQgeyBodG1sIGFzIGpzeCB9O1xuZXhwb3J0IHsgaHRtbCBhcyB0c3ggfTtcbiIsICIvKipcbiAqIEdlcmEgdW0gaGFzaCBcdTAwRkFuaWNvIGJhc2VhZG8gbm8gYWxnb3JpdG1vIERKQjIuXG4gKiBAcGFyYW0gc3RyIC0gTyBjb250ZVx1MDBGQWRvIGEgcGFydGlyIGRvIHF1YWwgbyBoYXNoIHNlclx1MDBFMSBnZXJhZG8uXG4gKiBAcmV0dXJucyBPIGhhc2ggZ2VyYWRvIGNvbW8gdW1hIHN0cmluZy5cbiAqL1xuZXhwb3J0IGNvbnN0IGNyZWF0ZUhhc2ggPSAodGV4dDogc3RyaW5nLCBzZWxlY3Rvcjogc3RyaW5nKTogc3RyaW5nID0+IHtcbiAgbGV0IGhhc2ggPSA1MzgxO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IHRleHQubGVuZ3RoOyBpKyspIHtcbiAgICBoYXNoID0gKGhhc2ggKiAzMykgXiB0ZXh0LmNoYXJDb2RlQXQoaSk7XG4gIH1cbiAgcmV0dXJuIGAke3NlbGVjdG9yfS0keyhoYXNoID4+PiAwKS50b1N0cmluZygzNil9YDtcbn07XG4iLCAiY29uc3Qgc3R5bGVFbGVtZW50Q2FjaGU6IE1hcDxzdHJpbmcsIEhUTUxTdHlsZUVsZW1lbnQ+ID0gbmV3IE1hcCgpO1xuXG5leHBvcnQgY29uc3QgY3JlYXRlU3R5bGVFbGVtZW50ID0gKGNvbXBvbmVudElkOiBzdHJpbmcpOiBIVE1MU3R5bGVFbGVtZW50ID0+IHtcbiAgY29uc3Qgc3R5bGVFbGVtZW50ID0gc3R5bGVFbGVtZW50Q2FjaGUuZ2V0KGNvbXBvbmVudElkKTtcblxuICBpZiAoc3R5bGVFbGVtZW50ICE9PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gc3R5bGVFbGVtZW50O1xuICB9XG5cbiAgY29uc3Qgc3R5bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gIHN0eWxlLnNldEF0dHJpYnV0ZShcImRhdGEtY29tcG9uZW50XCIsIGNvbXBvbmVudElkKTtcbiAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzdHlsZSk7XG4gIHN0eWxlRWxlbWVudENhY2hlLnNldChjb21wb25lbnRJZCwgc3R5bGUpO1xuXG4gIHJldHVybiBzdHlsZTtcbn07XG4iLCAidHlwZSBXcmFwU3R5bGVQYXJhbXMgPSB7XG4gIHN0eWxlOiBzdHJpbmc7XG4gIHNlbGVjdG9yOiBzdHJpbmc7XG59O1xuXG50eXBlIEFjY3VtdWxhdG9yID0ge1xuICBpbnNpZGVCbG9jazogbnVtYmVyO1xuICBnbG9iYWxSdWxlczogc3RyaW5nO1xuICByZXN1bHQ6IHN0cmluZztcbn07XG5cbnR5cGUgTGluZVByb2Nlc3NpbmcgPSB7XG4gIGdsb2JhbFJ1bGVzOiBzdHJpbmc7XG4gIHJlc3VsdDogc3RyaW5nO1xufTtcblxuY29uc3Qgd3JhcExvb3NlUnVsZXNPdXRzaWRlTWVkaWFRdWVyeSA9ICh7XG4gIHN0eWxlLFxuICBzZWxlY3Rvcixcbn06IFdyYXBTdHlsZVBhcmFtcyk6IHN0cmluZyA9PiB7XG4gIGNvbnN0IGxpbmVzID0gc3R5bGUuc3BsaXQoXCJcXG5cIik7XG4gIGNvbnN0IHJ1bGVSZWdleCA9IC9eXFxzKihbXFx3LV0rKVxccyo6XFxzKlteO10rOy87XG5cbiAgY29uc3QgaW5pdGlhbFN0YXRlOiBBY2N1bXVsYXRvciA9IHtcbiAgICBpbnNpZGVCbG9jazogMCxcbiAgICBnbG9iYWxSdWxlczogXCJcIixcbiAgICByZXN1bHQ6IFwiXCIsXG4gIH07XG5cbiAgY29uc3QgcHJvY2Vzc0dsb2JhbFJ1bGVzID0gKFxuICAgIGdsb2JhbFJ1bGVzOiBzdHJpbmcsXG4gICAgcmVzdWx0OiBzdHJpbmcsXG4gICAgc2VsZWN0b3I6IHN0cmluZyxcbiAgKTogTGluZVByb2Nlc3NpbmcgPT4gKHtcbiAgICBnbG9iYWxSdWxlczogXCJcIixcbiAgICByZXN1bHQ6IGAke3Jlc3VsdH0ke3NlbGVjdG9yfSB7XFxuJHtnbG9iYWxSdWxlc319XFxuXFxuYCxcbiAgfSk7XG5cbiAgY29uc3QgcHJvY2Vzc1JlZ3VsYXJMaW5lID0gKFxuICAgIGxpbmU6IHN0cmluZyxcbiAgICByZXN1bHQ6IHN0cmluZyxcbiAgKTogTGluZVByb2Nlc3NpbmcgPT4gKHtcbiAgICBnbG9iYWxSdWxlczogXCJcIixcbiAgICByZXN1bHQ6IGAke3Jlc3VsdH0ke2xpbmV9XFxuYCxcbiAgfSk7XG5cbiAgY29uc3QgYWRkR2xvYmFsUnVsZSA9IChcbiAgICBsaW5lOiBzdHJpbmcsXG4gICAgZ2xvYmFsUnVsZXM6IHN0cmluZyxcbiAgKTogTGluZVByb2Nlc3NpbmcgPT4gKHtcbiAgICBnbG9iYWxSdWxlczogYCR7Z2xvYmFsUnVsZXN9JHtsaW5lfVxcbmAsXG4gICAgcmVzdWx0OiBcIlwiLFxuICB9KTtcblxuICBjb25zdCBjb3VudEJsb2NrcyA9IChsaW5lOiBzdHJpbmcpOiBudW1iZXIgPT4ge1xuICAgIGNvbnN0IG9wZW5pbmdzID0gKGxpbmUubWF0Y2goL3svZykgfHwgW10pLmxlbmd0aDtcbiAgICBjb25zdCBjbG9zaW5ncyA9IChsaW5lLm1hdGNoKC99L2cpIHx8IFtdKS5sZW5ndGg7XG4gICAgcmV0dXJuIG9wZW5pbmdzIC0gY2xvc2luZ3M7XG4gIH07XG5cbiAgY29uc3QgcHJvY2Vzc0xpbmUgPSAoYWNjOiBBY2N1bXVsYXRvciwgbGluZTogc3RyaW5nKTogQWNjdW11bGF0b3IgPT4ge1xuICAgIGFjYy5pbnNpZGVCbG9jayArPSBjb3VudEJsb2NrcyhsaW5lKTtcblxuICAgIC8vIENhc2UgMTogTGluZSBpcyBhIGdsb2JhbCBydWxlXG4gICAgaWYgKGFjYy5pbnNpZGVCbG9jayA9PT0gMCAmJiBydWxlUmVnZXgudGVzdChsaW5lKSkge1xuICAgICAgY29uc3QgeyBnbG9iYWxSdWxlcywgcmVzdWx0IH0gPSBhZGRHbG9iYWxSdWxlKGxpbmUsIGFjYy5nbG9iYWxSdWxlcyk7XG4gICAgICByZXR1cm4geyAuLi5hY2MsIGdsb2JhbFJ1bGVzLCByZXN1bHQ6IGFjYy5yZXN1bHQgKyByZXN1bHQgfTtcbiAgICB9XG5cbiAgICAvLyBDYXNlIDI6IFRoZXJlIGFyZSBhY2N1bXVsYXRlZCBnbG9iYWwgcnVsZXNcbiAgICBpZiAoYWNjLmdsb2JhbFJ1bGVzKSB7XG4gICAgICBjb25zdCB7IGdsb2JhbFJ1bGVzLCByZXN1bHQgfSA9IHByb2Nlc3NHbG9iYWxSdWxlcyhcbiAgICAgICAgYWNjLmdsb2JhbFJ1bGVzLFxuICAgICAgICBhY2MucmVzdWx0LFxuICAgICAgICBzZWxlY3RvcixcbiAgICAgICk7XG4gICAgICBjb25zdCBwcm9jZXNzZWRMaW5lID0gcHJvY2Vzc1JlZ3VsYXJMaW5lKGxpbmUsIFwiXCIpO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uYWNjLFxuICAgICAgICBnbG9iYWxSdWxlcyxcbiAgICAgICAgcmVzdWx0OiByZXN1bHQgKyBwcm9jZXNzZWRMaW5lLnJlc3VsdCxcbiAgICAgIH07XG4gICAgfVxuXG4gICAgLy8gQ2FzZSAzOiBSZWd1bGFyIGxpbmVcbiAgICBjb25zdCB7IGdsb2JhbFJ1bGVzLCByZXN1bHQgfSA9IHByb2Nlc3NSZWd1bGFyTGluZShsaW5lLCBhY2MucmVzdWx0KTtcbiAgICByZXR1cm4geyAuLi5hY2MsIGdsb2JhbFJ1bGVzLCByZXN1bHQgfTtcbiAgfTtcblxuICBjb25zdCB7IHJlc3VsdCwgZ2xvYmFsUnVsZXMgfSA9IGxpbmVzLnJlZHVjZShwcm9jZXNzTGluZSwgaW5pdGlhbFN0YXRlKTtcblxuICByZXR1cm4gZ2xvYmFsUnVsZXNcbiAgICA/IGAke3Jlc3VsdH0ke3NlbGVjdG9yfSB7XFxuJHtnbG9iYWxSdWxlc319XFxuYC50cmltKClcbiAgICA6IHJlc3VsdC50cmltKCk7XG59O1xuXG5jb25zdCB3cmFwTG9vc2VSdWxlc0luc2lkZU1lZGlhUXVlcnkgPSAoe1xuICBzdHlsZSxcbiAgc2VsZWN0b3IsXG59OiBXcmFwU3R5bGVQYXJhbXMpOiBzdHJpbmcgPT4ge1xuICBjb25zdCByZWdleCA9IC9AbWVkaWFcXHMqKFtee10rKVxccypcXHsoW1xcc1xcU10qPylcXH0vZztcbiAgY29uc3QgcnVsZVJlZ2V4ID0gL15cXHMqKFtcXHctXSspXFxzKjpcXHMqW147XSs7LztcblxuICByZXR1cm4gc3R5bGUucmVwbGFjZShyZWdleCwgKG1hdGNoLCBtZWRpYVF1ZXJ5LCBpbm5lckNzcykgPT4ge1xuICAgIGNvbnN0IHJ1bGVzID0gaW5uZXJDc3NcbiAgICAgIC50cmltKClcbiAgICAgIC5zcGxpdChcIlxcblwiKVxuICAgICAgLm1hcCgobGluZTogc3RyaW5nKSA9PiBsaW5lLnRyaW0oKSlcbiAgICAgIC5maWx0ZXIoKGxpbmU6IHN0cmluZykgPT4gbGluZSk7XG5cbiAgICBjb25zdCB3cmFwcGVkUnVsZXMgPSBydWxlc1xuICAgICAgLmZpbHRlcigocnVsZTogc3RyaW5nKSA9PiBydWxlUmVnZXgudGVzdChydWxlKSlcbiAgICAgIC5tYXAoKHJ1bGU6IHN0cmluZykgPT4gYCR7c2VsZWN0b3J9IHtcXG4ke3J1bGUudHJpbSgpfVxcbn1gKVxuICAgICAgLmpvaW4oXCJcXG5cIik7XG5cbiAgICByZXR1cm4gYEBtZWRpYSAke21lZGlhUXVlcnkudHJpbSgpfSB7XFxuJHt3cmFwcGVkUnVsZXN9XFxufWA7XG4gIH0pO1xufTtcblxuY29uc3QgYXBwbHlDbGFzc05hbWVTY29wZSA9ICh7IHN0eWxlLCBzZWxlY3RvciB9OiBXcmFwU3R5bGVQYXJhbXMpOiBzdHJpbmcgPT4ge1xuICBjb25zdCByZWdleCA9IC9cXC4oPzwhW1xcZF0pKD8hW1xcZF0pKFtcXHctXSspL2c7XG4gIHJldHVybiBzdHlsZS5yZXBsYWNlKHJlZ2V4LCBgLiR7c2VsZWN0b3J9XyQxYCk7XG59O1xuXG5leHBvcnQgY29uc3QgdHJhbnNmb3JtU3R5bGUgPSAocmF3U3R5bGU6IHN0cmluZywgc2VsZWN0b3I6IHN0cmluZyk6IHN0cmluZyA9PiB7XG4gIGxldCBzdHlsZSA9IHJhd1N0eWxlO1xuICBjb25zdCBjbGFzc05hbWUgPSBgLiR7c2VsZWN0b3J9YDtcbiAgc3R5bGUgPSBhcHBseUNsYXNzTmFtZVNjb3BlKHsgc3R5bGUsIHNlbGVjdG9yIH0pO1xuICBzdHlsZSA9IHdyYXBMb29zZVJ1bGVzT3V0c2lkZU1lZGlhUXVlcnkoeyBzdHlsZSwgc2VsZWN0b3I6IGNsYXNzTmFtZSB9KTtcbiAgc3R5bGUgPSB3cmFwTG9vc2VSdWxlc0luc2lkZU1lZGlhUXVlcnkoeyBzdHlsZSwgc2VsZWN0b3I6IGNsYXNzTmFtZSB9KTtcblxuICByZXR1cm4gc3R5bGU7XG59O1xuIiwgImltcG9ydCB0eXBlIHsgVGFnZ2VkU3R5bGUgfSBmcm9tIFwiLi90eXBlc1wiO1xuaW1wb3J0IHsgY3JlYXRlSGFzaCB9IGZyb20gXCIuL2NyZWF0ZUhhc2hcIjtcbmltcG9ydCB7IHRyYW5zZm9ybVN0eWxlIH0gZnJvbSBcIi4vY3NzUGFyc2VyXCI7XG5pbXBvcnQgeyBjcmVhdGVTdHlsZUVsZW1lbnQgfSBmcm9tIFwiLi9jcmVhdGVTdHlsZUVsZW1lbnRcIjtcblxudHlwZSBIYW5kbGVyUGFyYW1zID0ge1xuICBoYXNoSWQ6IHN0cmluZztcbiAgc2NvcGVkU3R5bGU6IHN0cmluZztcbiAgc3R5bGVFbGVtZW50OiBFbGVtZW50O1xufTtcbnR5cGUgSGFuZGxlciA9IChwYXlsb2FkOiBIYW5kbGVyUGFyYW1zKSA9PiB2b2lkO1xuXG5jb25zdCBjc3NDYWNoZTogTWFwPHN0cmluZywgc3RyaW5nPiA9IG5ldyBNYXAoKTtcblxuZXhwb3J0IGNvbnN0IGNzcyA9XG4gIChzZWxlY3Rvcjogc3RyaW5nLCBoYW5kbGVyOiBIYW5kbGVyID0gKCkgPT4geyB9KTogVGFnZ2VkU3R5bGUgPT5cbiAgICAoXG4gICAgICBzdHJpbmdzOiBUZW1wbGF0ZVN0cmluZ3NBcnJheSxcbiAgICAgIC4uLmludGVycG9sYXRpb25zOiAoc3RyaW5nIHwgbnVtYmVyKVtdXG4gICAgKTogc3RyaW5nID0+IHtcbiAgICAgIGNvbnN0IHJhd0NTUyA9IHN0cmluZ3MucmVkdWNlKFxuICAgICAgICAoYWNjdW11bGF0b3IsIHN0ciwgaW5kZXgpID0+XG4gICAgICAgICAgYCR7YWNjdW11bGF0b3J9JHtzdHJ9JHtpbnRlcnBvbGF0aW9uc1tpbmRleF0gIT09IHVuZGVmaW5lZCA/IGludGVycG9sYXRpb25zW2luZGV4XSA6IFwiXCJ9YCxcbiAgICAgICAgXCJcIixcbiAgICAgICk7XG5cbiAgICAgIGNvbnN0IGNhY2hlZENsYXNzTmFtZSA9IGNzc0NhY2hlLmdldChyYXdDU1MpO1xuICAgICAgaWYgKGNhY2hlZENsYXNzTmFtZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIC8vIFZlcmlmaWNhIHNlIG8gZWxlbWVudG8gc3R5bGUgZXhpc3RlIG5vIERPTVxuICAgICAgICBjb25zdCBleGlzdGluZ1N0eWxlID0gZG9jdW1lbnQuaGVhZC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICAgIGBbZGF0YS1jb21wb25lbnQ9XCIke2NhY2hlZENsYXNzTmFtZX1cIl1gLFxuICAgICAgICApO1xuXG4gICAgICAgIC8vIFNlIG5cdTAwRTNvIGV4aXN0aXIsIHJlY3JpYSBvIGVsZW1lbnRvIHN0eWxlXG4gICAgICAgIGlmICghZXhpc3RpbmdTdHlsZSkge1xuICAgICAgICAgIGNvbnN0IHNjb3BlZFN0eWxlID0gdHJhbnNmb3JtU3R5bGUocmF3Q1NTLCBjYWNoZWRDbGFzc05hbWUpO1xuICAgICAgICAgIGNvbnN0IHN0eWxlRWxlbWVudCA9IGNyZWF0ZVN0eWxlRWxlbWVudChjYWNoZWRDbGFzc05hbWUpO1xuICAgICAgICAgIHN0eWxlRWxlbWVudC5pbm5lckhUTUwgKz0gc2NvcGVkU3R5bGU7XG4gICAgICAgICAgaGFuZGxlcih7IGhhc2hJZDogY2FjaGVkQ2xhc3NOYW1lLCBzY29wZWRTdHlsZSwgc3R5bGVFbGVtZW50IH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGNhY2hlZENsYXNzTmFtZTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgaGFzaElkID0gY3JlYXRlSGFzaChyYXdDU1MsIHNlbGVjdG9yKTtcbiAgICAgIGNvbnN0IHNjb3BlZFN0eWxlID0gdHJhbnNmb3JtU3R5bGUocmF3Q1NTLCBoYXNoSWQpO1xuICAgICAgY29uc3Qgc3R5bGVFbGVtZW50ID0gY3JlYXRlU3R5bGVFbGVtZW50KGhhc2hJZCk7XG5cbiAgICAgIGhhbmRsZXIoeyBoYXNoSWQsIHNjb3BlZFN0eWxlLCBzdHlsZUVsZW1lbnQgfSk7XG5cbiAgICAgIGlmICghc3R5bGVFbGVtZW50LmlubmVySFRNTC5pbmNsdWRlcyhzY29wZWRTdHlsZSkpIHtcbiAgICAgICAgc3R5bGVFbGVtZW50LmlubmVySFRNTCArPSBzY29wZWRTdHlsZTtcbiAgICAgIH1cblxuICAgICAgY3NzQ2FjaGUuc2V0KHJhd0NTUywgaGFzaElkKTtcblxuICAgICAgcmV0dXJuIGhhc2hJZDtcbiAgICB9O1xuIiwgImltcG9ydCB0eXBlIHsgVGVtcGxhdGVTY2hlbWEgfSBmcm9tIFwiQC90ZW1wbGF0ZVwiO1xuaW1wb3J0IHR5cGUgeyBHZW5lcmljT2JqZWN0LCBTdGF0ZSwgU3RhdGVNYW5hZ2VyIH0gZnJvbSBcIkAvc3RhdGVcIjtcbmltcG9ydCB7IGNyZWF0ZVN0YXRlIH0gZnJvbSBcIkAvc3RhdGVcIjtcbmltcG9ydCB7IHJlbmRlciB9IGZyb20gXCJAL3JlbmRlclwiO1xuaW1wb3J0IHsgaHRtbCwganN4LCB0c3ggfSBmcm9tIFwiQC90ZW1wbGF0ZVwiO1xuaW1wb3J0IHsgY3NzIH0gZnJvbSBcIkAvc3R5bGVcIjtcbmltcG9ydCB7IHJlbmRlckNoaWxkcmVuIH0gZnJvbSBcIi4vcmVuZGVyQ2hpbGRyZW5cIjtcbmltcG9ydCB7IHNldEVsZW1lbnRBdHRyaWJ1dGVzIH0gZnJvbSBcIi4vc2V0RWxlbWVudEF0dHJpYnV0ZXNcIjtcblxudHlwZSBGYWN0b3J5ID0gKHBhcmFtcz86IHVua25vd24pID0+IHVua25vd247XG5cbnR5cGUgU3R5bGVQYXJhbXMgPSB7XG4gIHByb3BzOiBTdGF0ZTtcbiAgc3RhdGU6IFN0YXRlO1xuICBjc3M6IFJldHVyblR5cGU8dHlwZW9mIGNzcz47XG59O1xuXG50eXBlIFN0eWxlcyA9IHsgW2tleTogc3RyaW5nXTogc3RyaW5nIH07XG50eXBlIFN0eWxlc09iamVjdCA9IEdlbmVyaWNPYmplY3Q8eyBba2V5OiBzdHJpbmddOiAoKSA9PiBzdHJpbmcgfT47XG50eXBlIFN0eWxlSGFuZGxlckZhY3RvcnkgPSAoKSA9PiBTdHlsZXNPYmplY3Q7XG50eXBlIFN0eWxlSGFuZGxlciA9IChwYXJhbXM6IFN0eWxlUGFyYW1zKSA9PiBzdHJpbmc7XG5cbnR5cGUgVGVtcGxhdGVQYXJhbXMgPSB7XG4gIHByb3BzOiBTdGF0ZTtcbiAgc3RhdGU6IFN0YXRlO1xuICBodG1sOiB0eXBlb2YgaHRtbDtcbiAganN4OiB0eXBlb2YganN4O1xuICB0c3g6IHR5cGVvZiB0c3g7XG4gIHN0eWxlczogU3R5bGVzO1xuICBhY3Rpb25zOiBBY3Rpb25zO1xufTtcblxudHlwZSBUZW1wbGF0ZUluamVjdGlvbnMgPSA8VCA9IHVua25vd24+KCkgPT4gR2VuZXJpY09iamVjdDxUPjtcblxudHlwZSBUZW1wbGF0ZUhhbmRsZXIgPSAoXG4gIHBhcmFtczogVGVtcGxhdGVQYXJhbXMsXG4gIGluamVjdGlvbnM6IFRlbXBsYXRlSW5qZWN0aW9ucyxcbikgPT4gdm9pZDtcblxudHlwZSBBY3Rpb25zID0gR2VuZXJpY09iamVjdDtcblxudHlwZSBBY3Rpb25QYXJhbXMgPSB7XG4gIHByb3BzOiBTdGF0ZTtcbiAgc3RhdGU6IFN0YXRlTWFuYWdlcjtcbn07XG50eXBlIEFjdGlvbkhhbmRsZXJGYWN0b3J5ID0gKHBhcmFtczogQWN0aW9uUGFyYW1zKSA9PiBHZW5lcmljT2JqZWN0O1xuXG50eXBlIEF0dHJpYnV0ZSA9IG9iamVjdCAmIHtcbiAgW2tleTogc3ltYm9sIHwgc3RyaW5nXTogdW5rbm93bjtcbn07XG5cbmNvbnN0IF9hdHRyaWJ1dGVzID0ge307XG5cbmNvbnN0IF9jcmVhdGVUYWdCeUZhY3RvcnlOYW1lID0gKGZhY3Rvcnk6IEZhY3RvcnkpID0+IHtcbiAgcmV0dXJuIGZhY3RvcnkubmFtZVxuICAgIC5zcGxpdCgvKD89W0EtWl0pLylcbiAgICAuam9pbihcIi1cIilcbiAgICAudG9Mb3dlckNhc2UoKTtcbn07XG5cbmNvbnN0IF9jcmVhdGVVc2VTdGF0ZSA9IChzdGF0ZTogU3RhdGVNYW5hZ2VyKSA9PiB7XG4gIGNvbnN0IGN1cnJlbnRTdGF0ZSA9IHt9O1xuICBjb25zdCB1c2VTdGF0ZSA9IDxUPihpbml0aWFsU3RhdGU6IFN0YXRlPFQ+KTogU3RhdGVNYW5hZ2VyID0+IHtcbiAgICBjb25zdCBsYXRlc3RTdGF0ZSA9IHN0YXRlLmdldCgpIGFzIFN0YXRlPFQ+O1xuICAgIHN0YXRlLnNldCh7IC4uLmluaXRpYWxTdGF0ZSwgLi4ubGF0ZXN0U3RhdGUgfSk7XG5cbiAgICBPYmplY3QuYXNzaWduKGN1cnJlbnRTdGF0ZSwgc3RhdGUuZ2V0KCkpO1xuICAgIHJldHVybiB7IGdldDogc3RhdGUuZ2V0LCBzZXQ6IHN0YXRlLnNldCwgd2F0Y2g6IHN0YXRlLndhdGNoIH07XG4gIH07XG4gIHJldHVybiB7IGN1cnJlbnRTdGF0ZSwgdXNlU3RhdGUgfTtcbn07XG5cbmNvbnN0IF9jcmVhdGVVc2VTdHlsZSA9ICh7IHByb3BzLCBzdGF0ZSwgY3NzIH06IFN0eWxlUGFyYW1zKSA9PiB7XG4gIGNvbnN0IHN0eWxlc2hlZXQgPSB7fTtcbiAgY29uc3QgdXNlU3R5bGUgPSAoY3NzSGFuZGxlckZhY3Rvcnk6IFN0eWxlSGFuZGxlckZhY3RvcnkpID0+IHtcbiAgICBjb25zdCBoYW5kbGVycyA9IGNzc0hhbmRsZXJGYWN0b3J5KCk7XG4gICAgY29uc3Qgc3R5bGVzOiBTdHlsZXMgPSB7fTtcblxuICAgIGZvciAoY29uc3Qga2V5IGluIGhhbmRsZXJzKSB7XG4gICAgICBjb25zdCBoYW5kbGVyID0gaGFuZGxlcnNba2V5XSBhcyBTdHlsZUhhbmRsZXI7XG4gICAgICBjb25zdCBzdHlsZSA9IGhhbmRsZXIoeyBwcm9wcywgc3RhdGUsIGNzcyB9KTtcbiAgICAgIHN0eWxlc1trZXldID0gc3R5bGU7XG4gICAgfVxuXG4gICAgT2JqZWN0LmFzc2lnbihzdHlsZXNoZWV0LCBzdHlsZXMpO1xuICAgIHJldHVybiBzdHlsZXM7XG4gIH07XG5cbiAgcmV0dXJuIHsgc3R5bGVzOiBzdHlsZXNoZWV0LCB1c2VTdHlsZSB9O1xufTtcblxuY29uc3QgX2NyZWF0ZVVzZVRlbXBsYXRlID0gKHBhcmFtczogVGVtcGxhdGVQYXJhbXMpID0+IHtcbiAgY29uc3QgdXNlVGVtcGxhdGUgPSAoXG4gICAgdGVtcGxhdGVIYW5kbGVyOiBUZW1wbGF0ZUhhbmRsZXIsXG4gICAgdGVtcGxhdGVJbmplY3Rpb25zOiBUZW1wbGF0ZUluamVjdGlvbnMsXG4gICkgPT4ge1xuICAgIHJldHVybiB0ZW1wbGF0ZUhhbmRsZXIocGFyYW1zLCB0ZW1wbGF0ZUluamVjdGlvbnMpO1xuICB9O1xuXG4gIHJldHVybiB1c2VUZW1wbGF0ZTtcbn07XG5cbmNvbnN0IF9jcmVhdGVVc2VBY3Rpb24gPSAoeyBwcm9wcywgc3RhdGUgfTogQWN0aW9uUGFyYW1zKSA9PiB7XG4gIGNvbnN0IGFjdGlvbnM6IEdlbmVyaWNPYmplY3QgPSB7fTtcblxuICBjb25zdCB1c2VBY3Rpb24gPSAoYWN0aW9uSGFuZGxlckZhY3Rvcnk6IEFjdGlvbkhhbmRsZXJGYWN0b3J5KSA9PiB7XG4gICAgY29uc3QgaGFuZGxlckFjdGlvbnMgPSBhY3Rpb25IYW5kbGVyRmFjdG9yeSh7IHByb3BzLCBzdGF0ZSB9KTtcbiAgICBPYmplY3QuYXNzaWduKGFjdGlvbnMsIGhhbmRsZXJBY3Rpb25zKTtcbiAgfTtcblxuICByZXR1cm4geyBhY3Rpb25zLCB1c2VBY3Rpb24gfTtcbn07XG5cbmV4cG9ydCBjb25zdCBjcmVhdGVFbGVtZW50QnlGYWN0b3J5TmFtZSA9IChcbiAgdGVtcGxhdGU6IFRlbXBsYXRlU2NoZW1hLFxuICBwYXJlbnRFbGVtZW50OiBFbGVtZW50LFxuICBsYXRlc3RTdGF0ZTogU3RhdGUgPSB7fSxcbikgPT4ge1xuICByZXR1cm4gKCkgPT4ge1xuICAgIGNvbnN0IGZhY3RvcnkgPSB0ZW1wbGF0ZS50eXBlIGFzIEZhY3Rvcnk7XG4gICAgY29uc3QgdGFnTmFtZSA9IF9jcmVhdGVUYWdCeUZhY3RvcnlOYW1lKGZhY3RvcnkpO1xuICAgIGNvbnN0IHNlbGVjdG9yID0gdGFnTmFtZS50b0xvd2VyQ2FzZSgpO1xuICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRhZ05hbWUpO1xuXG4gICAgY29uc3QgcHJvcHMgPSB0ZW1wbGF0ZS5wcm9wcztcbiAgICBjb25zdCBsYXRlc3REZWVwU3RhdGUgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGxhdGVzdFN0YXRlKSk7XG4gICAgY29uc3Qgc3RhdGVNYW5hZ2VyID0gY3JlYXRlU3RhdGUobGF0ZXN0RGVlcFN0YXRlKTtcbiAgICBjb25zdCB7IGN1cnJlbnRTdGF0ZTogc3RhdGUsIHVzZVN0YXRlIH0gPSBfY3JlYXRlVXNlU3RhdGUoc3RhdGVNYW5hZ2VyKTtcbiAgICBjb25zdCBzdHlsZWQgPSBjc3Moc2VsZWN0b3IsICh7IGhhc2hJZCB9KSA9PiB7XG4gICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoaGFzaElkKTtcbiAgICAgIE9iamVjdC5hc3NpZ24oX2F0dHJpYnV0ZXMsIHsgY2xhc3M6IGhhc2hJZCB9KTtcbiAgICB9KTtcbiAgICBjb25zdCB7IHN0eWxlcywgdXNlU3R5bGUgfSA9IF9jcmVhdGVVc2VTdHlsZSh7IHByb3BzLCBzdGF0ZSwgY3NzOiBzdHlsZWQgfSk7XG4gICAgY29uc3QgeyBhY3Rpb25zLCB1c2VBY3Rpb24gfSA9IF9jcmVhdGVVc2VBY3Rpb24oe1xuICAgICAgcHJvcHMsXG4gICAgICBzdGF0ZTogc3RhdGVNYW5hZ2VyLFxuICAgIH0pO1xuXG4gICAgY29uc3QgdXNlVGVtcGxhdGUgPSBfY3JlYXRlVXNlVGVtcGxhdGUoe1xuICAgICAgcHJvcHMsXG4gICAgICBzdGF0ZSxcbiAgICAgIGh0bWwsXG4gICAgICBqc3gsXG4gICAgICB0c3gsXG4gICAgICBzdHlsZXMsXG4gICAgICBhY3Rpb25zLFxuICAgIH0pO1xuXG4gICAgY29uc3QgY2hpbGRyZW4gPSBmYWN0b3J5KHtcbiAgICAgIHByb3BzLFxuICAgICAgdXNlU3RhdGUsXG4gICAgICB1c2VTdHlsZSxcbiAgICAgIHVzZVRlbXBsYXRlLFxuICAgICAgdXNlQWN0aW9uLFxuICAgIH0pIGFzIFRlbXBsYXRlU2NoZW1hW107XG5cbiAgICBjb25zdCBvbGRFbGVtZW50ID0gcGFyZW50RWxlbWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKSBhcyBFbGVtZW50O1xuICAgIHNldEVsZW1lbnRBdHRyaWJ1dGVzKGVsZW1lbnQsIF9hdHRyaWJ1dGVzKTtcblxuICAgIG9sZEVsZW1lbnRcbiAgICAgID8gb2xkRWxlbWVudC5yZXBsYWNlV2l0aChlbGVtZW50KVxuICAgICAgOiBwYXJlbnRFbGVtZW50Lmluc2VydEFkamFjZW50RWxlbWVudChcImJlZm9yZWVuZFwiLCBlbGVtZW50KTtcblxuICAgIHJlbmRlckNoaWxkcmVuKGNoaWxkcmVuLCBlbGVtZW50LCBzdGF0ZSk7XG5cbiAgICBzdGF0ZU1hbmFnZXIud2F0Y2goKHBheWxvYWQpID0+IHtcbiAgICAgIGVsZW1lbnQuaW5uZXJIVE1MID0gXCJcIjtcbiAgICAgIHJlbmRlcih0ZW1wbGF0ZSwgcGFyZW50RWxlbWVudCwgcGF5bG9hZCk7XG4gICAgfSk7XG4gIH07XG59O1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7OztBQUVBLElB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QUFTQSxJQUFFLEdBQUUsR0FBRSxHQUFFO0FBQUMsTUFBSTtBQUFFLElBQUUsQ0FBQyxJQUFFO0FBQUUsV0FBUSxJQUFFLEdBQUUsSUFBRSxFQUFFLFFBQU8sS0FBSTtBQUFDLFFBQUksSUFBRSxFQUFFLEdBQUcsR0FBRSxJQUFFLEVBQUUsQ0FBQyxLQUFHLEVBQUUsQ0FBQyxLQUFHLElBQUUsSUFBRSxHQUFFLEVBQUUsRUFBRSxHQUFHLENBQUMsS0FBRyxFQUFFLEVBQUUsQ0FBQztBQUFFLFVBQUksSUFBRSxFQUFFLENBQUMsSUFBRSxJQUFFLE1BQUksSUFBRSxFQUFFLENBQUMsSUFBRSxPQUFPLE9BQU8sRUFBRSxDQUFDLEtBQUcsQ0FBQyxHQUFFLENBQUMsSUFBRSxNQUFJLEtBQUcsRUFBRSxDQUFDLElBQUUsRUFBRSxDQUFDLEtBQUcsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUMsSUFBRSxJQUFFLE1BQUksSUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDLEtBQUcsSUFBRSxLQUFHLEtBQUcsSUFBRUEsR0FBRSxNQUFNLEdBQUUsRUFBRUEsSUFBRSxHQUFFLEdBQUUsQ0FBQyxJQUFHLElBQUksQ0FBQyxDQUFDLEdBQUUsRUFBRSxLQUFLLENBQUMsR0FBRSxFQUFFLENBQUMsSUFBRSxFQUFFLENBQUMsS0FBRyxLQUFHLEVBQUUsSUFBRSxDQUFDLElBQUUsR0FBRSxFQUFFLENBQUMsSUFBRSxNQUFJLEVBQUUsS0FBSyxDQUFDO0FBQUEsRUFBQztBQUFDLFNBQU87QUFBQyxHQUF4VCxNQUEwVCxJQUFFLG9CQUFJO0FBQW1CLFNBQVIsbUJBQWlCLEdBQUU7QUFBQyxNQUFJLElBQUUsRUFBRSxJQUFJLElBQUk7QUFBRSxTQUFPLE1BQUksSUFBRSxvQkFBSSxPQUFJLEVBQUUsSUFBSSxNQUFLLENBQUMsS0FBSSxJQUFFLEVBQUUsTUFBSyxFQUFFLElBQUksQ0FBQyxNQUFJLEVBQUUsSUFBSSxHQUFFLElBQUUsU0FBU0MsSUFBRTtBQUFDLGFBQVFELElBQUVFLElBQUVDLEtBQUUsR0FBRSxJQUFFLElBQUcsSUFBRSxJQUFHLElBQUUsQ0FBQyxDQUFDLEdBQUUsSUFBRSxTQUFTRixJQUFFO0FBQUMsWUFBSUUsT0FBSUYsT0FBSSxJQUFFLEVBQUUsUUFBUSx3QkFBdUIsRUFBRSxNQUFJLEVBQUUsS0FBSyxHQUFFQSxJQUFFLENBQUMsSUFBRSxNQUFJRSxPQUFJRixNQUFHLE1BQUksRUFBRSxLQUFLLEdBQUVBLElBQUUsQ0FBQyxHQUFFRSxLQUFFLEtBQUcsTUFBSUEsTUFBRyxVQUFRLEtBQUdGLEtBQUUsRUFBRSxLQUFLLEdBQUVBLElBQUUsQ0FBQyxJQUFFLE1BQUlFLE1BQUcsS0FBRyxDQUFDRixLQUFFLEVBQUUsS0FBSyxHQUFFLEdBQUUsTUFBRyxDQUFDLElBQUVFLE1BQUcsT0FBSyxLQUFHLENBQUNGLE1BQUcsTUFBSUUsUUFBSyxFQUFFLEtBQUtBLElBQUUsR0FBRSxHQUFFRCxFQUFDLEdBQUVDLEtBQUUsSUFBR0YsT0FBSSxFQUFFLEtBQUtFLElBQUVGLElBQUUsR0FBRUMsRUFBQyxHQUFFQyxLQUFFLEtBQUksSUFBRTtBQUFBLElBQUUsR0FBRSxJQUFFLEdBQUUsSUFBRUYsR0FBRSxRQUFPLEtBQUk7QUFBQyxZQUFJLE1BQUlFLE1BQUcsRUFBRSxHQUFFLEVBQUUsQ0FBQztBQUFHLGVBQVEsSUFBRSxHQUFFLElBQUVGLEdBQUUsQ0FBQyxFQUFFLFFBQU8sSUFBSSxDQUFBRCxLQUFFQyxHQUFFLENBQUMsRUFBRSxDQUFDLEdBQUUsTUFBSUUsS0FBRSxRQUFNSCxNQUFHLEVBQUUsR0FBRSxJQUFFLENBQUMsQ0FBQyxHQUFFRyxLQUFFLEtBQUcsS0FBR0gsS0FBRSxNQUFJRyxLQUFFLFNBQU8sS0FBRyxRQUFNSCxNQUFHRyxLQUFFLEdBQUUsSUFBRSxNQUFJLElBQUVILEtBQUUsRUFBRSxDQUFDLElBQUUsSUFBRUEsT0FBSSxJQUFFLElBQUUsS0FBRyxLQUFHQSxLQUFFLFFBQU1BLE1BQUcsUUFBTUEsS0FBRSxJQUFFQSxLQUFFLFFBQU1BLE1BQUcsRUFBRSxHQUFFRyxL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
