/**
 * @fileoverview className string literal의 한 줄당 클래스 개수가 threshold를 넘으면 warn
 */

/**
 * 문자열에서 줄 단위로 클래스 개수를 세고, 가장 많은 줄의 개수를 반환
 * @param {string} str
 * @returns {number}
 */
function countMaxClassesPerLine(str) {
  const lines = str.split('\n');
  let max = 0;
  for (const line of lines) {
    const count = line.trim().split(/\s+/).filter(Boolean).length;
    if (count > max) max = count;
  }
  return max;
}

/**
 * className 값 노드에서 string literal을 추출
 * @param {import('estree').Node | null} valueNode
 * @returns {{ str: string, literalNode: import('estree').Node } | null}
 */
function extractStringLiteral(valueNode) {
  if (!valueNode) return null;

  // Shape A: className="foo bar"
  if (valueNode.type === 'Literal' && typeof valueNode.value === 'string') {
    return { str: valueNode.value, literalNode: valueNode };
  }

  // Shape B: className={"foo bar"}
  if (valueNode.type === 'JSXExpressionContainer') {
    const expr = valueNode.expression;
    if (expr.type === 'Literal' && typeof expr.value === 'string') {
      return { str: expr.value, literalNode: expr };
    }
  }

  return null;
}

export default {
  meta: {
    type: 'suggestion',
    schema: [
      {
        type: 'object',
        properties: {
          maxClasses: { type: 'integer', minimum: 1 },
        },
        additionalProperties: false,
      },
    ],
    messages: {
      tooMany:
        'className has a line with {{count}} classes (max {{max}} per line).',
    },
  },

  create(context) {
    const { maxClasses = 5 } = context.options[0] ?? {};

    return {
      JSXAttribute(node) {
        if (node.name.name !== 'className') return;
        if (node.value === null) return;

        const result = extractStringLiteral(node.value);
        if (!result) return;

        const count = countMaxClassesPerLine(result.str);
        if (count > maxClasses) {
          context.report({
            node: result.literalNode,
            messageId: 'tooMany',
            data: { count: String(count), max: String(maxClasses) },
          });
        }
      },
    };
  },
};
