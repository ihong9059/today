import React from "react";
import { AbsoluteFill } from "remotion";

// ============ COLORS (matching pitch video) ============
const C = {
  navy: "#0B2545",
  navyDark: "#050B1A",
  navyMid: "#13315C",
  gold: "#C9A14A",
  goldLight: "#E8C875",
  cream: "#F5F2EC",
  white: "#FFFFFF",
  textMuted: "rgba(245, 242, 236, 0.65)",
  red: "#C8463F",
  green: "#5B8A52",
  blue: "#4A90E2",
};

// ============ COMMON LAYOUT WRAPPER ============
const SlideFrame: React.FC<{
  pageNo: number;
  totalPages?: number;
  children: React.ReactNode;
}> = ({ pageNo, totalPages = 18, children }) => (
  <AbsoluteFill
    style={{
      background: `radial-gradient(ellipse at center, ${C.navyMid} 0%, ${C.navy} 60%, ${C.navyDark} 100%)`,
    }}
  >
    {/* 상단 골드 라인 */}
    <div style={{ position: "absolute", top: 60, left: 80, width: 60, height: 2, background: C.gold }} />
    {/* 헤더 라벨 */}
    <div
      style={{
        position: "absolute",
        top: 50,
        left: 160,
        fontSize: 16,
        color: C.gold,
        letterSpacing: 4,
        fontWeight: 600,
      }}
    >
      WISHKET #155381 PROPOSAL
    </div>
    {/* 페이지 번호 */}
    <div
      style={{
        position: "absolute",
        top: 50,
        right: 80,
        fontSize: 16,
        color: C.gold,
        letterSpacing: 2,
      }}
    >
      {String(pageNo).padStart(2, "0")} / {totalPages}
    </div>
    {/* 하단 라인 */}
    <div style={{ position: "absolute", bottom: 60, right: 80, width: 60, height: 2, background: C.gold }} />
    {/* 푸터 */}
    <div
      style={{
        position: "absolute",
        bottom: 50,
        right: 160,
        fontSize: 14,
        color: C.textMuted,
        letterSpacing: 3,
      }}
    >
      LS XGT PLC 연동 부스바 가공 PC 응용
    </div>
    {children}
  </AbsoluteFill>
);

const SlideTitle: React.FC<{ text: string; sub?: string }> = ({ text, sub }) => (
  <div
    style={{
      position: "absolute",
      top: 120,
      left: 100,
      right: 100,
    }}
  >
    <div
      style={{
        fontSize: 44,
        color: C.gold,
        fontWeight: 700,
        letterSpacing: 2,
      }}
    >
      {text}
    </div>
    {sub && (
      <div
        style={{
          fontSize: 20,
          color: C.textMuted,
          marginTop: 8,
          letterSpacing: 1,
        }}
      >
        {sub}
      </div>
    )}
    <div style={{ width: 80, height: 3, background: C.gold, marginTop: 20 }} />
  </div>
);

// ============================================================
// SLIDE 1 — TITLE
// ============================================================
export const Slide01: React.FC = () => (
  <SlideFrame pageNo={1}>
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      <div style={{ width: 100, height: 2, background: C.gold, marginBottom: 50 }} />
      <div
        style={{
          fontSize: 32,
          color: C.goldLight,
          letterSpacing: 6,
          marginBottom: 30,
          fontWeight: 500,
        }}
      >
        부스바 정밀 가공의 책임을 함께 지는 제안
      </div>
      <div
        style={{
          fontSize: 72,
          color: C.white,
          fontWeight: 700,
          letterSpacing: 3,
          textAlign: "center",
          lineHeight: 1.2,
        }}
      >
        LS XGT PLC 연동
        <br />
        <span style={{ color: C.gold }}>부스바 가공 PC 응용</span>
      </div>
      <div style={{ width: 100, height: 2, background: C.gold, marginTop: 50 }} />
      <div
        style={{
          marginTop: 60,
          fontSize: 24,
          color: C.cream,
          letterSpacing: 3,
          textAlign: "center",
          lineHeight: 1.6,
        }}
      >
        위시캣 #155381 · 인천 연수구
        <br />
        VC++/MFC · LS XGT FEnet · Recipe · 좌표 시각화
      </div>
      <div
        style={{
          marginTop: 40,
          fontSize: 20,
          color: C.gold,
          letterSpacing: 4,
        }}
      >
        2026년 5월 17일
      </div>
    </AbsoluteFill>
  </SlideFrame>
);

