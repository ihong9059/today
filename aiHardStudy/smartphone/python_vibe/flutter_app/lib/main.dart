import 'dart:async';
import 'dart:io';
import 'dart:math';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:sensors_plus/sensors_plus.dart';
import 'package:vibration/vibration.dart';
import 'package:image_picker/image_picker.dart';

void main() => runApp(const PythonVibeApp());

class PythonVibeApp extends StatelessWidget {
  const PythonVibeApp({super.key});
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'UTTEC Python',
      debugShowCheckedModeBanner: false,
      theme: ThemeData.dark().copyWith(scaffoldBackgroundColor: const Color(0xFF0F172A)),
      home: const HomePage(),
    );
  }
}

// ─── 홈: 예시 목록 ───
class HomePage extends StatelessWidget {
  const HomePage({super.key});

  static final examples = [
    {'no': 'A01', 'title': 'Hello Python! 표시하기', 'hw': '화면', 'diff': '기초', 'icon': Icons.terminal},
    {'no': 'A02', 'title': '흔들면 주사위 굴리기', 'hw': '가속도', 'diff': '기초', 'icon': Icons.casino},
    {'no': 'A03', 'title': '진동 모스부호 SOS', 'hw': '진동', 'diff': '기초', 'icon': Icons.vibration},
    {'no': 'A04', 'title': '카메라로 사진 찍기', 'hw': '카메라', 'diff': '중급', 'icon': Icons.camera_alt},
    {'no': 'A05', 'title': '기울기로 공 굴리기', 'hw': '자이로', 'diff': '중급', 'icon': Icons.sports_esports},
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('🐍 UTTEC Python', style: TextStyle(color: Color(0xFFA5B4FC))),
        backgroundColor: const Color(0xFF1E293B),
      ),
      body: ListView.builder(
        padding: const EdgeInsets.all(12),
        itemCount: examples.length,
        itemBuilder: (ctx, i) {
          final ex = examples[i];
          return Card(
            color: const Color(0xFF1E293B),
            margin: const EdgeInsets.only(bottom: 8),
            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
            child: ListTile(
              leading: Icon(ex['icon'] as IconData, color: const Color(0xFF6366F1)),
              title: Text(ex['title'] as String, style: const TextStyle(fontWeight: FontWeight.w600)),
              subtitle: Row(children: [
                _chip(ex['diff'] as String, const Color(0xFF10B981)),
                const SizedBox(width: 6),
                _chip(ex['hw'] as String, const Color(0xFF6366F1)),
              ]),
              trailing: const Icon(Icons.arrow_forward_ios, size: 16, color: Color(0xFF64748B)),
              onTap: () => Navigator.push(ctx, MaterialPageRoute(
                builder: (_) => _getPage(ex['no'] as String),
              )),
            ),
          );
        },
      ),
    );
  }

  Widget _chip(String text, Color color) => Container(
    padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
    decoration: BoxDecoration(color: color.withOpacity(0.2), borderRadius: BorderRadius.circular(10)),
    child: Text(text, style: TextStyle(fontSize: 11, color: color, fontWeight: FontWeight.w600)),
  );

  Widget _getPage(String no) {
    switch (no) {
      case 'A01': return const HelloPage();
      case 'A02': return const DicePage();
      case 'A03': return const SOSPage();
      case 'A04': return const CameraPage();
      case 'A05': return const BallPage();
      default: return const HelloPage();
    }
  }
}

// ─── 공통 위젯 ───
class CodeCard extends StatelessWidget {
  final String pythonCode;
  const CodeCard({super.key, required this.pythonCode});
  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity, margin: const EdgeInsets.symmetric(vertical: 8),
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: const Color(0xFF0D1117), borderRadius: BorderRadius.circular(10),
        border: Border.all(color: const Color(0xFF334155)),
      ),
      child: Text(pythonCode, style: const TextStyle(
        fontFamily: 'monospace', fontSize: 12, color: Color(0xFFA5B4FC), height: 1.5)),
    );
  }
}

