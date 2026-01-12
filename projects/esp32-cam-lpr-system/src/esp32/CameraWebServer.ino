/**
 * ESP32-CAM Web Server for License Plate Recognition
 *
 * 이 코드는 ESP32-CAM을 웹 서버로 설정하여
 * Raspberry Pi에서 HTTP를 통해 이미지를 가져올 수 있게 합니다.
 *
 * 엔드포인트:
 *   /         - 스트리밍 웹 페이지
 *   /capture  - 단일 JPEG 이미지 캡처
 *   /stream   - MJPEG 스트림 (포트 81)
 *   /status   - 카메라 상태 JSON
 *   /control  - 카메라 설정 변경
 *
 * 보드 설정:
 *   Board: AI Thinker ESP32-CAM
 *   Upload Speed: 115200
 *   Flash Frequency: 80MHz
 *   Partition Scheme: Huge APP (3MB No OTA/1MB SPIFFS)
 */

#include "esp_camera.h"
#include <WiFi.h>
#include "esp_timer.h"
#include "img_converters.h"
#include "Arduino.h"
#include "fb_gfx.h"
#include "soc/soc.h"
#include "soc/rtc_cntl_reg.h"
#include "esp_http_server.h"

// ============================================
// 설정 영역 - 사용자 환경에 맞게 수정
// ============================================

// WiFi 설정
const char* ssid = "YOUR_WIFI_SSID";         // WiFi 이름
const char* password = "YOUR_WIFI_PASSWORD"; // WiFi 비밀번호

// 고정 IP 설정 (DHCP 사용 시 주석 처리)
// #define USE_STATIC_IP
#ifdef USE_STATIC_IP
IPAddress local_IP(192, 168, 1, 100);
IPAddress gateway(192, 168, 1, 1);
IPAddress subnet(255, 255, 255, 0);
IPAddress dns(8, 8, 8, 8);
#endif

// 카메라 모델 선택 (AI Thinker ESP32-CAM)
#define CAMERA_MODEL_AI_THINKER

// ============================================
// AI Thinker ESP32-CAM 핀 정의
// ============================================
#define PWDN_GPIO_NUM     32
#define RESET_GPIO_NUM    -1
#define XCLK_GPIO_NUM      0
#define SIOD_GPIO_NUM     26
#define SIOC_GPIO_NUM     27

#define Y9_GPIO_NUM       35
#define Y8_GPIO_NUM       34
#define Y7_GPIO_NUM       39
#define Y6_GPIO_NUM       36
#define Y5_GPIO_NUM       21
#define Y4_GPIO_NUM       19
#define Y3_GPIO_NUM       18
#define Y2_GPIO_NUM        5
#define VSYNC_GPIO_NUM    25
#define HREF_GPIO_NUM     23
#define PCLK_GPIO_NUM     22

// Flash LED 핀
#define FLASH_LED_PIN      4

// ============================================
// 전역 변수
// ============================================
httpd_handle_t stream_httpd = NULL;
httpd_handle_t camera_httpd = NULL;

