import 'dart:async';
import 'dart:convert';
import 'dart:typed_data';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:http/http.dart' as http;
import 'package:flutter_blue_plus/flutter_blue_plus.dart';
import 'package:permission_handler/permission_handler.dart';
import 'package:shared_preferences/shared_preferences.dart';

// ─── Color Constants ───
class C {
  static const bg = Color(0xFF0F172A);
  static const surface = Color(0xFF1E293B);
  static const surface2 = Color(0xFF334155);
  static const primary = Color(0xFF2563EB);
  static const success = Color(0xFF10B981);
  static const warning = Color(0xFFF59E0B);
  static const error = Color(0xFFEF4444);
  static const text = Color(0xFFF1F5F9);
  static const text2 = Color(0xFF94A3B8);
  static const border = Color(0xFF475569);
  static const codeBg = Color(0xFF0D1117);
  static const codeGreen = Color(0xFF7EE787);
}

void main() => runApp(const VibeFirmwareApp());

class VibeFirmwareApp extends StatelessWidget {
  const VibeFirmwareApp({super.key});
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'UTTEC C6-LCD',
      debugShowCheckedModeBanner: false,
      theme: ThemeData.dark().copyWith(
        scaffoldBackgroundColor: C.bg,
        colorScheme: const ColorScheme.dark(primary: C.primary, surface: C.surface),
        cardColor: C.surface,
        appBarTheme: const AppBarTheme(backgroundColor: C.bg, elevation: 0),
      ),
      home: const MainShell(),
    );
  }
}

// ═══════════════════════════════════════════════════════════
//  Main Shell — Bottom Navigation with 5 Tabs
// ═══════════════════════════════════════════════════════════

class MainShell extends StatefulWidget {
  const MainShell({super.key});
  @override
  State<MainShell> createState() => _MainShellState();
}

class _MainShellState extends State<MainShell> {
  int _tabIndex = 0;

  // Shared state — BLE
  BluetoothDevice? bleDevice;
  BluetoothCharacteristic? ctrlChar;
  BluetoothCharacteristic? dataChar;
  BluetoothCharacteristic? statusChar;
  BluetoothCharacteristic? cmdChar; // 패드 명령용
  BluetoothCharacteristic? sensorChar; // 센서/스위치 알림용
  bool switchPressed = false; // 스위치 상태
  String bleStatus = 'disconnected';
  String deviceName = '';

  // 저장된 BLE 기기 설정
  String savedBleName = 'UTTEC-C6';
  String savedBleMac = '58:8C:81:53:6C:D8';

  // Shared state — Server
  String serverUrl = 'http://192.168.0.2:8097';
  String prebuiltServerUrl = 'http://192.168.0.2:8098';

  @override
  void initState() {
    super.initState();
    _loadSettings();
  }

  Future<void> _loadSettings() async {
    final p = await SharedPreferences.getInstance();
    setState(() {
      savedBleName = p.getString('bleName') ?? 'UTTEC-C6';
      savedBleMac = p.getString('bleMac') ?? '58:8C:81:53:6C:D8';
      serverUrl = p.getString('serverUrl') ?? 'http://192.168.0.2:8097';
      prebuiltServerUrl = p.getString('prebuiltServerUrl') ?? 'http://192.168.0.2:8098';
    });
  }

  Future<void> saveSettings() async {
    final p = await SharedPreferences.getInstance();
    await p.setString('bleName', savedBleName);
    await p.setString('bleMac', savedBleMac);
    await p.setString('serverUrl', serverUrl);
    await p.setString('prebuiltServerUrl', prebuiltServerUrl);
  }

  // BLE 명령 전송
  Future<void> sendCommand(String cmd) async {
    if (bleStatus != 'connected' || cmdChar == null) return;
    try {
      await cmdChar!.write(utf8.encode(cmd), withoutResponse: false);
    } catch (e) {
      debugPrint('CMD error: $e');
    }
  }

  void _onServerUrlChanged(String url) => setState(() => serverUrl = url);
  void _switchTab(int idx) => setState(() => _tabIndex = idx);

