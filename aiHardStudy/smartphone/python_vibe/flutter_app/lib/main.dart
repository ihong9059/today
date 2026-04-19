import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:vibration/vibration.dart';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';
import 'interactive_widgets.dart' as iw;
import 'catalog_data.dart';

void main() => runApp(const PythonVibeApp());

// ═══════════════════════════════════════════════════════════
//  앱 루트
// ═══════════════════════════════════════════════════════════
class PythonVibeApp extends StatelessWidget {
  const PythonVibeApp({super.key});
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'UTTEC Python',
      debugShowCheckedModeBanner: false,
      theme: ThemeData.dark().copyWith(
        scaffoldBackgroundColor: const Color(0xFF0F172A),
        appBarTheme: const AppBarTheme(backgroundColor: Color(0xFF1E293B)),
      ),
      home: const MainShell(),
    );
  }
}

// 카탈로그 데이터는 catalog_data.dart에서 import

// catalog_data.dart에서 catalog, categories import 됨
final _catalog = catalog;
final _categories = categories;

// ═══════════════════════════════════════════════════════════
//  메인 셸 (4탭 네비게이션)
// ═══════════════════════════════════════════════════════════
class MainShell extends StatefulWidget {
  const MainShell({super.key});
  @override State<MainShell> createState() => _MainShellState();
}

class _MainShellState extends State<MainShell> {
  int _tabIdx = 0;
  String _serverUrl = 'http://192.168.0.20:8094';

  @override
  void initState() {
    super.initState();
    _loadServerUrl();
  }

  Future<void> _loadServerUrl() async {
    final prefs = await SharedPreferences.getInstance();
    setState(() { _serverUrl = prefs.getString('serverUrl') ?? _serverUrl; });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: IndexedStack(index: _tabIdx, children: [
        HomeTab(serverUrl: _serverUrl),
        const LearnTab(),
        PlayTab(serverUrl: _serverUrl),
        SettingsTab(serverUrl: _serverUrl, onChanged: (url) {
          setState(() { _serverUrl = url; });
        }),
      ]),
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: _tabIdx,
        onTap: (i) => setState(() => _tabIdx = i),
        type: BottomNavigationBarType.fixed,
        backgroundColor: const Color(0xFF1E293B),
        selectedItemColor: const Color(0xFF6366F1),
        unselectedItemColor: const Color(0xFF64748B),
        items: const [
          BottomNavigationBarItem(icon: Icon(Icons.home), label: '홈'),
          BottomNavigationBarItem(icon: Icon(Icons.menu_book), label: '학습'),
          BottomNavigationBarItem(icon: Icon(Icons.play_circle_fill), label: '실행'),
          BottomNavigationBarItem(icon: Icon(Icons.settings), label: '설정'),
        ],
      ),
    );
  }
}

// ═══════════════════════════════════════════════════════════
//  Tab 1: 홈 (검색 + AI생성 + Q&A)
// ═══════════════════════════════════════════════════════════
class HomeTab extends StatefulWidget {
  final String serverUrl;
  const HomeTab({super.key, required this.serverUrl});
  @override State<HomeTab> createState() => _HomeTabState();
}

class _HomeTabState extends State<HomeTab> {
  final _promptCtrl = TextEditingController();
  final _questionCtrl = TextEditingController();

  // AI 코드 생성
  String _buildStatus = 'idle'; // idle / generating / success / failed
  String _generatedCode = '';
  String _explanation = '';
  List<Map<String, String>> _keyConcepts = [];
  String _runOutput = '';
  String _runError = '';
  bool _running = false;

  // Q&A
  String _qaStatus = 'idle';
  String _qaAnswer = '';

  // 대표 예시 7개
  List<ExItem> _getShowcaseExamples() {
    const picks = ['A01', 'B05', 'C08', 'D10', 'E05', 'H01', 'J01'];
    return picks.map((no) => _catalog.firstWhere((e) => e.no == no)).toList();
  }

  Future<void> _onSubmit() async {
    final input = _promptCtrl.text.trim();
    if (input.isEmpty) return;
    await _generateCode(input);
  }

  Future<void> _generateCode(String prompt) async {
    setState(() { _buildStatus = 'generating'; _generatedCode = ''; _explanation = ''; _keyConcepts = []; _runOutput = ''; _runError = ''; });
    try {
      final res = await http.post(
        Uri.parse('${widget.serverUrl}/api/v1/generate'),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({'prompt': prompt}),
      ).timeout(const Duration(seconds: 60));
      if (res.statusCode == 200) {
        final data = jsonDecode(res.body);
        final concepts = (data['key_concepts'] as List<dynamic>?)?.map((c) =>
          {'term': (c['term'] ?? '') as String, 'desc': (c['desc'] ?? '') as String}).toList() ?? [];
        setState(() {
          _generatedCode = data['python_code'] ?? '# 코드 생성 완료';
          _explanation = data['explanation'] ?? '';
          _keyConcepts = concepts;
          _buildStatus = 'success';
        });
      } else {
        setState(() { _buildStatus = 'failed'; });
      }
    } catch (e) {
      setState(() { _buildStatus = 'failed'; });
    }
  }

