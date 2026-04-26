# Track 4: Claude Code로 AI 전문가
> 기간: 4주 (20일) | 선행: Track 2 | 도구: Claude Code, PyTorch, OpenCV, YOLO, Jetson Nano

## 목표
- Claude Code를 활용한 AI/딥러닝 프로젝트 수행
- 코드는 Claude Code가 생성, 학생은 원리와 판단에 집중
- 자동차 번호판 인식(LPR) 시스템 완성
- Edge AI (Jetson Nano) 배포

## 교육 철학
> "수학 공식을 외우지 마라. Claude Code에게 모델을 만들어달라고 하고, 결과를 해석하는 눈을 키워라."

---

## Week 1: 딥러닝 기초 (Claude Code + Colab)

### Day 1: AI/ML/DL 개념 + 환경 설정
- **실습**:
  - Claude Code에게 "딥러닝을 5살에게 설명해줘" → 개념 정리
  - Google Colab 환경 설정 + 첫 노트북
  - Claude Code로 "PyTorch 설치 확인하는 코드 만들어줘"
  - AI > ML > DL 관계, 지도학습 vs 비지도학습
- **과제**: AI/ML/DL 개념 정리 노트 (Claude Code로 마크다운 생성)

### Day 2: 텐서 + PyTorch 기초
- **실습**:
  - Claude Code에게 "Tensor 기본 연산 예제 만들어줘"
  - NumPy ↔ Tensor 변환
  - GPU 확인 (cuda.is_available)
  - Claude Code로 코드 실행 + 결과 설명 요청
- **참고**: `aiStudy/Level-4-PyTorch실전/` 자료 활용
- **과제**: Tensor 연산 10문제 (Claude Code가 출제 + 채점)

### Day 3: 첫 번째 모델 — 선형 회귀
- **실습**:
  - Claude Code에게 "y = 2x + 3 데이터로 선형 회귀 학습하는 코드 만들어줘"
  - 손실 함수, 경사 하강법, 학습률 개념
  - 학습 과정 시각화 (loss 그래프)
  - "학습률을 바꾸면 어떻게 되는지 실험해줘"
- **과제**: 학습률 실험 리포트

### Day 4: MNIST 분류 — 첫 번째 신경망
- **실습**:
  - Claude Code에게 "MNIST 분류 신경망 만들어줘"
  - 정확도 측정 + 혼동 행렬
  - "정확도를 높여줘" → Claude Code가 모델 개선
  - 과적합/정규화 개념 (참고: `Level-3-딥러닝핵심/`)
- **과제**: 정확도 95% 이상 달성

### Day 5: CNN — 이미지 인식의 핵심
- **실습**:
  - Claude Code에게 "MNIST에 CNN 적용해줘"
  - Conv2d → BatchNorm → ReLU → MaxPool 구조
  - 99%+ 정확도 달성
  - 필터 시각화 — "모델이 무엇을 보는지 보여줘"
- **참고**: `Level-4-PyTorch실전/CNN_합성곱신경망_가이드.md`
- **과제**: MNIST CNN 99% 이상 + 학습 곡선 리포트

---

## Week 2: 컴퓨터 비전 (Claude Code + OpenCV)

### Day 6: OpenCV 기초
- **실습**:
  - Claude Code에게 "OpenCV로 이미지 읽고 처리하는 코드 만들어줘"
  - 색상 변환, 크기 조절, 자르기, 회전
  - "이 이미지에서 특정 영역만 잘라줘"
- **과제**: 이미지 10장 전처리 파이프라인

### Day 7: 이미지 처리 심화
- **실습**:
  - Claude Code로 블러, 엣지 검출(Canny), 이진화(Otsu)
  - 모폴로지 연산 (Erosion, Dilation)
  - 번호판 영역 전처리 연습
- **과제**: 번호판 이미지 전처리 파이프라인

### Day 8: YOLO 객체 검출
- **실습**:
  - Claude Code에게 "YOLOv8로 이미지에서 객체 검출해줘"
  - Ultralytics 설치 + 사전학습 모델 실행
  - 분류 vs 검출 vs 세그멘테이션 차이
  - 사무실 사진으로 실습
- **과제**: 객체 검출 결과 분석 리포트

### Day 9: YOLO 커스텀 학습
- **실습**:
  - Roboflow로 데이터 라벨링
  - Claude Code에게 "YOLO 커스텀 학습 코드 만들어줘"
  - data.yaml 생성, 학습 실행
  - 학습 결과 분석 (mAP, 혼동 행렬)
- **과제**: 자신만의 객체 검출 모델 학습