  @override
  Widget build(BuildContext context) {
    final pages = [
      HomeTab(shell: this),
      const HWTab(),
      const SWTab(),
      PadTab(shell: this),
      SettingsTab(shell: this),
    ];
    return Scaffold(
      body: IndexedStack(index: _tabIndex, children: pages),
      bottomNavigationBar: Container(
        decoration: const BoxDecoration(
          color: C.surface,
          border: Border(top: BorderSide(color: C.border, width: 1)),
        ),
        child: SafeArea(
          child: SizedBox(
            height: 56,
            child: Row(
              children: [
                _navItem(0, Icons.home, '\uD83C\uDFE0 \uD648'),
                _navItem(1, Icons.memory, '\uD83D\uDD27 HW'),
                _navItem(2, Icons.code, '\uD83D\uDCBB SW'),
                _navItem(3, Icons.gamepad, '\uD83C\uDFAE \uD328\uB4DC'),
                _navItem(4, Icons.settings, '\u2699 \uC124\uC815'),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget _navItem(int idx, IconData icon, String label) {
    final active = _tabIndex == idx;
    return Expanded(
      child: GestureDetector(
        behavior: HitTestBehavior.opaque,
        onTap: () => _switchTab(idx),
        child: Column(mainAxisAlignment: MainAxisAlignment.center, children: [
          Icon(icon, size: 22, color: active ? C.primary : C.text2),
          const SizedBox(height: 2),
          Text(label,
            style: TextStyle(fontSize: 10, color: active ? C.primary : C.text2, fontWeight: active ? FontWeight.w700 : FontWeight.normal)),
        ]),
      ),
    );
  }
}

// ═══════════════════════════════════════════════════════════
//  Shared Card Widget
// ═══════════════════════════════════════════════════════════

Widget styledCard({required String title, required IconData icon, required Widget child}) {
  return Container(
    margin: const EdgeInsets.only(bottom: 12),
    decoration: BoxDecoration(
      color: C.surface,
      borderRadius: BorderRadius.circular(12),
      border: Border.all(color: C.border, width: 1),
    ),
    padding: const EdgeInsets.all(16),
    child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
      Row(children: [
        Icon(icon, size: 18, color: C.text2),
        const SizedBox(width: 8),
        Text(title, style: const TextStyle(fontSize: 13, color: C.text2,
          fontWeight: FontWeight.w600, letterSpacing: 0.5)),
      ]),
      const SizedBox(height: 12),
      child,
    ]),
  );
}

// ═══════════════════════════════════════════════════════════
//  TAB 1: Home — PRESERVES ALL EXISTING FUNCTIONALITY
// ═══════════════════════════════════════════════════════════

class HomeTab extends StatefulWidget {
  final _MainShellState shell;
  const HomeTab({super.key, required this.shell});
  @override
  State<HomeTab> createState() => _HomeTabState();
}

class _HomeTabState extends State<HomeTab> with AutomaticKeepAliveClientMixin {
  @override
  bool get wantKeepAlive => true;

  final _promptController = TextEditingController();

  // Build
  String _buildStatus = 'idle';
  String _buildMessage = '';
  int _buildProgress = 0;
  String? _jobId;
  Uint8List? _firmware;
  int _firmwareSize = 0;
  DateTime? _buildStartTime;
  Timer? _elapsedTimer;
  String? _generatedCode;
  String? _codeExplanation;
  bool _showCode = false;
  bool _showHistory = false;

  // Example prompts
  bool _showExPrompts = false;
  int _exPromptCat = -1;

  // Prebuilt catalog
  List<Map<String, dynamic>> _catalogItems = [];
  bool _catalogLoaded = false;
  Map<String, dynamic>? _selectedPrebuilt;
  Map<String, dynamic>? _guideData;
  int _catalogFilter = 0; // 0=all, 1~4=difficulty

  // Coding question
  final _questionController = TextEditingController();
  bool _showExQuestions = false;
  int _exQuestionCat = -1;
  String _questionStatus = 'idle'; // idle, asking, done, failed
  String _questionAnswer = '';
  double _questionElapsed = 0;

  // OTA
  String _otaStatus = 'idle';
  int _otaProgress = 0;
  String _otaMessage = '';
  int _elapsedSeconds = 0;

  // History
  final List<Map<String, String>> _history = [];

  // Example prompt data
  static const _exPromptData = [
    {'cat': 'RGB LED 단일 색상', 'items': ['RGB LED 빨간색으로 켜기','RGB LED 초록색으로 켜기','RGB LED 파란색으로 켜기','RGB LED 노란색으로 켜기','RGB LED 보라색으로 켜기','RGB LED 하늘색으로 켜기','RGB LED 주황색으로 켜기','RGB LED 흰색으로 켜기']},
    {'cat': 'LCD 텍스트 기초', 'items': ['LCD 화면에 Hello World 표시하기','LCD에 내 이름 크게 표시하기','LCD 배경을 빨간색으로 채우기','LCD에 카운트다운 숫자 표시하기','LCD에 현재 시간 표시하기 (millis 기반)','LCD에 여러 줄 텍스트 표시하기','LCD에 색상별로 다른 텍스트 표시하기','LCD 백라이트 밝기 조절하기']},
    {'cat': 'RGB LED 패턴', 'items': ['RGB LED 빨강-초록-파랑 반복 깜빡이기','RGB LED 무지개 색상 순환하기','RGB LED 숨쉬기 효과 (fade in/out)','RGB LED SOS 신호 보내기','RGB LED 경찰차 사이렌 효과','RGB LED 랜덤 색상 변경']},
    {'cat': 'LCD 그래픽', 'items': ['LCD에 빨간 원 그리기','LCD에 초록 사각형 그리기','LCD에 신호등 그리기','LCD에 막대 그래프 그리기','LCD에 체스판 패턴 그리기','LCD에 국기 그리기','LCD에 아날로그 시계 그리기','LCD에 게이지/미터 그리기']},
    {'cat': 'LCD 애니메이션', 'items': ['LCD에서 공이 좌우로 움직이기','LCD에서 공이 벽에 튕기기','LCD에 눈 내리는 효과 만들기','LCD에 프로그레스 바 애니메이션','LCD에 스크롤 텍스트 만들기','LCD에 불꽃놀이 효과 만들기','LCD 색상 그라데이션 화면 만들기']},
    {'cat': '버튼 + LCD', 'items': ['버튼 누르면 LCD에 PRESSED 표시하기','버튼으로 LED 색상 변경하기','버튼 누른 횟수 LCD에 표시하기','버튼으로 LCD 배경색 변경하기','버튼 길게 누르기/짧게 누르기 구분하기','버튼으로 LCD 메뉴 선택하기']},
    {'cat': 'WiFi + LCD', 'items': ['WiFi 주변 네트워크 스캔하고 LCD에 표시하기','WiFi 신호 세기를 막대그래프로 표시하기','WiFi에 연결하고 IP 주소 LCD에 표시하기','WiFi 연결 상태를 LED 색상으로 표시하기','WiFi 스캔 후 가장 강한 신호 강조하기','WiFi로 웹 서버 만들어 LED 제어하기']},
    {'cat': 'LED + LCD 조합', 'items': ['LED + LCD 동시에 빨간색 표시하기','LED 색상을 LCD에 텍스트로 표시하기','LED 무지개 + LCD 색상코드 표시하기','LED 밝기를 LCD 슬라이더로 보여주기','LED 경찰차 + LCD 경고 텍스트','LCD에 색상 이름 표시하고 LED를 해당 색상으로 설정하기']},
    {'cat': '타이머/게임', 'items': ['LCD에 디지털 시계 만들기 (시:분:초)','LCD 스톱워치 만들기 (버튼으로 시작/정지)','LCD 반응속도 테스트 게임 만들기','LCD 가위바위보 게임 만들기','LCD 주사위 게임 만들기','LCD에 틱택토 게임 보드 그리기','LCD 미니 벽돌깨기 게임 만들기','LCD 뱀 게임 만들기']},
    {'cat': 'BLE 제어', 'items': ['BLE로 LED 색상 원격 제어하기','BLE로 LCD에 메시지 보내기','BLE로 LCD 배경색 원격 변경하기','BLE 연결 상태를 LCD에 표시하기','BLE로 버튼 누름 이벤트 스마트폰에 전송하기','BLE 리모컨으로 LED + LCD 동시 제어하기']},
    {'cat': 'SD 카드', 'items': ['SD 카드에 Hello World 텍스트 파일 쓰기','SD 카드에서 파일 읽어서 LCD에 표시하기','SD 카드 파일 목록을 LCD에 표시하기','SD 카드 용량과 사용량 LCD에 표시하기','버튼 누를 때마다 카운트를 SD 카드에 저장하기','millis 타이머 데이터를 SD 카드에 CSV로 로깅하기']},
    {'cat': '종합 프로젝트', 'items': ['LCD 대시보드 만들기 (시간+LED상태+WiFi)','LCD 날씨 위젯 만들기 (가상 데이터)','LCD 포토프레임 만들기 (컬러 도형 슬라이드쇼)','BLE + WiFi + LED + LCD 종합 제어 시스템','LCD 미니 운영체제 만들기 (메뉴+앱)','LCD에 주식 차트 시뮬레이션 만들기']},
  ];

  // Example question data
  static const _exQuestionData = [
    {'cat': '기초 개념', 'items': ['변수란 무엇인가요?','함수란 무엇이고 왜 사용하나요?','for문과 while문의 차이가 뭔가요?','if문은 어떻게 사용하나요?']},
    {'cat': 'Arduino', 'items': ['setup() 함수와 loop() 함수의 역할은 무엇인가요?','digitalWrite()는 어떻게 사용하나요?','delay()와 millis()의 차이는 무엇인가요?','tone() 함수로 소리를 내는 방법을 알려주세요']},
    {'cat': '하드웨어', 'items': ['LED를 켜려면 어떤 코드를 써야 하나요?','Active LOW 방식이란 무엇인가요?','I2C 통신이란 무엇인가요?','GPIO 핀이란 무엇인가요?']},
    {'cat': '심화', 'items': ['FreeRTOS 태스크란 무엇이고 왜 필요한가요?','xTaskCreate() 함수는 어떻게 사용하나요?','LCD 디스플레이에 그래픽을 그리는 원리가 뭔가요?','BLE 통신이란 무엇인가요?']},
  ];

  // UUIDs
  static const otaServiceUuid = '0000fe00-0000-1000-8000-00805f9b34fb';
  static const otaCtrlUuid = '0000fe01-0000-1000-8000-00805f9b34fb';
  static const otaDataUuid = '0000fe02-0000-1000-8000-00805f9b34fb';
  static const otaStatusUuid = '0000fe03-0000-1000-8000-00805f9b34fb';

  @override
  void initState() {
    super.initState();
    _loadCatalog();
    // 앱 시작 시 자동 BLE 연결
    Future.delayed(const Duration(seconds: 2), () {
      if (_s.bleStatus == 'disconnected') _connectBLE();
    });
  }

  Future<void> _loadCatalog() async {
    // 서버에서 먼저 시도, 실패 시 내장 카탈로그 사용
    try {
      final resp = await http.get(Uri.parse('${_s.prebuiltServerUrl}/api/catalog'))
          .timeout(const Duration(seconds: 3));
      if (resp.statusCode == 200) {
        final data = jsonDecode(resp.body);
        final items = (data['items'] as List).cast<Map<String, dynamic>>();
        setState(() { _catalogItems = items; _catalogLoaded = true; });
        return;
      }
    } catch (_) {}
    // 내장 카탈로그 로드
    try {
      final jsonStr = await rootBundle.loadString('assets/catalog.json');
      final data = jsonDecode(jsonStr);
      final items = (data['items'] as List).cast<Map<String, dynamic>>();
      setState(() { _catalogItems = items; _catalogLoaded = true; });
    } catch (e) {
      debugPrint('Catalog load error: $e');
    }
  }

  Future<void> _selectPrebuilt(Map<String, dynamic> item) async {
    setState(() { _selectedPrebuilt = item; _guideData = null; });
    try {
      final resp = await http.get(Uri.parse('${_s.prebuiltServerUrl}/api/prebuilt/${item['no']}/guide'))
          .timeout(const Duration(seconds: 3));
      if (resp.statusCode == 200) {
        setState(() => _guideData = jsonDecode(resp.body));
        return;
      }
    } catch (_) {}
    // 내장 가이드 로드
    try {
      final jsonStr = await rootBundle.loadString('assets/guide/${item['no']}.json');
      setState(() => _guideData = jsonDecode(jsonStr));
    } catch (_) {}
  }

  Future<void> _sendPrebuilt(String no) async {
    // SD 카드에서 SDLOAD로 즉시 전송
    if (_s.bleStatus != 'connected') {
      setState(() {
        _buildStatus = 'success';
        _buildMessage = 'BLE 연결 중...';
        _buildProgress = 30;
      });
      await _connectBLE();
      await Future.delayed(const Duration(seconds: 2));
    }
    if (_s.bleStatus != 'connected') {
      setState(() { _buildStatus = 'failed'; _buildMessage = 'BLE 연결 실패'; });
      return;
    }
    setState(() {
      _buildStatus = 'success';
      _buildMessage = '⚡ SD 카드에서 로딩 중... ($no)';
      _buildProgress = 50;
      _otaStatus = 'idle';
      _otaProgress = 0;
    });
    try {
      await _s.sendCommand('SDLOAD:$no');
      setState(() {
        _buildProgress = 100;
        _buildMessage = '⚡ SD 로드 완료! ($no) — 보드 재시작 중...';
      });
      // 코드 가져오기 (서버에서, 실패해도 무관)
      try {
        final codeResp = await http.get(
          Uri.parse('${_s.prebuiltServerUrl}/api/prebuilt/$no/code'),
        ).timeout(const Duration(seconds: 3));
        if (codeResp.statusCode == 200) {
          setState(() => _generatedCode = jsonDecode(codeResp.body)['code']);
        }
      } catch (_) {}
    } catch (e) {
      debugPrint('SDLOAD error: $e');
      setState(() { _buildStatus = 'failed'; _buildMessage = 'SD 로드 실패: $e'; });
    }
  }

  @override
  void dispose() {
    _promptController.dispose();
    _elapsedTimer?.cancel();
    super.dispose();
  }

  _MainShellState get _s => widget.shell;

  // ─── BLE ───

  Future<void> _requestPermissions() async {
    await [
      Permission.bluetoothScan,
      Permission.bluetoothConnect,
      Permission.locationWhenInUse,
    ].request();
  }

  Future<void> _connectBLE() async {
    await _requestPermissions();
    setState(() {
      _s.bleStatus = 'connecting';
      _s.deviceName = '';
    });
    _s.setState(() {});

    try {
      List<ScanResult> results = [];
      await FlutterBluePlus.startScan(timeout: const Duration(seconds: 5));
      FlutterBluePlus.scanResults.listen((r) => results = r);
      await Future.delayed(const Duration(seconds: 5));
      await FlutterBluePlus.stopScan();

      ScanResult? target;
      // 1차: 저장된 이름으로 검색
      for (var r in results) {
        if (r.device.platformName.contains(_s.savedBleName)) {
          target = r;
          break;
        }
      }
      // 2차: 저장된 MAC 주소로 검색
      if (target == null) {
        for (var r in results) {
          if (r.device.remoteId.toString().toUpperCase() == _s.savedBleMac.toUpperCase()) {
            target = r;
            break;
          }
        }
      }

      if (target == null) {
        _showSnackBar('${_s.savedBleName}을 찾을 수 없습니다. 설정 탭에서 기기를 확인하세요.');
        setState(() => _s.bleStatus = 'disconnected');
        _s.setState(() {});
        return;
      }

      _s.bleDevice = target.device;
      await _s.bleDevice!.connect(timeout: const Duration(seconds: 10));
      await _s.bleDevice!.requestMtu(512);
      _s.deviceName = _s.bleDevice!.platformName;

      List<BluetoothService> services = await _s.bleDevice!.discoverServices();
      for (var svc in services) {
        String svcUuid = svc.uuid.toString().toLowerCase();
        if (svcUuid.contains('fe00')) {
          for (var chr in svc.characteristics) {
            String uuid = chr.uuid.toString().toLowerCase();
            if (uuid.contains('fe01')) _s.ctrlChar = chr;
            if (uuid.contains('fe02')) _s.dataChar = chr;
            if (uuid.contains('fe03')) _s.statusChar = chr;
            if (uuid.contains('fe04')) _s.cmdChar = chr;
            if (uuid.contains('fe05')) _s.sensorChar = chr;
          }
        }
      }

      if (_s.ctrlChar == null || _s.dataChar == null || _s.statusChar == null) {
        String found = services.map((s) => s.uuid.toString()).join(', ');
        _showSnackBar('OTA \uC11C\uBE44\uC2A4 \uC5C6\uC74C. \uBC1C\uACAC: $found');
        await _s.bleDevice!.disconnect();
        setState(() => _s.bleStatus = 'disconnected');
        _s.setState(() {});
        return;
      }

      await _s.statusChar!.setNotifyValue(true);
      _s.statusChar!.onValueReceived.listen((data) {
        if (data.length >= 2) {
          _onOtaStatusReceived(data[0], data[1]);
        }
      });

      // FE05 센서 알림 구독 (스위치 등)
      if (_s.sensorChar != null) {
        await _s.sensorChar!.setNotifyValue(true);
        _s.sensorChar!.onValueReceived.listen((data) {
          if (data.length >= 2 && data[0] == 0x01) {
            _s.setState(() => _s.switchPressed = data[1] == 1);
          }
        });
      }

      setState(() => _s.bleStatus = 'connected');
      _s.setState(() {});
      _showSnackBar('${_s.deviceName} \uC5F0\uACB0\uB428');

      _s.bleDevice!.connectionState.listen((state) {
        if (state == BluetoothConnectionState.disconnected) {
          setState(() {
            _s.bleStatus = 'disconnected';
            _s.ctrlChar = null;
            _s.dataChar = null;
            _s.statusChar = null;
          });
          _s.setState(() {});
        }
      });
    } catch (e) {
      _showSnackBar('\uC5F0\uACB0 \uC2E4\uD328: $e');
      setState(() => _s.bleStatus = 'disconnected');
      _s.setState(() {});
    }
  }

  Future<void> _disconnectBLE() async {
    await _s.bleDevice?.disconnect();
    setState(() {
      _s.bleStatus = 'disconnected';
      _s.deviceName = '';
    });
    _s.setState(() {});
  }

  void _onOtaStatusReceived(int status, int progress) {
    final names = {
      0: 'IDLE', 1: 'READY', 2: 'RECEIVING', 3: 'VERIFYING',
      4: 'SUCCESS', 5: 'CRC_FAIL', 6: 'WRITE_FAIL', 7: 'ABORT_OK',
    };
    setState(() {
      if (status == 4) {
        _otaStatus = 'success';
        _otaMessage = 'OTA \uC131\uACF5! \uC7AC\uBD80\uD305 \uC911...';
        _otaProgress = 100;
      } else if (status == 5 || status == 6) {
        _otaStatus = 'failed';
        _otaMessage = '\uC2E4\uD328: ${names[status]}';
      } else if (status == 2) {
        _otaStatus = 'transferring';
        _otaProgress = progress;
        _otaMessage = '\uC218\uC2E0 \uC911... $progress%';
      } else if (status == 3) {
        _otaStatus = 'verifying';
        _otaProgress = 100;
        _otaMessage = '\uAC80\uC99D \uC911...';
      }
    });
  }

  // ─── Build Server ───

  Future<void> _startBuild() async {
    String prompt = _promptController.text.trim();
    if (prompt.isEmpty) {
      _showSnackBar('\uD504\uB86C\uD504\uD2B8\uB97C \uC785\uB825\uD574\uC8FC\uC138\uC694');
      return;
    }

    setState(() {
      _buildStatus = 'generating';
      _buildMessage = 'AI가 코드를 생성하고 있어요...';
      _buildProgress = 0;
      _firmware = null;
      _otaStatus = 'idle';
      _otaProgress = 0;
      _elapsedSeconds = 0;
      _buildStartTime = DateTime.now();
    });
    // 경과 시간 타이머
    _elapsedTimer?.cancel();
    _elapsedTimer = Timer.periodic(const Duration(seconds: 1), (_) {
      if (_buildStatus == 'generating' || _buildStatus == 'building') {
        setState(() => _elapsedSeconds = DateTime.now().difference(_buildStartTime!).inSeconds);
      } else {
        _elapsedTimer?.cancel();
      }
    });

    try {
      final resp = await http.post(
        Uri.parse('${_s.serverUrl}/api/v1/generate'),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({'prompt': prompt}),
      );

      if (resp.statusCode != 200) {
        setState(() {
          _buildStatus = 'failed';
          _buildMessage = '\uC11C\uBC84 \uC624\uB958: ${resp.statusCode}';
        });
        return;
      }

      _jobId = jsonDecode(resp.body)['job_id'];
      _pollBuildStatus();

      _history.insert(0, {'prompt': prompt, 'time': _timeNow()});
      if (_history.length > 10) _history.removeLast();
    } catch (e) {
      setState(() {
        _buildStatus = 'failed';
        _buildMessage = '\uC11C\uBC84 \uC5F0\uACB0 \uC2E4\uD328: $e';
      });
    }
  }

  Future<void> _pollBuildStatus() async {
    while (_buildStatus != 'success' && _buildStatus != 'failed') {
      await Future.delayed(const Duration(seconds: 3));
      try {
        final resp = await http.get(
          Uri.parse('${_s.serverUrl}/api/v1/status/$_jobId'),
        );
        if (resp.statusCode != 200) continue;

        final data = jsonDecode(resp.body);
        setState(() {
          _buildStatus = data['status'];
          _buildMessage = data['message'];
          _buildProgress = data['progress'];
          _firmwareSize = data['firmware_size'] ?? 0;
        });

        if (data['status'] == 'success') {
          await _downloadFirmware();
        }
      } catch (e) {
        // retry
      }
    }
  }

  Future<void> _downloadFirmware() async {
    try {
      setState(() => _buildMessage = '펌웨어 다운로드 중...');
      final resp = await http.get(
        Uri.parse('${_s.serverUrl}/api/v1/download/$_jobId'),
      );
      if (resp.statusCode == 200) {
        _firmware = resp.bodyBytes;
        setState(() {
          _firmwareSize = _firmware!.length;
          _buildMessage = '다운로드 완료! (${(_firmwareSize / 1024).toStringAsFixed(0)} KB)';
        });
        // 생성된 코드 가져오기
        _fetchGeneratedCode();
        // 자동으로 BLE 연결 → OTA 전송 진행
        await _autoConnectAndSend();
      }
    } catch (e) {
      setState(() {
        _buildStatus = 'failed';
        _buildMessage = '다운로드 실패: $e';
      });
    }
  }

  Future<void> _fetchGeneratedCode() async {
    try {
      final resp = await http.get(
        Uri.parse('${_s.serverUrl}/api/v1/code/$_jobId'),
      );
      if (resp.statusCode == 200) {
        final data = jsonDecode(resp.body);
        setState(() {
          _generatedCode = data['code'] ?? '';
          _codeExplanation = _explainCode(_generatedCode!);
        });
      }
    } catch (_) {}
  }

  String _explainCode(String code) {
    // 코드에서 사용된 기능을 분석하여 초보자용 설명 생성
    final explanations = <String>[];

    explanations.add('이 프로그램은 UTTEC 보드에서 실행됩니다.\n');

    if (code.contains('pinMode') && code.contains('OUTPUT')) {
      explanations.add('pinMode(핀번호, OUTPUT)\n→ 핀을 "출력" 모드로 설정해요. LED를 켜고 끄려면 출력이어야 합니다.\n');
    }
    if (code.contains('digitalWrite') && code.contains('HIGH')) {
      explanations.add('digitalWrite(핀번호, HIGH)\n→ 핀에 3.3V 전압을 보내요. LED가 켜집니다!\n');
    }
    if (code.contains('digitalWrite') && code.contains('LOW')) {
      explanations.add('digitalWrite(핀번호, LOW)\n→ 핀에 0V 전압을 보내요. LED가 꺼집니다.\n');
    }
    if (code.contains('delay(') || code.contains('vTaskDelay')) {
      explanations.add('delay(숫자)\n→ 밀리초(1/1000초) 동안 기다려요. delay(500)이면 0.5초 대기!\n');
    }
    if (code.contains('setColor') || code.contains('pixel') || code.contains('LED')) {
      explanations.add('WS2812 RGB LED (GPIO8)\nsetColor(R, G, B) = RGB 색상 설정\nledOff() = LED 끄기\n');
    }
    if (code.contains('lcd.') || code.contains('lcdText') || code.contains('lcdClear')) {
      explanations.add('lcdText(x, y, "텍스트", color, size)\n→ LCD 화면의 (x,y) 위치에 글자를 표시합니다.\nlcd.fillScreen(color)로 화면을 채울 수 있습니다.\n');
    }
    if (code.contains('xTaskCreate')) {
      explanations.add('xTaskCreate(함수, 이름, 크기, ...)\n→ 별도의 작업(Task)을 만들어요. LED 깜빡임처럼 반복 작업을 동시에 실행할 수 있습니다.\n');
    }
    if (code.contains('Wire.begin') || code.contains('I2C')) {
      explanations.add('Wire.begin(1, 2)\n→ I2C 통신을 시작해요. 외부 센서(AHT20 등)를 연결할 수 있습니다.\n');
    }
    if (code.contains('initBLE')) {
      explanations.add('initBLE()\n→ 블루투스(BLE) 무선 통신을 시작해요. 스마트폰에서 다음에도 무선으로 프로그램을 보낼 수 있습니다.\n');
    }
    if (code.contains('setup()')) {
      explanations.add('setup() 함수\n→ UTTEC 보드가 켜질 때 한 번만 실행돼요. 초기 설정을 여기에 넣습니다.\n');
    }
    if (code.contains('loop()')) {
      explanations.add('loop() 함수\n→ setup() 이후 계속 반복 실행돼요. 여기서는 대기만 하고, LED는 별도 Task에서 동작합니다.\n');
    }

    if (explanations.length <= 1) {
      explanations.add('AI가 여러분의 명령을 C언어 프로그램으로 변환했어요!\n');
    }

    return explanations.join('\n');
  }

  Future<void> _autoConnectAndSend() async {
    // BLE 미연결이면 자동 연결
    if (_s.bleStatus != 'connected') {
      setState(() => _otaMessage = 'UTTEC 보드 자동 연결 중...');
      await _connectBLE();
    }
    // 연결 성공하면 자동 OTA 전송
    if (_s.bleStatus == 'connected' && _firmware != null) {
      await _startOTA();
    } else if (_s.bleStatus != 'connected') {
      setState(() => _otaMessage = 'BLE 자동 연결 실패 — 수동으로 연결해주세요');
    }
  }

  // ─── OTA Transfer ───

  Future<void> _startOTA() async {
    if (_firmware == null) {
      _showSnackBar('\uD380\uC6E8\uC5B4\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4');
      return;
    }
    if (_s.bleStatus != 'connected') {
      _showSnackBar('BLE \uC5F0\uACB0\uC744 \uBA3C\uC800 \uD574\uC8FC\uC138\uC694');
      return;
    }

    setState(() {
      _otaStatus = 'transferring';
      _otaProgress = 0;
      _otaMessage = 'OTA \uC2DC\uC791...';
    });

    try {
      final size = _firmware!.length;
      final startCmd = Uint8List(5);
      startCmd[0] = 0x01;
      startCmd[1] = size & 0xFF;
      startCmd[2] = (size >> 8) & 0xFF;
      startCmd[3] = (size >> 16) & 0xFF;
      startCmd[4] = (size >> 24) & 0xFF;

      await _s.ctrlChar!.write(startCmd, withoutResponse: false);
      await Future.delayed(const Duration(milliseconds: 500));

      const chunkSize = 240;
      int sent = 0;
      int totalChunks = (size + chunkSize - 1) ~/ chunkSize;

      for (int i = 0; i < totalChunks; i++) {
        int offset = i * chunkSize;
        int end = (offset + chunkSize > size) ? size : offset + chunkSize;
        Uint8List chunk = _firmware!.sublist(offset, end);

        await _s.dataChar!.write(chunk, withoutResponse: true);
        sent += chunk.length;

        int pct = (sent * 100 ~/ size).clamp(0, 100);
        if (pct % 5 == 0 || sent >= size) {
          setState(() {
            _otaProgress = pct;
            _otaMessage = '전송 중... $pct% ($sent/$size)';
          });
        }

        if ((i + 1) % 10 == 0) {
          await Future.delayed(const Duration(milliseconds: 10));
        }
      }

      // 마지막 데이터 전송 후 보드가 처리할 시간 확보
      await Future.delayed(const Duration(seconds: 1));

      setState(() {
        _otaProgress = 100;
        _otaMessage = '전송 완료! END 명령 전송 중...';
      });

      // OTA END 전송 — withoutResponse: false로 확실한 전달 보장
      // 보드가 END 수신 후 Update.end() → 2초 대기 → ESP.restart() 순서
      try {
        await _s.ctrlChar!.write(Uint8List.fromList([0x02]), withoutResponse: false);
        debugPrint('OTA END sent successfully');
      } catch (e) {
        // GATT_ERROR(133)는 보드가 재부팅하면서 발생 — 정상
        debugPrint('OTA END write error (expected if board rebooted): $e');
      }

      // 전송 완료 알림음
      _playSound('notification');

      // 보드 재부팅 대기 (펌웨어: delay(2000) + ESP.restart())
      await Future.delayed(const Duration(seconds: 5));

      // 완료 알림음
      _playSound('notification');

      setState(() {
        _otaStatus = 'success';
        _otaMessage = '✅ OTA 완료! 보드가 재부팅됩니다.';
        _otaProgress = 100;
        _s.bleStatus = 'disconnected';
      });
      _s.setState(() {});
      _showSnackBar('OTA 성공! 8초 후 자동 재연결...');
      // 8초 후 자동 재연결 (보드 재부팅 완료 대기)
      Future.delayed(const Duration(seconds: 8), () => _connectBLE());
    } catch (e) {
      if (_otaProgress >= 95) {
        // 95% 이상 전송 후 에러 = 보드 재부팅으로 인한 BLE 끊김 (정상)
        _playSound('notification');
        setState(() {
          _otaStatus = 'success';
          _otaMessage = 'OTA 완료! UTTEC 보드가 재부팅했습니다.';
          _otaProgress = 100;
          _s.bleStatus = 'disconnected';
        });
        _s.setState(() {});
        _showSnackBar('OTA 성공! 8초 후 자동 재연결...');
        Future.delayed(const Duration(seconds: 8), () => _connectBLE());
      } else {
        _playSound('alarm');
        setState(() {
          _otaStatus = 'failed';
          _otaMessage = 'OTA 실패: $e';
        });
      }
    }
  }

  // ─── Sound ───

  static const _soundChannel = MethodChannel('com.uttec.mini/sound');

  Future<void> _playSound(String type) async {
    try {
      await _soundChannel.invokeMethod(type == 'alarm' ? 'playAlarm' : 'playNotification');
    } catch (e) {
      debugPrint('Sound error: $e');
    }
  }

  // ─── Helpers ───

  String _timeNow() {
    final now = DateTime.now();
    return '${now.hour.toString().padLeft(2, '0')}:${now.minute.toString().padLeft(2, '0')}';
  }

  void _showSnackBar(String msg) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(content: Text(msg), duration: const Duration(seconds: 2)),
    );
  }

  // ─── Prebuilt Catalog Widget ───
  Widget _buildPrebuiltCatalog() {
    final diffLabels = {0: '전체', 1: '기초', 2: '중급', 3: '고급', 4: '프로'};
    final diffColors = {1: C.success, 2: C.warning, 3: C.error, 4: const Color(0xFFD63031)};
    final filtered = _catalogFilter == 0
      ? _catalogItems
      : _catalogItems.where((i) => i['difficulty'] == _catalogFilter).toList();
    final groups = <String, List<Map<String, dynamic>>>{};
    for (var item in filtered) {
      final cat = item['category'] as String;
      groups.putIfAbsent(cat, () => []).add(item);
    }

    return Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
      // Header
      GestureDetector(
        onTap: () => setState(() => _showExPrompts = false),
        child: Container(
          padding: const EdgeInsets.symmetric(vertical: 8),
          child: Row(children: [
            const Icon(Icons.bolt, color: Color(0xFFF59E0B), size: 18),
            const SizedBox(width: 6),
            Text('⚡ 사전빌드 (${_catalogItems.length}개) — 즉시 전송',
              style: const TextStyle(fontSize: 14, fontWeight: FontWeight.w600, color: C.text)),
          ]),
        ),
      ),
      // Difficulty filter chips
      SingleChildScrollView(
        scrollDirection: Axis.horizontal,
        child: Row(children: diffLabels.entries.map((e) {
          final active = _catalogFilter == e.key;
          return Padding(
            padding: const EdgeInsets.only(right: 8),
            child: GestureDetector(
              onTap: () => setState(() => _catalogFilter = e.key),
              child: Container(
                padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
                decoration: BoxDecoration(
                  color: active ? (diffColors[e.key] ?? C.primary) : Colors.transparent,
                  borderRadius: BorderRadius.circular(18),
                  border: Border.all(color: diffColors[e.key] ?? C.primary, width: 1.5),
                ),
                child: Text(e.value, style: TextStyle(fontSize: 15, fontWeight: FontWeight.w500, color: active ? Colors.white : C.text2)),
              ),
            ),
          );
        }).toList()),
      ),
      const SizedBox(height: 8),
      // Items by category
      _buildCatalogGroups(groups),
      // Guide display
      if (_selectedPrebuilt != null) _buildPrebuiltGuideCard(),
    ]);
  }

  // 카탈로그 목록 — 5개 항목 높이로 제한, 스크롤 가능
  Widget _buildCatalogGroups(Map<String, List<Map<String, dynamic>>> groups) {
    final allWidgets = <Widget>[];
    for (var e in groups.entries) {
      allWidgets.add(Padding(
        padding: const EdgeInsets.only(top: 6, bottom: 4),
        child: Text('${e.key}. ${e.value.first['category_name']}',
          style: const TextStyle(fontSize: 12, fontWeight: FontWeight.w600, color: C.primary)),
      ));
      for (var item in e.value) {
        allWidgets.add(_buildCatalogItem(item));
      }
    }
    // 항목 높이 약 44px * 5개 = 220px
    return SizedBox(
      height: 220,
      child: Scrollbar(
        thumbVisibility: true,
        child: ListView(
          children: allWidgets,
        ),
      ),
    );
  }

  Widget _buildCatalogItem(Map<String, dynamic> item) {
    final diffLabel = {1: '기초', 2: '중급', 3: '고급', 4: '프로'};
    final colors = {1: C.success, 2: C.warning, 3: C.error, 4: const Color(0xFFD63031)};
    final isSelected = _selectedPrebuilt?['no'] == item['no'];
    final diff = item['difficulty'] as int;
    return GestureDetector(
      onTap: () => _selectPrebuilt(item),
      child: Container(
        margin: const EdgeInsets.only(bottom: 3),
        padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 8),
        decoration: BoxDecoration(
          color: isSelected ? C.primary.withOpacity(0.15) : C.surface2,
          borderRadius: BorderRadius.circular(8),
          border: isSelected ? Border.all(color: C.primary, width: 1) : null,
        ),
        child: Row(children: [
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 5, vertical: 2),
            decoration: BoxDecoration(
              color: (colors[diff] ?? C.primary).withOpacity(0.2),
              borderRadius: BorderRadius.circular(4),
            ),
            child: Text(diffLabel[diff] ?? '', style: TextStyle(fontSize: 10, fontWeight: FontWeight.w600, color: colors[diff])),
          ),
          const SizedBox(width: 6),
          Text(item['no'], style: const TextStyle(fontSize: 11, color: C.text2, fontFamily: 'monospace')),
          const SizedBox(width: 6),
          Expanded(child: Text(item['user_prompt'], style: const TextStyle(fontSize: 13, color: C.text))),
          const Text('⚡', style: TextStyle(fontSize: 13)),
        ]),
      ),
    );
  }

  Widget _buildPrebuiltGuideCard() {
    final item = _selectedPrebuilt!;
    return Container(
      margin: const EdgeInsets.only(top: 10),
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(
        color: C.surface,
        borderRadius: BorderRadius.circular(10),
        border: Border.all(color: C.primary, width: 1),
      ),
      child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
        Row(children: [
          Expanded(child: Text('⚡ ${item['user_prompt']}',
            style: const TextStyle(fontSize: 15, fontWeight: FontWeight.bold, color: C.text))),
          GestureDetector(
            onTap: () => setState(() { _selectedPrebuilt = null; _guideData = null; }),
            child: const Icon(Icons.close, size: 18, color: C.text2),
          ),
        ]),
        const SizedBox(height: 4),
        Text('${item['no']} · ${item['category_name']} · ${((item['firmware_size'] ?? 0) / 1024).toStringAsFixed(0)}KB',
          style: const TextStyle(fontSize: 11, color: C.text2)),
        if (item['description'] != null)
          Padding(padding: const EdgeInsets.only(top: 4),
            child: Text(item['description'], style: const TextStyle(fontSize: 13, color: C.text))),
        const SizedBox(height: 10),
        // Send button
        SizedBox(
          width: double.infinity,
          child: ElevatedButton.icon(
            onPressed: (_otaStatus == 'transferring') ? null : () => _sendPrebuilt(item['no']),
            icon: const Icon(Icons.bolt),
            label: Text(
              _s.bleStatus == 'connected'
                ? (_otaStatus == 'transferring' ? '전송 중...' : '⚡ 보드에 보내기')
                : '⚡ 보드에 보내기 (BLE 자동 연결)',
              style: const TextStyle(fontSize: 14, fontWeight: FontWeight.bold, color: Colors.white),
            ),
            style: ElevatedButton.styleFrom(
              backgroundColor: const Color(0xFF6C5CE7),
              padding: const EdgeInsets.symmetric(vertical: 12),
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
            ),
          ),
        ),
        // Guide content
        if (_guideData != null) ...[
          const SizedBox(height: 10),
          if (_guideData!['what_happens'] != null) ...[
            const Text('동작 순서', style: TextStyle(fontSize: 13, fontWeight: FontWeight.w600, color: C.primary)),
            const SizedBox(height: 4),
            ...(_guideData!['what_happens'] as List).map((s) =>
              Padding(padding: const EdgeInsets.only(bottom: 2),
                child: Text('▸ $s', style: const TextStyle(fontSize: 12, color: C.text)))),
          ],
          if (_guideData!['concepts'] != null) ...[
            const SizedBox(height: 8),
            const Text('학습 개념', style: TextStyle(fontSize: 13, fontWeight: FontWeight.w600, color: C.primary)),
            const SizedBox(height: 4),
            ...(_guideData!['concepts'] as List).map((c) =>
              Container(
                margin: const EdgeInsets.only(bottom: 4),
                padding: const EdgeInsets.all(8),
                decoration: BoxDecoration(color: C.surface2, borderRadius: BorderRadius.circular(6)),
                child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                  Text(c['term'] ?? '', style: const TextStyle(fontSize: 12, fontWeight: FontWeight.w600, color: C.primary)),
                  Text(c['explanation'] ?? '', style: const TextStyle(fontSize: 11, color: C.text2)),
                ]),
              )),
          ],
        ],
      ]),
    );
  }

  // ─── UI ───

  // 현재 단계 판단
  int get _currentStep {
    if (_s.bleStatus != 'connected' && _buildStatus == 'idle') return 0; // BLE 미연결
    if (_buildStatus == 'idle') return 1; // 프롬프트 입력 대기
    if (_buildStatus == 'generating' || _buildStatus == 'building') return 2; // 빌드 중
    if (_buildStatus == 'success' && _otaStatus == 'idle') return 3; // OTA 대기
    if (_otaStatus == 'transferring' || _otaStatus == 'verifying') return 4; // OTA 중
    if (_otaStatus == 'success') return 5; // 완료
    return 1;
  }

  @override
  Widget build(BuildContext context) {
    super.build(context);
    return Scaffold(
      backgroundColor: C.bg,
      appBar: AppBar(
        title: const Text('UTTEC Firmware', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 18)),
        centerTitle: false,
        actions: [
          // BLE 상태 배너 (탭하면 연결/해제)
          GestureDetector(
            onTap: _s.bleStatus == 'connected' ? _disconnectBLE
                 : _s.bleStatus == 'connecting' ? null
                 : _connectBLE,
            child: Container(
              margin: const EdgeInsets.only(right: 12),
              padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
              decoration: BoxDecoration(
                color: _s.bleStatus == 'connected' ? C.success.withValues(alpha: 0.15)
                     : _s.bleStatus == 'connecting' ? C.warning.withValues(alpha: 0.15)
                     : C.error.withValues(alpha: 0.15),
                borderRadius: BorderRadius.circular(20),
              ),
              child: Row(mainAxisSize: MainAxisSize.min, children: [
                Container(width: 8, height: 8, decoration: BoxDecoration(
                  shape: BoxShape.circle,
                  color: _s.bleStatus == 'connected' ? C.success
                       : _s.bleStatus == 'connecting' ? C.warning : C.error,
                )),
                const SizedBox(width: 6),
                Text(_s.bleStatus == 'connected' ? _s.deviceName
                   : _s.bleStatus == 'connecting' ? '스캔 중...' : 'BLE 연결',
                  style: TextStyle(fontSize: 12, fontWeight: FontWeight.w600,
                    color: _s.bleStatus == 'connected' ? C.success
                         : _s.bleStatus == 'connecting' ? C.warning : C.text2)),
              ]),
            ),
          ),
        ],
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(children: [
          _buildPromptCard(),
          if (_buildStatus != 'idle') _buildProgressCard(),
          if (_generatedCode != null && _generatedCode!.isNotEmpty && _buildStatus == 'success') _buildCodeCard(),
          if (_history.isNotEmpty) _buildHistoryCard(),
          _buildQuestionCard(),
          if (_questionStatus != 'idle') _buildAnswerCard(),
        ]),
      ),
    );
  }

  Widget _buildGuideCard() {
    // 단계별 안내 메시지
    final steps = [
      {'icon': '1', 'label': 'BLE 연결', 'done': _s.bleStatus == 'connected'},
      {'icon': '2', 'label': '프롬프트', 'done': _buildStatus != 'idle'},
      {'icon': '3', 'label': '빌드', 'done': _buildStatus == 'success'},
      {'icon': '4', 'label': 'OTA 전송', 'done': _otaStatus == 'success'},
    ];

    String guideText;
    if (_otaStatus == 'success') {
      guideText = 'UTTEC 보드가 새 펌웨어로 동작하고 있어요!';
    } else if (_firmware != null && _s.bleStatus == 'connected') {
      guideText = '펌웨어가 준비됐어요. UTTEC 보드에 전송 버튼을 눌러주세요!';
    } else if (_firmware != null && _s.bleStatus != 'connected') {
      guideText = '펌웨어 준비 완료! 오른쪽 상단 BLE 연결 후 전송하세요.';
    } else if (_buildStatus == 'generating' || _buildStatus == 'building') {
      guideText = 'AI가 코드를 만들고 빌드하고 있어요. 잠시만 기다려주세요!';
    } else if (_s.bleStatus != 'connected') {
      guideText = '오른쪽 상단 "BLE 연결"을 터치하여 UTTEC 보드를 연결하세요.';
    } else {
      guideText = 'UTTEC 보드에게 시킬 일을 자연어로 입력하고 실행하세요!';
    }

    return Container(
      margin: const EdgeInsets.only(bottom: 12),
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(
        gradient: LinearGradient(colors: [C.primary.withValues(alpha: 0.15), C.surface]),
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: C.primary.withValues(alpha: 0.3)),
      ),
      child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
        // 단계 인디케이터
        Row(children: List.generate(steps.length, (i) {
          final s = steps[i];
          final done = s['done'] as bool;
          final active = i == _currentStep;
          return Expanded(child: Row(children: [
            Container(
              width: 22, height: 22,
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                color: done ? C.success : active ? C.primary : C.surface2,
              ),
              child: Center(child: done
                ? const Icon(Icons.check, size: 14, color: Colors.white)
                : Text(s['icon'] as String, style: TextStyle(fontSize: 11,
                    color: active ? Colors.white : C.text2, fontWeight: FontWeight.bold))),
            ),
            if (i < steps.length - 1)
              Expanded(child: Container(height: 2, color: done ? C.success : C.surface2)),
          ]));
        })),
        const SizedBox(height: 10),
        Text(guideText, style: const TextStyle(fontSize: 13, color: C.text, height: 1.4)),
      ]),
    );
  }

  Widget _buildBLEWarning() {
    return GestureDetector(
      onTap: _connectBLE,
      child: Container(
        margin: const EdgeInsets.only(bottom: 12),
        padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
        decoration: BoxDecoration(
          color: C.warning.withValues(alpha: 0.1),
          borderRadius: BorderRadius.circular(10),
          border: Border.all(color: C.warning.withValues(alpha: 0.3)),
        ),
        child: const Row(children: [
          Icon(Icons.bluetooth_disabled, size: 18, color: C.warning),
          SizedBox(width: 8),
          Expanded(child: Text('UTTEC 보드가 연결되지 않았어요. 여기를 터치하여 연결하세요.',
            style: TextStyle(fontSize: 12, color: C.warning))),
          Icon(Icons.chevron_right, size: 18, color: C.warning),
        ]),
      ),
    );
  }

  Widget _buildPromptCard() {
    final totalCount = _exPromptData.fold<int>(0, (s, c) => s + (c['items'] as List).length);
    return styledCard(
      title: 'UTTEC 보드에 명령하기',
      icon: Icons.auto_awesome,
      child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
        // ⚡ 사전빌드 카탈로그
        if (_catalogLoaded) _buildPrebuiltCatalog(),

        // 예시 프롬프트 (접기/펼치기) — 실시간 빌드용
        _buildCollapsibleExamples(
          expanded: _showExPrompts,
          onToggle: () => setState(() { _showExPrompts = !_showExPrompts; _exPromptCat = -1; }),
          label: '🚀 자유 프롬프트 예시 ($totalCount개)',
          icon: Icons.list_alt,
          selectedCat: _exPromptCat,
          data: _exPromptData,
          accentColor: C.primary,
          onCatSelect: (i) => setState(() => _exPromptCat = _exPromptCat == i ? -1 : i),
          onItemSelect: (t) => setState(() {
            _promptController.text = t;
            _showExPrompts = false;
            _exPromptCat = -1;
          }),
        ),
        const SizedBox(height: 10),
        TextField(
          controller: _promptController,
          maxLines: 3,
          decoration: InputDecoration(
            hintText: '예: RGB LED를 무지개색으로 순환하고,\nLCD에 "Hello!"를 표시해줘',
            hintStyle: const TextStyle(color: Color(0xFF64748B), fontSize: 14, height: 1.5),
            filled: true,
            fillColor: C.surface2,
            border: OutlineInputBorder(
              borderRadius: BorderRadius.circular(10),
              borderSide: const BorderSide(color: C.border),
            ),
            focusedBorder: OutlineInputBorder(
              borderRadius: BorderRadius.circular(10),
              borderSide: const BorderSide(color: C.primary),
            ),
          ),
        ),
        const SizedBox(height: 12),
        SizedBox(
          width: double.infinity,
          child: ElevatedButton.icon(
            onPressed: (_buildStatus == 'generating' || _buildStatus == 'building')
              ? null : _startBuild,
            icon: Icon(
              (_buildStatus == 'generating' || _buildStatus == 'building')
                ? Icons.hourglass_top : Icons.rocket_launch,
            ),
            label: Text(
              (_buildStatus == 'generating' || _buildStatus == 'building')
                ? 'AI가 펌웨어를 만들고 있어요...'
                : '위 명령을 UTTEC 펌웨어로 만들기',
              style: const TextStyle(fontSize: 15, fontWeight: FontWeight.bold, color: Colors.white),
            ),
            style: ElevatedButton.styleFrom(
              padding: const EdgeInsets.symmetric(vertical: 16),
              backgroundColor: C.primary,
              foregroundColor: Colors.white,
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
            ),
          ),
        ),
      ]),
    );
  }

  // ─── 공통: 접기/펼치기 예시 목록 위젯 ───
  Widget _buildCollapsibleExamples({
    required bool expanded,
    required VoidCallback onToggle,
    required String label,
    required IconData icon,
    required int selectedCat,
    required List<Map<String, dynamic>> data,
    required Color accentColor,
    required void Function(int) onCatSelect,
    required void Function(String) onItemSelect,
  }) {
    return Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
      GestureDetector(
        onTap: onToggle,
        child: Container(
          padding: const EdgeInsets.symmetric(vertical: 8),
          child: Row(children: [
            Icon(icon, size: 16, color: C.text2),
            const SizedBox(width: 6),
            Expanded(child: Text(
              expanded ? '$label — 카테고리를 선택하세요' : '$label — 터치하면 펼침',
              style: const TextStyle(fontSize: 12, color: C.text2, fontWeight: FontWeight.w600),
            )),
            Icon(expanded ? Icons.expand_less : Icons.expand_more, size: 18, color: C.text2),
          ]),
        ),
      ),
      if (expanded) ...[
        SingleChildScrollView(
          scrollDirection: Axis.horizontal,
          child: Row(children: List.generate(data.length, (i) {
            final cat = data[i];
            final sel = selectedCat == i;
            return GestureDetector(
              onTap: () => onCatSelect(i),
              child: Container(
                margin: const EdgeInsets.only(right: 6),
                padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                decoration: BoxDecoration(
                  color: sel ? accentColor : C.surface2,
                  borderRadius: BorderRadius.circular(16),
                ),
                child: Text('${cat['cat']} (${(cat['items'] as List).length})',
                  style: TextStyle(fontSize: 12, fontWeight: FontWeight.w600,
                    color: sel ? Colors.white : C.text2)),
              ),
            );
          })),
        ),
        if (selectedCat >= 0) ...[
          const SizedBox(height: 8),
          ...((data[selectedCat]['items'] as List).cast<String>()).map((t) =>
            GestureDetector(
              onTap: () => onItemSelect(t),
              child: Container(
                width: double.infinity,
                margin: const EdgeInsets.only(bottom: 4),
                padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
                decoration: BoxDecoration(
                  color: C.surface2,
                  borderRadius: BorderRadius.circular(8),
                  border: Border.all(color: C.border),
                ),
                child: Row(children: [
                  Icon(Icons.play_arrow, size: 14, color: accentColor),
                  const SizedBox(width: 8),
                  Expanded(child: Text(t, style: const TextStyle(fontSize: 13))),
                ]),
              ),
            ),
          ),
        ],
      ],
    ]);
  }

  // ─── 코딩 질문 API 호출 ───
  Future<void> _askQuestion() async {
    final q = _questionController.text.trim();
    if (q.isEmpty) return;
    setState(() { _questionStatus = 'asking'; _questionAnswer = ''; });
    final t0 = DateTime.now();
    try {
      final resp = await http.post(
        Uri.parse('${_s.serverUrl}/api/v1/chat'),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({'question': q}),
      ).timeout(const Duration(seconds: 120));
      if (resp.statusCode == 200) {
        final data = jsonDecode(resp.body);
        setState(() {
          _questionStatus = 'done';
          _questionAnswer = data['answer'] ?? '';
          _questionElapsed = (data['elapsed'] ?? 0).toDouble();
        });
      } else {
        setState(() { _questionStatus = 'failed'; _questionAnswer = '오류: ${resp.body}'; });
      }
    } catch (e) {
      setState(() { _questionStatus = 'failed'; _questionAnswer = '연결 실패: $e'; });
    }
  }

  // ─── 코딩 질문 카드 ───
  Widget _buildQuestionCard() {
    final totalCount = _exQuestionData.fold<int>(0, (s, c) => s + (c['items'] as List).length);
    return styledCard(
      title: '코딩 질문하기',
      icon: Icons.chat_bubble_outline,
      child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
        _buildCollapsibleExamples(
          expanded: _showExQuestions,
          onToggle: () => setState(() { _showExQuestions = !_showExQuestions; _exQuestionCat = -1; }),
          label: '예시 질문 ($totalCount개)',
          icon: Icons.help_outline,
          selectedCat: _exQuestionCat,
          data: _exQuestionData,
          accentColor: const Color(0xFF7C3AED),
          onCatSelect: (i) => setState(() => _exQuestionCat = _exQuestionCat == i ? -1 : i),
          onItemSelect: (t) => setState(() {
            _questionController.text = t;
            _showExQuestions = false;
            _exQuestionCat = -1;
          }),
        ),
        const SizedBox(height: 10),
        TextField(
          controller: _questionController,
          maxLines: 2,
          decoration: InputDecoration(
            hintText: '코딩에 대해 궁금한 것을 물어보세요...\n예: for문과 while문의 차이가 뭐야?',
            hintStyle: const TextStyle(color: Color(0xFF64748B), fontSize: 14, height: 1.5),
            filled: true, fillColor: C.surface2,
            border: OutlineInputBorder(borderRadius: BorderRadius.circular(10), borderSide: const BorderSide(color: C.border)),
            focusedBorder: OutlineInputBorder(borderRadius: BorderRadius.circular(10), borderSide: const BorderSide(color: Color(0xFF7C3AED))),
          ),
        ),
        const SizedBox(height: 12),
        SizedBox(
          width: double.infinity,
          child: ElevatedButton.icon(
            onPressed: _questionStatus == 'asking' ? null : _askQuestion,
            icon: Icon(_questionStatus == 'asking' ? Icons.hourglass_top : Icons.chat),
            label: Text(
              _questionStatus == 'asking' ? 'AI가 답변을 생각하고 있어요...' : '질문하기',
              style: const TextStyle(fontSize: 15, fontWeight: FontWeight.bold, color: Colors.white),
            ),
            style: ElevatedButton.styleFrom(
              padding: const EdgeInsets.symmetric(vertical: 16),
              backgroundColor: const Color(0xFF7C3AED),
              foregroundColor: Colors.white,
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
            ),
          ),
        ),
      ]),
    );
  }

  // ─── 답변 카드 ───
  Widget _buildAnswerCard() {
    return styledCard(
      title: 'AI 답변${_questionElapsed > 0 ? ' (${_questionElapsed}초)' : ''}',
      icon: Icons.smart_toy,
      child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
        if (_questionStatus == 'asking')
          const Center(child: Padding(
            padding: EdgeInsets.all(20),
            child: CircularProgressIndicator(color: Color(0xFF7C3AED)),
          ))
        else
          SelectableText(_questionAnswer,
            style: TextStyle(
              fontSize: 14, height: 1.7,
              color: _questionStatus == 'failed' ? C.error : C.text,
            ),
          ),
      ]),
    );
  }

  Widget _buildProgressCard() {
    final bool isBuilding = _buildStatus == 'generating' || _buildStatus == 'building';
    final bool buildDone = _buildStatus == 'success';
    final bool otaDone = _otaStatus == 'success';
    final bool otaInProgress = _otaStatus == 'transferring' || _otaStatus == 'verifying';
    final bool hasFailed = _buildStatus == 'failed' || _otaStatus == 'failed';

    Color statusColor = hasFailed ? C.error
                       : otaDone ? C.success
                       : isBuilding ? C.primary
                       : buildDone ? C.success : C.primary;

    // 전체 진행률 계산
    double totalProgress;
    String statusText;
    String statusIcon;
    String statusSub;
    if (otaDone) {
      totalProgress = 1.0;
      statusText = '전송 완료!';
      statusSub = 'UTTEC 보드가 새 펌웨어로 동작 중';
      statusIcon = '✅';
    } else if (otaInProgress) {
      totalProgress = 0.7 + (_otaProgress / 100) * 0.3;
      statusText = 'BLE 전송 중...';
      statusSub = 'UTTEC 보드에 펌웨어 전송';
      statusIcon = '📡';
    } else if (buildDone && _firmware != null) {
      totalProgress = 0.7;
      statusText = '빌드 완료!';
      statusSub = '${(_firmwareSize / 1024).toStringAsFixed(0)} KB 준비됨';
      statusIcon = '✅';
    } else if (_buildStatus == 'generating') {
      totalProgress = (_buildProgress / 100) * 0.35;
      statusText = 'AI 코드 생성 중...';
      statusSub = 'Claude가 코드를 작성합니다';
      statusIcon = '🤖';
    } else if (_buildStatus == 'building') {
      totalProgress = 0.35 + (_buildProgress / 100) * 0.35;
      statusText = '펌웨어 빌드 중...';
      statusSub = 'Arduino로 컴파일합니다';
      statusIcon = '🔨';
    } else if (hasFailed) {
      totalProgress = 0;
      statusText = '실패';
      statusSub = _otaStatus == 'failed' ? _otaMessage : _buildMessage;
      statusIcon = '❌';
    } else {
      totalProgress = 0;
      statusText = _buildMessage;
      statusSub = '';
      statusIcon = '⏳';
    }

    int pct = (totalProgress * 100).round();

    // 3단계 타임라인 데이터
    int currentStep = 0;
    if (_buildStatus == 'generating') currentStep = 0;
    else if (_buildStatus == 'building') currentStep = 1;
    else if (buildDone || otaInProgress || otaDone) currentStep = 2;
    final timelineSteps = [
      {'label': 'AI 생성', 'done': currentStep > 0 || buildDone || otaDone},
      {'label': '빌드', 'done': currentStep > 1 || buildDone || otaDone},
      {'label': '완료', 'done': buildDone || otaDone},
    ];

    return styledCard(
      title: '진행 상태',
      icon: Icons.rocket_launch,
      child: Column(children: [
        // 큰 아이콘 + 상태
        Padding(
          padding: const EdgeInsets.symmetric(vertical: 12),
          child: Column(children: [
            Text(statusIcon, style: const TextStyle(fontSize: 40)),
            const SizedBox(height: 8),
            Text(statusText, style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: statusColor)),
            if (statusSub.isNotEmpty)
              Padding(padding: const EdgeInsets.only(top: 4),
                child: Text(statusSub, style: const TextStyle(fontSize: 12, color: C.text2))),
          ]),
        ),
        // 프로그레스 바 + 퍼센트
        ClipRRect(
          borderRadius: BorderRadius.circular(5),
          child: LinearProgressIndicator(
            value: isBuilding ? null : totalProgress,
            backgroundColor: C.surface2,
            valueColor: AlwaysStoppedAnimation(statusColor),
            minHeight: 10,
          ),
        ),
        Padding(
          padding: const EdgeInsets.only(top: 6, bottom: 8),
          child: Text('$pct%', style: TextStyle(fontSize: 13, fontWeight: FontWeight.bold, color: statusColor)),
        ),
        // 3단계 타임라인
        Row(children: List.generate(3, (i) {
          final step = timelineSteps[i];
          final done = step['done'] as bool;
          final active = i == currentStep && isBuilding;
          return Expanded(child: Container(
            margin: EdgeInsets.only(left: i > 0 ? 4 : 0),
            padding: const EdgeInsets.symmetric(vertical: 10),
            decoration: BoxDecoration(
              color: done ? C.success.withValues(alpha: 0.15)
                   : active ? C.primary.withValues(alpha: 0.12) : C.surface2,
              borderRadius: BorderRadius.circular(10),
              border: Border.all(color: done ? C.success : active ? C.primary : C.border),
            ),
            child: Column(children: [
              Container(width: 22, height: 22,
                decoration: BoxDecoration(shape: BoxShape.circle,
                  color: done ? C.success : active ? C.primary : C.surface2),
                child: Center(child: done
                  ? const Icon(Icons.check, size: 14, color: Colors.white)
                  : Text('${i + 1}', style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold,
                      color: active ? Colors.white : C.text2))),
              ),
              const SizedBox(height: 4),
              Text(step['label'] as String,
                style: TextStyle(fontSize: 11, fontWeight: FontWeight.w600,
                  color: done ? C.success : active ? C.text : C.text2)),
              Text(active ? '${_elapsedSeconds}초' : done ? '✓' : '-',
                style: TextStyle(fontSize: 11, fontWeight: FontWeight.w600,
                  color: done ? C.success : active ? C.warning : C.text2)),
            ]),
          ));
        })),
        const SizedBox(height: 10),
        // 빌드 완료 후 — 자동 진행 또는 수동 재시도
        if (buildDone && _firmware != null && !otaDone && !otaInProgress)
          SizedBox(
            width: double.infinity,
            child: ElevatedButton.icon(
              onPressed: _autoConnectAndSend,
              icon: const Icon(Icons.send),
              label: Text(_s.bleStatus == 'connected'
                  ? 'UTTEC 보드에 무선 전송하기'
                  : 'UTTEC 보드 연결 + 전송하기'),
              style: ElevatedButton.styleFrom(
                padding: const EdgeInsets.symmetric(vertical: 14),
                backgroundColor: C.success,
                foregroundColor: Colors.white,
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
              ),
            ),
          ),
        if (otaInProgress)
          const Padding(
            padding: EdgeInsets.symmetric(vertical: 8),
            child: Row(children: [
              SizedBox(width: 16, height: 16, child: CircularProgressIndicator(strokeWidth: 2, color: C.success)),
              SizedBox(width: 8),
              Text('UTTEC 보드에 펌웨어 전송 중...', style: TextStyle(fontSize: 13, color: C.success)),
            ]),
          ),
        // 완료 표시 + 새 명령 버튼
        if (otaDone) ...[
          Container(
            width: double.infinity,
            padding: const EdgeInsets.all(14),
            decoration: BoxDecoration(
              color: C.success.withValues(alpha: 0.15),
              borderRadius: BorderRadius.circular(10),
              border: Border.all(color: C.success.withValues(alpha: 0.3)),
            ),
            child: const Column(children: [
              Icon(Icons.check_circle, color: C.success, size: 36),
              SizedBox(height: 8),
              Text('전송 완료!', style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: C.success)),
              SizedBox(height: 4),
              Text('UTTEC 보드를 확인하세요.\n새 펌웨어가 동작하고 있습니다.',
                textAlign: TextAlign.center,
                style: TextStyle(fontSize: 13, color: C.text2, height: 1.5)),
            ]),
          ),
          const SizedBox(height: 10),
          SizedBox(
            width: double.infinity,
            child: ElevatedButton.icon(
              onPressed: () => setState(() {
                _buildStatus = 'idle';
                _otaStatus = 'idle';
                _firmware = null;
                _promptController.clear();
              }),
              icon: const Icon(Icons.refresh),
              label: const Text('새로운 명령 입력하기'),
              style: ElevatedButton.styleFrom(
                padding: const EdgeInsets.symmetric(vertical: 14),
                backgroundColor: C.primary,
                foregroundColor: Colors.white,
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
              ),
            ),
          ),
        ],
      ]),
    );
  }

  Widget _buildCodeCard() {
    return styledCard(
      title: '생성된 코드 학습하기',
      icon: Icons.school,
      child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
        GestureDetector(
          onTap: () => setState(() => _showCode = !_showCode),
          child: Row(children: [
            Icon(_showCode ? Icons.expand_less : Icons.expand_more, size: 20, color: C.primary),
            const SizedBox(width: 4),
            Text(_showCode ? '코드 접기' : '코드와 설명 보기',
              style: const TextStyle(fontSize: 13, color: C.primary, fontWeight: FontWeight.w600)),
            const Spacer(),
            const Icon(Icons.lightbulb, size: 14, color: C.warning),
            const SizedBox(width: 4),
            const Text('주석에 설명이 있어요', style: TextStyle(fontSize: 11, color: C.text2)),
          ]),
        ),
        if (_showCode) ...[
          const SizedBox(height: 10),
          ..._buildCodeLines(),
        ],
      ]),
    );
  }

  List<Widget> _buildCodeLines() {
    final lines = _generatedCode!.split('\n');
    final widgets = <Widget>[];

    for (final line in lines) {
      final trimmed = line.trim();

      if (trimmed.startsWith('// [')) {
        // [주제] 설명 형식의 주석 → 설명 박스로 표시
        final content = trimmed.substring(3); // "// " 제거
        widgets.add(Container(
          width: double.infinity,
          margin: const EdgeInsets.only(top: 6, bottom: 2),
          padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
          decoration: BoxDecoration(
            color: C.primary.withValues(alpha: 0.1),
            borderRadius: BorderRadius.circular(6),
            border: Border(left: BorderSide(color: C.warning, width: 3)),
          ),
          child: Row(crossAxisAlignment: CrossAxisAlignment.start, children: [
            const Icon(Icons.lightbulb, size: 13, color: C.warning),
            const SizedBox(width: 6),
            Expanded(child: Text(content,
              style: const TextStyle(fontSize: 12, color: C.text, height: 1.4))),
          ]),
        ));
      } else if (trimmed.startsWith('//')) {
        // 일반 주석
        widgets.add(Padding(
          padding: const EdgeInsets.only(top: 2),
          child: Text(line, style: const TextStyle(
            fontFamily: 'monospace', fontSize: 11,
            color: Color(0xFF8B949E), height: 1.5)),
        ));
      } else if (trimmed.isEmpty) {
        widgets.add(const SizedBox(height: 4));
      } else {
        // 코드 라인
        widgets.add(Container(
          width: double.infinity,
          padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 1),
          color: const Color(0xFF0D1117),
          child: Text(line, style: const TextStyle(
            fontFamily: 'monospace', fontSize: 11,
            color: Color(0xFFE6EDF3), height: 1.5)),
        ));
      }
    }
    return widgets;
  }

  Widget _buildHistoryCard() {
    return styledCard(
      title: '최근 기록 (${_history.length}개)',
      icon: Icons.history,
      child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
        GestureDetector(
          onTap: () => setState(() => _showHistory = !_showHistory),
          child: Row(children: [
            Icon(_showHistory ? Icons.expand_less : Icons.expand_more, size: 20, color: C.primary),
            const SizedBox(width: 4),
            Text(_showHistory ? '접기' : '펼치기 (터치하면 바로 실행)',
              style: const TextStyle(fontSize: 13, color: C.primary, fontWeight: FontWeight.w600)),
          ]),
        ),
        if (_showHistory) ...[
          const SizedBox(height: 8),
          ...List.generate(_history.length, (i) {
            final h = _history[i];
            return GestureDetector(
              onTap: () {
                _promptController.text = h['prompt'] ?? '';
                setState(() => _showHistory = false);
              },
              child: Container(
                margin: const EdgeInsets.only(bottom: 6),
                padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
                decoration: BoxDecoration(
                  color: C.surface2,
                  borderRadius: BorderRadius.circular(8),
                  border: Border.all(color: C.border),
                ),
                child: Row(children: [
                  const Icon(Icons.play_arrow, size: 16, color: C.primary),
                  const SizedBox(width: 8),
                  Expanded(child: Text(h['prompt'] ?? '',
                    style: const TextStyle(fontSize: 13), maxLines: 2, overflow: TextOverflow.ellipsis)),
                  Text(h['time'] ?? '', style: const TextStyle(fontSize: 11, color: C.text2)),
                ]),
              ),
            );
          }),
        ],
      ]),
    );
  }
}

