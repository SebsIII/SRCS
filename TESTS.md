# SENSORS' TESTS

- [X] TXS0108E
- [x] 28BYJ-48
- [x] ULN2003
- [ ] rain sensor
- [X] DHT11 - OK
- [X] Photoresistor
- [X] W5100 

## WIREUPS

- [X] [STM32 TO ARDUINO IDE](https://www.youtube.com/watch?v=yssEiMLGH90)
- [X] [DHT11](https://randomnerdtutorials.com/esp32-dht11-dht22-temperature-humidity-sensor-arduino-ide/), adapted
- [X] [STM32 to Ethernet shield](https://balau82.wordpress.com/2015/08/02/arduino-ethernet-shield-on-stm32-nucleo/)
- [ ] [AJAX](https://startingelectronics.org/tutorials/arduino/ethernet-shield-web-server-tutorial/web-server-read-switch-using-AJAX/)
- [ ] [sd TO COPY CODE](https://www.youtube.com/watch?v=Nn6HuLtUSEU)

## Snippets
> [!WARNING]
> Those snippets need to be tested

Pin Format: NAME-PIN

### DHT11

``` cpp
float getTemperature(){
  float T = dht.readTemperature();
  if (isnan(T)) {   
    return 0;
  }
  return  T;
}
```
``` cpp
float getHumidity(){
  float H = dht.readHumidity();
  if (isnan(H)) {   
    return 0;
  }
  return  H;
}
```

## Rain Sensor
``` cpp
int getRain(){  //To format raw input 
  int RL = analogRead(RAIN-PIN)
  return  RL;
}
```

## Light Sensor
``` cpp
int getLight(){  //To format raw input 
  int LL = analogRead(PHOTO-PIN)
  return  LL;
}
```

## Anemometer
``` cpp
float getWind(){  //To format raw input (?)
  int WS = analogRead(ANEMO-PIN)
  return  WS;
}
```

## Web datasheet
- **AA** - Antenna Azimuth
- **AD** - [Last] Antenna Direction
- **MApDR** - Maximum Angle per Direction (of) Rotation [left]
- **Rain** - Rain Level
- **POST** - [Last] Power On Self Test [Outcome]

## Web data
- font - [Questial, allura, Oswald]
- [canva background](https://www.canva.com/design/DAGjF7-2_sY/XArurzRtQZ8dEjKSA_NvSw/edit)
- [kaze.ai](https://kaze.ai/watermark-removal/processing?fromPage=watermark-removal)

