const css = (tags, ...values) => {
    return tags
        .map((tag, index) => {
        return `${tag}${values[index] || ""}`;
    })
        .join("");
};
export { css };
//# sourceMappingURL=css.js.map