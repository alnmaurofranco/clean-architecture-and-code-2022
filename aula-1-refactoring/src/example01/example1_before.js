// calculate ride

// exports.calc = function (distance, date) {
//   const tenHoursAtNight = 22;
//   const isOvernight = date.getHours() >= tenHoursAtNight;
//   const isSunday = date.getDay() === 0;
//   if (isOvernight) {
//     return distance * 3.9;
//   }
//   if (isSunday) {
//     return distance * 2.9;
//   }
//   return distance * 2.1;
// };

exports.calc = function (dist, d) {
  // overnight
  if (d.getHours() >= 22) {
    return dist * 3.9;
  } else {
    // sunday
    if (d.getDay() === 0) {
      return dist * 2.9;
    } else {
      return dist * 2.1;
    }
  }
};
