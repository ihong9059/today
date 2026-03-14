import { AbsoluteFill, Audio, Img, interpolate, Sequence, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';

// Scene timings from audio analysis
const SCENE_TIMINGS = {
  scene01_intro: { start: 0, duration: 663 },
  scene02_problem: { start: 663, duration: 977 },
  scene03_idea: { start: 1640, duration: 917 },
  scene04_resnet: { start: 2557, duration: 830 },
  scene05_why_works: { start: 3387, duration: 1148 },
  scene06_gradient: { start: 4535, duration: 1104 },
  scene07_transformer: { start: 5639, duration: 1063 },
  scene08_add_norm: { start: 6702, duration: 925 },
  scene09_dimension: { start: 7627, duration: 981 },
  scene10_benefit: { start: 8608, duration: 860 },
  scene11_code: { start: 9468, duration: 847 },
  scene12_outro: { start: 10315, duration: 1136 },
};

export const LESSON_7_5_DURATION = 11451;

// GlobalOverlay component defined directly (not imported)
const GlobalOverlay: React.FC = () => {
  return (
    <>
      {/* Top-left Logo */}
      <div style={{
        position: 'absolute',
        top: 30,
        left: 40,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        gap: 15,
      }}>
        <Img
          src={staticFile('images/logo.png')}
          style={{ width: 60, height: 60, borderRadius: 8 }}
        />
        <span style={{
          color: 'white',
          fontSize: 28,
          fontWeight: 'bold',
          textShadow: '2px 2px 4px rgba(0,0,0,0.7)',
        }}>
          UTTEC-Lab
        </span>
      </div>

      {/* Bottom-center Education URL Banner */}
      <div style={{
        position: 'absolute',
        bottom: 30,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 9999,
        background: 'rgba(139, 92, 246, 0.9)',
        padding: '10px 30px',
        borderRadius: 25,
        boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
      }}>
        <span style={{
          color: 'white',
          fontSize: 22,
          fontWeight: 'bold',
          letterSpacing: 1,
        }}>
          http://uttec-ai.duckdns.org
        </span>
      </div>
    </>
  );
};

// Animation helpers
const fadeIn = (frame: number, delay: number = 0) => {
  return interpolate(frame - delay, [0, 20], [0, 1], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });
};

const slideUp = (frame: number, delay: number = 0) => {
  return interpolate(frame - delay, [0, 25], [50, 0], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });
};

const scaleIn = (frame: number, fps: number, delay: number = 0) => {
  return spring({ frame: frame - delay, fps, config: { damping: 12, stiffness: 100 } });
};

// Scene 1: Intro
const Scene01_Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{
      background: 'linear-gradient(135deg, #1e1b4b 0%, #3730a3 50%, #6366f1 100%)',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{
          opacity: fadeIn(frame),
          transform: `translateY(${slideUp(frame)}px)`,
          fontSize: 36,
          color: '#a5b4fc',
          marginBottom: 30,
        }}>
          Lesson 7-5
        </div>

        <div style={{
          opacity: fadeIn(frame, 15),
          transform: `scale(${scaleIn(frame, fps, 15)})`,
          fontSize: 80,
          fontWeight: 'bold',
          color: 'white',
          marginBottom: 40,
          textShadow: '0 0 40px rgba(167, 139, 250, 0.6)',
        }}>
          잔차 연결
        </div>

        <div style={{
          opacity: fadeIn(frame, 30),
          transform: `translateY(${slideUp(frame, 30)}px)`,
          fontSize: 50,
          color: '#c4b5fd',
          marginBottom: 50,
        }}>
          Residual Connection
        </div>

        {/* Skip Connection Visual */}
        <div style={{
          opacity: fadeIn(frame, 45),
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 30,
        }}>
          <div style={{
            width: 100,
            height: 100,
            borderRadius: '50%',
            background: 'linear-gradient(45deg, #8b5cf6, #a78bfa)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 40,
            fontWeight: 'bold',
            color: 'white',
          }}>
            x
          </div>
          <div style={{
            fontSize: 50,
            color: '#a78bfa',
          }}>
            →
          </div>
          <div style={{
            width: 120,
            height: 80,
            background: 'rgba(139, 92, 246, 0.3)',
            borderRadius: 15,
            border: '2px solid #8b5cf6',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 32,
            color: 'white',
          }}>
            F(x)
          </div>
          <div style={{
            fontSize: 50,
            color: '#a78bfa',
          }}>
            →
          </div>
          <div style={{
            width: 140,
            height: 100,
            borderRadius: '50%',
            background: 'linear-gradient(45deg, #10b981, #34d399)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 32,
            fontWeight: 'bold',
            color: 'white',
          }}>
            F(x) + x
          </div>
        </div>

        {/* Skip Arrow */}
        <svg style={{
          position: 'absolute',
          top: '55%',
          left: '50%',
          transform: 'translateX(-50%)',
          opacity: fadeIn(frame, 60),
        }} width="400" height="100" viewBox="0 0 400 100">
          <path
            d="M 80 0 Q 80 60, 200 60 Q 320 60, 320 0"
            fill="none"
            stroke="#f59e0b"
            strokeWidth="4"
            strokeDasharray="10,5"
          />
          <text x="200" y="90" fill="#f59e0b" fontSize="24" textAnchor="middle">+ x (Skip!)</text>
        </svg>
      </div>
      <GlobalOverlay />
    </AbsoluteFill>
  );
};

