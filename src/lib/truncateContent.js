export const truncateContent = (content, wordLimit) => {
  const words = content.split(' ');
  if (words.length <= wordLimit) {
    return content;
  }
  return words.slice(0, wordLimit).join(' ') + '...';
};
