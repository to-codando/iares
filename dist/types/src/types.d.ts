export declare type GenericObjectType = {
    [key: string]: any;
};
export declare type CallbackRenderType = (context: Element) => void;
export declare type watcherStateType = (payload: GenericObjectType) => any;
export declare type StateType = {
    setState: (payload: GenericObjectType) => void;
    getState: () => GenericObjectType;
    watchState: (handler: watcherStateType) => watcherStateType;
};
export declare type HTMType = {
    type: string;
    props: GenericObjectType | null;
    children: Array<string> | Array<HTMType>;
};
export declare type GenericComponentType = {
    template: (params: GenericObjectType) => HTMType;
    actions?: (params: GenericObjectType) => GenericObjectType;
    styles?: (params: GenericObjectType) => string;
    hooks?: (params: any) => void;
    state?: StateType;
};
export declare type factoryType = () => GenericComponentType;
export declare type ComponentFactoryType = (params?: GenericObjectType) => GenericComponentType;
export declare type ChildrenNodeType = Array<string> | Array<HTMType>;
export declare type TemplateElementType = Element | null;
