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
};

// ============ COMMON LAYOUT WRAPPER ============
const SlideFrame: React.FC<{
  pageNo: number;
  totalPages?: number;
  children: React.ReactNode;
  background?: "luxury" | "light";
}> = ({ pageNo, totalPages = 18, children, background = "luxury" }) => {
  const isLight = background === "light";
  return (
    <AbsoluteFill
      style={{
        background: isLight
          ? C.cream
          : `radial-gradient(ellipse at center, ${C.navyMid} 0%, ${C.navy} 60%, ${C.navyDark} 100%)`,
      }}
    >
      {/* 상단 골드 라인 */}
      <div
        style={{
          position: "absolute",
          top: 60,
          left: 80,
          width: 60,
          height: 2,
          background: C.gold,
        }}
      />
      {/* 헤더 라벨 */}
      <div
        style={{
          position: "absolute",
          top: 50,
          left: 160,
          fontSize: 16,
          color: isLight ? C.navyMid : C.gold,
          letterSpacing: 4,
          fontWeight: 600,
        }}
      >
        CLAUDE + OBSIDIAN PROPOSAL
      </div>

      {/* 페이지 번호 */}
      <div
        style={{
          position: "absolute",
          top: 50,
          right: 80,
          fontSize: 16,
          color: isLight ? C.navyMid : C.gold,
          letterSpacing: 2,
        }}
      >
        {String(pageNo).padStart(2, "0")} / {totalPages}
      </div>

      {/* 하단 골드 라인 */}
      <div
        style={{
          position: "absolute",
          bottom: 60,
          right: 80,
          width: 60,
          height: 2,
          background: C.gold,
        }}
      />
      {/* 하단 푸터 */}
      <div
        style={{
          position: "absolute",
          bottom: 50,
          right: 160,
          fontSize: 14,
          color: isLight ? C.navyMid : C.textMuted,
          letterSpacing: 3,
        }}
      >
        롯데백화점 소공동 본점장께
      </div>

      {children}
    </AbsoluteFill>
  );
};

// ============================================================
// SLIDE 1 — TITLE
// ============================================================
export const Slide01: React.FC = () => (
  <SlideFrame pageNo={1}>
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      <div style={{ width: 100, height: 2, background: C.gold, marginBottom: 50 }} />
      <div
        style={{
          fontSize: 36,
          color: C.goldLight,
          letterSpacing: 6,
          marginBottom: 30,
          fontWeight: 500,
        }}
      >
        공간을 새로 정의해 오신 점장님께
      </div>
      <div
        style={{
          fontSize: 80,
          color: C.white,
          fontWeight: 700,
          letterSpacing: 3,
          textAlign: "center",
          lineHeight: 1.2,
        }}
      >
        Claude + Obsidian
        <br />
        <span style={{ color: C.gold, fontSize: 60 }}>활용 제안</span>
      </div>
      <div style={{ width: 100, height: 2, background: C.gold, marginTop: 50 }} />
      <div
        style={{
          marginTop: 80,
          fontSize: 22,
          color: C.textMuted,
          letterSpacing: 3,
          textAlign: "center",
          lineHeight: 1.6,
        }}
      >
        본점 리모델링 프로젝트 및 점장 상시 업무를 위한
        <br />
        개인 지식·업무 운영체계 구축 방안
      </div>
      <div
        style={{
          marginTop: 40,
          fontSize: 20,
          color: C.gold,
          letterSpacing: 4,
        }}
      >
        2026년 5월 9일
      </div>
    </AbsoluteFill>
  </SlideFrame>
);

// ============================================================
// SLIDE 2 — CAREER
// ============================================================
export const Slide02: React.FC = () => (
  <SlideFrame pageNo={2}>
    <SlideTitle text="점장님의 커리어, 한 문장으로" />
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 80,
      }}
    >
      <div
        style={{
          display: "flex",
          gap: 40,
          alignItems: "center",
          marginBottom: 80,
        }}
      >
        {[
          { name: "의왕 롯데아웃렛", sub: "자연친화 신개념 신규 출점" },
          { name: "인천점", sub: "리모델링" },
          { name: "소공동 본점", sub: "리모델링" },
        ].map((step, i) => (
          <React.Fragment key={i}>
            <div
              style={{
                width: 280,
                padding: 30,
                background: `linear-gradient(135deg, ${C.navyMid} 0%, ${C.navy} 100%)`,
                border: `2px solid ${C.gold}`,
                borderRadius: 16,
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: 24, color: C.goldLight, fontWeight: 700, marginBottom: 8 }}>
                {step.name}
              </div>
              <div style={{ fontSize: 16, color: C.cream, lineHeight: 1.4 }}>
                {step.sub}
              </div>
            </div>
            {i < 2 && <div style={{ fontSize: 40, color: C.gold }}>→</div>}
          </React.Fragment>
        ))}
      </div>
      <div style={{ width: 100, height: 2, background: C.gold, marginBottom: 30 }} />
      <div
        style={{
          fontSize: 44,
          color: C.white,
          fontWeight: 700,
          letterSpacing: 4,
        }}
      >
        = <span style={{ color: C.gold }}>공간을 새로 정의하는 일</span>
      </div>
    </AbsoluteFill>
  </SlideFrame>
);

