// 문장을 . ! ? 단위로 \n 을 하는 유틸
export const splitSentences = (text: string) => {
  return text
    .split(/(?<=[.!?])/g)
    .map((s) => s.trim())
    .filter(Boolean)
    .join('\n');
};