class OutputArea extends StatelessWidget {
  final String text;
  const OutputArea({super.key, required this.text});
  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity, margin: const EdgeInsets.symmetric(vertical: 8),
      padding: const EdgeInsets.all(12), constraints: const BoxConstraints(minHeight: 50),
      decoration: BoxDecoration(
        color: const Color(0xFF0D1117), borderRadius: BorderRadius.circular(10),
        border: Border.all(color: const Color(0xFF334155)),
      ),
      child: Text(text, style: const TextStyle(
        fontFamily: 'monospace', fontSize: 13, color: Color(0xFF10B981), height: 1.5)),
    );
  }
}

// ─── 설명 카드 ───
class DescCard extends StatelessWidget {
  final String description;
  final List<String> steps;
  const DescCard({super.key, required this.description, required this.steps});
  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity, margin: const EdgeInsets.only(bottom: 12),
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(
        color: const Color(0xFF1E293B), borderRadius: BorderRadius.circular(12),
        border: Border.all(color: const Color(0xFF334155)),
      ),
      child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
        Text(description, style: const TextStyle(fontSize: 14, color: Color(0xFFCBD5E1), height: 1.6)),
        if (steps.isNotEmpty) ...[
          const SizedBox(height: 10),
          const Text('동작 순서', style: TextStyle(color: Color(0xFF6366F1), fontWeight: FontWeight.w600, fontSize: 13)),
          const SizedBox(height: 6),
          ...steps.asMap().entries.map((e) => Padding(
            padding: const EdgeInsets.only(bottom: 4),
            child: Row(crossAxisAlignment: CrossAxisAlignment.start, children: [
              Container(
                width: 20, height: 20, margin: const EdgeInsets.only(right: 8, top: 2),
                decoration: BoxDecoration(color: const Color(0xFF6366F1), borderRadius: BorderRadius.circular(10)),
                child: Center(child: Text('${e.key + 1}', style: const TextStyle(fontSize: 11, fontWeight: FontWeight.bold))),
              ),
              Expanded(child: Text(e.value, style: const TextStyle(fontSize: 13, color: Color(0xFFCBD5E1), height: 1.4))),
            ]),
          )),
        ],
      ]),
    );
  }
}

// ─── 개념 설명 카드 ───
class ConceptCard extends StatelessWidget {
  final List<Map<String, String>> concepts;
  const ConceptCard({super.key, required this.concepts});
  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity, margin: const EdgeInsets.only(top: 12),
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(
        color: const Color(0xFF1E293B), borderRadius: BorderRadius.circular(12),
        border: Border.all(color: const Color(0xFF334155)),
      ),
      child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
        const Text('학습 개념', style: TextStyle(color: Color(0xFF6366F1), fontWeight: FontWeight.w600, fontSize: 14)),
        const SizedBox(height: 8),
        ...concepts.map((c) => Container(
          margin: const EdgeInsets.only(bottom: 6),
          padding: const EdgeInsets.all(10),
          decoration: BoxDecoration(
            color: const Color(0xFF0F172A), borderRadius: BorderRadius.circular(8),
            border: const Border(left: BorderSide(color: Color(0xFF6366F1), width: 3)),
          ),
          child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
            Text(c['term']!, style: const TextStyle(color: Color(0xFFA5B4FC), fontWeight: FontWeight.w700, fontSize: 13)),
            const SizedBox(height: 4),
            Text(c['desc']!, style: const TextStyle(color: Color(0xFFCBD5E1), fontSize: 12.5, height: 1.5)),
          ]),
        )),
      ]),
    );
  }
}

