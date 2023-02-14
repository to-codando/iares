import { ComponentFactoryType, EventBusType, GenericObjectType, contextCallbackType, hooksType } from './types';
export interface IConfigApp {
    onMount: (context: Element, params?: GenericObjectType) => void;
}
export interface IApp {
    setup: (params: GenericObjectType) => void;
    mount: (context: Element) => void;
    unmount: (context: Element) => void;
}
export interface IHTM {
    type: any;
    props: any;
    children: any;
}
export interface ICreateComponentParams {
    element: Element;
    selector: string;
    props: GenericObjectType | null;
}
export interface IComponent {
    setup: (params: GenericObjectType) => void;
    mount: () => void;
    unmount: () => void;
    beforeMount: () => void;
    afterMount: () => void;
    beforeRender: () => void;
    afterRender: () => void;
    element: Element;
    selector: string;
    template: (params: GenericObjectType) => GenericObjectType;
    actions?: (params: GenericObjectType) => GenericObjectType;
    styles?: (params: GenericObjectType) => string;
    hooks?: (params: hooksType) => void;
    state?: GenericObjectType;
    props?: GenericObjectType | null;
    eventDrive: EventBusType;
}
export interface IMountComponentParam {
    component: ComponentFactoryType;
}
export interface IRoute {
    regex: RegExp;
    default?: string;
    start?: string;
    isActive?: boolean;
    mount: (context?: Element | null) => IMountComponentParam;
}
export interface IRouteConfig {
    routes: IRoute[];
    context: contextCallbackType;
}
export interface IRouteKey {
    key: string;
}
