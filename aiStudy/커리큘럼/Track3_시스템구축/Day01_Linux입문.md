# Day 1: Linux 입문 — "터미널이 두렵지 않다"

## 학습 목표
- WSL2를 설치하고 Windows에서 Linux 환경을 사용할 수 있다
- ls, cd, cp, mv, chmod 등 기본 명령어를 자유롭게 사용한다
- Claude Code의 Bash 도구를 활용하여 리눅스 명령을 실행한다
- 파일/디렉토리 권한 체계(rwx)를 이해한다

## 준비물
- Windows 10/11 PC (WSL2 설치 가능)
- Claude Code CLI 설치 완료
- 인터넷 연결

## 실습 1: WSL2 설치 및 환경 확인 (30분)

1. PowerShell을 관리자 권한으로 실행하여 WSL2를 설치한다

```powershell
wsl --install -d Ubuntu-22.04
```

2. 설치 완료 후 사용자 이름과 비밀번호를 설정한다

3. WSL 터미널에서 시스템 정보를 확인한다

```bash
cat /etc/os-release
uname -a
whoami
```

4. Claude Code에서 Bash 도구로 동일한 명령을 실행해본다

```
Claude에게: "현재 리눅스 시스템 정보를 확인해줘 - OS 버전, 커널 버전, 현재 사용자"
```

### 관찰 포인트
- WSL2는 실제 Linux 커널을 사용하는가?
- Windows 파일시스템은 WSL에서 어디에 마운트되는가? (/mnt/c)

## 실습 2: 파일/디렉토리 기본 조작 (40분)

1. 작업용 디렉토리 구조를 만든다

```bash
mkdir -p ~/project/{src,docs,config}
touch ~/project/src/app.py
touch ~/project/docs/README.md
touch ~/project/config/settings.json
```

2. 파일 탐색 명령어를 연습한다

```bash
ls -la ~/project/
cd ~/project/src
pwd
ls -R ~/project/
```

3. 파일 복사, 이동, 삭제를 실습한다

```bash
cp ~/project/src/app.py ~/project/src/app_backup.py
mv ~/project/docs/README.md ~/project/docs/guide.md
rm ~/project/src/app_backup.py
```

4. Claude Code에게 디렉토리 구조를 분석하게 한다

```
Claude에게: "~/project 폴더의 전체 구조를 트리 형태로 보여주고, 각 파일의 크기와 권한도 표시해줘"
```

### 관찰 포인트
- `ls -la` 출력에서 drwxr-xr-x 각 문자의 의미는?
- 숨김 파일(dotfile)은 어떻게 확인하는가?

## 실습 3: 파일 권한과 소유권 (30분)

1. 권한 변경을 실습한다

```bash
echo '#!/bin/bash' > ~/project/src/run.sh
echo 'echo "Hello Linux!"' >> ~/project/src/run.sh
ls -l ~/project/src/run.sh
chmod +x ~/project/src/run.sh
./~/project/src/run.sh
```

2. 숫자 모드로 권한을 설정한다

```bash
chmod 644 ~/project/config/settings.json
chmod 755 ~/project/src/run.sh
chmod 600 ~/project/config/secret.txt
```

3. Claude Code에게 권한 설명을 요청한다

```
Claude에게: "~/project 내 모든 파일의 권한을 확인하고, 각 파일에 적절한 권한이 설정되어 있는지 분석해줘. 보안상 문제가 있으면 수정해줘."
```

### 관찰 포인트
- 644와 755의 차이는 무엇인가?
- 실행 권한이 없는 스크립트를 실행하면 어떤 에러가 발생하는가?

## 실습 4: 텍스트 처리 기초 (20분)

1. 파이프와 리다이렉션을 연습한다

```bash
echo "Hello World" > ~/project/docs/guide.md
cat ~/project/docs/guide.md
echo "Second Line" >> ~/project/docs/guide.md
cat ~/project/docs/guide.md | wc -l
ls -la ~/project/ | grep "src"
```

2. Claude Code로 로그 분석을 시뮬레이션한다

```
Claude에게: "/var/log/syslog 파일에서 최근 20줄을 읽고, 에러나 경고 메시지가 있는지 분석해줘"
```

### 관찰 포인트
- `>` 와 `>>` 의 차이는?
- 파이프(`|`)가 어떻게 명령어를 연결하는가?

## 과제

### 제출물: "나의 첫 Linux 환경 보고서"

```markdown
# Linux 환경 보고서

## 시스템 정보
- OS: (예: Ubuntu 22.04 LTS)
- 커널: (예: 5.15.x)
- 사용자:

## 실습 결과
### 생성한 디렉토리 구조
(tree 명령 출력 붙여넣기)

### 권한 설정 결과
| 파일 | 권한(숫자) | 권한(문자) | 이유 |
|------|-----------|-----------|------|
| app.py | 644 | -rw-r--r-- | 읽기/쓰기만 필요 |
| run.sh | | | |
| settings.json | | | |

## 배운 명령어 Top 5
1.
2.
3.
4.
5.

## 어려웠던 점
```

## 강사 참고 사항
- WSL2 설치가 안 되는 학생은 BIOS에서 가상화(VT-x) 활성화가 필요할 수 있다
- Mac 사용자는 WSL 대신 기본 터미널을 사용하면 된다
- 권한 숫자 모드(octal)는 처음에 어려울 수 있으므로 rwx → 421 변환표를 준비한다
