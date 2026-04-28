# 20명 학생 Claude 교육 서버 계획서

> Odroid C2 실환경 검증 완료 (2026-04-26)

## 1. 핵심 컨셉

```
학생 1명 = 전용 코어 1개 + 전용 workspace + 전용 Claude Code 인스턴스
```

각 학생이 SSH로 접속하면, 자신의 전용 코어에서 자신만의 workspace에서 Claude Code를 완전한 대화형으로 사용한다.

---

## 2. Odroid C2 검증 결과

### 검증 환경
- Odroid C2 (4코어 ARM Cortex-A53, 2GB RAM, Armbian 26.2.1)
- 학생 3명 동시 사용 테스트

### 검증된 구성

| 항목 | 결과 |
|------|------|
| SSH 직접 접속 → claude 실행 | **동작 확인** |
| 학생별 전용 코어 (taskset) | **동작 확인** |
| 학생별 독립 workspace | **동작 확인** |
| credentials symlink 공유 | **동작 확인** (권한 644 필수) |
| `.claude.json` 독립 복사 | **필수** (symlink 시 충돌 발생) |

### 검증 중 발견한 문제와 해결

| 문제 | 원인 | 해결 |
|------|------|------|
| ttyd 웹 터미널에서 입력 불가 | Claude Code TUI(Ink/React)가 ttyd와 비호환 | **SSH 직접 접속으로 전환** |
| OAuth 동시 사용 시 401 에러 | 토큰 갱신 시 다른 세션 무효화 | **API Key 사용** (AWS 적용 시) |
| credentials 파일 권한 초기화 | Claude가 토큰 갱신 시 600으로 재생성 | **cron으로 1분마다 644 유지** |
| `.claude.json` symlink 충돌 | 여러 학생이 동시에 같은 파일에 쓰기 | **학생별 독립 파일로 복사** |
| trust 대화상자 | 첫 실행 시 workspace 신뢰 확인 | **`.claude.json`에 미리 trust 설정** |
| .bashrc에서 claude 자동실행 | MOTD 배너와 TUI 렌더링 충돌 | **수동 실행으로 변경** |
| Armbian MOTD 배너 | SSH 접속 시 긴 배너가 출력됨 | **`.hushlogin` 파일로 제거** |

---

## 3. 인스턴스 선택

### 추천: c7g.8xlarge (32 vCPU, 64GB RAM)

```
Core 0     : 시스템
Core 1~20  : 학생 1~20 전용 (1인 1코어)
Core 21~31 : 여유
```

| 항목 | c7g.8xlarge (추천) |
|------|-------------------|
| vCPU | 32 |
| RAM | 64GB |
| 학생 수 | 최대 30명 |
| On-Demand 가격/h (서울) | ~$1.38 |
| 월비용 (8h×20일) | $221 |
| Spot 가격/h | ~$0.42 |
| Spot 월비용 | $67 |

---

## 4. 전체 아키텍처

```
┌─────────────────────────────────────────────────────────┐
│  학생 PC (SSH 클라이언트)                                  │
│                                                         │
│  ssh student1@서버IP → Core 1  + ~/workspace + claude    │
│  ssh student2@서버IP → Core 2  + ~/workspace + claude    │
│  ...                                                    │
│  ssh student20@서버IP → Core 20 + ~/workspace + claude   │
└──────────────────────────┬──────────────────────────────┘
                           │
┌──────────────────────────▼──────────────────────────────┐
│              AWS EC2 c7g.8xlarge                         │
│              (32 vCPU, 64GB RAM)                         │
│                                                         │
│  ┌───────────────────────────────────────────────────┐  │
│  │  Core 0: 시스템                                    │  │
│  └───────────────────────────────────────────────────┘  │
│                                                         │
│  ┌────────┐ ┌────────┐ ┌────────┐       ┌────────┐     │
│  │ Core 1 │ │ Core 2 │ │ Core 3 │  ...  │Core 20 │     │
│  │        │ │        │ │        │       │        │     │
│  │student1│ │student2│ │student3│       │student20│    │
│  │ ~/work │ │ ~/work │ │ ~/work │       │ ~/work │     │
│  │ space  │ │ space  │ │ space  │       │ space  │     │
│  │        │ │        │ │        │       │        │     │
│  │claude  │ │claude  │ │claude  │       │claude  │     │
│  └───┬────┘ └───┬────┘ └───┬────┘       └───┬────┘     │
│      └──────────┴──────────┴─────────────────┘          │
│                         │                               │
│              Anthropic Claude API                        │
│              (ANTHROPIC_API_KEY)                         │
└─────────────────────────────────────────────────────────┘
```