// ============================================================
// SLIDE 3 — THREE REQUIREMENTS
// ============================================================
export const Slide03: React.FC = () => (
  <SlideFrame pageNo={3}>
    <SlideTitle text="이 일이 본질적으로 요구하는 세 가지" />
    <AbsoluteFill
      style={{
        flexDirection: "row",
        gap: 30,
        padding: "200px 100px 140px",
      }}
    >
      {[
        {
          n: "01",
          title: "방대한 정보의 정리",
          desc: "시공사·MD·디자인·법무·임원진·외부 컨설팅사로부터 끊임없이 들어오는 자료",
        },
        {
          n: "02",
          title: "수많은 의사결정의 추적",
          desc: '"왜 그렇게 결정했더라?"가 6개월 뒤에도 살아있어야 함',
        },
        {
          n: "03",
          title: "인사이트의 축적",
          desc: "의왕에서 얻은 노하우가 인천에서, 인천이 본점에서 살아나야 함",
        },
      ].map((c, i) => (
        <div
          key={i}
          style={{
            flex: 1,
            background: `linear-gradient(180deg, ${C.navyMid} 0%, ${C.navy} 100%)`,
            border: `1px solid ${C.gold}40`,
            borderRadius: 16,
            padding: 36,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              fontSize: 56,
              color: C.gold,
              fontWeight: 700,
              marginBottom: 20,
              letterSpacing: 2,
            }}
          >
            {c.n}
          </div>
          <div style={{ width: 40, height: 2, background: C.gold, marginBottom: 20 }} />
          <div
            style={{
              fontSize: 28,
              color: C.white,
              fontWeight: 700,
              marginBottom: 16,
              lineHeight: 1.3,
            }}
          >
            {c.title}
          </div>
          <div style={{ fontSize: 18, color: C.cream, lineHeight: 1.6 }}>
            {c.desc}
          </div>
        </div>
      ))}
    </AbsoluteFill>
  </SlideFrame>
);

// ============================================================
// SLIDE 4 — LIMITATION
// ============================================================
export const Slide04: React.FC = () => (
  <SlideFrame pageNo={4}>
    <SlideTitle text="기존의 익숙한 도구 조합" />
    <AbsoluteFill style={{ padding: "200px 120px 140px" }}>
      <div style={{ textAlign: "center", marginBottom: 50 }}>
        <span
          style={{
            fontSize: 40,
            color: C.cream,
            letterSpacing: 4,
          }}
        >
          이메일 + 파일서버 + 메신저 + 다이어리
        </span>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 24,
          padding: "0 120px",
        }}
      >
        {[
          "정보는 흩어집니다",
          "의사결정 맥락은 휘발됩니다",
          "노하우는 사람과 함께 떠납니다",
        ].map((t, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 24,
              padding: "20px 32px",
              background: `${C.red}15`,
              border: `1px solid ${C.red}50`,
              borderRadius: 12,
            }}
          >
            <div style={{ fontSize: 36, color: C.red }}>✕</div>
            <div style={{ fontSize: 28, color: C.cream, fontWeight: 500 }}>
              {t}
            </div>
          </div>
        ))}
      </div>
    </AbsoluteFill>
  </SlideFrame>
);

// ============================================================
// SLIDE 5 — DIRECTION
// ============================================================
export const Slide05: React.FC = () => (
  <SlideFrame pageNo={5}>
    <SlideTitle text="해결의 방향" />
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      <div
        style={{
          fontSize: 48,
          color: C.gold,
          fontWeight: 700,
          letterSpacing: 3,
          marginBottom: 60,
        }}
      >
        개인용 도구 조합
      </div>
      <div
        style={{
          fontSize: 88,
          color: C.white,
          fontWeight: 800,
          letterSpacing: 4,
          marginBottom: 80,
        }}
      >
        Claude <span style={{ color: C.gold }}>+</span> Obsidian
      </div>
      <div
        style={{
          display: "flex",
          gap: 40,
          fontSize: 22,
          color: C.cream,
          letterSpacing: 2,
        }}
      >
        {["월 3만원 미만", "회사 시스템과 별개", "본인의 자산으로 영구 보존"].map((t, i) => (
          <div
            key={i}
            style={{
              padding: "16px 28px",
              background: `${C.gold}15`,
              border: `1px solid ${C.gold}60`,
              borderRadius: 100,
            }}
          >
            ✓ {t}
          </div>
        ))}
      </div>
    </AbsoluteFill>
  </SlideFrame>
);

