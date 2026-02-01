// 서울우유 저가 모니터링 - 백그라운드 서비스 워커
// 10분마다 자동으로 쿠팡 검색 페이지를 열고 분석

const SERVER_URL = 'http://localhost:5000';
const COUPANG_SEARCH_URL = 'https://www.coupang.com/np/search?component=&q=%EC%84%9C%EC%9A%B8%EC%9A%B0%EC%9C%A0';
const ALARM_NAME = 'autoAnalyze';
const INTERVAL_MINUTES = 10;

// 확장 설치/업데이트 시 알람 설정
chrome.runtime.onInstalled.addListener(() => {
    console.log('[서울우유 모니터링] 확장 프로그램 설치됨');
    setupAlarm();
});

// 브라우저 시작 시 알람 확인
chrome.runtime.onStartup.addListener(() => {
    console.log('[서울우유 모니터링] 브라우저 시작됨');
    setupAlarm();
});

// 알람 설정
function setupAlarm() {
    chrome.storage.local.get(['autoEnabled'], (result) => {
        if (result.autoEnabled !== false) {
            // 기본값은 켜짐
            chrome.alarms.create(ALARM_NAME, {
                delayInMinutes: 1, // 1분 후 첫 실행
                periodInMinutes: INTERVAL_MINUTES
            });
            console.log(`[서울우유 모니터링] ${INTERVAL_MINUTES}분마다 자동 분석 설정됨`);
        }
    });
}

// 알람 이벤트 처리
chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === ALARM_NAME) {
        console.log('[서울우유 모니터링] 자동 분석 시작...');
        runAutoAnalysis();
    }
});

// 자동 분석 실행
async function runAutoAnalysis() {
    try {
        // 쿠팡 검색 페이지를 새 탭으로 열기
        const tab = await chrome.tabs.create({
            url: COUPANG_SEARCH_URL,
            active: false // 백그라운드에서 열기
        });

        console.log(`[서울우유 모니터링] 쿠팡 탭 열림: ${tab.id}`);

        // 페이지 로드 완료 대기
        await waitForTabLoad(tab.id);

        // 추가 대기 (동적 컨텐츠 로드)
        await sleep(3000);

        // HTML 가져오기
        const results = await chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: () => document.documentElement.outerHTML
        });

        const html = results[0].result;

        // 서버로 전송 (자동 저장 요청)
        const response = await fetch(`${SERVER_URL}/api/parse-text`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ html: html, auto_save: true })
        });

        const data = await response.json();

        if (data.success) {
            console.log(`[서울우유 모니터링] 분석 완료: ${data.count}개 저가 품목`);

            // 저장 상태 기록
            chrome.storage.local.set({
                lastAnalysis: {
                    time: new Date().toISOString(),
                    count: data.count,
                    products: data.products
                }
            });

            // 저가 품목이 있으면 알림
            if (data.count > 0) {
                // 배지 표시
                chrome.action.setBadgeText({ text: String(data.count) });
                chrome.action.setBadgeBackgroundColor({ color: '#e74c3c' });
            } else {
                chrome.action.setBadgeText({ text: '' });
            }
        } else {
            console.error('[서울우유 모니터링] 분석 오류:', data.error);
        }

        // 탭 닫기
        await chrome.tabs.remove(tab.id);

    } catch (error) {
        console.error('[서울우유 모니터링] 자동 분석 실패:', error);
    }
}

// 탭 로드 대기
function waitForTabLoad(tabId) {
    return new Promise((resolve) => {
        const listener = (updatedTabId, changeInfo) => {
            if (updatedTabId === tabId && changeInfo.status === 'complete') {
                chrome.tabs.onUpdated.removeListener(listener);
                resolve();
            }
        };
        chrome.tabs.onUpdated.addListener(listener);

        // 타임아웃 (30초)
        setTimeout(() => {
            chrome.tabs.onUpdated.removeListener(listener);
            resolve();
        }, 30000);
    });
}

// sleep 함수
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// 메시지 핸들러 (팝업에서 제어)
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'toggleAuto') {
        const enabled = request.enabled;
        chrome.storage.local.set({ autoEnabled: enabled });

        if (enabled) {
            setupAlarm();
            sendResponse({ success: true, message: '자동 분석 켜짐' });
        } else {
            chrome.alarms.clear(ALARM_NAME);
            sendResponse({ success: true, message: '자동 분석 꺼짐' });
        }
        return true;
    }

    if (request.action === 'runNow') {
        runAutoAnalysis();
        sendResponse({ success: true, message: '분석 시작' });
        return true;
    }

    if (request.action === 'getStatus') {
        chrome.storage.local.get(['autoEnabled', 'lastAnalysis'], (result) => {
            sendResponse({
                autoEnabled: result.autoEnabled !== false,
                lastAnalysis: result.lastAnalysis
            });
        });
        return true;
    }
});
