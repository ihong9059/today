# Track 4: AI 전문가
> 기간: 4주 (20일) | 선행: Track 2 | 도구: PyTorch, OpenCV, YOLO, Jetson Nano

## 목표
- 딥러닝 기본 원리 이해 (암기 아닌 직관)
- 컴퓨터 비전 실전 프로젝트 수행
- 자동차 번호판 인식 시스템 완성
- Edge AI (Jetson Nano) 배포

---

## Week 1: 딥러닝 기초

### Day 1: AI/ML/DL 개념 정리
- **이론**:
  - AI > ML > DL 관계
  - 지도학습 vs 비지도학습 vs 강화학습
  - 뉴런 → 퍼셉트론 → 신경망 진화
  - Claude에게 "딥러닝을 5살에게 설명해줘"
- **실습**: Google Colab 환경 설정 + 첫 노트북 실행
- **과제**: AI/ML/DL 개념 정리 노트 작성

### Day 2: 텐서와 PyTorch 기초
- **실습**:
  - PyTorch 설치 + Tensor 기본 연산
  - NumPy ↔ Tensor 변환
  - GPU 사용 확인 (cuda.is_available)
  - Claude에게 "Tensor 연산 예제 만들어줘"
- **과제**: Tensor 연산 10문제

### Day 3: 선형 회귀 (첫 번째 모델)
- **이론**: 손실 함수, 경사 하강법, 학습률
- **실습**:
  - 데이터 생성 (y = 2x + 3 + 노이즈)
  - 모델 정의 → 학습 → 예측
  - 학습 과정 시각화 (loss 그래프)
- **과제**: 학습률을 바꿔가며 결과 비교

### Day 4: 분류 문제 + MNIST
- **이론**: 로지스틱 회귀, Softmax, Cross-Entropy
- **실습**:
  - MNIST 데이터셋 (손글씨 숫자 0~9)
  - 간단한 신경망으로 분류 (Linear → ReLU → Linear)
  - 정확도 측정 + 혼동 행렬
  - Claude에게 "이 모델 정확도를 높여줘"
- **과제**: 정확도 95% 이상 달성

### Day 5: CNN (Convolutional Neural Network)
- **이론**: 합성곱, 풀링, 특징 추출 원리
- **실습**:
  - Conv2d → BatchNorm → ReLU → MaxPool 구조
  - MNIST에 CNN 적용 → 99%+ 정확도
  - 필터 시각화 (모델이 무엇을 보는가)
- **과제**: MNIST CNN 99% 이상 + 학습 곡선 리포트

---

## Week 2: 컴퓨터 비전

### Day 6: OpenCV 기초
- **실습**:
  - OpenCV 설치 + 이미지 읽기/쓰기/표시
  - 색상 변환 (BGR → RGB → Grayscale → HSV)
  - 이미지 크기 조절, 자르기, 회전
  - Claude에게 "이 이미지에서 얼굴 영역만 잘라줘"
- **과제**: 이미지 10장 전처리 파이프라인

### Day 7: 이미지 처리
- **실습**:
  - 블러 (Gaussian, Median)
  - 엣지 검출 (Canny)
  - 이진화 (Threshold, Adaptive, Otsu)
  - 모폴로지 연산 (Erosion, Dilation)
- **과제**: 번호판 영역 전처리 연습 (블러 → 이진화 → 엣지)

### Day 8: 객체 검출 개념
- **이론**:
  - 분류 vs 검출 vs 세그멘테이션
  - Bounding Box, IoU, NMS
  - YOLO 계열 발전사 (v3 → v5 → v8 → v11)
- **실습**: 사전학습 YOLO로 이미지 객체 검출
  - Ultralytics YOLOv8 설치
  - 이미지/영상에서 객체 검출 실행
- **과제**: 사무실 사진으로 객체 검출 → 결과 분석

### Day 9: YOLO 커스텀 학습
- **실습**:
  - 데이터셋 준비 (이미지 + 라벨링)
  - Roboflow로 라벨링 (무료)
  - YOLO 데이터셋 형식 (images/, labels/, data.yaml)
  - 학습: `yolo train data=data.yaml model=yolov8n.pt epochs=50`
- **과제**: 자신만의 객체 검출 모델 학습 (5 클래스 이상)

### Day 10: 실시간 영상 처리
- **실습**:
  - 웹캠 영상 캡처 (cv2.VideoCapture)
  - 실시간 객체 검출 (YOLO + 웹캠)
  - FPS 측정 + 최적화
  - 검출 결과 화면 표시 (Bounding Box + 라벨)
- **과제**: 웹캠 실시간 객체 검출 데모

---

## Week 3: 번호판 인식 (LPR) 프로젝트

