/*
  SRCS basecode by Sebs_

  This is the source code for SRCS MCU, it handles HTTPreq from clients,
  stores and hosts a web server and does calculations in order to get,
  analyze and send the sensors' data to each client.

  Documentation and assets: https://github.com/SebsIII/SRCS

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

String psw, pswAttempt, alignCmmd;
int align_from = -1, align_to = -1, align_for =-1, align_after = -1, from_value, to_value, for_value, after_value ;
int startPoint, endPoint;
int dataArray[4], jobTime;
float weatherData[5];
bool haveJob = false;
int unsigned long instantTime, lastTrigger = 0;
int isClockwise = 1; //1 = counter clock-wise, -1 = clok-wise
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
    psw += (char)pswLog_file.read();
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
      instantTime = millis()/1000;
      if(instantTime%5 == 0 && instantTime != lastTrigger){
        lastTrigger = instantTime;
        checkAndExecJob();
      }
      
      if(client.available())
      { 
        char c = client.read();
        HTTP_req += c;
        if(c == '\n' && currentLineIsBlank)
        {
          //-------------------------------------------------------------------
          if(HTTP_req.indexOf("getWeather")>-1)
          {
            weatherData[0] = getTemperature();
            weatherData[1] = getHumidity();
            weatherData[2] = getLight();
            weatherData[3] = getWind();
            weatherData[4] = getRain();

            client.println("HTTP/1.1 200 OK");
            client.println("Content-Type: text/plain");
            client.println("Connection: close");
            client.println();
            client.print('[');
            for (int i = 0; i < 5; i++){
              client.print(weatherData[i]);
              if (i != 4){
                client.print(',');
              }
            }
            client.println(']');  
            
          }
          else if(HTTP_req.indexOf("readGENERAL")>-1)
          {
            client.println("HTTP/1.1 200 OK");
            client.println("Content-Type: text/plain");
            client.println("Connection: close");
            client.println();
            client.println(as5600.rawAngle() * AS5600_RAW_TO_DEGREES);
            //MApDR als
          }
          else if(HTTP_req.indexOf("alignAntennaTo0")>-1)
          {
            client.println("HTTP/1.1 200 OK");
            client.println("Content-Type: text/plain");
            client.println("Connection: close");
            client.println();

            bool isAligned = false;
            int currentPos = as5600.rawAngle() * AS5600_RAW_TO_DEGREES;
            mount.setSpeed(20); //adjust if too much
            if(currentPos > 180){
              isClockwise = -1;
            }
            while (!isAligned){  
                if(currentPos == 0){
                  isAligned = true;   
                } else{
                  mount.step(isClockwise * 30);
                  delay(1000);
                  Serial.print(as5600.rawAngle());    //DEL
                  Serial.print(" - ");    //DEL
                  Serial.println(currentPos);   //DEL
                  currentPos = as5600.rawAngle() * AS5600_RAW_TO_DEGREES;
                }
                Serial.println(isAligned);    //DEL
              }
            client.print("Antenna-algned,isClockwise:");
            client.println(isClockwise);
            isAligned = false;
            isClockwise = 1;
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
          else if(HTTP_req.indexOf("alignCmmd")>-1)
          {
            Serial.println("Antenna align requested.");

            for (int i = HTTP_req.indexOf("alignCmmd") + 9; i < HTTP_req.length(); i++){
              if(HTTP_req[i] != ' '){
                alignCmmd += HTTP_req[i];
              }else{
                break;
              }
            }
            haveJob = true;
            jobTime = millis() + dataArray[3]*1000;
            Serial.println(jobTime);
          
            char buffer[30];
            alignCmmd.toCharArray(buffer, 30);
            char *token = strtok(buffer, "/");

            int j = 0;
            while (token != NULL) {
              dataArray[j] = atoi(token);
              token = strtok(NULL, "/");
              j++;
            }
  


            client.println("HTTP/1.1 200 OK");
            client.println("Content-Type: text/plain");
            client.println("Connection: close");
            client.println();
            client.println("test concluded.");
            
            memset(buffer, 0, sizeof(buffer));
            alignCmmd = "";
            //print something that comunicates the reception, then process cmmd
            
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

float getLight(){
  int LL = analogRead(PHOTOPIN);
  return  LL;
}

float getRain(){ 
  int RL = analogRead(RAINPIN);
  return  RL;
}

float getWind(){
  int WS = analogRead(ANEMOPIN);
  return  WS;
}

void checkAndExecJob(){
  int currentTime = millis();
  Serial.println(currentTime);
  if (haveJob == true)
  {
    bool isAligned = false;
    Serial.println("There's a job active.");
    if (currentTime >= jobTime)
    {
      Serial.println("The time has come.");
      if(isAligned){
        //start reception
      } else{
        //align
      }
    
   }
    else if ((jobTime-currentTime)/1000 <= 60)
    {
      Serial.println("T-60, aligning antenna.");
      int currentPos = as5600.rawAngle() * AS5600_RAW_TO_DEGREES;
      int startAz = (int)dataArray[0];

      while (!isAligned){  
        if(currentPos == startAz){
          isAligned = true;   
        } else{
          mount.step(isClockwise * 30);
          delay(1000);
          Serial.print(as5600.rawAngle());    //DEL
          Serial.print(" - ");    //DEL
          Serial.println(currentPos);   //DEL
          currentPos = as5600.rawAngle() * AS5600_RAW_TO_DEGREES;
        }
        Serial.println(isAligned);    //DEL
      }
    }
  }
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