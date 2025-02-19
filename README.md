# STM32F411RE-weather-station
The STM32F411RE is **microcontroller board** developed da STMicroelectronics, it's principle is similar to an arduino, in fact they are very similar, it can be powered via USB
(which is used to program the board too) via VIN pin (7v < VIN < 12v), 800mA max, or via E5V (5v IN), 500mA max.




## F411R3 focal points:
- The VIN can be used as external power supply even if the usb is connected, but, it's important to **wire up the VIN pin before** plugging in the usb connector, <br>
Useful when board is consuming more then 300mA from the usb port (usb power in limit).
> [!CAUTION]
> Check 6.3.3 on datasheet
- 