### Day 11: LPR 시스템 설계
- **이론**:
  - LPR 파이프라인: 차량 검출 → 번호판 검출 → 문자 인식
  - 한국 번호판 규격 (크기, 색상, 글꼴)
  - EasyOCR vs Tesseract vs PaddleOCR 비교
- **실습**: 파이프라인 설계 + 데이터 수집 계획
- **과제**: LPR 시스템 설계 문서 작성

### Day 12: 번호판 검출 모델
- **실습**:
  - 번호판 데이터셋 수집/라벨링 (또는 공개 데이터셋)
  - YOLO로 번호판 검출 모델 학습
  - 검출 정확도 평가 (mAP)
  - Claude에게 "학습 결과 분석해줘"
- **과제**: 번호판 검출 mAP 80% 이상

### Day 13: OCR — 문자 인식
- **실습**:
  - EasyOCR 설치 + 한국어 인식
  - 번호판 영역 전처리 (이진화, 노이즈 제거)
  - OCR 적용 → 번호판 텍스트 추출
  - 후처리 (정규식으로 형식 검증: "12가 3456")
- **과제**: 번호판 이미지 20장 → OCR 정확도 측정

### Day 14: LPR 파이프라인 통합
- **실습**:
  - 차량 검출 (YOLO) → 번호판 검출 (YOLO) → OCR (EasyOCR)
  - 결과 저장 (이미지 + 번호 + 시간 → DB/CSV)
  - 오검출 필터링 로직
  - 처리 속도 최적화
- **과제**: 사진 입력 → 번호판 텍스트 출력 완전 자동화

### Day 15: 실시간 LPR
- **실습**:
  - 영상/웹캠 입력 → 실시간 번호판 인식
  - 프레임 스킵 (매 프레임 처리 불필요)
  - 중복 번호 필터링 (같은 차 반복 인식 방지)
  - 결과 로그 저장
- **과제**: 실시간 LPR 데모 영상 촬영

---

## Week 4: Edge AI + 프로젝트 완성

### Day 16: 모델 최적화
- **이론**: 모델 경량화 필요성 (서버 vs Edge)
- **실습**:
  - 모델 크기 비교 (YOLOv8n vs s vs m)
  - ONNX 변환 (PyTorch → ONNX)
  - TensorRT 변환 (ONNX → TensorRT)
  - 추론 속도 비교 (CPU vs GPU vs TensorRT)
- **과제**: LPR 모델 ONNX 변환 + 속도 비교 리포트

### Day 17: Jetson Nano 배포 (선택)
- **실습**:
  - Jetson Nano 환경 설정 (JetPack)
  - CUDA + TensorRT 환경 확인
  - LPR 모델 Jetson 배포
  - 엣지 디바이스 실시간 추론
- **대안**: GPU 없으면 Google Colab T4 GPU로 실습
- **과제**: Edge 디바이스에서 LPR 실행

### Day 18: 웹 서비스화
- **실습**:
  - FastAPI로 LPR API 서버 구축
  - POST /api/lpr (이미지 업로드 → 번호 반환)
  - 간단한 웹 UI (이미지 업로드 → 결과 표시)
  - Claude에게 "LPR 웹 서비스 만들어줘"
- **과제**: LPR 웹 서비스 배포

### Day 19: 종합 프로젝트 완성
- **프로젝트 완성**:
  - LPR 전체 파이프라인 (검출 → OCR → DB → 웹)
  - 성능 리포트 (정확도, 속도, 한계점)
  - 시스템 아키텍처 문서
  - 개선 방안 (야간, 흐림, 비스듬한 각도 등)
  - GitHub 저장소 정리

### Day 20: 발표 + 수료
- **발표**: LPR 시스템 데모 + 기술 발표
  - 아키텍처 설명
  - 라이브 데모 (실시간 인식)
  - 성능 수치 + 개선 방향
- **토론**: AI 프로젝트 진행 경험 공유
- **수료**: Track 4 수료증 발급

---

## 평가 기준
| 항목 | 비중 | 내용 |
|------|:----:|------|
| 일일 과제 | 20% | Day 1~18 과제 |
| LPR 시스템 | 50% | 정확도, 속도, 완성도 |
| 기술 문서 | 15% | 아키텍처, 성능 리포트 |
| 발표 | 15% | 데모 + 설명 + Q&A |

## 준비물
- 노트북 + GPU (권장, 없으면 Google Colab)
- Python 3.10+ / PyTorch 2.0+
- (선택) Jetson Nano + SSD
- (선택) USB 카메라 또는 웹캠

## 실전 확장 아이디어
- 주차장 자동 입출차 시스템
- 불법 주정차 감지
- 교통량 분석 (차량 카운팅)
- 품질 검사 AI (제조 라인 불량 검출)
