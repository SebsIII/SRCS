# SENSORS' TESTS

- [X] TXS0108E
- [x] 28BYJ-48
- [x] ULN2003
- [ ] ESP01S
- [X] DHT11 - OK
- [X] Photoresistor
- [X] W5100 

## WIREUPS

- [X] [STM32 TO ARDUINO IDE](https://www.youtube.com/watch?v=yssEiMLGH90)
- [X] [DHT11](https://randomnerdtutorials.com/esp32-dht11-dht22-temperature-humidity-sensor-arduino-ide/), adapted
- [X] [STM32 to Ethernet shield](https://balau82.wordpress.com/2015/08/02/arduino-ethernet-shield-on-stm32-nucleo/)
- [ ] What if? stm32 hosted web server only handles HTTP GET requests and a different website is hosted on a different more performant domain, that myght mean that the web page could be "heavier"? [Expsress, node.js](https://expressjs.com/)
- [ ] [NodeJS on  stm32](https://www.instructables.com/NodeJs-and-Arduino/)

## HTTP GET request handler
``` cpp

#include <SPI.h>
#include <Ethernet.h>
#include <EthernetClient.h>

// Network configuration (adjust as needed for your network)
byte mac[] = { 0xDE, 0xAD, 0xBE, 0xEF, 0xFE, 0xED }; // Replace with your MAC address
IPAddress ip(192, 168, 1, 177); // Replace with your desired IP address
IPAddress gateway(192, 168, 1, 1); // Replace with your gateway IP
IPAddress subnet(255, 255, 255, 0); // Replace with your subnet mask
IPAddress dnsServer(192, 168, 1, 1); // Optional DNS server

EthernetServer server(80); // Server port (HTTP default)

void setup() {
  Serial.begin(9600);

  // Initialize Ethernet shield
  Ethernet.begin(mac, ip, dnsServer, gateway, subnet);
  // Note: You can also use DHCP: Ethernet.begin(mac);

  // Check for Ethernet hardware present
  if (Ethernet.hardwareStatus() == EthernetNoHardware) {
    Serial.println("Ethernet shield was not found.  Sorry, can't proceed without hardware.");
    while (true) {
      delay(1); // Do nothing, no point running without Ethernet hardware
    }
  }
  if (Ethernet.linkStatus() == LinkOFF) {
    Serial.println("Ethernet cable is not connected.");
  }

  // Start the server
  server.begin();

  Serial.print("Server started on IP: ");
  Serial.println(Ethernet.localIP());
}

void loop() {
  // Listen for incoming clients
  EthernetClient client = server.available();

  if (client) {
    Serial.println("New client connected!");

    // An http request ends with a blank line
    boolean currentLineIsBlank = true;
    String request = "";

    while (client.connected()) {
      if (client.available()) {
        char c = client.read();
        request += c;
        Serial.print(c);

        // If we get a blank line, the http request has ended
        if (c == '\n' && currentLineIsBlank) {
          // Process the HTTP GET request
          if (request.startsWith("GET /random")) {
            sendRandomNumber(client);
          } else {
            // Handle other requests or send a default response
            sendDefaultResponse(client);
          }
          break;
        }
        if (c == '\n') {
          currentLineIsBlank = true;
        } else if (c != '\r') {
          currentLineIsBlank = false;
        }
      }
    }
    // Give the web browser time to receive the data
    delay(1);

    // Close the connection
    client.stop();
    Serial.println("Client disconnected!");
  }
}

void sendRandomNumber(EthernetClient client) {
  // Generate a random number (adjust range as needed)
  int randomNumber = random(0, 1000);

  // Send the HTTP response header
  client.println("HTTP/1.1 200 OK");
  client.println("Content-Type: text/plain");
  client.println("Connection: close");  // Close the connection after sending the response
  client.println();                      // Empty line to end the header

  // Send the random number as the response body
  client.print("Random Number: ");
  client.println(randomNumber);
}

void sendDefaultResponse(EthernetClient client) {
  // Send a default response for other requests
  client.println("HTTP/1.1 404 Not Found");
  client.println("Content-Type: text/plain");
  client.println("Connection: close");
  client.println();
  client.println("Page Not Found");
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
- WeBP images
- no comments or useless data in final code
- web cache for images?
- local fonts?
- minimal interface
- less images
- css,js in the same file?
- file in SD
- background and static texts as background image (one for mobile and one for desktop)
## Web data
- font - merryweather
- [canva background](https://www.canva.com/design/DAGjF7-2_sY/XArurzRtQZ8dEjKSA_NvSw/edit)
- [kaze.ai](https://kaze.ai/watermark-removal/processing?fromPage=watermark-removal)

