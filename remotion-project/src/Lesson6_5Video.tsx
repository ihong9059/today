import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame, interpolate, spring, useVideoConfig, Img } from 'remotion';

export const LESSON_6_5_DURATION = 19128;

const SCENE_TIMINGS = {
  scene01_intro: { start: 0, duration: 1491 },
  scene02_why: { start: 1491, duration: 1410 },
  scene03_unidirectional_limit: { start: 2901, duration: 1472 },
  scene04_solution: { start: 4373, duration: 1367 },
  scene05_structure: { start: 5740, duration: 1439 },
  scene06_hidden_states: { start: 7179, duration: 1431 },
  scene07_combine: { start: 8610, duration: 1793 },
  scene08_when_to_use: { start: 10403, duration: 1712 },
  scene09_when_not_to_use: { start: 12115, duration: 1655 },
  scene10_code: { start: 13770, duration: 1909 },
  scene11_bilstm: { start: 15679, duration: 1722 },
  scene12_outro: { start: 17401, duration: 1727 },
};

const COLORS = {
  background: '#0f172a',
  primary: '#06b6d4',
  secondary: '#0891b2',
  accent: '#22d3ee',
  light: '#ffffff',
  dark: '#164e63',
  forward: '#22c55e',
  backward: '#f97316',
  hidden: '#8b5cf6',
  combined: '#ec4899',
};

// Animation helpers
const fadeIn = (frame: number, delay = 0) =>
  interpolate(frame - delay, [0, 20], [0, 1], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });

const slideUp = (frame: number, delay = 0) =>
  interpolate(frame - delay, [0, 25], [30, 0], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });

const scaleIn = (frame: number, fps: number, delay = 0) =>
  spring({ frame: frame - delay, fps, config: { damping: 12, stiffness: 100 } });

// GlobalOverlay component
const GlobalOverlay: React.FC = () => {
  return (
    <AbsoluteFill style={{ pointerEvents: 'none', zIndex: 1000 }}>
      {/* Top-left logo */}
      <div style={{
        position: 'absolute',
        top: 30,
        left: 30,
        display: 'flex',
        alignItems: 'center',
        gap: 12,
      }}>
        <Img
          src={staticFile('images/logo.png')}
          style={{ width: 50, height: 50, borderRadius: 8 }}
        />
        <span style={{
          color: COLORS.light,
          fontSize: 24,
          fontWeight: 'bold',
          textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
        }}>
          UTTEC-Lab
        </span>
      </div>

      {/* Bottom-center education URL banner */}
      <div style={{
        position: 'absolute',
        bottom: 30,
        left: '50%',
        transform: 'translateX(-50%)',
        background: 'rgba(6, 182, 212, 0.9)',
        padding: '10px 30px',
        borderRadius: 25,
        boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
      }}>
        <span style={{
          color: COLORS.light,
          fontSize: 20,
          fontWeight: 'bold',
          letterSpacing: 1,
        }}>
          http://uttec-ai.duckdns.org
        </span>
      </div>
    </AbsoluteFill>
  );
};

