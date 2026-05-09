---
name: 사전빌드 앱은 Flutter만 사용
description: 사전빌드 프로젝트의 모바일 앱은 Flutter(flutter_app)만 사용. Kotlin(PrebuiltApp)은 2026-04-18에 삭제함.
type: project
---

사전빌드 프로젝트의 모바일 앱은 **Flutter(flutter_app)만** 사용한다.

**Why:** Kotlin 앱과 Flutter 앱이 공존하면 혼란을 일으킴. 사용자가 Flutter로 통일 결정 (2026-04-18).

**How to apply:** 사전빌드 관련 앱 작업 시 항상 `aiHardStudy/사전빌드/flutter_app/`만 대상으로 한다. Kotlin 앱(PrebuiltApp)은 삭제되었으므로 언급하거나 재생성하지 않는다.
