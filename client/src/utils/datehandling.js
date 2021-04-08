const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const daysInWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export const dateJSONToString = (date) => {
  console.log("ddatee");
  console.log(date);

  let d = new Date(date);
  try {
    return `${daysInWeek[d.getDay()]}, ${
      monthNames[d.getMonth()]
    } ${d.getDate()}, ${d.getFullYear()} ${
      (d.getHours() < 10 ? "0" : "") + d.getHours()
    }:${(d.getMinutes() < 10 ? "0" : "") + d.getMinutes()} `;
  } catch {
    return "Date error";
  }
};

export const formatTime = (hours, minutes) =>
  `${hours.padStart(2, "0")}:${minutes.padStart(2, "0")}`;
