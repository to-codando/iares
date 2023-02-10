import { GenericObjectType } from './types';
export interface IConfigApp {
    onMount: (context: HTMLElement, params?: GenericObjectType) => void;
}
export interface IApp {
    setup: (params: any) => void;
    mount: (context: HTMLElement) => void;
    unmount: (context: HTMLElement) => void;
}
export interface IHTM {
    type: any;
    props: any;
    children: any;
}
