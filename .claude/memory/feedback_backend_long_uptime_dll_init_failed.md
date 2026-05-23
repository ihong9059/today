---
name: search backend 장시간 가동 → STATUS_DLL_INIT_FAILED → restart 해결
description: search backend uvicorn 가 수 시간 이상 가동 시 claude CLI subprocess spawn 에서 exit 3221225794 (0xC0000142 STATUS_DLL_INIT_FAILED) 반복. desktop heap 누적이 원인, backend kill + 재시작이 즉효
type: feedback
originSessionId: 1814a91f-a757-48b1-ae22-a5c740292387
---
# search backend 장시간 가동 → STATUS_DLL_INIT_FAILED

**증상**: web UI (http://localhost:8888) 에서 query 시 `claude CLI exit 3221225794:` 반복. 콜론 뒤 stderr 가 비어있음 (= subprocess 가 init 단계에서 죽어 출력 기회 없음).

**원인 (확정 2026-05-23)**:
- exit code 3221225794 = `0xC0000142` = **STATUS_DLL_INIT_FAILED**
- backend (uvicorn) 가 ~9 시간 가동되면서 매 query 마다 `claude.cmd` → `node.exe` subprocess 체인 spawn
- Windows desktop heap 은 user session 당 ~48MB 고정 (registry 미변경 시)
- 누적된 handle / GDI 객체가 새 process 의 DLL init 단계를 막음
- backend 자체는 살아있어서 다음 query 도 받지만, subprocess spawn 단계에서 매번 같은 에러

**진단 (다음 재발 시 SOP)**:
1. exit code 3221225794 / 0xC0000142 / STATUS_DLL_INIT_FAILED 확인
2. stderr 가 비어있는지 확인 (비어있으면 init 실패 확정)
3. `claude --version` + `"hi" | claude --print --model sonnet ...` 직접 호출 → 정상 응답하면 claude CLI 자체 OK
4. backend process start time 확인 (`Get-Process -Id <PID> | Select StartTime`). 수 시간 이상이면 누적 의심

**해결**:
```powershell
Stop-Process -Id <backend-PID> -Force
# 별도 터미널에서 새로 띄우기 (stdout 보임)
cd C:\todo\search\backend
.venv\Scripts\python.exe -m uvicorn app.main:app --port 8890 --host 127.0.0.1
```

**Why**: 정체성 D (외부 회사 web 서비스 prototype, dogfooding-via-self) 라 외부 deploy 시점 (Phase 6) 에는 Linux 환경 — desktop heap 무관하지만 다른 누적 (fd, zombies) 가능성. 운영 SOP 로 기록 가치.

**How to apply**:
- search backend 장시간 가동 후 "claude CLI exit 3221225794" 또는 유사 NT status code 보이면 즉시 backend restart 시도
- 재발 빈도가 잦으면 (1 일 1 회 이상) 근본 해결 후보: ① backend stdout/stderr → `backend/logs/uvicorn.log` redirect 로 정확한 traceback 확보, ② claude CLI subprocess 풀 (Anthropic SDK 직접 호출로 전환 — 단 정체성 D 의 Max 구독 활용 정책 변경 필요), ③ backend 주기적 self-restart (cron 또는 systemd Restart=)
- 같은 Windows desktop heap 이슈는 Phase 6 Linux deploy 시 사라지지만, 그 전까지 본 PC 에서는 재발 가능
