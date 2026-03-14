import React from 'react';
import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';

// Scene timings from audio analysis
const SCENE_TIMINGS = {
  scene01_intro: { start: 0, duration: 776 },
  scene02_why_multi: { start: 776, duration: 1058 },
  scene03_single_head: { start: 1834, duration: 891 },
  scene04_multi_head_idea: { start: 2725, duration: 1038 },
  scene05_dimension: { start: 3763, duration: 1047 },
  scene06_projection: { start: 4810, duration: 1038 },
  scene07_concat: { start: 5848, duration: 1106 },
  scene08_formula: { start: 6954, duration: 1043 },
  scene09_each_head: { start: 7997, duration: 1063 },
  scene10_visualization: { start: 9060, duration: 1037 },
  scene11_benefit: { start: 10097, duration: 1046 },
  scene12_outro: { start: 11143, duration: 1219 },
};

export const LESSON_7_3_DURATION = 12362;

// Colors
const COLORS = {
  background: '#0f0f23',
  primary: '#8b5cf6',
  secondary: '#a78bfa',
  text: '#ffffff',
  textDim: '#a0a0b0',
  head1: '#ec4899',
  head2: '#f97316',
  head3: '#22c55e',
  head4: '#3b82f6',
  concat: '#fbbf24',
  matrix: '#6366f1',
};

// Animation helpers
const fadeIn = (frame: number, delay = 0) => interpolate(frame - delay, [0, 20], [0, 1], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });
const slideUp = (frame: number, delay = 0) => interpolate(frame - delay, [0, 25], [30, 0], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });
const scaleIn = (frame: number, fps: number, delay = 0) => spring({ frame: frame - delay, fps, config: { damping: 12 } });

