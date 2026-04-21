int count = 0;

void setup() {
  Serial.begin(115200);
  delay(1000);
  Serial.println("ESP32-C3 Counter Start");
}

void loop() {
  Serial.print("esp32c3: ");
  Serial.println(count);
  count++;
  delay(1000);
}
