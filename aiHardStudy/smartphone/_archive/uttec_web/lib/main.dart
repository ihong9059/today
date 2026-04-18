import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_custom_tabs/flutter_custom_tabs.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  runApp(const UTTECWebApp());
}

class UTTECWebApp extends StatelessWidget {
  const UTTECWebApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'UTTEC Web',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(
          seedColor: const Color(0xFF1976D2),
          brightness: Brightness.dark,
        ),
        useMaterial3: true,
      ),
      home: const LauncherPage(),
    );
  }
}

class LauncherPage extends StatefulWidget {
  const LauncherPage({super.key});

  @override
  State<LauncherPage> createState() => _LauncherPageState();
}

class _LauncherPageState extends State<LauncherPage> {
  static const String _url = 'https://uttec-ai.duckdns.org/firmware';
  bool _launching = false;

  @override
  void initState() {
    super.initState();
    // 앱 시작 시 자동으로 Chrome Custom Tab 열기
    WidgetsBinding.instance.addPostFrameCallback((_) => _launchWeb());
  }

  Future<void> _launchWeb() async {
    if (_launching) return;
    setState(() => _launching = true);

    try {
      await launchUrl(
        Uri.parse(_url),
        customTabsOptions: CustomTabsOptions(
          colorSchemes: CustomTabsColorSchemes.defaults(
            toolbarColor: const Color(0xFF1976D2),
            navigationBarColor: const Color(0xFF121212),
          ),
          shareState: CustomTabsShareState.on,
          urlBarHidingEnabled: true,
          showTitle: true,
        ),
      );
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('브라우저를 열 수 없습니다: $e')),
        );
      }
    }

    setState(() => _launching = false);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFF121212),
      body: Center(
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            // Globe icon
            Container(
              width: 100, height: 100,
              decoration: BoxDecoration(
                color: const Color(0xFF1976D2),
                borderRadius: BorderRadius.circular(24),
              ),
              child: const Icon(Icons.language, size: 56, color: Colors.white),
            ),
            const SizedBox(height: 24),
            const Text(
              'UTTEC Web',
              style: TextStyle(
                color: Colors.white, fontSize: 28, fontWeight: FontWeight.bold,
              ),
            ),
            const SizedBox(height: 8),
            const Text(
              '바이브코딩 교육 플랫폼',
              style: TextStyle(color: Colors.white70, fontSize: 16),
            ),
            const SizedBox(height: 40),
            ElevatedButton.icon(
              onPressed: _launching ? null : _launchWeb,
              icon: const Icon(Icons.open_in_browser, size: 24),
              label: const Text('교육 플랫폼 열기', style: TextStyle(fontSize: 18)),
              style: ElevatedButton.styleFrom(
                backgroundColor: const Color(0xFF1976D2),
                foregroundColor: Colors.white,
                padding: const EdgeInsets.symmetric(horizontal: 32, vertical: 16),
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(16),
                ),
              ),
            ),
            const SizedBox(height: 48),
            const Text(
              'Chrome에서 BLE 연결 · 코딩 질문 AI · 빌드 단계 표시',
              style: TextStyle(color: Colors.white38, fontSize: 12),
              textAlign: TextAlign.center,
            ),
          ],
        ),
      ),
    );
  }
}
