---
name: lesson-video-url
description: AI 교육 웹 레슨의 YouTube 비디오 URL 업데이트. "3-8에 URL 연결해줘", "레슨 X-Y URL 업데이트" 요청 시 사용합니다. (project)
---

# 레슨 비디오 URL 업데이트 Skill

## 사용 방법

사용자가 다음과 같이 요청할 때 사용:
- "https://youtu.be/xxx 를 lesson X-Y에 연결해줘"
- "레슨 X-Y URL을 xxx로 업데이트해줘"
- "X-Y 비디오 URL 변경"

---

## 파일 위치

```
커리큘럼 파일: C:/todo/today/aiStudy/ai-education-web/src/data/curriculum.ts
```

---

## 작업 단계

### Step 1: 레슨 ID 확인

사용자가 제공하는 정보:
- **레슨 ID**: "X-Y" 형식 (예: "3-8", "2-5")
- **YouTube URL**: 다양한 형식 지원
  - `https://youtu.be/VIDEO_ID`
  - `https://www.youtube.com/watch?v=VIDEO_ID`
  - `https://youtube.com/watch?v=VIDEO_ID`

### Step 2: curriculum.ts에서 레슨 찾기

```bash
# 레슨 찾기
grep -n 'id: "X-Y"' C:/todo/today/aiStudy/ai-education-web/src/data/curriculum.ts
```

### Step 3: videoUrl 업데이트

curriculum.ts 파일에서 해당 레슨의 `videoUrl` 필드를 업데이트합니다.

**변경 전:**
```typescript
{
  id: "X-Y",
  title: "레슨 제목",
  description: "설명",
  duration: "4분",
  videoUrl: "기존URL",
  content: `...`
}
```

**변경 후:**
```typescript
{
  id: "X-Y",
  title: "레슨 제목",
  description: "설명",
  duration: "4분",
  videoUrl: "새로운URL",
  content: `...`
}
```

### Step 4: 확인 메시지

업데이트 완료 후 사용자에게 알려줍니다:
```
레슨 X-Y의 videoUrl을 업데이트했습니다.
이전: [기존URL]
현재: [새URL]
```

---

## 예시

### 입력
```
https://youtu.be/c6-4t7dwyhE 를 lesson 3-8에 link해 주세요
```

### 처리
1. 레슨 ID: `3-8`
2. YouTube URL: `https://youtu.be/c6-4t7dwyhE`
3. curriculum.ts에서 `id: "3-8"` 찾기
4. `videoUrl` 필드 업데이트

### 출력
```
레슨 3-8의 videoUrl을 업데이트했습니다.
이전: https://www.youtube.com/watch?v=aircAruvnKk
현재: https://youtu.be/c6-4t7dwyhE
```

---

## 레슨 구조 참고

```typescript
interface Lesson {
  id: string;          // "X-Y" 형식 (예: "3-8")
  title: string;       // 레슨 제목
  description: string; // 설명
  duration: string;    // 예상 시청 시간
  videoUrl?: string;   // YouTube URL (이 필드를 업데이트!)
  content?: string;    // 학습 내용 (마크다운)
}
```

---

## 주의사항

1. **URL 형식**: 모든 YouTube URL 형식 허용 (youtu.be, youtube.com)
2. **빈 URL**: videoUrl이 비어있거나 ""인 경우에도 업데이트 가능
3. **확인 필수**: 업데이트 전 해당 레슨이 존재하는지 확인
4. **웹 서버**: 이미 실행 중이면 자동으로 반영됨 (Hot Reload)
