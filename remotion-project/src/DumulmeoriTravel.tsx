import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Audio,
  staticFile,
  Sequence,
  Easing,
  Img,
} from "remotion";
import React from "react";

// 씬 데이터 정의 (총 8700프레임 = 290초 = 4분 50초, 음성 288.72초에 맞춤)
const scenes = [
  {
    id: "intro",
    title: "봄, 두물머리로 떠나다",
    subtitle: "호균 · 광삼이와 함께하는 봄나들이",
    emoji: "🌸",
    bgGradient: ["#FF9A9E", "#FECFEF", "#FECFEF"],
    bgImage: "images/intro.jpg",
    duration: 870, // 29초
  },
  {
    id: "dumulmeori_intro",
    title: "두물머리",
    subtitle: "두 물이 만나 한강이 시작되는 곳",
    description: "UN 최우수 관광마을 · 한국관광 100선 7회 연속 선정",
    emoji: "🏞️",
    bgGradient: ["#667eea", "#764ba2"],
    bgImage: "images/dumulmeori.jpg",
    duration: 870, // 29초
  },
  {
    id: "breakfast",
    title: "아침 해장",
    subtitle: "양수리 돼지마을 순대국",
    description: "뜨끈한 순대국 한 그릇과 해장술 한 잔",
    emoji: "🍲",
    bgGradient: ["#f093fb", "#f5576c"],
    bgImage: "images/breakfast.jpg",
    duration: 870, // 29초
  },
  {
    id: "netinamu",
    title: "400년 느티나무",
    subtitle: "두물머리의 상징",
    description: "26m 높이의 보호수 · 수많은 추억을 간직한 곳",
    emoji: "🌳",
    bgGradient: ["#4facfe", "#00f2fe"],
    bgImage: "images/netinamu.jpg",
    duration: 870, // 29초
  },
  {
    id: "hwangpo",
    title: "황포돛배",
    subtitle: "나루터의 기억",
    description: "소금과 땔감을 나르던 역사의 흔적",
    emoji: "⛵",
    bgGradient: ["#43e97b", "#38f9d7"],
    bgImage: "images/hwangpo.jpg",
    duration: 870, // 29초
  },
  {
    id: "lunch",
    title: "점심 피크닉",
    subtitle: "구보타 만쥬와 꼬막",
    description: "수원에서 준비한 꼬막 · 강바람과 함께하는 건배",
    emoji: "🍶",
    bgGradient: ["#fa709a", "#fee140"],
    bgImage: "images/lunch.jpg",
    duration: 870, // 29초
  },
  {
    id: "semiwon",
    title: "세미원",
    subtitle: "물과 꽃의 정원",
    description: "관수세심 관화미심 · 100여 종의 수련과 연꽃",
    emoji: "🪷",
    bgGradient: ["#a8edea", "#fed6e3"],
    bgImage: "images/semiwon.jpg",
    duration: 870, // 29초
  },
  {
    id: "mulraegil",
    title: "두물머리 물래길",
    subtitle: "10km 힐링 산책로",
    description: "양수리 환경생태공원 · 남한강 자전거길",
    emoji: "🚶",
    bgGradient: ["#d299c2", "#fef9d7"],
    bgImage: "images/mulraegil.jpg",
    duration: 870, // 29초
  },
  {
    id: "sunset",
    title: "두물머리의 일몰",
    subtitle: "하루의 마무리",
    description: "느티나무 그림자와 황포돛배 위의 노을",
    emoji: "🌅",
    bgGradient: ["#f6d365", "#fda085"],
    bgImage: "images/sunset.jpg",
    duration: 870, // 29초
  },
  {
    id: "outro",
    title: "소중한 하루",
    subtitle: "호균이, 광삼이와 함께한 두물머리",
    description: "다음에 또 함께 오자, 친구들아",
    emoji: "💕",
    bgGradient: ["#a18cd1", "#fbc2eb"],
    bgImage: "images/outro.jpg",
    duration: 870, // 29초
  },
];

