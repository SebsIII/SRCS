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
- [X] [Ajax sd web](https://www.youtube.com/watch?v=E3uCFFf3hxc)

## Snippets
> [!WARNING]
> Those snippets need to be tested

Pin Format: NAMEPIN

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
  int RL = analogRead(RAINPIN)
  return  RL;
}
```

## Light Sensor
``` cpp
int getLight(){  //To format raw input 
  int LL = analogRead(PHOTOPIN)
  return  LL;
}
```

## Anemometer
``` cpp
float getWind(){  //To format raw input (?)
  int WS = analogRead(ANEMOPIN)
  return  WS;
}
```

## Web datasheet
- **AA** - Antenna Azimuth
- **AD** - [Last] Antenna Direction
- **MApDR** - Maximum Angle per Direction (of) Rotation [left]
- **Rain** - Rain Level
- **POST** - [Last] Power On Self Test [Outcome]
- **MRC** - Meteorological Reliability Coefficient

## Web data
- font - [Questial, allura, Oswald]

