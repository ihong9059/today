// interactive_widgets.dart
// H(센서), I(카메라/소리), J(게임/그래픽) 카테고리 인터랙티브 위젯
// 총 30개 위젯 (H01~H10, I01~I10, J01~J10)

import 'dart:async';
import 'dart:io';
import 'dart:math';
import 'dart:ui' as ui;
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:sensors_plus/sensors_plus.dart';
import 'package:vibration/vibration.dart';
import 'package:image_picker/image_picker.dart';
import 'package:torch_light/torch_light.dart';
import 'package:qr_flutter/qr_flutter.dart';

/// 위젯 키로 인터랙티브 위젯 인스턴스를 반환
Widget getInteractiveWidget(String key) {
  switch (key) {
    // H. 센서
    case 'dice': return const DiceWidget();
    case 'sos': return const SOSWidget();
    case 'pedometer': return const PedometerWidget();
    case 'level': return const LevelWidget();
    case 'shakeColor': return const ShakeColorWidget();
    case 'tiltArrow': return const TiltArrowWidget();
    case 'vibePattern': return const VibePatternWidget();
    case 'shakeCount': return const ShakeCountWidget();
    case 'tiltSlider': return const TiltSliderWidget();
    case 'motionAlarm': return const MotionAlarmWidget();
    // I. 카메라/소리
    case 'camera': return const CameraWidget();
    case 'flashlight': return const FlashlightWidget();
    case 'selfie': return const SelfieWidget();
    case 'gallery': return const GalleryWidget();
    case 'timerCam': return const TimerCamWidget();
    case 'burstCam': return const BurstCamWidget();
    case 'photoFilter': return const PhotoFilterWidget();
    case 'qrDisplay': return const QRDisplayWidget();
    case 'colorPicker': return const ColorPickerWidget();
    case 'digitalClock': return const DigitalClockWidget();
    // J. 게임/그래픽
    case 'ball': return const BallWidget();
    case 'reactionTest': return const ReactionTestWidget();
    case 'whackMole': return const WhackMoleWidget();
    case 'simonSays': return const SimonSaysWidget();
    case 'ticTacToe': return const TicTacToeWidget();
    case 'slidePuzzle': return const SlidePuzzleWidget();
    case 'snake': return const SnakeWidget();
    case 'typingGame': return const TypingGameWidget();
    case 'drawing': return const DrawingWidget();
    case 'maze': return const MazeWidget();
    default:
      return Center(child: Text('위젯 "$key" 준비 중', style: const TextStyle(color: Colors.white54)));
  }
}

// ═══════════════════════════════════════════════════════════
//  공통 색상/스타일
// ═══════════════════════════════════════════════════════════
const _bg = Color(0xFF0F172A);
const _card = Color(0xFF1E293B);
const _border = Color(0xFF334155);
const _accent = Color(0xFF6366F1);
const _green = Color(0xFF10B981);
const _red = Color(0xFFEF4444);
const _yellow = Color(0xFFF59E0B);

Widget _statusText(String text) => Padding(
  padding: const EdgeInsets.symmetric(vertical: 8),
  child: Text(text, style: const TextStyle(color: Color(0xFF94A3B8), fontSize: 13), textAlign: TextAlign.center),
);

Widget _bigButton(String label, VoidCallback onPressed, {Color color = _accent, IconData? icon}) =>
  ElevatedButton.icon(
    onPressed: onPressed,
    icon: icon != null ? Icon(icon, size: 20) : const SizedBox.shrink(),
    label: Text(label, style: const TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),
    style: ElevatedButton.styleFrom(
      backgroundColor: color,
      minimumSize: const Size(double.infinity, 48),
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
    ),
  );

// ═══════════════════════════════════════════════════════════
//  H01: 주사위 (dice)
// ═══════════════════════════════════════════════════════════
class DiceWidget extends StatefulWidget {
  const DiceWidget({super.key});
  @override State<DiceWidget> createState() => _DiceWidgetState();
}
class _DiceWidgetState extends State<DiceWidget> {
  String output = '스마트폰을 흔들어보세요!';
  String bigText = '🎲';
  StreamSubscription? _sub;
  DateTime _lastShake = DateTime.now();

  @override
  void initState() {
    super.initState();
    _sub = accelerometerEventStream(samplingPeriod: const Duration(milliseconds: 100)).listen((e) {
      final total = e.x.abs() + e.y.abs() + e.z.abs();
      if (total > 20 && DateTime.now().difference(_lastShake).inMilliseconds > 1000) {
        _lastShake = DateTime.now();
        final dice = Random().nextInt(6) + 1;
        const emoji = ['⚀','⚁','⚂','⚃','⚄','⚅'];
        HapticFeedback.mediumImpact();
        setState(() { bigText = emoji[dice - 1]; output = '주사위: $dice'; });
      }
    });
  }
  @override void dispose() { _sub?.cancel(); super.dispose(); }

  @override
  Widget build(BuildContext context) {
    return Column(children: [
      Center(child: Text(bigText, style: const TextStyle(fontSize: 100))),
      const SizedBox(height: 8),
      _statusText(output),
    ]);
  }
}

// ═══════════════════════════════════════════════════════════
//  H02: 모스부호 SOS (sos)
// ═══════════════════════════════════════════════════════════
class SOSWidget extends StatefulWidget {
  const SOSWidget({super.key});
  @override State<SOSWidget> createState() => _SOSWidgetState();
}
class _SOSWidgetState extends State<SOSWidget> {
  String output = 'SOS 버튼을 누르세요';
  String morse = '';
  bool running = false;

  Future<void> run() async {
    if (running) return;
    running = true;
    setState(() { output = 'SOS 전송 시작!'; morse = ''; });
    for (int i = 0; i < 3; i++) { Vibration.vibrate(duration: 200); if (!mounted) return; setState(() { morse += '·'; }); await Future.delayed(const Duration(milliseconds: 400)); }
    await Future.delayed(const Duration(milliseconds: 400));
    for (int i = 0; i < 3; i++) { Vibration.vibrate(duration: 600); if (!mounted) return; setState(() { morse += '—'; }); await Future.delayed(const Duration(milliseconds: 800)); }
    await Future.delayed(const Duration(milliseconds: 400));
    for (int i = 0; i < 3; i++) { Vibration.vibrate(duration: 200); if (!mounted) return; setState(() { morse += '·'; }); await Future.delayed(const Duration(milliseconds: 400)); }
    if (!mounted) return;
    setState(() { output = 'SOS 전송 완료!'; });
    running = false;
  }

  @override
  Widget build(BuildContext context) {
    return Column(children: [
      Center(child: Text(morse.isEmpty ? '· · ·  — — —  · · ·' : morse,
        style: const TextStyle(fontSize: 28, letterSpacing: 3, color: Color(0xFFA5B4FC)))),
      const SizedBox(height: 12),
      _bigButton(running ? '전송 중...' : 'SOS 전송', run, color: _red, icon: Icons.vibration),
      const SizedBox(height: 8),
      _statusText(output),
    ]);
  }
}

// ═══════════════════════════════════════════════════════════
//  H03: 만보기 (pedometer)
// ═══════════════════════════════════════════════════════════
class PedometerWidget extends StatefulWidget {
  const PedometerWidget({super.key});
  @override State<PedometerWidget> createState() => _PedometerWidgetState();
}
class _PedometerWidgetState extends State<PedometerWidget> {
  int steps = 0;
  double _lastMag = 0;
  bool _peakDetected = false;
  DateTime _lastStep = DateTime.now();
  StreamSubscription? _sub;

  @override
  void initState() {
    super.initState();
    _sub = accelerometerEventStream(samplingPeriod: const Duration(milliseconds: 50)).listen((e) {
      final mag = sqrt(e.x * e.x + e.y * e.y + e.z * e.z);
      final diff = mag - _lastMag;
      // 피크 감지: 올라갈 때 마크하고, 내려올 때 한 번만 카운트 (디바운스 300ms)
      if (diff > 6) {
        _peakDetected = true;
      } else if (_peakDetected && diff < -3) {
        _peakDetected = false;
        final now = DateTime.now();
        if (now.difference(_lastStep).inMilliseconds > 300) {
          _lastStep = now;
          setState(() => steps++);
          HapticFeedback.selectionClick();
        }
      }
      _lastMag = mag;
    });
  }
  @override void dispose() { _sub?.cancel(); super.dispose(); }

  @override
  Widget build(BuildContext context) {
    return Column(children: [
      const Icon(Icons.directions_walk, size: 60, color: _accent),
      const SizedBox(height: 8),
      Text('$steps', style: const TextStyle(fontSize: 72, fontWeight: FontWeight.bold, color: Colors.white)),
      const Text('걸음', style: TextStyle(fontSize: 20, color: Color(0xFF94A3B8))),
      const SizedBox(height: 16),
      _bigButton('초기화', () => setState(() => steps = 0), icon: Icons.refresh, color: _card),
      _statusText('스마트폰을 들고 걸어보세요!'),
    ]);
  }
}

// ═══════════════════════════════════════════════════════════
//  H04: 수평계 (level)
// ═══════════════════════════════════════════════════════════
class LevelWidget extends StatefulWidget {
  const LevelWidget({super.key});
  @override State<LevelWidget> createState() => _LevelWidgetState();
}
class _LevelWidgetState extends State<LevelWidget> {
  double _x = 0, _y = 0;
  StreamSubscription? _sub;

  @override
  void initState() {
    super.initState();
    _sub = accelerometerEventStream(samplingPeriod: const Duration(milliseconds: 30)).listen((e) {
      setState(() { _x = e.x; _y = e.y; });
    });
  }
  @override void dispose() { _sub?.cancel(); super.dispose(); }

