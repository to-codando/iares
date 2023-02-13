import { GenericObjectType, hooksType } from './types';
export interface IConfigApp {
    onMount: (context: Element, params?: GenericObjectType) => void;
}
export interface IApp {
    setup: (params: any) => void;
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
}