// ============================================================
// SLIDE 2 — COMPANY IDENTITY
// ============================================================
export const Slide02: React.FC = () => (
  <SlideFrame pageNo={2}>
    <SlideTitle text="저희 팀, 한 장으로" sub="부스바 가공에 필요한 자산이 이미 양산 운영 중" />
    <AbsoluteFill style={{ paddingTop: 280, paddingLeft: 100, paddingRight: 100 }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
        {[
          { icon: "🏭", title: "양산 5종 + 일본 3,800대", sub: "산업 자동화 라인 운영 중" },
          { icon: "🛡", title: "KC + TELEC + CE", sub: "한국 + 일본 + 유럽 3개국 안전 인증" },
          { icon: "👥", title: "2인 팀 수직 통합", sub: "HW 38년 + FW/SW 40년 = 78년 임베디드" },
          { icon: "⚙", title: "Raspberry Pi 3 V-Cut", sub: "X/Y 좌표 가공 양산 (부스바와 동일 패턴)" },
        ].map((item, i) => (
          <div
            key={i}
            style={{
              padding: 30,
              background: `linear-gradient(135deg, ${C.navyMid} 0%, ${C.navy} 100%)`,
              border: `1px solid ${C.gold}40`,
              borderRadius: 16,
              display: "flex",
              gap: 20,
              alignItems: "center",
            }}
          >
            <div style={{ fontSize: 56 }}>{item.icon}</div>
            <div>
              <div style={{ fontSize: 22, color: C.cream, fontWeight: 700, marginBottom: 6 }}>
                {item.title}
              </div>
              <div style={{ fontSize: 16, color: C.textMuted }}>{item.sub}</div>
            </div>
          </div>
        ))}
      </div>
      <div
        style={{
          marginTop: 30,
          padding: 24,
          background: `${C.gold}15`,
          border: `1px solid ${C.gold}60`,
          borderRadius: 12,
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: 24, color: C.goldLight, fontWeight: 700, letterSpacing: 2 }}>
          삼성전자 · 파나소닉 대기업 경력 + 24/7 산업 모니터링 1년+ 운영
        </div>
      </div>
    </AbsoluteFill>
  </SlideFrame>
);

// ============================================================
// SLIDE 3 — PROBLEM (4 한계)
// ============================================================
export const Slide03: React.FC = () => (
  <SlideFrame pageNo={3}>
    <SlideTitle text="현재 부스바 가공기 — 4가지 한계" />
    <AbsoluteFill style={{ paddingTop: 280, paddingLeft: 100, paddingRight: 100 }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
        {[
          { n: "①", title: "수동 좌표 입력", desc: "오기·실수 → 재가공 손실" },
          { n: "②", title: "시각 검증 부재", desc: "가공 후에야 발견" },
          { n: "③", title: "PC ↔ PLC 통신 부재", desc: "모든 부담이 작업자에게" },
          { n: "④", title: "산업 안전 인증 부재", desc: "사고 위험 누적" },
        ].map((item, i) => (
          <div
            key={i}
            style={{
              padding: 30,
              background: `${C.red}15`,
              border: `2px solid ${C.red}`,
              borderRadius: 16,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 12 }}>
              <span style={{ fontSize: 44, color: C.red, fontWeight: 700 }}>{item.n}</span>
              <span style={{ fontSize: 26, color: C.cream, fontWeight: 700 }}>{item.title}</span>
            </div>
            <div style={{ fontSize: 18, color: C.textMuted, paddingLeft: 60 }}>
              {item.desc}
            </div>
          </div>
        ))}
      </div>
    </AbsoluteFill>
  </SlideFrame>
);

// ============================================================
// SLIDE 4 — BUSBAR SAFETY
// ============================================================
export const Slide04: React.FC = () => (
  <SlideFrame pageNo={4}>
    <SlideTitle text="부스바 = 전기 안전 직결" sub="정밀 가공이 산업 안전의 핵심" />
    <AbsoluteFill style={{ paddingTop: 280, paddingLeft: 100, paddingRight: 100 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 20,
          padding: "30px 0",
        }}
      >
        {[
          { label: "천공 정밀도 부족", color: C.red, fontSize: 22 },
          { label: "→", color: C.gold, fontSize: 32 },
          { label: "접촉 저항 증가", color: C.cream, fontSize: 22 },
          { label: "→", color: C.gold, fontSize: 32 },
          { label: "발열", color: C.cream, fontSize: 22 },
          { label: "→", color: C.gold, fontSize: 32 },
          { label: "화재", color: C.red, fontSize: 28 },
        ].map((s, i) => (
          <div
            key={i}
            style={{
              fontSize: s.fontSize,
              color: s.color,
              fontWeight: 700,
            }}
          >
            {s.label}
          </div>
        ))}
      </div>
      <div
        style={{
          marginTop: 40,
          padding: 32,
          background: "rgba(13, 28, 50, 0.85)",
          border: `1px solid ${C.gold}40`,
          borderRadius: 16,
        }}
      >
        <div style={{ fontSize: 22, color: C.goldLight, marginBottom: 16, fontWeight: 700 }}>
          부스바 사용처 (모든 전력 설비 공통 요소)
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr 1fr",
            gap: 10,
            fontSize: 17,
            color: C.cream,
            lineHeight: 1.8,
          }}
        >
          <div>· 배전반 (LV/MV/HV)</div>
          <div>· 차단기 단자</div>
          <div>· MCC 모터제어반</div>
          <div>· 변압기 출력</div>
          <div>· UPS · ESS</div>
          <div>· 태양광 인버터</div>
          <div>· 전기차 충전기</div>
          <div>· 데이터센터 전원</div>
        </div>
      </div>
      <div
        style={{
          marginTop: 30,
          textAlign: "center",
          fontSize: 22,
          color: C.gold,
          letterSpacing: 3,
        }}
      >
        시뮬레이션·검증·작업자 확인 = 단순 편의 아닌 안전 핵심 기능
      </div>
    </AbsoluteFill>
  </SlideFrame>
);

