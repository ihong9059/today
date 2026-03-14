import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame, interpolate, spring, useVideoConfig, Img } from 'remotion';

export const LESSON_6_6_DURATION = 18481;

const SCENE_TIMINGS = {
  scene01_intro: { start: 0, duration: 1441 },
  scene02_analogy: { start: 1441, duration: 1237 },
  scene03_structure: { start: 2678, duration: 1331 },
  scene04_encoder: { start: 4009, duration: 1509 },
  scene05_decoder: { start: 5518, duration: 1607 },
  scene06_teacher_forcing: { start: 7125, duration: 1560 },
  scene07_example: { start: 8685, duration: 1655 },
  scene08_problem: { start: 10340, duration: 1665 },
  scene09_attention: { start: 12005, duration: 1516 },
  scene10_applications: { start: 13521, duration: 1650 },
  scene11_code: { start: 15171, duration: 1681 },
  scene12_outro: { start: 16852, duration: 1629 },
};

const COLORS = {
  background: '#0f172a',
  primary: '#06b6d4',
  secondary: '#0891b2',
  accent: '#22d3ee',
  light: '#ffffff',
  dark: '#164e63',
  encoder: '#22c55e',
  decoder: '#f97316',
  context: '#8b5cf6',
  problem: '#ef4444',
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
          Seq2Seq 모델
        </h1>
        <p style={{ fontSize: 36, color: COLORS.accent }}>Sequence to Sequence</p>
      </div>

      {/* Input to Output visualization */}
      <div style={{
        opacity: fadeIn(frame, 30),
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 40,
        marginTop: 60,
      }}>
        <div style={{
          transform: `scale(${scaleIn(frame, fps, 30)})`,
          background: 'rgba(255,255,255,0.1)',
          padding: 30,
          borderRadius: 20,
          textAlign: 'center',
        }}>
          <p style={{ fontSize: 32, color: COLORS.light, marginBottom: 15 }}>입력</p>
          <p style={{ fontSize: 28, color: COLORS.accent }}>"안녕하세요"</p>
        </div>

        <div style={{
          opacity: fadeIn(frame, 50),
          fontSize: 50,
          color: COLORS.primary,
        }}>→</div>

        <div style={{
          transform: `scale(${scaleIn(frame, fps, 50)})`,
          background: COLORS.context,
          padding: 30,
          borderRadius: 20,
          textAlign: 'center',
        }}>
          <p style={{ fontSize: 28, color: COLORS.light, fontWeight: 'bold' }}>Seq2Seq</p>
        </div>

        <div style={{
          opacity: fadeIn(frame, 70),
          fontSize: 50,
          color: COLORS.primary,
        }}>→</div>

        <div style={{
          transform: `scale(${scaleIn(frame, fps, 70)})`,
          background: 'rgba(255,255,255,0.1)',
          padding: 30,
          borderRadius: 20,
          textAlign: 'center',
        }}>
          <p style={{ fontSize: 32, color: COLORS.light, marginBottom: 15 }}>출력</p>
          <p style={{ fontSize: 28, color: COLORS.accent }}>"Hello"</p>
        </div>
      </div>

      <div style={{
        opacity: fadeIn(frame, 90),
        textAlign: 'center',
        marginTop: 50,
      }}>
        <p style={{ fontSize: 28, color: '#94a3b8' }}>
          입력과 출력 길이가 달라도 OK!
        </p>
      </div>
    </AbsoluteFill>
  );
};