  @override
  Widget build(BuildContext context) {
    final isLevel = _x.abs() < 0.5 && _y.abs() < 0.5;
    return Column(children: [
      Center(child: Container(
        width: 250, height: 250,
        decoration: BoxDecoration(
          shape: BoxShape.circle,
          color: _bg,
          border: Border.all(color: isLevel ? _green : _border, width: 3),
        ),
        child: CustomPaint(painter: _LevelPainter(_x, _y, isLevel)),
      )),
      const SizedBox(height: 12),
      Text(isLevel ? '✅ 수평입니다!' : 'X: ${_x.toStringAsFixed(1)}°  Y: ${_y.toStringAsFixed(1)}°',
        style: TextStyle(fontSize: 16, color: isLevel ? _green : Colors.white, fontWeight: FontWeight.w600)),
      _statusText('스마트폰을 평평한 곳에 놓아보세요'),
    ]);
  }
}
class _LevelPainter extends CustomPainter {
  final double x, y;
  final bool isLevel;
  _LevelPainter(this.x, this.y, this.isLevel);
  @override
  void paint(Canvas canvas, Size size) {
    final cx = size.width / 2;
    final cy = size.height / 2;
    // 십자선
    final linePaint = Paint()..color = const Color(0xFF334155)..strokeWidth = 1;
    canvas.drawLine(Offset(cx, 0), Offset(cx, size.height), linePaint);
    canvas.drawLine(Offset(0, cy), Offset(size.width, cy), linePaint);
    // 중심 원
    canvas.drawCircle(Offset(cx, cy), 8, Paint()..color = const Color(0xFF334155)..style = PaintingStyle.stroke..strokeWidth = 2);
    // 기포
    final bx = (cx + x * 10).clamp(20.0, size.width - 20);
    final by = (cy + y * 10).clamp(20.0, size.height - 20);
    canvas.drawCircle(Offset(bx, by), 14, Paint()..color = isLevel ? _green : _accent);
  }
  @override bool shouldRepaint(covariant _LevelPainter old) => true;
}

// ═══════════════════════════════════════════════════════════
//  H05: 흔들어서 색상 바꾸기 (shakeColor)
// ═══════════════════════════════════════════════════════════
class ShakeColorWidget extends StatefulWidget {
  const ShakeColorWidget({super.key});
  @override State<ShakeColorWidget> createState() => _ShakeColorWidgetState();
}
class _ShakeColorWidgetState extends State<ShakeColorWidget> {
  Color _color = const Color(0xFF6366F1);
  String _hex = '#6366F1';
  StreamSubscription? _sub;
  DateTime _lastShake = DateTime.now();

  @override
  void initState() {
    super.initState();
    _sub = accelerometerEventStream(samplingPeriod: const Duration(milliseconds: 100)).listen((e) {
      final total = e.x.abs() + e.y.abs() + e.z.abs();
      if (total > 20 && DateTime.now().difference(_lastShake).inMilliseconds > 800) {
        _lastShake = DateTime.now();
        final r = Random();
        final c = Color.fromARGB(255, r.nextInt(256), r.nextInt(256), r.nextInt(256));
        final hex = '#${(c.value & 0xFFFFFF).toRadixString(16).padLeft(6, '0').toUpperCase()}';
        HapticFeedback.mediumImpact();
        setState(() { _color = c; _hex = hex; });
      }
    });
  }
  @override void dispose() { _sub?.cancel(); super.dispose(); }

  @override
  Widget build(BuildContext context) {
    return Column(children: [
      Container(
        width: double.infinity, height: 200,
        decoration: BoxDecoration(color: _color, borderRadius: BorderRadius.circular(16)),
        child: Center(child: Text(_hex,
          style: TextStyle(fontSize: 36, fontWeight: FontWeight.bold,
            color: _color.computeLuminance() > 0.5 ? Colors.black : Colors.white))),
      ),
      const SizedBox(height: 12),
      _statusText('스마트폰을 흔들면 색상이 바뀌어요!'),
    ]);
  }
}

// ═══════════════════════════════════════════════════════════
//  H06: 기울기 방향 표시기 (tiltArrow)
// ═══════════════════════════════════════════════════════════
class TiltArrowWidget extends StatefulWidget {
  const TiltArrowWidget({super.key});
  @override State<TiltArrowWidget> createState() => _TiltArrowWidgetState();
}
class _TiltArrowWidgetState extends State<TiltArrowWidget> {
  double _x = 0, _y = 0;
  String _dir = '●';
  StreamSubscription? _sub;

  @override
  void initState() {
    super.initState();
    _sub = accelerometerEventStream(samplingPeriod: const Duration(milliseconds: 50)).listen((e) {
      setState(() {
        _x = e.x; _y = e.y;
        if (_x.abs() < 2 && _y.abs() < 2) { _dir = '●'; return; }
        final angle = (atan2(_y, -_x) * 180 / pi + 360) % 360;
        const dirs = ['→', '↘', '↓', '↙', '←', '↖', '↑', '↗'];
        _dir = dirs[((angle + 22.5) ~/ 45) % 8];
      });
    });
  }
  @override void dispose() { _sub?.cancel(); super.dispose(); }

  @override
  Widget build(BuildContext context) {
    return Column(children: [
      Container(
        width: 200, height: 200,
        decoration: BoxDecoration(shape: BoxShape.circle, color: _card, border: Border.all(color: _border, width: 2)),
        child: Center(child: Text(_dir, style: const TextStyle(fontSize: 80))),
      ),
      const SizedBox(height: 8),
      Text('X: ${_x.toStringAsFixed(1)}  Y: ${_y.toStringAsFixed(1)}',
        style: const TextStyle(color: Color(0xFFA5B4FC), fontSize: 16, fontFamily: 'monospace')),
      _statusText('스마트폰을 기울여보세요'),
    ]);
  }
}

// ═══════════════════════════════════════════════════════════
//  H07: 진동 패턴 만들기 (vibePattern)
// ═══════════════════════════════════════════════════════════
class VibePatternWidget extends StatefulWidget {
  const VibePatternWidget({super.key});
  @override State<VibePatternWidget> createState() => _VibePatternWidgetState();
}
class _VibePatternWidgetState extends State<VibePatternWidget> {
  final List<int> _pattern = [];
  String _display = '';
  bool _playing = false;

  void _addDot() {
    setState(() { _pattern.add(200); _display += '·'; });
    Vibration.vibrate(duration: 200);
  }
  void _addDash() {
    setState(() { _pattern.add(600); _display += '—'; });
    Vibration.vibrate(duration: 600);
  }
  Future<void> _play() async {
    if (_playing || _pattern.isEmpty) return;
    _playing = true;
    for (final ms in _pattern) {
      Vibration.vibrate(duration: ms);
      await Future.delayed(Duration(milliseconds: ms + 200));
    }
    _playing = false;
  }
  void _clear() => setState(() { _pattern.clear(); _display = ''; });

  @override
  Widget build(BuildContext context) {
    return Column(children: [
      Container(
        width: double.infinity, padding: const EdgeInsets.all(16),
        constraints: const BoxConstraints(minHeight: 60),
        decoration: BoxDecoration(color: _bg, borderRadius: BorderRadius.circular(12), border: Border.all(color: _border)),
        child: Text(_display.isEmpty ? '패턴을 추가하세요' : _display,
          style: const TextStyle(fontSize: 28, letterSpacing: 4, color: Color(0xFFA5B4FC)), textAlign: TextAlign.center),
      ),
      const SizedBox(height: 12),
      Row(children: [
        Expanded(child: ElevatedButton(
          onPressed: _addDot,
          style: ElevatedButton.styleFrom(backgroundColor: _accent, padding: const EdgeInsets.all(16),
            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10))),
          child: const Text('· 점', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
        )),
        const SizedBox(width: 8),
        Expanded(child: ElevatedButton(
          onPressed: _addDash,
          style: ElevatedButton.styleFrom(backgroundColor: _yellow, padding: const EdgeInsets.all(16),
            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10))),
          child: const Text('— 선', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
        )),
      ]),
      const SizedBox(height: 8),
      Row(children: [
        Expanded(child: _bigButton('▶ 재생', _play, color: _green, icon: Icons.play_arrow)),
        const SizedBox(width: 8),
        Expanded(child: _bigButton('초기화', _clear, color: _card, icon: Icons.delete_outline)),
      ]),
      _statusText('점(·)과 선(—)으로 패턴을 만드세요'),
    ]);
  }
}

// ═══════════════════════════════════════════════════════════
//  H08: 흔들기 카운터 (shakeCount)
// ═══════════════════════════════════════════════════════════
class ShakeCountWidget extends StatefulWidget {
  const ShakeCountWidget({super.key});
  @override State<ShakeCountWidget> createState() => _ShakeCountWidgetState();
}
class _ShakeCountWidgetState extends State<ShakeCountWidget> {
  int _count = 0;
  StreamSubscription? _sub;
  DateTime _lastShake = DateTime.now();

  @override
  void initState() {
    super.initState();
    _sub = accelerometerEventStream(samplingPeriod: const Duration(milliseconds: 100)).listen((e) {
      final total = e.x.abs() + e.y.abs() + e.z.abs();
      if (total > 20 && DateTime.now().difference(_lastShake).inMilliseconds > 800) {
        _lastShake = DateTime.now();
        HapticFeedback.mediumImpact();
        setState(() => _count++);
      }
    });
  }
  @override void dispose() { _sub?.cancel(); super.dispose(); }

  @override
  Widget build(BuildContext context) {
    return Column(children: [
      Text('$_count', style: const TextStyle(fontSize: 80, fontWeight: FontWeight.bold, color: Colors.white)),
      const Text('흔들기', style: TextStyle(fontSize: 20, color: Color(0xFF94A3B8))),
      const SizedBox(height: 16),
      _bigButton('초기화', () => setState(() => _count = 0), icon: Icons.refresh, color: _red),
      _statusText('스마트폰을 흔들어서 카운트를 올리세요!'),
    ]);
  }
}

