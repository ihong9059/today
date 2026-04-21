# Obsidian에서 Flowchart 보는 방법

## 1. Vault 열기

1. Obsidian 실행
2. 좌하단 **Vault 이름** 클릭 → **"보관함 관리하기..."** 클릭
3. **"폴더를 보관함으로 열기"** (Open folder as vault) 선택
4. `C:\todo\revitaProject` 폴더 선택 → **열기**

## 2. Flowchart 파일 찾기

좌측 파일 탐색기에서:
```
zephyr_workspace → apps → flowChart → system_flowchart.md
```

## 3. 다이어그램 보기

파일을 열면 두 가지 모드가 있습니다:

| 모드 | 전환 단축키 | 다이어그램 표시 |
|------|-----------|---------------|
| **읽기 모드** (Reading view) | `Ctrl + E` | Mermaid 다이어그램이 **그림으로 렌더링**됨 |
| **편집 모드** (Editing view) | `Ctrl + E` | 코드 블록으로 보임 (텍스트 편집 가능) |

> **읽기 모드로 전환하면 8개 다이어그램이 모두 그래픽으로 표시됩니다.**

## 4. 다이어그램 수정 방법

1. `Ctrl + E`로 **편집 모드** 전환
2. ` ```mermaid ` 블록 안의 텍스트를 수정
3. `Ctrl + E`로 **읽기 모드** 전환하면 변경사항 즉시 반영

### Mermaid 문법 간단 가이드

```
flowchart TD          ← TD: 위→아래, LR: 왼→오른
    A[사각형] --> B[사각형]       ← 기본 연결
    A --> |라벨| B                ← 라벨 있는 연결
    C{다이아몬드}                 ← 조건 분기
    D((원형))                    ← 원형 노드
    subgraph 그룹명              ← 그룹 묶기
        E --> F
    end
    style A fill:#색상,color:#글자색  ← 스타일 지정
```

## 5. 이미지 내보내기

- 읽기 모드에서 다이어그램 위 **우클릭** → **"이미지로 복사"**
- 다른 문서(Word, PPT 등)에 붙여넣기 가능

## 6. 참고

- Mermaid는 Obsidian **기본 내장** 기능 (플러그인 설치 불필요)
- Obsidian 버전 1.0 이상이면 모두 지원
- 공식 Mermaid 문법: https://mermaid.js.org/
