---
name: 3-vault 분리 운영 (myWiki + uttecBizWiki + onDevice_AI)
description: 사용자 second-brain은 3개 vault로 분리 운영. 작업 요청 시 어느 vault에 속하는지 먼저 판단 후 진행
type: project
originSessionId: b3245c42-bf7b-4dd3-a682-cd49deb90641
---
사용자는 `C:\todo\today\` 안에 **3개 vault를 분리 운영**한다 (2026-05-07 결정).

| vault | 역할 | scope |
|---|---|---|
| `myWiki/second-brain/` | 학습+개인+도구+모든 사업 영역 통합 | second-brain (영구, 매일) |
| `uttecBizWiki/` | **onDevice AI 제품 비즈니스 전용** | AI FanStick 차세대 + Stage 4 패키지 |
| `onDevice_AI/` | 같은 제품의 **기술 검증** (단기) | ESP32-S3 + microGPT 검증 |

**Why:** 기술↔비즈니스 분리 + 외부 공개 안전. uttecBizWiki는 사용자가 명확히 "onDevice_AI 개발 제품에 대해서만 진행, 다른 biz는 관여하지 않음"이라 정정함 (5/7 18:05).

**How to apply:**

### 작업 분류 기준 (어느 vault?)

```
사용자 요청 도착 → "이 작업은 무엇에 관한가?"
   ├── AI FanStick 차세대 / Stage 4 비즈니스 (영업·매출·고객·시장)
   │      → uttecBizWiki/
   ├── ESP32-S3 + microGPT 기술 검증 (코드·실측·포팅)
   │      → onDevice_AI/
   └── 그 외 모든 작업 (학습·도구·다른 사업·다른 제품)
          → myWiki/second-brain/
```

### 결정 트리 (헷갈리는 케이스)

| 케이스 | 어디에 |
|---|---|
| 한국기계 Stage 4 견적·미팅 | uttecBizWiki/ |
| 한국기계 Stage 0·1·2·3 일반 영업 | 영업/ + myWiki |
| 위시캣 임베디드 IoT 공고 (Stage 4 매핑되면) | uttecBizWiki + myWiki/위시캣활동 둘 다 |
| 위시캣 일반 신규 공고 검토 | myWiki/위시캣활동 |
| K-POP HYBE 라이센스 컨택 | uttecBizWiki/ |
| AI FanStick 차세대 펌웨어 작업 | onDevice_AI/ |
| ESP32-S3 microGPT 포팅 | onDevice_AI/ |
| 강사양성 시범 운영 | aiStudy/.../강사양성_파일럭/ + myWiki |
| 디지털배움터 강사 신청 | 영업/정부지원_교육사업/ |
| obsidian 강의 모듈 작성 | obsidian/강의모듈_2~3h/ |
| 새로운 학습·연구 | myWiki |
| 새 사업 라인 검토 (자영업 AI 등) | myWiki/entities (새 entity) |

### Claude 작업 시 주의

- **새 파일 만들 때**: 위 결정 트리로 정확한 vault 결정 후 그 vault의 폴더 안에 배치
- **vault 이동 금지**: 같은 항목을 두 vault에 중복 작성하지 않기 (cross-link로 연결만)
- **각 vault의 CLAUDE.md 참조**: vault별 운영 규칙 다름
- **uttecBizWiki에 다른 사업 영역 추가 금지**: 위시캣 일반·강사양성·정부지원 등은 절대 본 vault에 추가하지 않음

### vault 간 cross-link 흐름

```
[onDevice_AI] → 검증 결과 → [uttecBizWiki] → 영업 수주 → [onDevice_AI] 다음 사이클
                                          ↕
                            [myWiki entities/uttec-stage-package, ai-fanstick]
                            (큰그림에서 두 vault 모두 참조)
```

### 옵시디언 vault 등록 (사용자 직접)

세 vault를 옵시디언 앱에서 별도 vault로 열거나, myWiki 한 vault에서 raw junction으로 본 폴더 모두 접근 (둘 다 가능). myWiki/second-brain/raw/onDevice_AI, raw/uttecBizWiki junction은 2026-05-07 자동 생성됨.
