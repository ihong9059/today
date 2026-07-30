---
name: backup
description: C:\todo\today + C:\todo\wishketProject 폴더를 외장 disk(G:\ UTTEC_SSD)로 robocopy 백업. 멀티스레드 + incremental + junction 제외. "backup", "백업", "백업해줘", "/backup" 요청 시 사용
---

# Backup Skill — todo 외장 disk 백업

**두 폴더**를 **UTTEC_SSD (G:\)** 외장 SSD로 robocopy 복사. Junction 무시, 멀티스레드 32, incremental.

| # | 소스 | 대상 |
|---|---|---|
| 1 | `C:\todo\today` | `G:\today_backup_YYYY-MM-DD` |
| 2 | `C:\todo\wishketProject` ⭐ | `G:\wishketProject_backup_YYYY-MM-DD` |

> ⭐ wishketProject = 위시캣/크몽 영업 원본 (자체 git repo, GitHub 원격 O). `today` 밖 별도 위치라 명시 포함. 2026-07-27 이 폴더가 삭제→휴지통 복구된 사건 후 이중 백업 대상에 추가 (2026-07-29).

## 사양 (2026-06-01 박제, 5/31 포맷 사양 그대로)

| 항목 | 값 |
|---|---|
| 외장 disk 라벨 | **UTTEC_SSD** |
| 파일시스템 | **exFAT** (Windows + Ubuntu 5.4+ 양방향) |
| 마운트 포인트 | `G:\` |
| 백업 폴더 명명 | `today_backup_YYYY-MM-DD` |
| 로그 파일 명명 | `backup_log_YYYY-MM-DD.txt` |

## 실행 절차

### 0. 사전 검증

```powershell
$drive = Get-Volume -DriveLetter G -ErrorAction SilentlyContinue
if (-not $drive) {
    Write-Output "❌ G: drive 마운트 안 됨 — 외장 disk 연결 확인 필요"
    return
}
if ($drive.FileSystemLabel -ne "UTTEC_SSD") {
    Write-Output "⚠️ G: 라벨이 UTTEC_SSD가 아님 (현재: $($drive.FileSystemLabel))"
    Write-Output "   계속하면 다른 disk에 백업됨. 확인 후 진행"
}
$free_gb = [math]::Round($drive.SizeRemaining/1GB, 2)
Write-Output "G: UTTEC_SSD: $free_gb GB free"
```

**판단**:
- 라벨 mismatch → 사용자에 확인 후 진행
- free space < 30 GB → 경고 + 사용자 확인

### 1. 기존 backup 폴더 정리 (선택)

이전 날짜 폴더가 너무 많으면 사용자에게 정리 권고:

```powershell
Get-ChildItem 'G:\' -Directory -Filter 'today_backup_*' | Sort-Object Name
```

10개 이상이면 오래된 것 archive 또는 삭제 권고.

### 2. Robocopy 실행

```powershell
$date = Get-Date -Format 'yyyy-MM-dd'

# 소스 → 대상 매핑 (today + wishketProject)
$targets = @(
    @{ Src = "C:\todo\today";          Dst = "G:\today_backup_$date";          Log = "G:\backup_log_$date.txt" },
    @{ Src = "C:\todo\wishketProject"; Dst = "G:\wishketProject_backup_$date"; Log = "G:\backup_log_wishket_$date.txt" }
)