// ═══════════════════════════════════════════════════════════
//  H09: 기울기로 슬라이더 제어 (tiltSlider)
// ═══════════════════════════════════════════════════════════
class TiltSliderWidget extends StatefulWidget {
  const TiltSliderWidget({super.key});
  @override State<TiltSliderWidget> createState() => _TiltSliderWidgetState();
}
class _TiltSliderWidgetState extends State<TiltSliderWidget> {
  double _value = 50;
  StreamSubscription? _sub;

  @override
  void initState() {
    super.initState();
    _sub = accelerometerEventStream(samplingPeriod: const Duration(milliseconds: 50)).listen((e) {
      setState(() {
        _value = ((_value + (-e.x) * 0.5).clamp(0.0, 100.0));
      });
    });
  }
  @override void dispose() { _sub?.cancel(); super.dispose(); }

  @override
  Widget build(BuildContext context) {
    return Column(children: [
      Text('${_value.toInt()}%', style: const TextStyle(fontSize: 48, fontWeight: FontWeight.bold, color: Colors.white)),
      const SizedBox(height: 8),
      Container(
        width: double.infinity, height: 40,
        margin: const EdgeInsets.symmetric(horizontal: 16),
        decoration: BoxDecoration(color: _bg, borderRadius: BorderRadius.circular(20), border: Border.all(color: _border)),
        child: FractionallySizedBox(
          alignment: Alignment.centerLeft,
          widthFactor: _value / 100,
          child: Container(decoration: BoxDecoration(
            color: Color.lerp(_red, _green, _value / 100),
            borderRadius: BorderRadius.circular(20),
          )),
        ),
      ),
      const SizedBox(height: 16),
      _statusText('좌우로 기울여서 값을 조절하세요'),
    ]);
  }
}

// ═══════════════════════════════════════════════════════════
//  H10: 움직임 감지 알람 (motionAlarm)
// ═══════════════════════════════════════════════════════════
class MotionAlarmWidget extends StatefulWidget {
  const MotionAlarmWidget({super.key});
  @override State<MotionAlarmWidget> createState() => _MotionAlarmWidgetState();
}
class _MotionAlarmWidgetState extends State<MotionAlarmWidget> {
  String _state = 'idle'; // idle, arming, armed, alarm
  double _baseX = 0, _baseY = 0, _baseZ = 0;
  StreamSubscription? _sub;

  Future<void> _arm() async {
    setState(() => _state = 'arming');
    // 현재 가속도를 기준으로 저장
    _sub?.cancel();
    _sub = accelerometerEventStream(samplingPeriod: const Duration(milliseconds: 100)).listen((e) {
      if (_state == 'arming') {
        _baseX = e.x; _baseY = e.y; _baseZ = e.z;
      } else if (_state == 'armed') {
        final diff = (e.x - _baseX).abs() + (e.y - _baseY).abs() + (e.z - _baseZ).abs();
        if (diff > 3) {
          setState(() => _state = 'alarm');
          Vibration.vibrate(duration: 1000);
        }
      }
    });
    await Future.delayed(const Duration(seconds: 3));
    if (mounted && _state == 'arming') setState(() => _state = 'armed');
  }

  void _reset() {
    _sub?.cancel();
    setState(() => _state = 'idle');
  }

  @override void dispose() { _sub?.cancel(); super.dispose(); }

  @override
  Widget build(BuildContext context) {
    IconData icon; String text; Color color;
    switch (_state) {
      case 'arming': icon = Icons.timer; text = '3초 후 감지 시작...'; color = _yellow;
      case 'armed': icon = Icons.lock; text = '감지 중... 움직이지 마세요!'; color = _green;
      case 'alarm': icon = Icons.warning; text = '움직임 감지! 알람!'; color = _red;
      default: icon = Icons.security; text = '알람 설정 버튼을 누르세요'; color = _accent;
    }
    return Column(children: [
      Icon(icon, size: 80, color: color),
      const SizedBox(height: 8),
      Text(text, style: TextStyle(fontSize: 18, color: color, fontWeight: FontWeight.bold), textAlign: TextAlign.center),
      const SizedBox(height: 16),
      if (_state == 'idle')
        _bigButton('알람 설정', _arm, icon: Icons.lock_outline, color: _accent)
      else
        _bigButton('초기화', _reset, icon: Icons.refresh, color: _card),
    ]);
  }
}

// ═══════════════════════════════════════════════════════════
//  I01: 카메라 (camera)
// ═══════════════════════════════════════════════════════════
class CameraWidget extends StatefulWidget {
  const CameraWidget({super.key});
  @override State<CameraWidget> createState() => _CameraWidgetState();
}
class _CameraWidgetState extends State<CameraWidget> {
  String output = '촬영 버튼을 눌러주세요';
  File? _photo;
  final _picker = ImagePicker();

  Future<void> _take() async {
    final picked = await _picker.pickImage(source: ImageSource.camera);
    if (picked != null) {
      final file = File(picked.path);
      final size = await file.length();
      Vibration.vibrate(duration: 100);
      setState(() { _photo = file; output = '촬영 완료! (${(size / 1024).toStringAsFixed(0)} KB)'; });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Column(children: [
      if (_photo != null)
        ClipRRect(borderRadius: BorderRadius.circular(12), child: Image.file(_photo!, width: 300, fit: BoxFit.cover))
      else
        const Center(child: Icon(Icons.camera_alt, size: 80, color: _accent)),
      const SizedBox(height: 12),
      _bigButton('촬영', _take, icon: Icons.camera_alt, color: const Color(0xFF2563EB)),
      const SizedBox(height: 8),
      _statusText(output),
    ]);
  }
}

// ═══════════════════════════════════════════════════════════
//  I02: 손전등 (flashlight)
// ═══════════════════════════════════════════════════════════
class FlashlightWidget extends StatefulWidget {
  const FlashlightWidget({super.key});
  @override State<FlashlightWidget> createState() => _FlashlightWidgetState();
}
class _FlashlightWidgetState extends State<FlashlightWidget> {
  bool _on = false;
  String _status = '';

  Future<void> _toggle() async {
    try {
      if (_on) {
        await TorchLight.disableTorch();
      } else {
        await TorchLight.enableTorch();
      }
      setState(() { _on = !_on; _status = ''; });
      HapticFeedback.mediumImpact();
    } catch (e) {
      setState(() { _status = '플래시를 사용할 수 없습니다: $e'; });
    }
  }

  @override
  void dispose() {
    if (_on) TorchLight.disableTorch();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Column(children: [
      GestureDetector(
        onTap: _toggle,
        child: Container(
          width: 150, height: 150,
          decoration: BoxDecoration(
            shape: BoxShape.circle,
            color: _on ? _yellow : _card,
            boxShadow: _on ? [BoxShadow(color: _yellow.withOpacity(0.5), blurRadius: 40, spreadRadius: 10)] : [],
          ),
          child: Icon(_on ? Icons.flashlight_on : Icons.flashlight_off,
            size: 60, color: _on ? Colors.black : Colors.white54),
        ),
      ),
      const SizedBox(height: 16),
      Text(_on ? '🔦 손전등 ON' : '손전등 OFF',
        style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold, color: _on ? _yellow : Colors.white54)),
      _statusText('터치하여 손전등을 켜고 끄세요'),
      if (_status.isNotEmpty) Padding(padding: const EdgeInsets.only(top: 8), child: Text(_status, style: const TextStyle(color: Colors.red, fontSize: 12))),
    ]);
  }
}

// ═══════════════════════════════════════════════════════════
//  I03: 셀카 (selfie)
// ═══════════════════════════════════════════════════════════
class SelfieWidget extends StatefulWidget {
  const SelfieWidget({super.key});
  @override State<SelfieWidget> createState() => _SelfieWidgetState();
}
class _SelfieWidgetState extends State<SelfieWidget> {
  File? _photo;
  String _msg = '셀카 버튼을 눌러주세요';
  final _picker = ImagePicker();

  Future<void> _takeSelfie() async {
    final picked = await _picker.pickImage(
      source: ImageSource.camera,
      preferredCameraDevice: CameraDevice.front,
    );
    if (picked != null) {
      final file = File(picked.path);
      final size = await file.length();
      Vibration.vibrate(duration: 100);
      setState(() { _photo = file; _msg = '셀카 촬영 완료! (${(size / 1024).toStringAsFixed(0)} KB)'; });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Column(children: [
      if (_photo != null)
        ClipRRect(borderRadius: BorderRadius.circular(12), child: Image.file(_photo!, width: 280, fit: BoxFit.cover))
      else
        const Center(child: Icon(Icons.person, size: 80, color: _accent)),
      const SizedBox(height: 12),
      _bigButton('셀카 촬영', _takeSelfie, icon: Icons.camera_front, color: const Color(0xFF8B5CF6)),
      _statusText(_msg),
    ]);
  }
}

// ═══════════════════════════════════════════════════════════
//  I04: 갤러리 (gallery)
// ═══════════════════════════════════════════════════════════
class GalleryWidget extends StatefulWidget {
  const GalleryWidget({super.key});
  @override State<GalleryWidget> createState() => _GalleryWidgetState();
}
class _GalleryWidgetState extends State<GalleryWidget> {
  File? _photo;
  String _msg = '갤러리에서 사진을 선택하세요';
  final _picker = ImagePicker();

