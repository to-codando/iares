import { pubsubFactory } from "../pubsub";
export const eventDrive = pubsubFactory();
const _createSelector = (text) => text
    .split(/(?=[A-Z])/)
    .join("-")
    .toLowerCase();
const _createId = () => {
    const randomStr = Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    return `${randomStr}`;
};
const _bindProps = (element, props, isFactory = true, componentId, selector) => {
    if (!props)
        return;
    const attrs = Object.keys(props);
    const isCssClass = (value) => /^class/.test(value);
    const isEvent = (value) => /^on/.test(value);
    const isAction = (value) => typeof value === "function";
    for (const attr of attrs) {
        if (isEvent(attr)) {
            const eventName = attr.toLowerCase().replace(/on/, "");
            const handler = props[attr];
            element.addEventListener(eventName, handler);
        }
        if (isEvent(attr) === isAction(props[attr]) && isFactory !== true && isEvent(attr) !== true) {
            element.setAttribute(attr, props[attr]);
        }
        if (isCssClass(attr)) {
            const styleElement = document.head.querySelector(`[id=${selector}]`);
            const componentUUID = styleElement?.getAttribute("component-id");
            const cssClassNames = _applyCssContext(props[attr], componentUUID);
            element.setAttribute(attr, cssClassNames);
        }
    }
};
const _createChildrenByObject = (template, context, componentId, selector) => {
    if (typeof template === "string") {
        context.innerHTML += template;
        return context.innerHTML;
    }
    if (typeof template?.type === "function") {
        _createComponent(template, context);
        return;
    }
    if (typeof template?.type === "string") {
        const element = document.createElement(template.type);
        _bindProps(element, template.props, false, componentId, selector);
        _createChildren(template.children, element, componentId, selector);
        context.insertAdjacentElement("beforeend", element);
        return;
    }
    if (Array.isArray(template)) {
        _createChildrenByArray(template, context, componentId, selector);
        return;
    }
    if (typeof template === "object" && !Array.isArray(template)) {
        const error = new Error();
        error.stack = `ComponentError:Component is not a named function and must be.
    ${JSON.stringify(template)}
    `;
        throw error;
    }
};
const _createChildrenByArray = (template, context, componentId, selector) => {
    for (const element of template) {
        _createChildrenByObject(element, context, componentId, selector);
    }
};
const _createChildren = (template, context, componentId, selector) => !Array.isArray(template)
    ? _createChildrenByObject(template, context, componentId, selector)
    : _createChildrenByArray(template, context, componentId, selector);
