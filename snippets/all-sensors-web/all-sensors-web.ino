/*
  SRCS Web Server stock
  based on Arduino built-in example Web server examples

  ETH SHIELD -> STM32
  
     SCK MISO
      | |
  [ - - -] ICSP INTERFACE
  [ - - -]
      |
    MOSI
  
  MISO -> D12
  MOSI -> D11
  SCK -> D13
 */

#include <SPI.h>
#include <Ethernet.h>
#include "DHT.h"

#define DHTPIN 3
#define DHTTYPE DHT11

#define PHOTOPIN A0

#define RAINPIN A1


byte mac[] = {
  0xDE, 0xAD, 0xBE, 0xEF, 0xFE, 0xED
};
IPAddress ip(192, 168, 1, 100);   //static IP 

EthernetServer server(80);
DHT dht(DHTPIN, DHTTYPE);

void setup() {
  Serial.begin(9600);
  Ethernet.init(10);    //CS PIN
  Ethernet.begin(mac, ip);

  dht.begin();
  pinMode(PHOTOPIN, INPUT);
  
  Serial.println("SRCS-Web-Server");

  if (Ethernet.hardwareStatus() == EthernetNoHardware) {
    Serial.println("Ethernet shield was not found.");
    while (true) {
      delay(100);
    }
  }
  if (Ethernet.linkStatus() == LinkOFF) {
    Serial.println("Ethernet cable is not connected.");
  }

  server.begin();
  Serial.print("server is at ");
  Serial.println(Ethernet.localIP());
}


void loop() {
  // listen for incoming clients
  EthernetClient client = server.available();
  if (client) {
    Serial.println("new client");
    // an http request ends with a blank line
    boolean currentLineIsBlank = true;
    while (client.connected()) {
      if (client.available()) {
        char c = client.read();
        Serial.write(c);
        // if you've gotten to the end of the line (received a newline
        // character) and the line is blank, the http request has ended,
        // so you can send a reply
        if (c == '\n' && currentLineIsBlank) {
          // send a standard http response header
          client.println("HTTP/1.1 200 OK");
          client.println("Content-Type: text/html");
          client.println("Connection: close");  // the connection will be closed after completion of the response
          //client.println("Refresh: 5");  // refresh the page automatically every 5 sec
          client.println();
          client.println("<!DOCTYPE HTML>");
          client.println("<html>");
          client.println("<body style=background-color:gray;display:flex;align-items:center;justify-content:center;flex-direction:column;>");
          
          client.print("Temperature: ");
          client.println(getTemperature());

          client.print("Humidity: ");
          client.println(getHumidity());

          client.print("Light RAW: ");
          client.println(getLight());

          client.print("Rain RAW: ");
          client.println(getRain());


          client.println("<button onclick='location.href='https://github.com/SebsIII/SRCS/blob/main/TESTS.md''>Test</button>");
          client.println("</body>");
          client.println("</html>");
          break;
        }
        if (c == '\n') {
          // you're starting a new line
          currentLineIsBlank = true;
        } else if (c != '\r') {
          // you've gotten a character on the current line
          currentLineIsBlank = false;
        }
      }
    }
    // give the web browser time to receive the data
    delay(1);
    // close the connection:
    client.stop();
    Serial.println(client.connected());
    Serial.println("client disconnected");
  }
}

float getTemperature(){
  float T = dht.readTemperature();
  if (isnan(T)) {   
    return 0;
  }
  return  T;
}

float getHumidity(){
  float H = dht.readHumidity();
  if (isnan(H)) {   
    return 0;
  }
  return  H;
}

int getLight(){  //To format raw input 
  int LL = analogRead(PHOTOPIN);
  return  LL;
}

int getRain(){  //To format raw input 
  int RL = analogRead(RAINPIN);
  return  RL;
}