// 파티클 효과 (벚꽃)
const CherryBlossoms: React.FC<{ frame: number }> = ({ frame }) => {
  const petals = Array.from({ length: 25 }, (_, i) => {
    const startX = (i * 83) % 1920;
    const speed = 0.5 + (i % 5) * 0.2;
    const wobble = Math.sin(frame * 0.02 + i) * 30;
    const y = ((frame * speed + i * 50) % 1200) - 100;
    const x = startX + wobble;
    const rotation = frame * (1 + i % 3);
    const opacity = 0.4 + (i % 4) * 0.15;
    const size = 12 + (i % 3) * 8;

    return (
      <div
        key={i}
        style={{
          position: "absolute",
          left: x,
          top: y,
          width: size,
          height: size,
          borderRadius: "50% 0 50% 50%",
          backgroundColor: `rgba(255, 182, 193, ${opacity})`,
          transform: `rotate(${rotation}deg)`,
          filter: "blur(1px)",
        }}
      />
    );
  });

  return <>{petals}</>;
};

// 물결 효과
const WaterWaves: React.FC<{ frame: number }> = ({ frame }) => {
  return (
    <div
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: 200,
        overflow: "hidden",
      }}
    >
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            bottom: -50 + i * 30,
            left: -100,
            right: -100,
            height: 100,
            background: `rgba(255, 255, 255, ${0.05 - i * 0.01})`,
            borderRadius: "50%",
            transform: `translateX(${Math.sin(frame * 0.02 + i) * 50}px)`,
          }}
        />
      ))}
    </div>
  );
};

