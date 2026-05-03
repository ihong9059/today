# AWS Cloud 설치 및 사용 가이드

## 1. AWS(Amazon Web Services)란?
- 아마존이 제공하는 클라우드 컴퓨팅 서비스
- 서버, 스토리지, 데이터베이스 등 IT 인프라를 인터넷으로 대여
- 필요한 만큼만 사용하고 사용한 만큼만 비용 지불
- AI 교육에서는 주로 EC2(가상 서버)와 S3(파일 저장소)를 사용

## 2. AWS 계정 만들기

### 2.1 가입 절차
1. https://aws.amazon.com 접속
2. "무료 계정 생성" 클릭
3. 이메일, 비밀번호, 계정 이름 입력
4. 연락처 정보 입력 (개인/비즈니스 선택)
5. 결제 정보 입력 (신용카드/체크카드 필수 - 프리티어 사용 시 과금 안 됨)
6. 휴대폰 인증
7. 지원 플랜: Basic(무료) 선택

### 2.2 프리 티어 (무료 범위)
- EC2: t2.micro 1대 월 750시간 (12개월)
- S3: 5GB 저장 (12개월)
- Lambda: 월 100만 회 호출 (영구)
- 주의: 프리 티어 초과 시 과금 발생!

## 3. AWS CLI 설치

### 3.1 Windows 설치
```bash
# winget으로 설치
winget install Amazon.AWSCLI

# 또는 직접 다운로드
# https://awscli.amazonaws.com/AWSCLIV2.msi
```

### 3.2 설치 확인
```bash
aws --version
```

### 3.3 AWS CLI 설정
```bash
aws configure
```
입력 항목:
- AWS Access Key ID: (IAM에서 발급)
- AWS Secret Access Key: (IAM에서 발급)
- Default region: ap-northeast-2 (서울)
- Output format: json

### 3.4 IAM 사용자 및 Access Key 발급
1. AWS 콘솔 > IAM > 사용자 > 사용자 추가
2. 사용자 이름 입력
3. "프로그래밍 방식 액세스" 체크
4. 권한: AdministratorAccess (학습용) 또는 필요한 정책만
5. Access Key ID / Secret Access Key 복사 저장 (한 번만 보임!)

## 4. EC2 (가상 서버) 사용법

### 4.1 인스턴스 생성
1. AWS 콘솔 > EC2 > "인스턴스 시작"
2. 이름 지정 (예: my-ai-server)
3. AMI: Amazon Linux 2023 또는 Ubuntu 22.04
4. 인스턴스 유형: t2.micro (프리 티어)
5. 키 페어: 새로 생성 (.pem 파일 다운로드 - 잃어버리면 안 됨!)
6. 보안 그룹: SSH(22번 포트) 허용
7. "인스턴스 시작" 클릭

### 4.2 인스턴스 접속 (SSH)
```bash
ssh -i "내키페어.pem" ec2-user@퍼블릭IP
# Ubuntu의 경우
ssh -i "내키페어.pem" ubuntu@퍼블릭IP
```

### 4.3 인스턴스 관리
```bash
# 시작
aws ec2 start-instances --instance-ids i-인스턴스ID

# 중지 (비용 절감)
aws ec2 stop-instances --instance-ids i-인스턴스ID

# 종료 (완전 삭제)
aws ec2 terminate-instances --instance-ids i-인스턴스ID
```

## 5. S3 (파일 저장소) 사용법

### 5.1 버킷 생성
```bash
aws s3 mb s3://my-bucket-name --region ap-northeast-2
```

### 5.2 파일 업로드/다운로드
```bash
# 업로드
aws s3 cp 로컬파일 s3://버킷명/경로/

# 다운로드
aws s3 cp s3://버킷명/경로/파일 ./로컬경로/

# 폴더 전체 동기화
aws s3 sync ./로컬폴더 s3://버킷명/폴더/
```

## 6. 비용 관리 (중요!)

### 6.1 Billing 알림 설정
1. AWS 콘솔 > Billing > Budgets
2. "예산 생성" > 월 $5 초과 시 이메일 알림

### 6.2 사용하지 않는 리소스 정리
- EC2 인스턴스 중지/종료
- 불필요한 EBS 볼륨 삭제
- S3 불필요한 파일 삭제

### 6.3 프리 티어 사용량 확인
- AWS 콘솔 > Billing > Free Tier 사용량 대시보드

## 7. Claude Code와 AWS 연동
- Claude Code에서 aws CLI 명령 실행 가능
- "EC2 인스턴스 상태 확인해줘" → aws ec2 describe-instances 실행
- SSH 접속 후 원격 서버에서 작업 가능

## 8. 자주 묻는 질문
- Q: 프리 티어 초과하면 어떻게 되나요? → 자동 과금. Billing 알림 필수 설정!
- Q: 리전(지역)은 어디를 선택? → 한국 사용자는 ap-northeast-2 (서울)
- Q: EC2를 종료하면 데이터가 사라지나요? → 네, EBS를 별도 보관하지 않으면 삭제됨
- Q: 서버를 24시간 켜두면? → t2.micro 프리 티어 한 달 약 $0, 초과 시 월 ~$8

## 9. 다음 단계
- [06_Google_Colab_사용법.md](06_Google_Colab_사용법.md) - Google Colab 사용법 알아보기
