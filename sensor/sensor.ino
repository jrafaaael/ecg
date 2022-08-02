void setup() {
  Serial.begin(9600);
  delay(2000);
}

void loop() {
  Serial.println(String(random(100)));
}
