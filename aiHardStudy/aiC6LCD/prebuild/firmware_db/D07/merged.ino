/**
 * BLE OTA Bootloader — Arduino Version
 * ESP32-C6-LCD-1.47
 *
 * Board: Waveshare ESP32-C6-LCD-1.47
 *   MCU: ESP32-C6FH4 (RISC-V 160MHz, 512KB SRAM, 4MB Flash)
 *   LCD: 1.47" ST7789 172x320 (SPI)
 *   RGB: WS2812 x1 (GPIO8)
 *   BTN: BOOT (GPIO9)
 *   WiFi 6 + BLE 5.0 + Zigbee 3.0 + Thread
 *
 * BLE OTA Service UUID: 0000FE00-...
 *   FE01: OTA_CONTROL (Write) — START/END/ABORT
 *   FE02: OTA_DATA (Write No Response) — firmware chunks
 *   FE03: OTA_STATUS (Notify) — progress
 *   FE04: CMD (Write) — pad commands
 *   FE05: SENSOR (Notify/Read) — sensor/switch data
 */

#include <NimBLEDevice.h>
#include <Update.h>
#include <Wire.h>
#include <SPI.h>
#include <Preferences.h>
#include <Adafruit_GFX.h>
#include <Adafruit_ST7789.h>
#include <Adafruit_NeoPixel.h>
#include <SD.h>

// ─── SD Card ───
#define SD_CS 4
#define SD_MISO 5

// ─── NVS (BLE name persistent storage) ───
Preferences prefs;
char bleName[32] = "UTTEC-C6";

// ─── Pin Definitions (ESP32-C6-LCD-1.47) ───
// LCD (ST7789 172x320, SPI)
#define LCD_MOSI    6
#define LCD_SCLK    7
#define LCD_CS      14
#define LCD_DC      15
#define LCD_RST     21
#define LCD_BL      22

// RGB LED (WS2812 NeoPixel)
#define WS2812_PIN  8

// Button
#define BOOT_BTN    9

// I2C (external header)
#define I2C_SDA     1
#define I2C_SCL     2

// ─── Display (hardware SPI — shared bus with SD card) ───
Adafruit_ST7789 lcd = Adafruit_ST7789(&SPI, LCD_CS, LCD_DC, LCD_RST);

// ─── WS2812 RGB LED ───
Adafruit_NeoPixel pixel(1, WS2812_PIN, NEO_RGB + NEO_KHZ800);

// ─── Note frequencies ───
static const int NOTES[] = {262, 294, 330, 349, 392, 440, 494, 523};

// ─── LCD Colors (RGB565) ───
#define C_BG      0x0000  // Black
#define C_TEXT    0xFFFF  // White
#define C_GREEN   0x07E0
#define C_RED     0xF800
#define C_BLUE    0x001F
#define C_YELLOW  0xFFE0
#define C_CYAN    0x07FF
#define C_GRAY    0x7BEF
#define C_ORANGE  0xFD20
#define C_PURPLE  0x780F

// ─── LCD Helper ───
void lcdClear() {
  lcd.fillScreen(C_BG);
}

void lcdText(int x, int y, const char* text, uint16_t color = C_TEXT, uint8_t size = 2) {
  lcd.setTextColor(color, C_BG);
  lcd.setTextSize(size);
  lcd.setCursor(x, y);
  lcd.print(text);
}

void lcdTextf(int x, int y, uint16_t color, uint8_t size, const char* fmt, ...) {
  char buf[128];
  va_list args;
  va_start(args, fmt);
  vsnprintf(buf, sizeof(buf), fmt, args);
  va_end(args);
  lcdText(x, y, buf, color, size);
}

// ─── OTA Protocol ───
#define OTA_CMD_START   0x01
#define OTA_CMD_END     0x02
#define OTA_CMD_ABORT   0x03

