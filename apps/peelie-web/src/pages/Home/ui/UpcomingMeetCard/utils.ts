import { PERSONALITY_LABEL } from '@/shared/constants/personality';
import type { Schedule } from '@/entities/schedule/model/schedule.type';

import type { Meet } from './types';

const WEEKDAY_LABELS = ['일', '월', '화', '수', '목', '금', '토'] as const;
const MS_PER_DAY = 1000 * 60 * 60 * 24;

export function toMeet(schedule: Schedule): Meet {
  return {
    id: schedule.id,
    date: schedule.meetDate,
    title: schedule.description,
    friend: {
      id: schedule.friendUser.id,
      name: schedule.friendUser.name,
      type: PERSONALITY_LABEL[schedule.friendUser.personality],
    },
  };
}

export function formatMeetDate(iso: string): string {
  const date = new Date(iso);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const weekday = WEEKDAY_LABELS[date.getDay()];
  return `${month}월 ${day}일(${weekday})`;
}

export function isToday(iso: string): boolean {
  const target = new Date(iso);
  target.setHours(0, 0, 0, 0);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return target.getTime() === today.getTime();
}

export function getDday(iso: string): string {
  const target = new Date(iso);
  target.setHours(0, 0, 0, 0);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const diff = Math.round((target.getTime() - today.getTime()) / MS_PER_DAY);
  if (diff === 0) return 'D-day';
  if (diff > 0) return `D-${diff}`;
  return `D+${-diff}`;
}
