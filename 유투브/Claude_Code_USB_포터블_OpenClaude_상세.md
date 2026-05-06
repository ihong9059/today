# Run Claude Code From a USB Drive | Free And Portable (No GPU) — 상세 분석

## 영상 정보
- **제목**: Run Claude Code From a USB Drive | Free And Portable (No GPU)🤯
- **채널**: Tech Jarves
- **재생시간**: 8분 11초
- **업로드**: 2026-05-02
- **링크**: https://www.youtube.com/watch?v=9Dh3kKWFFjg
- **GitHub**: https://github.com/techjarves/OpenClaude-Portable
- **자막**: 영어 (한국어 자동자막 없음, 영어 자동자막 사용)

## 한 줄 요약
USB 드라이브 한 개에 Claude Code의 오픈소스 클론(OpenClaude Portable)을 통째로 담아 **Windows·Mac·Linux 어디든 꽂으면 즉시 실행** + **NVIDIA NIM/OpenRouter 무료 API + Ollama 로컬 모델** 옵션 제공 + **모든 채팅·파일이 USB에 저장**되어 PC에 흔적 0.

---

## 구간별 상세 내용

### 1. 인트로 — USB 드라이브에서 AI 코딩 에이전트 (00:00-00:30)
[바로가기](https://www.youtube.com/watch?v=9Dh3kKWFFjg&t=0s)

#### 핵심 메시지
"Look at this. This is just a normal pen drive. I plug it into my computer and instantly I have a full Claude Code AI agent running on my computer."

#### 상세 내용
- **제로 설치 / 제로 구독 / 제로 GPU** — 꽂으면 바로 동작
- **OpenClaude** = Claude Code(2026년 초 화제 도구)의 오픈소스 버전
- 데모: Windows에서 `start.bat`, Mac/Linux에서 `start.sh` 한 번만 실행하면 끝
- "Same setup, same experience no matter which system you use"

#### 주요 발언
> "There is no installation, no subscription and no complicated setup. You just plug it in and it works." (00:09-00:17)

> "All your chats and files are already there no matter which system you use **because nothing is saved to the computer. Everything lives inside this pen drive**." (00:53-01:02)

---

### 2. 멀티 플랫폼 + 멀티 AI 프로바이더 (00:30-01:45)
[바로가기](https://www.youtube.com/watch?v=9Dh3kKWFFjg&t=30s)

#### 핵심 메시지
"You can run it with **Google Gemini, NVIDIA, OpenAI or OpenRouter**, which gives you access to hundreds of models, **many of them completely free**. And if you do not want to use the internet at all, you can run it completely offline using a local model."

#### 상세 내용
- **지원 AI 프로바이더**: Google Gemini, NVIDIA NIM, OpenAI, OpenRouter (수백 모델 접근, 다수 무료)
- **로컬 모드**: 오프라인 100% 가능 (Ollama 사용)
- **차별점 vs Claude Code**: Claude Code는 터미널 기반, OpenClaude는 **웹 대시보드 (브라우저 채팅 UI)** 제공
- 1인 사용자가 여러 PC를 옮겨다닐 때 채팅 히스토리·파일이 USB에 그대로 따라옴

#### 주요 발언
> "Unlike Claude Code, which is mostly terminal based, this setup also gives you a full web dashboard, a clean chat interface right inside your browser." (01:26-01:33)

---

### 3. USB 포맷 + GitHub 저장소 다운로드 (01:45-02:50)
[바로가기](https://www.youtube.com/watch?v=9Dh3kKWFFjg&t=105s)

#### 핵심 메시지
USB를 exFAT로 포맷(크로스 플랫폼 호환) → GitHub `OpenClaude-Portable` repo zip 다운로드 → USB에 압축 해제.

#### 상세 내용
1. **USB 포맷**: exFAT (Windows/Mac/Linux 모두 읽기·쓰기 가능). 한 OS만 쓰면 생략 가능
2. **USB 미사용**: SSD/HDD의 임의 폴더에서도 동일하게 동작 (포터블 자체가 폴더 단위)
3. **GitHub repo**: `github.com/techjarves/OpenClaude-Portable`
4. **다운로드**: Code 버튼 → zip 다운로드 → USB로 이동 → 압축 해제 → zip 삭제
5. 폴더에 `start.bat` (Windows), `start.sh` (Mac/Linux) 두 시작 파일이 보임

#### 주요 발언
> "It is fully open source, so you can review everything yourself if you want." (02:30-02:34)

#### 시사점 (UTTEC)
- **공급망 보안 인식 유도**: 학습자에게 "코드를 직접 검토할 수 있다"는 오픈소스 가치 시연 가능
- **강사양성 파일럿** Day 4 옵시디언 워크숍에 USB 휴대형 PKM 데모로 응용 가능

---

### 4. Windows 첫 설치 — 포터블 NodeJS + AI 엔진 자동 다운로드 (02:50-04:05)
[바로가기](https://www.youtube.com/watch?v=9Dh3kKWFFjg&t=170s)

#### 핵심 메시지
`start.bat` 실행 → **포터블 NodeJS 자동 다운로드 + AI 엔진 셋업** → AI 프로바이더 선택 (NVIDIA NIM 시연) → API 키 입력 → 모델 선택.

#### 상세 내용
1. `start.bat` 더블클릭 → 첫 실행 시에만 NodeJS + AI 엔진 다운로드 (몇 분 소요)
2. **AI 프로바이더 선택**: 무료 옵션 = OpenRouter 또는 NVIDIA NIM
3. **NVIDIA NIM 가입**: build.nvidia.com 에서 무료 계정 + API 키 생성 → 붙여넣기
4. **모델 선택 권장**: **Qwen Coder 모델** ("Quenoda models since they work really well for coding tasks")
5. 셋업 끝. `1`을 누르면 코딩 에이전트가 USB 안에서 실행됨

#### 시사점 (UTTEC)
- **NVIDIA NIM 무료 API 키** = AI FanStick·강사양성 파일럿 실습 배포의 무료 백엔드 후보
- Qwen 코더는 한국어 코딩 작업에서도 검증된 모델 → uttec-edu Track F 14가이드 보강
- "포터블 NodeJS 자동 셋업" 패턴 = UTTEC가 고객 PC에 설치 흔적 0인 데모 환경 제공할 때 재사용 가능 (Stage 0 영업 카피 강화 가능)

---

### 5. 4가지 동작 모드 + 웹 대시보드 (04:05-05:00)
[바로가기](https://www.youtube.com/watch?v=9Dh3kKWFFjg&t=245s)

#### 핵심 메시지
시작 시 4가지 모드 제공: ①Normal(허락 모드) ②Auto-execute(자율 모드) ③Dashboard(브라우저 채팅 UI) ④Reset config.

#### 상세 내용
| 옵션 | 모드 | 설명 |
|------|------|------|
| 1 | Normal | AI가 작업 전 사용자 확인 (Claude Code 기본 모드 동일) |
| 2 | Auto-execute | AI 단독 실행, 무인 자동화 |
| 3 | Dashboard | 브라우저에서 ChatGPT/Claude.ai 같은 채팅 UI 자동 오픈 |
| 4 | Reset config | AI 프로바이더 변경 (NVIDIA → OpenRouter 등) |
| 5 | Local model | Ollama 로컬 모델 다운로드 + 실행 (오프라인) |

- **데모 1 (Normal)**: "Create a simple hello world file" → USB 안에 파일 생성됨
- **데모 2 (Dashboard)**: 옵션 3 → 브라우저에 웹 채팅 UI 오픈, 모든 대화는 USB에 저장
- 종료: Ctrl+C
- 재실행: `start.bat`만 누르면 셋업 건너뛰고 즉시 실행

#### 주요 발언
> "Option three is the dashboard and this is really interesting. Just press three and it will open the dashboard directly in your browser. It automatically detects your AI provider and you can start chatting just like you do in ChatGPT or Claude." (04:36-04:50)

> "All your conversations are saved on the drive so you can access them on Windows, Mac or Linux anytime." (04:50-04:56)

#### 시사점 (UTTEC)
- **Auto-execute 모드** = n8n 자동화와 결합 가능 ("USB를 꽂고 한 번 실행 = 야간 코드 분석 배치")
- **Dashboard 모드** = Claude Code를 "터미널 거부감"으로 미사용하는 비개발자 학습자(강사양성 파일럿 수강생)에게 직접 노출 가능 → Track A·B 콘텐츠 보강

---

### 6. Linux 동일 동작 + 프로바이더 변경 + 시스템 전체 접근 (05:00-06:10)
[바로가기](https://www.youtube.com/watch?v=9Dh3kKWFFjg&t=300s)

#### 핵심 메시지
같은 USB를 Linux 머신에 꽂으면 **NodeJS만 Linux용으로 1회 추가 다운로드** → 즉시 동작. 프로바이더 변경(옵션 4)으로 OpenRouter + GPT-OSS 모델로 즉시 전환 시연.

#### 상세 내용
- Linux: 터미널 열고 `bash start.sh` 실행 → NodeJS Linux 빌드만 다운로드 → 끝
- "Nothing else is installed, which means the portability is working perfectly."
- **프로바이더 변경**: 옵션 4 → OpenRouter API 키 입력 → 모델 목록 fetch → **GPT-OSS 선택**
- 전환 후 즉시 동작 확인
- **시스템 전체 접근**: "I asked it to summarize all the drives on this PC and it returned the full details" — 즉, 셋업 폴더 안에 갇혀있지 않고 호스트 시스템 전체 탐색 가능

#### 시사점 (UTTEC)
- **GPT-OSS** (OpenAI가 공개한 오픈웨이트 모델) on OpenRouter = 무료/저비용 코딩 모델 후보
- 영상에서 직접 시연된 사실: Claude Code 클론이지만 **모델은 자유롭게 갈아끼울 수 있음** → 사용자(홍광선)의 어제(2026-05-05) 작성한 "Foundry 5층 무료 재현 모델" 영업 카피 보강 (Stage 0 견적서 데이터 소유권 섹션과 직결)
- ⚠️ **보안 주의**: 호스트 전체 접근 가능 → 학습자 PC에서 함부로 Auto-execute 모드 권장 금지

---

### 7. Mac + Ollama 로컬 모델 (오프라인) 시연 (06:10-07:30)
[바로가기](https://www.youtube.com/watch?v=9Dh3kKWFFjg&t=370s)

#### 핵심 메시지
Mac에서 옵션 5 → **Gemma 3 모델 다운로드 + Ollama 엔진(Mac용) 자동 셋업** → 인터넷 0% 오프라인 모드. **모델은 USB에 저장되어 다른 OS에서 재다운로드 불필요**.

#### 상세 내용
1. Mac: 터미널 → `bash start.sh` → 첫 실행 시 NodeJS Mac 빌드 다운로드
2. NVIDIA 프로바이더가 자동 감지됨 (이전 Linux 셋업 그대로 USB에서 인식)
3. **로컬 모드 진입**: `start.sh` 재실행 → 옵션 5 (Local setup)
4. 모델 선택: **Gemma 3 4B** (시스템 사양 따라 선택)
5. **Ollama 엔진(Mac용) + 모델 자동 다운로드**
6. 재시작 → 자동으로 로컬 모델 감지 → Auto-execute 모드 동작 시연
7. **크로스 플랫폼 트릭**: 같은 USB를 Windows에 꽂으면 모델은 재다운로드 안 함, Windows용 Ollama 엔진만 1회 다운로드 → 동일하게 작동

#### 주요 발언
> "If I plug this same USB into a Windows system and try to use the local model, it will not download the model again. It will only download the setup for Windows one time and then everything just works. And the same thing applies to Linux as well." (07:31-07:44)

#### 시사점 (UTTEC)
- ⭐ **Track F (On-Device AI) 14가이드 직접 보강 자료**: Ollama + Gemma 3 4B 휴대형 셋업 = 강사양성 파일럿 Day 4·5 실습 콘텐츠
- ⭐ **AI FanStick 차별화 카피**: "USB 한 개로 인터넷 0%, 폐쇄 공장에서도 LLM 코딩 가능" → 한국기계·태명과학 같은 보안·폐쇄 환경 고객에게 **Stage 0 견적서 추가 옵션** 후보
- **모델 USB 저장 + 엔진만 OS별 1회 셋업** = 한 모델을 여러 학생 PC에 배포할 때 데이터 트래픽 절감 (강사양성 파일럿 Wi-Fi 부담 ↓)
- ⭐ ⭐ **데이터 영구 소유권 카피와 직결** (어제 #28 구요한 티타임즈TV 영상 발견과 동일 메시지): "회사 망해도 OK + USB 휴대형 = 진정한 데이터 자주권"

---

### 8. 마무리 + 한 줄 결론 (07:30-08:11)
[바로가기](https://www.youtube.com/watch?v=9Dh3kKWFFjg&t=450s)

> "A fully portable AI coding setup that runs from a simple USB drive, works across Windows, Linux, and Mac, supports multiple AI providers, and even runs completely offline if you want."

---

## 전체 사례 모음

| 사례명 | 구간 | 핵심 내용 | 시사점 |
|--------|------|-----------|--------|
| Hello World 파일 생성 | 04:04-04:10 | Normal 모드에서 "create a hello world file" → USB에 직접 생성 | Claude Code의 코드 생성 능력이 OpenClaude에서 동일 동작 검증됨 |
| 웹 대시보드 자동 오픈 | 04:36-04:50 | 옵션 3 → 브라우저에 ChatGPT 같은 채팅 UI 즉시 오픈 | 비개발자 사용자에게 노출 가능 → 강사양성 Track A·B 보강 |
| 호스트 시스템 전체 접근 | 06:00-06:07 | "summarize all drives on this PC" → 전체 디스크 정보 반환 | 보안 주의: Auto-execute 모드는 학습자 PC에서 위험 |
| OpenRouter + GPT-OSS 전환 | 05:31-05:55 | 옵션 4 → 프로바이더 리셋 → 모델 fetch → GPT-OSS 선택 | 모델 자유 교체 = "벤더 락인 0%" 영업 카피 |
| Mac에서 Gemma 3 로컬 실행 | 06:50-07:25 | Ollama 엔진 + Gemma 3 4B 자동 셋업 → Auto-execute 모드 | Track F 직접 보강, AI FanStick 차별화 |
| 크로스 플랫폼 모델 재사용 | 07:31-07:44 | Mac에서 받은 Gemma 3 → 같은 USB를 Windows에 꽂으면 엔진만 1회 추가 | 강사양성 파일럿 다중 학생 배포 트래픽 절감 |

---

## 전체 인용구 모음

### 휴대성 + 데이터 소유권
> "There is no installation, no subscription and no complicated setup. You just plug it in and it works." (00:09-00:17)

> "All your chats and files are already there no matter which system you use because nothing is saved to the computer. Everything lives inside this pen drive." (00:53-01:02)

### AI 프로바이더 자유
> "You can run it with Google Gemini, NVIDIA, OpenAI or OpenRouter, which gives you access to hundreds of models, many of them completely free." (01:06-01:14)

> "And if you do not want to use the internet at all, you can run it completely offline using a local model. Everything stays on your machine using your own hardware." (01:14-01:23)

### Claude Code 대비 차별점
> "Unlike Claude Code, which is mostly terminal based, this setup also gives you a full web dashboard, a clean chat interface right inside your browser." (01:26-01:33)

### 오픈소스 가치
> "It is fully open source, so you can review everything yourself if you want." (02:30-02:34)

### 모델 추천
> "I recommend going with Qwen Coder models since they work really well for coding tasks." (03:38-03:43)

### 크로스 플랫폼 효율
> "If I plug this same USB into a Windows system and try to use the local model, it will not download the model again. It will only download the setup for Windows one time and then everything just works." (07:31-07:42)

### 한 줄 결론
> "A fully portable AI coding setup that runs from a simple USB drive, works across Windows, Linux, and Mac, supports multiple AI providers, and even runs completely offline if you want." (07:45-07:57)

---

## 용어 및 개념 설명

| 용어 | 설명 | 언급 시간 |
|------|------|-----------|
| OpenClaude Portable | Claude Code의 오픈소스 클론, USB 휴대형, github.com/techjarves/OpenClaude-Portable | 00:17 |
| Claude Code | Anthropic 공식 CLI 코딩 에이전트 (사용자가 현재 사용 중) | 00:08 |
| NVIDIA NIM | NVIDIA 무료 API 키 발급 사이트 (build.nvidia.com), Inference Microservice | 03:14 |
| OpenRouter | 수백 개 LLM을 통합 라우팅하는 메타 API, 다수 모델 무료 (openrouter.ai) | 03:19 |
| Qwen Coder | Alibaba가 공개한 오픈소스 코딩 특화 LLM (영상은 "Quenoda"로 음성 오인) | 03:38 |
| GPT-OSS | OpenAI가 공개한 오픈웨이트 모델 | 05:43 |
| Gemma 3 | Google 오픈소스 LLM, 4B 파라미터 사양 | 06:54 |
| Ollama | 로컬 LLM 실행 엔진 (Llama 3, Gemma, Qwen 등 지원) | 06:57 |
| exFAT | Windows/Mac/Linux 모두 읽기·쓰기 호환되는 USB 파일시스템 | 02:03 |
| Auto-execute mode | AI가 사용자 확인 없이 자율 실행하는 모드 | 04:30 |

---

## 관련 자료 및 참고

### 영상에서 직접 언급된 자료
- **GitHub**: https://github.com/techjarves/OpenClaude-Portable
- **NVIDIA NIM API 키**: https://build.nvidia.com/settings/api-keys
- **OpenRouter API 키**: https://openrouter.ai/workspaces/default/keys
- **PlugMate (스폰서, 무관)**: shop.plugos.net/jarvesusaram (USB로 Android 실행, 본 영상 주제와 별개)

### 추가 조사가 필요한 주제
1. **OpenClaude Portable 보안 검토**: 오픈소스라지만 실제 코드 감사 필요 (Auto-execute 모드 + 호스트 전체 접근 = 잠재 위험)
2. **Qwen Coder 한국어 성능**: 한국 임베디드 코드(C/C++ for ESP32)에서 Claude Sonnet 4.6 대비 비교 필요
3. **Gemma 3 4B vs Llama 3.2 3B**: 강사양성 파일럿 Track F 실습 모델 결정용
4. **NVIDIA NIM 무료 한도**: 강사양성 파일럿 4명 × 5일 사용량이 무료 범위 내인지 확인

---

## UTTEC 사업 적용 시사점 (종합)

### 🔴 즉시 활용 가능 (이번 주)
1. **Stage 0 견적서 "데이터 영구 소유권" 섹션 보강**: 어제 #28(구요한 티타임즈TV) 영상에서 도출된 카피와 정확히 일치하는 실증 사례 — "USB 한 개에 코딩 에이전트 + 모델 + 채팅 히스토리 전부 = 회사 망해도 OK"
2. **uttec-edu Track F 14가이드 보강**: Section 4 (Ollama + Llama 3.2 3B)에 OpenClaude Portable 항목 추가 — 한 도구로 멀티 프로바이더 + 로컬 + 휴대 시연 가능

### 🟠 중기 활용 (1~2개월)
3. **강사양성 파일럿 Day 4 워크숍 보강**: 옵시디언 콰르텟 콘텐츠 + OpenClaude USB 데모 = 학생 4명에게 사전 셋업된 USB 배포 → 30분 만에 모두 동작
4. **AI FanStick 보안 차별화 카피 후보**: "외부 인터넷 0%, USB 휴대형, 폐쇄 공장 OK" → 한국기계·태명과학 보안 의식 고객 대응

### 🟡 장기 검토 (1분기)
5. **고객 데모 환경 표준화**: UTTEC가 고객 방문 시 USB 한 개로 자체 데모 + 셋업 흔적 0% → Stage 0 영업 무기
6. **n8n 자동화 결합**: Auto-execute 모드 + n8n 트리거 = 야간 무인 코드 분석 (단, 보안 검토 후)

### ⚠️ 주의사항
- Auto-execute 모드 + 호스트 전체 접근 = **학습자 PC에서 함부로 권장 금지**
- 오픈소스이지만 실제 코드 감사 미실시 — 영업 카피로 활용 전 본인이 한 번 검토 필요
- 영상은 8분으로 짧고 "셋업 가이드"에 집중 — 실 사용 한계·버그·성능 데이터는 미공개

---

## 메모

본 영상은 **2026-05-02 업로드** 최신 콘텐츠로, 사용자(홍광선)의 어제 작업 흐름과 시너지가 명확함:
- 어제 #28 구요한 티타임즈TV → "회사 망해도 OK" 데이터 소유권 → Stage 0 영업 카피 후보
- 오늘 본 영상 → "USB에 모든 것" 휴대형 = 같은 카피를 **실제 도구로 즉시 시연 가능**한 사례
- 어제 #31 Track F 신설 → Ollama + Gemma 활용 가이드 → 본 영상이 직접 시연 자료

**연결 위치 권장**:
- `aiStudy/introductionAi/14_On-Device_AI.md` Section 4 보강
- `영업/quotes-test/Stage 0 견적서.md` 데이터 영구 소유권 섹션 신설 시 본 영상 시연 사례 인용
- `myWiki/second-brain/entities/aiOnDevice.md` (있다면) ingest

---

*상세 분석 생성일: 2026-05-06*
