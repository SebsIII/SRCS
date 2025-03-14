# SENSORS' TESTS

- [X] TXS0108E
- [x] 28BYJ-48
- [x] ULN2003
- [ ] ESP01S
- [X] DHT11 - OK
- [X] Photoresistor

## WIREUPS

- [X] [STM32 TO ARDUINO IDE](https://www.youtube.com/watch?v=yssEiMLGH90)

## DHT11
based on [this tutorial](https://randomnerdtutorials.com/esp32-dht11-dht22-temperature-humidity-sensor-arduino-ide/) with necessary changes

VCC => 3.3v       <br>
DATA => D4        <br>
GND => GND        <br>

``` CPP
#include "DHT.h"

#define DHTPIN 4 
#define DHTTYPE DHT11

DHT dht(DHTPIN, DHTTYPE);

void setup() {
  Serial.begin(9600);
  Serial.println(F("DHT11 test"));

  dht.begin();
}
      
void loop() {
  delay(2000); // initial delay for stabilization
  float humidity = dht.readHumidity(); // reading takes 0.250 < t < 2 s 
  float temperature = dht.readTemperature();

  if (isnan(humidity) || isnan(temperature)) {   
    Serial.println(F("Failed to read from DHT sensor!"));
    return;
  }

  Serial.print("Humidity: ");
  Serial.print(humidity);
  Serial.print(" %\n");

  Serial.print("Temperature: ");
  Serial.print(temperature);
  Serial.println(" °C\n");

}
```