  Future<void> _pickFromGallery() async {
    final picked = await _picker.pickImage(source: ImageSource.gallery);
    if (picked != null) {
      final file = File(picked.path);
      final size = await file.length();
      setState(() { _photo = file; _msg = '선택 완료! (${(size / 1024).toStringAsFixed(0)} KB)'; });
    } else {
      setState(() => _msg = '사진을 선택하지 않았습니다');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Column(children: [
      if (_photo != null)
        ClipRRect(borderRadius: BorderRadius.circular(12), child: Image.file(_photo!, width: 280, fit: BoxFit.cover))
      else
        const Center(child: Icon(Icons.photo_library, size: 80, color: _accent)),
      const SizedBox(height: 12),
      _bigButton('갤러리 열기', _pickFromGallery, icon: Icons.photo_library, color: _green),
      _statusText(_msg),
    ]);
  }
}

// ═══════════════════════════════════════════════════════════
//  I05: 타이머 카메라 (timerCam)
// ═══════════════════════════════════════════════════════════
class TimerCamWidget extends StatefulWidget {
  const TimerCamWidget({super.key});
  @override State<TimerCamWidget> createState() => _TimerCamWidgetState();
}
class _TimerCamWidgetState extends State<TimerCamWidget> {
  File? _photo;
  String _msg = '타이머 촬영 버튼을 누르세요';
  int _countdown = 0;
  bool _running = false;
  final _picker = ImagePicker();

  Future<void> _startTimer() async {
    if (_running) return;
    _running = true;
    for (int i = 3; i > 0; i--) {
      if (!mounted) return;
      setState(() => _countdown = i);
      Vibration.vibrate(duration: 100);
      await Future.delayed(const Duration(seconds: 1));
    }
    if (!mounted) return;
    setState(() { _countdown = 0; _msg = '촬영 중...'; });
    final picked = await _picker.pickImage(source: ImageSource.camera);
    if (picked != null) {
      final file = File(picked.path);
      final size = await file.length();
      Vibration.vibrate(duration: 200);
      setState(() { _photo = file; _msg = '촬영 완료! (${(size / 1024).toStringAsFixed(0)} KB)'; });
    } else {
      setState(() => _msg = '촬영 취소됨');
    }
    _running = false;
  }

  @override
  Widget build(BuildContext context) {
    return Column(children: [
      if (_countdown > 0)
        Text('$_countdown', style: const TextStyle(fontSize: 100, fontWeight: FontWeight.bold, color: _red))
      else if (_photo != null)
        ClipRRect(borderRadius: BorderRadius.circular(12), child: Image.file(_photo!, width: 280, fit: BoxFit.cover))
      else
        const Icon(Icons.timer, size: 80, color: _accent),
      const SizedBox(height: 12),
      _bigButton('3초 타이머 촬영', _startTimer, icon: Icons.timer, color: const Color(0xFF2563EB)),
      _statusText(_msg),
    ]);
  }
}

// ═══════════════════════════════════════════════════════════
//  I06: 연속 촬영 (burstCam)
// ═══════════════════════════════════════════════════════════
class BurstCamWidget extends StatefulWidget {
  const BurstCamWidget({super.key});
  @override State<BurstCamWidget> createState() => _BurstCamWidgetState();
}
class _BurstCamWidgetState extends State<BurstCamWidget> {
  final List<File> _photos = [];
  String _msg = '버스트 촬영 버튼을 누르세요';
  bool _running = false;
  final _picker = ImagePicker();

  Future<void> _burst() async {
    if (_running) return;
    _running = true;
    _photos.clear();
    for (int i = 0; i < 3; i++) {
      setState(() => _msg = '촬영 중... ${i + 1}/3');
      final picked = await _picker.pickImage(source: ImageSource.camera);
      if (picked != null) {
        _photos.add(File(picked.path));
        Vibration.vibrate(duration: 50);
      } else {
        break;
      }
    }
    setState(() => _msg = '${_photos.length}장 촬영 완료!');
    _running = false;
  }

  @override
  Widget build(BuildContext context) {
    return Column(children: [
      if (_photos.isNotEmpty)
        SizedBox(height: 120, child: ListView.builder(
          scrollDirection: Axis.horizontal,
          itemCount: _photos.length,
          itemBuilder: (ctx, i) => Padding(
            padding: const EdgeInsets.only(right: 8),
            child: ClipRRect(borderRadius: BorderRadius.circular(8),
              child: Image.file(_photos[i], width: 100, height: 120, fit: BoxFit.cover)),
          ),
        ))
      else
        const Icon(Icons.burst_mode, size: 80, color: _accent),
      const SizedBox(height: 12),
      _bigButton('연속 3장 촬영', _burst, icon: Icons.burst_mode, color: const Color(0xFF2563EB)),
      _statusText(_msg),
    ]);
  }
}

// ═══════════════════════════════════════════════════════════
//  I07: 촬영 후 필터 (photoFilter)
// ═══════════════════════════════════════════════════════════
class PhotoFilterWidget extends StatefulWidget {
  const PhotoFilterWidget({super.key});
  @override State<PhotoFilterWidget> createState() => _PhotoFilterWidgetState();
}
class _PhotoFilterWidgetState extends State<PhotoFilterWidget> {
  File? _photo;
  String _filter = 'none'; // none, grayscale, sepia, invert
  String _msg = '먼저 사진을 촬영하세요';
  final _picker = ImagePicker();

  Future<void> _capture() async {
    final picked = await _picker.pickImage(source: ImageSource.camera);
    if (picked != null) {
      setState(() { _photo = File(picked.path); _filter = 'none'; _msg = '필터를 선택하세요'; });
    }
  }

  ColorFilter? get _colorFilter {
    switch (_filter) {
      case 'grayscale':
        return const ColorFilter.matrix([
          0.2126, 0.7152, 0.0722, 0, 0,
          0.2126, 0.7152, 0.0722, 0, 0,
          0.2126, 0.7152, 0.0722, 0, 0,
          0, 0, 0, 1, 0,
        ]);
      case 'sepia':
        return const ColorFilter.matrix([
          0.393, 0.769, 0.189, 0, 0,
          0.349, 0.686, 0.168, 0, 0,
          0.272, 0.534, 0.131, 0, 0,
          0, 0, 0, 1, 0,
        ]);
      case 'invert':
        return const ColorFilter.matrix([
          -1, 0, 0, 0, 255,
          0, -1, 0, 0, 255,
          0, 0, -1, 0, 255,
          0, 0, 0, 1, 0,
        ]);
      default: return null;
    }
  }

  @override
  Widget build(BuildContext context) {
    return Column(children: [
      if (_photo != null)
        ClipRRect(
          borderRadius: BorderRadius.circular(12),
          child: ColorFiltered(
            colorFilter: _colorFilter ?? const ColorFilter.mode(Colors.transparent, BlendMode.dst),
            child: Image.file(_photo!, width: 280, fit: BoxFit.cover),
          ),
        )
      else
        const Icon(Icons.photo_filter, size: 80, color: _accent),
      const SizedBox(height: 12),
      if (_photo == null)
        _bigButton('사진 촬영', _capture, icon: Icons.camera_alt, color: const Color(0xFF2563EB))
      else ...[
        Row(children: [
          _filterBtn('원본', 'none', _accent),
          _filterBtn('흑백', 'grayscale', Colors.grey),
          _filterBtn('세피아', 'sepia', const Color(0xFFD2691E)),
          _filterBtn('반전', 'invert', Colors.purple),
        ]),
        const SizedBox(height: 8),
        _bigButton('다시 촬영', _capture, icon: Icons.refresh, color: _card),
      ],
      _statusText(_msg),
    ]);
  }

  Widget _filterBtn(String label, String filterKey, Color color) {
    final selected = _filter == filterKey;
    return Expanded(child: Padding(
      padding: const EdgeInsets.symmetric(horizontal: 2),
      child: ElevatedButton(
        onPressed: () => setState(() { _filter = filterKey; _msg = '$label 필터 적용'; }),
        style: ElevatedButton.styleFrom(
          backgroundColor: selected ? color : _card,
          padding: const EdgeInsets.all(10),
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
        ),
        child: Text(label, style: TextStyle(fontSize: 12, fontWeight: selected ? FontWeight.bold : FontWeight.normal)),
      ),
    ));
  }
}

// ═══════════════════════════════════════════════════════════
//  I08: QR코드 표시 (qrDisplay)
// ═══════════════════════════════════════════════════════════
class QRDisplayWidget extends StatefulWidget {
  const QRDisplayWidget({super.key});
  @override State<QRDisplayWidget> createState() => _QRDisplayWidgetState();
}
class _QRDisplayWidgetState extends State<QRDisplayWidget> {
  final _ctrl = TextEditingController(text: 'https://uttec.co.kr');
  String _qrData = 'https://uttec.co.kr';

  @override void dispose() { _ctrl.dispose(); super.dispose(); }

  void _generate() {
    final text = _ctrl.text.trim();
    if (text.isEmpty) return;
    setState(() => _qrData = text);
    HapticFeedback.mediumImpact();
  }

  @override
  Widget build(BuildContext context) {
    return Column(children: [
      // 실제 QR 코드 (qr_flutter 패키지)
      Center(child: Container(
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(12)),
        child: QrImageView(
          data: _qrData,
          version: QrVersions.auto,
          size: 200,
          backgroundColor: Colors.white,
        ),
      )),
      const SizedBox(height: 8),
      Text(_qrData, style: const TextStyle(color: Color(0xFF94A3B8), fontSize: 12)),
      const SizedBox(height: 12),
      TextField(
        controller: _ctrl,
        decoration: InputDecoration(
          hintText: 'URL 또는 텍스트 입력', hintStyle: const TextStyle(color: Color(0xFF64748B)),
          filled: true, fillColor: _card,
          border: OutlineInputBorder(borderRadius: BorderRadius.circular(12), borderSide: BorderSide.none),
        ),
        style: const TextStyle(color: Colors.white),
        onSubmitted: (_) => _generate(),
      ),
      const SizedBox(height: 8),
      _bigButton('QR 코드 생성', _generate, icon: Icons.qr_code),
    ]);
  }
}

// ═══════════════════════════════════════════════════════════
//  I09: 색상 선택기 (colorPicker)
// ═══════════════════════════════════════════════════════════
class ColorPickerWidget extends StatefulWidget {
  const ColorPickerWidget({super.key});
  @override State<ColorPickerWidget> createState() => _ColorPickerWidgetState();
}
class _ColorPickerWidgetState extends State<ColorPickerWidget> {
  double _hue = 0;
  double _saturation = 1;
  Color _selected = Colors.red;