// ─── 퀴즈 카드 ───
class QuizCard extends StatefulWidget {
  final String question;
  final List<String> options;
  final int answer;
  final String explanation;
  const QuizCard({super.key, required this.question, required this.options, required this.answer, required this.explanation});
  @override State<QuizCard> createState() => _QuizState();
}
class _QuizState extends State<QuizCard> {
  int? selected;
  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity, margin: const EdgeInsets.only(top: 12),
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(
        color: const Color(0xFF1E293B), borderRadius: BorderRadius.circular(12),
        border: Border.all(color: const Color(0xFF334155)),
      ),
      child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
        const Text('퀴즈', style: TextStyle(color: Color(0xFFF59E0B), fontWeight: FontWeight.w600, fontSize: 14)),
        const SizedBox(height: 8),
        Text(widget.question, style: const TextStyle(fontSize: 14, fontWeight: FontWeight.w600, color: Colors.white)),
        const SizedBox(height: 10),
        ...widget.options.asMap().entries.map((e) {
          Color bg = const Color(0xFF0F172A);
          Color border = const Color(0xFF334155);
          if (selected != null) {
            if (e.key == widget.answer) { bg = const Color(0xFF10B981); border = bg; }
            else if (e.key == selected) { bg = const Color(0xFFEF4444); border = bg; }
          }
          return GestureDetector(
            onTap: selected != null ? null : () { setState(() => selected = e.key); Vibration.vibrate(duration: 100); },
            child: Container(
              width: double.infinity, margin: const EdgeInsets.only(bottom: 6),
              padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
              decoration: BoxDecoration(color: bg, borderRadius: BorderRadius.circular(8), border: Border.all(color: border)),
              child: Text(e.value, style: TextStyle(fontSize: 13, color: selected != null && (e.key == widget.answer || e.key == selected) ? Colors.white : const Color(0xFFCBD5E1))),
            ),
          );
        }),
        if (selected != null)
          Container(
            margin: const EdgeInsets.only(top: 6), padding: const EdgeInsets.all(10),
            decoration: BoxDecoration(color: const Color(0xFF10B98120), borderRadius: BorderRadius.circular(8)),
            child: Text(widget.explanation, style: const TextStyle(fontSize: 12.5, color: Color(0xFF6EE7B7), height: 1.5)),
          ),
      ]),
    );
  }
}

// ─── 섹션 제목 ───
class SectionTitle extends StatelessWidget {
  final String title; final IconData icon; final Color color;
  const SectionTitle(this.title, {super.key, this.icon = Icons.code, this.color = const Color(0xFFA5B4FC)});
  @override
  Widget build(BuildContext context) {
    return Padding(padding: const EdgeInsets.only(top: 8, bottom: 4),
      child: Row(children: [
        Icon(icon, size: 16, color: color), const SizedBox(width: 6),
        Text(title, style: TextStyle(color: color, fontWeight: FontWeight.w600, fontSize: 13)),
      ]));
  }
}

// ═══ A01: Hello Python ═══
class HelloPage extends StatefulWidget {
  const HelloPage({super.key});
  @override State<HelloPage> createState() => _HelloState();
}
class _HelloState extends State<HelloPage> {
  String output = '';
  void run() {
    setState(() {
      output = "Hello Python!\n안녕하세요!\nUTTEC 바이브 코딩!\n\n학생님, 환영합니다!\n\n1 + 2 = 3\n10 * 5 = 50";
    });
  }
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('A01: Hello Python'), backgroundColor: const Color(0xFF1E293B)),
      body: SingleChildScrollView(padding: const EdgeInsets.all(16), child: Column(
        crossAxisAlignment: CrossAxisAlignment.start, children: [
          const DescCard(
            description: 'Python에서 가장 먼저 배우는 것은 print() 명령입니다. 화면에 글자를 보여주는 마법의 명령이에요! 변수에 값을 저장하고, 계산 결과도 출력해봅시다.',
            steps: ['print() 명령으로 텍스트를 화면에 출력합니다', 'name 변수에 이름을 저장합니다', 'f-string으로 변수와 계산을 문장 안에 넣습니다'],
          ),
          const SectionTitle('Python 코드', icon: Icons.code),
          const CodeCard(pythonCode: "# 화면에 인사말 표시하기\nprint('Hello Python!')\nprint('안녕하세요!')\nprint('UTTEC 바이브 코딩!')\n\n# 변수에 이름 저장하기\nname = '학생'\nprint(f'{name}님, 환영합니다!')\n\n# 계산하기\nprint(f'1 + 2 = {1 + 2}')\nprint(f'10 * 5 = {10 * 5}')"),
          ElevatedButton.icon(
            onPressed: run, icon: const Icon(Icons.play_arrow),
            label: const Text('실행', style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),
            style: ElevatedButton.styleFrom(
              backgroundColor: const Color(0xFF6366F1), minimumSize: const Size(double.infinity, 48),
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10))),
          ),
          const SectionTitle('실행 결과', icon: Icons.check_circle, color: Color(0xFF10B981)),
          OutputArea(text: output),
          const ConceptCard(concepts: [
            {'term': 'print()', 'desc': '괄호 안의 내용을 화면에 보여주는 명령이에요. 프로그래밍의 가장 기본이 되는 출력 명령입니다.'},
            {'term': '변수 (variable)', 'desc': '데이터를 담는 상자예요. name = "학생"은 name이라는 상자에 "학생"을 넣는 거예요. 나중에 name을 쓰면 "학생"이 나와요.'},
            {'term': 'f-string', 'desc': "f'...'로 쓰면 문자열 안에 {변수}나 {계산식}을 넣을 수 있어요. 매우 편리한 기능이에요!"},
          ]),
          const QuizCard(
            question: "print('Hello')를 실행하면 무엇이 화면에 나타날까요?",
            options: ['Hello', 'print', "print('Hello')", '아무것도 안 나옴'],
            answer: 0,
            explanation: "print()는 괄호 안의 내용을 화면에 보여주는 명령이에요. 따옴표 안의 Hello가 표시됩니다!",
          ),
      ])),
    );
  }
}

