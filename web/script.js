function getDate(){
    let currentDate = new Date();
    currentDate.getDay
    return currentDate
}

let options = { day: 'numeric', month: 'numeric', year: 'numeric' };
const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
let timeGod = getDate()

document.getElementById("weather-status").innerText = "Raining"
document.getElementById("date-text").innerText = timeGod.toLocaleDateString('it-IT', options);
document.getElementById("day-time-text").innerText = weekday[timeGod.getDay()] + " - " + timeGod.getHours() + ":" + timeGod.getMinutes()