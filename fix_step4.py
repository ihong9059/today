import re

# 파일 읽기
with open('C:/todo/today/aws/c-esp32-level-page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Step 4 섹션 교체
old_step4 = '''            {/* Step 4: ESP32 보드 설정 (준비 중) */}
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

new_step4 = '''            {/* Step 4: ESP32 보드 설정 */}
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
                  <div className="aspect-video bg-black rounded-lg overflow-hidden mb-3">
                    <iframe
                      width="100%"
                      height="100%"
                      src="https://www.youtube.com/embed/EYpHurYyvWM"
                      title="ESP32 보드 설정 및 시리얼 테스트"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                  <a
                    href="https://youtu.be/EYpHurYyvWM"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 text-sm font-medium"
                  >
                    <ExternalLink className="w-4 h-4" />
                    유튜브에서 보기
                  </a>
                </div>
              </div>
            </div>'''

if old_step4 in content:
    content = content.replace(old_step4, new_step4)
    with open('C:/todo/today/aws/c-esp32-level-page.tsx', 'w', encoding='utf-8') as f:
        f.write(content)
    print("Step 4 유튜브 링크 추가 완료!")
else:
    print("Step 4 섹션을 찾을 수 없습니다.")