// ═══════════════════════════════════════════════════════════
//  TAB 2: HW (Hardware Learning)
// ═══════════════════════════════════════════════════════════

class _HWComponent {
  final String icon;
  final String name;
  final String id;
  const _HWComponent(this.icon, this.name, this.id);
}

const _hwComponents = [
  _HWComponent('\uD83C\uDF08', 'RGB LED', 'ws2812'),
  _HWComponent('\uD83D\uDCFA', 'LCD', 'lcd'),
  _HWComponent('\uD83D\uDD18', 'BOOT BTN', 'button'),
  _HWComponent('\uD83D\uDCF6', 'WiFi 6', 'wifi'),
  _HWComponent('\uD83D\uDD17', 'BLE 5.0', 'ble'),
  _HWComponent('\uD83D\uDD0C', 'I2C', 'i2c'),
  _HWComponent('\u26A1', 'Power', 'power'),
];

class HWTab extends StatefulWidget {
  const HWTab({super.key});
  @override
  State<HWTab> createState() => _HWTabState();
}

class _HWTabState extends State<HWTab> with AutomaticKeepAliveClientMixin {
  @override
  bool get wantKeepAlive => true;

  String? _selectedId;

  @override
  Widget build(BuildContext context) {
    super.build(context);
    return Scaffold(
      backgroundColor: C.bg,
      appBar: AppBar(
        title: Text(_selectedId == null ? '\uD558\uB4DC\uC6E8\uC5B4 \uD559\uC2B5' : _getTitle(_selectedId!),
          style: const TextStyle(fontWeight: FontWeight.bold)),
        leading: _selectedId != null
          ? IconButton(icon: const Icon(Icons.arrow_back), onPressed: () => setState(() => _selectedId = null))
          : null,
      ),
      body: _selectedId == null ? _buildGrid() : _buildDetail(_selectedId!),
    );
  }

