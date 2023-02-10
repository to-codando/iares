import { GenericObjectType, watcherStateType } from './types';
export declare const createState: () => {
    setState: (payload: GenericObjectType) => void;
    getState: () => GenericObjectType;
    watchState: (handler: watcherStateType) => watcherStateType;
};