// ============================================================
// SLIDE 5 — 2-LAYER SOLUTION
// ============================================================
export const Slide05: React.FC = () => (
  <SlideFrame pageNo={5}>
    <SlideTitle text="해결 — 2-Layer 협업 구조" />
    <AbsoluteFill style={{ paddingTop: 280, paddingLeft: 120, paddingRight: 120 }}>
      <div
        style={{
          padding: 30,
          background: `linear-gradient(145deg, ${C.blue} 0%, ${C.navyMid} 100%)`,
          borderRadius: 20,
          border: `2px solid ${C.gold}60`,
          marginBottom: 20,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <div style={{ fontSize: 80 }}>🖥</div>
          <div>
            <div style={{ fontSize: 32, color: C.white, fontWeight: 700, letterSpacing: 1 }}>
              PC 응용 (Windows + C++)
            </div>
            <div style={{ fontSize: 18, color: C.goldLight, marginTop: 6, letterSpacing: 2 }}>
              Layer 3 · 작업자 친화 UI · 본 프로젝트 영역
            </div>
            <div style={{ fontSize: 16, color: C.cream, marginTop: 10 }}>
              좌표 입력 · 부스바 시각화 · Recipe (시퀀스 + 반복) · 작업 로그
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          textAlign: "center",
          fontSize: 28,
          color: C.gold,
          margin: "8px 0",
          letterSpacing: 1,
        }}
      >
        ↕ &nbsp; LS XGT FEnet 이더넷 · TCP 2004
      </div>
      <div
        style={{
          padding: 30,
          background: `linear-gradient(145deg, #6B3A1F 0%, #C26B3F 100%)`,
          borderRadius: 20,
          border: `2px solid ${C.gold}60`,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <div style={{ fontSize: 80 }}>⚙</div>
          <div>
            <div style={{ fontSize: 32, color: C.white, fontWeight: 700, letterSpacing: 1 }}>
              LS XGT PLC (이미 세팅 완료)
            </div>
            <div style={{ fontSize: 18, color: C.goldLight, marginTop: 6, letterSpacing: 2 }}>
              Layer 2 · 실시간 제어 (1~10ms 결정론)
            </div>
            <div style={{ fontSize: 16, color: C.cream, marginTop: 10 }}>
              펀치 모터 · 센서 · E-Stop · 안전 인터록 · 시퀀스 실행
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  </SlideFrame>
);

// ============================================================
// SLIDE 6 — 4-LAYER MODEL
// ============================================================
export const Slide06: React.FC = () => (
  <SlideFrame pageNo={6}>
    <SlideTitle text="산업 자동화 4-Layer 모델" sub="본 프로젝트 = Layer 3 ↔ Layer 2 통신" />
    <AbsoluteFill style={{ paddingTop: 280, paddingLeft: 120, paddingRight: 120 }}>
      {[
        { l: "Layer 4", n: "ERP / MES", d: "SAP · Oracle · 자체 MES — 생산 계획·재고·매출", c: "#8b5cf6", focus: false },
        { l: "Layer 3", n: "SCADA / HMI ⭐ 본 프로젝트", d: "Windows PC 응용 — 좌표·시각화·Recipe·로그", c: C.gold, focus: true },
        { l: "Layer 2", n: "PLC ⭐ 본 프로젝트", d: "LS XGT — 모터·센서·안전·시퀀스 (1~10ms)", c: C.gold, focus: true },
        { l: "Layer 1", n: "Field Device", d: "펀치 · 모터 · 근접 센서 · E-Stop", c: C.green, focus: false },
      ].map((layer, i) => (
        <React.Fragment key={i}>
          <div
            style={{
              padding: 20,
              background: layer.focus ? `${layer.c}25` : "rgba(13, 28, 50, 0.7)",
              border: `2px solid ${layer.focus ? layer.c : layer.c}40`,
              borderLeft: `6px solid ${layer.c}`,
              borderRadius: 10,
              display: "flex",
              alignItems: "center",
              gap: 20,
            }}
          >
            <div
              style={{
                fontSize: 14,
                color: layer.c,
                fontWeight: 700,
                letterSpacing: 2,
                minWidth: 90,
              }}
            >
              {layer.l}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 22, color: C.white, fontWeight: 700, marginBottom: 4 }}>
                {layer.n}
              </div>
              <div style={{ fontSize: 16, color: C.textMuted }}>{layer.d}</div>
            </div>
          </div>
          {i < 3 && (
            <div style={{ textAlign: "center", color: C.gold, fontSize: 18, padding: "4px 0" }}>
              ↕
            </div>
          )}
        </React.Fragment>
      ))}
    </AbsoluteFill>
  </SlideFrame>
);

