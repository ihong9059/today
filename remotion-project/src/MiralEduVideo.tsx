import React from "react";
import {
  AbsoluteFill,
  Audio,
  Sequence,
  staticFile,
  useCurrentFrame,
  interpolate,
  spring,
  useVideoConfig,
} from "remotion";

// ============ SCENE TIMINGS (TTS 기준 frames @ 30fps) ============
export const SCENE_TIMINGS = {
  scene1_intro: { start: 0, duration: 1112 },
  scene2_login: { start: 1112, duration: 1844 },
  scene3_sidebar: { start: 2956, duration: 2001 },
  scene4_main: { start: 4957, duration: 1598 },
  scene5_lookup: { start: 6555, duration: 2984 },
  scene6_attendance: { start: 9539, duration: 3252 },
  scene7_stats: { start: 12791, duration: 3387 },
  scene8_manage: { start: 16178, duration: 2440 },
  scene9_outro: { start: 18618, duration: 1738 },
};

export const MIRAL_EDU_DURATION = 20356;

// ============ COLORS (헬렌켈러 그린 #2E7D32 기반) ============
const c = {
  primary: "#2E7D32",
  primaryDark: "#1B5E20",
  primaryLight: "#66BB6A",
  bg: "#F8FAF7",
  bgDark: "#0F1F15",
  card: "#FFFFFF",
  cardBorder: "#E2EBE0",
  text: "#1F2937",
  textMuted: "#6B7280",
  textDim: "#9CA3AF",
  amber: "#F59E0B",
  amberSoft: "#FEF3C7",
  red: "#DC2626",
  redSoft: "#FEE2E2",
  blue: "#2563EB",
  blueSoft: "#DBEAFE",
  pink: "#EC4899",
  pinkSoft: "#FCE7F3",
  gray: "#6B7280",
  graySoft: "#F3F4F6",
  black: "#0B0F14",
  white: "#FFFFFF",
};

// ============ HELPERS ============
const fadeIn = (frame: number, start = 0, dur = 30) =>
  interpolate(frame, [start, start + dur], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

const slideUp = (frame: number, start = 0, dur = 30, dist = 40) =>
  interpolate(frame, [start, start + dur], [dist, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

const scaleIn = (frame: number, fps: number, delay = 0) =>
  Math.min(spring({ frame: Math.max(0, frame - delay), fps, config: { damping: 14, stiffness: 110 } }), 1);

// ============ GLOBAL OVERLAY ============
const Overlay: React.FC<{ label: string }> = ({ label }) => {
  const frame = useCurrentFrame();
  const op = fadeIn(frame, 0, 30);
  return (
    <>
      <div
        style={{
          position: "absolute",
          top: 28,
          left: 40,
          opacity: op,
          display: "flex",
          alignItems: "center",
          gap: 12,
          zIndex: 1000,
        }}
      >
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: 12,
            background: c.primary,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 22,
          }}
        >
          🌱
        </div>
        <div style={{ color: c.primary, fontSize: 17, fontWeight: 800 }}>헬렌켈러 출석관리</div>
      </div>
      <div
        style={{
          position: "absolute",
          top: 36,
          right: 44,
          opacity: op,
          color: c.textMuted,
          fontSize: 14,
          fontWeight: 700,
          letterSpacing: 1.5,
          textTransform: "uppercase",
          zIndex: 1000,
        }}
      >
        {label}
      </div>
    </>
  );
};

// =============================================================
// SCENE 1 — INTRO
// =============================================================
const Scene1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const titleSc = scaleIn(frame, fps, 10);

  return (
    <AbsoluteFill style={{ background: `linear-gradient(135deg, ${c.bg} 0%, #E8F5E9 100%)`, fontFamily: "Pretendard, 'Apple SD Gothic Neo', sans-serif" }}>
      <Overlay label="01 · 인트로" />
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 80, gap: 30 }}>
        <div style={{ transform: `scale(${titleSc})`, display: "flex", flexDirection: "column", alignItems: "center", gap: 18 }}>
          <div style={{ fontSize: 100 }}>🌱</div>
          <div style={{ fontSize: 80, fontWeight: 900, color: c.primaryDark, letterSpacing: -2, textAlign: "center" }}>
            헬렌켈러 출석관리
          </div>
          <div style={{ fontSize: 28, color: c.primary, fontWeight: 600 }}>
            시청각장애인 학습지원센터 · web 사용 안내
          </div>
        </div>

        <div style={{ opacity: fadeIn(frame, 100, 30), fontSize: 22, color: c.textMuted, textAlign: "center", maxWidth: 1000, marginTop: 8 }}>
          이용자 정보 · 수업 · 출석 · 운영 통계까지 한 곳에서 관리하는 도구
        </div>

        <div style={{ display: "flex", gap: 28, marginTop: 30 }}>
          {[
            { icon: "👨‍💼", label: "내부 관리자", desc: "전체 7개 메뉴 사용", color: c.primary, delay: 180 },
            { icon: "👩‍🏫", label: "외부 강사", desc: "출석 등록 메뉴만 사용", color: c.amber, delay: 240 },
          ].map((u) => {
            const op = fadeIn(frame, u.delay, 30);
            const sc = scaleIn(frame, fps, u.delay);
            return (
              <div
                key={u.label}
                style={{
                  opacity: op,
                  transform: `scale(${sc})`,
                  background: c.white,
                  border: `2px solid ${u.color}`,
                  borderRadius: 20,
                  padding: "26px 36px",
                  display: "flex",
                  alignItems: "center",
                  gap: 18,
                  boxShadow: `0 18px 40px ${u.color}33`,
                  minWidth: 380,
                }}
              >
                <div style={{ fontSize: 48 }}>{u.icon}</div>
                <div>
                  <div style={{ fontSize: 24, fontWeight: 800, color: u.color }}>{u.label}</div>
                  <div style={{ fontSize: 18, color: c.textMuted, marginTop: 4 }}>{u.desc}</div>
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ opacity: fadeIn(frame, 350, 30), marginTop: 24, fontSize: 18, color: c.gray, fontWeight: 600 }}>
          약 11분 · 접속부터 운영 통계까지 단계별 안내
        </div>
      </div>
    </AbsoluteFill>
  );
};

