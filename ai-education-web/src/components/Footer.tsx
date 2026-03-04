export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">AI 첫걸음</h3>
            <p className="text-gray-400 text-sm">
              중학교 수학에서 시작해서 GPT 원리까지,
              <br />
              AI를 시작하는 가장 쉬운 방법
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">학습 경로</h3>
            <ul className="text-gray-400 text-sm space-y-2">
              <li>Level 0-3: AI 기초</li>
              <li>Level 4-5: PyTorch & CNN</li>
              <li>Level 6-7: RNN & Transformer</li>
              <li>Level 8-9: GPU & 프로젝트</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">참고 자료</h3>
            <ul className="text-gray-400 text-sm space-y-2">
              <li>
                <a href="https://pytorch.org" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                  PyTorch 공식 문서
                </a>
              </li>
              <li>
                <a href="https://www.3blue1brown.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                  3Blue1Brown
                </a>
              </li>
              <li>
                <a href="https://course.fast.ai" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                  fast.ai
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; 2026 AI 첫걸음. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
