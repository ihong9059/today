"""
Claude 출석체크 인증 서버
- 교육생이 인증 신청 → 강사가 승인 → 토큰 발급
- 토큰은 당일만 유효 (HMAC-SHA256 서명)
- students.json으로 출석부 관리
- config.json으로 교육 종료일 관리
"""

import hashlib
import hmac
import json
import os
from datetime import datetime, date

from flask import Flask, jsonify, request, send_file

app = Flask(__name__)

SECRET_KEY = os.environ.get("AUTH_SECRET", "claude-edu-2026-uttec")
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
STUDENTS_FILE = os.path.join(BASE_DIR, "students.json")
CONFIG_FILE = os.path.join(BASE_DIR, "config.json")

# In-memory storage
pending = {}    # {name: {ip, time}}
approved = {}   # {name: {ip, time}}


def load_students():
    if os.path.exists(STUDENTS_FILE):
        with open(STUDENTS_FILE, "r", encoding="utf-8") as f:
            return json.load(f)
    return []


def save_students(students):
    with open(STUDENTS_FILE, "w", encoding="utf-8") as f:
        json.dump(students, f, ensure_ascii=False, indent=2)


def load_config():
    if os.path.exists(CONFIG_FILE):
        with open(CONFIG_FILE, "r", encoding="utf-8") as f:
            return json.load(f)
    return {"edu_end_date": "2026-05-31"}


def save_config(config):
    with open(CONFIG_FILE, "w", encoding="utf-8") as f:
        json.dump(config, f, ensure_ascii=False, indent=2)


def get_remaining_days():
    config = load_config()
    end = datetime.strptime(config["edu_end_date"], "%Y-%m-%d").date()
    today = date.today()
    delta = (end - today).days
    return delta, config["edu_end_date"]


def make_token(name: str) -> dict:
    today_str = datetime.now().strftime("%Y-%m-%d")
    config = load_config()
    msg = f"{name}:{today_str}"
    sig = hmac.new(SECRET_KEY.encode(), msg.encode(), hashlib.sha256).hexdigest()
    return {
        "name": name,
        "date": today_str,
        "edu_end_date": config["edu_end_date"],
        "sig": sig,
    }


# ─── 교육 정보 API (학생 PC용) ───

@app.route("/edu-info")
def edu_info():
    remaining, end_date = get_remaining_days()
    return jsonify({"edu_end_date": end_date, "remaining_days": remaining})


# ─── 교육생 페이지 ───

@app.route("/")
def student_page():
    return """<!DOCTYPE html>
<html><head><meta charset="utf-8"><title>Claude 출석 인증</title>
<style>
  body { font-family: 'Segoe UI', sans-serif; max-width: 500px; margin: 60px auto; padding: 20px; background: #f5f5f5; }
  .card { background: white; border-radius: 12px; padding: 40px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); text-align: center; }
  h1 { color: #333; margin-bottom: 30px; }
  input { padding: 12px 16px; font-size: 16px; border: 2px solid #ddd; border-radius: 8px; width: 80%; margin-bottom: 20px; }
  input:focus { outline: none; border-color: #4a90d9; }
  button { padding: 12px 32px; font-size: 16px; background: #4a90d9; color: white; border: none; border-radius: 8px; cursor: pointer; }
  button:hover { background: #357abd; }
  #status { margin-top: 20px; padding: 15px; border-radius: 8px; display: none; }
  .waiting { background: #fff3cd; color: #856404; }
  .approved { background: #d4edda; color: #155724; }
  .denied { background: #f8d7da; color: #721c24; }
  .download-btn { background: #28a745; margin-top: 10px; }
  .download-btn:hover { background: #218838; }
  .info { margin-top: 20px; font-size: 13px; color: #666; text-align: left; background: #f8f9fa; padding: 15px; border-radius: 8px; }
  code { background: #e9ecef; padding: 2px 6px; border-radius: 4px; }
</style></head><body>
<div class="card">
  <h1>Claude 출석 인증</h1>
  <input type="text" id="name" placeholder="이름을 입력하세요">
  <br>
  <button onclick="requestAuth()">인증 신청</button>
  <div id="status"></div>
  <div class="info">
    <b>사용 방법:</b><br>
    1. 이름 입력 후 "인증 신청" 클릭<br>
    2. 강사 승인 대기<br>
    3. 승인 후 "토큰 다운로드" 클릭<br>
    4. 터미널에서 아래 명령 실행:<br>
    <code>mv ~/Downloads/claude_auth ~/.claude_auth</code>
  </div>
</div>
<script>
let pollTimer = null;
function requestAuth() {
  const name = document.getElementById('name').value.trim();
  if (!name) { alert('이름을 입력하세요'); return; }
  fetch('/request-auth', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({name: name})
  }).then(r => r.json()).then(data => {
    const st = document.getElementById('status');
    st.style.display = 'block';
    st.className = 'waiting';
    st.innerHTML = '⏳ 강사 승인 대기 중...';
    if (pollTimer) clearInterval(pollTimer);
    pollTimer = setInterval(() => checkStatus(name), 2000);
  });
}
function checkStatus(name) {
  fetch('/check-status?name=' + encodeURIComponent(name))
    .then(r => r.json()).then(data => {
      const st = document.getElementById('status');
      if (data.status === 'approved') {
        clearInterval(pollTimer);
        st.className = 'approved';
        st.innerHTML = '✅ 승인 완료!<br><br>' +
          '<button class="download-btn" onclick="downloadToken(\\'' + name + '\\')">토큰 다운로드</button>';
      } else if (data.status === 'denied') {
        clearInterval(pollTimer);
        st.className = 'denied';
        st.innerHTML = '❌ 승인 거부됨. 강사에게 문의하세요.';
      }
    });
}
function downloadToken(name) {
  window.location.href = '/download-token?name=' + encodeURIComponent(name);
}
</script></body></html>"""


