import React from "react";
import {
  AbsoluteFill,
  Audio,
  Img,
  Sequence,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";

// ===================== Duration & Timings =====================
export const LESSON_6_4_DURATION = 18613;

const SCENE_TIMINGS = {
  scene01_intro: { start: 0, duration: 1216 },
  scene02_analogy: { start: 1216, duration: 1488 },
  scene03_structure: { start: 2704, duration: 1421 },
  scene04_reset_gate: { start: 4125, duration: 1450 },
  scene05_update_gate: { start: 5575, duration: 1819 },
  scene06_candidate: { start: 7394, duration: 1435 },
  scene07_final_hidden: { start: 8829, duration: 1406 },
  scene08_flow: { start: 10235, duration: 1509 },
  scene09_gate_mapping: { start: 11744, duration: 1778 },
  scene10_when_to_use: { start: 13522, duration: 1723 },
  scene11_comparison: { start: 15245, duration: 1628 },
  scene12_outro: { start: 16873, duration: 1740 },
};

// ===================== Colors =====================
const COLORS = {
  background: "#0f172a",
  primary: "#06b6d4",
  secondary: "#0891b2",
  accent: "#22d3ee",
  light: "#ffffff",
  dark: "#164e63",
  resetGate: "#f97316",
  updateGate: "#8b5cf6",
  hiddenState: "#f59e0b",
  lstm: "#3b82f6",
  gru: "#22c55e",
};

// ===================== Animation Helpers =====================
const fadeIn = (frame: number, delay = 0) =>
  interpolate(frame - delay, [0, 20], [0, 1], { extrapolateRight: "clamp" });

const slideUp = (frame: number, delay = 0) =>
  interpolate(frame - delay, [0, 25], [40, 0], { extrapolateRight: "clamp" });

const scaleIn = (frame: number, fps: number, delay = 0) =>
  spring({ frame: frame - delay, fps, config: { damping: 12 } });

// ===================== Global Overlay =====================
const GlobalOverlay: React.FC = () => (
  <>
    <div
      style={{
        position: "absolute",
        top: 30,
        left: 40,
        display: "flex",
        alignItems: "center",
        gap: 12,
        zIndex: 100,
      }}
    >
      <Img
        src={staticFile("images/logo.png")}
        style={{ width: 50, height: 50, borderRadius: 8 }}
      />
      <span style={{ color: COLORS.light, fontSize: 24, fontWeight: 700 }}>
        UTTEC-Lab
      </span>
    </div>
    <div
      style={{
        position: "absolute",
        bottom: 30,
        left: "50%",
        transform: "translateX(-50%)",
        background: `rgba(6, 182, 212, 0.9)`,
        padding: "12px 30px",
        borderRadius: 25,
        zIndex: 100,
      }}
    >
      <span style={{ color: COLORS.light, fontSize: 20, fontWeight: 600 }}>
        http://uttec-ai.duckdns.org
      </span>
    </div>
  </>
);

// ===================== Scene Components =====================
const Scene01Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${COLORS.background} 0%, #1e3a5f 100%)`,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <div
          style={{
            fontSize: 100,
            fontWeight: 800,
            color: COLORS.gru,
            opacity: fadeIn(frame),
            transform: `translateY(${slideUp(frame)}px) scale(${scaleIn(frame, fps)})`,
            textShadow: `0 0 60px ${COLORS.gru}`,
          }}
        >
          GRU
        </div>
        <div
          style={{
            fontSize: 36,
            color: COLORS.light,
            marginTop: 20,
            opacity: fadeIn(frame, 20),
            transform: `translateY(${slideUp(frame, 20)}px)`,
          }}
        >
          Gated Recurrent Unit
        </div>
        <div
          style={{
            fontSize: 50,
            fontWeight: 700,
            color: COLORS.accent,
            marginTop: 40,
            opacity: fadeIn(frame, 40),
            transform: `translateY(${slideUp(frame, 40)}px)`,
          }}
        >
          LSTM의 효율적인 동생
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 40,
            marginTop: 60,
            opacity: fadeIn(frame, 60),
          }}
        >
          {[
            { label: "게이트", lstm: "3개", gru: "2개" },
            { label: "상태", lstm: "2개", gru: "1개" },
          ].map((item, i) => (
            <div
              key={i}
              style={{
                background: "rgba(255,255,255,0.1)",
                padding: "20px 40px",
                borderRadius: 15,
                transform: `translateY(${slideUp(frame, 70 + i * 15)}px)`,
              }}
            >
              <div style={{ color: COLORS.light, fontSize: 24, marginBottom: 10 }}>
                {item.label}
              </div>
              <div style={{ display: "flex", gap: 20 }}>
                <span style={{ color: COLORS.lstm }}>LSTM: {item.lstm}</span>
                <span style={{ color: COLORS.gru }}>GRU: {item.gru}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};

const Scene02Analogy: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const students = [
    {
      title: "LSTM 학생",
      color: COLORS.lstm,
      items: ["노트북 (셀 상태)", "머릿속 (은닉 상태)", "지우개, 펜, 형광펜"],
    },
    {
      title: "GRU 학생",
      color: COLORS.gru,
      items: ["머릿속만 사용", "리셋 버튼", "블렌딩 슬라이더"],
    },
  ];

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${COLORS.background} 0%, #1e3a5f 100%)`,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          fontSize: 48,
          fontWeight: 700,
          color: COLORS.primary,
          marginBottom: 50,
          opacity: fadeIn(frame),
        }}
      >
        LSTM vs GRU 비유
      </div>
      <div style={{ display: "flex", gap: 60 }}>
        {students.map((student, i) => (
          <div
            key={i}
            style={{
              background: "rgba(255,255,255,0.08)",
              padding: 40,
              borderRadius: 20,
              border: `3px solid ${student.color}`,
              width: 350,
              opacity: fadeIn(frame, 20 + i * 30),
              transform: `translateY(${slideUp(frame, 20 + i * 30)}px) scale(${scaleIn(frame, fps, 20 + i * 30)})`,
            }}
          >
            <div
              style={{
                fontSize: 32,
                fontWeight: 700,
                color: student.color,
                marginBottom: 30,
                textAlign: "center",
              }}
            >
              {student.title}
            </div>
            {student.items.map((item, j) => (
              <div
                key={j}
                style={{
                  fontSize: 24,
                  color: COLORS.light,
                  marginBottom: 15,
                  padding: "12px 20px",
                  background: "rgba(255,255,255,0.05)",
                  borderRadius: 10,
                  opacity: fadeIn(frame, 50 + i * 30 + j * 15),
                }}
              >
                {item}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div
        style={{
          fontSize: 28,
          color: COLORS.accent,
          marginTop: 50,
          opacity: fadeIn(frame, 100),
        }}
      >
        도구는 적지만 결과는 비슷하게 좋아요!
      </div>
    </AbsoluteFill>
  );
};

const Scene03Structure: React.FC = () => {
  const frame = useCurrentFrame();

  const comparisons = [
    { label: "게이트 수", lstm: "3개 (망각/입력/출력)", gru: "2개 (리셋/업데이트)" },
    { label: "상태", lstm: "셀 상태 + 은닉 상태", gru: "은닉 상태만" },
    { label: "파라미터", lstm: "4배", gru: "3배 (75%)" },
    { label: "학습 속도", lstm: "느림", gru: "빠름" },
    { label: "메모리", lstm: "많이 사용", gru: "적게 사용" },
  ];

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${COLORS.background} 0%, #1e3a5f 100%)`,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          fontSize: 48,
          fontWeight: 700,
          color: COLORS.primary,
          marginBottom: 40,
          opacity: fadeIn(frame),
        }}
      >
        LSTM vs GRU 구조 비교
      </div>
      <div
        style={{
          background: "rgba(0,0,0,0.3)",
          borderRadius: 20,
          padding: 30,
          opacity: fadeIn(frame, 20),
        }}
      >
        <div style={{ display: "flex", marginBottom: 20 }}>
          <div style={{ width: 200, color: COLORS.light, fontSize: 22, fontWeight: 600 }}>항목</div>
          <div style={{ width: 280, color: COLORS.lstm, fontSize: 22, fontWeight: 600, textAlign: "center" }}>LSTM</div>
          <div style={{ width: 280, color: COLORS.gru, fontSize: 22, fontWeight: 600, textAlign: "center" }}>GRU</div>
        </div>
        {comparisons.map((item, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              padding: "15px 0",
              borderTop: "1px solid rgba(255,255,255,0.1)",
              opacity: fadeIn(frame, 30 + i * 15),
              transform: `translateX(${interpolate(frame - (30 + i * 15), [0, 20], [-30, 0], { extrapolateRight: "clamp" })}px)`,
            }}
          >
            <div style={{ width: 200, color: COLORS.accent, fontSize: 20 }}>{item.label}</div>
            <div style={{ width: 280, color: COLORS.light, fontSize: 20, textAlign: "center" }}>{item.lstm}</div>
            <div style={{ width: 280, color: COLORS.light, fontSize: 20, textAlign: "center" }}>{item.gru}</div>
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};

const Scene04ResetGate: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const gateValue = interpolate(frame, [60, 120], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${COLORS.background} 0%, #1e3a5f 100%)`,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          fontSize: 48,
          fontWeight: 700,
          color: COLORS.resetGate,
          marginBottom: 30,
          opacity: fadeIn(frame),
        }}
      >
        리셋 게이트 (Reset Gate)
      </div>
      <div
        style={{
          fontSize: 28,
          color: COLORS.accent,
          marginBottom: 40,
          opacity: fadeIn(frame, 15),
        }}
      >
        "이전 기억을 얼마나 무시할까?"
      </div>
      <div
        style={{
          background: "rgba(0,0,0,0.4)",
          padding: "25px 50px",
          borderRadius: 15,
          marginBottom: 40,
          opacity: fadeIn(frame, 30),
          transform: `scale(${scaleIn(frame, fps, 30)})`,
        }}
      >
        <div style={{ fontFamily: "monospace", fontSize: 32, color: COLORS.light }}>
          r<sub>t</sub> = sigmoid(W<sub>r</sub> * [h<sub>t-1</sub>, x<sub>t</sub>] + b<sub>r</sub>)
        </div>
      </div>
      <div style={{ display: "flex", gap: 60, marginTop: 30 }}>
        <div
          style={{
            textAlign: "center",
            opacity: fadeIn(frame, 50),
            transform: `translateY(${slideUp(frame, 50)}px)`,
          }}
        >
          <div
            style={{
              width: 120,
              height: 120,
              borderRadius: "50%",
              background: `linear-gradient(135deg, ${COLORS.resetGate}33 ${(1 - gateValue) * 100}%, ${COLORS.resetGate} ${(1 - gateValue) * 100}%)`,
              border: `4px solid ${COLORS.resetGate}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 36,
              color: COLORS.light,
              fontWeight: 700,
              margin: "0 auto 15px",
            }}
          >
            0
          </div>
          <div style={{ color: COLORS.light, fontSize: 20 }}>과거 무시</div>
          <div style={{ color: COLORS.accent, fontSize: 18 }}>(리셋)</div>
        </div>
        <div
          style={{
            textAlign: "center",
            opacity: fadeIn(frame, 70),
            transform: `translateY(${slideUp(frame, 70)}px)`,
          }}
        >
          <div
            style={{
              width: 120,
              height: 120,
              borderRadius: "50%",
              background: COLORS.resetGate,
              border: `4px solid ${COLORS.resetGate}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 36,
              color: COLORS.light,
              fontWeight: 700,
              margin: "0 auto 15px",
            }}
          >
            1
          </div>
          <div style={{ color: COLORS.light, fontSize: 20 }}>과거 참고</div>
          <div style={{ color: COLORS.accent, fontSize: 18 }}>(유지)</div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const Scene05UpdateGate: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const sliderPos = interpolate(frame, [60, 150], [0, 100], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${COLORS.background} 0%, #1e3a5f 100%)`,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          fontSize: 48,
          fontWeight: 700,
          color: COLORS.updateGate,
          marginBottom: 30,
          opacity: fadeIn(frame),
        }}
      >
        업데이트 게이트 (Update Gate)
      </div>
      <div
        style={{
          fontSize: 28,
          color: COLORS.accent,
          marginBottom: 30,
          opacity: fadeIn(frame, 15),
        }}
      >
        "이전 상태와 새 정보를 어떤 비율로 섞을까?"
      </div>
      <div
        style={{
          background: "rgba(0,0,0,0.4)",
          padding: "25px 50px",
          borderRadius: 15,
          marginBottom: 30,
          opacity: fadeIn(frame, 30),
          transform: `scale(${scaleIn(frame, fps, 30)})`,
        }}
      >
        <div style={{ fontFamily: "monospace", fontSize: 32, color: COLORS.light }}>
          z<sub>t</sub> = sigmoid(W<sub>z</sub> * [h<sub>t-1</sub>, x<sub>t</sub>] + b<sub>z</sub>)
        </div>
      </div>
      <div
        style={{
          width: 600,
          background: "rgba(255,255,255,0.1)",
          borderRadius: 20,
          padding: 30,
          opacity: fadeIn(frame, 50),
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 15,
            color: COLORS.light,
            fontSize: 20,
          }}
        >
          <span>이전 상태 유지</span>
          <span>새 정보 반영</span>
        </div>
        <div
          style={{
            height: 30,
            background: "linear-gradient(to right, " + COLORS.lstm + ", " + COLORS.gru + ")",
            borderRadius: 15,
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: `${sliderPos}%`,
              top: -5,
              width: 40,
              height: 40,
              borderRadius: "50%",
              background: COLORS.light,
              transform: "translateX(-50%)",
              boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
            }}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 15,
            color: COLORS.accent,
            fontSize: 18,
          }}
        >
          <span>z = 0.9 (90% 유지)</span>
          <span>z = 0.1 (90% 새 정보)</span>
        </div>
      </div>
      <div
        style={{
          fontSize: 24,
          color: COLORS.accent,
          marginTop: 40,
          opacity: fadeIn(frame, 80),
          textAlign: "center",
        }}
      >
        z<sub>t</sub>와 (1-z<sub>t</sub>)로 하나의 게이트가 두 역할!
      </div>
    </AbsoluteFill>
  );
};