// Scene 01: Introduction
const Scene01Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.background, padding: 60 }}>
      <div style={{
        opacity: fadeIn(frame),
        transform: `translateY(${slideUp(frame)}px)`,
        textAlign: 'center',
        marginBottom: 40,
      }}>
        <h1 style={{ fontSize: 72, color: COLORS.primary, marginBottom: 20 }}>
          양방향 RNN
        </h1>
        <p style={{ fontSize: 36, color: COLORS.accent }}>Bidirectional RNN (BiRNN)</p>
      </div>

      {/* Direction comparison */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: 80,
        marginTop: 60,
      }}>
        {/* Unidirectional */}
        <div style={{
          opacity: fadeIn(frame, 30),
          transform: `scale(${scaleIn(frame, fps, 30)})`,
          textAlign: 'center',
        }}>
          <div style={{
            background: 'rgba(255,255,255,0.1)',
            padding: 40,
            borderRadius: 20,
            marginBottom: 20,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 15 }}>
              {['A', 'B', 'C', 'D'].map((letter, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center' }}>
                  <div style={{
                    width: 60,
                    height: 60,
                    borderRadius: '50%',
                    background: COLORS.dark,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: COLORS.light,
                    fontSize: 24,
                    fontWeight: 'bold',
                  }}>{letter}</div>
                  {i < 3 && (
                    <div style={{
                      width: 40,
                      height: 4,
                      background: COLORS.forward,
                      marginLeft: 5,
                    }} />
                  )}
                </div>
              ))}
              <span style={{ fontSize: 30, marginLeft: 10 }}>→</span>
            </div>
          </div>
          <p style={{ color: COLORS.light, fontSize: 24 }}>단방향 RNN</p>
          <p style={{ color: '#64748b', fontSize: 18 }}>왼쪽에서 오른쪽으로만</p>
        </div>

        {/* Bidirectional */}
        <div style={{
          opacity: fadeIn(frame, 60),
          transform: `scale(${scaleIn(frame, fps, 60)})`,
          textAlign: 'center',
        }}>
          <div style={{
            background: 'rgba(6, 182, 212, 0.2)',
            padding: 40,
            borderRadius: 20,
            border: `3px solid ${COLORS.primary}`,
            marginBottom: 20,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 15 }}>
              {['A', 'B', 'C', 'D'].map((letter, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center' }}>
                  <div style={{
                    width: 60,
                    height: 60,
                    borderRadius: '50%',
                    background: `linear-gradient(135deg, ${COLORS.forward}, ${COLORS.backward})`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: COLORS.light,
                    fontSize: 24,
                    fontWeight: 'bold',
                  }}>{letter}</div>
                  {i < 3 && (
                    <div style={{
                      width: 40,
                      height: 8,
                      background: `linear-gradient(90deg, ${COLORS.forward}, ${COLORS.backward})`,
                      marginLeft: 5,
                      borderRadius: 4,
                    }} />
                  )}
                </div>
              ))}
              <span style={{ fontSize: 30, marginLeft: 10 }}>↔</span>
            </div>
          </div>
          <p style={{ color: COLORS.primary, fontSize: 24, fontWeight: 'bold' }}>양방향 RNN</p>
          <p style={{ color: COLORS.accent, fontSize: 18 }}>양쪽 방향 모두!</p>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Scene 02: Why Bidirectional
const Scene02Why: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fillProgress = interpolate(frame, [90, 120], [0, 1], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.background, padding: 60 }}>
      <h2 style={{
        fontSize: 56,
        color: COLORS.primary,
        textAlign: 'center',
        marginBottom: 40,
        opacity: fadeIn(frame),
      }}>
        왜 양방향이 필요할까요?
      </h2>

      {/* Fill in the blank example */}
      <div style={{
        opacity: fadeIn(frame, 20),
        background: 'rgba(255,255,255,0.05)',
        padding: 40,
        borderRadius: 20,
        marginBottom: 40,
      }}>
        <p style={{ fontSize: 36, color: COLORS.light, textAlign: 'center' }}>
          "나는 어제{' '}
          <span style={{
            display: 'inline-block',
            width: fillProgress > 0.5 ? 'auto' : 120,
            height: 40,
            borderBottom: `3px solid ${COLORS.accent}`,
            background: fillProgress > 0.5 ? COLORS.forward : 'transparent',
            borderRadius: fillProgress > 0.5 ? 8 : 0,
            padding: fillProgress > 0.5 ? '5px 15px' : 0,
            color: COLORS.light,
          }}>
            {fillProgress > 0.5 ? '레스토랑' : ''}
          </span>
          {' '}에서 맛있는 파스타를 먹었다."
        </p>
      </div>

      {/* Context arrows */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 100, marginTop: 40 }}>
        <div style={{
          opacity: fadeIn(frame, 40),
          transform: `scale(${scaleIn(frame, fps, 40)})`,
          textAlign: 'center',
        }}>
          <div style={{
            width: 200,
            padding: 25,
            background: COLORS.forward,
            borderRadius: 15,
            marginBottom: 15,
          }}>
            <p style={{ color: COLORS.light, fontSize: 28, fontWeight: 'bold' }}>앞쪽 정보</p>
            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 20 }}>"나는 어제"</p>
          </div>
          <p style={{ fontSize: 40, color: COLORS.forward }}>→</p>
        </div>

        <div style={{
          opacity: fadeIn(frame, 60),
          transform: `scale(${scaleIn(frame, fps, 60)})`,
          textAlign: 'center',
        }}>
          <div style={{
            width: 200,
            padding: 25,
            background: COLORS.backward,
            borderRadius: 15,
            marginBottom: 15,
          }}>
            <p style={{ color: COLORS.light, fontSize: 28, fontWeight: 'bold' }}>뒤쪽 정보</p>
            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 20 }}>"파스타를 먹었다"</p>
          </div>
          <p style={{ fontSize: 40, color: COLORS.backward }}>←</p>
        </div>
      </div>

      <div style={{
        opacity: fadeIn(frame, 90),
        textAlign: 'center',
        marginTop: 40,
      }}>
        <p style={{ fontSize: 32, color: COLORS.combined, fontWeight: 'bold' }}>
          앞뒤 정보를 모두 봐야 정확한 답을 알 수 있어요!
        </p>
      </div>
    </AbsoluteFill>
  );
};

