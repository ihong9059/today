"""
홍가네 - 가족 소통 플랫폼
Flask 웹 서버
"""

from flask import Flask, render_template, request, jsonify, redirect, url_for, send_from_directory
import json
import os
import uuid
from datetime import datetime
from werkzeug.utils import secure_filename

app = Flask(__name__)
app.config['SECRET_KEY'] = 'family-connect-secret-2026'
app.config['UPLOAD_FOLDER'] = 'data/uploads'
app.config['MAX_CONTENT_LENGTH'] = 50 * 1024 * 1024  # 50MB max

# 허용된 파일 확장자
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif', 'webp', 'heic', 'mp4', 'mov'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# 데이터 폴더 생성
os.makedirs('data/uploads', exist_ok=True)

# 데이터 파일 경로
POSTS_FILE = 'data/posts.json'
MEMBERS_FILE = 'data/members.json'

def load_json(filepath):
    """JSON 파일 로드"""
    if os.path.exists(filepath):
        with open(filepath, 'r', encoding='utf-8') as f:
            return json.load(f)
    return []

def save_json(filepath, data):
    """JSON 파일 저장"""
    with open(filepath, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

def init_data():
    """초기 데이터 생성"""
    if not os.path.exists(MEMBERS_FILE):
        members = [
            {"id": 1, "name": "아빠", "emoji": "👨", "color": "#4A90D9"},
            {"id": 2, "name": "엄마", "emoji": "👩", "color": "#E91E63"},
            {"id": 3, "name": "아들", "emoji": "👦", "color": "#4CAF50"},
            {"id": 4, "name": "딸", "emoji": "👧", "color": "#FF9800"}
        ]
        save_json(MEMBERS_FILE, members)

    if not os.path.exists(POSTS_FILE):
        posts = [
            {
                "id": 1,
                "member_id": 1,
                "content": "가족 소통 플랫폼을 만들었어요! 앞으로 여기서 소식 나눠요.",
                "created_at": datetime.now().strftime("%Y-%m-%d %H:%M"),
                "likes": 3,
                "comments": [
                    {"member_id": 2, "text": "좋은 생각이에요!", "created_at": datetime.now().strftime("%Y-%m-%d %H:%M")}
                ]
            }
        ]
        save_json(POSTS_FILE, posts)

init_data()

@app.route('/')
def index():
    """메인 페이지"""
    members = load_json(MEMBERS_FILE)
    posts = load_json(POSTS_FILE)
    # 최신 글 3개
    recent_posts = sorted(posts, key=lambda x: x['id'], reverse=True)[:3]
    return render_template('index.html', members=members, recent_posts=recent_posts)

@app.route('/feed')
def feed():
    """가족 피드 페이지"""
    members = load_json(MEMBERS_FILE)
    posts = load_json(POSTS_FILE)
    posts = sorted(posts, key=lambda x: x['id'], reverse=True)
    return render_template('feed.html', members=members, posts=posts)

@app.route('/feed/post', methods=['POST'])
def add_post():
    """새 글 작성 (사진 포함)"""
    posts = load_json(POSTS_FILE)

    # 사진 업로드 처리
    photos = []
    if 'photos' in request.files:
        files = request.files.getlist('photos')
        for file in files:
            if file and file.filename and allowed_file(file.filename):
                # 고유한 파일명 생성
                ext = file.filename.rsplit('.', 1)[1].lower()
                filename = f"{uuid.uuid4().hex}.{ext}"
                filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
                file.save(filepath)
                photos.append(filename)

    new_post = {
        "id": max([p['id'] for p in posts], default=0) + 1,
        "member_id": int(request.form.get('member_id', 1)),
        "content": request.form.get('content', ''),
        "photos": photos,
        "created_at": datetime.now().strftime("%Y-%m-%d %H:%M"),
        "likes": 0,
        "comments": []
    }
    posts.append(new_post)
    save_json(POSTS_FILE, posts)
    return redirect(url_for('feed'))

@app.route('/uploads/<filename>')
def uploaded_file(filename):
    """업로드된 파일 제공"""
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

@app.route('/feed/like/<int:post_id>', methods=['POST'])
def like_post(post_id):
    """좋아요"""
    posts = load_json(POSTS_FILE)
    for post in posts:
        if post['id'] == post_id:
            post['likes'] = post.get('likes', 0) + 1
            break
    save_json(POSTS_FILE, posts)
    return jsonify({"success": True})

@app.route('/feed/comment/<int:post_id>', methods=['POST'])
def add_comment(post_id):
    """댓글 추가"""
    posts = load_json(POSTS_FILE)
    for post in posts:
        if post['id'] == post_id:
            comment = {
                "member_id": int(request.form.get('member_id', 1)),
                "text": request.form.get('text', ''),
                "created_at": datetime.now().strftime("%Y-%m-%d %H:%M")
            }
            post['comments'].append(comment)
            break
    save_json(POSTS_FILE, posts)
    return redirect(url_for('feed'))

@app.route('/album')
def album():
    """추억 앨범 페이지"""
    members = load_json(MEMBERS_FILE)
    return render_template('album.html', members=members)

@app.route('/calendar')
def calendar():
    """가족 캘린더 페이지"""
    members = load_json(MEMBERS_FILE)
    return render_template('calendar.html', members=members)

@app.route('/chat')
def chat():
    """대화방 페이지"""
    members = load_json(MEMBERS_FILE)
    return render_template('chat.html', members=members)

@app.route('/api/members')
def get_members():
    """가족 구성원 API"""
    members = load_json(MEMBERS_FILE)
    return jsonify(members)

@app.route('/api/posts')
def get_posts():
    """게시글 API"""
    posts = load_json(POSTS_FILE)
    return jsonify(posts)

if __name__ == '__main__':
    print("=" * 50)
    print("  홍가네 - 가족 소통 플랫폼")
    print("  http://localhost:7001")
    print("=" * 50)
    app.run(host='0.0.0.0', port=7001, debug=True)