@app.route("/request-auth", methods=["POST"])
def request_auth():
    data = request.get_json()
    name = data.get("name", "").strip()
    if not name:
        return jsonify({"error": "이름이 필요합니다"}), 400
    students = load_students()
    if name not in students:
        return jsonify({"status": "denied", "message": "등록되지 않은 사용자입니다"})
    ip = request.remote_addr
    now = datetime.now().strftime("%H:%M:%S")
    pending[name] = {"ip": ip, "time": now}
    return jsonify({"status": "pending", "message": "승인 대기 중"})


@app.route("/check-status")
def check_status():
    name = request.args.get("name", "")
    if name in approved:
        return jsonify({"status": "approved"})
    if name in pending:
        return jsonify({"status": "pending"})
    return jsonify({"status": "denied"})


@app.route("/download-token")
def download_token():
    name = request.args.get("name", "")
    if name not in approved:
        return "승인되지 않은 사용자입니다", 403
    token = make_token(name)
    import tempfile
    path = os.path.join(tempfile.gettempdir(), "claude_auth")
    with open(path, "w", encoding="utf-8") as f:
        json.dump(token, f, ensure_ascii=False)
    return send_file(path, as_attachment=True, download_name="claude_auth")


# ─── 강사 관리 페이지 ───

@app.route("/admin")
def admin_page():
    today = datetime.now().strftime("%Y-%m-%d")
    students = load_students()
    remaining, end_date = get_remaining_days()

    if remaining > 7:
        remain_color = "#28a745"
    elif remaining > 0:
        remain_color = "#f0ad4e"
    else:
        remain_color = "#dc3545"

    # 출석부
    roster_html = ""
    present = 0
    for i, name in enumerate(students, 1):
        if name in approved:
            status = '<span style="color:#28a745;font-weight:bold">출석</span>'
            present += 1
        elif name in pending:
            status = '<span style="color:#f0ad4e">대기중</span>'
        else:
            status = '<span style="color:#dc3545">미출석</span>'
        roster_html += f'<tr><td>{i}</td><td>{name}</td><td>{status}</td><td><button class="btn-del" onclick="removeStudent(\'{name}\')">삭제</button></td></tr>'
    absent = len(students) - present

    # 인증 대기
    pending_html = ""
    for i, (name, info) in enumerate(pending.items(), 1):
        pending_html += f"""
        <tr>
          <td>{i}</td><td>{name}</td><td>{info['ip']}</td><td>{info['time']}</td>
          <td>
            <button class="btn-approve" onclick="approve('{name}')">승인</button>
            <button class="btn-deny" onclick="deny('{name}')">거부</button>
          </td>
        </tr>"""

    # 인증 완료
    approved_html = ""
    for i, (name, info) in enumerate(approved.items(), 1):
        approved_html += f"""
        <tr><td>{i}</td><td>{name}</td><td>{info['ip']}</td><td>{info['time']}</td></tr>"""

    return f"""<!DOCTYPE html>
<html><head><meta charset="utf-8"><title>Claude 출석 관리</title>
<style>
  body {{ font-family: 'Segoe UI', sans-serif; max-width: 800px; margin: 40px auto; padding: 20px; background: #f5f5f5; }}
  .card {{ background: white; border-radius: 12px; padding: 30px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); margin-bottom: 20px; }}
  h1 {{ color: #333; }}
  h2 {{ color: #555; border-bottom: 2px solid #eee; padding-bottom: 10px; }}
  .date {{ color: #888; font-size: 14px; }}
  .edu-info {{ display: flex; justify-content: space-between; align-items: center; margin-top: 10px; }}
  .remain {{ font-size: 16px; font-weight: bold; }}
  .end-form {{ display: flex; gap: 8px; align-items: center; }}
  .end-form input {{ padding: 6px 10px; border: 2px solid #ddd; border-radius: 6px; font-size: 14px; }}
  .end-form button {{ padding: 6px 14px; background: #4a90d9; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 13px; }}
  table {{ width: 100%; border-collapse: collapse; margin-top: 15px; }}
  th, td {{ padding: 10px 12px; text-align: left; border-bottom: 1px solid #eee; }}
  th {{ background: #f8f9fa; font-weight: 600; }}
  .btn-approve {{ padding: 6px 16px; background: #28a745; color: white; border: none; border-radius: 6px; cursor: pointer; margin-right: 5px; }}
  .btn-approve:hover {{ background: #218838; }}
  .btn-deny {{ padding: 6px 16px; background: #dc3545; color: white; border: none; border-radius: 6px; cursor: pointer; }}
  .btn-deny:hover {{ background: #c82333; }}
  .btn-reset {{ padding: 10px 24px; background: #6c757d; color: white; border: none; border-radius: 8px; cursor: pointer; margin-top: 15px; }}
  .btn-reset:hover {{ background: #5a6268; }}
  .btn-add {{ padding: 8px 16px; background: #4a90d9; color: white; border: none; border-radius: 6px; cursor: pointer; }}
  .btn-add:hover {{ background: #357abd; }}
  .btn-del {{ padding: 4px 10px; background: #dc3545; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 12px; }}
  .btn-del:hover {{ background: #c82333; }}
  .count {{ font-size: 18px; color: #4a90d9; font-weight: bold; }}
  .absent {{ font-size: 14px; color: #dc3545; margin-left: 10px; }}
  .empty {{ color: #999; padding: 20px; text-align: center; }}
  .add-form {{ margin-top: 15px; display: flex; gap: 8px; }}
  .add-form input {{ padding: 8px 12px; border: 2px solid #ddd; border-radius: 6px; font-size: 14px; flex: 1; }}
</style></head><body>
<div class="card">
  <h1>Claude 출석 관리 <span class="date">{today}</span></h1>
  <div class="edu-info">
    <span class="remain" style="color:{remain_color}">교육 종료까지 {remaining}일 남음 ({end_date})</span>
    <div class="end-form">
      <input type="date" id="endDate" value="{end_date}">
      <button onclick="setEndDate()">변경</button>
    </div>
  </div>
</div>

<div class="card">
  <h2>출석부 <span class="count">{present}/{len(students)}명</span>
    <span class="absent">{"(미출석: " + str(absent) + "명)" if absent > 0 else ""}</span></h2>
  {"<table><tr><th>#</th><th>이름</th><th>상태</th><th></th></tr>" + roster_html + "</table>" if students else '<p class="empty">등록된 학생이 없습니다</p>'}
  <div class="add-form">
    <input type="text" id="newStudent" placeholder="학생 이름 추가">
    <button class="btn-add" onclick="addStudent()">추가</button>
  </div>
</div>

<div class="card">
  <h2>인증 대기 ({len(pending)}명)</h2>
  {"<table><tr><th>#</th><th>이름</th><th>IP</th><th>시간</th><th>액션</th></tr>" + pending_html + "</table>" if pending else '<p class="empty">대기 중인 신청이 없습니다</p>'}
</div>

<div class="card">
  <h2>인증 완료 <span class="count">{len(approved)}명</span></h2>
  {"<table><tr><th>#</th><th>이름</th><th>IP</th><th>시간</th></tr>" + approved_html + "</table>" if approved else '<p class="empty">아직 인증된 교육생이 없습니다</p>'}
  <br>
  <button class="btn-reset" onclick="if(confirm('출석 현황을 초기화 하시겠습니까?')) fetch('/admin/reset',{{method:'POST'}}).then(()=>location.reload())">출석 초기화</button>
</div>

<script>
function approve(name) {{
  fetch('/admin/approve', {{method:'POST', headers:{{'Content-Type':'application/json'}}, body:JSON.stringify({{name:name}})}}).then(()=>location.reload());
}}
function deny(name) {{
  fetch('/admin/deny', {{method:'POST', headers:{{'Content-Type':'application/json'}}, body:JSON.stringify({{name:name}})}}).then(()=>location.reload());
}}
function addStudent() {{
  const name = document.getElementById('newStudent').value.trim();
  if (!name) return;
  fetch('/admin/students/add', {{method:'POST', headers:{{'Content-Type':'application/json'}}, body:JSON.stringify({{name:name}})}}).then(()=>location.reload());
}}
function removeStudent(name) {{
  if (!confirm(name + ' 학생을 삭제하시겠습니까?')) return;
  fetch('/admin/students/remove', {{method:'POST', headers:{{'Content-Type':'application/json'}}, body:JSON.stringify({{name:name}})}}).then(()=>location.reload());
}}
function setEndDate() {{
  const d = document.getElementById('endDate').value;
  if (!d) return;
  fetch('/admin/set-end-date', {{method:'POST', headers:{{'Content-Type':'application/json'}}, body:JSON.stringify({{date:d}})}}).then(()=>location.reload());
}}
setInterval(function() {{
  if (document.activeElement.tagName !== 'INPUT') location.reload();
}}, 5000);
</script></body></html>"""