// Scene 03: Unidirectional Limitation
const Scene03UnidirectionalLimit: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.background, padding: 60 }}>
      <h2 style={{
        fontSize: 52,
        color: COLORS.primary,
        textAlign: 'center',
        marginBottom: 50,
        opacity: fadeIn(frame),
      }}>
        단방향의 한계
      </h2>

      {/* Apple example 1 */}
      <div style={{
        opacity: fadeIn(frame, 20),
        display: 'flex',
        gap: 40,
        marginBottom: 40,
      }}>
        <div style={{
          flex: 1,
          background: 'rgba(255,255,255,0.05)',
          padding: 30,
          borderRadius: 15,
        }}>
          <p style={{ fontSize: 32, color: COLORS.light, marginBottom: 20 }}>
            "그는 <span style={{ color: COLORS.accent, fontWeight: 'bold' }}>apple</span>을 먹었다."
          </p>
          <div style={{
            opacity: fadeIn(frame, 50),
            display: 'flex',
            alignItems: 'center',
            gap: 15,
          }}>
            <span style={{ fontSize: 50 }}>🍎</span>
            <span style={{ fontSize: 28, color: COLORS.forward }}>과일 사과!</span>
          </div>
        </div>

        <div style={{
          flex: 1,
          background: 'rgba(255,255,255,0.05)',
          padding: 30,
          borderRadius: 15,
        }}>
          <p style={{ fontSize: 32, color: COLORS.light, marginBottom: 20 }}>
            "그는 <span style={{ color: COLORS.accent, fontWeight: 'bold' }}>apple</span> 주식을 샀다."
          </p>
          <div style={{
            opacity: fadeIn(frame, 70),
            display: 'flex',
            alignItems: 'center',
            gap: 15,
          }}>
            <span style={{ fontSize: 50 }}>📱</span>
            <span style={{ fontSize: 28, color: COLORS.backward }}>회사 애플!</span>
          </div>
        </div>
      </div>

      {/* Key insight */}
      <div style={{
        opacity: fadeIn(frame, 90),
        transform: `scale(${scaleIn(frame, fps, 90)})`,
        background: `linear-gradient(135deg, ${COLORS.dark}, rgba(6, 182, 212, 0.3))`,
        padding: 40,
        borderRadius: 20,
        textAlign: 'center',
      }}>
        <p style={{ fontSize: 36, color: COLORS.light, marginBottom: 15 }}>
          같은 단어도 <span style={{ color: COLORS.combined }}>뒤에 뭐가 오느냐</span>에 따라
        </p>
        <p style={{ fontSize: 36, color: COLORS.primary, fontWeight: 'bold' }}>
          의미가 완전히 달라질 수 있어요!
        </p>
      </div>
    </AbsoluteFill>
  );
};

// Scene 04: Solution
const Scene04Solution: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.background, padding: 60 }}>
      <h2 style={{
        fontSize: 56,
        color: COLORS.primary,
        textAlign: 'center',
        marginBottom: 50,
        opacity: fadeIn(frame),
      }}>
        양방향 RNN의 아이디어
      </h2>

      <div style={{
        display: 'flex',
        gap: 40,
        justifyContent: 'center',
        marginBottom: 50,
      }}>
        {/* Forward RNN */}
        <div style={{
          opacity: fadeIn(frame, 20),
          transform: `scale(${scaleIn(frame, fps, 20)})`,
          background: COLORS.forward,
          padding: 30,
          borderRadius: 20,
          textAlign: 'center',
          width: 350,
        }}>
          <p style={{ fontSize: 32, color: COLORS.light, fontWeight: 'bold', marginBottom: 15 }}>
            정방향 RNN
          </p>
          <p style={{ fontSize: 24, color: 'rgba(255,255,255,0.9)' }}>Forward RNN</p>
          <div style={{ fontSize: 60, marginTop: 20 }}>→</div>
          <p style={{ fontSize: 22, color: 'rgba(255,255,255,0.8)' }}>앞에서 뒤로</p>
        </div>

        {/* Plus sign */}
        <div style={{
          opacity: fadeIn(frame, 40),
          display: 'flex',
          alignItems: 'center',
          fontSize: 60,
          color: COLORS.primary,
        }}>+</div>

        {/* Backward RNN */}
        <div style={{
          opacity: fadeIn(frame, 50),
          transform: `scale(${scaleIn(frame, fps, 50)})`,
          background: COLORS.backward,
          padding: 30,
          borderRadius: 20,
          textAlign: 'center',
          width: 350,
        }}>
          <p style={{ fontSize: 32, color: COLORS.light, fontWeight: 'bold', marginBottom: 15 }}>
            역방향 RNN
          </p>
          <p style={{ fontSize: 24, color: 'rgba(255,255,255,0.9)' }}>Backward RNN</p>
          <div style={{ fontSize: 60, marginTop: 20 }}>←</div>
          <p style={{ fontSize: 22, color: 'rgba(255,255,255,0.8)' }}>뒤에서 앞으로</p>
        </div>
      </div>

      {/* Result */}
      <div style={{
        opacity: fadeIn(frame, 80),
        transform: `scale(${scaleIn(frame, fps, 80)})`,
        background: `linear-gradient(135deg, ${COLORS.forward}, ${COLORS.backward})`,
        padding: 40,
        borderRadius: 20,
        textAlign: 'center',
      }}>
        <p style={{ fontSize: 36, color: COLORS.light, fontWeight: 'bold' }}>
          두 결과를 합쳐서 앞뒤 문맥을 전부 활용!
        </p>
      </div>
    </AbsoluteFill>
  );
};

