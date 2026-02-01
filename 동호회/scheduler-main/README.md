# 대진표 생성기 (메인 버전)

## 설명
동호회 회원 데이터를 기반으로 배드민턴 대진표를 생성하는 웹 애플리케이션

## 포트
7000

## 주요 기능
- 실제 회원 데이터 기반 대진표 생성
- 라운드별 대진표 표시
- 실력 균형 매칭 (등급 기반)
- 동일 라운드 내 중복 경기 방지
- 연속 경기 제한
- 경기 통계 표시

## 파일 구조
```
scheduler-main/
├── app.py          # Flask 서버 메인
├── scheduler.py    # 대진표 생성 알고리즘
├── players.py      # 선수 데이터
├── create_pdf.py   # PDF 생성
└── templates/      # HTML 템플릿
```

## 실행
```bash
python app.py
```

## API
- GET `/` - 메인 페이지
- GET `/api/schedule` - 대진표 데이터 (JSON)
