export type TaggedStyle = (
  strings: TemplateStringsArray,
  ...interpolations: (string | number)[]
) => string;
