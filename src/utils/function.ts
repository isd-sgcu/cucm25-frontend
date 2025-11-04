export function convertDateToDateString(date: Date) {
  const thaiDate = date.toLocaleDateString("th-TH", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const time = date.toLocaleTimeString("th-TH", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return `${time} น. ${thaiDate}`;
}

export function formatDateTime(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleString("th-TH", {
    year: "2-digit",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}