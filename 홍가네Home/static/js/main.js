// Family Connect - Main JavaScript

document.addEventListener('DOMContentLoaded', function() {
    console.log('Family Connect loaded!');
});

// 좋아요 기능
function likePost(postId) {
    fetch(`/feed/like/${postId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // 좋아요 카운트 업데이트
            const likeBtn = document.querySelector(`[onclick="likePost(${postId})"] .like-count`);
            if (likeBtn) {
                likeBtn.textContent = parseInt(likeBtn.textContent) + 1;
            }
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

// 댓글 토글
function toggleComment(postId) {
    const section = document.getElementById(`comments-${postId}`);
    if (section) {
        section.classList.toggle('show');
    }
}

// 시간 포맷
function formatTime(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now - date;

    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return '방금 전';
    if (minutes < 60) return `${minutes}분 전`;
    if (hours < 24) return `${hours}시간 전`;
    if (days < 7) return `${days}일 전`;

    return dateString;
}
