// 상태 변수
let scenes = [];
let currentSceneIndex = 0;
let currentDialogueIndex = 0;
let correctAnswers = 0;
let totalQuestions = 0;
let isWaitingForChoice = false;

// URL에서 시나리오 ID 가져오기
const params = new URLSearchParams(window.location.search);
const scenarioId = params.get('scenario') || 'golf';

// 뒤로가기 링크 설정
document.getElementById('backBtn').href = `/pages/scenario.html?id=${scenarioId}`;

// 페이지 로드 시 데이터 가져오기
document.addEventListener('DOMContentLoaded', loadConversation);

async function loadConversation() {
    try {
        const response = await fetch(`/api/scenarios/${scenarioId}/conversation`);
        const data = await response.json();
        scenes = data.scenes;
        showScene();
    } catch (error) {
        console.error('회화 로드 실패:', error);
        alert('회화 데이터를 불러오는데 실패했습니다.');
    }
}

function showScene() {
    if (currentSceneIndex >= scenes.length) {
        showComplete();
        return;
    }

    const scene = scenes[currentSceneIndex];

    // 씬 헤더 업데이트
    document.getElementById('sceneTitle').textContent = `씬 ${scene.id}: ${scene.title}`;
    document.getElementById('sceneLocation').textContent = `📍 ${scene.location}`;

    // 진행도 업데이트
    const progress = ((currentSceneIndex) / scenes.length) * 100;
    document.getElementById('progressFill').style.width = `${progress}%`;

    // 대화 영역 초기화
    document.getElementById('dialogueArea').innerHTML = '';
    document.getElementById('choicesArea').style.display = 'none';
    document.getElementById('nextBtn').style.display = 'none';

    currentDialogueIndex = 0;
    showDialogue();
}

function showDialogue() {
    const scene = scenes[currentSceneIndex];

    if (currentDialogueIndex >= scene.dialogues.length) {
        // 다음 씬으로
        currentSceneIndex++;
        if (currentSceneIndex < scenes.length) {
            document.getElementById('nextBtn').textContent = '다음 씬 →';
            document.getElementById('nextBtn').style.display = 'inline-block';
            document.getElementById('nextBtn').onclick = () => {
                document.getElementById('nextBtn').style.display = 'none';
                showScene();
            };
        } else {
            showComplete();
        }
        return;
    }

    const dialogue = scene.dialogues[currentDialogueIndex];

    if (dialogue.speaker === 'player' && dialogue.choices) {
        // 선택지 표시
        showChoices(dialogue.choices);
    } else {
        // NPC 대사 표시
        addDialogueBox(dialogue);
        currentDialogueIndex++;

        // 자동으로 다음 대화로 진행 (약간의 딜레이 후)
        setTimeout(() => {
            showDialogue();
        }, 300);
    }
}

function addDialogueBox(dialogue) {
    const area = document.getElementById('dialogueArea');
    const box = document.createElement('div');
    box.className = `dialogue-box ${dialogue.speaker}`;

    const speakerEmoji = {
        staff: '👔',
        caddy: '🏌️',
        player: '🙋',
        narrator: '📖'
    };

    let html = `
        <div class="speaker-name">${speakerEmoji[dialogue.speaker] || '👤'} ${dialogue.speakerName}</div>
        <div class="dialogue-japanese">${dialogue.japanese}</div>
        <div class="dialogue-korean">${dialogue.korean}</div>
    `;

    if (dialogue.tip) {
        html += `<div class="dialogue-tip">💡 ${dialogue.tip}</div>`;
    }

    // TTS 버튼 추가 (narrator 제외)
    if (dialogue.speaker !== 'narrator') {
        html += `<button class="tts-btn" onclick="speak('${dialogue.japanese.replace(/'/g, "\\'")}')">🔊</button>`;
    }

    box.innerHTML = html;
    area.appendChild(box);

    // 스크롤을 아래로
    box.scrollIntoView({ behavior: 'smooth', block: 'end' });
}

function showChoices(choices) {
    isWaitingForChoice = true;
    const choicesArea = document.getElementById('choicesArea');
    const choicesContainer = document.getElementById('choices');

    choicesContainer.innerHTML = choices.map((choice, index) => `
        <div class="choice-btn" onclick="selectChoice(${index})">
            <div class="choice-japanese">${choice.japanese}</div>
            <div class="choice-korean">${choice.korean}</div>
        </div>
    `).join('');

    choicesArea.style.display = 'block';
    choicesArea.scrollIntoView({ behavior: 'smooth', block: 'end' });
}

function selectChoice(index) {
    if (!isWaitingForChoice) return;
    isWaitingForChoice = false;

    const scene = scenes[currentSceneIndex];
    const dialogue = scene.dialogues[currentDialogueIndex];
    const choices = dialogue.choices;
    const selected = choices[index];

    totalQuestions++;

    // 모든 선택지 버튼 가져오기
    const buttons = document.querySelectorAll('.choice-btn');

    buttons.forEach((btn, i) => {
        btn.onclick = null; // 클릭 비활성화

        if (choices[i].correct) {
            btn.classList.add('correct');
        }

        if (i === index && !selected.correct) {
            btn.classList.add('wrong');
        }
    });

    if (selected.correct) {
        correctAnswers++;
    }

    // 피드백 표시
    if (selected.feedback) {
        const feedback = document.createElement('div');
        feedback.className = 'dialogue-tip';
        feedback.style.marginTop = '10px';
        feedback.textContent = `💬 ${selected.feedback}`;
        document.getElementById('choices').appendChild(feedback);
    }

    // 선택한 대사를 대화에 추가
    setTimeout(() => {
        addDialogueBox({
            speaker: 'player',
            speakerName: '나',
            japanese: selected.japanese,
            korean: selected.korean
        });

        document.getElementById('choicesArea').style.display = 'none';
        currentDialogueIndex++;

        setTimeout(() => {
            showDialogue();
        }, 500);
    }, 1000);
}

function showComplete() {
    document.getElementById('dialogueArea').style.display = 'none';
    document.getElementById('choicesArea').style.display = 'none';
    document.getElementById('nextBtn').style.display = 'none';
    document.getElementById('sceneHeader').style.display = 'none';

    const percentage = totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 100;

    let stars = '⭐';
    if (percentage >= 90) stars = '⭐⭐⭐';
    else if (percentage >= 70) stars = '⭐⭐';

    document.getElementById('stars').textContent = stars;
    document.getElementById('resultMessage').textContent = `정답률: ${percentage}% (${correctAnswers}/${totalQuestions})`;
    document.getElementById('completeSection').style.display = 'block';

    // 진행도 100%
    document.getElementById('progressFill').style.width = '100%';
}

function restart() {
    currentSceneIndex = 0;
    currentDialogueIndex = 0;
    correctAnswers = 0;
    totalQuestions = 0;

    document.getElementById('dialogueArea').style.display = 'block';
    document.getElementById('sceneHeader').style.display = 'block';
    document.getElementById('completeSection').style.display = 'none';

    showScene();
}

function goToQuiz() {
    window.location.href = `/quiz.html?scenario=${scenarioId}`;
}

// TTS 오디오 플레이어
let ttsAudio = null;

function speak(text) {
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

function next() {
    // 다음 버튼 클릭 시 처리
}