// Scene 05: Structure
const Scene05Structure: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const words = ['나는', '오늘', '학교에', '갔다'];
  const forwardProgress = interpolate(frame, [30, 90], [0, 4], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });
  const backwardProgress = interpolate(frame, [60, 120], [0, 4], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.background, padding: 60 }}>
      <h2 style={{
        fontSize: 52,
        color: COLORS.primary,
        textAlign: 'center',
        marginBottom: 40,
        opacity: fadeIn(frame),
      }}>
        양방향 RNN 구조
      </h2>

      {/* Word sequence */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: 50,
        marginBottom: 40,
      }}>
        {words.map((word, i) => (
          <div key={i} style={{
            opacity: fadeIn(frame, 10 + i * 10),
            textAlign: 'center',
          }}>
            <div style={{
              width: 120,
              height: 60,
              background: 'rgba(255,255,255,0.1)',
              borderRadius: 10,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 28,
              color: COLORS.light,
              marginBottom: 15,
            }}>{word}</div>
          </div>
        ))}
      </div>

      {/* Forward direction */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: 50,
        marginBottom: 20,
      }}>
        {words.map((_, i) => (
          <div key={i} style={{
            width: 120,
            height: 50,
            borderRadius: 10,
            background: forwardProgress > i ? COLORS.forward : 'rgba(34, 197, 94, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background 0.3s',
          }}>
            <span style={{ fontSize: 30, color: COLORS.light }}>→</span>
          </div>
        ))}
      </div>
      <p style={{
        textAlign: 'center',
        fontSize: 24,
        color: COLORS.forward,
        marginBottom: 30,
      }}>정방향: 앞에서 뒤로</p>

      {/* Backward direction */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: 50,
        marginBottom: 20,
      }}>
        {words.map((_, i) => {
          const reverseIndex = 3 - i;
          return (
            <div key={i} style={{
              width: 120,
              height: 50,
              borderRadius: 10,
              background: backwardProgress > reverseIndex ? COLORS.backward : 'rgba(249, 115, 22, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background 0.3s',
            }}>
              <span style={{ fontSize: 30, color: COLORS.light }}>←</span>
            </div>
          );
        })}
      </div>
      <p style={{
        textAlign: 'center',
        fontSize: 24,
        color: COLORS.backward,
      }}>역방향: 뒤에서 앞으로</p>
    </AbsoluteFill>
  );
};