  void _onPan(Offset pos, Size size) {
    final cx = size.width / 2;
    final cy = size.height / 2;
    final dx = pos.dx - cx;
    final dy = pos.dy - cy;
    final radius = size.width / 2;
    final dist = sqrt(dx * dx + dy * dy).clamp(0.0, radius);

    setState(() {
      _hue = (atan2(dy, dx) * 180 / pi + 360) % 360;
      _saturation = dist / radius;
      _selected = HSVColor.fromAHSV(1, _hue, _saturation, 1).toColor();
    });
  }

  @override
  Widget build(BuildContext context) {
    final hex = '#${(_selected.value & 0xFFFFFF).toRadixString(16).padLeft(6, '0').toUpperCase()}';
    return Column(children: [
      LayoutBuilder(builder: (ctx, constraints) {
        final w = min(constraints.maxWidth, 280.0);
        return GestureDetector(
          onPanUpdate: (d) => _onPan(d.localPosition, Size(w, w)),
          onTapDown: (d) => _onPan(d.localPosition, Size(w, w)),
          child: Center(child: CustomPaint(size: Size(w, w), painter: _ColorWheelPainter())),
        );
      }),
      const SizedBox(height: 12),
      Container(
        width: double.infinity, height: 60,
        decoration: BoxDecoration(color: _selected, borderRadius: BorderRadius.circular(12)),
        child: Center(child: Text(hex,
          style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold,
            color: _selected.computeLuminance() > 0.5 ? Colors.black : Colors.white))),
      ),
      _statusText('색상환을 터치하여 색상을 선택하세요'),
    ]);
  }
}
class _ColorWheelPainter extends CustomPainter {
  @override
  void paint(Canvas canvas, Size size) {
    final cx = size.width / 2;
    final cy = size.height / 2;
    final radius = cx;
    for (double angle = 0; angle < 360; angle += 1) {
      for (double r = 0; r < radius; r += 1) {
        final rad = angle * pi / 180;
        final x = cx + r * cos(rad);
        final y = cy + r * sin(rad);
        final color = HSVColor.fromAHSV(1, angle, r / radius, 1).toColor();
        canvas.drawCircle(Offset(x, y), 1.5, Paint()..color = color);
      }
    }
  }
  @override bool shouldRepaint(covariant CustomPainter old) => false;
}

// ═══════════════════════════════════════════════════════════
//  I10: 디지털 시계 (digitalClock)
// ═══════════════════════════════════════════════════════════
class DigitalClockWidget extends StatefulWidget {
  const DigitalClockWidget({super.key});
  @override State<DigitalClockWidget> createState() => _DigitalClockWidgetState();
}
class _DigitalClockWidgetState extends State<DigitalClockWidget> {
  late Timer _timer;
  String _time = '';
  String _date = '';

  @override
  void initState() {
    super.initState();
    _update();
    _timer = Timer.periodic(const Duration(seconds: 1), (_) => _update());
  }

  void _update() {
    final now = DateTime.now();
    setState(() {
      _time = '${_p(now.hour)}:${_p(now.minute)}:${_p(now.second)}';
      const weekdays = ['월', '화', '수', '목', '금', '토', '일'];
      _date = '${now.year}년 ${now.month}월 ${now.day}일 (${weekdays[now.weekday - 1]})';
    });
  }
  String _p(int n) => n.toString().padLeft(2, '0');

  @override void dispose() { _timer.cancel(); super.dispose(); }

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity, padding: const EdgeInsets.symmetric(vertical: 32),
      decoration: BoxDecoration(color: _bg, borderRadius: BorderRadius.circular(16), border: Border.all(color: _accent, width: 2)),
      child: Column(children: [
        Text(_time, style: const TextStyle(fontSize: 64, fontWeight: FontWeight.bold, color: _accent, fontFamily: 'monospace', letterSpacing: 4)),
        const SizedBox(height: 8),
        Text(_date, style: const TextStyle(fontSize: 18, color: Color(0xFF94A3B8))),
      ]),
    );
  }
}

// ═══════════════════════════════════════════════════════════
//  J01: 공 굴리기 (ball)
// ═══════════════════════════════════════════════════════════
class BallWidget extends StatefulWidget {
  const BallWidget({super.key});
  @override State<BallWidget> createState() => _BallWidgetState();
}
class _BallWidgetState extends State<BallWidget> {
  double bx = 150, by = 150, tx = 0, ty = 0;
  int score = 0;
  StreamSubscription? _sub;

  @override
  void initState() {
    super.initState();
    _newTarget();
    _sub = accelerometerEventStream(samplingPeriod: const Duration(milliseconds: 30)).listen((e) {
      setState(() {
        bx = (bx + -e.x * 1.5).clamp(12, 288);
        by = (by + e.y * 1.5).clamp(12, 288);
        if ((bx - tx).abs() < 22 && (by - ty).abs() < 22) {
          score++;
          HapticFeedback.mediumImpact();
          _newTarget();
        }
      });
    });
  }
  void _newTarget() { tx = Random().nextDouble() * 260 + 20; ty = Random().nextDouble() * 260 + 20; }
  @override void dispose() { _sub?.cancel(); super.dispose(); }

  @override
  Widget build(BuildContext context) {
    return Column(children: [
      Center(child: Text('Score: $score', style: const TextStyle(color: _yellow, fontSize: 18, fontWeight: FontWeight.bold))),
      const SizedBox(height: 8),
      Center(child: Container(
        width: 300, height: 300,
        decoration: BoxDecoration(color: _bg, borderRadius: BorderRadius.circular(12), border: Border.all(color: _border, width: 2)),
        child: CustomPaint(painter: _BallPainter(bx, by, tx, ty)),
      )),
      _statusText('기울여서 빨간 공으로 노란 목표를 잡으세요!'),
    ]);
  }
}
class _BallPainter extends CustomPainter {
  final double bx, by, tx, ty;
  _BallPainter(this.bx, this.by, this.tx, this.ty);
  @override
  void paint(Canvas canvas, Size size) {
    canvas.drawCircle(Offset(tx, ty), 10, Paint()..color = _yellow);
    canvas.drawCircle(Offset(bx, by), 12, Paint()..color = _red);
  }
  @override bool shouldRepaint(covariant _BallPainter old) => true;
}

// ═══════════════════════════════════════════════════════════
//  J02: 반응속도 테스트 (reactionTest)
// ═══════════════════════════════════════════════════════════
class ReactionTestWidget extends StatefulWidget {
  const ReactionTestWidget({super.key});
  @override State<ReactionTestWidget> createState() => _ReactionTestWidgetState();
}
class _ReactionTestWidgetState extends State<ReactionTestWidget> {
  String _state = 'idle'; // idle, waiting, go, done, tooEarly
  int _reactionMs = 0;
  DateTime? _goTime;
  Timer? _timer;

  void _start() {
    setState(() => _state = 'waiting');
    final waitMs = 2000 + Random().nextInt(3000);
    _timer = Timer(Duration(milliseconds: waitMs), () {
      if (mounted) setState(() { _state = 'go'; _goTime = DateTime.now(); });
    });
  }

  void _tap() {
    if (_state == 'waiting') {
      _timer?.cancel();
      setState(() => _state = 'tooEarly');
    } else if (_state == 'go') {
      final now = DateTime.now();
      setState(() { _reactionMs = now.difference(_goTime!).inMilliseconds; _state = 'done'; });
      HapticFeedback.mediumImpact();
    }
  }

  String get _resultText {
    if (_reactionMs < 200) return '번개 같은 반응!';
    if (_reactionMs < 350) return '좋은 반응!';
    if (_reactionMs < 500) return '평균이에요';
    return '조금 느려요, 다시 도전!';
  }

  @override void dispose() { _timer?.cancel(); super.dispose(); }

  @override
  Widget build(BuildContext context) {
    Color bgColor;
    String text;
    switch (_state) {
      case 'waiting': bgColor = _red; text = '초록색이 될 때까지 기다리세요...';
      case 'go': bgColor = _green; text = '지금! 터치하세요!';
      case 'done': bgColor = const Color(0xFF2563EB); text = '${_reactionMs}ms\n$_resultText';
      case 'tooEarly': bgColor = _yellow; text = '너무 빨라요! 다시 시도하세요';
      default: bgColor = _accent; text = '터치하여 시작';
    }

    return GestureDetector(
      onTap: () {
        if (_state == 'idle' || _state == 'done' || _state == 'tooEarly') _start();
        else _tap();
      },
      child: Container(
        width: double.infinity, height: 250,
        decoration: BoxDecoration(color: bgColor, borderRadius: BorderRadius.circular(16)),
        child: Center(child: Text(text,
          style: const TextStyle(fontSize: 24, fontWeight: FontWeight.bold, color: Colors.white),
          textAlign: TextAlign.center)),
      ),
    );
  }
}

// ═══════════════════════════════════════════════════════════
//  J03: 두더지 잡기 (whackMole)
// ═══════════════════════════════════════════════════════════
class WhackMoleWidget extends StatefulWidget {
  const WhackMoleWidget({super.key});
  @override State<WhackMoleWidget> createState() => _WhackMoleWidgetState();
}
class _WhackMoleWidgetState extends State<WhackMoleWidget> {
  int score = 0, misses = 0;
  double _mx = 150, _my = 150;
  bool _visible = true;
  bool _playing = false;
  Timer? _timer;