// Scene 2: Problem - Gradient Vanishing
const Scene02_Problem: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const layers = ['Layer 1', 'Layer 2', 'Layer 3', 'Layer 4', '...', 'Layer 100'];

  return (
    <AbsoluteFill style={{
      background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)',
      padding: 60,
    }}>
      <div style={{
        opacity: fadeIn(frame),
        fontSize: 55,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        marginBottom: 40,
      }}>
        문제: 기울기 소실 😰
      </div>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 15,
      }}>
        {/* Deep Network Visualization */}
        {layers.map((layer, i) => {
          const delay = 15 + i * 10;
          const gradientSize = Math.max(0.1, 1 - i * 0.15);

          return (
            <div key={i} style={{
              opacity: fadeIn(frame, delay),
              display: 'flex',
              alignItems: 'center',
              gap: 30,
            }}>
              <div style={{
                width: 200,
                height: 50,
                background: i === layers.length - 1 ? 'rgba(100, 100, 100, 0.5)' : 'linear-gradient(90deg, #6366f1, #8b5cf6)',
                borderRadius: 10,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 24,
                color: 'white',
              }}>
                {layer}
              </div>

              {/* Gradient arrow */}
              {i < layers.length - 1 && (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                }}>
                  <div style={{ fontSize: 30, color: '#a78bfa' }}>↓</div>
                  <div style={{
                    width: 80,
                    height: 20,
                    background: `linear-gradient(90deg, #ef4444, #fca5a5)`,
                    borderRadius: 5,
                    transform: `scaleX(${gradientSize})`,
                    transformOrigin: 'left',
                  }} />
                  <span style={{
                    fontSize: 20,
                    color: gradientSize < 0.3 ? '#ef4444' : '#a5b4fc',
                  }}>
                    {gradientSize < 0.3 ? '거의 0!' : `${Math.round(gradientSize * 100)}%`}
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div style={{
        opacity: fadeIn(frame, 80),
        position: 'absolute',
        bottom: 120,
        left: '50%',
        transform: 'translateX(-50%)',
        fontSize: 36,
        color: '#fca5a5',
        textAlign: 'center',
      }}>
        깊은 네트워크 → 기울기가 점점 작아져요! 😢
      </div>
      <GlobalOverlay />
    </AbsoluteFill>
  );
};

// Scene 3: Idea - Skip Connection
const Scene03_Idea: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{
      background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)',
      padding: 60,
    }}>
      <div style={{
        opacity: fadeIn(frame),
        fontSize: 55,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        marginBottom: 50,
      }}>
        해결책: 스킵 연결! 💡
      </div>

      {/* Skip Connection Diagram */}
      <div style={{
        opacity: fadeIn(frame, 15),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
      }}>
        {/* Input x */}
        <div style={{
          width: 150,
          height: 80,
          background: 'linear-gradient(45deg, #8b5cf6, #a78bfa)',
          borderRadius: 15,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 40,
          fontWeight: 'bold',
          color: 'white',
          marginBottom: 20,
        }}>
          x
        </div>

        <div style={{ fontSize: 40, color: '#a78bfa', marginBottom: 20 }}>↓</div>

        {/* F(x) Block */}
        <div style={{
          width: 200,
          height: 100,
          background: 'rgba(99, 102, 241, 0.3)',
          border: '3px solid #6366f1',
          borderRadius: 15,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 36,
          color: 'white',
        }}>
          F(x)
        </div>

        <div style={{ fontSize: 40, color: '#a78bfa', marginBottom: 20, marginTop: 20 }}>↓</div>

        {/* Addition */}
        <div style={{
          opacity: fadeIn(frame, 30),
          transform: `scale(${scaleIn(frame, fps, 30)})`,
          width: 80,
          height: 80,
          borderRadius: '50%',
          background: 'linear-gradient(45deg, #f59e0b, #fbbf24)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 50,
          fontWeight: 'bold',
          color: 'white',
          marginBottom: 20,
        }}>
          +
        </div>

        {/* Output */}
        <div style={{
          opacity: fadeIn(frame, 45),
          width: 200,
          height: 80,
          background: 'linear-gradient(45deg, #10b981, #34d399)',
          borderRadius: 15,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 36,
          fontWeight: 'bold',
          color: 'white',
        }}>
          F(x) + x
        </div>

        {/* Skip Arrow */}
        <svg style={{
          position: 'absolute',
          top: 40,
          left: '55%',
          opacity: fadeIn(frame, 20),
        }} width="200" height="280" viewBox="0 0 200 280">
          <path
            d="M 0 40 Q 150 40, 150 140 Q 150 240, 0 240"
            fill="none"
            stroke="#f59e0b"
            strokeWidth="5"
            markerEnd="url(#arrowhead)"
          />
          <defs>
            <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#f59e0b" />
            </marker>
          </defs>
          <text x="110" y="150" fill="#f59e0b" fontSize="28" fontWeight="bold">Skip!</text>
        </svg>
      </div>

      <div style={{
        opacity: fadeIn(frame, 60),
        position: 'absolute',
        bottom: 120,
        left: '50%',
        transform: 'translateX(-50%)',
        fontSize: 36,
        color: '#34d399',
        textAlign: 'center',
      }}>
        입력을 출력에 직접 더해요!
      </div>
      <GlobalOverlay />
    </AbsoluteFill>
  );
};

