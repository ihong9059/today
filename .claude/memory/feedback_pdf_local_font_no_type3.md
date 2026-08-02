---
name: feedback_pdf_local_font_no_type3
description: "HTML→PDF 생성 시 웹폰트 @import 금지·로컬 맑은고딕 사용 (Type3 폰트=PDF.js 렌더 오류 방지), fitz로 Type3 0 검증"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 1f804210-3b43-4b55-8300-45da5ac96294
---

HTML을 Chrome `--headless --print-to-pdf`로 PDF 렌더할 때 **Google Fonts `@import`(Noto Sans KR 등) 웹폰트를 쓰면 Chrome이 글자를 Type3 폰트로 임베드** → 브라우저 PDF 뷰어(PDF.js)에서 **"페이지를 렌더링하는 동안 오류가 발생했습니다"**로 열림 실패. 2026-08-02 광주 제안서에서 Type3 379개 → PDF.js 오류 박제.

**Why:** UTTEC PDF 파이프라인이 항상 "Type3 0건 검증"하는 이유가 이것. 웹폰트뿐 아니라 **컬러 이모지·`-webkit-background-clip:text` 그라디언트 텍스트·일부 특수기호(▸ U+25B8 등)**도 Type3 유발.

**How to apply:**
- 폰트: `@import` 웹폰트 제거 → `font-family:'Malgun Gothic','맑은 고딕',...` **로컬 설치 폰트** 사용 → Type3 0.
- 이모지: 제거하고 CSS 배지/이니셜/좌측 액센트 바로 대체.
- 그라디언트 텍스트: `-webkit-background-clip:text` 대신 단색.
- 특수 marker(▸ 등): 폴백되면 `»`·`·` 등 폰트 내장 글자로 교체.
- 검증: `python -c "import fitz; d=fitz.open(pdf); print(sum(1 for i in range(d.page_count) for f in d.get_page_fonts(i) if f[2]=='Type3'))"` → **0 확인 후 발송**.
- **PPTX→PDF는 PowerPoint COM(`SaveAs(path,32)`)** 쓰면 이모지 있어도 Type3 0 (Chrome 웹폰트 경로와 다름).
- 동영상: scenes.html(1920×1080)→Chrome PDF→fitz PNG 프레임 + edge-tts(ko-KR-InJoonNeural,rate+5%) 내레이션 + ffmpeg 합성. ffmpeg=`ffmpeg/ffmpeg-8.0.1-essentials_build/bin`.

관련: [[feedback_pdf_email_hybrid]]
