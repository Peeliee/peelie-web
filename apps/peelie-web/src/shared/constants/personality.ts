export const PersonalityType = {
  STRAIGHT_SHOOTER: 'STRAIGHT_SHOOTER',
  ENERGETIC_TALKER: 'ENERGETIC_TALKER',
  QUIET_CHARMER: 'QUIET_CHARMER',
  ANALYTICAL_OBSERVER: 'ANALYTICAL_OBSERVER',
  HEART_COLLECTOR: 'HEART_COLLECTOR',
  STAGE_SETTER: 'STAGE_SETTER',
} as const;

export type PersonalityType = (typeof PersonalityType)[keyof typeof PersonalityType];

export const PERSONALITY_LABEL: Record<PersonalityType, string> = {
  [PersonalityType.STRAIGHT_SHOOTER]: '직진 본능파',
  [PersonalityType.ENERGETIC_TALKER]: '불꽃토커',
  [PersonalityType.QUIET_CHARMER]: '조용한호감캐',
  [PersonalityType.ANALYTICAL_OBSERVER]: '뇌풀가동 분석파',
  [PersonalityType.HEART_COLLECTOR]: '속마음 수집가',
  [PersonalityType.STAGE_SETTER]: '판깔기 전문가',
};

export const PERSONALITY_OPTIONS = Object.values(PersonalityType).map((value) => ({
  value,
  label: PERSONALITY_LABEL[value],
}));
