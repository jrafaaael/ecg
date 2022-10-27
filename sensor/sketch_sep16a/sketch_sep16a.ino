#include <Filters.h>

#include <AH/Timing/MillisMicrosTimer.hpp>
#include <Filters/Butterworth.hpp>

// Sampling frequency
const double f_s = 125; // Hz
// Cut-off frequency (-3 dB)
const double f_c = 25; // Hz
// Normalized cut-off frequency
const double f_n = 2 * f_c / f_s;

// Sample timer
Timer<micros> timer = std::round(1e6 / f_s);

// Very simple Finite Impulse Response notch filter
auto filter = butter<6>(f_n);

void setup() {
  pinMode(A1, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  unsigned int valor = analogRead(A2);

  if (timer) {
    unsigned int xd = filter(valor);
    if (xd > 600)
      xd = 300;
    if ((xd > 450) && (xd < 500))
      digitalWrite(A1, HIGH);
    else
      digitalWrite(A1, LOW);
    Serial.println(xd);
  }
}
