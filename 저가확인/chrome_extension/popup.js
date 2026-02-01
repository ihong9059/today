const SERVER_URL = 'http://localhost:5000';

// 서버 연결 상태 확인
async function checkServerStatus() {
    const statusEl = document.getElementById('status');

    try {
        const response = await fetch(SERVER_URL, { method: 'HEAD', mode: 'no-cors' });
        statusEl.className = 'status connected';
        statusEl.textContent = '✓ 서버 연결됨 (localhost:5000)';
        return true;
    } catch (error) {
        statusEl.className = 'status disconnected';
        statusEl.textContent = '✗ 서버 연결 안됨 - 서버를 먼저 실행하세요';
        return false;
    }
}

// 자동 분석 상태 로드
function loadAutoStatus() {
    chrome.runtime.sendMessage({ action: 'getStatus' }, (response) => {
        if (response) {
            document.getElementById('autoToggle').checked = response.autoEnabled;

            if (response.lastAnalysis) {
                const time = new Date(response.lastAnalysis.time);
                const timeStr = time.toLocaleString('ko-KR');
                document.getElementById('lastAnalysis').innerHTML =
                    `마지막 분석: ${timeStr}<br>발견: ${response.lastAnalysis.count}개`;
            }
        }
    });
}

// 자동 분석 토글
document.getElementById('autoToggle').addEventListener('change', (e) => {
    chrome.runtime.sendMessage({
        action: 'toggleAuto',
        enabled: e.target.checked
    });
});

// 쿠팡 검색 페이지 열기
document.getElementById('searchBtn').addEventListener('click', () => {
    chrome.tabs.create({
        url: 'https://www.coupang.com/np/search?component=&q=%EC%84%9C%EC%9A%B8%EC%9A%B0%EC%9C%A0'
    });
});

// 현재 페이지 분석
document.getElementById('analyzeBtn').addEventListener('click', async () => {
    const resultsEl = document.getElementById('results');
    const analyzeBtn = document.getElementById('analyzeBtn');

    // 버튼 비활성화 및 로딩 표시
    analyzeBtn.disabled = true;
    analyzeBtn.textContent = '분석 중...';
    resultsEl.innerHTML = `
        <div class="loading">
            <div class="loading-spinner"></div>
            <div>페이지 분석 중...</div>
        </div>
    `;

    try {
        // 현재 탭의 HTML 가져오기
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

        if (!tab.url.includes('coupang.com')) {
            resultsEl.innerHTML = `
                <div class="error">
                    <div style="font-size: 24px; margin-bottom: 10px;">⚠️</div>
                    <div>쿠팡 페이지가 아닙니다.</div>
                    <div style="font-size: 11px; margin-top: 5px; color: #999;">
                        쿠팡 검색 결과 페이지에서 실행하세요.
                    </div>
                </div>
            `;
            analyzeBtn.disabled = false;
            analyzeBtn.textContent = '🔍 현재 페이지 분석';
            return;
        }

        // 콘텐츠 스크립트 실행
        const results = await chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: () => document.documentElement.outerHTML
        });

        const html = results[0].result;

        // 서버로 전송 (수동 분석도 저장)
        const response = await fetch(`${SERVER_URL}/api/parse-text`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ html: html, auto_save: true })
        });

        const data = await response.json();

        if (data.success) {
            if (data.count === 0) {
                resultsEl.innerHTML = `
                    <div class="result-header safe">
                        ✓ 저가 품목 없음
                    </div>
                    <div style="text-align: center; padding: 20px; color: #27ae60;">
                        모든 서울우유 제품이 정상 가격입니다.
                    </div>
                `;
            } else {
                let html = `
                    <div class="result-header found">
                        ⚠️ ${data.count}개 저가 품목 발견!
                    </div>
                    <div style="text-align: center; font-size: 11px; color: #666; margin-bottom: 10px;">
                        결과가 data 폴더에 저장되었습니다.
                    </div>
                `;

                data.products.forEach((p, idx) => {
                    html += `
                        <div class="product">
                            <div class="product-name">${idx + 1}. ${p.name}</div>
                            <div class="product-info">
                                판매가: ${p.price.toLocaleString()}원 | 용량: ${p.volume_ml}ml
                            </div>
                            <div class="product-price">
                                100ml당: ${p.price_per_100ml}원
                            </div>
                            ${p.link ? `<a href="${p.link}" target="_blank" class="product-link">🔗 상품 페이지 열기</a>` : ''}
                        </div>
                    `;
                });

                resultsEl.innerHTML = html;
            }

            // 마지막 분석 시간 업데이트
            document.getElementById('lastAnalysis').innerHTML =
                `마지막 분석: ${new Date().toLocaleString('ko-KR')}<br>발견: ${data.count}개`;

        } else {
            resultsEl.innerHTML = `
                <div class="error">
                    <div style="font-size: 24px; margin-bottom: 10px;">❌</div>
                    <div>오류: ${data.error}</div>
                </div>
            `;
        }

    } catch (error) {
        resultsEl.innerHTML = `
            <div class="error">
                <div style="font-size: 24px; margin-bottom: 10px;">❌</div>
                <div>오류: ${error.message}</div>
                <div style="font-size: 11px; margin-top: 5px; color: #999;">
                    서버가 실행 중인지 확인하세요.
                </div>
            </div>
        `;
    }

    // 버튼 복원
    analyzeBtn.disabled = false;
    analyzeBtn.textContent = '🔍 현재 페이지 분석';
});

// 대시보드 열기
document.getElementById('dashboardBtn').addEventListener('click', () => {
    chrome.tabs.create({ url: SERVER_URL });
});

// 초기화
checkServerStatus();
loadAutoStatus();