// Scene 4: ResNet History
const Scene04_Resnet: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{
      background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)',
      padding: 60,
    }}>
      <div style={{
        opacity: fadeIn(frame),
        fontSize: 55,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        marginBottom: 40,
      }}>
        ResNet의 발명 🏆
      </div>

      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 60,
        marginTop: 30,
      }}>
        {/* Timeline */}
        <div style={{
          opacity: fadeIn(frame, 15),
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
          <div style={{
            fontSize: 80,
            fontWeight: 'bold',
            color: '#fbbf24',
            textShadow: '0 0 20px rgba(251, 191, 36, 0.5)',
          }}>
            2015
          </div>
          <div style={{
            fontSize: 32,
            color: '#a5b4fc',
            marginTop: 15,
          }}>
            ImageNet 우승
          </div>
        </div>

        {/* ResNet Block */}
        <div style={{
          opacity: fadeIn(frame, 30),
          transform: `scale(${scaleIn(frame, fps, 30)})`,
          background: 'rgba(139, 92, 246, 0.2)',
          border: '3px solid #8b5cf6',
          borderRadius: 20,
          padding: 40,
          textAlign: 'center',
        }}>
          <div style={{
            fontSize: 60,
            fontWeight: 'bold',
            color: 'white',
            marginBottom: 20,
          }}>
            ResNet
          </div>
          <div style={{
            fontSize: 36,
            color: '#c4b5fd',
          }}>
            Residual Network
          </div>
          <div style={{
            marginTop: 30,
            fontSize: 100,
          }}>
            🥇
          </div>
        </div>
      </div>

      {/* Achievement */}
      <div style={{
        opacity: fadeIn(frame, 45),
        marginTop: 50,
        textAlign: 'center',
      }}>
        <div style={{
          fontSize: 40,
          color: '#34d399',
          marginBottom: 20,
        }}>
          152층 깊이의 네트워크 학습 성공!
        </div>
        <div style={{
          fontSize: 32,
          color: '#a5b4fc',
        }}>
          잔차 연결 덕분에 가능했어요!
        </div>
      </div>
      <GlobalOverlay />
    </AbsoluteFill>
  );
};

// Scene 5: Why It Works
const Scene05_WhyWorks: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{
      background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)',
      padding: 60,
    }}>
      <div style={{
        opacity: fadeIn(frame),
        fontSize: 55,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        marginBottom: 40,
      }}>
        왜 잘 작동할까요? 🤔
      </div>

      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: 60,
        marginTop: 30,
      }}>
        {/* Original Problem */}
        <div style={{
          opacity: fadeIn(frame, 15),
          background: 'rgba(239, 68, 68, 0.2)',
          border: '2px solid #ef4444',
          borderRadius: 20,
          padding: 30,
          textAlign: 'center',
          width: 400,
        }}>
          <div style={{
            fontSize: 32,
            color: '#fca5a5',
            marginBottom: 20,
          }}>
            원래 문제
          </div>
          <div style={{
            fontSize: 48,
            fontWeight: 'bold',
            color: 'white',
            marginBottom: 15,
          }}>
            H(x)를 학습
          </div>
          <div style={{
            fontSize: 28,
            color: '#a5b4fc',
          }}>
            전체 함수를 배워야 해요
          </div>
          <div style={{
            marginTop: 20,
            fontSize: 30,
            color: '#ef4444',
          }}>
            어렵다! 😫
          </div>
        </div>

        {/* Arrow */}
        <div style={{
          opacity: fadeIn(frame, 30),
          display: 'flex',
          alignItems: 'center',
          fontSize: 60,
          color: '#fbbf24',
        }}>
          →
        </div>

        {/* Residual Solution */}
        <div style={{
          opacity: fadeIn(frame, 30),
          background: 'rgba(16, 185, 129, 0.2)',
          border: '2px solid #10b981',
          borderRadius: 20,
          padding: 30,
          textAlign: 'center',
          width: 400,
        }}>
          <div style={{
            fontSize: 32,
            color: '#6ee7b7',
            marginBottom: 20,
          }}>
            잔차 학습
          </div>
          <div style={{
            fontSize: 48,
            fontWeight: 'bold',
            color: 'white',
            marginBottom: 15,
          }}>
            F(x) = H(x) - x
          </div>
          <div style={{
            fontSize: 28,
            color: '#a5b4fc',
          }}>
            차이만 배우면 돼요!
          </div>
          <div style={{
            marginTop: 20,
            fontSize: 30,
            color: '#10b981',
          }}>
            쉽다! 😊
          </div>
        </div>
      </div>

      <div style={{
        opacity: fadeIn(frame, 50),
        marginTop: 50,
        textAlign: 'center',
        fontSize: 36,
        color: '#fbbf24',
      }}>
        💡 변화량만 학습하면 되니까 더 쉬워요!
      </div>
      <GlobalOverlay />
    </AbsoluteFill>
  );
};

