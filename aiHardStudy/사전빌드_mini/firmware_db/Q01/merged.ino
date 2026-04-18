/**
 * BLE OTA Bootloader — Arduino Version
 * ESP32-C3 SuperMini
 *
 * BLE OTA Service UUID: 0000FE00-...
 *   FE01: OTA_CONTROL (Write) — START/END/ABORT
 *   FE02: OTA_DATA (Write No Response) — firmware chunks
 *   FE03: OTA_STATUS (Notify) — progress
 */

#include <NimBLEDevice.h>
#include <Update.h>
#include <Wire.h>
#include <Preferences.h>
#include <Adafruit_NeoPixel.h>
#include "ssd1306.h"

// ─── NVS 저장소 (BLE 이름 영구 저장) ───
Preferences prefs;
char bleName[32] = "UTTEC-MINI";

// ─── Pin Definitions (ESP32-C3 SuperMini) ───
#define WS2812_PIN  1   // WS2812 RGB LED data pin
#define SPEAKER     2   // Speaker (BCX56 transistor, PWM/tone())
#define SWITCH_PIN  5   // Tact switch (Active LOW, 100nF debounce)
#define I2C_SDA     6   // I2C data (10K pullup)
#define I2C_SCL     7   // I2C clock (10K pullup)

// ─── WS2812 RGB LED ───
Adafruit_NeoPixel pixel(1, WS2812_PIN, NEO_GRB + NEO_KHZ800);

// ─── Note frequencies (도레미파솔라시도) ───
static const int NOTES[] = {262, 294, 330, 349, 392, 440, 494, 523};

// ─── OTA Protocol ───
#define OTA_CMD_START   0x01
#define OTA_CMD_END     0x02
#define OTA_CMD_ABORT   0x03

#define OTA_STATUS_IDLE      0x00
#define OTA_STATUS_READY     0x01
#define OTA_STATUS_RECEIVING 0x02
#define OTA_STATUS_VERIFYING 0x03
#define OTA_STATUS_SUCCESS   0x04
#define OTA_STATUS_CRC_FAIL  0x05
#define OTA_STATUS_WRITE_FAIL 0x06
#define OTA_STATUS_ABORT_OK  0x07

// ─── UUIDs ───
#define OTA_SERVICE_UUID "0000fe00-0000-1000-8000-00805f9b34fb"
#define OTA_CTRL_UUID    "0000fe01-0000-1000-8000-00805f9b34fb"
#define OTA_DATA_UUID    "0000fe02-0000-1000-8000-00805f9b34fb"
#define OTA_STATUS_UUID  "0000fe03-0000-1000-8000-00805f9b34fb"
#define CMD_UUID         "0000fe04-0000-1000-8000-00805f9b34fb"
#define SENSOR_UUID      "0000fe05-0000-1000-8000-00805f9b34fb"

// ─── Globals ───
static NimBLECharacteristic* statusChar = nullptr;
static NimBLECharacteristic* sensorChar = nullptr;
static bool deviceConnected = false;
static bool otaInProgress = false;
static uint32_t otaTotalSize = 0;
static uint32_t otaReceived = 0;

// ─── Status Notify ───
void sendStatus(uint8_t status, uint8_t progress) {
  if (!deviceConnected || !statusChar) return;
  uint8_t data[2] = {status, progress};
  statusChar->setValue(data, 2);
  statusChar->notify();
}

