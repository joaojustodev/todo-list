export function formatDate(date: Date) {
  const parseDate = new Date(date);

  return parseDate.toLocaleString("pt-BR", {
    timeStyle: "short",
    dateStyle: "short",
  });
}