const Scene06Candidate: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${COLORS.background} 0%, #1e3a5f 100%)`,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          fontSize: 48,
          fontWeight: 700,
          color: COLORS.hiddenState,
          marginBottom: 30,
          opacity: fadeIn(frame),
        }}
      >
        후보 은닉 상태
      </div>
      <div
        style={{
          fontSize: 28,
          color: COLORS.accent,
          marginBottom: 40,
          opacity: fadeIn(frame, 15),
        }}
      >
        h̃<sub>t</sub> (에이치 틸드)
      </div>
      <div
        style={{
          background: "rgba(0,0,0,0.4)",
          padding: "30px 60px",
          borderRadius: 15,
          marginBottom: 40,
          opacity: fadeIn(frame, 30),
          transform: `scale(${scaleIn(frame, fps, 30)})`,
        }}
      >
        <div style={{ fontFamily: "monospace", fontSize: 32, color: COLORS.light }}>
          h̃<sub>t</sub> = tanh(W<sub>h</sub> * [r<sub>t</sub> * h<sub>t-1</sub>, x<sub>t</sub>] + b<sub>h</sub>)
        </div>
      </div>
      <div style={{ display: "flex", gap: 40, opacity: fadeIn(frame, 50) }}>
        <div
          style={{
            background: `${COLORS.resetGate}22`,
            border: `2px solid ${COLORS.resetGate}`,
            padding: "20px 30px",
            borderRadius: 15,
            transform: `translateY(${slideUp(frame, 50)}px)`,
          }}
        >
          <div style={{ color: COLORS.resetGate, fontSize: 24, fontWeight: 600, marginBottom: 10 }}>
            r<sub>t</sub> * h<sub>t-1</sub>
          </div>
          <div style={{ color: COLORS.light, fontSize: 20 }}>
            리셋 게이트로<br />필터링된 과거
          </div>
        </div>
        <div
          style={{
            fontSize: 48,
            color: COLORS.light,
            alignSelf: "center",
            opacity: fadeIn(frame, 60),
          }}
        >
          +
        </div>
        <div
          style={{
            background: `${COLORS.accent}22`,
            border: `2px solid ${COLORS.accent}`,
            padding: "20px 30px",
            borderRadius: 15,
            transform: `translateY(${slideUp(frame, 70)}px)`,
          }}
        >
          <div style={{ color: COLORS.accent, fontSize: 24, fontWeight: 600, marginBottom: 10 }}>
            x<sub>t</sub>
          </div>
          <div style={{ color: COLORS.light, fontSize: 20 }}>현재 입력</div>
        </div>
      </div>
      <div
        style={{
          fontSize: 24,
          color: COLORS.light,
          marginTop: 40,
          opacity: fadeIn(frame, 90),
        }}
      >
        r = 0 이면 과거 무시 / r = 1 이면 과거 그대로 사용
      </div>
    </AbsoluteFill>
  );
};