// ═══ A02: 주사위 ═══
class DicePage extends StatefulWidget {
  const DicePage({super.key});
  @override State<DicePage> createState() => _DiceState();
}
class _DiceState extends State<DicePage> {
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
    return Scaffold(
      appBar: AppBar(title: const Text('A02: 주사위'), backgroundColor: const Color(0xFF1E293B)),
      body: SingleChildScrollView(padding: const EdgeInsets.all(16), child: Column(
        crossAxisAlignment: CrossAxisAlignment.start, children: [
        const DescCard(
          description: '스마트폰 안에는 움직임을 감지하는 가속도 센서가 있어요. 이 센서를 이용해서 흔들기를 감지하고, 랜덤으로 주사위를 굴려봅시다!',
          steps: ['스마트폰의 가속도 센서가 자동으로 활성화됩니다', '스마트폰을 세게 흔들어보세요', '흔들림이 감지되면 1~6 랜덤 숫자가 나타나고 진동이 울립니다'],
        ),
        const SectionTitle('Python 코드', icon: Icons.code),
        const CodeCard(pythonCode: "import random\n\ndef on_shake():\n    dice = random.randint(1, 6)\n    print(f'주사위: {dice}')\n\n# 가속도 > 20 이면 흔든 것\naccel = get_accelerometer()\nif accel['total'] > 20:\n    on_shake()"),
        Center(child: Text(bigText, style: const TextStyle(fontSize: 100))),
        const SizedBox(height: 8),
        OutputArea(text: output),
        const ConceptCard(concepts: [
          {'term': '가속도 센서', 'desc': '스마트폰이 얼마나 빠르게 움직이는지 측정하는 센서예요. X(좌우), Y(앞뒤), Z(위아래) 3방향을 동시에 측정합니다.'},
          {'term': 'random.randint(1, 6)', 'desc': '1부터 6까지 중 하나를 랜덤으로 골라주는 함수예요. 양쪽 끝 숫자가 모두 포함돼요. 주사위와 똑같죠!'},
          {'term': '이벤트 감지', 'desc': '"흔들기"처럼 뭔가 일어났을 때 코드를 실행하는 방식이에요. 가속도 합이 20 이상이면 "흔들었다"고 판단합니다.'},
        ]),
        const QuizCard(
          question: 'random.randint(1, 6)은 어떤 숫자를 만들 수 있나요?',
          options: ['0부터 6', '1부터 6', '1부터 5', '0부터 5'],
          answer: 1,
          explanation: 'randint(1, 6)은 1, 2, 3, 4, 5, 6 중 하나를 랜덤으로 선택해요. 양쪽 끝 숫자가 모두 포함돼요!',
        ),
      ])),
    );
  }
}

// ═══ A03: SOS 모스부호 ═══
class SOSPage extends StatefulWidget {
  const SOSPage({super.key});
  @override State<SOSPage> createState() => _SOSState();
}
class _SOSState extends State<SOSPage> {
  String output = 'SOS 버튼을 누르세요';
  String morse = '';
  bool running = false;

