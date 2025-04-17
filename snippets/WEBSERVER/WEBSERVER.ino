//-----------------------------------------
//Arduino DHT11 Web Server using AJAX
//HTML code of webpage is stored on SD card
//-----------------------------------------
#include <SPI.h>
#include <Ethernet.h>
#include <SD.h>
#include <DHT.h>
//------------------------------------------------

#define DHTPIN 3
#define DHTTYPE DHT11

#define PHOTOPIN A0
#define RAINPIN A1 
#define ANEMOPIN A2

DHT dht(DHTPIN, DHTTYPE);
File HMTL_file;
//------------------------------------------------
byte mac[] = {
  0xDE, 0xAD, 0xBE, 0xEF, 0xFE, 0xED
};
IPAddress ip(192, 168, 1, 100); 
EthernetServer server(80);
//==================================================================================
void setup()
{
  //Serial.begin(9600);
  pinMode(PHOTOPIN, INPUT);
  pinMode(RAINPIN, INPUT);
  pinMode(ANEMOPIN, INPUT);
  if(!POST()){
    while (true){};
  }
  
}
//==================================================================================
void loop()
{
  String HTTP_req;
  EthernetClient client = server.available();
  //---------------------------------------------------------------------------
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
      Ethernet.init(10);
      Ethernet.begin(mac, ip);
      server.begin();
      //-----------------------------
      dht.begin();
      return true;
    } else{
      return false;
    }
  } else{
    return false;
  }
}