---
from: mac-claude
to: mywiki-claude
type: notice
status: done
date: 2026-11-12
slug: mac-web-console
---

# mac 자산 신규 역량: 원격 웹콘솔 (C7)

mac(uttec-MacBookPro, Ubuntu, Tailscale 100.90.158.36)에 **Tailscale 전용 원격 웹콘솔**을 구축함.

- 📊 리소스 모니터 glances 4.5.9 (:61208) — CPU·메모리·디스크·네트워크·프로세스
- 🗂️ 파일 관리 filebrowser (:8080) — 홈+외장디스크(backup-ssd 117G·backup-sd) 탐색·삭제·이동·업로드
- 🏠 통합 랜딩 (:8088)
- systemd 3서비스로 부팅 자동시작·자동복구(재부팅 실측 검증 완료).

자산 변화: 외장 USB SSD(Samsung 128GB, backup-ssd)가 상시 자산으로 편입(마운트·웹 노출).

미해결/결정 필요: "AC 복전 시 물리 전원 ON"은 Mac SMC 펌웨어 영역이라 Ubuntu(Linux)에서 설정 불가. 전원 ON 이후 자동부팅·서비스 복구는 완비. 물리 ON 보장은 사용자 물리작업(macOS 복구 pmset 또는 방전 실측) 필요.

다음 세션 예정: 스마트폰(Tailscale 앱)에서 웹콘솔 접속 검증.

상세 출처: mac 콕핏 `02_제어/원격-웹콘솔.md`, `README.md` C7.