  Future<void> run() async {
    if (running) return;
    running = true;
    setState(() { output = 'SOS 전송 시작!'; morse = ''; });

    // S: ···
    for (int i = 0; i < 3; i++) {
      Vibration.vibrate(duration: 200);
      setState(() { morse += '·'; });
      await Future.delayed(const Duration(milliseconds: 400));
    }
    await Future.delayed(const Duration(milliseconds: 400));

    // O: ---
    for (int i = 0; i < 3; i++) {
      Vibration.vibrate(duration: 600);
      setState(() { morse += '—'; });
      await Future.delayed(const Duration(milliseconds: 800));
    }
    await Future.delayed(const Duration(milliseconds: 400));

    // S: ···
    for (int i = 0; i < 3; i++) {
      Vibration.vibrate(duration: 200);
      setState(() { morse += '·'; });
      await Future.delayed(const Duration(milliseconds: 400));
    }

    setState(() { output = 'SOS 전송 완료!'; });
    running = false;
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('A03: SOS 모스부호'), backgroundColor: const Color(0xFF1E293B)),
      body: SingleChildScrollView(padding: const EdgeInsets.all(16), child: Column(
        crossAxisAlignment: CrossAxisAlignment.start, children: [
        const DescCard(
          description: '모스부호는 짧은 신호(·)와 긴 신호(—)로 글자를 표현하는 방법이에요. SOS는 전 세계 공통 구조 신호입니다. 스마트폰의 진동 모터를 제어해서 SOS를 보내봅시다!',
          steps: ['SOS 전송 버튼을 누릅니다', 'S(···): 짧은 진동 3번이 울립니다', 'O(———): 긴 진동 3번이 울립니다', 'S(···): 다시 짧은 진동 3번으로 마무리'],
        ),
        const SectionTitle('Python 코드', icon: Icons.code),
        const CodeCard(pythonCode: "def dot():\n    vibrate(200)   # 짧은 진동 0.2초\n    sleep(200)     # 0.2초 대기\n\ndef dash():\n    vibrate(600)   # 긴 진동 0.6초\n    sleep(200)     # 0.2초 대기\n\n# S: ···\ndot(); dot(); dot()\n# O: ---\ndash(); dash(); dash()\n# S: ···\ndot(); dot(); dot()"),
        Center(child: Text(morse.isEmpty ? '· · ·  — — —  · · ·' : morse,
          style: const TextStyle(fontSize: 32, letterSpacing: 4, color: Color(0xFFA5B4FC)))),
        const SizedBox(height: 12),
        ElevatedButton.icon(
          onPressed: run, icon: const Icon(Icons.vibration),
          label: Text(running ? '전송 중...' : 'SOS 전송', style: const TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),
          style: ElevatedButton.styleFrom(
            backgroundColor: const Color(0xFFEF4444), minimumSize: const Size(double.infinity, 48),
            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10))),
        ),
        const SizedBox(height: 8),
        OutputArea(text: output),
        const ConceptCard(concepts: [
          {'term': '모스부호', 'desc': '짧은 신호(·)와 긴 신호(—)의 조합으로 글자를 표현하는 방법이에요. 1837년 새뮤얼 모스가 발명했어요. SOS(···---···)는 국제 구조 신호입니다.'},
          {'term': '함수 (function)', 'desc': 'dot()과 dash()처럼 반복되는 동작에 이름을 붙여놓은 거예요. 한 번 만들면 여러 번 호출할 수 있어서 코드가 짧아져요.'},
          {'term': 'vibrate(ms)', 'desc': '스마트폰의 진동 모터를 작동시키는 명령이에요. 괄호 안의 숫자가 진동 시간(밀리초)이에요. 200ms = 0.2초.'},
        ]),
        const QuizCard(
          question: '모스부호에서 SOS는 어떻게 표현하나요?',
          options: ['--- ··· ---', '··· --- ···', '··· ··· ···', '--- --- ---'],
          answer: 1,
          explanation: 'S는 짧게 3번(···), O는 길게 3번(---), 다시 S는 짧게 3번(···). 합치면 ··· --- ··· 입니다!',
        ),
      ])),
    );
  }
}

// ═══ A04: 카메라 (파일 선택) ═══
class CameraPage extends StatefulWidget {
  const CameraPage({super.key});
  @override State<CameraPage> createState() => _CameraState();
}
class _CameraState extends State<CameraPage> {
  String output = '촬영 버튼을 눌러주세요';
  File? _photo;
  final _picker = ImagePicker();

