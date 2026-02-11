/* ==========================================
   FocusFlow — Application Logic
   Timer · Tasks · Auth · Payments
   ========================================== */

// ===== STATE =====
const state = {
    // Auth
    user: null,
    isPro: false,

    // Timer
    timerDuration: 25 * 60,
    timerRemaining: 25 * 60,
    timerInterval: null,
    timerRunning: false,
    currentMode: 'focus', // 'focus' | 'short' | 'long'

    // Sessions
    sessionCount: 0,
    totalFocusMinutes: 0,

    // Tasks
    tasks: [],
    taskIdCounter: 0,
    maxFreeTasks: 5,

    // Stats
    completedTasks: 0,
    streak: 0,
};

// ===== DOM CACHE =====
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

const dom = {
    // Pages
    landingPage: $('#landing-page'),
    appPage: $('#app-page'),

    // Auth
    authModal: $('#auth-modal'),
    authForm: $('#auth-form'),
    authTitle: $('#auth-title'),
    authSubtitle: $('#auth-subtitle'),
    authNameGroup: $('#auth-name-group'),
    authName: $('#auth-name'),
    authEmail: $('#auth-email'),
    authPassword: $('#auth-password'),
    authSubmit: $('#auth-submit'),
    authToggleText: $('#auth-toggle-text'),
    authToggleBtn: $('#auth-toggle-btn'),
    authClose: $('#auth-close'),

    // Timer
    timerTime: $('#timer-time'),
    timerStatus: $('#timer-status'),
    timerProgress: $('#timer-progress'),
    btnStart: $('#btn-timer-start'),
    btnReset: $('#btn-timer-reset'),
    iconPlay: $('#icon-play'),
    iconPause: $('#icon-pause'),
    sessionCount: $('#session-count'),
    totalFocus: $('#total-focus'),
    timerTabs: $$('.timer-tab'),

    // Tasks
    btnAddTask: $('#btn-add-task'),
    taskInputArea: $('#task-input-area'),
    taskInput: $('#task-input'),
    taskEst: $('#task-est'),
    btnSaveTask: $('#btn-save-task'),
    btnCancelTask: $('#btn-cancel-task'),
    taskList: $('#task-list'),

    // Stats
    statSessions: $('#stat-sessions'),
    statMinutes: $('#stat-minutes'),
    statTasks: $('#stat-tasks'),
    statStreak: $('#stat-streak'),

    // User
    userDisplay: $('#user-display'),
    userPlanBadge: $('#user-plan-badge'),

    // Payment
    paymentModal: $('#payment-modal'),
    paymentClose: $('#payment-close'),
    paypalButtonContainer: $('#paypal-button-container'),

    // Toast
    toast: $('#toast'),
};

// ===== AUTH MODE =====
let isSignUp = false;

function setAuthMode(signUp) {
    isSignUp = signUp;
    if (signUp) {
        dom.authTitle.textContent = '계정 만들기';
        dom.authSubtitle.textContent = '생산성 여정을 시작하세요';
        dom.authNameGroup.classList.remove('hidden');
        dom.authSubmit.textContent = '회원가입';
        dom.authToggleText.textContent = '이미 계정이 있으신가요?';
        dom.authToggleBtn.textContent = '로그인';
    } else {
        dom.authTitle.textContent = '다시 오신 것을 환영합니다';
        dom.authSubtitle.textContent = '계정에 로그인하세요';
        dom.authNameGroup.classList.add('hidden');
        dom.authSubmit.textContent = '로그인';
        dom.authToggleText.textContent = "계정이 없으신가요?";
        dom.authToggleBtn.textContent = '회원가입';
    }
}

function openAuthModal(signUp = false) {
    setAuthMode(signUp);
    dom.authModal.classList.add('active');
    dom.authEmail.focus();
}

function closeAuthModal() {
    dom.authModal.classList.remove('active');
    dom.authForm.reset();
}

// ===== AUTH HANDLER (Firebase-ready) =====
function handleAuth(e) {
    e.preventDefault();
    const email = dom.authEmail.value.trim();
    const password = dom.authPassword.value;
    const name = dom.authName.value.trim();

    if (!email || !password) {
        showToast('모든 필드를 입력해주세요');
        return;
    }

    if (isSignUp && !name) {
        showToast('이름을 입력해주세요');
        return;
    }

    // ── Firebase Auth Integration Point ──
    // When Firebase is configured, replace this with:
    // firebase.auth().createUserWithEmailAndPassword(email, password)
    // firebase.auth().signInWithEmailAndPassword(email, password)

    // For now, simulate authentication
    state.user = {
        email: email,
        displayName: name || email.split('@')[0],
        uid: 'user_' + Date.now(),
    };

    // Load saved data from localStorage
    loadUserData();

    showApp();
    closeAuthModal();
    showToast(isSignUp ? '🎉 계정이 생성되었습니다! 환영합니다!' : '👋 다시 오신 것을 환영합니다!');
}

