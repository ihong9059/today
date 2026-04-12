import 'dart:async';
import 'dart:convert';
import 'dart:typed_data';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:flutter_blue_plus/flutter_blue_plus.dart';
import 'package:permission_handler/permission_handler.dart';

void main() => runApp(const VibeFirmwareApp());

class VibeFirmwareApp extends StatelessWidget {
  const VibeFirmwareApp({super.key});
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Vibe Firmware',
      debugShowCheckedModeBanner: false,
      theme: ThemeData.dark().copyWith(
        scaffoldBackgroundColor: const Color(0xFF0F172A),
        colorScheme: const ColorScheme.dark(
          primary: Color(0xFF2563EB),
          surface: Color(0xFF1E293B),
        ),
        cardColor: const Color(0xFF1E293B),
        appBarTheme: const AppBarTheme(
          backgroundColor: Color(0xFF0F172A),
          elevation: 0,
        ),
      ),
      home: const HomePage(),
    );
  }
}

class HomePage extends StatefulWidget {
  const HomePage({super.key});
  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  // Server
  String serverUrl = 'http://192.168.0.2:8091';
  final _promptController = TextEditingController();
  final _serverController = TextEditingController();

  // BLE
  BluetoothDevice? _device;
  BluetoothCharacteristic? _ctrlChar;
  BluetoothCharacteristic? _dataChar;
  BluetoothCharacteristic? _statusChar;
  String _bleStatus = 'disconnected'; // disconnected, connecting, connected
  String _deviceName = '';

  // Build
  String _buildStatus = 'idle'; // idle, generating, building, success, failed
  String _buildMessage = '';
  int _buildProgress = 0;
  String? _jobId;
  Uint8List? _firmware;
  int _firmwareSize = 0;

  // OTA
  String _otaStatus = 'idle'; // idle, transferring, verifying, success, failed
  int _otaProgress = 0;
  String _otaMessage = '';

  // History
  final List<Map<String, String>> _history = [];

  // UUIDs
  static const otaServiceUuid = '0000fe00-0000-1000-8000-00805f9b34fb';
  static const otaCtrlUuid = '0000fe01-0000-1000-8000-00805f9b34fb';
  static const otaDataUuid = '0000fe02-0000-1000-8000-00805f9b34fb';
  static const otaStatusUuid = '0000fe03-0000-1000-8000-00805f9b34fb';

  @override
  void initState() {
    super.initState();
    _serverController.text = serverUrl;
  }

