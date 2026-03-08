import os

# Level 7 lesson information
lessons = [
    {
        "num": "7_1",
        "id": "7-1",
        "title": "Transformer 개요",
        "subtitle": "Attention is All You Need",
        "emoji": "🤖",
        "duration": 4499,
        "keywords": ["Attention", "병렬처리", "NLP"],
        "scenes": [
            {"name": "intro", "file": "intro", "dur": 454, "title": "Transformer 개요", "desc": "Attention is All You Need"},
            {"name": "rnnLimit", "file": "rnn_limit", "dur": 769, "title": "RNN의 한계", "desc": "순차 처리의 문제점"},
            {"name": "transformer", "file": "transformer", "dur": 750, "title": "트랜스포머 등장", "desc": "2017년 구글의 혁신"},
            {"name": "architecture", "file": "architecture", "dur": 627, "title": "전체 구조", "desc": "인코더와 디코더"},
            {"name": "components", "file": "components", "dur": 679, "title": "핵심 구성요소", "desc": "어텐션과 FFN"},
            {"name": "comparison", "file": "comparison", "dur": 663, "title": "RNN vs Transformer", "desc": "성능 비교"},
            {"name": "outro", "file": "outro", "dur": 557, "title": "정리", "desc": "핵심 요약"},
        ],
        "summary": [
            {"title": "RNN의 한계", "desc": "순차 처리와 기울기 소실"},
            {"title": "트랜스포머", "desc": "병렬 처리와 어텐션"},
            {"title": "핵심 구조", "desc": "인코더-디코더"},
            {"title": "성능 향상", "desc": "속도와 품질 개선"},
        ],
        "next": "Self-Attention의 원리"
    },
    {
        "num": "7_2",
        "id": "7-2",
        "title": "Self-Attention",
        "subtitle": "Q, K, V의 이해",
        "emoji": "🔍",
        "duration": 4118,
        "keywords": ["Query", "Key", "Value"],
        "scenes": [
            {"name": "intro", "file": "intro", "dur": 428, "title": "Self-Attention", "desc": "스스로를 참조하는 어텐션"},
            {"name": "concept", "file": "concept", "dur": 555, "title": "어텐션 개념", "desc": "중요한 것에 집중"},
            {"name": "qkv", "file": "qkv", "dur": 632, "title": "Q, K, V", "desc": "질의, 키, 값"},
            {"name": "calculation", "file": "calculation", "dur": 633, "title": "계산 과정", "desc": "내적과 소프트맥스"},
            {"name": "scaling", "file": "scaling", "dur": 678, "title": "스케일링", "desc": "안정적인 학습"},
            {"name": "context", "file": "context", "dur": 621, "title": "문맥 이해", "desc": "단어 간 관계"},
            {"name": "outro", "file": "outro", "dur": 571, "title": "정리", "desc": "핵심 요약"},
        ],
        "summary": [
            {"title": "Self-Attention", "desc": "자기 자신을 참조"},
            {"title": "Q, K, V", "desc": "질의, 키, 값 벡터"},
            {"title": "계산 과정", "desc": "내적 → 스케일 → 소프트맥스"},
            {"title": "문맥 이해", "desc": "단어 간 관계 파악"},
        ],
        "next": "Multi-Head Attention"
    },
    {
        "num": "7_3",
        "id": "7-3",
        "title": "Multi-Head Attention",
        "subtitle": "여러 관점의 어텐션",
        "emoji": "👁️",
        "duration": 3923,
        "keywords": ["Multi-Head", "병렬", "다양성"],
        "scenes": [
            {"name": "intro", "file": "intro", "dur": 489, "title": "Multi-Head Attention", "desc": "여러 관점의 어텐션"},
            {"name": "why", "file": "why", "dur": 571, "title": "왜 여러 개?", "desc": "다양한 관계 포착"},
            {"name": "mechanism", "file": "mechanism", "dur": 590, "title": "동작 원리", "desc": "분할과 결합"},
            {"name": "heads", "file": "heads", "dur": 611, "title": "헤드의 역할", "desc": "각각의 전문성"},
            {"name": "efficiency", "file": "efficiency", "dur": 567, "title": "효율성", "desc": "계산량 유지"},
            {"name": "visualization", "file": "visualization", "dur": 577, "title": "시각화", "desc": "어텐션 패턴"},
            {"name": "outro", "file": "outro", "dur": 518, "title": "정리", "desc": "핵심 요약"},
        ],
        "summary": [
            {"title": "Multi-Head", "desc": "여러 어텐션 병렬 실행"},
            {"title": "다양한 관점", "desc": "문법, 의미, 위치"},
            {"title": "효율성", "desc": "차원 분할로 계산량 유지"},
            {"title": "결합", "desc": "모든 헤드 출력 연결"},
        ],
        "next": "Positional Encoding"
    },
    {
        "num": "7_4",
        "id": "7-4",
        "title": "Positional Encoding",
        "subtitle": "위치 정보 부여",
        "emoji": "📍",
        "duration": 3956,
        "keywords": ["Position", "Sinusoidal", "순서"],
        "scenes": [
            {"name": "intro", "file": "intro", "dur": 503, "title": "Positional Encoding", "desc": "위치 정보의 중요성"},
            {"name": "problem", "file": "problem", "dur": 575, "title": "위치 정보 부재", "desc": "병렬 처리의 대가"},
            {"name": "solution", "file": "solution", "dur": 541, "title": "해결책", "desc": "위치 벡터 더하기"},
            {"name": "sinusoidal", "file": "sinusoidal", "dur": 573, "title": "사인/코사인", "desc": "주파수 기반 인코딩"},
            {"name": "property", "file": "property", "dur": 657, "title": "특성과 장점", "desc": "학습 없이 계산"},
            {"name": "learned", "file": "learned", "dur": 573, "title": "학습 가능 인코딩", "desc": "GPT, BERT 방식"},
            {"name": "outro", "file": "outro", "dur": 534, "title": "정리", "desc": "핵심 요약"},
        ],
        "summary": [
            {"title": "위치 정보 필요", "desc": "병렬 처리로 순서 상실"},
            {"title": "사인/코사인", "desc": "고유한 위치 패턴 생성"},
            {"title": "학습 가능", "desc": "GPT/BERT 방식"},
            {"title": "임베딩에 더함", "desc": "위치 정보 통합"},
        ],
        "next": "Encoder & Decoder 구조"
    },
    {
        "num": "7_5",
        "id": "7-5",
        "title": "Encoder & Decoder",
        "subtitle": "전체 구조 이해",
        "emoji": "🏗️",
        "duration": 3554,
        "keywords": ["Encoder", "Decoder", "LayerNorm"],
        "scenes": [
            {"name": "intro", "file": "intro", "dur": 418, "title": "Encoder & Decoder", "desc": "전체 구조 이해"},
            {"name": "encoder", "file": "encoder", "dur": 566, "title": "인코더 구조", "desc": "6개 층의 구성"},
            {"name": "decoder", "file": "decoder", "dur": 541, "title": "디코더 구조", "desc": "마스크드 어텐션"},
            {"name": "residual", "file": "residual", "dur": 498, "title": "잔차 연결", "desc": "그래디언트 전달"},
            {"name": "layernorm", "file": "layernorm", "dur": 504, "title": "레이어 정규화", "desc": "학습 안정화"},
            {"name": "ffn", "file": "ffn", "dur": 559, "title": "피드포워드", "desc": "비선형 변환"},
            {"name": "outro", "file": "outro", "dur": 468, "title": "정리", "desc": "핵심 요약"},
        ],
        "summary": [
            {"title": "인코더", "desc": "입력 문장 이해"},
            {"title": "디코더", "desc": "출력 문장 생성"},
            {"title": "잔차 연결", "desc": "깊은 학습 가능"},
            {"title": "Layer Norm", "desc": "안정적인 학습"},
        ],
        "next": "GPT 구조"
    },
    {
        "num": "7_6",
        "id": "7-6",
        "title": "GPT 구조",
        "subtitle": "Decoder-only 아키텍처",
        "emoji": "💬",
        "duration": 3461,
        "keywords": ["GPT", "Decoder", "생성"],
        "scenes": [
            {"name": "intro", "file": "intro", "dur": 466, "title": "GPT 구조", "desc": "생성형 사전학습"},
            {"name": "decoderOnly", "file": "decoder_only", "dur": 497, "title": "디코더만 사용", "desc": "단방향 생성"},
            {"name": "causal", "file": "causal", "dur": 500, "title": "인과적 모델링", "desc": "미래 토큰 마스킹"},
            {"name": "scaling", "file": "scaling", "dur": 530, "title": "스케일링", "desc": "파라미터 증가"},
            {"name": "emergent", "file": "emergent", "dur": 495, "title": "창발적 능력", "desc": "예상치 못한 능력"},
            {"name": "generation", "file": "generation", "dur": 519, "title": "텍스트 생성", "desc": "샘플링 전략"},
            {"name": "outro", "file": "outro", "dur": 454, "title": "정리", "desc": "핵심 요약"},
        ],
        "summary": [
            {"title": "Decoder-only", "desc": "인코더 없이 디코더만"},
            {"title": "인과적 모델링", "desc": "왼쪽→오른쪽 생성"},
            {"title": "스케일링", "desc": "크기와 능력 비례"},
            {"title": "창발적 능력", "desc": "추론, 코딩 등"},
        ],
        "next": "BERT 구조"
    },
    {
        "num": "7_7",
        "id": "7-7",
        "title": "BERT 구조",
        "subtitle": "Encoder-only 아키텍처",
        "emoji": "📚",
        "duration": 3287,
        "keywords": ["BERT", "Encoder", "MLM"],
        "scenes": [
            {"name": "intro", "file": "intro", "dur": 475, "title": "BERT 구조", "desc": "양방향 인코더"},
            {"name": "encoderOnly", "file": "encoder_only", "dur": 470, "title": "인코더만 사용", "desc": "양방향 문맥"},
            {"name": "mlm", "file": "mlm", "dur": 471, "title": "마스크드 LM", "desc": "빈칸 채우기"},
            {"name": "nsp", "file": "nsp", "dur": 458, "title": "다음 문장 예측", "desc": "문장 관계 이해"},
            {"name": "tokens", "file": "tokens", "dur": 478, "title": "특수 토큰", "desc": "CLS, SEP"},
            {"name": "finetuning", "file": "finetuning", "dur": 504, "title": "파인튜닝", "desc": "다양한 작업 적용"},
            {"name": "outro", "file": "outro", "dur": 431, "title": "정리", "desc": "핵심 요약"},
        ],
        "summary": [
            {"title": "Encoder-only", "desc": "양방향 문맥 이해"},
            {"title": "MLM", "desc": "마스크 토큰 예측"},
            {"title": "NSP", "desc": "문장 관계 학습"},
            {"title": "파인튜닝", "desc": "다양한 작업 적용"},
        ],
        "next": "LLM 학습과 활용"
    },
    {
        "num": "7_8",
        "id": "7-8",
        "title": "LLM 학습과 활용",
        "subtitle": "Pre-training부터 RLHF까지",
        "emoji": "🎓",
        "duration": 3548,
        "keywords": ["Pre-train", "Fine-tune", "RLHF"],
        "scenes": [
            {"name": "intro", "file": "intro", "dur": 461, "title": "LLM 학습", "desc": "학습 전략 이해"},
            {"name": "pretraining", "file": "pretraining", "dur": 523, "title": "사전학습", "desc": "대규모 텍스트 학습"},
            {"name": "sft", "file": "sft", "dur": 519, "title": "지도학습 파인튜닝", "desc": "대화 능력 학습"},
            {"name": "rlhf", "file": "rlhf", "dur": 521, "title": "RLHF", "desc": "인간 피드백 강화학습"},
            {"name": "alignment", "file": "alignment", "dur": 464, "title": "정렬", "desc": "인간 가치와 일치"},
            {"name": "prompting", "file": "prompting", "dur": 549, "title": "프롬프트 엔지니어링", "desc": "효과적인 활용"},
            {"name": "outro", "file": "outro", "dur": 511, "title": "정리 & 축하", "desc": "Level 7 완료!"},
        ],
        "summary": [
            {"title": "사전학습", "desc": "대규모 텍스트로 기본 능력"},
            {"title": "SFT", "desc": "대화 형식 학습"},
            {"title": "RLHF", "desc": "인간 선호도 반영"},
            {"title": "프롬프트", "desc": "효과적인 활용법"},
        ],
        "next": None
    },
]

