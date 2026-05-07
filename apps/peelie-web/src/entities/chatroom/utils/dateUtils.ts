const DAY_LABELS = ['일', '월', '화', '수', '목', '금', '토'];

export function formatDateLabel(iso: string): string {
  const date = new Date(iso);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const dayLabel = DAY_LABELS[date.getDay()];
  return `${year}년 ${month}월 ${day}일 (${dayLabel})`;
}

export function isSameDay(isoA: string, isoB: string): boolean {
  const a = new Date(isoA);
  const b = new Date(isoB);
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}