---

## 5. 인증: API Key

OAuth가 아닌 **API Key**를 사용한다. Odroid C2에서 OAuth 동시 세션 문제를 경험했으므로.

```bash
# /etc/environment에 설정 (모든 학생 공유)
ANTHROPIC_API_KEY=sk-ant-api03-xxxxx
```

| 항목 | OAuth (Odroid 경험) | API Key (AWS 적용) |
|------|--------------------|--------------------|
| 동시 사용 | 1명만 | **무제한** |
| 토큰 갱신 문제 | 있음 | **없음** |
| 파일 권한 문제 | 있음 | **없음** |
| symlink 필요 | 필요 | **불필요** |
| 비용 | 월 $100 고정 | 사용량 과금 |

---

## 6. 파일 구조 (학생별)

```
/home/studentN/
├── .bashrc              # 비어있음 (claude 수동 실행)
├── .hushlogin           # MOTD 배너 제거
├── .claude.json         # 독립 파일 (symlink 아님!)
├── .claude/
│   └── .credentials.json  # 불필요 (API Key 사용)
└── workspace/           # 학생 전용 작업 디렉토리
    └── (학생이 만든 파일들)
```

### 핵심 원칙 (검증 결과)
- `.claude.json` → **반드시 학생별 독립 파일** (symlink 금지)
- `.hushlogin` → **필수** (MOTD 배너가 Claude TUI와 충돌)
- `.bashrc` → **claude 자동 실행 금지** (학생이 수동 입력)

---

## 7. 원클릭 설치 스크립트

### setup.sh

```bash
#!/bin/bash
#============================================
# UTTEC Claude Education Server Setup
# AWS EC2 c7g.8xlarge (32 vCPU, 64GB RAM)
# 검증: Odroid C2 (2026-04-26)
#============================================

STUDENT_COUNT=20
API_KEY="${1:?Usage: ./setup.sh <ANTHROPIC_API_KEY>}"

echo "=== 1. 시스템 업데이트 ==="
apt update && apt upgrade -y

echo "=== 2. Node.js + Claude Code 설치 ==="
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs
npm install -g @anthropic-ai/claude-code

echo "=== 3. API Key 설정 ==="
grep -q ANTHROPIC_API_KEY /etc/environment || \
  echo "ANTHROPIC_API_KEY=$API_KEY" >> /etc/environment
export ANTHROPIC_API_KEY=$API_KEY

echo "=== 4. 학생 계정 생성 ==="
for i in $(seq 1 $STUDENT_COUNT); do
    # 사용자 생성
    useradd -m -s /bin/bash student$i 2>/dev/null
    echo "student$i:student$i" | chpasswd

    # workspace 생성
    mkdir -p /home/student$i/workspace
    chown -R student$i:student$i /home/student$i/workspace

    # .bashrc 비우기 (검증 결과: claude 자동실행 금지)
    echo "# UTTEC Claude Education - Student $i" > /home/student$i/.bashrc
    echo "alias claude='taskset -c $i claude'" >> /home/student$i/.bashrc
    chown student$i:student$i /home/student$i/.bashrc

    # .hushlogin (검증 결과: MOTD 배너 제거 필수)
    touch /home/student$i/.hushlogin
    chown student$i:student$i /home/student$i/.hushlogin

    # .claude.json 생성 (검증 결과: 독립 파일 필수, symlink 금지)
    cat > /home/student$i/.claude.json << CJEOF
{
  "hasCompletedOnboarding": true,
  "numStartups": 1,
  "migrationVersion": 11,
  "opusProMigrationComplete": true,
  "sonnet1m45MigrationComplete": true,
  "projects": {
    "/home/student$i/workspace": {
      "allowedTools": [],
      "hasTrustDialogAccepted": true,
      "projectOnboardingSeenCount": 1
    }
  }
}
CJEOF
    chown student$i:student$i /home/student$i/.claude.json

    echo "student$i created (Core $i)"
done

echo "=== 5. SSH 비밀번호 로그인 확인 ==="
grep -q "^PasswordAuthentication yes" /etc/ssh/sshd_config || \
  echo "PasswordAuthentication yes" >> /etc/ssh/sshd_config
systemctl restart sshd

echo ""
echo "============================================"
echo "  설치 완료!"
echo "============================================"
echo ""
echo "  학생 접속 방법:"
echo "    ssh student1@$(hostname -I | awk '{print $1}')"
echo "    비밀번호: student1"
echo ""
echo "  접속 후:"
echo "    claude 입력 → Enter → Claude Code 시작"
echo ""
echo "  학생 계정: student1 ~ student$STUDENT_COUNT"
echo "  비밀번호: 계정명과 동일"
echo "  코어 할당: student1=Core1, student2=Core2, ..."
echo "============================================"
```

