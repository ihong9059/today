import React from "react";
import {
  AbsoluteFill,
  Audio,
  Img,
  Sequence,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

// ============================================================
// UTTEC 회사소개 동영상 - 한국어 버전
// ============================================================

// Scene별 타이밍 (30fps 기준) - 실제 오디오 길이 + 여유 시간 기준
export const SCENE_TIMINGS = {
  scene01_opening: { duration: 450, start: 0 },           // 12.84s + 여유 = 15s (450 frames)
  scene02_company: { duration: 1080, start: 450 },        // 33.10s + 여유 = 36s (1080 frames)
  scene03_ceo: { duration: 1230, start: 1530 },           // 38.28s + 여유 = 41s (1230 frames)
  scene04_blemesh: { duration: 1020, start: 2760 },       // 31.15s + 여유 = 34s (1020 frames)
  scene05_products: { duration: 1170, start: 3780 },      // 35.90s + 여유 = 39s (1170 frames)
  scene06_japan: { duration: 1110, start: 4950 },         // 34.39s + 여유 = 37s (1110 frames)
  scene07_smartfactory: { duration: 1050, start: 6060 },  // 32.90s + 여유 = 35s (1050 frames)
  scene08_closing: { duration: 690, start: 7110 },        // 20.33s + 여유 = 23s (690 frames)
};

export const UTTEC_VIDEO_DURATION = 7800; // 총 약 4분 20초 (7800 frames)

// UTTEC 브랜드 컬러 (파란색/청록색 계열)
const colors = {
  bg: "#0A1628",
  bgGradient1: "#0D2137",
  bgGradient2: "#0A1628",
  primary: "#00B4D8",      // 청록색
  accent: "#0077B6",       // 파란색
  highlight: "#48CAE4",    // 밝은 청록
  text: "#FFFFFF",
  textSub: "#90E0EF",
  gold: "#FFD700",
  success: "#00E676",
};

// 애니메이션 헬퍼 함수들
const fadeIn = (frame: number, start: number, duration: number) =>
  interpolate(frame, [start, start + duration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

const fadeOut = (frame: number, start: number, duration: number) =>
  interpolate(frame, [start, start + duration], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

const slideUp = (frame: number, start: number, duration: number, distance: number = 50) =>
  interpolate(frame, [start, start + duration], [distance, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

const slideIn = (frame: number, start: number, duration: number, distance: number = 100) =>
  interpolate(frame, [start, start + duration], [-distance, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

const scaleIn = (frame: number, fps: number, delay: number = 0) =>
  spring({
    frame: frame - delay,
    fps,
    config: { damping: 12, stiffness: 100 },
  });

// 테크 배경 컴포넌트
const TechBackground: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill>
      {/* 그라데이션 배경 */}
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          background: `linear-gradient(135deg, ${colors.bgGradient1} 0%, ${colors.bg} 50%, ${colors.bgGradient2} 100%)`,
        }}
      />

      {/* 움직이는 그리드 */}
      <svg
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          opacity: 0.1,
        }}
      >
        {Array.from({ length: 20 }).map((_, i) => (
          <line
            key={`h-${i}`}
            x1="0"
            y1={`${i * 5 + (frame * 0.1) % 5}%`}
            x2="100%"
            y2={`${i * 5 + (frame * 0.1) % 5}%`}
            stroke={colors.primary}
            strokeWidth="1"
          />
        ))}
        {Array.from({ length: 20 }).map((_, i) => (
          <line
            key={`v-${i}`}
            x1={`${i * 5 + (frame * 0.05) % 5}%`}
            y1="0"
            x2={`${i * 5 + (frame * 0.05) % 5}%`}
            y2="100%"
            stroke={colors.primary}
            strokeWidth="1"
          />
        ))}
      </svg>

      {/* 플로팅 파티클 */}
      {Array.from({ length: 15 }).map((_, i) => {
        const x = (i * 137.5 + frame * 0.3) % 100;
        const y = (i * 73.7 + frame * 0.2) % 100;
        const size = 3 + (i % 3) * 2;
        return (
          <div
            key={`particle-${i}`}
            style={{
              position: "absolute",
              left: `${x}%`,
              top: `${y}%`,
              width: size,
              height: size,
              borderRadius: "50%",
              background: colors.highlight,
              opacity: 0.3 + Math.sin(frame * 0.05 + i) * 0.2,
              boxShadow: `0 0 ${size * 2}px ${colors.primary}`,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};

// 네온 텍스트 컴포넌트
const NeonText: React.FC<{
  children: React.ReactNode;
  size?: number;
  color?: string;
  style?: React.CSSProperties;
}> = ({ children, size = 48, color = colors.primary, style }) => (
  <div
    style={{
      fontSize: size,
      fontWeight: 700,
      color: color,
      textShadow: `0 0 10px ${color}, 0 0 20px ${color}, 0 0 40px ${color}`,
      ...style,
    }}
  >
    {children}
  </div>
);

// 홀로그램 카드 컴포넌트
const HoloCard: React.FC<{
  children: React.ReactNode;
  width?: number | string;
  height?: number | string;
  style?: React.CSSProperties;
}> = ({ children, width = 400, height = "auto", style }) => {
  const frame = useCurrentFrame();
  const shimmer = Math.sin(frame * 0.1) * 10;

  return (
    <div
      style={{
        width,
        height,
        background: `linear-gradient(135deg,
          rgba(0, 180, 216, 0.1) 0%,
          rgba(0, 119, 182, 0.2) 50%,
          rgba(72, 202, 228, 0.1) 100%)`,
        border: `2px solid ${colors.primary}`,
        borderRadius: 16,
        padding: 24,
        backdropFilter: "blur(10px)",
        boxShadow: `0 0 30px rgba(0, 180, 216, 0.3),
                    inset 0 0 ${20 + shimmer}px rgba(0, 180, 216, 0.1)`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

// ============================================================
// Scene 1: 오프닝 (0:00 ~ 0:25)
// ============================================================
const Scene01Opening: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoScale = scaleIn(frame, fps, 15);
  const titleOpacity = fadeIn(frame, 30, 20);
  const titleY = slideUp(frame, 30, 20, 30);
  const sloganOpacity = fadeIn(frame, 60, 20);

  return (
    <AbsoluteFill>
      <Audio src={staticFile("uttec/scene01_opening_ko.mp3")} />
      <TechBackground />

      {/* IoT 연결 네트워크 애니메이션 */}
      <div style={{ position: "absolute", width: "100%", height: "100%" }}>
        {/* 연결선 애니메이션 */}
        <svg style={{ width: "100%", height: "100%", position: "absolute" }}>
          {[
            { x1: 300, y1: 200, x2: 600, y2: 350 },
            { x1: 600, y1: 350, x2: 960, y2: 540 },
            { x1: 960, y1: 540, x2: 1300, y2: 400 },
            { x1: 1300, y1: 400, x2: 1600, y2: 600 },
            { x1: 960, y1: 540, x2: 700, y2: 700 },
            { x1: 960, y1: 540, x2: 1200, y2: 750 },
          ].map((line, i) => {
            const progress = interpolate(frame, [10 + i * 8, 40 + i * 8], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });
            return (
              <line
                key={i}
                x1={line.x1}
                y1={line.y1}
                x2={line.x1 + (line.x2 - line.x1) * progress}
                y2={line.y1 + (line.y2 - line.y1) * progress}
                stroke={colors.primary}
                strokeWidth={3}
                opacity={0.6}
              />
            );
          })}
        </svg>

        {/* IoT 노드들 */}
        {[
          { x: 300, y: 200, delay: 0, label: "센서" },
          { x: 600, y: 350, delay: 8, label: "게이트웨이" },
          { x: 960, y: 540, delay: 16, label: "서버" },
          { x: 1300, y: 400, delay: 24, label: "클라우드" },
          { x: 1600, y: 600, delay: 32, label: "모바일" },
          { x: 700, y: 700, delay: 28, label: "디바이스" },
          { x: 1200, y: 750, delay: 36, label: "분석" },
        ].map((node, i) => {
          const nodeScale = scaleIn(frame, fps, node.delay);
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: node.x - 40,
                top: node.y - 40,
                width: 80,
                height: 80,
                borderRadius: "50%",
                background: `radial-gradient(circle, ${colors.highlight} 0%, ${colors.primary} 100%)`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transform: `scale(${nodeScale})`,
                boxShadow: `0 0 30px ${colors.primary}`,
              }}
            >
              <span style={{ color: colors.bg, fontWeight: 700, fontSize: 12 }}>
                {node.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* UTTEC 로고 및 텍스트 */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: `translate(-50%, -50%) scale(${logoScale})`,
          textAlign: "center",
          zIndex: 10,
        }}
      >
        <NeonText size={120} color={colors.highlight}>
          UTTEC
        </NeonText>

        <div
          style={{
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
            marginTop: 20,
          }}
        >
          <div style={{ fontSize: 36, color: colors.text, fontWeight: 500 }}>
            ㈜유티텍
          </div>
        </div>

        <div
          style={{
            opacity: sloganOpacity,
            marginTop: 30,
          }}
        >
          <div
            style={{
              fontSize: 28,
              color: colors.textSub,
              letterSpacing: 8,
              fontWeight: 300,
            }}
          >
            Network Solution
          </div>
        </div>
      </div>

      {/* 웹사이트 */}
      <div
        style={{
          position: "absolute",
          bottom: 60,
          width: "100%",
          textAlign: "center",
          opacity: fadeIn(frame, 90, 20),
        }}
      >
        <span style={{ fontSize: 24, color: colors.textSub }}>
          www.uttec.co.kr
        </span>
      </div>
    </AbsoluteFill>
  );
};

// ============================================================
// Scene 2: 회사 개요 및 핵심 역량 (0:25 ~ 1:15)
// ============================================================
const Scene02Company: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill>
      <Audio src={staticFile("uttec/scene02_company_ko.mp3")} />
      <TechBackground />

      {/* 타이틀 */}
      <div
        style={{
          position: "absolute",
          top: 80,
          width: "100%",
          textAlign: "center",
          opacity: fadeIn(frame, 0, 20),
          transform: `translateY(${slideUp(frame, 0, 20)}px)`,
        }}
      >
        <NeonText size={56}>회사 개요</NeonText>
      </div>

      {/* 타임라인 */}
      <div
        style={{
          position: "absolute",
          top: 200,
          left: 120,
          opacity: fadeIn(frame, 30, 20),
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 40 }}>
          {/* 2016년 설립 */}
          <HoloCard width={280} style={{ transform: `scale(${scaleIn(frame, fps, 40)})` }}>
            <div style={{ textAlign: "center" }}>
              <NeonText size={48} color={colors.gold}>2016</NeonText>
              <div style={{ fontSize: 24, color: colors.text, marginTop: 10 }}>
                회사 설립
              </div>
              <div style={{ fontSize: 18, color: colors.textSub, marginTop: 8 }}>
                기업연구소 동시 설립
              </div>
            </div>
          </HoloCard>

          {/* 특허 */}
          <HoloCard width={320} style={{ transform: `scale(${scaleIn(frame, fps, 55)})` }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 20, color: colors.highlight, marginBottom: 10 }}>
                🏆 특허 등록
              </div>
              <div style={{ fontSize: 18, color: colors.text, lineHeight: 1.6 }}>
                복합센서를 활용한<br/>디밍제어 시스템
              </div>
              <div style={{ fontSize: 14, color: colors.textSub, marginTop: 8 }}>
                제10-1623345호
              </div>
            </div>
          </HoloCard>

          {/* 벤처기업 */}
          <HoloCard width={240} style={{ transform: `scale(${scaleIn(frame, fps, 70)})` }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 48, marginBottom: 10 }}>🚀</div>
              <div style={{ fontSize: 20, color: colors.text }}>
                벤처기업 인증
              </div>
            </div>
          </HoloCard>
        </div>
      </div>

      {/* 인증 현황 */}
      <div
        style={{
          position: "absolute",
          top: 480,
          width: "100%",
          textAlign: "center",
          opacity: fadeIn(frame, 90, 25),
        }}
      >
        <div style={{ fontSize: 32, color: colors.text, marginBottom: 40 }}>
          글로벌 인증 획득
        </div>

        <div style={{ display: "flex", justifyContent: "center", gap: 80 }}>
          {[
            { name: "KC", country: "한국", delay: 100 },
            { name: "TELEC", country: "일본", delay: 115 },
            { name: "CE", country: "유럽", delay: 130 },
          ].map((cert, i) => (
            <div
              key={i}
              style={{
                opacity: fadeIn(frame, cert.delay, 20),
                transform: `scale(${scaleIn(frame, fps, cert.delay)})`,
              }}
            >
              <HoloCard width={200} height={150}>
                <div style={{ textAlign: "center" }}>
                  <NeonText size={40} color={colors.success}>{cert.name}</NeonText>
                  <div style={{ fontSize: 18, color: colors.textSub, marginTop: 10 }}>
                    {cert.country} 인증
                  </div>
                </div>
              </HoloCard>
            </div>
          ))}
        </div>
      </div>

      {/* 일본 특허 */}
      <div
        style={{
          position: "absolute",
          bottom: 100,
          width: "100%",
          textAlign: "center",
          opacity: fadeIn(frame, 160, 25),
        }}
      >
        <HoloCard width={500} style={{ margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <div style={{ fontSize: 48 }}>🇯🇵</div>
            <div>
              <div style={{ fontSize: 22, color: colors.highlight }}>
                일본 특허 등록
              </div>
              <div style={{ fontSize: 18, color: colors.text, marginTop: 5 }}>
                LED 구동 제어 시스템 (특허 제5982528호)
              </div>
            </div>
          </div>
        </HoloCard>
      </div>
    </AbsoluteFill>
  );
};

// ============================================================
// Scene 3: 대표이사 및 개발 역량 (1:15 ~ 2:00)
// ============================================================
const Scene03CEO: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 타임라인 데이터
  const timeline = [
    { year: "1985", title: "삼성전기 입사", desc: "Audio Deck 개발 시작" },
    { year: "1990", title: "CATV System", desc: "한국형 CATV 개발 (MS 70%)" },
    { year: "1995", title: "위성 수신기", desc: "캐나다 Tee com, Skylife STB" },
    { year: "2000", title: "Digital TV", desc: "독일 Loewe TV 개발 참여" },
    { year: "2016", title: "UTTEC 설립", desc: "IoT 솔루션 사업 시작" },
  ];

  return (
    <AbsoluteFill>
      <Audio src={staticFile("uttec/scene03_ceo_ko.mp3")} />
      <TechBackground />

      {/* 타이틀 */}
      <div
        style={{
          position: "absolute",
          top: 60,
          width: "100%",
          textAlign: "center",
          opacity: fadeIn(frame, 0, 20),
        }}
      >
        <NeonText size={52}>40년 개발 역량</NeonText>
      </div>

      {/* 핵심 강조 */}
      <div
        style={{
          position: "absolute",
          top: 140,
          width: "100%",
          textAlign: "center",
          opacity: fadeIn(frame, 20, 20),
        }}
      >
        <span
          style={{
            fontSize: 28,
            color: colors.gold,
            background: "rgba(255, 215, 0, 0.1)",
            padding: "8px 30px",
            borderRadius: 30,
            border: `1px solid ${colors.gold}`,
          }}
        >
          1985년 ~ 현재까지 회로 및 소프트웨어 개발 지속
        </span>
      </div>

      {/* 타임라인 */}
      <div
        style={{
          position: "absolute",
          top: 240,
          left: "50%",
          transform: "translateX(-50%)",
          width: 1600,
        }}
      >
        {/* 타임라인 선 */}
        <div
          style={{
            position: "absolute",
            top: 45,
            left: 100,
            right: 100,
            height: 4,
            background: colors.primary,
            opacity: 0.5,
          }}
        />

        {/* 타임라인 아이템 */}
        <div style={{ display: "flex", justifyContent: "space-between", padding: "0 50px" }}>
          {timeline.map((item, i) => {
            const itemDelay = 40 + i * 25;
            const itemOpacity = fadeIn(frame, itemDelay, 20);
            const itemScale = scaleIn(frame, fps, itemDelay);

            return (
              <div
                key={i}
                style={{
                  textAlign: "center",
                  opacity: itemOpacity,
                  transform: `scale(${itemScale})`,
                }}
              >
                {/* 연도 포인트 */}
                <div
                  style={{
                    width: 90,
                    height: 90,
                    borderRadius: "50%",
                    background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto",
                    boxShadow: `0 0 20px ${colors.primary}`,
                  }}
                >
                  <span style={{ fontSize: 20, fontWeight: 700, color: colors.text }}>
                    {item.year}
                  </span>
                </div>

                {/* 설명 */}
                <div style={{ marginTop: 20 }}>
                  <div style={{ fontSize: 20, color: colors.highlight, fontWeight: 600 }}>
                    {item.title}
                  </div>
                  <div style={{ fontSize: 16, color: colors.textSub, marginTop: 8 }}>
                    {item.desc}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 삼성전기 로고 영역 */}
      <div
        style={{
          position: "absolute",
          bottom: 200,
          left: 150,
          opacity: fadeIn(frame, 150, 25),
          transform: `translateX(${slideIn(frame, 150, 25)}px)`,
        }}
      >
        <HoloCard width={400}>
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <div
              style={{
                width: 80,
                height: 80,
                borderRadius: 12,
                background: "#1428A0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span style={{ color: "white", fontWeight: 700, fontSize: 14 }}>
                SAMSUNG
              </span>
            </div>
            <div>
              <div style={{ fontSize: 22, color: colors.text }}>삼성전기 출신</div>
              <div style={{ fontSize: 16, color: colors.textSub }}>
                전자 개발의 선두주자
              </div>
            </div>
          </div>
        </HoloCard>
      </div>

      {/* 독일 Loewe */}
      <div
        style={{
          position: "absolute",
          bottom: 200,
          right: 150,
          opacity: fadeIn(frame, 170, 25),
          transform: `translateX(${-slideIn(frame, 170, 25)}px)`,
        }}
      >
        <HoloCard width={400}>
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <div style={{ fontSize: 48 }}>🇩🇪</div>
            <div>
              <div style={{ fontSize: 22, color: colors.text }}>Loewe TV 개발</div>
              <div style={{ fontSize: 16, color: colors.textSub }}>
                독일 프리미엄 TV 브랜드
              </div>
            </div>
          </div>
        </HoloCard>
      </div>

      {/* 현재 개발 인력 */}
      <div
        style={{
          position: "absolute",
          bottom: 60,
          width: "100%",
          textAlign: "center",
          opacity: fadeIn(frame, 200, 25),
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 20,
            background: "rgba(0, 230, 118, 0.1)",
            border: `2px solid ${colors.success}`,
            borderRadius: 50,
            padding: "15px 40px",
          }}
        >
          <span style={{ fontSize: 36 }}>👨‍💻</span>
          <span style={{ fontSize: 24, color: colors.success }}>
            현재 전문 개발 인력 3명 운영
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ============================================================
// Scene 4: 핵심 기술 - BLE Mesh Network (2:00 ~ 2:50)
// ============================================================
const Scene04BLEMesh: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 메시 네트워크 노드들
  const meshNodes = [
    { x: 960, y: 400, type: "gateway", label: "Gateway" },
    { x: 700, y: 300, type: "node", label: "Node 1" },
    { x: 1220, y: 300, type: "node", label: "Node 2" },
    { x: 600, y: 500, type: "node", label: "Node 3" },
    { x: 1320, y: 500, type: "node", label: "Node 4" },
    { x: 500, y: 350, type: "sensor", label: "센서" },
    { x: 1420, y: 350, type: "sensor", label: "센서" },
    { x: 800, y: 600, type: "sensor", label: "센서" },
    { x: 1120, y: 600, type: "sensor", label: "센서" },
  ];

  // 연결선
  const connections = [
    [0, 1], [0, 2], [0, 3], [0, 4],
    [1, 5], [2, 6], [3, 7], [4, 8],
    [1, 3], [2, 4], [1, 2], [3, 4],
  ];

  return (
    <AbsoluteFill>
      <Audio src={staticFile("uttec/scene04_blemesh_ko.mp3")} />
      <TechBackground />

      {/* 타이틀 */}
      <div
        style={{
          position: "absolute",
          top: 40,
          width: "100%",
          textAlign: "center",
          opacity: fadeIn(frame, 0, 20),
        }}
      >
        <NeonText size={52}>핵심 기술: BLE Mesh Network</NeonText>
      </div>

      {/* 메시 네트워크 다이어그램 */}
      <div
        style={{
          position: "absolute",
          top: 120,
          left: 0,
          width: "100%",
          height: 550,
        }}
      >
        {/* 연결선 */}
        <svg style={{ width: "100%", height: "100%", position: "absolute" }}>
          {connections.map(([from, to], i) => {
            const fromNode = meshNodes[from];
            const toNode = meshNodes[to];
            const lineProgress = interpolate(frame, [30 + i * 5, 50 + i * 5], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });

            // 데이터 패킷 애니메이션
            const packetProgress = ((frame - 60 - i * 10) % 60) / 60;
            const packetX = fromNode.x + (toNode.x - fromNode.x) * packetProgress;
            const packetY = fromNode.y + (toNode.y - fromNode.y) * packetProgress;

            return (
              <g key={i}>
                <line
                  x1={fromNode.x}
                  y1={fromNode.y}
                  x2={fromNode.x + (toNode.x - fromNode.x) * lineProgress}
                  y2={fromNode.y + (toNode.y - fromNode.y) * lineProgress}
                  stroke={colors.primary}
                  strokeWidth={2}
                  opacity={0.5}
                />
                {frame > 60 + i * 10 && (
                  <circle
                    cx={packetX}
                    cy={packetY}
                    r={4}
                    fill={colors.highlight}
                    opacity={0.8}
                  />
                )}
              </g>
            );
          })}
        </svg>

        {/* 노드들 */}
        {meshNodes.map((node, i) => {
          const nodeScale = scaleIn(frame, fps, 20 + i * 5);
          const size = node.type === "gateway" ? 70 : node.type === "node" ? 50 : 35;
          const bgColor = node.type === "gateway"
            ? colors.gold
            : node.type === "node"
              ? colors.primary
              : colors.highlight;

          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: node.x - size / 2,
                top: node.y - size / 2,
                width: size,
                height: size,
                borderRadius: "50%",
                background: bgColor,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transform: `scale(${nodeScale})`,
                boxShadow: `0 0 20px ${bgColor}`,
              }}
            >
              <span
                style={{
                  color: colors.bg,
                  fontSize: node.type === "gateway" ? 12 : 10,
                  fontWeight: 700,
                }}
              >
                {node.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* 기술 특징 카드들 */}
      <div
        style={{
          position: "absolute",
          bottom: 100,
          left: 0,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          gap: 40,
        }}
      >
        {[
          { icon: "🔐", title: "암호화 통신", desc: "보안 데이터 전송", delay: 100 },
          { icon: "🔋", title: "저전력", desc: "배터리 장기 운영", delay: 115 },
          { icon: "📡", title: "200m+", desc: "확장된 통신 거리", delay: 130 },
          { icon: "🌐", title: "Mesh 구조", desc: "통신 사각지대 해소", delay: 145 },
          { icon: "☀️", title: "독립형 노드", desc: "태양전지 + 배터리", delay: 160 },
        ].map((feature, i) => (
          <div
            key={i}
            style={{
              opacity: fadeIn(frame, feature.delay, 20),
              transform: `scale(${scaleIn(frame, fps, feature.delay)})`,
            }}
          >
            <HoloCard width={200} height={160}>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 40, marginBottom: 10 }}>{feature.icon}</div>
                <div style={{ fontSize: 20, color: colors.highlight, fontWeight: 600 }}>
                  {feature.title}
                </div>
                <div style={{ fontSize: 14, color: colors.textSub, marginTop: 5 }}>
                  {feature.desc}
                </div>
              </div>
            </HoloCard>
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};

// ============================================================
// Scene 5: 적용 분야 및 제품 (2:50 ~ 3:40)
// ============================================================
const Scene05Products: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const categories = [
    {
      title: "조명 제어",
      icon: "💡",
      items: ["지하주차장 무선 디밍", "골프장 스포츠 조명", "건물 보안등 제어"],
      color: colors.gold,
    },
    {
      title: "주차장 시스템",
      icon: "🅿️",
      items: ["빈 주차공간 확인", "침수 감지 시스템", "자전거 주차(주륜장)"],
      color: colors.primary,
    },
    {
      title: "스마트 제어",
      icon: "🌱",
      items: ["스마트팜 센서", "온도/습도/CO2/조도", "환경 모니터링"],
      color: colors.success,
    },
  ];

  return (
    <AbsoluteFill>
      <Audio src={staticFile("uttec/scene05_products_ko.mp3")} />
      <TechBackground />

      {/* 타이틀 */}
      <div
        style={{
          position: "absolute",
          top: 50,
          width: "100%",
          textAlign: "center",
          opacity: fadeIn(frame, 0, 20),
        }}
      >
        <NeonText size={52}>적용 분야 및 솔루션</NeonText>
      </div>

      {/* 3대 사업 영역 */}
      <div
        style={{
          position: "absolute",
          top: 150,
          left: 0,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          gap: 60,
        }}
      >
        {categories.map((cat, i) => {
          const delay = 30 + i * 30;

          return (
            <div
              key={i}
              style={{
                opacity: fadeIn(frame, delay, 25),
                transform: `translateY(${slideUp(frame, delay, 25, 40)}px)`,
              }}
            >
              <HoloCard
                width={450}
                height={380}
                style={{ borderColor: cat.color }}
              >
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 60, marginBottom: 15 }}>{cat.icon}</div>
                  <NeonText size={32} color={cat.color}>{cat.title}</NeonText>

                  <div style={{ marginTop: 25 }}>
                    {cat.items.map((item, j) => {
                      const itemDelay = delay + 20 + j * 10;
                      return (
                        <div
                          key={j}
                          style={{
                            opacity: fadeIn(frame, itemDelay, 15),
                            fontSize: 20,
                            color: colors.text,
                            padding: "12px 0",
                            borderBottom: j < cat.items.length - 1
                              ? `1px solid rgba(255,255,255,0.1)`
                              : "none",
                          }}
                        >
                          {item}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </HoloCard>
            </div>
          );
        })}
      </div>

      {/* 주요 납품처 */}
      <div
        style={{
          position: "absolute",
          bottom: 100,
          width: "100%",
          textAlign: "center",
          opacity: fadeIn(frame, 180, 25),
        }}
      >
        <div style={{ fontSize: 24, color: colors.textSub, marginBottom: 25 }}>
          주요 납품처
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: 40 }}>
          {["필로스GC", "광릉CC", "현대힐스테이트", "롯데월드", "하나금융"].map((client, i) => (
            <div
              key={i}
              style={{
                opacity: fadeIn(frame, 200 + i * 10, 15),
                background: "rgba(255,255,255,0.05)",
                padding: "12px 25px",
                borderRadius: 30,
                border: `1px solid ${colors.primary}`,
              }}
            >
              <span style={{ fontSize: 18, color: colors.text }}>{client}</span>
            </div>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ============================================================
// Scene 6: 일본 수출 실적 및 글로벌 레퍼런스 (3:40 ~ 4:20)
// ============================================================
const Scene06Japan: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 수출 그래프 애니메이션
  const bar2022Height = interpolate(frame, [60, 100], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const bar2023Height = interpolate(frame, [80, 120], [0, 330], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill>
      <Audio src={staticFile("uttec/scene06_japan_ko.mp3")} />
      <TechBackground />

      {/* 타이틀 */}
      <div
        style={{
          position: "absolute",
          top: 50,
          width: "100%",
          textAlign: "center",
          opacity: fadeIn(frame, 0, 20),
        }}
      >
        <NeonText size={52}>일본 수출 실적</NeonText>
        <div style={{ fontSize: 24, color: colors.textSub, marginTop: 10 }}>
          검증된 글로벌 기술력
        </div>
      </div>

      {/* 일본 지도 및 프로젝트 */}
      <div
        style={{
          position: "absolute",
          top: 160,
          left: 100,
          opacity: fadeIn(frame, 30, 25),
        }}
      >
        {/* 일본 지도 심볼 */}
        <div
          style={{
            width: 500,
            height: 400,
            position: "relative",
          }}
        >
          <div
            style={{
              fontSize: 180,
              opacity: 0.3,
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            🇯🇵
          </div>

          {/* 하네다공항 마커 */}
          <div
            style={{
              position: "absolute",
              top: 200,
              right: 80,
              opacity: fadeIn(frame, 50, 20),
              transform: `scale(${scaleIn(frame, fps, 50)})`,
            }}
          >
            <div
              style={{
                background: colors.gold,
                padding: "8px 15px",
                borderRadius: 8,
                boxShadow: `0 0 20px ${colors.gold}`,
              }}
            >
              <span style={{ color: colors.bg, fontWeight: 600, fontSize: 14 }}>
                하네다공항<br/>아나모리나역
              </span>
            </div>
          </div>

          {/* 나고야 마커 */}
          <div
            style={{
              position: "absolute",
              top: 280,
              left: 150,
              opacity: fadeIn(frame, 70, 20),
              transform: `scale(${scaleIn(frame, fps, 70)})`,
            }}
          >
            <div
              style={{
                background: colors.primary,
                padding: "8px 15px",
                borderRadius: 8,
                boxShadow: `0 0 20px ${colors.primary}`,
              }}
            >
              <span style={{ color: colors.bg, fontWeight: 600, fontSize: 14 }}>
                나고야<br/>사카에역
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 수출 증가 그래프 */}
      <div
        style={{
          position: "absolute",
          top: 180,
          right: 150,
          width: 500,
          height: 400,
          opacity: fadeIn(frame, 40, 25),
        }}
      >
        <div style={{ fontSize: 24, color: colors.text, marginBottom: 30, textAlign: "center" }}>
          자전거 주차장(주륜장) 수출 현황
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
            height: 280,
            gap: 80,
          }}
        >
          {/* 2022년 바 */}
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                width: 100,
                height: bar2022Height,
                background: `linear-gradient(180deg, ${colors.gold}, ${colors.accent})`,
                borderRadius: "8px 8px 0 0",
                boxShadow: `0 0 20px ${colors.gold}`,
              }}
            />
            <div style={{ marginTop: 15 }}>
              <div style={{ fontSize: 20, color: colors.gold, fontWeight: 700 }}>
                500대분
              </div>
              <div style={{ fontSize: 16, color: colors.textSub }}>2022년</div>
            </div>
          </div>

          {/* 2023년 바 */}
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                width: 100,
                height: bar2023Height,
                background: `linear-gradient(180deg, ${colors.highlight}, ${colors.primary})`,
                borderRadius: "8px 8px 0 0",
                boxShadow: `0 0 30px ${colors.primary}`,
              }}
            />
            <div style={{ marginTop: 15 }}>
              <div style={{ fontSize: 20, color: colors.highlight, fontWeight: 700 }}>
                3,300대분
              </div>
              <div style={{ fontSize: 16, color: colors.textSub }}>2023년</div>
            </div>
          </div>
        </div>

        {/* 성장률 */}
        <div
          style={{
            textAlign: "center",
            marginTop: 20,
            opacity: fadeIn(frame, 130, 20),
          }}
        >
          <span
            style={{
              fontSize: 32,
              color: colors.success,
              fontWeight: 700,
            }}
          >
            ▲ 560% 성장
          </span>
        </div>
      </div>

      {/* 파트너사 */}
      <div
        style={{
          position: "absolute",
          bottom: 80,
          width: "100%",
          textAlign: "center",
          opacity: fadeIn(frame, 150, 25),
        }}
      >
        <div style={{ fontSize: 22, color: colors.textSub, marginBottom: 20 }}>
          일본 파트너사
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: 60 }}>
          {["도카이기켄", "RESTAR"].map((partner, i) => (
            <HoloCard
              key={i}
              width={200}
              style={{
                opacity: fadeIn(frame, 160 + i * 15, 20),
                transform: `scale(${scaleIn(frame, fps, 160 + i * 15)})`,
              }}
            >
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 24 }}>🤝</div>
                <div style={{ fontSize: 20, color: colors.text, marginTop: 10 }}>
                  {partner}
                </div>
              </div>
            </HoloCard>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ============================================================
// Scene 7: Smart Factory 역량 및 협력 제안 (4:20 ~ 4:50)
// ============================================================
const Scene07SmartFactory: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill>
      <Audio src={staticFile("uttec/scene07_smartfactory_ko.mp3")} />
      <TechBackground />

      {/* 타이틀 */}
      <div
        style={{
          position: "absolute",
          top: 50,
          width: "100%",
          textAlign: "center",
          opacity: fadeIn(frame, 0, 20),
        }}
      >
        <NeonText size={52}>Smart Factory & AI 혁신</NeonText>
      </div>

      {/* AI 시대 배지 */}
      <div
        style={{
          position: "absolute",
          top: 130,
          width: "100%",
          textAlign: "center",
          opacity: fadeIn(frame, 20, 20),
        }}
      >
        <span
          style={{
            fontSize: 24,
            color: colors.gold,
            background: "rgba(255, 215, 0, 0.15)",
            padding: "10px 30px",
            borderRadius: 30,
            border: `2px solid ${colors.gold}`,
          }}
        >
          🤖 AI 시대에 맞춘 사업 영역 확장
        </span>
      </div>

      {/* Smart Factory 다이어그램 */}
      <div
        style={{
          position: "absolute",
          top: 220,
          left: 0,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          gap: 50,
        }}
      >
        {/* BLE Mesh 센서 */}
        <div
          style={{
            opacity: fadeIn(frame, 40, 25),
            transform: `translateX(${slideIn(frame, 40, 25)}px)`,
          }}
        >
          <HoloCard width={350} height={280}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 60, marginBottom: 15 }}>📡</div>
              <NeonText size={26} color={colors.primary}>
                BLE Mesh 센서 네트워크
              </NeonText>
              <div style={{ marginTop: 20, fontSize: 18, color: colors.textSub, lineHeight: 1.8 }}>
                무선 센서 데이터 수집<br/>
                실시간 환경 모니터링<br/>
                제조 설비 상태 감시
              </div>
            </div>
          </HoloCard>
        </div>

        {/* 연결 화살표 */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            opacity: fadeIn(frame, 70, 20),
          }}
        >
          <div
            style={{
              fontSize: 50,
              color: colors.highlight,
              animation: "pulse 1s infinite",
            }}
          >
            ➤
          </div>
        </div>

        {/* AI 분석 */}
        <div
          style={{
            opacity: fadeIn(frame, 60, 25),
            transform: `scale(${scaleIn(frame, fps, 60)})`,
          }}
        >
          <HoloCard width={350} height={280} style={{ borderColor: colors.gold }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 60, marginBottom: 15 }}>🧠</div>
              <NeonText size={26} color={colors.gold}>
                AI 기반 데이터 분석
              </NeonText>
              <div style={{ marginTop: 20, fontSize: 18, color: colors.textSub, lineHeight: 1.8 }}>
                패턴 인식 및 예측<br/>
                이상 징후 감지<br/>
                최적화 권고 제공
              </div>
            </div>
          </HoloCard>
        </div>

        {/* 연결 화살표 */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            opacity: fadeIn(frame, 90, 20),
          }}
        >
          <div style={{ fontSize: 50, color: colors.highlight }}>➤</div>
        </div>

        {/* 스마트 팩토리 */}
        <div
          style={{
            opacity: fadeIn(frame, 80, 25),
            transform: `translateX(${-slideIn(frame, 80, 25)}px)`,
          }}
        >
          <HoloCard width={350} height={280} style={{ borderColor: colors.success }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 60, marginBottom: 15 }}>🏭</div>
              <NeonText size={26} color={colors.success}>
                Smart Factory
              </NeonText>
              <div style={{ marginTop: 20, fontSize: 18, color: colors.textSub, lineHeight: 1.8 }}>
                생산성 향상<br/>
                품질 관리 자동화<br/>
                에너지 효율 최적화
              </div>
            </div>
          </HoloCard>
        </div>
      </div>

      {/* KRETTO 협력 제안 */}
      <div
        style={{
          position: "absolute",
          bottom: 80,
          width: "100%",
          textAlign: "center",
          opacity: fadeIn(frame, 120, 25),
        }}
      >
        <HoloCard width={800} style={{ margin: "0 auto", borderColor: colors.highlight }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 40 }}>
            <NeonText size={36}>UTTEC</NeonText>
            <div style={{ fontSize: 40, color: colors.gold }}>✕</div>
            <NeonText size={36} color={colors.gold}>KRETTO</NeonText>
          </div>
          <div style={{ fontSize: 22, color: colors.text, marginTop: 20 }}>
            배터리 안전 기술 + 무선 모니터링 = 새로운 가치 창출
          </div>
        </HoloCard>
      </div>
    </AbsoluteFill>
  );
};

// ============================================================
// Scene 8: 클로징 (4:50 ~ 5:15)
// ============================================================
const Scene08Closing: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill>
      <Audio src={staticFile("uttec/scene08_closing_ko.mp3")} />
      <TechBackground />

      {/* 핵심 메시지 */}
      <div
        style={{
          position: "absolute",
          top: 150,
          width: "100%",
          textAlign: "center",
        }}
      >
        {[
          { text: "40년의 개발 경험", delay: 0 },
          { text: "글로벌 인증 획득", delay: 15 },
          { text: "일본 수출 실적", delay: 30 },
          { text: "Smart Factory로의 도전", delay: 45 },
        ].map((item, i) => (
          <div
            key={i}
            style={{
              opacity: fadeIn(frame, item.delay, 20),
              transform: `translateX(${slideIn(frame, item.delay, 20, 50)}px)`,
              marginBottom: 20,
            }}
          >
            <span
              style={{
                fontSize: 36,
                color: colors.text,
                display: "inline-flex",
                alignItems: "center",
                gap: 15,
              }}
            >
              <span style={{ color: colors.highlight }}>✓</span>
              {item.text}
            </span>
          </div>
        ))}
      </div>

      {/* UTTEC 로고 */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: `translate(-50%, -50%) scale(${scaleIn(frame, fps, 80)})`,
          textAlign: "center",
        }}
      >
        <NeonText size={100} color={colors.highlight}>UTTEC</NeonText>
        <div
          style={{
            fontSize: 32,
            color: colors.text,
            marginTop: 20,
            letterSpacing: 10,
            opacity: fadeIn(frame, 100, 20),
          }}
        >
          Network Solution
        </div>
      </div>

      {/* 신뢰 메시지 */}
      <div
        style={{
          position: "absolute",
          bottom: 220,
          width: "100%",
          textAlign: "center",
          opacity: fadeIn(frame, 120, 25),
        }}
      >
        <span
          style={{
            fontSize: 28,
            color: colors.gold,
            fontStyle: "italic",
          }}
        >
          "신뢰할 수 있는 기술 파트너"
        </span>
      </div>

      {/* 회사 정보 */}
      <div
        style={{
          position: "absolute",
          bottom: 60,
          width: "100%",
          opacity: fadeIn(frame, 140, 25),
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 60,
            fontSize: 18,
            color: colors.textSub,
          }}
        >
          <span>📍 경기도 용인시 흥덕유타워</span>
          <span>📞 031-627-2250</span>
          <span>🌐 www.uttec.co.kr</span>
        </div>
      </div>

      {/* 함께 미래를 */}
      <div
        style={{
          position: "absolute",
          bottom: 130,
          width: "100%",
          textAlign: "center",
          opacity: fadeIn(frame, 160, 25),
        }}
      >
        <span style={{ fontSize: 24, color: colors.text }}>
          함께 미래를 만들어 가겠습니다
        </span>
      </div>
    </AbsoluteFill>
  );
};

// ============================================================
// 글로벌 오버레이 (로고 등)
// ============================================================
const GlobalOverlay: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <>
      {/* 상단 로고 (Scene 1 제외) */}
      {frame > SCENE_TIMINGS.scene01_opening.duration && (
        <div
          style={{
            position: "absolute",
            top: 20,
            right: 30,
            opacity: 0.7,
          }}
        >
          <span style={{ fontSize: 24, color: colors.highlight, fontWeight: 700 }}>
            UTTEC
          </span>
        </div>
      )}
    </>
  );
};

// ============================================================
// 메인 컴포넌트
// ============================================================
export const UttecVideoKO: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: colors.bg }}>
      <Sequence
        from={SCENE_TIMINGS.scene01_opening.start}
        durationInFrames={SCENE_TIMINGS.scene01_opening.duration}
      >
        <Scene01Opening />
      </Sequence>

      <Sequence
        from={SCENE_TIMINGS.scene02_company.start}
        durationInFrames={SCENE_TIMINGS.scene02_company.duration}
      >
        <Scene02Company />
      </Sequence>

      <Sequence
        from={SCENE_TIMINGS.scene03_ceo.start}
        durationInFrames={SCENE_TIMINGS.scene03_ceo.duration}
      >
        <Scene03CEO />
      </Sequence>

      <Sequence
        from={SCENE_TIMINGS.scene04_blemesh.start}
        durationInFrames={SCENE_TIMINGS.scene04_blemesh.duration}
      >
        <Scene04BLEMesh />
      </Sequence>

      <Sequence
        from={SCENE_TIMINGS.scene05_products.start}
        durationInFrames={SCENE_TIMINGS.scene05_products.duration}
      >
        <Scene05Products />
      </Sequence>

      <Sequence
        from={SCENE_TIMINGS.scene06_japan.start}
        durationInFrames={SCENE_TIMINGS.scene06_japan.duration}
      >
        <Scene06Japan />
      </Sequence>

      <Sequence
        from={SCENE_TIMINGS.scene07_smartfactory.start}
        durationInFrames={SCENE_TIMINGS.scene07_smartfactory.duration}
      >
        <Scene07SmartFactory />
      </Sequence>

      <Sequence
        from={SCENE_TIMINGS.scene08_closing.start}
        durationInFrames={SCENE_TIMINGS.scene08_closing.duration}
      >
        <Scene08Closing />
      </Sequence>

      <GlobalOverlay />
    </AbsoluteFill>
  );
};

export default UttecVideoKO;
