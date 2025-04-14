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
  Serial.begin(9600);
  dht.begin();
  //-----------------------------------------------------
  Serial.println(F("Initializing SD card..."));
  if(!SD.begin(4))
  {
    Serial.println(F("Initialization failed!")); return;
  }
  Serial.println(F("Initialization OK"));
  //-----------------------------------------------------
  if(!SD.exists("index.htm"))
  {
    Serial.println(F("index.htm not found!")); return;
  }
  Serial.println(F("index.htm found"));
  //-----------------------------------------------------
  Ethernet.init(10);
  Ethernet.begin(mac, ip);
  server.begin();
  Serial.print(F("Server Started...\nLocal IP: "));
  Serial.println(Ethernet.localIP());
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
              client.println(dht.readTemperature());
          }
          else if(HTTP_req.indexOf("readH")>-1)
          {
            client.println("HTTP/1.1 200 OK");
            client.println("Content-Type: text/plain");
            client.println("Connection: close");
            client.println();
            client.println(dht.readHumidity());
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
