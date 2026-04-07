# Claude Code CLI 웹서버 연동 가이드

## API vs CLI 비교

| 항목 | Claude API | Claude Code CLI (`claude -p`) |
|------|-----------|-------------------------------|
| API 키 필요 | O (별도 발급) | X (이미 로그인됨) |
| 비용 | API 크레딧 소모 | Claude 구독 사용 |
| 설치 | anthropic 패키지 필요 | 이미 설치됨 |
| 속도 | 빠름 (직접 통신) | 약간 느림 (CLI 프로세스 실행) |
| 도구 사용 | 불가 | 가능 (파일 읽기, 웹 검색 등) |
| 대화형 권한 | 해당 없음 | 비대화형이라 사전 허용 필요 |

**결론**: API 키 없이, 이 PC에 설치된 Claude Code를 그대로 활용할 수 있다.

---

## 해결한 이슈 3건

### 이슈 1: Windows에서 `claude` 명령어를 찾지 못함

**증상**: `[WinError 2] 지정된 파일을 찾을 수 없습니다`

**원인**: Windows에서 `subprocess.run(["claude", ...])` 호출 시 PATH에서 `.cmd` 파일을 자동으로 찾지 못함.

**해결**: `claude.cmd`의 전체 경로를 직접 지정.

```python
# 변경 전
subprocess.run(["claude", "-p", question])

# 변경 후
CLAUDE_CMD = r"C:\Users\lenovo\AppData\Roaming\npm\claude.cmd"
subprocess.run([CLAUDE_CMD, "-p", question])
```

**경로 확인 방법**:
```bash
where claude        # cmd에서
which claude        # Git Bash에서
# → C:\Users\lenovo\AppData\Roaming\npm\claude.cmd
```

---

### 이슈 2: stdout에 빈 출력 (Windows 버그)

**증상**: Claude가 답변을 생성하지만 (outputTokens > 0), stdout에는 빈 줄(`\n`)만 출력됨.

**검증 과정**:

```python
# 일반 모드 — stdout이 비어있음
result = subprocess.run([CLAUDE_CMD, "-p", "what is 1+1?"],
                       capture_output=True, text=True)
print(repr(result.stdout))  # → '\n'
```

```bash
# JSON 출력 확인 — result는 빈 문자열이지만 outputTokens는 5
claude -p "what is 1+1?" --output-format json
# → {"result":"", "outputTokens":5, ...}
```

```bash
# stream-json으로 확인 — assistant 메시지에 텍스트가 존재함
claude -p "say hello" --output-format stream-json --verbose
# → {"type":"assistant","message":{"content":[{"type":"text","text":"\n\nHello World"}]}}
```

**원인**: Claude Code CLI의 `-p` (pipe) 모드에서 Windows 환경의 stdout 출력 버그. 모델은 답변을 생성하지만, 최종 text 출력이 stdout에 전달되지 않음.

**해결**: `--output-format stream-json --verbose`로 실행하고, JSON 스트림에서 assistant 메시지의 텍스트를 직접 추출.

```python
import json

def run_claude(question):
    result = subprocess.run(
        [CLAUDE_CMD, "-p", question,
         "--output-format", "stream-json", "--verbose"],
        capture_output=True, text=True, timeout=120
    )

    # stream-json에서 assistant 텍스트 추출
    texts = []
    for line in result.stdout.strip().split("\n"):
        if not line:
            continue
        try:
            data = json.loads(line)
            if data.get("type") == "assistant":
                content = data.get("message", {}).get("content", [])
                for block in content:
                    if block.get("type") == "text":
                        texts.append(block["text"])
        except json.JSONDecodeError:
            continue

    return "".join(texts).strip()
```

**stream-json 출력 구조** (주요 라인만):
```json
{"type":"system","subtype":"init", ...}
{"type":"assistant","message":{"content":[{"type":"text","text":"답변 내용"}]}}
{"type":"result","result":"", ...}
```

핵심: `type: "assistant"` → `message.content[].text`에서 실제 답변을 추출한다.

---

### 이슈 3: 웹 검색 권한 없음

**증상**: "웹 검색 권한이 허용되지 않아 실시간 날씨 정보를 가져올 수 없습니다"

**원인**: `claude -p` (pipe 모드)는 비대화형이라, 도구 사용 시 사용자에게 허용 여부를 물어볼 수 없음. 따라서 WebSearch, WebFetch 등 도구가 기본적으로 차단됨.

대화형 세션에서는:
```
Claude: "웹 검색을 사용해도 될까요?" → 사용자: "허용" → 검색 실행
```

pipe 모드에서는:
```
Claude: 허용을 물어볼 수 없음 → 도구 차단 → 대안 안내만 제공
```

**해결**: `--allowedTools` 옵션으로 사전 허용.

```python
subprocess.run(
    [CLAUDE_CMD, "-p", question,
     "--output-format", "stream-json", "--verbose",
     "--allowedTools", "WebSearch", "WebFetch"],
    capture_output=True, text=True, timeout=120
)
```

**허용 가능한 주요 도구 목록**:
| 도구 | 기능 |
|------|------|
| `WebSearch` | 웹 검색 |
| `WebFetch` | 웹 페이지 내용 가져오기 |
| `Read` | 파일 읽기 |
| `Bash` | 명령어 실행 |
| `Glob` | 파일 패턴 검색 |
| `Grep` | 파일 내용 검색 |

---

## 최종 app.py 핵심 구조

```python
CLAUDE_CMD = r"C:\Users\lenovo\AppData\Roaming\npm\claude.cmd"

def run_claude(question):
    result = subprocess.run(
        [CLAUDE_CMD, "-p", question,
         "--output-format", "stream-json", "--verbose",  # 이슈2 해결
         "--allowedTools", "WebSearch", "WebFetch"],      # 이슈3 해결
        capture_output=True, text=True, timeout=120
    )
    # stream-json에서 assistant 텍스트 추출
    texts = []
    for line in result.stdout.strip().split("\n"):
        try:
            data = json.loads(line)
            if data.get("type") == "assistant":
                for block in data["message"]["content"]:
                    if block.get("type") == "text":
                        texts.append(block["text"])
        except (json.JSONDecodeError, KeyError):
            continue
    return "".join(texts).strip()
```

---

## 참고

- Claude Code CLI 경로: `C:\Users\lenovo\AppData\Roaming\npm\claude.cmd`
- CLI 내부: Node.js로 `node_modules\@anthropic-ai\claude-code\cli.js` 실행
- `-p` 플래그: pipe 모드 (비대화형, 질문 → 답변 → 종료)
- `--output-format`: `text` (기본), `json`, `stream-json`
- `--verbose`: stream-json 사용 시 필수 (`-p` 모드에서)
