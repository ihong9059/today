---
name: feedback_read_project_readme_first
description: 하드웨어/펌웨어 작업 전 프로젝트 README·wiki/log 먼저 읽기 — 함정·SOP 기존재
metadata: 
  node_type: memory
  type: feedback
  originSessionId: ba7dc0dd-4cba-448a-a400-efd3e4d119d7
---

🚨 **하드웨어/펌웨어 작업(빌드·flash·설정) 시작 전, 그 프로젝트의 `firmware/README.md`·`wiki/log.md`를 먼저 읽을 것.** 함정·결선·설정 SOP가 이미 박제돼 있는 경우가 많음.

**Why:** 2026-06-13 한림용인CC TX hardware test 중, (1) 한글 경로 cmake crash(3221226505)를 "발견"했는데 `firmware/README.md`에 이미 "ASCII 경로 빌드 필요"로 문서화돼 있었음. (2) E22 자동 config "응답 없음(read 0 bytes)" 증상도 README 트러블슈팅에 기존재했는데 모른 채 blind-write를 제안하며 헤맴. (3) 사용자가 "전 세션에서 값 읽어서 보내는 program 만들었으니 다시 확인하라"고 두 번 지적 → `lora_read_reg`가 wiki/log·README에 명시돼 있었음. 사용자 신뢰 저하 + 시간 낭비.

**How to apply:**
- 펌웨어/하드웨어 작업 첫 액션 = 해당 프로젝트 `README.md`·`firmware/README.md`·`wiki/log.md` grep/read. 빌드 명령·결선표·기존 펌웨어 목록·트러블슈팅을 거기서 확보.
- 기존 펌웨어/도구가 있으면 새로 만들지 말 것 ([[feedback_reuse_existing_code]] · [[feedback_hwtest_flash_existing_hex]]).
- 같은 증상을 "발견"하기 전에 "이미 문서에 있나?" 먼저 확인. 사용자가 "전 세션에 했다/어딘가 있다"고 하면 짐작 말고 grep으로 찾을 것 ([[feedback_dont_assume_ask_when_unclear]]).
