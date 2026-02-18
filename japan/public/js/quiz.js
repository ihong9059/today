// 상태 변수
let quizData = null;
let currentGame = null;
let currentQuestionIndex = 0;
let score = 0;
let timer = null;
let timeLeft = 0;
let totalMoney = 0; // 가상 머니 (엔)

// 매칭 게임용
let selectedCards = [];
let matchedPairs = 0;

// 난이도별 보상 (엔)
const difficultyRewards = {
    easy: 100,      // 쉬움
    medium: 200,    // 보통
    hard: 300       // 어려움
};

// 골프장 시나리오별 보상 메시지 (일본어 + 한국어)
const golfRewards = [
    { yen: 0, jp: "頑張って！", kr: "힘내세요!", item: "💪" },
    { yen: 100, jp: "お茶一杯分です！", kr: "차 한 잔 값이에요!", item: "🍵" },
    { yen: 200, jp: "おにぎり一個買えます！", kr: "주먹밥 하나 살 수 있어요!", item: "🍙" },
    { yen: 300, jp: "自販機でジュースが買えます！", kr: "자판기에서 주스 살 수 있어요!", item: "🥤" },
    { yen: 500, jp: "クラブハウスでコーヒーが飲めます！", kr: "클럽하우스에서 커피 마실 수 있어요!", item: "☕" },
    { yen: 800, jp: "生ビール一杯いけます！", kr: "생맥주 한 잔 마실 수 있어요!", item: "🍺" },
    { yen: 1000, jp: "キャディーさんに少しチップ！", kr: "캐디에게 작은 팁을 줄 수 있어요!", item: "💴" },
    { yen: 1500, jp: "ランチセットが食べられます！", kr: "런치 세트를 먹을 수 있어요!", item: "🍱" },
    { yen: 2000, jp: "キャディーさんにちゃんとチップ！", kr: "캐디에게 제대로 된 팁!", item: "💵" },
    { yen: 3000, jp: "和牛ステーキランチ！", kr: "와규 스테이크 런치!", item: "🥩" },
    { yen: 5000, jp: "キャディーさんに感謝のチップ！", kr: "캐디에게 감사의 팁!", item: "💰" },
    { yen: 8000, jp: "高級ワインが飲めます！", kr: "고급 와인을 마실 수 있어요!", item: "🍷" },
    { yen: 10000, jp: "次のラウンドのグリーンフィー！", kr: "다음 라운드 그린피!", item: "⛳" }
];

// 오답 메시지
const wrongMessages = [
    { jp: "あー、残念！", kr: "아, 아쉬워요!" },
    { jp: "ドンマイ！次は頑張ろう！", kr: "괜찮아요! 다음엔 잘 할 수 있어요!" },
    { jp: "惜しい！もう一回！", kr: "아깝다! 한 번 더!" },
    { jp: "大丈夫、練習あるのみ！", kr: "괜찮아요, 연습이 답이에요!" }
];

// URL에서 시나리오 ID 가져오기
const params = new URLSearchParams(window.location.search);
const scenarioId = params.get('scenario') || 'golf';

// 뒤로가기 링크 설정
document.getElementById('backBtn').href = `/pages/scenario.html?id=${scenarioId}`;

// 페이지 로드 시 데이터 가져오기
document.addEventListener('DOMContentLoaded', loadQuizData);

// CSS 애니메이션 추가
const style = document.createElement('style');
style.textContent = `
    @keyframes popIn {
        0% { transform: translate(-50%, -50%) scale(0); opacity: 0; }
        50% { transform: translate(-50%, -50%) scale(1.1); }
        100% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
    }
    @keyframes popOut {
        0% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
        100% { transform: translate(-50%, -50%) scale(0); opacity: 0; }
    }
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
    .money-display {
        background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
        color: white;
        padding: 8px 16px;
        border-radius: 20px;
        font-weight: bold;
    }
    .difficulty-badge {
        display: inline-block;
        padding: 3px 10px;
        border-radius: 12px;
        font-size: 0.8rem;
        margin-left: 10px;
    }
    .difficulty-easy { background: #4caf50; color: white; }
    .difficulty-medium { background: #ff9800; color: white; }
    .difficulty-hard { background: #f44336; color: white; }
`;
document.head.appendChild(style);

