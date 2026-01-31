# Tailscale 등록 기기 IP 주소 확인 방법

## 1. CLI 명령어 (가장 빠름)

```bash
tailscale status
```

모든 등록된 기기의 **이름**, **Tailscale IP**, **상태**를 한눈에 확인할 수 있습니다.

### 출력 예시
```
100.100.100.1   my-desktop     windows  -
100.100.100.2   my-laptop      linux    idle
100.100.100.3   my-phone       android  active
```

---

## 2. 웹 관리 콘솔

1. https://login.tailscale.com/admin/machines 접속
2. 로그인 후 **Machines** 탭에서 모든 기기 목록과 IP 확인

---

## 3. 특정 기기 IP만 확인

```bash
# 자신의 Tailscale IP
tailscale ip

# 특정 기기 IP (기기 이름으로)
tailscale ip <기기이름>
```

---

## 4. 상세 정보 확인 (JSON)

```bash
tailscale status --json
```

JSON 형식으로 더 자세한 정보(OS, 마지막 접속 시간 등)를 확인할 수 있습니다.

---

## 5. 기기 이름(호스트명) 변경

`tailscale status` 출력에서 보이는 기기 이름(예: `desktop-md6re2a`)을 변경하는 방법입니다.

### 방법 1: 웹 콘솔에서 변경 (권장)

1. https://login.tailscale.com/admin/machines 접속
2. 해당 기기 클릭
3. 기기 이름 옆 **편집(연필) 아이콘** 클릭
4. 새 이름 입력 후 저장

> 웹 콘솔에서 변경하면 Tailscale 내에서만 별칭으로 표시됩니다.

### 방법 2: CLI 명령어로 변경

```bash
tailscale set --hostname=새이름
```

예시:
```bash
tailscale set --hostname=my-office-pc
```

> CLI로 변경하면 실제 호스트명이 변경됩니다.

---

## 명령어 요약

| 명령어 | 설명 |
|:-------|:-----|
| `tailscale status` | 모든 기기 목록 및 IP 확인 |
| `tailscale ip` | 자신의 Tailscale IP 확인 |
| `tailscale ip -4` | 자신의 IPv4 주소만 확인 |
| `tailscale ip <이름>` | 특정 기기 IP 확인 |
| `tailscale status --json` | JSON 형식 상세 정보 |
| `tailscale set --hostname=<이름>` | 기기 이름 변경 |

---

*작성일: 2026-01-31*
