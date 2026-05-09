---
name: 브라우저 Chrome 선호
description: URL을 열 때 항상 Chrome을 명시 호출. 기본 브라우저가 Edge라 일반 호출은 Edge로 뜨고, cmd 경유 호출은 URL의 & 문자가 잘림
type: feedback
originSessionId: 58ef5da6-34ca-492c-9fc5-31c9f21be601
---

URL/웹 페이지를 자동 오픈할 때 chrome.exe 절대 경로로 직접 호출한다. 일반 호출(Start-Process URL, webbrowser.open) 또는 cmd 경유 호출(cmd /c start chrome URL)은 사용 금지.

**Why:** 사용자 PC 기본 브라우저는 Edge라 일반 호출은 Edge로 뜸 (Chrome 선호). 또한 cmd /c start chrome <URL> 방식은 URL의 `&` 문자가 cmd 명령 분리자로 해석되어 URL이 잘리고, 쿼리스트링의 일부(예: `&text=`, `&dates=`)가 별도 명령어로 실행 시도되어 "'text'은(는) 인식되지 않습니다" 오류 발생 (Google Calendar URL 등에서 빈 폼 문제 자주 발생).

**How to apply:**

### Python (권장 — 검증됨)
```python
import os, subprocess

CHROME_CANDIDATES = [
    r"C:\Program Files\Google\Chrome\Application\chrome.exe",
    r"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe",
]
chrome = next((p for p in CHROME_CANDIDATES if os.path.exists(p)), None)

if chrome:
    subprocess.Popen([chrome, url], close_fds=True)
else:
    import webbrowser
    webbrowser.open(url)  # Edge fallback
```

### PowerShell
```powershell
Start-Process 'chrome.exe' '<URL>'
# chrome.exe가 PATH에 없으면:
Start-Process 'C:\Program Files\Google\Chrome\Application\chrome.exe' '<URL>'
```

### 절대 사용 금지 (반복 실패한 패턴)
- ❌ `webbrowser.open(url)` — Edge로 열림
- ❌ `Start-Process '<URL>'` / `start <URL>` — Edge로 열림
- ❌ `cmd /c start chrome <URL>` — URL의 `&`가 cmd 분리자로 해석되어 URL 잘림
- ❌ `subprocess.Popen(["cmd", "/c", "start", "chrome", url])` — 위와 동일 문제

### 적용 대상 스킬
/calendar, /design, /nlm 등 자동 브라우저 오픈 스킬 모두 위 패턴 적용. 새 스킬 작성 시에도 동일.