// 씬 컴포넌트
const Scene: React.FC<{
  scene: typeof scenes[0];
  sceneFrame: number;
  fps: number;
  isFirst?: boolean;
  isLast?: boolean;
}> = ({ scene, sceneFrame, fps, isFirst, isLast }) => {
  // 페이드 인/아웃
  const fadeIn = interpolate(sceneFrame, [0, 30], [0, 1], {
    extrapolateRight: "clamp",
  });
  const fadeOut = interpolate(
    sceneFrame,
    [scene.duration - 30, scene.duration],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const opacity = Math.min(fadeIn, fadeOut);

  // 스프링 애니메이션
  const titleSpring = spring({
    frame: sceneFrame,
    fps,
    config: { damping: 12, stiffness: 100 },
  });

  const subtitleSpring = spring({
    frame: Math.max(0, sceneFrame - 15),
    fps,
    config: { damping: 12, stiffness: 100 },
  });

  const descSpring = spring({
    frame: Math.max(0, sceneFrame - 30),
    fps,
    config: { damping: 12, stiffness: 100 },
  });

  // 이모지 애니메이션
  const emojiScale = interpolate(
    Math.sin(sceneFrame * 0.05),
    [-1, 1],
    [0.9, 1.1]
  );
  const emojiRotate = interpolate(
    Math.sin(sceneFrame * 0.03),
    [-1, 1],
    [-5, 5]
  );

  // Ken Burns 효과 (이미지 천천히 줌/패닝)
  const kenBurnsScale = interpolate(sceneFrame, [0, scene.duration], [1, 1.15], {
    extrapolateRight: "clamp",
  });
  const kenBurnsX = interpolate(sceneFrame, [0, scene.duration], [0, -3], {
    extrapolateRight: "clamp",
  });
  const kenBurnsY = interpolate(sceneFrame, [0, scene.duration], [0, -2], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ opacity }}>
      {/* 배경 이미지 */}
      {scene.bgImage && (
        <AbsoluteFill>
          <Img
            src={staticFile(scene.bgImage)}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transform: `scale(${kenBurnsScale}) translate(${kenBurnsX}%, ${kenBurnsY}%)`,
            }}
          />
          {/* 어두운 오버레이 (텍스트 가독성) */}
          <AbsoluteFill
            style={{
              background: "linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.5) 100%)",
            }}
          />
        </AbsoluteFill>
      )}
      <CherryBlossoms frame={sceneFrame} />
      <WaterWaves frame={sceneFrame} />

      {/* 메인 콘텐츠 */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
          width: "80%",
        }}
      >
        {/* 이모지 */}
        <div
          style={{
            fontSize: 120,
            marginBottom: 30,
            transform: `scale(${emojiScale}) rotate(${emojiRotate}deg)`,
            filter: "drop-shadow(0 10px 30px rgba(0,0,0,0.3))",
          }}
        >
          {scene.emoji}
        </div>

        {/* 타이틀 */}
        <div
          style={{
            fontSize: isFirst ? 80 : 72,
            fontWeight: 800,
            color: "#FFFFFF",
            textShadow: "0 4px 20px rgba(0,0,0,0.3)",
            marginBottom: 20,
            transform: `translateY(${(1 - titleSpring) * 50}px)`,
            opacity: titleSpring,
            fontFamily: "Pretendard, sans-serif",
          }}
        >
          {scene.title}
        </div>

        {/* 서브타이틀 */}
        <div
          style={{
            fontSize: 36,
            fontWeight: 500,
            color: "rgba(255,255,255,0.9)",
            textShadow: "0 2px 10px rgba(0,0,0,0.2)",
            marginBottom: 20,
            transform: `translateY(${(1 - subtitleSpring) * 30}px)`,
            opacity: subtitleSpring,
            fontFamily: "Pretendard, sans-serif",
          }}
        >
          {scene.subtitle}
        </div>

        {/* 설명 */}
        {scene.description && (
          <div
            style={{
              fontSize: 24,
              fontWeight: 400,
              color: "rgba(255,255,255,0.8)",
              textShadow: "0 2px 8px rgba(0,0,0,0.2)",
              transform: `translateY(${(1 - descSpring) * 20}px)`,
              opacity: descSpring,
              fontFamily: "Pretendard, sans-serif",
              lineHeight: 1.6,
            }}
          >
            {scene.description}
          </div>
        )}
      </div>

      {/* 하단 장식 라인 */}
      <div
        style={{
          position: "absolute",
          bottom: 80,
          left: "50%",
          transform: "translateX(-50%)",
          width: interpolate(sceneFrame, [0, 60], [0, 200], {
            extrapolateRight: "clamp",
          }),
          height: 3,
          background: "rgba(255,255,255,0.5)",
          borderRadius: 2,
        }}
      />

      {/* 씬 인디케이터 */}
      <div
        style={{
          position: "absolute",
          bottom: 40,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: 8,
        }}
      >
        {scenes.map((_, i) => {
          const currentScene = scenes.findIndex((s) => s.id === scene.id);
          return (
            <div
              key={i}
              style={{
                width: i === currentScene ? 24 : 8,
                height: 8,
                borderRadius: 4,
                backgroundColor:
                  i === currentScene
                    ? "rgba(255,255,255,0.9)"
                    : "rgba(255,255,255,0.3)",
                transition: "all 0.3s ease",
              }}
            />
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// 관광지 정보 카드 씬
const InfoCardScene: React.FC<{
  frame: number;
  fps: number;
  startFrame: number;
}> = ({ frame, fps, startFrame }) => {
  const localFrame = frame - startFrame;

  const attractions = [
    {
      name: "세미원",
      desc: "물과 꽃의 정원, 입장료 5,000원",
      icon: "🪷",
    },
    {
      name: "물래길",
      desc: "10km 힐링 산책로",
      icon: "🚶",
    },
    {
      name: "황포돛배",
      desc: "역사적 나루터 체험",
      icon: "⛵",
    },
    {
      name: "느티나무",
      desc: "400년 수령 보호수",
      icon: "🌳",
    },
  ];

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #1a1a2e, #16213e)",
      }}
    >
      <CherryBlossoms frame={localFrame} />

      <div
        style={{
          position: "absolute",
          top: 80,
          left: "50%",
          transform: "translateX(-50%)",
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: 48,
            fontWeight: 700,
            color: "#FFFFFF",
            marginBottom: 10,
            fontFamily: "Pretendard, sans-serif",
          }}
        >
          📍 주변 관광지
        </div>
        <div
          style={{
            fontSize: 24,
            color: "rgba(255,255,255,0.7)",
            fontFamily: "Pretendard, sans-serif",
          }}
        >
          두물머리에서 즐길 수 있는 명소들
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          display: "flex",
          gap: 30,
          marginTop: 40,
        }}
      >
        {attractions.map((attr, i) => {
          const delay = i * 10;
          const cardSpring = spring({
            frame: Math.max(0, localFrame - delay),
            fps,
            config: { damping: 12, stiffness: 100 },
          });

          return (
            <div
              key={i}
              style={{
                width: 200,
                padding: 30,
                background: "rgba(255,255,255,0.1)",
                backdropFilter: "blur(10px)",
                borderRadius: 20,
                border: "1px solid rgba(255,255,255,0.2)",
                textAlign: "center",
                transform: `translateY(${(1 - cardSpring) * 50}px)`,
                opacity: cardSpring,
              }}
            >
              <div style={{ fontSize: 60, marginBottom: 15 }}>{attr.icon}</div>
              <div
                style={{
                  fontSize: 24,
                  fontWeight: 600,
                  color: "#FFFFFF",
                  marginBottom: 10,
                  fontFamily: "Pretendard, sans-serif",
                }}
              >
                {attr.name}
              </div>
              <div
                style={{
                  fontSize: 14,
                  color: "rgba(255,255,255,0.7)",
                  fontFamily: "Pretendard, sans-serif",
                }}
              >
                {attr.desc}
              </div>
            </div>
          );
        })}
      </div>

      {/* 방문 정보 */}
      <div
        style={{
          position: "absolute",
          bottom: 100,
          left: "50%",
          transform: "translateX(-50%)",
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: 18,
            color: "rgba(255,255,255,0.6)",
            fontFamily: "Pretendard, sans-serif",
          }}
        >
          📍 경기도 양평군 양서면 두물머리길 145 | 🚗 서울에서 40분 | 🅿️ 무료
          주차
        </div>
      </div>
    </AbsoluteFill>
  );
};

