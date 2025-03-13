#include <Stepper.h>

/*
  STEPPER WIREUP
  IN1 = 4
  IN2 = 5
  IN3 = 6
  IN4 = 7
*/



Stepper motore(64, 7,5,6,4);

int c = 0;

void setup() {
  Serial.begin(9600);
  motore.setSpeed(120);
  motore.step(11390);

  //11390.625
  //11475
  
}

void loop() {
  
}
