import { AbsoluteFill, Audio, staticFile, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";

const LEVEL_COLOR = "#F97316";

export const Scene3_FullModel: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });

  // Code blocks animation
  const saveCodeOpacity = interpolate(frame, [60, 90], [0, 1], { extrapolateRight: "clamp" });
  const loadCodeOpacity = interpolate(frame, [180, 210], [0, 1], { extrapolateRight: "clamp" });

  // Warning animation
  const warningOpacity = interpolate(frame, [360, 400], [0, 1], { extrapolateRight: "clamp" });
  const warningScale = spring({ frame: frame - 360, fps, from: 0.8, to: 1, durationInFrames: 20 });

  // Comparison animation
  const comparisonOpacity = interpolate(frame, [600, 640], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ backgroundColor: "#0f0f23" }}>
      <Audio src={staticFile("audio/lesson-4-7/scene3.mp3")} />

      {/* Title */}
      <h2
        style={{
          position: "absolute",
          top: 30,
          width: "100%",
          textAlign: "center",
          fontSize: 48,
          color: "white",
          opacity: titleOpacity,
          margin: 0,
        }}
      >
        <span style={{ color: "#8b5cf6" }}>전체 모델</span> 저장 방식
      </h2>

      {/* Save code block */}
      <div
        style={{
          position: "absolute",
          top: 110,
          left: 60,
          width: 500,
          opacity: saveCodeOpacity,
        }}
      >
        <div
          style={{
            backgroundColor: "#8b5cf6",
            padding: "8px 15px",
            borderRadius: "10px 10px 0 0",
            fontSize: 18,
            fontWeight: "bold",
            color: "white",
          }}
        >
          저장 (Save)
        </div>
        <div
          style={{
            backgroundColor: "#1e293b",
            padding: 20,
            borderRadius: "0 0 10px 10px",
            fontFamily: "monospace",
            fontSize: 22,
            lineHeight: 1.6,
          }}
        >
          <div>
            <span style={{ color: "#f472b6" }}>torch</span>
            <span style={{ color: "#e2e8f0" }}>.</span>
            <span style={{ color: "#60a5fa" }}>save</span>
            <span style={{ color: "#e2e8f0" }}>(</span>
            <span style={{ color: "#10b981" }}>model</span>
            <span style={{ color: "#e2e8f0" }}>, </span>
            <span style={{ color: "#fbbf24" }}>'model.pt'</span>
            <span style={{ color: "#e2e8f0" }}>)</span>
          </div>
        </div>
        <div style={{ marginTop: 10, fontSize: 18, color: "#9ca3af" }}>
          모델 구조 + 가중치 함께 저장
        </div>
      </div>

      {/* Load code block */}
      <div
        style={{
          position: "absolute",
          top: 110,
          right: 60,
          width: 500,
          opacity: loadCodeOpacity,
        }}
      >
        <div
          style={{
            backgroundColor: "#60a5fa",
            padding: "8px 15px",
            borderRadius: "10px 10px 0 0",
            fontSize: 18,
            fontWeight: "bold",
            color: "white",
          }}
        >
          로드 (Load)
        </div>
        <div
          style={{
            backgroundColor: "#1e293b",
            padding: 20,
            borderRadius: "0 0 10px 10px",
            fontFamily: "monospace",
            fontSize: 22,
            lineHeight: 1.6,
          }}
        >
          <div>
            <span style={{ color: "#e2e8f0" }}>model = </span>
            <span style={{ color: "#f472b6" }}>torch</span>
            <span style={{ color: "#e2e8f0" }}>.</span>
            <span style={{ color: "#60a5fa" }}>load</span>
            <span style={{ color: "#e2e8f0" }}>(</span>
            <span style={{ color: "#fbbf24" }}>'model.pt'</span>
            <span style={{ color: "#e2e8f0" }}>)</span>
          </div>
        </div>
        <div style={{ marginTop: 10, fontSize: 18, color: "#9ca3af" }}>
          한 줄로 바로 사용 가능
        </div>
      </div>

      {/* Warning box */}
      <div
        style={{
          position: "absolute",
          top: 300,
          left: "50%",
          transform: `translateX(-50%) scale(${warningScale})`,
          width: 800,
          opacity: warningOpacity,
        }}
      >
        <div
          style={{
            backgroundColor: "#f43f5e",
            padding: "10px 15px",
            borderRadius: "10px 10px 0 0",
            fontSize: 20,
            fontWeight: "bold",
            color: "white",
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <span style={{ fontSize: 24 }}>⚠️</span>
          주의사항
        </div>
        <div
          style={{
            backgroundColor: "#1e293b",
            padding: 25,
            borderRadius: "0 0 10px 10px",
            fontSize: 22,
            lineHeight: 1.8,
          }}
        >
          {[
            "Pickle 방식 저장 → 모델 클래스 정의 필수",
            "Python 버전 다르면 호환 문제 발생 가능",
            "보안 취약점 위험 (신뢰할 수 없는 파일 주의)",
          ].map((warning, i) => (
            <div key={i} style={{ color: "#e2e8f0" }}>
              <span style={{ color: "#f43f5e", marginRight: 10 }}>✗</span>
              {warning}
            </div>
          ))}
        </div>
      </div>

      {/* Comparison */}
      <div
        style={{
          position: "absolute",
          bottom: 60,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          gap: 50,
          opacity: comparisonOpacity,
        }}
      >
        <div
          style={{
            backgroundColor: "#1e293b",
            padding: "15px 30px",
            borderRadius: 15,
            border: "2px solid #10b981",
          }}
        >
          <div style={{ color: "#10b981", fontSize: 20, fontWeight: "bold", marginBottom: 5 }}>
            빠른 테스트
          </div>
          <div style={{ color: "#9ca3af", fontSize: 18 }}>전체 모델 저장 OK</div>
        </div>
        <div
          style={{
            backgroundColor: "#1e293b",
            padding: "15px 30px",
            borderRadius: 15,
            border: `2px solid ${LEVEL_COLOR}`,
          }}
        >
          <div style={{ color: LEVEL_COLOR, fontSize: 20, fontWeight: "bold", marginBottom: 5 }}>
            배포 / 장기 보관
          </div>
          <div style={{ color: "#9ca3af", fontSize: 18 }}>state_dict 권장!</div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