  Future<void> _takePhoto() async {
    final picked = await _picker.pickImage(source: ImageSource.camera);
    if (picked != null) {
      final file = File(picked.path);
      final size = await file.length();
      setState(() {
        _photo = file;
        output = '촬영 완료! (${(size / 1024).toStringAsFixed(0)} KB)';
      });
      Vibration.vibrate(duration: 100);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('A04: 카메라'), backgroundColor: const Color(0xFF1E293B)),
      body: SingleChildScrollView(padding: const EdgeInsets.all(16), child: Column(
        crossAxisAlignment: CrossAxisAlignment.start, children: [
        const DescCard(
          description: '스마트폰에는 고성능 카메라가 내장되어 있어요. Python 코드로 카메라를 열고, 사진을 찍고, 저장할 수 있습니다. 프로그래밍으로 카메라를 제어해봅시다!',
          steps: ['촬영 버튼을 누르면 카메라가 열립니다', '사진을 찍으면 앱으로 돌아옵니다', '찍은 사진이 화면에 표시되고 파일 크기가 나타납니다'],
        ),
        const SectionTitle('Python 코드', icon: Icons.code),
        const CodeCard(pythonCode: "from camera import Camera\n\n# 카메라 열기\ncam = Camera()\ncam.open()\n\n# 사진 촬영\nphoto = cam.capture()\n\n# 화면에 표시\nshow_image(photo)\nprint(f'사진 크기: {photo.size}KB')\nprint('촬영 완료!')"),
        const SizedBox(height: 8),
        if (_photo != null)
          ClipRRect(
            borderRadius: BorderRadius.circular(12),
            child: Image.file(_photo!, width: 300, fit: BoxFit.cover),
          )
        else
          const Center(child: Icon(Icons.camera_alt, size: 80, color: Color(0xFF6366F1))),
        const SizedBox(height: 12),
        ElevatedButton.icon(
          onPressed: _takePhoto, icon: const Icon(Icons.camera_alt),
          label: const Text('촬영', style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),
          style: ElevatedButton.styleFrom(
            backgroundColor: const Color(0xFF2563EB), minimumSize: const Size(double.infinity, 48),
            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10))),
        ),
        const SizedBox(height: 8),
        OutputArea(text: output),
        const ConceptCard(concepts: [
          {'term': '카메라 API', 'desc': '프로그램으로 카메라를 제어하는 도구예요. 열기(open), 촬영(capture), 닫기(close)를 코드로 할 수 있어요.'},
          {'term': '권한 (Permission)', 'desc': '카메라는 개인정보와 관련되므로 앱이 사용하려면 사용자의 허락이 필요해요. 처음 촬영 시 허용을 눌러야 합니다.'},
          {'term': '이미지 파일', 'desc': '촬영된 사진은 JPEG 파일로 저장돼요. KB는 파일 크기 단위로, 1KB = 1024바이트입니다.'},
        ]),
        const QuizCard(
          question: '카메라를 사용하려면 왜 사용자 허용이 필요할까요?',
          options: ['배터리를 많이 써서', '개인정보 보호를 위해', '인터넷이 필요해서', '화면이 작아서'],
          answer: 1,
          explanation: '카메라는 개인의 모습을 촬영할 수 있으므로, 앱이 몰래 카메라를 켜지 못하도록 반드시 사용자 허용이 필요해요!',
        ),
      ])),
    );
  }
}

// ═══ A05: 기울기 공 ═══
class BallPage extends StatefulWidget {
  const BallPage({super.key});
  @override State<BallPage> createState() => _BallState();
}
class _BallState extends State<BallPage> {
  double bx = 150, by = 150;
  double tx = 0, ty = 0;
  int score = 0;
  StreamSubscription? _sub;

  @override
  void initState() {
    super.initState();
    _newTarget();
    _sub = accelerometerEventStream(samplingPeriod: const Duration(milliseconds: 30)).listen((e) {
      setState(() {
        bx += -e.x * 1.5;
        by += e.y * 1.5;
        bx = bx.clamp(12, 288);
        by = by.clamp(12, 288);

        if ((bx - tx).abs() < 22 && (by - ty).abs() < 22) {
          score++;
          HapticFeedback.mediumImpact();
          _newTarget();
        }
      });
    });
  }

