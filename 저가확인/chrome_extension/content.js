// 쿠팡 검색 페이지에서 자동으로 실행되는 콘텐츠 스크립트
// 서울우유 검색 결과를 서버로 전송

const SERVER_URL = 'http://localhost:5000';

// 페이지 로드 후 자동 분석
window.addEventListener('load', () => {
    // URL에 서울우유가 포함되어 있는지 확인
    const url = window.location.href;
    if (url.includes('%EC%84%9C%EC%9A%B8%EC%9A%B0%EC%9C%A0') || url.includes('서울우유')) {
        console.log('[서울우유 모니터링] 서울우유 검색 페이지 감지');
        // 페이지 완전 로드 대기
        setTimeout(analyzeAndSend, 2000);
    }
});

// 분석 및 서버 전송
async function analyzeAndSend() {
    console.log('[서울우유 모니터링] 페이지 분석 시작...');

    const html = document.documentElement.outerHTML;

    try {
        const response = await fetch(`${SERVER_URL}/api/parse-text`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ html: html })
        });

        const data = await response.json();

        if (data.success) {
            console.log(`[서울우유 모니터링] 분석 완료: ${data.count}개 저가 품목 발견`);

            if (data.count > 0) {
                // 알림 표시
                showNotification(data.count, data.products);
            }
        } else {
            console.error('[서울우유 모니터링] 분석 오류:', data.error);
        }
    } catch (error) {
        console.error('[서울우유 모니터링] 서버 연결 오류:', error);
    }
}

// 페이지 내 알림 표시
function showNotification(count, products) {
    // 기존 알림 제거
    const existing = document.getElementById('seoul-milk-alert');
    if (existing) existing.remove();

    // 알림 박스 생성
    const alertBox = document.createElement('div');
    alertBox.id = 'seoul-milk-alert';
    alertBox.innerHTML = `
        <div style="
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%);
            color: white;
            padding: 20px;
            border-radius: 15px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.3);
            z-index: 999999;
            max-width: 400px;
            font-family: 'Malgun Gothic', sans-serif;
        ">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
                <h3 style="margin: 0; font-size: 18px;">저가 품목 발견!</h3>
                <button onclick="this.parentElement.parentElement.parentElement.remove()" style="
                    background: rgba(255,255,255,0.2);
                    border: none;
                    color: white;
                    width: 30px;
                    height: 30px;
                    border-radius: 50%;
                    cursor: pointer;
                    font-size: 16px;
                ">X</button>
            </div>
            <p style="margin-bottom: 10px; font-size: 14px;">
                100ml당 300원 이하 제품 <strong>${count}개</strong> 발견
            </p>
            <div style="max-height: 200px; overflow-y: auto; font-size: 13px;">
                ${products.slice(0, 5).map(p => `
                    <div style="
                        background: rgba(255,255,255,0.1);
                        padding: 10px;
                        margin: 5px 0;
                        border-radius: 8px;
                    ">
                        <div style="font-weight: bold; margin-bottom: 5px;">${p.name.substring(0, 40)}...</div>
                        <div>가격: ${p.price.toLocaleString()}원 | 100ml당: <strong>${p.price_per_100ml}원</strong></div>
                    </div>
                `).join('')}
                ${count > 5 ? `<div style="text-align: center; padding: 10px;">외 ${count - 5}개 더...</div>` : ''}
            </div>
            <a href="${SERVER_URL}" target="_blank" style="
                display: block;
                text-align: center;
                margin-top: 15px;
                padding: 10px;
                background: white;
                color: #e74c3c;
                text-decoration: none;
                border-radius: 8px;
                font-weight: bold;
            ">전체 결과 보기</a>
        </div>
    `;

    document.body.appendChild(alertBox);
}

// 메시지 수신 (팝업에서)
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'analyze') {
        analyzeAndSend().then(() => {
            sendResponse({ success: true });
        });
        return true; // 비동기 응답
    }
});
