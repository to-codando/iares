interface WrapStyleParams {
  style: string;
  selector: string;
}

const wrapLooseRulesOutsideMediaQuery = ({
  style,
  selector,
}: WrapStyleParams): string => {
  const lines = style.split("\n");
  const ruleRegex = /^\s*([\w-]+)\s*:\s*[^;]+;/;

  interface Accumulator {
    insideBlock: number;
    globalRules: string;
    result: string;
  }

  interface LineProcessing {
    globalRules: string;
    result: string;
  }

  const initialState: Accumulator = {
    insideBlock: 0,
    globalRules: "",
    result: "",
  };

  const processGlobalRules = (
    globalRules: string,
    result: string,
    selector: string,
  ): LineProcessing => ({
    globalRules: "",
    result: `${result}${selector} {\n${globalRules}}\n\n`,
  });

  const processRegularLine = (
    line: string,
    result: string,
  ): LineProcessing => ({
    globalRules: "",
    result: `${result}${line}\n`,
  });

  const addGlobalRule = (
    line: string,
    globalRules: string,
  ): LineProcessing => ({
    globalRules: `${globalRules}${line}\n`,
    result: "",
  });

  const countBlocks = (line: string): number => {
    const openings = (line.match(/{/g) || []).length;
    const closings = (line.match(/}/g) || []).length;
    return openings - closings;
  };

  const processLine = (acc: Accumulator, line: string): Accumulator => {
    acc.insideBlock += countBlocks(line);

    // Case 1: Line is a global rule
    if (acc.insideBlock === 0 && ruleRegex.test(line)) {
      const { globalRules, result } = addGlobalRule(line, acc.globalRules);
      return { ...acc, globalRules, result: acc.result + result };
    }

    // Case 2: There are accumulated global rules
    if (acc.globalRules) {
      const { globalRules, result } = processGlobalRules(
        acc.globalRules,
        acc.result,
        selector,
      );
      const processedLine = processRegularLine(line, "");
      return {
        ...acc,
        globalRules,
        result: result + processedLine.result,
      };
    }

    // Case 3: Regular line
    const { globalRules, result } = processRegularLine(line, acc.result);
    return { ...acc, globalRules, result };
  };

  const { result, globalRules } = lines.reduce(processLine, initialState);

  return globalRules
    ? `${result}${selector} {\n${globalRules}}\n`.trim()
    : result.trim();
};

const wrapLooseRulesInsideMediaQuery = ({
  style,
  selector,
}: WrapStyleParams): string => {
  const regex = /@media\s*([^{]+)\s*\{([\s\S]*?)\}/g;

  return style.replace(regex, (match, mediaQuery, innerCss) => {
    const rules = innerCss
      .trim()
      .split("\n")
      .map((line: string) => line.trim())
      .filter((line: string) => line);

    const wrappedRules = rules
      .map((rule: string) => `    ${selector} {\n        ${rule.trim()}\n    }`)
      .join("\n");

    return `@media ${mediaQuery.trim()} {\n${wrappedRules}\n}`;
  });
};

const applyClassNameScope = ({ style, selector }: WrapStyleParams): string => {
  const regex = /\.(\w+)/g;
  return style.replace(regex, `.${selector}_$1`);
};

export const transformStyle = (rawStyle: string, selector: string): string => {
  let style = rawStyle;
  const className = `.${selector}`;
  style = applyClassNameScope({ style, selector });
  style = wrapLooseRulesOutsideMediaQuery({ style, selector: className });
  style = wrapLooseRulesInsideMediaQuery({ style, selector: className });

  return style;
};
