# 계획 대비 현황 갭 분석 + TODO

> 계획서 내용 vs 실제 서버 구현 상태 비교 및 남은 작업

---

## 1. 갭 분석 매트릭스

### Odroid C2 (현재)

| 항목 | 계획서 | 실제 | 갭 | 우선순위 |
|------|--------|------|---|---------|
| SSH 직접 접속 | O | **O** | - | - |
| 학생 3명 계정 | O | **O** | - | - |
| workspace 격리 | O | **O** | - | - |
| .hushlogin | O | **O** | - | - |
| .claude.json 독립 | O | **O** | - | - |
| credentials symlink | O | **O** (644) | - | - |
| trust 대화상자 건너뛰기 | O | **O** | - | - |
| 권한 프롬프트 건너뛰기 | O | **O** | - | - |
| taskset 코어 고정 (.bashrc alias) | O | **X** | GAP | 높음 |
| credentials 권한 cron | O | **X** | GAP | 높음 |
| cgroups 리소스 제한 | 선택 | **X** | GAP | 중간 |
| systemd 서비스 등록 | O | **X** | GAP | 낮음 |
| 웹 터미널 (ttyd) | O → 폐기 | **X** | 폐기됨 | - |
| 웹 서버 (REST 방식) | 대안 | **O** | 데모용 | 낮음 |
| API Key 전환 | AWS 이전 시 | **X** (OAuth) | 계획대로 | 이전 시 |

### AWS EC2 (스케일업)

| 항목 | 계획서 | 실제 | 갭 |
|------|--------|------|---|
| EC2 인스턴스 생성 | O | **X** | 미착수 |
| setup.sh 실행 | O | **X** | 스크립트 작성 완료 |
| API Key 설정 | O | **X** | Key 미발급 |
| 20명 계정 생성 | O | **X** | setup.sh에 포함 |
| EventBridge 스케줄링 | O | **X** | 미착수 |
| 동시 20명 테스트 | O | **X** | 인스턴스 필요 |

---

## 2. TODO 목록

### 즉시 적용 가능 (Odroid C2)

```
[ ] taskset alias 추가 (.bashrc)
    echo 'alias claude="taskset -c 1 claude"' | sudo tee -a /home/student1/.bashrc
    echo 'alias claude="taskset -c 2 claude"' | sudo tee -a /home/student2/.bashrc
    echo 'alias claude="taskset -c 3 claude"' | sudo tee -a /home/student3/.bashrc

[ ] credentials 권한 cron 등록
    (crontab -l; echo "* * * * * chmod 644 /home/uttec/.claude/.credentials.json") | crontab -

[ ] sysstat 설치 (모니터링)
    sudo apt install -y sysstat
```

### 안정성 향상 (Odroid C2)

```
[ ] swap 확대 (현재 958MB → 2GB)
    sudo fallocate -l 2G /swapfile2
    sudo chmod 600 /swapfile2
    sudo mkswap /swapfile2
    sudo swapon /swapfile2

[ ] cgroups 학생별 메모리 제한 (500MB)
    → 06_코어할당_리소스관리.md 참조

[ ] systemd 서비스 등록 (웹 서버, 선택)
    → 03_웹서버_claude-education.md 참조

[ ] 학생 비밀번호 재설정
    sudo passwd student1
    sudo passwd student2
    sudo passwd student3
```

### AWS 이전 시

```
[ ] Anthropic API Key 발급
[ ] EC2 c7g 인스턴스 타입 결정 (학생 수 기반)
[ ] EC2 인스턴스 시작 (Ubuntu 24.04 ARM64)
[ ] 보안 그룹 설정 (SSH 포트 22)
[ ] setup.sh 실행 (20명_학생_Claude교육_계획서.md 참조)
[ ] API Key → /etc/environment 설정
[ ] 학생 1~20 계정 + workspace + .claude.json 자동 생성
[ ] 3명 → 10명 → 20명 단계적 테스트
[ ] EventBridge 자동 시작/종료 스케줄링
[ ] Spot 인스턴스 비용 절감 검토
```

---

## 3. 파일 정리 TODO

### multiCore/ 폴더 내

| 파일 | 상태 | 조치 |
|------|------|------|
| 시스템구성도.md | RPi4 웹터미널 방식 (폐기됨) | 보존 (참고용) 또는 삭제 |
| 진행계획서.md | RPi4 Phase 1~6 (부분 폐기) | 보존 (참고용) 또는 삭제 |
| 20명_학생_Claude교육_계획서.md | **핵심 문서** (최종 방향) | 유지 |
| AWS_EC2_멀티코어_인스턴스.md | 참고 자료 | 유지 |
| server.js | 로컬 복사본 (서버에도 동일) | 유지 |
| notion_upload.py | **multiCore와 무관** (유투브 업로드) | 이동 권장 |
| prompt.txt | 빈 파일 | **삭제** |

---

## 4. 문서 구조 (현재)

```
multiCore/
├── 01_서버환경_현황.md              ← NEW: 서버 하드웨어/소프트웨어 현황
├── 02_학생계정_구성.md              ← NEW: 학생별 파일 구조 상세
├── 03_웹서버_claude-education.md    ← NEW: 웹 터미널 서버 분석
├── 04_SSH_접속_가이드.md            ← NEW: 학생/교육자 접속 가이드
├── 05_인증_Credentials_관리.md      ← NEW: OAuth vs API Key
├── 06_코어할당_리소스관리.md         ← NEW: taskset/cgroups
├── 07_검증결과_알려진이슈.md         ← NEW: 문제/해결/교훈
├── 08_갭분석_TODO.md               ← NEW: 이 파일
│
├── 20명_학생_Claude교육_계획서.md    ← 기존: 핵심 계획서
├── AWS_EC2_멀티코어_인스턴스.md      ← 기존: 인스턴스 비교
├── 시스템구성도.md                   ← 기존: RPi4 초기안 (참고용)
├── 진행계획서.md                     ← 기존: Phase 1~6 초기안 (참고용)
├── server.js                        ← 기존: Express 서버
├── notion_upload.py                 ← 이동 필요 (multiCore 무관)
└── prompt.txt                       ← 삭제 권장
```

---

## 5. 다음 단계 로드맵

```
Phase A: Odroid C2 안정화 (즉시)
  → taskset alias 적용
  → credentials cron 등록
  → 3명 동시 사용 재테스트

Phase B: 교육 실전 투입
  → 학생 비밀번호 설정
  → 접속 가이드 배포
  → 소규모 수업 (3명) 실전 운영

Phase C: AWS 스케일업 (필요 시)
  → EC2 인스턴스 시작
  → setup.sh 실행
  → API Key 전환
  → 20명 테스트
  → EventBridge 스케줄링

Phase D: 교육 확대
  → 20명 수업 운영
  → 비용 모니터링
  → 문제 수집 및 개선
```
