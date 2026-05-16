export type PersonalityType =
  | 'STRAIGHT_SHOOTER'
  | 'ENERGETIC_TALKER'
  | 'QUIET_CHARMER'
  | 'ANALYTICAL_OBSERVER'
  | 'HEART_COLLECTOR'
  | 'STAGE_SETTER';

export const PERSONALITY_LABEL: Record<PersonalityType, string> = {
  STRAIGHT_SHOOTER: '직진 본능파',
  ENERGETIC_TALKER: '불꽃 토커',
  QUIET_CHARMER: '조용한 매력파',
  ANALYTICAL_OBSERVER: '분석적 관찰자',
  HEART_COLLECTOR: '하트 수집가',
  STAGE_SETTER: '분위기 메이커',
};