// ============ GLOBAL OVERLAY ============
const GlobalOverlay: React.FC = () => {
  const frame = useCurrentFrame();
  const logoOpacity = fadeIn(frame, 0);

  return (
    <>
      {/* 왼쪽 상단 UTTEC-Lab 로고 */}
      <div
        style={{
          position: "absolute",
          top: 30,
          left: 40,
          zIndex: 1000,
          opacity: logoOpacity,
          display: "flex",
          alignItems: "center",
          gap: 12,
        }}
      >
        <div
          style={{
            width: 50,
            height: 50,
            borderRadius: 12,
            background: `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.secondary} 100%)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: `0 4px 15px ${COLORS.primary}60`,
          }}
        >
          <span style={{ fontSize: 28, fontWeight: "bold", color: COLORS.text }}>U</span>
        </div>
        <span
          style={{
            fontSize: 32,
            fontWeight: "bold",
            color: COLORS.text,
            textShadow: `0 2px 10px rgba(0,0,0,0.5)`,
            letterSpacing: 1,
          }}
        >
          UTTEC-Lab
        </span>
      </div>

      {/* 하단 교육 사이트 URL */}
      <div
        style={{
          position: "absolute",
          bottom: 20,
          left: 0,
          right: 0,
          zIndex: 1000,
          opacity: logoOpacity,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            padding: "12px 40px",
            backgroundColor: `${COLORS.background}dd`,
            borderRadius: 30,
            border: `2px solid ${COLORS.primary}60`,
            boxShadow: `0 4px 20px rgba(0,0,0,0.4)`,
          }}
        >
          <span style={{ fontSize: 24, color: COLORS.textDim, fontWeight: 500 }}>
            교육 사이트:
          </span>
          <span
            style={{
              fontSize: 26,
              color: COLORS.concat,
              fontWeight: "bold",
              marginLeft: 10,
              textShadow: `0 0 10px ${COLORS.concat}60`,
            }}
          >
            http://uttec-ai.duckdns.org
          </span>
        </div>
      </div>
    </>
  );
};

// Scene 1: Intro
const Scene01Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.background, justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{
          fontSize: 28,
          color: COLORS.secondary,
          marginBottom: 20,
          opacity: fadeIn(frame),
        }}>
          Lesson 7-3
        </div>
        <h1 style={{
          fontSize: 72,
          color: COLORS.primary,
          margin: 0,
          transform: `scale(${scaleIn(frame, fps, 10)})`,
        }}>
          멀티헤드 어텐션
        </h1>
        <div style={{
          fontSize: 36,
          color: COLORS.text,
          marginTop: 30,
          opacity: fadeIn(frame, 25),
        }}>
          Multi-head Attention
        </div>

        {/* Multiple heads visualization */}
        <div style={{
          display: 'flex',
          gap: 30,
          marginTop: 60,
          justifyContent: 'center',
          opacity: fadeIn(frame, 40),
        }}>
          {[COLORS.head1, COLORS.head2, COLORS.head3, COLORS.head4].map((color, i) => (
            <div key={i} style={{
              width: 80,
              height: 80,
              borderRadius: '50%',
              backgroundColor: color,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 24,
              fontWeight: 'bold',
              color: 'white',
              transform: `translateY(${slideUp(frame, 45 + i * 8)}px)`,
            }}>
              H{i + 1}
            </div>
          ))}
        </div>

        <div style={{
          fontSize: 28,
          color: COLORS.textDim,
          marginTop: 50,
          opacity: fadeIn(frame, 70),
        }}>
          여러 어텐션을 동시에!
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Scene 2: Why Multi-head
const Scene02WhyMulti: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const relationships = [
    { text: '주어-동사', color: COLORS.head1 },
    { text: '동사-목적어', color: COLORS.head2 },
    { text: '대명사-명사', color: COLORS.head3 },
    { text: '수식어-피수식어', color: COLORS.head4 },
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
        왜 여러 개의 어텐션이 필요할까요?
      </h2>

      <div style={{
        display: 'flex',
        gap: 60,
        marginTop: 40,
      }}>
        {/* Single head limitation */}
        <div style={{
          flex: 1,
          opacity: fadeIn(frame, 20),
        }}>
          <h3 style={{ fontSize: 32, color: COLORS.textDim, marginBottom: 30 }}>
            단일 헤드의 한계
          </h3>
          <div style={{
            backgroundColor: '#1a1a3a',
            padding: 40,
            borderRadius: 20,
            borderLeft: `4px solid ${COLORS.head1}`,
          }}>
            <div style={{ fontSize: 24, color: COLORS.text }}>
              한 가지 관계만 학습
            </div>
            <div style={{ fontSize: 20, color: COLORS.textDim, marginTop: 10 }}>
              예: 주어-동사 관계만 파악
            </div>
          </div>
        </div>

        {/* Multi head advantage */}
        <div style={{
          flex: 1,
          opacity: fadeIn(frame, 40),
        }}>
          <h3 style={{ fontSize: 32, color: COLORS.primary, marginBottom: 30 }}>
            다양한 관계들
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
            {relationships.map((rel, i) => (
              <div key={i} style={{
                backgroundColor: '#1a1a3a',
                padding: 20,
                borderRadius: 12,
                borderLeft: `4px solid ${rel.color}`,
                transform: `translateX(${slideUp(frame, 50 + i * 15)}px)`,
                opacity: fadeIn(frame, 50 + i * 15),
              }}>
                <span style={{ color: rel.color, fontWeight: 'bold', fontSize: 22 }}>
                  {rel.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{
        textAlign: 'center',
        marginTop: 50,
        fontSize: 28,
        color: COLORS.secondary,
        opacity: fadeIn(frame, 100),
      }}>
        각 헤드가 다른 역할 = 팀워크!
      </div>
    </AbsoluteFill>
  );
};

// Scene 3: Single Head Review
const Scene03SingleHead: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const steps = ['입력 X', 'Q, K, V 생성', '어텐션 점수', 'softmax', '가중 합', '출력'];

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.background, padding: 60 }}>
      <h2 style={{
        fontSize: 48,
        color: COLORS.primary,
        textAlign: 'center',
        marginBottom: 50,
        opacity: fadeIn(frame),
      }}>
        단일 헤드 어텐션 복습
      </h2>

      {/* Process flow */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20,
        flexWrap: 'wrap',
      }}>
        {steps.map((step, i) => (
          <div key={i} style={{
            display: 'flex',
            alignItems: 'center',
            opacity: fadeIn(frame, 20 + i * 12),
          }}>
            <div style={{
              backgroundColor: COLORS.head1,
              padding: '20px 30px',
              borderRadius: 15,
              fontSize: 22,
              color: 'white',
              fontWeight: 'bold',
              transform: `scale(${scaleIn(fps, fps, 20 + i * 12)})`,
            }}>
              {step}
            </div>
            {i < steps.length - 1 && (
              <div style={{
                fontSize: 30,
                color: COLORS.secondary,
                margin: '0 10px',
              }}>
                →
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Single head box */}
      <div style={{
        marginTop: 60,
        display: 'flex',
        justifyContent: 'center',
        opacity: fadeIn(frame, 100),
      }}>
        <div style={{
          border: `3px solid ${COLORS.head1}`,
          borderRadius: 20,
          padding: 40,
          width: 400,
          textAlign: 'center',
        }}>
          <div style={{
            fontSize: 36,
            color: COLORS.head1,
            fontWeight: 'bold',
            marginBottom: 20,
          }}>
            하나의 어텐션 헤드
          </div>
          <div style={{ fontSize: 24, color: COLORS.textDim }}>
            = 하나의 "관점"
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Scene 4: Multi-head Idea
const Scene04MultiHeadIdea: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const heads = [
    { id: 1, color: COLORS.head1 },
    { id: 2, color: COLORS.head2 },
    { id: 3, color: COLORS.head3 },
    { id: 4, color: COLORS.head4 },
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.background, padding: 60 }}>
      <h2 style={{
        fontSize: 48,
        color: COLORS.primary,
        textAlign: 'center',
        marginBottom: 30,
        opacity: fadeIn(frame),
      }}>
        멀티헤드 어텐션 아이디어
      </h2>

      {/* Parallel heads */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 40,
      }}>
        {/* Input */}
        <div style={{
          backgroundColor: COLORS.matrix,
          padding: '20px 60px',
          borderRadius: 15,
          fontSize: 28,
          color: 'white',
          fontWeight: 'bold',
          opacity: fadeIn(frame, 15),
        }}>
          입력 X
        </div>

        {/* Arrow down */}
        <div style={{
          fontSize: 40,
          color: COLORS.secondary,
          margin: '20px 0',
          opacity: fadeIn(frame, 25),
        }}>
          ↓
        </div>

        {/* Multiple heads */}
        <div style={{
          display: 'flex',
          gap: 30,
          opacity: fadeIn(frame, 35),
        }}>
          {heads.map((head, i) => (
            <div key={head.id} style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              transform: `scale(${scaleIn(frame, fps, 40 + i * 10)})`,
            }}>
              <div style={{
                width: 100,
                height: 100,
                borderRadius: '50%',
                backgroundColor: head.color,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 'bold',
              }}>
                <div style={{ fontSize: 24 }}>Head</div>
                <div style={{ fontSize: 28 }}>{head.id}</div>
              </div>
              <div style={{
                fontSize: 18,
                color: COLORS.textDim,
                marginTop: 10,
              }}>
                독립 Q,K,V
              </div>
            </div>
          ))}
        </div>

        {/* Arrow down */}
        <div style={{
          fontSize: 40,
          color: COLORS.secondary,
          margin: '20px 0',
          opacity: fadeIn(frame, 90),
        }}>
          ↓
        </div>

        {/* Concat */}
        <div style={{
          backgroundColor: COLORS.concat,
          padding: '20px 60px',
          borderRadius: 15,
          fontSize: 28,
          color: '#1a1a3a',
          fontWeight: 'bold',
          opacity: fadeIn(frame, 100),
        }}>
          Concatenate → 출력
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Scene 5: Dimension
const Scene05Dimension: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.background, padding: 60 }}>
      <h2 style={{
        fontSize: 48,
        color: COLORS.primary,
        textAlign: 'center',
        marginBottom: 40,
        opacity: fadeIn(frame),
      }}>
        차원 분할
      </h2>

      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: 60,
        marginTop: 40,
      }}>
        {/* Total dimension */}
        <div style={{
          textAlign: 'center',
          opacity: fadeIn(frame, 20),
        }}>
          <div style={{
            backgroundColor: COLORS.matrix,
            padding: 40,
            borderRadius: 20,
            marginBottom: 20,
          }}>
            <div style={{ fontSize: 64, color: 'white', fontWeight: 'bold' }}>512</div>
          </div>
          <div style={{ fontSize: 24, color: COLORS.textDim }}>전체 차원</div>
        </div>

        <div style={{
          fontSize: 60,
          color: COLORS.secondary,
          alignSelf: 'center',
          opacity: fadeIn(frame, 40),
        }}>
          ÷
        </div>

        {/* Number of heads */}
        <div style={{
          textAlign: 'center',
          opacity: fadeIn(frame, 50),
        }}>
          <div style={{
            backgroundColor: COLORS.primary,
            padding: 40,
            borderRadius: 20,
            marginBottom: 20,
          }}>
            <div style={{ fontSize: 64, color: 'white', fontWeight: 'bold' }}>8</div>
          </div>
          <div style={{ fontSize: 24, color: COLORS.textDim }}>헤드 수</div>
        </div>

        <div style={{
          fontSize: 60,
          color: COLORS.secondary,
          alignSelf: 'center',
          opacity: fadeIn(frame, 70),
        }}>
          =
        </div>

        {/* Per head dimension */}
        <div style={{
          textAlign: 'center',
          opacity: fadeIn(frame, 80),
        }}>
          <div style={{
            backgroundColor: COLORS.head1,
            padding: 40,
            borderRadius: 20,
            marginBottom: 20,
          }}>
            <div style={{ fontSize: 64, color: 'white', fontWeight: 'bold' }}>64</div>
          </div>
          <div style={{ fontSize: 24, color: COLORS.textDim }}>헤드당 차원</div>
        </div>
      </div>

      <div style={{
        textAlign: 'center',
        marginTop: 60,
        opacity: fadeIn(frame, 100),
      }}>
        <div style={{ fontSize: 28, color: COLORS.text, marginBottom: 15 }}>
          계산량은 유지하면서
        </div>
        <div style={{ fontSize: 32, color: COLORS.secondary, fontWeight: 'bold' }}>
          표현력은 더 풍부하게!
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Scene 6: Projection
const Scene06Projection: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.background, padding: 60 }}>
      <h2 style={{
        fontSize: 48,
        color: COLORS.primary,
        textAlign: 'center',
        marginBottom: 40,
        opacity: fadeIn(frame),
      }}>
        각 헤드의 프로젝션
      </h2>

      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 40,
        marginTop: 50,
      }}>
        {/* Input X */}
        <div style={{
          backgroundColor: COLORS.matrix,
          padding: '30px 50px',
          borderRadius: 15,
          fontSize: 36,
          color: 'white',
          fontWeight: 'bold',
          opacity: fadeIn(frame, 15),
        }}>
          X
        </div>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 20,
          opacity: fadeIn(frame, 30),
        }}>
          {/* Q projection */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 20,
          }}>
            <div style={{ fontSize: 28, color: COLORS.secondary }}>× W_Q^i →</div>
            <div style={{
              backgroundColor: COLORS.head1,
              padding: '15px 30px',
              borderRadius: 10,
              fontSize: 28,
              color: 'white',
              fontWeight: 'bold',
            }}>
              Q^i
            </div>
          </div>

          {/* K projection */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 20,
          }}>
            <div style={{ fontSize: 28, color: COLORS.secondary }}>× W_K^i →</div>
            <div style={{
              backgroundColor: COLORS.head2,
              padding: '15px 30px',
              borderRadius: 10,
              fontSize: 28,
              color: 'white',
              fontWeight: 'bold',
            }}>
              K^i
            </div>
          </div>

          {/* V projection */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 20,
          }}>
            <div style={{ fontSize: 28, color: COLORS.secondary }}>× W_V^i →</div>
            <div style={{
              backgroundColor: COLORS.head3,
              padding: '15px 30px',
              borderRadius: 10,
              fontSize: 28,
              color: 'white',
              fontWeight: 'bold',
            }}>
              V^i
            </div>
          </div>
        </div>
      </div>

      <div style={{
        textAlign: 'center',
        marginTop: 60,
        opacity: fadeIn(frame, 80),
      }}>
        <div style={{
          fontSize: 28,
          color: COLORS.text,
          backgroundColor: '#1a1a3a',
          padding: 30,
          borderRadius: 15,
          display: 'inline-block',
        }}>
          <span style={{ color: COLORS.secondary }}>핵심:</span> 가중치 행렬이 <span style={{ color: COLORS.primary }}>헤드마다 다름</span>!
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Scene 7: Concatenation
const Scene07Concat: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const heads = [
    { id: 1, color: COLORS.head1, dim: 64 },
    { id: 2, color: COLORS.head2, dim: 64 },
    { id: 3, color: COLORS.head3, dim: 64 },
    { id: 4, color: COLORS.head4, dim: 64 },
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.background, padding: 60 }}>
      <h2 style={{
        fontSize: 48,
        color: COLORS.primary,
        textAlign: 'center',
        marginBottom: 40,
        opacity: fadeIn(frame),
      }}>
        헤드 연결 (Concatenate)
      </h2>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 30,
        marginTop: 30,
      }}>
        {/* Individual head outputs */}
        <div style={{
          display: 'flex',
          gap: 15,
          opacity: fadeIn(frame, 20),
        }}>
          {heads.map((head, i) => (
            <div key={head.id} style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              transform: `translateY(${slideUp(frame, 25 + i * 10)}px)`,
            }}>
              <div style={{
                width: 100,
                height: 60,
                backgroundColor: head.color,
                borderRadius: 10,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 'bold',
                fontSize: 20,
              }}>
                Head {head.id}
              </div>
              <div style={{ fontSize: 18, color: COLORS.textDim, marginTop: 5 }}>
                {head.dim}차원
              </div>
            </div>
          ))}
        </div>

        {/* Concat arrow */}
        <div style={{
          fontSize: 36,
          color: COLORS.concat,
          opacity: fadeIn(frame, 70),
        }}>
          ↓ Concat ↓
        </div>

        {/* Combined output */}
        <div style={{
          display: 'flex',
          height: 80,
          borderRadius: 15,
          overflow: 'hidden',
          opacity: fadeIn(frame, 85),
        }}>
          {heads.map((head) => (
            <div key={head.id} style={{
              width: 100,
              backgroundColor: head.color,
            }} />
          ))}
        </div>
        <div style={{ fontSize: 24, color: COLORS.text, opacity: fadeIn(frame, 90) }}>
          64 × 8 = <span style={{ color: COLORS.concat, fontWeight: 'bold' }}>512차원</span>
        </div>

        {/* Final projection */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 20,
          marginTop: 20,
          opacity: fadeIn(frame, 105),
        }}>
          <div style={{ fontSize: 28, color: COLORS.secondary }}>× W_O →</div>
          <div style={{
            backgroundColor: COLORS.concat,
            padding: '20px 50px',
            borderRadius: 15,
            fontSize: 28,
            color: '#1a1a3a',
            fontWeight: 'bold',
          }}>
            최종 출력
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Scene 8: Formula
const Scene08Formula: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.background, padding: 60 }}>
      <h2 style={{
        fontSize: 48,
        color: COLORS.primary,
        textAlign: 'center',
        marginBottom: 50,
        opacity: fadeIn(frame),
      }}>
        전체 수식
      </h2>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 40,
      }}>
        {/* Step 1 */}
        <div style={{
          backgroundColor: '#1a1a3a',
          padding: 30,
          borderRadius: 15,
          opacity: fadeIn(frame, 20),
          transform: `translateX(${slideUp(frame, 20)}px)`,
        }}>
          <div style={{ fontSize: 20, color: COLORS.textDim, marginBottom: 10 }}>
            1. 각 헤드의 어텐션
          </div>
          <div style={{
            fontSize: 28,
            color: COLORS.text,
            fontFamily: 'monospace',
          }}>
            head_i = Attention(Q·W_Q^i, K·W_K^i, V·W_V^i)
          </div>
        </div>

        {/* Step 2 */}
        <div style={{
          backgroundColor: '#1a1a3a',
          padding: 30,
          borderRadius: 15,
          opacity: fadeIn(frame, 50),
          transform: `translateX(${slideUp(frame, 50)}px)`,
        }}>
          <div style={{ fontSize: 20, color: COLORS.textDim, marginBottom: 10 }}>
            2. 헤드 연결
          </div>
          <div style={{
            fontSize: 28,
            color: COLORS.text,
            fontFamily: 'monospace',
          }}>
            Concat(head_1, head_2, ..., head_h)
          </div>
        </div>

        {/* Step 3 */}
        <div style={{
          backgroundColor: '#1a1a3a',
          padding: 30,
          borderRadius: 15,
          opacity: fadeIn(frame, 80),
          transform: `translateX(${slideUp(frame, 80)}px)`,
        }}>
          <div style={{ fontSize: 20, color: COLORS.textDim, marginBottom: 10 }}>
            3. 최종 수식
          </div>
          <div style={{
            fontSize: 32,
            color: COLORS.primary,
            fontFamily: 'monospace',
            fontWeight: 'bold',
          }}>
            MultiHead(Q,K,V) = Concat(...)·W_O
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Scene 9: Each Head Role
const Scene09EachHead: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headRoles = [
    { id: 1, color: COLORS.head1, role: '문법적 관계', example: '주어 ↔ 동사' },
    { id: 2, color: COLORS.head2, role: '의미적 관계', example: '유사 개념 연결' },
    { id: 3, color: COLORS.head3, role: '위치적 관계', example: '가까운 단어들' },
    { id: 4, color: COLORS.head4, role: '참조 관계', example: '대명사 ↔ 명사' },
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.background, padding: 60 }}>
      <h2 style={{
        fontSize: 48,
        color: COLORS.primary,
        textAlign: 'center',
        marginBottom: 40,
        opacity: fadeIn(frame),
      }}>
        각 헤드의 역할
      </h2>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: 30,
        maxWidth: 1000,
        margin: '0 auto',
      }}>
        {headRoles.map((head, i) => (
          <div key={head.id} style={{
            backgroundColor: '#1a1a3a',
            padding: 30,
            borderRadius: 20,
            borderLeft: `4px solid ${head.color}`,
            opacity: fadeIn(frame, 20 + i * 20),
            transform: `scale(${scaleIn(frame, fps, 20 + i * 20)})`,
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 15,
              marginBottom: 15,
            }}>
              <div style={{
                width: 50,
                height: 50,
                borderRadius: '50%',
                backgroundColor: head.color,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 'bold',
                fontSize: 20,
              }}>
                H{head.id}
              </div>
              <div style={{
                fontSize: 26,
                color: COLORS.text,
                fontWeight: 'bold',
              }}>
                {head.role}
              </div>
            </div>
            <div style={{
              fontSize: 20,
              color: COLORS.textDim,
              paddingLeft: 65,
            }}>
              예: {head.example}
            </div>
          </div>
        ))}
      </div>

      <div style={{
        textAlign: 'center',
        marginTop: 40,
        fontSize: 26,
        color: COLORS.secondary,
        opacity: fadeIn(frame, 110),
      }}>
        자연스럽게 역할 분담이 학습됨!
      </div>
    </AbsoluteFill>
  );
};

// Scene 10: Visualization
const Scene10Visualization: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const words = ['그', '고양이가', '밥을', '먹었다'];

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.background, padding: 60 }}>
      <h2 style={{
        fontSize: 48,
        color: COLORS.primary,
        textAlign: 'center',
        marginBottom: 30,
        opacity: fadeIn(frame),
      }}>
        시각화 예시
      </h2>

      <div style={{
        fontSize: 24,
        color: COLORS.textDim,
        textAlign: 'center',
        marginBottom: 30,
        opacity: fadeIn(frame, 15),
      }}>
        "그 고양이가 밥을 먹었다"
      </div>

      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: 40,
      }}>
        {/* Head 1 */}
        <div style={{
          opacity: fadeIn(frame, 30),
          textAlign: 'center',
        }}>
          <div style={{
            backgroundColor: COLORS.head1,
            padding: '10px 20px',
            borderRadius: 10,
            marginBottom: 20,
            color: 'white',
            fontWeight: 'bold',
          }}>
            Head 1
          </div>
          <div style={{
            backgroundColor: '#1a1a3a',
            padding: 20,
            borderRadius: 15,
          }}>
            <div style={{ color: COLORS.head1, fontSize: 22, marginBottom: 10 }}>
              "그" → "고양이"
            </div>
            <div style={{ color: COLORS.textDim, fontSize: 18 }}>
              대명사-명사
            </div>
          </div>
        </div>

        {/* Head 2 */}
        <div style={{
          opacity: fadeIn(frame, 50),
          textAlign: 'center',
        }}>
          <div style={{
            backgroundColor: COLORS.head2,
            padding: '10px 20px',
            borderRadius: 10,
            marginBottom: 20,
            color: 'white',
            fontWeight: 'bold',
          }}>
            Head 2
          </div>
          <div style={{
            backgroundColor: '#1a1a3a',
            padding: 20,
            borderRadius: 15,
          }}>
            <div style={{ color: COLORS.head2, fontSize: 22, marginBottom: 10 }}>
              "고양이" → "먹었다"
            </div>
            <div style={{ color: COLORS.textDim, fontSize: 18 }}>
              주어-동사
            </div>
          </div>
        </div>

        {/* Head 3 */}
        <div style={{
          opacity: fadeIn(frame, 70),
          textAlign: 'center',
        }}>
          <div style={{
            backgroundColor: COLORS.head3,
            padding: '10px 20px',
            borderRadius: 10,
            marginBottom: 20,
            color: 'white',
            fontWeight: 'bold',
          }}>
            Head 3
          </div>
          <div style={{
            backgroundColor: '#1a1a3a',
            padding: 20,
            borderRadius: 15,
          }}>
            <div style={{ color: COLORS.head3, fontSize: 22, marginBottom: 10 }}>
              "밥" → "먹었다"
            </div>
            <div style={{ color: COLORS.textDim, fontSize: 18 }}>
              목적어-동사
            </div>
          </div>
        </div>
      </div>

      <div style={{
        textAlign: 'center',
        marginTop: 40,
        fontSize: 28,
        color: COLORS.text,
        opacity: fadeIn(frame, 95),
      }}>
        다양한 관계가 <span style={{ color: COLORS.secondary }}>동시에</span> 파악됨!
      </div>
    </AbsoluteFill>
  );
};

// Scene 11: Benefits
const Scene11Benefit: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const benefits = [
    { icon: '🎨', title: '풍부한 표현력', desc: '여러 관계 동시 학습' },
    { icon: '🛡️', title: '안정적 학습', desc: '헤드 간 상호 보완' },
    { icon: '⚡', title: '병렬 처리', desc: '모든 헤드 동시 계산' },
    { icon: '🔍', title: '해석 가능', desc: '각 헤드 역할 분석' },
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.background, padding: 60 }}>
      <h2 style={{
        fontSize: 48,
        color: COLORS.primary,
        textAlign: 'center',
        marginBottom: 50,
        opacity: fadeIn(frame),
      }}>
        멀티헤드 어텐션의 장점
      </h2>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: 30,
        maxWidth: 1000,
        margin: '0 auto',
      }}>
        {benefits.map((benefit, i) => (
          <div key={i} style={{
            backgroundColor: '#1a1a3a',
            padding: 30,
            borderRadius: 20,
            opacity: fadeIn(frame, 20 + i * 20),
            transform: `translateY(${slideUp(frame, 20 + i * 20)}px)`,
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 15,
              marginBottom: 15,
            }}>
              <div style={{ fontSize: 40 }}>{benefit.icon}</div>
              <div style={{
                fontSize: 28,
                color: COLORS.text,
                fontWeight: 'bold',
              }}>
                {benefit.title}
              </div>
            </div>
            <div style={{
              fontSize: 22,
              color: COLORS.textDim,
              paddingLeft: 55,
            }}>
              {benefit.desc}
            </div>
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};

// Scene 12: Outro
const Scene12Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const summaryPoints = [
    '여러 어텐션을 병렬 실행',
    '각 헤드가 독립적 Q, K, V',
    '차원 분할로 계산량 유지',
    '모든 헤드 연결 + 최종 프로젝션',
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
        gap: 20,
        maxWidth: 800,
        margin: '0 auto',
      }}>
        {summaryPoints.map((point, i) => (
          <div key={i} style={{
            backgroundColor: '#1a1a3a',
            padding: 25,
            borderRadius: 15,
            borderLeft: `4px solid ${[COLORS.head1, COLORS.head2, COLORS.head3, COLORS.head4][i]}`,
            opacity: fadeIn(frame, 15 + i * 15),
            transform: `translateX(${slideUp(frame, 15 + i * 15)}px)`,
          }}>
            <span style={{
              color: [COLORS.head1, COLORS.head2, COLORS.head3, COLORS.head4][i],
              marginRight: 15,
              fontSize: 24,
            }}>✓</span>
            <span style={{ fontSize: 24, color: COLORS.text }}>{point}</span>
          </div>
        ))}
      </div>

      <div style={{
        textAlign: 'center',
        marginTop: 50,
        opacity: fadeIn(frame, 90),
      }}>
        <div style={{
          fontSize: 28,
          color: COLORS.secondary,
          marginBottom: 20,
        }}>
          다음 레슨: Layer Normalization
        </div>
        <div style={{
          fontSize: 36,
          color: COLORS.text,
        }}>
          감사합니다! 👏
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Main component
export const Lesson7_3Video: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.background }}>
      {/* Audio tracks */}
      {Object.entries(SCENE_TIMINGS).map(([key, timing]) => (
        <Sequence key={key} from={timing.start} durationInFrames={timing.duration}>
          <Audio src={staticFile(`audio/lesson-7-3/${key}.mp3`)} />
        </Sequence>
      ))}

      {/* Scene sequences */}
      <Sequence from={SCENE_TIMINGS.scene01_intro.start} durationInFrames={SCENE_TIMINGS.scene01_intro.duration}>
        <Scene01Intro />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene02_why_multi.start} durationInFrames={SCENE_TIMINGS.scene02_why_multi.duration}>
        <Scene02WhyMulti />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene03_single_head.start} durationInFrames={SCENE_TIMINGS.scene03_single_head.duration}>
        <Scene03SingleHead />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene04_multi_head_idea.start} durationInFrames={SCENE_TIMINGS.scene04_multi_head_idea.duration}>
        <Scene04MultiHeadIdea />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene05_dimension.start} durationInFrames={SCENE_TIMINGS.scene05_dimension.duration}>
        <Scene05Dimension />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene06_projection.start} durationInFrames={SCENE_TIMINGS.scene06_projection.duration}>
        <Scene06Projection />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene07_concat.start} durationInFrames={SCENE_TIMINGS.scene07_concat.duration}>
        <Scene07Concat />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene08_formula.start} durationInFrames={SCENE_TIMINGS.scene08_formula.duration}>
        <Scene08Formula />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene09_each_head.start} durationInFrames={SCENE_TIMINGS.scene09_each_head.duration}>
        <Scene09EachHead />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene10_visualization.start} durationInFrames={SCENE_TIMINGS.scene10_visualization.duration}>
        <Scene10Visualization />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene11_benefit.start} durationInFrames={SCENE_TIMINGS.scene11_benefit.duration}>
        <Scene11Benefit />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene12_outro.start} durationInFrames={SCENE_TIMINGS.scene12_outro.duration}>
        <Scene12Outro />
      </Sequence>

      {/* Global overlay */}
      <GlobalOverlay />
    </AbsoluteFill>
  );
};
