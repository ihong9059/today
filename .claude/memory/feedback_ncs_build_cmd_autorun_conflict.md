---
name: NCS/Zephyr 빌드 ↔ cmd AutoRun 충돌 ⚠️ 사전 비활성화 필수
description: 🚨 PREEMPTIVE — west build/flash, cmake --build, ninja 호출 BEFORE에 AutoRun 무조건 해제. 함정 발견 후 적용 X, 호출 직전 무조건 try/finally 패턴 적용. 2회 박제 (5/31, 6/7) 동일 실패 재발.
type: feedback
originSessionId: b7ce2bf4-902e-4f6f-a1ef-b49ab020e67f
triggers: [west build, west flash, cmake --build, ninja, nrfjprog flash, NCS firmware 빌드 요청]
---
## 🚨 핵심 (먼저 읽기)

**west build 또는 west flash 명령을 호출하기 전에 무조건 AutoRun을 비활성화한다.** 빌드가 실패한 후 적용하는 패턴이 아님. **명령 호출 직전 try/finally**로 감싸야 함.

재발 박제:
- 1회차: 2026-05-31 UTTEC BLE Module UART pinmap 검증
- 2회차: 2026-06-07 한림용인CC relay GPIO 추가 — **메모리에 박제되어 있음에도 동일 실패 반복** (사용자 지적)

재발 이유 분석: 메모리 description이 "발생 시 해제"로 해석될 여지가 있어 트리거가 약했음. 본 버전부터 description에 **"PREEMPTIVE"** 와 트리거 명령 목록 명시.

## 기술 배경

NCS v2.9.2 (또는 동급) Zephyr 빌드 시 ninja가 `cmd.exe /C "cd . && ar.exe qc zephyr\arch\..."` 식으로 ar.exe를 호출한다. **cmd.exe AutoRun이 설정돼 있으면** (`HKCU\Software\Microsoft\Command Processor\AutoRun = "cd /d C:\todo"`) cmd.exe가 CWD를 `C:\todo`로 강제 이동 → ar.exe가 build dir 기준 상대 경로(예: `zephyr\arch\arch\arm\core\libarch__arm__core.a`)를 못 찾고 "No such file or directory" 실패.

**증상**:
```
[27/137] Linking C static library zephyr\arch\arch\arm\core\libarch__arm__core.a
FAILED: zephyr/arch/arch/arm/core/libarch__arm__core.a
... ar.exe: zephyr\arch\arch\arm\core\libarch__arm__core.a: No such file or directory
```
- 빌드 단계 25~30%에서 갑자기 ar.exe 링킹 모두 실패
- `west build`, `cmake --build`, 직접 ninja 모두 같은 실패
- bash 또는 PowerShell 어디서 실행해도 동일 (cmd.exe AutoRun이 모든 child process에 적용)

**Why**: 본 PC는 `reference_terminal_default_dir.md` 메모리로 셋업된 registry AutoRun이 있음 (Terminal 기본 디렉토리 C:\todo 강제). NCS 빌드는 ninja → cmd.exe → ar.exe 체인에서 CWD 상속을 깨버림.

**How to apply**: NCS/Zephyr 빌드·플래시 시 AutoRun 일시 해제. 끝나면 복원.

**해결 패턴** (PowerShell):
```powershell
$saved = (Get-ItemProperty 'HKCU:\Software\Microsoft\Command Processor' -Name AutoRun).AutoRun
Set-ItemProperty 'HKCU:\Software\Microsoft\Command Processor' -Name AutoRun -Value ""
try {
    Set-Location C:\path\to\project
    west build -b nrf52dk/nrf52832 --pristine
    west flash --runner jlink --dev-id <SN>
} finally {
    Set-ItemProperty 'HKCU:\Software\Microsoft\Command Processor' -Name AutoRun -Value $saved
}
```

**대안** (수동): cmd.exe 단발 호출 시 `cmd.exe /D /C "..."` 로 AutoRun 비활성화 가능. 그러나 ninja가 호출하는 내부 cmd.exe는 이 옵션을 못 추가하므로 빌드에는 부적합.

**적용 박제 (2026-05-31)**:
- UTTEC BLE Module UART pinmap 검증 펌웨어 빌드/플래시 시 발견
- 해결 후 빌드 성공 (FLASH 18 KB / RAM 4.4 KB, verify OK)
- 본 패턴을 firmware 작업 표준 절차로 등록
