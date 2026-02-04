package com.uttec.samsungguide;

import android.app.Activity;
import android.os.Bundle;
import android.widget.TextView;
import android.widget.ScrollView;
import android.graphics.Color;
import android.widget.LinearLayout;
import android.util.TypedValue;
import android.net.wifi.WifiManager;
import android.net.wifi.WifiInfo;
import android.content.Context;
import java.net.NetworkInterface;
import java.net.InetAddress;
import java.util.Enumeration;
import java.util.Collections;
import java.util.List;

public class MainActivity extends Activity {
    private String wifiIp = "연결 안됨";
    private String tailscaleIp = "연결 안됨";
    private String ssid = "연결 안됨";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // Get real-time network info
        getNetworkInfo();

        ScrollView scrollView = new ScrollView(this);
        scrollView.setBackgroundColor(Color.parseColor("#1a1a2e"));

        LinearLayout layout = new LinearLayout(this);
        layout.setOrientation(LinearLayout.VERTICAL);
        layout.setPadding(40, 40, 40, 40);

        TextView textView = new TextView(this);
        textView.setText(getGuideText());
        textView.setTextColor(Color.WHITE);
        textView.setTextSize(TypedValue.COMPLEX_UNIT_SP, 14);
        textView.setLineSpacing(0, 1.3f);

