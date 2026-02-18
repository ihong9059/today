// 시나리오 정보
const scenarioInfo = {
    golf: {
        emoji: '⛳',
        title: '골프장 & 식사',
        description: '골프 라운드와 클럽하우스 식사에서 사용하는 표현',
        time: '20-30분'
    },
    hotel: {
        emoji: '🏨',
        title: '호텔 체크인/아웃',
        description: '호텔 예약, 체크인/아웃, 서비스 요청',
        time: '20-30분'
    },
    restaurant: {
        emoji: '🍽️',
        title: '레스토랑',
        description: '레스토랑 예약, 주문, 계산',
        time: '20-30분'
    },
    train: {
        emoji: '🚃',
        title: '전철/지하철',
        description: '티켓 구매, 환승, 길 찾기',
        time: '20-30분'
    },
    convenience: {
        emoji: '🏪',
        title: '편의점/슈퍼',
        description: '편의점 쇼핑, 결제, 서비스 이용',
        time: '20-30분'
    },
    cafe: {
        emoji: '☕',
        title: '카페',
        description: '음료 주문, 옵션 선택, 시설 이용',
        time: '20-30분'
    },
    hospital: {
        emoji: '🏥',
        title: '병원/약국',
        description: '증상 설명, 진료, 약 구매',
        time: '20-30분'
    },
    hairsalon: {
        emoji: '💇',
        title: '미용실',
        description: '헤어컷, 스타일링, 예약',
        time: '20-30분'
    },
    airport: {
        emoji: '✈️',
        title: '공항',
        description: '체크인, 보안검색, 입출국',
        time: '20-30분'
    },
    taxi: {
        emoji: '🚕',
        title: '택시',
        description: '택시 탑승, 목적지 안내, 결제',
        time: '20-30분'
    },
    phone: {
        emoji: '📱',
        title: '휴대폰 가게',
        description: 'SIM 카드 구매, 요금제 선택',
        time: '20-30분'
    },
    department: {
        emoji: '🛍️',
        title: '백화점',
        description: '쇼핑, 면세, 선물 구매',
        time: '20-30분'
    },
    izakaya: {
        emoji: '🍺',
        title: '이자카야',
        description: '일본식 선술집, 음주 문화',
        time: '20-30분'
    },
    realestate: {
        emoji: '🏠',
        title: '부동산',
        description: '집 구하기, 임대 계약',
        time: '20-30분'
    },
    bank: {
        emoji: '🏦',
        title: '은행/환전',
        description: '환전, ATM, 계좌 개설',
        time: '20-30분'
    },
    postoffice: {
        emoji: '📮',
        title: '우체국',
        description: '우편물 발송, 택배, 엽서',
        time: '20-30분'
    },
    sightseeing: {
        emoji: '🏯',
        title: '관광지',
        description: '관광명소, 입장권, 사진 촬영',
        time: '20-30분'
    },
    onsen: {
        emoji: '♨️',
        title: '온천/료칸',
        description: '온천 이용, 료칸 숙박',
        time: '20-30분'
    },
    karaoke: {
        emoji: '🎤',
        title: '노래방',
        description: '카라오케 이용, 노래 선곡',
        time: '20-30분'
    },
    business: {
        emoji: '💼',
        title: '비즈니스 미팅',
        description: '명함 교환, 회의, 비즈니스 인사',
        time: '20-30분'
    }
};

// 페이지 로드 시 시나리오 목록 표시
document.addEventListener('DOMContentLoaded', () => {
    loadScenarios();
});

async function loadScenarios() {
    const container = document.getElementById('scenarios');

    try {
        const response = await fetch('/api/scenarios');
        const scenarios = await response.json();

        container.innerHTML = scenarios.map(scenario => {
            const info = scenarioInfo[scenario] || {
                emoji: '📚',
                title: scenario,
                description: '학습 시나리오',
                time: '20-30분'
            };

            return `
                <div class="scenario-card" onclick="selectScenario('${scenario}')">
                    <div class="emoji">${info.emoji}</div>
                    <h3>${info.title}</h3>
                    <p>${info.description}</p>
                    <div class="time">⏱️ ${info.time}</div>
                </div>
            `;
        }).join('');
    } catch (error) {
        container.innerHTML = '<p>시나리오를 불러오는 중 오류가 발생했습니다.</p>';
    }
}

function selectScenario(scenario) {
    // 시나리오 선택 페이지로 이동
    window.location.href = `/pages/scenario.html?id=${scenario}`;
}