#define OTA_STATUS_IDLE       0x00
#define OTA_STATUS_READY      0x01
#define OTA_STATUS_RECEIVING  0x02
#define OTA_STATUS_VERIFYING  0x03
#define OTA_STATUS_SUCCESS    0x04
#define OTA_STATUS_CRC_FAIL   0x05
#define OTA_STATUS_WRITE_FAIL 0x06
#define OTA_STATUS_ABORT_OK   0x07

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

      // Show OTA progress on LCD
      lcdClear();
      lcdText(10, 40, "OTA Update", C_YELLOW, 2);
      lcdText(10, 70, "Receiving...", C_TEXT, 2);

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

      lcdText(10, 120, "Verifying...", C_CYAN, 2);

      if (!Update.end(true)) {
        Serial.println("Update.end failed");
        otaInProgress = false;
        sendStatus(OTA_STATUS_CRC_FAIL, 0);
        lcdText(10, 160, "FAILED!", C_RED, 2);
        return;
      }

      otaInProgress = false;
      sendStatus(OTA_STATUS_SUCCESS, 100);
      lcdClear();
      lcdText(10, 80, "OTA Success!", C_GREEN, 2);
      lcdText(10, 110, "Restarting...", C_TEXT, 2);
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
      lcdText(10, 160, "Aborted", C_RED, 2);
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

    // BLE notify only (no LCD update during transfer — LCD SPI blocks BLE)
    if (otaTotalSize > 0 && (otaReceived % 2048) < len) {
      uint8_t progress = (uint8_t)((uint64_t)otaReceived * 100 / otaTotalSize);
      sendStatus(OTA_STATUS_RECEIVING, progress);
    }
  }
};

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

// ─── Hardware Init ───
void initHardware() {
  // Backlight ON
  pinMode(LCD_BL, OUTPUT);
  digitalWrite(LCD_BL, HIGH);

  // Hardware SPI (shared by LCD + SD card)
  SPI.begin(LCD_SCLK, SD_MISO, LCD_MOSI);

  // LCD init (172x320, ST7789)
  lcd.init(172, 320);
  lcd.setRotation(0);
  lcd.fillScreen(C_BG);
  lcd.setTextWrap(true);

  // WS2812 RGB LED
  pixel.begin();
  pixel.setBrightness(50);
  pixel.clear();
  pixel.show();

  // Button (INPUT_PULLUP, Active LOW)
  pinMode(BOOT_BTN, INPUT_PULLUP);

  // I2C for external sensors
  Wire.begin(I2C_SDA, I2C_SCL);

  // Startup screen
  lcdText(20, 30, "UTTEC C6", C_CYAN, 3);
  lcdText(20, 65, "LCD 1.47\"", C_GREEN, 2);
  lcd.drawFastHLine(10, 90, 152, C_GRAY);
  lcdText(20, 105, "BLE OTA", C_TEXT, 2);
  lcdText(20, 130, "Ready!", C_GREEN, 2);

  // SD card (same SPI bus, different CS)
  if (SD.begin(SD_CS, SPI)) {
    char buf[32];
    snprintf(buf, sizeof(buf), "SD: %uMB", (unsigned)(SD.totalBytes()/1024/1024));
    lcdText(20, 165, buf, C_GREEN, 2);
    Serial.println(buf);
  } else {
    lcdText(20, 165, "SD: None", C_YELLOW, 2);
    Serial.println("SD: not found");
  }

  Serial.println("Hardware initialized (ESP32-C6-LCD)");
}