// Scene 06: Hidden States
const Scene06HiddenStates: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.background, padding: 60 }}>
      <h2 style={{
        fontSize: 52,
        color: COLORS.primary,
        textAlign: 'center',
        marginBottom: 40,
        opacity: fadeIn(frame),
      }}>
        각 위치의 은닉 상태
      </h2>

      {/* Example position: "학교에" */}
      <div style={{
        opacity: fadeIn(frame, 20),
        textAlign: 'center',
        marginBottom: 40,
      }}>
        <p style={{ fontSize: 28, color: COLORS.light }}>
          예시: "<span style={{ color: COLORS.accent, fontWeight: 'bold' }}>학교에</span>" 위치
        </p>
      </div>

      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: 60,
      }}>
        {/* Forward hidden state */}
        <div style={{
          opacity: fadeIn(frame, 40),
          transform: `scale(${scaleIn(frame, fps, 40)})`,
          background: COLORS.forward,
          padding: 30,
          borderRadius: 20,
          width: 350,
          textAlign: 'center',
        }}>
          <p style={{ fontSize: 28, color: COLORS.light, fontWeight: 'bold', marginBottom: 20 }}>
            정방향 은닉 상태
          </p>
          <div style={{
            background: 'rgba(255,255,255,0.2)',
            padding: 20,
            borderRadius: 10,
          }}>
            <p style={{ fontSize: 22, color: COLORS.light }}>
              "나는", "오늘"을 읽은 정보
            </p>
            <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.7)', marginTop: 10 }}>
              앞에서 온 문맥
            </p>
          </div>
        </div>

        {/* Plus */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          opacity: fadeIn(frame, 60),
        }}>
          <span style={{ fontSize: 50, color: COLORS.primary }}>+</span>
        </div>

        {/* Backward hidden state */}
        <div style={{
          opacity: fadeIn(frame, 70),
          transform: `scale(${scaleIn(frame, fps, 70)})`,
          background: COLORS.backward,
          padding: 30,
          borderRadius: 20,
          width: 350,
          textAlign: 'center',
        }}>
          <p style={{ fontSize: 28, color: COLORS.light, fontWeight: 'bold', marginBottom: 20 }}>
            역방향 은닉 상태
          </p>
          <div style={{
            background: 'rgba(255,255,255,0.2)',
            padding: 20,
            borderRadius: 10,
          }}>
            <p style={{ fontSize: 22, color: COLORS.light }}>
              "갔다"를 읽은 정보
            </p>
            <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.7)', marginTop: 10 }}>
              뒤에서 온 문맥
            </p>
          </div>
        </div>
      </div>

      {/* Combined result */}
      <div style={{
        opacity: fadeIn(frame, 100),
        marginTop: 40,
        textAlign: 'center',
      }}>
        <div style={{
          display: 'inline-block',
          background: COLORS.combined,
          padding: '20px 50px',
          borderRadius: 20,
        }}>
          <p style={{ fontSize: 28, color: COLORS.light, fontWeight: 'bold' }}>
            문장 전체 맥락 이해!
          </p>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Scene 07: Combining Methods