// ============================================
// 카메라 초기화
// ============================================
void setupCamera() {
  camera_config_t config;
  config.ledc_channel = LEDC_CHANNEL_0;
  config.ledc_timer = LEDC_TIMER_0;
  config.pin_d0 = Y2_GPIO_NUM;
  config.pin_d1 = Y3_GPIO_NUM;
  config.pin_d2 = Y4_GPIO_NUM;
  config.pin_d3 = Y5_GPIO_NUM;
  config.pin_d4 = Y6_GPIO_NUM;
  config.pin_d5 = Y7_GPIO_NUM;
  config.pin_d6 = Y8_GPIO_NUM;
  config.pin_d7 = Y9_GPIO_NUM;
  config.pin_xclk = XCLK_GPIO_NUM;
  config.pin_pclk = PCLK_GPIO_NUM;
  config.pin_vsync = VSYNC_GPIO_NUM;
  config.pin_href = HREF_GPIO_NUM;
  config.pin_sscb_sda = SIOD_GPIO_NUM;
  config.pin_sscb_scl = SIOC_GPIO_NUM;
  config.pin_pwdn = PWDN_GPIO_NUM;
  config.pin_reset = RESET_GPIO_NUM;
  config.xclk_freq_hz = 20000000;
  config.pixel_format = PIXFORMAT_JPEG;

  // PSRAM이 있으면 더 높은 해상도 사용
  if (psramFound()) {
    config.frame_size = FRAMESIZE_VGA;      // 640x480 (기본값)
    config.jpeg_quality = 10;               // 품질 (0-63, 낮을수록 좋음)
    config.fb_count = 2;                    // 프레임 버퍼 수
    Serial.println("PSRAM found, using higher quality settings");
  } else {
    config.frame_size = FRAMESIZE_QVGA;     // 320x240
    config.jpeg_quality = 12;
    config.fb_count = 1;
    Serial.println("No PSRAM, using lower quality settings");
  }

  // 카메라 초기화
  esp_err_t err = esp_camera_init(&config);
  if (err != ESP_OK) {
    Serial.printf("Camera init failed with error 0x%x\n", err);
    delay(1000);
    ESP.restart();
  }

  // 카메라 센서 설정
  sensor_t * s = esp_camera_sensor_get();
  if (s) {
    // 이미지 품질 설정
    s->set_brightness(s, 0);     // 밝기 (-2 ~ 2)
    s->set_contrast(s, 0);       // 대비 (-2 ~ 2)
    s->set_saturation(s, 0);     // 채도 (-2 ~ 2)
    s->set_special_effect(s, 0); // 특수 효과 (0 = None)
    s->set_whitebal(s, 1);       // 화이트밸런스 (1 = enable)
    s->set_awb_gain(s, 1);       // AWB gain (1 = enable)
    s->set_wb_mode(s, 0);        // WB 모드 (0 = auto)
    s->set_exposure_ctrl(s, 1);  // 노출 제어 (1 = enable)
    s->set_aec2(s, 0);           // AEC DSP (0 = disable)
    s->set_ae_level(s, 0);       // AE level (-2 ~ 2)
    s->set_aec_value(s, 300);    // 노출 값 (0 ~ 1200)
    s->set_gain_ctrl(s, 1);      // 게인 제어 (1 = enable)
    s->set_agc_gain(s, 0);       // AGC gain (0 ~ 30)
    s->set_gainceiling(s, (gainceiling_t)0); // 게인 상한
    s->set_bpc(s, 0);            // Black pixel correction
    s->set_wpc(s, 1);            // White pixel correction
    s->set_raw_gma(s, 1);        // Raw GMA
    s->set_lenc(s, 1);           // 렌즈 보정
    s->set_hmirror(s, 0);        // 수평 미러
    s->set_vflip(s, 0);          // 수직 플립
    s->set_dcw(s, 1);            // 다운사이징
    s->set_colorbar(s, 0);       // 컬러바 (테스트용)
  }

  Serial.println("Camera initialized successfully");
}

// ============================================
// WiFi 연결
// ============================================
void setupWiFi() {
  WiFi.mode(WIFI_STA);

  #ifdef USE_STATIC_IP
  if (!WiFi.config(local_IP, gateway, subnet, dns)) {
    Serial.println("Static IP configuration failed");
  }
  #endif

  Serial.printf("Connecting to WiFi: %s\n", ssid);
  WiFi.begin(ssid, password);

  int attempts = 0;
  while (WiFi.status() != WL_CONNECTED && attempts < 30) {
    delay(500);
    Serial.print(".");
    attempts++;
  }

  if (WiFi.status() == WL_CONNECTED) {
    Serial.println("\nWiFi connected!");
    Serial.printf("IP Address: %s\n", WiFi.localIP().toString().c_str());
  } else {
    Serial.println("\nWiFi connection failed!");
    Serial.printf("Status: %d\n", WiFi.status());
    delay(1000);
    ESP.restart();
  }
}

