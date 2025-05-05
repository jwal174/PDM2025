const int ledPin = 13;
const int analogPin = A0;

bool ledState = false;

void setup() {
  pinMode(ledPin, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  int analogValue = analogRead(analogPin);
  Serial.println(analogValue);

  if (Serial.available()) {
    char command = Serial.read();
    if (command == 'H') {
      ledState = true;
    } else if (command == 'L') {
      ledState = false;
    }
    digitalWrite(ledPin, ledState ? HIGH : LOW);
  }

  delay(50);
}
