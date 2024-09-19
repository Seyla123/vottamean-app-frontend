// Map the fetched data to table rows
export function calculatePeriod(startTime, endTime) {
  const start = new Date(`1970-01-01T${startTime}Z`);
  const end = new Date(`1970-01-01T${endTime}Z`);

  const diff = Math.abs(end - start); // Difference in milliseconds

  // Convert milliseconds to hours and minutes
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

  // Format the start and end times to AM/PM
  const formattedStart = formatTimeTo12Hour(start);
  const formattedEnd = formatTimeTo12Hour(end);

  // Return the formatted period and time range
  return {
    period: `${hours}h ${minutes}m`,
    formattedStart,
    formattedEnd,
  };
}

export function formatTimeTo12Hour(date) {
  let hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';

  hours = hours % 12;
  hours = hours ? hours : 12; // Hour '0' should be '12'
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  return `${hours}:${formattedMinutes} ${ampm}`;
}
