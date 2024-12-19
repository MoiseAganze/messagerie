export function formatHourMinute(dateStr) {
  const dateObj = new Date(dateStr);

  // Extraire l'heure et les minutes
  const hours = dateObj.getUTCHours().toString().padStart(2, "0");
  const minutes = dateObj.getUTCMinutes().toString().padStart(2, "0");

  // Format final
  const time = `${hours}:${minutes}`;

  return time;
}