const Scene07Combine: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const methods = [
    { name: 'Concatenation (연결)', desc: '그냥 이어붙이기', result: '256 + 256 = 512', popular: true },
    { name: 'Addition (더하기)', desc: '두 벡터를 더하기', result: '256 차원 유지', popular: false },
    { name: 'Average (평균)', desc: '두 벡터의 평균', result: '256 차원 유지', popular: false },
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.background, padding: 60 }}>
      <h2 style={{
        fontSize: 52,
        color: COLORS.primary,
        textAlign: 'center',
        marginBottom: 50,
        opacity: fadeIn(frame),
      }}>
        은닉 상태 결합 방법
      </h2>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 30,
        maxWidth: 900,
        margin: '0 auto',
      }}>
        {methods.map((method, i) => (
          <div key={i} style={{
            opacity: fadeIn(frame, 20 + i * 25),
            transform: `translateX(${interpolate(frame - (20 + i * 25), [0, 20], [-50, 0], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' })}px)`,
            background: method.popular ? `linear-gradient(90deg, ${COLORS.primary}, ${COLORS.secondary})` : 'rgba(255,255,255,0.1)',
            padding: 30,
            borderRadius: 15,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            border: method.popular ? 'none' : '1px solid rgba(255,255,255,0.2)',
          }}>
            <div>
              <p style={{ fontSize: 28, color: COLORS.light, fontWeight: 'bold', marginBottom: 5 }}>
                {method.name}
              </p>
              <p style={{ fontSize: 20, color: 'rgba(255,255,255,0.7)' }}>{method.desc}</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p style={{ fontSize: 24, color: method.popular ? COLORS.light : COLORS.accent }}>
                {method.result}
              </p>
              {method.popular && (
                <span style={{
                  background: 'rgba(255,255,255,0.3)',
                  padding: '5px 15px',
                  borderRadius: 20,
                  fontSize: 16,
                  color: COLORS.light,
                }}>
                  가장 많이 사용!
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};

// Scene 08: When to Use
const Scene08WhenToUse: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const useCases = [
    { icon: '🏷️', name: '품사 태깅', desc: '각 단어의 품사 판단' },
    { icon: '👤', name: '개체명 인식', desc: '사람/장소/조직 구분' },
    { icon: '😊', name: '감성 분석', desc: '긍정/부정 판단' },
    { icon: '🌐', name: '기계 번역', desc: '입력 문장 이해' },
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.background, padding: 60 }}>
      <h2 style={{
        fontSize: 52,
        color: COLORS.primary,
        textAlign: 'center',
        marginBottom: 20,
        opacity: fadeIn(frame),
      }}>
        언제 사용할까요?
      </h2>
      <p style={{
        fontSize: 28,
        color: COLORS.accent,
        textAlign: 'center',
        marginBottom: 50,
        opacity: fadeIn(frame, 10),
      }}>
        전체 문장이 주어진 작업에 적합!
      </p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: 30,
        maxWidth: 900,
        margin: '0 auto',
      }}>
        {useCases.map((useCase, i) => (
          <div key={i} style={{
            opacity: fadeIn(frame, 30 + i * 20),
            transform: `scale(${scaleIn(frame, fps, 30 + i * 20)})`,
            background: 'rgba(6, 182, 212, 0.2)',
            border: `2px solid ${COLORS.primary}`,
            padding: 30,
            borderRadius: 20,
            display: 'flex',
            alignItems: 'center',
            gap: 20,
          }}>
            <span style={{ fontSize: 50 }}>{useCase.icon}</span>
            <div>
              <p style={{ fontSize: 28, color: COLORS.light, fontWeight: 'bold' }}>
                {useCase.name}
              </p>
              <p style={{ fontSize: 20, color: COLORS.accent }}>{useCase.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};

// Scene 09: When NOT to Use
const Scene09WhenNotToUse: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const notUseCases = [
    { icon: '🎤', name: '실시간 음성 인식', reason: '아직 안 한 말은 볼 수 없음' },
    { icon: '💬', name: '문장 생성', reason: '다음 단어는 아직 모름' },
    { icon: '📈', name: '시계열 예측', reason: '미래 데이터 없음' },
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.background, padding: 60 }}>
      <h2 style={{
        fontSize: 52,
        color: '#ef4444',
        textAlign: 'center',
        marginBottom: 20,
        opacity: fadeIn(frame),
      }}>
        언제 사용하면 안 될까요?
      </h2>
      <p style={{
        fontSize: 28,
        color: '#fca5a5',
        textAlign: 'center',
        marginBottom: 50,
        opacity: fadeIn(frame, 10),
      }}>
        미래를 볼 수 없는 작업!
      </p>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 25,
        maxWidth: 800,
        margin: '0 auto',
      }}>
        {notUseCases.map((notCase, i) => (
          <div key={i} style={{
            opacity: fadeIn(frame, 30 + i * 25),
            background: 'rgba(239, 68, 68, 0.2)',
            border: '2px solid #ef4444',
            padding: 25,
            borderRadius: 15,
            display: 'flex',
            alignItems: 'center',
            gap: 25,
          }}>
            <span style={{ fontSize: 45 }}>{notCase.icon}</span>
            <div>
              <p style={{ fontSize: 26, color: COLORS.light, fontWeight: 'bold' }}>
                {notCase.name}
              </p>
              <p style={{ fontSize: 20, color: '#fca5a5' }}>{notCase.reason}</p>
            </div>
            <span style={{ fontSize: 40, marginLeft: 'auto' }}>❌</span>
          </div>
        ))}
      </div>

      <div style={{
        opacity: fadeIn(frame, 110),
        marginTop: 40,
        textAlign: 'center',
        background: 'rgba(255,255,255,0.1)',
        padding: 20,
        borderRadius: 15,
      }}>
        <p style={{ fontSize: 26, color: COLORS.light }}>
          미래를 볼 수 있다 → <span style={{ color: COLORS.forward }}>양방향 OK</span>
        </p>
        <p style={{ fontSize: 26, color: COLORS.light, marginTop: 10 }}>
          미래를 볼 수 없다 → <span style={{ color: '#ef4444' }}>단방향만</span>
        </p>
      </div>
    </AbsoluteFill>
  );
};