  void _start() {
    _timer?.cancel();
    score = 0; misses = 0;
    _playing = true;
    _spawnMole();
    _timer = Timer.periodic(const Duration(milliseconds: 1500), (_) {
      if (_visible) misses++; // 못 잡으면 miss
      if (misses >= 5) {
        _timer?.cancel();
        _playing = false;
        Vibration.vibrate(duration: 300);
      } else {
        _spawnMole();
      }
      setState(() {});
    });
  }

  void _spawnMole() {
    _mx = Random().nextDouble() * 240 + 30;
    _my = Random().nextDouble() * 240 + 30;
    _visible = true;
  }

  void _onTap(TapDownDetails d) {
    if (!_playing || !_visible) return;
    final dx = d.localPosition.dx - _mx;
    final dy = d.localPosition.dy - _my;
    if (sqrt(dx * dx + dy * dy) < 30) {
      score++;
      _visible = false;
      HapticFeedback.mediumImpact();
      setState(() {});
    }
  }

  @override void dispose() { _timer?.cancel(); super.dispose(); }

  @override
  Widget build(BuildContext context) {
    return Column(children: [
      Row(mainAxisAlignment: MainAxisAlignment.spaceEvenly, children: [
        Text('점수: $score', style: const TextStyle(color: _green, fontSize: 18, fontWeight: FontWeight.bold)),
        Text('실패: $misses/5', style: const TextStyle(color: _red, fontSize: 18, fontWeight: FontWeight.bold)),
      ]),
      const SizedBox(height: 8),
      GestureDetector(
        onTapDown: _onTap,
        child: Container(
          width: 300, height: 300,
          decoration: BoxDecoration(color: _bg, borderRadius: BorderRadius.circular(12), border: Border.all(color: _border, width: 2)),
          child: _playing
            ? CustomPaint(painter: _MolePainter(_mx, _my, _visible))
            : Center(child: misses >= 5
              ? Text('게임 오버!\n점수: $score', style: const TextStyle(color: Colors.white, fontSize: 20), textAlign: TextAlign.center)
              : const Text('시작 버튼을 누르세요', style: TextStyle(color: Color(0xFF94A3B8), fontSize: 16))),
        ),
      ),
      const SizedBox(height: 8),
      _bigButton(_playing ? '게임 중...' : '시작', _playing ? () {} : _start, icon: Icons.play_arrow, color: _green),
    ]);
  }
}
class _MolePainter extends CustomPainter {
  final double mx, my;
  final bool visible;
  _MolePainter(this.mx, this.my, this.visible);
  @override
  void paint(Canvas canvas, Size size) {
    if (visible) {
      canvas.drawCircle(Offset(mx, my), 25, Paint()..color = const Color(0xFF8B4513));
      canvas.drawCircle(Offset(mx, my - 5), 10, Paint()..color = const Color(0xFFD2691E));
      // 눈
      canvas.drawCircle(Offset(mx - 6, my - 8), 3, Paint()..color = Colors.white);
      canvas.drawCircle(Offset(mx + 6, my - 8), 3, Paint()..color = Colors.white);
    }
  }
  @override bool shouldRepaint(covariant _MolePainter old) => true;
}

// ═══════════════════════════════════════════════════════════
//  J04: Simon Says 기억력 게임 (simonSays)
// ═══════════════════════════════════════════════════════════
class SimonSaysWidget extends StatefulWidget {
  const SimonSaysWidget({super.key});
  @override State<SimonSaysWidget> createState() => _SimonSaysWidgetState();
}
class _SimonSaysWidgetState extends State<SimonSaysWidget> {
  final List<int> _sequence = [];
  final List<int> _playerInput = [];
  int _round = 0;
  String _state = 'idle'; // idle, showing, input, gameover
  int _highlightIdx = -1;
  static const _colors = [Colors.red, Colors.green, Colors.blue, Colors.yellow];
  static const _labels = ['빨강', '초록', '파랑', '노랑'];

  Future<void> _startGame() async {
    _sequence.clear();
    _round = 0;
    await _nextRound();
  }

  Future<void> _nextRound() async {
    _round++;
    _sequence.add(Random().nextInt(4));
    _playerInput.clear();
    if (!mounted) return;
    setState(() => _state = 'showing');
    await Future.delayed(const Duration(milliseconds: 500));
    for (final idx in _sequence) {
      if (!mounted) return;
      setState(() => _highlightIdx = idx);
      Vibration.vibrate(duration: 200);
      await Future.delayed(const Duration(milliseconds: 600));
      if (!mounted) return;
      setState(() => _highlightIdx = -1);
      await Future.delayed(const Duration(milliseconds: 200));
    }
    if (!mounted) return;
    setState(() => _state = 'input');
  }

  void _onColorTap(int idx) {
    if (_state != 'input') return;
    _playerInput.add(idx);
    HapticFeedback.selectionClick();
    final pos = _playerInput.length - 1;
    if (_playerInput[pos] != _sequence[pos]) {
      Vibration.vibrate(duration: 500);
      setState(() => _state = 'gameover');
      return;
    }
    if (_playerInput.length == _sequence.length) {
      _nextRound();
    } else {
      setState(() {});
    }
  }

  @override
  Widget build(BuildContext context) {
    return Column(children: [
      Text('라운드: $_round', style: const TextStyle(color: Colors.white, fontSize: 20, fontWeight: FontWeight.bold)),
      const SizedBox(height: 8),
      if (_state == 'showing')
        const Text('순서를 기억하세요!', style: TextStyle(color: _yellow, fontSize: 16))
      else if (_state == 'input')
        Text('${_playerInput.length}/${_sequence.length}', style: const TextStyle(color: _green, fontSize: 16))
      else if (_state == 'gameover')
        Text('게임 오버! ${_round - 1}라운드 달성!', style: const TextStyle(color: _red, fontSize: 16, fontWeight: FontWeight.bold)),
      const SizedBox(height: 12),
      SizedBox(width: 260, height: 260, child: GridView.count(
        crossAxisCount: 2, mainAxisSpacing: 8, crossAxisSpacing: 8,
        physics: const NeverScrollableScrollPhysics(),
        children: List.generate(4, (i) => GestureDetector(
          onTap: () => _onColorTap(i),
          child: Container(
            decoration: BoxDecoration(
              color: _highlightIdx == i ? _colors[i] : _colors[i].withOpacity(0.4),
              borderRadius: BorderRadius.circular(16),
              border: Border.all(color: _highlightIdx == i ? Colors.white : Colors.transparent, width: 3),
            ),
            child: Center(child: Text(_labels[i], style: TextStyle(
              color: Colors.white, fontSize: 16,
              fontWeight: _highlightIdx == i ? FontWeight.bold : FontWeight.normal))),
          ),
        )),
      )),
      const SizedBox(height: 12),
      if (_state == 'idle' || _state == 'gameover')
        _bigButton('시작', _startGame, icon: Icons.play_arrow, color: _accent),
    ]);
  }
}

// ═══════════════════════════════════════════════════════════
//  J05: 틱택토 (ticTacToe)
// ═══════════════════════════════════════════════════════════
class TicTacToeWidget extends StatefulWidget {
  const TicTacToeWidget({super.key});
  @override State<TicTacToeWidget> createState() => _TicTacToeWidgetState();
}
class _TicTacToeWidgetState extends State<TicTacToeWidget> {
  List<String> _board = List.filled(9, '');
  String _current = 'X';
  String _status = 'X의 차례';

  void _onTap(int i) {
    if (_board[i].isNotEmpty || _status.contains('승리') || _status.contains('무승부')) return;
    setState(() {
      _board[i] = _current;
      final winner = _checkWin();
      if (winner != null) {
        _status = '$winner 승리!';
        Vibration.vibrate(duration: 300);
      } else if (!_board.contains('')) {
        _status = '무승부!';
      } else {
        _current = _current == 'X' ? 'O' : 'X';
        _status = '$_current의 차례';
      }
    });
    HapticFeedback.selectionClick();
  }

  String? _checkWin() {
    const lines = [
      [0,1,2],[3,4,5],[6,7,8], // 가로
      [0,3,6],[1,4,7],[2,5,8], // 세로
      [0,4,8],[2,4,6],         // 대각선
    ];
    for (final line in lines) {
      if (_board[line[0]].isNotEmpty &&
          _board[line[0]] == _board[line[1]] &&
          _board[line[1]] == _board[line[2]]) {
        return _board[line[0]];
      }
    }
    return null;
  }

  void _reset() => setState(() {
    _board = List.filled(9, '');
    _current = 'X';
    _status = 'X의 차례';
  });

  @override
  Widget build(BuildContext context) {
    return Column(children: [
      Text(_status, style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold,
        color: _status.contains('승리') ? _green : Colors.white)),
      const SizedBox(height: 12),
      Center(child: SizedBox(width: 270, height: 270, child: GridView.builder(
        physics: const NeverScrollableScrollPhysics(),
        gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(crossAxisCount: 3, crossAxisSpacing: 6, mainAxisSpacing: 6),
        itemCount: 9,
        itemBuilder: (ctx, i) => GestureDetector(
          onTap: () => _onTap(i),
          child: Container(
            decoration: BoxDecoration(color: _card, borderRadius: BorderRadius.circular(10), border: Border.all(color: _border)),
            child: Center(child: Text(_board[i],
              style: TextStyle(fontSize: 36, fontWeight: FontWeight.bold,
                color: _board[i] == 'X' ? _accent : _red))),
          ),
        ),
      ))),
      const SizedBox(height: 12),
      _bigButton('새 게임', _reset, icon: Icons.refresh, color: _card),
    ]);
  }
}

// ═══════════════════════════════════════════════════════════
//  J06: 15 퍼즐 (slidePuzzle)
// ═══════════════════════════════════════════════════════════
class SlidePuzzleWidget extends StatefulWidget {
  const SlidePuzzleWidget({super.key});
  @override State<SlidePuzzleWidget> createState() => _SlidePuzzleWidgetState();
}
class _SlidePuzzleWidgetState extends State<SlidePuzzleWidget> {
  List<int> _board = [];
  int _moves = 0;

