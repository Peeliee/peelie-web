export const splitIntoTwoLines = (text: string) => {
  const length = text.length;
  const mid = Math.floor(length / 2);

  // mid 기준으로 가장 가까운 공백 찾기
  let breakPoint = text.indexOf(' ', mid);
  if (breakPoint === -1) {
    breakPoint = text.lastIndexOf(' ', mid);
  }

  if (breakPoint === -1) return text;

  return text.slice(0, breakPoint) + '\n' + text.slice(breakPoint + 1);
};
