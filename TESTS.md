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
- [ ] What if? stm32 hosted web server only handles HTTP GET requests and a different website is hosted on a different more performant domain, that myght mean that the web page could be "heavier"? [Expsress, node.js](https://expressjs.com/)
- [ ] [NodeJS on  stm32](https://www.instructables.com/NodeJs-and-Arduino/)

## Arduino + firebase
``` cpp

#include <SPI.h>
#include <Ethernet.h>
#include <FirebaseArduino.h>

// Firebase project credentials
#define FIREBASE_HOST "your-project-id.firebaseio.com"  // Your Firebase URL
#define FIREBASE_AUTH "your-database-secret"  // Firebase database secret

// Ethernet Shield credentials
byte mac[] = { 0xDE, 0xAD, 0xBE, 0xEF, 0xFE, 0xED };  // Replace with your MAC address
IPAddress ip(192, 168, 1, 177);  // Optional: Set static IP or use DHCP

EthernetClient client;

void setup() {
  // Start Serial communication for debugging
  Serial.begin(9600);

  // Start Ethernet and try to connect
  if (Ethernet.begin(mac) == 0) {
    Serial.println("Failed to configure Ethernet using DHCP");
    // Static IP setup if DHCP fails
    Ethernet.begin(mac, ip);
  }
  delay(1000);

  Serial.println("Connecting to Firebase...");

  // Connect to Firebase
  Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);

  // Test if the Firebase connection is successful
  if (Firebase.ready()) {
    Serial.println("Connected to Firebase!");
  } else {
    Serial.println("Failed to connect to Firebase.");
  }
}

void loop() {
  // Send data to Firebase
  int sensorValue = analogRead(A0);  // Example: Read analog value from pin A0

  // Set a value in the Firebase Realtime Database
  Firebase.setInt("sensor/value", sensorValue);

  // Check if the data was successfully written
  if (Firebase.failed()) {
    Serial.print("Firebase set failed: ");
    Serial.println(Firebase.error());
  } else {
    Serial.println("Data sent to Firebase.");
  }

  // Wait for 2 seconds before sending the next data
  delay(2000);
}
```
## string to log txt file
``` cpp
SD.begin(cspin)
log = SD.open("log.txt", FILE_WRITE);
  
  // if the file opened okay, write to it:
  if (log) {
    Serial.print("Writing to test.txt...");
    log.println("testing 1, 2, 3.");
	// close the file:
    log.close();
```

## LIGHTWEIGHT WEB PAGE
- **[Design](https://dribbble.com/shots/20288381-Weather-Forecasting-Web-App-UI)**
## Web data
- font - merryweather
- [canva background](https://www.canva.com/design/DAGjF7-2_sY/XArurzRtQZ8dEjKSA_NvSw/edit)
- [kaze.ai](https://kaze.ai/watermark-removal/processing?fromPage=watermark-removal)