// ============================================================
// SLIDE 7 — V-CUT MAPPING ⭐
// ============================================================
export const Slide07: React.FC = () => (
  <SlideFrame pageNo={7}>
    <SlideTitle text="★ V-Cut 양산 자산 ↔ 부스바 가공" sub="X/Y 좌표 패턴 100% 동일 · 양산 코드 60% reuse" />
    <AbsoluteFill style={{ paddingTop: 280, paddingLeft: 100, paddingRight: 100 }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
        {[
          { side: "left", icon: "🔷", title: "Raspberry Pi 3 V-Cut", subtitle: "양산 운영 중" },
          { side: "right", icon: "⚡", title: "부스바 천공 가공", subtitle: "Week 2 안에 1차 완성" },
        ].map((card, i) => (
          <div
            key={i}
            style={{
              padding: 30,
              background: "rgba(13, 28, 50, 0.85)",
              border: `2px solid ${C.gold}40`,
              borderRadius: 16,
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: 80, marginBottom: 14 }}>{card.icon}</div>
            <div style={{ fontSize: 26, color: C.white, fontWeight: 700 }}>{card.title}</div>
            <div style={{ fontSize: 16, color: i === 0 ? C.green : C.gold, marginTop: 8, fontWeight: 600 }}>
              {card.subtitle}
            </div>
          </div>
        ))}
      </div>
      <div
        style={{
          marginTop: 30,
          background: "rgba(13, 28, 50, 0.85)",
          border: `1px solid ${C.gold}40`,
          borderRadius: 12,
          padding: 20,
        }}
      >
        {[
          ["대상 재료", "PCB (FR4 + 동박)", "구리 / 알루미늄 부스바"],
          ["입력", "X/Y 절단 라인 시퀀스", "X/Y 천공 위치 시퀀스"],
          ["모터 제어", "2축 X/Y", "2축 X/Y (동일)"],
          ["안전 검증", "시뮬레이션 + 작업자 확인", "동일 패턴"],
          ["공차", "0.05~0.1mm", "0.1~0.3mm (표준)"],
        ].map((row, i) => (
          <div
            key={i}
            style={{
              display: "grid",
              gridTemplateColumns: "1.2fr 1.5fr 1.5fr",
              padding: "8px 14px",
              fontSize: 17,
              borderTop: i === 0 ? "none" : `1px solid ${C.gold}15`,
            }}
          >
            <div style={{ color: C.goldLight, fontWeight: 600 }}>{row[0]}</div>
            <div style={{ color: C.textMuted }}>{row[1]}</div>
            <div style={{ color: C.cream }}>{row[2]}</div>
          </div>
        ))}
      </div>
      <div
        style={{
          marginTop: 20,
          textAlign: "center",
          fontSize: 26,
          color: C.goldLight,
          fontWeight: 700,
          letterSpacing: 2,
        }}
      >
        절단 → 천공 변환만 신규 (코드 60% reuse, 30% 신규)
      </div>
    </AbsoluteFill>
  </SlideFrame>
);

// ============================================================
// SLIDE 8 — LS XGT FEnet
// ============================================================
export const Slide08: React.FC = () => (
  <SlideFrame pageNo={8}>
    <SlideTitle text="LS XGT FEnet 프로토콜 — 직접 구현 가이드 완성" sub="공고 우대 — LS산전 통신 프로토콜 이해도 100% 매핑" />
    <AbsoluteFill style={{ paddingTop: 280, paddingLeft: 100, paddingRight: 100 }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
        {/* 좌: 프레임 */}
        <div
          style={{
            padding: 26,
            background: "rgba(13, 28, 50, 0.85)",
            border: `1px solid ${C.gold}40`,
            borderRadius: 12,
          }}
        >
          <div style={{ fontSize: 18, color: C.gold, marginBottom: 14, letterSpacing: 2 }}>
            ▸ FEnet 프레임 구조
          </div>
          <div
            style={{
              fontFamily: "Consolas, monospace",
              fontSize: 14,
              color: C.cream,
              lineHeight: 1.7,
              background: "rgba(0,0,0,0.4)",
              padding: 14,
              borderRadius: 8,
            }}
          >
            <div style={{ color: C.goldLight, marginBottom: 4 }}>[Header 20B]</div>
            <div>"LSIS-XGT\0\0" (10B)</div>
            <div>PLC Info (2B) + CPU Info (1B)</div>
            <div>SoF · Invoke ID · Length</div>
            <div>FEnet Position + BCC</div>
            <div style={{ color: C.goldLight, marginTop: 10, marginBottom: 4 }}>[App Data]</div>
            <div>Command: 0x54 R / 0x58 W</div>
            <div>Data Type: Bit/Word/Block</div>
            <div>Variable: %MX·%KX·%LX·%DW</div>
          </div>
          <div
            style={{
              marginTop: 12,
              fontSize: 14,
              color: C.goldLight,
              letterSpacing: 1,
            }}
          >
            TCP 포트 2004 · Little-Endian · BCC
          </div>
        </div>
        {/* 우: 직접 변수 */}
        <div
          style={{
            padding: 26,
            background: "rgba(13, 28, 50, 0.85)",
            border: `1px solid ${C.gold}40`,
            borderRadius: 12,
          }}
        >
          <div style={{ fontSize: 18, color: C.gold, marginBottom: 14, letterSpacing: 2 }}>
            ▸ 공고 명시 영역 — 100% 매핑
          </div>
          {[
            { v: "%MX100", desc: "M 비트 (내부 마커)" },
            { v: "%KX10", desc: "K 비트 (Keep 정전 유지)" },
            { v: "%LX5", desc: "L 비트 (Link · FEnet)" },
            { v: "%DW0", desc: "D 워드 (숫자 데이터)" },
          ].map((v, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "10px 14px",
                background: `${C.gold}15`,
                borderLeft: `3px solid ${C.gold}`,
                borderRadius: 6,
                marginBottom: 6,
              }}
            >
              <div
                style={{
                  fontFamily: "Consolas, monospace",
                  fontSize: 20,
                  color: C.gold,
                  fontWeight: 700,
                  minWidth: 100,
                }}
              >
                {v.v}
              </div>
              <div style={{ fontSize: 15, color: C.cream }}>{v.desc}</div>
            </div>
          ))}
        </div>
      </div>
      <div
        style={{
          marginTop: 20,
          padding: 16,
          background: `${C.gold}15`,
          border: `1px solid ${C.gold}60`,
          borderRadius: 8,
          textAlign: "center",
          fontSize: 18,
          color: C.goldLight,
          fontWeight: 600,
        }}
      >
        양산 자산: EtherCAT (CM4, 100μs) · Modbus RTU (STM32F756, KC) → FEnet은 더 단순한 처리
      </div>
    </AbsoluteFill>
  </SlideFrame>
);

