import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
} from "remotion";
import { colors } from "../../styles";

interface Props {
  durationInFrames: number;
}

export const L03_Scene5_WhileLoop: React.FC<Props> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();

  // 정확도 시뮬레이션
  const targetAccuracy = 0.95;
  const currentAccuracy = Math.min(
    interpolate(frame, [200, 1200], [0.5, 0.98], { extrapolateRight: "clamp" }),
    0.98
  );
  const reachedTarget = currentAccuracy >= targetAccuracy;

  // 강화학습 에이전트 위치
  const agentX = (frame * 2) % 400;
  const gameOver = frame > 900;

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(180deg, ${colors.gray[900]} 0%, #1a2030 100%)`,
        padding: 60,
      }}
    >
      {/* 제목 */}
      <div
        style={{
          opacity: interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" }),
          marginBottom: 40,
        }}
      >
        <h2 style={{ fontSize: 48, color: colors.white, margin: 0 }}>
          🔁 while 반복문 - 목표 기반 학습
        </h2>
      </div>

      <div style={{ display: "flex", gap: 60 }}>
        {/* 왼쪽: 코드 */}
        <div
          style={{
            flex: 1,
            opacity: interpolate(frame, [30, 60], [0, 1], { extrapolateRight: "clamp" }),
          }}
        >
          {/* 첫 번째 예제: 정확도 목표 */}
          <div
            style={{
              backgroundColor: "#1e293b",
              borderRadius: 16,
              padding: 25,
              fontFamily: "monospace",
              fontSize: 20,
              lineHeight: 1.8,
              marginBottom: 30,
            }}
          >
            <div style={{ color: "#94a3b8", marginBottom: 10 }}># 목표 달성까지 학습</div>

            <div>
              <span style={{ color: colors.white }}>accuracy = 0</span>
            </div>
            <div style={{ marginTop: 10 }}>
              <span style={{ color: "#c084fc" }}>while</span>
              <span style={{ color: colors.white }}> accuracy &lt; </span>
              <span style={{ color: "#f97316" }}>0.95</span>
              <span style={{ color: colors.white }}>:</span>
            </div>
            <div style={{ marginLeft: 30 }}>
              <span style={{ color: colors.white }}>accuracy = train_and_evaluate()</span>
            </div>
            <div style={{ marginLeft: 30 }}>
              <span style={{ color: colors.white }}>epoch += 1</span>
            </div>
          </div>

          {/* 두 번째 예제: 강화학습 */}
          <div
            style={{
              opacity: interpolate(frame, [500, 530], [0, 1], { extrapolateRight: "clamp" }),
              backgroundColor: "#1e293b",
              borderRadius: 16,
              padding: 25,
              fontFamily: "monospace",
              fontSize: 20,
              lineHeight: 1.8,
            }}
          >
            <div style={{ color: "#94a3b8", marginBottom: 10 }}># 강화학습 - 게임 에피소드</div>

            <div>
              <span style={{ color: colors.white }}>done = </span>
              <span style={{ color: "#c084fc" }}>False</span>
            </div>
            <div style={{ marginTop: 10 }}>
              <span style={{ color: "#c084fc" }}>while not</span>
              <span style={{ color: colors.white }}> done:</span>
            </div>
            <div style={{ marginLeft: 30 }}>
              <span style={{ color: colors.white }}>action = agent.select_action(state)</span>
            </div>
            <div style={{ marginLeft: 30 }}>
              <span style={{ color: colors.white }}>state, reward, done = env.step(action)</span>
            </div>
          </div>

          {/* 설명 */}
          <div
            style={{
              opacity: interpolate(frame, [700, 730], [0, 1], { extrapolateRight: "clamp" }),
              marginTop: 30,
              padding: 20,
              backgroundColor: "#06b6d420",
              borderRadius: 12,
              border: "1px solid #06b6d4",
            }}
          >
            <div style={{ color: "#06b6d4", fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>
              💡 언제 while을 쓸까?
            </div>
            <div style={{ color: colors.gray[300], fontSize: 18 }}>
              몇 번 반복할지 미리 알 수 없을 때!<br/>
              (목표 달성, 게임 종료 등)
            </div>
          </div>
        </div>

        {/* 오른쪽: 시각화 */}
        <div
          style={{
            flex: 1,
            opacity: interpolate(frame, [100, 130], [0, 1], { extrapolateRight: "clamp" }),
          }}
        >
          {/* 정확도 게이지 */}
          <div
            style={{
              backgroundColor: colors.gray[800],
              borderRadius: 16,
              padding: 30,
              marginBottom: 30,
            }}
          >
            <div style={{ color: colors.white, fontSize: 22, marginBottom: 20 }}>
              목표: 정확도 95% 달성
            </div>

            {/* 원형 게이지 */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: 20,
              }}
            >
              <div
                style={{
                  position: "relative",
                  width: 200,
                  height: 200,
                }}
              >
                {/* 배경 원 */}
                <svg
                  style={{ position: "absolute", top: 0, left: 0 }}
                  width="200"
                  height="200"
                >
                  <circle
                    cx="100"
                    cy="100"
                    r="80"
                    fill="none"
                    stroke={colors.gray[700]}
                    strokeWidth="16"
                  />
                  {/* 진행 원 */}
                  <circle
                    cx="100"
                    cy="100"
                    r="80"
                    fill="none"
                    stroke={reachedTarget ? "#22c55e" : "#3b82f6"}
                    strokeWidth="16"
                    strokeLinecap="round"
                    strokeDasharray={`${currentAccuracy * 502} 502`}
                    transform="rotate(-90 100 100)"
                  />
                  {/* 목표선 */}
                  <circle
                    cx="100"
                    cy="100"
                    r="80"
                    fill="none"
                    stroke="#f97316"
                    strokeWidth="4"
                    strokeDasharray="10 10"
                    strokeDashoffset={`${(1 - targetAccuracy) * 502}`}
                    transform="rotate(-90 100 100)"
                    opacity="0.5"
                  />
                </svg>

                {/* 중앙 텍스트 */}
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      fontSize: 40,
                      fontWeight: "bold",
                      color: reachedTarget ? "#22c55e" : colors.white,
                      fontFamily: "monospace",
                    }}
                  >
                    {(currentAccuracy * 100).toFixed(1)}%
                  </div>
                  <div style={{ fontSize: 14, color: colors.gray[400] }}>
                    / 95%
                  </div>
                </div>
              </div>
            </div>

            {/* 상태 */}
            <div
              style={{
                textAlign: "center",
                padding: "15px 20px",
                backgroundColor: reachedTarget ? "#22c55e20" : "#3b82f620",
                borderRadius: 12,
                border: `1px solid ${reachedTarget ? "#22c55e" : "#3b82f6"}`,
              }}
            >
              <span style={{ fontSize: 24 }}>{reachedTarget ? "🎉" : "⏳"}</span>
              <span
                style={{
                  marginLeft: 10,
                  color: reachedTarget ? "#22c55e" : "#3b82f6",
                  fontSize: 18,
                  fontWeight: "bold",
                }}
              >
                {reachedTarget ? "목표 달성! 학습 종료" : "while 루프 실행 중..."}
              </span>
            </div>
          </div>

          {/* 강화학습 시각화 */}
          <div
            style={{
              opacity: interpolate(frame, [550, 580], [0, 1], { extrapolateRight: "clamp" }),
              backgroundColor: colors.gray[800],
              borderRadius: 16,
              padding: 30,
            }}
          >
            <div style={{ color: colors.white, fontSize: 22, marginBottom: 20 }}>
              강화학습: 게임 플레이
            </div>

            {/* 간단한 게임 화면 */}
            <div
              style={{
                backgroundColor: "#1a1a2e",
                borderRadius: 12,
                height: 100,
                position: "relative",
                overflow: "hidden",
                border: `2px solid ${gameOver ? "#22c55e" : colors.gray[600]}`,
              }}
            >
              {/* 에이전트 */}
              <div
                style={{
                  position: "absolute",
                  left: agentX,
                  bottom: 20,
                  width: 30,
                  height: 30,
                  backgroundColor: "#3b82f6",
                  borderRadius: 8,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 16,
                }}
              >
                🤖
              </div>

              {/* 목표 */}
              <div
                style={{
                  position: "absolute",
                  right: 30,
                  bottom: 20,
                  width: 30,
                  height: 30,
                  backgroundColor: "#22c55e",
                  borderRadius: 8,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 16,
                }}
              >
                🎯
              </div>
            </div>

            <div
              style={{
                marginTop: 15,
                color: gameOver ? "#22c55e" : colors.gray[300],
                fontSize: 16,
                textAlign: "center",
              }}
            >
              {gameOver ? "done = True → 에피소드 종료" : "while not done → 계속 행동"}
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
