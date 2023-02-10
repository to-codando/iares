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
    return value.split(regex).join('-').toLocaleLowerCase();
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
var _setPropsElement = function (element, props) {
    if (!props)
        return;
    var isEvent = /^on/;
    for (var key in props) {
        if (!isEvent.test(key))
            element.setAttribute(key, props[key]);
        if (isEvent.test(key)) {
            var eventName = key.replace(/on/, '').toLocaleLowerCase();
            element.addEventListener(eventName, props[key]);
        }
    }
};
var _setChildrenElement = function (element, children) {
    children.forEach(function (child) {
        if (typeof child === 'string') {
            element.textContent = child;
            return;
        }
        var childElement = _createTemplateByObject(child);
        childElement && element.insertAdjacentElement('beforeend', childElement);
    });
};
var _createTemplateByObject = function (schema) {
    return _createTemplateByArray([schema]);
};
var _createTemplateByArray = function (schema) {
    var templateElement = null;
    schema.forEach(function (elementMap) {
        var element = _createElement(elementMap.type);
        _setPropsElement(element, elementMap.props);
        _setChildrenElement(element, elementMap.children);
        templateElement = element;
    });
    return templateElement;
};
var _createTemplateElement = function (schema) {
    return Array.isArray(schema) ? _createTemplateByArray(schema) : _createTemplateByObject(schema);
};
var _createComponent = function (factory, params) {
    var componentSchema = factory();
    var mount = function () {
        var _a;
        var componentElement = params.element;
        var state = ((_a = componentSchema === null || componentSchema === void 0 ? void 0 : componentSchema.state) === null || _a === void 0 ? void 0 : _a.getState()) || {};
        var templateSchema = componentSchema.template({ state: state });
        var templateElement = _createTemplateElement(templateSchema);
        templateElement && componentElement.insertAdjacentElement('beforeend', templateElement);
    };
    var unmount = function () { };
    var setup = function () { };
    return __assign(__assign({}, componentSchema), { element: params.element, selector: params.selector, mount: mount, unmount: unmount, setup: setup });
};
export var render = function (factory, context, callback) {
    var componentSelector = _getComponentSelector(factory.name);
    var componentElementRefs = _getComponentElementRefs(componentSelector, context);
    componentElementRefs.forEach(function (componentElement) {
        var component = _createComponent(factory, {
            selector: componentSelector,
            element: componentElement
        });
        component.mount();
        callback && callback(component.element);
    });
};
//# sourceMappingURL=render.js.map