// Scene 6: Gradient Flow
const Scene06_Gradient: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const flowProgress = interpolate(frame, [30, 100], [0, 100], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });

  return (
    <AbsoluteFill style={{
      background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)',
      padding: 60,
    }}>
      <div style={{
        opacity: fadeIn(frame),
        fontSize: 55,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        marginBottom: 40,
      }}>
        기울기 흐름 🌊
      </div>

      {/* Gradient Formula */}
      <div style={{
        opacity: fadeIn(frame, 15),
        textAlign: 'center',
        marginBottom: 40,
      }}>
        <div style={{
          fontSize: 44,
          color: 'white',
          fontFamily: 'monospace',
        }}>
          ∂L/∂x = ∂L/∂y × (∂F/∂x + <span style={{ color: '#fbbf24' }}>1</span>)
        </div>
      </div>

      {/* Visual Explanation */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: 80,
        marginTop: 30,
      }}>
        {/* Without Skip */}
        <div style={{
          opacity: fadeIn(frame, 30),
          textAlign: 'center',
        }}>
          <div style={{
            fontSize: 30,
            color: '#fca5a5',
            marginBottom: 20,
          }}>
            스킵 없이
          </div>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 10,
          }}>
            {[1, 2, 3, 4].map((_, i) => (
              <div key={i} style={{
                width: 100,
                height: 40,
                background: `rgba(239, 68, 68, ${1 - i * 0.25})`,
                borderRadius: 8,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 20,
                color: 'white',
              }}>
                {Math.round((1 - i * 0.25) * 100)}%
              </div>
            ))}
          </div>
          <div style={{
            marginTop: 15,
            fontSize: 24,
            color: '#ef4444',
          }}>
            점점 작아져요 😢
          </div>
        </div>

        {/* With Skip */}
        <div style={{
          opacity: fadeIn(frame, 45),
          textAlign: 'center',
        }}>
          <div style={{
            fontSize: 30,
            color: '#6ee7b7',
            marginBottom: 20,
          }}>
            스킵 연결과 함께
          </div>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 10,
          }}>
            {[1, 2, 3, 4].map((_, i) => (
              <div key={i} style={{
                width: 100,
                height: 40,
                background: `rgba(16, 185, 129, ${1 - i * 0.05})`,
                borderRadius: 8,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 20,
                color: 'white',
              }}>
                {Math.round((1 - i * 0.05) * 100)}%
              </div>
            ))}
          </div>
          <div style={{
            marginTop: 15,
            fontSize: 24,
            color: '#10b981',
          }}>
            잘 유지돼요! 🎉
          </div>
        </div>
      </div>

      <div style={{
        opacity: fadeIn(frame, 60),
        position: 'absolute',
        bottom: 120,
        left: '50%',
        transform: 'translateX(-50%)',
        fontSize: 34,
        color: '#fbbf24',
        textAlign: 'center',
      }}>
        +1 덕분에 기울기가 항상 흘러요! ✨
      </div>
      <GlobalOverlay />
    </AbsoluteFill>
  );
};