  String _getTitle(String id) {
    for (var c in _hwComponents) {
      if (c.id == id) return '${c.icon} ${c.name}';
    }
    return '';
  }

  Widget _buildGrid() {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(16),
      child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
        // Board info card
        Container(
          width: double.infinity,
          margin: const EdgeInsets.only(bottom: 16),
          decoration: BoxDecoration(
            color: C.surface,
            borderRadius: BorderRadius.circular(12),
            border: Border.all(color: C.border),
          ),
          padding: const EdgeInsets.all(16),
          child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
            Row(children: [
              Container(
                padding: const EdgeInsets.all(8),
                decoration: BoxDecoration(color: C.primary.withOpacity(0.2), borderRadius: BorderRadius.circular(8)),
                child: const Icon(Icons.memory, color: C.primary, size: 24),
              ),
              const SizedBox(width: 12),
              const Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                Text('UTTEC C6-LCD', style: TextStyle(fontSize: 15, fontWeight: FontWeight.w700)),
                SizedBox(height: 2),
                Text('ESP32-C6 RISC-V 160MHz · 4MB Flash · 1.47" LCD',
                  style: TextStyle(fontSize: 12, color: C.text2)),
              ])),
            ]),
          ]),
        ),
        // 3x3 Grid
        GridView.count(
          crossAxisCount: 3,
          shrinkWrap: true,
          physics: const NeverScrollableScrollPhysics(),
          mainAxisSpacing: 10,
          crossAxisSpacing: 10,
          children: _hwComponents.map((c) => _hwCard(c)).toList(),
        ),
      ]),
    );
  }

  Widget _hwCard(_HWComponent c) {
    return GestureDetector(
      onTap: () => setState(() => _selectedId = c.id),
      child: Container(
        decoration: BoxDecoration(
          color: C.surface,
          borderRadius: BorderRadius.circular(12),
          border: Border.all(color: C.border),
        ),
        child: Column(mainAxisAlignment: MainAxisAlignment.center, children: [
          Text(c.icon, style: const TextStyle(fontSize: 32)),
          const SizedBox(height: 6),
          Text(c.name, style: const TextStyle(fontSize: 12, color: C.text2)),
        ]),
      ),
    );
  }

  Widget _buildDetail(String id) {
    final info = _hwDetailData[id];
    if (info == null) {
      return const Center(child: Text('\uC900\uBE44 \uC911...', style: TextStyle(color: C.text2)));
    }

    return SingleChildScrollView(
      padding: const EdgeInsets.all(16),
      child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
        // What is it?
        styledCard(
          title: '\uC774\uAC8C \uBB50\uC57C?',
          icon: Icons.help_outline,
          child: Text(info['desc']!, style: const TextStyle(fontSize: 14, height: 1.6)),
        ),
        // Circuit diagram
        if (info['circuit'] != null)
          styledCard(
            title: '\uD68C\uB85C \uC5F0\uACB0',
            icon: Icons.electrical_services,
            child: Container(
              width: double.infinity,
              padding: const EdgeInsets.all(14),
              decoration: BoxDecoration(
                color: C.codeBg,
                borderRadius: BorderRadius.circular(8),
              ),
              child: Text(info['circuit']!,
                style: const TextStyle(fontFamily: 'Courier New', fontSize: 13, color: C.codeGreen, height: 1.6)),
            ),
          ),
        // Tip
        if (info['tip'] != null)
          Container(
            margin: const EdgeInsets.only(bottom: 12),
            decoration: const BoxDecoration(
              color: Color(0x1A2563EB),
              border: Border(left: BorderSide(color: C.primary, width: 3)),
              borderRadius: BorderRadius.only(topRight: Radius.circular(8), bottomRight: Radius.circular(8)),
            ),
            padding: const EdgeInsets.all(12),
            child: Row(crossAxisAlignment: CrossAxisAlignment.start, children: [
              const Text('\uD83D\uDCA1 ', style: TextStyle(fontSize: 14)),
              Expanded(child: Text(info['tip']!, style: const TextStyle(fontSize: 13, height: 1.5))),
            ]),
          ),
        // Pin table
        if (info['pins'] != null)
          styledCard(
            title: '\uD540 \uC815\uBCF4',
            icon: Icons.pin,
            child: _buildPinTable(info['pins']!),
          ),
      ]),
    );
  }

  Widget _buildPinTable(String pinsData) {
    // pinsData format: "label1|value1\nlabel2|value2"
    final rows = pinsData.split('\n').where((r) => r.contains('|')).toList();
    return Table(
      columnWidths: const {0: FlexColumnWidth(2), 1: FlexColumnWidth(3)},
      children: rows.map((r) {
        final parts = r.split('|');
        return TableRow(
          decoration: const BoxDecoration(border: Border(bottom: BorderSide(color: C.border, width: 0.5))),
          children: [
            Padding(padding: const EdgeInsets.symmetric(vertical: 8, horizontal: 8),
              child: Text(parts[0], style: const TextStyle(fontSize: 13, color: C.text2))),
            Padding(padding: const EdgeInsets.symmetric(vertical: 8, horizontal: 8),
              child: Text(parts.length > 1 ? parts[1] : '', style: const TextStyle(fontSize: 13))),
          ],
        );
      }).toList(),
    );
  }
}

