# AI 실무 교육 커리큘럼

> Claude 중심 AI 활용 교육 -- 초보자부터 전문가까지, 4개 Track으로 구성된 체계적 학습 자료

## 폴더 구조

```
aiStudy/
├── README.md
├── 커리큘럼/                      # 전체 교육과정 설계
│   ├── README.md                  # 커리큘럼 총괄 개요
│   ├── Track1_업무활용.md          # 2주 과정
│   ├── Track2_프로그래밍.md        # 4주 과정
│   ├── Track3_시스템구축.md        # 4주 과정
│   ├── Track4_AI전문가.md          # 4주 과정
│   └── 자료/
│       └── Obsidian_활용_가이드.md  # 지식 관리 도구 가이드
├── introductionAi/                # AI 도구 활용 종합 안내서
│   ├── AI_도구_활용_가이드.md
│   └── prompt.txt
├── Level-3-딥러닝핵심/             # 딥러닝 이론 학습 자료
│   ├── 과적합과정규화_초보자가이드.md
│   ├── 역전파알고리즘_초보자가이드.md
│   ├── 학습률_완벽가이드.md
│   └── 활성화함수_완벽가이드.md
├── Level-4-PyTorch실전/            # PyTorch 실습 (MNIST 등)
│   ├── CNN_합성곱신경망_가이드.md
│   ├── 딥러닝_프로젝트_절차_가이드.md
│   ├── mnist_train.py / mnist_cnn_train.py / mnist_predict.py
│   ├── custom_dataset_example.py
│   └── data/MNIST/                # MNIST 데이터셋
├── Level-5-CNN과전이학습/          # CNN 이미지 처리 & 전이학습
│   ├── Level5_개요.md
│   └── 전이학습_완벽가이드.md
└── Level-9-종합프로젝트/           # 번호판 인식 시스템 종합 프로젝트
    ├── Level9_개요.md
    ├── Level9_핵심질문모음.md
    └── RaspberryPi_CoralTPU_가이드.md
```

## Track별 설명

| Track | 기간 | 대상 | 주요 내용 |
|-------|------|------|----------|
| **Track 1: 업무 활용** | 2주 | AI 초보자 | 프롬프트 엔지니어링, 문서 작성 자동화, Claude 활용법 |
| **Track 2: 프로그래밍** | 4주 | Track 1 수료자 | Python 기초, Claude Code로 코딩, 웹앱 + API 서버 구축 |
| **Track 3: 시스템 구축** | 4주 | Track 2 수료자 | Linux, Docker, Nginx, CI/CD, 서버 인프라 구축 |
| **Track 4: AI 전문가** | 4주 | Track 2 수료자 | PyTorch, OpenCV, YOLO, Jetson Nano, 번호판 인식 |

**경로**: Track 1(필수) -> Track 2 -> Track 3 또는 Track 4 선택

## Level별 학습 자료 (Track 4 상세)

- **Level 3**: 딥러닝 핵심 이론 (활성화함수, 역전파, 학습률, 과적합/정규화)
- **Level 4**: PyTorch 실전 (MNIST 분류기 구현, 커스텀 데이터셋, CNN)
- **Level 5**: CNN과 전이학습 (컴퓨터 비전, 이미지 처리, 사전훈련 모델)
- **Level 9**: 종합 프로젝트 (YOLOv8 번호판 검출 + CNN 문자 인식 + FastAPI 배포)

## 주요 도구

- **Claude / Claude Code**: 학습 및 코드 생성 핵심 도구
- **Obsidian**: 학습 노트 관리 ("제2의 뇌")
- **PyTorch**: 딥러닝 프레임워크
- **VS Code**: 개발 환경

## 관련 프로젝트

- `remotion-project/` -- AI 교육 영상 제작 (Remotion 기반)
- `aiHardStudy/` -- AI 하드웨어 학습 (스마트폰 연동 등)
