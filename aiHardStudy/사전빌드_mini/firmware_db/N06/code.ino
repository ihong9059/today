void onBleReceive(String cmd) {
    // [BLE수신] "COLOR:R,G,B" 형식 파싱
    if (cmd.startsWith("COLOR:")) {
        String values = cmd.substring(6);
        int r = values.substring(0, values.indexOf(',')).toInt();
        values = values.substring(values.indexOf(',') + 1);
        int g = values.substring(0, values.indexOf(',')).toInt();
        int b = values.substring(values.indexOf(',') + 1).toInt();

        // [LED] 수신된 RGB 값으로 색상 설정
        pixel.setPixelColor(0, pixel.Color(r, g, b));
        pixel.show();

        // [OLED] 현재 색상 표시
        oled.clear();
        oled.drawString(0, 0, "COLOR SET");
        char buf[32];
        snprintf(buf, sizeof(buf), "R:%d G:%d B:%d", r, g, b);
        oled.drawString(0, 16, buf);
        oled.display();

        // [시리얼] 디버그 출력
        Serial.printf("COLOR: R=%d G=%d B=%d\n", r, g, b);
    }
}

void setup() {
    Serial.begin(115200);
    initHardware();
    initBLE();

    // [초기화] 시작 안내 표시
    oled.clear();
    oled.drawString(0, 0, "BLE COLOR");
    oled.drawString(0, 16, "Waiting...");
    oled.display();
}

void loop() {
    delay(10000);
}