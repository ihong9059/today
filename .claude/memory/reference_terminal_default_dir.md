---
name: Windows terminal 기본 시작 디렉토리 = C:\todo
description: 사용자 PC(myhome-lenovo) cmd/PowerShell 기본 시작 디렉토리를 C:\todo로 자동 이동. 새 PC 셋업 시 재적용 가이드
type: reference
originSessionId: c8e21a73-5f24-4c8e-a3f1-d8e57f9b2c44
---

# Windows terminal 기본 시작 디렉토리 셋업

**규칙**: 사용자가 cmd·PowerShell·Windows Terminal 열면 자동으로 `C:\todo`로 이동. 새 PC 셋업 또는 사용자 PC 초기화 시 본 절차 재적용.

**Why**: 사용자 주 작업 디렉토리가 `C:\todo` (today repo·uttecHome·onDevice_AI·lemonLabs·wishketProject·revitaProject 등 모든 vault·repo의 부모). 매번 `cd C:\todo` 입력 비용을 영구 제거. 2026-05-21 본 PC(myhome-lenovo) 셋업.

## 본 PC 적용 사실 (2026-05-21)

cmd registry AutoRun + PowerShell $PROFILE 둘 다 적용 완료. Windows Terminal은 별도 설정 안 함 (UI 또는 settings.json 직접 편집).

## 셋업 명령 (새 PC에 재적용 시)

### cmd (Registry AutoRun) — 모든 cmd 실행에 적용

```powershell
# PowerShell에서 한 줄
reg add "HKCU\Software\Microsoft\Command Processor" /v AutoRun /t REG_SZ /d "cd /d C:\todo" /f

# 검증
reg query "HKCU\Software\Microsoft\Command Processor" /v AutoRun

# 해제
reg delete "HKCU\Software\Microsoft\Command Processor" /v AutoRun /f
```

### PowerShell ($PROFILE)

```powershell
if (!(Test-Path $PROFILE)) { New-Item -ItemType File -Path $PROFILE -Force }
if (!(Select-String -Path $PROFILE -Pattern "Set-Location C:\\todo" -Quiet -ErrorAction SilentlyContinue)) {
    Add-Content -Path $PROFILE -Value "Set-Location C:\todo"
}
```

$PROFILE 경로: `C:\Users\<user>\Documents\WindowsPowerShell\Microsoft.PowerShell_profile.ps1` (또는 PowerShell 7+ `Documents\PowerShell\Microsoft.PowerShell_profile.ps1`)

### Windows Terminal (UI 권장)

1. Windows Terminal 열기
2. Ctrl+, (설정)
3. 프로필 → 기본값
4. **시작 디렉터리**: `C:\todo`
5. 저장

→ 모든 profile (cmd·PowerShell·WSL 등) 일괄 적용.

### settings.json 직접 편집 (UI 안 쓸 때)

```json
{
    "profiles": {
        "defaults": {
            "startingDirectory": "C:\\todo"
        }
    }
}
```

⚠️ 사용자 기존 설정 덮어쓰지 않도록 `defaults` 영역만 수정.

## Git Bash (선택)

`~/.bashrc` 또는 `~/.bash_profile`에 추가:
```bash
cd /c/todo
```

## 우선순위 / 적용 순서

| Terminal | 우선순위 | 셋업 방법 |
|---|:-:|---|
| cmd.exe | ⭐ | Registry AutoRun (한 줄 명령) |
| PowerShell | ⭐ | $PROFILE Add-Content |
| Windows Terminal | ⭐⭐ | UI 또는 settings.json |
| Git Bash | (선택) | ~/.bashrc cd |

→ Windows Terminal 사용자는 1+2+3 모두 적용. 단순 cmd 사용자는 1+2면 충분.

## 동일 PC 패턴 (확장 검토)

향후 본 사용자의 다른 PC (office-dell, sam22-15 등) 셋업 시 같은 절차 적용 권장. 4-vault 운영 + multi-agent 통신 등 복잡한 환경에서 `C:\todo` 직진이 표준.

## 관련 메모

- [PC 인프라 — 역할 분리](project_dual_pc.md) — Windows=myWiki/일상 (단일 source) / Ubuntu=개발 전용
- [4-vault 분리 운영](project_3vault_분리.md) — `C:\todo` 하위의 모든 vault·repo

## 사고 패턴 (주의)

1. **PowerShell $PROFILE 적용 안 됨** — PowerShell 정책 (`Get-ExecutionPolicy`)이 `Restricted`면 $PROFILE 실행 차단. 필요 시 `Set-ExecutionPolicy RemoteSigned -Scope CurrentUser`.
2. **PowerShell 5.1 vs 7 별도 $PROFILE** — 두 버전 모두 사용 시 각각 적용 필요 (`$PROFILE.AllUsersAllHosts` 또는 `$PROFILE.CurrentUserAllHosts`).
3. **VS Code 통합 터미널** — VS Code의 `terminal.integrated.cwd` 설정과 별개. VS Code는 워크스페이스 폴더를 기본 cwd로 씀.
4. **WSL** — WSL bash의 시작 디렉토리는 별개. Windows Terminal startingDirectory가 적용되지만 WSL 내부 `cd ~`로 다시 이동될 수 있음.