// ============================================
// HTTP 핸들러: 단일 이미지 캡처
// ============================================
static esp_err_t capture_handler(httpd_req_t *req) {
  camera_fb_t * fb = NULL;
  esp_err_t res = ESP_OK;

  fb = esp_camera_fb_get();
  if (!fb) {
    Serial.println("Camera capture failed");
    httpd_resp_send_500(req);
    return ESP_FAIL;
  }

  httpd_resp_set_type(req, "image/jpeg");
  httpd_resp_set_hdr(req, "Content-Disposition", "inline; filename=capture.jpg");
  httpd_resp_set_hdr(req, "Access-Control-Allow-Origin", "*");

  res = httpd_resp_send(req, (const char *)fb->buf, fb->len);
  esp_camera_fb_return(fb);

  return res;
}

// ============================================
// HTTP 핸들러: MJPEG 스트림
// ============================================
#define PART_BOUNDARY "123456789000000000000987654321"
static const char* _STREAM_CONTENT_TYPE = "multipart/x-mixed-replace;boundary=" PART_BOUNDARY;
static const char* _STREAM_BOUNDARY = "\r\n--" PART_BOUNDARY "\r\n";
static const char* _STREAM_PART = "Content-Type: image/jpeg\r\nContent-Length: %u\r\n\r\n";

static esp_err_t stream_handler(httpd_req_t *req) {
  camera_fb_t * fb = NULL;
  esp_err_t res = ESP_OK;
  size_t _jpg_buf_len = 0;
  uint8_t * _jpg_buf = NULL;
  char * part_buf[64];

  res = httpd_resp_set_type(req, _STREAM_CONTENT_TYPE);
  if (res != ESP_OK) {
    return res;
  }

  httpd_resp_set_hdr(req, "Access-Control-Allow-Origin", "*");

  while (true) {
    fb = esp_camera_fb_get();
    if (!fb) {
      Serial.println("Camera capture failed");
      res = ESP_FAIL;
    } else {
      if (fb->format != PIXFORMAT_JPEG) {
        bool jpeg_converted = frame2jpg(fb, 80, &_jpg_buf, &_jpg_buf_len);
        esp_camera_fb_return(fb);
        fb = NULL;
        if (!jpeg_converted) {
          Serial.println("JPEG compression failed");
          res = ESP_FAIL;
        }
      } else {
        _jpg_buf_len = fb->len;
        _jpg_buf = fb->buf;
      }
    }

    if (res == ESP_OK) {
      size_t hlen = snprintf((char *)part_buf, 64, _STREAM_PART, _jpg_buf_len);
      res = httpd_resp_send_chunk(req, (const char *)part_buf, hlen);
    }
    if (res == ESP_OK) {
      res = httpd_resp_send_chunk(req, (const char *)_jpg_buf, _jpg_buf_len);
    }
    if (res == ESP_OK) {
      res = httpd_resp_send_chunk(req, _STREAM_BOUNDARY, strlen(_STREAM_BOUNDARY));
    }

    if (fb) {
      esp_camera_fb_return(fb);
      fb = NULL;
      _jpg_buf = NULL;
    } else if (_jpg_buf) {
      free(_jpg_buf);
      _jpg_buf = NULL;
    }

    if (res != ESP_OK) {
      break;
    }
  }

  return res;
}

