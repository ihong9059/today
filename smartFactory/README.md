# Smart Factory - 배터리 리사이클링 AI 스마트팩토리 프로젝트

배터리(LIB) 리사이클링 공정에 AI 기반 스마트팩토리 기술을 적용하기 위한 제안서, AI 모델, 실습 자료를 통합 관리하는 프로젝트입니다.

## 폴더 구조

```
smartFactory/
├── backup/                     # 제안서 및 참고자료 백업
│   ├── 구성/                   # 스마트팩토리 계획서 (고장예지, 품질관리, 회수율 향상)
│   │   └── new/               # 차세대 배터리 리사이클링 메가플랜트 관련 PDF
│   ├── 동영상/                 # 장비별 동영상 시나리오 및 PDF
│   │   ├── 태명과학/          # FRITSCH 분쇄장비 (볼밀, 커팅밀, 입도분석 등)
│   │   └── 한국기계/          # 터보밀, 롤밀, 크러셔, 믹서, 배터리리사이클링 시스템
│   ├── 장봉진/                 # 파트너사 자료
│   │   ├── china/             # UTTEC 회사소개, 이력서
│   │   ├── 설명업체/          # QINGDAO KRETTO 기술 검토서, 1500V SESS-PCS
│   │   └── 장봉진/            # BSS(배터리안전시스템) vs BMS 비교, ROI 분석
│   └── 태명과학/               # FRITSCH 장비 카탈로그 이미지 및 나레이션
│
├── shredder/                   # 슈레더(파쇄기) AI 시스템
│   ├── ai/                    # AI 모델 10종 (Python 코드)
│   │   ├── 01_LSTM_Autoencoder_베어링이상탐지/
│   │   ├── 02_Gradient_Boosting_칼날마모예측/
│   │   ├── 03_Classical_DSP_축불균형진단/
│   │   ├── 04_Pattern_Recognition_이물질끼임감지/
│   │   ├── 05_Anomaly_Detection_발화감지/
│   │   ├── 06_CUSUM_분진폭발예측/
│   │   ├── 07_Multi_Gas_Fusion_전해액누출감지/
│   │   ├── 08_Random_Forest_파쇄크기예측/
│   │   ├── 09_PID_Control_RPM최적화/
│   │   └── 10_Ensemble_통합분석/
│   ├── docker/                # Docker 배포 가이드 및 실습
│   ├── ref/                   # 참고자료 (리사이클링 시스템 이미지/시나리오)
│   ├── Edge_AI_슈레더_제안서.md
│   ├── Edge_AI_SmartFactory_통합제안서.md
│   ├── 슈레더_AI시스템_구축_상세계획서.md
│   ├── 슈레더_완전가이드_한국기계중심.md
│   └── 센서_제품_조사_결과.md
│
├── 시계열/                      # 시계열 예측 모델 비교 실습
│   ├── 01_Prophet/            # Facebook Prophet
│   ├── 02_LSTM/               # LSTM 딥러닝
│   ├── 03_TFT/                # Temporal Fusion Transformer
│   ├── 04_XGBoost/            # XGBoost
│   ├── 05_ARIMA/              # ARIMA 통계 모델
│   ├── common_data.py         # 공통 시뮬레이션 데이터 생성
│   ├── run_all.py             # 전체 모델 일괄 실행
│   └── 시계열_모델_개발_완전가이드.md
│
├── 실습/                        # AI 실습 프로젝트
│   ├── 번호판인식/             # 번호판 인식 AI (Jupyter Notebook)
│   ├── 숫자인식/               # 손글씨 숫자 인식 AI (Jupyter Notebook)
│   └── 팔란티어/               # 미니 AIP (Palantir 스타일 의사결정 플랫폼)
│
└── colab/                      # Google Colab 사용 가이드
```

## 주요 내용

### 제안서 (backup/구성, shredder)
- **고장예지 AI 스마트팩토리 계획서** - 설비 고장 예측 시스템
- **품질관리 AI 스마트팩토리 계획서** - AI 기반 품질 관리
- **회수율 향상 설비 개선안** - 리사이클링 회수율 최적화
- **Edge AI 슈레더 제안서** - 엣지 AI 기반 파쇄기 스마트화
- **Edge AI SmartFactory 통합제안서** - 전체 스마트팩토리 통합 아키텍처

### AI 모델 (shredder/ai)
슈레더 공정에 적용할 AI 모델 10종:
| 번호 | 모델 | 기법 |
|------|------|------|
| 01 | 베어링 이상탐지 | LSTM Autoencoder |
| 02 | 칼날 마모 예측 | Gradient Boosting |
| 03 | 축 불균형 진단 | Classical DSP |
| 04 | 이물질 끼임 감지 | Pattern Recognition |
| 05 | 발화 감지 | Anomaly Detection |
| 06 | 분진폭발 예측 | CUSUM |
| 07 | 전해액 누출 감지 | Multi Gas Fusion |
| 08 | 파쇄 크기 예측 | Random Forest |
| 09 | RPM 최적화 | PID Control |
| 10 | 통합 분석 | Ensemble |

### 시계열 예측 모델 비교 (시계열/)
5가지 시계열 모델(Prophet, LSTM, TFT, XGBoost, ARIMA)을 동일 데이터로 비교 분석. 각 모델별 Jupyter Notebook, 시뮬레이션 코드, 결과 설명 포함.

### AI 실습 (실습/)
- **숫자인식** - MNIST 기반 손글씨 숫자 인식 (CNN)
- **번호판인식** - AI Hub 데이터 기반 차량 번호판 인식
- **팔란티어** - 규칙기반 vs AI 판단 비교 미니 AIP 플랫폼

## 기술 스택
- Python, Jupyter Notebook, Google Colab
- TensorFlow/Keras (LSTM, CNN), PyTorch (TFT)
- scikit-learn, XGBoost, Prophet, statsmodels
- Docker (엣지 배포)
