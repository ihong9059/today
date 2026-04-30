# Claude 교육용 설치 및 삭제 가이드

## -- Raspberry Pi 교육 환경 --

---

## 1. 교육 전: Claude 설치

### 1.1 사전 요구사항

```bash
# Node.js 설치 (Claude Code는 Node.js 기반)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo bash -
sudo apt-get install -y nodejs

# 설치 확인
node --version   # v20.x 이상
npm --version
```

### 1.2 Claude Code 설치

```bash
# Claude Code CLI 설치
npm install -g @anthropic-ai/claude-code

# 설치 확인
claude --version
```

### 1.3 API 키 설정 (강사가 일괄 설정)

```bash
# 환경 변수에 API 키 등록
echo 'export ANTHROPIC_API_KEY="sk-ant-xxxxx"' >> ~/.bashrc
source ~/.bashrc

# 동작 확인
claude "안녕하세요, 테스트입니다"
```

> **주의**: 교육용 API 키는 Usage Limit을 설정하여 과도한 사용 방지
> - Anthropic Console (console.anthropic.com) → API Keys → Usage Limits 설정
> - 교육 기간 + 1주 후 만료되도록 설정 권장

### 1.4 SD카드 이미지에 사전 포함 (권장)

교육 당일 설치 시간을 절약하려면 SD카드 이미지에 미리 포함:

```bash
# SD카드 이미지 제작 시 포함할 항목
# 1. Node.js
# 2. Claude Code CLI
# 3. .bashrc에 ANTHROPIC_API_KEY (교육용)
# 4. 실습 프로젝트 폴더에 CLAUDE.md (교육용 프롬프트)
```

---

## 2. 교육 중: 활용

### 2.1 실습에서 Claude 활용 예시

```bash
# 프로젝트 폴더에서 Claude 실행
cd ~/factory_project
claude

# 교육 중 활용 예
# - 코드 작성 도움
# - 에러 디버깅
# - AI 보고서 생성 (API 호출)
# - 센서 데이터 분석
```

### 2.2 교육용 CLAUDE.md 설정

```bash
# 프로젝트 폴더에 CLAUDE.md 생성 (Claude 행동 규칙)
cat > ~/factory_project/CLAUDE.md << 'EOF'
# 교육용 Claude 설정
- 한국어로 답변
- 초보자 눈높이에 맞춰 설명
- Raspberry Pi + Shield Board 환경 기준
- 코드는 Python 3 기준
EOF
```

---

## 3. 교육 종료 + 1주 후: Claude 완전 삭제

### 3.1 자동 삭제 스크립트 (권장)

교육 마지막 날에 아래 스크립트를 등록하면, 1주 후 자동 삭제됩니다.

```bash
# 삭제 예약 스크립트 생성
cat > ~/remove_claude.sh << 'SCRIPT'
#!/bin/bash
# Claude 완전 삭제 스크립트

echo "[$(date)] Claude 삭제 시작..."

# 1. Claude Code CLI 삭제
npm uninstall -g @anthropic-ai/claude-code

# 2. Claude 설정/캐시 디렉토리 삭제
rm -rf ~/.claude
rm -rf ~/.config/claude-code
rm -rf ~/.cache/claude-code

# 3. API 키 환경변수 제거
sed -i '/ANTHROPIC_API_KEY/d' ~/.bashrc
sed -i '/ANTHROPIC_API_KEY/d' ~/.profile
sed -i '/ANTHROPIC_API_KEY/d' ~/.zshrc 2>/dev/null

# 4. npm 캐시 정리
npm cache clean --force

# 5. Node.js도 삭제할 경우 (선택)
# sudo apt-get remove -y nodejs
# sudo rm -rf /usr/lib/node_modules

# 6. 이 스크립트 자신 삭제
rm -f ~/remove_claude.sh

# 7. crontab에서 예약 제거
crontab -l | grep -v 'remove_claude' | crontab -

echo "[$(date)] Claude 삭제 완료"
SCRIPT

chmod +x ~/remove_claude.sh
```

### 3.2 1주 후 자동 실행 등록 (crontab)

```bash
# 교육 종료일 기준 +7일 후 자동 실행 등록
# 예: 교육 종료일이 2026-05-16이면, 2026-05-23 09:00에 실행

# 날짜 계산 (교육 종료일 + 7일)
DELETE_DATE=$(date -d "+7 days" '+%Y-%m-%d')  # Linux
# DELETE_DATE=$(date -v+7d '+%Y-%m-%d')       # macOS

# crontab 등록
MONTH=$(date -d "+7 days" '+%-m')
DAY=$(date -d "+7 days" '+%-d')
(crontab -l 2>/dev/null; echo "0 9 $DAY $MONTH * /bin/bash ~/remove_claude.sh >> ~/remove_claude.log 2>&1") | crontab -

echo "삭제 예약: $DELETE_DATE 09:00"
```

### 3.3 수동 삭제 (즉시 삭제 시)

```bash
# 즉시 삭제가 필요한 경우
bash ~/remove_claude.sh
```

### 3.4 삭제 확인

```bash
# 삭제 완료 확인 체크리스트
claude --version 2>&1          # "command not found" 확인
echo $ANTHROPIC_API_KEY        # 빈 값 확인
ls ~/.claude 2>&1              # "No such file" 확인
ls ~/.config/claude-code 2>&1  # "No such file" 확인
npm list -g @anthropic-ai/claude-code 2>&1  # "empty" 확인

echo "모든 항목이 not found/empty이면 삭제 완료"
```

---

## 4. API 키 관리 (강사용)

### 4.1 교육용 API 키 운영 방식

| 방식 | 장점 | 단점 |
|------|------|------|
| **공용 키 1개** | 관리 간편 | 사용량 추적 어려움 |
| **수강생별 키** | 개별 사용량 관리 | 키 발급/삭제 번거로움 |
| **팀별 키** | 적절한 균형 | 팀 내 책임 분산 |

> **권장**: 공용 키 1개 + Usage Limit 설정 → 교육 종료 + 1주 후 키 비활성화

### 4.2 교육 종료 후 API 키 비활성화 (가장 중요)

```
1. console.anthropic.com 접속
2. API Keys → 교육용 키 선택
3. "Disable" 또는 "Delete" 클릭
```

> **핵심**: Pi에서 Claude를 삭제하더라도 API 키를 비활성화하지 않으면
> 키가 유출될 경우 비용이 발생할 수 있습니다.
> 반드시 Anthropic Console에서 키를 비활성화/삭제하세요.

---

## 5. 일정 요약

```
교육 D-7일  : SD카드에 Claude 사전 설치 (이미지 제작)
교육 D-Day  : 수강생 키트 배포 (Claude 즉시 사용 가능)
교육 마지막 : 삭제 스크립트 + crontab 등록 (1주 후 자동 삭제)
교육 +7일   : Claude 자동 삭제 실행
교육 +7일   : Anthropic Console에서 API 키 비활성화 (강사)
```
