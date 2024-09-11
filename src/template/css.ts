const css = (tags: TemplateStringsArray, ...values: []): string => {
  return tags
    .map((tag: string, index: number) => {
      return `${tag}${values[index] || ""}`;
    })
    .join("");
};


export { css };