// ============================================================
// SLIDE 6 — OBSIDIAN
// ============================================================
export const Slide06: React.FC = () => (
  <SlideFrame pageNo={6}>
    <AbsoluteFill style={{ padding: "150px 100px 120px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 30, marginBottom: 50 }}>
        <div
          style={{
            width: 100,
            height: 100,
            background: `linear-gradient(135deg, #6B3FAF 0%, #2A1654 100%)`,
            borderRadius: 24,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 56,
          }}
        >
          💎
        </div>
        <div>
          <div style={{ fontSize: 56, color: C.white, fontWeight: 700, letterSpacing: 2 }}>
            Obsidian
          </div>
          <div style={{ fontSize: 24, color: C.gold, letterSpacing: 4, marginTop: 4 }}>
            영구 기억 저장소
          </div>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 24,
          marginBottom: 40,
        }}
      >
        {[
          ["로컬 PC 저장", "회사 보안망과 충돌 없음"],
          ["양방향 링크", "결정의 출처를 클릭 한 번에"],
          ["그래프 뷰", "6개월 노트의 연결 구조 시각화"],
          ["플러그인 생태계", "일정·칸반·다이어그램 무한 확장"],
        ].map(([title, desc], i) => (
          <div
            key={i}
            style={{
              background: "rgba(13, 28, 50, 0.6)",
              border: `1px solid ${C.gold}30`,
              borderRadius: 14,
              padding: 24,
            }}
          >
            <div style={{ fontSize: 24, color: C.goldLight, fontWeight: 700, marginBottom: 8 }}>
              {title}
            </div>
            <div style={{ fontSize: 18, color: C.cream, lineHeight: 1.5 }}>{desc}</div>
          </div>
        ))}
      </div>

      <div
        style={{
          textAlign: "center",
          fontSize: 28,
          color: C.gold,
          fontWeight: 700,
          letterSpacing: 3,
        }}
      >
        비용 — 무료 (동기화는 월 $4)
      </div>
    </AbsoluteFill>
  </SlideFrame>
);

// ============================================================
// SLIDE 7 — CLAUDE
// ============================================================
export const Slide07: React.FC = () => (
  <SlideFrame pageNo={7}>
    <AbsoluteFill style={{ padding: "150px 100px 120px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 30, marginBottom: 50 }}>
        <div
          style={{
            width: 100,
            height: 100,
            background: `linear-gradient(135deg, #C26B3F 0%, #6B3A1F 100%)`,
            borderRadius: 24,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 56,
          }}
        >
          🧠
        </div>
        <div>
          <div style={{ fontSize: 56, color: C.white, fontWeight: 700, letterSpacing: 2 }}>
            Claude
          </div>
          <div style={{ fontSize: 24, color: C.gold, letterSpacing: 4, marginTop: 4 }}>
            실시간 처리 두뇌
          </div>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 30 }}>
        {[
          "긴 회의록 → 요약·액션아이템 5초 안에",
          "임원·이사회 보고서 초안 30분 만에",
          "해외 백화점 벤치마킹 자료 번역·요약",
          "매출표 → 패턴·이상치 분석",
          "결정 어려울 때 — 찬반 정리, 리스크 도출",
        ].map((t, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 20,
              padding: "18px 28px",
              background: "rgba(13, 28, 50, 0.6)",
              border: `1px solid ${C.gold}30`,
              borderRadius: 12,
            }}
          >
            <div style={{ fontSize: 24, color: C.gold, fontWeight: 700 }}>{i + 1}</div>
            <div style={{ fontSize: 22, color: C.cream }}>{t}</div>
          </div>
        ))}
      </div>

      <div
        style={{
          textAlign: "center",
          fontSize: 28,
          color: C.gold,
          fontWeight: 700,
          letterSpacing: 3,
          marginTop: 20,
        }}
      >
        비용 — 월 $20 (Pro)
      </div>
    </AbsoluteFill>
  </SlideFrame>
);

