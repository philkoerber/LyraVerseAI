function formatDateString(dateString) {
        

  const dateObj = new Date(dateString);

  // Function to pad single-digit numbers with leading zeros
  const pad = (num) => (num < 10 ? "0" + num : num);

  // Formatting the date to a more readable format (e.g., "August 1, 2023 05:27:59 AM")
  const formattedDate = `${dateObj.toLocaleString("en-US", {
    month: "long",
  })} ${dateObj.getUTCDate()}, ${dateObj.getUTCFullYear()} ${pad(
    dateObj.getUTCHours()
  )}:${pad(dateObj.getUTCMinutes())}:${pad(dateObj.getUTCSeconds())} ${
    dateObj.getUTCHours() >= 12 ? "PM" : "AM"
  }`;

  return formattedDate;
}

export default formatDateString