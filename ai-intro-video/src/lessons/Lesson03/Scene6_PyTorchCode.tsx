import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
} from "remotion";
import { colors } from "../../styles";

interface Props {
  durationInFrames: number;
}

export const L03_Scene6_PyTorchCode: React.FC<Props> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();

  // 코드 하이라이트 단계
  const highlightStage = Math.floor(interpolate(frame, [100, 1800], [0, 7], { extrapolateRight: "clamp" }));

  const getHighlightStyle = (stage: number) => ({
    backgroundColor: highlightStage === stage ? "#22c55e20" : "transparent",
    padding: "3px 8px",
    borderRadius: 4,
    marginLeft: -8,
    transition: "background-color 0.3s",
  });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(180deg, ${colors.gray[900]} 0%, #1e293b 100%)`,
        padding: 60,
      }}
    >
      {/* 제목 */}
      <div
        style={{
          opacity: interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" }),
          marginBottom: 30,
        }}
      >
        <h2 style={{ fontSize: 48, color: colors.white, margin: 0 }}>
          🐍 실제 PyTorch 학습 코드
        </h2>
        <p style={{ fontSize: 22, color: colors.gray[400], margin: "15px 0 0 0" }}>
          지금까지 배운 모든 것이 합쳐진 코드
        </p>
      </div>

      <div style={{ display: "flex", gap: 40 }}>
        {/* 코드 */}
        <div
          style={{
            flex: 2,
            opacity: interpolate(frame, [30, 60], [0, 1], { extrapolateRight: "clamp" }),
          }}
        >
          <div
            style={{
              backgroundColor: "#0f172a",
              borderRadius: 16,
              padding: 25,
              fontFamily: "monospace",
              fontSize: 17,
              lineHeight: 1.7,
              border: "1px solid #334155",
            }}
          >
            {/* 설정 부분 */}
            <div style={{ color: "#94a3b8", marginBottom: 5 }}># 학습 설정</div>
            <div style={{ color: colors.white }}>epochs = 100</div>
            <div style={{ color: colors.white }}>best_val_loss = float('inf')</div>
            <div style={{ color: colors.white }}>patience_counter = 0</div>
            <div style={{ marginBottom: 15 }} />

            {/* 메인 루프 */}
            <div style={getHighlightStyle(1)}>
              <span style={{ color: "#94a3b8" }}># 🔄 메인 학습 루프</span>
            </div>
            <div style={getHighlightStyle(1)}>
              <span style={{ color: "#c084fc" }}>for</span>
              <span style={{ color: colors.white }}> epoch </span>
              <span style={{ color: "#c084fc" }}>in</span>
              <span style={{ color: "#60a5fa" }}> range</span>
              <span style={{ color: colors.white }}>(epochs):</span>
            </div>

            <div style={{ marginLeft: 25 }}>
              <div style={{ color: colors.white }}>model.train()</div>
              <div style={{ marginBottom: 10 }} />

              {/* 배치 루프 */}
              <div style={getHighlightStyle(2)}>
                <span style={{ color: "#94a3b8" }}># 📦 배치 단위 학습</span>
              </div>
              <div style={getHighlightStyle(2)}>
                <span style={{ color: "#c084fc" }}>for</span>
                <span style={{ color: colors.white }}> batch_idx, (data, target) </span>
                <span style={{ color: "#c084fc" }}>in</span>
                <span style={{ color: colors.white }}> enumerate(train_loader):</span>
              </div>

              <div style={{ marginLeft: 25 }}>
                <div style={{ color: colors.white }}>optimizer.zero_grad()</div>
                <div style={{ color: colors.white }}>output = model(data)</div>
                <div style={{ color: colors.white }}>loss = criterion(output, target)</div>
                <div style={{ color: colors.white }}>loss.backward()</div>
                <div style={{ color: colors.white }}>optimizer.step()</div>
              </div>

              <div style={{ marginBottom: 10 }} />

              {/* 검증 */}
              <div style={getHighlightStyle(3)}>
                <span style={{ color: "#94a3b8" }}># 📈 검증</span>
              </div>
              <div style={{ color: colors.white }}>model.eval()</div>
              <div style={{ color: colors.white }}>val_loss = validate(model, val_loader)</div>

              <div style={{ marginBottom: 10 }} />

              {/* Early Stopping */}
              <div style={getHighlightStyle(4)}>
                <span style={{ color: "#94a3b8" }}># 🎯 Early Stopping 체크</span>
              </div>
              <div style={getHighlightStyle(4)}>
                <span style={{ color: "#c084fc" }}>if</span>
                <span style={{ color: colors.white }}> val_loss &lt; best_val_loss:</span>
              </div>
              <div style={{ marginLeft: 25 }}>
                <div style={{ color: colors.white }}>best_val_loss = val_loss</div>
                <div style={{ color: colors.white }}>torch.save(model.state_dict(), 'best.pt')</div>
                <div style={{ color: colors.white }}>patience_counter = 0</div>
              </div>

              <div style={getHighlightStyle(5)}>
                <span style={{ color: "#c084fc" }}>else</span>
                <span style={{ color: colors.white }}>:</span>
              </div>
              <div style={{ marginLeft: 25 }}>
                <div style={{ color: colors.white }}>patience_counter += 1</div>
              </div>

              <div style={{ marginBottom: 10 }} />

              {/* 조기 종료 */}
              <div style={getHighlightStyle(6)}>
                <span style={{ color: "#94a3b8" }}># ⏹️ 조기 종료</span>
              </div>
              <div style={getHighlightStyle(6)}>
                <span style={{ color: "#c084fc" }}>if</span>
                <span style={{ color: colors.white }}> patience_counter &gt;= 10:</span>
              </div>
              <div style={{ marginLeft: 25 }}>
                <div style={{ color: "#22c55e" }}>print("Early stopping")</div>
                <div style={{ color: "#f97316" }}>break</div>
              </div>
            </div>
          </div>
        </div>

        {/* 오른쪽: 설명 */}
        <div
          style={{
            flex: 1,
            opacity: interpolate(frame, [100, 130], [0, 1], { extrapolateRight: "clamp" }),
          }}
        >
          {/* 단계별 설명 */}
          <div
            style={{
              backgroundColor: colors.gray[800],
              borderRadius: 16,
              padding: 25,
            }}
          >
            <div style={{ color: colors.white, fontSize: 22, marginBottom: 20 }}>
              코드 구조 분석
            </div>

            {[
              { stage: 1, icon: "🔄", title: "Epoch 루프", desc: "전체 데이터 100회 반복" },
              { stage: 2, icon: "📦", title: "Batch 루프", desc: "데이터를 배치 단위로 처리" },
              { stage: 3, icon: "📈", title: "검증", desc: "학습 후 성능 확인" },
              { stage: 4, icon: "💾", title: "모델 저장", desc: "개선되면 저장" },
              { stage: 5, icon: "⏳", title: "Patience 증가", desc: "개선 안되면 카운트" },
              { stage: 6, icon: "⏹️", title: "Early Stop", desc: "10회 미개선시 종료" },
            ].map((item, idx) => (
              <div
                key={idx}
                style={{
                  padding: "12px 15px",
                  marginBottom: 10,
                  backgroundColor: highlightStage === item.stage ? "#22c55e20" : colors.gray[700],
                  borderRadius: 10,
                  border: `1px solid ${highlightStage === item.stage ? "#22c55e" : colors.gray[600]}`,
                  transition: "all 0.3s",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: 24 }}>{item.icon}</span>
                  <div>
                    <div style={{ color: colors.white, fontSize: 16, fontWeight: "bold" }}>
                      {item.title}
                    </div>
                    <div style={{ color: colors.gray[400], fontSize: 14 }}>
                      {item.desc}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 핵심 메시지 */}
          <div
            style={{
              opacity: interpolate(frame, [1500, 1530], [0, 1], { extrapolateRight: "clamp" }),
              marginTop: 25,
              padding: 20,
              backgroundColor: "#f9731620",
              borderRadius: 12,
              border: "1px solid #f97316",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: 28, marginBottom: 10 }}>🎯</div>
            <div style={{ color: "#f97316", fontSize: 18, fontWeight: "bold" }}>
              이것이 딥러닝 학습의<br/>표준 패턴입니다!
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
