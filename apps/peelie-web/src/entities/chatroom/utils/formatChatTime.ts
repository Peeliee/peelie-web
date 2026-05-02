export function formatChatTime(iso: string): string {
  const date = new Date(iso);
  const hour = date.getHours();
  const minute = date.getMinutes().toString().padStart(2, '0');
  const ampm = hour < 12 ? '오전' : '오후';
  const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
  return `${ampm} ${displayHour}:${minute}`;
}
