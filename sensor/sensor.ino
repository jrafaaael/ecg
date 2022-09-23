#include <SimpleKalmanFilter.h>

#define ecg A0

SimpleKalmanFilter simpleKalmanFilter(2, 2, 0.01);

const long SERIAL_REFRESH_TIME = 10;
long refresh_time;

void setup() {
  Serial.begin(9600);
}

void loop() {
  unsigned int value = analogRead(ecg);
  float estimated_value = simpleKalmanFilter.updateEstimate(value);

  if (millis() > refresh_time) {
    Serial.println(estimated_value, 4);

    refresh_time = millis() + SERIAL_REFRESH_TIME;
  }
}