// ─── OTA Control Callback ───
class OTAControlCallbacks : public NimBLECharacteristicCallbacks {
  void onWrite(NimBLECharacteristic* pChar, NimBLEConnInfo& connInfo) override {
    std::string val = pChar->getValue();
    if (val.empty()) return;
    uint8_t cmd = val[0];

    if (cmd == OTA_CMD_START) {
      if (val.length() >= 5) {
        otaTotalSize = val[1] | (val[2] << 8) | (val[3] << 16) | (val[4] << 24);
      } else {
        otaTotalSize = 0;
      }
      Serial.printf("OTA START, size=%u\n", otaTotalSize);

      if (!Update.begin(otaTotalSize > 0 ? otaTotalSize : UPDATE_SIZE_UNKNOWN)) {
        Serial.println("Update.begin failed");
        sendStatus(OTA_STATUS_WRITE_FAIL, 0);
        return;
      }
      otaInProgress = true;
      otaReceived = 0;
      sendStatus(OTA_STATUS_READY, 0);

    } else if (cmd == OTA_CMD_END) {
      if (!otaInProgress) return;
      Serial.printf("OTA END, received=%u\n", otaReceived);
      sendStatus(OTA_STATUS_VERIFYING, 100);

      if (!Update.end(true)) {
        Serial.println("Update.end failed");
        otaInProgress = false;
        sendStatus(OTA_STATUS_CRC_FAIL, 0);
        return;
      }

      otaInProgress = false;
      sendStatus(OTA_STATUS_SUCCESS, 100);
      Serial.println("OTA SUCCESS! Restarting...");
      delay(2000);
      ESP.restart();

    } else if (cmd == OTA_CMD_ABORT) {
      Serial.println("OTA ABORT");
      if (otaInProgress) {
        Update.abort();
        otaInProgress = false;
      }
      sendStatus(OTA_STATUS_ABORT_OK, 0);
    }
  }
};

// ─── OTA Data Callback ───
class OTADataCallbacks : public NimBLECharacteristicCallbacks {
  void onWrite(NimBLECharacteristic* pChar, NimBLEConnInfo& connInfo) override {
    if (!otaInProgress) return;
    std::string val = pChar->getValue();
    size_t len = val.length();

    if (Update.write((uint8_t*)val.data(), len) != len) {
      Serial.println("Update.write failed");
      sendStatus(OTA_STATUS_WRITE_FAIL, 0);
      return;
    }

    otaReceived += len;

    // Notify progress every 2KB
    if (otaTotalSize > 0 && (otaReceived % 2048) < len) {
      uint8_t progress = (uint8_t)((uint64_t)otaReceived * 100 / otaTotalSize);
      sendStatus(OTA_STATUS_RECEIVING, progress);
    }
  }
};

// ─── Forward declarations ───
extern SSD1306 oled;

// ─── AHT20 Temperature/Humidity Sensor (I2C addr 0x38) ───
#define AHT20_ADDR 0x38
static bool _aht20_inited = false;

void aht20_init() {
  // 소프트 리셋
  Wire.beginTransmission(AHT20_ADDR);
  Wire.write(0xBA);
  Wire.endTransmission();
  delay(20);

  // 초기화 명령 (calibration)
  Wire.beginTransmission(AHT20_ADDR);
  Wire.write(0xBE);
  Wire.write(0x08);
  Wire.write(0x00);
  Wire.endTransmission();
  delay(10);

  _aht20_inited = true;
  Serial.println("AHT20 initialized");
}

// 에러 코드: 0=성공, 1=I2C없음, 2=응답없음, 3=busy, 4=init실패
int aht20_err = 0;

bool aht20_read(float &temp, float &humi) {
  if (!_aht20_inited) aht20_init();

  // I2C 스캔 — 센서가 있는지 확인
  Wire.beginTransmission(AHT20_ADDR);
  uint8_t ack = Wire.endTransmission();
  if (ack != 0) {
    aht20_err = 1;
    Serial.printf("AHT20: I2C NACK (err=%d)\n", ack);
    return false;
  }

  // 측정 시작 명령
  Wire.beginTransmission(AHT20_ADDR);
  Wire.write(0xAC);
  Wire.write(0x33);
  Wire.write(0x00);
  Wire.endTransmission();

  delay(80);

  uint8_t n = Wire.requestFrom((uint8_t)AHT20_ADDR, (uint8_t)7);
  if (n < 7) {
    aht20_err = 2;
    Serial.printf("AHT20: only %d bytes\n", n);
    return false;
  }

  uint8_t data[7];
  for (int i = 0; i < 7; i++) data[i] = Wire.read();
  Serial.printf("AHT20 raw: %02X %02X %02X %02X %02X %02X %02X\n",
    data[0],data[1],data[2],data[3],data[4],data[5],data[6]);

  // busy 재시도
  if (data[0] & 0x80) {
    delay(100);
    Wire.requestFrom((uint8_t)AHT20_ADDR, (uint8_t)7);
    for (int i = 0; i < 7; i++) data[i] = Wire.read();
    if (data[0] & 0x80) {
      aht20_err = 3;
      return false;
    }
  }

  // calibration bit 체크
  if (!(data[0] & 0x08)) {
    _aht20_inited = false;
    aht20_init();
    aht20_err = 4;
    return false;
  }

  uint32_t rawHumi = ((uint32_t)data[1] << 12) | ((uint32_t)data[2] << 4) | (data[3] >> 4);
  uint32_t rawTemp = (((uint32_t)(data[3] & 0x0F)) << 16) | ((uint32_t)data[4] << 8) | data[5];

  humi = (float)rawHumi / 1048576.0f * 100.0f;
  temp = (float)rawTemp / 1048576.0f * 200.0f - 50.0f;
  aht20_err = 0;
  return true;
}