// Scene 7: Transformer Usage
const Scene07_Transformer: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{
      background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)',
      padding: 60,
    }}>
      <div style={{
        opacity: fadeIn(frame),
        fontSize: 55,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        marginBottom: 40,
      }}>
        트랜스포머에서의 활용 🤖
      </div>

      {/* Transformer Block */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        marginTop: 20,
      }}>
        <div style={{
          opacity: fadeIn(frame, 15),
          background: 'rgba(99, 102, 241, 0.2)',
          border: '3px solid #6366f1',
          borderRadius: 20,
          padding: 30,
          position: 'relative',
        }}>
          {/* Input */}
          <div style={{
            textAlign: 'center',
            marginBottom: 20,
          }}>
            <div style={{
              width: 150,
              height: 60,
              background: 'linear-gradient(45deg, #8b5cf6, #a78bfa)',
              borderRadius: 10,
              margin: '0 auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 28,
              color: 'white',
            }}>
              Input
            </div>
          </div>

          <div style={{ textAlign: 'center', fontSize: 30, color: '#a78bfa' }}>↓</div>

          {/* Attention */}
          <div style={{
            opacity: fadeIn(frame, 25),
            textAlign: 'center',
            marginTop: 15,
            marginBottom: 15,
          }}>
            <div style={{
              width: 250,
              height: 70,
              background: 'linear-gradient(90deg, #f59e0b, #fbbf24)',
              borderRadius: 12,
              margin: '0 auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 26,
              fontWeight: 'bold',
              color: 'white',
            }}>
              Self-Attention
            </div>
          </div>

          <div style={{ textAlign: 'center', fontSize: 30, color: '#a78bfa' }}>↓</div>

          {/* Add & Norm 1 */}
          <div style={{
            opacity: fadeIn(frame, 35),
            textAlign: 'center',
            marginTop: 15,
            marginBottom: 15,
          }}>
            <div style={{
              width: 200,
              height: 60,
              background: 'linear-gradient(90deg, #10b981, #34d399)',
              borderRadius: 12,
              margin: '0 auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 24,
              fontWeight: 'bold',
              color: 'white',
            }}>
              Add & Norm ✨
            </div>
          </div>

          <div style={{ textAlign: 'center', fontSize: 30, color: '#a78bfa' }}>↓</div>

          {/* FFN */}
          <div style={{
            opacity: fadeIn(frame, 45),
            textAlign: 'center',
            marginTop: 15,
            marginBottom: 15,
          }}>
            <div style={{
              width: 250,
              height: 70,
              background: 'linear-gradient(90deg, #6366f1, #8b5cf6)',
              borderRadius: 12,
              margin: '0 auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 26,
              fontWeight: 'bold',
              color: 'white',
            }}>
              Feed Forward
            </div>
          </div>

          <div style={{ textAlign: 'center', fontSize: 30, color: '#a78bfa' }}>↓</div>

          {/* Add & Norm 2 */}
          <div style={{
            opacity: fadeIn(frame, 55),
            textAlign: 'center',
            marginTop: 15,
          }}>
            <div style={{
              width: 200,
              height: 60,
              background: 'linear-gradient(90deg, #10b981, #34d399)',
              borderRadius: 12,
              margin: '0 auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 24,
              fontWeight: 'bold',
              color: 'white',
            }}>
              Add & Norm ✨
            </div>
          </div>

          {/* Skip Connections */}
          <svg style={{
            position: 'absolute',
            top: 0,
            left: -80,
            opacity: fadeIn(frame, 60),
          }} width="80" height="500" viewBox="0 0 80 500">
            <path d="M 60 80 Q 20 80, 20 180 Q 20 280, 60 280" fill="none" stroke="#fbbf24" strokeWidth="3" strokeDasharray="8,4" />
            <path d="M 60 290 Q 20 290, 20 390 Q 20 470, 60 470" fill="none" stroke="#fbbf24" strokeWidth="3" strokeDasharray="8,4" />
          </svg>
        </div>
      </div>

      <div style={{
        opacity: fadeIn(frame, 70),
        position: 'absolute',
        bottom: 100,
        left: '50%',
        transform: 'translateX(-50%)',
        fontSize: 32,
        color: '#fbbf24',
      }}>
        매 서브레이어 후에 잔차 연결!
      </div>
      <GlobalOverlay />
    </AbsoluteFill>
  );
};

// Scene 8: Add & Norm
const Scene08_AddNorm: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{
      background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)',
      padding: 60,
    }}>
      <div style={{
        opacity: fadeIn(frame),
        fontSize: 55,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        marginBottom: 50,
      }}>
        Add & Norm이란? 🔄
      </div>

      {/* Add & Norm Breakdown */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 40,
      }}>
        {/* Add Part */}
        <div style={{
          opacity: fadeIn(frame, 15),
          background: 'rgba(245, 158, 11, 0.2)',
          border: '3px solid #f59e0b',
          borderRadius: 20,
          padding: 40,
          textAlign: 'center',
        }}>
          <div style={{
            fontSize: 50,
            fontWeight: 'bold',
            color: '#fbbf24',
            marginBottom: 20,
          }}>
            Add
          </div>
          <div style={{
            fontSize: 36,
            color: 'white',
            marginBottom: 15,
          }}>
            x + Sublayer(x)
          </div>
          <div style={{
            fontSize: 26,
            color: '#a5b4fc',
          }}>
            잔차 연결!
          </div>
        </div>

        {/* Plus Sign */}
        <div style={{
          opacity: fadeIn(frame, 30),
          fontSize: 60,
          color: 'white',
        }}>
          &
        </div>

        {/* Norm Part */}
        <div style={{
          opacity: fadeIn(frame, 30),
          background: 'rgba(16, 185, 129, 0.2)',
          border: '3px solid #10b981',
          borderRadius: 20,
          padding: 40,
          textAlign: 'center',
        }}>
          <div style={{
            fontSize: 50,
            fontWeight: 'bold',
            color: '#34d399',
            marginBottom: 20,
          }}>
            Norm
          </div>
          <div style={{
            fontSize: 36,
            color: 'white',
            marginBottom: 15,
          }}>
            LayerNorm(...)
          </div>
          <div style={{
            fontSize: 26,
            color: '#a5b4fc',
          }}>
            정규화!
          </div>
        </div>
      </div>

      {/* Combined Formula */}
      <div style={{
        opacity: fadeIn(frame, 45),
        marginTop: 50,
        textAlign: 'center',
      }}>
        <div style={{
          fontSize: 40,
          color: '#c4b5fd',
          marginBottom: 15,
        }}>
          합치면:
        </div>
        <div style={{
          fontSize: 44,
          fontWeight: 'bold',
          color: 'white',
          fontFamily: 'monospace',
        }}>
          LayerNorm(x + Sublayer(x))
        </div>
      </div>

      <div style={{
        opacity: fadeIn(frame, 60),
        position: 'absolute',
        bottom: 120,
        left: '50%',
        transform: 'translateX(-50%)',
        fontSize: 32,
        color: '#a78bfa',
      }}>
        두 기법을 함께 사용해요!
      </div>
      <GlobalOverlay />
    </AbsoluteFill>
  );
};