### Day 10: 실시간 영상 처리
- **실습**:
  - Claude Code에게 "웹캠으로 실시간 객체 검출하는 코드 만들어줘"
  - FPS 측정 + 최적화
  - Bounding Box + 라벨 표시
- **과제**: 실시간 객체 검출 데모

---

## Week 3: 번호판 인식(LPR) 프로젝트

### Day 11: LPR 시스템 설계
- **실습**:
  - Claude Code에게 "번호판 인식 시스템 아키텍처 설계해줘"
  - 파이프라인: 차량 검출 → 번호판 검출 → 문자 인식
  - 한국 번호판 규격 분석
  - EasyOCR vs Tesseract 비교
- **참고**: `Level-9-종합프로젝트/` 자료
- **과제**: LPR 시스템 설계 문서

### Day 12: 번호판 검출 모델 학습
- **실습**:
  - 데이터셋 수집/라벨링
  - Claude Code에게 "YOLO로 번호판 검출 모델 학습해줘"
  - mAP 평가 + 결과 분석
- **과제**: 번호판 검출 mAP 80%+

### Day 13: OCR — 문자 인식
- **실습**:
  - Claude Code에게 "EasyOCR로 번호판 문자 인식하는 코드 만들어줘"
  - 전처리 (이진화, 노이즈 제거) → OCR → 후처리 (정규식)
  - 정확도 측정
- **과제**: 번호판 이미지 20장 → OCR 정확도 측정

### Day 14: LPR 파이프라인 통합
- **실습**:
  - Claude Code에게 "전체 LPR 파이프라인 통합해줘"
  - 차량 검출 → 번호판 검출 → OCR → DB 저장
  - 오검출 필터링, 처리 속도 최적화
- **과제**: 사진 → 번호판 텍스트 완전 자동화

### Day 15: 실시간 LPR + 웹 서비스
- **실습**:
  - 영상/웹캠 실시간 번호판 인식
  - Claude Code에게 "FastAPI로 LPR 웹 서비스 만들어줘"
  - POST /api/lpr → 이미지 업로드 → 번호 반환
  - 간단한 웹 UI
- **과제**: LPR 웹 서비스 완성

---

## Week 4: Edge AI + 프로젝트 완성

### Day 16: 모델 최적화
- **실습**:
  - Claude Code에게 "이 모델을 ONNX로 변환해줘"
  - 모델 크기/속도 비교 (YOLOv8n vs s vs m)
  - TensorRT 변환
  - CPU vs GPU vs TensorRT 추론 속도 비교
- **과제**: LPR 모델 ONNX 변환 + 속도 비교 리포트

### Day 17: Jetson Nano 배포 (선택)
- **실습**:
  - Jetson Nano 환경 설정
  - Claude Code에게 "LPR 모델을 Jetson에 배포해줘"
  - 엣지 디바이스 실시간 추론
- **참고**: `Level-9-종합프로젝트/RaspberryPi_CoralTPU_가이드.md`
- **대안**: GPU 없으면 Google Colab T4로 실습
- **과제**: Edge 디바이스에서 LPR 실행

### Day 18-19: 종합 프로젝트 완성
- **Claude Code로 전 과정 진행**:
  - LPR 전체 파이프라인 (검출 → OCR → DB → 웹)
  - 성능 리포트 (정확도, 속도, 한계점)
  - 시스템 아키텍처 문서
  - GitHub 저장소 정리 (README, 라이선스)

### Day 20: 발표 + 수료
- **발표**: LPR 시스템 데모 + 기술 발표
  - 라이브 데모 (실시간 인식)
  - 성능 수치 + 개선 방향
  - "Claude Code가 어떻게 도움이 되었나"
- **수료**: Track 4 수료증 발급

---

## 평가 기준
| 항목 | 비중 | 내용 |
|------|:----:|------|
| 일일 과제 | 20% | Day 1~17 과제 |
| LPR 시스템 | 50% | 정확도, 속도, 완성도 |
| 기술 문서 | 15% | 아키텍처, 성능 리포트 |
| 발표 | 15% | 데모 + 설명 + Q&A |

## 준비물
- 노트북 + Claude Code CLI (Claude Pro)
- Python 3.10+ / PyTorch 2.0+
- Google Colab (GPU 사용)
- (선택) Jetson Nano + USB 카메라

## 실전 확장 아이디어
- 주차장 자동 입출차 시스템
- 불법 주정차 감지
- 교통량 분석 (차량 카운팅)
- 품질 검사 AI (제조 라인 불량 검출)
