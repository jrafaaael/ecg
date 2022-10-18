#include <Filters.h>

#include <AH/Timing/MillisMicrosTimer.hpp>
#include <Filters/Butterworth.hpp>

#define lead_plus 11
#define lead_minus 12
#define ecg A0
#define buzzer A1

// Sampling frequency
const double f_s = 125; // Hz
// Cut-off frequency (-3 dB)
const double f_c = 58; // Hz
// Normalized cut-off frequency
const double f_n = 2 * f_c / f_s;

// Sample timer
Timer<micros> timer = std::round(1e6 / f_s);

// Very simple Finite Impulse Response notch filter
auto filter = butter<6>(f_n);

void setup() {
  pinMode(lead_plus, INPUT);
  pinMode(lead_minus, INPUT);
  pinMode(buzzer, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  if (timer) {
    Serial.println(filter(analogRead(ecg)));
  }

  delay(5);
}
