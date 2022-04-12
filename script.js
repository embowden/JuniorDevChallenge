// 1. Longest Sequence

longestSequence = (string) => {
  //split the array into array of strings
  string = string.toLowerCase();
  let newArray = [];
  let letters = "";
  for (let i = 0; i < string.length; i++) {
    if (string[i] === string[i - 1]) {
      letters = letters + string[i - 1];
    } else {
      newArray.push(letters);
      letters = string[i];
    }
  }
  newArray.push(letters);
  //get the new array and sort it alpahebetically, then reverse
  let sortedArray = newArray.sort().reverse();
  //reduce the array to find the longest string and return an object literal
  let longest = sortedArray.reduce(function (a, b) {
    return a.length > b.length ? a : b;
  });
  return { [longest[0]]: longest.length };
};

console.log(longestSequence("aBBBbddEEEpppl")); // {b: 4}
console.log(longestSequence("zzZzzAAAbdfAAAa")); // {z: 5}

// 2. Savings Account Balance

const balance = (
  openingSum,
  interestRate,
  taxFreeLimit,
  taxRate,
  numMonths
) => {
  //loop for each month
  for (i = 0; i < numMonths; i++) {
    //calculate the monthly interest
    let gains = openingSum * (interestRate / 100);
    // check if the opening balance is greater than the tax free limit
    // if it is, calculate the taxable amount
    let taxableAmount = 0;
    if (openingSum > taxFreeLimit) {
      taxableAmount = openingSum - taxFreeLimit;
    }
    //calculate the total tax as a percentage of the taxable amount
    let totalTax = taxableAmount * (taxRate / 100);
    //get the balance for the end of the month
    let finalBalance = openingSum + gains - totalTax;
    //set the next months opening sum as the last months final balance
    openingSum = finalBalance;
  }
  return openingSum;
};

console.log(balance(10000, 1, 20000, 1, 2)); // 10201
console.log(balance(30000, 1, 20000, 1, 5)); // 31000

// 3. Recursive Reverse String

const reverseString = (string) => {
  if (string === "") return "";
  else return reverseString(string.slice(1)) + string.charAt(0);
};

// the charAt() method returns a new string consisting of the single unit
// e.g. "hippopotamus".charAt(0); returns "h"

// the slice() method returns a shallow copy of a portion
// of an array into a new array
// e.g. "hippopotamus".slice(1) returns ipppopotamus

// The depth of the recursion is equal to the length of the string
// The function will continously call itself until this is no longer true

// Could have used .substr() but it's no longer recommended

console.log(reverseString("hippopotamus")); // sumatopoppih

// 4. Time Class

class Time {
  constructor(hours, minutes, seconds) {
    this.hours = hours;
    this.minutes = minutes;
    this.seconds = seconds;
  }
  //normalise the time and calculate if any overflow occurs in seconds, minutes or hours,
  // then add the overflow where appropriate
  normalise() {
    if (this.hours > 23) {
      let days = Math.floor(this.hours / 24);
      this.hours = this.hours - 24 * days;
    }
    if (this.minutes > 59) {
      let extraHours = Math.floor(this.minutes / 60);
      this.minutes = this.minutes - 60 * extraHours;
      this.hours = this.hours + extraHours;
    }
    if (this.seconds > 59) {
      let extraMins = Math.floor(this.seconds / 60);
      this.seconds = this.seconds - 60 * extraMins;
      this.minutes = this.minutes + extraMins;
    }
  }
  // add the number of seconds passed in then normalise the seconds
  scale(seconds) {
    this.seconds = this.seconds + seconds;
    this.normalise();
  }
  timeString() {
    this.normalise();
    // Unfortunately this seemed to be the only way I could figure out how to get the leading 0s,
    // I'm sure there is a much better way to do this and would love to know how!
    let date = new Date(
      Date.UTC(2012, 11, 20, this.hours, this.minutes, this.seconds)
    );
    let options = {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    };
    return `"${new Intl.DateTimeFormat("en-UK", options).format(date)}"`;
    //I have commented out the return below which will avoid the date formatting above
    //and will return as "3:40:20" if using the example below in the console.log -- 
    // return `"${this.hours}:${this.minutes}:${this.seconds}"`;
  }
}

let t = new Time(3, 40, 20);
console.log(t.timeString()); // "03:40:20"
t.scale(400);
console.log(t.timeString()); // "03:47:00"