async function loadQuizData() {
    try {
        const response = await fetch(`/api/scenarios/${scenarioId}/quiz`);
        quizData = await response.json();
        updateMoneyDisplay();
    } catch (error) {
        console.error('퀴즈 로드 실패:', error);
        alert('퀴즈 데이터를 불러오는데 실패했습니다.');
    }
}

// 머니 표시 업데이트
function updateMoneyDisplay() {
    const displays = document.querySelectorAll('.money-value');
    displays.forEach(el => {
        el.textContent = `¥${totalMoney.toLocaleString()}`;
    });
}

// 난이도 결정 (문제 인덱스 기반)
function getDifficulty(index, total) {
    const ratio = index / total;
    if (ratio < 0.4) return 'easy';
    if (ratio < 0.7) return 'medium';
    return 'hard';
}

// 난이도 한국어
function getDifficultyKr(diff) {
    const map = { easy: '쉬움', medium: '보통', hard: '어려움' };
    return map[diff] || '보통';
}

// 정답 시 보상
function handleCorrect(difficulty = 'medium') {
    const earnedYen = difficultyRewards[difficulty];
    totalMoney += earnedYen;
    score++;

    const reward = getRewardForMoney(totalMoney);
    showRewardPopup(earnedYen, reward, true);
    speakJapanese(reward.jp);
    updateMoneyDisplay();
}

// 오답 시 감점
function handleWrong(difficulty = 'medium') {
    const penalty = difficultyRewards[difficulty] * 2; // 2배 감점
    totalMoney = Math.max(0, totalMoney - penalty); // 0 이하로 내려가지 않음

    const wrongMsg = wrongMessages[Math.floor(Math.random() * wrongMessages.length)];
    showRewardPopup(-penalty, { ...wrongMsg, item: '😢' }, false);
    speakJapanese(wrongMsg.jp);
    updateMoneyDisplay();
}

// 현재 금액에 맞는 보상 메시지 찾기
function getRewardForMoney(money) {
    let reward = golfRewards[0];
    for (let i = golfRewards.length - 1; i >= 0; i--) {
        if (money >= golfRewards[i].yen) {
            reward = golfRewards[i];
            break;
        }
    }
    return reward;
}

