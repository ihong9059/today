/*
 * ESP32-DEVKIT_V4 + RC522 RFID Read/Write 예제
 *
 * 배선:
 *   RC522    ESP32
 *   ------   ------
 *   3.3V     3V3
 *   GND      GND
 *   SDA      GPIO5
 *   SCK      GPIO18
 *   MOSI     GPIO23
 *   MISO     GPIO19
 *   RST      GPIO4
 *   IRQ      미연결
 *
 * 라이브러리 설치:
 *   Arduino IDE > 스케치 > 라이브러리 포함하기 > 라이브러리 관리
 *   "MFRC522" 검색 후 설치 (by GithubCommunity)
 *
 * 보드 설정:
 *   도구 > 보드 > ESP32 Arduino > ESP32 Dev Module
 */

#include <SPI.h>
#include <MFRC522.h>

// ESP32 핀 정의
#define SS_PIN    5    // SDA (Slave Select)
#define RST_PIN   4    // Reset

// MFRC522 인스턴스 생성
MFRC522 mfrc522(SS_PIN, RST_PIN);
MFRC522::MIFARE_Key key;

// 읽기/쓰기할 블록 번호 (섹터 1의 블록 4)
// 주의: 트레일러 블록(3,7,11,15...)은 피할 것
byte blockAddr = 4;

// 쓸 데이터 (16바이트)
byte dataBlock[] = {
    0x48, 0x65, 0x6C, 0x6C,  // "Hell"
    0x6F, 0x20, 0x52, 0x46,  // "o RF"
    0x49, 0x44, 0x21, 0x00,  // "ID!"
    0x00, 0x00, 0x00, 0x00   // padding
};

// 버퍼
byte buffer[18];
byte size = sizeof(buffer);

void setup() {
    Serial.begin(115200);
    while (!Serial);

    Serial.println();
    Serial.println("========================================");
    Serial.println("  ESP32 + RC522 RFID Read/Write");
    Serial.println("========================================");

    // SPI 초기화
    SPI.begin();

    // MFRC522 초기화
    mfrc522.PCD_Init();
    delay(4);

    // 버전 확인
    mfrc522.PCD_DumpVersionToSerial();

    // 기본 키 설정 (0xFF x 6)
    for (byte i = 0; i < 6; i++) {
        key.keyByte[i] = 0xFF;
    }

    Serial.println();
    Serial.println("명령어:");
    Serial.println("  'r' - 카드 읽기");
    Serial.println("  'w' - 카드 쓰기");
    Serial.println("  'd' - 카드 전체 덤프");
    Serial.println();
    Serial.println("카드를 가까이 대주세요...");
    Serial.println();
}

void loop() {
    // 시리얼 명령 확인
    if (Serial.available() > 0) {
        char cmd = Serial.read();

        if (cmd == 'r' || cmd == 'R') {
            Serial.println("\n[읽기 모드] 카드를 가까이 대주세요...");
            waitAndReadCard();
        }
        else if (cmd == 'w' || cmd == 'W') {
            Serial.println("\n[쓰기 모드] 카드를 가까이 대주세요...");
            waitAndWriteCard();
        }
        else if (cmd == 'd' || cmd == 'D') {
            Serial.println("\n[덤프 모드] 카드를 가까이 대주세요...");
            waitAndDumpCard();
        }
    }

    // 자동 감지 모드
    if (mfrc522.PICC_IsNewCardPresent() && mfrc522.PICC_ReadCardSerial()) {
        showCardInfo();
        mfrc522.PICC_HaltA();
        mfrc522.PCD_StopCrypto1();
    }

    delay(100);
}

// 카드 정보 표시
void showCardInfo() {
    Serial.println("----------------------------------------");
    Serial.print("카드 감지! UID: ");
    printHex(mfrc522.uid.uidByte, mfrc522.uid.size);
    Serial.println();

    Serial.print("카드 타입: ");
    MFRC522::PICC_Type piccType = mfrc522.PICC_GetType(mfrc522.uid.sak);
    Serial.println(mfrc522.PICC_GetTypeName(piccType));
    Serial.println("----------------------------------------");
}

// 카드 읽기 대기 및 실행
void waitAndReadCard() {
    unsigned long startTime = millis();

    while (millis() - startTime < 10000) {  // 10초 타임아웃
        if (mfrc522.PICC_IsNewCardPresent() && mfrc522.PICC_ReadCardSerial()) {
            showCardInfo();
            readBlock(blockAddr);

            mfrc522.PICC_HaltA();
            mfrc522.PCD_StopCrypto1();
            return;
        }
        delay(100);
    }
    Serial.println("타임아웃: 카드를 찾지 못했습니다.");
}