// ============================================================
// SLIDE 9 — VISUALIZATION UI
// ============================================================
export const Slide09: React.FC = () => (
  <SlideFrame pageNo={9}>
    <SlideTitle text="좌표 시각화 모듈 — UI 모형" sub="우대 사항 직접 대응 · pyqtgraph 또는 MFC + GDI+" />
    <AbsoluteFill style={{ paddingTop: 280, paddingLeft: 100, paddingRight: 100 }}>
      <div
        style={{
          height: 280,
          background: "rgba(245, 242, 236, 0.08)",
          border: `2px solid ${C.gold}60`,
          borderRadius: 12,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* 격자 SVG */}
        <svg
          style={{ position: "absolute", inset: 0, opacity: 0.25 }}
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          {Array.from({ length: 11 }).map((_, i) => (
            <line key={`v${i}`} x1={i * 10} y1={0} x2={i * 10} y2={100} stroke={C.gold} strokeWidth="0.15" />
          ))}
          {Array.from({ length: 11 }).map((_, i) => (
            <line key={`h${i}`} x1={0} y1={i * 10} x2={100} y2={i * 10} stroke={C.gold} strokeWidth="0.15" />
          ))}
        </svg>
        <div
          style={{
            position: "absolute",
            top: 10,
            left: 16,
            fontSize: 14,
            color: C.goldLight,
            letterSpacing: 2,
          }}
        >
          BUSBAR · 100mm × 30mm × 5mm
        </div>
        {[
          { x: 12, y: 35, n: 1 },
          { x: 22, y: 40, n: 2 },
          { x: 35, y: 35, n: 3 },
          { x: 48, y: 50, n: 4 },
          { x: 62, y: 35, n: 5 },
          { x: 75, y: 45, n: 6 },
          { x: 85, y: 35, n: 7 },
        ].map((h) => (
          <div
            key={h.n}
            style={{
              position: "absolute",
              left: `${h.x}%`,
              top: `${h.y}%`,
              width: 18,
              height: 18,
              borderRadius: "50%",
              background: C.red,
              border: `2px solid ${C.white}`,
              transform: "translate(-50%, -50%)",
              boxShadow: "0 0 12px rgba(200, 70, 63, 0.6)",
            }}
          >
            <div
              style={{
                position: "absolute",
                left: 22,
                top: -2,
                fontSize: 14,
                color: C.goldLight,
                fontWeight: 700,
              }}
            >
              {h.n}
            </div>
          </div>
        ))}
      </div>
      <div
        style={{
          marginTop: 30,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 14,
        }}
      >
        {[
          "부스바 규격 비율 그리기 + 격자 (mm 눈금)",
          "X/Y 좌표 → 천공점 그래픽 + 순번 표시",
          "천공 지름 반영 (M6·M8·M10 매핑)",
          "영역 외 / 충돌 자동 경고",
          "가공 순서 시뮬레이션 미리보기",
          "줌 · 팬 · 마우스 클릭 추가",
        ].map((f, i) => (
          <div
            key={i}
            style={{
              padding: "10px 18px",
              background: "rgba(255,255,255,0.05)",
              borderLeft: `3px solid ${C.gold}`,
              borderRadius: 6,
              fontSize: 16,
              color: C.cream,
            }}
          >
            ✓ {f}
          </div>
        ))}
      </div>
    </AbsoluteFill>
  </SlideFrame>
);

// ============================================================
// SLIDE 10 — RECIPE
// ============================================================
export const Slide10: React.FC = () => (
  <SlideFrame pageNo={10}>
    <SlideTitle text="Recipe — 시퀀스 + 반복 + 자동 가동" sub="공고 §2-3 직접 대응 · 조건부 반복 로직 지원" />
    <AbsoluteFill style={{ paddingTop: 280, paddingLeft: 100, paddingRight: 100 }}>
      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 30 }}>
        <div
          style={{
            padding: 24,
            background: "rgba(13, 28, 50, 0.85)",
            border: `1px solid ${C.gold}40`,
            borderRadius: 12,
          }}
        >
          <div style={{ fontSize: 18, color: C.gold, marginBottom: 14, letterSpacing: 2 }}>
            ▸ Recipe 스크립트 예시
          </div>
          <div
            style={{
              fontFamily: "Consolas, monospace",
              fontSize: 15,
              color: C.cream,
              lineHeight: 1.7,
              background: "rgba(0,0,0,0.4)",
              padding: 16,
              borderRadius: 8,
            }}
          >
            <div style={{ color: C.goldLight }}>[Recipe: 표준 부스바 천공]</div>
            <div></div>
            <div>STEP 1: punch(X=10, Y=15, d=M8)</div>
            <div style={{ color: C.gold }}>FOR i = 1 TO 5:</div>
            <div>&nbsp;&nbsp;STEP 2: punch(X=20+i*10, Y=15)</div>
            <div>&nbsp;&nbsp;STEP 3: punch(X=20+i*10, Y=25)</div>
            <div>&nbsp;&nbsp;STEP 4: punch(X=20+i*10, Y=35)</div>
            <div style={{ color: C.gold }}>END FOR</div>
            <div>STEP 5: punch(X=80, Y=25, d=M10)</div>
            <div></div>
            <div style={{ color: C.green }}>// SPEED OVERRIDE: 70%</div>
            <div style={{ color: C.green }}>// AUTO_RUN: TRUE</div>
          </div>
        </div>
        <div
          style={{
            padding: 24,
            background: "rgba(13, 28, 50, 0.85)",
            border: `1px solid ${C.gold}40`,
            borderRadius: 12,
          }}
        >
          <div style={{ fontSize: 18, color: C.gold, marginBottom: 14, letterSpacing: 2 }}>
            ▸ 기능
          </div>
          <div style={{ fontSize: 16, color: C.cream, lineHeight: 2 }}>
            ✓ 스크립트 / 표 형식 (작업자 선택)<br/>
            ✓ 1번 → 2~4번 N회 반복 → 5번<br/>
            ✓ JSON/SQLite 저장<br/>
            ✓ 카테고리 트리 (제품·공정)<br/>
            ✓ 1-Click 호출<br/>
            ✓ 버전 관리<br/>
            ✓ 작업자 + 일자 메타데이터<br/>
            ✓ 속도 오버라이드 % 통합
          </div>
        </div>
      </div>
      <div
        style={{
          marginTop: 24,
          textAlign: "center",
          fontSize: 20,
          color: C.goldLight,
          letterSpacing: 2,
        }}
      >
        부스바 표준 천공 패턴을 저장 → 1-Click 호출 → 자동 가동
      </div>
    </AbsoluteFill>
  </SlideFrame>
);

// ============================================================
// SLIDE 11 — 양산 자산 5종
// ============================================================
export const Slide11: React.FC = () => (
  <SlideFrame pageNo={11}>
    <SlideTitle text="양산 자산 5종 — 본 프로젝트 매핑" sub="양산 코드 70% reuse 가능" />
    <AbsoluteFill style={{ paddingTop: 280, paddingLeft: 100, paddingRight: 100 }}>
      <div
        style={{
          background: "rgba(13, 28, 50, 0.85)",
          border: `1px solid ${C.gold}30`,
          borderRadius: 12,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.5fr 1fr 1.8fr",
            padding: "14px 24px",
            background: `${C.gold}20`,
            fontSize: 18,
            color: C.goldLight,
            fontWeight: 700,
            letterSpacing: 1,
          }}
        >
          <div>양산 자산</div>
          <div>분류</div>
          <div>본 프로젝트 매핑</div>
        </div>
        {[
          ["Raspberry Pi 3 V-Cut", "SBC 산업 응용", "X/Y 좌표 가공 — 부스바와 100% 동일 패턴"],
          ["Raspberry Pi CM4 EtherCAT", "산업 이더넷 100μs", "LS XGT FEnet 더 단순한 처리"],
          ["STM32F756 Modbus RTU", "산업 통신 + KC 인증", "산업 통신 프로토콜 양산 패턴 reuse"],
          ["Three.js 3D 모니터링 사이트", "24/7 무중단 운영", "좌표 시각화 양산 자산 (우대 항목)"],
          ["Canvas 2D 좌표 편집기", "라인 모니터링 양산", "부스바 시각화 직접 패턴"],
        ].map((row, i) => (
          <div
            key={i}
            style={{
              display: "grid",
              gridTemplateColumns: "1.5fr 1fr 1.8fr",
              padding: "14px 24px",
              fontSize: 16,
              color: C.cream,
              borderTop: `1px solid ${C.gold}15`,
            }}
          >
            <div style={{ fontWeight: 600 }}>{row[0]}</div>
            <div style={{ color: C.textMuted }}>{row[1]}</div>
            <div>{row[2]}</div>
          </div>
        ))}
      </div>
      <div
        style={{
          marginTop: 24,
          padding: 20,
          background: `${C.gold}15`,
          border: `1px solid ${C.gold}60`,
          borderRadius: 8,
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: 22, color: C.goldLight, fontWeight: 700, letterSpacing: 2 }}>
          양산 70% reuse → 신규 30% → 30일 일정 신뢰성 확보
        </div>
      </div>
    </AbsoluteFill>
  </SlideFrame>
);

