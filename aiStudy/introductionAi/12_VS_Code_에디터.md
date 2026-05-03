# VS Code 에디터 가이드

## 1. VS Code란?
- Visual Studio Code — Microsoft가 만든 무료 코드 에디터
- 전 세계 개발자의 70%+ 이상이 사용하는 표준 에디터
- 가볍고 빠르면서도 강력한 기능
- 수만 개의 확장(Extension)으로 기능 무한 확장
- Python, JavaScript, Markdown 등 거의 모든 언어 지원
- Claude Code 확장으로 에디터 안에서 AI 사용 가능

## 2. 왜 VS Code가 필요한가?
- Claude Code가 터미널에서 동작하지만, 코드 편집은 에디터가 더 편리
- 파일 트리 구조를 시각적으로 확인
- 문법 하이라이팅, 자동 완성, 에러 표시
- Git 통합 (변경 사항 한눈에 보기)
- 터미널 내장 (Claude Code도 여기서 실행 가능)
- SSH Remote로 원격 서버의 파일을 로컬처럼 편집

## 3. 설치
### 3.1 다운로드
1. https://code.visualstudio.com 접속
2. "Download for Windows" 클릭
3. 설치 파일 실행
4. 설치 옵션에서 모두 체크 권장:
   - "PATH에 추가" (필수!)
   - "파일 우클릭 메뉴에 추가"
   - "폴더 우클릭 메뉴에 추가"
5. 완료 후 재시작

### 3.2 설치 확인
```bash
code --version
```

### 3.3 한국어 설정
1. Ctrl+Shift+X (확장 탭 열기)
2. "Korean Language Pack" 검색
3. 설치 → 재시작

## 4. 기본 사용법
### 4.1 폴더 열기
- 파일 > 폴더 열기 (Ctrl+K Ctrl+O)
- 또는 터미널에서:
```bash
code .          # 현재 폴더 열기
code ~/my-project  # 특정 폴더 열기
```

### 4.2 파일 탐색
- Ctrl+P: 파일 이름으로 빠른 검색
- Ctrl+Shift+F: 전체 텍스트 검색
- Ctrl+B: 사이드바 토글

### 4.3 편집
- Ctrl+D: 같은 단어 다중 선택
- Alt+위/아래: 줄 이동
- Ctrl+Shift+K: 줄 삭제
- Ctrl+/: 주석 토글
- Ctrl+Z: 실행 취소
- Ctrl+S: 저장

### 4.4 내장 터미널
- Ctrl+` (백틱): 터미널 열기/닫기
- 여기서 Claude Code 실행 가능:
```bash
claude
```

## 5. 필수 확장(Extension) 설치
### 5.1 설치 방법
1. Ctrl+Shift+X 또는 좌측 확장 아이콘 클릭
2. 검색창에 확장 이름 입력
3. "Install" 클릭

### 5.2 추천 확장 목록
| 확장 | 용도 | 필수도 |
|------|------|--------|
| Claude Code | AI 코딩 어시스턴트 (Anthropic 공식) | 필수 |
| Python | Python 개발 지원 | 필수 |
| Markdown Preview | 마크다운 미리보기 | 필수 |
| GitLens | Git 이력 상세 보기 | 추천 |
| Remote - SSH | 원격 서버 파일 편집 | 추천 |
| Prettier | 코드 자동 정렬 | 추천 |
| Material Icon Theme | 파일 아이콘 테마 | 선택 |
| Live Server | HTML 실시간 미리보기 | 선택 |

## 6. Claude Code 확장 사용법
### 6.1 설치
1. 확장 탭에서 "Claude Code" 검색
2. Anthropic 공식 확장 설치
3. Claude 계정으로 로그인

### 6.2 사용법
- 사이드바에서 Claude 아이콘 클릭
- 에디터 안에서 바로 Claude와 대화
- 코드 선택 후 "Claude에게 설명 요청" 가능
- 터미널에서 claude 명령도 그대로 사용 가능

## 7. Remote SSH (원격 서버 편집)
### 7.1 왜 필요한가?
- AWS EC2, 라즈베리파이의 파일을 마치 로컬 파일처럼 편집
- 터미널 vi/nano 대신 VS Code의 편리한 UI 사용

### 7.2 설정 방법
1. "Remote - SSH" 확장 설치
2. Ctrl+Shift+P > "Remote-SSH: Connect to Host"
3. ssh user@100.79.180.64 (Tailscale IP 사용 가능!)
4. 원격 서버의 폴더가 VS Code에서 열림

## 8. Git 통합
- 좌측 소스 제어 아이콘 클릭 (Ctrl+Shift+G)
- 변경된 파일 목록 자동 표시
- + 버튼: 스테이징 (git add)
- 메시지 입력 후 체크: 커밋 (git commit)
- "..." 메뉴: push, pull, branch 관리

## 9. 유용한 단축키
| 단축키 | 기능 |
|--------|------|
| Ctrl+P | 파일 검색 |
| Ctrl+Shift+P | 명령 팔레트 |
| Ctrl+` | 터미널 토글 |
| Ctrl+B | 사이드바 토글 |
| Ctrl+, | 설정 |
| Ctrl+K Ctrl+S | 단축키 목록 |
| F5 | 디버그 실행 |
| Ctrl+Shift+E | 파일 탐색기 |

## 10. 자주 묻는 질문
- Q: 무료인가요? → 완전 무료, 오픈소스
- Q: Visual Studio와 다른 건가요? → 네, VS Code는 경량 에디터. Visual Studio는 무거운 IDE
- Q: Claude Code 터미널 vs VS Code 확장 차이? → 동일한 Claude. 터미널은 CLI, 확장은 에디터 통합
- Q: 원격 서버에서 사용 가능? → Remote SSH 확장으로 가능
