import 'package:flutter_test/flutter_test.dart';
import 'package:ai_python/main.dart';

void main() {
  testWidgets('App launches', (WidgetTester tester) async {
    await tester.pumpWidget(const AiPythonApp());
    expect(find.text('aiPython'), findsOneWidget);
  });
}
