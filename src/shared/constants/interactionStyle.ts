export const INTERACTION_STYLES = [
  {
    key: 'CAUTIOUS',
    title: '신중형',
    desc: '교류 전 충분한 관찰과 시간이 필요한 나는',
    scores: { 모험력: 25, 번개력: 25, OO력: 25 },
  },
  {
    key: 'BALANCED',
    title: '균형형',
    desc: '균형형에 대한 설명 균형형에 대한 설명',
    scores: { 모험력: 50, 번개력: 50, OO력: 50 },
  },
  {
    key: 'FAST',
    title: '빠른 연결형',
    desc: '빠른 연결형에 대한 설명 빠른 연결형에 대한 설명',
    scores: { 모험력: 75, 번개력: 75, OO력: 75 },
  },
  {
    key: 'UNKNOWN',
    title: '비정의',
    desc: '',
  },
] as const;

export const InteractionStyle = {
  CAUTIOUS: '신중형',
  BALANCED: '균형형',
  FAST: '빠른 연결형',
  UNKNOWN: '비정의',
} as const;

export type InteractionStyleKey = keyof typeof InteractionStyle;
export type InteractionStyleValue = (typeof InteractionStyle)[InteractionStyleKey];

export const InteractionStyleValueToKey = (value: InteractionStyleValue): InteractionStyleKey => {
  const found = Object.entries(InteractionStyle).find(([, v]) => v === value)?.[0];
  return (found as InteractionStyleKey) ?? 'UNKNOWN';
};
