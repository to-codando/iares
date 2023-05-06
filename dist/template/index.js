import htm from "htm";
const css = (tags, ...values) => {
    return tags
        .map((tag, index) => {
        return `${tag}${values[index] || ""}`;
    })
        .join("");
};
function h(type, props, ...children) {
    return { type, props, children };
}
const html = htm.bind(h);
export { html, css };
//# sourceMappingURL=index.js.map