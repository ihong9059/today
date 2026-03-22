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
export const SCENE_TIMINGS = {
  scene01_intro: { duration: 936, start: 0 },
  scene02_sensor_id: { duration: 1599, start: 936 },
  scene03_protocol: { duration: 1602, start: 2535 },
  scene04_safety: { duration: 1602, start: 4137 },
  scene05_mlops: { duration: 1524, start: 5739 },
  scene06_calibration: { duration: 1501, start: 7263 },
  scene07_grade: { duration: 1651, start: 8764 },
  scene08_sop: { duration: 1609, start: 10415 },
  scene09_architecture: { duration: 1901, start: 12024 },
  scene10_security: { duration: 1625, start: 13925 },
};

export const TOTAL_DURATION = 15550;

// Common styles
const styles = {
  background: {
    background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
  },
  title: {
    color: "#00ff88",
    fontSize: 52,
    fontWeight: "bold" as const,
    textAlign: "center" as const,
    marginBottom: 30,
    textShadow: "0 0 20px rgba(0, 255, 136, 0.5)",
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
    background: "rgba(0, 255, 136, 0.1)",
    border: "2px solid #00ff88",
    borderRadius: 15,
    padding: 25,
    margin: "20px 60px",
  },
  warningBox: {
    background: "rgba(255, 165, 0, 0.15)",
    border: "2px solid #ffa500",
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
    background: "rgba(0, 255, 136, 0.2)",
    color: "#00ff88",
    padding: "12px 15px",
    border: "1px solid #00ff88",
    fontWeight: "bold" as const,
  },
  td: {
    background: "rgba(255, 255, 255, 0.05)",
    color: "#ffffff",
    padding: "10px 15px",
    border: "1px solid rgba(0, 255, 136, 0.3)",
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
    color: "#00ff88",
    fontSize: 30,
    margin: "0 15px",
  },
  codeBlock: {
    background: "rgba(0, 0, 0, 0.4)",
    borderRadius: 10,
    padding: 20,
    fontFamily: "monospace",
    fontSize: 20,
    color: "#00ff88",
    margin: "15px 60px",
    border: "1px solid #00ff88",
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

  const items = [
    "센서 ID 체계 표준화",
    "통신 프로토콜 명시",
    "안전 센서 이중화",
    "MLOps 체계 구축",
    "인라인-오프라인 교정",
    "품질 등급 기준표",
    "품질 이상 대응 SOP",
    "통합 시스템 아키텍처",
    "보안 및 유지보수 체계",
  ];

  return (
    <AbsoluteFill style={styles.background}>
      <div style={{ padding: 60 }}>
        <div style={{ ...styles.title, fontSize: 58, opacity: titleOpacity, transform: `translateY(${titleY}px)` }}>
          AI SmartFactory 계획서 개선사항
        </div>
        <div style={{ ...styles.subtitle, opacity: contentOpacity, color: "#00ff88" }}>
          한국기계 시스템 개선 방안 전문가 가이드
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", marginTop: 40, opacity: contentOpacity }}>
          {items.map((item, i) => {
            const delay = 60 + i * 8;
            const itemOpacity = interpolate(frame, [delay, delay + 15], [0, 1], { extrapolateRight: "clamp" });
            const itemScale = spring({ frame: frame - delay, fps, from: 0.8, to: 1, durationInFrames: 20 });
            return (
              <div
                key={i}
                style={{
                  ...styles.badge,
                  background: i < 3 ? "rgba(0, 255, 136, 0.2)" : i < 6 ? "rgba(0, 150, 255, 0.2)" : "rgba(255, 165, 0, 0.2)",
                  border: `1px solid ${i < 3 ? "#00ff88" : i < 6 ? "#0096ff" : "#ffa500"}`,
                  color: i < 3 ? "#00ff88" : i < 6 ? "#0096ff" : "#ffa500",
                  opacity: itemOpacity,
                  transform: `scale(${itemScale})`,
                  margin: 8,
                }}
              >
                {`${i + 1}. ${item}`}
              </div>
            );
          })}
        </div>

        <div style={{ ...styles.accentBox, marginTop: 40, opacity: contentOpacity }}>
          <div style={{ color: "#00ff88", fontSize: 24, fontWeight: "bold", marginBottom: 10 }}>
            목표
          </div>
          <div style={{ color: "#ffffff", fontSize: 22 }}>
            고장예지 + 품질관리 시스템의 통합 및 실무 적용 가능한 구체적 개선안 제시
          </div>
        </div>
      </div>

      <Audio src={staticFile("improvement/scene01_intro.mp3")} />
    </AbsoluteFill>
  );
};

// Scene 02: Sensor ID Standardization
const Scene02SensorId: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });

  const levels = [
    { level: "Level 1", format: "공장 코드", example: "BRF", desc: "Battery Recycling Factory" },
    { level: "Level 2", format: "공정 코드", example: "SHR/CRS/PIN/CLF", desc: "Shredder/Crusher/PinMill/Classifier" },
    { level: "Level 3", format: "장비 번호", example: "01, 02", desc: "동일 공정 내 장비 순번" },
    { level: "Level 4", format: "센서 유형", example: "VIB/TMP/CUR/SPD", desc: "진동/온도/전류/속도" },
    { level: "Level 5", format: "위치/채널", example: "A/B/C", desc: "설치 위치 또는 채널" },
  ];

  const examples = [
    { tag: "BRF-SHR-01-VIB-A", meaning: "1차 파쇄기 1호 진동센서 A" },
    { tag: "BRF-CRS-01-TMP-B", meaning: "해머 크러셔 1호 온도센서 B" },
    { tag: "BRF-PIN-01-CUR-A", meaning: "핀밀 1호 전류센서 A" },
  ];

  return (
    <AbsoluteFill style={styles.background}>
      <div style={{ padding: 50 }}>
        <div style={{ ...styles.title, opacity: titleOpacity }}>
          1. 센서 ID 체계 표준화
        </div>

        <div style={{ display: "flex", gap: 30, marginTop: 20 }}>
          <div style={{ flex: 1 }}>
            <div style={{ ...styles.subtitle, fontSize: 26, color: "#00ff88", textAlign: "left" }}>
              5단계 계층 구조
            </div>
            <table style={{ ...styles.table, width: "100%" }}>
              <thead>
                <tr>
                  <th style={styles.th}>계층</th>
                  <th style={styles.th}>형식</th>
                  <th style={styles.th}>예시</th>
                </tr>
              </thead>
              <tbody>
                {levels.map((l, i) => {
                  const delay = 30 + i * 15;
                  const rowOpacity = interpolate(frame, [delay, delay + 15], [0, 1], { extrapolateRight: "clamp" });
                  return (
                    <tr key={i} style={{ opacity: rowOpacity }}>
                      <td style={{ ...styles.td, color: "#00ff88", fontWeight: "bold" }}>{l.level}</td>
                      <td style={styles.td}>{l.format}</td>
                      <td style={{ ...styles.td, fontFamily: "monospace", color: "#ffa500" }}>{l.example}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div style={{ flex: 1 }}>
            <div style={{ ...styles.subtitle, fontSize: 26, color: "#00ff88", textAlign: "left" }}>
              태그 예시
            </div>
            {examples.map((ex, i) => {
              const delay = 100 + i * 20;
              const exOpacity = interpolate(frame, [delay, delay + 20], [0, 1], { extrapolateRight: "clamp" });
              return (
                <div key={i} style={{ ...styles.codeBlock, margin: "15px 0", opacity: exOpacity }}>
                  <span style={{ color: "#ffa500", fontSize: 24 }}>{ex.tag}</span>
                  <br />
                  <span style={{ color: "#ffffff", fontSize: 18 }}>→ {ex.meaning}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div style={{ ...styles.warningBox, marginTop: 20 }}>
          <span style={{ color: "#ffa500", fontWeight: "bold" }}>현재 문제: </span>
          <span style={{ color: "#ffffff" }}>VIB-1A, TMP-1B 등 개별 ID만 존재, 통합 태그 명명 규칙 부재</span>
        </div>
      </div>

      <Audio src={staticFile("improvement/scene02_sensor_id.mp3")} />
    </AbsoluteFill>
  );
};

// Scene 03: Communication Protocol
const Scene03Protocol: React.FC = () => {
  const frame = useCurrentFrame();

  const protocols = [
    { sensor: "진동 가속도계", output: "IEPE (100mV/g)", comm: "아날로그 → 24bit ADC", sampling: "100kHz" },
    { sensor: "PT100 온도", output: "RTD 3-wire", comm: "아날로그 → RTD 컨버터", sampling: "1Hz" },
    { sensor: "적외선 온도", output: "4-20mA", comm: "아날로그 → ADC", sampling: "10Hz" },
    { sensor: "CT 전류센서", output: "0-5V", comm: "아날로그 → ADC", sampling: "1kHz" },
    { sensor: "엔코더", output: "펄스 (NPN)", comm: "디지털 GPIO", sampling: "-" },
    { sensor: "분진/가스센서", output: "RS485", comm: "Modbus RTU", sampling: "1Hz" },
    { sensor: "MEMS 마이크", output: "PDM/I2S", comm: "디지털", sampling: "48kHz" },
  ];

  return (
    <AbsoluteFill style={styles.background}>
      <div style={{ padding: 50 }}>
        <div style={styles.title}>
          2. 통신 프로토콜 명시
        </div>

        <table style={{ ...styles.table, fontSize: 20 }}>
          <thead>
            <tr>
              <th style={styles.th}>센서 유형</th>
              <th style={styles.th}>출력 신호</th>
              <th style={styles.th}>통신 방식</th>
              <th style={styles.th}>샘플링</th>
            </tr>
          </thead>
          <tbody>
            {protocols.map((p, i) => {
              const delay = 20 + i * 12;
              const rowOpacity = interpolate(frame, [delay, delay + 15], [0, 1], { extrapolateRight: "clamp" });
              return (
                <tr key={i} style={{ opacity: rowOpacity }}>
                  <td style={{ ...styles.td, color: "#00ff88" }}>{p.sensor}</td>
                  <td style={{ ...styles.td, fontFamily: "monospace" }}>{p.output}</td>
                  <td style={styles.td}>{p.comm}</td>
                  <td style={{ ...styles.td, color: "#ffa500" }}>{p.sampling}</td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <div style={{ display: "flex", gap: 20, marginTop: 30 }}>
          <div style={{ ...styles.accentBox, flex: 1 }}>
            <div style={{ color: "#00ff88", fontWeight: "bold", marginBottom: 10 }}>아날로그 센서</div>
            <div style={{ color: "#ffffff", fontSize: 20 }}>Junction Box에서 신호 컨디셔닝 후 전송</div>
          </div>
          <div style={{ ...styles.accentBox, flex: 1 }}>
            <div style={{ color: "#00ff88", fontWeight: "bold", marginBottom: 10 }}>RS485 버스</div>
            <div style={{ color: "#ffffff", fontSize: 20 }}>최대 32개 디바이스/버스 수용</div>
          </div>
        </div>
      </div>

      <Audio src={staticFile("improvement/scene03_protocol.mp3")} />
    </AbsoluteFill>
  );
};

// Scene 04: Safety Redundancy
const Scene04Safety: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const safetyItems = [
    { func: "발화 감지", main: "적외선 온도센서", backup: "열화상 카메라", logic: "OR 로직" },
    { func: "폭발 위험", main: "분진센서 DST-1A", backup: "분진센서 DST-1B", logic: "투표 로직 (2/2)" },
    { func: "전해액 누출", main: "가스센서 GAS-3A", backup: "가스센서 GAS-3B", logic: "OR 로직" },
    { func: "과열 감지", main: "PT100 TMP-xA", backup: "PT100 TMP-xB", logic: "교차 검증" },
  ];

  return (
    <AbsoluteFill style={styles.background}>
      <div style={{ padding: 50 }}>
        <div style={styles.title}>
          3. 안전 센서 이중화 구성
        </div>

        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>안전 기능</th>
              <th style={styles.th}>주 센서</th>
              <th style={styles.th}>백업 센서</th>
              <th style={styles.th}>이중화 로직</th>
            </tr>
          </thead>
          <tbody>
            {safetyItems.map((s, i) => {
              const delay = 20 + i * 15;
              const rowOpacity = interpolate(frame, [delay, delay + 15], [0, 1], { extrapolateRight: "clamp" });
              return (
                <tr key={i} style={{ opacity: rowOpacity }}>
                  <td style={{ ...styles.td, color: "#ff6b6b", fontWeight: "bold" }}>{s.func}</td>
                  <td style={styles.td}>{s.main}</td>
                  <td style={styles.td}>{s.backup}</td>
                  <td style={{ ...styles.td, color: "#ffa500" }}>{s.logic}</td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <div style={{ marginTop: 30, textAlign: "center" }}>
          <div style={{ display: "inline-block" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ ...styles.flowBox, background: "rgba(255, 107, 107, 0.2)", borderColor: "#ff6b6b" }}>주 센서</div>
              <div style={styles.arrow}>→</div>
              <div style={{ ...styles.flowBox, background: "rgba(255, 165, 0, 0.2)", borderColor: "#ffa500" }}>Safety PLC</div>
              <div style={styles.arrow}>→</div>
              <div style={{ ...styles.flowBox, background: "rgba(255, 107, 107, 0.2)", borderColor: "#ff6b6b" }}>비상정지/소화/환기</div>
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: 10 }}>
              <div style={{ ...styles.flowBox, background: "rgba(255, 107, 107, 0.2)", borderColor: "#ff6b6b" }}>백업 센서</div>
              <div style={styles.arrow}>↗</div>
            </div>
          </div>
        </div>

        <div style={{ ...styles.warningBox, marginTop: 20 }}>
          <span style={{ color: "#ffa500", fontWeight: "bold" }}>핵심: </span>
          <span style={{ color: "#ffffff" }}>
            Safety PLC는 Edge Gateway와 독립 운영 (Fail-safe) | 안전 센서는 SIL 2 이상 인증 제품 사용
          </span>
        </div>
      </div>

      <Audio src={staticFile("improvement/scene04_safety.mp3")} />
    </AbsoluteFill>
  );
};

// Scene 05: MLOps
const Scene05MLOps: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const pipeline = [
    { name: "Data Lake", desc: "S3/MinIO" },
    { name: "Feature Engineering", desc: "특징 추출" },
    { name: "Model Training", desc: "학습" },
    { name: "Model Validation", desc: "검증" },
    { name: "Model Registry", desc: "MLflow" },
    { name: "Edge Deployment", desc: "배포" },
  ];

  const tools = [
    { item: "데이터 버전 관리", tool: "DVC", period: "일간" },
    { item: "모델 레지스트리", tool: "MLflow", period: "업데이트 시" },
    { item: "A/B 테스트", tool: "Shadow Mode", period: "배포 시" },
    { item: "모델 재학습", tool: "자동 트리거", period: "성능 저하 시" },
    { item: "모델 롤백", tool: "버전 기반", period: "자동" },
  ];

  return (
    <AbsoluteFill style={styles.background}>
      <div style={{ padding: 50 }}>
        <div style={styles.title}>
          4. MLOps 체계 구축
        </div>

        <div style={{ textAlign: "center", marginBottom: 30 }}>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexWrap: "wrap" }}>
            {pipeline.map((p, i) => {
              const delay = 20 + i * 15;
              const opacity = interpolate(frame, [delay, delay + 15], [0, 1], { extrapolateRight: "clamp" });
              return (
                <React.Fragment key={i}>
                  <div style={{ ...styles.flowBox, opacity, fontSize: 18 }}>
                    <div style={{ fontWeight: "bold" }}>{p.name}</div>
                    <div style={{ fontSize: 14, color: "#aaa" }}>{p.desc}</div>
                  </div>
                  {i < pipeline.length - 1 && <span style={{ ...styles.arrow, opacity }}>→</span>}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        <table style={{ ...styles.table, width: "80%" }}>
          <thead>
            <tr>
              <th style={styles.th}>항목</th>
              <th style={styles.th}>도구/방법</th>
              <th style={styles.th}>주기</th>
            </tr>
          </thead>
          <tbody>
            {tools.map((t, i) => {
              const delay = 100 + i * 12;
              const rowOpacity = interpolate(frame, [delay, delay + 15], [0, 1], { extrapolateRight: "clamp" });
              return (
                <tr key={i} style={{ opacity: rowOpacity }}>
                  <td style={styles.td}>{t.item}</td>
                  <td style={{ ...styles.td, color: "#00ff88" }}>{t.tool}</td>
                  <td style={{ ...styles.td, color: "#ffa500" }}>{t.period}</td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <div style={{ ...styles.accentBox, marginTop: 20 }}>
          <span style={{ color: "#00ff88", fontWeight: "bold" }}>핵심 기능: </span>
          <span style={{ color: "#ffffff" }}>
            실시간 추론 → 성능 모니터링 → 모델 드리프트 감지 → 자동 재학습 트리거
          </span>
        </div>
      </div>

      <Audio src={staticFile("improvement/scene05_mlops.mp3")} />
    </AbsoluteFill>
  );
};

// Scene 06: Calibration
const Scene06Calibration: React.FC = () => {
  const frame = useCurrentFrame();

  const steps = [
    { step: 1, content: "인라인 센서와 동일 시점 샘플 채취", period: "시간당 1회" },
    { step: 2, content: "FRITSCH 분석기로 기준값 측정", period: "시간당 1회" },
    { step: 3, content: "인라인 측정값과 FRITSCH 측정값 비교", period: "자동" },
    { step: 4, content: "편차 5% 이상 시 교정계수 재계산", period: "자동" },
    { step: 5, content: "편차 10% 이상 시 센서 점검 알림", period: "자동" },
  ];

  return (
    <AbsoluteFill style={styles.background}>
      <div style={{ padding: 50 }}>
        <div style={styles.title}>
          5. 인라인-오프라인 측정값 교정
        </div>

        <div style={{ display: "flex", gap: 40, marginTop: 20 }}>
          <div style={{ flex: 1 }}>
            <div style={{ ...styles.codeBlock, fontSize: 22, padding: 25 }}>
              <div style={{ color: "#ffa500", marginBottom: 15 }}>교정 알고리즘</div>
              <div style={{ color: "#ffffff" }}>
                인라인_보정값 = 인라인_측정값<br />
                <span style={{ marginLeft: 140 }}>× 교정계수</span><br />
                <span style={{ marginLeft: 140 }}>+ 오프셋</span>
              </div>
              <div style={{ color: "#aaa", marginTop: 15, fontSize: 18 }}>
                교정계수 = f(FRITSCH 기준값)
              </div>
            </div>

            <div style={{ display: "flex", gap: 20, marginTop: 20 }}>
              <div style={{ ...styles.flowBox, flex: 1, textAlign: "center" }}>
                <div style={{ color: "#00ff88", fontWeight: "bold" }}>인라인 센서</div>
                <div style={{ color: "#aaa", fontSize: 16 }}>연속 측정</div>
              </div>
              <div style={{ ...styles.flowBox, flex: 1, textAlign: "center" }}>
                <div style={{ color: "#ffa500", fontWeight: "bold" }}>FRITSCH</div>
                <div style={{ color: "#aaa", fontSize: 16 }}>시간당 1회</div>
              </div>
            </div>
          </div>

          <div style={{ flex: 1 }}>
            <div style={{ ...styles.subtitle, fontSize: 24, color: "#00ff88", textAlign: "left" }}>
              교정 프로세스
            </div>
            {steps.map((s, i) => {
              const delay = 40 + i * 18;
              const opacity = interpolate(frame, [delay, delay + 18], [0, 1], { extrapolateRight: "clamp" });
              return (
                <div key={i} style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: 12,
                  opacity,
                  padding: "10px 15px",
                  background: "rgba(0, 255, 136, 0.05)",
                  borderRadius: 8,
                }}>
                  <div style={{
                    width: 30,
                    height: 30,
                    borderRadius: "50%",
                    background: "#00ff88",
                    color: "#000",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "bold",
                    marginRight: 15,
                  }}>
                    {s.step}
                  </div>
                  <div style={{ flex: 1, color: "#ffffff", fontSize: 18 }}>{s.content}</div>
                  <div style={{ color: "#ffa500", fontSize: 16 }}>{s.period}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <Audio src={staticFile("improvement/scene06_calibration.mp3")} />
    </AbsoluteFill>
  );
};

// Scene 07: Quality Grade
const Scene07Grade: React.FC = () => {
  const frame = useCurrentFrame();

  const grades = [
    { grade: "A", label: "우수", d50: "45~55", d90: "≤150", span: "≤1.8", circ: "≥0.88", recovery: "≥96%", moisture: "≤0.8%", purity: "≥99%", color: "#00ff88" },
    { grade: "B", label: "양호", d50: "40~60", d90: "≤165", span: "≤2.0", circ: "≥0.85", recovery: "≥94%", moisture: "≤1.2%", purity: "≥98%", color: "#0096ff" },
    { grade: "C", label: "보통", d50: "35~65", d90: "≤180", span: "≤2.3", circ: "≥0.80", recovery: "≥90%", moisture: "≤1.8%", purity: "≥96%", color: "#ffa500" },
    { grade: "D", label: "불량", d50: "그 외", d90: ">180", span: ">2.3", circ: "<0.80", recovery: "<90%", moisture: ">1.8%", purity: "<96%", color: "#ff6b6b" },
  ];

  return (
    <AbsoluteFill style={styles.background}>
      <div style={{ padding: 40 }}>
        <div style={styles.title}>
          6. 품질 등급 기준표
        </div>

        <table style={{ ...styles.table, fontSize: 18 }}>
          <thead>
            <tr>
              <th style={styles.th}>등급</th>
              <th style={styles.th}>D50 (μm)</th>
              <th style={styles.th}>D90 (μm)</th>
              <th style={styles.th}>Span</th>
              <th style={styles.th}>원형도</th>
              <th style={styles.th}>회수율</th>
              <th style={styles.th}>수분</th>
              <th style={styles.th}>순도</th>
            </tr>
          </thead>
          <tbody>
            {grades.map((g, i) => {
              const delay = 20 + i * 18;
              const rowOpacity = interpolate(frame, [delay, delay + 18], [0, 1], { extrapolateRight: "clamp" });
              return (
                <tr key={i} style={{ opacity: rowOpacity }}>
                  <td style={{ ...styles.td, color: g.color, fontWeight: "bold", fontSize: 22 }}>
                    {g.grade} <span style={{ fontSize: 14 }}>({g.label})</span>
                  </td>
                  <td style={styles.td}>{g.d50}</td>
                  <td style={styles.td}>{g.d90}</td>
                  <td style={styles.td}>{g.span}</td>
                  <td style={styles.td}>{g.circ}</td>
                  <td style={styles.td}>{g.recovery}</td>
                  <td style={styles.td}>{g.moisture}</td>
                  <td style={styles.td}>{g.purity}</td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <div style={{ ...styles.codeBlock, marginTop: 30, fontSize: 22 }}>
          <div style={{ color: "#ffa500", marginBottom: 10 }}>등급 결정 로직</div>
          <div style={{ color: "#ffffff" }}>
            최종등급 = MIN(D50등급, D90등급, Span등급, 원형도등급, 회수율등급, 수분등급, 순도등급)
          </div>
          <div style={{ color: "#aaa", marginTop: 15, fontSize: 18 }}>
            → 모든 항목 중 가장 낮은 등급이 최종 등급으로 적용
          </div>
        </div>
      </div>

      <Audio src={staticFile("improvement/scene07_grade.mp3")} />
    </AbsoluteFill>
  );
};

// Scene 08: SOP
const Scene08SOP: React.FC = () => {
  const frame = useCurrentFrame();

  const steps = [
    { step: 1, owner: "시스템", action: "D90 > 165μm 3회 연속 감지, 알림 발송", time: "즉시" },
    { step: 2, owner: "운전자", action: "대시보드에서 트렌드 확인", time: "1분" },
    { step: 3, owner: "운전자", action: "분쇄기 RPM 5% 증가 조치", time: "2분" },
    { step: 4, owner: "시스템", action: "10분 후 재측정 및 효과 확인", time: "10분" },
    { step: "5a", owner: "-", action: "개선 시: 정상 운전 복귀", time: "-" },
    { step: "5b", owner: "엔지니어", action: "미개선 시: 현장 점검 (해머/칼날 마모)", time: "30분" },
    { step: 6, owner: "엔지니어", action: "부품 교체 또는 조정", time: "1~4시간" },
  ];

  return (
    <AbsoluteFill style={styles.background}>
      <div style={{ padding: 50 }}>
        <div style={styles.title}>
          7. 품질 이상 대응 SOP
        </div>

        <div style={{ ...styles.subtitle, color: "#ff6b6b", fontSize: 26 }}>
          SOP-QC-001: 입도 과대 이상 대응
        </div>

        <table style={{ ...styles.table, fontSize: 19 }}>
          <thead>
            <tr>
              <th style={styles.th}>단계</th>
              <th style={styles.th}>담당자</th>
              <th style={styles.th}>조치 내용</th>
              <th style={styles.th}>소요시간</th>
            </tr>
          </thead>
          <tbody>
            {steps.map((s, i) => {
              const delay = 20 + i * 12;
              const rowOpacity = interpolate(frame, [delay, delay + 15], [0, 1], { extrapolateRight: "clamp" });
              const isImportant = s.step === 3 || s.step === "5b";
              return (
                <tr key={i} style={{ opacity: rowOpacity }}>
                  <td style={{ ...styles.td, color: "#00ff88", fontWeight: "bold" }}>{s.step}</td>
                  <td style={{ ...styles.td, color: s.owner === "시스템" ? "#0096ff" : s.owner === "엔지니어" ? "#ffa500" : "#ffffff" }}>
                    {s.owner}
                  </td>
                  <td style={{ ...styles.td, textAlign: "left", color: isImportant ? "#ffa500" : "#ffffff" }}>
                    {s.action}
                  </td>
                  <td style={{ ...styles.td, color: "#00ff88" }}>{s.time}</td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <div style={{ ...styles.warningBox, marginTop: 25 }}>
          <span style={{ color: "#ffa500", fontWeight: "bold" }}>회수율 저하 시: </span>
          <span style={{ color: "#ffffff" }}>
            공정 중단 여부 결정 → 전 공정 파라미터 점검 → 근본 원인 분석(RCA) 보고서 작성 (1일 내)
          </span>
        </div>
      </div>

      <Audio src={staticFile("improvement/scene08_sop.mp3")} />
    </AbsoluteFill>
  );
};

// Scene 09: Integrated Architecture
const Scene09Architecture: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const correlations = [
    { equipment: "해머 마모도", quality: "입도 분포폭 증가", analysis: "전류-D90 상관분석", usage: "교체 시점 최적화" },
    { equipment: "핀 마모도", quality: "원형도 저하", analysis: "진동-원형도 상관분석", usage: "교체 시점 최적화" },
    { equipment: "베어링 상태", quality: "입도 편차 증가", analysis: "진동-Span 상관분석", usage: "사전 정비 시점" },
    { equipment: "분급기 압력", quality: "분급 효율", analysis: "압력-회수율 상관분석", usage: "압력 최적값 도출" },
  ];

  return (
    <AbsoluteFill style={styles.background}>
      <div style={{ padding: 45 }}>
        <div style={styles.title}>
          8. 통합 시스템 아키텍처
        </div>

        <div style={{ display: "flex", justifyContent: "center", gap: 30, marginBottom: 25 }}>
          <div style={{ ...styles.flowBox, background: "rgba(0, 255, 136, 0.15)", borderColor: "#00ff88" }}>
            <div style={{ fontWeight: "bold", color: "#00ff88" }}>고장예지 센서</div>
            <div style={{ color: "#aaa", fontSize: 16 }}>31개 (진동, 온도, 전류, 음향)</div>
          </div>
          <div style={styles.arrow}>+</div>
          <div style={{ ...styles.flowBox, background: "rgba(0, 150, 255, 0.15)", borderColor: "#0096ff" }}>
            <div style={{ fontWeight: "bold", color: "#0096ff" }}>품질관리 센서</div>
            <div style={{ color: "#aaa", fontSize: 16 }}>12개 (입도, 형상, 수분, 질량)</div>
          </div>
          <div style={styles.arrow}>→</div>
          <div style={{ ...styles.flowBox, background: "rgba(255, 165, 0, 0.15)", borderColor: "#ffa500" }}>
            <div style={{ fontWeight: "bold", color: "#ffa500" }}>통합 Edge Gateway</div>
            <div style={{ color: "#aaa", fontSize: 16 }}>Jetson Orin NX 16GB</div>
          </div>
        </div>

        <div style={{ ...styles.subtitle, fontSize: 24, color: "#00ff88" }}>
          설비-품질 상관분석 활용
        </div>

        <table style={{ ...styles.table, fontSize: 18 }}>
          <thead>
            <tr>
              <th style={styles.th}>설비 상태</th>
              <th style={styles.th}>품질 영향</th>
              <th style={styles.th}>분석 방법</th>
              <th style={styles.th}>활용</th>
            </tr>
          </thead>
          <tbody>
            {correlations.map((c, i) => {
              const delay = 50 + i * 15;
              const rowOpacity = interpolate(frame, [delay, delay + 15], [0, 1], { extrapolateRight: "clamp" });
              return (
                <tr key={i} style={{ opacity: rowOpacity }}>
                  <td style={{ ...styles.td, color: "#00ff88" }}>{c.equipment}</td>
                  <td style={{ ...styles.td, color: "#ff6b6b" }}>{c.quality}</td>
                  <td style={{ ...styles.td, color: "#0096ff" }}>{c.analysis}</td>
                  <td style={{ ...styles.td, color: "#ffa500" }}>{c.usage}</td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <div style={{ ...styles.accentBox, marginTop: 20 }}>
          <span style={{ color: "#00ff88", fontWeight: "bold" }}>기대 효과: </span>
          <span style={{ color: "#ffffff" }}>
            설비 정비와 품질 관리 연계 | 품질 저하 전 선제 정비 | 품질 이상의 근본 원인 빠른 특정
          </span>
        </div>
      </div>

      <Audio src={staticFile("improvement/scene09_architecture.mp3")} />
    </AbsoluteFill>
  );
};

// Scene 10: Security & Maintenance
const Scene10Security: React.FC = () => {
  const frame = useCurrentFrame();

  const security = [
    { area: "네트워크 분리", recommendation: "OT/IT 네트워크 물리적/논리적 분리" },
    { area: "접근 제어", recommendation: "역할 기반 접근 제어 (RBAC) 적용" },
    { area: "암호화", recommendation: "센서-게이트웨이 간 TLS 암호화" },
    { area: "침입 탐지", recommendation: "산업용 IDS/IPS 설치" },
    { area: "백업", recommendation: "데이터 및 모델 자동 백업 (일간)" },
  ];

  const maintenance = [
    { item: "센서 교정", period: "월 1회", owner: "내부 엔지니어" },
    { item: "Edge Gateway 점검", period: "분기 1회", owner: "내부 엔지니어" },
    { item: "AI 모델 재학습", period: "분기 1회 또는 자동", owner: "AI팀" },
    { item: "FRITSCH 분석기 교정", period: "년 1회", owner: "태명과학" },
    { item: "전체 시스템 점검", period: "년 1회", owner: "협력사 합동" },
  ];

  const priorities = [
    { rank: 1, item: "안전 센서 이중화", phase: "Phase 1" },
    { rank: 2, item: "통합 시스템 아키텍처", phase: "Phase 1~2" },
    { rank: 3, item: "센서 ID 체계 통일", phase: "Phase 1" },
    { rank: 4, item: "MLOps 체계 구축", phase: "Phase 3" },
  ];

  return (
    <AbsoluteFill style={styles.background}>
      <div style={{ padding: 40 }}>
        <div style={styles.title}>
          9. 보안 및 유지보수 체계
        </div>

        <div style={{ display: "flex", gap: 25 }}>
          <div style={{ flex: 1 }}>
            <div style={{ ...styles.subtitle, fontSize: 22, color: "#ff6b6b", textAlign: "left" }}>
              사이버 보안 체계
            </div>
            {security.map((s, i) => {
              const delay = 15 + i * 10;
              const opacity = interpolate(frame, [delay, delay + 15], [0, 1], { extrapolateRight: "clamp" });
              return (
                <div key={i} style={{
                  display: "flex",
                  marginBottom: 8,
                  opacity,
                  padding: "8px 12px",
                  background: "rgba(255, 107, 107, 0.1)",
                  borderRadius: 6,
                  fontSize: 17,
                }}>
                  <span style={{ color: "#ff6b6b", fontWeight: "bold", minWidth: 100 }}>{s.area}</span>
                  <span style={{ color: "#ffffff" }}>{s.recommendation}</span>
                </div>
              );
            })}
          </div>

          <div style={{ flex: 1 }}>
            <div style={{ ...styles.subtitle, fontSize: 22, color: "#0096ff", textAlign: "left" }}>
              유지보수 체계
            </div>
            {maintenance.map((m, i) => {
              const delay = 60 + i * 10;
              const opacity = interpolate(frame, [delay, delay + 15], [0, 1], { extrapolateRight: "clamp" });
              return (
                <div key={i} style={{
                  display: "flex",
                  marginBottom: 8,
                  opacity,
                  padding: "8px 12px",
                  background: "rgba(0, 150, 255, 0.1)",
                  borderRadius: 6,
                  fontSize: 17,
                }}>
                  <span style={{ color: "#0096ff", fontWeight: "bold", minWidth: 140 }}>{m.item}</span>
                  <span style={{ color: "#ffa500", minWidth: 100 }}>{m.period}</span>
                  <span style={{ color: "#aaa" }}>{m.owner}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div style={{ ...styles.accentBox, marginTop: 25 }}>
          <div style={{ color: "#00ff88", fontWeight: "bold", marginBottom: 10, fontSize: 20 }}>
            개선 우선순위
          </div>
          <div style={{ display: "flex", gap: 15 }}>
            {priorities.map((p, i) => {
              const delay = 120 + i * 12;
              const opacity = interpolate(frame, [delay, delay + 15], [0, 1], { extrapolateRight: "clamp" });
              return (
                <div key={i} style={{
                  flex: 1,
                  textAlign: "center",
                  padding: "10px",
                  background: "rgba(0, 255, 136, 0.1)",
                  borderRadius: 8,
                  opacity,
                }}>
                  <div style={{ color: "#ffa500", fontWeight: "bold", fontSize: 24 }}>#{p.rank}</div>
                  <div style={{ color: "#ffffff", fontSize: 16 }}>{p.item}</div>
                  <div style={{ color: "#00ff88", fontSize: 14 }}>{p.phase}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <Audio src={staticFile("improvement/scene10_security.mp3")} />
    </AbsoluteFill>
  );
};

// Main Video Component
export const ImprovementVideo: React.FC = () => {
  return (
    <AbsoluteFill>
      <Sequence from={SCENE_TIMINGS.scene01_intro.start} durationInFrames={SCENE_TIMINGS.scene01_intro.duration}>
        <Scene01Intro />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene02_sensor_id.start} durationInFrames={SCENE_TIMINGS.scene02_sensor_id.duration}>
        <Scene02SensorId />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene03_protocol.start} durationInFrames={SCENE_TIMINGS.scene03_protocol.duration}>
        <Scene03Protocol />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene04_safety.start} durationInFrames={SCENE_TIMINGS.scene04_safety.duration}>
        <Scene04Safety />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene05_mlops.start} durationInFrames={SCENE_TIMINGS.scene05_mlops.duration}>
        <Scene05MLOps />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene06_calibration.start} durationInFrames={SCENE_TIMINGS.scene06_calibration.duration}>
        <Scene06Calibration />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene07_grade.start} durationInFrames={SCENE_TIMINGS.scene07_grade.duration}>
        <Scene07Grade />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene08_sop.start} durationInFrames={SCENE_TIMINGS.scene08_sop.duration}>
        <Scene08SOP />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene09_architecture.start} durationInFrames={SCENE_TIMINGS.scene09_architecture.duration}>
        <Scene09Architecture />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene10_security.start} durationInFrames={SCENE_TIMINGS.scene10_security.duration}>
        <Scene10Security />
      </Sequence>
    </AbsoluteFill>
  );
};
