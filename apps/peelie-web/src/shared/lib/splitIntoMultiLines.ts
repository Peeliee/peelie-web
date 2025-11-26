export const splitIntoMultiLines = (text: string, maxLen = 18) => {
  if (!text) return text;

  // 글자수 기준으로 강제 줄나누기
  const words = text.split(' ');
  const lines: string[] = [];
  let current = '';

  for (const w of words) {
    if ((current + ' ' + w).trim().length > maxLen) {
      lines.push(current.trim());
      current = w;
    } else {
      current += ' ' + w;
    }
  }
  if (current) lines.push(current.trim());

  // 줄이 1줄이면 그대로
  if (lines.length <= 1) return lines.join('\n');

  // 줄이 2줄이면 길이 맞추기
  if (lines.length === 2) {
    const len1 = lines[0].length;
    const len2 = lines[1].length;

    if (Math.abs(len1 - len2) > 8) {
      // 2줄을 다시 균등 분배
      return evenlySplit(text, 2);
    }
    return lines.join('\n');
  }

  // 줄이 3줄 이상이면 2줄 또는 3줄로 균등 재분할
  if (lines.length >= 3) {
    // 총 길이에 따라 2줄 혹은 3줄로 재분배
    if (text.length <= maxLen * 2.2) {
      return evenlySplit(text, 2); // 두 줄로 압축
    } else {
      return evenlySplit(text, 3); // 세 줄로 재배치
    }
  }

  return lines.join('\n');
};

// 균등 분배 헬퍼
const evenlySplit = (text: string, parts: number) => {
  const totalLength = text.length;
  const partSize = Math.floor(totalLength / parts);

  const breaks: number[] = [];

  for (let i = 1; i < parts; i++) {
    const target = partSize * i;

    // target 근처 공백 탐색
    let bp = text.indexOf(' ', target);
    if (bp === -1 || bp > target + 10) {
      bp = text.lastIndexOf(' ', target);
    }
    if (bp === -1) bp = target;

    breaks.push(bp);
  }

  const result: string[] = [];
  let start = 0;
  for (const bp of breaks) {
    result.push(text.slice(start, bp).trim());
    start = bp + 1;
  }
  result.push(text.slice(start).trim());

  return result.join('\n');
};
