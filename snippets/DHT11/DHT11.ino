//DHT11 PINOUT 
//  Vcc => 3.3v
//  DATA => D4 (DHTPIN)
//  GND => GND


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

//By Sebs
