# AI 및 업무 도구 활용 가이드
> Track 1~4 교육에서 활용하는 도구 전체 정리
> 실제 UTTEC 업무에서 검증된 도구 중심

---

## 1. AI/LLM 도구

### 핵심 도구 (필수)

| 도구 | 용도 | 무료/유료 | 교육 Track |
|------|------|:---------:|:----------:|
| **Claude** (claude.ai) | 대화형 AI — 문서 작성, 분석, 번역, 브레인스토밍 | 무료 가능, Pro 권장 | Track 1~4 |
| **Claude Code CLI** | 터미널에서 파일 생성/수정, 코드 작성, 프로젝트 관리 | Claude Pro 필요 | Track 1~4 |

### Track 1 필수/권장 도구

| 도구 | 용도 | 무료/유료 | 비고 |
|------|------|:---------:|------|
| **Claude 멀티모달** | 이미지 업로드 → 분석 (사진, 스크린샷, 문서) | Claude 포함 | 사진 찍어서 질문하기 |
| **Claude Design** | 텍스트 → 디자인/이미지 생성 | Claude Pro 포함 | 발표자료, 포스터 시각화 |
| **Obsidian** | 마크다운 지식 관리 (Second Brain) | 무료 | 개인 PC에서 문서 관리 |
| **Notion** | 외부/스마트폰 연동, 팀 공유, DB | 무료 가능 | 어디서든 접근, 협업 |
| **Google NotebookLM** | 문서 업로드 → AI 분석 → 팟캐스트/요약 | 무료 | 사용 범위 추후 결정 |
| **edge-tts** | 텍스트 → 음성 변환 (한/영 TTS) | 무료 | Claude Code에서 실행 |
| **Perplexity** | AI 검색, 리서치, 팩트체크 | 무료 가능 | AI 결과 검증용 |

### 보조 AI 도구 (Track 2~4)

| 도구 | 용도 | 비고 | 교육 Track |
|------|------|------|:----------:|
| **GPT-4o-mini** | 보조 LLM (비용 대비 성능) | API 유료 | Track 2~4 |
| **Gemini 2.0 Flash** | Google AI (멀티모달) | 무료 가능 | Track 2 (선택) |
| **Groq** | 초고속 LLM 추론 | 무료 가능 | Track 2 (선택) |
| **Midjourney / DALL-E** | AI 이미지 생성 (마케팅용) | 유료 | 선택 |

### AI 활용 예시 (Track 1 카테고리별)

| 도구 | A 초등학생 | B 직장인 | C 개발자 | D 교사 |
|------|----------|---------|---------|-------|
| Claude | 동화 쓰기, 궁금증 질문 | 보고서, 이메일, 회의록 | 코드 리뷰, 기술 문서 | 교안, 평가, 가정통신문 |
| Claude Code | 파일 만들기 | 폴더 정리, 문서 생성 | README, 프로젝트 관리 | 교안 폴더, 시험지 |
| NotebookLM | — | 보고서 분석 | 기술 문서 분석 | 교과서 분석 |
| Claude Design | 포스터 만들기 | 발표자료 디자인 | UI 프로토타입 | 학습 자료 디자인 |

---

## 2. 문서 작성 도구

| 도구 | 용도 | 특징 | 교육 Track |
|------|------|------|:----------:|
| **Markdown** | 문서 작성의 기본 포맷 | Claude Code 기본 출력 형태, 가장 많이 사용 | Track 1~4 |
| **Obsidian** | 마크다운 지식 관리 (Second Brain) | 링크로 문서 연결, 그래프 뷰 | Track 1 (Day 8~) |
| **Notion** | 업무 관리 + 문서 협업 | 팀 공유, 데이터베이스, AI 내장 | Track 1 |
| **HTML** | 프레젠테이션/보고서 제작 | Claude Code가 직접 생성 | Track 1 (Day 7) |
| **Google Docs/Sheets** | 공동 편집, 스프레드시트 | 팀 협업, Claude가 수식 생성 | Track 1 |
| **Mermaid** | 다이어그램 자동 생성 (마크다운 내) | 플로우차트, 시퀀스, 간트차트 | Track 1~3 |

### 문서 → 최종 산출물 변환

| 입력 | 출력 | 도구 | 방법 |
|------|------|------|------|
| Markdown | PDF | Obsidian / pandoc | Obsidian 내보내기 또는 pandoc 명령 |
| HTML | PDF | puppeteer | Claude Code에서 Node.js 스크립트 실행 |
| Markdown | HTML 슬라이드 | Claude Code | 프레젠테이션형 HTML 직접 생성 |
| 데이터 | 차트 이미지 | matplotlib / Claude Code | Python 코드 자동 생성 |

---

## 3. 영상/미디어 도구

| 도구 | 용도 | 교육 Track |
|------|------|:----------:|
| **Remotion** | React 기반 프로그래매틱 영상 제작 (교육 비디오 30편+) | Track 2~3 |
| **edge-tts** | 텍스트 → 음성 변환 (한/영 TTS, 무료) | Track 2 |
| **FFmpeg** | 영상 압축/변환/편집 | Track 2~3 |
| **YouTube** | 콘텐츠 배포 + 분석 | Track 1 (참고) |

