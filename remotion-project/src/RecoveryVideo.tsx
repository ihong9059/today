import {
  AbsoluteFill,
  Audio,
  Sequence,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import React from "react";

// Scene timing configuration (frames at 30fps)
// scene01_intro: 801 frames (24.72s)
// scene02_analysis: 1235 frames (39.19s)
// scene03_phase1: 1219 frames (38.64s)
// scene04_phase2: 1667 frames (53.59s)
// scene05_phase3: 1474 frames (47.16s)
// scene06_phase4: 1289 frames (40.97s)
// scene07_integrated: 1318 frames (41.95s)
// scene08_cost: 1630 frames (52.34s)
// scene09_roi: 1422 frames (45.43s)
// scene10_conclusion: 1467 frames (46.92s)

export const SCENE_TIMINGS = {
  scene01_intro: { duration: 801, start: 0 },
  scene02_analysis: { duration: 1235, start: 801 },
  scene03_phase1: { duration: 1219, start: 2036 },
  scene04_phase2: { duration: 1667, start: 3255 },
  scene05_phase3: { duration: 1474, start: 4922 },
  scene06_phase4: { duration: 1289, start: 6396 },
  scene07_integrated: { duration: 1318, start: 7685 },
  scene08_cost: { duration: 1630, start: 9003 },
  scene09_roi: { duration: 1422, start: 10633 },
  scene10_conclusion: { duration: 1467, start: 12055 },
};

export const TOTAL_DURATION = 13522;

// Common styles - Orange/Gold accent theme for recovery
const styles = {
  background: {
    background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
  },
  title: {
    color: "#ffa500",
    fontSize: 52,
    fontWeight: "bold" as const,
    textAlign: "center" as const,
    marginBottom: 30,
    textShadow: "0 0 20px rgba(255, 165, 0, 0.5)",
  },
  subtitle: {
    color: "#ffffff",
    fontSize: 32,
    textAlign: "center" as const,
    marginBottom: 20,
  },
  content: {
    color: "#e0e0e0",
    fontSize: 26,
    lineHeight: 1.6,
    padding: "0 80px",
  },
  accentBox: {
    background: "rgba(255, 165, 0, 0.1)",
    border: "2px solid #ffa500",
    borderRadius: 15,
    padding: 25,
    margin: "20px 60px",
  },
  greenBox: {
    background: "rgba(0, 255, 136, 0.1)",
    border: "2px solid #00ff88",
    borderRadius: 15,
    padding: 25,
    margin: "20px 60px",
  },
  warningBox: {
    background: "rgba(255, 107, 107, 0.15)",
    border: "2px solid #ff6b6b",
    borderRadius: 15,
    padding: 25,
    margin: "20px 60px",
  },
  table: {
    width: "90%",
    margin: "20px auto",
    borderCollapse: "collapse" as const,
    fontSize: 22,
  },
  th: {
    background: "rgba(255, 165, 0, 0.2)",
    color: "#ffa500",
    padding: "12px 15px",
    border: "1px solid #ffa500",
    fontWeight: "bold" as const,
  },
  td: {
    background: "rgba(255, 255, 255, 0.05)",
    color: "#ffffff",
    padding: "10px 15px",
    border: "1px solid rgba(255, 165, 0, 0.3)",
    textAlign: "center" as const,
  },
  flowBox: {
    background: "rgba(0, 150, 255, 0.15)",
    border: "2px solid #0096ff",
    borderRadius: 10,
    padding: "15px 25px",
    margin: "10px",
    display: "inline-block",
    color: "#ffffff",
    fontSize: 20,
  },
  arrow: {
    color: "#ffa500",
    fontSize: 30,
    margin: "0 15px",
  },
  codeBlock: {
    background: "rgba(0, 0, 0, 0.4)",
    borderRadius: 10,
    padding: 20,
    fontFamily: "monospace",
    fontSize: 20,
    color: "#ffa500",
    margin: "15px 60px",
    border: "1px solid #ffa500",
  },
  badge: {
    display: "inline-block",
    padding: "5px 15px",
    borderRadius: 20,
    fontSize: 18,
    fontWeight: "bold" as const,
    marginRight: 10,
  },
};

// Scene 01: Intro
const Scene01Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });
  const titleY = spring({ frame, fps, from: -50, to: 0, durationInFrames: 45 });
  const contentOpacity = interpolate(frame, [30, 60], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={styles.background}>
      <div style={{ padding: 60 }}>
        <div style={{ ...styles.title, fontSize: 54, opacity: titleOpacity, transform: `translateY(${titleY}px)` }}>
          유가금속 회수율 극대화
        </div>
        <div style={{ ...styles.subtitle, opacity: contentOpacity, color: "#ffa500" }}>
          분쇄설비 개선안 | 한국기계엔지니어링
        </div>

        <div style={{ display: "flex", justifyContent: "center", gap: 40, marginTop: 50, opacity: contentOpacity }}>
          <div style={{ ...styles.accentBox, flex: 1, textAlign: "center", margin: 0 }}>
            <div style={{ color: "#ff6b6b", fontSize: 20, marginBottom: 10 }}>현재 회수율</div>
            <div style={{ color: "#ff6b6b", fontSize: 56, fontWeight: "bold" }}>92%</div>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div style={{ color: "#ffa500", fontSize: 50 }}>→</div>
          </div>
          <div style={{ ...styles.greenBox, flex: 1, textAlign: "center", margin: 0 }}>
            <div style={{ color: "#00ff88", fontSize: 20, marginBottom: 10 }}>목표 회수율</div>
            <div style={{ color: "#00ff88", fontSize: 56, fontWeight: "bold" }}>98%+</div>
          </div>
        </div>

        <div style={{ ...styles.accentBox, marginTop: 40, opacity: contentOpacity }}>
          <div style={{ color: "#ffa500", fontSize: 22, fontWeight: "bold", marginBottom: 10 }}>
            개선 목표: +6%p 이상 향상
          </div>
          <div style={{ color: "#ffffff", fontSize: 20 }}>
            Li, Co, Ni, Mn 유가금속 회수율 극대화를 통한 수익성 개선
          </div>
        </div>
      </div>

      <Audio src={staticFile("recovery/scene01_intro.mp3")} />
    </AbsoluteFill>
  );
};

