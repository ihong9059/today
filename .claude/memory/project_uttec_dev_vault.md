---
name: project_uttec_dev_vault
description: "uttec-dev — mac(=ubuntu, 100.90.158.36) 개발 전용 standalone vault(~/vault). 2026-11-12 신설. 펌웨어 빌드/flash·n8n 현지 본부, 단일 myWiki로 _inbox cascade. 구 uttec-plc 후임"
metadata:
  node_type: memory
  type: project
---

**uttec-dev vault** — mac 개발 호스트의 현지 작업 본부. `~/vault`, SELF_ID=`uttec-dev-claude`. 2026-11-12 Windows mywiki-claude 주도 신설.

- **호스트**: uttec-MacBookPro (Mac→Ubuntu 22.04), **`ssh mac` = `ssh ubuntu` 동일 기체**, Tailscale 100.90.158.36. 개발 전용.
- **아키텍처 결정(옵션 C)**: "mac에 myWiki 복제(split-brain)" ❌ 가 아니라 **경량 dev vault + 단일 myWiki로 cascade**. myWiki는 유일 main hub 유지. uttec-factory·shield와 동급 분산 vault.
- **왜 mac 현지 vault인가**: 펌웨어 빌드/flash(NCS `~/ncs/idaenc_*`·ESP `~/esp`)·n8n은 mac에서 실행돼야 함. Windows에서 ssh 원격 파일조작만으론 로컬 컨텍스트(NCS 빌드 함정·세션 이어가기) 못 가짐.
- **세션**: `~/bin/claude-vault`(tmux 상주, 11/11 신설) — `claude-vault` attach/status/logs/kill. 재부팅·이탈 무관 이어가기.
- **cascade 배선**: `_inbox/outbox-staging/`에 `to: mywiki-claude` 카드 → Windows `pull-multi-agent-outbound.py`가 scp pull → `myWiki/_inbox/pending/`. 원격은 `sent-archived/`로 자동 이동. **2026-11-12 end-to-end 검증 완료**(broker 엔트리 stale `uttec-plc`→`uttec-dev` 교체). 단일 출처=`~/vault/README.md`.

**Why**: mac 작업을 Windows에서 일괄 원격관리(반쪽)도, myWiki 통째 복제(split-brain)도 아닌 분산설계 정합. 기존 18-vault/4-host 패턴 그대로. **How to apply**: mac 현지 개발 = 그 폴더서 `claude-vault`. 구 [[reference_uttec_plc_vault]](`~/uttec-plc` 소멸)의 후임. 전체 vault 단일출처 = [[project_3vault_분리]] vault-registry. 관련 [[reference_uttec_ubuntu_mac]] · [[feedback_broker_bidirectional_pattern]] · [[feedback_ncs_build_cmd_autorun_conflict]](mac은 AutoRun 무관, 한글경로만 유의).
