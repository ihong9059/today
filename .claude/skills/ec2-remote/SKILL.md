---
name: ec2-remote
description: AWS EC2 인스턴스에 원격으로 명령 실행. "EC2에서 ... 실행해줘", "서버에서 ... 확인해줘" 요청 시 사용
---

# EC2 Remote Command Execution Skill

AWS EC2 인스턴스에 원격으로 명령을 실행하는 skill입니다.

## 기본 설정

- **Instance ID**: i-0b0ce9012f3f23d24
- **Region**: ap-northeast-2 (서울)
- **OS User**: ec2-user
- **Public IP**: 15.164.220.60
- **관리자**: 홍광삼 (samks)

## 사용 방법

사용자가 EC2에서 명령 실행을 요청하면 **WSL을 통해** 다음 형식으로 실행:

### 단일 명령 실행
```bash
wsl -d Ubuntu -e bash -c "echo '<명령어>' | /mnt/c/Program\ Files/Amazon/AWSCLIV2/aws.exe ec2-instance-connect ssh --instance-id i-0b0ce9012f3f23d24 --region ap-northeast-2 --os-user ec2-user"
```

### 여러 명령 실행 (&&로 연결)
```bash
wsl -d Ubuntu -e bash -c "echo '<명령어1> && <명령어2>' | /mnt/c/Program\ Files/Amazon/AWSCLIV2/aws.exe ec2-instance-connect ssh --instance-id i-0b0ce9012f3f23d24 --region ap-northeast-2 --os-user ec2-user"
```

### 파일 생성/수정 (heredoc 사용)
```bash
wsl -d Ubuntu -e bash -c "cat << 'SCRIPT' | /mnt/c/Program\ Files/Amazon/AWSCLIV2/aws.exe ec2-instance-connect ssh --instance-id i-0b0ce9012f3f23d24 --region ap-northeast-2 --os-user ec2-user
sudo tee /path/to/file << 'EOF'
파일 내용
EOF
SCRIPT"
```

## 트리거 키워드

- "EC2에서 ... 실행해줘"
- "서버에서 ... 확인해줘"
- "인스턴스에서 ... 해줘"
- "원격으로 ... 실행"
- "EC2에 ... 설치해줘"
- "서버에 ... 배포해줘"

## 현재 설치된 서비스

- **Nginx**: 포트 80 (http://15.164.220.60)
- **Netdata**: 포트 19999 (http://15.164.220.60:19999)

## 주의사항

1. **WSL Ubuntu**가 설치되어 있어야 합니다.
2. AWS CLI가 Windows에 설치되어 있어야 합니다.
3. AWS 자격 증명이 설정되어 있어야 합니다.
4. IAM 사용자에게 `EC2InstanceConnect` 권한이 필요합니다.
5. 인터랙티브 명령(vim, top, nano 등)은 지원되지 않습니다.
6. 여러 명령을 실행하려면 `&&`로 연결하세요.
7. sudo가 필요한 명령은 `sudo`를 붙여야 합니다.