// ============================================
// HTTP 핸들러: 상태 정보
// ============================================
static esp_err_t status_handler(httpd_req_t *req) {
  static char json_response[256];
  sensor_t * s = esp_camera_sensor_get();

  snprintf(json_response, sizeof(json_response),
    "{"
    "\"framesize\":%d,"
    "\"quality\":%d,"
    "\"brightness\":%d,"
    "\"contrast\":%d,"
    "\"saturation\":%d,"
    "\"awb\":%d,"
    "\"awb_gain\":%d,"
    "\"aec\":%d,"
    "\"agc\":%d,"
    "\"wifi_rssi\":%d"
    "}",
    s->status.framesize,
    s->status.quality,
    s->status.brightness,
    s->status.contrast,
    s->status.saturation,
    s->status.awb,
    s->status.awb_gain,
    s->status.aec,
    s->status.agc,
    WiFi.RSSI()
  );

  httpd_resp_set_type(req, "application/json");
  httpd_resp_set_hdr(req, "Access-Control-Allow-Origin", "*");
  return httpd_resp_send(req, json_response, strlen(json_response));
}

// ============================================
// HTTP 핸들러: 카메라 제어
// ============================================
static esp_err_t control_handler(httpd_req_t *req) {
  char buf[128];
  char variable[32];
  char value[32];

  // 쿼리 스트링 파싱
  if (httpd_req_get_url_query_str(req, buf, sizeof(buf)) == ESP_OK) {
    if (httpd_query_key_value(buf, "var", variable, sizeof(variable)) == ESP_OK &&
        httpd_query_key_value(buf, "val", value, sizeof(value)) == ESP_OK) {

      int val = atoi(value);
      sensor_t * s = esp_camera_sensor_get();

      if (!strcmp(variable, "framesize")) {
        s->set_framesize(s, (framesize_t)val);
      } else if (!strcmp(variable, "quality")) {
        s->set_quality(s, val);
      } else if (!strcmp(variable, "brightness")) {
        s->set_brightness(s, val);
      } else if (!strcmp(variable, "contrast")) {
        s->set_contrast(s, val);
      } else if (!strcmp(variable, "saturation")) {
        s->set_saturation(s, val);
      } else if (!strcmp(variable, "awb")) {
        s->set_whitebal(s, val);
      } else if (!strcmp(variable, "awb_gain")) {
        s->set_awb_gain(s, val);
      } else if (!strcmp(variable, "aec")) {
        s->set_exposure_ctrl(s, val);
      } else if (!strcmp(variable, "agc")) {
        s->set_gain_ctrl(s, val);
      } else if (!strcmp(variable, "led_intensity")) {
        // Flash LED 제어
        ledcWrite(0, val);
      }
    }
  }

  httpd_resp_set_hdr(req, "Access-Control-Allow-Origin", "*");
  return httpd_resp_send(req, "OK", 2);
}

