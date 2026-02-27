#!/bin/bash
# AI FanStick 클라우드 배포 스크립트

SERVER="178.128.90.37"
USER="root"  # 또는 다른 사용자
REMOTE_DIR="/opt/fanstick"

echo "=========================================="
echo "AI FanStick 클라우드 배포"
echo "서버: $SERVER"
echo "=========================================="

# 1. 원격 디렉토리 생성
echo "[1/5] 원격 디렉토리 생성..."
ssh $USER@$SERVER "mkdir -p $REMOTE_DIR/{control_center,webapp}"

# 2. 파일 복사
echo "[2/5] 파일 복사..."
scp control_center/server.py $USER@$SERVER:$REMOTE_DIR/control_center/
scp control_center/admin.html $USER@$SERVER:$REMOTE_DIR/control_center/
scp webapp/index.html $USER@$SERVER:$REMOTE_DIR/webapp/

# 3. requirements.txt 생성 및 복사
echo "[3/5] 의존성 파일 생성..."
cat > /tmp/requirements.txt << 'EOF'
fastapi==0.109.0
uvicorn==0.27.0
websockets==12.0
EOF
scp /tmp/requirements.txt $USER@$SERVER:$REMOTE_DIR/

# 4. 서버 설정 스크립트 복사
echo "[4/5] 서버 설정 스크립트 생성..."
cat > /tmp/setup_server.sh << 'EOF'
#!/bin/bash
cd /opt/fanstick

# Python 설치 확인
if ! command -v python3 &> /dev/null; then
    apt update && apt install -y python3 python3-pip
fi

# 의존성 설치
pip3 install -r requirements.txt

# systemd 서비스 생성 - Control Center
cat > /etc/systemd/system/fanstick-control.service << 'SERVICE'
[Unit]
Description=AI FanStick Control Center
After=network.target

[Service]
Type=simple
User=root
WorkingDirectory=/opt/fanstick/control_center
ExecStart=/usr/bin/python3 -m uvicorn server:app --host 0.0.0.0 --port 8090
Restart=always
RestartSec=3

[Install]
WantedBy=multi-user.target
SERVICE

# systemd 서비스 생성 - Webapp
cat > /etc/systemd/system/fanstick-webapp.service << 'SERVICE'
[Unit]
Description=AI FanStick Webapp
After=network.target

[Service]
Type=simple
User=root
WorkingDirectory=/opt/fanstick/webapp
ExecStart=/usr/bin/python3 -m http.server 8082
Restart=always
RestartSec=3

[Install]
WantedBy=multi-user.target
SERVICE

# 서비스 활성화 및 시작
systemctl daemon-reload
systemctl enable fanstick-control fanstick-webapp
systemctl start fanstick-control fanstick-webapp

echo "=========================================="
echo "배포 완료!"
echo "Control Center: http://$(curl -s ifconfig.me):8090/admin"
echo "Webapp: http://$(curl -s ifconfig.me):8082"
echo "=========================================="
EOF
scp /tmp/setup_server.sh $USER@$SERVER:$REMOTE_DIR/

# 5. 원격 서버에서 설정 실행
echo "[5/5] 원격 서버 설정 실행..."
ssh $USER@$SERVER "chmod +x $REMOTE_DIR/setup_server.sh && $REMOTE_DIR/setup_server.sh"

echo ""
echo "=========================================="
echo "배포 완료!"
echo "=========================================="
echo "Control Center: http://$SERVER:8090/admin"
echo "Webapp: http://$SERVER:8082"
echo "=========================================="