// Scene 9: Dimension Matching
const Scene09_Dimension: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{
      background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)',
      padding: 60,
    }}>
      <div style={{
        opacity: fadeIn(frame),
        fontSize: 55,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        marginBottom: 40,
      }}>
        차원이 맞아야 해요! 📐
      </div>

      {/* Dimension Requirement */}
      <div style={{
        opacity: fadeIn(frame, 15),
        textAlign: 'center',
        marginBottom: 40,
      }}>
        <div style={{
          fontSize: 40,
          color: '#a5b4fc',
          marginBottom: 20,
        }}>
          x + F(x)를 하려면...
        </div>
        <div style={{
          fontSize: 48,
          fontWeight: 'bold',
          color: '#fbbf24',
        }}>
          x와 F(x)의 크기가 같아야!
        </div>
      </div>

      {/* Visual Example */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: 60,
        marginTop: 30,
      }}>
        {/* Same Dimension */}
        <div style={{
          opacity: fadeIn(frame, 30),
          background: 'rgba(16, 185, 129, 0.2)',
          border: '2px solid #10b981',
          borderRadius: 15,
          padding: 30,
          textAlign: 'center',
        }}>
          <div style={{
            fontSize: 28,
            color: '#6ee7b7',
            marginBottom: 20,
          }}>
            같은 차원 ✓
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 15,
          }}>
            <div style={{
              width: 100,
              height: 60,
              background: '#8b5cf6',
              borderRadius: 8,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 24,
              color: 'white',
            }}>
              512
            </div>
            <span style={{ fontSize: 30, color: 'white' }}>+</span>
            <div style={{
              width: 100,
              height: 60,
              background: '#6366f1',
              borderRadius: 8,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 24,
              color: 'white',
            }}>
              512
            </div>
            <span style={{ fontSize: 30, color: 'white' }}>=</span>
            <span style={{ fontSize: 40, color: '#10b981' }}>✓</span>
          </div>
        </div>

        {/* Different Dimension */}
        <div style={{
          opacity: fadeIn(frame, 45),
          background: 'rgba(239, 68, 68, 0.2)',
          border: '2px solid #ef4444',
          borderRadius: 15,
          padding: 30,
          textAlign: 'center',
        }}>
          <div style={{
            fontSize: 28,
            color: '#fca5a5',
            marginBottom: 20,
          }}>
            다른 차원 ✗
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 15,
          }}>
            <div style={{
              width: 100,
              height: 60,
              background: '#8b5cf6',
              borderRadius: 8,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 24,
              color: 'white',
            }}>
              512
            </div>
            <span style={{ fontSize: 30, color: 'white' }}>+</span>
            <div style={{
              width: 100,
              height: 60,
              background: '#6366f1',
              borderRadius: 8,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 24,
              color: 'white',
            }}>
              256
            </div>
            <span style={{ fontSize: 30, color: 'white' }}>=</span>
            <span style={{ fontSize: 40, color: '#ef4444' }}>✗</span>
          </div>
        </div>
      </div>

      <div style={{
        opacity: fadeIn(frame, 60),
        marginTop: 50,
        textAlign: 'center',
        fontSize: 34,
        color: '#c4b5fd',
      }}>
        트랜스포머는 차원이 변하지 않아서 OK!
      </div>
      <GlobalOverlay />
    </AbsoluteFill>
  );
};

// Scene 10: Benefits
const Scene10_Benefit: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const benefits = [
    { icon: '🏗️', title: '깊은 네트워크', desc: '기울기 소실 해결!' },
    { icon: '⚡', title: '빠른 학습', desc: '더 쉬운 문제를 풂' },
    { icon: '💾', title: '정보 보존', desc: '원본 입력 직접 전달' },
    { icon: '🎭', title: '앙상블 효과', desc: '여러 경로 결과 합침' },
  ];

  return (
    <AbsoluteFill style={{
      background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)',
      padding: 60,
    }}>
      <div style={{
        opacity: fadeIn(frame),
        fontSize: 55,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        marginBottom: 50,
      }}>
        잔차 연결의 장점 🌟
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: 30,
        maxWidth: 1000,
        margin: '0 auto',
      }}>
        {benefits.map((benefit, i) => (
          <div key={i} style={{
            opacity: fadeIn(frame, 15 + i * 15),
            transform: `scale(${scaleIn(frame, fps, 15 + i * 15)})`,
            background: 'rgba(139, 92, 246, 0.2)',
            border: '2px solid #8b5cf6',
            borderRadius: 20,
            padding: 30,
            textAlign: 'center',
          }}>
            <div style={{
              fontSize: 60,
              marginBottom: 15,
            }}>
              {benefit.icon}
            </div>
            <div style={{
              fontSize: 32,
              fontWeight: 'bold',
              color: 'white',
              marginBottom: 10,
            }}>
              {benefit.title}
            </div>
            <div style={{
              fontSize: 26,
              color: '#c4b5fd',
            }}>
              {benefit.desc}
            </div>
          </div>
        ))}
      </div>
      <GlobalOverlay />
    </AbsoluteFill>
  );
};