// ─── WS2812 Helper Functions ───
void setColor(uint8_t r, uint8_t g, uint8_t b) {
  pixel.setPixelColor(0, pixel.Color(r, g, b));
  pixel.show();
}

void setColorHex(uint32_t color) {
  pixel.setPixelColor(0, color);
  pixel.show();
}

void ledOff() {
  pixel.setPixelColor(0, 0);
  pixel.show();
}

// ─── Hardware Init (항상 모든 핀 초기화) ───
void initHardware() {
  // WS2812 RGB LED
  pixel.begin();
  pixel.setBrightness(50);
  pixel.clear();
  pixel.show();

  // Speaker OFF
  pinMode(SPEAKER, OUTPUT);
  digitalWrite(SPEAKER, LOW);

  // Switch (INPUT_PULLUP, Active LOW: 누르면 LOW)
  pinMode(SWITCH_PIN, INPUT_PULLUP);

  // I2C + OLED
  Wire.begin(I2C_SDA, I2C_SCL);
  oled.init();
  oled.clear();
  oled.drawString(0, 0, "UTTEC Mini");
  oled.drawString(0, 16, "BLE OTA Ready!");
  oled.drawString(0, 32, "Waiting...");
  oled.display();

  Serial.println("Hardware initialized");
}

// ─── Command Callback (패드 제어) ───
class CmdCallbacks : public NimBLECharacteristicCallbacks {
  void onWrite(NimBLECharacteristic* pChar, NimBLEConnInfo& connInfo) override {
    std::string val = pChar->getValue();
    if (val.empty()) return;
    String cmd = String(val.c_str());
    cmd.trim();
    Serial.printf("CMD: %s\n", cmd.c_str());

    // WS2812 색상 제어
    if (cmd == "LED_RED_ON")        { setColor(255, 0, 0); }
    else if (cmd == "LED_GREEN_ON") { setColor(0, 255, 0); }
    else if (cmd == "LED_BLUE_ON")  { setColor(0, 0, 255); }
    else if (cmd == "LED_YELLOW_ON"){ setColor(255, 255, 0); }
    else if (cmd == "LED_WHITE_ON") { setColor(255, 255, 255); }
    else if (cmd == "LED_CYAN_ON")  { setColor(0, 255, 255); }
    else if (cmd == "LED_PURPLE_ON"){ setColor(128, 0, 255); }
    else if (cmd == "LED_OFF" || cmd == "LED_ALL_OFF") { ledOff(); }
    else if (cmd.startsWith("LED_COLOR:")) {
      // LED_COLOR:RRGGBB (hex)
      String hex = cmd.substring(10);
      if (hex.length() == 6) {
        uint32_t c = strtoul(hex.c_str(), NULL, 16);
        setColor((c >> 16) & 0xFF, (c >> 8) & 0xFF, c & 0xFF);
      }
    }
    else if (cmd.startsWith("LED_BRIGHT:")) {
      int b = cmd.substring(11).toInt();
      pixel.setBrightness(constrain(b, 0, 255));
      pixel.show();
    }
    // 스피커 제어 (tone/melody)
    else if (cmd == "BEEP") {
      tone(SPEAKER, 1000, 100);
    }
    else if (cmd == "BEEP_LONG") {
      tone(SPEAKER, 1000, 500);
    }
    else if (cmd == "BEEP_SOS") {
      for (int i = 0; i < 3; i++) { tone(SPEAKER, 1000, 100); delay(200); }
      delay(200);
      for (int i = 0; i < 3; i++) { tone(SPEAKER, 1000, 300); delay(400); }
      delay(200);
      for (int i = 0; i < 3; i++) { tone(SPEAKER, 1000, 100); delay(200); }
    }
    else if (cmd.startsWith("NOTE_")) {
      int idx = cmd.substring(5).toInt(); // 0~7
      if (idx >= 0 && idx < 8) {
        tone(SPEAKER, NOTES[idx], 300);
      }
    }
    else if (cmd.startsWith("TONE:")) {
      // TONE:freq,duration (예: TONE:440,500)
      int comma = cmd.indexOf(',', 5);
      if (comma > 5) {
        int freq = cmd.substring(5, comma).toInt();
        int dur = cmd.substring(comma + 1).toInt();
        if (freq > 0 && dur > 0) tone(SPEAKER, freq, dur);
      }
    }
    else if (cmd == "NOTONE") {
      noTone(SPEAKER);
    }
    // OLED 제어
    else if (cmd.startsWith("OLED:")) {
      String text = cmd.substring(5);
      oled.clear();
      oled.drawString(0, 0, text.c_str());
      oled.display();
    }
    // 온습도 센서
    else if (cmd == "TEMP") {
      float temp, humi;
      if (aht20_read(temp, humi)) {
        char buf1[32], buf2[32];
        snprintf(buf1, sizeof(buf1), "Temp: %.1f C", temp);
        snprintf(buf2, sizeof(buf2), "Humi: %.1f %%", humi);
        oled.clear();
        oled.drawString(0, 0, "AHT20 Sensor");
        oled.drawString(0, 20, buf1);
        oled.drawString(0, 40, buf2);
        oled.display();
        Serial.printf("TEMP: %.1fC, HUMI: %.1f%%\n", temp, humi);
      } else {
        oled.clear();
        oled.drawString(0, 0, "AHT20 Error");
        oled.drawString(0, 20, "Check sensor!");
        oled.display();
        Serial.println("TEMP: AHT20 read failed");
      }
    }
    // BLE 이름 변경
    else if (cmd.startsWith("SETNAME:")) {
      String newName = cmd.substring(8);
      newName.trim();
      if (newName.length() > 0 && newName.length() < 30) {
        strncpy(bleName, newName.c_str(), sizeof(bleName) - 1);
        bleName[sizeof(bleName) - 1] = '\0';
        prefs.begin("uttec", false);
        prefs.putString("bleName", bleName);
        prefs.end();
        Serial.printf("BLE name changed to: %s (saved to NVS, reboot to apply)\n", bleName);
        oled.clear();
        oled.drawString(0, 0, "Name Changed!");
        oled.drawString(0, 16, bleName);
        oled.drawString(0, 32, "Rebooting...");
        oled.display();
        delay(2000);
        ESP.restart();
      }
    }
  }
};

