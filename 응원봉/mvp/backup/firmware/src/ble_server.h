/**
 * AI FanStick MVP - BLE 서버
 * Bluetooth Low Energy Peripheral 서버 구현
 *
 * 스마트폰 앱에서 BLE로 연결하여 LED/OLED/Buzzer를 제어합니다.
 *
 * 명령 프로토콜:
 * - C:R,G,B     → 색상 변경 (예: C:255,0,0)
 * - P:패턴명   → 패턴 실행 (예: P:rainbow)
 * - T:텍스트   → OLED 텍스트 표시
 * - B:패턴     → 버저 (예: B:ack, B:beep)
 * - L:밝기     → 밝기 조절 (0-255)
 * - S:곡정보   → 곡 정보 표시 (예: S:Dynamite|골드)
 */

#ifndef BLE_SERVER_H
#define BLE_SERVER_H

#include <BLEDevice.h>
#include <BLEServer.h>
#include <BLEUtils.h>
#include <BLE2902.h>

// BLE UUID
#define SERVICE_UUID        "4fafc201-1fb5-459e-8fcc-c5c9c331914b"
#define LED_CHAR_UUID       "beb5483e-36e1-4688-b7f5-ea07361b26a8"
#define TEXT_CHAR_UUID      "beb5483e-36e1-4688-b7f5-ea07361b26a9"

// 콜백 함수 타입 정의
typedef void (*ColorCallback)(uint8_t r, uint8_t g, uint8_t b);
typedef void (*PatternCallback)(const String& pattern);
typedef void (*TextCallback)(const String& text);
typedef void (*BrightnessCallback)(uint8_t brightness);
typedef void (*BuzzerCallback)(const String& pattern);
typedef void (*SongInfoCallback)(const String& title, const String& color);
typedef void (*ConnectionCallback)(bool connected);

class BleServer {
private:
    BLEServer* pServer;
    BLECharacteristic* pLedCharacteristic;
    BLECharacteristic* pTextCharacteristic;
    bool deviceConnected;
    bool oldDeviceConnected;
    String deviceName;

    // 콜백 함수 포인터
    ColorCallback onColor;
    PatternCallback onPattern;
    TextCallback onText;
    BrightnessCallback onBrightness;
    BuzzerCallback onBuzzer;
    SongInfoCallback onSongInfo;
    ConnectionCallback onConnection;

    // 내부 콜백 클래스
    class ServerCallbacks : public BLEServerCallbacks {
        BleServer* parent;
    public:
        ServerCallbacks(BleServer* p) : parent(p) {}

        void onConnect(BLEServer* pServer) override {
            parent->deviceConnected = true;
            Serial.println("[BLE] Device connected");
            if (parent->onConnection) {
                parent->onConnection(true);
            }
        }

        void onDisconnect(BLEServer* pServer) override {
            parent->deviceConnected = false;
            Serial.println("[BLE] Device disconnected");
            if (parent->onConnection) {
                parent->onConnection(false);
            }
        }
    };

    class CharacteristicCallbacks : public BLECharacteristicCallbacks {
        BleServer* parent;
    public:
        CharacteristicCallbacks(BleServer* p) : parent(p) {}

        void onWrite(BLECharacteristic* pCharacteristic) override {
            String value = pCharacteristic->getValue().c_str();
            if (value.length() > 0) {
                Serial.printf("[BLE] Received: %s\n", value.c_str());
                parent->parseCommand(value);
            }
        }
    };

public:
    BleServer() :
        pServer(nullptr),
        pLedCharacteristic(nullptr),
        pTextCharacteristic(nullptr),
        deviceConnected(false),
        oldDeviceConnected(false),
        deviceName("AI FanStick"),
        onColor(nullptr),
        onPattern(nullptr),
        onText(nullptr),
        onBrightness(nullptr),
        onBuzzer(nullptr),
        onSongInfo(nullptr),
        onConnection(nullptr) {}

    void begin(const String& name = "AI FanStick") {
        deviceName = name;

        // BLE 초기화
        BLEDevice::init(name.c_str());

        // BLE 서버 생성
        pServer = BLEDevice::createServer();
        pServer->setCallbacks(new ServerCallbacks(this));

        // BLE 서비스 생성
        BLEService* pService = pServer->createService(SERVICE_UUID);

        // LED 제어 Characteristic
        pLedCharacteristic = pService->createCharacteristic(
            LED_CHAR_UUID,
            BLECharacteristic::PROPERTY_READ |
            BLECharacteristic::PROPERTY_WRITE |
            BLECharacteristic::PROPERTY_NOTIFY
        );
        pLedCharacteristic->setCallbacks(new CharacteristicCallbacks(this));
        pLedCharacteristic->addDescriptor(new BLE2902());

        // 텍스트 Characteristic
        pTextCharacteristic = pService->createCharacteristic(
            TEXT_CHAR_UUID,
            BLECharacteristic::PROPERTY_READ |
            BLECharacteristic::PROPERTY_WRITE |
            BLECharacteristic::PROPERTY_NOTIFY
        );
        pTextCharacteristic->setCallbacks(new CharacteristicCallbacks(this));
        pTextCharacteristic->addDescriptor(new BLE2902());

        // 서비스 시작
        pService->start();

        // 광고 시작
        BLEAdvertising* pAdvertising = BLEDevice::getAdvertising();
        pAdvertising->addServiceUUID(SERVICE_UUID);
        pAdvertising->setScanResponse(true);
        pAdvertising->setMinPreferred(0x06);
        pAdvertising->setMinPreferred(0x12);
        BLEDevice::startAdvertising();

        Serial.printf("[BLE] Server started: %s\n", name.c_str());
        Serial.printf("[BLE] Service UUID: %s\n", SERVICE_UUID);
    }

