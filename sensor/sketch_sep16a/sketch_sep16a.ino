#include <Filters.h>
#include <AH/Timing/MillisMicrosTimer.hpp>
#include <Filters/Butterworth.hpp>

#define ECG A7
#define BUZZER A1
#define LED 2

const double f_s = 125;            // Sampling frequency. Hz
const double f_c = 25;             // Cut-off frequency (-3 dB). Hz
const double f_n = 2 * f_c / f_s;  // Normalized cut-off frequency

Timer<micros> timer = std::round(1e6 / f_s);
Timer<millis> bpm_timer = 5000;

auto filter = butter<6>(f_n);

const String ECG_STRING = "ecg:";
const String BPM_STRING = "bpm:";

bool would_count_beat = true;
unsigned char beats = 0;

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

    if ((filtered_ecg > 405) && (filtered_ecg < 500)) {
      digitalWrite(BUZZER, HIGH);
      digitalWrite(LED, HIGH);

      if (would_count_beat) {
        beats++;
        would_count_beat = false;
      }
    } else {
      digitalWrite(BUZZER, LOW);
      digitalWrite(LED, LOW);
      would_count_beat = true;
    }

    String ecg_to_send = ECG_STRING + filtered_ecg;
    Serial.println(ecg_to_send);
  }

  if (bpm_timer) {
    unsigned char bpm = beats * 6;
    String bpm_to_send = BPM_STRING + bpm;
    Serial.println(bpm_to_send);

    beats = 0;
  }
}