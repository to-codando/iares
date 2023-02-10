import { GenericObjectType } from './types';
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
}
export interface IComponent {
    setup: (params: any) => void;
    mount: () => void;
    unmount: () => void;
    element: Element;
    selector: string;
    template: (params: GenericObjectType) => GenericObjectType;
    actions?: (params: GenericObjectType) => GenericObjectType;
    styles?: (params: GenericObjectType) => string;
    hooks?: (params: any) => void;
    state?: GenericObjectType;
}