final Map<String, Map<String, String>> _hwDetailData = {
  'ws2812': {
    'desc': 'WS2812 RGB LED는 하나의 데이터 핀으로 빨강/초록/파랑을 개별 제어할 수 있는 스마트 LED입니다. 1600만 색상을 표현할 수 있습니다.',
    'circuit': 'ESP32-C6    WS2812\n'
        'GPIO8 ---[DIN]--- LED\n'
        '3.3V  ---[VCC]\n'
        'GND   ---[GND]',
    'tip': 'pixel.setPixelColor(0, pixel.Color(R,G,B))로 색상 설정. pixel.show()로 적용. setColor(r,g,b) 헬퍼 함수 사용 가능.',
    'pins': 'DATA|GPIO8\nLED 수|1개\n프로토콜|WS2812B (NeoPixel)\n밝기|pixel.setBrightness(0~255)',
  },
  'lcd': {
    'desc': '1.47인치 ST7789 컬러 TFT LCD입니다. 172x320 해상도로 텍스트, 도형, 색상을 자유롭게 표시할 수 있습니다. SPI 통신을 사용합니다.',
    'circuit': 'ESP32-C6      ST7789 LCD\n'
        'GPIO6  (MOSI) --- SDA\n'
        'GPIO7  (SCLK) --- SCL\n'
        'GPIO14 (CS)   --- CS\n'
        'GPIO15 (DC)   --- DC\n'
        'GPIO21 (RST)  --- RST\n'
        'GPIO22 (BL)   --- Backlight',
    'tip': 'lcd.fillScreen(color)으로 화면 채우기. lcdText(x,y,"text",color,size)로 텍스트 표시. lcd.fillCircle(x,y,r,color)로 원 그리기.',
    'pins': 'MOSI|GPIO6\nSCLK|GPIO7\nCS|GPIO14\nDC|GPIO15\nRST|GPIO21\nBacklight|GPIO22\n해상도|172 x 320\n드라이버|ST7789\n통신|SPI',
  },
  'button': {
    'desc': 'BOOT 버튼은 보드에 내장된 입력 장치입니다. 누르면 LOW, 놓으면 HIGH 신호가 됩니다. 내부 풀업 저항을 사용합니다.',
    'circuit': 'ESP32-C6    BOOT Button\n'
        'GPIO9 ---[SW]--- GND\n'
        '  |\n'
        '  +--- Internal Pull-up',
    'tip': 'INPUT_PULLUP 방식. digitalRead(9)==LOW이면 눌린 상태. 채터링 방지를 위해 50ms 딜레이 권장.',
    'pins': 'BOOT 버튼|GPIO9\n방식|Active LOW\n풀업|내부 Pull-up',
  },
  'wifi': {
    'desc': 'ESP32-C6는 WiFi 6 (802.11ax)를 지원합니다. 2.4GHz 대역에서 더 빠르고 효율적인 무선 통신이 가능합니다.',
    'circuit': 'ESP32-C6 (내장 안테나)\n'
        '  WiFi 6 (802.11ax) 2.4GHz\n'
        '  Zigbee 3.0 / Thread\n'
        '  IEEE 802.15.4',
    'tip': '#include <WiFi.h> 필요. WiFi.scanNetworks()로 주변 AP 스캔. WiFi.begin(ssid,pw)로 연결.',
    'pins': '규격|WiFi 6 (802.11ax)\n주파수|2.4GHz\n추가|Zigbee 3.0, Thread\n안테나|내장 PCB 안테나',
  },
  'ble': {
    'desc': 'BLE 5.0으로 스마트폰과 저전력 무선 통신을 합니다. UTTEC 앱에서 BLE OTA로 펌웨어를 무선 업로드합니다.',
    'circuit': 'ESP32-C6 <--BLE--> Smartphone\n'
        '  OTA Service: 0000FE00\n'
        '  FE01: Control (Write)\n'
        '  FE02: Data (Write NR)\n'
        '  FE03: Status (Notify)\n'
        '  FE04: CMD (Write)\n'
        '  FE05: Sensor (Notify)',
    'tip': 'sensorChar->setValue()/notify()로 데이터 전송. onBleReceive(String cmd)로 수신 처리. NimBLE 라이브러리 사용.',
    'pins': '규격|BLE 5.0\nMTU|256 bytes\n이름|UTTEC-C6 (NVS 저장)\nOTA|BLE 무선 펌웨어 업데이트',
  },
  'i2c': {
    'desc': 'I2C는 2개 선(SDA/SCL)으로 여러 장치를 연결하는 통신 방식입니다. 외부 헤더 핀으로 센서를 연결할 수 있습니다.',
    'circuit': 'ESP32-C6    External Sensor\n'
        'GPIO1 (SDA) --- SDA\n'
        'GPIO2 (SCL) --- SCL\n'
        '3.3V        --- VCC\n'
        'GND         --- GND',
    'tip': 'Wire.begin(1, 2)로 초기화 (initHardware()에서 자동 호출). AHT20(0x38), BME280(0x76) 등 연결 가능.',
    'pins': 'SDA|GPIO1\nSCL|GPIO2\n속도|100/400 kHz\n사용 예|AHT20, BME280, BH1750',
  },
  'power': {
    'desc': 'USB Type-C로 5V 전원을 공급받으며, ME6217C33M5G LDO로 3.3V로 변환합니다. 최대 800mA 출력.',
    'circuit': 'USB-C 5V --- ME6217 LDO --- 3.3V\n'
        '                           |\n'
        '                       ESP32-C6\n'
        '                           |\n'
        '                          GND',
    'tip': 'GPIO 출력 전압은 3.3V입니다. 5V 장치 연결 시 레벨 변환이 필요합니다.',
    'pins': 'USB 입력|5V Type-C\nMCU 동작|3.3V\nLDO|ME6217 (800mA)\n크기|36.37 x 20.32 mm',
  },
};