  Future<void> _runGeneratedCode() async {
    if (_generatedCode.isEmpty) return;
    setState(() { _running = true; _runOutput = ''; _runError = ''; });
    try {
      final res = await http.post(
        Uri.parse('${widget.serverUrl}/api/v1/run'),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({'code': _generatedCode, 'timeout': 5}),
      ).timeout(const Duration(seconds: 10));
      if (res.statusCode == 200) {
        final data = jsonDecode(res.body);
        setState(() { _runOutput = data['output'] ?? ''; _runError = data['error'] ?? ''; });
      }
    } catch (e) {
      setState(() { _runError = '서버에 연결할 수 없습니다.'; });
    }
    setState(() { _running = false; });
  }

  Future<void> _askQuestion(String q) async {
    setState(() { _qaStatus = 'asking'; _qaAnswer = ''; });
    try {
      final res = await http.post(
        Uri.parse('${widget.serverUrl}/api/v1/chat'),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({'question': q}),
      ).timeout(const Duration(seconds: 60));
      if (res.statusCode == 200) {
        final data = jsonDecode(res.body);
        setState(() { _qaAnswer = data['answer'] ?? '응답 없음'; _qaStatus = 'done'; });
      } else {
        setState(() { _qaAnswer = '서버 응답 오류 (${res.statusCode})'; _qaStatus = 'failed'; });
      }
    } catch (e) {
      setState(() { _qaAnswer = '서버에 연결할 수 없습니다.'; _qaStatus = 'failed'; });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('UTTEC Python', style: TextStyle(color: Color(0xFFA5B4FC), fontWeight: FontWeight.bold)),
        actions: [
          Padding(padding: const EdgeInsets.only(right: 16),
            child: Center(child: Text('${_catalog.length}개', style: const TextStyle(color: Color(0xFF94A3B8), fontSize: 13)))),
        ],
      ),
      body: SingleChildScrollView(padding: const EdgeInsets.all(16), child: Column(
        crossAxisAlignment: CrossAxisAlignment.start, children: [

        // ── Python 프롬프트 ──
        _sectionHeader('Python 만들기', Icons.auto_awesome, const Color(0xFF8B5CF6)),
        const SizedBox(height: 8),
        Row(children: [
          Expanded(child: TextField(
            controller: _promptCtrl,
            decoration: InputDecoration(
              hintText: '예: 1부터 10까지 합하기',
              hintStyle: const TextStyle(color: Color(0xFF64748B)),
              filled: true, fillColor: const Color(0xFF1E293B),
              border: OutlineInputBorder(borderRadius: BorderRadius.circular(12), borderSide: BorderSide.none),
              contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
              prefixIcon: const Icon(Icons.edit, color: Color(0xFF8B5CF6)),
            ),
            style: const TextStyle(color: Colors.white),
            onSubmitted: (_) => _onSubmit(),
          )),
          const SizedBox(width: 8),
          ElevatedButton(
            onPressed: _buildStatus == 'generating' ? null : _onSubmit,
            style: ElevatedButton.styleFrom(
              backgroundColor: const Color(0xFF8B5CF6), padding: const EdgeInsets.all(14),
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
            ),
            child: _buildStatus == 'generating'
              ? const SizedBox(width: 22, height: 22, child: CircularProgressIndicator(strokeWidth: 2, color: Colors.white))
              : const Icon(Icons.send, size: 22),
          ),
        ]),

        // ── AI 생성 결과 ──
        if (_buildStatus == 'generating')
          const Padding(padding: EdgeInsets.all(20), child: Center(child: Column(children: [
            CircularProgressIndicator(color: Color(0xFF8B5CF6)),
            SizedBox(height: 8),
            Text('AI가 Python 코드를 만들고 있어요...', style: TextStyle(color: Color(0xFF94A3B8), fontSize: 13)),
          ]))),
        if (_buildStatus == 'success') ...[
          const SizedBox(height: 12),
          // 설명
          if (_explanation.isNotEmpty)
            Container(
              width: double.infinity, padding: const EdgeInsets.all(12), margin: const EdgeInsets.only(bottom: 8),
              decoration: BoxDecoration(color: const Color(0xFF1E293B), borderRadius: BorderRadius.circular(10),
                border: Border.all(color: const Color(0xFF334155))),
              child: Text(_explanation, style: const TextStyle(color: Color(0xFFCBD5E1), fontSize: 13, height: 1.5)),
            ),
          // 코드
          CodeCard(pythonCode: _generatedCode),
          // 실행 버튼
          ElevatedButton.icon(
            onPressed: _running ? null : _runGeneratedCode,
            icon: Icon(_running ? Icons.hourglass_top : Icons.play_arrow),
            label: Text(_running ? '실행 중...' : '실행', style: const TextStyle(fontWeight: FontWeight.bold)),
            style: ElevatedButton.styleFrom(
              backgroundColor: const Color(0xFF10B981), minimumSize: const Size(double.infinity, 44),
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
            ),
          ),
          // 실행 결과
          if (_runOutput.isNotEmpty) ...[
            const SizedBox(height: 8),
            OutputArea(text: _runOutput),
          ],
          if (_runError.isNotEmpty)
            Padding(padding: const EdgeInsets.only(top: 4),
              child: Text(_runError, style: const TextStyle(color: Color(0xFFEF4444), fontSize: 12))),
          // 핵심 개념
          if (_keyConcepts.isNotEmpty)
            ConceptCard(concepts: _keyConcepts),
        ],
        if (_buildStatus == 'failed')
          _infoCard('코드 생성 실패. 서버 연결을 확인해주세요.'),

        // ── 대표 예시 (학습탭 샘플) ──
        const SizedBox(height: 20),
        _sectionHeader('대표 예시', Icons.star, const Color(0xFFF59E0B)),
        const SizedBox(height: 4),
        const Text('학습 탭에서 100개 예시를 모두 확인할 수 있습니다', style: TextStyle(color: Color(0xFF64748B), fontSize: 11)),
        const SizedBox(height: 8),
        ..._getShowcaseExamples().map((e) => _exampleTile(e)),

        // ── 코딩 질문 ──
        const SizedBox(height: 20),
        _sectionHeader('코딩 질문', Icons.chat_bubble, const Color(0xFF10B981)),
        const SizedBox(height: 8),
        Row(children: [
          Expanded(child: TextField(
            controller: _questionCtrl,
            decoration: InputDecoration(
              hintText: 'Python 궁금한 거 물어보세요!',
              hintStyle: const TextStyle(color: Color(0xFF64748B), fontSize: 13),
              filled: true, fillColor: const Color(0xFF1E293B),
              border: OutlineInputBorder(borderRadius: BorderRadius.circular(12), borderSide: BorderSide.none),
              contentPadding: const EdgeInsets.symmetric(horizontal: 14, vertical: 12),
            ),
            style: const TextStyle(color: Colors.white, fontSize: 14),
            onSubmitted: (q) { if (q.isNotEmpty) _askQuestion(q); },
          )),
          const SizedBox(width: 8),
          ElevatedButton(
            onPressed: () { if (_questionCtrl.text.isNotEmpty) _askQuestion(_questionCtrl.text); },
            style: ElevatedButton.styleFrom(
              backgroundColor: const Color(0xFF10B981), padding: const EdgeInsets.all(12),
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
            ),
            child: const Text('질문', style: TextStyle(fontWeight: FontWeight.bold)),
          ),
        ]),
        if (_qaStatus == 'asking')
          const Padding(padding: EdgeInsets.all(16), child: Center(child: CircularProgressIndicator(color: Color(0xFF10B981)))),
        if (_qaStatus == 'done' || _qaStatus == 'failed')
          Container(
            width: double.infinity, margin: const EdgeInsets.only(top: 8),
            padding: const EdgeInsets.all(14),
            decoration: BoxDecoration(
              color: const Color(0xFF1E293B), borderRadius: BorderRadius.circular(12),
              border: Border.all(color: const Color(0xFF334155)),
            ),
            child: Text(_qaAnswer, style: const TextStyle(color: Color(0xFFCBD5E1), fontSize: 13, height: 1.6)),
          ),

        const SizedBox(height: 80),
      ])),
    );
  }

  Widget _exampleTile(ExItem e) {
    return Card(
      color: const Color(0xFF1E293B), margin: const EdgeInsets.only(bottom: 6),
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
      child: ListTile(
        dense: true,
        title: Text(e.title, style: const TextStyle(fontWeight: FontWeight.w600, fontSize: 14)),
        subtitle: Row(children: [
          _chip(e.difficulty, const Color(0xFF10B981)),
          const SizedBox(width: 4),
          _chip(e.hardware, const Color(0xFF6366F1)),
        ]),
        trailing: const Icon(Icons.arrow_forward_ios, size: 14, color: Color(0xFF64748B)),
        onTap: () => Navigator.push(context, MaterialPageRoute(builder: (_) => ExampleDetailPage(item: e))),
      ),
    );
  }

  Widget _sectionHeader(String title, IconData icon, Color color, {Widget? trailing}) {
    return Row(children: [
      Icon(icon, size: 18, color: color), const SizedBox(width: 6),
      Text(title, style: TextStyle(color: color, fontWeight: FontWeight.w700, fontSize: 15)),
      const Spacer(),
      if (trailing != null) trailing,
    ]);
  }

  Widget _infoCard(String text) => Container(
    width: double.infinity, padding: const EdgeInsets.all(14), margin: const EdgeInsets.symmetric(vertical: 6),
    decoration: BoxDecoration(color: const Color(0xFF1E293B), borderRadius: BorderRadius.circular(10)),
    child: Text(text, style: const TextStyle(color: Color(0xFF94A3B8), fontSize: 13)),
  );
}