// Scene 02: Current Process Analysis
const Scene02Analysis: React.FC = () => {
  const frame = useCurrentFrame();

  const processes = [
    { name: "1차 파쇄", loss: "1~2%", remain: "98~99%", cause: "분진 비산, 케이스 부착", color: "#ff6b6b" },
    { name: "2차 분쇄", loss: "2~3%", remain: "95~97%", cause: "과분쇄 미분, 집진 배출", color: "#ffa500" },
    { name: "3차 박리", loss: "2~4%", remain: "92~95%", cause: "불완전 박리, 미분 손실", color: "#ffd700" },
    { name: "분급/선별", loss: "1~3%", remain: "90~93%", cause: "분급 효율, 혼입", color: "#0096ff" },
  ];

  return (
    <AbsoluteFill style={styles.background}>
      <div style={{ padding: 50 }}>
        <div style={styles.title}>
          현재 공정별 회수율 분석
        </div>

        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginBottom: 30 }}>
          <div style={{ ...styles.flowBox, background: "rgba(0, 255, 136, 0.2)", borderColor: "#00ff88" }}>
            폐배터리 100%
          </div>
          {processes.map((p, i) => {
            const delay = 30 + i * 25;
            const opacity = interpolate(frame, [delay, delay + 20], [0, 1], { extrapolateRight: "clamp" });
            return (
              <React.Fragment key={i}>
                <span style={{ ...styles.arrow, opacity }}>→</span>
                <div style={{ ...styles.flowBox, opacity, background: `rgba(${p.color === "#ff6b6b" ? "255,107,107" : p.color === "#ffa500" ? "255,165,0" : p.color === "#ffd700" ? "255,215,0" : "0,150,255"}, 0.15)`, borderColor: p.color }}>
                  <div style={{ fontWeight: "bold" }}>{p.name}</div>
                  <div style={{ fontSize: 14, color: "#aaa" }}>손실 {p.loss}</div>
                </div>
              </React.Fragment>
            );
          })}
        </div>

        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>공정</th>
              <th style={styles.th}>손실율</th>
              <th style={styles.th}>잔류율</th>
              <th style={styles.th}>주요 원인</th>
            </tr>
          </thead>
          <tbody>
            {processes.map((p, i) => {
              const delay = 100 + i * 15;
              const rowOpacity = interpolate(frame, [delay, delay + 15], [0, 1], { extrapolateRight: "clamp" });
              return (
                <tr key={i} style={{ opacity: rowOpacity }}>
                  <td style={{ ...styles.td, color: p.color, fontWeight: "bold" }}>{p.name}</td>
                  <td style={{ ...styles.td, color: "#ff6b6b" }}>{p.loss}</td>
                  <td style={{ ...styles.td, color: "#00ff88" }}>{p.remain}</td>
                  <td style={{ ...styles.td, textAlign: "left" }}>{p.cause}</td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <div style={{ ...styles.warningBox, marginTop: 20 }}>
          <span style={{ color: "#ff6b6b", fontWeight: "bold" }}>총 손실: 약 8~12% | </span>
          <span style={{ color: "#ffffff" }}>현재 평균 회수율 92% → 목표 98%+ (개선 필요량 +6%p)</span>
        </div>
      </div>

      <Audio src={staticFile("recovery/scene02_analysis.mp3")} />
    </AbsoluteFill>
  );
};

// Scene 03: Phase 1 - Crushing Improvement
const Scene03Phase1: React.FC = () => {
  const frame = useCurrentFrame();

  const improvements = [
    { item: "투입 시스템", current: "개방형", improved: "이중 에어락", effect: "외부 공기 유입 차단" },
    { item: "파쇄 챔버", current: "반밀폐형", improved: "완전 밀폐형", effect: "분진 비산 0.1% 이하" },
    { item: "분위기", current: "공기", improved: "N2 퍼지 (O2<5%)", effect: "발화 방지, 산화 방지" },
    { item: "집진", current: "외부 배출", improved: "내부 순환식", effect: "분진 전량 회수" },
    { item: "파쇄기 RPM", current: "15~25", improved: "5~10", effect: "과분쇄 방지" },
    { item: "칼날 형상", current: "직선형", improved: "Hook형", effect: "케이스 분리 향상" },
  ];

  return (
    <AbsoluteFill style={styles.background}>
      <div style={{ padding: 45 }}>
        <div style={styles.title}>
          1차 파쇄 공정 개선안
        </div>
        <div style={{ ...styles.subtitle, color: "#ffa500", fontSize: 26 }}>
          밀폐형 N2 파쇄 시스템 + 저속 고토크 파쇄기
        </div>

        <table style={{ ...styles.table, fontSize: 20 }}>
          <thead>
            <tr>
              <th style={styles.th}>항목</th>
              <th style={styles.th}>현재</th>
              <th style={styles.th}>개선안</th>
              <th style={styles.th}>효과</th>
            </tr>
          </thead>
          <tbody>
            {improvements.map((item, i) => {
              const delay = 20 + i * 12;
              const rowOpacity = interpolate(frame, [delay, delay + 15], [0, 1], { extrapolateRight: "clamp" });
              return (
                <tr key={i} style={{ opacity: rowOpacity }}>
                  <td style={{ ...styles.td, color: "#ffa500", fontWeight: "bold" }}>{item.item}</td>
                  <td style={{ ...styles.td, color: "#ff6b6b" }}>{item.current}</td>
                  <td style={{ ...styles.td, color: "#00ff88" }}>{item.improved}</td>
                  <td style={{ ...styles.td, textAlign: "left" }}>{item.effect}</td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <div style={{ ...styles.greenBox, marginTop: 25 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <span style={{ color: "#00ff88", fontWeight: "bold", fontSize: 22 }}>예상 손실 감소: </span>
              <span style={{ color: "#ffffff", fontSize: 22 }}>1.5% → 0.3%</span>
            </div>
            <div style={{ color: "#ffa500", fontSize: 28, fontWeight: "bold" }}>-1.2%p</div>
          </div>
        </div>
      </div>

      <Audio src={staticFile("recovery/scene03_phase1.mp3")} />
    </AbsoluteFill>
  );
};

// Scene 04: Phase 2 - Grinding Improvement
const Scene04Phase2: React.FC = () => {
  const frame = useCurrentFrame();

  const comparison = [
    { item: "분쇄 방식", hammer: "충격식 (고속 회전)", roll: "전단식 (저속 압축)" },
    { item: "RPM", hammer: "600~1200", roll: "50~200" },
    { item: "미분 발생", hammer: "15~20%", roll: "5~8%" },
    { item: "입도 분포", hammer: "넓음", roll: "좁음 (균일)" },
    { item: "에너지 효율", hammer: "낮음 (75kW)", roll: "높음 (55kW)" },
  ];

  const dustRecovery = [
    { stage: "1차 사이클론", spec: "고효율 멀티 사이클론", efficiency: "95% (>10μm)" },
    { stage: "2차 백필터", spec: "PTFE 코팅, 0.5μm", efficiency: "99.9% (미분)" },
    { stage: "회수 시스템", spec: "로터리 밸브 + 스크류", efficiency: "연속 공정 복귀" },
  ];

  return (
    <AbsoluteFill style={styles.background}>
      <div style={{ padding: 40 }}>
        <div style={styles.title}>
          2차 분쇄 공정 개선안
        </div>

        <div style={{ display: "flex", gap: 30 }}>
          <div style={{ flex: 1 }}>
            <div style={{ ...styles.subtitle, fontSize: 22, color: "#ffa500", textAlign: "left" }}>
              해머 크러셔 → 4단 롤 크러셔
            </div>
            <table style={{ ...styles.table, width: "100%", fontSize: 18 }}>
              <thead>
                <tr>
                  <th style={styles.th}>항목</th>
                  <th style={{ ...styles.th, background: "rgba(255, 107, 107, 0.2)", color: "#ff6b6b" }}>해머</th>
                  <th style={{ ...styles.th, background: "rgba(0, 255, 136, 0.2)", color: "#00ff88" }}>롤</th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((c, i) => {
                  const delay = 20 + i * 12;
                  const rowOpacity = interpolate(frame, [delay, delay + 12], [0, 1], { extrapolateRight: "clamp" });
                  return (
                    <tr key={i} style={{ opacity: rowOpacity }}>
                      <td style={{ ...styles.td, color: "#ffa500" }}>{c.item}</td>
                      <td style={{ ...styles.td, color: "#ff6b6b" }}>{c.hammer}</td>
                      <td style={{ ...styles.td, color: "#00ff88" }}>{c.roll}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div style={{ flex: 1 }}>
            <div style={{ ...styles.subtitle, fontSize: 22, color: "#0096ff", textAlign: "left" }}>
              집진 회수 시스템 개선
            </div>
            <table style={{ ...styles.table, width: "100%", fontSize: 18 }}>
              <thead>
                <tr>
                  <th style={{ ...styles.th, color: "#0096ff", background: "rgba(0, 150, 255, 0.2)" }}>단계</th>
                  <th style={{ ...styles.th, color: "#0096ff", background: "rgba(0, 150, 255, 0.2)" }}>사양</th>
                  <th style={{ ...styles.th, color: "#0096ff", background: "rgba(0, 150, 255, 0.2)" }}>효율</th>
                </tr>
              </thead>
              <tbody>
                {dustRecovery.map((d, i) => {
                  const delay = 80 + i * 15;
                  const rowOpacity = interpolate(frame, [delay, delay + 15], [0, 1], { extrapolateRight: "clamp" });
                  return (
                    <tr key={i} style={{ opacity: rowOpacity }}>
                      <td style={{ ...styles.td, color: "#0096ff" }}>{d.stage}</td>
                      <td style={styles.td}>{d.spec}</td>
                      <td style={{ ...styles.td, color: "#00ff88" }}>{d.efficiency}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div style={{ ...styles.greenBox, marginTop: 20 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <span style={{ color: "#00ff88", fontWeight: "bold", fontSize: 22 }}>예상 손실 감소: </span>
              <span style={{ color: "#ffffff", fontSize: 22 }}>2.5% → 0.5%</span>
            </div>
            <div style={{ color: "#ffa500", fontSize: 28, fontWeight: "bold" }}>-2.0%p</div>
          </div>
        </div>
      </div>

      <Audio src={staticFile("recovery/scene04_phase2.mp3")} />
    </AbsoluteFill>
  );
};

// Scene 05: Phase 3 - Separation Improvement
const Scene05Phase3: React.FC = () => {
  const frame = useCurrentFrame();

  const twoStage = [
    { stage: "1단: 볼밀 스크러버", rpm: "30~60 RPM", media: "세라믹 볼 Φ10~20mm", result: "80% 박리, 미분 5% 이하" },
    { stage: "중간 스크린 분급", rpm: "-", media: "박리 완료분 분리", result: "제품 라인 직행" },
    { stage: "2단: 핀밀 (기존)", rpm: "4000~5000 RPM", media: "Pin 충격 박리", result: "잔여 20% 정밀 박리" },
  ];

  return (
    <AbsoluteFill style={styles.background}>
      <div style={{ padding: 45 }}>
        <div style={styles.title}>
          3차 박리 공정 개선안
        </div>
        <div style={{ ...styles.subtitle, color: "#ffa500", fontSize: 26 }}>
          2단 박리 시스템: 저속 볼밀 + 고속 핀밀
        </div>

        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginBottom: 25, marginTop: 20 }}>
          <div style={{ ...styles.flowBox, background: "rgba(0, 255, 136, 0.15)", borderColor: "#00ff88" }}>
            <div style={{ fontWeight: "bold" }}>1단 볼밀</div>
            <div style={{ fontSize: 16, color: "#aaa" }}>저속 마찰 박리</div>
            <div style={{ fontSize: 16, color: "#00ff88" }}>80% 박리</div>
          </div>
          <span style={styles.arrow}>→</span>
          <div style={{ ...styles.flowBox, background: "rgba(0, 150, 255, 0.15)", borderColor: "#0096ff" }}>
            <div style={{ fontWeight: "bold" }}>중간 스크린</div>
            <div style={{ fontSize: 16, color: "#aaa" }}>박리 완료분 분리</div>
            <div style={{ fontSize: 16, color: "#0096ff" }}>70% 직행</div>
          </div>
          <span style={styles.arrow}>→</span>
          <div style={{ ...styles.flowBox, background: "rgba(255, 165, 0, 0.15)", borderColor: "#ffa500" }}>
            <div style={{ fontWeight: "bold" }}>2단 핀밀</div>
            <div style={{ fontSize: 16, color: "#aaa" }}>고속 충격 박리</div>
            <div style={{ fontSize: 16, color: "#ffa500" }}>30% 처리</div>
          </div>
        </div>

        <table style={{ ...styles.table, fontSize: 20 }}>
          <thead>
            <tr>
              <th style={styles.th}>단계</th>
              <th style={styles.th}>RPM</th>
              <th style={styles.th}>방식/미디어</th>
              <th style={styles.th}>결과</th>
            </tr>
          </thead>
          <tbody>
            {twoStage.map((s, i) => {
              const delay = 40 + i * 18;
              const rowOpacity = interpolate(frame, [delay, delay + 18], [0, 1], { extrapolateRight: "clamp" });
              return (
                <tr key={i} style={{ opacity: rowOpacity }}>
                  <td style={{ ...styles.td, color: "#ffa500", fontWeight: "bold" }}>{s.stage}</td>
                  <td style={{ ...styles.td, color: "#0096ff" }}>{s.rpm}</td>
                  <td style={styles.td}>{s.media}</td>
                  <td style={{ ...styles.td, color: "#00ff88" }}>{s.result}</td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <div style={{ ...styles.accentBox, marginTop: 20 }}>
          <span style={{ color: "#ffa500", fontWeight: "bold" }}>핵심 효과: </span>
          <span style={{ color: "#ffffff" }}>
            핀밀 처리량 70% 감소 → 과분쇄 감소 | 세라믹 볼 사용 → 금속 오염 방지
          </span>
        </div>

        <div style={{ ...styles.greenBox, marginTop: 15 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <span style={{ color: "#00ff88", fontWeight: "bold", fontSize: 22 }}>예상 손실 감소: </span>
              <span style={{ color: "#ffffff", fontSize: 22 }}>3.0% → 0.7%</span>
            </div>
            <div style={{ color: "#ffa500", fontSize: 28, fontWeight: "bold" }}>-2.3%p</div>
          </div>
        </div>
      </div>

      <Audio src={staticFile("recovery/scene05_phase3.mp3")} />
    </AbsoluteFill>
  );
};

// Scene 06: Phase 4 - Classification Improvement
const Scene06Phase4: React.FC = () => {
  const frame = useCurrentFrame();

  const stages = [
    { stage: "1단 진동 스크린", output: ">500μm (과대) | 150~500μm (제품) | <150μm (미분)", color: "#ff6b6b" },
    { stage: "2단 에어 클래시파이어", output: "미분 정밀 분급: 50~150 (A) | 20~50 (B) | <20μm (C)", color: "#0096ff" },
    { stage: "3단 정전 분리기", output: "도체(금속) ↔ 비도체(활물질) 분리, 순도 99%+", color: "#00ff88" },
  ];

  const electrostaticSpec = [
    { item: "형식", value: "코로나 방전식" },
    { item: "전압", value: "20~50kV DC" },
    { item: "드럼 속도", value: "50~150 RPM" },
    { item: "분리 효율", value: "95% 이상" },
    { item: "금속 혼입", value: "0.5% 이하" },
  ];

  return (
    <AbsoluteFill style={styles.background}>
      <div style={{ padding: 45 }}>
        <div style={styles.title}>
          4차 분급/선별 공정 개선안
        </div>
        <div style={{ ...styles.subtitle, color: "#ffa500", fontSize: 26 }}>
          다단 분급 + 정전 선별 시스템
        </div>

        <div style={{ display: "flex", gap: 30, marginTop: 20 }}>
          <div style={{ flex: 1.2 }}>
            <div style={{ ...styles.subtitle, fontSize: 22, color: "#ffa500", textAlign: "left" }}>
              3단 분급 시스템
            </div>
            {stages.map((s, i) => {
              const delay = 20 + i * 20;
              const opacity = interpolate(frame, [delay, delay + 20], [0, 1], { extrapolateRight: "clamp" });
              return (
                <div key={i} style={{
                  opacity,
                  padding: "15px 20px",
                  marginBottom: 15,
                  background: `rgba(${s.color === "#ff6b6b" ? "255,107,107" : s.color === "#0096ff" ? "0,150,255" : "0,255,136"}, 0.1)`,
                  border: `2px solid ${s.color}`,
                  borderRadius: 10,
                }}>
                  <div style={{ color: s.color, fontWeight: "bold", fontSize: 20, marginBottom: 8 }}>{s.stage}</div>
                  <div style={{ color: "#ffffff", fontSize: 17 }}>{s.output}</div>
                </div>
              );
            })}
          </div>

          <div style={{ flex: 0.8 }}>
            <div style={{ ...styles.subtitle, fontSize: 22, color: "#00ff88", textAlign: "left" }}>
              정전 분리기 사양
            </div>
            <table style={{ ...styles.table, width: "100%", fontSize: 18 }}>
              <tbody>
                {electrostaticSpec.map((e, i) => {
                  const delay = 80 + i * 10;
                  const rowOpacity = interpolate(frame, [delay, delay + 15], [0, 1], { extrapolateRight: "clamp" });
                  return (
                    <tr key={i} style={{ opacity: rowOpacity }}>
                      <td style={{ ...styles.td, color: "#00ff88", fontWeight: "bold", textAlign: "left" }}>{e.item}</td>
                      <td style={{ ...styles.td, color: "#ffffff" }}>{e.value}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div style={{ ...styles.greenBox, marginTop: 15 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <span style={{ color: "#00ff88", fontWeight: "bold", fontSize: 22 }}>예상 손실 감소: </span>
              <span style={{ color: "#ffffff", fontSize: 22 }}>2.0% → 0.3%</span>
            </div>
            <div style={{ color: "#ffa500", fontSize: 28, fontWeight: "bold" }}>-1.7%p</div>
          </div>
        </div>
      </div>

      <Audio src={staticFile("recovery/scene06_phase4.mp3")} />
    </AbsoluteFill>
  );
};

// Scene 07: Integrated System
const Scene07Integrated: React.FC = () => {
  const frame = useCurrentFrame();

  const processFlow = [
    { name: "1차 파쇄", improved: "밀폐형 N2 파쇄", loss: "0.3%", remain: "99.7%" },
    { name: "2차 분쇄", improved: "4단 롤 크러셔", loss: "0.5%", remain: "99.2%" },
    { name: "3차 박리", improved: "2단 박리", loss: "0.7%", remain: "98.5%" },
    { name: "4차 분급", improved: "다단 정전 분리", loss: "0.3%", remain: "98.2%" },
  ];

  return (
    <AbsoluteFill style={styles.background}>
      <div style={{ padding: 50 }}>
        <div style={styles.title}>
          통합 개선 시스템 구성
        </div>

        <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 15, marginTop: 20 }}>
          <div style={{ ...styles.flowBox, background: "rgba(0, 255, 136, 0.2)", borderColor: "#00ff88" }}>
            폐배터리<br/>100%
          </div>
          {processFlow.map((p, i) => {
            const delay = 20 + i * 25;
            const opacity = interpolate(frame, [delay, delay + 20], [0, 1], { extrapolateRight: "clamp" });
            return (
              <React.Fragment key={i}>
                <span style={{ ...styles.arrow, opacity }}>→</span>
                <div style={{ ...styles.flowBox, opacity, background: "rgba(255, 165, 0, 0.15)", borderColor: "#ffa500" }}>
                  <div style={{ fontWeight: "bold", color: "#ffa500" }}>{p.name}</div>
                  <div style={{ fontSize: 14, color: "#ffffff" }}>{p.improved}</div>
                  <div style={{ fontSize: 14, color: "#00ff88" }}>손실 {p.loss}</div>
                </div>
              </React.Fragment>
            );
          })}
        </div>

        <table style={{ ...styles.table, marginTop: 30 }}>
          <thead>
            <tr>
              <th style={styles.th}>공정</th>
              <th style={styles.th}>개선 설비</th>
              <th style={styles.th}>개선 후 손실</th>
              <th style={styles.th}>유가금속 잔류</th>
            </tr>
          </thead>
          <tbody>
            {processFlow.map((p, i) => {
              const delay = 120 + i * 15;
              const rowOpacity = interpolate(frame, [delay, delay + 15], [0, 1], { extrapolateRight: "clamp" });
              return (
                <tr key={i} style={{ opacity: rowOpacity }}>
                  <td style={{ ...styles.td, color: "#ffa500", fontWeight: "bold" }}>{p.name}</td>
                  <td style={styles.td}>{p.improved}</td>
                  <td style={{ ...styles.td, color: "#00ff88" }}>{p.loss}</td>
                  <td style={{ ...styles.td, color: "#00ff88", fontWeight: "bold" }}>{p.remain}</td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <div style={{ ...styles.greenBox, marginTop: 25 }}>
          <div style={{ textAlign: "center" }}>
            <span style={{ color: "#00ff88", fontSize: 28, fontWeight: "bold" }}>
              최종 회수율: 98.2% (기존 92% → +6.2%p 향상)
            </span>
          </div>
        </div>
      </div>

      <Audio src={staticFile("recovery/scene07_integrated.mp3")} />
    </AbsoluteFill>
  );
};

// Scene 08: Cost Analysis
const Scene08Cost: React.FC = () => {
  const frame = useCurrentFrame();

  const investment = [
    { item: "1차 파쇄 개선", detail: "밀폐 시스템, 내부 순환 집진", cost: "1억원" },
    { item: "2차 분쇄 개선", detail: "4단 롤 크러셔, 집진 회수", cost: "2억원" },
    { item: "3차 박리 개선", detail: "볼밀 스크러버, 중간 스크린", cost: "1.1억원" },
    { item: "4차 분급 개선", detail: "다단 스크린, 정전 분리기", cost: "1억원" },
  ];

  const benefits = [
    { item: "추가 회수량", calc: "310톤/년 × 500만원/톤", value: "15.5억원" },
    { item: "에너지 절감", calc: "롤 크러셔 전환 (75kW→55kW)", value: "0.3억원" },
    { item: "부품 비용 절감", calc: "해머 교체 불필요", value: "0.2억원" },
  ];

  return (
    <AbsoluteFill style={styles.background}>
      <div style={{ padding: 45 }}>
        <div style={styles.title}>
          투자 비용 분석
        </div>

        <div style={{ display: "flex", gap: 30 }}>
          <div style={{ flex: 1 }}>
            <div style={{ ...styles.subtitle, fontSize: 24, color: "#ff6b6b", textAlign: "left" }}>
              설비 투자 비용
            </div>
            <table style={{ ...styles.table, width: "100%", fontSize: 18 }}>
              <thead>
                <tr>
                  <th style={{ ...styles.th, background: "rgba(255, 107, 107, 0.2)", color: "#ff6b6b" }}>항목</th>
                  <th style={{ ...styles.th, background: "rgba(255, 107, 107, 0.2)", color: "#ff6b6b" }}>내용</th>
                  <th style={{ ...styles.th, background: "rgba(255, 107, 107, 0.2)", color: "#ff6b6b" }}>비용</th>
                </tr>
              </thead>
              <tbody>
                {investment.map((inv, i) => {
                  const delay = 20 + i * 12;
                  const rowOpacity = interpolate(frame, [delay, delay + 15], [0, 1], { extrapolateRight: "clamp" });
                  return (
                    <tr key={i} style={{ opacity: rowOpacity }}>
                      <td style={{ ...styles.td, color: "#ffa500" }}>{inv.item}</td>
                      <td style={{ ...styles.td, fontSize: 16 }}>{inv.detail}</td>
                      <td style={{ ...styles.td, color: "#ff6b6b", fontWeight: "bold" }}>{inv.cost}</td>
                    </tr>
                  );
                })}
                <tr style={{ opacity: interpolate(frame, [70, 85], [0, 1], { extrapolateRight: "clamp" }) }}>
                  <td colSpan={2} style={{ ...styles.td, color: "#ffa500", fontWeight: "bold", textAlign: "right" }}>총 투자 비용</td>
                  <td style={{ ...styles.td, color: "#ff6b6b", fontWeight: "bold", fontSize: 24 }}>5.1억원</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div style={{ flex: 1 }}>
            <div style={{ ...styles.subtitle, fontSize: 24, color: "#00ff88", textAlign: "left" }}>
              연간 기대 효과
            </div>
            <table style={{ ...styles.table, width: "100%", fontSize: 18 }}>
              <thead>
                <tr>
                  <th style={{ ...styles.th, background: "rgba(0, 255, 136, 0.2)", color: "#00ff88" }}>항목</th>
                  <th style={{ ...styles.th, background: "rgba(0, 255, 136, 0.2)", color: "#00ff88" }}>산출 근거</th>
                  <th style={{ ...styles.th, background: "rgba(0, 255, 136, 0.2)", color: "#00ff88" }}>효과</th>
                </tr>
              </thead>
              <tbody>
                {benefits.map((b, i) => {
                  const delay = 100 + i * 15;
                  const rowOpacity = interpolate(frame, [delay, delay + 15], [0, 1], { extrapolateRight: "clamp" });
                  return (
                    <tr key={i} style={{ opacity: rowOpacity }}>
                      <td style={{ ...styles.td, color: "#ffa500" }}>{b.item}</td>
                      <td style={{ ...styles.td, fontSize: 15 }}>{b.calc}</td>
                      <td style={{ ...styles.td, color: "#00ff88", fontWeight: "bold" }}>{b.value}</td>
                    </tr>
                  );
                })}
                <tr style={{ opacity: interpolate(frame, [150, 165], [0, 1], { extrapolateRight: "clamp" }) }}>
                  <td colSpan={2} style={{ ...styles.td, color: "#ffa500", fontWeight: "bold", textAlign: "right" }}>연간 총 효과</td>
                  <td style={{ ...styles.td, color: "#00ff88", fontWeight: "bold", fontSize: 24 }}>16억원</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div style={{ ...styles.accentBox, marginTop: 25 }}>
          <div style={{ textAlign: "center" }}>
            <span style={{ color: "#ffa500", fontSize: 24, fontWeight: "bold" }}>
              투자 5.1억원 → 연간 효과 16억원 (ROI 314%/년)
            </span>
          </div>
        </div>
      </div>

      <Audio src={staticFile("recovery/scene08_cost.mp3")} />
    </AbsoluteFill>
  );
};

// Scene 09: ROI and Schedule
const Scene09ROI: React.FC = () => {
  const frame = useCurrentFrame();

  const schedule = [
    { phase: "Phase 1", period: "1~2개월", tasks: "상세 설계, 설비 발주, 현장 준비" },
    { phase: "Phase 2", period: "2~3개월", tasks: "1차/2차 공정 설비 설치, 시운전" },
    { phase: "Phase 3", period: "3~4개월", tasks: "3차/4차 공정 설비 설치, 시운전" },
    { phase: "Phase 4", period: "5~6개월", tasks: "통합 시운전, 성능 검증, 인수인계" },
  ];

  return (
    <AbsoluteFill style={styles.background}>
      <div style={{ padding: 50 }}>
        <div style={styles.title}>
          ROI 및 구현 일정
        </div>

        <div style={{ display: "flex", gap: 40, marginTop: 20 }}>
          <div style={{ flex: 1 }}>
            <div style={{ ...styles.subtitle, fontSize: 26, color: "#00ff88", textAlign: "left" }}>
              투자 수익 분석
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <div style={{ ...styles.greenBox, margin: 0, textAlign: "center" }}>
                <div style={{ color: "#aaa", fontSize: 18 }}>투자 회수 기간</div>
                <div style={{ color: "#00ff88", fontSize: 48, fontWeight: "bold" }}>약 4개월</div>
              </div>
              <div style={{ ...styles.accentBox, margin: 0, textAlign: "center" }}>
                <div style={{ color: "#aaa", fontSize: 18 }}>5년 기준 ROI</div>
                <div style={{ color: "#ffa500", fontSize: 48, fontWeight: "bold" }}>1,469%</div>
              </div>
            </div>
          </div>

          <div style={{ flex: 1.3 }}>
            <div style={{ ...styles.subtitle, fontSize: 26, color: "#0096ff", textAlign: "left" }}>
              구현 일정 (총 6개월)
            </div>
            {schedule.map((s, i) => {
              const delay = 30 + i * 20;
              const opacity = interpolate(frame, [delay, delay + 20], [0, 1], { extrapolateRight: "clamp" });
              return (
                <div key={i} style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: 15,
                  opacity,
                  padding: "12px 15px",
                  background: "rgba(0, 150, 255, 0.1)",
                  borderRadius: 8,
                  border: "1px solid rgba(0, 150, 255, 0.3)",
                }}>
                  <div style={{
                    background: "#0096ff",
                    color: "#fff",
                    padding: "5px 15px",
                    borderRadius: 5,
                    fontWeight: "bold",
                    marginRight: 15,
                    minWidth: 80,
                    textAlign: "center",
                  }}>
                    {s.phase}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ color: "#ffa500", fontWeight: "bold" }}>{s.period}</div>
                    <div style={{ color: "#ffffff", fontSize: 17 }}>{s.tasks}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <Audio src={staticFile("recovery/scene09_roi.mp3")} />
    </AbsoluteFill>
  );
};

// Scene 10: Conclusion
const Scene10Conclusion: React.FC = () => {
  const frame = useCurrentFrame();

  const summary = [
    { process: "1차 파쇄", before: "1.5%", after: "0.3%", improvement: "-1.2%p" },
    { process: "2차 분쇄", before: "2.5%", after: "0.5%", improvement: "-2.0%p" },
    { process: "3차 박리", before: "3.0%", after: "0.7%", improvement: "-2.3%p" },
    { process: "4차 분급", before: "2.0%", after: "0.3%", improvement: "-1.7%p" },
  ];

  return (
    <AbsoluteFill style={styles.background}>
      <div style={{ padding: 45 }}>
        <div style={styles.title}>
          개선 효과 요약 및 협의 사항
        </div>

        <div style={{ display: "flex", gap: 30 }}>
          <div style={{ flex: 1 }}>
            <table style={{ ...styles.table, width: "100%", fontSize: 20 }}>
              <thead>
                <tr>
                  <th style={styles.th}>공정</th>
                  <th style={{ ...styles.th, color: "#ff6b6b", background: "rgba(255, 107, 107, 0.2)" }}>현재 손실</th>
                  <th style={{ ...styles.th, color: "#00ff88", background: "rgba(0, 255, 136, 0.2)" }}>개선 후</th>
                  <th style={styles.th}>개선량</th>
                </tr>
              </thead>
              <tbody>
                {summary.map((s, i) => {
                  const delay = 20 + i * 12;
                  const rowOpacity = interpolate(frame, [delay, delay + 15], [0, 1], { extrapolateRight: "clamp" });
                  return (
                    <tr key={i} style={{ opacity: rowOpacity }}>
                      <td style={{ ...styles.td, color: "#ffa500", fontWeight: "bold" }}>{s.process}</td>
                      <td style={{ ...styles.td, color: "#ff6b6b" }}>{s.before}</td>
                      <td style={{ ...styles.td, color: "#00ff88" }}>{s.after}</td>
                      <td style={{ ...styles.td, color: "#ffa500", fontWeight: "bold" }}>{s.improvement}</td>
                    </tr>
                  );
                })}
                <tr style={{ opacity: interpolate(frame, [70, 85], [0, 1], { extrapolateRight: "clamp" }) }}>
                  <td style={{ ...styles.td, color: "#ffffff", fontWeight: "bold" }}>합계</td>
                  <td style={{ ...styles.td, color: "#ff6b6b", fontWeight: "bold" }}>9.0%</td>
                  <td style={{ ...styles.td, color: "#00ff88", fontWeight: "bold" }}>1.8%</td>
                  <td style={{ ...styles.td, color: "#ffa500", fontWeight: "bold", fontSize: 24 }}>-7.2%p</td>
                </tr>
              </tbody>
            </table>

            <div style={{ ...styles.greenBox, marginTop: 20, textAlign: "center" }}>
              <div style={{ color: "#00ff88", fontSize: 26, fontWeight: "bold" }}>
                최종 회수율: 92% → 98.2%
              </div>
            </div>
          </div>

          <div style={{ flex: 1 }}>
            <div style={{ ...styles.subtitle, fontSize: 22, color: "#ffa500", textAlign: "left" }}>
              한국기계엔지니어링 협의 사항
            </div>
            {[
              { item: "밀폐형 파쇄 시스템", content: "기존 Shredder 밀폐 개조 가능 여부" },
              { item: "4단 롤 크러셔", content: "공급 가능 여부, 맞춤 설계" },
              { item: "볼밀 스크러버", content: "배터리 재활용 전용 설계" },
              { item: "현장 설치", content: "기존 라인 연계 방안, 기술 지원" },
            ].map((c, i) => {
              const delay = 100 + i * 15;
              const opacity = interpolate(frame, [delay, delay + 15], [0, 1], { extrapolateRight: "clamp" });
              return (
                <div key={i} style={{
                  display: "flex",
                  marginBottom: 12,
                  opacity,
                  padding: "10px 15px",
                  background: "rgba(255, 165, 0, 0.1)",
                  borderRadius: 8,
                  border: "1px solid rgba(255, 165, 0, 0.3)",
                }}>
                  <span style={{ color: "#ffa500", fontWeight: "bold", minWidth: 140 }}>{c.item}</span>
                  <span style={{ color: "#ffffff", fontSize: 18 }}>{c.content}</span>
                </div>
              );
            })}

            <div style={{ ...styles.codeBlock, marginTop: 15, fontSize: 18, textAlign: "center" }}>
              <div style={{ color: "#ffffff" }}>한국기계엔지니어링</div>
              <div style={{ color: "#aaa", fontSize: 16 }}>경기도 군포시 공단로 140번 안길30</div>
              <div style={{ color: "#ffa500" }}>031-427-7783~5</div>
            </div>
          </div>
        </div>
      </div>

      <Audio src={staticFile("recovery/scene10_conclusion.mp3")} />
    </AbsoluteFill>
  );
};

// Main Video Component
export const RecoveryVideo: React.FC = () => {
  return (
    <AbsoluteFill>
      <Sequence from={SCENE_TIMINGS.scene01_intro.start} durationInFrames={SCENE_TIMINGS.scene01_intro.duration}>
        <Scene01Intro />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene02_analysis.start} durationInFrames={SCENE_TIMINGS.scene02_analysis.duration}>
        <Scene02Analysis />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene03_phase1.start} durationInFrames={SCENE_TIMINGS.scene03_phase1.duration}>
        <Scene03Phase1 />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene04_phase2.start} durationInFrames={SCENE_TIMINGS.scene04_phase2.duration}>
        <Scene04Phase2 />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene05_phase3.start} durationInFrames={SCENE_TIMINGS.scene05_phase3.duration}>
        <Scene05Phase3 />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene06_phase4.start} durationInFrames={SCENE_TIMINGS.scene06_phase4.duration}>
        <Scene06Phase4 />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene07_integrated.start} durationInFrames={SCENE_TIMINGS.scene07_integrated.duration}>
        <Scene07Integrated />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene08_cost.start} durationInFrames={SCENE_TIMINGS.scene08_cost.duration}>
        <Scene08Cost />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene09_roi.start} durationInFrames={SCENE_TIMINGS.scene09_roi.duration}>
        <Scene09ROI />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene10_conclusion.start} durationInFrames={SCENE_TIMINGS.scene10_conclusion.duration}>
        <Scene10Conclusion />
      </Sequence>
    </AbsoluteFill>
  );
};