  void _newTarget() {
    tx = Random().nextDouble() * 260 + 20;
    ty = Random().nextDouble() * 260 + 20;
  }

  @override void dispose() { _sub?.cancel(); super.dispose(); }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('A05: 공 굴리기 (Score: $score)'), backgroundColor: const Color(0xFF1E293B)),
      body: SingleChildScrollView(child: Padding(padding: const EdgeInsets.all(16), child: Column(
        crossAxisAlignment: CrossAxisAlignment.start, children: [
        const DescCard(
          description: '스마트폰을 기울이면 내부의 가속도 센서가 방향을 감지해요. 이걸 이용해서 빨간 공을 움직이고, 노란 목표물을 잡는 게임을 만들어봅시다!',
          steps: ['스마트폰을 평평하게 들어주세요', '기울이면 빨간 공이 기울기 방향으로 움직입니다', '노란 목표물에 닿으면 점수가 올라가고 진동이 울립니다'],
        ),
        const SectionTitle('Python 코드', icon: Icons.code),
        const CodeCard(pythonCode: "from sensor import Accelerometer\n\n# 가속도로 공 위치 변경\nball_x += -accel.x * 1.5\nball_y += accel.y * 1.5\n\n# 화면 경계 체크\nball_x = clamp(ball_x, 12, 288)\n\n# 목표물 충돌 감지\nif distance(ball, target) < 22:\n    score += 1\n    vibrate(100)"),
        const SizedBox(height: 8),
        Center(child: Container(
          width: 300, height: 300,
          decoration: BoxDecoration(
            color: const Color(0xFF0F172A), borderRadius: BorderRadius.circular(12),
            border: Border.all(color: const Color(0xFF334155), width: 2),
          ),
          child: CustomPaint(painter: _BallPainter(bx, by, tx, ty, score)),
        )),
        const SizedBox(height: 8),
        const Center(child: Text('스마트폰을 기울여서 빨간 공으로 노란 목표를 잡으세요!',
          style: TextStyle(color: Color(0xFF94A3B8), fontSize: 13), textAlign: TextAlign.center)),
        const ConceptCard(concepts: [
          {'term': '가속도 센서', 'desc': '스마트폰이 기울어진 방향과 세기를 측정해요. X값은 좌우, Y값은 앞뒤 기울기를 나타냅니다.'},
          {'term': 'clamp (범위 제한)', 'desc': '공이 화면 밖으로 나가지 않도록 위치를 최소~최대 범위로 제한하는 기법이에요. max(12, min(288, x))와 같아요.'},
          {'term': '충돌 감지', 'desc': '두 점 사이의 거리를 계산해서 가까우면 "부딪혔다"고 판단해요. 거리 = sqrt((x1-x2)² + (y1-y2)²)'},
        ]),
        const QuizCard(
          question: '공이 화면 밖으로 나가지 않게 하려면 어떻게 하나요?',
          options: ['공을 멈추게 한다', '화면 크기와 비교해서 위치를 제한한다', '센서를 끈다', '화면을 키운다'],
          answer: 1,
          explanation: 'ball_x = clamp(ball_x, 12, 288)처럼 공의 위치를 범위 안으로 제한하면 화면 밖으로 나가지 않아요!',
        ),
      ]))),
    );
  }
}

class _BallPainter extends CustomPainter {
  final double bx, by, tx, ty;
  final int score;
  _BallPainter(this.bx, this.by, this.tx, this.ty, this.score);

  @override
  void paint(Canvas canvas, Size size) {
    // 목표
    canvas.drawCircle(Offset(tx, ty), 10, Paint()..color = const Color(0xFFF59E0B));
    // 공
    canvas.drawCircle(Offset(bx, by), 12, Paint()..color = const Color(0xFFEF4444));
    // 점수
    final tp = TextPainter(text: TextSpan(text: 'Score: $score',
      style: const TextStyle(color: Colors.white, fontSize: 14)), textDirection: TextDirection.ltr);
    tp.layout(); tp.paint(canvas, const Offset(10, 10));
  }

  @override bool shouldRepaint(covariant _BallPainter old) => true;
}
