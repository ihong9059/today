// 벚꽃 애니메이션
document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('sakuraContainer');
    if (!container) return;

    // 벚꽃 생성
    function createSakura() {
        const sakura = document.createElement('div');
        sakura.className = 'sakura';

        // 랜덤 시작 위치
        sakura.style.left = Math.random() * 100 + 'vw';

        // 랜덤 크기
        const size = Math.random() * 10 + 8;
        sakura.style.width = size + 'px';
        sakura.style.height = size + 'px';

        // 랜덤 색상 (분홍색 계열)
        const colors = ['#ffb7c5', '#ffc0cb', '#ff91a4', '#ffaeb9', '#ffd1dc'];
        sakura.style.background = colors[Math.floor(Math.random() * colors.length)];

        // 랜덤 애니메이션 지속 시간
        const duration = Math.random() * 5 + 8;
        sakura.style.animationDuration = duration + 's';

        // 랜덤 딜레이
        sakura.style.animationDelay = Math.random() * 5 + 's';

        container.appendChild(sakura);

        // 애니메이션 끝나면 제거 후 재생성
        setTimeout(() => {
            sakura.remove();
            createSakura();
        }, (duration + 5) * 1000);
    }

    // 초기 벚꽃 생성 (15개)
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            createSakura();
        }, i * 300);
    }
});
