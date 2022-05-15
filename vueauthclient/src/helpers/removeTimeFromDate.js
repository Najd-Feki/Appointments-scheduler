function removeTimeFromDate(date = new Date()) {
  date.setHours(0, 0, 0, 0);

  // ✅ Format a date to YYYY-MM-DD (or any other format)
  function padTo2Digits(num) {
    return num.toString().padStart(2, "0");
  }

  function formatDate(date) {
    return [
      date.getFullYear(),
      padTo2Digits(date.getMonth() + 1),
      padTo2Digits(date.getDate())
    ].join("/");
  }
  return formatDate(date);
}
export default removeTimeFromDate;