// Scene 02: Analogy
const Scene02Analogy: React.FC = () => {
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
        통역사처럼 작동해요!
      </h2>

      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 50,
      }}>
        {/* Korean speaker */}
        <div style={{
          opacity: fadeIn(frame, 20),
          textAlign: 'center',
        }}>
          <span style={{ fontSize: 80 }}>🗣️</span>
          <div style={{
            background: 'rgba(255,255,255,0.1)',
            padding: 20,
            borderRadius: 15,
            marginTop: 15,
          }}>
            <p style={{ fontSize: 24, color: COLORS.light }}>"나는 학교에 갔다"</p>
          </div>
        </div>

        {/* Interpreter */}
        <div style={{
          opacity: fadeIn(frame, 40),
          transform: `scale(${scaleIn(frame, fps, 40)})`,
          textAlign: 'center',
        }}>
          <div style={{
            background: `linear-gradient(135deg, ${COLORS.encoder}, ${COLORS.decoder})`,
            padding: 40,
            borderRadius: 25,
          }}>
            <span style={{ fontSize: 60 }}>👨‍💼</span>
            <p style={{ fontSize: 24, color: COLORS.light, marginTop: 10 }}>통역사</p>
          </div>
          <div style={{
            opacity: fadeIn(frame, 60),
            marginTop: 15,
            fontSize: 20,
            color: '#94a3b8',
          }}>
            <p>1. 전체 듣기</p>
            <p>2. 이해하기</p>
            <p>3. 번역하기</p>
          </div>
        </div>

        {/* English output */}
        <div style={{
          opacity: fadeIn(frame, 70),
          textAlign: 'center',
        }}>
          <span style={{ fontSize: 80 }}>💬</span>
          <div style={{
            background: 'rgba(255,255,255,0.1)',
            padding: 20,
            borderRadius: 15,
            marginTop: 15,
          }}>
            <p style={{ fontSize: 24, color: COLORS.accent }}>"I went to school"</p>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Scene 03: Structure
const Scene03Structure: React.FC = () => {
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
        Seq2Seq 기본 구조
      </h2>

      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 40,
      }}>
        {/* Encoder */}
        <div style={{
          opacity: fadeIn(frame, 20),
          transform: `scale(${scaleIn(frame, fps, 20)})`,
          background: COLORS.encoder,
          padding: 40,
          borderRadius: 25,
          textAlign: 'center',
          width: 280,
        }}>
          <p style={{ fontSize: 36, color: COLORS.light, fontWeight: 'bold', marginBottom: 15 }}>
            Encoder
          </p>
          <p style={{ fontSize: 22, color: 'rgba(255,255,255,0.9)' }}>인코더</p>
          <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.7)', marginTop: 15 }}>
            입력을 이해하고 압축
          </p>
        </div>

        {/* Context Vector */}
        <div style={{
          opacity: fadeIn(frame, 50),
        }}>
          <div style={{ fontSize: 40, color: COLORS.primary, marginBottom: 10, textAlign: 'center' }}>→</div>
          <div style={{
            transform: `scale(${scaleIn(frame, fps, 50)})`,
            background: COLORS.context,
            padding: 25,
            borderRadius: 50,
            textAlign: 'center',
          }}>
            <p style={{ fontSize: 20, color: COLORS.light, fontWeight: 'bold' }}>Context</p>
            <p style={{ fontSize: 16, color: COLORS.light }}>Vector</p>
          </div>
          <div style={{ fontSize: 40, color: COLORS.primary, marginTop: 10, textAlign: 'center' }}>→</div>
        </div>

        {/* Decoder */}
        <div style={{
          opacity: fadeIn(frame, 70),
          transform: `scale(${scaleIn(frame, fps, 70)})`,
          background: COLORS.decoder,
          padding: 40,
          borderRadius: 25,
          textAlign: 'center',
          width: 280,
        }}>
          <p style={{ fontSize: 36, color: COLORS.light, fontWeight: 'bold', marginBottom: 15 }}>
            Decoder
          </p>
          <p style={{ fontSize: 22, color: 'rgba(255,255,255,0.9)' }}>디코더</p>
          <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.7)', marginTop: 15 }}>
            출력 시퀀스 생성
          </p>
        </div>
      </div>

      <div style={{
        opacity: fadeIn(frame, 90),
        textAlign: 'center',
        marginTop: 50,
        fontSize: 26,
        color: '#94a3b8',
      }}>
        Context Vector = 문맥 벡터 (전체 의미를 담은 벡터)
      </div>
    </AbsoluteFill>
  );
};

