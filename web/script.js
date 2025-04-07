function getDate(){
    let currentDate = new Date();
    currentDate.getDay
    return currentDate
}

const time_text =  document.getElementById("day-time-text")
const main = document.querySelector("main")
const body = document.querySelector("body")
const NOAA_div = document.getElementById("NOAA-div")

let options = { day: 'numeric', month: 'numeric', year: 'numeric' };
const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
let timeGod = getDate()
let dayIndex = timeGod.getDay()

body.style.backgroundImage = "url('img/rain.webp')";

document.getElementById("weather-status").innerText = "Raining"
document.getElementById("date-text").innerText = timeGod.toLocaleDateString('it-IT', options);
function updateTime(){
    time_text.innerText = weekday[dayIndex] + " - " + getDate().getHours() + ":" + getDate().getMinutes()
}
updateTime()

setInterval(updateTime, 15000)      //update time every 35 sec

document.getElementById("temperature-status").innerText = "13"
document.getElementById("humidity-status").innerText = "67"
document.getElementById("light-status").innerText = "600"
document.getElementById("recap-text").innerText = "The continuous downpour throughout the morning led to challenging conditions for commuters, as the wet and slippery roads required drivers to exercise increased caution. Pedestrians, too, navigated the streets carefully, using umbrellas and raincoats to shield themselves from the relentless rainfall."

NOAA_div.addEventListener("click",() => {
    main.style.opacity = "0%"
    main.style.transform = "TranslateX(-100vw)"
    NOAA_div.style.transform = "TranslateX(-100vw)"
    setTimeout(()=>{main.style.display = "none"}, 700)
})

const NOAA_btn = document.getElementById("NOAA-login-btn");
const NOAA_user = document.getElementById("user-login");
const NOAA_psw = document.getElementById("psw-login");

NOAA_btn.addEventListener("click", () => {
    var username = NOAA_user.value
    var pssw = NOAA_psw.value
    if(pssw != "" && username != ""){
        if(username == "sebs" && pssw == "12345678"){       //Make psw and user check better   
            console.log("LOGIN OK")
            location.href="NOAA.html"
        } else {
            console.log("not ok")
        }
    }
    NOAA_psw.value = ""
    NOAA_user.value = ""
})
