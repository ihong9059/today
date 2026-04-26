# Day 5: 파일 처리 + 데이터 분석 — "CSV 파일을 열고 그래프로 보자"

## 학습 목표
- Python으로 텍스트 파일과 CSV 파일 읽기/쓰기
- pandas 라이브러리로 데이터 분석 기초 익히기
- matplotlib로 간단한 그래프 시각화
- Claude Code에게 데이터 분석 코드를 요청하는 방법 학습

## 준비물
- Day 1-4에서 설정한 개발 환경
- 인터넷 연결 (패키지 설치용)

---

## 실습 1: 파일 읽기/쓰기 기초 (10분)

1. Claude Code에게 요청:
```
Python 파일 처리를 배우기 위한 file_io.py를 만들어줘.
1. 텍스트 파일 쓰기 (open + write 모드)
2. 텍스트 파일 읽기 (open + read 모드)
3. with 문을 사용한 안전한 파일 처리
4. 파일에 줄 단위로 추가하기 (append 모드)
5. readlines()로 리스트로 읽기
각 모드(w, r, a)의 차이를 주석으로 설명해줘.
```

2. Claude Code에게 질문:
```
with open() 패턴을 쓰는 이유가 뭐야?
파일을 close() 안 하면 어떤 문제가 생길 수 있어?
```

### 관찰 포인트
- open() 함수의 모드(w, r, a) 차이
- with문이 자동으로 파일을 닫아주는 원리

---

## 실습 2: CSV 파일 처리 (15분)

1. Claude Code에게 요청:
```
CSV 파일을 다루는 csv_practice.py를 만들어줘.
1. 먼저 샘플 데이터를 CSV로 생성해줘:
   - sales_data.csv: 월별 매출 데이터 (월, 매출액, 비용, 이익) 12개월치
2. csv 모듈로 CSV 읽기
3. csv.DictReader로 딕셔너리 형태로 읽기
4. 데이터에서 총 매출, 평균 이익, 최대 매출 월 계산
5. 결과를 새 CSV 파일(summary.csv)로 저장
```

2. 생성된 CSV 파일을 VS Code에서 열어 확인

### 관찰 포인트
- CSV(Comma-Separated Values)가 데이터 교환의 표준 포맷인 이유
- csv 모듈과 DictReader의 차이

---

## 실습 3: pandas로 데이터 분석 (20분)

1. pandas 설치 및 코드 요청:
```bash
pip install pandas matplotlib
```

```
pandas와 matplotlib를 사용하는 data_analysis.py를 만들어줘.
sales_data.csv를 pandas로 분석해줘:
1. pd.read_csv()로 데이터 로드
2. df.head(), df.info(), df.describe() 출력
3. 총 매출, 평균 매출, 매출 표준편차 계산
4. 이익률(이익/매출*100) 컬럼 추가
5. 매출 기준 상위 3개월, 하위 3개월 출력
6. 월별 매출 추이 선 그래프 (matplotlib)
7. 매출 vs 비용 비교 막대 그래프
8. 그래프를 PNG 파일로 저장
한글 폰트 설정도 포함해줘 (Windows: 'Malgun Gothic').
```

2. 실행 후 그래프 확인:
```bash
python data_analysis.py
```

3. 추가 분석 요청:
```
분기별(Q1~Q4)로 매출 합계를 구하고, 원형 차트로 시각화해줘.
```

### 관찰 포인트
- pandas DataFrame이 엑셀 시트와 유사한 구조
- describe()로 한번에 통계 요약을 볼 수 있는 편리함
- matplotlib 그래프의 기본 구성 요소 (figure, axes, title, label)

---

## 실습 4: 실전 — 엑셀 데이터 분석 (15분)

1. Claude Code에게 요청:
```
실제 업무에서 쓸 수 있는 excel_report.py를 만들어줘.
1. 직원 출퇴근 기록 샘플 데이터 생성 (이름, 날짜, 출근시간, 퇴근시간) 50건
2. pandas로 분석:
   - 직원별 평균 근무시간
   - 야근(18시 이후 퇴근) 횟수
   - 주간/야간 근무시간 분포
3. 결과를 엑셀 파일(.xlsx)로 저장 (openpyxl 사용)
4. 직원별 근무시간 그래프 포함
```

2. 패키지 설치:
```bash
pip install openpyxl
python excel_report.py
```

### 관찰 포인트
- pandas의 to_excel()로 직접 엑셀 파일 생성 가능
- 날짜/시간 데이터를 다루는 방법 (pd.to_datetime)

---

## 과제

### 제출물: "나의 데이터 분석 리포트"

```markdown
# 나의 데이터 분석 리포트

## 분석 대상 데이터
- 파일명:
- 데이터 설명:
- 행 수 / 열 수:

## 분석 결과 요약
| 항목 | 값 |
|------|-----|
| 총 합계 | |
| 평균 | |
| 최대 | |
| 최소 | |

## 생성한 그래프
- 그래프 종류:
- 파일명:
- 그래프에서 발견한 인사이트:

## Claude Code 활용 기록
- 가장 유용했던 pandas 명령어 3가지:
- 데이터 분석 시 Claude Code에게 한 질문:
- 직접 수정한 부분:
```

---

## 강사 참고 사항
- pandas는 처음 보면 압도적일 수 있으므로 "엑셀의 프로그래밍 버전"이라고 설명
- matplotlib 한글 폰트 설정은 OS별로 다르므로 Windows 기준으로 통일
- 실습 데이터를 직접 만들도록 하여 "내 업무 데이터로도 할 수 있다"는 인식 형성