// ============================================================
// SLIDE 8 — 1+1=10
// ============================================================
export const Slide08: React.FC = () => (
  <SlideFrame pageNo={8}>
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      <div
        style={{
          fontSize: 36,
          color: C.gold,
          letterSpacing: 6,
          marginBottom: 60,
          fontWeight: 600,
        }}
      >
        결합의 효과
      </div>
      <div
        style={{
          fontSize: 100,
          fontWeight: 800,
          color: C.white,
          marginBottom: 60,
          letterSpacing: 4,
        }}
      >
        1 + 1 = <span style={{ color: C.goldLight, fontSize: 140 }}>10</span>
      </div>

      <div
        style={{
          display: "flex",
          gap: 30,
          marginBottom: 40,
        }}
      >
        {[
          { label: "Obsidian", role: "영구 기억 저장소", color: "#6B3FAF" },
          { label: "Claude", role: "실시간 처리 두뇌", color: "#C26B3F" },
          { label: "점장님", role: "판단과 실행", color: C.gold },
        ].map((it, i) => (
          <div
            key={i}
            style={{
              width: 280,
              padding: 28,
              background: `linear-gradient(135deg, ${it.color}40 0%, ${it.color}20 100%)`,
              border: `2px solid ${it.color}`,
              borderRadius: 16,
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontSize: 28,
                color: C.white,
                fontWeight: 700,
                marginBottom: 8,
              }}
            >
              {it.label}
            </div>
            <div style={{ fontSize: 18, color: C.cream, letterSpacing: 1 }}>
              {it.role}
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          marginTop: 40,
          padding: "20px 36px",
          background: `${C.gold}20`,
          border: `1px solid ${C.gold}`,
          borderRadius: 100,
          fontSize: 22,
          color: C.cream,
          letterSpacing: 2,
        }}
      >
        점장님은 — 두 가지의 결과만 검토하시면 됩니다
      </div>
    </AbsoluteFill>
  </SlideFrame>
);

// ============================================================
// SLIDE 9 — 7 SCENARIOS OVERVIEW
// ============================================================
export const Slide09: React.FC = () => (
  <SlideFrame pageNo={9}>
    <SlideTitle text="본점장 업무에 직접 적용되는 7가지 시나리오" />
    <AbsoluteFill style={{ padding: "200px 100px 120px" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 24 }}>
        {[
          { n: "①", title: "본점 리모델링 통합 운영실", icon: "🏛" },
          { n: "②", title: "일일 점장 업무 일지 + 매장 라운딩", icon: "🚶" },
          { n: "③", title: "VIP 고객 및 입점 브랜드 관계 관리", icon: "👑" },
          { n: "④", title: "임원 보고서·이사회 안건 30분 작성", icon: "📄" },
          { n: "⑤", title: "글로벌 백화점 벤치마킹 자료실", icon: "🌍" },
          { n: "⑥", title: "매출·MD 데이터 인사이트 노트", icon: "📈" },
          { n: "⑦", title: "개인 리테일 인사이트 자산", icon: "💼" },
        ].map((c, i) => (
          <div
            key={i}
            style={{
              background: `linear-gradient(135deg, ${C.navyMid} 0%, ${C.navy} 100%)`,
              border: `1px solid ${C.gold}40`,
              borderRadius: 14,
              padding: 28,
              minHeight: 160,
              display: "flex",
              flexDirection: "column",
              gap: 14,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ fontSize: 36, color: C.gold, fontWeight: 700 }}>{c.n}</span>
              <span style={{ fontSize: 32 }}>{c.icon}</span>
            </div>
            <div
              style={{
                fontSize: 20,
                color: C.cream,
                fontWeight: 600,
                lineHeight: 1.4,
              }}
            >
              {c.title}
            </div>
          </div>
        ))}
      </div>
    </AbsoluteFill>
  </SlideFrame>
);

// ============================================================
// SLIDE 10 — SCENARIO 1 DETAIL
// ============================================================
export const Slide10: React.FC = () => (
  <SlideFrame pageNo={10}>
    <SlideTitle text="시나리오 ① 본점 리모델링 통합 운영실" />
    <AbsoluteFill
      style={{
        padding: "200px 80px 140px",
        flexDirection: "row",
        gap: 40,
      }}
    >
      {/* 좌측: 폴더 트리 */}
      <div
        style={{
          flex: 1,
          background: "rgba(13, 28, 50, 0.85)",
          borderRadius: 16,
          padding: 30,
          border: `1px solid ${C.gold}40`,
          fontFamily: "Consolas, monospace",
        }}
      >
        <div
          style={{
            fontSize: 16,
            color: C.gold,
            marginBottom: 20,
            letterSpacing: 2,
          }}
        >
          ▸ Obsidian Vault
        </div>
        {[
          "📁 본점리모델링/",
          "├── 00_프로젝트_헌장.md",
          "├── 01_의사결정대장.md",
          "├── 02_주간회의록/",
          "├── 03_벤치마킹/",
          "├── 04_층별_컨셉/",
          "├── 05_리스크대장.md",
          "└── 06_VIP브리핑_이력.md",
        ].map((line, i) => (
          <div
            key={i}
            style={{
              fontSize: 20,
              color: i === 0 ? C.goldLight : C.cream,
              fontWeight: i === 0 ? 700 : 400,
              lineHeight: 1.7,
            }}
          >
            {line}
          </div>
        ))}
      </div>

      {/* 우측: Claude 대화 */}
      <div
        style={{
          flex: 1,
          background: "rgba(13, 28, 50, 0.85)",
          borderRadius: 16,
          padding: 30,
          border: `1px solid ${C.gold}40`,
        }}
      >
        <div
          style={{
            fontSize: 16,
            color: C.gold,
            marginBottom: 20,
            letterSpacing: 2,
          }}
        >
          ▸ Claude 시연
        </div>
        <div
          style={{
            background: `${C.gold}20`,
            padding: 16,
            borderRadius: 10,
            fontSize: 18,
            color: C.cream,
            borderLeft: `3px solid ${C.gold}`,
            marginBottom: 16,
          }}
        >
          🗣 "1F 명품관 동선에 대해
          <br />
          지금까지 결정된 것만 정리해 줘"
        </div>
        <div
          style={{
            background: "rgba(255,255,255,0.05)",
            padding: 16,
            borderRadius: 10,
            fontSize: 15,
            color: C.cream,
            borderLeft: `3px solid #C26B3F`,
            lineHeight: 1.7,
          }}
        >
          🤖 결정 사항 5건 (W3·W5·W7·W9·W11)
          <br />
          1. 발렛 → 1F 직진 동선
          <br />
          2. VIP 라운지 별도 입구
          <br />
          3. 명품관 회유성 우선
          <br />
          4. POP-UP 존 동측 배치
          <br />
          5. 카페테리아 → 보석관 연결
        </div>
        <div
          style={{
            marginTop: 20,
            padding: 14,
            background: `${C.green}20`,
            borderLeft: `3px solid ${C.green}`,
            borderRadius: 8,
            fontSize: 16,
            color: C.cream,
          }}
        >
          기대 효과 — 잠실·부산 본점에서도 재사용 가능한 검색 자산
        </div>
      </div>
    </AbsoluteFill>
  </SlideFrame>
);

// ============================================================
// SLIDE 11 — SCENARIO 2 ROUNDING
// ============================================================
export const Slide11: React.FC = () => (
  <SlideFrame pageNo={11}>
    <SlideTitle text="시나리오 ② 매장 라운딩 — 5분 음성 메모 한 번이면 끝" />
    <AbsoluteFill style={{ padding: "200px 100px 140px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 24, marginBottom: 50 }}>
        {[
          { icon: "🎙", t: "휴대폰 녹음" },
          { icon: "✨", t: "Claude 변환" },
          { icon: "📔", t: "Daily Note" },
          { icon: "📊", t: "월간 패턴 추출" },
        ].map((s, i) => (
          <React.Fragment key={i}>
            <div
              style={{
                flex: 1,
                background: `linear-gradient(180deg, ${C.navyMid} 0%, ${C.navy} 100%)`,
                border: `1px solid ${C.gold}40`,
                borderRadius: 14,
                padding: 28,
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: 60, marginBottom: 12 }}>{s.icon}</div>
              <div style={{ fontSize: 22, color: C.cream, fontWeight: 600 }}>
                {s.t}
              </div>
            </div>
            {i < 3 && <div style={{ fontSize: 36, color: C.gold }}>→</div>}
          </React.Fragment>
        ))}
      </div>

      <div
        style={{
          padding: 30,
          background: `${C.gold}15`,
          border: `1px solid ${C.gold}80`,
          borderRadius: 14,
          fontSize: 22,
          color: C.cream,
          lineHeight: 1.7,
          textAlign: "center",
        }}
      >
        한 달이 쌓이면 →{" "}
        <span style={{ color: C.gold, fontWeight: 700 }}>
          "이번 달 반복 지적 이슈 TOP 5"
        </span>
        가 자동 추출됩니다
      </div>

      <div
        style={{
          marginTop: 40,
          textAlign: "center",
          fontSize: 26,
          color: C.goldLight,
          letterSpacing: 3,
        }}
      >
        반복되는 문제의 패턴이 — 보입니다
      </div>
    </AbsoluteFill>
  </SlideFrame>
);

// ============================================================
// SLIDE 12 — SCENARIO 3 VIP
// ============================================================
export const Slide12: React.FC = () => (
  <SlideFrame pageNo={12}>
    <SlideTitle text="시나리오 ③ VIP·브랜드 관계 — 사람의 머리에서 노트로" />
    <AbsoluteFill style={{ padding: "200px 100px 140px" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 30, marginBottom: 30 }}>
        {[
          { title: "VIP·브랜드별 노트 1장", body: "만남 이력 / 기념일 / 가족 / 관심사" },
          { title: "양방향 링크", body: "VIP가 어느 브랜드를 선호하는지 자동 연결" },
          { title: "미팅 5분 전 컨텍스트", body: '"지난 1년 핵심만" — 한 줄로 복원' },
          { title: "조직 자산화", body: "인수인계가 인적 의존 → 노트 인계로" },
        ].map((c, i) => (
          <div
            key={i}
            style={{
              background: "rgba(13, 28, 50, 0.6)",
              border: `1px solid ${C.gold}30`,
              borderRadius: 12,
              padding: 24,
            }}
          >
            <div style={{ fontSize: 22, color: C.goldLight, fontWeight: 700, marginBottom: 8 }}>
              {c.title}
            </div>
            <div style={{ fontSize: 18, color: C.cream, lineHeight: 1.5 }}>
              {c.body}
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          marginTop: 20,
          padding: "20px 30px",
          background: `${C.red}15`,
          border: `2px solid ${C.red}`,
          borderRadius: 12,
          fontSize: 22,
          color: C.cream,
          lineHeight: 1.6,
        }}
      >
        ⚠ <span style={{ color: C.red, fontWeight: 700 }}>보안 원칙</span>:
        모든 개인정보는 이니셜·코드명 / 원본 노트는 점장님 PC에만 저장
      </div>
    </AbsoluteFill>
  </SlideFrame>
);

// ============================================================
// SLIDE 13 — SCENARIOS 4-7 SUMMARY
// ============================================================
export const Slide13: React.FC = () => (
  <SlideFrame pageNo={13}>
    <SlideTitle text="시나리오 ④⑤⑥⑦ — 한눈에" />
    <AbsoluteFill style={{ padding: "200px 100px 140px" }}>
      <div
        style={{
          background: "rgba(13, 28, 50, 0.85)",
          borderRadius: 16,
          border: `1px solid ${C.gold}40`,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "0.6fr 1.5fr 2fr",
            background: `${C.gold}20`,
            padding: "20px 30px",
            fontSize: 22,
            color: C.goldLight,
            fontWeight: 700,
            letterSpacing: 2,
          }}
        >
          <div></div>
          <div>시나리오</div>
          <div>핵심 효과</div>
        </div>
        {[
          ["④", "임원·이사회 보고서", "작성 시간 2~3시간 → 30분"],
          ["⑤", "글로벌 백화점 벤치마킹", "1회성 PDF → 영구 자산"],
          ["⑥", "매출·MD 데이터 인사이트", "감각 의존 → 데이터 기반 패턴 추출"],
          ["⑦", "개인 커리어 자산화", "머릿속 → 강연·책·후학 양성의 원자재"],
        ].map((row, i) => (
          <div
            key={i}
            style={{
              display: "grid",
              gridTemplateColumns: "0.6fr 1.5fr 2fr",
              padding: "24px 30px",
              fontSize: 22,
              color: C.cream,
              borderTop: `1px solid ${C.gold}20`,
              alignItems: "center",
            }}
          >
            <div style={{ fontSize: 36, color: C.gold, fontWeight: 700 }}>{row[0]}</div>
            <div style={{ fontWeight: 600 }}>{row[1]}</div>
            <div style={{ color: C.goldLight }}>{row[2]}</div>
          </div>
        ))}
      </div>
    </AbsoluteFill>
  </SlideFrame>
);

// ============================================================
// SLIDE 14 — SECURITY (CRITICAL)
// ============================================================
export const Slide14: React.FC = () => (
  <SlideFrame pageNo={14}>
    <AbsoluteFill style={{ padding: "150px 80px 120px" }}>
      <div
        style={{
          textAlign: "center",
          marginBottom: 30,
        }}
      >
        <div style={{ fontSize: 56, marginBottom: 8 }}>🔒</div>
        <div
          style={{
            fontSize: 42,
            color: C.gold,
            fontWeight: 700,
            letterSpacing: 4,
            marginBottom: 10,
          }}
        >
          보안 가이드 — 가장 중요한 장
        </div>
        <div style={{ fontSize: 18, color: C.textMuted, letterSpacing: 2 }}>
          점장님 위치에서 보안은 양보할 수 없습니다
        </div>
      </div>

      <div style={{ display: "flex", gap: 30, marginTop: 20 }}>
        {/* 위험 */}
        <div
          style={{
            flex: 1,
            background: `${C.red}15`,
            border: `2px solid ${C.red}`,
            borderRadius: 16,
            padding: 30,
          }}
        >
          <div style={{ fontSize: 26, color: C.red, fontWeight: 700, marginBottom: 20 }}>
            ✕ 위험한 입력 패턴
          </div>
          {[
            "○○○ 회장님 따님 결혼…",
            "매출 Excel 원본 붙여넣기",
            "미공개 입점 브랜드명·계약조건",
            "VIP 실명·연락처·재산정보",
          ].map((t, i) => (
            <div
              key={i}
              style={{
                fontSize: 18,
                color: C.cream,
                lineHeight: 1.7,
                marginBottom: 6,
              }}
            >
              · {t}
            </div>
          ))}
        </div>

        {/* 안전 */}
        <div
          style={{
            flex: 1,
            background: `${C.green}15`,
            border: `2px solid ${C.green}`,
            borderRadius: 16,
            padding: 30,
          }}
        >
          <div style={{ fontSize: 26, color: C.green, fontWeight: 700, marginBottom: 20 }}>
            ✓ 안전한 입력 패턴
          </div>
          {[
            "VIP-A 가족경조사 응대 매뉴얼…",
            '"1F 매출 -8%인데 가능한 원인"',
            "프리미엄 시계 카테고리 협상 포인트",
            "이니셜·코드명·익명화된 요약",
          ].map((t, i) => (
            <div
              key={i}
              style={{
                fontSize: 18,
                color: C.cream,
                lineHeight: 1.7,
                marginBottom: 6,
              }}
            >
              · {t}
            </div>
          ))}
        </div>
      </div>

      <div
        style={{
          marginTop: 30,
          padding: 20,
          background: `${C.gold}15`,
          border: `1px solid ${C.gold}`,
          borderRadius: 12,
          fontSize: 20,
          color: C.cream,
          textAlign: "center",
          letterSpacing: 2,
        }}
      >
        원본 노트는 점장님 PC의 Obsidian Vault에만 — IT보안팀 사전 문의 권장
      </div>
    </AbsoluteFill>
  </SlideFrame>
);

// ============================================================
// SLIDE 15 — VAULT FOLDER STRUCTURE
// ============================================================
export const Slide15: React.FC = () => (
  <SlideFrame pageNo={15}>
    <SlideTitle text="추천 Vault 폴더 구조" />
    <AbsoluteFill style={{ padding: "200px 200px 140px" }}>
      <div
        style={{
          background: "rgba(13, 28, 50, 0.9)",
          borderRadius: 16,
          padding: 50,
          border: `1px solid ${C.gold}40`,
          fontFamily: "Consolas, monospace",
          fontSize: 22,
          color: C.cream,
          lineHeight: 1.8,
        }}
      >
        {[
          { line: "📁 본점장_Vault/", c: C.goldLight, bold: true },
          { line: "├── 00_INBOX/        ← 즉흥적 메모", c: C.cream },
          { line: "├── 10_DAILY/        ← 일일 노트", c: C.cream },
          { line: "├── 20_PROJECTS/     ← 본점리모델링·식품관TF·25주년", c: C.cream },
          { line: "├── 30_OPERATIONS/   ← 라운딩·주간회의·매출·인사", c: C.cream },
          { line: "├── 40_PEOPLE/       ← VIP·입점브랜드·협력사 (보안)", c: C.cream },
          { line: "├── 50_KNOWLEDGE/    ← 글로벌벤치마킹·트렌드·책", c: C.cream },
          { line: "├── 60_REPORTS/      ← 작성 보고서 아카이브", c: C.cream },
          { line: "├── 90_TEMPLATES/    ← 회의록·일일·의사결정 양식", c: C.cream },
          { line: "└── 99_META/", c: C.cream },
        ].map((row, i) => (
          <div
            key={i}
            style={{
              color: row.c,
              fontWeight: row.bold ? 700 : 400,
            }}
          >
            {row.line}
          </div>
        ))}
      </div>
    </AbsoluteFill>
  </SlideFrame>
);

// ============================================================
// SLIDE 16 — ROADMAP
// ============================================================
export const Slide16: React.FC = () => (
  <SlideFrame pageNo={16}>
    <SlideTitle text="단계적 도입 로드맵 — 부담 없이 시작" />
    <AbsoluteFill style={{ padding: "200px 80px 140px" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {[
          { p: "Phase 1", time: "첫 1주", title: "맛보기", desc: "Obsidian 설치 + 매일 Daily Note 5분" },
          { p: "Phase 2", time: "1개월", title: "리모델링 폴더 가동", desc: "의사결정 대장 + 주간회의 3건 Claude 요약" },
          { p: "Phase 3", time: "3개월", title: "사람·지식 노트 합류", desc: "VIP 노트 + 글로벌 벤치마킹 10건" },
          { p: "Phase 4", time: "6개월", title: "검색 가능한 자산", desc: "그래프 뷰에서 점장님 사고 구조가 보임" },
          { p: "Phase 5", time: "1년", title: "두 번째 뇌", desc: "강연·기고 즉시 자료 검색 / 케이스 스터디 자산" },
        ].map((ph, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 30,
              padding: "20px 30px",
              background: `linear-gradient(90deg, ${C.navyMid} 0%, ${C.navy} 100%)`,
              border: `1px solid ${C.gold}40`,
              borderRadius: 14,
            }}
          >
            <div
              style={{
                width: 100,
                height: 100,
                borderRadius: "50%",
                background: `linear-gradient(135deg, ${C.gold} 0%, ${C.goldLight} 100%)`,
                color: C.navyDark,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 700,
                flexShrink: 0,
              }}
            >
              <div style={{ fontSize: 14 }}>{ph.p}</div>
              <div style={{ fontSize: 22 }}>{ph.time}</div>
            </div>
            <div>
              <div style={{ fontSize: 26, color: C.goldLight, fontWeight: 700 }}>
                {ph.title}
              </div>
              <div style={{ fontSize: 18, color: C.cream, marginTop: 4 }}>
                {ph.desc}
              </div>
            </div>
          </div>
        ))}
      </div>
    </AbsoluteFill>
  </SlideFrame>
);

// ============================================================
// SLIDE 17 — EXPECTED EFFECTS TABLE
// ============================================================
export const Slide17: React.FC = () => (
  <SlideFrame pageNo={17}>
    <SlideTitle text="기대 효과 — Before / After" />
    <AbsoluteFill style={{ padding: "200px 100px 120px" }}>
      <div
        style={{
          background: "rgba(13, 28, 50, 0.85)",
          borderRadius: 16,
          border: `1px solid ${C.gold}40`,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1.2fr 1.2fr",
            background: `${C.gold}25`,
            padding: "18px 30px",
            fontSize: 22,
            color: C.goldLight,
            fontWeight: 700,
            letterSpacing: 2,
          }}
        >
          <div>영역</div>
          <div style={{ textAlign: "center" }}>기존</div>
          <div style={{ textAlign: "right" }}>Claude + Obsidian</div>
        </div>
        {[
          ["회의록 정리", "30~60분", "5분"],
          ["임원 보고서 초안", "2~3시간", "30분"],
          ['"지난 결정 찾기"', "수십 분~포기", "30초 검색"],
          ["벤치마킹 자료 활용", "1회성", "영구 자산화"],
          ["VIP·브랜드 컨텍스트", "비서·기억력 의존", "미팅 전 5분"],
          ["점장 교체 인수인계", "인적 의존", "노트 인계"],
          ["개인 커리어 자산", "머릿속", "검색 가능한 형태"],
        ].map((row, i) => (
          <div
            key={i}
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 1.2fr 1.2fr",
              padding: "16px 30px",
              fontSize: 19,
              color: C.cream,
              borderTop: `1px solid ${C.gold}20`,
              alignItems: "center",
            }}
          >
            <div style={{ fontWeight: 600 }}>{row[0]}</div>
            <div
              style={{
                textAlign: "center",
                color: C.textMuted,
                textDecoration: "line-through",
              }}
            >
              {row[1]}
            </div>
            <div
              style={{
                textAlign: "right",
                color: C.goldLight,
                fontWeight: 700,
              }}
            >
              {row[2]}
            </div>
          </div>
        ))}
      </div>
    </AbsoluteFill>
  </SlideFrame>
);

// ============================================================
// SLIDE 18 — CLOSING + NEXT STEPS
// ============================================================
export const Slide18: React.FC = () => (
  <SlideFrame pageNo={18}>
    <AbsoluteFill style={{ padding: "150px 100px 120px", justifyContent: "center" }}>
      <div style={{ textAlign: "center", marginBottom: 50 }}>
        <div style={{ width: 100, height: 2, background: C.gold, margin: "0 auto 30px" }} />
        <div
          style={{
            fontSize: 50,
            color: C.gold,
            fontWeight: 700,
            letterSpacing: 4,
            marginBottom: 24,
          }}
        >
          도구는 거들 뿐
        </div>
        <div
          style={{
            fontSize: 22,
            color: C.cream,
            lineHeight: 1.8,
            letterSpacing: 1,
          }}
        >
          의왕의 "자연친화 신개념"을 만든 것은 도구가 아니라 —
          <br />
          점장님의 <span style={{ color: C.gold, fontWeight: 700 }}>안목·감각·논리</span>였습니다.
        </div>
      </div>

      <div
        style={{
          background: `${C.gold}10`,
          border: `1px solid ${C.gold}80`,
          borderRadius: 16,
          padding: 36,
        }}
      >
        <div
          style={{
            fontSize: 26,
            color: C.goldLight,
            fontWeight: 700,
            marginBottom: 24,
            letterSpacing: 2,
            textAlign: "center",
          }}
        >
          다음 단계 — 4가지만
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          {[
            { n: "1", t: "Obsidian 설치", url: "obsidian.md (무료)" },
            { n: "2", t: "Claude Pro 가입", url: "claude.ai (월 $20)" },
            { n: "3", t: "1주만 시도", url: "Daily Note 매일 5분" },
            { n: "4", t: "맞춤 템플릿 추가", url: "1주 후 함께 설계" },
          ].map((s, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                padding: "16px 24px",
                background: "rgba(13, 28, 50, 0.6)",
                borderRadius: 10,
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  background: C.gold,
                  color: C.navyDark,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 800,
                  fontSize: 20,
                  flexShrink: 0,
                }}
              >
                {s.n}
              </div>
              <div>
                <div style={{ fontSize: 20, color: C.cream, fontWeight: 600 }}>
                  {s.t}
                </div>
                <div style={{ fontSize: 14, color: C.textMuted }}>{s.url}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  </SlideFrame>
);

// ============ HELPER: SLIDE TITLE ============
const SlideTitle: React.FC<{ text: string }> = ({ text }) => (
  <div
    style={{
      position: "absolute",
      top: 110,
      left: 80,
      right: 80,
    }}
  >
    <div
      style={{
        fontSize: 40,
        color: C.white,
        fontWeight: 700,
        letterSpacing: 2,
        lineHeight: 1.3,
      }}
    >
      {text}
    </div>
    <div
      style={{
        width: 80,
        height: 3,
        background: C.gold,
        marginTop: 20,
      }}
    />
  </div>
);