// ============================================
// HTTP 핸들러: 루트 페이지
// ============================================
static esp_err_t index_handler(httpd_req_t *req) {
  static const char html[] = R"(
<!DOCTYPE html>
<html>
<head>
  <title>ESP32-CAM LPR</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    body { font-family: Arial; text-align: center; margin: 20px; }
    img { max-width: 100%; border: 1px solid #ccc; }
    button { padding: 10px 20px; margin: 5px; font-size: 16px; }
    .status { background: #f0f0f0; padding: 10px; margin: 10px 0; }
  </style>
</head>
<body>
  <h1>ESP32-CAM License Plate Recognition</h1>
  <div class="status" id="status">Loading...</div>
  <img id="stream" src="">
  <br><br>
  <button onclick="startStream()">Start Stream</button>
  <button onclick="stopStream()">Stop Stream</button>
  <button onclick="capture()">Capture</button>
  <button onclick="toggleFlash()">Toggle Flash</button>
  <script>
    var flashOn = false;
    function startStream() {
      document.getElementById('stream').src = '/stream';
    }
    function stopStream() {
      document.getElementById('stream').src = '';
    }
    function capture() {
      window.open('/capture', '_blank');
    }
    function toggleFlash() {
      flashOn = !flashOn;
      fetch('/control?var=led_intensity&val=' + (flashOn ? 255 : 0));
    }
    function updateStatus() {
      fetch('/status')
        .then(r => r.json())
        .then(data => {
          document.getElementById('status').innerHTML =
            'Resolution: ' + data.framesize +
            ' | Quality: ' + data.quality +
            ' | WiFi RSSI: ' + data.wifi_rssi + ' dBm';
        });
    }
    updateStatus();
    setInterval(updateStatus, 5000);
  </script>
</body>
</html>
  )";

  httpd_resp_set_type(req, "text/html");
  return httpd_resp_send(req, html, strlen(html));
}

// ============================================
// HTTP 서버 시작
// ============================================
void startCameraServer() {
  httpd_config_t config = HTTPD_DEFAULT_CONFIG();
  config.server_port = 80;

  // 메인 서버 (포트 80)
  httpd_uri_t index_uri = {
    .uri       = "/",
    .method    = HTTP_GET,
    .handler   = index_handler,
    .user_ctx  = NULL
  };

  httpd_uri_t capture_uri = {
    .uri       = "/capture",
    .method    = HTTP_GET,
    .handler   = capture_handler,
    .user_ctx  = NULL
  };

  httpd_uri_t status_uri = {
    .uri       = "/status",
    .method    = HTTP_GET,
    .handler   = status_handler,
    .user_ctx  = NULL
  };

  httpd_uri_t control_uri = {
    .uri       = "/control",
    .method    = HTTP_GET,
    .handler   = control_handler,
    .user_ctx  = NULL
  };

  if (httpd_start(&camera_httpd, &config) == ESP_OK) {
    httpd_register_uri_handler(camera_httpd, &index_uri);
    httpd_register_uri_handler(camera_httpd, &capture_uri);
    httpd_register_uri_handler(camera_httpd, &status_uri);
    httpd_register_uri_handler(camera_httpd, &control_uri);
    Serial.println("Camera server started on port 80");
  }

  // 스트림 서버 (포트 81)
  config.server_port = 81;
  config.ctrl_port = 32769;

  httpd_uri_t stream_uri = {
    .uri       = "/stream",
    .method    = HTTP_GET,
    .handler   = stream_handler,
    .user_ctx  = NULL
  };

  if (httpd_start(&stream_httpd, &config) == ESP_OK) {
    httpd_register_uri_handler(stream_httpd, &stream_uri);
    Serial.println("Stream server started on port 81");
  }
}

// ============================================
// Setup
// ============================================
void setup() {
  // Brownout detector 비활성화 (전원 불안정 시)
  WRITE_PERI_REG(RTC_CNTL_BROWN_OUT_REG, 0);

  Serial.begin(115200);
  Serial.setDebugOutput(true);
  Serial.println();
  Serial.println("ESP32-CAM License Plate Recognition System");
  Serial.println("==========================================");

  // Flash LED 초기화
  pinMode(FLASH_LED_PIN, OUTPUT);
  ledcSetup(0, 5000, 8);
  ledcAttachPin(FLASH_LED_PIN, 0);
  ledcWrite(0, 0);  // LED 끄기

  // 카메라 초기화
  setupCamera();

  // WiFi 연결
  setupWiFi();

  // HTTP 서버 시작
  startCameraServer();

  Serial.println("==========================================");
  Serial.printf("Camera Ready! Access at: http://%s\n", WiFi.localIP().toString().c_str());
  Serial.printf("Stream URL: http://%s:81/stream\n", WiFi.localIP().toString().c_str());
  Serial.printf("Capture URL: http://%s/capture\n", WiFi.localIP().toString().c_str());
  Serial.println("==========================================");
}

// ============================================
// Loop
// ============================================
void loop() {
  // WiFi 연결 모니터링
  if (WiFi.status() != WL_CONNECTED) {
    Serial.println("WiFi disconnected, reconnecting...");
    WiFi.disconnect();
    WiFi.reconnect();
    delay(5000);
  }

  delay(10000);  // 10초마다 체크
}