// ═══════════════════════════════════════════════════════════
//  Tab 2: 학습 (카테고리별 예시 탐색)
// ═══════════════════════════════════════════════════════════
class LearnTab extends StatefulWidget {
  const LearnTab({super.key});
  @override State<LearnTab> createState() => _LearnTabState();
}

class _LearnTabState extends State<LearnTab> {
  String _selectedCat = '';  // '' = 전체
  String _selectedDiff = ''; // '' = 전체

  List<ExItem> get _filtered {
    return _catalog.where((e) {
      if (_selectedCat.isNotEmpty && e.category != _selectedCat) return false;
      if (_selectedDiff.isNotEmpty && e.difficulty != _selectedDiff) return false;
      return true;
    }).toList();
  }

  @override
  Widget build(BuildContext context) {
    final items = _filtered;
    return Scaffold(
      appBar: AppBar(
        title: const Text('Python 학습', style: TextStyle(color: Color(0xFFA5B4FC), fontWeight: FontWeight.bold)),
        actions: [
          Padding(padding: const EdgeInsets.only(right: 16),
            child: Center(child: Text('${items.length}개', style: const TextStyle(color: Color(0xFF94A3B8), fontSize: 13)))),
        ],
      ),
      body: Column(children: [
        // 카테고리 탭
        SizedBox(height: 44, child: ListView(
          scrollDirection: Axis.horizontal,
          padding: const EdgeInsets.symmetric(horizontal: 12),
          children: [
            _catChip('', '전체', Icons.grid_view),
            ..._categories.map((c) => _catChip(c.code, c.name, IconData(c.iconCode, fontFamily: 'MaterialIcons'))),
          ],
        )),
        // 난이도 필터
        Padding(padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 6),
          child: Row(children: [
            _diffChip('', '전체'),
            _diffChip('기초', '기초'),
            _diffChip('중급', '중급'),
            _diffChip('고급', '고급'),
          ]),
        ),
        const Divider(color: Color(0xFF334155), height: 1),
        // 예시 목록
        Expanded(child: items.isEmpty
          ? const Center(child: Text('해당하는 예시가 없습니다', style: TextStyle(color: Color(0xFF64748B))))
          : ListView.builder(
            padding: const EdgeInsets.all(12),
            itemCount: items.length,
            itemBuilder: (ctx, i) {
              final e = items[i];
              return Card(
                color: const Color(0xFF1E293B), margin: const EdgeInsets.only(bottom: 6),
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                child: ListTile(
                  leading: CircleAvatar(
                    backgroundColor: const Color(0xFF6366F1).withOpacity(0.2),
                    child: Text(e.no, style: const TextStyle(color: Color(0xFF6366F1), fontSize: 11, fontWeight: FontWeight.bold)),
                  ),
                  title: Text(e.title, style: const TextStyle(fontWeight: FontWeight.w600, fontSize: 14)),
                  subtitle: Row(children: [
                    _chip(e.difficulty, _diffColor(e.difficulty)),
                    const SizedBox(width: 4),
                    _chip(e.hardware, const Color(0xFF6366F1)),
                    const SizedBox(width: 4),
                    _chip(e.categoryName, const Color(0xFF94A3B8)),
                  ]),
                  trailing: const Icon(Icons.arrow_forward_ios, size: 14, color: Color(0xFF64748B)),
                  onTap: () => Navigator.push(ctx, MaterialPageRoute(builder: (_) => ExampleDetailPage(item: e))),
                ),
              );
            },
          ),
        ),
      ]),
    );
  }

  Widget _catChip(String code, String label, IconData icon) {
    final sel = _selectedCat == code;
    return Padding(padding: const EdgeInsets.only(right: 6),
      child: FilterChip(
        avatar: Icon(icon, size: 16, color: sel ? Colors.white : const Color(0xFF94A3B8)),
        label: Text(label, style: TextStyle(fontSize: 12, color: sel ? Colors.white : const Color(0xFF94A3B8))),
        selected: sel,
        selectedColor: const Color(0xFF6366F1),
        backgroundColor: const Color(0xFF1E293B),
        onSelected: (_) => setState(() => _selectedCat = code),
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
        side: BorderSide(color: sel ? const Color(0xFF6366F1) : const Color(0xFF334155)),
      ),
    );
  }

  Widget _diffChip(String val, String label) {
    final sel = _selectedDiff == val;
    return Padding(padding: const EdgeInsets.only(right: 6),
      child: ChoiceChip(
        label: Text(label, style: TextStyle(fontSize: 11, color: sel ? Colors.white : const Color(0xFF94A3B8))),
        selected: sel,
        selectedColor: _diffColor(val.isEmpty ? '기초' : val),
        backgroundColor: const Color(0xFF1E293B),
        onSelected: (_) => setState(() => _selectedDiff = val),
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
        side: BorderSide(color: sel ? Colors.transparent : const Color(0xFF334155)),
      ),
    );
  }
}

