from flask import Flask, render_template, request, jsonify
import subprocess
import json

app = Flask(__name__)
connected = False

# Windows에서 claude CLI 전체 경로
CLAUDE_CMD = r"C:\Users\lenovo\AppData\Roaming\npm\claude.cmd"


def run_claude(question):
    """claude -p를 stream-json으로 실행하고 assistant 텍스트를 추출한다."""
    result = subprocess.run(
        [CLAUDE_CMD, "-p", question,
         "--output-format", "stream-json", "--verbose",
         "--allowedTools", "WebSearch", "WebFetch"],
        capture_output=True, text=True, timeout=120
    )

    # stream-json 출력에서 assistant 메시지의 텍스트를 추출
    texts = []
    for line in result.stdout.strip().split("\n"):
        if not line:
            continue
        try:
            data = json.loads(line)
            if data.get("type") == "assistant":
                content = data.get("message", {}).get("content", [])
                for block in content:
                    if block.get("type") == "text":
                        texts.append(block["text"])
        except json.JSONDecodeError:
            continue

    return "".join(texts).strip()


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/connect", methods=["POST"])
def connect():
    global connected
    try:
        result = subprocess.run(
            [CLAUDE_CMD, "--version"],
            capture_output=True, text=True, timeout=10
        )
        if result.returncode == 0:
            connected = True
            return jsonify({"status": "connected", "version": result.stdout.strip()})
        else:
            return jsonify({"status": "error", "message": "Claude CLI not found"}), 500
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500


@app.route("/ask", methods=["POST"])
def ask():
    if not connected:
        return jsonify({"status": "error", "message": "Not connected"}), 400

    question = request.json.get("question", "").strip()
    if not question:
        return jsonify({"status": "error", "message": "Empty question"}), 400

    try:
        answer = run_claude(question)
        if answer:
            return jsonify({"status": "ok", "answer": answer})
        else:
            return jsonify({"status": "error", "message": "No response from Claude"}), 500
    except subprocess.TimeoutExpired:
        return jsonify({"status": "error", "message": "Timeout (120s)"}), 504
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500


@app.route("/disconnect", methods=["POST"])
def disconnect():
    global connected
    connected = False
    return jsonify({"status": "disconnected"})


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
