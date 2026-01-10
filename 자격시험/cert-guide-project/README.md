# 자격시험 가이드 프로젝트 (cert-guide)

## 프로젝트 개요
- **웹사이트**: https://uttec-cert.duckdns.org/
- **서버**: AWS EC2 (52.78.119.132)
- **프레임워크**: Next.js 16.1.1 with Turbopack
- **프로세스 관리**: PM2

## 서버 접속 정보
```bash
# SSH 접속 명령어 (옵션 필수!)
ssh -i "uttec-first-ec2.pem" -o PubkeyAcceptedKeyTypes=+ssh-rsa ec2-user@52.78.119.132

# 프로젝트 경로
~/cert-guide/
```

## 로컬 폴더 구조
```
C:/todo/today/자격시험/cert-guide-project/
├── README.md               # 이 파일
├── uttec-first-ec2.pem     # SSH 접속 키
├── docs/                   # 문서 (12개)
│   ├── 유료화_검토_보고서.md
│   ├── 유료화_검토_보고서_단건결제.md
│   ├── 서버_리소스_및_작업전략_리포트.md
│   ├── 인기자격시험_순위.md
│   ├── 자격시험가이드list.md
│   ├── 자격시험-가이드-작업방법.md
│   ├── 자격시험-가이드-작업지시서.md
│   ├── 사이트_구조.md
│   ├── 기계_전기_전자_자격시험_목록.md
│   ├── 자격시험_웹사이트_설계서.md
│   ├── 자격시험List.md
│   └── 전기기사_상세정보_샘플.md
├── scripts/                # 생성 스크립트 (3개)
│   ├── generate_accounting.py
│   ├── generate_finance.py
│   └── generate_legal.py
├── templates/              # tsx 템플릿 파일 (71개)
│   ├── app-page.tsx
│   ├── home-page.tsx
│   ├── electric-engineer-page.tsx
│   └── ... (새 페이지 작성 시 참고)
└── category-data/          # 카테고리별 데이터 (19개 폴더)
    ├── ab_modify/          # 배포 대기 페이지들
    ├── accounting/
    ├── agriculture/
    ├── chemistry/
    ├── civil/
    ├── construction/
    ├── design/
    ├── driving/
    ├── education/
    ├── finance/
    ├── insurance/
    ├── it/
    ├── legal/
    ├── medical/
    ├── office/
    ├── safety/
    ├── service/
    ├── trade/
    └── welfare/
```

## EC2 서버 구조
```
~/cert-guide/
├── app/
│   ├── components/
│   │   ├── Header.tsx              # 로그인/로그아웃 헤더
│   │   └── LoginRequiredModal.tsx
│   ├── contexts/
│   │   └── AuthContext.tsx         # 인증 상태 관리 (isPaid 포함)
│   ├── category/                   # 20개 분야
│   │   ├── legal/                  # 법률 (로그인+결제 체크)
│   │   ├── accounting/             # 회계·세무
│   │   ├── finance/                # 금융
│   │   ├── it/                     # IT·정보통신
│   │   └── ...
│   ├── login/page.tsx
│   └── signup/page.tsx
└── package.json
```

## 로그인/결제 시스템 현황
- **인증 방식**: localStorage 기반 클라이언트 인증
- **로그인 체크**: 모든 카테고리 AI 버튼에 적용
- **결제 체크**: 법률(legal) 카테고리에만 적용 (테스트용)
  - 로그인 시 자동으로 isPaid=true 설정
  - 향후 실제 결제 시스템 연동 예정

## 주요 명령어
```bash
# PM2 상태 확인
pm2 list

# 서비스 재시작
pm2 restart cert-guide

# 빌드 (변경 후)
cd ~/cert-guide && rm -rf .next && npm run build

# 로그 확인
pm2 logs cert-guide
```

## 작업 흐름
1. 로컬 `templates/`에서 유사한 tsx 파일 참고
2. SSH로 EC2 접속
3. EC2 `~/cert-guide/app/category/`에서 파일 생성/수정
4. `npm run build && pm2 restart cert-guide`
5. 웹사이트에서 확인

## 최근 작업 이력
- 2026-01-10: 로그인/결제 시스템 구현, 프로젝트 파일 통합 정리
- 2026-01-09: IT 카테고리 URL 수정, 물류관리사/무역영어 페이지 추가

## 다음 세션 참고사항
1. SSH 접속 시 `-o PubkeyAcceptedKeyTypes=+ssh-rsa` 옵션 필수
2. 법률 카테고리만 결제 체크 적용됨 (다른 카테고리는 로그인만 체크)
3. 결제 연동 시 AuthContext.tsx의 isPaid 로직 수정 필요
4. 새 페이지 작성 시 `templates/` 폴더의 tsx 파일 참고