// =============================================================
// SCENE 2 — LOGIN
// =============================================================
const Scene2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ background: c.bg, fontFamily: "Pretendard, sans-serif" }}>
      <Overlay label="02 · 접속 · 로그인" />
      <div style={{ padding: "120px 80px 50px", display: "flex", flexDirection: "column", gap: 32 }}>
        <div style={{ opacity: fadeIn(frame, 0, 30), fontSize: 48, fontWeight: 800, color: c.primaryDark, letterSpacing: -1 }}>
          사용자 유형 선택 화면
        </div>

        {/* Browser mockup */}
        <div style={{ opacity: fadeIn(frame, 30, 30), background: c.white, borderRadius: 16, border: `1px solid ${c.cardBorder}`, overflow: "hidden", boxShadow: "0 30px 70px rgba(15,31,21,0.15)" }}>
          {/* Browser bar */}
          <div style={{ background: "#F1F5F4", padding: "10px 18px", display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 12, height: 12, borderRadius: 999, background: "#EF4444" }} />
            <div style={{ width: 12, height: 12, borderRadius: 999, background: "#F59E0B" }} />
            <div style={{ width: 12, height: 12, borderRadius: 999, background: "#10B981" }} />
            <div style={{ flex: 1, marginLeft: 16, background: c.white, padding: "6px 16px", borderRadius: 8, fontSize: 15, color: c.textMuted, fontFamily: "Consolas, monospace", border: `1px solid ${c.cardBorder}` }}>
              https://miral-edu.streamlit.app/
            </div>
          </div>

          <div style={{ padding: 48, minHeight: 640, display: "flex", flexDirection: "column", gap: 40, alignItems: "center" }}>
            <div style={{ opacity: fadeIn(frame, 90, 30), fontSize: 42, fontWeight: 900, color: c.primary, textAlign: "center" }}>
              헬렌켈러 출석관리
            </div>
            <div style={{ opacity: fadeIn(frame, 90, 30), fontSize: 18, color: c.textMuted }}>
              사용자 유형에 맞게 접속해주세요.
            </div>

            <div style={{ display: "flex", gap: 40, marginTop: 20, width: "100%", justifyContent: "center" }}>
              {/* 내부직원 */}
              <div style={{ opacity: fadeIn(frame, 200, 30), transform: `scale(${scaleIn(frame, fps, 200)})`, background: c.blueSoft, borderRadius: 16, padding: 32, width: 420, display: "flex", flexDirection: "column", gap: 18 }}>
                <div style={{ fontSize: 22, fontWeight: 800, color: c.blue }}>👨‍💼 내부직원 (관리자)</div>
                <div style={{ fontSize: 14, color: c.textMuted }}>비밀번호를 입력하세요</div>
                <div style={{ background: c.white, borderRadius: 8, padding: "14px 18px", fontSize: 22, letterSpacing: 8, color: c.text, fontFamily: "Consolas, monospace" }}>
                  ••••
                </div>
                <div style={{ background: c.primary, color: c.white, borderRadius: 8, padding: "14px 18px", textAlign: "center", fontSize: 17, fontWeight: 700, opacity: fadeIn(frame, 320, 30) }}>
                  접속하기
                </div>
              </div>

              {/* 외부직원 */}
              <div style={{ opacity: fadeIn(frame, 280, 30), transform: `scale(${scaleIn(frame, fps, 280)})`, background: "#FEF7E6", borderRadius: 16, padding: 32, width: 420, display: "flex", flexDirection: "column", gap: 18 }}>
                <div style={{ fontSize: 22, fontWeight: 800, color: c.amber }}>👩‍🏫 외부직원 (강사)</div>
                <div style={{ fontSize: 14, color: c.textMuted }}>별도의 비밀번호 없이 접속 가능합니다</div>
                <div style={{ height: 56 }} />
                <div style={{ background: c.amber, color: c.white, borderRadius: 8, padding: "14px 18px", textAlign: "center", fontSize: 17, fontWeight: 700 }}>
                  접속하기
                </div>
              </div>
            </div>

            <div style={{ opacity: fadeIn(frame, 800, 30), marginTop: 20, padding: "14px 24px", background: c.redSoft, color: c.red, borderRadius: 10, fontSize: 17, fontWeight: 600 }}>
              ⚠ 비밀번호는 외부에 공유하지 마세요. 화면 공유 전에는 새로고침으로 로그아웃 권장
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// =============================================================
// SCENE 3 — SIDEBAR & MENU
// =============================================================
const Scene3: React.FC = () => {
  const frame = useCurrentFrame();

  const menus = [
    "메인",
    "이용자 조회",
    "수업 조회",
    "출석 등록",
    "운영 현황",
    "이용자 관리",
    "수업 관리",
  ];

  return (
    <AbsoluteFill style={{ background: c.bg, fontFamily: "Pretendard, sans-serif" }}>
      <Overlay label="03 · 사이드바 · 메뉴" />
      <div style={{ padding: "120px 80px 50px", display: "flex", flexDirection: "column", gap: 28 }}>
        <div style={{ opacity: fadeIn(frame, 0, 30), fontSize: 48, fontWeight: 800, color: c.primaryDark, letterSpacing: -1 }}>
          좌측 사이드바 — 메뉴와 연도 선택
        </div>

        <div style={{ display: "flex", gap: 36, alignItems: "flex-start" }}>
          {/* Sidebar mockup */}
          <div style={{ opacity: fadeIn(frame, 30, 30), background: c.white, border: `1px solid ${c.cardBorder}`, borderRadius: 16, padding: 24, width: 340, boxShadow: "0 20px 50px rgba(15,31,21,0.10)" }}>
            {/* Logo box */}
            <div style={{ background: c.white, border: `1px solid ${c.cardBorder}`, borderBottom: `7px solid ${c.primary}`, borderRadius: 12, padding: 18, textAlign: "center", marginBottom: 22 }}>
              <div style={{ fontSize: 56, marginBottom: 8 }}>🌱</div>
              <div style={{ fontSize: 11, color: c.gray, fontWeight: 700, borderTop: `1px solid ${c.cardBorder}`, paddingTop: 10 }}>
                헬렌켈러 시청각장애인<br />학습지원센터
              </div>
            </div>

            {menus.map((m, i) => {
              const op = fadeIn(frame, 90 + i * 50, 25);
              const selected = i === 0;
              return (
                <div
                  key={m}
                  style={{
                    opacity: op,
                    background: selected ? c.primary : c.bg,
                    color: selected ? c.white : c.text,
                    padding: "12px 18px",
                    borderRadius: 10,
                    fontSize: 15,
                    fontWeight: selected ? 800 : 600,
                    marginBottom: 8,
                  }}
                >
                  {m}
                </div>
              );
            })}

            <div style={{ opacity: fadeIn(frame, 600, 30), marginTop: 20, fontSize: 12, color: c.textMuted, fontWeight: 700 }}>
              📅 작업 연도
            </div>
            <div style={{ opacity: fadeIn(frame, 600, 30), background: c.bg, border: `1px solid ${c.cardBorder}`, borderRadius: 8, padding: "10px 14px", fontSize: 15, fontWeight: 700, color: c.text, marginTop: 6 }}>
              2026 ▾
            </div>

            <div style={{ opacity: fadeIn(frame, 700, 30), textAlign: "center", marginTop: 22, fontSize: 12, color: c.textDim }}>
              ver.26.04-1
            </div>
          </div>

          {/* Right: explanation */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 18 }}>
            {[
              { icon: "🏷️", label: "로고 클릭 = 메인 이동", desc: "어느 화면에서든 로고를 누르면 처음 화면으로 돌아옵니다", delay: 200 },
              { icon: "📋", label: "7개 메뉴 (관리자) / 1개 메뉴 (강사)", desc: "강사 선생님께는 '출석 등록'만 표시됩니다", delay: 350 },
              { icon: "📅", label: "작업 연도 (2025~올해)", desc: "선택한 연도의 출석·수업 데이터를 자동으로 불러옵니다", delay: 500 },
              { icon: "🔢", label: "버전 정보 (ver.xx.xx-x)", desc: "사이드바 가장 아래에 현재 버전이 표시됩니다", delay: 650 },
            ].map((it) => {
              const op = fadeIn(frame, it.delay, 30);
              return (
                <div
                  key={it.label}
                  style={{
                    opacity: op,
                    background: c.white,
                    border: `1px solid ${c.cardBorder}`,
                    borderLeft: `4px solid ${c.primary}`,
                    borderRadius: 12,
                    padding: "20px 24px",
                    display: "flex",
                    alignItems: "center",
                    gap: 16,
                  }}
                >
                  <div style={{ fontSize: 38 }}>{it.icon}</div>
                  <div>
                    <div style={{ fontSize: 22, fontWeight: 800, color: c.primaryDark }}>{it.label}</div>
                    <div style={{ fontSize: 17, color: c.textMuted, marginTop: 4 }}>{it.desc}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// =============================================================
// SCENE 4 — MAIN (Birthday)
// =============================================================
const Scene4: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const cards = [
    {
      title: "🎂 오늘 생일",
      bg: c.pinkSoft,
      color: c.pink,
      items: ["김ㅇㅇ (3/24)", "박ㅇㅇ (3/24)"],
      delay: 60,
    },
    {
      title: "🔜 다가오는 생일 (2주 이내)",
      bg: c.amberSoft,
      color: c.amber,
      items: ["이ㅇㅇ (3/28, D-4)", "최ㅇㅇ (4/2, D-9)", "정ㅇㅇ (4/6, D-13)"],
      delay: 140,
    },
    {
      title: "⏪ 지난 생일 (1주 이내)",
      bg: c.graySoft,
      color: c.gray,
      items: ["윤ㅇㅇ (3/22)", "조ㅇㅇ (3/19)"],
      delay: 220,
    },
  ];

  return (
    <AbsoluteFill style={{ background: c.bg, fontFamily: "Pretendard, sans-serif" }}>
      <Overlay label="04 · 메인 화면" />
      <div style={{ padding: "120px 80px 50px", display: "flex", flexDirection: "column", gap: 32 }}>
        <div style={{ opacity: fadeIn(frame, 0, 30), fontSize: 48, fontWeight: 800, color: c.primaryDark, letterSpacing: -1 }}>
          매일 아침 첫 화면 — <span style={{ color: c.pink }}>생일 알림</span>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 28 }}>
          {cards.map((card) => {
            const op = fadeIn(frame, card.delay, 30);
            const sc = scaleIn(frame, fps, card.delay);
            return (
              <div
                key={card.title}
                style={{
                  opacity: op,
                  transform: `scale(${sc})`,
                  background: c.white,
                  border: `2px solid ${card.color}`,
                  borderRadius: 18,
                  padding: 26,
                  display: "flex",
                  flexDirection: "column",
                  gap: 14,
                  boxShadow: `0 16px 40px ${card.color}22`,
                  minHeight: 280,
                }}
              >
                <div style={{ background: card.bg, color: card.color, padding: "12px 16px", borderRadius: 10, fontSize: 18, fontWeight: 800 }}>
                  {card.title}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 6 }}>
                  {card.items.map((it, i) => {
                    const itOp = fadeIn(frame, card.delay + 60 + i * 30, 25);
                    return (
                      <div key={i} style={{ opacity: itOp, fontSize: 19, color: c.text, paddingLeft: 6, borderLeft: `3px solid ${card.color}` }}>
                        {it}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ opacity: fadeIn(frame, 500, 40), marginTop: 18, background: c.white, border: `1px solid ${c.cardBorder}`, borderRadius: 14, padding: "24px 32px", textAlign: "center" }}>
          <div style={{ fontSize: 14, color: c.textMuted, fontWeight: 700, letterSpacing: 1, marginBottom: 10 }}>📖 오늘의 말씀</div>
          <div style={{ fontSize: 24, color: c.primaryDark, fontWeight: 600, fontStyle: "italic", lineHeight: 1.6 }}>
            "주의 말씀은 내 발에 등이요 내 길에 빛이니이다" — 시편 119:105
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// =============================================================
// SCENE 5 — LOOKUP (이용자/수업 조회)
// =============================================================
const Scene5: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const userRows = [
    ["1", "의사소통기술교육", "수어 기초반", "2026/03/12", "출석"],
    ["2", "정보화교육", "스마트폰 활용", "2026/03/14", "출석"],
    ["3", "이동교육", "야외 활동", "2026/03/18", "결석"],
    ["4", "의사소통기술교육", "수어 기초반", "2026/03/19", "출석"],
    ["5", "AI로 소통하는 헬렌켈러", "AI 도구 체험", "2026/03/21", "출석"],
  ];

  return (
    <AbsoluteFill style={{ background: c.bg, fontFamily: "Pretendard, sans-serif" }}>
      <Overlay label="05 · 이용자 · 수업 조회" />
      <div style={{ padding: "120px 80px 50px", display: "flex", flexDirection: "column", gap: 28 }}>
        <div style={{ opacity: fadeIn(frame, 0, 30), fontSize: 48, fontWeight: 800, color: c.primaryDark, letterSpacing: -1 }}>
          🔍 이용자 조회 — 개인 수강 이력 + Excel 다운로드
        </div>

        {/* App mockup */}
        <div style={{ opacity: fadeIn(frame, 30, 30), background: c.white, borderRadius: 14, border: `1px solid ${c.cardBorder}`, overflow: "hidden", boxShadow: "0 20px 50px rgba(15,31,21,0.10)" }}>
          <div style={{ padding: "26px 32px", display: "flex", flexDirection: "column", gap: 20 }}>
            {/* Title row */}
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: c.primary, color: c.white, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>🔍</div>
              <div style={{ fontSize: 26, fontWeight: 800, color: c.text }}>이용자 조회</div>
            </div>

            {/* Dropdown */}
            <div style={{ opacity: fadeIn(frame, 90, 30), display: "flex", flexDirection: "column", gap: 8 }}>
              <div style={{ fontSize: 14, color: c.textMuted, fontWeight: 700 }}>이용자를 선택하세요</div>
              <div style={{ background: c.bg, border: `2px solid ${c.primary}`, borderRadius: 8, padding: "12px 16px", fontSize: 18, color: c.text, display: "flex", justifyContent: "space-between" }}>
                <span>김헬렌 (010-****-****)</span>
                <span style={{ color: c.primary }}>▾</span>
              </div>
            </div>

            {/* Info */}
            <div style={{ opacity: fadeIn(frame, 250, 30), display: "flex", gap: 24, padding: "16px 20px", background: c.bg, borderRadius: 10 }}>
              <div><div style={{ fontSize: 13, color: c.textMuted }}>성별</div><div style={{ fontSize: 18, fontWeight: 700, color: c.text }}>여</div></div>
              <div><div style={{ fontSize: 13, color: c.textMuted }}>생년월일</div><div style={{ fontSize: 18, fontWeight: 700, color: c.text }}>1968/07/12</div></div>
              <div><div style={{ fontSize: 13, color: c.textMuted }}>장애</div><div style={{ fontSize: 18, fontWeight: 700, color: c.primary }}>● 장애</div></div>
              <div><div style={{ fontSize: 13, color: c.textMuted }}>학령기</div><div style={{ fontSize: 18, fontWeight: 700, color: c.gray }}>비학령기</div></div>
            </div>

            {/* Table header with download */}
            <div style={{ opacity: fadeIn(frame, 400, 30), display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 6 }}>
              <div style={{ fontSize: 22, fontWeight: 800, color: c.text }}>📋 수강 이력 조회</div>
              <div style={{ display: "flex", gap: 10 }}>
                <div style={{ background: c.primary, color: c.white, padding: "10px 18px", borderRadius: 8, fontSize: 15, fontWeight: 700 }}>📊 엑셀 다운로드</div>
                <div style={{ background: c.white, color: c.primary, border: `1px solid ${c.primary}`, padding: "10px 18px", borderRadius: 8, fontSize: 15, fontWeight: 700 }}>🔄 새로고침</div>
              </div>
            </div>

            {/* Table */}
            <div style={{ opacity: fadeIn(frame, 500, 30), border: `1px solid ${c.cardBorder}`, borderRadius: 10, overflow: "hidden" }}>
              <div style={{ display: "grid", gridTemplateColumns: "60px 1.8fr 1.4fr 1fr 100px", background: c.primary, color: c.white, padding: "12px 16px", fontSize: 14, fontWeight: 700 }}>
                <div>No.</div>
                <div>사업영역</div>
                <div>수업명</div>
                <div>출석일</div>
                <div>출석</div>
              </div>
              {userRows.map((row, i) => {
                const op = fadeIn(frame, 560 + i * 50, 25);
                return (
                  <div key={i} style={{ opacity: op, display: "grid", gridTemplateColumns: "60px 1.8fr 1.4fr 1fr 100px", padding: "11px 16px", fontSize: 15, color: c.text, background: i % 2 === 0 ? c.white : c.bg, borderTop: `1px solid ${c.cardBorder}` }}>
                    <div style={{ color: c.textMuted }}>{row[0]}</div>
                    <div>{row[1]}</div>
                    <div>{row[2]}</div>
                    <div style={{ fontFamily: "Consolas, monospace" }}>{row[3]}</div>
                    <div>
                      <span style={{ background: row[4] === "출석" ? "#DCFCE7" : c.redSoft, color: row[4] === "출석" ? c.primary : c.red, padding: "4px 12px", borderRadius: 999, fontSize: 13, fontWeight: 700 }}>
                        {row[4]}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div style={{ opacity: fadeIn(frame, 2200, 30), display: "flex", gap: 16, marginTop: 4 }}>
          <div style={{ flex: 1, background: c.white, border: `1px solid ${c.cardBorder}`, borderLeft: `4px solid ${c.amber}`, borderRadius: 10, padding: "18px 22px", fontSize: 18, color: c.text }}>
            💡 <strong>수업 조회</strong>도 동일한 방식 — 수업 선택 → 수강 내역 표 → Excel 다운로드
          </div>
          <div style={{ flex: 1, background: c.white, border: `1px solid ${c.cardBorder}`, borderLeft: `4px solid ${c.blue}`, borderRadius: 10, padding: "18px 22px", fontSize: 18, color: c.text }}>
            ✨ 장애/비장애, 학령기 항목은 <strong>자동 한글화</strong>되어 표시
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// =============================================================
// SCENE 6 — ATTENDANCE (가장 중요한 메뉴)
// =============================================================
const Scene6: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const steps = [
    { num: 1, title: "수업 선택", icon: "📚", desc: "오늘 진행한 수업을 한 개 또는 여러 개", delay: 60 },
    { num: 2, title: "출석 날짜", icon: "📅", desc: "오늘 날짜 자동 입력 (변경 가능)", delay: 240 },
    { num: 3, title: "이용자 체크", icon: "✅", desc: "출석한 분만 체크박스로 선택", delay: 420 },
    { num: 4, title: "외부 인원 입력", icon: "👥", desc: "참관·외부 수강생 인원수 숫자 입력", delay: 600 },
    { num: 5, title: "저장", icon: "💾", desc: "성공 메시지 후 다음 수업 이어서 입력", delay: 780 },
  ];

  return (
    <AbsoluteFill style={{ background: c.bg, fontFamily: "Pretendard, sans-serif" }}>
      <Overlay label="06 · 출석 등록 (가장 자주)" />
      <div style={{ padding: "120px 80px 50px", display: "flex", flexDirection: "column", gap: 28 }}>
        <div style={{ opacity: fadeIn(frame, 0, 30), fontSize: 50, fontWeight: 800, color: c.primaryDark, letterSpacing: -1 }}>
          ✅ 출석 등록 — <span style={{ color: c.primary }}>5단계</span>로 완료
        </div>

        {/* Steps timeline */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {steps.map((s) => {
            const op = fadeIn(frame, s.delay, 30);
            const sc = scaleIn(frame, fps, s.delay);
            return (
              <div
                key={s.num}
                style={{
                  opacity: op,
                  transform: `scale(${sc})`,
                  display: "flex",
                  alignItems: "center",
                  gap: 24,
                  background: c.white,
                  border: `1px solid ${c.cardBorder}`,
                  borderLeft: `6px solid ${c.primary}`,
                  borderRadius: 14,
                  padding: "20px 28px",
                  boxShadow: "0 10px 30px rgba(15,31,21,0.06)",
                }}
              >
                <div style={{ width: 64, height: 64, borderRadius: 16, background: c.primary, color: c.white, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, fontWeight: 900, flexShrink: 0 }}>
                  {s.num}
                </div>
                <div style={{ fontSize: 42 }}>{s.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 26, fontWeight: 800, color: c.primaryDark }}>{s.title}</div>
                  <div style={{ fontSize: 18, color: c.textMuted, marginTop: 4 }}>{s.desc}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Live preview card */}
        <div style={{ opacity: fadeIn(frame, 1100, 30), background: c.white, border: `2px solid ${c.primary}`, borderRadius: 14, padding: 22, display: "flex", gap: 24, alignItems: "center", boxShadow: `0 20px 50px ${c.primary}22` }}>
          <div style={{ fontSize: 48 }}>📝</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 16, color: c.textMuted, fontWeight: 700, marginBottom: 6 }}>저장 직후 화면 예시</div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {["수어 기초반 ✓", "스마트폰 활용 ✓"].map((t, i) => (
                <div key={i} style={{ background: "#DCFCE7", color: c.primary, padding: "8px 14px", borderRadius: 999, fontSize: 15, fontWeight: 700 }}>{t}</div>
              ))}
              <div style={{ background: c.amberSoft, color: c.amber, padding: "8px 14px", borderRadius: 999, fontSize: 15, fontWeight: 700 }}>외부 인원 3명</div>
            </div>
          </div>
          <div style={{ background: c.primary, color: c.white, borderRadius: 10, padding: "14px 26px", fontSize: 17, fontWeight: 800 }}>저장 완료 ✓</div>
        </div>

        <div style={{ opacity: fadeIn(frame, 1500, 30), background: c.amberSoft, color: c.amber, borderRadius: 10, padding: "16px 22px", fontSize: 17, fontWeight: 600 }}>
          ⏱ 데이터는 5분마다 자동 캐시 — 새 데이터가 안 보이면 새로고침 한 번
        </div>
      </div>
    </AbsoluteFill>
  );
};

// =============================================================
// SCENE 7 — STATS (운영 현황)
// =============================================================
const Scene7: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const bars = [
    { label: "의사소통기술교육", v: 142, color: c.primary },
    { label: "정보화교육", v: 98, color: c.blue },
    { label: "이동교육", v: 76, color: c.amber },
    { label: "발굴 및 개별화지원", v: 54, color: c.pink },
    { label: "권익옹호 및 인식개선", v: 41, color: c.primaryLight },
    { label: "시청각장애 전문인력 역량강화", v: 33, color: c.gray },
    { label: "일상생활 및 사회활동지원", v: 28, color: c.amber },
    { label: "AI로 소통하는 헬렌켈러", v: 22, color: c.blue },
  ];
  const maxV = Math.max(...bars.map((b) => b.v));

  const pieData = [
    { label: "장애", v: 62, color: c.primary },
    { label: "비장애", v: 31, color: c.amber },
    { label: "기타", v: 7, color: c.gray },
  ];

  return (
    <AbsoluteFill style={{ background: c.bg, fontFamily: "Pretendard, sans-serif" }}>
      <Overlay label="07 · 운영 현황 · 통계" />
      <div style={{ padding: "120px 80px 50px", display: "flex", flexDirection: "column", gap: 24 }}>
        <div style={{ opacity: fadeIn(frame, 0, 30), fontSize: 48, fontWeight: 800, color: c.primaryDark, letterSpacing: -1 }}>
          📊 운영 현황 — 월·반기·기간 필터 + 자동 그래프
        </div>

        {/* Filters */}
        <div style={{ opacity: fadeIn(frame, 30, 30), display: "grid", gridTemplateColumns: "1fr 1fr 2fr", gap: 16 }}>
          {[
            { label: "월별 조회", val: "전체", color: c.primary },
            { label: "반기별 조회", val: "상반기 (1~6월)", color: c.amber },
            { label: "기간 상세 (YYMMDD~YYMMDD)", val: "260101~260331", color: c.blue },
          ].map((f, i) => (
            <div key={i} style={{ background: c.white, border: `2px solid ${f.color}`, borderRadius: 10, padding: "12px 16px" }}>
              <div style={{ fontSize: 13, color: c.textMuted, fontWeight: 700 }}>{f.label}</div>
              <div style={{ fontSize: 18, color: c.text, fontWeight: 700, marginTop: 4, fontFamily: f.label.includes("기간") ? "Consolas, monospace" : "inherit" }}>{f.val}</div>
            </div>
          ))}
        </div>

        {/* Charts row */}
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 24 }}>
          {/* Bar chart */}
          <div style={{ opacity: fadeIn(frame, 200, 30), background: c.white, border: `1px solid ${c.cardBorder}`, borderRadius: 14, padding: 22 }}>
            <div style={{ fontSize: 18, fontWeight: 800, color: c.primaryDark, marginBottom: 16 }}>1. 사업영역별 출석 횟수</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {bars.map((b, i) => {
                const grow = fadeIn(frame, 280 + i * 40, 40);
                const wpct = (b.v / maxV) * 100 * grow;
                return (
                  <div key={b.label} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 200, fontSize: 13, color: c.text, fontWeight: 600, textAlign: "right" }}>{b.label}</div>
                    <div style={{ flex: 1, background: c.bg, height: 22, borderRadius: 6, overflow: "hidden" }}>
                      <div style={{ width: `${wpct}%`, height: "100%", background: b.color, borderRadius: 6, transition: "width 0.3s" }} />
                    </div>
                    <div style={{ width: 48, fontSize: 14, color: c.text, fontWeight: 700, textAlign: "right" }}>{b.v}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Pie / donut */}
          <div style={{ opacity: fadeIn(frame, 600, 30), background: c.white, border: `1px solid ${c.cardBorder}`, borderRadius: 14, padding: 22, display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 18, fontWeight: 800, color: c.primaryDark, marginBottom: 16 }}>2. 장애 유형별 비율</div>
            <div style={{ display: "flex", justifyContent: "center", marginTop: 6 }}>
              <Donut data={pieData} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 16 }}>
              {pieData.map((p) => (
                <div key={p.label} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, color: c.text }}>
                  <div style={{ width: 14, height: 14, borderRadius: 4, background: p.color }} />
                  <span style={{ flex: 1, fontWeight: 600 }}>{p.label}</span>
                  <span style={{ fontWeight: 800 }}>{p.v}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Monthly line chart */}
        <div style={{ opacity: fadeIn(frame, 1400, 30), background: c.white, border: `1px solid ${c.cardBorder}`, borderRadius: 14, padding: 22 }}>
          <div style={{ fontSize: 18, fontWeight: 800, color: c.primaryDark, marginBottom: 12 }}>3. 월별 출석 추이</div>
          <LineChart frame={frame} startDelay={1500} />
        </div>
      </div>
    </AbsoluteFill>
  );
};

const Donut: React.FC<{ data: { label: string; v: number; color: string }[] }> = ({ data }) => {
  const total = data.reduce((s, d) => s + d.v, 0);
  let acc = 0;
  const r = 78;
  const cx = 100;
  const cy = 100;
  const slices = data.map((d) => {
    const start = (acc / total) * Math.PI * 2 - Math.PI / 2;
    acc += d.v;
    const end = (acc / total) * Math.PI * 2 - Math.PI / 2;
    const large = end - start > Math.PI ? 1 : 0;
    const x1 = cx + r * Math.cos(start);
    const y1 = cy + r * Math.sin(start);
    const x2 = cx + r * Math.cos(end);
    const y2 = cy + r * Math.sin(end);
    return { path: `M${cx},${cy} L${x1},${y1} A${r},${r} 0 ${large} 1 ${x2},${y2} Z`, color: d.color };
  });
  return (
    <svg width={200} height={200} viewBox="0 0 200 200">
      {slices.map((s, i) => (
        <path key={i} d={s.path} fill={s.color} />
      ))}
      <circle cx={cx} cy={cy} r={42} fill={c.white} />
    </svg>
  );
};

const LineChart: React.FC<{ frame: number; startDelay: number }> = ({ frame, startDelay }) => {
  const months = ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"];
  const vals = [120, 145, 168, 192, 210, 198, 175, 188, 220, 245, 268, 290];
  const maxV = 300;
  const w = 900;
  const h = 200;
  const padL = 40;
  const padB = 30;
  const xStep = (w - padL - 20) / (months.length - 1);
  const pts = vals.map((v, i) => {
    const grow = fadeIn(frame, startDelay + i * 30, 25);
    const x = padL + i * xStep;
    const y = h - padB - ((v / maxV) * (h - padB - 20) * grow);
    return { x, y, v, grow };
  });
  const path = pts.map((p, i) => (i === 0 ? `M${p.x},${p.y}` : `L${p.x},${p.y}`)).join(" ");
  return (
    <svg width={w} height={h + 20}>
      {[0, 100, 200, 300].map((tick) => {
        const y = h - padB - (tick / maxV) * (h - padB - 20);
        return (
          <g key={tick}>
            <line x1={padL} y1={y} x2={w - 20} y2={y} stroke={c.cardBorder} strokeWidth={1} />
            <text x={padL - 8} y={y + 4} fontSize={11} fill={c.textMuted} textAnchor="end">{tick}</text>
          </g>
        );
      })}
      <path d={path} stroke={c.primary} strokeWidth={3} fill="none" />
      <path d={`${path} L${pts[pts.length - 1].x},${h - padB} L${pts[0].x},${h - padB} Z`} fill={c.primary} opacity={0.15} />
      {pts.map((p, i) => (
        <g key={i}>
          <circle cx={p.x} cy={p.y} r={4} fill={c.primary} />
          <text x={p.x} y={h + 12} fontSize={11} fill={c.textMuted} textAnchor="middle">{months[i]}</text>
        </g>
      ))}
    </svg>
  );
};

// =============================================================
// SCENE 8 — MANAGE (CRUD)
// =============================================================
const Scene8: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const users = [
    { name: "김헬렌", gender: "여", birth: "1968/07/12", disabled: true },
    { name: "이켈러", gender: "남", birth: "1972/03/05", disabled: true },
    { name: "박설리번", gender: "여", birth: "1985/11/22", disabled: false },
  ];

  return (
    <AbsoluteFill style={{ background: c.bg, fontFamily: "Pretendard, sans-serif" }}>
      <Overlay label="08 · 이용자 · 수업 관리" />
      <div style={{ padding: "120px 80px 50px", display: "flex", flexDirection: "column", gap: 28 }}>
        <div style={{ opacity: fadeIn(frame, 0, 30), fontSize: 48, fontWeight: 800, color: c.primaryDark, letterSpacing: -1 }}>
          🛠️ 마스터 데이터 관리 — 추가 · 수정 · 삭제
        </div>

        {/* Add form mockup */}
        <div style={{ opacity: fadeIn(frame, 30, 30), background: c.white, border: `1px solid ${c.cardBorder}`, borderTop: `4px solid ${c.primary}`, borderRadius: 12, padding: 24 }}>
          <div style={{ fontSize: 20, fontWeight: 800, color: c.primaryDark, marginBottom: 14 }}>➕ 새 이용자 추가</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 14 }}>
            {[
              { label: "이름", val: "김새이용" },
              { label: "생년월일", val: "1975/05/14" },
              { label: "성별", val: "여" },
              { label: "장애 여부", val: "● 장애", color: c.primary },
            ].map((f, i) => {
              const op = fadeIn(frame, 100 + i * 40, 25);
              return (
                <div key={i} style={{ opacity: op }}>
                  <div style={{ fontSize: 13, color: c.textMuted, fontWeight: 700, marginBottom: 4 }}>{f.label}</div>
                  <div style={{ background: c.bg, border: `1px solid ${c.cardBorder}`, borderRadius: 8, padding: "10px 14px", fontSize: 16, color: f.color ?? c.text, fontWeight: 600 }}>
                    {f.val}
                  </div>
                </div>
              );
            })}
          </div>
          <div style={{ opacity: fadeIn(frame, 320, 30), background: c.primary, color: c.white, padding: "12px 22px", borderRadius: 8, fontSize: 15, fontWeight: 700, textAlign: "center", width: 140, marginTop: 14 }}>💾 저장</div>
        </div>

        {/* Existing table */}
        <div style={{ opacity: fadeIn(frame, 450, 30), background: c.white, border: `1px solid ${c.cardBorder}`, borderRadius: 12, overflow: "hidden" }}>
          <div style={{ padding: "16px 22px", background: c.bg, fontSize: 18, fontWeight: 800, color: c.primaryDark, borderBottom: `1px solid ${c.cardBorder}` }}>
            📋 등록된 이용자 (수정 / 삭제)
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.6fr 1fr 1fr 120px 120px", padding: "12px 22px", background: c.graySoft, fontSize: 13, fontWeight: 700, color: c.textMuted }}>
            <div>이름</div><div>성별</div><div>생년월일</div><div>장애</div><div>수정</div><div>삭제</div>
          </div>
          {users.map((u, i) => {
            const op = fadeIn(frame, 550 + i * 80, 25);
            return (
              <div key={u.name} style={{ opacity: op, display: "grid", gridTemplateColumns: "1.2fr 0.6fr 1fr 1fr 120px 120px", padding: "14px 22px", fontSize: 15, color: c.text, alignItems: "center", borderTop: `1px solid ${c.cardBorder}`, background: i % 2 === 0 ? c.white : c.bg }}>
                <div style={{ fontWeight: 700 }}>{u.name}</div>
                <div>{u.gender}</div>
                <div style={{ fontFamily: "Consolas, monospace" }}>{u.birth}</div>
                <div>{u.disabled ? <span style={{ color: c.primary, fontWeight: 700 }}>● 장애</span> : <span style={{ color: c.gray }}>비장애</span>}</div>
                <div><div style={{ background: c.gray, color: c.white, padding: "8px 14px", borderRadius: 8, fontSize: 13, fontWeight: 700, textAlign: "center", display: "inline-block" }}>✎ 수정</div></div>
                <div><div style={{ background: c.red, color: c.white, padding: "8px 14px", borderRadius: 8, fontSize: 13, fontWeight: 700, textAlign: "center", display: "inline-block" }}>🗑 삭제</div></div>
              </div>
            );
          })}
        </div>

        {/* Warning */}
        <div style={{ opacity: fadeIn(frame, 1300, 30), background: c.redSoft, border: `2px solid ${c.red}`, borderRadius: 12, padding: "18px 24px", display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ fontSize: 32 }}>⚠️</div>
          <div>
            <div style={{ fontSize: 18, fontWeight: 800, color: c.red }}>삭제는 되돌릴 수 없습니다</div>
            <div style={{ fontSize: 15, color: c.text, marginTop: 4 }}>한 번 삭제된 이용자·수업 정보는 복구가 어렵습니다. 정말 필요한 경우에만 신중히 사용해 주세요.</div>
          </div>
        </div>

        <div style={{ opacity: fadeIn(frame, 1700, 30), fontSize: 17, color: c.textMuted, textAlign: "center", marginTop: 6 }}>
          수업 관리도 같은 방식 — 수업명·사업영역·교육 카테고리·강사·수강생 입력 → 표에서 ✎ 수정 / 🗑 삭제
        </div>
      </div>
    </AbsoluteFill>
  );
};

// =============================================================
// SCENE 9 — OUTRO
// =============================================================
const Scene9: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const flow = [
    { who: "👩‍🏫 강사", what: "출석 등록 한 메뉴", color: c.amber },
    { who: "👨‍💼 관리자 — 매일", what: "메인 (생일 알림)", color: c.pink },
    { who: "👨‍💼 관리자 — 수시", what: "이용자/수업 조회 → Excel", color: c.blue },
    { who: "👨‍💼 관리자 — 매월", what: "운영 현황 → 통계 보고", color: c.primary },
    { who: "👨‍💼 관리자 — 필요시", what: "이용자/수업 관리 (CRUD)", color: c.gray },
  ];

  return (
    <AbsoluteFill style={{ background: `linear-gradient(135deg, ${c.bg} 0%, #E8F5E9 100%)`, fontFamily: "Pretendard, sans-serif" }}>
      <Overlay label="09 · 마무리" />
      <div style={{ padding: "120px 80px 50px", display: "flex", flexDirection: "column", gap: 30, alignItems: "center" }}>
        <div style={{ transform: `scale(${scaleIn(frame, fps, 10)})`, fontSize: 56, fontWeight: 900, color: c.primaryDark, letterSpacing: -2, textAlign: "center" }}>
          핵심 워크플로우 정리
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 10, maxWidth: 1000, width: "100%" }}>
          {flow.map((f, i) => {
            const op = fadeIn(frame, 60 + i * 60, 30);
            const sc = scaleIn(frame, fps, 60 + i * 60);
            return (
              <div
                key={i}
                style={{
                  opacity: op,
                  transform: `scale(${sc})`,
                  background: c.white,
                  border: `1px solid ${c.cardBorder}`,
                  borderLeft: `6px solid ${f.color}`,
                  borderRadius: 14,
                  padding: "18px 28px",
                  display: "flex",
                  alignItems: "center",
                  gap: 22,
                  boxShadow: `0 10px 30px ${f.color}22`,
                }}
              >
                <div style={{ fontSize: 22, fontWeight: 800, color: f.color, minWidth: 250 }}>{f.who}</div>
                <div style={{ fontSize: 22, color: c.text, fontWeight: 600 }}>→ {f.what}</div>
              </div>
            );
          })}
        </div>

        <div
          style={{
            opacity: fadeIn(frame, 600, 30),
            marginTop: 20,
            background: c.white,
            border: `2px solid ${c.primary}`,
            borderRadius: 16,
            padding: "26px 36px",
            maxWidth: 900,
            fontSize: 22,
            color: c.primaryDark,
            lineHeight: 1.6,
            textAlign: "center",
            fontWeight: 600,
          }}
        >
          출석 등록을 <span style={{ color: c.primary, fontWeight: 900 }}>매일 또는 매주 꾸준히</span> 입력해 주시는 것이 가장 중요합니다.<br />
          운영 현황 통계가 자동으로 정확해집니다.
        </div>

        <div style={{ opacity: fadeIn(frame, 900, 30), display: "flex", gap: 14, marginTop: 10 }}>
          <div style={{ background: c.amberSoft, color: c.amber, padding: "10px 18px", borderRadius: 999, fontSize: 16, fontWeight: 700 }}>🔄 화면이 이상 → 새로고침</div>
          <div style={{ background: c.blueSoft, color: c.blue, padding: "10px 18px", borderRadius: 999, fontSize: 16, fontWeight: 700 }}>📞 해결 안되면 → 센터 담당자</div>
        </div>

        <div
          style={{
            opacity: fadeIn(frame, 1200, 40),
            marginTop: 30,
            fontSize: 32,
            fontWeight: 800,
            color: c.primary,
            textAlign: "center",
          }}
        >
          시청해 주셔서 감사합니다 🙏
        </div>
        <div style={{ opacity: fadeIn(frame, 1300, 40), fontSize: 18, color: c.textMuted, fontStyle: "italic" }}>
          따뜻한 마음으로 이용자분들을 섬기는 행복한 하루 되세요
        </div>
      </div>
    </AbsoluteFill>
  );
};

// =============================================================
// ROOT COMPOSITION
// =============================================================
export const MiralEduVideo: React.FC = () => {
  const T = SCENE_TIMINGS;
  const audioSeq = (name: keyof typeof SCENE_TIMINGS, file: string) => (
    <Sequence from={T[name].start} durationInFrames={T[name].duration}>
      <Audio src={staticFile(`audio/miral-edu/${file}.mp3`)} />
    </Sequence>
  );
  const visualSeq = (name: keyof typeof SCENE_TIMINGS, Comp: React.FC) => (
    <Sequence from={T[name].start} durationInFrames={T[name].duration}>
      <Comp />
    </Sequence>
  );
  return (
    <AbsoluteFill style={{ background: c.bg }}>
      {audioSeq("scene1_intro", "scene1_intro")}
      {audioSeq("scene2_login", "scene2_login")}
      {audioSeq("scene3_sidebar", "scene3_sidebar")}
      {audioSeq("scene4_main", "scene4_main")}
      {audioSeq("scene5_lookup", "scene5_lookup")}
      {audioSeq("scene6_attendance", "scene6_attendance")}
      {audioSeq("scene7_stats", "scene7_stats")}
      {audioSeq("scene8_manage", "scene8_manage")}
      {audioSeq("scene9_outro", "scene9_outro")}

      {visualSeq("scene1_intro", Scene1)}
      {visualSeq("scene2_login", Scene2)}
      {visualSeq("scene3_sidebar", Scene3)}
      {visualSeq("scene4_main", Scene4)}
      {visualSeq("scene5_lookup", Scene5)}
      {visualSeq("scene6_attendance", Scene6)}
      {visualSeq("scene7_stats", Scene7)}
      {visualSeq("scene8_manage", Scene8)}
      {visualSeq("scene9_outro", Scene9)}
    </AbsoluteFill>
  );
};