        layout.addView(textView);
        scrollView.addView(layout);
        setContentView(scrollView);
    }

    private void getNetworkInfo() {
        // Get WiFi IP and SSID
        try {
            WifiManager wifiManager = (WifiManager) getApplicationContext().getSystemService(Context.WIFI_SERVICE);
            if (wifiManager != null && wifiManager.isWifiEnabled()) {
                WifiInfo wifiInfo = wifiManager.getConnectionInfo();
                if (wifiInfo != null) {
                    int ip = wifiInfo.getIpAddress();
                    if (ip != 0) {
                        wifiIp = String.format("%d.%d.%d.%d",
                            (ip & 0xff), (ip >> 8 & 0xff),
                            (ip >> 16 & 0xff), (ip >> 24 & 0xff));
                    }
                    String rawSsid = wifiInfo.getSSID();
                    if (rawSsid != null && !rawSsid.equals("<unknown ssid>")) {
                        ssid = rawSsid.replace("\"", "");
                    }
                }
            }
        } catch (Exception e) {
            wifiIp = "확인 실패";
        }

        // Get Tailscale IP (VPN interface - check all interfaces for 100.x.x.x)
        try {
            Enumeration<NetworkInterface> interfaces = NetworkInterface.getNetworkInterfaces();
            if (interfaces != null) {
                for (NetworkInterface intf : Collections.list(interfaces)) {
                    List<InetAddress> addrs = Collections.list(intf.getInetAddresses());
                    for (InetAddress addr : addrs) {
                        if (!addr.isLoopbackAddress()) {
                            String ip = addr.getHostAddress();
                            // Tailscale IPs start with 100.
                            if (ip != null && ip.startsWith("100.")) {
                                tailscaleIp = ip;
                                break;
                            }
                        }
                    }
                    if (!tailscaleIp.equals("연결 안됨")) break;
                }
            }
        } catch (Exception e) {
            tailscaleIp = "확인 실패";
        }
    }

    private String getGuideText() {
        String wifiStatus = wifiIp.equals("연결 안됨") ? "❌ " : "✅ ";
        String tsStatus = tailscaleIp.equals("연결 안됨") ? "❌ " : "✅ ";

        return "═══════════════════════════════════════\n" +
               "   SAMSUNG GALAXY A51 연결 가이드\n" +
               "═══════════════════════════════════════\n\n" +

               "📱 스마트폰 정보 (실시간)\n" +
               "───────────────────────────────────────\n" +
               "• 모델: SM-A516N (Galaxy A51 5G)\n" +
               "• Android: 13\n" +
               "• WiFi SSID: " + ssid + "\n" +
               "• " + wifiStatus + "WiFi IP: " + wifiIp + "\n" +
               "• " + tsStatus + "Tailscale IP: " + tailscaleIp + "\n\n" +

               "═══════════════════════════════════════\n" +
               "   1. SSH 접속 방법 (Termux)\n" +
               "═══════════════════════════════════════\n\n" +

               "▶ Termux 초기 설정\n" +
               "───────────────────────────────────────\n" +
               "pkg update && pkg upgrade\n" +
               "pkg install openssh\n" +
               "passwd          # 비밀번호 설정\n" +
               "sshd            # SSH 서버 시작\n\n" +

               "▶ PC에서 SSH 접속 (WiFi)\n" +
               "───────────────────────────────────────\n" +
               "ssh -p 8022 " + wifiIp + "\n\n" +

               "▶ PC에서 SSH 접속 (Tailscale)\n" +
               "───────────────────────────────────────\n" +
               "ssh -p 8022 " + tailscaleIp + "\n\n" +

               "• 포트: 8022 (Termux 기본)\n" +
               "• 인증: 설정한 비밀번호\n\n" +

               "▶ SSH 서버 자동 시작\n" +
               "───────────────────────────────────────\n" +
               "# Termux:Boot 앱 설치 후\n" +
               "mkdir -p ~/.termux/boot\n" +
               "echo 'sshd' > ~/.termux/boot/start-sshd.sh\n" +
               "chmod +x ~/.termux/boot/start-sshd.sh\n\n" +

               "═══════════════════════════════════════\n" +
               "   2. 파일 전송 (SCP)\n" +
               "═══════════════════════════════════════\n\n" +

               "▶ PC → 스마트폰 (WiFi)\n" +
               "───────────────────────────────────────\n" +
               "scp -P 8022 file.txt " + wifiIp + ":~/\n\n" +

               "▶ PC → 스마트폰 (Tailscale)\n" +
               "───────────────────────────────────────\n" +
               "scp -P 8022 file.txt " + tailscaleIp + ":~/\n\n" +

               "▶ 스마트폰 → PC\n" +
               "───────────────────────────────────────\n" +
               "scp -P 8022 " + wifiIp + ":~/file.txt ./\n\n" +

               "═══════════════════════════════════════\n" +
               "   3. DroidCam 카메라 스트리밍\n" +
               "═══════════════════════════════════════\n\n" +

               "▶ 설정 방법\n" +
               "───────────────────────────────────────\n" +
               "1. DroidCam 앱 실행\n" +
               "2. 화면에 IP/포트 확인\n" +
               "3. 앱 켜둔 상태 유지\n\n" +

               "▶ 원격 접속 URL (WiFi)\n" +
               "───────────────────────────────────────\n" +
               "• 웹 UI: http://" + wifiIp + ":4747\n" +
               "• 비디오: http://" + wifiIp + ":4747/video\n\n" +

               "▶ 원격 접속 URL (Tailscale)\n" +
               "───────────────────────────────────────\n" +
               "• 웹 UI: http://" + tailscaleIp + ":4747\n" +
               "• 비디오: http://" + tailscaleIp + ":4747/video\n\n" +

               "═══════════════════════════════════════\n" +
               "   4. Termux 유용한 명령어\n" +
               "═══════════════════════════════════════\n\n" +

               "▶ 패키지 설치\n" +
               "───────────────────────────────────────\n" +
               "pkg install python nodejs git vim\n" +
               "pkg install wget curl\n\n" +

               "▶ 스토리지 접근\n" +
               "───────────────────────────────────────\n" +
               "termux-setup-storage\n" +
               "# 이후 ~/storage 폴더로 접근 가능\n\n" +

               "▶ 백그라운드 실행 (tmux)\n" +
               "───────────────────────────────────────\n" +
               "pkg install tmux\n" +
               "tmux new -s mysession\n" +
               "# Ctrl+B, D로 분리\n" +
               "tmux attach -t mysession\n\n" +

               "═══════════════════════════════════════\n" +
               "   5. ADB 원격 연결\n" +
               "═══════════════════════════════════════\n\n" +

               "▶ WiFi ADB 활성화\n" +
               "───────────────────────────────────────\n" +
               "# USB 연결 상태에서\n" +
               "adb tcpip 5555\n" +
               "adb connect " + wifiIp + ":5555\n\n" +

               "▶ USB 분리 후 연결\n" +
               "───────────────────────────────────────\n" +
               "adb connect " + wifiIp + ":5555\n" +
               "adb devices\n\n" +

               "═══════════════════════════════════════\n" +
               "   6. Tailscale VPN 접속\n" +
               "═══════════════════════════════════════\n\n" +

               "▶ 현재 상태\n" +
               "───────────────────────────────────────\n" +
               "Tailscale IP: " + tailscaleIp + "\n\n" +

               "▶ Tailscale 설정 방법\n" +
               "───────────────────────────────────────\n" +
               "1. Play Store에서 Tailscale 설치\n" +
               "2. Google 계정으로 로그인\n" +
               "3. Connect 버튼으로 VPN 연결\n\n" +

               "▶ 장점\n" +
               "───────────────────────────────────────\n" +
               "• 어디서든 동일 IP로 접속 가능\n" +
               "• 공유기/방화벽 설정 불필요\n" +
               "• 보안 VPN 터널 사용\n\n" +

               "═══════════════════════════════════════\n" +
               "   7. 트러블슈팅\n" +
               "═══════════════════════════════════════\n\n" +

               "▶ SSH 연결 안될 때\n" +
               "───────────────────────────────────────\n" +
               "# Termux에서\n" +
               "pkill sshd && sshd\n" +
               "whoami\n\n" +

               "▶ IP 주소 확인 (Termux)\n" +
               "───────────────────────────────────────\n" +
               "ip addr show wlan0\n\n" +

               "▶ Tailscale 연결 확인\n" +
               "───────────────────────────────────────\n" +
               "# PC에서\n" +
               "tailscale status\n" +
               "ping " + tailscaleIp + "\n\n" +

               "═══════════════════════════════════════\n" +
               "   ⟳ 앱 재실행시 IP 갱신됨\n" +
               "        UTTEC - 2026.02.04\n" +
               "═══════════════════════════════════════\n";
    }
}
