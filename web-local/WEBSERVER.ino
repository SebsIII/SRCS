/*
  SRCS basecode by Sebs_

  This is the source code for SRCS MCU, it handles HTTPreq from clients,
  stores and hosts a web server and does calculations in order to get,
  analyze and send the sensors' data to each client.

  https://github.com/SebsIII/SRCS

*/
#include <SPI.h>
#include <Ethernet.h>
#include <SD.h>
#include <DHT.h>
#include "AS5600.h"
#include <Stepper.h>

#define DHTPIN 3
#define DHTTYPE DHT11

#define PHOTOPIN A0
#define RAINPIN A1 
#define ANEMOPIN A2

AS5600 as5600;
Stepper mount(64, 8,6,7,5);
DHT dht(DHTPIN, DHTTYPE);
File HMTL_file, pswLog_file;

String psw, pswAttempt;
byte mac[] = {
  0xDE, 0xAD, 0xBE, 0xEF, 0xFE, 0xED
};
IPAddress ip(192, 168, 1, 100); 
EthernetServer server(80);

void setup()
{
  Serial.begin(115200);
  pinMode(PHOTOPIN, INPUT);
  pinMode(RAINPIN, INPUT);
  pinMode(ANEMOPIN, INPUT);
  if(!POST()){
    Serial.println("POST FALSE");
    while (true){};
  }
  
  pswLog_file = SD.open("psw.txt");
  while (pswLog_file.available()){
    psw += (char)pswLog_file.read()  ;
  }

}

void loop()
{
  String HTTP_req;
  EthernetClient client = server.available();
  
  if(client)
  {
    boolean currentLineIsBlank = true;
    while (client.connected())
    {
      if(client.available())
      { 
        char c = client.read();
        HTTP_req += c;
        if(c == '\n' && currentLineIsBlank)
        {
          //-------------------------------------------------------------------
          if(HTTP_req.indexOf("readT")>-1)
          {
              client.println("HTTP/1.1 200 OK");
              client.println("Content-Type: text/plain");
              client.println("Connection: close");
              client.println();
              client.println(getTemperature());
          }
          else if(HTTP_req.indexOf("readH")>-1)
          {
            client.println("HTTP/1.1 200 OK");
            client.println("Content-Type: text/plain");
            client.println("Connection: close");
            client.println();
            client.println(getHumidity());
          }
          else if(HTTP_req.indexOf("readL")>-1)
          {
            client.println("HTTP/1.1 200 OK");
            client.println("Content-Type: text/plain");
            client.println("Connection: close");
            client.println();
            client.println(getLight());
          }
          else if(HTTP_req.indexOf("readR")>-1)
          {
            client.println("HTTP/1.1 200 OK");
            client.println("Content-Type: text/plain");
            client.println("Connection: close");
            client.println();
            client.println(getRain());
          }
          else if(HTTP_req.indexOf("readW")>-1)
          {
            client.println("HTTP/1.1 200 OK");
            client.println("Content-Type: text/plain");
            client.println("Connection: close");
            client.println();
            client.println(getWind());
          }
          else if(HTTP_req.indexOf("readGENERAL")>-1)
          {
            client.println("HTTP/1.1 200 OK");
            client.println("Content-Type: text/plain");
            client.println("Connection: close");
            client.println();
            client.println(as5600.rawAngle() * AS5600_RAW_TO_DEGREES);
          }
          else if(HTTP_req.indexOf("alignAntennaTo0")>-1)
          {
            client.println("HTTP/1.1 200 OK");
            client.println("Content-Type: text/plain");
            client.println("Connection: close");
            client.println();
            int currentPos = as5600.rawAngle() * AS5600_RAW_TO_DEGREES;
            mount.setSpeed(100);
            while (currentPos != 0)
            {
              mount.step(50);
              delay(100);
              currentPos = as5600.rawAngle() * AS5600_RAW_TO_DEGREES;
            }
            client.println("Antenna algned.");
          }
          else if(HTTP_req.indexOf("pswReq")>-1)
          {
            Serial.println("psw requested.");
            for (int i = HTTP_req.indexOf("pswReq/"); i < HTTP_req.length(); i++){
              if(HTTP_req[i] == '/'){
                  int c = i + 1;
                  while(HTTP_req[c] != ' '){
                    pswAttempt += HTTP_req[c];
                    c++;
                  }
                  break;
              }
            }
            client.println("HTTP/1.1 200 OK");
            client.println("Content-Type: text/plain");
            client.println("Connection: close");
            client.println();
            int c = 0;
            for(int i = 0; i < psw.length(); i++){
              Serial.print(pswAttempt[i]);
              Serial.println(psw[i]);
              if(pswAttempt[i] == psw[i]){
                c++;
              }
            }
            if (c == psw.length() - 1 && pswAttempt.length() == psw.length() - 1)
            {
              client.println("true");
            } else {
              client.println("false");
            }
            pswAttempt = "";
            
            
          }
          //-------------------------------------------------------------------
          else
          {
            client.println("HTTP/1.1 200 OK");
            client.println("Content-Type: text/html");
            client.println("Connection: close");
            client.println();
            HMTL_file = SD.open("index.htm");
            if(HMTL_file)
            {
              while(HMTL_file.available()) client.write(HMTL_file.read());
              HMTL_file.close();
            }
          }
          //-------------------------------------------------------------------
          //HTTP_req = "";
          break;
        }
        //---------------------------------------------------------------------
        if(c == '\n') currentLineIsBlank = true;
        else if(c != '\r') currentLineIsBlank = false;
      }
    }
    delay(10);
    client.stop();
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

float getWind(){  //To format raw input 
  int WS = analogRead(ANEMOPIN);
  return  WS;
}

bool POST(){
  if(SD.begin(4)){
    if(SD.exists("index.htm")){
      if(SD.exists("psw.txt")){
        Ethernet.init(10);
        Ethernet.begin(mac, ip);
        server.begin();
        dht.begin();
        Wire.begin();
        as5600.setDirection(AS5600_CLOCK_WISE);
        return true;
      } else {
        return false;
      }
    } else{
      return false;
    }
  } else{
    return false;
  }
}