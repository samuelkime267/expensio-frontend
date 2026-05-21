export function formatDateTime(dateInput: Date) {
  const date = new Date(dateInput);

  const formattedDate = [
    String(date.getDate()).padStart(2, "0"),
    String(date.getMonth() + 1).padStart(2, "0"),
    String(date.getFullYear()).slice(-2),
  ].join("-");

  const formattedTime = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return {
    date: formattedDate,
    time: formattedTime,
  };
}