// Scene 11: Code
const Scene11_Code: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{
      background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)',
      padding: 60,
    }}>
      <div style={{
        opacity: fadeIn(frame),
        fontSize: 55,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        marginBottom: 40,
      }}>
        코드로 보면 간단해요! 💻
      </div>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 30,
      }}>
        {/* Basic Version */}
        <div style={{
          opacity: fadeIn(frame, 15),
          background: '#1a1a2e',
          borderRadius: 15,
          padding: 30,
          border: '2px solid #4c4c6d',
        }}>
          <div style={{
            fontSize: 24,
            color: '#a5b4fc',
            marginBottom: 15,
          }}>
            기본 잔차 연결:
          </div>
          <div style={{
            fontFamily: 'monospace',
            fontSize: 36,
            color: '#f8f8f2',
          }}>
            <span style={{ color: '#ff79c6' }}>x</span>
            <span style={{ color: '#f8f8f2' }}> = </span>
            <span style={{ color: '#ff79c6' }}>x</span>
            <span style={{ color: '#50fa7b' }}> + </span>
            <span style={{ color: '#8be9fd' }}>self</span>
            <span style={{ color: '#f8f8f2' }}>.</span>
            <span style={{ color: '#ffb86c' }}>attention</span>
            <span style={{ color: '#f8f8f2' }}>(</span>
            <span style={{ color: '#ff79c6' }}>x</span>
            <span style={{ color: '#f8f8f2' }}>)</span>
          </div>
        </div>

        {/* Pre-Norm Version */}
        <div style={{
          opacity: fadeIn(frame, 35),
          background: '#1a1a2e',
          borderRadius: 15,
          padding: 30,
          border: '2px solid #4c4c6d',
        }}>
          <div style={{
            fontSize: 24,
            color: '#a5b4fc',
            marginBottom: 15,
          }}>
            Pre-Norm 스타일:
          </div>
          <div style={{
            fontFamily: 'monospace',
            fontSize: 32,
            color: '#f8f8f2',
          }}>
            <span style={{ color: '#ff79c6' }}>x</span>
            <span style={{ color: '#f8f8f2' }}> = </span>
            <span style={{ color: '#ff79c6' }}>x</span>
            <span style={{ color: '#50fa7b' }}> + </span>
            <span style={{ color: '#8be9fd' }}>self</span>
            <span style={{ color: '#f8f8f2' }}>.</span>
            <span style={{ color: '#ffb86c' }}>attention</span>
            <span style={{ color: '#f8f8f2' }}>(</span>
            <span style={{ color: '#8be9fd' }}>self</span>
            <span style={{ color: '#f8f8f2' }}>.</span>
            <span style={{ color: '#ffb86c' }}>norm</span>
            <span style={{ color: '#f8f8f2' }}>(</span>
            <span style={{ color: '#ff79c6' }}>x</span>
            <span style={{ color: '#f8f8f2' }}>))</span>
          </div>
        </div>
      </div>

      <div style={{
        opacity: fadeIn(frame, 55),
        marginTop: 40,
        textAlign: 'center',
        fontSize: 36,
        color: '#34d399',
      }}>
        더하기 한 줄로 강력한 효과! ✨
      </div>
      <GlobalOverlay />
    </AbsoluteFill>
  );
};

// Scene 12: Outro
const Scene12_Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const summaryItems = [
    '잔차 연결 = 입력을 출력에 더함',
    '출력 = F(x) + x',
    '기울기가 잘 흘러요!',
    '트랜스포머: Add & Norm',
  ];

  return (
    <AbsoluteFill style={{
      background: 'linear-gradient(135deg, #1e1b4b 0%, #3730a3 50%, #6366f1 100%)',
      padding: 60,
    }}>
      <div style={{
        opacity: fadeIn(frame),
        fontSize: 55,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        marginBottom: 40,
      }}>
        오늘 배운 내용 정리! 📝
      </div>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 20,
      }}>
        {summaryItems.map((item, i) => (
          <div key={i} style={{
            opacity: fadeIn(frame, 15 + i * 12),
            transform: `translateX(${interpolate(frame - (15 + i * 12), [0, 20], [-50, 0], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' })}px)`,
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: 15,
            padding: '15px 40px',
            fontSize: 32,
            color: 'white',
          }}>
            ✓ {item}
          </div>
        ))}
      </div>

      {/* Next Lesson Preview */}
      <div style={{
        opacity: fadeIn(frame, 70),
        marginTop: 50,
        textAlign: 'center',
      }}>
        <div style={{
          fontSize: 32,
          color: '#c4b5fd',
          marginBottom: 15,
        }}>
          다음 레슨에서는...
        </div>
        <div style={{
          fontSize: 44,
          fontWeight: 'bold',
          color: '#fbbf24',
        }}>
          Feed Forward Network (FFN) 🚀
        </div>
      </div>

      {/* Thank You */}
      <div style={{
        opacity: fadeIn(frame, 90),
        position: 'absolute',
        bottom: 130,
        left: '50%',
        transform: 'translateX(-50%)',
        fontSize: 48,
        fontWeight: 'bold',
        color: 'white',
        textShadow: '0 0 30px rgba(167, 139, 250, 0.8)',
      }}>
        감사합니다! 🙏
      </div>
      <GlobalOverlay />
    </AbsoluteFill>
  );
};