Color _diffColor(String d) {
  switch (d) {
    case '기초': return const Color(0xFF10B981);
    case '중급': return const Color(0xFFF59E0B);
    case '고급': return const Color(0xFFEF4444);
    default: return const Color(0xFF94A3B8);
  }
}

// ═══════════════════════════════════════════════════════════
//  Tab 3: 실행 (코드 에디터)
// ═══════════════════════════════════════════════════════════
class PlayTab extends StatefulWidget {
  final String serverUrl;
  const PlayTab({super.key, required this.serverUrl});
  @override State<PlayTab> createState() => _PlayTabState();
}

class _PlayTabState extends State<PlayTab> {
  final _codeCtrl = TextEditingController(text: "# Python 코드를 입력하세요\nprint('Hello Python!')\n\nfor i in range(5):\n    print(f'{i+1}번째 줄')");
  String _output = '';
  String _error = '';
  String _elapsed = '';
  bool _running = false;

  Future<void> _runCode() async {
    final code = _codeCtrl.text.trim();
    if (code.isEmpty) return;

    setState(() { _running = true; _output = ''; _error = ''; _elapsed = ''; });

    try {
      // 서버에서 실제 Python 실행
      final res = await http.post(
        Uri.parse('${widget.serverUrl}/api/v1/run'),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({'code': code, 'timeout': 5}),
      ).timeout(const Duration(seconds: 10));

      if (res.statusCode == 200) {
        final data = jsonDecode(res.body);
        setState(() {
          _output = data['output'] ?? '';
          _error = data['error'] ?? '';
          _elapsed = '${data['elapsed']}초';
        });
      } else {
        setState(() { _error = '서버 오류 (${res.statusCode})'; });
      }
    } catch (e) {
      // 서버 연결 실패 시 로컬 시뮬레이션
      setState(() {
        _error = '서버 연결 실패 — 로컬 시뮬레이션 모드';
        _output = _simulateLocally(code);
      });
    }

    setState(() { _running = false; });
  }

