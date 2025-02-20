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
![MORPHOpinout](https://github.com/SebsIII/STM32F411RE-weather-station/blob/main/datasheets/F411RE_MORPHO_pinout.png)

Chapter,paragraph and page in the [datasheet](https://github.com/SebsIII/STM32F411RE-weather-station/blob/main/datasheets/nucleo64_Datasheet.pdf)

## MbedStudio Examples
1. Downlad [MbedStudio](https://os.mbed.com/studio/)
2. ---------
3. Download the [examples](https://drive.google.com/file/d/1rBYA-XJjp9Y93ywXcvRsEpWNB_xPoDUr/view?usp=share_link) folder and extract it
4. --------

## Sensors
- [TXS0108E](https://www.ti.com/lit/ds/symlink/txs0108e.pdf?ts=1740033092920&ref_url=https%253A%252F%252Fwww.ti.com%252Fproduct%252FTXS0108E) - level shifter for 3.3v => 5v
- [28BYJ-48](https://www.mouser.com/datasheet/2/758/stepd-01-data-sheet-1143075.pdf?srsltid=AfmBOor0JeeT5X12a_oRtEgDTfQxDhepoXjEc7EOESq1vM4Kv5rxR0na) - stepper motor
- [ULN2003](https://www.hadex.cz/spec/m513.pdf) - stepper motor driver
- [ESP01S](https://www.tutos.eu/vault/3506ESP8266_01S_Modul_Datenblatt.pdf) - WiFi module 2.4GHz