// 카드 쓰기 대기 및 실행
void waitAndWriteCard() {
    unsigned long startTime = millis();

    while (millis() - startTime < 10000) {
        if (mfrc522.PICC_IsNewCardPresent() && mfrc522.PICC_ReadCardSerial()) {
            showCardInfo();

            // 쓰기 전 현재 데이터 표시
            Serial.println("\n쓰기 전 데이터:");
            readBlock(blockAddr);

            // 쓰기 실행
            Serial.println("\n쓰기 실행 중...");
            writeBlock(blockAddr, dataBlock);

            // 쓰기 후 확인
            Serial.println("\n쓰기 후 데이터:");
            readBlock(blockAddr);

            mfrc522.PICC_HaltA();
            mfrc522.PCD_StopCrypto1();
            return;
        }
        delay(100);
    }
    Serial.println("타임아웃: 카드를 찾지 못했습니다.");
}

// 카드 전체 덤프
void waitAndDumpCard() {
    unsigned long startTime = millis();

    while (millis() - startTime < 10000) {
        if (mfrc522.PICC_IsNewCardPresent() && mfrc522.PICC_ReadCardSerial()) {
            showCardInfo();
            mfrc522.PICC_DumpToSerial(&(mfrc522.uid));

            mfrc522.PICC_HaltA();
            mfrc522.PCD_StopCrypto1();
            return;
        }
        delay(100);
    }
    Serial.println("타임아웃: 카드를 찾지 못했습니다.");
}

// 블록 읽기
void readBlock(byte blockAddr) {
    MFRC522::StatusCode status;

    // 키 A로 인증
    byte trailerBlock = (blockAddr / 4) * 4 + 3;  // 해당 섹터의 트레일러 블록
    status = mfrc522.PCD_Authenticate(MFRC522::PICC_CMD_MF_AUTH_KEY_A, trailerBlock, &key, &(mfrc522.uid));
    if (status != MFRC522::STATUS_OK) {
        Serial.print("인증 실패: ");
        Serial.println(mfrc522.GetStatusCodeName(status));
        return;
    }

    // 블록 읽기
    size = sizeof(buffer);
    status = mfrc522.MIFARE_Read(blockAddr, buffer, &size);
    if (status != MFRC522::STATUS_OK) {
        Serial.print("읽기 실패: ");
        Serial.println(mfrc522.GetStatusCodeName(status));
        return;
    }

    // 결과 출력
    Serial.print("블록 ");
    Serial.print(blockAddr);
    Serial.print(" 데이터: ");
    printHex(buffer, 16);
    Serial.println();

    Serial.print("          텍스트: ");
    printAscii(buffer, 16);
    Serial.println();
}

// 블록 쓰기
void writeBlock(byte blockAddr, byte* data) {
    MFRC522::StatusCode status;

    // 키 A로 인증
    byte trailerBlock = (blockAddr / 4) * 4 + 3;
    status = mfrc522.PCD_Authenticate(MFRC522::PICC_CMD_MF_AUTH_KEY_A, trailerBlock, &key, &(mfrc522.uid));
    if (status != MFRC522::STATUS_OK) {
        Serial.print("인증 실패: ");
        Serial.println(mfrc522.GetStatusCodeName(status));
        return;
    }

    // 블록 쓰기
    status = mfrc522.MIFARE_Write(blockAddr, data, 16);
    if (status != MFRC522::STATUS_OK) {
        Serial.print("쓰기 실패: ");
        Serial.println(mfrc522.GetStatusCodeName(status));
        return;
    }

    Serial.println("쓰기 성공!");
}

// HEX 출력
void printHex(byte *buffer, byte bufferSize) {
    for (byte i = 0; i < bufferSize; i++) {
        Serial.print(buffer[i] < 0x10 ? " 0" : " ");
        Serial.print(buffer[i], HEX);
    }
}

// ASCII 출력
void printAscii(byte *buffer, byte bufferSize) {
    for (byte i = 0; i < bufferSize; i++) {
        if (buffer[i] >= 0x20 && buffer[i] <= 0x7E) {
            Serial.print((char)buffer[i]);
        } else {
            Serial.print('.');
        }
    }
}
