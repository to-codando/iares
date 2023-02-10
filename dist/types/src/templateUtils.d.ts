import { IHTM } from './interfaces';
declare const css: (tags: any[], ...values: any[]) => string;
declare const html: (strings: TemplateStringsArray, ...values: any[]) => IHTM | IHTM[];
export { html, css };