const _hasStyles = (selector) => document.querySelector(`style#${selector}`);
const _hasProps = (component) => {
    const props = component?.props || {};
    return Object.keys(props).length >= 1;
};
const _applyCssContext = (cssText, id) => {
    if (!id)
        return cssText;
    const context = /ctx/g;
    return cssText.replace(context, id);
};
const _bindCssStyles = (component, selector, componentId) => {
    if (_hasStyles(selector) && !_hasProps(component))
        return;
    const styleParams = {
        props: component?.props || {},
        actions: component?.state?.actions || {},
    };
    const css = _applyCssContext(component?.styles(styleParams), componentId) || "";
    const stylesElement = document.createElement("style");
    stylesElement.setAttribute("id", selector);
    stylesElement.setAttribute("component-id", componentId);
    stylesElement.insertAdjacentHTML("beforeend", css);
    document.head.insertAdjacentElement("beforeend", stylesElement);
};
const _createEventDrive = (element) => {
    const execute = (handler) => {
        handler(element);
    };
    return { execute };
};
const _createComponent = (template, context) => {
    if (typeof template.type !== "function")
        throw new Error("Component is not a named function and must be.");
    const { type: componentFactory, props } = template;
    const component = componentFactory({ props });
    const selector = _createSelector(componentFactory.name);
    const hostElement = document.createElement(selector);
    const state = component?.state?.state || {};
    const actions = component?.actions || {};
    const hooks = component?.hooks;
    const componentId = _createId();
    const isFunction = true;
    const _eventDrive = _createEventDrive(hostElement);
    hostElement.setAttribute("id", componentId);
    component?.state?.watchState((data) => _updateView(data));
    _eventDrive.execute((element) => {
        hooks?.beforeMount?.(element);
    });
    const _updateView = (payload) => {
        _eventDrive.execute((element) => {
            hooks?.beforeRender?.(element);
        });
        hostElement.innerHTML = "";
        component?.styles && _bindCssStyles(component, selector, componentId);
        _bindProps(hostElement, template.props, isFunction, componentId, selector);
        _createChildren(template.children, hostElement, componentId, selector);
        context.insertAdjacentElement("beforeend", hostElement);
        const child = template.type({ props: template.props });
        if (child?.template) {
            const childHTM = child.template?.({ props: props || {}, state, actions });
            _createChildrenByObject(childHTM, hostElement, componentId, selector);
        }
        if (!child?.template && typeof template?.type === "function") {
            const childHTM = template?.type({ props: props || {}, state, actions });
            _bindProps(hostElement, template.props, isFunction, componentId, selector);
            if (!childHTM) {
                hostElement.remove();
                return;
            }
            _createChildrenByObject(childHTM, hostElement, componentId, selector);
        }
        const slotsOrigin = Array.from(context.querySelectorAll("slot[target]"));
        const slotsDestiny = Array.from(context.querySelectorAll("slot[id]"));
        const scope = {
            uuid: null,
            componentId: null,
        };
        for (const slotOrigin of slotsOrigin) {
            const targetId = slotOrigin.getAttribute("target") || "";
            const targetContext = slotOrigin.getAttribute("ctx");
            const contextStyleElement = document.head?.querySelector(`#${targetContext}`);
            const componentContextElement = document.head?.querySelector(`#${selector}`);
            const slotTargetSelector = `slot[id=${targetId}]`;
            const targetSlot = context.querySelector(slotTargetSelector);
            const slotFragment = document.createDocumentFragment();
            const children = Array.from(slotOrigin.children);
            scope.uuid = contextStyleElement?.getAttribute("component-id") || null;
            scope.componentId = componentContextElement?.getAttribute("component-id") || null;
            for (const childElement of children) {
                targetContext && childElement.setAttribute("sloted", targetContext);
                slotFragment.append(childElement);
                if (slotOrigin.textContent !== "" && slotFragment.textContent !== slotOrigin.textContent) {
                    const tempalteError = new Error();
                    tempalteError.stack = `TemplateError: Invalid slot element. A content is not a valid html element and must be.\n ${slotOrigin.textContent}`;
                    throw tempalteError;
                }
            }
            targetSlot?.after(slotFragment);
        }
        slotsOrigin.forEach((slot) => slot.remove());
        slotsDestiny.forEach((slot) => slot.remove());
        _eventDrive.execute((element) => {
            hooks?.afterRender?.(element);
            const slotedElements = Array.from(hostElement.querySelectorAll("[sloted]"));
            const _bindCssContext = (element) => {
                if (!scope.uuid)
                    return;
                if (!scope.componentId)
                    return;
                const regex = new RegExp(scope.componentId);
                const cssClassNames = element.classList.toString();
                element.className = cssClassNames.replace(regex, scope.uuid);
                const children = Array.from(element.querySelectorAll(`[class$="${scope.componentId}"]`));
                children.forEach((element) => _bindCssContext(element));
            };
            slotedElements.forEach((element) => _bindCssContext(element));
        });
        eventDrive.on("ON-DESTROY", () => {
            _eventDrive.execute((element) => {
                hooks?.destroy?.(element);
            });
        });
    };
    _updateView();
    _eventDrive.execute((element) => {
        hooks?.afterMount?.(element);
    });
};
export const render = (template, context = document.body) => {
    !Array.isArray(template)
        ? _createComponent(template, context)
        : template.forEach((templateItem) => _createComponent(templateItem, context));
    if (!Array.isArray(template)) {
        const selector = _createSelector(template?.type?.name);
        return document?.querySelector?.(selector)?.outerHTML;
    }
    return template.map(({ type }) => document?.querySelector?.(type.name).outerHTML).join("");
};
//# sourceMappingURL=index.js.map