  String _simulateLocally(String code) {
    final lines = <String>[];
    final printRegex = RegExp(r"print\((.+)\)");
    for (final line in code.split('\n')) {
      final trimmed = line.trim();
      if (trimmed.startsWith('#') || trimmed.isEmpty) continue;
      final match = printRegex.firstMatch(trimmed);
      if (match != null) {
        var arg = match.group(1)!.trim();
        if ((arg.startsWith("'") && arg.endsWith("'")) || (arg.startsWith('"') && arg.endsWith('"'))) {
          lines.add(arg.substring(1, arg.length - 1));
        } else {
          lines.add('>>> $arg');
        }
      }
    }
    return lines.isEmpty ? '(로컬 시뮬레이션: print문만 해석 가능)' : lines.join('\n');
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Python 실행', style: TextStyle(color: Color(0xFFA5B4FC), fontWeight: FontWeight.bold))),
      body: Column(children: [
        // 코드 에디터
        Expanded(flex: 3, child: Container(
          margin: const EdgeInsets.fromLTRB(12, 8, 12, 0),
          decoration: BoxDecoration(
            color: const Color(0xFF0D1117), borderRadius: BorderRadius.circular(12),
            border: Border.all(color: const Color(0xFF334155)),
          ),
          child: TextField(
            controller: _codeCtrl,
            maxLines: null, expands: true,
            style: const TextStyle(fontFamily: 'monospace', fontSize: 13, color: Color(0xFFA5B4FC), height: 1.6),
            decoration: const InputDecoration(
              border: InputBorder.none,
              contentPadding: EdgeInsets.all(14),
            ),
          ),
        )),

        // 버튼 바
        Padding(padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
          child: Row(children: [
            Expanded(child: ElevatedButton.icon(
              onPressed: _running ? null : _runCode,
              icon: const Icon(Icons.play_arrow),
              label: Text(_running ? '실행 중...' : '실행', style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 15)),
              style: ElevatedButton.styleFrom(
                backgroundColor: const Color(0xFF6366F1), padding: const EdgeInsets.all(14),
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
              ),
            )),
            const SizedBox(width: 8),
            IconButton(
              onPressed: () => _codeCtrl.clear(),
              icon: const Icon(Icons.delete_outline, color: Color(0xFF94A3B8)),
              tooltip: '지우기',
            ),
          ]),
        ),

        // 실행 결과
        Expanded(flex: 2, child: Container(
          width: double.infinity,
          margin: const EdgeInsets.fromLTRB(12, 0, 12, 12),
          padding: const EdgeInsets.all(14),
          decoration: BoxDecoration(
            color: const Color(0xFF0D1117), borderRadius: BorderRadius.circular(12),
            border: Border.all(color: const Color(0xFF334155)),
          ),
          child: SingleChildScrollView(child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(children: [
                const Icon(Icons.terminal, size: 14, color: Color(0xFF10B981)),
                const SizedBox(width: 6),
                const Text('실행 결과', style: TextStyle(color: Color(0xFF10B981), fontSize: 12, fontWeight: FontWeight.w600)),
                const Spacer(),
                if (_elapsed.isNotEmpty) Text(_elapsed, style: const TextStyle(color: Color(0xFF64748B), fontSize: 11)),
              ]),
              const SizedBox(height: 8),
              if (_output.isNotEmpty)
                Text(_output, style: const TextStyle(fontFamily: 'monospace', fontSize: 13, color: Color(0xFF10B981), height: 1.5)),
              if (_error.isNotEmpty)
                Padding(padding: const EdgeInsets.only(top: 4),
                  child: Text(_error, style: const TextStyle(fontFamily: 'monospace', fontSize: 12, color: Color(0xFFEF4444), height: 1.5))),
              if (_running)
                const Padding(padding: EdgeInsets.all(20), child: Center(child: CircularProgressIndicator(color: Color(0xFF6366F1)))),
            ],
          )),
        )),
      ]),
    );
  }
}