// 보상 팝업 표시
function showRewardPopup(amount, reward, isCorrect) {
    // 기존 팝업 제거
    const existingPopup = document.getElementById('rewardPopup');
    if (existingPopup) existingPopup.remove();

    const popup = document.createElement('div');
    popup.id = 'rewardPopup';

    const bgGradient = isCorrect
        ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
        : 'linear-gradient(135deg, #ff6b6b 0%, #c44569 100%)';

    popup.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: ${bgGradient};
        color: white;
        padding: 30px 40px;
        border-radius: 20px;
        text-align: center;
        z-index: 1000;
        animation: ${isCorrect ? 'popIn' : 'shake'} 0.5s ease;
        box-shadow: 0 10px 40px rgba(0,0,0,0.3);
        min-width: 280px;
    `;

    const sign = amount >= 0 ? '+' : '';
    popup.innerHTML = `
        <div style="font-size: 3rem; margin-bottom: 10px;">${reward.item}</div>
        <div style="font-size: 1.5rem; font-weight: bold; margin-bottom: 10px;">${sign}¥${amount.toLocaleString()}</div>
        <div style="font-size: 1.2rem; margin-bottom: 5px;">${reward.jp}</div>
        <div style="font-size: 1rem; opacity: 0.9;">${reward.kr}</div>
        <div style="margin-top: 15px; font-size: 1.1rem; background: rgba(255,255,255,0.2); padding: 10px; border-radius: 10px;">
            💰 총 수입: ¥${totalMoney.toLocaleString()}
        </div>
        <button onclick="closeRewardPopup()" style="
            margin-top: 20px;
            padding: 12px 30px;
            font-size: 1rem;
            font-weight: bold;
            border: none;
            border-radius: 25px;
            background: rgba(255,255,255,0.9);
            color: #333;
            cursor: pointer;
            transition: transform 0.2s;
        " onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
            확인
        </button>
    `;

    document.body.appendChild(popup);
}

// 팝업 닫기
function closeRewardPopup() {
    const popup = document.getElementById('rewardPopup');
    if (popup) {
        popup.style.animation = 'popOut 0.3s ease';
        setTimeout(() => popup.remove(), 300);
    }
}

// TTS 오디오 플레이어
let quizTtsAudio = null;

function speakJapanese(text) {
    if (quizTtsAudio) {
        quizTtsAudio.pause();
        quizTtsAudio.currentTime = 0;
    }

    // 서버 프록시 TTS API 사용
    const url = `/api/tts?text=${encodeURIComponent(text)}`;

    quizTtsAudio = new Audio(url);
    quizTtsAudio.play().catch(err => {
        console.log('Server TTS error:', err);
    });
}

function startGame(gameType) {
    currentGame = gameType;
    currentQuestionIndex = 0;
    score = 0;

    document.getElementById('gameMenu').style.display = 'none';
    document.getElementById('resultScreen').style.display = 'none';

    switch (gameType) {
        case 'multiple_choice':
            startMultipleChoice();
            break;
        case 'fill_blank':
            startFillBlank();
            break;
        case 'matching':
            startMatching();
            break;
        case 'situational':
            startSituational();
            break;
    }
}

// ===== 4지선다 퀴즈 =====
function startMultipleChoice() {
    document.getElementById('multipleChoiceGame').style.display = 'block';
    showMCQuestion();
}

function showMCQuestion() {
    const section = quizData.sections.find(s => s.type === 'multiple_choice');
    const questions = section.questions;

    if (currentQuestionIndex >= questions.length) {
        endGame(score * 10, questions.length * 10);
        return;
    }

    const q = questions[currentQuestionIndex];
    const difficulty = getDifficulty(currentQuestionIndex, questions.length);
    const reward = difficultyRewards[difficulty];

    document.getElementById('mcQuestionNum').innerHTML = `
        문제 ${currentQuestionIndex + 1}/${questions.length}
        <span class="difficulty-badge difficulty-${difficulty}">${getDifficultyKr(difficulty)} ¥${reward}</span>
        <span class="money-display" style="margin-left: 10px;">💰 <span class="money-value">¥${totalMoney.toLocaleString()}</span></span>
    `;
    document.getElementById('mcQuestion').textContent = q.question;

    const optionsHtml = q.options.map((opt, i) => `
        <div class="quiz-option" onclick="selectMCOption(${i})">${opt}</div>
    `).join('');
    document.getElementById('mcOptions').innerHTML = optionsHtml;
    document.getElementById('mcNextBtn').style.display = 'none';

    startTimer('mcTimer', section.timeLimit || 15, () => {
        selectMCOption(-1);
    });
}

function selectMCOption(index) {
    clearInterval(timer);

    const section = quizData.sections.find(s => s.type === 'multiple_choice');
    const q = section.questions[currentQuestionIndex];
    const options = document.querySelectorAll('#mcOptions .quiz-option');
    const difficulty = getDifficulty(currentQuestionIndex, section.questions.length);

    options.forEach((opt, i) => {
        opt.onclick = null;
        if (i === q.answer) {
            opt.classList.add('correct');
        }
        if (i === index && i !== q.answer) {
            opt.classList.add('wrong');
        }
    });

    if (index === q.answer) {
        handleCorrect(difficulty);
    } else {
        handleWrong(difficulty);
    }

    document.getElementById('mcNextBtn').style.display = 'inline-block';
}

function nextMCQuestion() {
    currentQuestionIndex++;
    showMCQuestion();
}

// ===== 빈칸 채우기 (5지선다) =====
function startFillBlank() {
    document.getElementById('fillBlankGame').style.display = 'block';
    showFBQuestion();
}

function showFBQuestion() {
    const section = quizData.sections.find(s => s.type === 'fill_blank');
    const questions = section.questions;

    if (currentQuestionIndex >= questions.length) {
        endGame(score * 15, questions.length * 15);
        return;
    }

    const q = questions[currentQuestionIndex];
    const difficulty = getDifficulty(currentQuestionIndex, questions.length);
    const reward = difficultyRewards[difficulty];

    document.getElementById('fbQuestionNum').innerHTML = `
        문제 ${currentQuestionIndex + 1}/${questions.length}
        <span class="difficulty-badge difficulty-${difficulty}">${getDifficultyKr(difficulty)} ¥${reward}</span>
        <span class="money-display" style="margin-left: 10px;">💰 <span class="money-value">¥${totalMoney.toLocaleString()}</span></span>
    `;
    document.getElementById('fbQuestion').textContent = q.question;
    document.getElementById('fbContext').textContent = `💬 ${q.context}`;

    // 5지선다 옵션 표시
    const optionsHtml = q.options.map((opt, i) => `
        <div class="quiz-option" onclick="selectFBOption(${i})">${opt}</div>
    `).join('');
    document.getElementById('fbOptions').innerHTML = optionsHtml;
    document.getElementById('fbNextBtn').style.display = 'none';

    startTimer('fbTimer', section.timeLimit || 20, () => {
        selectFBOption(-1);
    });
}

function selectFBOption(index) {
    clearInterval(timer);

    const section = quizData.sections.find(s => s.type === 'fill_blank');
    const q = section.questions[currentQuestionIndex];
    const options = document.querySelectorAll('#fbOptions .quiz-option');
    const difficulty = getDifficulty(currentQuestionIndex, section.questions.length);

    options.forEach((opt, i) => {
        opt.onclick = null;
        if (i === q.answer) {
            opt.classList.add('correct');
        }
        if (i === index && i !== q.answer) {
            opt.classList.add('wrong');
        }
    });

    if (index === q.answer) {
        handleCorrect(difficulty);
    } else {
        handleWrong(difficulty);
    }

    document.getElementById('fbNextBtn').style.display = 'inline-block';
}

function nextFBQuestion() {
    currentQuestionIndex++;
    showFBQuestion();
}

// ===== 매칭 게임 =====
function startMatching() {
    document.getElementById('matchingGame').style.display = 'block';

    const section = quizData.sections.find(s => s.type === 'matching');
    const pairs = section.pairs.slice(0, 8);

    matchedPairs = 0;
    selectedCards = [];

    let cards = [];
    pairs.forEach((pair, i) => {
        cards.push({ id: i, type: 'jp', text: pair.japanese, pairId: i });
        cards.push({ id: i, type: 'kr', text: pair.korean, pairId: i });
    });

    cards = shuffleArray(cards);

    const grid = document.getElementById('matchingGrid');
    grid.innerHTML = cards.map((card, index) => `
        <div class="match-card" data-index="${index}" data-pair="${card.pairId}" data-type="${card.type}"
             onclick="selectMatchCard(this)">
            ${card.text}
        </div>
    `).join('');

    document.getElementById('matchPairs').innerHTML = `
        남은 쌍: ${pairs.length}
        <span class="money-display" style="margin-left: 10px;">💰 <span class="money-value">¥${totalMoney.toLocaleString()}</span></span>
    `;

    startTimer('matchTimer', section.timeLimit || 60, () => {
        endGame(matchedPairs * 10, pairs.length * 10);
    });
}

function selectMatchCard(card) {
    if (card.classList.contains('matched') || card.classList.contains('selected')) {
        return;
    }

    card.classList.add('selected');
    selectedCards.push(card);

    if (selectedCards.length === 2) {
        const card1 = selectedCards[0];
        const card2 = selectedCards[1];

        const pair1 = card1.dataset.pair;
        const pair2 = card2.dataset.pair;
        const type1 = card1.dataset.type;
        const type2 = card2.dataset.type;

        if (pair1 === pair2 && type1 !== type2) {
            card1.classList.remove('selected');
            card2.classList.remove('selected');
            card1.classList.add('matched');
            card2.classList.add('matched');
            matchedPairs++;

            // 매칭 성공 시 보상
            handleCorrect('easy');

            const section = quizData.sections.find(s => s.type === 'matching');
            const totalPairs = Math.min(section.pairs.length, 8);
            document.getElementById('matchPairs').innerHTML = `
                남은 쌍: ${totalPairs - matchedPairs}
                <span class="money-display" style="margin-left: 10px;">💰 <span class="money-value">¥${totalMoney.toLocaleString()}</span></span>
            `;

            if (matchedPairs === totalPairs) {
                clearInterval(timer);
                setTimeout(() => {
                    endGame(matchedPairs * 10, totalPairs * 10);
                }, 2500);
            }
        } else {
            // 매칭 실패
            handleWrong('easy');
            setTimeout(() => {
                card1.classList.remove('selected');
                card2.classList.remove('selected');
            }, 500);
        }

        selectedCards = [];
    }
}

// ===== 상황별 표현 =====
function startSituational() {
    document.getElementById('situationalGame').style.display = 'block';
    showSitQuestion();
}

function showSitQuestion() {
    const section = quizData.sections.find(s => s.type === 'situational');
    const questions = section.questions;

    if (currentQuestionIndex >= questions.length) {
        endGame(score * 15, questions.length * 15);
        return;
    }

    const q = questions[currentQuestionIndex];
    const difficulty = getDifficulty(currentQuestionIndex, questions.length);
    const reward = difficultyRewards[difficulty];

    document.getElementById('sitQuestionNum').innerHTML = `
        문제 ${currentQuestionIndex + 1}/${questions.length}
        <span class="difficulty-badge difficulty-${difficulty}">${getDifficultyKr(difficulty)} ¥${reward}</span>
        <span class="money-display" style="margin-left: 10px;">💰 <span class="money-value">¥${totalMoney.toLocaleString()}</span></span>
    `;
    document.getElementById('sitSituation').textContent = q.situation;

    const optionsHtml = q.options.map((opt, i) => `
        <div class="quiz-option" onclick="selectSitOption(${i})">${opt.text}</div>
    `).join('');
    document.getElementById('sitOptions').innerHTML = optionsHtml;
    document.getElementById('sitNextBtn').style.display = 'none';
}

function selectSitOption(index) {
    const section = quizData.sections.find(s => s.type === 'situational');
    const q = section.questions[currentQuestionIndex];
    const options = document.querySelectorAll('#sitOptions .quiz-option');
    const difficulty = getDifficulty(currentQuestionIndex, section.questions.length);

    options.forEach((opt, i) => {
        opt.onclick = null;
        if (q.options[i].correct) {
            opt.classList.add('correct');
        }
        if (i === index && !q.options[i].correct) {
            opt.classList.add('wrong');
        }
    });

    if (q.options[index].correct) {
        handleCorrect(difficulty);
    } else {
        handleWrong(difficulty);
    }

    document.getElementById('sitNextBtn').style.display = 'inline-block';
}

function nextSitQuestion() {
    currentQuestionIndex++;
    showSitQuestion();
}

// ===== 공통 함수 =====
function startTimer(elementId, seconds, onComplete) {
    clearInterval(timer);
    timeLeft = seconds;
    const timerEl = document.getElementById(elementId);

    timerEl.textContent = timeLeft;
    timerEl.classList.remove('warning', 'danger');

    timer = setInterval(() => {
        timeLeft--;
        timerEl.textContent = timeLeft;

        if (timeLeft <= 10) {
            timerEl.classList.add('warning');
        }
        if (timeLeft <= 5) {
            timerEl.classList.remove('warning');
            timerEl.classList.add('danger');
        }

        if (timeLeft <= 0) {
            clearInterval(timer);
            onComplete();
        }
    }, 1000);
}

function endGame(earnedScore, maxScore) {
    clearInterval(timer);

    document.getElementById('multipleChoiceGame').style.display = 'none';
    document.getElementById('fillBlankGame').style.display = 'none';
    document.getElementById('matchingGame').style.display = 'none';
    document.getElementById('situationalGame').style.display = 'none';

    const percentage = Math.round((earnedScore / maxScore) * 100);

    let stars = '⭐';
    let message = '다시 도전해보세요!';
    let jpMessage = '頑張って！';

    if (percentage >= 90) {
        stars = '⭐⭐⭐';
        message = '완벽해요! 대단합니다!';
        jpMessage = 'すごい！完璧です！';
    } else if (percentage >= 70) {
        stars = '⭐⭐';
        message = '잘했어요! 조금만 더!';
        jpMessage = 'よくできました！';
    } else if (percentage >= 50) {
        stars = '⭐';
        message = '괜찮아요! 복습해보세요.';
        jpMessage = 'まあまあです！';
    }

    // 최종 보상 메시지
    const finalReward = getRewardForMoney(totalMoney);

    document.getElementById('resultStars').textContent = stars;
    document.getElementById('resultScore').innerHTML = `
        ${earnedScore}점 / ${maxScore}점
        <div style="margin-top: 15px; font-size: 1.5rem;">
            💰 총 수입: <span style="color: #f5576c;">¥${totalMoney.toLocaleString()}</span>
        </div>
        <div style="margin-top: 10px; font-size: 1.2rem;">
            ${finalReward.item} ${finalReward.kr}
        </div>
    `;
    document.getElementById('resultMessage').textContent = message;
    document.getElementById('resultScreen').style.display = 'block';

    // 결과 음성
    speakJapanese(jpMessage);
}

function backToMenu() {
    document.getElementById('resultScreen').style.display = 'none';
    document.getElementById('gameMenu').style.display = 'block';
}

function restartGame() {
    document.getElementById('resultScreen').style.display = 'none';
    startGame(currentGame);
}

function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}