// ═══════════════════════════════════════════════════════════
//  TAB 3: SW (Software Learning)
// ═══════════════════════════════════════════════════════════

class SWTab extends StatefulWidget {
  const SWTab({super.key});
  @override
  State<SWTab> createState() => _SWTabState();
}

class _SWTabState extends State<SWTab> with AutomaticKeepAliveClientMixin {
  @override
  bool get wantKeepAlive => true;

  int? _expandedLine;
  int _selectedLesson = -1;

  final _lessons = [
    {
      'title': 'C언어 기초', 'sub': '변수, 타입, printf', 'icon': '✅',
      'stars': '★★★★★', 'locked': false,
      'content': '''C언어는 UTTEC Board 프로그래밍의 기본 언어입니다.

■ 변수 — 데이터를 저장하는 상자
  int count = 0;        // 정수 (숫자)
  float temp = 25.3;    // 소수점 숫자
  char name[] = "Hi";   // 문자열

■ 타입 — 변수의 종류
  int    → 정수 (-32768 ~ 32767)
  float  → 소수 (3.14)
  bool   → 참/거짓 (true / false)
  char   → 글자 한 개 ('A')
  void   → 반환값 없음

■ printf — 화면에 글자 출력
  printf("Hello!\\n");          // Hello! 출력
  printf("온도: %d도\\n", 25);  // 온도: 25도 출력

■ 함수 — 코드 묶음
  void setup() { }   // 시작할 때 한 번 실행
  void loop() { }    // 계속 반복 실행'''
    },
    {
      'title': 'GPIO 제어', 'sub': 'LED 켜고 끄기', 'icon': '✅',
      'stars': '★★★☆☆', 'locked': false,
      'content': '''GPIO(General Purpose Input/Output)는 UTTEC C6-LCD 보드의 핀을 제어하는 방법입니다.

■ 이 보드의 주요 핀
  WS2812 RGB LED = GPIO8 (NeoPixel)
  BOOT 버튼     = GPIO9 (Active LOW)
  LCD Backlight = GPIO22
  I2C SDA       = GPIO1
  I2C SCL       = GPIO2

■ RGB LED 제어 (WS2812)
  setColor(255, 0, 0);    // 빨간색
  setColor(0, 255, 0);    // 초록색
  ledOff();               // LED 끄기

■ LCD 제어 (ST7789 172x320)
  lcdClear();                          // 화면 지우기
  lcdText(10, 10, "Hello", C_RED, 2);  // 텍스트
  lcd.fillCircle(86, 160, 30, C_BLUE); // 원 그리기

■ 버튼 읽기
  int val = digitalRead(9);  // BOOT 버튼
  // val = 0 이면 눌림, 1 이면 안 눌림 (Active LOW)'''
    },
    {
      'title': '반복과 조건', 'sub': 'for, while, if', 'icon': '⏳',
      'stars': '★★☆☆☆', 'locked': false,
      'content': '''프로그램의 흐름을 제어하는 방법입니다.

■ if문 — 조건에 따라 실행
  if (temperature > 30) {
    printf("더워요!\\n");     // 30도 이상이면 실행
  } else {
    printf("쾌적해요\\n");    // 그 외
  }

■ for문 — 정해진 횟수만큼 반복
  for (int i = 0; i < 5; i++) {
    setColor(255, 0, 0);     // 빨간색 켜기
    delay(500);              // 0.5초 대기
    ledOff();                // LED 끄기
    delay(500);
  }
  // → RGB LED가 5번 깜빡인 후 멈춤

■ while문 — 조건이 참인 동안 반복
  while (true) {             // 무한 반복
    // 여기 코드가 계속 반복됩니다
  }

■ delay() — 시간 대기
  delay(1000);    // 1000밀리초 = 1초 대기
  delay(500);     // 500밀리초 = 0.5초 대기
  delay(100);     // 100밀리초 = 0.1초 대기'''
    },
    {
      'title': '함수', 'sub': '코드 분리와 재사용', 'icon': '🔒',
      'stars': '', 'locked': true,
      'content': '다음 단계에서 공개됩니다.'
    },
    {
      'title': 'I2C 통신', 'sub': '센서, 디스플레이', 'icon': '🔒',
      'stars': '', 'locked': true,
      'content': '다음 단계에서 공개됩니다.'
    },
    {
      'title': 'PWM과 타이머', 'sub': 'LED 페이드, 백라이트', 'icon': '🔒',
      'stars': '', 'locked': true,
      'content': '다음 단계에서 공개됩니다.'
    },
  ];