# Level 7 color (violet-500)
COLORS = '''const COLORS = {
  background: "#0f172a",
  primary: "#8b5cf6",
  secondary: "#7c3aed",
  accent: "#6d28d9",
  light: "#ffffff",
  gradient: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 50%, #6d28d9 100%)",
};'''

def generate_video(lesson):
    scenes_code = ""
    scene_timings_code = ""
    sequence_code = ""

    start = 0
    for i, scene in enumerate(lesson["scenes"]):
        scene_name = scene["name"]
        scene_file = scene["file"]
        scene_dur = scene["dur"]

        scene_timings_code += f'  {scene_name}: {{ start: {start}, duration: {scene_dur} }},\n'

        if i == 0:  # intro scene
            scenes_code += f'''
const Scene{scene_name.capitalize()}: React.FC = () => {{
  const frame = useCurrentFrame();
  const opacity = Math.min(1, frame / 30);
  return (
    <AbsoluteFill style={{ background: COLORS.gradient, justifyContent: "center", alignItems: "center", fontFamily: "Pretendard, sans-serif" }}>
      <GlobalOverlay />
      <Audio src={{staticFile("audio/lesson-{lesson['id']}/{scene_file}.mp3")}} />
      <div style={{ textAlign: "center", opacity, transform: `translateY(${{20 - opacity * 20}}px)` }}>
        <div style={{ fontSize: 180, marginBottom: 20 }}>{lesson['emoji']}</div>
        <div style={{ fontSize: 72, fontWeight: 800, color: COLORS.light, marginBottom: 20 }}>{lesson['title']}</div>
        <div style={{ fontSize: 36, color: "rgba(255,255,255,0.9)" }}>{lesson['subtitle']}</div>
        <div style={{ marginTop: 40, padding: "15px 40px", background: "rgba(0,0,0,0.3)", borderRadius: 50, fontSize: 28, color: COLORS.light }}>
          Level {lesson['id']}
        </div>
      </div>
    </AbsoluteFill>
  );
}};
'''
        elif "outro" in scene_name.lower():  # outro scene
            summary_items = lesson["summary"]
            summary_code = ""
            for item in summary_items:
                summary_code += f'          {{ title: "{item["title"]}", desc: "{item["desc"]}" }},\n'

            next_text = f'다음 시간: <span style={{ fontWeight: 700 }}>{lesson["next"]}</span>' if lesson["next"] else '이것으로 Level 7을 마칩니다. 축하합니다!'

            scenes_code += f'''
const Scene{scene_name.capitalize()}: React.FC = () => (
  <AbsoluteFill style={{ background: COLORS.gradient, justifyContent: "center", alignItems: "center", fontFamily: "Pretendard, sans-serif" }}>
    <GlobalOverlay />
    <Audio src={{staticFile("audio/lesson-{lesson['id']}/{scene_file}.mp3")}} />
    <div style={{ textAlign: "center" }}>
      <div style={{ fontSize: 48, color: COLORS.light, marginBottom: 40 }}>오늘 배운 내용</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 25, maxWidth: 1000 }}>
        {{[
{summary_code}        ].map((item, i) => (
          <div key={{i}} style={{ background: "rgba(255,255,255,0.2)", borderRadius: 15, padding: 25 }}>
            <div style={{ fontSize: 28, fontWeight: 700, color: COLORS.light }}>{{item.title}}</div>
            <div style={{ fontSize: 20, color: "rgba(255,255,255,0.8)", marginTop: 10 }}>{{item.desc}}</div>
          </div>
        ))}}
      </div>
      <div style={{ marginTop: 50, fontSize: 32, color: COLORS.light }}>
        {next_text}
      </div>
    </div>
  </AbsoluteFill>
);
'''
        else:  # middle scenes
            scenes_code += f'''
const Scene{scene_name.capitalize()}: React.FC = () => {{
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
      <GlobalOverlay />
      <Audio src={{staticFile("audio/lesson-{lesson['id']}/{scene_file}.mp3")}} />
      <div style={{ padding: 80, paddingTop: 100 }}>
        <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>{scene["title"]}</h1>
        <div style={{ display: "flex", gap: 40 }}>
          <div style={{ flex: 1 }}>
            <div style={{ background: "rgba(139,92,246,0.15)", borderRadius: 20, padding: 40 }}>
              <div style={{ fontSize: 100, textAlign: "center", marginBottom: 20 }}>{lesson['emoji']}</div>
              <div style={{ fontSize: 28, color: COLORS.light, textAlign: "center" }}>{scene["desc"]}</div>
            </div>
          </div>
          <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{
              width: 300, height: 300,
              background: "rgba(139,92,246,0.2)",
              borderRadius: 20,
              display: "flex", justifyContent: "center", alignItems: "center",
              border: `3px solid ${{COLORS.primary}}`,
              transform: `scale(${{1 + Math.sin(frame * 0.05) * 0.05}})`
            }}>
              <div style={{ fontSize: 120 }}>{lesson['emoji']}</div>
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
}};
'''

        sequence_code += f'    <Sequence from={{SCENE_TIMINGS.{scene_name}.start}} durationInFrames={{SCENE_TIMINGS.{scene_name}.duration}}><Scene{scene_name.capitalize()} /></Sequence>\n'
        start += scene_dur

    video_content = f'''import React from "react";
import {{ AbsoluteFill, Audio, Img, Sequence, staticFile, useCurrentFrame }} from "remotion";

export const LESSON_{lesson['num']}_DURATION = {lesson['duration']};

const SCENE_TIMINGS = {{
{scene_timings_code}}};

{COLORS}

const GlobalOverlay: React.FC = () => (
  <>
    <div style={{ position: "absolute", top: 30, left: 40, display: "flex", alignItems: "center", gap: 12, zIndex: 100 }}>
      <Img src={{staticFile("images/logo.png")}} style={{ width: 50, height: 50, borderRadius: 8 }} />
      <span style={{ color: COLORS.light, fontSize: 24, fontWeight: 700, fontFamily: "Pretendard, sans-serif" }}>UTTEC-Lab</span>
    </div>
    <div style={{ position: "absolute", bottom: 30, right: 40, color: "rgba(255,255,255,0.6)", fontSize: 20, fontFamily: "Pretendard, sans-serif", zIndex: 100 }}>
      ai.uttec-lab.com
    </div>
  </>
);
{scenes_code}
export const Lesson{lesson['num']}Video: React.FC = () => (
  <AbsoluteFill style={{ background: COLORS.background }}>
{sequence_code}  </AbsoluteFill>
);
'''
    return video_content