### 영상 제작 파이프라인 (실제 사용 중)
```
원고 작성 (Claude) → TTS 음성 (edge-tts) → 영상 생성 (Remotion) → 압축 (FFmpeg) → 업로드 (YouTube)
```

---

## 4. 코드/개발 도구

| 도구 | 용도 | 교육 Track |
|------|------|:----------:|
| **Claude Code CLI** | 핵심 개발 도구 — 코드 생성, 수정, 실행, 디버깅 | Track 1~4 |
| **VS Code** | 코드 에디터 + Claude Code 확장 | Track 2~4 |
| **Git / GitHub** | 버전 관리 + 협업 + CI/CD | Track 2~4 |
| **Python 3.12+** | 주력 프로그래밍 언어 | Track 2~4 |
| **Node.js** | JavaScript 런타임 (Remotion, Next.js) | Track 2~3 |
| **Flutter / Dart** | 스마트폰 앱 개발 | Track 2 (Day 15) |
| **Google Colab** | 클라우드 GPU 실습 (PyTorch, YOLO) | Track 4 |

---

## 5. 서버/인프라 도구

| 도구 | 용도 | 교육 Track |
|------|------|:----------:|
| **DigitalOcean** | 주 클라우드 서버 ($4~6/월) | Track 3 |
| **Nginx** | 리버스 프록시 + HTTPS | Track 3 |
| **Let's Encrypt** | 무료 SSL 인증서 (certbot) | Track 3 |
| **DuckDNS** | 무료 동적 DNS | Track 3 |
| **Docker** | 컨테이너화 + 배포 | Track 3 |
| **PM2** | Node.js/Python 프로세스 관리 | Track 3 |
| **systemd** | Linux 서비스 등록 | Track 3 |
| **SSH / Tailscale** | 원격 접속 + VPN | Track 3 |
| **AWS EC2** | 보조 클라우드 서버 | Track 3 (선택) |

### 실제 운영 서버 구성 (교재용 참고)
```
                     ┌─ :8092 FastAPI 빌드 서버 (uttec-arduino)
인터넷 → Nginx(443) ─┤
  HTTPS              ├─ :8094 Web UI 서버 (uttec-webui)
  DuckDNS            │
  Let's Encrypt      └─ :3002 AI 교육 웹 (Next.js)
```

---

## 6. AI/ML 전문 도구

| 도구 | 용도 | 교육 Track |
|------|------|:----------:|
| **PyTorch** | 딥러닝 프레임워크 | Track 4 |
| **OpenCV** | 컴퓨터 비전, 이미지 처리 | Track 4 |
| **YOLOv8 (Ultralytics)** | 객체 검출 (번호판 등) | Track 4 |
| **EasyOCR** | 문자 인식 (한국어, 90% 정확도) | Track 4 |
| **CUDA** | GPU 가속 연산 | Track 4 |
| **ONNX / TensorRT** | 모델 최적화 + Edge 배포 | Track 4 |
| **MobileNetV3** | 경량 분류 모델 (품질 검사) | Track 4 |
| **Roboflow** | 데이터 라벨링 (무료) | Track 4 |
| **matplotlib / pandas** | 데이터 시각화 + 분석 | Track 2, 4 |

---

## 7. 하드웨어/IoT 도구

| 도구 | 용도 | 교육 Track |
|------|------|:----------:|
| **UTTEC 보드 (ESP32)** | 사전빌드 교육 (155개 예제) | 초등학교 강의 |
| **Raspberry Pi 4/5** | 교육 서버, IoT 게이트웨이 | Track 3 (Day 17) |
| **Jetson Nano** | Edge AI 추론 | Track 4 (Day 17) |
| **Arduino-CLI** | 펌웨어 빌드 자동화 | Track 3 (참고) |

---

## 8. 협업/서비스 도구

| 도구 | 용도 | 교육 Track |
|------|------|:----------:|
| **GitHub** | 코드 저장소 + PR + Issues + Actions | Track 2~4 |
| **Notion** | 업무 관리, 할일, 프로젝트 추적 | Track 1 |
| **Google Calendar** | 일정 관리 (MCP 연동) | Track 1 |
| **위시캣 (Wishket)** | 프리랜서 프로젝트 수주 | 참고 (실전 사례) |

---

## Track별 필수 도구 요약

| 도구 | Track 1 | Track 2 | Track 3 | Track 4 |
|------|:-------:|:-------:|:-------:|:-------:|
| Claude (claude.ai) | ★ | ★ | ★ | ★ |
| Claude Code CLI | ★ | ★ | ★ | ★ |
| Markdown | ★ | ★ | ★ | ★ |
| Obsidian | ○ | ○ | — | — |
| NotebookLM | ○ | — | — | — |
| Python | — | ★ | ★ | ★ |
| VS Code | ○ | ★ | ★ | ★ |
| Git / GitHub | — | ★ | ★ | ★ |
| Docker | — | — | ★ | — |
| Nginx + HTTPS | — | — | ★ | — |
| DigitalOcean | — | — | ★ | — |
| PyTorch | — | — | — | ★ |
| OpenCV + YOLO | — | — | — | ★ |
| Google Colab | — | ○ | — | ★ |

★ = 필수, ○ = 권장, — = 해당 없음

---

*작성일: 2026-04-25*
*기준: UTTEC 실제 운영 환경에서 검증된 도구*