  final _codeLines = const [
    {'code': '#include <stdio.h>', 'type': 'preprocessor', 'explain': '#include\uB294 \uB2E4\uB978 \uD30C\uC77C\uC758 \uCF54\uB4DC\uB97C \uAC00\uC838\uC624\uB294 \uBA85\uB839\uC785\uB2C8\uB2E4. stdio.h\uB294 printf \uD568\uC218\uAC00 \uB4E4\uC5B4\uC788\uB294 \uD45C\uC900 \uC785\uCD9C\uB825 \uD5E4\uB354\uC785\uB2C8\uB2E4.'},
    {'code': '#include "driver/gpio.h"', 'type': 'preprocessor', 'explain': 'ESP-IDF\uC758 GPIO \uB4DC\uB77C\uC774\uBC84 \uD5E4\uB354\uC785\uB2C8\uB2E4. gpio_set_direction, gpio_set_level \uAC19\uC740 \uD568\uC218\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC788\uAC8C \uB429\uB2C8\uB2E4.'},
    {'code': '', 'type': 'empty', 'explain': ''},
    {'code': '#define LED_PIN 25', 'type': 'define', 'explain': '#define\uC740 \uC0C1\uC218\uB97C \uC815\uC758\uD569\uB2C8\uB2E4. LED_PIN\uC744 25\uB85C \uC815\uC758\uD558\uBA74 \uCF54\uB4DC\uC5D0\uC11C LED_PIN\uC744 \uC4F8 \uB54C\uB9C8\uB2E4 25\uB85C \uBC14\uB014\uB2C8\uB2E4.'},
    {'code': '', 'type': 'empty', 'explain': ''},
    {'code': 'void app_main(void) {', 'type': 'function', 'explain': 'UTTEC Board 프로그램의 시작점입니다. C언어의 main() 대신 ESP-IDF는 app_main()을 사용합니다.'},
    {'code': '    // GPIO \uCD08\uAE30\uD654', 'type': 'comment', 'explain': '// \uB4A4\uC758 \uB0B4\uC6A9\uC740 \uC8FC\uC11D\uC785\uB2C8\uB2E4. \uCEF4\uD4E8\uD130\uB294 \uBB34\uC2DC\uD558\uACE0, \uC0AC\uB78C\uC774 \uC77D\uAE30 \uC704\uD55C \uC124\uBA85\uC785\uB2C8\uB2E4.'},
    {'code': '    pixel.begin(); pixel.setBrightness(50);', 'type': 'call', 'explain': 'WS2812 RGB LED(GPIO8)를 초기화합니다. initHardware()에서 자동 호출됩니다.'},
    {'code': '', 'type': 'empty', 'explain': ''},
    {'code': '    while (1) {', 'type': 'loop', 'explain': '\uBB34\uD55C \uBC18\uBCF5\uBB38\uC785\uB2C8\uB2E4. \uC784\uBCA0\uB514\uB4DC \uC2DC\uC2A4\uD15C\uC740 \uACC4\uC18D \uB3D9\uC791\uD574\uC57C \uD558\uBBC0\uB85C \uBB34\uD55C \uB8E8\uD504\uB97C \uC0AC\uC6A9\uD569\uB2C8\uB2E4.'},
    {'code': '        gpio_set_level(LED_PIN, 1);', 'type': 'call', 'explain': 'LED_PIN\uC744 HIGH(1)\uB85C \uC124\uC815\uD569\uB2C8\uB2E4. 3.3V\uAC00 \uCD9C\uB825\uB418\uC5B4 LED\uAC00 \uCF1C\uC9D1\uB2C8\uB2E4.'},
    {'code': '        vTaskDelay(500 / portTICK_PERIOD_MS);', 'type': 'call', 'explain': '500ms(0.5\uCD08) \uB3D9\uC548 \uB300\uAE30\uD569\uB2C8\uB2E4. vTaskDelay\uB294 FreeRTOS\uC758 \uB300\uAE30 \uD568\uC218\uC785\uB2C8\uB2E4.'},
    {'code': '        gpio_set_level(LED_PIN, 0);', 'type': 'call', 'explain': 'LED_PIN\uC744 LOW(0)\uB85C \uC124\uC815\uD569\uB2C8\uB2E4. 0V\uAC00 \uB418\uC5B4 LED\uAC00 \uAEBC\uC9D1\uB2C8\uB2E4.'},
    {'code': '        vTaskDelay(500 / portTICK_PERIOD_MS);', 'type': 'call', 'explain': '\uB2E4\uC2DC 0.5\uCD08 \uB300\uAE30. \uACB0\uACFC\uC801\uC73C\uB85C LED\uAC00 1\uCD08 \uC8FC\uAE30\uB85C \uAE5C\uBE61\uC785\uB2C8\uB2E4.'},
    {'code': '    }', 'type': 'bracket', 'explain': 'while \uBC18\uBCF5\uBB38\uC758 \uB05D\uC785\uB2C8\uB2E4.'},
    {'code': '}', 'type': 'bracket', 'explain': 'app_main \uD568\uC218\uC758 \uB05D\uC785\uB2C8\uB2E4.'},
  ];

  @override
  Widget build(BuildContext context) {
    super.build(context);
    return Scaffold(
      backgroundColor: C.bg,
      appBar: AppBar(title: const Text('\uC18C\uD504\uD2B8\uC6E8\uC5B4 \uD559\uC2B5', style: TextStyle(fontWeight: FontWeight.bold))),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
          // Lessons list
          ...List.generate(_lessons.length, (i) => _lessonItem(i, _lessons[i])),
          const SizedBox(height: 20),
          // Code viewer
          styledCard(
            title: '\uCF54\uB4DC \uBDF0\uC5B4 — LED Blink',
            icon: Icons.code,
            child: _buildCodeViewer(),
          ),
          // Quiz
          styledCard(
            title: '\uD038\uC988',
            icon: Icons.quiz,
            child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
              const Text('Q. LED\uB97C \uCF1C\uB824\uBA74 gpio_set_level\uC758 \uB450 \uBC88\uC9F8 \uC778\uC790\uB85C \uBB34\uC5C7\uC744 \uB123\uC5B4\uC57C \uD560\uAE4C\uC694?',
                style: TextStyle(fontSize: 14, height: 1.5)),
              const SizedBox(height: 12),
              _quizOption('A. 0 (LOW)'),
              _quizOption('B. 1 (HIGH)'),
              _quizOption('C. "on"'),
              _quizOption('D. true'),
            ]),
          ),
        ]),
      ),
    );
  }

  Widget _lessonItem(int index, Map<String, dynamic> l) {
    final locked = l['locked'] as bool;
    final expanded = _selectedLesson == index;
    return Container(
      margin: const EdgeInsets.only(bottom: 8),
      decoration: BoxDecoration(
        color: C.surface,
        borderRadius: BorderRadius.circular(10),
        border: Border.all(color: expanded ? C.primary : C.border),
      ),
      child: Column(children: [
        Material(
          color: Colors.transparent,
          child: InkWell(
            borderRadius: BorderRadius.circular(10),
            onTap: locked ? null : () => setState(() {
              _selectedLesson = expanded ? -1 : index;
            }),
            child: Padding(
              padding: const EdgeInsets.all(14),
              child: Row(children: [
                SizedBox(width: 32, child: Text(l['icon'] as String, style: const TextStyle(fontSize: 20), textAlign: TextAlign.center)),
                const SizedBox(width: 12),
                Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                  Text(l['title'] as String,
                    style: TextStyle(fontSize: 14, fontWeight: FontWeight.w600,
                      color: locked ? C.text2 : C.text)),
                  const SizedBox(height: 2),
                  Text(l['sub'] as String, style: const TextStyle(fontSize: 12, color: C.text2)),
                ])),
                if ((l['stars'] as String).isNotEmpty)
                  Text(l['stars'] as String, style: const TextStyle(fontSize: 12, color: C.warning, letterSpacing: 1)),
                Icon(locked ? Icons.lock : expanded ? Icons.expand_less : Icons.expand_more,
                  size: 18, color: C.text2),
              ]),
            ),
          ),
        ),
        if (expanded && !locked)
          Container(
            width: double.infinity,
            padding: const EdgeInsets.fromLTRB(16, 0, 16, 16),
            child: Container(
              padding: const EdgeInsets.all(14),
              decoration: BoxDecoration(
                color: C.codeBg,
                borderRadius: BorderRadius.circular(8),
              ),
              child: Text(l['content'] as String,
                style: const TextStyle(
                  fontFamily: 'monospace', fontSize: 12,
                  color: Color(0xFFE6EDF3), height: 1.7)),
            ),
          ),
      ]),
    );
  }

  Widget _buildCodeViewer() {
    return Container(
      width: double.infinity,
      decoration: BoxDecoration(
        color: C.codeBg,
        borderRadius: BorderRadius.circular(8),
      ),
      padding: const EdgeInsets.all(14),
      child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
        for (int i = 0; i < _codeLines.length; i++) ...[
          _codeLineWidget(i),
          if (_expandedLine == i && (_codeLines[i]['explain'] as String).isNotEmpty)
            Container(
              margin: const EdgeInsets.only(left: 20, top: 4, bottom: 8),
              padding: const EdgeInsets.all(10),
              decoration: const BoxDecoration(
                color: Color(0x1A2563EB),
                border: Border(left: BorderSide(color: C.primary, width: 3)),
                borderRadius: BorderRadius.only(topRight: Radius.circular(8), bottomRight: Radius.circular(8)),
              ),
              child: Text(_codeLines[i]['explain'] as String,
                style: const TextStyle(fontSize: 12, height: 1.6, fontFamily: 'Segoe UI')),
            ),
        ],
      ]),
    );
  }

  Widget _codeLineWidget(int idx) {
    final line = _codeLines[idx];
    final code = line['code'] as String;
    final type = line['type'] as String;

    if (code.isEmpty) return const SizedBox(height: 8);

    return GestureDetector(
      onTap: () => setState(() => _expandedLine = _expandedLine == idx ? null : idx),
      child: Container(
        width: double.infinity,
        padding: const EdgeInsets.symmetric(vertical: 2, horizontal: 4),
        decoration: BoxDecoration(
          color: _expandedLine == idx ? const Color(0x332563EB) : Colors.transparent,
          borderRadius: BorderRadius.circular(4),
        ),
        child: _colorizedCode(code, type),
      ),
    );
  }

  Widget _colorizedCode(String code, String type) {
    Color color;
    switch (type) {
      case 'preprocessor': color = const Color(0xFFFF7B72); break;
      case 'define': color = const Color(0xFFFF7B72); break;
      case 'comment': color = const Color(0xFF8B949E); break;
      case 'function': color = const Color(0xFFD2A8FF); break;
      case 'loop': color = const Color(0xFFFF7B72); break;
      case 'call': color = const Color(0xFFFFA657); break;
      default: color = const Color(0xFFE6EDF3);
    }
    return Text(code,
      style: TextStyle(fontFamily: 'Courier New', fontSize: 12, color: color, height: 1.8));
  }

  Widget _quizOption(String text) {
    return GestureDetector(
      onTap: () {
        final correct = text.startsWith('B');
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text(correct ? '\uC815\uB2F5! HIGH(1)\uC744 \uBCF4\uB0B4\uBA74 LED\uAC00 \uCF1C\uC9D1\uB2C8\uB2E4.' : '\uD2C0\uB838\uC5B4\uC694. \uB2E4\uC2DC \uC0DD\uAC01\uD574\uBCF4\uC138\uC694!'),
            backgroundColor: correct ? C.success : C.error,
            duration: const Duration(seconds: 2),
          ),
        );
      },
      child: Container(
        width: double.infinity,
        margin: const EdgeInsets.only(bottom: 8),
        padding: const EdgeInsets.all(12),
        decoration: BoxDecoration(
          color: C.surface2,
          borderRadius: BorderRadius.circular(8),
          border: Border.all(color: C.border),
        ),
        child: Text(text, style: const TextStyle(fontSize: 14)),
      ),
    );
  }
}

// ═══════════════════════════════════════════════════════════
//  TAB 4: Pad (Control Pad)
// ═══════════════════════════════════════════════════════════

class PadTab extends StatefulWidget {
  final _MainShellState shell;
  const PadTab({super.key, required this.shell});
  @override
  State<PadTab> createState() => _PadTabState();
}

class _PadTabState extends State<PadTab> with AutomaticKeepAliveClientMixin {
  @override
  bool get wantKeepAlive => true;

  String _currentColor = 'OFF';
  String _lcdText = '';

  _MainShellState get _s => widget.shell;

