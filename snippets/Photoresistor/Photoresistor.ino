//Photoresistor PINOUT

/*
1 => 3.3v
2 => A0, 4k7 ohm
4k7 ohm 2 => GND
*/

#define PHOTO A0

void setup() {
  Serial.begin(9600);
  pinMode(PHOTO, INPUT);

}

void loop() { 
  Serial.println(analogRead(PHOTO));
  delay(500);
}