// ============================================================
// SLIDE 12 — CERTIFICATIONS
// ============================================================
export const Slide12: React.FC = () => (
  <SlideFrame pageNo={12}>
    <SlideTitle text="안전 인증 — KC + TELEC + CE 3개국" sub="부스바 가공 = 전기 안전 직결과 매칭" />
    <AbsoluteFill style={{ paddingTop: 280, paddingLeft: 100, paddingRight: 100 }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 24 }}>
        {[
          { icon: "🇰🇷", name: "KC", country: "한국", desc: "전자파적합성·전기안전 인증" },
          { icon: "🇯🇵", name: "TELEC", country: "일본", desc: "무선설비·기술기준 적합증명" },
          { icon: "🇪🇺", name: "CE", country: "유럽", desc: "Conformité Européenne · 전기안전" },
        ].map((c, i) => (
          <div
            key={i}
            style={{
              padding: 30,
              background: `${C.green}15`,
              border: `2px solid ${C.green}`,
              borderRadius: 16,
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: 80, marginBottom: 14 }}>{c.icon}</div>
            <div style={{ fontSize: 38, color: C.green, fontWeight: 700, marginBottom: 6 }}>
              {c.name}
            </div>
            <div style={{ fontSize: 18, color: C.cream, fontWeight: 600, marginBottom: 12 }}>
              {c.country}
            </div>
            <div style={{ fontSize: 14, color: C.textMuted, lineHeight: 1.5 }}>{c.desc}</div>
          </div>
        ))}
      </div>
      <div
        style={{
          marginTop: 30,
          padding: 24,
          background: "rgba(13, 28, 50, 0.85)",
          border: `1px solid ${C.gold}40`,
          borderRadius: 12,
        }}
      >
        <div style={{ fontSize: 20, color: C.goldLight, marginBottom: 12, fontWeight: 700 }}>
          누적 안전 양산 실적
        </div>
        <div style={{ fontSize: 17, color: C.cream, lineHeight: 1.9 }}>
          ✓ 양산 5종 · 일본 시장 3,800대 운영<br/>
          ✓ 24/7 무중단 산업 모니터링 1년+<br/>
          ✓ 시뮬레이션·검증·작업자 확인 워크플로우 양산<br/>
          ✓ 전기 안전 규격 부합 양산 — 부스바 안전 직결과 정확히 매칭
        </div>
      </div>
    </AbsoluteFill>
  </SlideFrame>
);

// ============================================================
// SLIDE 13 — 30일 일정
// ============================================================
export const Slide13: React.FC = () => (
  <SlideFrame pageNo={13}>
    <SlideTitle text="30일 일정 — Week 1~4 + 마일스톤 4회" sub="매주 25% 분할 청구 · 4회 출장 (인천 연수)" />
    <AbsoluteFill style={{ paddingTop: 280, paddingLeft: 100, paddingRight: 100 }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 16 }}>
        {[
          { w: "Week 1", days: "Day 1~7", task: "분석·설계", out: "메모리맵 명세 · 화면 설계", ms: "M1 25%", trip: "현장 1회" },
          { w: "Week 2", days: "Day 8~14", task: "통신·시각화", out: "FEnet 통신 모듈 · Canvas 편집기", ms: "M2 25%", trip: "0" },
          { w: "Week 3", days: "Day 15~21", task: "통합·시뮬레이션", out: "시뮬레이션 · Recipe · 안정성", ms: "M3 25%", trip: "현장 1회" },
          { w: "Week 4", days: "Day 22~30", task: "인수·매뉴얼", out: "인수 시험 · 매뉴얼 · 인도", ms: "M4 25%", trip: "현장 2회" },
        ].map((wk, i) => (
          <div
            key={i}
            style={{
              padding: 22,
              background: `linear-gradient(135deg, ${C.navyMid} 0%, ${C.navy} 100%)`,
              border: `1px solid ${C.gold}40`,
              borderRadius: 14,
            }}
          >
            <div style={{ fontSize: 22, color: C.goldLight, fontWeight: 700, marginBottom: 4 }}>
              {wk.w}
            </div>
            <div style={{ fontSize: 13, color: C.textMuted, marginBottom: 14 }}>{wk.days}</div>
            <div style={{ fontSize: 17, color: C.white, fontWeight: 600, marginBottom: 10 }}>
              {wk.task}
            </div>
            <div style={{ fontSize: 13, color: C.cream, lineHeight: 1.5, marginBottom: 14, minHeight: 60 }}>
              {wk.out}
            </div>
            <div
              style={{
                fontSize: 14,
                color: C.gold,
                padding: "4px 10px",
                background: `${C.gold}20`,
                borderRadius: 999,
                display: "inline-block",
                letterSpacing: 1,
                marginBottom: 8,
              }}
            >
              {wk.ms}
            </div>
            <div style={{ fontSize: 12, color: C.textMuted }}>{wk.trip}</div>
          </div>
        ))}
      </div>
      <div
        style={{
          marginTop: 30,
          padding: 20,
          background: `${C.gold}15`,
          border: `1px solid ${C.gold}60`,
          borderRadius: 8,
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: 22, color: C.goldLight, fontWeight: 700, letterSpacing: 2 }}>
          양산 70% reuse → 1인 60일을 30일에 압축
        </div>
      </div>
    </AbsoluteFill>
  </SlideFrame>
);

