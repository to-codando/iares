var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var _createSelector = function (value) {
    var regex = /(?=[A-Z])/;
    return value.split(regex).join("-").toLocaleLowerCase();
};
var _createElement = function (selector) {
    return document.createElement(selector);
};
var _getComponentSelector = function (factoryName) {
    var selectorValue = _createSelector(factoryName);
    return "[data-component=\"".concat(selectorValue, "\"]");
};
var _getComponentElementRefs = function (selector, context) {
    var componentElementRefs = context.querySelectorAll(selector);
    return Array.from(componentElementRefs);
};
var _setPropsElement = function (element, props, id) {
    if (!props)
        return;
    var isEvent = /^on/;
    var isClass = /class/;
    for (var key in props) {
        if (!(isClass.test(key) && isEvent.test(key))) {
            element.setAttribute(key, props[key]);
        }
        if (isEvent.test(key)) {
            var eventName = key.replace(/on/, "").toLocaleLowerCase();
            element.addEventListener(eventName, props[key]);
        }
        if (isClass.test(key)) {
            var scopedCss = "".concat(props[key], "_").concat(id);
            element.setAttribute(key, scopedCss);
        }
    }
};
var _setChildrenElement = function (element, children, id) {
    children.forEach(function (child) {
        if (typeof child === "string") {
            element.textContent = child;
            return;
        }
        var childElement = _createTemplateByObject(child, id);
        childElement && element.insertAdjacentElement("beforeend", childElement);
    });
};
var _createTemplateByObject = function (schema, id) {
    return _createTemplateByArray([schema], id);
};
var _createTemplateByArray = function (schema, id) {
    var templateElement = null;
    schema.forEach(function (elementMap) {
        if (!elementMap.type)
            return;
        var element = _createElement(elementMap.type);
        _setPropsElement(element, elementMap.props, id);
        _setChildrenElement(element, elementMap.children, id);
        templateElement = element;
    });
    return templateElement;
};
var _clearElement = function (element) {
    element.innerHTML = "";
    var attributesToRemove = element.getAttributeNames();
    attributesToRemove.forEach(function (attr) {
        if (attr === "data-component")
            return;
        element.removeAttribute(attr);
    });
    return element;
};
var _createTemplateElement = function (schema, id) {
    return Array.isArray(schema)
        ? _createTemplateByArray(schema, id)
        : _createTemplateByObject(schema, id);
};
var _getActions = function (_a) {
    var schema = _a.schema, props = _a.props;
    var stateParams = _getStateUtils(schema);
    if ((schema === null || schema === void 0 ? void 0 : schema.actions) && typeof (schema === null || schema === void 0 ? void 0 : schema.actions) === "function") {
        return schema.actions(__assign(__assign({}, stateParams), { props: props }));
    }
    return (schema === null || schema === void 0 ? void 0 : schema.actions) || {};
};
var _getStateUtils = function (schema) {
    var setState = (schema === null || schema === void 0 ? void 0 : schema.state) ? schema.state.setState : function () { return ({}); };
    var getState = (schema === null || schema === void 0 ? void 0 : schema.state) ? schema.state.getState : function () { return ({}); };
    var state = getState();
    return { state: state, setState: setState, getState: getState };
};
var _getProps = function (factory) {
    var schema = factory({ props: null });
    var state = _getStateUtils(schema).state;
    var actions = _getActions({ schema: schema, props: null });
    var template = _getTemplate({ schema: schema, state: state, actions: actions });
    var props = {};
    template.children.forEach(function (child) {
        var _a;
        if ((_a = child.props) === null || _a === void 0 ? void 0 : _a.hasOwnProperty("data-component")) {
            var component = child.props["data-component"];
            props[component] = {};
            for (var key in child.props) {
                props[component][key] = child.props[key];
            }
        }
    });
    return __assign({}, props);
};
var _getTemplate = function (_a) {
    var schema = _a.schema, state = _a.state, actions = _a.actions;
    return schema.template({ state: state, actions: actions });
};
var _isPropertyTarget = function (props, factory) {
    if (!props)
        return false;
    var componentName = _createSelector(factory.name);
    var scopePropName = Object.keys(props).shift();
    return componentName === scopePropName;
};
var _getComponentSchema = function (_a) {
    var props = _a.props, factory = _a.factory;
    var componentName = _createSelector(factory.name);
    var schema = factory({ props: {} });
    if (!(props && _isPropertyTarget(props, factory)))
        return schema;
    return factory({ props: props[componentName] });
};
var _getHooks = function (_a) {
    var schema = _a.schema, actions = _a.actions;
    if (!schema.hooks)
        return {};
    if (typeof schema.hooks === "function")
        return schema.hooks(actions);
    if (typeof schema.hooks === "object")
        return schema.hooks;
    return {};
};
var _createId = function (selector) {
    var siblingElement = document.querySelector(selector);
    var siblingId = siblingElement === null || siblingElement === void 0 ? void 0 : siblingElement.getAttribute("id");
    if (siblingId)
        return siblingId;
    return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
};
var _hasStyles = function (selector) { return !!document.head.querySelector("style#".concat(selector)); };
var _applyStyles = function (_a) {
    var _b;
    var schema = _a.schema, actions = _a.actions, props = _a.props, id = _a.id;
    if (!schema.hasOwnProperty("styles"))
        return;
    var regex = /\.\w+/gi;
    var styles = ((_b = schema === null || schema === void 0 ? void 0 : schema.styles) === null || _b === void 0 ? void 0 : _b.call(schema, { actions: actions, props: props })) || "";
    var css = styles.replace(regex, function (str) {
        return "".concat(str, "_").concat(id);
    });
    if (_hasStyles(schema.name))
        return;
    var head = document.querySelector("head");
    var styleElement = _createElement("style");
    styleElement.setAttribute("id", schema.name);
    styleElement.setAttribute("type", "text/css");
    styleElement.innerHTML = css.trim();
    head === null || head === void 0 ? void 0 : head.insertAdjacentElement("beforeend", styleElement);
};
var _createComponent = function (factory, params) {
    var _a;
    var props = params.props || _getProps(factory);
    var schema = _getComponentSchema({ props: props, factory: factory });
    var actions = _getActions({ schema: schema, props: props });
    var hooks = _getHooks({ schema: schema, actions: actions });
    schema.selector = params.selector;
    schema.name = _createSelector(factory.name);
    var componentId = _createId(schema.selector);
    (_a = schema.state) === null || _a === void 0 ? void 0 : _a.watchState(function () { return mount(); });
    var beforeMount = function () { var _a; return (_a = hooks.beforeMount) === null || _a === void 0 ? void 0 : _a.call(hooks); };
    var afterMount = function () { var _a; return (_a = hooks.afterMount) === null || _a === void 0 ? void 0 : _a.call(hooks); };
    var beforeRender = function () { var _a; return (_a = hooks.beforeRender) === null || _a === void 0 ? void 0 : _a.call(hooks); };
    var afterRender = function () { var _a; return (_a = hooks.afterRender) === null || _a === void 0 ? void 0 : _a.call(hooks); };
    var mount = function () {
        var _a, _b;
        var state = _getStateUtils(schema).state;
        var templateSchema = _getTemplate({ schema: schema, state: state, actions: actions });
        var componentElement = _clearElement(params.element);
        var templateElement = _createTemplateElement(templateSchema, componentId);
        (_a = hooks.beforeRender) === null || _a === void 0 ? void 0 : _a.call(hooks);
        if (!templateElement)
            return;
        componentElement.id = componentId;
        componentElement.insertAdjacentElement("beforeend", templateElement);
        _applyStyles({ schema: schema, actions: actions, props: props, id: componentId });
        (_b = hooks.afterRender) === null || _b === void 0 ? void 0 : _b.call(hooks);
    };
    var unmount = function () {
        var _a;
        (_a = hooks.unmount) === null || _a === void 0 ? void 0 : _a.call(hooks);
    };
    var setup = function () { };
    return __assign(__assign({}, schema), { element: params.element, selector: params.selector, beforeMount: beforeMount, afterMount: afterMount, beforeRender: beforeRender, afterRender: afterRender, mount: mount, unmount: unmount, setup: setup, props: props });
};
export var render = function (factory, params, callback) {
    var componentSelector = _getComponentSelector(factory.name);
    var componentElementRefs = _getComponentElementRefs(componentSelector, params.element);
    componentElementRefs.forEach(function (componentElement) {
        var component = _createComponent(factory, {
            selector: componentSelector,
            element: componentElement,
            props: params.props,
        });
        component.beforeMount();
        component.mount();
        component.afterMount();
        var callbackParams = {
            element: component.element,
            props: component.props || null,
        };
        callback === null || callback === void 0 ? void 0 : callback(callbackParams);
    });
};
//# sourceMappingURL=render.js.map