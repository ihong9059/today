import re

# Read the original file
with open('c-esp32-level-page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Define the old Step 3 (ESP32 보드 설정)
old_step3 = '''            {/* Step 3: ESP32 보드 설정 (준비 중) */}
            <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 rounded-xl p-5 mb-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold">
                  3
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 mb-1">ESP32 보드 설정 및 테스트</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Arduino IDE의 Board Manager에서 ESP32 보드를 설치하고, 시리얼 통신으로 연결을 확인합니다.
                  </p>
                  <div className="bg-purple-100 rounded-lg p-3">
                    <p className="text-sm text-purple-700 font-medium">
                      🎬 동영상 준비 중입니다. 곧 업로드됩니다!
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 4: Serial 테스트 코드 */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold">
                  4
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 mb-1">Serial 통신 테스트 코드</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    ESP32 개발환경이 제대로 설정되었는지 확인하는 테스트 코드입니다.
                    다운로드 후 Arduino IDE에서 열어 업로드하세요.
                  </p>
                  <div className="flex flex-wrap gap-3 mb-3">
                    <a
                      href="/downloads/ESP32_Serial_Test.zip"
                      download
                      className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition"
                    >
                      <Download className="w-4 h-4" />
                      테스트 코드 다운로드
                    </a>
                  </div>
                  <div className="bg-blue-100 rounded-lg p-3">
                    <p className="text-xs text-blue-700 font-medium mb-2">사용 방법:</p>
                    <ol className="text-xs text-blue-700 list-decimal list-inside space-y-1">
                      <li>압축을 풀고 ESP32_Serial_Test.ino 파일을 Arduino IDE로 엽니다</li>
                      <li>도구 → 보드 → ESP32 Dev Module 선택</li>
                      <li>도구 → 포트 → 해당 COM 포트 선택</li>
                      <li>업로드 버튼 클릭</li>
                      <li>도구 → 시리얼 모니터 (115200 baud)에서 메시지 확인</li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>'''

# New order: Step 3 is Serial Test Code, Step 4 is ESP32 Board Setup
new_swapped = '''            {/* Step 3: Serial 테스트 코드 */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-5 mb-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold">
                  3
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 mb-1">Serial 통신 테스트 코드</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    ESP32 개발환경이 제대로 설정되었는지 확인하는 테스트 코드입니다.
                    아래 동영상을 보면서 보드 설정 후 테스트하세요.
                  </p>
                  <div className="flex flex-wrap gap-3 mb-3">
                    <a
                      href="/downloads/ESP32_Serial_Test.zip"
                      download
                      className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition"
                    >
                      <Download className="w-4 h-4" />
                      테스트 코드 다운로드
                    </a>
                  </div>
                  <div className="bg-blue-100 rounded-lg p-3">
                    <p className="text-xs text-blue-700 font-medium mb-2">사용 방법:</p>
                    <ol className="text-xs text-blue-700 list-decimal list-inside space-y-1">
                      <li>압축을 풀고 ESP32_Serial_Test.ino 파일을 Arduino IDE로 엽니다</li>
                      <li>도구 → 보드 → ESP32 Dev Module 선택</li>
                      <li>도구 → 포트 → 해당 COM 포트 선택</li>
                      <li>업로드 버튼 클릭</li>
                      <li>도구 → 시리얼 모니터 (115200 baud)에서 메시지 확인</li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 4: ESP32 보드 설정 (준비 중) */}
            <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 rounded-xl p-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold">
                  4
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 mb-1">ESP32 보드 설정 및 테스트</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Arduino IDE의 Board Manager에서 ESP32 보드를 설치하고, 위의 테스트 코드로 시리얼 통신을 확인합니다.
                  </p>
                  <div className="bg-purple-100 rounded-lg p-3">
                    <p className="text-sm text-purple-700 font-medium">
                      🎬 동영상 준비 중입니다. 곧 업로드됩니다!
                    </p>
                  </div>
                </div>
              </div>
            </div>'''

# Replace
new_content = content.replace(old_step3, new_swapped)

# Write the modified file
with open('c-esp32-level-page.tsx', 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Step 3과 Step 4 순서가 바뀌었습니다!")