foreach ($t in $targets) {
    if (-not (Test-Path $t.Src)) { Write-Output "⚠️ 소스 없음, 건너뜀: $($t.Src)"; continue }
    Write-Output "robocopy: $($t.Src) → $($t.Dst)"
    robocopy $t.Src $t.Dst /E /MT:32 /R:2 /W:1 /XJ /NFL /NDL /LOG:$($t.Log)
    Write-Output "  exit code: $LASTEXITCODE"
}
```

**옵션 의미**:
| Flag | 의미 |
|---|---|
| `/E` | 모든 하위 폴더 (빈 폴더 포함) |
| `/MT:32` | 32-thread (CPU/SSD I/O 최대 활용) |
| `/R:2 /W:1` | 에러 시 2회 retry, 1초 간격 |
| **`/XJ`** ⭐⭐⭐ | junction 무시 (myWiki/raw/ junction 20+개 안전 처리) |
| `/NFL /NDL` | 파일/폴더 한 줄씩 로그 끄기 (로그 비대화 방지) |
| `/LOG` | 로그 파일 (요약 통계 포함) |

**Exit code 의미**:
| 코드 | 의미 |
|---|---|
| 0 | 변경 없음 (incremental 시 흔함) |
| 1 | 정상 copy 완료 |
| 2 | extra file 발견 (dst에만 있음, 무해) |
| 3 | 1 + 2 |
| 5~7 | mismatch/extra 혼합 (대부분 OK) |
| **≥ 8** | ⚠️ 에러 발생 |
| 16 | usage error (보통 path mangling — Git Bash에서 호출 시) |

**중요**: robocopy는 **PowerShell에서 호출**해야 함. Git Bash에서 호출 시 `/E` 등 옵션을 path로 mangle (`E:/`) → exit 16. 본 skill은 항상 PowerShell 사용.

### 3. 결과 보고

```powershell
foreach ($t in $targets) {
    if (-not (Test-Path $t.Dst)) { continue }
    $total_files = (Get-ChildItem $t.Dst -Recurse -File -Force -ErrorAction SilentlyContinue).Count
    $total_gb = [math]::Round(((Get-ChildItem $t.Dst -Recurse -File -Force -ErrorAction SilentlyContinue | Measure-Object Length -Sum).Sum)/1GB, 2)
    Write-Output ""
    Write-Output "[백업 완료] $($t.Src)"
    Write-Output "  대상: $($t.Dst)"
    Write-Output "  로그: $($t.Log)"
    Write-Output "  총 파일: $total_files / 총 크기: $total_gb GB"
    Write-Output "  [robocopy 통계]"
    Write-Output (Get-Content $t.Log -Tail 12)
}
```

### 4. work-end 시 자동 호출 검토

`backup` skill을 work-end skill에서 자동 호출할지 사용자 결정 후 통합. 외장 disk가 항상 연결돼 있지 않으므로 **자동 호출은 비권장**. 사용자가 명시적으로 `/backup` 호출.

## 트리거 키워드

- "backup"
- "백업"
- "백업해줘"
- "외장 disk 백업"
- "todo 백업"
- "/backup"

## 자주 묻는 질문

**Q. 같은 날짜에 여러 번 호출하면?**  
A. 같은 폴더에 incremental copy. 변경된 파일만 copy되어 빠름 (10~30초).

**Q. 다른 외장 disk 사용 가능?**  
A. 본 skill은 G:\ UTTEC_SSD 전용. 다른 disk 사용 시 SKILL.md 수정 또는 별도 skill 작성.

**Q. junction을 따라가야 하는 경우?**  
A. `/XJ` 제거하면 됨. 그러나 myWiki/raw/ junction이 외부 vault (revitaProject, onDevice_AI 등)를 가리키므로 따라가면 백업 크기 폭증 + 외부 vault 별도 백업 정책과 충돌. 본 todo만 백업 권장.

**Q. 외장 disk가 다른 PC에서 보이지 않으면?**  
A. exFAT은 Windows / macOS / Ubuntu 5.4+ 양방향. 그 외 OS는 별도 driver 필요.

**Q. G: 사용량(GB)이 실제 copy 크기보다 훨씬 큰데 정상인가? ⭐**  
A. **정상**. exFAT 1TB의 cluster size = 128 KB. todo는 작은 파일 다수(약 13만 개)이고 각 파일이 최소 128KB cluster 점유 → **cluster overhead만 25~30 GB**.
- todo 실제 21 GB → G: Used 약 50 GB 보이는 게 정상
- **진짜 데이터 크기는 robocopy 통계의 "Bytes Copied" 값만 신뢰**
- 6/1 첫 백업 시 G: Used 53GB를 보고 junction 통과 의심했으나 robocopy 통계 20.027GB로 정상 확인. 박제.

**Q. USB hub bandwidth 공유?**  
A. 같은 USB hub에 다른 장치(다른 Claude vault의 외장 device 등) 있으면 대역폭 분할되어 속도 저하. 다른 작업 종료 후 회복.

## 참고

- 5/31 첫 포맷 박제: `.claude/sessions/session_20260531_uttec-ble-module-pinmap-5ch-uart-bringup.md` § A
- 6/1 본 skill 신설: 어제 surface_scan.bin 528GB가 disk 가득 채워서 재포맷 후 정기 백업 체계 박제
