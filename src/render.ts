import {
  ActionParamsType,
  ActionsType,
  CallbackRenderType,
  ComponentFactoryType,
  ComponentSchemaProps,
  GenericComponentType,
  GenericObjectType,
  HTMType,
  PropType,
  StatePropsType,
  TemplateElementType,
  TemplateSchemaType,
  contextCallbackType,
  factoryType,
  getHookParamsType,
  hooksType,
} from "./types";

import { IComponent, ICreateComponentParams } from "./interfaces";

const _createSelector = (value: string): string => {
  const regex = /(?=[A-Z])/;
  return value.split(regex).join("-").toLocaleLowerCase();
};

const _createElement = (selector: string): HTMLElement => {
  return document.createElement(selector);
};

const _getComponentSelector = (factoryName: string): string => {
  const selectorValue = _createSelector(factoryName);
  return `[data-component="${selectorValue}"]`;
};

const _getComponentElementRefs = (selector: string, context: Element): Array<Element> => {
  const componentElementRefs = context.querySelectorAll(selector);
  return Array.from(componentElementRefs);
};

const _setPropsElement = (element: Element, props: PropType): void => {
  if (!props) return;
  const isEvent = /^on/;

  for (let key in props) {
    if (!isEvent.test(key)) element.setAttribute(key, props[key]);

    if (isEvent.test(key)) {
      const eventName = key.replace(/on/, "").toLocaleLowerCase();
      element.addEventListener(eventName, props[key]);
    }
  }
};

const _setChildrenElement = (element: Element, children: HTMType[] | GenericObjectType[]): void => {
  children.forEach((child) => {
    if (typeof child === "string") {
      element.textContent = child;
      return;
    }

    const childElement = _createTemplateByObject(child as HTMType);
    childElement && element.insertAdjacentElement("beforeend", childElement);
  });
};

const _createTemplateByObject = (schema: HTMType): TemplateElementType => {
  return _createTemplateByArray([schema]);
};

const _createTemplateByArray = (schema: GenericObjectType): TemplateElementType => {
  let templateElement: TemplateElementType = null;

  schema.forEach((elementMap: HTMType): void => {
    if (!elementMap.type) return;

    const element = _createElement(elementMap.type);
    _setPropsElement(element, elementMap.props);
    _setChildrenElement(element, elementMap.children);
    templateElement = element;
  });

  return templateElement;
};

const _clearElement = (element: HTMLElement): Element => {
  element.innerHTML = ''
  
  const attributesToRemove = element.getAttributeNames();

  attributesToRemove.forEach( attr => {
    if(attr === 'data-component') return
    element.removeAttribute(attr);
  })

  return element;
};

const _createTemplateElement = (schema: HTMType): TemplateElementType => {
  return Array.isArray(schema) ? _createTemplateByArray(schema) : _createTemplateByObject(schema);
};

const _getActions = ({ schema, props }: ActionParamsType): GenericObjectType => {
  const stateParams = _getStateUtils(schema);
  if (schema?.actions && typeof schema?.actions === "function") {
    return schema.actions({ ...stateParams, props });
  }
  return schema?.actions || {};
};

const _getStateUtils = (schema: GenericComponentType): StatePropsType => {
  const setState = schema?.state ? schema.state.setState : () => ({});
  const getState = schema?.state ? schema.state.getState : () => ({});
  const state = getState();

  return { state, setState, getState };
};

const _getProps = (factory: ComponentFactoryType): GenericObjectType => {
  const schema = factory({ props: null });
  const { state } = _getStateUtils(schema);
  const actions = _getActions({ schema, props: null });
  const template = _getTemplate({ schema, state, actions });
  const props: GenericObjectType = {};

  template.children.forEach((child) => {
    if (child.props?.hasOwnProperty("data-component")) {
      const component: string = child.props["data-component"];
      props[component] = {};

      for (let key in child.props) {
        props[component][key] = child.props[key];
      }
    }
  });

  return { ...props };
};

const _getTemplate = ({ schema, state, actions }: TemplateSchemaType): HTMType => {
  return schema.template({ state, actions });
};

const _isPropertyTarget = (props: PropType, factory: ComponentFactoryType) => {
  if (!props) return false;
  const componentName = _createSelector(factory.name);
  const scopePropName = Object.keys(props).shift();
  return componentName === scopePropName;
};

const _getComponentSchema = ({ props, factory }: ComponentSchemaProps) => {
  const componentName = _createSelector(factory.name);
  let schema = factory({ props: {} });
  if (!(props && _isPropertyTarget(props, factory))) return schema;
  return factory({ props: props[componentName] });
};

const _getHooks = ({ schema, actions }: getHookParamsType): hooksType => {
  if (!schema.hooks) return {};
  if (typeof schema.hooks === "function") return schema.hooks(actions);
  if (typeof schema.hooks === "object") return schema.hooks;
  return {}
};

const _createComponent = (factory: ComponentFactoryType, params: ICreateComponentParams): IComponent => {
  const props = params.props || _getProps(factory);
  const schema = _getComponentSchema({ props, factory });
  const actions: ActionsType = _getActions({ schema, props });
  const hooks = _getHooks({ schema, actions });


  schema.state?.watchState(() => mount());

  const beforeMount = (): void => hooks.beforeMount?.(); 
  const afterMount = (): void => hooks.afterMount?.(); 
  const beforeRender = (): void => hooks.beforeRender?.(); 
  const afterRender = (): void => hooks.afterRender?.(); 
  
  const mount = (): void => {
    const { state } = _getStateUtils(schema);
    const templateSchema = _getTemplate({ schema, state, actions });
    const componentElement = _clearElement(params.element as HTMLElement);
    const templateElement = _createTemplateElement(templateSchema);
    hooks.beforeRender?.(); 

    if (!templateElement) return;
    componentElement.insertAdjacentElement("beforeend", templateElement);
    hooks.afterRender?.(); 
  };

  const unmount = () => {
    hooks.unmount?.(); 
  };

  const setup = () => {};

  return {
    ...schema,
    element: params.element,
    selector: params.selector,
    beforeMount,
    afterMount,
    beforeRender,
    afterRender,
    mount,
    unmount,
    setup,
    props,
  };
};

export const render = (
  factory: factoryType,
  params: contextCallbackType,
  callback?: CallbackRenderType,
) => {
  const componentSelector = _getComponentSelector(factory.name);
  const componentElementRefs = _getComponentElementRefs(componentSelector, params.element);

  componentElementRefs.forEach((componentElement) => {
    const component = _createComponent(factory, {
      selector: componentSelector,
      element: componentElement,
      props: params.props,
    });

    component.beforeMount()
    component.mount();
    component.afterMount();

    const callbackParams = {
      element: component.element,
      props: component.props || null,
    };

    callback?.(callbackParams);
  });
};
