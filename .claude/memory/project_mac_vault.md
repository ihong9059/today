---
name: project_mac_vault
description: "mac 콕핏 vault(`C:\\todo\\mac`, mac-claude) — 원격 mac(중요 자산) 추적·관리·제어 로컬 콘솔. 2026-11-12 신설. work-start/end skill·myWiki cascade. mac 본체=~/vault(uttec-dev)"
metadata:
  node_type: memory
  type: project
---

**mac 콕핏 vault** — 이 PC(Windows `C:\todo\mac`, SELF_ID=`mac-claude`)에서 원격 mac을 **특별관리**하는 로컬 콘솔. 2026-11-12 사용자 지시로 신설("mac은 중요 자산 → myWiki 옆에서 지속 추적·제어").

**3역할**:
1. **추적** — mac 현지 본체([[project_uttec_dev_vault]]=`~/vault`)의 `log.md`·자산 상태를 `01_추적/`에 scp 미러·스냅샷. ssh 없이 진행 파악.
2. **관리** — mac 자산 현황(ncs/idaenc·esp·n8n·디스크)을 `README.md` 단일 출처로. 변화·이슈·결정은 myWiki로 cascade.
3. **제어** — 이 PC에서 원격 제어. **L1** mac 자체(`ssh mac`) / **L2** mac 경유 2-hop PC(`ssh mac "ssh host"`, known_hosts 24) / **L3** mac 연결 USB 보드(nRF DK·ESP, env 활성화)·ADB 폰. 🚨 **파괴적 명령(flash·reboot·rm·서비스stop)은 사용자 승인 후 1건씩** + 한글경로 금지.

**구성**: CLAUDE.md·README.md(단일출처)·`00_참고/호스트맵`·`01_추적`·`02_제어/제어-SOP`·`03_결과`·`_inbox` + `.claude/skills/{work-start,work-end}`. 자체 로컬 git(remote 없음). myWiki `raw/mac/` junction + broker LOCAL_VAULTS 등록(양방향, 11/12 vault-registry #29 29th).

**세션**: `/work-start`("mac 시작")=연결점검·`~/vault/log` pull·자산 스냅샷·다음할일 / `/work-end`("mac 마무리")=박제·README갱신·commit·cascade.

**Why**: mac 작업을 Windows에서 일괄 원격관리(반쪽)도 myWiki 통째 복제(split-brain)도 아닌, **"관리·제어는 로컬 콕핏 / 작업 본체는 mac 현지 / 지식 hub는 myWiki"** 3분리. 콕핏(여기)=사용자가 읽고 제어, 본체(mac `~/vault`)=현지 빌드·세션. **How to apply**: mac 추적·제어 = `C:\todo\mac`에서 claude 실행 후 `/work-start`. mac 현지 빌드·세션 = mac에서 `claude-vault`. 현재(11/12) 외부 보드/폰/테더PC 미연결 → 제어는 프레임워크(연결 시 가동). 관련 [[project_uttec_dev_vault]] · [[reference_uttec_plc_vault]](stale 정정) · [[reference_uttec_ubuntu_mac]] · [[feedback_ncs_build_cmd_autorun_conflict]](한글경로만 유의).
