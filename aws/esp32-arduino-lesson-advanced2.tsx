// 고급 과정 Part 2 (Day 61-75): 디스플레이와 카메라
// esp32-arduino-lesson-day-page.tsx에서 import해서 사용

export const advancedDataPart2: Record<number, any> = {
  // ============================================
  // Day 61: TFT 디스플레이
  // ============================================
  61: {
    day: 61,
    title: 'TFT 디스플레이',
    subtitle: 'SPI TFT 컬러 디스플레이로 그래픽을 출력합니다.',
    videoId: '4IkqT89qei0',
    videoTitle: '진행방법',
    goals: [
      {
        id: 1,
        title: 'TFT 디스플레이 이해',
        description: 'TFT LCD의 특징과 연결 방법을 학습합니다.',
        prompt: `TFT LCD 디스플레이에 대해 설명해줘.

설명해야 할 내용:
1. TFT LCD란 (Thin Film Transistor)
2. 해상도와 색상 (16비트, 18비트, 24비트)
3. SPI vs 8비트 병렬 연결
4. 일반적인 TFT 모듈 (ST7735, ST7789, ILI9341)
5. 백라이트 제어

📚 문법 설명:
- 16비트 색상: RGB565 (R5 G6 B5)
- SPI 핀: MOSI, SCK, CS, DC, RST
- DC 핀: Data/Command 선택

TFT 연결도(텍스트)를 그려줘.`,
        expectedKeywords: ['TFT', 'SPI', 'RGB565', 'ST7789'],
        quiz: {
          question: 'TFT에서 DC 핀의 역할은?',
          options: ['전원', 'Data/Command 선택', '리셋', '클럭'],
          correctAnswer: 1,
        },
      },
      {
        id: 2,
        title: '기본 그래픽 출력',
        description: 'TFT_eSPI로 도형과 텍스트를 출력합니다.',
        prompt: `ESP32에서 TFT 디스플레이에 그래픽을 출력하는 코드를 작성해줘.

요구사항:
1. TFT_eSPI 라이브러리 사용
2. 화면 초기화 및 배경색 설정
3. 텍스트 출력 (다양한 크기, 색상, 위치)
4. 도형 그리기 (사각형, 원, 선, 삼각형)
5. 채워진 도형과 테두리 도형
6. 센서 데이터 표시

📚 문법 설명 (코드 내 주석으로 포함):
- #include <TFT_eSPI.h>: TFT 라이브러리
- TFT_eSPI tft = TFT_eSPI(): 객체 생성
- tft.init(): 디스플레이 초기화
- tft.setRotation(1): 회전 설정 (0~3)
- tft.fillScreen(TFT_BLACK): 배경색
- tft.setTextColor(TFT_WHITE, TFT_BLACK)
- tft.drawString("Hello", x, y)
- tft.fillRect(), tft.drawCircle()

핀: User_Setup.h에서 설정`,
        expectedKeywords: ['TFT_eSPI', 'fillScreen', 'drawString', 'fillRect'],
        quiz: {
          question: 'TFT 화면을 검은색으로 지우는 함수는?',
          options: ['tft.clear()', 'tft.fillScreen(TFT_BLACK)', 'tft.erase()', 'tft.reset()'],
          correctAnswer: 1,
        },
      },
      {
        id: 3,
        title: '센서 대시보드',
        description: 'TFT에 센서 데이터 대시보드를 만듭니다.',
        prompt: `TFT 디스플레이에 센서 대시보드를 만들어줘.

요구사항:
1. 화면 분할 (온도, 습도, 조도, 시간)
2. 각 영역에 아이콘과 값 표시
3. 게이지 그래픽 (반원형 미터)
4. 상태에 따른 색상 변화
5. 실시간 업데이트 (깜빡임 없이)
6. 하단에 상태바 (WiFi, 시간)

📚 문법 설명 (코드 내 주석으로 포함):
- Sprite 사용으로 깜빡임 제거
- tft.createSprite(w, h): 스프라이트 생성
- sprite.pushSprite(x, y): 화면에 출력
- 부분 업데이트: 바뀐 영역만 다시 그리기
- 게이지: arc 또는 삼각함수로 그리기

핀: (TFT), I2C(21,22)`,
        expectedKeywords: ['Sprite', 'pushSprite', '부분 업데이트', '게이지'],
        quiz: {
          question: 'TFT 깜빡임을 줄이는 방법은?',
          options: ['속도 증가', 'Sprite 사용', '밝기 감소', '색상 변경'],
          correctAnswer: 1,
        },
      },
    ],
    nextLesson: { day: 62, title: 'TFT 터치스크린' },
  },

  // ============================================
  // Day 62: TFT 터치스크린
  // ============================================
  62: {
    day: 62,
    title: 'TFT 터치스크린',
    subtitle: '저항식/정전식 터치스크린을 구현합니다.',
    videoId: '4IkqT89qei0',
    videoTitle: '진행방법',
    goals: [
      {
        id: 1,
        title: '터치스크린 이해',
        description: '저항식과 정전식 터치의 차이를 학습합니다.',
        prompt: `터치스크린 기술에 대해 설명해줘.

설명해야 할 내용:
1. 저항식 터치 (4선/5선)
2. 정전식 터치 (상호 용량/자기 용량)
3. XPT2046 터치 컨트롤러
4. 터치 좌표와 화면 좌표 매핑
5. 캘리브레이션 필요성

📚 문법 설명:
- 저항식: 압력 감지, 스타일러스 사용 가능
- 정전식: 손가락 감지, 멀티터치 가능
- XPT2046: SPI 인터페이스, 12비트 ADC

터치 동작 원리를 설명해줘.`,
        expectedKeywords: ['저항식', '정전식', 'XPT2046', '캘리브레이션'],
        quiz: {
          question: '스타일러스 펜을 사용할 수 있는 터치 방식은?',
          options: ['정전식', '저항식', '둘 다', '둘 다 불가'],
          correctAnswer: 1,
        },
      },
      {
        id: 2,
        title: '터치 입력 받기',
        description: 'XPT2046으로 터치 좌표를 읽습니다.',
        prompt: `ESP32에서 터치스크린 입력을 받는 코드를 작성해줘.

요구사항:
1. XPT2046_Touchscreen 라이브러리 사용
2. 터치 감지 및 좌표 읽기
3. 원시 좌표 → 화면 좌표 변환
4. 캘리브레이션 모드 구현
5. 터치 위치에 점 찍기
6. 드래그 감지

📚 문법 설명 (코드 내 주석으로 포함):
- #include <XPT2046_Touchscreen.h>
- XPT2046_Touchscreen ts(CS_PIN)
- ts.begin(): 터치 초기화
- ts.touched(): 터치 여부
- ts.getPoint(): 좌표 얻기 (x, y, z=압력)
- map()으로 좌표 변환

핀: T_CS(33), T_IRQ(36), SPI 공유`,
        expectedKeywords: ['XPT2046_Touchscreen', 'touched', 'getPoint', 'map'],
        quiz: {
          question: '터치 여부를 확인하는 함수는?',
          options: ['ts.check()', 'ts.touched()', 'ts.isPressed()', 'ts.detect()'],
          correctAnswer: 1,
        },
      },
      {
        id: 3,
        title: '터치 버튼 UI',
        description: '터치 가능한 버튼 인터페이스를 만듭니다.',
        prompt: `TFT 터치 버튼 인터페이스를 만들어줘.

요구사항:
1. 화면에 버튼 여러 개 그리기
2. 버튼 터치 시 시각적 피드백 (색상 변화)
3. 버튼별 다른 동작 (LED 제어)
4. 토글 버튼과 순간 버튼
5. 슬라이더 컨트롤
6. 버튼 롱프레스 감지

📚 문법 설명 (코드 내 주석으로 포함):
- 버튼 영역 정의: struct Button { x, y, w, h, label, state }
- 터치 좌표가 버튼 영역 내인지 확인
- 누름 시 반전색, 떼면 원래색
- millis()로 롱프레스 시간 측정

핀: (TFT + 터치), LED(25,26,27)`,
        expectedKeywords: ['버튼 영역', '피드백', '토글', '롱프레스'],
        quiz: {
          question: '터치 좌표가 버튼 안에 있는지 확인하려면?',
          options: ['== 비교', '범위 비교 (x1<x<x2, y1<y<y2)', 'contains()', 'hitTest()'],
          correctAnswer: 1,
        },
      },
    ],
    nextLesson: { day: 63, title: '이미지 표시' },
  },

  // ============================================
  // Day 63: 이미지 표시
  // ============================================
  63: {
    day: 63,
    title: '이미지 표시',
    subtitle: 'TFT에 비트맵 이미지와 아이콘을 표시합니다.',
    videoId: '4IkqT89qei0',
    videoTitle: '진행방법',
    goals: [
      {
        id: 1,
        title: '이미지 형식 이해',
        description: 'TFT에서 사용하는 이미지 형식을 학습합니다.',
        prompt: `TFT 디스플레이 이미지 형식에 대해 설명해줘.

설명해야 할 내용:
1. 비트맵 이미지 형식
2. RGB565 색상 형식
3. 이미지 변환 도구 (LCD Image Converter)
4. C 배열로 이미지 저장
5. SPIFFS/SD에서 이미지 로드
6. JPEG 디코딩

📚 문법 설명:
- RGB565: 16비트 (R:5, G:6, B:5)
- const uint16_t image[] PROGMEM: 플래시 메모리 저장
- 이미지 크기 = 가로 × 세로 × 2 바이트

이미지 변환 과정을 설명해줘.`,
        expectedKeywords: ['RGB565', 'PROGMEM', 'SPIFFS', 'JPEG'],
        quiz: {
          question: 'RGB565 이미지 1픽셀은 몇 바이트?',
          options: ['1바이트', '2바이트', '3바이트', '4바이트'],
          correctAnswer: 1,
        },
      },
      {
        id: 2,
        title: '아이콘 표시하기',
        description: 'C 배열로 정의된 아이콘을 표시합니다.',
        prompt: `ESP32 TFT에 아이콘을 표시하는 코드를 작성해줘.

요구사항:
1. 날씨 아이콘 정의 (해, 구름, 비)
2. 센서 상태 아이콘 (온도계, 물방울)
3. PROGMEM으로 플래시에 저장
4. 투명 배경 처리
5. 아이콘 크기 조절
6. 센서 값 옆에 아이콘 표시

📚 문법 설명 (코드 내 주석으로 포함):
- const uint16_t icon[] PROGMEM = {...};
- tft.pushImage(x, y, w, h, icon): 이미지 출력
- 투명색: 특정 색상(예: 마젠타)을 건너뛰기
- tft.setSwapBytes(true): 바이트 순서

핀: (TFT), I2C(21,22)`,
        expectedKeywords: ['PROGMEM', 'pushImage', '투명', 'setSwapBytes'],
        quiz: {
          question: '플래시 메모리에 이미지를 저장하는 키워드는?',
          options: ['FLASH', 'ROM', 'PROGMEM', 'CONST'],
          correctAnswer: 2,
        },
      },
      {
        id: 3,
        title: 'JPEG 이미지 로드',
        description: 'SPIFFS에서 JPEG 이미지를 로드하여 표시합니다.',
        prompt: `SPIFFS에서 JPEG 이미지를 로드하여 TFT에 표시하는 코드를 작성해줘.

요구사항:
1. SPIFFS에 JPEG 파일 업로드
2. TJpg_Decoder 라이브러리 사용
3. JPEG 디코딩 및 표시
4. 이미지 크기에 맞게 스케일링
5. 여러 이미지 슬라이드쇼
6. 로딩 프로그레스 표시

📚 문법 설명 (코드 내 주석으로 포함):
- #include <TJpg_Decoder.h>: JPEG 디코더
- TJpgDec.setJpgScale(1): 스케일 설정
- TJpgDec.setSwapBytes(true)
- TJpgDec.drawFsJpg(x, y, "/image.jpg")
- 콜백 함수로 픽셀 출력

핀: (TFT)`,
        expectedKeywords: ['TJpg_Decoder', 'drawFsJpg', 'SPIFFS', '스케일'],
        quiz: {
          question: 'SPIFFS의 JPEG를 TFT에 그리는 함수는?',
          options: ['drawImage()', 'showJpeg()', 'drawFsJpg()', 'loadJpeg()'],
          correctAnswer: 2,
        },
      },
    ],
    nextLesson: { day: 64, title: 'ESP32-CAM 기초' },
  },

  // ============================================
  // Day 64: ESP32-CAM 기초
  // ============================================
  64: {
    day: 64,
    title: 'ESP32-CAM 기초',
    subtitle: 'ESP32-CAM 모듈로 카메라 기능을 구현합니다.',
    videoId: '4IkqT89qei0',
    videoTitle: '진행방법',
    goals: [
      {
        id: 1,
        title: 'ESP32-CAM 이해',
        description: 'ESP32-CAM 모듈의 특징을 학습합니다.',
        prompt: `ESP32-CAM 모듈에 대해 설명해줘.

설명해야 할 내용:
1. ESP32-CAM 사양 (OV2640 카메라, PSRAM)
2. 지원 해상도 (QQVGA ~ UXGA)
3. 프레임 버퍼와 PSRAM 역할
4. 사용 가능한 GPIO (제한적)
5. 플래시 LED
6. 프로그래밍 방법 (FTDI 필요)

📚 문법 설명:
- OV2640: 2MP 카메라 센서
- PSRAM: 4MB 추가 메모리 (프레임 버퍼용)
- framesize: 해상도 설정
- jpeg_quality: JPEG 압축 품질

ESP32-CAM 핀아웃을 보여줘.`,
        expectedKeywords: ['ESP32-CAM', 'OV2640', 'PSRAM', 'framesize'],
        quiz: {
          question: 'ESP32-CAM의 PSRAM 용도는?',
          options: ['프로그램 저장', '카메라 프레임 버퍼', 'WiFi', '블루투스'],
          correctAnswer: 1,
        },
      },
      {
        id: 2,
        title: '카메라 초기화',
        description: 'ESP32-CAM 카메라를 초기화합니다.',
        prompt: `ESP32-CAM 카메라를 초기화하는 코드를 작성해줘.

요구사항:
1. 카메라 설정 구조체 정의
2. 해상도 및 품질 설정
3. 카메라 초기화 및 에러 처리
4. 테스트 캡처
5. 시리얼에 이미지 크기 출력
6. LED 플래시 제어

📚 문법 설명 (코드 내 주석으로 포함):
- #include "esp_camera.h": 카메라 라이브러리
- camera_config_t config: 설정 구조체
- esp_camera_init(&config): 초기화
- camera_fb_t *fb = esp_camera_fb_get(): 프레임 캡처
- esp_camera_fb_return(fb): 프레임 반환

핀: AI-Thinker 모듈 기본 핀`,
        expectedKeywords: ['esp_camera_init', 'camera_fb_t', 'fb_get', 'fb_return'],
        quiz: {
          question: '캡처한 프레임을 반환하는 함수는?',
          options: ['fb_release()', 'fb_free()', 'esp_camera_fb_return()', 'camera_release()'],
          correctAnswer: 2,
        },
      },
      {
        id: 3,
        title: '웹 스트리밍',
        description: '카메라 영상을 웹으로 스트리밍합니다.',
        prompt: `ESP32-CAM 웹 스트리밍 서버를 만들어줘.

요구사항:
1. WiFi 연결
2. HTTP 서버 시작
3. MJPEG 스트리밍 구현
4. 스냅샷 엔드포인트 (/capture)
5. 스트리밍 엔드포인트 (/stream)
6. 해상도/품질 변경 API

📚 문법 설명 (코드 내 주석으로 포함):
- MJPEG: Motion JPEG (연속 JPEG 프레임)
- multipart/x-mixed-replace: MJPEG 헤더
- Content-Type: image/jpeg
- 연속 프레임 전송으로 동영상처럼 보임
- 프레임 레이트 제어

핀: (ESP32-CAM 기본)`,
        expectedKeywords: ['MJPEG', 'multipart', 'stream', 'capture'],
        quiz: {
          question: 'MJPEG 스트리밍의 Content-Type은?',
          options: ['video/mp4', 'image/jpeg', 'multipart/x-mixed-replace', 'application/stream'],
          correctAnswer: 2,
        },
      },
    ],
    nextLesson: { day: 65, title: '얼굴 인식' },
  },

  // ============================================
  // Day 65: 얼굴 인식
  // ============================================
  65: {
    day: 65,
    title: '얼굴 인식',
    subtitle: 'ESP32-CAM으로 얼굴을 감지하고 인식합니다.',
    videoId: '4IkqT89qei0',
    videoTitle: '진행방법',
    goals: [
      {
        id: 1,
        title: '얼굴 감지 원리',
        description: '얼굴 감지 알고리즘을 이해합니다.',
        prompt: `얼굴 감지(Face Detection)에 대해 설명해줘.

설명해야 할 내용:
1. 얼굴 감지 vs 얼굴 인식
2. Haar Cascade vs MTCNN
3. ESP32의 얼굴 감지 라이브러리
4. 처리 속도와 해상도 트레이드오프
5. 감지 결과 (바운딩 박스)

📚 문법 설명:
- 감지: 얼굴이 있는지/어디에 있는지
- 인식: 누구의 얼굴인지 식별
- MTCNN: Multi-task CNN (정확도 높음)
- 바운딩 박스: 얼굴 영역 좌표

ESP32에서 얼굴 감지 성능을 설명해줘.`,
        expectedKeywords: ['얼굴 감지', '얼굴 인식', 'MTCNN', '바운딩 박스'],
        quiz: {
          question: '얼굴 위치를 찾는 것은?',
          options: ['얼굴 인식', '얼굴 감지', '얼굴 추적', '얼굴 분석'],
          correctAnswer: 1,
        },
      },
      {
        id: 2,
        title: '얼굴 감지 구현',
        description: 'ESP32-CAM에서 얼굴을 감지합니다.',
        prompt: `ESP32-CAM에서 얼굴을 감지하는 코드를 작성해줘.

요구사항:
1. esp_face 라이브러리 사용
2. 카메라 프레임에서 얼굴 감지
3. 감지된 얼굴 수 출력
4. 바운딩 박스 좌표 얻기
5. 웹 스트림에 박스 표시
6. LED로 얼굴 감지 표시

📚 문법 설명 (코드 내 주석으로 포함):
- #include "fd_forward.h": 얼굴 감지
- mtmn_config_t: 감지 설정
- face_detect_open(): 감지 초기화
- face_detect(fb, &detected_faces)
- box_array_t: 감지 결과

핀: (ESP32-CAM), LED(4)`,
        expectedKeywords: ['fd_forward', 'mtmn_config_t', 'face_detect', 'box_array_t'],
        quiz: {
          question: 'ESP32 얼굴 감지 라이브러리 헤더는?',
          options: ['face.h', 'fd_forward.h', 'detect.h', 'mtcnn.h'],
          correctAnswer: 1,
        },
      },
      {
        id: 3,
        title: '얼굴 인식 시스템',
        description: '등록된 얼굴을 인식하는 시스템을 만듭니다.',
        prompt: `ESP32-CAM 얼굴 인식 시스템을 만들어줘.

요구사항:
1. 얼굴 등록 (엔롤) 기능
2. 등록된 얼굴과 비교
3. 일치하면 이름 표시
4. 웹에서 얼굴 등록 관리
5. 인식 성공 시 릴레이 동작
6. 인식 로그 저장

📚 문법 설명 (코드 내 주석으로 포함):
- face_recognition_lib: 인식 라이브러리
- 얼굴 임베딩: 얼굴 특징 벡터
- 유사도 비교: 임베딩 거리 계산
- 임계값: 동일인 판단 기준

핀: (ESP32-CAM), 릴레이(12)`,
        expectedKeywords: ['엔롤', '임베딩', '유사도', '임계값'],
        quiz: {
          question: '얼굴을 등록하는 과정을 무엇이라고 하나?',
          options: ['스캔', '엔롤', '학습', '저장'],
          correctAnswer: 1,
        },
      },
    ],
    nextLesson: { day: 66, title: 'QR코드 인식' },
  },

  // ============================================
  // Day 66: QR코드 인식
  // ============================================
  66: {
    day: 66,
    title: 'QR코드 인식',
    subtitle: 'ESP32-CAM으로 QR코드를 스캔합니다.',
    videoId: '4IkqT89qei0',
    videoTitle: '진행방법',
    goals: [
      {
        id: 1,
        title: 'QR코드 이해',
        description: 'QR코드의 구조와 활용을 학습합니다.',
        prompt: `QR코드에 대해 설명해줘.

설명해야 할 내용:
1. QR코드란 (Quick Response Code)
2. QR코드 구조 (파인더 패턴, 데이터 영역)
3. 오류 정정 레벨 (L, M, Q, H)
4. 저장 가능한 데이터 타입
5. ESP32에서 QR코드 디코딩

📚 문법 설명:
- 1차원 바코드 vs 2차원 QR코드
- 파인더 패턴: 위치 인식용 사각형
- 오류 정정: 일부 손상되어도 읽기 가능

QR코드 구조를 그림(텍스트)으로 설명해줘.`,
        expectedKeywords: ['QR코드', '파인더 패턴', '오류 정정', '디코딩'],
        quiz: {
          question: 'QR코드 모서리의 큰 사각형 패턴은?',
          options: ['데이터 영역', '파인더 패턴', '타이밍 패턴', '버전 정보'],
          correctAnswer: 1,
        },
      },
      {
        id: 2,
        title: 'QR코드 스캐너',
        description: 'ESP32-CAM으로 QR코드를 스캔합니다.',
        prompt: `ESP32-CAM QR코드 스캐너를 만들어줘.

요구사항:
1. ESP32QRCodeReader 라이브러리 사용
2. 실시간 QR코드 감지
3. 디코딩된 텍스트 시리얼 출력
4. 성공 시 LED + 비프음
5. 웹에서 스캔 결과 확인
6. 스캔 히스토리 저장

📚 문법 설명 (코드 내 주석으로 포함):
- #include <ESP32QRCodeReader.h>
- ESP32QRCodeReader reader(CAMERA_MODEL_AI_THINKER)
- reader.begin(): 스캐너 시작
- reader.read(&resultCode): QR 읽기
- resultCode.payload: 디코딩된 문자열

핀: (ESP32-CAM), LED(4), 부저(2)`,
        expectedKeywords: ['ESP32QRCodeReader', 'read', 'payload', '디코딩'],
        quiz: {
          question: 'QR코드 디코딩 결과는 어디에?',
          options: ['resultCode.data', 'resultCode.payload', 'resultCode.text', 'resultCode.value'],
          correctAnswer: 1,
        },
      },
      {
        id: 3,
        title: 'QR코드 출입 시스템',
        description: 'QR코드로 출입을 관리하는 시스템을 만듭니다.',
        prompt: `QR코드 출입 관리 시스템을 만들어줘.

요구사항:
1. 유효한 QR코드 목록 관리
2. QR코드 스캔 → 검증 → 문 열림
3. 웹에서 QR코드 등록/삭제
4. 시간 제한 QR코드 (유효기간)
5. 출입 로그 (시간, QR내용, 결과)
6. TFT에 스캔 결과 표시

📚 문법 설명 (코드 내 주석으로 포함):
- QR 내용 해시로 검증
- NTP 시간과 유효기간 비교
- SPIFFS에 로그 저장
- JSON으로 QR 목록 관리

핀: (ESP32-CAM), 릴레이(12), TFT(옵션)`,
        expectedKeywords: ['검증', '유효기간', '로그', 'JSON'],
        quiz: {
          question: '시간 제한 QR코드를 검증하려면?',
          options: ['해시만 비교', '현재 시간과 유효기간 비교', '크기 확인', '색상 확인'],
          correctAnswer: 1,
        },
      },
    ],
    nextLesson: { day: 67, title: 'ESP-IDF 기초' },
  },

  // ============================================
  // Day 67: ESP-IDF 기초
  // ============================================
  67: {
    day: 67,
    title: 'ESP-IDF 기초',
    subtitle: 'Espressif 공식 개발 프레임워크를 소개합니다.',
    videoId: '4IkqT89qei0',
    videoTitle: '진행방법',
    goals: [
      {
        id: 1,
        title: 'ESP-IDF 이해',
        description: 'Arduino와 ESP-IDF의 차이를 학습합니다.',
        prompt: `ESP-IDF에 대해 설명해줘.

설명해야 할 내용:
1. ESP-IDF란 (Espressif IoT Development Framework)
2. Arduino vs ESP-IDF 비교
3. ESP-IDF 장점 (전체 기능 접근, 세밀한 제어)
4. FreeRTOS 기반 구조
5. 컴포넌트 시스템
6. Kconfig 설정

📚 문법 설명:
- Arduino: 쉬움, 라이브러리 풍부
- ESP-IDF: 강력함, 학습 곡선 높음
- idf.py: 빌드 시스템
- menuconfig: 설정 GUI

개발 환경 차이를 비교해줘.`,
        expectedKeywords: ['ESP-IDF', 'FreeRTOS', 'idf.py', 'menuconfig'],
        quiz: {
          question: 'ESP-IDF의 빌드 명령은?',
          options: ['make', 'cmake', 'idf.py build', 'arduino-cli'],
          correctAnswer: 2,
        },
      },
      {
        id: 2,
        title: 'Arduino에서 IDF 사용',
        description: 'Arduino 코드에서 ESP-IDF API를 직접 호출합니다.',
        prompt: `Arduino에서 ESP-IDF API를 사용하는 방법을 설명해줘.

요구사항:
1. esp_* 함수 직접 호출
2. FreeRTOS API 사용
3. nvs_flash (NVS) 직접 접근
4. esp_wifi 저수준 제어
5. 파티션 테이블 접근

📚 문법 설명 (코드 내 주석으로 포함):
- Arduino-ESP32는 ESP-IDF 위에서 동작
- #include "esp_system.h": 시스템 함수
- esp_chip_info(): 칩 정보
- esp_get_free_heap_size(): 메모리 정보
- nvs_flash_init(): NVS 초기화

핀: (일반 ESP32)`,
        expectedKeywords: ['esp_system', 'esp_chip_info', 'nvs_flash', 'heap'],
        quiz: {
          question: '남은 힙 메모리를 확인하는 함수는?',
          options: ['freeMemory()', 'esp_get_free_heap_size()', 'getHeap()', 'memoryFree()'],
          correctAnswer: 1,
        },
      },
      {
        id: 3,
        title: '시스템 정보 모니터',
        description: 'ESP-IDF API로 상세 시스템 정보를 얻습니다.',
        prompt: `ESP-IDF API로 시스템 정보를 모니터링하는 코드를 작성해줘.

요구사항:
1. 칩 정보 (모델, 코어 수, 리비전)
2. 메모리 정보 (힙, PSRAM)
3. WiFi 상세 정보 (MAC, RSSI, 채널)
4. 태스크 목록 및 상태
5. 파티션 테이블 정보
6. OLED에 대시보드 형태로 표시

📚 문법 설명 (코드 내 주석으로 포함):
- esp_chip_info_t: 칩 정보 구조체
- esp_wifi_get_mac(): MAC 주소
- uxTaskGetNumberOfTasks(): 태스크 수
- esp_partition_find(): 파티션 검색

핀: I2C(21,22)`,
        expectedKeywords: ['esp_chip_info_t', 'esp_partition', 'uxTaskGetNumberOfTasks'],
        quiz: {
          question: '현재 실행 중인 태스크 수를 확인하는 함수는?',
          options: ['taskCount()', 'uxTaskGetNumberOfTasks()', 'getTaskNum()', 'countTasks()'],
          correctAnswer: 1,
        },
      },
    ],
    nextLesson: { day: 68, title: 'SPIFFS 파일 시스템' },
  },

  // ============================================
  // Day 68: SPIFFS 파일 시스템
  // ============================================
  68: {
    day: 68,
    title: 'SPIFFS 파일 시스템',
    subtitle: 'ESP32 내장 플래시에 파일을 저장하고 관리합니다.',
    videoId: '4IkqT89qei0',
    videoTitle: '진행방법',
    goals: [
      {
        id: 1,
        title: 'SPIFFS 이해',
        description: 'SPIFFS 파일 시스템의 특징을 학습합니다.',
        prompt: `SPIFFS 파일 시스템에 대해 설명해줘.

설명해야 할 내용:
1. SPIFFS란 (SPI Flash File System)
2. 플래시 메모리의 특성 (쓰기 수명)
3. SPIFFS vs LittleFS
4. 파티션과 SPIFFS 크기
5. 웨어 레벨링
6. 파일 업로드 도구

📚 문법 설명:
- 플래시: 전원 꺼져도 유지, 쓰기 제한
- 파티션: 플래시를 영역으로 분할
- 웨어 레벨링: 쓰기 분산으로 수명 연장

파티션 테이블 예시를 보여줘.`,
        expectedKeywords: ['SPIFFS', 'LittleFS', '파티션', '웨어 레벨링'],
        quiz: {
          question: 'SPIFFS의 장점이 아닌 것은?',
          options: ['전원 꺼져도 유지', '무한 쓰기', '웹 파일 저장', '설정 저장'],
          correctAnswer: 1,
        },
      },
      {
        id: 2,
        title: '파일 읽기/쓰기',
        description: 'SPIFFS로 파일을 생성, 읽기, 쓰기합니다.',
        prompt: `ESP32에서 SPIFFS 파일을 다루는 코드를 작성해줘.

요구사항:
1. SPIFFS 초기화
2. 텍스트 파일 생성 및 쓰기
3. 파일 읽기
4. 파일에 내용 추가 (append)
5. 파일 삭제
6. 디렉토리 목록 표시

📚 문법 설명 (코드 내 주석으로 포함):
- #include <SPIFFS.h>: SPIFFS 라이브러리
- SPIFFS.begin(true): 초기화 (true=포맷)
- File file = SPIFFS.open("/file.txt", "w"): 쓰기 모드
- file.print(), file.println(): 쓰기
- file.readString(): 전체 읽기
- SPIFFS.remove(): 삭제
- SPIFFS.openDir(): 디렉토리

핀: (없음, 내부 플래시)`,
        expectedKeywords: ['SPIFFS.begin', 'SPIFFS.open', 'file.print', 'readString'],
        quiz: {
          question: '파일에 내용을 추가하려면 모드를?',
          options: ['w', 'r', 'a', 'rw'],
          correctAnswer: 2,
        },
      },
      {
        id: 3,
        title: '웹 기반 파일 관리자',
        description: '웹에서 SPIFFS 파일을 관리합니다.',
        prompt: `웹 기반 SPIFFS 파일 관리자를 만들어줘.

요구사항:
1. 웹에서 파일 목록 보기
2. 파일 업로드 기능
3. 파일 다운로드 기능
4. 파일 삭제 기능
5. 남은 용량 표시
6. 텍스트 파일 편집

📚 문법 설명 (코드 내 주석으로 포함):
- multipart/form-data: 파일 업로드
- server.upload(): 업로드 핸들러
- server.streamFile(): 파일 다운로드
- SPIFFS.totalBytes(), usedBytes(): 용량

핀: (없음)`,
        expectedKeywords: ['multipart', 'upload', 'streamFile', 'totalBytes'],
        quiz: {
          question: 'SPIFFS 사용량을 확인하는 함수는?',
          options: ['SPIFFS.size()', 'SPIFFS.usedBytes()', 'SPIFFS.getUsed()', 'SPIFFS.space()'],
          correctAnswer: 1,
        },
      },
    ],
    nextLesson: { day: 69, title: '데이터 로깅' },
  },

  // ============================================
  // Day 69: 데이터 로깅
  // ============================================
  69: {
    day: 69,
    title: '데이터 로깅',
    subtitle: '센서 데이터를 효율적으로 기록하고 분석합니다.',
    videoId: '4IkqT89qei0',
    videoTitle: '진행방법',
    goals: [
      {
        id: 1,
        title: '로깅 전략',
        description: '효율적인 데이터 로깅 방법을 설계합니다.',
        prompt: `IoT 데이터 로깅 전략에 대해 설명해줘.

설명해야 할 내용:
1. 로깅 목적 (분석, 디버깅, 감사)
2. 로깅 주기 결정 (실시간 vs 주기적)
3. 저장 매체 선택 (SPIFFS, SD, 클라우드)
4. 데이터 형식 (CSV, JSON, 바이너리)
5. 로그 순환 (오래된 로그 삭제)
6. 타임스탬프 중요성

📚 문법 설명:
- CSV: 간단, 스프레드시트 호환
- JSON: 구조화, 중첩 데이터
- 바이너리: 효율적, 파싱 필요

각 형식의 장단점을 비교해줘.`,
        expectedKeywords: ['로깅', 'CSV', 'JSON', '타임스탬프'],
        quiz: {
          question: '스프레드시트와 가장 호환되는 형식은?',
          options: ['JSON', 'CSV', 'XML', '바이너리'],
          correctAnswer: 1,
        },
      },
      {
        id: 2,
        title: 'CSV 로깅 구현',
        description: '센서 데이터를 CSV 파일로 저장합니다.',
        prompt: `센서 데이터를 CSV로 로깅하는 코드를 작성해줘.

요구사항:
1. 온습도 + 조도 데이터 측정
2. 1분마다 CSV 파일에 저장
3. 헤더 자동 생성 (첫 줄)
4. NTP 타임스탬프 포함
5. 파일 크기 제한 (1MB, 초과 시 순환)
6. 웹에서 CSV 다운로드

📚 문법 설명 (코드 내 주석으로 포함):
- CSV 형식: timestamp,temp,humid,light
- 파일 크기 확인: file.size()
- 순환: 오래된 파일 삭제 또는 이름 변경
- strftime()으로 타임스탬프 포맷

핀: I2C(21,22), 조도(34)`,
        expectedKeywords: ['CSV', 'timestamp', 'file.size', '순환'],
        quiz: {
          question: '파일 크기를 확인하는 함수는?',
          options: ['file.length()', 'file.size()', 'file.bytes()', 'file.getSize()'],
          correctAnswer: 1,
        },
      },
      {
        id: 3,
        title: '데이터 시각화',
        description: '로깅된 데이터를 그래프로 시각화합니다.',
        prompt: `로깅된 데이터를 웹에서 그래프로 시각화해줘.

요구사항:
1. CSV 파일에서 데이터 읽기
2. Chart.js로 그래프 표시
3. 시간축 x, 값 y
4. 여러 센서 동시 표시 (다중 라인)
5. 기간 선택 (1시간, 1일, 1주)
6. 평균/최대/최소 통계

📚 문법 설명 (코드 내 주석으로 포함):
- Chart.js: JavaScript 그래프 라이브러리
- JSON으로 데이터 전달
- 웹 페이지에 <canvas> 요소
- 시간 기반 x축 설정

핀: (없음, 웹 기반)`,
        expectedKeywords: ['Chart.js', 'canvas', '다중 라인', '통계'],
        quiz: {
          question: '웹에서 그래프를 그리는 요소는?',
          options: ['<div>', '<canvas>', '<img>', '<graph>'],
          correctAnswer: 1,
        },
      },
    ],
    nextLesson: { day: 70, title: 'ThingSpeak 연동' },
  },

  // ============================================
  // Day 70: ThingSpeak 연동
  // ============================================
  70: {
    day: 70,
    title: 'ThingSpeak 연동',
    subtitle: 'ThingSpeak IoT 플랫폼에 데이터를 전송합니다.',
    videoId: '4IkqT89qei0',
    videoTitle: '진행방법',
    goals: [
      {
        id: 1,
        title: 'ThingSpeak 소개',
        description: 'ThingSpeak 플랫폼의 기능을 학습합니다.',
        prompt: `ThingSpeak IoT 플랫폼에 대해 설명해줘.

설명해야 할 내용:
1. ThingSpeak란 (MathWorks IoT 분석 플랫폼)
2. 채널과 필드 개념
3. Write API Key와 Read API Key
4. 데이터 시각화 기능
5. MATLAB 분석 기능
6. 무료/유료 플랜 차이

📚 문법 설명:
- 채널: 데이터 저장소 (프로젝트별)
- 필드: 개별 센서 값 (최대 8개)
- API Key: 인증용 키
- 15초 제한: 무료 플랜 업로드 간격

ThingSpeak 설정 방법을 설명해줘.`,
        expectedKeywords: ['ThingSpeak', '채널', '필드', 'API Key'],
        quiz: {
          question: 'ThingSpeak 채널당 최대 필드 수는?',
          options: ['4', '8', '16', '무제한'],
          correctAnswer: 1,
        },
      },
      {
        id: 2,
        title: '데이터 업로드',
        description: 'HTTP로 ThingSpeak에 센서 데이터를 전송합니다.',
        prompt: `ESP32에서 ThingSpeak에 데이터를 전송하는 코드를 작성해줘.

요구사항:
1. WiFi 연결
2. 온습도 데이터 측정
3. HTTP GET으로 ThingSpeak에 전송
4. 20초마다 업로드 (무료 플랜)
5. 전송 성공/실패 확인
6. OLED에 상태 표시

📚 문법 설명 (코드 내 주석으로 포함):
- ThingSpeak URL: api.thingspeak.com
- /update?api_key=XXX&field1=값&field2=값
- HTTP GET 요청
- 응답: 엔트리 번호 (성공) 또는 0 (실패)

핀: I2C(21,22)`,
        expectedKeywords: ['api.thingspeak.com', '/update', 'api_key', 'field1'],
        quiz: {
          question: 'ThingSpeak 데이터 전송 방식은?',
          options: ['HTTP GET', 'HTTP POST', 'WebSocket', 'MQTT'],
          correctAnswer: 0,
        },
      },
      {
        id: 3,
        title: 'ThingSpeak 분석',
        description: 'ThingSpeak에서 데이터를 읽고 분석합니다.',
        prompt: `ThingSpeak에서 데이터를 읽고 분석하는 기능을 구현해줘.

요구사항:
1. Read API로 최근 데이터 읽기
2. JSON 응답 파싱
3. 평균 온도 계산
4. 임계값 초과 시 알림
5. 웹에서 ThingSpeak 차트 임베드
6. React 설정으로 트리거

📚 문법 설명 (코드 내 주석으로 포함):
- /channels/{id}/feeds.json?api_key=XXX&results=10
- 마지막 10개 데이터 읽기
- JSON 배열 파싱
- React: 조건 만족 시 액션 실행

핀: I2C(21,22), LED(25)`,
        expectedKeywords: ['feeds.json', 'results', 'React', '임계값'],
        quiz: {
          question: 'ThingSpeak에서 조건부 액션을 실행하는 기능은?',
          options: ['Trigger', 'React', 'Action', 'Alert'],
          correctAnswer: 1,
        },
      },
    ],
    nextLesson: { day: 71, title: 'AWS IoT Core' },
  },

  // ============================================
  // Day 71: AWS IoT Core
  // ============================================
  71: {
    day: 71,
    title: 'AWS IoT Core',
    subtitle: 'AWS IoT Core에 ESP32를 연결합니다.',
    videoId: '4IkqT89qei0',
    videoTitle: '진행방법',
    goals: [
      {
        id: 1,
        title: 'AWS IoT Core 이해',
        description: 'AWS IoT 서비스의 구조를 학습합니다.',
        prompt: `AWS IoT Core에 대해 설명해줘.

설명해야 할 내용:
1. AWS IoT Core란
2. Thing, Certificate, Policy 개념
3. MQTT 브로커 역할
4. Device Shadow
5. Rules Engine
6. 보안 (TLS, X.509 인증서)

📚 문법 설명:
- Thing: IoT 장치 등록
- Certificate: X.509 인증서 (보안)
- Policy: 권한 설정 (pub/sub 토픽)
- Shadow: 장치 상태 동기화

AWS IoT 구조를 다이어그램(텍스트)으로 설명해줘.`,
        expectedKeywords: ['Thing', 'Certificate', 'Policy', 'Shadow'],
        quiz: {
          question: 'AWS IoT에서 장치를 등록하는 것은?',
          options: ['Device', 'Thing', 'Endpoint', 'Gateway'],
          correctAnswer: 1,
        },
      },
      {
        id: 2,
        title: 'AWS IoT 연결',
        description: 'ESP32를 AWS IoT Core에 연결합니다.',
        prompt: `ESP32를 AWS IoT Core에 연결하는 코드를 작성해줘.

요구사항:
1. WiFiClientSecure로 TLS 연결
2. X.509 인증서 설정
3. MQTT 연결
4. 센서 데이터 발행
5. 명령 토픽 구독
6. 연결 상태 모니터링

📚 문법 설명 (코드 내 주석으로 포함):
- WiFiClientSecure client: TLS 클라이언트
- client.setCACert(root_ca): 루트 CA 설정
- client.setCertificate(certificate): 장치 인증서
- client.setPrivateKey(private_key): 개인 키
- PubSubClient mqtt(client): MQTT 클라이언트

핀: I2C(21,22), LED(25)`,
        expectedKeywords: ['WiFiClientSecure', 'setCACert', 'setCertificate', 'setPrivateKey'],
        quiz: {
          question: 'AWS IoT 연결에 필요한 파일이 아닌 것은?',
          options: ['루트 CA', '장치 인증서', '개인 키', 'API 키'],
          correctAnswer: 3,
        },
      },
      {
        id: 3,
        title: 'Device Shadow 활용',
        description: 'Device Shadow로 상태를 동기화합니다.',
        prompt: `AWS IoT Device Shadow를 활용하는 코드를 작성해줘.

요구사항:
1. Shadow 업데이트 발행 (reported)
2. Shadow delta 구독 (desired 변경 감지)
3. LED 상태를 Shadow로 관리
4. 오프라인 중 변경사항 동기화
5. 현재 상태와 희망 상태 비교
6. Shadow 문서 구조 이해

📚 문법 설명 (코드 내 주석으로 포함):
- $aws/things/{name}/shadow/update: 상태 업데이트
- $aws/things/{name}/shadow/update/delta: 변경사항
- {"state":{"reported":{"led":"on"}}}
- {"state":{"desired":{"led":"off"}}}

핀: LED(25,26,27)`,
        expectedKeywords: ['Shadow', 'reported', 'desired', 'delta'],
        quiz: {
          question: 'Device Shadow에서 실제 상태를 나타내는 것은?',
          options: ['desired', 'reported', 'delta', 'metadata'],
          correctAnswer: 1,
        },
      },
    ],
    nextLesson: { day: 72, title: 'Google Firebase' },
  },

  // ============================================
  // Day 72: Google Firebase
  // ============================================
  72: {
    day: 72,
    title: 'Google Firebase',
    subtitle: 'Firebase Realtime Database와 ESP32를 연동합니다.',
    videoId: '4IkqT89qei0',
    videoTitle: '진행방법',
    goals: [
      {
        id: 1,
        title: 'Firebase 이해',
        description: 'Firebase 서비스의 특징을 학습합니다.',
        prompt: `Google Firebase에 대해 설명해줘.

설명해야 할 내용:
1. Firebase란 (Google 앱 개발 플랫폼)
2. Realtime Database vs Firestore
3. 실시간 동기화 특징
4. 인증 방법 (익명, 이메일, OAuth)
5. 보안 규칙
6. 무료 티어 제한

📚 문법 설명:
- Realtime Database: JSON 트리 구조
- 실시간 동기화: 변경 시 자동 푸시
- REST API + WebSocket

Firebase 프로젝트 설정 방법을 설명해줘.`,
        expectedKeywords: ['Firebase', 'Realtime Database', '실시간', '인증'],
        quiz: {
          question: 'Firebase Realtime Database의 데이터 형식은?',
          options: ['SQL', 'JSON', 'XML', 'CSV'],
          correctAnswer: 1,
        },
      },
      {
        id: 2,
        title: 'Firebase 연동',
        description: 'ESP32에서 Firebase에 데이터를 저장합니다.',
        prompt: `ESP32를 Firebase Realtime Database에 연동하는 코드를 작성해줘.

요구사항:
1. Firebase ESP32 라이브러리 사용
2. 익명 인증 또는 시크릿 키
3. 센서 데이터 저장 (push)
4. 설정값 읽기 (get)
5. 실시간 변경 감지 (stream)
6. LED 제어 명령 수신

📚 문법 설명 (코드 내 주석으로 포함):
- #include <Firebase_ESP_Client.h>
- Firebase.RTDB.setString(): 데이터 쓰기
- Firebase.RTDB.getString(): 데이터 읽기
- Firebase.RTDB.pushJSON(): 자동 키 생성
- Firebase.RTDB.beginStream(): 실시간 스트림

핀: I2C(21,22), LED(25,26,27)`,
        expectedKeywords: ['Firebase_ESP_Client', 'setString', 'getString', 'beginStream'],
        quiz: {
          question: 'Firebase에서 자동 고유 키로 데이터를 추가하는 함수는?',
          options: ['setJSON', 'pushJSON', 'addJSON', 'insertJSON'],
          correctAnswer: 1,
        },
      },
      {
        id: 3,
        title: '실시간 대시보드',
        description: 'Firebase로 실시간 IoT 대시보드를 만듭니다.',
        prompt: `Firebase 기반 실시간 대시보드를 만들어줘.

요구사항:
1. ESP32: 센서 데이터 Firebase 저장
2. 웹 앱: Firebase 실시간 구독
3. 데이터 변경 시 자동 UI 업데이트
4. 웹에서 LED 제어 명령 전송
5. ESP32: 명령 스트림으로 수신
6. 양방향 실시간 통신

📚 문법 설명 (코드 내 주석으로 포함):
- ESP32: stream 콜백에서 명령 처리
- 웹: firebase.database().ref().on('value', ...)
- 경로 구조: /devices/{id}/sensors, /commands

핀: I2C(21,22), LED(25,26,27)`,
        expectedKeywords: ['실시간', 'stream', '양방향', 'on(value)'],
        quiz: {
          question: 'Firebase 실시간 데이터 변경을 감지하는 메서드는?',
          options: ['get()', 'on()', 'watch()', 'listen()'],
          correctAnswer: 1,
        },
      },
    ],
    nextLesson: { day: 73, title: 'Home Assistant 연동' },
  },

  // ============================================
  // Day 73: Home Assistant 연동
  // ============================================
  73: {
    day: 73,
    title: 'Home Assistant 연동',
    subtitle: 'Home Assistant와 ESP32를 MQTT로 연동합니다.',
    videoId: '4IkqT89qei0',
    videoTitle: '진행방법',
    goals: [
      {
        id: 1,
        title: 'Home Assistant 소개',
        description: '오픈소스 홈 자동화 플랫폼을 이해합니다.',
        prompt: `Home Assistant에 대해 설명해줘.

설명해야 할 내용:
1. Home Assistant란 (오픈소스 홈 자동화)
2. MQTT 통합 방법
3. MQTT Discovery (자동 장치 등록)
4. 엔티티와 도메인 개념
5. 자동화 (Automation)
6. 대시보드 (Lovelace)

📚 문법 설명:
- 통합 (Integration): 외부 서비스 연결
- 엔티티: 센서, 스위치 등 개별 항목
- 자동화: 조건 → 액션

Home Assistant 구조를 설명해줘.`,
        expectedKeywords: ['Home Assistant', 'MQTT', 'Discovery', '자동화'],
        quiz: {
          question: 'Home Assistant에서 자동으로 장치를 등록하는 기능은?',
          options: ['Auto-connect', 'MQTT Discovery', 'Plug-and-play', 'Auto-detect'],
          correctAnswer: 1,
        },
      },
      {
        id: 2,
        title: 'MQTT Discovery 구현',
        description: 'ESP32가 Home Assistant에 자동 등록되도록 합니다.',
        prompt: `ESP32 MQTT Discovery를 구현하는 코드를 작성해줘.

요구사항:
1. 연결 시 Discovery 토픽에 설정 발행
2. 온도 센서 엔티티 등록
3. 습도 센서 엔티티 등록
4. LED 스위치 엔티티 등록
5. 상태 토픽에 값 발행
6. 명령 토픽 구독으로 제어

📚 문법 설명 (코드 내 주석으로 포함):
- homeassistant/sensor/{id}/config: Discovery 토픽
- {"name":"온도", "state_topic":"...", "unit_of_measurement":"°C"}
- homeassistant/switch/{id}/config: 스위치 등록
- command_topic: 명령 수신 토픽

핀: I2C(21,22), LED(25)`,
        expectedKeywords: ['homeassistant/', 'config', 'state_topic', 'command_topic'],
        quiz: {
          question: 'MQTT Discovery 설정을 발행하는 토픽은?',
          options: ['/discovery', '/config', 'homeassistant/.../config', '/register'],
          correctAnswer: 2,
        },
      },
      {
        id: 3,
        title: '자동화 연동',
        description: 'Home Assistant 자동화와 ESP32를 연동합니다.',
        prompt: `Home Assistant 자동화와 ESP32를 연동하는 시나리오를 구현해줘.

요구사항:
1. ESP32: 온도 센서 + LED + PIR
2. Home Assistant 자동화:
   - 온도 30도 이상 → 팬(가상) ON
   - 움직임 감지 → 알림 전송
   - 일몰 → LED ON
3. ESP32에서 상태 업데이트
4. HA에서 수동 제어도 가능
5. OLED에 HA 연결 상태 표시

📚 문법 설명 (코드 내 주석으로 포함):
- binary_sensor: PIR (ON/OFF)
- automation: trigger → action
- state 변경 → HA가 감지 → 자동화 실행

핀: I2C(21,22), LED(25), PIR(32)`,
        expectedKeywords: ['binary_sensor', 'automation', 'trigger', 'action'],
        quiz: {
          question: 'PIR 센서를 HA에 등록할 때 사용하는 도메인은?',
          options: ['sensor', 'binary_sensor', 'switch', 'motion'],
          correctAnswer: 1,
        },
      },
    ],
    nextLesson: { day: 74, title: '보안 강화' },
  },

  // ============================================
  // Day 74: 보안 강화
  // ============================================
  74: {
    day: 74,
    title: '보안 강화',
    subtitle: 'IoT 장치의 보안을 강화합니다.',
    videoId: '4IkqT89qei0',
    videoTitle: '진행방법',
    goals: [
      {
        id: 1,
        title: 'IoT 보안 위협',
        description: 'IoT 장치의 보안 위협을 이해합니다.',
        prompt: `IoT 보안 위협에 대해 설명해줘.

설명해야 할 내용:
1. 일반적인 IoT 보안 위협
2. 평문 통신의 위험
3. 기본 비밀번호 문제
4. 펌웨어 취약점
5. 물리적 접근 위험
6. 중간자 공격 (MITM)

📚 문법 설명:
- TLS/SSL: 암호화 통신
- 인증: 장치/사용자 확인
- OTA 보안: 서명된 펌웨어

보안 모범 사례를 설명해줘.`,
        expectedKeywords: ['보안', 'TLS', '암호화', '인증'],
        quiz: {
          question: '평문 HTTP 대신 사용해야 하는 것은?',
          options: ['FTP', 'HTTPS', 'Telnet', 'SMTP'],
          correctAnswer: 1,
        },
      },
      {
        id: 2,
        title: 'TLS 통신 구현',
        description: 'WiFiClientSecure로 암호화 통신을 구현합니다.',
        prompt: `ESP32에서 TLS 암호화 통신을 구현하는 코드를 작성해줘.

요구사항:
1. HTTPS 서버 연결
2. 서버 인증서 검증
3. 클라이언트 인증서 (선택)
4. 자체 서명 인증서 처리
5. 인증서 만료 확인
6. 연결 오류 처리

📚 문법 설명 (코드 내 주석으로 포함):
- WiFiClientSecure client
- client.setCACert(root_ca): 루트 CA로 서버 검증
- client.setInsecure(): 인증서 검증 안 함 (테스트용, 위험)
- client.verify(): 서버 인증서 검증

핀: (없음)`,
        expectedKeywords: ['WiFiClientSecure', 'setCACert', 'verify', 'HTTPS'],
        quiz: {
          question: '서버 인증서를 검증하지 않으면?',
          options: ['더 빠름', '중간자 공격 가능', '더 안전', '연결 안 됨'],
          correctAnswer: 1,
        },
      },
      {
        id: 3,
        title: '안전한 OTA 업데이트',
        description: '서명된 펌웨어로 안전한 OTA를 구현합니다.',
        prompt: `안전한 OTA 업데이트를 구현하는 코드를 작성해줘.

요구사항:
1. 펌웨어 MD5 해시 검증
2. HTTPS로 펌웨어 다운로드
3. 버전 비교 후 업데이트 결정
4. 업데이트 전 백업
5. 롤백 메커니즘
6. 업데이트 비밀번호

📚 문법 설명 (코드 내 주석으로 포함):
- HTTPUpdate 라이브러리
- httpUpdate.setMD5(hash): 해시 검증
- 롤백: 이전 파티션으로 복구
- esp_ota_get_running_partition(): 현재 파티션

핀: (없음)`,
        expectedKeywords: ['MD5', 'HTTPS', '롤백', '버전'],
        quiz: {
          question: '펌웨어 무결성을 확인하는 방법은?',
          options: ['파일 크기', 'MD5/SHA 해시', '파일 이름', '날짜'],
          correctAnswer: 1,
        },
      },
    ],
    nextLesson: { day: 75, title: '고급 2차 종합 프로젝트' },
  },

  // ============================================
  // Day 75: 고급 2차 종합 프로젝트
  // ============================================
  75: {
    day: 75,
    title: '고급 2차 종합 프로젝트',
    subtitle: '클라우드 연동 스마트 홈 허브를 구축합니다.',
    videoId: '4IkqT89qei0',
    videoTitle: '진행방법',
    goals: [
      {
        id: 1,
        title: '프로젝트 설계',
        description: '스마트 홈 허브를 설계합니다.',
        prompt: `ESP32 스마트 홈 허브 프로젝트를 설계해줘.

시스템 구성:
1. 허브 (ESP32): WiFi + BLE + ESP-NOW
2. 센서 노드들: ESP-NOW 또는 BLE
3. 클라우드: Firebase 또는 AWS
4. 스마트폰 앱: 실시간 모니터링

기능:
- 다중 센서 데이터 수집
- 클라우드 동기화
- 모바일 앱 연동
- 자동화 규칙 실행
- TLS 암호화 통신

시스템 아키텍처를 설계해줘.`,
        expectedKeywords: ['허브', '클라우드', '자동화', 'TLS'],
        quiz: {
          question: '스마트 홈 허브의 핵심 역할은?',
          options: ['센서 역할', '데이터 수집 및 중계', '디스플레이', '전원 공급'],
          correctAnswer: 1,
        },
      },
      {
        id: 2,
        title: '허브 구현',
        description: '스마트 홈 허브 코드를 작성합니다.',
        prompt: `스마트 홈 허브 코드를 작성해줘.

요구사항:
1. ESP-NOW로 센서 노드 데이터 수신
2. BLE로 스마트폰 직접 연결 (근거리)
3. WiFi로 클라우드 연결
4. FreeRTOS 태스크로 병렬 처리
5. 자동화 규칙 엔진
6. TFT 대시보드 (옵션)

📚 문법 설명 (코드 내 주석으로 포함):
- 멀티 프로토콜 관리
- 태스크 간 Queue 통신
- 규칙 엔진: if (condition) action

핀: (다양)`,
        expectedKeywords: ['멀티 프로토콜', 'Queue', '규칙 엔진', '태스크'],
        quiz: {
          question: '멀티 프로토콜 허브에서 데이터 공유 방법은?',
          options: ['전역 변수', 'Queue/Mutex', '파일', 'EEPROM'],
          correctAnswer: 1,
        },
      },
      {
        id: 3,
        title: '클라우드 연동',
        description: '클라우드와 실시간 연동합니다.',
        prompt: `스마트 홈 허브를 클라우드와 연동하는 코드를 작성해줘.

요구사항:
1. Firebase/AWS에 센서 데이터 저장
2. 실시간 스트림으로 명령 수신
3. 자동화 규칙 클라우드에서 동기화
4. 장치 상태 Shadow/RTDB 반영
5. 오프라인 시 로컬 저장 후 동기화
6. 보안: TLS + 인증

📚 문법 설명 (코드 내 주석으로 포함):
- 오프라인 버퍼링: SPIFFS에 임시 저장
- 연결 복구 시 일괄 전송
- 동기화 타임스탬프로 충돌 해결

핀: (이전과 동일)`,
        expectedKeywords: ['오프라인', '버퍼링', '동기화', 'Shadow'],
        quiz: {
          question: '오프라인 중 데이터를 어떻게 처리?',
          options: ['삭제', '로컬 저장 후 나중에 동기화', '무시', '즉시 재부팅'],
          correctAnswer: 1,
        },
      },
    ],
    nextLesson: { day: 76, title: 'PCB 설계 기초' },
  },
};
