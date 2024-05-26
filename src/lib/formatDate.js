export function formatDate(creationTime) {
  const date = new Date(creationTime);
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  };

  const formatter = new Intl.DateTimeFormat('es', options);
  const creationTimeEs = formatter.format(date);
  return creationTimeEs;
}
