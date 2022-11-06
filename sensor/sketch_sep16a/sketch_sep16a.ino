#include <Filters.h>
#include <AH/Timing/MillisMicrosTimer.hpp>
#include <Filters/Butterworth.hpp>

#define ECG A7
#define BUZZER A1
#define LED 2

// Sampling frequency
const double f_s = 125;  // Hz
// Cut-off frequency (-3 dB)
const double f_c = 25;  // Hz
// Normalized cut-off frequency
const double f_n = 2 * f_c / f_s;

// Sample timer
Timer<micros> timer = std::round(1e6 / f_s);

// Very simple Finite Impulse Response notch filter
auto filter = butter<6>(f_n);

void setup() {
  Serial.begin(9600);

  pinMode(BUZZER, OUTPUT);
  pinMode(LED, OUTPUT);
}

void loop() {
  unsigned int ecg = analogRead(ECG);

  if (timer) {
    unsigned int filtered_ecg = filter(ecg);

    if (filtered_ecg > 600) {
      filtered_ecg = 300;
    }

    if ((filtered_ecg > 450) && (filtered_ecg < 500)) {
      digitalWrite(BUZZER, HIGH);
      digitalWrite(LED, HIGH);
    } else {
      digitalWrite(BUZZER, LOW);
      digitalWrite(LED, LOW);
    }
    
    Serial.println(filtered_ecg);
  }
}