### 실행

```bash
# EC2 접속 후
chmod +x setup.sh
sudo ./setup.sh sk-ant-api03-xxxxx본인키
```

---

## 8. 학생 접속 흐름

```
학생 PC에서:
$ ssh student5@서버IP
비밀번호: student5

student5@server:~$ claude       ← 수동 입력 (alias로 Core 5에 자동 고정)

╭──────────────────────────────────────╮
│  Claude Code v2.x.x                  │
│  Welcome!                            │
│  /home/student5/workspace            │
╰──────────────────────────────────────╯

> 이 서버의 사양을 알려주세요.         ← 바로 질문 가능
⎿ 이 서버는 AWS EC2 c7g.8xlarge...
```

---

## 9. 비용 총정리

| 항목 | On-Demand | Spot |
|------|-----------|------|
| EC2 c7g.8xlarge (8h×20일) | $221/월 | $67/월 |
| EBS 50GB gp3 | $5/월 | $5/월 |
| Claude API (20명, 보통 사용) | $80~150/월 | $80~150/월 |
| **총합** | **$306~376/월** | **$152~222/월** |
| **학생당** | **$15~19/월** | **$8~11/월** |

### 비용 절감

```bash
# 수업 시간만 EC2 운영 (EventBridge 스케줄링)
# 평일 08:50 시작
aws events put-rule --name start-claude-edu \
  --schedule-expression "cron(50 8 ? * MON-FRI *)"

# 평일 18:10 종료
aws events put-rule --name stop-claude-edu \
  --schedule-expression "cron(10 18 ? * MON-FRI *)"
```

---

## 10. 관리자 운영

### 서버 모니터링

```bash
# 코어별 사용률
mpstat -P ALL 1

# 학생별 프로세스 확인
for i in $(seq 1 20); do
  echo -n "Student $i: "
  ps -u student$i -o pid,psr,comm --no-headers 2>/dev/null | grep claude || echo "offline"
done

# 메모리 확인
free -h
```

### 학생 초기화 (문제 발생 시)

```bash
# 특정 학생 프로세스 강제 종료
sudo pkill -9 -u student5

# 특정 학생 workspace 초기화
sudo rm -rf /home/student5/workspace/*
```

### API 사용량 확인

```bash
# Anthropic 대시보드에서 확인
# https://console.anthropic.com/settings/usage
```

---

## 11. 체크리스트

- [ ] AWS에서 c7g.8xlarge 인스턴스 시작
- [ ] 보안 그룹 설정 (포트 22 SSH)
- [ ] Anthropic에서 API Key 발급
- [ ] `setup.sh` 실행
- [ ] student1으로 SSH 접속 테스트
- [ ] claude 실행 → 질문 → 응답 확인
- [ ] 3명 동시 접속 테스트
- [ ] 20명 동시 접속 테스트
- [ ] EventBridge 자동 시작/종료 설정
- [ ] 수업 시작
