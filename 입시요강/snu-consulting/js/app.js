/**
 * SNU Consulting - 서울대 입시 컨설팅 시스템
 * 메인 애플리케이션 JavaScript
 */

// 전역 변수
let snuData = null;
let userInput = {
    korean: 0,
    math: 0,
    english: 0,
    explore: 0,
    track: '인문',
    naesin: 0,
    mbti: ''
};

// 초기화
document.addEventListener('DOMContentLoaded', async () => {
    await loadData();
    initTabEvents();
    initNavEvents();
    populateCollegeDropdown();
});

// 데이터 로드
async function loadData() {
    try {
        const response = await fetch('data/snu_departments.json');
        snuData = await response.json();
        console.log('서울대 학과 데이터 로드 완료:', snuData.colleges.length, '개 단과대학');
    } catch (error) {
        console.error('데이터 로드 실패:', error);
        alert('데이터를 불러오는데 실패했습니다. 페이지를 새로고침 해주세요.');
    }
}

// 탭 이벤트 초기화
function initTabEvents() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.dataset.tab;

            // 버튼 활성화
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // 컨텐츠 활성화
            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
            });
            document.getElementById(`tab-${tabId}`).classList.add('active');
        });
    });
}

// 네비게이션 이벤트
function initNavEvents() {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            scrollToSection(targetId);

            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });
}

// 섹션으로 스크롤
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// 다음 단계로
function nextStep(stepNum) {
    // 현재 단계 유효성 검사
    if (stepNum === 2) {
        if (!validateStep1()) return;
    } else if (stepNum === 3) {
        if (!validateStep2()) return;
    }

    // 단계 전환
    document.querySelectorAll('.form-step').forEach(step => step.classList.add('hidden'));
    document.getElementById(`step${stepNum}`).classList.remove('hidden');

    // 인디케이터 업데이트
    document.querySelectorAll('.step').forEach((step, idx) => {
        if (idx < stepNum) {
            step.classList.add('active');
        } else {
            step.classList.remove('active');
        }
    });
}

// 이전 단계로
function prevStep(stepNum) {
    document.querySelectorAll('.form-step').forEach(step => step.classList.add('hidden'));
    document.getElementById(`step${stepNum}`).classList.remove('hidden');

    document.querySelectorAll('.step').forEach((step, idx) => {
        if (idx < stepNum) {
            step.classList.add('active');
        } else {
            step.classList.remove('active');
        }
    });
}

// Step 1 유효성 검사
function validateStep1() {
    const korean = parseInt(document.getElementById('korean').value);
    const math = parseInt(document.getElementById('math').value);
    const english = document.getElementById('english').value;
    const explore = parseInt(document.getElementById('explore').value);

    if (isNaN(korean) || korean < 0 || korean > 100) {
        alert('국어 점수를 올바르게 입력해주세요 (0~100)');
        return false;
    }
    if (isNaN(math) || math < 0 || math > 100) {
        alert('수학 점수를 올바르게 입력해주세요 (0~100)');
        return false;
    }
    if (!english) {
        alert('영어 등급을 선택해주세요');
        return false;
    }
    if (isNaN(explore) || explore < 0 || explore > 100) {
        alert('탐구 점수를 올바르게 입력해주세요 (0~100)');
        return false;
    }

    // 값 저장
    userInput.korean = korean;
    userInput.math = math;
    userInput.english = parseInt(english);
    userInput.explore = explore;
    userInput.track = document.querySelector('input[name="track"]:checked').value;

    return true;
}

// Step 2 유효성 검사
function validateStep2() {
    const naesin = parseFloat(document.getElementById('naesin').value);

    if (isNaN(naesin) || naesin < 1 || naesin > 9) {
        alert('내신 등급을 올바르게 입력해주세요 (1.0~9.0)');
        return false;
    }

    userInput.naesin = naesin;
    return true;
}