// Scene 04: Encoder
const Scene04Encoder: React.FC = () => {
  const frame = useCurrentFrame();
  const words = ['나는', '학교에', '갔다'];
  const progress = interpolate(frame, [30, 120], [0, 3], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.background, padding: 60 }}>
      <h2 style={{
        fontSize: 52,
        color: COLORS.encoder,
        textAlign: 'center',
        marginBottom: 40,
        opacity: fadeIn(frame),
      }}>
        Encoder (인코더)
      </h2>

      {/* Input sequence */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: 30,
        marginBottom: 40,
      }}>
        {words.map((word, i) => (
          <div key={i} style={{
            opacity: fadeIn(frame, 20 + i * 15),
            background: progress > i ? COLORS.encoder : 'rgba(255,255,255,0.1)',
            padding: '20px 35px',
            borderRadius: 15,
            transition: 'background 0.3s',
          }}>
            <p style={{ fontSize: 28, color: COLORS.light }}>{word}</p>
          </div>
        ))}
      </div>

      {/* RNN cells */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: 30,
        marginBottom: 40,
      }}>
        {words.map((_, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{
              opacity: fadeIn(frame, 40 + i * 20),
              width: 80,
              height: 80,
              borderRadius: '50%',
              background: progress > i ? COLORS.encoder : 'rgba(34, 197, 94, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 20,
              color: COLORS.light,
              fontWeight: 'bold',
            }}>
              h{i + 1}
            </div>
            {i < words.length - 1 && (
              <div style={{
                width: 50,
                height: 4,
                background: progress > i + 1 ? COLORS.encoder : 'rgba(255,255,255,0.3)',
                marginLeft: 10,
              }} />
            )}
          </div>
        ))}
      </div>

      {/* Context Vector output */}
      <div style={{
        opacity: fadeIn(frame, 100),
        textAlign: 'center',
      }}>
        <div style={{ fontSize: 40, color: COLORS.primary, marginBottom: 20 }}>↓</div>
        <div style={{
          display: 'inline-block',
          background: COLORS.context,
          padding: '25px 50px',
          borderRadius: 20,
        }}>
          <p style={{ fontSize: 28, color: COLORS.light, fontWeight: 'bold' }}>Context Vector</p>
          <p style={{ fontSize: 20, color: 'rgba(255,255,255,0.8)' }}>마지막 은닉 상태 = 문장 전체 정보</p>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Scene 05: Decoder
