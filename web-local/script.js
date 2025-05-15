//SETUP
const main = document.querySelector("main")
const popup_wrapper = document.getElementById("popup-wrapper")
const popup_div = document.getElementById("popup-div")
const popup_psw = document.getElementById("popup-psw")

const antenna_animation = document.getElementById("antenna-animation")

const loading_popup_div = document.getElementById("loading-popup-div")

const align_popup_wrapper = document.getElementById("align-popup-wrapper")
const align_popup_div = document.getElementById("align-popup-div")

const from_input = document.getElementById("from-input")
const to_input = document.getElementById("to-input")
const for_input = document.getElementById("for-input")
const after_input = document.getElementById("after-input")

//BTNS
const align_btn = document.getElementById("align-antenna-btn")
const popup_btn = document.getElementById("popup-btn") 
const setup_btns = document.querySelectorAll(".setup-btns")
const send_cmmd_btn = document.getElementById("send-cmmd-btn")
const n2yo_btn = document.getElementById("n2yo-logo")

//RAW data
const light_RAW_var = document.getElementById("light-RAW-var")
const rain_RAW_var = document.getElementById("rain-RAW-var")
const wind_RAW_var = document.getElementById("wind-RAW-var")

//GENERAL data
const AA_var = document.getElementById("AA-var")
const AD_var = document.getElementById("AD-var")
const POST_var = document.getElementById("POST-var")

const rain_var = document.getElementById("rain-var")
const haveJob = document.getElementById("JOB-var")

POST_var.innerText = "true"
AD_var.innerHTML = "counter clock-wise"

//VARS
var selectedCmmd;
let weatherData;

setInterval(() => {
    getGeneral();
    getWeather();
}, 2000)

setup_btns.forEach((btn) => {
    btn.addEventListener("click",() => {
        selectedCmmd = btn.id
        popup_wrapper.style.display = "flex"
        popup_div.style.display = "flex"
        setTimeout(() => {
            popup_wrapper.style.backdropFilter = "blur(5px) brightness(90%)" 
            popup_div.style.opacity = "100%"
        }, 30)
    })
})

popup_btn.addEventListener("click", async () => {
    var psw = popup_psw.value
    if(psw){
        if(selectedCmmd){
            console.log(selectedCmmd)
            console.log(popup_psw.value)
            popup_psw.value = ""
            let output = String(await ReqMaker(`pswReq/${psw}`)).trim()
            //let output = "true"
            if (output == "true"){
                if(selectedCmmd == "align-antenna-btn"){
                    popup_div.style.display = "none"
                    align_popup_div.style.display = "none"    
                    align_popup_div.style.display = "flex"
                    setTimeout(() => {
                        align_popup_div.style.opacity = "100%"
                    }, 30)

                }
                else if(selectedCmmd == "align-north-btn"){
                    alignAntennaTo0() // <-- should continue to run commands after since is async, check though
                    showLoading()
                }
                
            }
            else{
                alert("Password not correct, redirecting to index.htm");
                location.href = ""
            }
        }
    }
})

send_cmmd_btn.addEventListener("click",async () => {
    let from_value = Math.abs(from_input.value)
    let to_value = Math.abs(to_input.value)
    let for_value = Math.abs(for_input.value)
    let after_value = Math.abs(after_input.value)

    if(from_value != "" && to_value != "" && for_value != "" && after_value != ""){
        if(from_value == to_value){
            alert("error: from_value = to_value")
            location.href = ""
        } 
        else if(for_value == 0){
            alert("error: for_value = 0")
            location.href = ""
        }
        else if(from_value.toString().length > 3 || to_value.toString().length > 3 || from_value > 360 || to_value > 360 || for_value == 0 || for_value > 9999 || after_value > 9999){
            alert("error: invalid inputs")
            location.href = ""
        }
        else {
            // ->  /359/360/9999/9999 biggest alignCmmd, do not overflow
            console.log(`alignCmmd/${from_value}/${to_value}/${for_value}/${after_value}`) // delete that after testing
            let output = await ReqMaker(`alignCmmd/${from_value}/${to_value}/${for_value}/${after_value}`)
            
            
            //manage output
            align_popup_div.style.display = "none"
            showLoading()
            console.log(output)
        }
    }



})

