/**
 * AI FanStick MVP - ESP32-C3 SuperMini (BLE + 한글 지원)
 * U8g2 라이브러리로 OLED 한글 표시
 */

#include <BLEDevice.h>
#include <BLEServer.h>
#include <BLEUtils.h>
#include <BLE2902.h>
#include <Adafruit_NeoPixel.h>
#include <Wire.h>
#include <U8g2lib.h>

// ===== GPIO 핀 정의 =====
#define LED_PIN     1
#define BUZZER_PIN  2
#define BUTTON_PIN  5
#define SDA_PIN     6
#define SCL_PIN     7

// ===== BLE 설정 =====
#define SERVICE_UUID        "4fafc201-1fb5-459e-8fcc-c5c9c331914b"
#define LED_CHAR_UUID       "beb5483e-36e1-4688-b7f5-ea07361b26a8"
#define NOTIFY_CHAR_UUID    "beb5483e-36e1-4688-b7f5-ea07361b26a9"

BLEServer* pServer = nullptr;
BLECharacteristic* pLedCharacteristic = nullptr;
BLECharacteristic* pNotifyCharacteristic = nullptr;
bool deviceConnected = false;
bool oldDeviceConnected = false;

// ===== LED 설정 =====
#define NUM_LEDS    1
Adafruit_NeoPixel strip(NUM_LEDS, LED_PIN, NEO_GRB + NEO_KHZ800);

uint8_t currentR = 0, currentG = 0, currentB = 128;
uint8_t brightness = 128;
String currentPattern = "solid";
unsigned long lastPatternUpdate = 0;
int patternStep = 0;
bool patternRunning = false;

// ===== OLED 설정 (U8g2 한글 지원) =====
U8G2_SSD1306_128X64_NONAME_F_HW_I2C u8g2(U8G2_R0, U8X8_PIN_NONE, SCL_PIN, SDA_PIN);

// ===== 버튼 설정 =====
bool lastButtonState = HIGH;
unsigned long lastDebounceTime = 0;
const unsigned long debounceDelay = 50;

// ===== 음계 정의 =====
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
#define NOTE_A5  880
#define NOTE_B5  988
#define NOTE_C6  1047
#define NOTE_D6  1175
#define NOTE_E6  1319
#define NOTE_F6  1397
#define NOTE_G6  1568
#define NOTE_A6  1760
#define NOTE_B6  1976
#define NOTE_C7  2093

// ===== 함수 선언 =====
void parseCommand(String cmd);
void setLedColor(uint8_t r, uint8_t g, uint8_t b);
void startPattern(String pattern);
void updatePattern();
void playBuzzer(String pattern);
void showText(String text);
void showStatus(String line1, String line2);
uint32_t colorWheel(uint8_t pos);
void notifyClient(String msg);

// ===== BLE 콜백 =====
class ServerCallbacks : public BLEServerCallbacks {
  void onConnect(BLEServer* pServer) {
    deviceConnected = true;
    Serial.println("[BLE] 연결됨");
    playBuzzer("connect");
    showStatus("연결됨!", "BLE OK");
  }

  void onDisconnect(BLEServer* pServer) {
    deviceConnected = false;
    Serial.println("[BLE] 연결 해제");
    showStatus("대기 중...", "BLE 검색");
  }
};

class LedCharCallbacks : public BLECharacteristicCallbacks {
  void onWrite(BLECharacteristic* pCharacteristic) {
    String value = pCharacteristic->getValue();
    if (value.length() > 0) {
      // 줄바꿈/공백 제거
      value.trim();
      Serial.print("[BLE RX] ");
      Serial.println(value.c_str());
      parseCommand(value);
    }
  }
};

