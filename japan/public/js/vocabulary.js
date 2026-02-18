// 상태 변수
let words = [];
let categories = [];
let currentIndex = 0;
let currentWord = null;
let knownWords = new Set();
let isFlipped = false;

// URL에서 시나리오 ID 가져오기
const params = new URLSearchParams(window.location.search);
const scenarioId = params.get('scenario') || 'golf';

// 뒤로가기 링크 설정
document.getElementById('backBtn').href = `/pages/scenario.html?id=${scenarioId}`;

// 페이지 로드 시 데이터 가져오기
document.addEventListener('DOMContentLoaded', loadWords);

async function loadWords() {
    try {
        const response = await fetch(`/api/scenarios/${scenarioId}/words`);
        const data = await response.json();

        // 모든 카테고리의 단어를 하나의 배열로 합침
        categories = data.categories;
        words = [];
        categories.forEach(cat => {
            cat.words.forEach(word => {
                words.push({ ...word, category: cat.name });
            });
        });

        // 단어 순서 섞기
        words = shuffleArray(words);

        document.getElementById('totalCount').textContent = words.length;
        showWord();
    } catch (error) {
        console.error('단어 로드 실패:', error);
        alert('단어를 불러오는데 실패했습니다.');
    }
}

// 배열 섞기 함수 (Fisher-Yates 알고리즘)
function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

function showWord(autoSpeak = false) {
    if (words.length === 0) return;

    currentWord = words[currentIndex];
    isFlipped = false;

    // 카드 앞면 표시
    document.getElementById('cardFront').style.display = 'flex';
    document.getElementById('cardFront').style.flexDirection = 'column';
    document.getElementById('cardFront').style.alignItems = 'center';
    document.getElementById('cardBack').style.display = 'none';
    document.getElementById('flashcard').classList.remove('flipped');

    // 단어 정보 표시
    document.getElementById('japanese').textContent = currentWord.japanese;
    document.getElementById('reading').textContent = currentWord.reading;
    document.getElementById('korean').textContent = currentWord.korean;
    document.getElementById('example').textContent = currentWord.example;
    document.getElementById('categoryBadge').textContent = `📁 ${currentWord.category}`;

    // 진행도 업데이트
    updateProgress();

    // 알고 있음 체크박스 상태
    document.getElementById('knownCheck').checked = knownWords.has(currentIndex);

    // 자동 발음 재생
    if (autoSpeak) {
        setTimeout(() => speak(currentWord.japanese), 300);
    }
}

function flipCard() {
    isFlipped = !isFlipped;

    if (isFlipped) {
        document.getElementById('cardFront').style.display = 'none';
        document.getElementById('cardBack').style.display = 'flex';
        document.getElementById('cardBack').style.flexDirection = 'column';
        document.getElementById('cardBack').style.alignItems = 'center';
        document.getElementById('cardBack').style.justifyContent = 'center';
    } else {
        document.getElementById('cardFront').style.display = 'flex';
        document.getElementById('cardFront').style.flexDirection = 'column';
        document.getElementById('cardFront').style.alignItems = 'center';
        document.getElementById('cardBack').style.display = 'none';
    }
}

function nextWord() {
    if (currentIndex < words.length - 1) {
        currentIndex++;
        showWord(true); // 자동 발음 재생
    } else {
        // 마지막 단어 - 완료 섹션 표시
        showComplete();
    }
}

function prevWord() {
    if (currentIndex > 0) {
        currentIndex--;
        showWord(true); // 자동 발음 재생
    }
}

function updateProgress() {
    const progress = ((currentIndex + 1) / words.length) * 100;
    document.getElementById('progressFill').style.width = `${progress}%`;
    document.getElementById('wordCounter').textContent = `${currentIndex + 1} / ${words.length}`;
}

function toggleKnown() {
    if (document.getElementById('knownCheck').checked) {
        knownWords.add(currentIndex);
    } else {
        knownWords.delete(currentIndex);
    }
    document.getElementById('knownCount').textContent = knownWords.size;
}

function showComplete() {
    document.getElementById('completeSection').style.display = 'block';
    document.getElementById('knownCount').textContent = knownWords.size;
}

// TTS 오디오 플레이어
let ttsAudio = null;

function speak(text) {
    // 이전 오디오 중지
    if (ttsAudio) {
        ttsAudio.pause();
        ttsAudio.currentTime = 0;
    }

    // 서버 프록시 TTS API 사용
    const url = `/api/tts?text=${encodeURIComponent(text)}`;

    ttsAudio = new Audio(url);
    ttsAudio.play().catch(err => {
        console.log('Server TTS error:', err);
        alert('음성 재생 실패: ' + err.message);
    });
}

function goToConversation() {
    window.location.href = `/conversation.html?scenario=${scenarioId}`;
}

// 키보드 단축키
document.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'ArrowLeft':
            prevWord();
            break;
        case 'ArrowRight':
            nextWord();
            break;
        case ' ':
            e.preventDefault();
            flipCard();
            break;
        case 'Enter':
            speak(currentWord.japanese);
            break;
    }
});