const Scene07FinalHidden: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${COLORS.background} 0%, #1e3a5f 100%)`,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          fontSize: 48,
          fontWeight: 700,
          color: COLORS.hiddenState,
          marginBottom: 30,
          opacity: fadeIn(frame),
        }}
      >
        최종 은닉 상태
      </div>
      <div
        style={{
          fontSize: 28,
          color: COLORS.accent,
          marginBottom: 40,
          opacity: fadeIn(frame, 15),
        }}
      >
        가중 평균으로 계산
      </div>
      <div
        style={{
          background: "rgba(0,0,0,0.5)",
          padding: "35px 70px",
          borderRadius: 20,
          marginBottom: 40,
          opacity: fadeIn(frame, 30),
          transform: `scale(${scaleIn(frame, fps, 30)})`,
          border: `3px solid ${COLORS.hiddenState}`,
        }}
      >
        <div style={{ fontFamily: "monospace", fontSize: 36, color: COLORS.light }}>
          h<sub>t</sub> = z<sub>t</sub> * h<sub>t-1</sub> + (1 - z<sub>t</sub>) * h̃<sub>t</sub>
        </div>
      </div>
      <div style={{ display: "flex", gap: 80, marginTop: 30 }}>
        <div
          style={{
            textAlign: "center",
            opacity: fadeIn(frame, 50),
            transform: `translateY(${slideUp(frame, 50)}px)`,
          }}
        >
          <div
            style={{
              width: 180,
              height: 100,
              background: `${COLORS.lstm}33`,
              border: `3px solid ${COLORS.lstm}`,
              borderRadius: 15,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 15,
            }}
          >
            <span style={{ fontSize: 28, color: COLORS.lstm, fontWeight: 600 }}>
              z<sub>t</sub> * h<sub>t-1</sub>
            </span>
          </div>
          <div style={{ color: COLORS.light, fontSize: 20 }}>이전 상태에서</div>
          <div style={{ color: COLORS.accent, fontSize: 18 }}>유지할 부분</div>
        </div>
        <div
          style={{
            textAlign: "center",
            opacity: fadeIn(frame, 70),
            transform: `translateY(${slideUp(frame, 70)}px)`,
          }}
        >
          <div
            style={{
              width: 200,
              height: 100,
              background: `${COLORS.gru}33`,
              border: `3px solid ${COLORS.gru}`,
              borderRadius: 15,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 15,
            }}
          >
            <span style={{ fontSize: 28, color: COLORS.gru, fontWeight: 600 }}>
              (1-z<sub>t</sub>) * h̃<sub>t</sub>
            </span>
          </div>
          <div style={{ color: COLORS.light, fontSize: 20 }}>새로 추가할</div>
          <div style={{ color: COLORS.accent, fontSize: 18 }}>부분</div>
        </div>
      </div>
      <div
        style={{
          fontSize: 26,
          color: COLORS.accent,
          marginTop: 50,
          opacity: fadeIn(frame, 90),
        }}
      >
        잊는 만큼 새로 채운다 - GRU의 핵심!
      </div>
    </AbsoluteFill>
  );
};