    /**
     * 명령 파싱 및 처리
     */
    void parseCommand(const String& cmd) {
        if (cmd.length() < 2) {
            sendResponse("ERR:SHORT");
            return;
        }

        char type = cmd.charAt(0);
        if (cmd.charAt(1) != ':') {
            sendResponse("ERR:FORMAT");
            return;
        }

        String param = cmd.substring(2);

        switch (type) {
            case 'C': // 색상: C:R,G,B
                parseColor(param);
                break;

            case 'P': // 패턴: P:rainbow
                if (onPattern) {
                    onPattern(param);
                    sendResponse("OK");
                }
                break;

            case 'T': // 텍스트: T:메시지
                if (onText) {
                    onText(param);
                    sendResponse("OK");
                }
                break;

            case 'B': // 버저: B:ack
                if (onBuzzer) {
                    onBuzzer(param);
                    sendResponse("OK");
                }
                break;

            case 'L': // 밝기: L:128
                parseBrightness(param);
                break;

            case 'S': // 곡 정보: S:Dynamite|골드
                parseSongInfo(param);
                break;

            default:
                sendResponse("ERR:UNKNOWN");
                break;
        }
    }

    /**
     * 색상 파싱
     */
    void parseColor(const String& param) {
        int comma1 = param.indexOf(',');
        int comma2 = param.lastIndexOf(',');

        if (comma1 == -1 || comma1 == comma2) {
            sendResponse("ERR:COLOR_FORMAT");
            return;
        }

        int r = param.substring(0, comma1).toInt();
        int g = param.substring(comma1 + 1, comma2).toInt();
        int b = param.substring(comma2 + 1).toInt();

        // 범위 검증
        r = constrain(r, 0, 255);
        g = constrain(g, 0, 255);
        b = constrain(b, 0, 255);

        if (onColor) {
            onColor(r, g, b);
            sendResponse("OK");
        }
    }

    /**
     * 밝기 파싱
     */
    void parseBrightness(const String& param) {
        int b = param.toInt();
        b = constrain(b, 0, 255);

        if (onBrightness) {
            onBrightness(b);
            sendResponse("OK");
        }
    }

    /**
     * 곡 정보 파싱
     */
    void parseSongInfo(const String& param) {
        int sep = param.indexOf('|');
        if (sep == -1) {
            sendResponse("ERR:SONG_FORMAT");
            return;
        }

        String title = param.substring(0, sep);
        String color = param.substring(sep + 1);

        if (onSongInfo) {
            onSongInfo(title, color);
            sendResponse("OK");
        }
    }

    /**
     * 응답 전송
     */
    void sendResponse(const String& response) {
        if (deviceConnected && pLedCharacteristic) {
            pLedCharacteristic->setValue(response.c_str());
            pLedCharacteristic->notify();
            Serial.printf("[BLE] Response: %s\n", response.c_str());
        }
    }

    /**
     * 상태 알림 전송
     */
    void notifyStatus(const String& status) {
        if (deviceConnected && pTextCharacteristic) {
            pTextCharacteristic->setValue(status.c_str());
            pTextCharacteristic->notify();
        }
    }

    /**
     * 연결 상태 업데이트 (loop에서 호출)
     */
    void update() {
        // 연결 해제 후 재광고
        if (!deviceConnected && oldDeviceConnected) {
            delay(500);
            pServer->startAdvertising();
            Serial.println("[BLE] Restart advertising");
            oldDeviceConnected = deviceConnected;
        }

        // 새 연결
        if (deviceConnected && !oldDeviceConnected) {
            oldDeviceConnected = deviceConnected;
        }
    }

    // 콜백 설정
    void setColorCallback(ColorCallback cb) { onColor = cb; }
    void setPatternCallback(PatternCallback cb) { onPattern = cb; }
    void setTextCallback(TextCallback cb) { onText = cb; }
    void setBrightnessCallback(BrightnessCallback cb) { onBrightness = cb; }
    void setBuzzerCallback(BuzzerCallback cb) { onBuzzer = cb; }
    void setSongInfoCallback(SongInfoCallback cb) { onSongInfo = cb; }
    void setConnectionCallback(ConnectionCallback cb) { onConnection = cb; }

    bool isConnected() { return deviceConnected; }
    String getDeviceName() { return deviceName; }
};

#endif // BLE_SERVER_H
