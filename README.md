# SRCS - Satellite Receiver Control Station

The Satellite Receiver Control Station (SRCS) is an operational facility dedicated to maximizing the quality and reliability of satellite signal reception. This is achieved through the continuous acquisition, processing, and analysis of diverse sensor data streams. The SRCS leverages this information to dynamically optimize antenna pointing, receiver parameters, and other system configurations, ensuring optimal signal capture and data integrity.


## Description
The control station is made primarely of 2 modules:
- The motorized antenna module : The **core** of the control station and the actual receiver, it's composed of a [Vee dipole antenna](https://en.wikipedia.org/wiki/Dipole_antenna) tuned at NOAA's frequencies in horizontal polarization and connected to a [28BYJ-48](https://www.mouser.com/datasheet/2/758/stepd-01-data-sheet-1143075.pdf?srsltid=AfmBOor0JeeT5X12a_oRtEgDTfQxDhepoXjEc7EOESq1vM4Kv5rxR0na) stepper motor, which handles it's ability to rotate the antenna to track satellites.
- The weather data module - The secondary part of the SRCS that gathers weather data that will be analyzed by the [MCU](https://en.wikipedia.org/wiki/Microcontroller) and saved on an external database.
## 🛰️ The NOAA's satellites

The NOAA ([National Oceanic Atmospheric Atministration](https://www.noaa.gov/)) is a US  agecy that studies how weather changes our planet, both on it's surface and under the seas. <br>
Other then other missions, it made a [campaign of polar-orbiting, non-geosynchronous, environmental satellites](https://www.n2yo.com/satellites/?c=4), from NOAA-1 up to NOAA-21. <br>
From all of those, the best and easiest one to receive are the NOAA-15, NOAA-18 and NOAA-19, which continously trasmit weather data with [APT](https://en.wikipedia.org/wiki/Automatic_picture_transmission) techniques on their downlink frequency as a "sound". <br>
Those "sounds" will eventually need to be converted into .WAV files and thed decoded with an apt-decoder, in our case we'll use [noaa-apt](https://noaa-apt.mbernardi.com.ar/).

<table>
<tr><td>Name</td><td>NORAD ID</td><td>Freq MHz</td></tr>
<tr><td>NOAA 15</td><td><a href="https://www.n2yo.com/satellite/?s=25338">25338</a></td><td>137.620</td></td></tr>
<tr><td>NOAA 18</td><td><a href="https://www.n2yo.com/satellite/?s=28654">28654</a></td><td>137.9125</td></tr>
<tr><td>NOAA 19</td><td><a href="https://www.n2yo.com/satellite/?s=33591">33591</a></td><td>137.1</td></tr>
</table>

## 1st Module: The Vee Dipole Antenna

![Vee antenna](https://github.com/SebsIII/SRCS/blob/main/tools/Gallery/SRCS_render2.png)

The first module is made of two parts, the **dipole antenna** and the **motorized support**:
- The dipole antenna is the effective receiver of the SRCS, it's a horizontally polazied, omnidirectional, **Vee dipole antenna** tuned at 137.25 MHz (average downlink frequency of NOAA-15,18,19 *). <br>
  The antenna output will eventually be connected to a 50 ohm [RG58 coaxial cable](https://www.farnell.com/datasheets/2095749.pdf) that will transfer the output signal from the antenna to the [RTL-SDR](https://en.wikipedia.org/wiki/Software-defined_radio) or the general receiver that will, later on, analyze the signal and convert it in an image. <br>
  
- The motorized support is where the antenna is mounted and the part that will, indeed, **rotate** the antenna itself while the satellite is passing near the SRCS 
  to ensure the highest quality receiving of data reception of the dipole. <br>
  Its mainly composed of a [28BYJ-48 stepper motor](https://www.mouser.com/datasheet/2/758/stepd-01-data-sheet-1143075.pdf?srsltid=AfmBOor0JeeT5X12a_oRtEgDTfQxDhepoXjEc7EOESq1vM4Kv5rxR0na), a **5.625:1 gear box** to reduce the motor speed and to reduce the minimum step angle and an [AS5600 magnetic encoder](https://files.seeedstudio.com/wiki/Grove-12-bit-Magnetic-Rotary-Position-Sensor-AS5600/res/Magnetic%20Rotary%20Position%20Sensor%20AS5600%20Datasheet.pdf) to get the exact rotation angle of the dipole.
  
<h6>* The bandwidth of the 137.25 MHz dipole antenna offers enough bandwindth to get all the 137.1, 137.620 and 137.9125 MHz frequencies </h6>

## 2nd Module: Weather data Module

![anemometer](https://github.com/SebsIII/SRCS/blob/main/tools/Gallery/anemometer-render2.png)

The second module is the weather monitor system, which is the part which goal is to gather weather data that will later on, be analyzed by the MCU.
It's composed of various sensors, including: [DHT11]() for **temperature and humidity**, a light sensor, to gather **ambient light level**, an anemometer for **wind speed** and a rain sensor. <br>
The combination of those data, will be used to **monitor and predict how currend and future weather is/will be**. <br>
Those info are necessary to better understand how the weather will be during the NOAA receiving sessions, since those conditions can impact on the reciving quality and/or damage some components if used under certain situations, like rain or extreme wind storms.

## The Power Managment System PMS

The SRCS is powered by a **9v 5w solar panel** which charges up a **12v 7AH Lead acid battery** with a **[XY-L10A](https://www.google.com/url?sa=t&source=web&rct=j&opi=89978449&url=https://www.qso.com.ar/datasheets/Modulo%2520de%2520control%2520de%2520carga%2520XY-L10A/XY-L10A.docx&ved=2ahUKEwi1_PSDt9iMAxWxgv0HHRd6EU8QFnoECCYQAQ&usg=AOvVaw00YEWtkEqTxmvZ8xFjY2dq) BMS** which handles and manages the battery charging-sequencies.
Before the BMS, there's a **buck step-up circuit** which up-shifts the voltage from *9v => ~13v*, needed to charge the battery.
The battery outputs are then inputted in two **buck step-down circuits**, one at *~7,5v for the MCU power supply* and the other at *5v for the sensors power supply*.

The complete system is schematized below:

``` 
Solar panel
    |        
    v        
   13v---> XY-L10A
    |        v
    v        |
 Battery <---/
  |   |
  v   v
 7.5v 5v--> Sensors IN 
  |
  v   
STM32F401RE VIN
```

## The communication protocol

![dashboard-overview](https://github.com/SebsIII/SRCS/blob/main/tools/Gallery/eth-render1.png)

The SRCS, other than a control station is also a **web server** hosting a **local website**, on which are displayed the weather data, the SRCS status, the nearby satellite passes data and much more.
 
The website is written in **HTML**,**CSS** and **JS** and the communication protocol between the website and the SRCS itself is based on [AJAX](https://en.wikipedia.org/wiki/Ajax_(programming)).

The **website local IP address** is set to:
```
http://192.168.1.100
```

## Usage

When you want to start a new reception session, click the **Start reception session** button, a login pop-up will show up, in this, you will need to insert the password to continue. 

If the password is right, a new pop-up will show up, requesting the **command info to send to the SRCS**, The command is in this format:
``` 
Rotate [from] degrees => [to] degrees in [for] seconds, [after] seconds
```

here's an *example* to better understand how the command format works:
> Rotate from 0° => to 180°, in 600s, after 900s 

With this command, the SRCS will **align and rotate the antenna from 0° [North] to 180° [south] in 10 min, after 15min after the reception of the command**.



