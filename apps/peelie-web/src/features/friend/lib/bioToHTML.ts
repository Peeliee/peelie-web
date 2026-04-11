export const bioToHTML = (bio: { text: string; bold: boolean }[]): string => {
  return bio
    .map((segment) =>
      segment.bold ? `<span class="text-title-subhead-3">${segment.text}</span>` : segment.text,
    )
    .join('');
};
