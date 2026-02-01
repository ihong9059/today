# 배드민턴 동호회 프로젝트

## 폴더 구조

```
동호회/
├── scheduler-main/     # 대진표 생성기 (메인 버전)
├── general/            # 대진표 생성기 (일반 버전)
├── club/               # 동호회 웹사이트 (종합)
├── docs/               # 문서 및 기획서
└── README.md           # 이 파일
```

## 프로젝트 설명

### 1. scheduler-main (대진표 생성기 - 메인)
- **포트**: 5001
- **URL**: http://localhost:5001
- **설명**: 동호회 회원 데이터 기반 대진표 생성
- **특징**: 라운드별 대진표, 실력 균형 매칭, 연속 경기 제한
- **실행**: `cd scheduler-main && python app.py`

### 2. scheduler-general (대진표 생성기 - 일반)
- **포트**: 5002
- **URL**: http://localhost:5002
- **설명**: 샘플 데이터로 테스트 가능한 일반 버전
- **특징**: 인원수/남녀비율 입력으로 샘플 데이터 생성
- **실행**: `cd scheduler-general && python app.py`

### 3. club (동호회 웹사이트)
- **포트**: 8000
- **URL**: http://localhost:8000
- **설명**: 동호회 종합 웹사이트
- **기능**:
  - 회원 관리 (가입/승인/등급)
  - 게시판 (공지, 자유, 가입인사, 건의)
  - 갤러리 (앨범/사진)
  - 일정 관리 (참석 응답)
  - 대진표 생성 (등급별 인원 기반)
- **기본 계정**: admin@club.com / admin123
- **실행**: `cd club && python run.py`

### 4. docs (문서)
- 계획서.html: 동호회 웹사이트 개발 계획서
- 인원배치.md/pdf: 대진표 알고리즘 설명
- prompt.txt: 개발 요구사항

## 기술 스택
- Backend: Python, Flask
- Frontend: HTML, CSS, JavaScript, Bootstrap 5
- Database: SQLite (club), 메모리 (scheduler)

## 실행 방법

```bash
# 대진표 생성기 (메인)
cd scheduler-main
python app.py
# http://localhost:5001

# 대진표 생성기 (일반)
cd scheduler-general
python app.py
# http://localhost:5002

# 동호회 웹사이트
cd club
python run.py
# http://localhost:8000
```

## 최종 수정일
2026-02-01