void setup() {
  Serial.begin(115200);
  delay(1000);

  Serial.println();
  Serial.println("================================");
  Serial.println("  AI FanStick MVP (한글 지원)");
  Serial.println("================================");

  // 핀 설정
  pinMode(BUZZER_PIN, OUTPUT);
  pinMode(BUTTON_PIN, INPUT_PULLUP);

  // LED 초기화
  strip.begin();
  strip.setBrightness(brightness);
  strip.show();
  Serial.println("[LED] 초기화 완료");

  // OLED 초기화 (U8g2)
  u8g2.begin();
  u8g2.enableUTF8Print();
  u8g2.setFont(u8g2_font_unifont_t_korean2);

  u8g2.clearBuffer();
  u8g2.setCursor(20, 25);
  u8g2.print("AI 응원봉");
  u8g2.setCursor(25, 45);
  u8g2.print("BLE 모드");
  u8g2.sendBuffer();
  Serial.println("[OLED] 한글 초기화 완료");

  // BLE 초기화
  BLEDevice::init("홍광삼 응원봉");
  pServer = BLEDevice::createServer();
  pServer->setCallbacks(new ServerCallbacks());

  BLEService* pService = pServer->createService(SERVICE_UUID);

  pLedCharacteristic = pService->createCharacteristic(
    LED_CHAR_UUID,
    BLECharacteristic::PROPERTY_WRITE |
    BLECharacteristic::PROPERTY_WRITE_NR
  );
  pLedCharacteristic->setCallbacks(new LedCharCallbacks());

  pNotifyCharacteristic = pService->createCharacteristic(
    NOTIFY_CHAR_UUID,
    BLECharacteristic::PROPERTY_NOTIFY |
    BLECharacteristic::PROPERTY_READ
  );
  pNotifyCharacteristic->addDescriptor(new BLE2902());

  pService->start();

  BLEAdvertising* pAdvertising = BLEDevice::getAdvertising();
  pAdvertising->addServiceUUID(SERVICE_UUID);
  pAdvertising->setScanResponse(true);
  pAdvertising->setMinPreferred(0x06);
  BLEDevice::startAdvertising();

  Serial.println("[BLE] 광고 시작");

  // 시작 LED (파란색)
  setLedColor(0, 0, 128);
  playBuzzer("success");

  delay(2000);
  showStatus("대기 중...", "BLE 검색");

  Serial.println("[시작] 준비 완료!");
}

void loop() {
  if (!deviceConnected && oldDeviceConnected) {
    delay(500);
    BLEDevice::startAdvertising();
    oldDeviceConnected = deviceConnected;
  }
  if (deviceConnected && !oldDeviceConnected) {
    oldDeviceConnected = deviceConnected;
  }

  if (Serial.available()) {
    String cmd = Serial.readStringUntil('\n');
    cmd.trim();
    if (cmd.length() > 0) {
      parseCommand(cmd);
    }
  }

  updatePattern();

  // 버튼 처리
  static bool buttonState = HIGH;
  bool reading = digitalRead(BUTTON_PIN);

  if (reading != lastButtonState) {
    lastDebounceTime = millis();
  }

  if ((millis() - lastDebounceTime) > debounceDelay) {
    if (reading != buttonState) {
      buttonState = reading;
      if (buttonState == LOW) {
        Serial.println("[버튼] 눌림");
        playBuzzer("ack");
        notifyClient("BTN:pressed");

        static int patternIndex = 0;
        const char* patterns[] = {"solid", "rainbow", "pulse", "blink", "wave"};
        patternIndex = (patternIndex + 1) % 5;
        startPattern(patterns[patternIndex]);
      }
    }
  }
  lastButtonState = reading;

  delay(10);
}

void notifyClient(String msg) {
  if (deviceConnected && pNotifyCharacteristic) {
    pNotifyCharacteristic->setValue(msg.c_str());
    pNotifyCharacteristic->notify();
  }
}

void parseCommand(String cmd) {
  if (cmd.length() < 2 || cmd.charAt(1) != ':') {
    return;
  }

  char type = cmd.charAt(0);
  String param = cmd.substring(2);

  switch (type) {
    case 'C': case 'c': {
      int comma1 = param.indexOf(',');
      int comma2 = param.lastIndexOf(',');
      if (comma1 > 0 && comma2 > comma1) {
        int r = param.substring(0, comma1).toInt();
        int g = param.substring(comma1 + 1, comma2).toInt();
        int b = param.substring(comma2 + 1).toInt();
        setLedColor(constrain(r, 0, 255), constrain(g, 0, 255), constrain(b, 0, 255));
      }
      break;
    }
    case 'P': case 'p': startPattern(param); break;
    case 'T': case 't': showText(param); break;
    case 'B': case 'b': playBuzzer(param); break;
    case 'M': case 'm': playBuzzer(param); break;  // 멜로디: M:dynamite, M:butter, M:spring, M:army
    case 'L': case 'l': {
      brightness = constrain(param.toInt(), 0, 255);
      strip.setBrightness(brightness);
      strip.show();
      break;
    }
  }
}

