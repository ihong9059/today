---
name: design
description: Behance 디자인 레퍼런스 검색 및 브라우저 열기. "디자인 레퍼런스", "Behance 검색", "디자인 참고" 요청 시 사용
---

# Behance 디자인 레퍼런스 Skill

Behance에서 디자인 레퍼런스를 검색하고 **브라우저를 열어 바로 보여줍니다**.

## 트리거 키워드

- "디자인 레퍼런스"
- "디자인 참고"
- "Behance 검색"
- "디자인 영감"
- "포트폴리오 참고"
- "UI/UX 레퍼런스"

## 실행 절차

### 1. 사용자 요청 파악

사용자가 원하는 디자인 분야 확인:
- UI/UX → `ui%2Fux`
- 그래픽 디자인 → `graphic%20design`
- 일러스트 → `illustration`
- 웹 디자인 → `web%20design`
- 로고/브랜딩 → `branding`
- 모션그래픽 → `motion%20graphics`
- 3D 아트 → `3d%20art`
- 사진 → `photography`
- 건축/인테리어 → `architecture`
- 광고 → `advertising`
- 일반 요청 → 메인 갤러리

### 2. 브라우저 열기 (핵심!)

**반드시 Bash 도구로 브라우저를 열어야 합니다:**

#### Windows (start 명령)
```bash
start "" "https://www.behance.net/search/projects?field={분야}"
```

#### 분야별 명령어 예시

**UI/UX 디자인:**
```bash
start "" "https://www.behance.net/search/projects?field=ui%2Fux"
```

**그래픽 디자인:**
```bash
start "" "https://www.behance.net/search/projects?field=graphic%20design"
```

**웹 디자인:**
```bash
start "" "https://www.behance.net/search/projects?field=web%20design"
```

**로고/브랜딩:**
```bash
start "" "https://www.behance.net/search/projects?field=branding"
```

**일러스트레이션:**
```bash
start "" "https://www.behance.net/search/projects?field=illustration"
```

**모션그래픽:**
```bash
start "" "https://www.behance.net/search/projects?field=motion%20graphics"
```

**3D 아트:**
```bash
start "" "https://www.behance.net/search/projects?field=3d%20art"
```

**사진/포토그래피:**
```bash
start "" "https://www.behance.net/search/projects?field=photography"
```

**메인 갤러리 (일반):**
```bash
start "" "https://www.behance.net/gallery"
```

**키워드 검색:**
```bash
start "" "https://www.behance.net/search/projects?search={검색어}"
```

### 3. 사용자에게 안내

브라우저를 연 후 간단히 안내:

```
Behance {분야} 페이지를 브라우저에서 열었습니다.

추천 검색 팁:
- Featured 배지 필터로 우수작만 보기
- Sort by Appreciations로 인기순 정렬
- Color 필터로 원하는 색상 톤 검색
```

## 분야별 URL 매핑

| 요청 키워드 | URL 파라미터 |
|------------|-------------|
| UI, UX, UI/UX, 앱 디자인 | `field=ui%2Fux` |
| 그래픽, 그래픽 디자인 | `field=graphic%20design` |
| 웹, 웹 디자인, 웹사이트 | `field=web%20design` |
| 로고, 브랜딩, 브랜드 | `field=branding` |
| 일러스트, 그림 | `field=illustration` |
| 모션, 모션그래픽, 애니메이션 | `field=motion%20graphics` |
| 3D, 3D 아트 | `field=3d%20art` |
| 사진, 포토, 포토그래피 | `field=photography` |
| 건축, 인테리어 | `field=architecture` |
| 광고, 광고 디자인 | `field=advertising` |
| 대시보드 | `search=dashboard%20design` |
| 랜딩페이지 | `search=landing%20page` |
| 이커머스, 쇼핑몰 | `search=ecommerce%20ui` |

## 추가 레퍼런스 사이트 열기 (요청 시)

```bash
# Dribbble
start "" "https://dribbble.com/shots/popular"

# Mobbin (모바일 앱 UI)
start "" "https://mobbin.com/browse/ios/apps"

# Collect UI
start "" "https://collectui.com"
```

## Behance 정보

- **운영**: Adobe
- **특징**: 세계 최대 크리에이티브 포트폴리오 플랫폼
- **배지 시스템**: 큐레이팅 팀이 매일 우수작 선정 (파란색 > 금색)
- **장점**: 높은 퀄리티, 글로벌 트렌드 파악

## 참고

- Behance는 핀터레스트, 드리블과 함께 "디자이너 레퍼런스 삼대장"
- 배지 획득 작품은 특히 퀄리티가 높음
- Featured 필터 사용 권장
