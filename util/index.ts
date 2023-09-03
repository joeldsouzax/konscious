export function parseTime(time: string) {
  let timeInt = parseInt(time);
  let minutes = time.substring(3, 5);

  // you could then add or subtract time here as needed

  if (time > "12:00") {
    return `${timeInt - 12}:${minutes} PM`;
  } else {
    return `${timeInt}:${minutes} AM`;
  }
}