def generate_thumbnail(lesson):
    thumbnail_content = f'''import React from "react";
import {{ AbsoluteFill, Img, staticFile }} from "remotion";

const COLORS = {{
  primary: "#8b5cf6",
  light: "#ffffff",
  gradient: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 50%, #6d28d9 100%)",
}};

export const Lesson{lesson['num']}Thumbnail: React.FC = () => (
  <AbsoluteFill style={{{{ background: COLORS.gradient, justifyContent: "center", alignItems: "center", fontFamily: "Pretendard, sans-serif" }}}}>
    <div style={{{{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, background: "radial-gradient(circle at 20% 30%, rgba(255,255,255,0.15) 0%, transparent 40%), radial-gradient(circle at 80% 70%, rgba(0,0,0,0.2) 0%, transparent 40%)" }}}} />
    <div style={{{{ position: "absolute", top: 40, left: 50, display: "flex", alignItems: "center", gap: 15 }}}}>
      <Img src={{staticFile("images/logo.png")}} style={{{{ width: 60, height: 60, borderRadius: 10 }}}} />
      <span style={{{{ color: COLORS.light, fontSize: 32, fontWeight: 700, textShadow: "0 2px 10px rgba(0,0,0,0.3)" }}}}>UTTEC-Lab</span>
    </div>
    <div style={{{{ position: "absolute", top: 40, right: 50, background: "rgba(0,0,0,0.3)", padding: "12px 30px", borderRadius: 50, fontSize: 28, color: COLORS.light, fontWeight: 600 }}}}>Level {lesson['id']}</div>
    <div style={{{{ textAlign: "center", zIndex: 10 }}}}>
      <div style={{{{ fontSize: 180, marginBottom: 20, filter: "drop-shadow(0 10px 30px rgba(0,0,0,0.3))" }}}}>{lesson['emoji']}</div>
      <div style={{{{ fontSize: 100, fontWeight: 800, color: COLORS.light, textShadow: "0 6px 30px rgba(0,0,0,0.4)", marginBottom: 20 }}}}>{lesson['title']}</div>
      <div style={{{{ fontSize: 48, color: "rgba(255,255,255,0.9)", fontWeight: 500 }}}}>{lesson['subtitle']}</div>
      <div style={{{{ display: "flex", gap: 20, justifyContent: "center", marginTop: 40 }}}}>
        {{["{lesson['keywords'][0]}", "{lesson['keywords'][1]}", "{lesson['keywords'][2]}"].map((keyword) => (
          <div key={{keyword}} style={{{{ background: "rgba(255,255,255,0.2)", padding: "15px 35px", borderRadius: 50, fontSize: 32, color: COLORS.light, fontWeight: 600, backdropFilter: "blur(10px)" }}}}>{{keyword}}</div>
        ))}}
      </div>
    </div>
    <div style={{{{ position: "absolute", bottom: 40, right: 50, fontSize: 28, color: "rgba(255,255,255,0.8)", fontWeight: 500 }}}}>ai.uttec-lab.com</div>
  </AbsoluteFill>
);
'''
    return thumbnail_content

# Generate files
os.makedirs("src", exist_ok=True)

for lesson in lessons:
    # Generate Video component
    video_file = f"src/Lesson{lesson['num']}Video.tsx"
    with open(video_file, "w", encoding="utf-8") as f:
        f.write(generate_video(lesson))
    print(f"Generated: {video_file}")

    # Generate Thumbnail component
    thumb_file = f"src/Lesson{lesson['num']}Thumbnail.tsx"
    with open(thumb_file, "w", encoding="utf-8") as f:
        f.write(generate_thumbnail(lesson))
    print(f"Generated: {thumb_file}")

print("\nAll Level 7 components generated!")