// ─── Command Callback ───
class CmdCallbacks : public NimBLECharacteristicCallbacks {
  void onWrite(NimBLECharacteristic* pChar, NimBLEConnInfo& connInfo) override {
    std::string val = pChar->getValue();
    if (val.empty()) return;
    String cmd = String(val.c_str());
    cmd.trim();
    Serial.printf("CMD: %s\n", cmd.c_str());

    // ─── WS2812 RGB LED ───
    if (cmd == "LED_RED_ON")         { setColor(255, 0, 0); }
    else if (cmd == "LED_GREEN_ON")  { setColor(0, 255, 0); }
    else if (cmd == "LED_BLUE_ON")   { setColor(0, 0, 255); }
    else if (cmd == "LED_YELLOW_ON") { setColor(255, 255, 0); }
    else if (cmd == "LED_WHITE_ON")  { setColor(255, 255, 255); }
    else if (cmd == "LED_CYAN_ON")   { setColor(0, 255, 255); }
    else if (cmd == "LED_PURPLE_ON") { setColor(128, 0, 255); }
    else if (cmd == "LED_OFF" || cmd == "LED_ALL_OFF") { ledOff(); }
    else if (cmd.startsWith("LED_COLOR:")) {
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

    // ─── LCD Display ───
    else if (cmd.startsWith("LCD:")) {
      String text = cmd.substring(4);
      lcdClear();
      lcdText(10, 10, text.c_str(), C_TEXT, 2);
    }
    else if (cmd.startsWith("LCD_BIG:")) {
      String text = cmd.substring(8);
      lcdClear();
      lcdText(10, 60, text.c_str(), C_CYAN, 4);
    }
    else if (cmd.startsWith("LCD_COLOR:")) {
      // LCD_COLOR:RRGGBB,text
      int comma = cmd.indexOf(',', 10);
      if (comma > 10) {
        String hex = cmd.substring(10, comma);
        String text = cmd.substring(comma + 1);
        uint32_t c = strtoul(hex.c_str(), NULL, 16);
        uint16_t c565 = lcd.color565((c >> 16) & 0xFF, (c >> 8) & 0xFF, c & 0xFF);
        lcdClear();
        lcdText(10, 10, text.c_str(), c565, 2);
      }
    }
    else if (cmd == "LCD_CLEAR") {
      lcdClear();
    }
    else if (cmd.startsWith("LCD_FILL:")) {
      // LCD_FILL:RRGGBB — fill screen with color
      String hex = cmd.substring(9);
      if (hex.length() == 6) {
        uint32_t c = strtoul(hex.c_str(), NULL, 16);
        lcd.fillScreen(lcd.color565((c >> 16) & 0xFF, (c >> 8) & 0xFF, c & 0xFF));
      }
    }
    else if (cmd.startsWith("LCD_RECT:")) {
      // LCD_RECT:x,y,w,h,RRGGBB
      int p1 = cmd.indexOf(',', 9);
      int p2 = cmd.indexOf(',', p1 + 1);
      int p3 = cmd.indexOf(',', p2 + 1);
      int p4 = cmd.indexOf(',', p3 + 1);
      if (p4 > 0) {
        int x = cmd.substring(9, p1).toInt();
        int y = cmd.substring(p1 + 1, p2).toInt();
        int w = cmd.substring(p2 + 1, p3).toInt();
        int h = cmd.substring(p3 + 1, p4).toInt();
        uint32_t c = strtoul(cmd.substring(p4 + 1).c_str(), NULL, 16);
        lcd.fillRect(x, y, w, h, lcd.color565((c >> 16) & 0xFF, (c >> 8) & 0xFF, c & 0xFF));
      }
    }
    else if (cmd.startsWith("LCD_CIRCLE:")) {
      // LCD_CIRCLE:x,y,r,RRGGBB
      int p1 = cmd.indexOf(',', 11);
      int p2 = cmd.indexOf(',', p1 + 1);
      int p3 = cmd.indexOf(',', p2 + 1);
      if (p3 > 0) {
        int x = cmd.substring(11, p1).toInt();
        int y = cmd.substring(p1 + 1, p2).toInt();
        int r = cmd.substring(p2 + 1, p3).toInt();
        uint32_t c = strtoul(cmd.substring(p3 + 1).c_str(), NULL, 16);
        lcd.fillCircle(x, y, r, lcd.color565((c >> 16) & 0xFF, (c >> 8) & 0xFF, c & 0xFF));
      }
    }
    else if (cmd.startsWith("LCD_LINE:")) {
      // LCD_LINE:x0,y0,x1,y1,RRGGBB
      int p1 = cmd.indexOf(',', 9);
      int p2 = cmd.indexOf(',', p1 + 1);
      int p3 = cmd.indexOf(',', p2 + 1);
      int p4 = cmd.indexOf(',', p3 + 1);
      if (p4 > 0) {
        int x0 = cmd.substring(9, p1).toInt();
        int y0 = cmd.substring(p1 + 1, p2).toInt();
        int x1 = cmd.substring(p2 + 1, p3).toInt();
        int y1 = cmd.substring(p3 + 1, p4).toInt();
        uint32_t c = strtoul(cmd.substring(p4 + 1).c_str(), NULL, 16);
        lcd.drawLine(x0, y0, x1, y1, lcd.color565((c >> 16) & 0xFF, (c >> 8) & 0xFF, c & 0xFF));
      }
    }
    else if (cmd == "LCD_BL_OFF") {
      digitalWrite(LCD_BL, LOW);
    }
    else if (cmd == "LCD_BL_ON") {
      digitalWrite(LCD_BL, HIGH);
    }
    else if (cmd.startsWith("LCD_BL:")) {
      int val = cmd.substring(7).toInt();
      analogWrite(LCD_BL, constrain(val, 0, 255));
    }

    // ─── BLE Name Change ───
    else if (cmd.startsWith("SETNAME:")) {
      String newName = cmd.substring(8);
      newName.trim();
      if (newName.length() > 0 && newName.length() < 30) {
        strncpy(bleName, newName.c_str(), sizeof(bleName) - 1);
        bleName[sizeof(bleName) - 1] = '\0';
        prefs.begin("uttec", false);
        prefs.putString("bleName", bleName);
        prefs.end();
        Serial.printf("BLE name changed to: %s\n", bleName);
        lcdClear();
        lcdText(10, 40, "Name Changed!", C_GREEN, 2);
        lcdText(10, 80, bleName, C_CYAN, 3);
        lcdText(10, 130, "Rebooting...", C_TEXT, 2);
        delay(2000);
        ESP.restart();
      }
    }

    // ─── SD Card Firmware Load ───
    else if (cmd.startsWith("SDLOAD:")) {
      String no = cmd.substring(7);
      no.trim();
      String path = "/firmware/" + no + ".bin";
      Serial.printf("SD LOAD: %s\n", path.c_str());

      if (!SD.exists(path)) {
        lcdClear();
        lcdText(10, 40, "SD: Not Found", C_RED, 2);
        lcdText(10, 70, path.c_str(), C_TEXT, 1);
        Serial.println("File not found on SD");
      } else {
        File fw = SD.open(path, FILE_READ);
        size_t fwSize = fw.size();
        lcdClear();
        lcdText(10, 60, "SD Flash...", C_YELLOW, 2);
        Serial.printf("SD: %s (%u bytes)\n", path.c_str(), fwSize);

        if (!Update.begin(fwSize)) {
          lcdText(10, 100, "Update Error", C_RED, 2);
          fw.close();
        } else {
          uint8_t fbuf[4096];
          while (fw.available()) {
            size_t n = fw.read(fbuf, sizeof(fbuf));
            Update.write(fbuf, n);
          }
          fw.close();

          if (Update.end(true)) {
            lcdText(10, 100, "OK!", C_GREEN, 3);
            Serial.println("SD flash OK!");
            delay(500);
            ESP.restart();
          } else {
            lcdText(10, 100, "Verify Fail", C_RED, 2);
          }
        }
      }
    }

    // ─── User-defined handler (weak) ───
    else {
      onBleReceive(cmd);
    }
  }
};

// ─── Weak function: user code can override ───
__attribute__((weak)) void onBleReceive(String cmd) {
  Serial.printf("Unhandled CMD: %s\n", cmd.c_str());
}

// ─── BLE Server Callbacks ───
class ServerCallbacks : public NimBLEServerCallbacks {
  void onConnect(NimBLEServer* pServer, NimBLEConnInfo& connInfo) override {
    deviceConnected = true;
    Serial.println("BLE Connected");
    lcdText(10, 290, "BLE Connected", C_GREEN, 1);
  }