// 메인 컴포지션
export const DumulmeoriTravel: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // 각 씬의 시작 프레임 계산
  let currentSceneIndex = 0;
  let accumulatedFrames = 0;

  for (let i = 0; i < scenes.length; i++) {
    if (frame >= accumulatedFrames && frame < accumulatedFrames + scenes[i].duration) {
      currentSceneIndex = i;
      break;
    }
    accumulatedFrames += scenes[i].duration;
  }

  // 관광지 정보 씬 삽입 위치 (세미원 씬 다음)
  const infoSceneStart = scenes.slice(0, 7).reduce((acc, s) => acc + s.duration, 0);

  return (
    <AbsoluteFill>
      {/* 각 씬 렌더링 */}
      {scenes.map((scene, index) => {
        const sceneStart = scenes.slice(0, index).reduce((acc, s) => acc + s.duration, 0);
        return (
          <Sequence key={scene.id} from={sceneStart} durationInFrames={scene.duration}>
            <Scene
              scene={scene}
              sceneFrame={frame - sceneStart}
              fps={fps}
              isFirst={index === 0}
              isLast={index === scenes.length - 1}
            />
          </Sequence>
        );
      })}

      {/* 나레이션 오디오 */}
      <Audio src={staticFile("dumulmeori_narration.mp3")} volume={0.9} />

      {/* 로고/워터마크 */}
      <div
        style={{
          position: "absolute",
          top: 30,
          right: 40,
          fontSize: 16,
          color: "rgba(255,255,255,0.5)",
          fontFamily: "Pretendard, sans-serif",
        }}
      >
        🌸 봄나들이 2026
      </div>
    </AbsoluteFill>
  );
};