@app.route("/admin/approve", methods=["POST"])
def approve_student():
    data = request.get_json()
    name = data.get("name", "")
    if name in pending:
        approved[name] = pending.pop(name)
    return jsonify({"ok": True})


@app.route("/admin/deny", methods=["POST"])
def deny_student():
    data = request.get_json()
    name = data.get("name", "")
    pending.pop(name, None)
    return jsonify({"ok": True})


@app.route("/admin/reset", methods=["POST"])
def reset():
    pending.clear()
    approved.clear()
    return jsonify({"ok": True})


@app.route("/admin/students/add", methods=["POST"])
def add_student():
    data = request.get_json()
    name = data.get("name", "").strip()
    if not name:
        return jsonify({"error": "이름이 필요합니다"}), 400
    students = load_students()
    if name not in students:
        students.append(name)
        save_students(students)
    return jsonify({"ok": True})


@app.route("/admin/students/remove", methods=["POST"])
def remove_student():
    data = request.get_json()
    name = data.get("name", "").strip()
    students = load_students()
    if name in students:
        students.remove(name)
        save_students(students)
    return jsonify({"ok": True})


@app.route("/admin/set-end-date", methods=["POST"])
def set_end_date():
    data = request.get_json()
    new_date = data.get("date", "").strip()
    if not new_date:
        return jsonify({"error": "날짜가 필요합니다"}), 400
    config = load_config()
    config["edu_end_date"] = new_date
    save_config(config)
    return jsonify({"ok": True})


if __name__ == "__main__":
    remaining, end_date = get_remaining_days()
    print(f"[출석체크 서버] http://192.168.0.20:5000")
    print(f"[관리 페이지]   http://192.168.0.20:5000/admin")
    print(f"[교육 종료일]   {end_date} (D-{remaining})")
    app.run(host="0.0.0.0", port=5000, debug=True)
