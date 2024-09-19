// Map the fetched data to table rows
export function calculatePeriod(startTime, endTime) {
  const start = new Date(`1970-01-01T${startTime}Z`);
  const end = new Date(`1970-01-01T${endTime}Z`);

  const diff = Math.abs(end - start); // Difference in milliseconds

  // Convert milliseconds to hours and minutes
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));



  // Return the formatted period and time range
  return `${hours}h ${minutes}m`;
}
export function formatTimeTo12Hour(timeString) {
    // Split the input time string to get hours, minutes, and seconds
    const [hourStr, minuteStr] = timeString.split(':');
    
    // Convert hours and minutes to numbers
    let hours = parseInt(hourStr, 10);
    const minutes = parseInt(minuteStr, 10);
    
    // Determine AM or PM
    const ampm = hours >= 12 ? 'PM' : 'AM';
    
    // Convert hours to 12-hour format
    hours = hours % 12 || 12; // '0' hour should be '12'
    
    // Format minutes with leading zero if necessary
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    
    return `${hours}:${formattedMinutes} ${ampm}`;
  }