// ===== APP NAVIGATION =====
function showApp() {
    dom.landingPage.classList.remove('active');
    dom.appPage.classList.add('active');
    dom.userDisplay.textContent = state.user.email;
    updatePlanBadge();
    renderTasks();
    updateStats();
}

function showLanding() {
    dom.appPage.classList.remove('active');
    dom.landingPage.classList.add('active');
}

function handleLogout() {
    // Save data before logout
    saveUserData();

    // Reset timer
    clearInterval(state.timerInterval);
    state.timerRunning = false;
    state.user = null;

    showLanding();
    showToast('로그아웃되었습니다');
}

// ===== TIMER =====
const CIRCLE_LENGTH = 2 * Math.PI * 140; // ~879.64

function setTimerDuration(minutes) {
    clearInterval(state.timerInterval);
    state.timerRunning = false;
    state.timerDuration = minutes * 60;
    state.timerRemaining = minutes * 60;
    updateTimerDisplay();
    dom.iconPlay.classList.remove('hidden');
    dom.iconPause.classList.add('hidden');
    dom.timerProgress.setAttribute('stroke-dashoffset', '0');
}

function updateTimerDisplay() {
    const mins = Math.floor(state.timerRemaining / 60);
    const secs = state.timerRemaining % 60;
    dom.timerTime.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

function startTimer() {
    if (state.timerRunning) {
        // Pause
        clearInterval(state.timerInterval);
        state.timerRunning = false;
        dom.iconPlay.classList.remove('hidden');
        dom.iconPause.classList.add('hidden');
        dom.timerStatus.textContent = '일시 정지';
        return;
    }

    state.timerRunning = true;
    dom.iconPlay.classList.add('hidden');
    dom.iconPause.classList.remove('hidden');
    dom.timerStatus.textContent = state.currentMode === 'focus' ? '집중 중...' : '휴식 중';

    state.timerInterval = setInterval(() => {
        state.timerRemaining--;

        if (state.timerRemaining <= 0) {
            clearInterval(state.timerInterval);
            state.timerRunning = false;
            onTimerComplete();
            return;
        }

        updateTimerDisplay();

        // Update progress ring
        const progress = 1 - (state.timerRemaining / state.timerDuration);
        const offset = CIRCLE_LENGTH * progress;
        dom.timerProgress.setAttribute('stroke-dashoffset', -offset);
    }, 1000);
}

function resetTimer() {
    clearInterval(state.timerInterval);
    state.timerRunning = false;
    state.timerRemaining = state.timerDuration;
    updateTimerDisplay();
    dom.iconPlay.classList.remove('hidden');
    dom.iconPause.classList.add('hidden');
    dom.timerProgress.setAttribute('stroke-dashoffset', '0');
    dom.timerStatus.textContent = '집중 준비 완료';
}

function onTimerComplete() {
    if (state.currentMode === 'focus') {
        state.sessionCount++;
        state.totalFocusMinutes += state.timerDuration / 60;
        dom.sessionCount.textContent = `세션 #${state.sessionCount + 1}`;
        updateFocusDisplay();
        updateStats();
        saveUserData();
        showToast('🎉 집중 세션 완료! 휴식을 취하세요.');

        // Play notification sound (Web API)
        try {
            const audio = new AudioContext();
            const osc = audio.createOscillator();
            const gain = audio.createGain();
            osc.connect(gain);
            gain.connect(audio.destination);
            osc.frequency.value = 800;
            gain.gain.value = 0.3;
            osc.start();
            gain.gain.exponentialRampToValueAtTime(0.001, audio.currentTime + 0.8);
            osc.stop(audio.currentTime + 0.8);
        } catch (err) { /* audio not supported */ }
    } else {
        showToast('휴식 끝! 다시 집중할 준비가 되었습니다.');
    }

    dom.iconPlay.classList.remove('hidden');
    dom.iconPause.classList.add('hidden');
    dom.timerStatus.textContent = '완료!';
    dom.timerProgress.setAttribute('stroke-dashoffset', -CIRCLE_LENGTH);
}

function updateFocusDisplay() {
    const hours = Math.floor(state.totalFocusMinutes / 60);
    const mins = Math.round(state.totalFocusMinutes % 60);
    dom.totalFocus.textContent = `총 집중 시간: ${hours}시간 ${mins}분`;
}

// ===== TASKS =====
function toggleTaskInput() {
    const isHidden = dom.taskInputArea.classList.contains('hidden');
    if (isHidden) {
        // Check free plan limit
        if (!state.isPro && state.tasks.length >= state.maxFreeTasks) {
            openPaymentModal();
            showToast('⚡ 무제한 작업을 위해 Pro로 업그레이드하세요!');
            return;
        }
        dom.taskInputArea.classList.remove('hidden');
        dom.taskInput.focus();
    } else {
        dom.taskInputArea.classList.add('hidden');
    }
}

function saveTask() {
    const text = dom.taskInput.value.trim();
    const est = parseInt(dom.taskEst.value) || 1;

    if (!text) {
        showToast('작업 이름을 입력해주세요');
        return;
    }

    const task = {
        id: ++state.taskIdCounter,
        text,
        estimatedPomodoros: est,
        completedPomodoros: 0,
        done: false,
        createdAt: Date.now(),
    };

    state.tasks.push(task);
    dom.taskInput.value = '';
    dom.taskEst.value = '1';
    dom.taskInputArea.classList.add('hidden');
    renderTasks();
    saveUserData();
    showToast('작업이 추가되었습니다!');
}

function toggleTask(id) {
    const task = state.tasks.find(t => t.id === id);
    if (task) {
        task.done = !task.done;
        if (task.done) {
            state.completedTasks++;
        } else {
            state.completedTasks = Math.max(0, state.completedTasks - 1);
        }
        renderTasks();
        updateStats();
        saveUserData();
    }
}

function deleteTask(id) {
    const task = state.tasks.find(t => t.id === id);
    if (task && task.done) state.completedTasks = Math.max(0, state.completedTasks - 1);
    state.tasks = state.tasks.filter(t => t.id !== id);
    renderTasks();
    updateStats();
    saveUserData();
}

function renderTasks() {
    if (state.tasks.length === 0) {
        dom.taskList.innerHTML = `<div class="task-empty"><p>아직 작업이 없습니다. 하나 추가해서 시작하세요!</p></div>`;
        return;
    }

    dom.taskList.innerHTML = state.tasks.map(task => `
        <div class="task-item" data-id="${task.id}">
            <input type="checkbox" class="task-checkbox" ${task.done ? 'checked' : ''} 
                   onchange="toggleTask(${task.id})">
            <span class="task-text ${task.done ? 'completed' : ''}">${escapeHtml(task.text)}</span>
            <span class="task-pomodoros">🍅 ${task.completedPomodoros}/${task.estimatedPomodoros}</span>
            <button class="task-delete" onclick="deleteTask(${task.id})" title="삭제">✕</button>
        </div>
    `).join('');
}

// ===== STATS =====
function updateStats() {
    dom.statSessions.textContent = state.sessionCount;
    dom.statMinutes.textContent = Math.round(state.totalFocusMinutes);
    dom.statTasks.textContent = state.completedTasks;
    dom.statStreak.textContent = state.streak;
}

// ===== PAYMENT =====
function openPaymentModal() {
    dom.paymentModal.classList.add('active');
    // PayPal 버튼 렌더링 (최초 1회만)
    setTimeout(() => renderPayPalButton(), 100);
}

function closePaymentModal() {
    dom.paymentModal.classList.remove('active');
}

// PayPal 버튼 렌더링 여부 추적
let paypalButtonRendered = false;

function renderPayPalButton() {
    if (paypalButtonRendered) return;
    if (typeof paypal === 'undefined') {
        console.error('PayPal SDK not loaded');
        return;
    }

    paypal.Buttons({
        style: {
            layout: 'vertical',
            color: 'blue',
            shape: 'rect',
            label: 'paypal'
        },
        createOrder: function(data, actions) {
            return actions.order.create({
                purchase_units: [{
                    description: 'FocusFlow Pro Monthly',
                    amount: {
                        value: '4.99',
                        currency_code: 'USD'
                    }
                }]
            });
        },
        onApprove: function(data, actions) {
            return actions.order.capture().then(function(details) {
                console.log('결제 완료:', details);
                state.isPro = true;
                updatePlanBadge();
                closePaymentModal();
                saveUserData();
                showToast('🎉 Pro에 오신 것을 환영합니다! 모든 기능이 잠금 해제되었습니다.');
            });
        },
        onCancel: function(data) {
            showToast('결제가 취소되었습니다.');
        },
        onError: function(err) {
            console.error('PayPal 오류:', err);
            showToast('❌ 결제에 실패했습니다. 다시 시도해주세요.');
        }
    }).render('#paypal-button-container');

    paypalButtonRendered = true;
}

function updatePlanBadge() {
    if (state.isPro) {
        dom.userPlanBadge.textContent = 'PRO';
        dom.userPlanBadge.className = 'plan-badge plan-pro';
        $('#btn-upgrade-header').classList.add('hidden');
    } else {
        dom.userPlanBadge.textContent = '무료';
        dom.userPlanBadge.className = 'plan-badge plan-free';
        $('#btn-upgrade-header').classList.remove('hidden');
    }
}

// ===== DATA PERSISTENCE =====
function saveUserData() {
    if (!state.user) return;

    // ── Firebase Firestore Integration Point ──
    // When Firebase is configured, replace with:
    // firebase.firestore().collection('users').doc(state.user.uid).set({...})

    const data = {
        tasks: state.tasks,
        taskIdCounter: state.taskIdCounter,
        sessionCount: state.sessionCount,
        totalFocusMinutes: state.totalFocusMinutes,
        completedTasks: state.completedTasks,
        streak: state.streak,
        isPro: state.isPro,
        lastSaved: Date.now(),
    };
    localStorage.setItem(`focusflow_${state.user.uid}`, JSON.stringify(data));
}

function loadUserData() {
    if (!state.user) return;

    const raw = localStorage.getItem(`focusflow_${state.user.uid}`);
    if (raw) {
        try {
            const data = JSON.parse(raw);
            state.tasks = data.tasks || [];
            state.taskIdCounter = data.taskIdCounter || 0;
            state.sessionCount = data.sessionCount || 0;
            state.totalFocusMinutes = data.totalFocusMinutes || 0;
            state.completedTasks = data.completedTasks || 0;
            state.streak = data.streak || 0;
            state.isPro = data.isPro || false;

            // Check streak
            const lastDate = new Date(data.lastSaved).toDateString();
            const today = new Date().toDateString();
            const yesterday = new Date(Date.now() - 86400000).toDateString();
            if (lastDate === today) {
                // Same day, keep streak
            } else if (lastDate === yesterday) {
                state.streak++;
            } else {
                state.streak = state.sessionCount > 0 ? 1 : 0;
            }
        } catch (e) {
            console.error('Failed to load user data:', e);
        }
    }
}

// ===== TOAST =====
function showToast(message, duration = 3000) {
    dom.toast.textContent = message;
    dom.toast.classList.add('show');
    setTimeout(() => dom.toast.classList.remove('show'), duration);
}

// ===== UTILS =====
function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

// ===== EVENT LISTENERS =====
function init() {
    // Nav buttons
    $('#btn-login-nav').addEventListener('click', () => openAuthModal(false));
    $('#btn-signup-nav').addEventListener('click', () => openAuthModal(true));
    $('#btn-hero-start').addEventListener('click', () => openAuthModal(true));
    $('#btn-free-plan').addEventListener('click', () => openAuthModal(true));
    $('#btn-pro-plan').addEventListener('click', () => openAuthModal(true));

    // Auth
    dom.authForm.addEventListener('submit', handleAuth);
    dom.authToggleBtn.addEventListener('click', () => setAuthMode(!isSignUp));
    dom.authClose.addEventListener('click', closeAuthModal);
    dom.authModal.querySelector('.modal-overlay').addEventListener('click', closeAuthModal);

    // Logout
    $('#btn-logout').addEventListener('click', handleLogout);

    // Timer
    dom.btnStart.addEventListener('click', startTimer);
    dom.btnReset.addEventListener('click', resetTimer);

    dom.timerTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            dom.timerTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            const duration = parseInt(tab.dataset.duration);
            state.currentMode = duration === 25 ? 'focus' : (duration === 5 ? 'short' : 'long');
            setTimerDuration(duration);
        });
    });

    // Tasks
    dom.btnAddTask.addEventListener('click', toggleTaskInput);
    dom.btnSaveTask.addEventListener('click', saveTask);
    dom.btnCancelTask.addEventListener('click', () => dom.taskInputArea.classList.add('hidden'));
    dom.taskInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') saveTask();
        if (e.key === 'Escape') dom.taskInputArea.classList.add('hidden');
    });

    // Payment
    $('#btn-upgrade-header').addEventListener('click', openPaymentModal);
    dom.paymentClose.addEventListener('click', closePaymentModal);
    dom.paymentModal.querySelector('.modal-overlay').addEventListener('click', closePaymentModal);

    // Mobile menu
    $('#mobile-menu-btn').addEventListener('click', () => {
        const nav = $('.nav-links');
        nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
    });

    // Smooth scroll for nav links
    $$('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            if (target) target.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if (dom.appPage.classList.contains('active')) {
            if (e.key === ' ' && document.activeElement.tagName !== 'INPUT') {
                e.preventDefault();
                startTimer();
            }
        }
        if (e.key === 'Escape') {
            closeAuthModal();
            closePaymentModal();
        }
    });

    // Initialize timer display
    updateTimerDisplay();
}

// Start the application
document.addEventListener('DOMContentLoaded', init);