  @override
  void initState() { super.initState(); _shuffle(); }

  void _shuffle() {
    _board = List.generate(16, (i) => i); // 0 = 빈칸, 1~15
    // 섞기
    final rng = Random();
    for (int i = 0; i < 200; i++) {
      final empty = _board.indexOf(0);
      final neighbors = <int>[];
      if (empty % 4 > 0) neighbors.add(empty - 1);
      if (empty % 4 < 3) neighbors.add(empty + 1);
      if (empty >= 4) neighbors.add(empty - 4);
      if (empty < 12) neighbors.add(empty + 4);
      final pick = neighbors[rng.nextInt(neighbors.length)];
      _board[empty] = _board[pick];
      _board[pick] = 0;
    }
    _moves = 0;
  }

  void _tap(int pos) {
    final empty = _board.indexOf(0);
    final rowE = empty ~/ 4, colE = empty % 4;
    final rowP = pos ~/ 4, colP = pos % 4;
    if ((rowE - rowP).abs() + (colE - colP).abs() == 1) {
      setState(() {
        _board[empty] = _board[pos];
        _board[pos] = 0;
        _moves++;
      });
      HapticFeedback.selectionClick();
      if (_isSolved()) Vibration.vibrate(duration: 500);
    }
  }

  bool _isSolved() {
    for (int i = 0; i < 15; i++) {
      if (_board[i] != i + 1) return false;
    }
    return _board[15] == 0;
  }

  @override
  Widget build(BuildContext context) {
    return Column(children: [
      Row(mainAxisAlignment: MainAxisAlignment.spaceEvenly, children: [
        Text('이동: $_moves', style: const TextStyle(color: Colors.white, fontSize: 16)),
        if (_isSolved()) const Text('완성!', style: TextStyle(color: _green, fontSize: 20, fontWeight: FontWeight.bold)),
      ]),
      const SizedBox(height: 8),
      Center(child: SizedBox(width: 280, height: 280, child: GridView.builder(
        physics: const NeverScrollableScrollPhysics(),
        gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(crossAxisCount: 4, crossAxisSpacing: 4, mainAxisSpacing: 4),
        itemCount: 16,
        itemBuilder: (ctx, i) => GestureDetector(
          onTap: () => _tap(i),
          child: Container(
            decoration: BoxDecoration(
              color: _board[i] == 0 ? Colors.transparent : _accent,
              borderRadius: BorderRadius.circular(8),
            ),
            child: Center(child: Text(
              _board[i] == 0 ? '' : '${_board[i]}',
              style: const TextStyle(fontSize: 22, fontWeight: FontWeight.bold, color: Colors.white),
            )),
          ),
        ),
      ))),
      const SizedBox(height: 8),
      _bigButton('섞기', () => setState(() => _shuffle()), icon: Icons.shuffle, color: _card),
    ]);
  }
}

// ═══════════════════════════════════════════════════════════
//  J07: 스네이크 게임 (snake)
// ═══════════════════════════════════════════════════════════
class SnakeWidget extends StatefulWidget {
  const SnakeWidget({super.key});
  @override State<SnakeWidget> createState() => _SnakeWidgetState();
}
class _SnakeWidgetState extends State<SnakeWidget> {
  static const _gridSize = 15;
  static const _cellSize = 20.0;
  List<Point<int>> _snake = [const Point(7, 7)];
  Point<int> _food = const Point(5, 5);
  Point<int> _dir = const Point(0, -1); // 위
  int _score = 0;
  bool _playing = false;
  bool _gameOver = false;
  Timer? _timer;

  void _start() {
    _snake = [const Point(7, 7)];
    _dir = const Point(0, -1);
    _score = 0;
    _gameOver = false;
    _spawnFood();
    _playing = true;
    _timer?.cancel();
    _timer = Timer.periodic(const Duration(milliseconds: 250), (_) => _step());
    setState(() {});
  }

  void _spawnFood() {
    final rng = Random();
    Point<int> pos;
    do {
      pos = Point(rng.nextInt(_gridSize), rng.nextInt(_gridSize));
    } while (_snake.contains(pos));
    _food = pos;
  }

  void _step() {
    if (!_playing) return;
    final head = _snake.first;
    final newHead = Point(head.x + _dir.x, head.y + _dir.y);

    if (newHead.x < 0 || newHead.x >= _gridSize || newHead.y < 0 || newHead.y >= _gridSize || _snake.contains(newHead)) {
      _timer?.cancel();
      _playing = false;
      _gameOver = true;
      Vibration.vibrate(duration: 300);
      setState(() {});
      return;
    }

    _snake.insert(0, newHead);
    if (newHead == _food) {
      _score++;
      HapticFeedback.mediumImpact();
      _spawnFood();
    } else {
      _snake.removeLast();
    }
    setState(() {});
  }

  void _setDir(Point<int> d) {
    // 반대 방향 방지
    if (_dir.x + d.x != 0 || _dir.y + d.y != 0) _dir = d;
  }

  @override void dispose() { _timer?.cancel(); super.dispose(); }

  @override
  Widget build(BuildContext context) {
    final boardSize = _gridSize * _cellSize;
    return Column(children: [
      Text('점수: $_score', style: const TextStyle(color: _green, fontSize: 18, fontWeight: FontWeight.bold)),
      const SizedBox(height: 8),
      GestureDetector(
        onVerticalDragEnd: (d) {
          if ((d.primaryVelocity ?? 0) < 0) _setDir(const Point(0, -1));
          else _setDir(const Point(0, 1));
        },
        onHorizontalDragEnd: (d) {
          if ((d.primaryVelocity ?? 0) < 0) _setDir(const Point(-1, 0));
          else _setDir(const Point(1, 0));
        },
        child: Center(child: Container(
          width: boardSize, height: boardSize,
          decoration: BoxDecoration(color: _bg, border: Border.all(color: _border, width: 2), borderRadius: BorderRadius.circular(8)),
          child: CustomPaint(painter: _SnakePainter(_snake, _food, _gridSize, _cellSize)),
        )),
      ),
      if (_gameOver)
        Padding(padding: const EdgeInsets.only(top: 8),
          child: Text('게임 오버! 점수: $_score', style: const TextStyle(color: _red, fontSize: 18, fontWeight: FontWeight.bold))),
      const SizedBox(height: 8),
      _bigButton(_playing ? '게임 중...' : '시작', _playing ? () {} : _start, icon: Icons.play_arrow, color: _green),
      _statusText('스와이프로 방향을 바꾸세요'),
    ]);
  }
}
class _SnakePainter extends CustomPainter {
  final List<Point<int>> snake;
  final Point<int> food;
  final int gridSize;
  final double cellSize;
  _SnakePainter(this.snake, this.food, this.gridSize, this.cellSize);
  @override
  void paint(Canvas canvas, Size size) {
    // 먹이
    canvas.drawRect(Rect.fromLTWH(food.x * cellSize, food.y * cellSize, cellSize, cellSize),
      Paint()..color = _red);
    // 뱀
    for (int i = 0; i < snake.length; i++) {
      final p = snake[i];
      canvas.drawRect(Rect.fromLTWH(p.x * cellSize, p.y * cellSize, cellSize, cellSize),
        Paint()..color = i == 0 ? const Color(0xFF22C55E) : _green);
    }
  }
  @override bool shouldRepaint(covariant _SnakePainter old) => true;
}

// ═══════════════════════════════════════════════════════════
//  J08: 타이핑 게임 (typingGame)
// ═══════════════════════════════════════════════════════════
class TypingGameWidget extends StatefulWidget {
  const TypingGameWidget({super.key});
  @override State<TypingGameWidget> createState() => _TypingGameWidgetState();
}
class _TypingGameWidgetState extends State<TypingGameWidget> {
  static const _wordsDb = ['python', 'code', 'game', 'hello', 'world', 'loop', 'list', 'fun', 'app', 'data',
    'print', 'class', 'while', 'true', 'false', 'break', 'input', 'math', 'sort', 'type'];
  final List<_FallingWord> _words = [];
  int _score = 0;
  bool _playing = false;
  bool _gameOver = false;
  Timer? _timer;
  Timer? _spawnTimer;
  final _inputCtrl = TextEditingController();
  final _focusNode = FocusNode();

  void _start() {
    _words.clear();
    _score = 0;
    _gameOver = false;
    _playing = true;
    _timer = Timer.periodic(const Duration(milliseconds: 50), (_) => _update());
    _spawnTimer = Timer.periodic(const Duration(milliseconds: 2000), (_) => _spawn());
    _spawn();
    setState(() {});
    _focusNode.requestFocus();
  }

  void _spawn() {
    final word = _wordsDb[Random().nextInt(_wordsDb.length)];
    _words.add(_FallingWord(word, Random().nextDouble() * 240 + 30, 0));
  }

  void _update() {
    if (!_playing || !mounted) return;
    for (final w in _words) { w.y += 1; }
    if (_words.any((w) => w.y > 300)) {
      _timer?.cancel();
      _spawnTimer?.cancel();
      _playing = false;
      _gameOver = true;
      Vibration.vibrate(duration: 300);
    }
    setState(() {});
  }

  void _onSubmit(String text) {
    final idx = _words.indexWhere((w) => w.text == text.trim().toLowerCase());
    if (idx >= 0) {
      _words.removeAt(idx);
      _score++;
      HapticFeedback.selectionClick();
    }
    _inputCtrl.clear();
  }

  @override void dispose() { _timer?.cancel(); _spawnTimer?.cancel(); _inputCtrl.dispose(); _focusNode.dispose(); super.dispose(); }

