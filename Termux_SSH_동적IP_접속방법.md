# Termux SSH 동적 IP 접속 방법

**작성일:** 2025년 12월 16일

태블릿이 다른 라우터에 접속하여 IP 주소가 변경되었을 때 Windows PC에서 SSH 접속하는 방법입니다.

---

## 1. 태블릿에서 현재 IP 확인

태블릿의 Termux에서 다음 명령어로 IP를 확인합니다:

```bash
# 방법 1: ifconfig
ifconfig wlan0 | grep 'inet '

# 방법 2: ip 명령어
ip addr show wlan0 | grep 'inet '

# 방법 3: 간단하게 IP만 출력
hostname -I
```

**출력 예시:**
```
inet 192.168.1.105 netmask 255.255.255.0 broadcast 192.168.1.255
```
→ IP 주소: `192.168.1.105`

---

## 2. Windows PC에서 접속

확인한 IP로 SSH 접속:

```bash
ssh u0_a191@[확인한IP] -p 8022
```

**예시:**
```bash
ssh u0_a191@192.168.1.105 -p 8022
```

---

## 3. 자동화 방법

### 방법 A: 태블릿에서 IP 알림 스크립트

태블릿 Termux에서 IP가 바뀔 때마다 알림을 표시하는 스크립트:

```bash
# ~/bin/show-ip 파일 생성
cat > ~/bin/show-ip << 'EOF'
#!/data/data/com.termux/files/usr/bin/bash
IP=$(hostname -I | awk '{print $1}')
echo "현재 IP: $IP"
echo "SSH 접속: ssh u0_a191@$IP -p 8022"
termux-toast "IP: $IP"
termux-notification -t "Termux IP" -c "ssh u0_a191@$IP -p 8022"
EOF

chmod +x ~/bin/show-ip
```

**사용:**
```bash
show-ip
```

### 방법 B: Termux 시작 시 자동 IP 표시

`~/.bashrc`에 추가:

```bash
# IP 자동 표시
echo "========================================"
echo "현재 IP: $(hostname -I | awk '{print $1}')"
echo "SSH: ssh u0_a191@$(hostname -I | awk '{print $1}') -p 8022"
echo "========================================"
```

### 방법 C: 같은 네트워크에서 태블릿 찾기 (Windows)

Windows PC에서 네트워크 스캔으로 태블릿 찾기:

```powershell
# 방법 1: nmap 사용 (설치 필요)
nmap -p 8022 192.168.1.0/24

# 방법 2: PowerShell로 스캔
1..254 | ForEach-Object {
    $ip = "192.168.1.$_"
    if (Test-Connection -ComputerName $ip -Count 1 -Quiet) {
        Write-Host "Found: $ip"
    }
}
```

**참고:** 네트워크 대역이 `192.168.0.x`인 경우 `192.168.0.0/24`로 변경

---

## 4. 고급: 고정 IP 설정 (권장)

라우터 설정에서 MAC 주소 기반 고정 IP 할당:

1. 태블릿 MAC 주소 확인:
   ```bash
   ip link show wlan0 | grep ether
   ```

2. 라우터 관리 페이지 접속 (보통 192.168.0.1 또는 192.168.1.1)

3. DHCP 설정 → MAC 주소 바인딩 → 고정 IP 할당

---

## 5. 요약 (빠른 참조)

| 상황 | 해결 방법 |
|------|----------|
| IP 모름 | 태블릿에서 `hostname -I` 실행 |
| IP 확인 후 접속 | `ssh u0_a191@[IP] -p 8022` |
| 자주 바뀜 | 라우터에서 고정 IP 설정 |
| 같은 네트워크 필수 | PC와 태블릿이 같은 Wi-Fi에 연결 |

---

## 6. 주의사항

- **같은 네트워크 필수**: PC와 태블릿이 같은 Wi-Fi/라우터에 연결되어야 함
- **sshd 실행 필수**: 태블릿에서 `sshd` 명령으로 SSH 서버 시작
- **포트 8022**: Termux SSH는 기본 포트가 8022 (22번 아님)
- **방화벽**: 일부 공유기는 기기 간 통신을 차단할 수 있음 (AP 격리 기능)