// 분석 및 추천 실행
function analyzeAndRecommend() {
    // MBTI 값 저장
    const mbtiRadio = document.querySelector('input[name="mbti"]:checked');
    userInput.mbti = mbtiRadio ? mbtiRadio.value : '';

    // 데이터 확인
    if (!snuData) {
        alert('데이터를 불러오는 중입니다. 잠시 후 다시 시도해주세요.');
        return;
    }

    // 사용자 요약 표시
    displayUserSummary();

    // 학과 분석 및 분류
    const analysis = analyzeAllDepartments();

    // 결과 표시
    displayResults(analysis);

    // 결과 섹션 표시 및 스크롤
    document.getElementById('result').classList.remove('hidden');
    scrollToSection('result');
}

// 사용자 입력 요약 표시
function displayUserSummary() {
    const summaryDiv = document.getElementById('userSummary');

    summaryDiv.innerHTML = `
        <div class="summary-item">
            <span class="summary-label">국어</span>
            <span class="summary-value">${userInput.korean}점</span>
        </div>
        <div class="summary-item">
            <span class="summary-label">수학</span>
            <span class="summary-value">${userInput.math}점</span>
        </div>
        <div class="summary-item">
            <span class="summary-label">영어</span>
            <span class="summary-value">${userInput.english}등급</span>
        </div>
        <div class="summary-item">
            <span class="summary-label">탐구</span>
            <span class="summary-value">${userInput.explore}점</span>
        </div>
        <div class="summary-item">
            <span class="summary-label">내신</span>
            <span class="summary-value">${userInput.naesin}등급</span>
        </div>
        <div class="summary-item">
            <span class="summary-label">계열</span>
            <span class="summary-value">${userInput.track}</span>
        </div>
        <div class="summary-item">
            <span class="summary-label">MBTI</span>
            <span class="summary-value">${userInput.mbti || '-'}</span>
        </div>
        <div class="summary-item">
            <span class="summary-label">총점</span>
            <span class="summary-value">${calculateTotalScore().toFixed(1)}</span>
        </div>
    `;
}

// 총점 계산 (서울대 반영비율 적용)
function calculateTotalScore() {
    // 서울대 정시 반영비율: 국어 33.3%, 수학 40%, 탐구 26.7%
    const koreanWeighted = userInput.korean * 0.333;
    const mathWeighted = userInput.math * 1.2 * 0.333; // 수학 가중치 1.2
    const exploreWeighted = userInput.explore * 0.8 * 0.333; // 탐구 가중치 0.8

    return koreanWeighted + mathWeighted + exploreWeighted;
}

// 전체 학과 분석
function analyzeAllDepartments() {
    const safe = [];      // 안정
    const match = [];     // 적정
    const challenge = []; // 상향
    const mbtiMatch = []; // MBTI 매칭

    snuData.colleges.forEach(college => {
        // 계열 필터링
        if (userInput.track !== '예체능' && college.type === '예체능') return;
        if (userInput.track === '인문' && college.type === '자연') return;
        if (userInput.track === '자연' && college.type === '인문') return;

        college.departments.forEach(dept => {
            const analysis = analyzeDepartment(dept, college.name);

            // 점수 기반 분류
            if (analysis.matchLevel === 'safe') {
                safe.push(analysis);
            } else if (analysis.matchLevel === 'match') {
                match.push(analysis);
            } else if (analysis.matchLevel === 'challenge') {
                challenge.push(analysis);
            }

            // MBTI 기반 분류
            if (userInput.mbti && dept.mbti.includes(userInput.mbti)) {
                mbtiMatch.push({
                    ...analysis,
                    mbtiRank: dept.mbti.indexOf(userInput.mbti) + 1
                });
            }
        });
    });

    // 정렬
    safe.sort((a, b) => b.score - a.score);
    match.sort((a, b) => b.score - a.score);
    challenge.sort((a, b) => a.gap - b.gap);
    mbtiMatch.sort((a, b) => a.mbtiRank - b.mbtiRank);

    return { safe, match, challenge, mbtiMatch };
}

