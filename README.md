# STM32F411RE-weather-station
The STM32F411RE is a 8KHz 50pins **microcontroller board** developed by STMicroelectronics. <br>
The board is divided in 2 smaller pcbs: STM32 and ST-LINK, respectively the microcontroller part and the comunication interface part, the ST-LINK can be cut apart to reduce the overall board size, at the same time the F411RE can still be interfaced with the other part by making some connections between the two, (6.1, 16)
## POWER IN (6.3, p20)
- **USB** = 5v, 100-300mA max (6.3.1)
- **3.3v** = 3.3v, NO USB INTERFACE (6.3.3)
- **E5V** = 5v, 500mA (6.3.2)
- **VIN** = 7v < VIN < 12v, 800mA at 7v (6.3.2)
> [!CAUTION]
> Check table 7 at p21, 6.3.2 for **VIN power limits**

## POWER OUT (6.3.4, p22)

- IN [USB, E5V, VIN] = **+5v OUT**
- IN [3.3v] = **+3.3v, 500mA**

## PINOUT
![pinout](https://github.com/SebsIII/STM32F411RE-weather-station/blob/main/datasheets/F411RE_pinout.png)

Chapter,paragraph and page in the [datasheet](https://github.com/SebsIII/STM32F411RE-weather-station/blob/main/datasheets/nucleo64_Datasheet.pdf)
## F411R3 focal points:
- The VIN can be used as external power supply even if the usb is connected, but, it's important to **wire up the VIN pin before** plugging in the usb connector, <br>
Useful when board is consuming more then 300mA from the usb port (usb power in limit).
> [!CAUTION]
> Check 6.3.3 on datasheet
- 