n2yo_btn.addEventListener("click", () => {
    window.open("https://www.n2yo.com", "_blank")
})


async function ReqMaker(request){
    var SRCSRequest = new XMLHttpRequest();
    SRCSRequest.open("GET", request, false);
    SRCSRequest.send();

    if (SRCSRequest.status === 200 && SRCSRequest.responseText !== null) {
        return SRCSRequest.responseText;
    }
}

function getWeather(){
    var SRCSRequest = new XMLHttpRequest();
    SRCSRequest.onreadystatechange = function()
    {
    if(this.readyState == 4 && this.status == 200 && this.responseText != null)
    {
        //expected input = "[1.00,2.00,3.00,4.00,5.00]"
        weatherData = this.responseText.substring(1,this.responseText.length-3).split(",")

        document.getElementById("temperature-var").innerHTML = weatherData[0];
        document.getElementById("humidity-var").innerHTML = weatherData[1];

        light_RAW_var.innerHTML = weatherData[2]    
        document.getElementById("light-var").innerHTML = weatherData[2];    //format

        wind_RAW_var.innerHTML = weatherData[3]
        document.getElementById("wind-var").innerHTML = weatherData[3];     //format 

        let value = weatherData[4]
        rain_RAW_var.innerHTML = value
        rain_var.style.color = ""

        if (value >= 1020){
            rain_var.innerHTML = "Clear sky";
        } else if(value >= 800 && value < 1020){
            rain_var.innerHTML = "Some droplets";
        } else if(value >= 600 && value < 800){
            rain_var.innerHTML = "It's raining";
        } else if(value >= 50 && value < 600){
            rain_var.innerHTML = "Heavy raining";
        } else if(value >= 0 && value < 50){
            rain_var.innerHTML = "Metal on sensor";
            rain_var.style.color = "red"
        }

        //MRC
    }
    };
    SRCSRequest.open("GET", "getWeather", true);
    SRCSRequest.send();
}

function getGeneral(){
    var SRCSRequest = new XMLHttpRequest();
    SRCSRequest.onreadystatechange = function()
    {
    if(this.readyState == 4 && this.status == 200 && this.responseText != null)
    {
        //Expected input "100.23,false,1"
        var data = this.responseText.trim()
        data = data.split(",")

        AA_var.innerHTML = data[0]
        antenna_animation.style.transform = `rotate(${Number(data[0])}deg)`

        if(Number(data[2]) == 1){
            AD_var.innerHTML = "counter clock-wise"
        } else if (Number(data[2]) == -1){
            AD_var.innerHTML = "clockwise"
        } else{
            alert(isClockwise)
        }

        haveJob.innerHTML = data[1]


    }
    };
    SRCSRequest.open("GET", "readGENERAL", true);
    SRCSRequest.send();
}

function alignAntennaTo0(){
    var SRCSRequest = new XMLHttpRequest();
    SRCSRequest.onreadystatechange = function()
    {
        if(this.readyState == 4 && this.status == 200 && this.responseText != null)
        {
            //Antenna-algned,isClockwise:-1
            alert("Antenna aligned to N.")
            hideLoading()
            let isClockwise = this.responseText.split(":")
            if(isClockwise[1].trim() == "1"){
                AD_var.innerHTML = "counter clock-wise"
            }
            else if(isClockwise[1].trim() == "-1"){
                AD_var.innerHTML = "clock-wise"
            } else
            {
                console.error(isClockwise, " error isClockwise")
            }
            hideLoading()
        }
    };
    SRCSRequest.open("GET", "alignAntennaTo0", true); 
    SRCSRequest.send();
}

function showLoading(){
    popup_wrapper.style.cursor = "wait"
    popup_div.style.display = "none"    
    loading_popup_div.style.display = "flex"
    setTimeout(() => {
        loading_popup_div.style.opacity = "100%"
    }, 30)
}

function hideLoading(){
    loading_popup_div.style.opacity = "0%"
    setTimeout(() => {
        loading_popup_div.style.display = "none"
    }, 30)
    popup_wrapper.style.display = "none"
    popup_wrapper.style.cursor = "default"
}