// 개별 학과 분석
function analyzeDepartment(dept, collegeName) {
    const cutline = dept.cutline;

    // 사용자 점수와 커트라인 비교
    const koreanDiff = userInput.korean - cutline.korean;
    const mathDiff = userInput.math - cutline.math;
    const englishDiff = cutline.english - userInput.english; // 등급은 낮을수록 좋음
    const exploreDiff = userInput.explore - cutline.explore;
    const naesinDiff = dept.naesin - userInput.naesin; // 등급은 낮을수록 좋음

    // 종합 점수 계산
    const score = (koreanDiff * 0.333) + (mathDiff * 0.4) + (exploreDiff * 0.267);
    const gap = Math.abs(score);

    // 매칭 레벨 결정
    let matchLevel;
    let matchPercent;

    if (score >= 3 && englishDiff >= 0 && naesinDiff >= 0) {
        matchLevel = 'safe';
        matchPercent = Math.min(95, 70 + score * 3);
    } else if (score >= -2 && score < 3) {
        matchLevel = 'match';
        matchPercent = Math.min(70, 50 + score * 5);
    } else if (score >= -5) {
        matchLevel = 'challenge';
        matchPercent = Math.max(20, 40 + score * 5);
    } else {
        matchLevel = 'unlikely';
        matchPercent = Math.max(5, 20 + score * 3);
    }

    return {
        name: dept.name,
        code: dept.code,
        college: collegeName,
        cutline: {
            korean: cutline.korean,
            math: cutline.math,
            explore: cutline.explore
        },
        naesin: dept.naesin,
        score: score,
        gap: gap,
        matchLevel: matchLevel,
        matchPercent: Math.round(matchPercent),
        mbti: dept.mbti,
        keywords: dept.keywords,
        career: dept.career
    };
}

// 결과 표시
function displayResults(analysis) {
    displayDeptList('safeList', analysis.safe, 'safe');
    displayDeptList('matchList', analysis.match, 'match');
    displayDeptList('challengeList', analysis.challenge, 'challenge');
    displayDeptList('mbtiList', analysis.mbtiMatch, 'mbti-match');
}