// ═══════════════════════════════════════════════════════════
//  Tab 4: 설정
// ═══════════════════════════════════════════════════════════
class SettingsTab extends StatefulWidget {
  final String serverUrl;
  final Function(String) onChanged;
  const SettingsTab({super.key, required this.serverUrl, required this.onChanged});
  @override State<SettingsTab> createState() => _SettingsTabState();
}

class _SettingsTabState extends State<SettingsTab> {
  late TextEditingController _urlCtrl;
  String _status = '';

  @override
  void initState() {
    super.initState();
    _urlCtrl = TextEditingController(text: widget.serverUrl);
  }

  Future<void> _testConnection() async {
    setState(() { _status = '연결 중...'; });
    try {
      final res = await http.get(Uri.parse('${_urlCtrl.text}/api/examples'))
        .timeout(const Duration(seconds: 5));
      if (res.statusCode == 200) {
        final data = jsonDecode(res.body);
        setState(() { _status = '연결 성공! (${data['total'] ?? 0}개 예시)'; });
      } else {
        setState(() { _status = '응답 오류 (${res.statusCode})'; });
      }
    } catch (e) {
      setState(() { _status = '연결 실패 — 서버를 확인해주세요'; });
    }
  }

  Future<void> _saveUrl() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString('serverUrl', _urlCtrl.text);
    widget.onChanged(_urlCtrl.text);
    if (mounted) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('서버 URL 저장 완료'), duration: Duration(seconds: 1)));
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('설정', style: TextStyle(color: Color(0xFFA5B4FC), fontWeight: FontWeight.bold))),
      body: Padding(padding: const EdgeInsets.all(16), child: Column(
        crossAxisAlignment: CrossAxisAlignment.start, children: [
        const Text('서버 주소', style: TextStyle(color: Color(0xFFA5B4FC), fontWeight: FontWeight.w600)),
        const SizedBox(height: 8),
        TextField(
          controller: _urlCtrl,
          decoration: InputDecoration(
            filled: true, fillColor: const Color(0xFF1E293B),
            border: OutlineInputBorder(borderRadius: BorderRadius.circular(12), borderSide: BorderSide.none),
            contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
          ),
          style: const TextStyle(color: Colors.white, fontFamily: 'monospace', fontSize: 14),
        ),
        const SizedBox(height: 12),
        Row(children: [
          ElevatedButton.icon(
            onPressed: _testConnection,
            icon: const Icon(Icons.wifi, size: 18),
            label: const Text('연결 테스트'),
            style: ElevatedButton.styleFrom(backgroundColor: const Color(0xFF6366F1)),
          ),
          const SizedBox(width: 8),
          ElevatedButton.icon(
            onPressed: _saveUrl,
            icon: const Icon(Icons.save, size: 18),
            label: const Text('저장'),
            style: ElevatedButton.styleFrom(backgroundColor: const Color(0xFF10B981)),
          ),
        ]),
        if (_status.isNotEmpty)
          Padding(padding: const EdgeInsets.only(top: 12),
            child: Text(_status, style: TextStyle(
              color: _status.contains('성공') ? const Color(0xFF10B981) : const Color(0xFFF59E0B), fontSize: 13))),

        const SizedBox(height: 32),
        const Divider(color: Color(0xFF334155)),
        const SizedBox(height: 16),
        const Text('앱 정보', style: TextStyle(color: Color(0xFFA5B4FC), fontWeight: FontWeight.w600)),
        const SizedBox(height: 8),
        _infoRow('앱 이름', 'UTTEC Python'),
        _infoRow('패키지', 'com.uttec.python_vibe'),
        _infoRow('버전', '2.0.0'),
        _infoRow('카탈로그', '${_catalog.length}개 예시'),
        _infoRow('구조', '4탭 (홈/학습/실행/설정)'),
      ])),
    );
  }

  Widget _infoRow(String label, String value) => Padding(
    padding: const EdgeInsets.only(bottom: 6),
    child: Row(children: [
      SizedBox(width: 80, child: Text(label, style: const TextStyle(color: Color(0xFF94A3B8), fontSize: 13))),
      Text(value, style: const TextStyle(color: Color(0xFFCBD5E1), fontSize: 13)),
    ]),
  );
}