// ─── BLE Server Callbacks ───
class ServerCallbacks : public NimBLEServerCallbacks {
  void onConnect(NimBLEServer* pServer, NimBLEConnInfo& connInfo) override {
    deviceConnected = true;
    Serial.println("BLE Connected");
  }

  void onDisconnect(NimBLEServer* pServer, NimBLEConnInfo& connInfo, int reason) override {
    deviceConnected = false;
    Serial.println("BLE Disconnected");
    if (otaInProgress) {
      Update.abort();
      otaInProgress = false;
      Serial.println("OTA aborted (disconnect)");
    }
    NimBLEDevice::startAdvertising();
  }
};

// ─── BLE Init ───
void initBLE() {
  prefs.begin("uttec", true);
  String savedName = prefs.getString("bleName", "UTTEC-MINI");
  prefs.end();
  strncpy(bleName, savedName.c_str(), sizeof(bleName) - 1);
  Serial.printf("BLE Name: %s\n", bleName);

  NimBLEDevice::init(bleName);
  NimBLEDevice::setMTU(256);

  NimBLEServer* pServer = NimBLEDevice::createServer();
  pServer->setCallbacks(new ServerCallbacks());

  NimBLEService* pService = pServer->createService(OTA_SERVICE_UUID);

  NimBLECharacteristic* ctrlChar = pService->createCharacteristic(
    OTA_CTRL_UUID, NIMBLE_PROPERTY::WRITE);
  ctrlChar->setCallbacks(new OTAControlCallbacks());

  NimBLECharacteristic* dataChar = pService->createCharacteristic(
    OTA_DATA_UUID, NIMBLE_PROPERTY::WRITE_NR);
  dataChar->setCallbacks(new OTADataCallbacks());

  statusChar = pService->createCharacteristic(
    OTA_STATUS_UUID, NIMBLE_PROPERTY::NOTIFY);

  NimBLECharacteristic* cmdChar = pService->createCharacteristic(
    CMD_UUID, NIMBLE_PROPERTY::WRITE);
  cmdChar->setCallbacks(new CmdCallbacks());

  sensorChar = pService->createCharacteristic(
    SENSOR_UUID, NIMBLE_PROPERTY::NOTIFY | NIMBLE_PROPERTY::READ);

  pService->start();

  NimBLEAdvertising* pAdv = NimBLEDevice::getAdvertising();
  pAdv->addServiceUUID(OTA_SERVICE_UUID);
  pAdv->setName(bleName);
  NimBLEAdvertisementData scanResp;
  scanResp.setName(bleName);
  pAdv->setScanResponseData(scanResp);
  pAdv->start();

  Serial.printf("BLE OTA initialized, advertising as %s\n", bleName);
}