// 학과 목록 표시
function displayDeptList(containerId, depts, type) {
    const container = document.getElementById(containerId);

    if (depts.length === 0) {
        container.innerHTML = `
            <div class="no-results">
                <p>해당하는 학과가 없습니다.</p>
                <p>다른 탭을 확인해 보세요.</p>
            </div>
        `;
        return;
    }

    // 최대 10개만 표시
    const displayDepts = depts.slice(0, 10);

    container.innerHTML = displayDepts.map(dept => `
        <div class="dept-card ${type}">
            <div class="dept-info">
                <h4>${dept.name}</h4>
                <span class="dept-college">${dept.college}</span>
                <div class="dept-keywords">
                    ${dept.keywords.slice(0, 3).map(k => `<span class="keyword">#${k}</span>`).join(' ')}
                </div>
            </div>
            <div class="dept-meta">
                <div class="dept-score">
                    <span class="score-label">예상 커트라인</span>
                    <span class="score-value">국${dept.cutline.korean} 수${dept.cutline.math}</span>
                </div>
                <div class="dept-score">
                    <span class="score-label">내신기준</span>
                    <span class="score-value">${dept.naesin}등급</span>
                </div>
                <span class="dept-match ${getMatchClass(dept.matchPercent)}">${dept.matchPercent}%</span>
            </div>
        </div>
    `).join('');
}

// 매칭 클래스 반환
function getMatchClass(percent) {
    if (percent >= 70) return 'high';
    if (percent >= 40) return 'medium';
    return 'low';
}

// 폼 초기화
function resetForm() {
    // 입력 필드 초기화
    document.getElementById('korean').value = '';
    document.getElementById('math').value = '';
    document.getElementById('english').value = '';
    document.getElementById('explore').value = '';
    document.getElementById('naesin').value = '';

    // 라디오 버튼 초기화
    document.querySelector('input[name="track"][value="인문"]').checked = true;
    document.querySelectorAll('input[name="mbti"]').forEach(r => r.checked = false);

    // Step 1로 이동
    document.querySelectorAll('.form-step').forEach(step => step.classList.add('hidden'));
    document.getElementById('step1').classList.remove('hidden');

    // 인디케이터 초기화
    document.querySelectorAll('.step').forEach((step, idx) => {
        if (idx === 0) {
            step.classList.add('active');
        } else {
            step.classList.remove('active');
        }
    });

    // 결과 섹션 숨기기
    document.getElementById('result').classList.add('hidden');

    // 입력 섹션으로 스크롤
    scrollToSection('input');
}

// 결과 인쇄
function printResult() {
    window.print();
}

// 키워드 스타일 추가
const style = document.createElement('style');
style.textContent = `
    .dept-keywords {
        margin-top: 8px;
    }
    .keyword {
        display: inline-block;
        padding: 2px 8px;
        background: var(--gray-200);
        border-radius: 10px;
        font-size: 0.75rem;
        color: var(--gray-600);
        margin-right: 5px;
    }
`;
document.head.appendChild(style);

// ============================================
// 목표 학과 분석 기능
// ============================================

// 단과대학 드롭다운 초기화
function populateCollegeDropdown() {
    const collegeSelect = document.getElementById('targetCollege');
    if (!collegeSelect || !snuData) return;

    // 데이터가 아직 로드되지 않았으면 재시도
    if (!snuData) {
        setTimeout(populateCollegeDropdown, 500);
        return;
    }

    snuData.colleges.forEach(college => {
        const option = document.createElement('option');
        option.value = college.name;
        option.textContent = `${college.name} (${college.departments.length}개 학과)`;
        collegeSelect.appendChild(option);
    });
}

// 학과 목록 업데이트
function updateDepartmentList() {
    const collegeSelect = document.getElementById('targetCollege');
    const deptSelect = document.getElementById('targetDept');

    if (!collegeSelect || !deptSelect || !snuData) return;

    const selectedCollege = collegeSelect.value;

    // 학과 선택 초기화
    deptSelect.innerHTML = '<option value="">학과 선택</option>';

    if (!selectedCollege) {
        // 결과 숨기기
        document.getElementById('targetResult').classList.add('hidden');
        return;
    }

    // 선택된 단과대학의 학과 목록 추가
    const college = snuData.colleges.find(c => c.name === selectedCollege);
    if (college) {
        college.departments.forEach(dept => {
            const option = document.createElement('option');
            option.value = dept.code;
            option.textContent = dept.name;
            deptSelect.appendChild(option);
        });
    }

    // 결과 숨기기
    document.getElementById('targetResult').classList.add('hidden');
}

// 목표 학과 분석 표시
function showTargetAnalysis() {
    const collegeSelect = document.getElementById('targetCollege');
    const deptSelect = document.getElementById('targetDept');

    if (!collegeSelect || !deptSelect || !snuData) return;

    const selectedCollege = collegeSelect.value;
    const selectedDeptCode = deptSelect.value;

    if (!selectedCollege || !selectedDeptCode) {
        document.getElementById('targetResult').classList.add('hidden');
        return;
    }

    // 학과 정보 찾기
    const college = snuData.colleges.find(c => c.name === selectedCollege);
    if (!college) return;

    const dept = college.departments.find(d => d.code === selectedDeptCode);
    if (!dept) return;

    // 현재 성적 가져오기
    const myKorean = parseFloat(document.getElementById('myKorean').value) || null;
    const myMath = parseFloat(document.getElementById('myMath').value) || null;
    const myEnglish = parseInt(document.getElementById('myEnglish').value) || null;
    const myExplore = parseFloat(document.getElementById('myExplore').value) || null;
    const myNaesin = parseFloat(document.getElementById('myNaesin').value) || null;

    // 학과 정보 표시
    displayTargetDeptInfo(dept, college.name);

    // 점수 비교 테이블 표시
    displayScoreComparison(dept, myKorean, myMath, myEnglish, myExplore, myNaesin);

    // 점수 차이 요약 표시
    displayScoreGap(dept, myKorean, myMath, myEnglish, myExplore, myNaesin);

    // 학습 조언 표시
    displayStudyAdvice(dept, myKorean, myMath, myEnglish, myExplore, myNaesin);

    // 결과 표시
    document.getElementById('targetResult').classList.remove('hidden');
}

// 학과 정보 표시
function displayTargetDeptInfo(dept, collegeName) {
    const container = document.getElementById('targetDeptInfo');
    container.innerHTML = `
        <h3>${dept.name}</h3>
        <p class="college-name">${collegeName}</p>
        <div class="dept-keywords">
            ${dept.keywords.map(k => `<span class="keyword">#${k}</span>`).join(' ')}
        </div>
    `;
}

// 점수 비교 테이블 표시
function displayScoreComparison(dept, myKorean, myMath, myEnglish, myExplore, myNaesin) {
    const container = document.getElementById('scoreTable');
    const cutline = dept.cutline;

    const formatGap = (my, required, isGrade = false) => {
        if (my === null) return { text: '-', class: 'neutral' };
        const diff = isGrade ? (required - my) : (my - required);
        if (diff >= 0) return { text: `+${diff.toFixed(1)}`, class: 'positive' };
        return { text: diff.toFixed(1), class: 'negative' };
    };

    // 영어 감점 계산 함수
    const getEnglishDeduction = (grade) => {
        const deductions = { 1: 0, 2: -0.5, 3: -1.0, 4: -1.5, 5: -2.0 };
        return deductions[grade] || 0;
    };

    const formatEnglishGap = (my, required) => {
        if (my === null) return { text: '-', class: 'neutral' };
        const diff = required - my; // 등급은 낮을수록 좋음
        if (diff >= 0) return { text: '충족', class: 'positive' };
        return { text: `${diff}등급`, class: 'negative' };
    };

    const rows = [
        {
            subject: '국어',
            required: cutline.korean + '점',
            current: myKorean !== null ? myKorean + '점' : '-',
            gap: formatGap(myKorean, cutline.korean)
        },
        {
            subject: '수학',
            required: cutline.math + '점',
            current: myMath !== null ? myMath + '점' : '-',
            gap: formatGap(myMath, cutline.math)
        },
        {
            subject: '영어',
            required: cutline.english + '등급 (감점 ' + getEnglishDeduction(cutline.english) + ')',
            current: myEnglish !== null ? myEnglish + '등급 (감점 ' + getEnglishDeduction(myEnglish) + ')' : '-',
            gap: formatEnglishGap(myEnglish, cutline.english)
        },
        {
            subject: '탐구',
            required: cutline.explore + '점',
            current: myExplore !== null ? myExplore + '점' : '-',
            gap: formatGap(myExplore, cutline.explore)
        },
        {
            subject: '내신',
            required: dept.naesin + '등급 이내',
            current: myNaesin !== null ? myNaesin + '등급' : '-',
            gap: formatGap(myNaesin, dept.naesin, true)
        }
    ];

    container.innerHTML = `
        <div class="score-row header">
            <span>과목</span>
            <span>목표</span>
            <span>내 점수</span>
            <span>차이</span>
        </div>
        ${rows.map(row => `
            <div class="score-row">
                <span class="subject">${row.subject}</span>
                <span class="required">${row.required}</span>
                <span class="current">${row.current}</span>
                <span class="gap ${row.gap.class}">${row.gap.text}</span>
            </div>
        `).join('')}
    `;
}

// 점수 차이 요약 표시
function displayScoreGap(dept, myKorean, myMath, myEnglish, myExplore, myNaesin) {
    const container = document.getElementById('scoreGap');
    const cutline = dept.cutline;

    // 점수가 입력되지 않은 경우
    if (myKorean === null && myMath === null && myExplore === null) {
        container.innerHTML = `
            <h3>합격 가능성 분석</h3>
            <div class="overall-verdict match">
                현재 성적을 입력하면 자세한 분석을 볼 수 있습니다
            </div>
        `;
        return;
    }

    // 영어 감점 계산
    const getEnglishDeduction = (grade) => {
        const deductions = { 1: 0, 2: -0.5, 3: -1.0, 4: -1.5, 5: -2.0 };
        return deductions[grade] || 0;
    };

    // 종합 점수 계산 (영어 감점 포함)
    const userScore = ((myKorean || 0) * 0.333) + ((myMath || 0) * 0.4) + ((myExplore || 0) * 0.267);
    const cutlineScore = (cutline.korean * 0.333) + (cutline.math * 0.4) + (cutline.explore * 0.267);
    const englishPenalty = myEnglish ? getEnglishDeduction(myEnglish) - getEnglishDeduction(cutline.english) : 0;
    const scoreDiff = userScore - cutlineScore + englishPenalty;

    // 합격 가능성 판단
    let verdict, verdictClass, verdictText;
    if (scoreDiff >= 3) {
        verdict = 'safe';
        verdictClass = 'safe';
        verdictText = '안정권! 합격 가능성이 높습니다.';
    } else if (scoreDiff >= -2) {
        verdict = 'match';
        verdictClass = 'match';
        verdictText = '적정권! 충분히 도전해볼 만합니다.';
    } else if (scoreDiff >= -5) {
        verdict = 'challenge';
        verdictClass = 'challenge';
        verdictText = '도전권! 더 노력이 필요합니다.';
    } else {
        verdict = 'unlikely';
        verdictClass = 'unlikely';
        verdictText = '목표 달성을 위해 많은 노력이 필요합니다.';
    }

    // 과목별 차이 계산
    const koreanGap = myKorean !== null ? myKorean - cutline.korean : null;
    const mathGap = myMath !== null ? myMath - cutline.math : null;
    const englishGap = myEnglish !== null ? cutline.english - myEnglish : null; // 등급은 반대로
    const exploreGap = myExplore !== null ? myExplore - cutline.explore : null;

    const getGapClass = (gap) => {
        if (gap === null) return '';
        if (gap >= 0) return 'success';
        if (gap >= -5) return 'warning';
        return 'danger';
    };

    const getEnglishGapClass = (gap) => {
        if (gap === null) return '';
        if (gap >= 0) return 'success';
        return 'warning';
    };

    container.innerHTML = `
        <h3>과목별 달성률</h3>
        <div class="gap-summary">
            <div class="gap-item ${getGapClass(koreanGap)}">
                <span class="gap-label">국어</span>
                <span class="gap-value">${koreanGap !== null ? (koreanGap >= 0 ? '+' : '') + koreanGap.toFixed(0) + '점' : '-'}</span>
            </div>
            <div class="gap-item ${getGapClass(mathGap)}">
                <span class="gap-label">수학</span>
                <span class="gap-value">${mathGap !== null ? (mathGap >= 0 ? '+' : '') + mathGap.toFixed(0) + '점' : '-'}</span>
            </div>
            <div class="gap-item ${getEnglishGapClass(englishGap)}">
                <span class="gap-label">영어</span>
                <span class="gap-value">${englishGap !== null ? (englishGap >= 0 ? '충족' : englishGap + '등급') : '-'}</span>
            </div>
            <div class="gap-item ${getGapClass(exploreGap)}">
                <span class="gap-label">탐구</span>
                <span class="gap-value">${exploreGap !== null ? (exploreGap >= 0 ? '+' : '') + exploreGap.toFixed(0) + '점' : '-'}</span>
            </div>
        </div>
        <div class="overall-verdict ${verdictClass}">
            ${verdictText}
        </div>
    `;
}

// 학습 조언 표시
function displayStudyAdvice(dept, myKorean, myMath, myEnglish, myExplore, myNaesin) {
    const container = document.getElementById('studyAdvice');
    const cutline = dept.cutline;
    const advices = [];

    // 영어 감점 계산
    const getEnglishDeduction = (grade) => {
        const deductions = { 1: 0, 2: -0.5, 3: -1.0, 4: -1.5, 5: -2.0 };
        return deductions[grade] || 0;
    };

    // 점수 차이에 따른 조언 생성
    if (myKorean !== null && myKorean < cutline.korean) {
        const gap = cutline.korean - myKorean;
        advices.push({
            icon: '📚',
            text: `<strong>국어</strong>: ${gap.toFixed(0)}점 향상 필요. 비문학 독해와 문학 분석 능력을 강화하세요.`
        });
    }

    if (myMath !== null && myMath < cutline.math) {
        const gap = cutline.math - myMath;
        advices.push({
            icon: '📐',
            text: `<strong>수학</strong>: ${gap.toFixed(0)}점 향상 필요. 수학은 반영비율이 40%로 가장 높으니 집중 투자하세요.`
        });
    }

    if (myEnglish !== null && myEnglish > cutline.english) {
        const gap = myEnglish - cutline.english;
        const deductionDiff = getEnglishDeduction(myEnglish) - getEnglishDeduction(cutline.english);
        advices.push({
            icon: '🔤',
            text: `<strong>영어</strong>: ${gap}등급 향상 필요. 현재 ${myEnglish}등급(감점 ${getEnglishDeduction(myEnglish)}점)에서 ${cutline.english}등급(감점 ${getEnglishDeduction(cutline.english)}점)으로 올리면 ${Math.abs(deductionDiff).toFixed(1)}점 이득입니다.`
        });
    }

    if (myExplore !== null && myExplore < cutline.explore) {
        const gap = cutline.explore - myExplore;
        advices.push({
            icon: '🔬',
            text: `<strong>탐구</strong>: ${gap.toFixed(0)}점 향상 필요. 개념 정리와 기출문제 풀이를 병행하세요.`
        });
    }

    if (myNaesin !== null && myNaesin > dept.naesin) {
        const gap = myNaesin - dept.naesin;
        advices.push({
            icon: '📝',
            text: `<strong>내신</strong>: ${gap.toFixed(1)}등급 향상 필요. 수시 지원 시 불리할 수 있으니 정시에 집중하거나 내신 관리를 강화하세요.`
        });
    }

    // 모든 점수가 달성된 경우
    if (advices.length === 0 && (myKorean !== null || myMath !== null || myExplore !== null)) {
        advices.push({
            icon: '🎉',
            text: '현재 성적이 목표 점수를 달성했습니다! 꾸준히 유지하면서 실전 감각을 키우세요.'
        });
    }

    // 기본 조언 추가
    advices.push({
        icon: '📊',
        text: `<strong>${dept.name}</strong>의 예상 커트라인: 국어 ${cutline.korean}점, 수학 ${cutline.math}점, 영어 ${cutline.english}등급, 탐구 ${cutline.explore}점`
    });

    advices.push({
        icon: '💡',
        text: `적합 진로: ${dept.career.slice(0, 3).join(', ')}`
    });

    container.innerHTML = `
        <h3>맞춤 학습 가이드</h3>
        <ul class="advice-list">
            ${advices.map(advice => `
                <li>
                    <span class="advice-icon">${advice.icon}</span>
                    <span class="advice-text">${advice.text}</span>
                </li>
            `).join('')}
        </ul>
    `;
}

// 콘솔 로그
console.log('SNU Consulting 앱 로드 완료');