// ═══════════════════════════════════════════════════════════
//  예시 상세 페이지 (범용 — type별 분기)
// ═══════════════════════════════════════════════════════════
class ExampleDetailPage extends StatelessWidget {
  final ExItem item;
  const ExampleDetailPage({super.key, required this.item});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('${item.no}: ${item.title}')),
      body: SingleChildScrollView(padding: const EdgeInsets.all(16), child: Column(
        crossAxisAlignment: CrossAxisAlignment.start, children: [
        DescCard(description: item.description, steps: item.steps),
        const SectionTitle('Python 코드', icon: Icons.code),
        CodeCard(pythonCode: item.pythonCode),
        const SizedBox(height: 8),

        // type별 인터랙티브 영역
        _buildInteractive(context),

        ConceptCard(concepts: item.concepts),
        QuizCard(
          question: item.quizQ, options: item.quizOpts,
          answer: item.quizAns, explanation: item.quizExplain,
        ),
      ])),
    );
  }

  Widget _buildInteractive(BuildContext context) {
    if (item.type == 'text') {
      return _TextRunner(expectedOutput: item.expectedOutput ?? '');
    }
    // 센서/카메라/게임 → interactive_widgets.dart에서 로드
    if (item.flutterWidget != null) {
      return iw.getInteractiveWidget(item.flutterWidget!);
    }
    return _TextRunner(expectedOutput: item.expectedOutput ?? '(인터랙티브 위젯)');
  }
}

// ── 텍스트 실행기 ──
class _TextRunner extends StatefulWidget {
  final String expectedOutput;
  const _TextRunner({required this.expectedOutput});
  @override State<_TextRunner> createState() => _TextRunnerState();
}
class _TextRunnerState extends State<_TextRunner> {
  String _output = '';
  @override
  Widget build(BuildContext context) {
    return Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
      ElevatedButton.icon(
        onPressed: () => setState(() => _output = widget.expectedOutput),
        icon: const Icon(Icons.play_arrow), label: const Text('실행', style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),
        style: ElevatedButton.styleFrom(
          backgroundColor: const Color(0xFF6366F1), minimumSize: const Size(double.infinity, 48),
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10))),
      ),
      const SectionTitle('실행 결과', icon: Icons.check_circle, color: Color(0xFF10B981)),
      OutputArea(text: _output),
    ]);
  }
}

// 인터랙티브 위젯은 interactive_widgets.dart로 이동됨

// ═══════════════════════════════════════════════════════════
//  공통 위젯
// ═══════════════════════════════════════════════════════════
Widget _chip(String text, Color color) => Container(
  padding: const EdgeInsets.symmetric(horizontal: 7, vertical: 2),
  decoration: BoxDecoration(color: color.withOpacity(0.15), borderRadius: BorderRadius.circular(10)),
  child: Text(text, style: TextStyle(fontSize: 10, color: color, fontWeight: FontWeight.w600)),
);

class CodeCard extends StatelessWidget {
  final String pythonCode;
  const CodeCard({super.key, required this.pythonCode});
  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity, margin: const EdgeInsets.symmetric(vertical: 8), padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: const Color(0xFF0D1117), borderRadius: BorderRadius.circular(10),
        border: Border.all(color: const Color(0xFF334155))),
      child: Text(pythonCode, style: const TextStyle(fontFamily: 'monospace', fontSize: 12, color: Color(0xFFA5B4FC), height: 1.5)),
    );
  }
}