void setLedColor(uint8_t r, uint8_t g, uint8_t b) {
  currentR = r; currentG = g; currentB = b;
  patternRunning = false;
  currentPattern = "solid";
  strip.setPixelColor(0, strip.Color(r, g, b));
  strip.show();
}

void startPattern(String pattern) {
  currentPattern = pattern;
  patternStep = 0;
  lastPatternUpdate = millis();
  patternRunning = (pattern != "solid");
  if (!patternRunning) {
    strip.setPixelColor(0, strip.Color(currentR, currentG, currentB));
    strip.show();
  }
}

void updatePattern() {
  if (!patternRunning) return;
  unsigned long now = millis();

  if (currentPattern == "rainbow" && now - lastPatternUpdate > 100) {
    lastPatternUpdate = now;
    strip.setPixelColor(0, colorWheel(patternStep));
    strip.show();
    patternStep = (patternStep + 4) % 256;
  }
  else if (currentPattern == "pulse" && now - lastPatternUpdate > 20) {
    lastPatternUpdate = now;
    float factor = (sin(patternStep * 0.1) + 1.0) / 2.0;
    strip.setPixelColor(0, strip.Color(currentR * factor, currentG * factor, currentB * factor));
    strip.show();
    patternStep++;
  }
  else if (currentPattern == "blink" && now - lastPatternUpdate > 500) {
    lastPatternUpdate = now;
    patternStep = !patternStep;
    strip.setPixelColor(0, patternStep ? strip.Color(currentR, currentG, currentB) : 0);
    strip.show();
  }
  else if (currentPattern == "wave" && now - lastPatternUpdate > 30) {
    lastPatternUpdate = now;
    float wave = (sin(patternStep * 0.15) + 1.0) / 2.0;
    strip.setPixelColor(0, strip.Color(currentR * wave, currentG * wave, currentB * wave));
    strip.show();
    patternStep++;
  }
}

uint32_t colorWheel(uint8_t pos) {
  if (pos < 85) return strip.Color(pos * 3, 255 - pos * 3, 0);
  else if (pos < 170) { pos -= 85; return strip.Color(255 - pos * 3, 0, pos * 3); }
  else { pos -= 170; return strip.Color(0, pos * 3, 255 - pos * 3); }
}

void playBuzzer(String pattern) {
  if (pattern == "ack") tone(BUZZER_PIN, 2700, 100);
  else if (pattern == "beep") tone(BUZZER_PIN, 2700, 200);
  else if (pattern == "error") { for (int i = 0; i < 3; i++) { tone(BUZZER_PIN, 2700, 100); delay(150); } }
  else if (pattern == "success") { tone(BUZZER_PIN, 2000, 100); delay(100); tone(BUZZER_PIN, 2500, 100); delay(100); tone(BUZZER_PIN, 3000, 150); }
  else if (pattern == "connect") { tone(BUZZER_PIN, 2700, 100); delay(100); tone(BUZZER_PIN, 2700, 100); }
  // 멜로디
  else if (pattern == "dynamite") playDynamite();
  else if (pattern == "butter") playButter();
  else if (pattern == "spring") playSpringDay();
  else if (pattern == "army") playArmyChant();
  else if (pattern == "winner") playWinner();
}

// Dynamite 후렴구 멜로디
void playDynamite() {
  showText("Dynamite!");
  int melody[] = {NOTE_E5, NOTE_E5, NOTE_F5, NOTE_G5, NOTE_G5, NOTE_F5, NOTE_E5, NOTE_D5,
                  NOTE_C5, NOTE_C5, NOTE_D5, NOTE_E5, NOTE_E5, NOTE_D5, NOTE_D5};
  int duration[] = {200, 200, 200, 400, 200, 200, 200, 400,
                    200, 200, 200, 400, 300, 150, 400};
  for (int i = 0; i < 15; i++) {
    tone(BUZZER_PIN, melody[i], duration[i]);
    delay(duration[i] + 50);
  }
  noTone(BUZZER_PIN);
}

// Butter 후렴구 멜로디
void playButter() {
  showText("Butter!");
  int melody[] = {NOTE_G5, NOTE_E5, NOTE_G5, NOTE_A5, NOTE_G5, NOTE_E5, NOTE_D5,
                  NOTE_E5, NOTE_G5, NOTE_A5, NOTE_B5, NOTE_A5, NOTE_G5};
  int duration[] = {300, 150, 300, 300, 300, 150, 400,
                    200, 200, 200, 400, 200, 400};
  for (int i = 0; i < 13; i++) {
    tone(BUZZER_PIN, melody[i], duration[i]);
    delay(duration[i] + 50);
  }
  noTone(BUZZER_PIN);
}