// Scene 10: Code
const Scene10Code: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.background, padding: 60 }}>
      <h2 style={{
        fontSize: 52,
        color: COLORS.primary,
        textAlign: 'center',
        marginBottom: 40,
        opacity: fadeIn(frame),
      }}>
        PyTorch 구현
      </h2>

      <div style={{
        opacity: fadeIn(frame, 20),
        background: '#1e293b',
        padding: 40,
        borderRadius: 20,
        fontFamily: 'monospace',
        fontSize: 22,
        lineHeight: 1.8,
      }}>
        <pre style={{ color: COLORS.light, margin: 0 }}>
          <span style={{ color: '#94a3b8' }}>import</span> torch.nn <span style={{ color: '#94a3b8' }}>as</span> nn{'\n\n'}
          <span style={{ color: '#94a3b8' }}># 양방향 LSTM 생성</span>{'\n'}
          lstm = nn.LSTM({'\n'}
          {'    '}input_size=<span style={{ color: COLORS.accent }}>100</span>,{'\n'}
          {'    '}hidden_size=<span style={{ color: COLORS.accent }}>256</span>,{'\n'}
          {'    '}num_layers=<span style={{ color: COLORS.accent }}>2</span>,{'\n'}
          {'    '}<span style={{ color: COLORS.forward, fontWeight: 'bold' }}>bidirectional=True</span>  <span style={{ color: '#94a3b8' }}># 이것만 추가!</span>{'\n'}
          ){'\n\n'}
          <span style={{ color: '#94a3b8' }}># 출력 크기: 256 x 2 = 512</span>
        </pre>
      </div>

      <div style={{
        opacity: fadeIn(frame, 60),
        marginTop: 30,
        display: 'flex',
        justifyContent: 'center',
        gap: 30,
      }}>
        <div style={{
          background: 'rgba(255,255,255,0.1)',
          padding: 20,
          borderRadius: 15,
          textAlign: 'center',
        }}>
          <p style={{ fontSize: 24, color: COLORS.light }}>단방향 출력</p>
          <p style={{ fontSize: 32, color: COLORS.accent }}>256</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', fontSize: 40, color: COLORS.primary }}>→</div>
        <div style={{
          background: COLORS.primary,
          padding: 20,
          borderRadius: 15,
          textAlign: 'center',
        }}>
          <p style={{ fontSize: 24, color: COLORS.light }}>양방향 출력</p>
          <p style={{ fontSize: 32, color: COLORS.light, fontWeight: 'bold' }}>512</p>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Scene 11: BiLSTM
const Scene11BiLSTM: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.background, padding: 60 }}>
      <h2 style={{
        fontSize: 52,
        color: COLORS.primary,
        textAlign: 'center',
        marginBottom: 50,
        opacity: fadeIn(frame),
      }}>
        BiLSTM & BiGRU
      </h2>

      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: 50,
      }}>
        {/* BiLSTM */}
        <div style={{
          opacity: fadeIn(frame, 20),
          transform: `scale(${scaleIn(frame, fps, 20)})`,
          background: `linear-gradient(135deg, ${COLORS.forward}, ${COLORS.primary})`,
          padding: 40,
          borderRadius: 25,
          width: 400,
          textAlign: 'center',
        }}>
          <p style={{ fontSize: 36, color: COLORS.light, fontWeight: 'bold', marginBottom: 20 }}>
            BiLSTM
          </p>
          <p style={{ fontSize: 24, color: 'rgba(255,255,255,0.9)', marginBottom: 25 }}>
            양방향 LSTM
          </p>
          <div style={{
            background: 'rgba(255,255,255,0.2)',
            padding: 20,
            borderRadius: 15,
          }}>
            <p style={{ fontSize: 20, color: COLORS.light }}>
              ✓ 장기 기억 유지
            </p>
            <p style={{ fontSize: 20, color: COLORS.light }}>
              ✓ 양방향 문맥
            </p>
            <p style={{ fontSize: 20, color: COLORS.light }}>
              ✓ 가장 널리 사용
            </p>
          </div>
        </div>

        {/* BiGRU */}
        <div style={{
          opacity: fadeIn(frame, 50),
          transform: `scale(${scaleIn(frame, fps, 50)})`,
          background: `linear-gradient(135deg, ${COLORS.backward}, ${COLORS.hidden})`,
          padding: 40,
          borderRadius: 25,
          width: 400,
          textAlign: 'center',
        }}>
          <p style={{ fontSize: 36, color: COLORS.light, fontWeight: 'bold', marginBottom: 20 }}>
            BiGRU
          </p>
          <p style={{ fontSize: 24, color: 'rgba(255,255,255,0.9)', marginBottom: 25 }}>
            양방향 GRU
          </p>
          <div style={{
            background: 'rgba(255,255,255,0.2)',
            padding: 20,
            borderRadius: 15,
          }}>
            <p style={{ fontSize: 20, color: COLORS.light }}>
              ✓ 더 빠른 학습
            </p>
            <p style={{ fontSize: 20, color: COLORS.light }}>
              ✓ 적은 파라미터
            </p>
            <p style={{ fontSize: 20, color: COLORS.light }}>
              ✓ 효율적 선택
            </p>
          </div>
        </div>
      </div>

      <div style={{
        opacity: fadeIn(frame, 90),
        marginTop: 50,
        textAlign: 'center',
      }}>
        <p style={{ fontSize: 28, color: COLORS.accent }}>
          BERT 이전 시대, 자연어 처리의 표준이었습니다!
        </p>
      </div>
    </AbsoluteFill>
  );
};

