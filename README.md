# SRCS - Satellite Receiver Control Station

The STM32F401RE based **Satellite RF signals reciver control station** for NOAA satellites to maximize receiving quality of weather satellites broadcasts to get local satellite's views images.
<h6>I definitely need a better name, By Sebs_</h6>

## Description
The control station is made primarely of 2 modules:
- The motorized antenna module : The **core** of the control station and the actual receiver, it's made of a [dipole antenna](https://en.wikipedia.org/wiki/Dipole_antenna) tuned at NOAA's frequencies in horizontal polarization connected to a [28BYJ-48](https://www.mouser.com/datasheet/2/758/stepd-01-data-sheet-1143075.pdf?srsltid=AfmBOor0JeeT5X12a_oRtEgDTfQxDhepoXjEc7EOESq1vM4Kv5rxR0na) stepper motor.
- The weather data module - The secondary part of the SRCS that gets weather data that will be analyzed by the [MCU](https://en.wikipedia.org/wiki/Microcontroller).

## 🛰️ NOAA's satellites

The NOAA ([National Oceanic Atmospheric Atministration](https://www.noaa.gov/)) is a US  agecy that studies how weather changes our planet, both on it's surface and under the seas. <br>
Other then other missions, it made a [campaign of polar-orbiting, non-geosynchronous, environmental satellites](https://www.n2yo.com/satellites/?c=4), from NOAA-1 up to NOAA-21. <br>
From all of those, the best and easiest one to receive are the NOAA-15, NOAA-18 and NOAA-19, which continously trasmit weather data with [APT](https://en.wikipedia.org/wiki/Automatic_picture_transmission) techniques on their downlink frequency as a "sound". <br>
Those "sounds" will eventually need to be converted into .WAV files and thed decoded with an apt-decoder, in our case we'll use [noaa-apt](https://noaa-apt.mbernardi.com.ar/)

<table>
<tr><td>Name</td><td>NORAD ID</td><td>Freq MHz</td></tr>
<tr><td>NOAA 15</td><td><a href="https://www.n2yo.com/satellite/?s=25338">25338</a></td><td>137.620</td></td></tr>
<tr><td>NOAA 18</td><td><a href="https://www.n2yo.com/satellite/?s=28654">28654</a></td><td>137.9125</td></tr>
<tr><td>NOAA 19</td><td><a href="https://www.n2yo.com/satellite/?s=33591">33591</a></td><td>137.1</td></tr>
</table>

## 1st Module: The motorized antenna

The first module is made of two parts, the **dipole antenna** and the **motorized support**:
- The dipole antenna is the effective receiver of the SRCS, it's a horizontally polazied, omnidirectional, **Vee dipole antenna** tuned at 137.5 MHz (average downlink     frequency of NOAA-15,18,19 *). <br>
  The antenna output will eventually be connected to a 50 ohm [RG58 coaxial cable](https://www.farnell.com/datasheets/2095749.pdf) that will transfer the output signal from the antenna to the [RTL-SDR](https://en.wikipedia.org/wiki/Software-defined_radio) or the general receiver that will, later on, analyze the signal and convert it in an image. <br>
  (See the [antenna](https://github.com/SebsIII/SRCS/blob/main/datasheets/antenna-info.md) MD file for more info)
  
- The motorized support is where the antenna is mounted and the part that will, indeed, **rotate** the antenna itself while the satellite is passing near the SRCS 
  to ensure the highest quality receiving of data reception of the dipole. <br>
  Its mainly composed of a [28BYJ-48 stepper motor](https://www.mouser.com/datasheet/2/758/stepd-01-data-sheet-1143075.pdf?srsltid=AfmBOor0JeeT5X12a_oRtEgDTfQxDhepoXjEc7EOESq1vM4Kv5rxR0na), a **gear box** to reduce the motor speed and to reduce the minimum step angle to get the smallest angle of 
  rotation from the motor output chassis, an [AS5600 magnetic encoder](https://files.seeedstudio.com/wiki/Grove-12-bit-Magnetic-Rotary-Position-Sensor-AS5600/res/Magnetic%20Rotary%20Position%20Sensor%20AS5600%20Datasheet.pdf) the **antenna mount** and the **BNC wall-connector output** from the antenna
  
<h6>* The bandwidth of the 137.5 MHz dipole antenna offers enough bandwindth to get all the 137.1, 137.620 and 137.9125 MHz frequencies </h6>

## 2nd Module: Weather data Module

The second module is the weather monitor system, which is the part which goal is to gather weather data that will later on, be analyzed by the MCU. <br>
It's composed of various sensors, including: [DHT11]() for **temperature and humidity**, a light sensor, to gather **ambient light level** and an anemometer for **wind speed**. <br>
The combination of those data, will be used to **monitor and predict how currend and future weather is/will be**. <br>
Those info are necessary to better understand how the weather will be during the NOAA receiving sessions, since those conditions can impact on the reciving quality and/or damage some components if used under certain situations, like rain or extreme wind storms.

## The system

The complete system is the following: <br>

- PID1: **The MCU STM32F401RE, gathers the weather data every minute and sends them to a web site hosted on itself**, thanks to its [ethernet shield](https://www.google.com/url?sa=t&source=web&rct=j&opi=89978449&url=https://www.mouser.com/catalog/specsheets/a000056_datasheet.pdf%3Fsrsltid%3DAfmBOopf6pBYnQKdG1FfPxTF9w15WcyJ-tHJuvzqldRgIKXWHoZ6PHKB&ved=2ahUKEwjLlqidyImMAxWehf0HHQiAEAcQFnoECCYQAQ&usg=AOvVaw3l6hrLwbIgpWo4JkOq2vAo) which can allow it to connect to LAN. <br>

- PID2: Once *every 5 minutes*, the MCU sends a HTTP REQUEST to the [N2YO API](https://www.n2yo.com/api/) to check if there are any NOAA passes in the next 5 mins, if **there are** the MCU will initialize the *receiving protocol* instructions, by rotating the antenna to the start magnetic declination angle, calculating the necessary variables, and then waiting for the start time to came, once it does, the PID3 starts.

- PID3: The MCU will start the rotation to align the antenna and the satellite, then it will mantain the ideal angle to hold the horizontal polarization with the satellite's TX antenna.

## Power management 

The Power management system PMS is what handles the power management of the entire SRCS.

<table>
    <tr>
    <td>Item</td>
    <td>Idle Current [mA]</td>
    <td>Max Current [mA]</td>
    </tr> 
    <tr>
    <td><b>DHT11</b></td>
    <td> 0.5 </td>
    <td> 2.5 </td>
    </tr>
    <tr>
    <td><b>28BYJ-48</b></td>
    <td> 0.5 </td>
    <td> 2.5 </td>
    </tr>
    


</table>
