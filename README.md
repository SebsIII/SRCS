# SRCS - Satellite Receiver Control Station

The Satellite Receiver Control Station (SRCS) is a critical operational facility dedicated to maximizing the quality and reliability of satellite signal reception. This is achieved through the continuous acquisition, processing, and analysis of diverse sensor data streams. The SRCS leverages this information to dynamically optimize antenna pointing, receiver parameters, and other system configurations, ensuring optimal signal capture and data integrity.


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
