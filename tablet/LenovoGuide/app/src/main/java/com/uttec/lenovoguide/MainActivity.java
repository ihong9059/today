package com.uttec.lenovoguide;

import android.app.Activity;
import android.os.Bundle;
import android.widget.TextView;
import android.widget.ScrollView;
import android.graphics.Color;
import android.view.Gravity;
import android.widget.LinearLayout;
import android.util.TypedValue;

public class MainActivity extends Activity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

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

    private String getGuideText() {
        return "═══════════════════════════════════════\n" +
               "   LENOVO TABLET 연결 가이드\n" +
               "═══════════════════════════════════════\n\n" +

               "📱 태블릿 정보\n" +
               "───────────────────────────────────────\n" +
               "• 모델: Lenovo TB310FU\n" +
               "• Android: 13\n" +
               "• Tailscale IP: 100.112.196.53\n\n" +

               "═══════════════════════════════════════\n" +
               "   1. SSH 접속 방법 (Termux)\n" +
               "═══════════════════════════════════════\n\n" +

               "▶ Termux 초기 설정\n" +
               "───────────────────────────────────────\n" +
               "pkg update && pkg upgrade\n" +
               "pkg install openssh\n" +
               "passwd          # 비밀번호 설정\n" +
               "sshd            # SSH 서버 시작\n\n" +

               "▶ PC에서 SSH 접속\n" +
               "───────────────────────────────────────\n" +
               "ssh -p 8022 100.112.196.53\n\n" +

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

               "▶ PC → 태블릿\n" +
               "───────────────────────────────────────\n" +
               "scp -P 8022 file.txt 100.112.196.53:~/\n\n" +

               "▶ 태블릿 → PC\n" +
               "───────────────────────────────────────\n" +
               "scp -P 8022 100.112.196.53:~/file.txt ./\n\n" +

               "▶ 폴더 전송\n" +
               "───────────────────────────────────────\n" +
               "scp -P 8022 -r folder/ 100.112.196.53:~/\n\n" +

               "═══════════════════════════════════════\n" +
               "   3. DroidCam 카메라 스트리밍\n" +
               "═══════════════════════════════════════\n\n" +

               "▶ 설정 방법\n" +
               "───────────────────────────────────────\n" +
               "1. DroidCam 앱 실행\n" +
               "2. 화면에 IP/포트 확인\n" +
               "3. 앱 켜둔 상태 유지\n\n" +

               "▶ 원격 접속 URL\n" +
               "───────────────────────────────────────\n" +
               "• 웹 UI: http://100.112.196.53:4747\n" +
               "• 비디오: http://100.112.196.53:4747/video\n" +
               "• MJPEG: http://100.112.196.53:4747/mjpegfeed\n\n" +

               "▶ VLC로 보기\n" +
               "───────────────────────────────────────\n" +
               "vlc http://100.112.196.53:4747/video\n\n" +

               "═══════════════════════════════════════\n" +
               "   4. Termux 유용한 명령어\n" +
               "═══════════════════════════════════════\n\n" +

               "▶ 패키지 설치\n" +
               "───────────────────────────────────────\n" +
               "pkg install python      # Python\n" +
               "pkg install nodejs      # Node.js\n" +
               "pkg install git         # Git\n" +
               "pkg install vim         # Vim 에디터\n" +
               "pkg install wget curl   # 다운로드 도구\n\n" +

               "▶ 스토리지 접근\n" +
               "───────────────────────────────────────\n" +
               "termux-setup-storage\n" +
               "# 이후 ~/storage 폴더로 접근 가능\n\n" +

               "▶ 백그라운드 실행\n" +
               "───────────────────────────────────────\n" +
               "# 세션 유지\n" +
               "pkg install tmux\n" +
               "tmux new -s mysession\n" +
               "# Ctrl+B, D로 분리\n" +
               "tmux attach -t mysession\n\n" +

               "═══════════════════════════════════════\n" +
               "   5. Tailscale VPN\n" +
               "═══════════════════════════════════════\n\n" +

               "• Tailscale이 연결되어 있으면\n" +
               "  어디서든 위 IP로 접속 가능\n" +
               "• 공유기/방화벽 설정 불필요\n" +
               "• 항상 Tailscale 앱 활성화 유지\n\n" +

               "═══════════════════════════════════════\n" +
               "   6. 트러블슈팅\n" +
               "═══════════════════════════════════════\n\n" +

               "▶ SSH 연결 안될 때\n" +
               "───────────────────────────────────────\n" +
               "# Termux에서\n" +
               "pkill sshd && sshd\n" +
               "whoami    # 사용자 확인\n\n" +

               "▶ Tailscale 연결 확인\n" +
               "───────────────────────────────────────\n" +
               "# PC에서\n" +
               "ping 100.112.196.53\n" +
               "tailscale status\n\n" +

               "▶ 포트 확인\n" +
               "───────────────────────────────────────\n" +
               "# Termux에서\n" +
               "netstat -tlnp | grep 8022\n\n" +

               "═══════════════════════════════════════\n" +
               "        UTTEC - 2026.02.03\n" +
               "═══════════════════════════════════════\n";
    }
}