class OutputArea extends StatelessWidget {
  final String text;
  const OutputArea({super.key, required this.text});
  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity, margin: const EdgeInsets.symmetric(vertical: 8), padding: const EdgeInsets.all(12),
      constraints: const BoxConstraints(minHeight: 50),
      decoration: BoxDecoration(
        color: const Color(0xFF0D1117), borderRadius: BorderRadius.circular(10),
        border: Border.all(color: const Color(0xFF334155))),
      child: Text(text, style: const TextStyle(fontFamily: 'monospace', fontSize: 13, color: Color(0xFF10B981), height: 1.5)),
    );
  }
}

class DescCard extends StatelessWidget {
  final String description; final List<String> steps;
  const DescCard({super.key, required this.description, required this.steps});
  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity, margin: const EdgeInsets.only(bottom: 12), padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(color: const Color(0xFF1E293B), borderRadius: BorderRadius.circular(12), border: Border.all(color: const Color(0xFF334155))),
      child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
        Text(description, style: const TextStyle(fontSize: 14, color: Color(0xFFCBD5E1), height: 1.6)),
        if (steps.isNotEmpty) ...[
          const SizedBox(height: 10),
          const Text('동작 순서', style: TextStyle(color: Color(0xFF6366F1), fontWeight: FontWeight.w600, fontSize: 13)),
          const SizedBox(height: 6),
          ...steps.asMap().entries.map((e) => Padding(padding: const EdgeInsets.only(bottom: 4),
            child: Row(crossAxisAlignment: CrossAxisAlignment.start, children: [
              Container(width: 20, height: 20, margin: const EdgeInsets.only(right: 8, top: 2),
                decoration: BoxDecoration(color: const Color(0xFF6366F1), borderRadius: BorderRadius.circular(10)),
                child: Center(child: Text('${e.key + 1}', style: const TextStyle(fontSize: 11, fontWeight: FontWeight.bold)))),
              Expanded(child: Text(e.value, style: const TextStyle(fontSize: 13, color: Color(0xFFCBD5E1), height: 1.4))),
            ]))),
        ],
      ]),
    );
  }
}

class ConceptCard extends StatelessWidget {
  final List<Map<String, String>> concepts;
  const ConceptCard({super.key, required this.concepts});
  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity, margin: const EdgeInsets.only(top: 12), padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(color: const Color(0xFF1E293B), borderRadius: BorderRadius.circular(12), border: Border.all(color: const Color(0xFF334155))),
      child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
        const Text('학습 개념', style: TextStyle(color: Color(0xFF6366F1), fontWeight: FontWeight.w600, fontSize: 14)),
        const SizedBox(height: 8),
        ...concepts.map((c) => Container(
          margin: const EdgeInsets.only(bottom: 6), padding: const EdgeInsets.all(10),
          decoration: BoxDecoration(color: const Color(0xFF0F172A), borderRadius: BorderRadius.circular(8),
            border: const Border(left: BorderSide(color: Color(0xFF6366F1), width: 3))),
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

class QuizCard extends StatefulWidget {
  final String question; final List<String> options; final int answer; final String explanation;
  const QuizCard({super.key, required this.question, required this.options, required this.answer, required this.explanation});
  @override State<QuizCard> createState() => _QuizState();
}
class _QuizState extends State<QuizCard> {
  int? selected;
  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity, margin: const EdgeInsets.only(top: 12), padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(color: const Color(0xFF1E293B), borderRadius: BorderRadius.circular(12), border: Border.all(color: const Color(0xFF334155))),
      child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
        const Text('퀴즈', style: TextStyle(color: Color(0xFFF59E0B), fontWeight: FontWeight.w600, fontSize: 14)),
        const SizedBox(height: 8),
        Text(widget.question, style: const TextStyle(fontSize: 14, fontWeight: FontWeight.w600, color: Colors.white)),
        const SizedBox(height: 10),
        ...widget.options.asMap().entries.map((e) {
          Color bg = const Color(0xFF0F172A); Color border = const Color(0xFF334155);
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
              child: Text(e.value, style: TextStyle(fontSize: 13,
                color: selected != null && (e.key == widget.answer || e.key == selected) ? Colors.white : const Color(0xFFCBD5E1))),
            ),
          );
        }),
        if (selected != null)
          Container(margin: const EdgeInsets.only(top: 6), padding: const EdgeInsets.all(10),
            decoration: BoxDecoration(color: const Color(0xFF10B981).withOpacity(0.12), borderRadius: BorderRadius.circular(8)),
            child: Text(widget.explanation, style: const TextStyle(fontSize: 12.5, color: Color(0xFF6EE7B7), height: 1.5))),
      ]),
    );
  }
}

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