  @override
  Widget build(BuildContext context) {
    return Column(children: [
      Text('점수: $_score', style: const TextStyle(color: _green, fontSize: 18, fontWeight: FontWeight.bold)),
      const SizedBox(height: 4),
      Container(
        width: 300, height: 300,
        decoration: BoxDecoration(color: _bg, borderRadius: BorderRadius.circular(12), border: Border.all(color: _border, width: 2)),
        child: _playing || _gameOver
          ? CustomPaint(painter: _TypingPainter(_words))
          : const Center(child: Text('시작 버튼을 누르세요', style: TextStyle(color: Color(0xFF94A3B8)))),
      ),
      if (_gameOver) Text('게임 오버! 점수: $_score', style: const TextStyle(color: _red, fontSize: 16, fontWeight: FontWeight.bold)),
      const SizedBox(height: 8),
      if (_playing)
        TextField(
          controller: _inputCtrl,
          focusNode: _focusNode,
          decoration: InputDecoration(
            hintText: '단어를 입력하세요', hintStyle: const TextStyle(color: Color(0xFF64748B)),
            filled: true, fillColor: _card,
            border: OutlineInputBorder(borderRadius: BorderRadius.circular(12), borderSide: BorderSide.none),
          ),
          style: const TextStyle(color: Colors.white, fontSize: 16),
          onSubmitted: _onSubmit,
        )
      else
        _bigButton('시작', _start, icon: Icons.play_arrow, color: _accent),
    ]);
  }
}
class _FallingWord {
  String text; double x, y;
  _FallingWord(this.text, this.x, this.y);
}
class _TypingPainter extends CustomPainter {
  final List<_FallingWord> words;
  _TypingPainter(this.words);
  @override
  void paint(Canvas canvas, Size size) {
    for (final w in words) {
      final tp = TextPainter(
        text: TextSpan(text: w.text, style: const TextStyle(color: _accent, fontSize: 16, fontWeight: FontWeight.bold)),
        textDirection: TextDirection.ltr,
      )..layout();
      tp.paint(canvas, Offset(w.x, w.y));
    }
  }
  @override bool shouldRepaint(covariant _TypingPainter old) => true;
}

// ═══════════════════════════════════════════════════════════
//  J09: 그림 그리기 (drawing)
// ═══════════════════════════════════════════════════════════
class DrawingWidget extends StatefulWidget {
  const DrawingWidget({super.key});
  @override State<DrawingWidget> createState() => _DrawingWidgetState();
}
class _DrawingWidgetState extends State<DrawingWidget> {
  final List<_DrawPoint> _points = [];
  Color _color = Colors.white;
  double _strokeWidth = 3;

  static const _palette = [Colors.white, Colors.red, Colors.orange, Colors.yellow, Colors.green, Colors.blue, Colors.purple, Colors.black];

  @override
  Widget build(BuildContext context) {
    return Column(children: [
      GestureDetector(
        onPanUpdate: (d) => setState(() => _points.add(_DrawPoint(d.localPosition, _color, _strokeWidth))),
        onPanEnd: (_) => setState(() => _points.add(_DrawPoint.separator())),
        child: Container(
          width: 300, height: 300,
          decoration: BoxDecoration(color: _bg, borderRadius: BorderRadius.circular(12), border: Border.all(color: _border, width: 2)),
          child: ClipRRect(
            borderRadius: BorderRadius.circular(10),
            child: CustomPaint(painter: _DrawPainter(_points)),
          ),
        ),
      ),
      const SizedBox(height: 8),
      // 색상 팔레트
      Row(mainAxisAlignment: MainAxisAlignment.center, children: _palette.map((c) =>
        GestureDetector(
          onTap: () => setState(() => _color = c),
          child: Container(
            width: 30, height: 30, margin: const EdgeInsets.symmetric(horizontal: 2),
            decoration: BoxDecoration(
              color: c, shape: BoxShape.circle,
              border: Border.all(color: _color == c ? Colors.white : Colors.transparent, width: 2),
            ),
          ),
        ),
      ).toList()),
      const SizedBox(height: 8),
      Row(mainAxisAlignment: MainAxisAlignment.spaceEvenly, children: [
        const Text('굵기:', style: TextStyle(color: Color(0xFF94A3B8))),
        ...[2.0, 4.0, 8.0, 12.0].map((w) => GestureDetector(
          onTap: () => setState(() => _strokeWidth = w),
          child: Container(
            width: w + 16, height: w + 16,
            decoration: BoxDecoration(
              shape: BoxShape.circle, color: _strokeWidth == w ? _accent : _card,
            ),
            child: Center(child: Container(width: w, height: w, decoration: const BoxDecoration(shape: BoxShape.circle, color: Colors.white))),
          ),
        )),
      ]),
      const SizedBox(height: 8),
      _bigButton('지우기', () => setState(() => _points.clear()), icon: Icons.delete_outline, color: _card),
    ]);
  }
}
class _DrawPoint {
  final Offset? position;
  final Color color;
  final double strokeWidth;
  final bool isSeparator;
  _DrawPoint(this.position, this.color, this.strokeWidth) : isSeparator = false;
  _DrawPoint.separator() : position = null, color = Colors.black, strokeWidth = 0, isSeparator = true;
}
class _DrawPainter extends CustomPainter {
  final List<_DrawPoint> points;
  _DrawPainter(this.points);
  @override
  void paint(Canvas canvas, Size size) {
    for (int i = 1; i < points.length; i++) {
      if (points[i].isSeparator || points[i - 1].isSeparator) continue;
      final p1 = points[i - 1];
      final p2 = points[i];
      if (p1.position != null && p2.position != null) {
        canvas.drawLine(p1.position!, p2.position!,
          Paint()..color = p2.color..strokeWidth = p2.strokeWidth..strokeCap = StrokeCap.round);
      }
    }
  }
  @override bool shouldRepaint(covariant _DrawPainter old) => true;
}

// ═══════════════════════════════════════════════════════════
//  J10: 기울기 미로 탈출 (maze)
// ═══════════════════════════════════════════════════════════
class MazeWidget extends StatefulWidget {
  const MazeWidget({super.key});
  @override State<MazeWidget> createState() => _MazeWidgetState();
}
class _MazeWidgetState extends State<MazeWidget> {
  double _bx = 25, _by = 25;
  bool _cleared = false;
  StreamSubscription? _sub;

  // 간단한 미로 벽 (x1, y1, x2, y2)
  static const _walls = <List<double>>[
    [60, 0, 60, 180],
    [120, 120, 120, 300],
    [180, 0, 180, 180],
    [240, 120, 240, 300],
    [0, 150, 60, 150],
    [120, 60, 180, 60],
    [180, 210, 240, 210],
  ];
  static const _goalX = 275.0, _goalY = 275.0;

  @override
  void initState() {
    super.initState();
    _sub = accelerometerEventStream(samplingPeriod: const Duration(milliseconds: 30)).listen((e) {
      if (_cleared) return;
      final nx = (_bx + -e.x * 1.0).clamp(8.0, 292.0);
      final ny = (_by + e.y * 1.0).clamp(8.0, 292.0);
      if (!_hitsWall(nx, ny)) {
        setState(() { _bx = nx; _by = ny; });
      } else {
        HapticFeedback.heavyImpact();
      }
      if ((_bx - _goalX).abs() < 15 && (_by - _goalY).abs() < 15) {
        setState(() => _cleared = true);
        Vibration.vibrate(duration: 500);
      }
    });
  }

  bool _hitsWall(double x, double y) {
    const r = 8.0;
    for (final w in _walls) {
      final x1 = w[0], y1 = w[1], x2 = w[2], y2 = w[3];
      // 선분과 원의 거리 계산 (간소화)
      if (x1 == x2) {
        // 수직 벽
        if ((x - x1).abs() < r + 3 && y >= min(y1, y2) - r && y <= max(y1, y2) + r) return true;
      } else {
        // 수평 벽
        if ((y - y1).abs() < r + 3 && x >= min(x1, x2) - r && x <= max(x1, x2) + r) return true;
      }
    }
    return false;
  }

  void _reset() => setState(() { _bx = 25; _by = 25; _cleared = false; });

  @override void dispose() { _sub?.cancel(); super.dispose(); }

  @override
  Widget build(BuildContext context) {
    return Column(children: [
      if (_cleared)
        const Text('미로 탈출 성공!', style: TextStyle(color: _green, fontSize: 20, fontWeight: FontWeight.bold)),
      const SizedBox(height: 8),
      Center(child: Container(
        width: 300, height: 300,
        decoration: BoxDecoration(color: _bg, borderRadius: BorderRadius.circular(12), border: Border.all(color: _border, width: 2)),
        child: CustomPaint(painter: _MazePainter(_bx, _by, _walls, _cleared)),
      )),
      const SizedBox(height: 8),
      _bigButton('다시 시작', _reset, icon: Icons.refresh, color: _card),
      _statusText('기울여서 빨간 공을 초록 출구로 보내세요!'),
    ]);
  }
}
class _MazePainter extends CustomPainter {
  final double bx, by;
  final List<List<double>> walls;
  final bool cleared;
  _MazePainter(this.bx, this.by, this.walls, this.cleared);
  @override
  void paint(Canvas canvas, Size size) {
    // 출구
    canvas.drawCircle(const Offset(275, 275), 12, Paint()..color = _green);
    // 벽
    final wallPaint = Paint()..color = const Color(0xFF64748B)..strokeWidth = 4..strokeCap = StrokeCap.round;
    for (final w in walls) {
      canvas.drawLine(Offset(w[0], w[1]), Offset(w[2], w[3]), wallPaint);
    }
    // 공
    canvas.drawCircle(Offset(bx, by), 8, Paint()..color = cleared ? _green : _red);
    // 시작점 표시
    canvas.drawCircle(const Offset(25, 25), 5, Paint()..color = Colors.white24..style = PaintingStyle.stroke..strokeWidth = 2);
  }
  @override bool shouldRepaint(covariant _MazePainter old) => true;
}