const Scene08Flow: React.FC = () => {
  const frame = useCurrentFrame();

  const steps = [
    { num: 1, title: "리셋 게이트", formula: "r_t = sigmoid(...)", color: COLORS.resetGate },
    { num: 2, title: "업데이트 게이트", formula: "z_t = sigmoid(...)", color: COLORS.updateGate },
    { num: 3, title: "후보 은닉 상태", formula: "h̃_t = tanh(...)", color: COLORS.hiddenState },
    { num: 4, title: "최종 은닉 상태", formula: "h_t = z*h + (1-z)*h̃", color: COLORS.gru },
  ];

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${COLORS.background} 0%, #1e3a5f 100%)`,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          fontSize: 48,
          fontWeight: 700,
          color: COLORS.primary,
          marginBottom: 50,
          opacity: fadeIn(frame),
        }}
      >
        GRU 전체 흐름
      </div>
      <div style={{ display: "flex", gap: 30 }}>
        {steps.map((step, i) => (
          <React.Fragment key={i}>
            <div
              style={{
                background: "rgba(0,0,0,0.4)",
                padding: "25px 20px",
                borderRadius: 15,
                border: `3px solid ${step.color}`,
                width: 200,
                textAlign: "center",
                opacity: fadeIn(frame, 20 + i * 25),
                transform: `translateY(${slideUp(frame, 20 + i * 25)}px)`,
              }}
            >
              <div
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: "50%",
                  background: step.color,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 28,
                  fontWeight: 700,
                  color: COLORS.light,
                  margin: "0 auto 15px",
                }}
              >
                {step.num}
              </div>
              <div style={{ color: step.color, fontSize: 20, fontWeight: 600, marginBottom: 10 }}>
                {step.title}
              </div>
              <div style={{ fontFamily: "monospace", color: COLORS.light, fontSize: 16 }}>
                {step.formula}
              </div>
            </div>
            {i < steps.length - 1 && (
              <div
                style={{
                  alignSelf: "center",
                  fontSize: 36,
                  color: COLORS.accent,
                  opacity: fadeIn(frame, 40 + i * 25),
                }}
              >
                →
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
      <div
        style={{
          fontSize: 24,
          color: COLORS.accent,
          marginTop: 50,
          opacity: fadeIn(frame, 120),
        }}
      >
        LSTM과 달리 셀 상태가 없어서 더 단순해요!
      </div>
    </AbsoluteFill>
  );
};

const Scene09GateMapping: React.FC = () => {
  const frame = useCurrentFrame();

  const mappings = [
    { lstm: "망각 게이트 (f_t)", gru: "업데이트 게이트 (z_t)", desc: "이전 정보 유지 비율" },
    { lstm: "입력 게이트 (i_t)", gru: "(1 - z_t)", desc: "새 정보 반영 비율" },
    { lstm: "출력 게이트 (o_t)", gru: "없음", desc: "GRU는 그대로 출력" },
    { lstm: "셀 상태 (C_t)", gru: "없음", desc: "은닉 상태만 사용" },
    { lstm: "-", gru: "리셋 게이트 (r_t)", desc: "후보 생성 시 과거 참조" },
  ];

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${COLORS.background} 0%, #1e3a5f 100%)`,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          fontSize: 44,
          fontWeight: 700,
          color: COLORS.primary,
          marginBottom: 40,
          opacity: fadeIn(frame),
        }}
      >
        LSTM ↔ GRU 게이트 대응
      </div>
      <div
        style={{
          background: "rgba(0,0,0,0.3)",
          borderRadius: 20,
          padding: 25,
          opacity: fadeIn(frame, 20),
        }}
      >
        <div style={{ display: "flex", marginBottom: 15, paddingBottom: 15, borderBottom: "2px solid rgba(255,255,255,0.2)" }}>
          <div style={{ width: 220, color: COLORS.lstm, fontSize: 20, fontWeight: 700 }}>LSTM</div>
          <div style={{ width: 220, color: COLORS.gru, fontSize: 20, fontWeight: 700 }}>GRU</div>
          <div style={{ width: 240, color: COLORS.accent, fontSize: 20, fontWeight: 700 }}>설명</div>
        </div>
        {mappings.map((m, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              padding: "12px 0",
              borderBottom: i < mappings.length - 1 ? "1px solid rgba(255,255,255,0.1)" : "none",
              opacity: fadeIn(frame, 30 + i * 15),
            }}
          >
            <div style={{ width: 220, color: COLORS.light, fontSize: 18 }}>{m.lstm}</div>
            <div style={{ width: 220, color: COLORS.light, fontSize: 18 }}>{m.gru}</div>
            <div style={{ width: 240, color: COLORS.light, fontSize: 16 }}>{m.desc}</div>
          </div>
        ))}
      </div>
      <div
        style={{
          fontSize: 22,
          color: COLORS.accent,
          marginTop: 40,
          opacity: fadeIn(frame, 110),
          textAlign: "center",
        }}
      >
        핵심 차이: LSTM은 f, i가 독립 / GRU는 z, (1-z)로 연동
      </div>
    </AbsoluteFill>
  );
};