const Scene05Decoder: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const outputs = ['SOS', 'I', 'went', 'to', 'school', 'EOS'];
  const progress = interpolate(frame, [40, 140], [0, 6], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.background, padding: 60 }}>
      <h2 style={{
        fontSize: 52,
        color: COLORS.decoder,
        textAlign: 'center',
        marginBottom: 30,
        opacity: fadeIn(frame),
      }}>
        Decoder (디코더)
      </h2>

      {/* Context Vector input */}
      <div style={{
        opacity: fadeIn(frame, 15),
        textAlign: 'center',
        marginBottom: 30,
      }}>
        <div style={{
          display: 'inline-block',
          background: COLORS.context,
          padding: '15px 40px',
          borderRadius: 15,
        }}>
          <p style={{ fontSize: 22, color: COLORS.light }}>Context Vector (초기 상태)</p>
        </div>
        <div style={{ fontSize: 30, color: COLORS.primary, marginTop: 10 }}>↓</div>
      </div>

      {/* Output generation */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: 20,
        flexWrap: 'wrap',
        maxWidth: 1000,
        margin: '0 auto',
      }}>
        {outputs.map((word, i) => (
          <div key={i} style={{
            opacity: progress > i ? 1 : 0.3,
            transform: `scale(${progress > i ? 1 : 0.8})`,
            transition: 'all 0.3s',
          }}>
            <div style={{
              width: 80,
              height: 80,
              borderRadius: '50%',
              background: word === 'SOS' || word === 'EOS' ? '#64748b' : COLORS.decoder,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 10,
            }}>
              <span style={{ fontSize: 18, color: COLORS.light }}>{word}</span>
            </div>
            {i < outputs.length - 1 && (
              <div style={{
                position: 'absolute',
                width: 40,
                height: 3,
                background: progress > i + 1 ? COLORS.decoder : 'rgba(255,255,255,0.2)',
                top: '50%',
                right: -30,
              }} />
            )}
          </div>
        ))}
      </div>

      <div style={{
        opacity: fadeIn(frame, 100),
        textAlign: 'center',
        marginTop: 40,
        display: 'flex',
        justifyContent: 'center',
        gap: 40,
      }}>
        <div style={{ fontSize: 20, color: '#64748b' }}>
          SOS = Start Of Sequence
        </div>
        <div style={{ fontSize: 20, color: '#64748b' }}>
          EOS = End Of Sequence
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Scene 06: Teacher Forcing
const Scene06TeacherForcing: React.FC = () => {
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
        Teacher Forcing
      </h2>

      <div style={{
        display: 'flex',
        gap: 50,
        justifyContent: 'center',
      }}>
        {/* Wrong prediction example */}
        <div style={{
          opacity: fadeIn(frame, 20),
          transform: `scale(${scaleIn(frame, fps, 20)})`,
          background: 'rgba(255,255,255,0.05)',
          padding: 30,
          borderRadius: 20,
          width: 400,
        }}>
          <p style={{ fontSize: 26, color: COLORS.problem, marginBottom: 20 }}>틀린 예측</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 15, marginBottom: 15 }}>
            <div style={{ background: COLORS.problem, padding: '10px 20px', borderRadius: 10 }}>
              <span style={{ color: COLORS.light }}>"You"</span>
            </div>
            <span style={{ fontSize: 24, color: COLORS.problem }}>✗</span>
          </div>
          <p style={{ fontSize: 20, color: '#94a3b8' }}>정답은 "I"인데...</p>
        </div>

        {/* Teacher forcing */}
        <div style={{
          opacity: fadeIn(frame, 50),
          transform: `scale(${scaleIn(frame, fps, 50)})`,
          background: `linear-gradient(135deg, ${COLORS.encoder}33, ${COLORS.primary}33)`,
          padding: 30,
          borderRadius: 20,
          width: 400,
          border: `2px solid ${COLORS.encoder}`,
        }}>
          <p style={{ fontSize: 26, color: COLORS.encoder, marginBottom: 20 }}>Teacher Forcing</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 15, marginBottom: 15 }}>
            <div style={{ background: COLORS.encoder, padding: '10px 20px', borderRadius: 10 }}>
              <span style={{ color: COLORS.light }}>"I"</span>
            </div>
            <span style={{ fontSize: 24, color: COLORS.encoder }}>← 정답 입력!</span>
          </div>
          <p style={{ fontSize: 20, color: COLORS.accent }}>선생님이 정답을 알려주듯!</p>
        </div>
      </div>

      <div style={{
        opacity: fadeIn(frame, 90),
        textAlign: 'center',
        marginTop: 40,
        fontSize: 24,
        color: '#94a3b8',
      }}>
        학습 시: 정답을 다음 입력으로 | 추론 시: 예측값을 다음 입력으로
      </div>
    </AbsoluteFill>
  );
};

