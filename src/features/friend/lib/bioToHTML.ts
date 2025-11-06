export const bioToHTML = (bio: { text: string; bold: boolean }[]): string => {
  return bio
    .map((segment) =>
      segment.bold ? `<span class="body-1-bold">${segment.text}</span>` : segment.text,
    )
    .join('');
};