// ─── OLED ───
SSD1306 oled(I2C_SDA, I2C_SCL);

// ─── Switch Monitor Task ───
void switchMonitorTask(void* param) {
  int lastState = HIGH;
  while (1) {
    int state = digitalRead(SWITCH_PIN);
    if (state != lastState) {
      lastState = state;
      if (deviceConnected && sensorChar) {
        uint8_t data[2] = {0x01, (uint8_t)(state == LOW ? 1 : 0)};
        sensorChar->setValue(data, 2);
        sensorChar->notify();
        Serial.printf("SWITCH: %s\n", state == LOW ? "PRESSED" : "RELEASED");
      }
    }
    delay(50);
  }
}


// ─── LED Task ───
// [스마트교실] 온습도 측정 + 쾌적도 LED + OLED 대시보드 + BLE 전송

float g_temp = 0.0;
float g_humi = 0.0;
String g_comfort = "측정중";

// [쾌적도] 온습도 기반 쾌적 등급 판정
String getComfortLevel(float t, float h) {
  if (t >= 20.0 && t <= 26.0 && h >= 40.0 && h <= 60.0) return "쾌적";
  if (t < 18.0 || h < 30.0) return "건조/추움";
  if (t > 28.0 || h > 70.0) return "덥고습함";
  return "보통";
}

// [LED] 쾌적도에 따라 RGB LED 색상 설정
void setComfortLED(String comfort) {
  if (comfort == "쾌적") {
    // 초록: 쾌적
    pixel.setPixelColor(0, pixel.Color(0, 200, 0));
  } else if (comfort == "덥고습함") {
    // 빨강: 덥고 습함
    pixel.setPixelColor(0, pixel.Color(255, 0, 0));
  } else if (comfort == "건조/추움") {
    // 파랑: 춥거나 건조
    pixel.setPixelColor(0, pixel.Color(0, 80, 255));
  } else {
    // 노랑: 보통
    pixel.setPixelColor(0, pixel.Color(255, 180, 0));
  }
  pixel.show();
}

// [OLED] 대시보드 화면 출력
void updateOLED(float t, float h, String comfort) {
  oled.clear();

  // 제목
  oled.drawString(0, 0, "[ Smart Classroom ]");

  // 온도 표시
  char tempStr[24];
  snprintf(tempStr, sizeof(tempStr), "Temp : %.1f C", t);
  oled.drawString(0, 16, tempStr);

  // 습도 표시
  char humiStr[24];
  snprintf(humiStr, sizeof(humiStr), "Humi : %.1f %%", h);
  oled.drawString(0, 28, humiStr);

  // 쾌적도 표시
  char comfortLine[32];
  snprintf(comfortLine, sizeof(comfortLine), "State: %s", comfort.c_str());
  oled.drawString(0, 42, comfortLine);

  oled.display();
}