// Scene 07: Example
const Scene07Example: React.FC = () => {
  const frame = useCurrentFrame();
  const encoderProgress = interpolate(frame, [20, 60], [0, 2], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });
  const decoderProgress = interpolate(frame, [80, 140], [0, 5], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.background, padding: 50 }}>
      <h2 style={{
        fontSize: 48,
        color: COLORS.primary,
        textAlign: 'center',
        marginBottom: 30,
        opacity: fadeIn(frame),
      }}>
        번역 예시: "나는 학생입니다" → "I am a student"
      </h2>

      {/* Encoder phase */}
      <div style={{
        opacity: fadeIn(frame, 10),
        marginBottom: 20,
      }}>
        <p style={{ fontSize: 24, color: COLORS.encoder, marginBottom: 15 }}>Encoder:</p>
        <div style={{ display: 'flex', gap: 20 }}>
          {['나는', '학생입니다'].map((word, i) => (
            <div key={i} style={{
              padding: '15px 25px',
              background: encoderProgress > i ? COLORS.encoder : 'rgba(255,255,255,0.1)',
              borderRadius: 10,
              transition: 'background 0.3s',
            }}>
              <span style={{ fontSize: 22, color: COLORS.light }}>{word}</span>
            </div>
          ))}
          <div style={{
            opacity: encoderProgress >= 2 ? 1 : 0,
            padding: '15px 30px',
            background: COLORS.context,
            borderRadius: 15,
            marginLeft: 20,
          }}>
            <span style={{ fontSize: 20, color: COLORS.light }}>Context Vector</span>
          </div>
        </div>
      </div>

      {/* Decoder phase */}
      <div style={{
        opacity: fadeIn(frame, 70),
      }}>
        <p style={{ fontSize: 24, color: COLORS.decoder, marginBottom: 15 }}>Decoder:</p>
        <div style={{ display: 'flex', gap: 15, alignItems: 'center' }}>
          {['SOS', 'I', 'am', 'a', 'student', 'EOS'].map((word, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{
                padding: '12px 20px',
                background: decoderProgress > i ? (word === 'SOS' || word === 'EOS' ? '#64748b' : COLORS.decoder) : 'rgba(255,255,255,0.1)',
                borderRadius: 10,
                transition: 'background 0.3s',
              }}>
                <span style={{ fontSize: 20, color: COLORS.light }}>{word}</span>
              </div>
              {i < 5 && (
                <span style={{
                  fontSize: 24,
                  color: decoderProgress > i + 1 ? COLORS.decoder : '#64748b',
                  margin: '0 5px',
                }}>→</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Scene 08: Problem
const Scene08Problem: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.background, padding: 60 }}>
      <h2 style={{
        fontSize: 52,
        color: COLORS.problem,
        textAlign: 'center',
        marginBottom: 40,
        opacity: fadeIn(frame),
      }}>
        병목 현상 (Bottleneck)
      </h2>

      {/* Long sentence */}
      <div style={{
        opacity: fadeIn(frame, 20),
        background: 'rgba(239, 68, 68, 0.1)',
        padding: 25,
        borderRadius: 15,
        marginBottom: 30,
        border: `2px solid ${COLORS.problem}`,
      }}>
        <p style={{ fontSize: 24, color: COLORS.light }}>
          "어제 친구와 함께 서울에 있는 유명한 식당에서 맛있는 저녁을 먹었다"
        </p>
      </div>

      {/* Bottleneck visualization */}
      <div style={{
        opacity: fadeIn(frame, 50),
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 30,
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: 200,
            height: 100,
            background: 'rgba(255,255,255,0.1)',
            borderRadius: 15,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <span style={{ fontSize: 18, color: COLORS.light }}>긴 입력 문장</span>
          </div>
        </div>

        <div style={{ fontSize: 40, color: COLORS.problem }}>→</div>

        <div style={{
          transform: `scale(${scaleIn(frame, fps, 70)})`,
          width: 80,
          height: 80,
          background: COLORS.problem,
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <span style={{ fontSize: 14, color: COLORS.light, textAlign: 'center' }}>고정 크기<br/>벡터</span>
        </div>

        <div style={{ fontSize: 40, color: COLORS.problem }}>→</div>

        <div style={{
          textAlign: 'center',
          opacity: fadeIn(frame, 90),
        }}>
          <span style={{ fontSize: 50 }}>😰</span>
          <p style={{ fontSize: 18, color: COLORS.problem }}>정보 손실!</p>
        </div>
      </div>

      <div style={{
        opacity: fadeIn(frame, 100),
        textAlign: 'center',
        marginTop: 40,
        fontSize: 24,
        color: '#94a3b8',
      }}>
        모든 정보를 하나의 작은 벡터에 담아야 해요!
      </div>
    </AbsoluteFill>
  );
};

// Scene 09: Attention
const Scene09Attention: React.FC = () => {
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
        해결책: Attention 메커니즘
      </h2>

      <div style={{
        opacity: fadeIn(frame, 20),
        display: 'flex',
        justifyContent: 'center',
        gap: 50,
      }}>
        {/* Basic Seq2Seq */}
        <div style={{
          background: 'rgba(239, 68, 68, 0.1)',
          padding: 30,
          borderRadius: 20,
          width: 350,
          textAlign: 'center',
        }}>
          <p style={{ fontSize: 24, color: COLORS.problem, marginBottom: 20 }}>기본 Seq2Seq</p>
          <p style={{ fontSize: 18, color: '#94a3b8' }}>
            Context Vector만 참조
          </p>
          <div style={{
            marginTop: 20,
            padding: 15,
            background: COLORS.context,
            borderRadius: 10,
          }}>
            <span style={{ color: COLORS.light }}>단일 벡터</span>
          </div>
        </div>

        {/* With Attention */}
        <div style={{
          transform: `scale(${scaleIn(frame, fps, 40)})`,
          background: `linear-gradient(135deg, ${COLORS.encoder}22, ${COLORS.primary}22)`,
          padding: 30,
          borderRadius: 20,
          width: 350,
          textAlign: 'center',
          border: `2px solid ${COLORS.encoder}`,
        }}>
          <p style={{ fontSize: 24, color: COLORS.encoder, marginBottom: 20 }}>+ Attention</p>
          <p style={{ fontSize: 18, color: COLORS.accent }}>
            모든 은닉 상태 참조 가능!
          </p>
          <div style={{
            marginTop: 20,
            display: 'flex',
            justifyContent: 'center',
            gap: 10,
          }}>
            {[1, 2, 3, 4].map(i => (
              <div key={i} style={{
                width: 50,
                height: 50,
                background: COLORS.encoder,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <span style={{ color: COLORS.light, fontSize: 14 }}>h{i}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{
        opacity: fadeIn(frame, 80),
        textAlign: 'center',
        marginTop: 40,
      }}>
        <p style={{ fontSize: 26, color: COLORS.accent }}>
          "지금 어디를 봐야 할까?" 결정
        </p>
        <p style={{ fontSize: 22, color: '#94a3b8', marginTop: 15 }}>
          다음 Level에서 자세히 배울 거예요!
        </p>
      </div>
    </AbsoluteFill>
  );
};

// Scene 10: Applications
const Scene10Applications: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const apps = [
    { icon: '🌍', name: '기계 번역', desc: '한국어 → 영어' },
    { icon: '💬', name: '챗봇', desc: '질문 → 응답' },
    { icon: '📝', name: '텍스트 요약', desc: '긴 글 → 짧은 요약' },
    { icon: '🎤', name: '음성 인식', desc: '음성 → 텍스트' },
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
        Seq2Seq 응용 분야
      </h2>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: 30,
        maxWidth: 900,
        margin: '0 auto',
      }}>
        {apps.map((app, i) => (
          <div key={i} style={{
            opacity: fadeIn(frame, 20 + i * 20),
            transform: `scale(${scaleIn(frame, fps, 20 + i * 20)})`,
            background: 'rgba(6, 182, 212, 0.15)',
            border: `2px solid ${COLORS.primary}`,
            padding: 30,
            borderRadius: 20,
            display: 'flex',
            alignItems: 'center',
            gap: 25,
          }}>
            <span style={{ fontSize: 55 }}>{app.icon}</span>
            <div>
              <p style={{ fontSize: 28, color: COLORS.light, fontWeight: 'bold' }}>{app.name}</p>
              <p style={{ fontSize: 20, color: COLORS.accent }}>{app.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};

// Scene 11: Code
const Scene11Code: React.FC = () => {
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
        PyTorch 구조 예시
      </h2>

      <div style={{
        opacity: fadeIn(frame, 20),
        background: '#1e293b',
        padding: 35,
        borderRadius: 20,
        fontFamily: 'monospace',
        fontSize: 20,
        lineHeight: 1.7,
      }}>
        <pre style={{ color: COLORS.light, margin: 0 }}>
          <span style={{ color: '#94a3b8' }}># Encoder</span>{'\n'}
          <span style={{ color: COLORS.encoder }}>class</span> Encoder(nn.Module):{'\n'}
          {'    '}self.lstm = nn.LSTM(input_size, hidden_size){'\n'}
          {'    '}<span style={{ color: '#94a3b8' }}>→ context = 마지막 은닉 상태</span>{'\n\n'}
          <span style={{ color: '#94a3b8' }}># Decoder</span>{'\n'}
          <span style={{ color: COLORS.decoder }}>class</span> Decoder(nn.Module):{'\n'}
          {'    '}self.lstm = nn.LSTM(input_size, hidden_size){'\n'}
          {'    '}<span style={{ color: '#94a3b8' }}>→ context를 초기 상태로 사용</span>{'\n\n'}
          <span style={{ color: '#94a3b8' }}># Seq2Seq</span>{'\n'}
          <span style={{ color: COLORS.primary }}>class</span> Seq2Seq(nn.Module):{'\n'}
          {'    '}encoder = Encoder(){'\n'}
          {'    '}decoder = Decoder(){'\n'}
          {'    '}<span style={{ color: '#94a3b8' }}>→ encoder 실행 후 decoder에 전달</span>
        </pre>
      </div>
    </AbsoluteFill>
  );
};

// Scene 12: Outro
const Scene12Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const points = [
    'Seq2Seq = 시퀀스 → 시퀀스 변환',
    'Encoder: 입력을 Context Vector로 압축',
    'Decoder: Context Vector로 출력 생성',
    'Teacher Forcing으로 효율적 학습',
    '병목 현상 → Attention으로 해결',
    '번역, 챗봇, 요약 등 다양한 응용',
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.background, padding: 60 }}>
      <h2 style={{
        fontSize: 52,
        color: COLORS.primary,
        textAlign: 'center',
        marginBottom: 40,
        opacity: fadeIn(frame),
      }}>
        정리
      </h2>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 18,
        maxWidth: 800,
        margin: '0 auto',
      }}>
        {points.map((point, i) => (
          <div key={i} style={{
            opacity: fadeIn(frame, 15 + i * 12),
            display: 'flex',
            alignItems: 'center',
            gap: 20,
          }}>
            <div style={{
              width: 36,
              height: 36,
              borderRadius: '50%',
              background: COLORS.primary,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: COLORS.light,
              fontSize: 18,
              fontWeight: 'bold',
            }}>{i + 1}</div>
            <p style={{ fontSize: 24, color: COLORS.light }}>{point}</p>
          </div>
        ))}
      </div>

      <div style={{
        opacity: fadeIn(frame, 100),
        transform: `scale(${scaleIn(frame, fps, 100)})`,
        marginTop: 40,
        textAlign: 'center',
      }}>
        <p style={{ fontSize: 28, color: COLORS.accent, marginBottom: 15 }}>
          다음 레슨: 감성 분석 구현
        </p>
        <p style={{ fontSize: 44, color: COLORS.primary }}>감사합니다! 🎉</p>
      </div>
    </AbsoluteFill>
  );
};

// Main component
export const Lesson6_6Video: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.background }}>
      {/* Audio tracks */}
      {Object.entries(SCENE_TIMINGS).map(([key, timing]) => (
        <Sequence key={key} from={timing.start} durationInFrames={timing.duration}>
          <Audio src={staticFile(`audio/lesson-6-6/${key}.mp3`)} />
        </Sequence>
      ))}

      {/* Scene sequences */}
      <Sequence from={SCENE_TIMINGS.scene01_intro.start} durationInFrames={SCENE_TIMINGS.scene01_intro.duration}>
        <Scene01Intro />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene02_analogy.start} durationInFrames={SCENE_TIMINGS.scene02_analogy.duration}>
        <Scene02Analogy />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene03_structure.start} durationInFrames={SCENE_TIMINGS.scene03_structure.duration}>
        <Scene03Structure />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene04_encoder.start} durationInFrames={SCENE_TIMINGS.scene04_encoder.duration}>
        <Scene04Encoder />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene05_decoder.start} durationInFrames={SCENE_TIMINGS.scene05_decoder.duration}>
        <Scene05Decoder />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene06_teacher_forcing.start} durationInFrames={SCENE_TIMINGS.scene06_teacher_forcing.duration}>
        <Scene06TeacherForcing />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene07_example.start} durationInFrames={SCENE_TIMINGS.scene07_example.duration}>
        <Scene07Example />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene08_problem.start} durationInFrames={SCENE_TIMINGS.scene08_problem.duration}>
        <Scene08Problem />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene09_attention.start} durationInFrames={SCENE_TIMINGS.scene09_attention.duration}>
        <Scene09Attention />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene10_applications.start} durationInFrames={SCENE_TIMINGS.scene10_applications.duration}>
        <Scene10Applications />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene11_code.start} durationInFrames={SCENE_TIMINGS.scene11_code.duration}>
        <Scene11Code />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene12_outro.start} durationInFrames={SCENE_TIMINGS.scene12_outro.duration}>
        <Scene12Outro />
      </Sequence>

      {/* Global overlay */}
      <GlobalOverlay />
    </AbsoluteFill>
  );
};
