# SRCS - Satellite Receiver Control Station
> [!Warning]
> I need a better, more exiting project name

The STM32F401RE based **Satellite RF signals reciver control station** for NOAA satellites to maximize receiving quality of weather satellites broadcasts to get local satellite's views images.
<h6>I definitely need a better name, By Sebs_</h6>

## Description
The control station is made primarely of 2 modules:
- The motorized antenna module : The **core** of the control station and the actual receiver, it's made of a [dipole antenna](https://en.wikipedia.org/wiki/Dipole_antenna) tuned at NOAA's frequencies in horizontal polarization connected to a [28BYJ-48](https://www.mouser.com/datasheet/2/758/stepd-01-data-sheet-1143075.pdf?srsltid=AfmBOor0JeeT5X12a_oRtEgDTfQxDhepoXjEc7EOESq1vM4Kv5rxR0na) stepper motor.
- The weather data module - The secondary part of the SRCS that gets weather data that will be analyzed by the [MCU](https://en.wikipedia.org/wiki/Microcontroller).