  void onDisconnect(NimBLEServer* pServer, NimBLEConnInfo& connInfo, int reason) override {
    deviceConnected = false;
    Serial.println("BLE Disconnected");
    if (otaInProgress) {
      Update.abort();
      otaInProgress = false;
      Serial.println("OTA aborted (disconnect)");
    }
    lcdText(10, 290, "Disconnected  ", C_RED, 1);
    NimBLEDevice::startAdvertising();
  }
};

// ─── BLE Init ───
void initBLE() {
  prefs.begin("uttec", true);
  String savedName = prefs.getString("bleName", "UTTEC-C6");
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

  lcdText(10, 275, bleName, C_CYAN, 1);
}

// ─── Button Monitor Task ───
void buttonMonitorTask(void* param) {
  int lastState = HIGH;
  while (1) {
    int state = digitalRead(BOOT_BTN);
    if (state != lastState) {
      lastState = state;
      if (deviceConnected && sensorChar) {
        uint8_t data[2] = {0x01, (uint8_t)(state == LOW ? 1 : 0)};
        sensorChar->setValue(data, 2);
        sensorChar->notify();
        Serial.printf("BUTTON: %s\n", state == LOW ? "PRESSED" : "RELEASED");
      }
    }
    delay(50);
  }
}


// ─── LED Task ───
// [아날로그 시계] UTTEC C6-LCD 아날로그 시계

#define CX   86    // 시계 중심 X (화면 가로 중앙)
#define CY  165    // 시계 중심 Y
#define CR   75    // 시계 반지름

uint16_t CFACE;    // 시계 내부 배경색 (setup에서 초기화)

// [바늘] 각도(도)로 바늘 그리기, 수직 방향으로 두께 적용
void drawHand(float deg, int len, uint16_t color, int thick) {
  float rad = deg * PI / 180.0f;
  float sd = sinf(rad), cd = cosf(rad);
  int x2 = CX + (int)(len * sd);
  int y2 = CY - (int)(len * cd);
  int half = thick / 2;
  for (int d = -half; d <= half; d++) {
    lcd.drawLine(CX + (int)(d * cd), CY + (int)(d * sd),
                 x2  + (int)(d * cd), y2  + (int)(d * sd), color);
  }
}

// [시계판] 눈금 + 바늘 전체 갱신 (매초 호출)
void redrawClock(int h, int m, int s) {
  lcd.fillCircle(CX, CY, CR - 2, CFACE);  // 내부 클리어

  // [눈금] 60개 (5 배수 = 시간 눈금, 나머지 = 분 눈금)
  for (int i = 0; i < 60; i++) {
    float a = i * 6.0f * PI / 180.0f;
    bool isHour = (i % 5 == 0);
    int ro = CR - 4, ri = isHour ? CR - 16 : CR - 9;
    int x1 = CX + (int)(ro * sinf(a)), y1 = CY - (int)(ro * cosf(a));
    int x2 = CX + (int)(ri * sinf(a)), y2 = CY - (int)(ri * cosf(a));
    lcd.drawLine(x1, y1, x2, y2, isHour ? C_TEXT : C_GRAY);
    if (isHour) lcd.drawLine(x1 + 1, y1, x2 + 1, y2, C_TEXT);  // 시간 눈금 두껍게
  }

  // [시침] 흰색, 두께 4, 길이 38
  drawHand((h % 12) * 30.0f + m * 0.5f, 38, C_TEXT, 4);
  // [분침] 노란색, 두께 2, 길이 55
  drawHand(m * 6.0f + s * 0.1f, 55, C_YELLOW, 2);
  // [초침] 빨간색, 두께 1, 길이 65
  drawHand(s * 6.0f, 65, C_RED, 1);

  // [중심] 장식 원
  lcd.fillCircle(CX, CY, 5, C_GRAY);
  lcd.fillCircle(CX, CY, 3, C_ORANGE);
}

int gH = 12, gM = 0, gS = 0;
unsigned long prevMs = 0;

void setup() {
  Serial.begin(115200);
  initHardware();
  initBLE();

  CFACE = lcd.color565(10, 10, 30);  // 어두운 네이비 배경색

  lcdClear();
  lcdText(14, 8, "Analog Clock", C_CYAN, 2);   // [제목] 상단 타이틀

  // [테두리] 시계 외곽 링 그리기
  lcd.fillCircle(CX, CY, CR + 3, lcd.color565(80, 80, 80));
  lcd.fillCircle(CX, CY, CR + 1, lcd.color565(20, 20, 45));
  lcd.fillCircle(CX, CY, CR,     CFACE);

  redrawClock(gH, gM, gS);  // 초기 시계 그리기

  // [디지털] 하단 초기 시간 표시
  lcdText(38, 294, "12:00:00", C_GREEN, 2);

  setColor(0, 10, 50);    // 파란빛 LED
  prevMs = millis();
}

void loop() {
  if (millis() - prevMs >= 1000) {
    prevMs += 1000;

    // [시간 증가] 초 → 분 → 시 순서로 올림
    if (++gS >= 60) { gS = 0; if (++gM >= 60) { gM = 0; if (++gH >= 12) gH = 0; } }

    redrawClock(gH, gM, gS);

    // [디지털] 하단 디지털 시간 갱신
    char buf[9];
    sprintf(buf, "%02d:%02d:%02d", gH == 0 ? 12 : gH, gM, gS);
    lcd.fillRect(28, 288, 120, 24, C_BG);
    lcdText(38, 294, buf, C_GREEN, 2);
  }
  delay(10);
}