// ============================================================
// SLIDE 14 — 2인 팀 분담
// ============================================================
export const Slide14: React.FC = () => (
  <SlideFrame pageNo={14}>
    <SlideTitle text="2인 팀 수직 통합 — 분담 매트릭스" sub="외부 협력사 의존도 0 · 30일 일정 압축 가능" />
    <AbsoluteFill style={{ paddingTop: 280, paddingLeft: 100, paddingRight: 100 }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 30 }}>
        {[
          {
            name: "임호균 · HW",
            years: "38년",
            spec: "VC++/MFC + Win32 + 회로설계 25년",
            big: ["삼성전자 경력", "Visual C++ / MFC 38년 양산", "MFC Controller 제안 양산"],
            tasks: ["MFC GUI 프레임 + 화면 구성", "Canvas 2D 좌표 편집기", "시뮬레이션 그래픽", "작업자 매뉴얼"],
          },
          {
            name: "홍광선 · FW/SW",
            years: "40년",
            spec: "임베디드 펌웨어 + 산업 통신 양산",
            big: ["파나소닉 경력", "STM32 + Raspberry Pi 양산 5종", "EtherCAT + Modbus 양산"],
            tasks: ["LS XGT FEnet 통신 모듈", "Recipe DB · 데이터 변환", "좌표 → PLC 변환", "안전 검증 + 단위 테스트"],
          },
        ].map((p, i) => (
          <div
            key={i}
            style={{
              padding: 26,
              background: "rgba(13, 28, 50, 0.85)",
              border: `2px solid ${C.gold}40`,
              borderRadius: 16,
            }}
          >
            <div style={{ display: "flex", alignItems: "baseline", gap: 14, marginBottom: 10 }}>
              <div style={{ fontSize: 30, color: C.gold, fontWeight: 700 }}>{p.name}</div>
              <div style={{ fontSize: 28, color: C.goldLight, fontWeight: 800 }}>{p.years}</div>
            </div>
            <div style={{ fontSize: 16, color: C.textMuted, marginBottom: 16 }}>{p.spec}</div>
            <div
              style={{
                padding: 12,
                background: "rgba(255,255,255,0.05)",
                borderRadius: 8,
                marginBottom: 16,
              }}
            >
              {p.big.map((b, j) => (
                <div key={j} style={{ fontSize: 14, color: C.goldLight, marginBottom: 4 }}>
                  ★ {b}
                </div>
              ))}
            </div>
            <div style={{ fontSize: 16, color: C.cream, lineHeight: 1.8 }}>
              <div style={{ color: C.gold, marginBottom: 6, fontWeight: 700 }}>본 프로젝트 담당</div>
              {p.tasks.map((t, j) => (
                <div key={j}>─ {t}</div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </AbsoluteFill>
  </SlideFrame>
);

// ============================================================
// SLIDE 15 — 단가 분석
// ============================================================
export const Slide15: React.FC = () => (
  <SlideFrame pageNo={15}>
    <SlideTitle text="단가 분석 — 1,000만원 / 30일" sub="마일스톤 4회 분할 청구 · 부가세 별도" />
    <AbsoluteFill style={{ paddingTop: 280, paddingLeft: 100, paddingRight: 100 }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20, marginBottom: 30 }}>
        {[
          { label: "총 견적", val: "1,000만원", note: "부가세 별도", color: C.gold },
          { label: "일당", val: "33.3만원", note: "30일 기준", color: C.cream },
          { label: "시급", val: "4.2만원", note: "8h × 30일", color: C.cream },
        ].map((m, i) => (
          <div
            key={i}
            style={{
              padding: 24,
              background: "rgba(13, 28, 50, 0.85)",
              border: `1px solid ${C.gold}40`,
              borderRadius: 12,
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: 16, color: C.textMuted, marginBottom: 10, letterSpacing: 2 }}>
              {m.label}
            </div>
            <div style={{ fontSize: 36, color: m.color, fontWeight: 800, marginBottom: 6 }}>
              {m.val}
            </div>
            <div style={{ fontSize: 13, color: C.textMuted }}>{m.note}</div>
          </div>
        ))}
      </div>

      <div
        style={{
          background: "rgba(13, 28, 50, 0.85)",
          border: `1px solid ${C.gold}30`,
          borderRadius: 12,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.5fr 1fr 1fr",
            padding: "14px 24px",
            background: `${C.gold}20`,
            fontSize: 16,
            color: C.goldLight,
            fontWeight: 700,
            letterSpacing: 1,
          }}
        >
          <div>마일스톤</div>
          <div>산출물</div>
          <div style={{ textAlign: "center" }}>비율</div>
          <div style={{ textAlign: "right" }}>금액</div>
        </div>
        {[
          ["M1", "설계 문서 (메모리맵·화면 설계)", "25%", "2,500,000원"],
          ["M2", "통신·시각화 모듈 데모", "25%", "2,500,000원"],
          ["M3", "통합·시뮬레이션·안정성 데모", "25%", "2,500,000원"],
          ["M4", "최종 인수·매뉴얼 인도", "25%", "2,500,000원"],
        ].map((row, i) => (
          <div
            key={i}
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1.5fr 1fr 1fr",
              padding: "12px 24px",
              fontSize: 16,
              color: C.cream,
              borderTop: `1px solid ${C.gold}15`,
            }}
          >
            <div style={{ color: C.gold, fontWeight: 700 }}>{row[0]}</div>
            <div>{row[1]}</div>
            <div style={{ textAlign: "center", color: C.goldLight }}>{row[2]}</div>
            <div style={{ textAlign: "right", color: C.goldLight, fontWeight: 700 }}>{row[3]}</div>
          </div>
        ))}
      </div>
    </AbsoluteFill>
  </SlideFrame>
);

// ============================================================
// SLIDE 16 — 위험·완화
// ============================================================
export const Slide16: React.FC = () => (
  <SlideFrame pageNo={16}>
    <SlideTitle text="위험 + 완화책 — 7대 위험 정직 박제" sub="모든 위험은 사전 박제 · 발생 시 완화책 즉시 적용" />
    <AbsoluteFill style={{ paddingTop: 280, paddingLeft: 100, paddingRight: 100 }}>
      <div
        style={{
          background: "rgba(13, 28, 50, 0.85)",
          border: `1px solid ${C.gold}30`,
          borderRadius: 12,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "0.5fr 1.5fr 0.6fr 2fr",
            padding: "14px 24px",
            background: `${C.gold}20`,
            fontSize: 16,
            color: C.goldLight,
            fontWeight: 700,
            letterSpacing: 1,
          }}
        >
          <div></div>
          <div>위험 항목</div>
          <div style={{ textAlign: "center" }}>영향</div>
          <div>완화책</div>
        </div>
        {[
          { n: "1", risk: "PLC 모델 공유 지연", level: "🔴", mit: "계약 시 Day 1 공유 확약 + 분석 보고서 24h" },
          { n: "2", risk: "메모리맵 변경 요청", level: "🟠", mit: "추상화 레이어 설계 — 변경 흡수 가능" },
          { n: "3", risk: "PLC 통신 불일치", level: "🔴", mit: "Week 1 현장 1회 사전 검증" },
          { n: "4", risk: "작업자 UI 요구 변경", level: "🟡", mit: "Week 1 작업자 인터뷰 우선" },
          { n: "5", risk: "현장 출장 일정 충돌", level: "🟡", mit: "Week 1에 4회 출장 일정 사전 확정" },
          { n: "6", risk: "부스바 도면 표준 미지정", level: "🟠", mit: "KS C 8550 / IEC 60439 매핑 학습" },
          { n: "7", risk: "C# 자격 vs C++ 스택", level: "🟡", mit: "미팅 Q0 첫 질문으로 즉시 확정" },
        ].map((row, i) => (
          <div
            key={i}
            style={{
              display: "grid",
              gridTemplateColumns: "0.5fr 1.5fr 0.6fr 2fr",
              padding: "10px 24px",
              fontSize: 16,
              color: C.cream,
              borderTop: `1px solid ${C.gold}15`,
            }}
          >
            <div style={{ color: C.gold, fontWeight: 700 }}>{row.n}</div>
            <div>{row.risk}</div>
            <div style={{ textAlign: "center", fontSize: 18 }}>{row.level}</div>
            <div style={{ color: C.cream, fontSize: 15 }}>{row.mit}</div>
          </div>
        ))}
      </div>
    </AbsoluteFill>
  </SlideFrame>
);

// ============================================================
// SLIDE 17 — 후속 외주 가능성
// ============================================================
export const Slide17: React.FC = () => (
  <SlideFrame pageNo={17}>
    <SlideTitle text="후속 외주 가능성" sub="본 프로젝트 = 다년 협업의 발판" />
    <AbsoluteFill style={{ paddingTop: 280, paddingLeft: 100, paddingRight: 100 }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        {[
          { icon: "🔧", title: "추가 부스바 가공기 라인 통합", price: "800~1,500만원", desc: "동일 클라이언트 다른 라인" },
          { icon: "✂", title: "절단·벤딩 통합 PC 응용", price: "1,500~2,500만원", desc: "펀칭 + 절단 + 벤딩" },
          { icon: "🔌", title: "차단기 단자 천공 자동화", price: "1,000~1,500만원", desc: "인접 응용" },
          { icon: "🗺", title: "부스바 라우팅 시각화 도구", price: "2,000~3,500만원", desc: "배전반 전체 설계" },
          { icon: "☁", title: "원격 모니터링 SaaS", price: "월 50~150만원", desc: "가공 결과 클라우드 박제" },
          { icon: "🏢", title: "배전반 전체 라인 자동화 SI", price: "5,000만~수억원", desc: "다년 계약 (Tier 3)" },
        ].map((item, i) => (
          <div
            key={i}
            style={{
              padding: 22,
              background: "rgba(13, 28, 50, 0.85)",
              border: `1px solid ${C.gold}40`,
              borderRadius: 12,
              display: "flex",
              gap: 14,
              alignItems: "center",
            }}
          >
            <div style={{ fontSize: 40 }}>{item.icon}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 17, color: C.cream, fontWeight: 700, marginBottom: 4 }}>
                {item.title}
              </div>
              <div style={{ fontSize: 13, color: C.textMuted, marginBottom: 4 }}>{item.desc}</div>
              <div style={{ fontSize: 16, color: C.goldLight, fontWeight: 700 }}>{item.price}</div>
            </div>
          </div>
        ))}
      </div>
      <div
        style={{
          marginTop: 24,
          padding: 16,
          background: `${C.gold}15`,
          border: `1px solid ${C.gold}60`,
          borderRadius: 8,
          textAlign: "center",
          fontSize: 18,
          color: C.goldLight,
          fontWeight: 700,
          letterSpacing: 2,
        }}
      >
        본 30일 프로젝트 성공 → 다년 협업 발판 + Tier 2/3 후보 발굴
      </div>
    </AbsoluteFill>
  </SlideFrame>
);

// ============================================================
// SLIDE 18 — CLOSING
// ============================================================
export const Slide18: React.FC = () => (
  <SlideFrame pageNo={18}>
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      <div style={{ width: 200, height: 2, background: C.gold, marginBottom: 60 }} />
      <div
        style={{
          fontSize: 48,
          color: C.white,
          fontWeight: 500,
          marginBottom: 30,
          letterSpacing: 3,
          textAlign: "center",
        }}
      >
        양산 자산이
        <br />
        <span style={{ color: C.gold }}>부스바로.</span>
      </div>
      <div style={{ width: 100, height: 2, background: C.gold, margin: "30px 0" }} />
      <div
        style={{
          fontSize: 22,
          color: C.cream,
          lineHeight: 2,
          textAlign: "center",
        }}
      >
        V-Cut 컨트롤러 60% 이식<br/>
        LS XGT FEnet 직접 구현<br/>
        KC · TELEC · CE 안전 인증 양산<br/>
        2인 팀 78년 임베디드 통합
      </div>
      <div style={{ width: 100, height: 2, background: C.gold, margin: "30px 0" }} />
      <div
        style={{
          fontSize: 30,
          color: C.goldLight,
          fontWeight: 700,
          letterSpacing: 4,
          marginTop: 20,
        }}
      >
        30일 후 인도드립니다
      </div>
      <div style={{ width: 200, height: 2, background: C.gold, marginTop: 60 }} />
      <div
        style={{
          marginTop: 30,
          fontSize: 18,
          color: C.textMuted,
          letterSpacing: 3,
          textAlign: "center",
        }}
      >
        위시캣 #155381 · 미팅에서 뵙겠습니다
      </div>
    </AbsoluteFill>
  </SlideFrame>
);