// [BLE] 센서 데이터 JSON 형태로 전송
void sendBLE(float t, float h, String comfort) {
  if (deviceConnected && sensorChar) {
    char buf[64];
    snprintf(buf, sizeof(buf),
             "{\"temp\":%.1f,\"humi\":%.1f,\"state\":\"%s\"}",
             t, h, comfort.c_str());
    std::string s(buf);
    sensorChar->setValue(s);
    sensorChar->notify();
  }
}

// [알림음] 쾌적도 이상 시 경고 비프
void alertBeep(String comfort) {
  if (comfort == "덥고습함") {
    // 고음 짧게 2회: 더움 경고
    tone(2, 2000, 150);
    delay(250);
    tone(2, 2000, 150);
    delay(250);
    noTone(2);
  } else if (comfort == "건조/추움") {
    // 저음 1회: 추움 경고
    tone(2, 500, 300);
    delay(400);
    noTone(2);
  }
}

// [태스크] 백그라운드에서 5초마다 측정 및 업데이트
void sensorTask(void* param) {
  String prevComfort = "";
  for (;;) {
    float t, h;
    bool ok = aht20_read(t, h);
    if (ok) {
      g_temp = t;
      g_humi = h;
      g_comfort = getComfortLevel(t, h);

      setComfortLED(g_comfort);
      updateOLED(t, h, g_comfort);
      sendBLE(t, h, g_comfort);

      // [알림] 쾌적도 상태 변화 시에만 알림음
      if (g_comfort != prevComfort && prevComfort != "") {
        alertBeep(g_comfort);
      }
      prevComfort = g_comfort;

      Serial.printf("[센서] %.1f°C / %.1f%% → %s\n", t, h, g_comfort.c_str());
    } else {
      // [오류] 센서 읽기 실패 시 흰색 LED
      pixel.setPixelColor(0, pixel.Color(80, 80, 80));
      pixel.show();
      oled.clear();
      oled.drawString(0, 20, "Sensor Error...");
      oled.display();
      Serial.println("[오류] AHT20 읽기 실패");
    }
    vTaskDelay(5000 / portTICK_PERIOD_MS); // 5초 간격
  }
}

// [BLE수신] 명령 수신 처리
void onBleReceive(String cmd) {
  cmd.trim();
  if (cmd == "READ") {
    // 즉시 BLE 전송
    sendBLE(g_temp, g_humi, g_comfort);
    Serial.println("[BLE] READ 명령 수신 → 즉시 전송");
  } else if (cmd == "ALERT") {
    // 수동 경고음 트리거
    alertBeep(g_comfort);
    Serial.println("[BLE] ALERT 명령 수신");
  } else {
    Serial.printf("[BLE] 알 수 없는 명령: %s\n", cmd.c_str());
  }
}

void setup() {
  Serial.begin(115200);
  initHardware();  // 핀/OLED/WS2812 초기화
  initBLE();       // BLE OTA 초기화

  // [시작화면] 부팅 메시지 표시
  oled.clear();
  oled.drawString(0, 10, "Smart Classroom");
  oled.drawString(0, 28, "  Initializing...");
  oled.display();

  // [시작음] 부팅 완료 비프
  tone(2, 1000, 100);
  delay(150);
  tone(2, 1500, 100);
  delay(200);
  noTone(2);

  // [LED] 시작 시 흰색 점등 후 대기
  pixel.setPixelColor(0, pixel.Color(80, 80, 80));
  pixel.show();
  delay(1000);

  // [태스크] 센서 측정 태스크 시작 (core 0, 4KB 스택)
  xTaskCreate(sensorTask, "SensorTask", 4096, NULL, 1, NULL);

  Serial.println("[시작] 스마트 교실 시스템 준비 완료");
}

void loop() {
  delay(10000);
}