// Main Video Component
export const Lesson7_5Video: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: '#1e1b4b' }}>
      {/* Audio tracks */}
      <Sequence from={SCENE_TIMINGS.scene01_intro.start} durationInFrames={SCENE_TIMINGS.scene01_intro.duration}>
        <Audio src={staticFile('audio/lesson-7-5/scene01_intro.mp3')} />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.scene02_problem.start} durationInFrames={SCENE_TIMINGS.scene02_problem.duration}>
        <Audio src={staticFile('audio/lesson-7-5/scene02_problem.mp3')} />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.scene03_idea.start} durationInFrames={SCENE_TIMINGS.scene03_idea.duration}>
        <Audio src={staticFile('audio/lesson-7-5/scene03_idea.mp3')} />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.scene04_resnet.start} durationInFrames={SCENE_TIMINGS.scene04_resnet.duration}>
        <Audio src={staticFile('audio/lesson-7-5/scene04_resnet.mp3')} />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.scene05_why_works.start} durationInFrames={SCENE_TIMINGS.scene05_why_works.duration}>
        <Audio src={staticFile('audio/lesson-7-5/scene05_why_works.mp3')} />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.scene06_gradient.start} durationInFrames={SCENE_TIMINGS.scene06_gradient.duration}>
        <Audio src={staticFile('audio/lesson-7-5/scene06_gradient.mp3')} />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.scene07_transformer.start} durationInFrames={SCENE_TIMINGS.scene07_transformer.duration}>
        <Audio src={staticFile('audio/lesson-7-5/scene07_transformer.mp3')} />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.scene08_add_norm.start} durationInFrames={SCENE_TIMINGS.scene08_add_norm.duration}>
        <Audio src={staticFile('audio/lesson-7-5/scene08_add_norm.mp3')} />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.scene09_dimension.start} durationInFrames={SCENE_TIMINGS.scene09_dimension.duration}>
        <Audio src={staticFile('audio/lesson-7-5/scene09_dimension.mp3')} />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.scene10_benefit.start} durationInFrames={SCENE_TIMINGS.scene10_benefit.duration}>
        <Audio src={staticFile('audio/lesson-7-5/scene10_benefit.mp3')} />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.scene11_code.start} durationInFrames={SCENE_TIMINGS.scene11_code.duration}>
        <Audio src={staticFile('audio/lesson-7-5/scene11_code.mp3')} />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.scene12_outro.start} durationInFrames={SCENE_TIMINGS.scene12_outro.duration}>
        <Audio src={staticFile('audio/lesson-7-5/scene12_outro.mp3')} />
      </Sequence>

      {/* Visual Scenes */}
      <Sequence from={SCENE_TIMINGS.scene01_intro.start} durationInFrames={SCENE_TIMINGS.scene01_intro.duration}>
        <Scene01_Intro />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.scene02_problem.start} durationInFrames={SCENE_TIMINGS.scene02_problem.duration}>
        <Scene02_Problem />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.scene03_idea.start} durationInFrames={SCENE_TIMINGS.scene03_idea.duration}>
        <Scene03_Idea />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.scene04_resnet.start} durationInFrames={SCENE_TIMINGS.scene04_resnet.duration}>
        <Scene04_Resnet />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.scene05_why_works.start} durationInFrames={SCENE_TIMINGS.scene05_why_works.duration}>
        <Scene05_WhyWorks />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.scene06_gradient.start} durationInFrames={SCENE_TIMINGS.scene06_gradient.duration}>
        <Scene06_Gradient />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.scene07_transformer.start} durationInFrames={SCENE_TIMINGS.scene07_transformer.duration}>
        <Scene07_Transformer />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.scene08_add_norm.start} durationInFrames={SCENE_TIMINGS.scene08_add_norm.duration}>
        <Scene08_AddNorm />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.scene09_dimension.start} durationInFrames={SCENE_TIMINGS.scene09_dimension.duration}>
        <Scene09_Dimension />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.scene10_benefit.start} durationInFrames={SCENE_TIMINGS.scene10_benefit.duration}>
        <Scene10_Benefit />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.scene11_code.start} durationInFrames={SCENE_TIMINGS.scene11_code.duration}>
        <Scene11_Code />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.scene12_outro.start} durationInFrames={SCENE_TIMINGS.scene12_outro.duration}>
        <Scene12_Outro />
      </Sequence>
    </AbsoluteFill>
  );
};
