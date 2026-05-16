# {프로젝트명} sub-vault — Claude 가이드

> **Tier 2 sub-vault** — 본 폴더는 한 프로젝트의 격리된 위키 공간이다. myWiki와 별개로 시공·진행·결정을 단계별로 박제한다.

## 본 sub-vault의 역할

1. **단계별 박제** — 시공/개발/협상 단계마다 `log.md`에 박제 (today repo log와 분리)
2. **결정 기록** — 기술 트레이드오프·계약 조항 등은 `thoughts/{분기}/`에
3. **객체 관리** — 현장·발주자·핵심 자재 등은 `entities/`에
4. **완료 시 흡수 대상** — 프로젝트 완료 시 핵심 자산을 myWiki로 흡수 + `archive/`로 산출물 이전

## myWiki와의 관계

- 본 sub-vault는 **myWiki의 자식**이 아니다. **별개 공간**이다.
- 단, myWiki entity가 본 sub-vault를 cross-link로 참조한다: `today/myWiki/.../entities/{프로젝트명}.md → [[wiki/log]]`
- 작업 중 사업·기술 자산화 가치가 보이면 myWiki entity에 즉시 반영 (today CLAUDE.md "today/ 신규 폴더 → myWiki entity 검토 정책" 참조)

## 작성 규칙

### log.md (single source of truth)

```markdown
## [YYYY-MM-DD] {action} | 한 줄 요약
- 상세 1
- 상세 2
- 결과: ...
```

action 종류:
- `start` — 프로젝트 시작
- `decision` — 의사결정 박제
- `purchase` — 자재 발주
- `site` — 현장 답사·시공
- `firmware` — 펌웨어/소프트웨어 작업
- `revenue` — 수주·매출 발생
- `milestone` — 마일스톤 달성
- `complete` — 프로젝트 완료
- `absorb` — myWiki로 자산 흡수

### entities/

- 한 객체 = 한 파일 (`entity-{이름}.md`)
- 프론트매터: `title`, `type: entity`, `created`, `updated`, `tags`, `links`
- 본 sub-vault 내부 link는 `[[entity-{이름}]]` 형식

### thoughts/{분기}/

- 결정·인사이트 페이지 (`YYYY-MM-DD_제목.md`)
- 분기별 sub-folder 적용 (myWiki 동일 정책)

### archive/

- 프로젝트 완료 후 산출물 이전 (PDF·이미지·CSV 등)
- 불변 처리, 본문 추가 작성 금지

## 라이프사이클

```
[1. 프로젝트 시작]
   wiki/log.md에 start 박제
   wiki/entities/ 핵심 entity 1~2개 신설
   myWiki entity 신설 + cross-link

[2. 진행]
   단계별 log 박제 (decision/purchase/site/...)
   thoughts/{분기}/ 결정 기록
   필요 시 entities/ 확장

[3. 완료]
   wiki/log.md에 complete 박제
   myWiki entity에 결과 흡수 (매출·만족도·다음 영업)
   skills.md / 영업전략.md / 회사소개.md 갱신 검토

[4. archive]
   wiki/archive/ 로 산출물 이전 (불변)
   wiki/ 폴더는 보존 (재사용·참조용)
```

## 승격 (Tier 2 → Tier 3)

다음 조건 충족 시 별도 repo로 분리 검토:
- 파일 수 ≥ 50개
- 6개월 이상 활성 진행
- 자체 코드베이스 (펌웨어·앱) 보유
- 다른 호스트(Ubuntu/RPi)에서 작업 필요

분리 절차는 `obsidian/myWikiSetup/EXAMPLES_*.md` 참조 (분리 lifecycle 3단계 진화 패턴).
