import htm from 'htm';
function h(type, props, ...children) {
    return { type, props, children };
}
const html = htm.bind(h);
export { html };
//# sourceMappingURL=html.js.map