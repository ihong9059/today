// [notes] Note frequency definitions
#define NOTE_C4  262
#define NOTE_D4  294
#define NOTE_E4  330
#define NOTE_F4  349
#define NOTE_G4  392
#define NOTE_A4  440
#define NOTE_B4  494
#define NOTE_C5  523
#define NOTE_D5  587
#define NOTE_E5  659
#define NOTE_F5  698
#define NOTE_G5  784
#define REST     0

// [song1] School Bell melody notes
int mel1[] = {
  NOTE_G4, NOTE_G4, NOTE_A4, NOTE_A4, NOTE_G4, NOTE_G4, NOTE_E4,
  NOTE_G4, NOTE_G4, NOTE_E4, NOTE_E4, NOTE_D4,
  NOTE_G4, NOTE_G4, NOTE_A4, NOTE_A4, NOTE_G4, NOTE_G4, NOTE_E4,
  NOTE_G4, NOTE_G4, NOTE_E4, NOTE_E4, NOTE_D4
};
int dur1[] = {
  300, 300, 300, 300, 300, 300, 600,
  300, 300, 300, 300, 700,
  300, 300, 300, 300, 300, 300, 600,
  300, 300, 300, 300, 700
};
int len1 = 24;

// [song2] Twinkle Twinkle Little Star notes
int mel2[] = {
  NOTE_C4, NOTE_C4, NOTE_G4, NOTE_G4, NOTE_A4, NOTE_A4, NOTE_G4,
  NOTE_F4, NOTE_F4, NOTE_E4, NOTE_E4, NOTE_D4, NOTE_D4, NOTE_C4,
  NOTE_G4, NOTE_G4, NOTE_F4, NOTE_F4, NOTE_E4, NOTE_E4, NOTE_D4,
  NOTE_G4, NOTE_G4, NOTE_F4, NOTE_F4, NOTE_E4, NOTE_E4, NOTE_D4,
  NOTE_C4, NOTE_C4, NOTE_G4, NOTE_G4, NOTE_A4, NOTE_A4, NOTE_G4,
  NOTE_F4, NOTE_F4, NOTE_E4, NOTE_E4, NOTE_D4, NOTE_D4, NOTE_C4
};
int dur2[] = {
  300, 300, 300, 300, 300, 300, 600,
  300, 300, 300, 300, 300, 300, 600,
  300, 300, 300, 300, 300, 300, 600,
  300, 300, 300, 300, 300, 300, 600,
  300, 300, 300, 300, 300, 300, 600,
  300, 300, 300, 300, 300, 300, 700
};
int len2 = 42;

// [song3] Happy Birthday notes
int mel3[] = {
  NOTE_G4, NOTE_G4, NOTE_A4, NOTE_G4, NOTE_C5, NOTE_B4,
  NOTE_G4, NOTE_G4, NOTE_A4, NOTE_G4, NOTE_D5, NOTE_C5,
  NOTE_G4, NOTE_G4, NOTE_G5, NOTE_E5, NOTE_C5, NOTE_B4, NOTE_A4,
  NOTE_F5, NOTE_F5, NOTE_E5, NOTE_C5, NOTE_D5, NOTE_C5
};
int dur3[] = {
  300, 100, 400, 400, 400, 800,
  300, 100, 400, 400, 400, 800,
  300, 100, 400, 400, 400, 400, 800,
  300, 100, 400, 400, 400, 800
};
int len3 = 25;

// [songs] Song name strings (ASCII only)
const char* songName[] = {"School Bell", "Twinkle Star", "Happy Birthday"};

// [state] Current song index
int currentSong = 0;
bool switchWasPressed = false;
unsigned long lastDebounce = 0;
#define DEBOUNCE_MS 250

// [color] Set LED color by song index
void setLedForSong(int idx) {
  if (idx == 0) {
    // [red] School Bell
    pixel.setPixelColor(0, pixel.Color(255, 0, 0));
  } else if (idx == 1) {
    // [blue] Twinkle Star
    pixel.setPixelColor(0, pixel.Color(0, 0, 255));
  } else {
    // [green] Happy Birthday
    pixel.setPixelColor(0, pixel.Color(0, 255, 0));
  }
  pixel.show();
}

// [oled] Show song name and status on OLED
void showOled(const char* name, const char* status) {
  oled.clear();
  oled.drawString(0, 0, "My Instrument");
  oled.drawString(0, 16, name);
  oled.drawString(0, 32, status);
  oled.display();
}

// [play] Play a melody by index
void playSong(int idx) {
  int* mel;
  int* dur;
  int len;

  if (idx == 0) {
    mel = mel1; dur = dur1; len = len1;
  } else if (idx == 1) {
    mel = mel2; dur = dur2; len = len2;
  } else {
    mel = mel3; dur = dur3; len = len3;
  }

  // [display] Show song name while playing
  setLedForSong(idx);
  showOled(songName[idx], "Playing...");

  // [notes] Play each note in sequence
  for (int i = 0; i < len; i++) {
    if (mel[i] == REST) {
      noTone(2);
    } else {
      tone(2, mel[i], dur[i]);
    }
    delay(dur[i] + 40);
    noTone(2);
  }

  // [done] Show finished status
  showOled(songName[idx], "Done! Press SW");
}

void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();

  // [init] Show welcome screen
  oled.clear();
  oled.drawString(0, 0, "My Instrument");
  oled.drawString(0, 16, "Press switch");
  oled.drawString(0, 32, "to play song!");
  oled.display();

  // [init] White LED on startup
  pixel.setPixelColor(0, pixel.Color(255, 255, 255));
  pixel.show();
}

void loop() {
  bool sw = digitalRead(SWITCH_PIN);

  // [switch] Detect button press with debounce
  if (sw == LOW && !switchWasPressed) {
    unsigned long now = millis();
    if (now - lastDebounce > DEBOUNCE_MS) {
      lastDebounce = now;
      switchWasPressed = true;

      // [play] Play current song then advance index
      playSong(currentSong);
      currentSong = (currentSong + 1) % 3;
    }
  }

  if (sw == HIGH) {
    switchWasPressed = false;
  }

  delay(10);
}