// Scene 12: Outro
const Scene12Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const points = [
    '두 개의 RNN: 정방향 + 역방향',
    '각 위치에서 앞뒤 문맥 모두 활용',
    '연결(Concatenation)로 결과 합치기',
    '품사 태깅, 감성 분석 등에 효과적',
    'bidirectional=True로 쉽게 구현',
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.background, padding: 60 }}>
      <h2 style={{
        fontSize: 56,
        color: COLORS.primary,
        textAlign: 'center',
        marginBottom: 50,
        opacity: fadeIn(frame),
      }}>
        정리
      </h2>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
        maxWidth: 800,
        margin: '0 auto',
      }}>
        {points.map((point, i) => (
          <div key={i} style={{
            opacity: fadeIn(frame, 20 + i * 15),
            transform: `translateX(${interpolate(frame - (20 + i * 15), [0, 15], [-30, 0], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' })}px)`,
            display: 'flex',
            alignItems: 'center',
            gap: 20,
          }}>
            <div style={{
              width: 40,
              height: 40,
              borderRadius: '50%',
              background: COLORS.primary,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: COLORS.light,
              fontSize: 20,
              fontWeight: 'bold',
            }}>{i + 1}</div>
            <p style={{ fontSize: 26, color: COLORS.light }}>{point}</p>
          </div>
        ))}
      </div>

      <div style={{
        opacity: fadeIn(frame, 100),
        transform: `scale(${scaleIn(frame, fps, 100)})`,
        marginTop: 50,
        textAlign: 'center',
      }}>
        <p style={{ fontSize: 32, color: COLORS.accent, marginBottom: 20 }}>
          다음 레슨: Seq2Seq 모델
        </p>
        <p style={{ fontSize: 48, color: COLORS.primary }}>감사합니다! 🎉</p>
      </div>
    </AbsoluteFill>
  );
};

// Main component
export const Lesson6_5Video: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.background }}>
      {/* Audio tracks */}
      {Object.entries(SCENE_TIMINGS).map(([key, timing]) => (
        <Sequence key={key} from={timing.start} durationInFrames={timing.duration}>
          <Audio src={staticFile(`audio/lesson-6-5/${key}.mp3`)} />
        </Sequence>
      ))}

      {/* Scene sequences */}
      <Sequence from={SCENE_TIMINGS.scene01_intro.start} durationInFrames={SCENE_TIMINGS.scene01_intro.duration}>
        <Scene01Intro />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene02_why.start} durationInFrames={SCENE_TIMINGS.scene02_why.duration}>
        <Scene02Why />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene03_unidirectional_limit.start} durationInFrames={SCENE_TIMINGS.scene03_unidirectional_limit.duration}>
        <Scene03UnidirectionalLimit />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene04_solution.start} durationInFrames={SCENE_TIMINGS.scene04_solution.duration}>
        <Scene04Solution />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene05_structure.start} durationInFrames={SCENE_TIMINGS.scene05_structure.duration}>
        <Scene05Structure />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene06_hidden_states.start} durationInFrames={SCENE_TIMINGS.scene06_hidden_states.duration}>
        <Scene06HiddenStates />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene07_combine.start} durationInFrames={SCENE_TIMINGS.scene07_combine.duration}>
        <Scene07Combine />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene08_when_to_use.start} durationInFrames={SCENE_TIMINGS.scene08_when_to_use.duration}>
        <Scene08WhenToUse />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene09_when_not_to_use.start} durationInFrames={SCENE_TIMINGS.scene09_when_not_to_use.duration}>
        <Scene09WhenNotToUse />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene10_code.start} durationInFrames={SCENE_TIMINGS.scene10_code.duration}>
        <Scene10Code />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene11_bilstm.start} durationInFrames={SCENE_TIMINGS.scene11_bilstm.duration}>
        <Scene11BiLSTM />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene12_outro.start} durationInFrames={SCENE_TIMINGS.scene12_outro.duration}>
        <Scene12Outro />
      </Sequence>

      {/* Global overlay */}
      <GlobalOverlay />
    </AbsoluteFill>
  );
};
