---
name: project_device_lab_vault
description: device-lab — PC 연결 주변기기(스마트폰 등) util 제어·조회 기능 검증 vault
metadata: 
  node_type: memory
  type: project
  originSessionId: 829e0a4f-03f4-467f-ac89-8798f2e6dc1f
---

`C:\todo\device-lab`(Tier 1 standalone, broker·registry 미등재 — [[project_jev_lab_poc]] 패턴 계승) 2026-11-09 신설. **목적**: PC에 연결된 주변기기(USB 스마트폰·기타 장치)를 util로 제어·조회하는 기능을 하나씩 검증하고 재사용 SOP를 박제. 고객 프로젝트 아닌 내부 R&D·tooling 실험.

- **첫 use case**: USB 연결된 삼성 Galaxy Quantum3("광선의 Quantum3", ADB 활성 확인) → SMS 최근 내용 조회·정리 → 추가 메시지 발송. (Galaxy A51 5G는 BT 오디오만, USB 아님 — 혼동 주의)
- **구조**: CLAUDE.md(규칙·Tier·안전원칙) / README.md(기능 카탈로그 A0~A7·단일출처) / 00_참고(도구설치=ADB·scrcpy) / 01_기능/smartphone / 02_데이터(개인정보 gitignore 로컬전용 🔒) / 03_결과(검증 로그).
- **진행**: Phase 0 기기인식 ✅(PnP). 다음=Phase 1 ADB 셋업(platform-tools 설치 미완)→Phase 2 SMS 조회→Phase 3 발송.
- **안전원칙**: 개인정보(SMS·연락처) 원격/git 동기화 금지, 발송·삭제 등 쓰기작업은 사용자 승인 후 1건씩, 미검증 방법은 `(검증 전)` 명시. [[feedback_verify_deliverable_end_to_end]] 적용(직접 실행 확인 후 검증 선언).
- 유효 기능 축적 시 Tier 2 승격(번호 vault 등록·myWiki entity). 자체 로컬 git(remote 없음), today repo와 분리.