const Scene10WhenToUse: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${COLORS.background} 0%, #1e3a5f 100%)`,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          fontSize: 44,
          fontWeight: 700,
          color: COLORS.primary,
          marginBottom: 40,
          opacity: fadeIn(frame),
        }}
      >
        언제 무엇을 선택할까?
      </div>
      <div style={{ display: "flex", gap: 60 }}>
        <div
          style={{
            background: `${COLORS.gru}22`,
            border: `3px solid ${COLORS.gru}`,
            padding: 30,
            borderRadius: 20,
            width: 400,
            opacity: fadeIn(frame, 20),
            transform: `translateY(${slideUp(frame, 20)}px)`,
          }}
        >
          <div style={{ color: COLORS.gru, fontSize: 28, fontWeight: 700, marginBottom: 20 }}>
            GRU 선택
          </div>
          {["데이터셋이 작을 때", "빠른 실험 필요", "메모리 제한", "짧은 시퀀스 (<100)"].map((item, i) => (
            <div
              key={i}
              style={{
                color: COLORS.light,
                fontSize: 20,
                padding: "10px 0",
                borderBottom: "1px solid rgba(255,255,255,0.1)",
                opacity: fadeIn(frame, 40 + i * 15),
              }}
            >
              • {item}
            </div>
          ))}
        </div>
        <div
          style={{
            background: `${COLORS.lstm}22`,
            border: `3px solid ${COLORS.lstm}`,
            padding: 30,
            borderRadius: 20,
            width: 400,
            opacity: fadeIn(frame, 30),
            transform: `translateY(${slideUp(frame, 30)}px)`,
          }}
        >
          <div style={{ color: COLORS.lstm, fontSize: 28, fontWeight: 700, marginBottom: 20 }}>
            LSTM 선택
          </div>
          {["긴 시퀀스 (>500)", "데이터 충분", "정교한 기억 제어", "최고 정확도 필요"].map((item, i) => (
            <div
              key={i}
              style={{
                color: COLORS.light,
                fontSize: 20,
                padding: "10px 0",
                borderBottom: "1px solid rgba(255,255,255,0.1)",
                opacity: fadeIn(frame, 60 + i * 15),
              }}
            >
              • {item}
            </div>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};

const Scene11Comparison: React.FC = () => {
  const frame = useCurrentFrame();

  const rows = [
    { label: "게이트 수", rnn: "0", lstm: "3", gru: "2" },
    { label: "상태 수", rnn: "1 (h)", lstm: "2 (h, C)", gru: "1 (h)" },
    { label: "파라미터 비율", rnn: "1x", lstm: "4x", gru: "3x" },
    { label: "장기 기억", rnn: "약함", lstm: "강함", gru: "양호" },
    { label: "학습 속도", rnn: "빠름", lstm: "느림", gru: "중간" },
  ];

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${COLORS.background} 0%, #1e3a5f 100%)`,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          fontSize: 44,
          fontWeight: 700,
          color: COLORS.primary,
          marginBottom: 40,
          opacity: fadeIn(frame),
        }}
      >
        RNN vs LSTM vs GRU
      </div>
      <div
        style={{
          background: "rgba(0,0,0,0.3)",
          borderRadius: 20,
          padding: 30,
          opacity: fadeIn(frame, 20),
        }}
      >
        <div style={{ display: "flex", marginBottom: 20 }}>
          <div style={{ width: 180, color: COLORS.light, fontSize: 22, fontWeight: 700 }}>항목</div>
          <div style={{ width: 150, color: "#94a3b8", fontSize: 22, fontWeight: 700, textAlign: "center" }}>RNN</div>
          <div style={{ width: 150, color: COLORS.lstm, fontSize: 22, fontWeight: 700, textAlign: "center" }}>LSTM</div>
          <div style={{ width: 150, color: COLORS.gru, fontSize: 22, fontWeight: 700, textAlign: "center" }}>GRU</div>
        </div>
        {rows.map((row, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              padding: "15px 0",
              borderTop: "1px solid rgba(255,255,255,0.1)",
              opacity: fadeIn(frame, 30 + i * 15),
            }}
          >
            <div style={{ width: 180, color: COLORS.accent, fontSize: 20 }}>{row.label}</div>
            <div style={{ width: 150, color: COLORS.light, fontSize: 20, textAlign: "center" }}>{row.rnn}</div>
            <div style={{ width: 150, color: COLORS.light, fontSize: 20, textAlign: "center" }}>{row.lstm}</div>
            <div style={{ width: 150, color: COLORS.light, fontSize: 20, textAlign: "center" }}>{row.gru}</div>
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};

const Scene12Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const summaries = [
    "GRU는 LSTM을 단순화 (게이트 2개, 상태 1개)",
    "리셋 게이트: 과거 참조 정도",
    "업데이트 게이트: 옛것과 새것 혼합 비율",
    "z와 (1-z) 연동: 잊는 만큼 새로 채움",
  ];

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${COLORS.background} 0%, #1e3a5f 100%)`,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          fontSize: 48,
          fontWeight: 700,
          color: COLORS.primary,
          marginBottom: 40,
          opacity: fadeIn(frame),
          transform: `scale(${scaleIn(frame, fps)})`,
        }}
      >
        오늘 배운 내용
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        {summaries.map((text, i) => (
          <div
            key={i}
            style={{
              background: "rgba(255,255,255,0.08)",
              padding: "18px 40px",
              borderRadius: 15,
              fontSize: 26,
              color: COLORS.light,
              opacity: fadeIn(frame, 25 + i * 20),
              transform: `translateX(${interpolate(frame - (25 + i * 20), [0, 20], [-50, 0], { extrapolateRight: "clamp" })}px)`,
              borderLeft: `4px solid ${COLORS.accent}`,
            }}
          >
            {text}
          </div>
        ))}
      </div>
      <div
        style={{
          marginTop: 50,
          padding: "20px 40px",
          background: `${COLORS.primary}22`,
          borderRadius: 15,
          border: `2px solid ${COLORS.primary}`,
          opacity: fadeIn(frame, 110),
        }}
      >
        <div style={{ color: COLORS.primary, fontSize: 24, fontWeight: 600 }}>
          다음 시간: 텍스트 전처리
        </div>
        <div style={{ color: COLORS.light, fontSize: 20, marginTop: 10 }}>
          RNN에 텍스트를 입력하는 방법
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ===================== Main Component =====================
export const Lesson6_4Video: React.FC = () => {
  const scenes = [
    { id: "scene01_intro", Component: Scene01Intro },
    { id: "scene02_analogy", Component: Scene02Analogy },
    { id: "scene03_structure", Component: Scene03Structure },
    { id: "scene04_reset_gate", Component: Scene04ResetGate },
    { id: "scene05_update_gate", Component: Scene05UpdateGate },
    { id: "scene06_candidate", Component: Scene06Candidate },
    { id: "scene07_final_hidden", Component: Scene07FinalHidden },
    { id: "scene08_flow", Component: Scene08Flow },
    { id: "scene09_gate_mapping", Component: Scene09GateMapping },
    { id: "scene10_when_to_use", Component: Scene10WhenToUse },
    { id: "scene11_comparison", Component: Scene11Comparison },
    { id: "scene12_outro", Component: Scene12Outro },
  ];

  return (
    <AbsoluteFill style={{ background: COLORS.background }}>
      <GlobalOverlay />
      {scenes.map(({ id, Component }) => {
        const timing = SCENE_TIMINGS[id as keyof typeof SCENE_TIMINGS];
        return (
          <Sequence key={id} from={timing.start} durationInFrames={timing.duration}>
            <Component />
            <Audio src={staticFile(`audio/lesson-6-4/${id}.mp3`)} />
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