// 봄날 멜로디
void playSpringDay() {
  showText("봄날");
  int melody[] = {NOTE_E5, NOTE_D5, NOTE_C5, NOTE_D5, NOTE_E5, NOTE_E5, NOTE_E5,
                  NOTE_D5, NOTE_D5, NOTE_D5, NOTE_E5, NOTE_G5, NOTE_G5};
  int duration[] = {400, 200, 400, 200, 200, 200, 400,
                    200, 200, 400, 200, 200, 600};
  for (int i = 0; i < 13; i++) {
    tone(BUZZER_PIN, melody[i], duration[i]);
    delay(duration[i] + 50);
  }
  noTone(BUZZER_PIN);
}

// ARMY 응원 챈트
void playArmyChant() {
  showText("BTS! BTS!");
  // B-T-S 리듬
  for (int j = 0; j < 2; j++) {
    tone(BUZZER_PIN, NOTE_G5, 150); delay(200);
    tone(BUZZER_PIN, NOTE_G5, 150); delay(200);
    tone(BUZZER_PIN, NOTE_G5, 300); delay(400);
  }
  noTone(BUZZER_PIN);
}

// 당첨 축하 멜로디
void playWinner() {
  showText("축하합니다!");
  // 화려한 팡파레 스타일 멜로디
  int melody[] = {NOTE_C5, NOTE_E5, NOTE_G5, NOTE_C6, NOTE_G5, NOTE_C6,
                  NOTE_E6, NOTE_D6, NOTE_C6, NOTE_E6, NOTE_G6};
  int duration[] = {150, 150, 150, 300, 150, 150,
                    200, 200, 200, 300, 500};

  // LED 무지개 효과 시작
  startPattern("rainbow");

  for (int i = 0; i < 11; i++) {
    tone(BUZZER_PIN, melody[i], duration[i]);
    delay(duration[i] + 30);
  }

  // 추가 당첨음
  delay(100);
  for (int j = 0; j < 3; j++) {
    tone(BUZZER_PIN, NOTE_G6, 100); delay(150);
    tone(BUZZER_PIN, NOTE_C7, 200); delay(250);
  }
  noTone(BUZZER_PIN);
}

void showText(String text) {
  // 화면 완전 초기화
  u8g2.clearBuffer();
  u8g2.setDrawColor(1);  // 흰색 글자
  u8g2.setFont(u8g2_font_unifont_t_korean2);

  Serial.print("[OLED] 표시: ");
  Serial.println(text);

  // 텍스트만 표시 (간단하게)
  int y = 15;
  int x = 0;
  int charCount = 0;

  for (int i = 0; i < text.length() && y < 64; ) {
    char c = text.charAt(i);
    int charBytes = 1;

    // UTF-8 문자 바이트 수 확인
    if ((c & 0x80) == 0) {
      charBytes = 1;  // ASCII
    } else if ((c & 0xE0) == 0xC0) {
      charBytes = 2;  // 2바이트 UTF-8
    } else if ((c & 0xF0) == 0xE0) {
      charBytes = 3;  // 3바이트 UTF-8 (한글)
    } else {
      i++;
      continue;
    }

    // 한 글자 추출
    String ch = text.substring(i, i + charBytes);
    i += charBytes;

    // 줄바꿈 처리 (8자마다)
    if (charCount >= 8) {
      y += 16;
      x = 0;
      charCount = 0;
    }

    if (y < 64) {
      u8g2.setCursor(x, y);
      u8g2.print(ch);
      x += (charBytes == 1) ? 8 : 16;  // ASCII는 8픽셀, 한글은 16픽셀
      charCount++;
    }
  }

  u8g2.sendBuffer();
}

void showStatus(String line1, String line2) {
  u8g2.clearBuffer();
  u8g2.setFont(u8g2_font_unifont_t_korean2);
  u8g2.setCursor(10, 25);
  u8g2.print("AI 응원봉");
  u8g2.setCursor(20, 45);
  u8g2.print(line1);
  u8g2.setCursor(20, 60);
  u8g2.print(line2);
  u8g2.sendBuffer();
}
