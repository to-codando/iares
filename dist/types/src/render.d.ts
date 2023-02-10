import { GenericObjectType } from './types';
declare type factoryTye = () => GenericObjectType;
export declare const render: (factory: factoryTye, context: HTMLElement, options: GenericObjectType) => void;
export {};
