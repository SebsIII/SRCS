#define PHOTO A0

void setup() {
  Serial.begin(9600);
  pinMode(PHOTO, INPUT);

}

void loop() { 
  Serial.println(analogRead(PHOTO));
  delay(500);
}