  void _toast(String msg) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(content: Text(msg), duration: const Duration(seconds: 2)),
    );
  }

  void _cmd(String command) {
    if (_s.bleStatus != 'connected') {
      _toast('BLE 연결이 필요합니다 (홈 탭에서 연결)');
      return;
    }
    _s.sendCommand(command);
  }

  @override
  Widget build(BuildContext context) {
    super.build(context);
    return Scaffold(
      backgroundColor: C.bg,
      appBar: AppBar(title: const Text('C6-LCD 컨트롤 패드', style: TextStyle(fontWeight: FontWeight.bold))),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
          // RGB LED Color (WS2812)
          _sectionTitle('RGB LED (WS2812)'),
          Wrap(spacing: 8, runSpacing: 8, children: [
            _colorButton('RED', Colors.red, 'LED_RED_ON'),
            _colorButton('GREEN', Colors.green, 'LED_GREEN_ON'),
            _colorButton('BLUE', Colors.blue, 'LED_BLUE_ON'),
            _colorButton('YELLOW', Colors.yellow, 'LED_YELLOW_ON'),
            _colorButton('CYAN', Colors.cyan, 'LED_CYAN_ON'),
            _colorButton('PURPLE', Colors.purple, 'LED_PURPLE_ON'),
            _colorButton('WHITE', Colors.white, 'LED_WHITE_ON'),
            _colorButton('OFF', Colors.grey, 'LED_OFF'),
          ]),

          // LCD Display
          _sectionTitle('LCD 디스플레이 (172x320)'),
          TextField(
            style: const TextStyle(color: C.text),
            decoration: InputDecoration(
              hintText: 'LCD에 표시할 텍스트 입력',
              hintStyle: const TextStyle(color: C.text2),
              filled: true, fillColor: C.surface,
              border: OutlineInputBorder(borderRadius: BorderRadius.circular(12), borderSide: BorderSide.none),
            ),
            onChanged: (v) => _lcdText = v,
          ),
          const SizedBox(height: 8),
          Row(children: [
            _actionButton('LCD 표시', C.primary, () => _cmd('LCD:$_lcdText')),
            const SizedBox(width: 8),
            _actionButton('크게 표시', C.success, () => _cmd('LCD_BIG:$_lcdText')),
            const SizedBox(width: 8),
            _actionButton('지우기', C.error, () => _cmd('LCD_CLEAR')),
          ]),
          const SizedBox(height: 8),
          Row(children: [
            _actionButton('빨강 배경', C.error, () => _cmd('LCD_FILL:FF0000')),
            const SizedBox(width: 8),
            _actionButton('초록 배경', C.success, () => _cmd('LCD_FILL:00FF00')),
            const SizedBox(width: 8),
            _actionButton('파랑 배경', C.primary, () => _cmd('LCD_FILL:0000FF')),
          ]),
          const SizedBox(height: 8),
          Row(children: [
            _actionButton('원 그리기', C.warning, () => _cmd('LCD_CIRCLE:86,160,40,FF0000')),
            const SizedBox(width: 8),
            _actionButton('사각형', C.warning, () => _cmd('LCD_RECT:20,100,130,80,00FF00')),
          ]),

          // LCD Backlight
          _sectionTitle('LCD 백라이트'),
          Row(children: [
            _actionButton('끄기', C.text2, () => _cmd('LCD_BL_OFF')),
            const SizedBox(width: 8),
            _actionButton('어둡게', C.text2, () => _cmd('LCD_BL:50')),
            const SizedBox(width: 8),
            _actionButton('밝게', C.text2, () => _cmd('LCD_BL_ON')),
          ]),

          // SD Card Load (instant firmware flash)
          _sectionTitle('SD 카드 펌웨어 (<1초)'),
          Wrap(spacing: 8, runSpacing: 8, children: [
            _sdButton('A01', 'LED 빨강'),
            _sdButton('A02', 'LED 초록'),
            _sdButton('A03', 'LED 파랑'),
            _sdButton('C01', 'RGB 깜빡'),
            _sdButton('C02', 'LED 무지개'),
            _sdButton('D01', 'LCD 원'),
            _sdButton('D03', 'LCD 신호등'),
            _sdButton('E02', 'LCD 공튕기기'),
            _sdButton('E03', 'LCD 눈내리기'),
            _sdButton('E06', 'LCD 불꽃놀이'),
          ]),

          // WiFi Scan
          _sectionTitle('WiFi 6 스캔'),
          SizedBox(
            width: double.infinity,
            child: _actionButton('WiFi 스캔 시작', C.primary, () => _cmd('WIFI_SCAN')),
          ),

          // Button Monitor (BOOT GPIO9)
          _sectionTitle('버튼 모니터 (BOOT GPIO9)'),
          Container(
            width: double.infinity,
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              color: _s.switchPressed ? C.success.withValues(alpha: 0.1) : C.surface,
              borderRadius: BorderRadius.circular(12),
              border: Border.all(color: _s.switchPressed ? C.success : C.border, width: 2),
            ),
            child: Row(children: [
              Icon(Icons.radio_button_on, size: 24,
                color: _s.switchPressed ? C.success : C.text2),
              const SizedBox(width: 12),
              const Text('BOOT 버튼 (GPIO9)', style: TextStyle(fontSize: 14, color: C.text)),
              const Spacer(),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 4),
                decoration: BoxDecoration(
                  color: _s.switchPressed ? C.success.withValues(alpha: 0.2) : C.text2.withValues(alpha: 0.15),
                  borderRadius: BorderRadius.circular(20),
                ),
                child: Text(
                  _s.bleStatus == 'connected'
                    ? (_s.switchPressed ? 'PRESSED' : 'RELEASED')
                    : '미연결',
                  style: TextStyle(fontSize: 12, fontWeight: FontWeight.w700,
                    color: _s.switchPressed ? C.success : C.text2)),
              ),
            ]),
          ),
          const SizedBox(height: 16),
        ]),
      ),
    );
  }

  Widget _sectionTitle(String title) {
    return Padding(
      padding: const EdgeInsets.only(top: 16, bottom: 8),
      child: Text(title, style: const TextStyle(fontSize: 13, color: C.text2, fontWeight: FontWeight.w600)),
    );
  }

  Widget _sdButton(String no, String label) {
    return GestureDetector(
      onTap: () {
        _cmd('SDLOAD:$no');
        _toast('SD: $no loading...');
      },
      child: Container(
        width: 100, height: 50,
        decoration: BoxDecoration(
          color: C.warning.withValues(alpha: 0.15),
          borderRadius: BorderRadius.circular(10),
          border: Border.all(color: C.warning.withValues(alpha: 0.4)),
        ),
        child: Column(mainAxisAlignment: MainAxisAlignment.center, children: [
          Text(no, style: const TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: C.warning)),
          Text(label, style: const TextStyle(fontSize: 10, color: C.text2)),
        ]),
      ),
    );
  }

  Widget _colorButton(String label, Color color, String cmd) {
    final isOn = _currentColor == label;
    return GestureDetector(
      onTap: () {
        setState(() => _currentColor = label);
        _cmd(cmd);
      },
      child: Container(
        width: 72, height: 72,
        decoration: BoxDecoration(
          color: isOn ? color.withValues(alpha: 0.3) : C.surface,
          borderRadius: BorderRadius.circular(12),
          border: Border.all(color: isOn ? color : C.border, width: isOn ? 3 : 1),
        ),
        child: Column(mainAxisAlignment: MainAxisAlignment.center, children: [
          Container(width: 24, height: 24, decoration: BoxDecoration(
            color: label == 'OFF' ? C.text2 : color, shape: BoxShape.circle)),
          const SizedBox(height: 4),
          Text(label, style: TextStyle(fontSize: 10, color: isOn ? C.text : C.text2,
            fontWeight: isOn ? FontWeight.bold : FontWeight.normal)),
        ]),
      ),
    );
  }

  Widget _actionButton(String label, Color color, VoidCallback onTap) {
    return Expanded(
      child: GestureDetector(
        onTap: onTap,
        child: Container(
          padding: const EdgeInsets.symmetric(vertical: 14),
          decoration: BoxDecoration(
            color: color.withValues(alpha: 0.15),
            borderRadius: BorderRadius.circular(12),
            border: Border.all(color: color.withValues(alpha: 0.4), width: 1),
          ),
          child: Text(label, textAlign: TextAlign.center,
            style: TextStyle(fontSize: 12, color: color, fontWeight: FontWeight.w600)),
        ),
      ),
    );
  }
}

// ═══════════════════════════════════════════════════════════
//  TAB 5: Settings
// ═══════════════════════════════════════════════════════════

class SettingsTab extends StatefulWidget {
  final _MainShellState shell;
  const SettingsTab({super.key, required this.shell});
  @override
  State<SettingsTab> createState() => _SettingsTabState();
}

class _SettingsTabState extends State<SettingsTab> with AutomaticKeepAliveClientMixin {
  @override
  bool get wantKeepAlive => true;

  late TextEditingController _urlCtrl;
  late TextEditingController _bleNameCtrl;
  bool _eduMode = true;
  bool _showPinLabels = true;
  bool _scanning = false;
  List<ScanResult> _scanResults = [];

  _MainShellState get _s => widget.shell;

  @override
  void initState() {
    super.initState();
    _urlCtrl = TextEditingController(text: _s.serverUrl);
    _bleNameCtrl = TextEditingController(text: _s.savedBleName);
  }

  @override
  void dispose() {
    _urlCtrl.dispose();
    _bleNameCtrl.dispose();
    super.dispose();
  }

  Future<void> _scanDevices() async {
    await [
      Permission.bluetoothScan,
      Permission.bluetoothConnect,
      Permission.locationWhenInUse,
    ].request();

    setState(() { _scanning = true; _scanResults = []; });

    await FlutterBluePlus.startScan(timeout: const Duration(seconds: 5));
    FlutterBluePlus.scanResults.listen((r) {
      setState(() => _scanResults = r);
    });
    await Future.delayed(const Duration(seconds: 5));
    await FlutterBluePlus.stopScan();
    setState(() => _scanning = false);
  }

  void _selectDevice(ScanResult r) async {
    _s.savedBleMac = r.device.remoteId.toString().toUpperCase();
    _s.savedBleName = r.device.platformName.isNotEmpty ? r.device.platformName : 'UTTEC-C6';
    _bleNameCtrl.text = _s.savedBleName;
    await _s.saveSettings();
    setState(() => _scanResults = []);
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(content: Text('${_s.savedBleName} (${_s.savedBleMac}) 영구 저장됨'), duration: const Duration(seconds: 2)),
    );
  }

  @override
  Widget build(BuildContext context) {
    super.build(context);
    // 저장된 이름과 입력 필드 동기화
    if (_bleNameCtrl.text != _s.savedBleName) {
      _bleNameCtrl.text = _s.savedBleName;
    }
    return Scaffold(
      backgroundColor: C.bg,
      appBar: AppBar(title: const Text('설정', style: TextStyle(fontWeight: FontWeight.bold))),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(children: [
          // Server settings
          styledCard(
            title: '\uC11C\uBC84 \uC124\uC815',
            icon: Icons.dns,
            child: TextField(
              controller: _urlCtrl,
              onChanged: (v) {
                _s.serverUrl = v.trim();
                _s._onServerUrlChanged(v.trim());
                _s.saveSettings();
              },
              decoration: InputDecoration(
                hintText: 'http://178.128.90.37:8092',
                hintStyle: const TextStyle(color: Color(0xFF64748B), fontSize: 13),
                filled: true,
                fillColor: C.surface2,
                contentPadding: const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(8),
                  borderSide: const BorderSide(color: C.border),
                ),
                isDense: true,
              ),
              style: const TextStyle(fontSize: 13),
            ),
          ),

          // Board settings
          styledCard(
            title: '\uBCF4\uB4DC \uC124\uC815',
            icon: Icons.memory,
            child: Column(children: [
              _infoRow('보드', 'UTTEC Board 38핀'),
              _infoRow('\uD504\uB808\uC784\uC6CC\uD06C', 'ESP-IDF v5.5'),
              _infoRow('Flash', '4MB'),
              _infoRow('CPU', 'Xtensa LX6 Dual-core 240MHz'),
            ]),
          ),

          // BLE 기기 설정
          styledCard(
            title: 'BLE 기기 설정',
            icon: Icons.bluetooth,
            child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
              // 현재 저장된 기기
              _infoRow('저장된 기기', _bleNameCtrl.text.isNotEmpty ? _s.savedBleName : 'UTTEC-C6'),
              _infoRow('MAC 주소', _s.savedBleMac),
              _infoRow('연결 상태', _s.bleStatus == 'connected' ? '연결됨' : '미연결'),
              const SizedBox(height: 10),
              // 기기 이름 변경
              const Text('기기 이름 변경', style: TextStyle(fontSize: 12, color: C.text2)),
              const SizedBox(height: 4),
              Row(children: [
                Expanded(child: TextField(
                  controller: _bleNameCtrl,
                  decoration: InputDecoration(
                    hintText: 'UTTEC-C6',
                    hintStyle: const TextStyle(color: Color(0xFF64748B), fontSize: 13),
                    filled: true, fillColor: C.surface2,
                    contentPadding: const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
                    border: OutlineInputBorder(borderRadius: BorderRadius.circular(8), borderSide: const BorderSide(color: C.border)),
                    isDense: true,
                  ),
                  style: const TextStyle(fontSize: 13),
                )),
                const SizedBox(width: 8),
                ElevatedButton(
                  onPressed: () async {
                    final newName = _bleNameCtrl.text.trim();
                    if (newName.isNotEmpty) {
                      _s.savedBleName = newName;
                      await _s.saveSettings();
                      // UTTEC 보드에도 이름 변경 명령 전송 (연결 중이면)
                      if (_s.bleStatus == 'connected') {
                        await _s.sendCommand('SETNAME:$newName');
                        ScaffoldMessenger.of(context).showSnackBar(
                          SnackBar(content: Text('기기 이름 "$newName" 저장 + UTTEC 보드 적용 (재부팅됨)'), duration: const Duration(seconds: 3)),
                        );
                      } else {
                        ScaffoldMessenger.of(context).showSnackBar(
                          SnackBar(content: Text('앱 이름 "$newName" 저장됨 (BLE 연결 후 UTTEC 보드에도 적용됩니다)'), duration: const Duration(seconds: 3)),
                        );
                      }
                      _s.setState(() {});
                      setState(() {});
                    }
                  },
                  style: ElevatedButton.styleFrom(backgroundColor: C.primary, padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 10)),
                  child: const Text('저장', style: TextStyle(fontSize: 13, color: Colors.white)),
                ),
              ]),
              const SizedBox(height: 12),
              // BLE 스캔 버튼
              SizedBox(
                width: double.infinity,
                child: ElevatedButton.icon(
                  onPressed: _scanning ? null : _scanDevices,
                  icon: Icon(_scanning ? Icons.bluetooth_searching : Icons.search),
                  label: Text(_scanning ? '스캔 중...' : '주변 BLE 기기 스캔'),
                  style: ElevatedButton.styleFrom(
                    backgroundColor: C.surface2,
                    foregroundColor: C.text,
                    padding: const EdgeInsets.symmetric(vertical: 12),
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
                  ),
                ),
              ),
              // 스캔 결과
              if (_scanResults.isNotEmpty) ...[
                const SizedBox(height: 10),
                const Text('발견된 기기 (터치하여 선택)', style: TextStyle(fontSize: 12, color: C.text2)),
                const SizedBox(height: 6),
                ...List.generate(
                  _scanResults.length > 10 ? 10 : _scanResults.length,
                  (i) {
                    final r = _scanResults[i];
                    final name = r.device.platformName.isNotEmpty ? r.device.platformName : '(이름없음)';
                    final mac = r.device.remoteId.toString();
                    final isSelected = mac.toUpperCase() == _s.savedBleMac.toUpperCase();
                    return GestureDetector(
                      onTap: () => _selectDevice(r),
                      child: Container(
                        margin: const EdgeInsets.only(bottom: 4),
                        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
                        decoration: BoxDecoration(
                          color: isSelected ? C.primary.withValues(alpha: 0.15) : C.surface2,
                          borderRadius: BorderRadius.circular(8),
                          border: Border.all(color: isSelected ? C.primary : C.border),
                        ),
                        child: Row(children: [
                          Icon(isSelected ? Icons.check_circle : Icons.bluetooth, size: 16,
                            color: isSelected ? C.primary : C.text2),
                          const SizedBox(width: 8),
                          Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                            Text(name, style: TextStyle(fontSize: 13,
                              color: isSelected ? C.primary : C.text, fontWeight: isSelected ? FontWeight.bold : FontWeight.normal)),
                            Text(mac, style: const TextStyle(fontSize: 11, color: C.text2)),
                          ])),
                          Text('${r.rssi}', style: const TextStyle(fontSize: 11, color: C.text2)),
                        ]),
                      ),
                    );
                  },
                ),
              ],
            ]),
          ),

          // Education mode
          styledCard(
            title: '\uAD50\uC721 \uBAA8\uB4DC',
            icon: Icons.school,
            child: Column(children: [
              _toggleRow('\uAD50\uC721 \uBAA8\uB4DC', '\uC0C1\uC138 \uC124\uBA85 \uD45C\uC2DC', _eduMode, (v) => setState(() => _eduMode = v)),
              _toggleRow('\uD540 \uB77C\uBCA8 \uD45C\uC2DC', '\uD68C\uB85C\uB3C4\uC5D0 \uD540 \uBC88\uD638 \uD45C\uC2DC', _showPinLabels, (v) => setState(() => _showPinLabels = v)),
            ]),
          ),

          // App version
          styledCard(
            title: '\uC571 \uC815\uBCF4',
            icon: Icons.info_outline,
            child: Column(children: [
              _infoRow('\uBC84\uC804', '1.0.0'),
              _infoRow('\uBE4C\uB4DC', '2026.04.11'),
              _infoRow('\uD50C\uB7AB\uD3FC', 'Flutter + ESP-IDF'),
            ]),
          ),
        ]),
      ),
    );
  }

  Widget _infoRow(String label, String value) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 6),
      child: Row(children: [
        Expanded(flex: 2, child: Text(label, style: const TextStyle(fontSize: 13, color: C.text2))),
        Expanded(flex: 3, child: Text(value, style: const TextStyle(fontSize: 13))),
      ]),
    );
  }

  Widget _toggleRow(String title, String subtitle, bool value, ValueChanged<bool> onChanged) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 4),
      child: Row(children: [
        Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
          Text(title, style: const TextStyle(fontSize: 14)),
          Text(subtitle, style: const TextStyle(fontSize: 11, color: C.text2)),
        ])),
        Switch(
          value: value,
          onChanged: onChanged,
          activeColor: C.primary,
        ),
      ]),
    );
  }
}
