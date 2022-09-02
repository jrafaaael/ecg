#define ecg A0

void setup() {
  Serial.begin(9600);
  delay(2000);
}

void loop() {
    Serial.println(analogRead(ecg));
}