  @override
  void dispose() {
    _promptController.dispose();
    _serverController.dispose();
    super.dispose();
  }

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
      _bleStatus = 'connecting';
      _deviceName = '';
    });

    try {
      // Scan
      List<ScanResult> results = [];
      await FlutterBluePlus.startScan(timeout: const Duration(seconds: 5));
      FlutterBluePlus.scanResults.listen((r) => results = r);
      await Future.delayed(const Duration(seconds: 5));
      await FlutterBluePlus.stopScan();

      ScanResult? target;
      for (var r in results) {
        if (r.device.platformName.contains('ESP32-OTA')) {
          target = r;
          break;
        }
      }

      if (target == null) {
        _showSnackBar('ESP32-OTA를 찾을 수 없습니다');
        setState(() => _bleStatus = 'disconnected');
        return;
      }

      // Connect
      _device = target.device;
      await _device!.connect(timeout: const Duration(seconds: 10));
      _deviceName = _device!.platformName;

      // Discover services
      List<BluetoothService> services = await _device!.discoverServices();
      for (var svc in services) {
        if (svc.uuid.toString().toLowerCase() == otaServiceUuid) {
          for (var chr in svc.characteristics) {
            String uuid = chr.uuid.toString().toLowerCase();
            if (uuid == otaCtrlUuid) _ctrlChar = chr;
            if (uuid == otaDataUuid) _dataChar = chr;
            if (uuid == otaStatusUuid) _statusChar = chr;
          }
        }
      }

      if (_ctrlChar == null || _dataChar == null || _statusChar == null) {
        _showSnackBar('OTA 서비스를 찾을 수 없습니다');
        await _device!.disconnect();
        setState(() => _bleStatus = 'disconnected');
        return;
      }

      // Subscribe to status notifications
      await _statusChar!.setNotifyValue(true);
      _statusChar!.onValueReceived.listen((data) {
        if (data.length >= 2) {
          _onOtaStatusReceived(data[0], data[1]);
        }
      });

      setState(() => _bleStatus = 'connected');
      _showSnackBar('$_deviceName 연결됨');

      // Listen for disconnect
      _device!.connectionState.listen((state) {
        if (state == BluetoothConnectionState.disconnected) {
          setState(() {
            _bleStatus = 'disconnected';
            _ctrlChar = null;
            _dataChar = null;
            _statusChar = null;
          });
        }
      });
    } catch (e) {
      _showSnackBar('연결 실패: $e');
      setState(() => _bleStatus = 'disconnected');
    }
  }

  Future<void> _disconnectBLE() async {
    await _device?.disconnect();
    setState(() {
      _bleStatus = 'disconnected';
      _deviceName = '';
    });
  }

  void _onOtaStatusReceived(int status, int progress) {
    final names = {
      0: 'IDLE', 1: 'READY', 2: 'RECEIVING', 3: 'VERIFYING',
      4: 'SUCCESS', 5: 'CRC_FAIL', 6: 'WRITE_FAIL', 7: 'ABORT_OK',
    };
    setState(() {
      if (status == 4) {
        _otaStatus = 'success';
        _otaMessage = 'OTA 성공! 재부팅 중...';
        _otaProgress = 100;
      } else if (status == 5 || status == 6) {
        _otaStatus = 'failed';
        _otaMessage = '실패: ${names[status]}';
      } else if (status == 2) {
        _otaStatus = 'transferring';
        _otaProgress = progress;
        _otaMessage = '수신 중... $progress%';
      } else if (status == 3) {
        _otaStatus = 'verifying';
        _otaProgress = 100;
        _otaMessage = '검증 중...';
      }
    });
  }

  // ─── Build Server ───

  Future<void> _startBuild() async {
    String prompt = _promptController.text.trim();
    if (prompt.isEmpty) {
      _showSnackBar('프롬프트를 입력해주세요');
      return;
    }

    setState(() {
      _buildStatus = 'generating';
      _buildMessage = '요청 전송 중...';
      _buildProgress = 0;
      _firmware = null;
      _otaStatus = 'idle';
      _otaProgress = 0;
    });

    try {
      // POST generate
      final resp = await http.post(
        Uri.parse('$serverUrl/api/v1/generate'),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({'prompt': prompt}),
      );

      if (resp.statusCode != 200) {
        setState(() {
          _buildStatus = 'failed';
          _buildMessage = '서버 오류: ${resp.statusCode}';
        });
        return;
      }

      _jobId = jsonDecode(resp.body)['job_id'];

      // Poll status
      _pollBuildStatus();

      // Add to history
      _history.insert(0, {'prompt': prompt, 'time': _timeNow()});
      if (_history.length > 5) _history.removeLast();

    } catch (e) {
      setState(() {
        _buildStatus = 'failed';
        _buildMessage = '서버 연결 실패: $e';
      });
    }
  }

  Future<void> _pollBuildStatus() async {
    while (_buildStatus != 'success' && _buildStatus != 'failed') {
      await Future.delayed(const Duration(seconds: 3));
      try {
        final resp = await http.get(
          Uri.parse('$serverUrl/api/v1/status/$_jobId'),
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
          // Download firmware
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
        Uri.parse('$serverUrl/api/v1/download/$_jobId'),
      );
      if (resp.statusCode == 200) {
        _firmware = resp.bodyBytes;
        setState(() {
          _firmwareSize = _firmware!.length;
          _buildMessage = '빌드 완료! (${(_firmwareSize / 1024).toStringAsFixed(0)} KB)';
        });
      }
    } catch (e) {
      setState(() {
        _buildStatus = 'failed';
        _buildMessage = '다운로드 실패: $e';
      });
    }
  }

  // ─── OTA Transfer ───

  Future<void> _startOTA() async {
    if (_firmware == null) {
      _showSnackBar('펌웨어가 없습니다');
      return;
    }
    if (_bleStatus != 'connected') {
      _showSnackBar('BLE 연결을 먼저 해주세요');
      return;
    }

    setState(() {
      _otaStatus = 'transferring';
      _otaProgress = 0;
      _otaMessage = 'OTA 시작...';
    });

    try {
      // 1. START command [0x01][size 4B LE]
      final size = _firmware!.length;
      final startCmd = Uint8List(5);
      startCmd[0] = 0x01;
      startCmd[1] = size & 0xFF;
      startCmd[2] = (size >> 8) & 0xFF;
      startCmd[3] = (size >> 16) & 0xFF;
      startCmd[4] = (size >> 24) & 0xFF;

      await _ctrlChar!.write(startCmd, withoutResponse: false);
      await Future.delayed(const Duration(milliseconds: 500));

      // 2. Send firmware chunks
      const chunkSize = 240;
      int sent = 0;
      int totalChunks = (size + chunkSize - 1) ~/ chunkSize;

      for (int i = 0; i < totalChunks; i++) {
        int offset = i * chunkSize;
        int end = (offset + chunkSize > size) ? size : offset + chunkSize;
        Uint8List chunk = _firmware!.sublist(offset, end);

        await _dataChar!.write(chunk, withoutResponse: true);
        sent += chunk.length;

        // Update progress locally
        int pct = (sent * 100 ~/ size);
        if (pct % 5 == 0) {
          setState(() {
            _otaProgress = pct;
            _otaMessage = '전송 중... $pct% ($sent/$size)';
          });
        }

        // Flow control
        if ((i + 1) % 20 == 0) {
          await Future.delayed(const Duration(milliseconds: 30));
        }
      }

      setState(() => _otaMessage = '전송 완료, 검증 대기...');

      // 3. END command
      await _ctrlChar!.write(Uint8List.fromList([0x02]), withoutResponse: false);

      // Wait for result (STATUS notify will update)
      await Future.delayed(const Duration(seconds: 5));

      if (_otaStatus != 'success') {
        setState(() {
          _otaStatus = 'success';
          _otaMessage = 'OTA 완료! ESP32 재부팅됨';
          _otaProgress = 100;
        });
      }
    } catch (e) {
      setState(() {
        _otaStatus = 'failed';
        _otaMessage = 'OTA 실패: $e';
      });
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

  // ─── UI ───

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Vibe Firmware', style: TextStyle(fontWeight: FontWeight.bold)),
        actions: [
          // BLE status indicator
          Padding(
            padding: const EdgeInsets.only(right: 16),
            child: Row(children: [
              Icon(Icons.bluetooth,
                size: 18,
                color: _bleStatus == 'connected' ? Colors.green
                     : _bleStatus == 'connecting' ? Colors.orange
                     : Colors.grey),
              const SizedBox(width: 4),
              Text(_bleStatus == 'connected' ? _deviceName
                   : _bleStatus == 'connecting' ? '연결 중...'
                   : '미연결',
                style: TextStyle(fontSize: 12,
                  color: _bleStatus == 'connected' ? Colors.green : Colors.grey)),
            ]),
          ),
        ],
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(children: [
          _buildBLECard(),
          const SizedBox(height: 12),
          _buildPromptCard(),
          const SizedBox(height: 12),
          if (_buildStatus != 'idle') _buildProgressCard(),
          if (_buildStatus != 'idle') const SizedBox(height: 12),
          if (_firmware != null) _buildOTACard(),
          if (_firmware != null) const SizedBox(height: 12),
          _buildSettingsCard(),
          const SizedBox(height: 12),
          if (_history.isNotEmpty) _buildHistoryCard(),
        ]),
      ),
    );
  }

  Widget _card({required String title, required IconData icon, required Widget child}) {
    return Card(
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
          Row(children: [
            Icon(icon, size: 18, color: const Color(0xFF94A3B8)),
            const SizedBox(width: 8),
            Text(title, style: const TextStyle(fontSize: 13, color: Color(0xFF94A3B8),
              fontWeight: FontWeight.w600, letterSpacing: 0.5)),
          ]),
          const SizedBox(height: 12),
          child,
        ]),
      ),
    );
  }

  Widget _buildBLECard() {
    return _card(
      title: 'BLE 연결',
      icon: Icons.bluetooth,
      child: SizedBox(
        width: double.infinity,
        child: ElevatedButton.icon(
          onPressed: _bleStatus == 'connected' ? _disconnectBLE
                   : _bleStatus == 'connecting' ? null
                   : _connectBLE,
          icon: Icon(_bleStatus == 'connected' ? Icons.bluetooth_disabled
                   : _bleStatus == 'connecting' ? Icons.bluetooth_searching
                   : Icons.bluetooth),
          label: Text(_bleStatus == 'connected' ? '연결 해제'
                    : _bleStatus == 'connecting' ? '스캔 중...'
                    : 'ESP32-OTA 연결'),
          style: ElevatedButton.styleFrom(
            padding: const EdgeInsets.symmetric(vertical: 14),
            backgroundColor: _bleStatus == 'connected'
              ? const Color(0xFF334155) : const Color(0xFF2563EB),
            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
          ),
        ),
      ),
    );
  }

  Widget _buildPromptCard() {
    return _card(
      title: '프롬프트',
      icon: Icons.edit,
      child: Column(children: [
        TextField(
          controller: _promptController,
          maxLines: 3,
          decoration: InputDecoration(
            hintText: 'LED를 깜빡여줘, 부저를 울려줘...',
            hintStyle: const TextStyle(color: Color(0xFF64748B)),
            filled: true,
            fillColor: const Color(0xFF334155),
            border: OutlineInputBorder(
              borderRadius: BorderRadius.circular(10),
              borderSide: const BorderSide(color: Color(0xFF475569)),
            ),
            focusedBorder: OutlineInputBorder(
              borderRadius: BorderRadius.circular(10),
              borderSide: const BorderSide(color: Color(0xFF2563EB)),
            ),
          ),
        ),
        const SizedBox(height: 12),
        SizedBox(
          width: double.infinity,
          child: ElevatedButton(
            onPressed: (_buildStatus == 'generating' || _buildStatus == 'building')
              ? null : _startBuild,
            style: ElevatedButton.styleFrom(
              padding: const EdgeInsets.symmetric(vertical: 16),
              backgroundColor: const Color(0xFF2563EB),
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
            ),
            child: Text(
              (_buildStatus == 'generating' || _buildStatus == 'building')
                ? '빌드 중...' : '실행',
              style: const TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
            ),
          ),
        ),
      ]),
    );
  }

  Widget _buildProgressCard() {
    Color statusColor = _buildStatus == 'success' ? Colors.green
                       : _buildStatus == 'failed' ? Colors.red
                       : const Color(0xFF2563EB);
    IconData statusIcon = _buildStatus == 'success' ? Icons.check_circle
                        : _buildStatus == 'failed' ? Icons.error
                        : Icons.build_circle;

    return _card(
      title: '빌드 상태',
      icon: Icons.build,
      child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
        Row(children: [
          Icon(statusIcon, color: statusColor, size: 20),
          const SizedBox(width: 8),
          Expanded(child: Text(_buildMessage,
            style: TextStyle(fontSize: 13, color: statusColor))),
        ]),
        const SizedBox(height: 8),
        ClipRRect(
          borderRadius: BorderRadius.circular(4),
          child: LinearProgressIndicator(
            value: _buildProgress / 100,
            backgroundColor: const Color(0xFF334155),
            valueColor: AlwaysStoppedAnimation(statusColor),
            minHeight: 6,
          ),
        ),
        if (_firmwareSize > 0)
          Padding(
            padding: const EdgeInsets.only(top: 8),
            child: Text('${(_firmwareSize / 1024).toStringAsFixed(0)} KB',
              style: const TextStyle(fontSize: 12, color: Color(0xFF94A3B8))),
          ),
      ]),
    );
  }

  Widget _buildOTACard() {
    Color otaColor = _otaStatus == 'success' ? Colors.green
                   : _otaStatus == 'failed' ? Colors.red
                   : const Color(0xFF2563EB);

    return _card(
      title: 'BLE OTA 전송',
      icon: Icons.send,
      child: Column(children: [
        if (_otaStatus != 'idle')
          Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
            Row(children: [
              Icon(_otaStatus == 'success' ? Icons.check_circle
                 : _otaStatus == 'failed' ? Icons.error
                 : Icons.upload, color: otaColor, size: 20),
              const SizedBox(width: 8),
              Expanded(child: Text(_otaMessage,
                style: TextStyle(fontSize: 13, color: otaColor))),
            ]),
            const SizedBox(height: 8),
            ClipRRect(
              borderRadius: BorderRadius.circular(4),
              child: LinearProgressIndicator(
                value: _otaProgress / 100,
                backgroundColor: const Color(0xFF334155),
                valueColor: AlwaysStoppedAnimation(otaColor),
                minHeight: 6,
              ),
            ),
            const SizedBox(height: 12),
          ]),
        SizedBox(
          width: double.infinity,
          child: ElevatedButton.icon(
            onPressed: (_otaStatus == 'transferring' || _bleStatus != 'connected')
              ? null : _startOTA,
            icon: const Icon(Icons.upload),
            label: Text(_bleStatus != 'connected' ? 'BLE 먼저 연결하세요'
                      : _otaStatus == 'transferring' ? '전송 중...'
                      : 'ESP32에 전송'),
            style: ElevatedButton.styleFrom(
              padding: const EdgeInsets.symmetric(vertical: 14),
              backgroundColor: const Color(0xFF10B981),
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
            ),
          ),
        ),
      ]),
    );
  }

  Widget _buildSettingsCard() {
    return _card(
      title: '서버 설정',
      icon: Icons.settings,
      child: TextField(
        controller: _serverController,
        onChanged: (v) => serverUrl = v.trim(),
        decoration: InputDecoration(
          hintText: 'http://192.168.0.2:8091',
          hintStyle: const TextStyle(color: Color(0xFF64748B), fontSize: 13),
          filled: true,
          fillColor: const Color(0xFF334155),
          contentPadding: const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
          border: OutlineInputBorder(
            borderRadius: BorderRadius.circular(8),
            borderSide: const BorderSide(color: Color(0xFF475569)),
          ),
          isDense: true,
        ),
        style: const TextStyle(fontSize: 13),
      ),
    );
  }

  Widget _buildHistoryCard() {
    return _card(
      title: '최근 기록',
      icon: Icons.history,
      child: Column(
        children: _history.map((h) => Padding(
          padding: const EdgeInsets.symmetric(vertical: 4),
          child: Row(children: [
            const Icon(Icons.chevron_right, size: 16, color: Color(0xFF64748B)),
            const SizedBox(width: 4),
            Expanded(child: Text(h['prompt'] ?? '',
              style: const TextStyle(fontSize: 13), overflow: TextOverflow.ellipsis)),
            Text(h['time'] ?? '', style: const TextStyle(fontSize: 11, color: Color(0xFF64748B))),
          ]),
        )).toList(),
      ),
    );
  }
}
