function getDate(){
    let currentDate = new Date();
    currentDate.getDay
    return currentDate
}

const time_text =  document.getElementById("day-time-text")
const main = document.querySelector("main")
const NOAA_div = document.getElementById("NOAA-div")

let options = { day: 'numeric', month: 'numeric', year: 'numeric' };
const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
let timeGod = getDate()
let dayIndex = timeGod.getDay()

document.getElementById("weather-status").innerText = "Raining"
document.getElementById("date-text").innerText = timeGod.toLocaleDateString('it-IT', options);
function updateTime(){
    time_text.innerText = weekday[dayIndex] + " - " + getDate().getHours() + ":" + getDate().getMinutes()
}
updateTime()

setInterval(updateTime, 15000)      //update time every 35 sec

document.getElementById("temperature-status").innerText = "13"

NOAA_div.addEventListener("click",() => {
    main.style.opacity = "0%"
    main.style.transform = "TranslateX(-100vw)"
    NOAA_div.style.transform = "TranslateX(-100vw)"
    setTimeout(()=>{main.style.display = "none"}, 700)
})