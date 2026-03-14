import { AbsoluteFill, Audio, Img, interpolate, Sequence, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';

// Scene timings from audio analysis
const SCENE_TIMINGS = {
  scene01_intro: { start: 0, duration: 495 },
  scene02_overview: { start: 495, duration: 566 },
  scene03_input: { start: 1061, duration: 624 },
  scene04_block: { start: 1685, duration: 713 },
  scene05_attention: { start: 2398, duration: 642 },
  scene06_addnorm1: { start: 3040, duration: 568 },
  scene07_ffn: { start: 3608, duration: 642 },
  scene08_addnorm2: { start: 4250, duration: 575 },
  scene09_stacking: { start: 4825, duration: 634 },
  scene10_dimensions: { start: 5459, duration: 770 },
  scene11_flow: { start: 6229, duration: 778 },
  scene12_outro: { start: 7007, duration: 834 },
};

export const LESSON_7_7_DURATION = 7841;

// GlobalOverlay component
const GlobalOverlay: React.FC = () => {
  return (
    <>
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
          Lesson 7-7
        </div>

        <div style={{
          opacity: fadeIn(frame, 15),
          transform: `scale(${scaleIn(frame, fps, 15)})`,
          fontSize: 72,
          fontWeight: 'bold',
          color: 'white',
          marginBottom: 30,
          textShadow: '0 0 40px rgba(167, 139, 250, 0.6)',
        }}>
          인코더 전체 구조
        </div>

        <div style={{
          opacity: fadeIn(frame, 30),
          transform: `translateY(${slideUp(frame, 30)}px)`,
          fontSize: 44,
          color: '#c4b5fd',
          marginBottom: 40,
        }}>
          Encoder Architecture Review
        </div>

        <div style={{
          opacity: fadeIn(frame, 45),
          fontSize: 32,
          color: '#fbbf24',
        }}>
          지금까지 배운 내용을 하나로!
        </div>
      </div>
      <GlobalOverlay />
    </AbsoluteFill>
  );
};

// Scene 2: Overview
const Scene02_Overview: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const steps = ['입력', '임베딩', '인코더 블록 x N', '출력'];

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
        인코더의 큰 그림 🖼️
      </div>

      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 30,
      }}>
        {steps.map((step, i) => (
          <React.Fragment key={i}>
            <div style={{
              opacity: fadeIn(frame, 15 + i * 15),
              transform: `scale(${scaleIn(frame, fps, 15 + i * 15)})`,
              background: i === 2 ? 'linear-gradient(45deg, #ec4899, #f472b6)' : 'linear-gradient(45deg, #8b5cf6, #a78bfa)',
              borderRadius: 15,
              padding: '25px 35px',
              fontSize: 28,
              fontWeight: 'bold',
              color: 'white',
              boxShadow: i === 2 ? '0 0 30px rgba(236, 72, 153, 0.5)' : 'none',
            }}>
              {step}
            </div>
            {i < steps.length - 1 && (
              <div style={{
                opacity: fadeIn(frame, 25 + i * 15),
                fontSize: 40,
                color: '#fbbf24',
              }}>
                →
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

      <div style={{
        opacity: fadeIn(frame, 75),
        marginTop: 50,
        textAlign: 'center',
      }}>
        <div style={{
          fontSize: 32,
          color: '#a5b4fc',
          marginBottom: 15,
        }}>
          인코더 블록을 여러 개 쌓아요!
        </div>
        <div style={{
          fontSize: 28,
          color: '#fbbf24',
        }}>
          보통 6개 또는 12개!
        </div>
      </div>
      <GlobalOverlay />
    </AbsoluteFill>
  );
};

// Scene 3: Input Processing
const Scene03_Input: React.FC = () => {
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
        입력 처리 과정 📥
      </div>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 25,
      }}>
        {/* Sentence */}
        <div style={{
          opacity: fadeIn(frame, 10),
          background: 'rgba(99, 102, 241, 0.3)',
          borderRadius: 15,
          padding: '15px 40px',
          fontSize: 32,
          color: 'white',
        }}>
          "안녕하세요"
        </div>

        <div style={{ opacity: fadeIn(frame, 20), fontSize: 35, color: '#fbbf24' }}>↓ 토크나이징</div>

        {/* Tokens */}
        <div style={{
          opacity: fadeIn(frame, 25),
          display: 'flex',
          gap: 15,
        }}>
          {['안녕', '하세요'].map((token, i) => (
            <div key={i} style={{
              background: 'linear-gradient(45deg, #f59e0b, #fbbf24)',
              borderRadius: 10,
              padding: '12px 25px',
              fontSize: 26,
              color: 'white',
            }}>
              {token}
            </div>
          ))}
        </div>

        <div style={{ opacity: fadeIn(frame, 35), fontSize: 35, color: '#10b981' }}>↓ 임베딩</div>

        {/* Vectors */}
        <div style={{
          opacity: fadeIn(frame, 40),
          display: 'flex',
          gap: 15,
        }}>
          {['[0.2, 0.5, ...]', '[0.8, 0.1, ...]'].map((vec, i) => (
            <div key={i} style={{
              background: 'linear-gradient(45deg, #10b981, #34d399)',
              borderRadius: 10,
              padding: '12px 25px',
              fontSize: 22,
              color: 'white',
              fontFamily: 'monospace',
            }}>
              {vec}
            </div>
          ))}
        </div>

        <div style={{ opacity: fadeIn(frame, 50), fontSize: 35, color: '#ec4899' }}>↓ 위치 인코딩</div>

        {/* Final */}
        <div style={{
          opacity: fadeIn(frame, 55),
          background: 'linear-gradient(90deg, #ec4899, #f472b6)',
          borderRadius: 15,
          padding: '15px 40px',
          fontSize: 28,
          color: 'white',
          fontWeight: 'bold',
        }}>
          인코더 입력 준비 완료! ✓
        </div>
      </div>
      <GlobalOverlay />
    </AbsoluteFill>
  );
};

// Scene 4: Encoder Block
const Scene04_Block: React.FC = () => {
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
        marginBottom: 30,
      }}>
        인코더 블록 하나 🧱
      </div>

      <div style={{
        display: 'flex',
        justifyContent: 'center',
      }}>
        <div style={{
          background: 'rgba(99, 102, 241, 0.2)',
          border: '3px solid #6366f1',
          borderRadius: 20,
          padding: 30,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 12,
        }}>
          {/* Input */}
          <div style={{
            opacity: fadeIn(frame, 10),
            width: 180,
            height: 50,
            background: 'linear-gradient(45deg, #8b5cf6, #a78bfa)',
            borderRadius: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 24,
            color: 'white',
          }}>
            Input
          </div>

          <div style={{ fontSize: 25, color: '#a78bfa' }}>↓</div>

          {/* Self-Attention */}
          <div style={{
            opacity: fadeIn(frame, 20),
            width: 240,
            height: 60,
            background: 'linear-gradient(90deg, #f59e0b, #fbbf24)',
            borderRadius: 12,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 24,
            fontWeight: 'bold',
            color: 'white',
          }}>
            Self-Attention
          </div>

          <div style={{ fontSize: 25, color: '#a78bfa' }}>↓</div>

          {/* Add & Norm 1 */}
          <div style={{
            opacity: fadeIn(frame, 30),
            width: 180,
            height: 50,
            background: 'linear-gradient(90deg, #10b981, #34d399)',
            borderRadius: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 22,
            color: 'white',
          }}>
            Add & Norm
          </div>

          <div style={{ fontSize: 25, color: '#a78bfa' }}>↓</div>

          {/* FFN */}
          <div style={{
            opacity: fadeIn(frame, 40),
            width: 240,
            height: 60,
            background: 'linear-gradient(90deg, #ec4899, #f472b6)',
            borderRadius: 12,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 24,
            fontWeight: 'bold',
            color: 'white',
          }}>
            FFN
          </div>

          <div style={{ fontSize: 25, color: '#a78bfa' }}>↓</div>

          {/* Add & Norm 2 */}
          <div style={{
            opacity: fadeIn(frame, 50),
            width: 180,
            height: 50,
            background: 'linear-gradient(90deg, #10b981, #34d399)',
            borderRadius: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 22,
            color: 'white',
          }}>
            Add & Norm
          </div>

          <div style={{ fontSize: 25, color: '#a78bfa' }}>↓</div>

          {/* Output */}
          <div style={{
            opacity: fadeIn(frame, 60),
            width: 180,
            height: 50,
            background: 'linear-gradient(45deg, #8b5cf6, #a78bfa)',
            borderRadius: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 24,
            color: 'white',
          }}>
            Output
          </div>
        </div>
      </div>
      <GlobalOverlay />
    </AbsoluteFill>
  );
};

// Scene 5: Attention Detail
const Scene05_Attention: React.FC = () => {
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
        멀티헤드 셀프 어텐션 🔍
      </div>

      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: 50,
      }}>
        {/* Process Flow */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 20,
        }}>
          <div style={{
            opacity: fadeIn(frame, 15),
            display: 'flex',
            gap: 20,
          }}>
            {['Q', 'K', 'V'].map((name, i) => (
              <div key={i} style={{
                width: 80,
                height: 60,
                background: ['#ef4444', '#3b82f6', '#10b981'][i],
                borderRadius: 10,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 28,
                fontWeight: 'bold',
                color: 'white',
              }}>
                {name}
              </div>
            ))}
          </div>

          <div style={{ opacity: fadeIn(frame, 30), fontSize: 30, color: '#fbbf24' }}>↓</div>

          <div style={{
            opacity: fadeIn(frame, 35),
            background: 'linear-gradient(90deg, #f59e0b, #fbbf24)',
            borderRadius: 15,
            padding: '20px 40px',
            fontSize: 28,
            fontWeight: 'bold',
            color: 'white',
          }}>
            Attention Score 계산
          </div>

          <div style={{ opacity: fadeIn(frame, 45), fontSize: 30, color: '#fbbf24' }}>↓</div>

          <div style={{
            opacity: fadeIn(frame, 50),
            display: 'flex',
            gap: 15,
          }}>
            {[1, 2, 3, 4].map((_, i) => (
              <div key={i} style={{
                width: 60,
                height: 50,
                background: '#8b5cf6',
                borderRadius: 8,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 18,
                color: 'white',
              }}>
                H{i + 1}
              </div>
            ))}
          </div>

          <div style={{ opacity: fadeIn(frame, 60), fontSize: 24, color: '#a5b4fc' }}>
            여러 헤드로 다양한 관계!
          </div>
        </div>
      </div>
      <GlobalOverlay />
    </AbsoluteFill>
  );
};

// Scene 6: Add & Norm 1
const Scene06_AddNorm1: React.FC = () => {
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
        첫 번째 Add & Norm ➕
      </div>

      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 30,
      }}>
        {/* Attention Output */}
        <div style={{
          opacity: fadeIn(frame, 15),
          width: 180,
          height: 80,
          background: 'linear-gradient(45deg, #f59e0b, #fbbf24)',
          borderRadius: 15,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 24,
          color: 'white',
        }}>
          Attention<br/>출력
        </div>

        {/* Plus */}
        <div style={{
          opacity: fadeIn(frame, 25),
          fontSize: 50,
          color: '#fbbf24',
        }}>
          +
        </div>

        {/* Original Input */}
        <div style={{
          opacity: fadeIn(frame, 25),
          width: 150,
          height: 80,
          background: 'linear-gradient(45deg, #8b5cf6, #a78bfa)',
          borderRadius: 15,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 24,
          color: 'white',
        }}>
          원본 x
        </div>

        {/* Arrow */}
        <div style={{
          opacity: fadeIn(frame, 35),
          fontSize: 50,
          color: '#fbbf24',
        }}>
          →
        </div>

        {/* LayerNorm */}
        <div style={{
          opacity: fadeIn(frame, 40),
          transform: `scale(${scaleIn(frame, fps, 40)})`,
          width: 200,
          height: 80,
          background: 'linear-gradient(45deg, #10b981, #34d399)',
          borderRadius: 15,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 24,
          fontWeight: 'bold',
          color: 'white',
        }}>
          LayerNorm
        </div>
      </div>

      <div style={{
        opacity: fadeIn(frame, 55),
        marginTop: 50,
        textAlign: 'center',
      }}>
        <div style={{
          fontSize: 32,
          color: '#6ee7b7',
          marginBottom: 15,
        }}>
          잔차 연결로 정보 보존!
        </div>
        <div style={{
          fontSize: 28,
          color: '#a5b4fc',
        }}>
          정규화로 학습 안정화!
        </div>
      </div>
      <GlobalOverlay />
    </AbsoluteFill>
  );
};

// Scene 7: FFN
const Scene07_FFN: React.FC = () => {
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
        Feed Forward Network 🔄
      </div>

      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 30,
      }}>
        {/* Input */}
        <div style={{
          opacity: fadeIn(frame, 15),
          width: 100,
          height: 70,
          background: 'linear-gradient(45deg, #8b5cf6, #a78bfa)',
          borderRadius: 10,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 28,
          color: 'white',
        }}>
          512
        </div>

        <div style={{ opacity: fadeIn(frame, 20), fontSize: 40, color: '#fbbf24' }}>→</div>

        {/* Linear 1 */}
        <div style={{
          opacity: fadeIn(frame, 25),
          background: 'linear-gradient(90deg, #3b82f6, #60a5fa)',
          borderRadius: 12,
          padding: '20px 30px',
          fontSize: 24,
          color: 'white',
        }}>
          Linear1
        </div>

        <div style={{ opacity: fadeIn(frame, 30), fontSize: 40, color: '#fbbf24' }}>→</div>

        {/* Expanded */}
        <div style={{
          opacity: fadeIn(frame, 35),
          transform: `scale(${scaleIn(frame, fps, 35)})`,
          width: 140,
          height: 90,
          background: 'linear-gradient(45deg, #f59e0b, #fbbf24)',
          borderRadius: 10,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 28,
          fontWeight: 'bold',
          color: 'white',
        }}>
          2048
        </div>

        <div style={{ opacity: fadeIn(frame, 40), fontSize: 40, color: '#fbbf24' }}>→</div>

        {/* Linear 2 */}
        <div style={{
          opacity: fadeIn(frame, 45),
          background: 'linear-gradient(90deg, #10b981, #34d399)',
          borderRadius: 12,
          padding: '20px 30px',
          fontSize: 24,
          color: 'white',
        }}>
          Linear2
        </div>

        <div style={{ opacity: fadeIn(frame, 50), fontSize: 40, color: '#fbbf24' }}>→</div>

        {/* Output */}
        <div style={{
          opacity: fadeIn(frame, 55),
          width: 100,
          height: 70,
          background: 'linear-gradient(45deg, #ec4899, #f472b6)',
          borderRadius: 10,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 28,
          color: 'white',
        }}>
          512
        </div>
      </div>

      <div style={{
        opacity: fadeIn(frame, 65),
        marginTop: 50,
        textAlign: 'center',
        fontSize: 32,
        color: '#c4b5fd',
      }}>
        각 토큰을 독립적으로 변환!
      </div>
      <GlobalOverlay />
    </AbsoluteFill>
  );
};

// Scene 8: Add & Norm 2
const Scene08_AddNorm2: React.FC = () => {
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
        두 번째 Add & Norm ➕
      </div>

      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 30,
      }}>
        {/* FFN Output */}
        <div style={{
          opacity: fadeIn(frame, 15),
          width: 160,
          height: 80,
          background: 'linear-gradient(45deg, #ec4899, #f472b6)',
          borderRadius: 15,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 24,
          color: 'white',
        }}>
          FFN 출력
        </div>

        <div style={{ opacity: fadeIn(frame, 25), fontSize: 50, color: '#fbbf24' }}>+</div>

        {/* Skip Input */}
        <div style={{
          opacity: fadeIn(frame, 25),
          width: 150,
          height: 80,
          background: 'linear-gradient(45deg, #8b5cf6, #a78bfa)',
          borderRadius: 15,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 24,
          color: 'white',
        }}>
          Skip
        </div>

        <div style={{ opacity: fadeIn(frame, 35), fontSize: 50, color: '#fbbf24' }}>→</div>

        {/* LayerNorm */}
        <div style={{
          opacity: fadeIn(frame, 40),
          transform: `scale(${scaleIn(frame, fps, 40)})`,
          width: 200,
          height: 80,
          background: 'linear-gradient(45deg, #10b981, #34d399)',
          borderRadius: 15,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 24,
          fontWeight: 'bold',
          color: 'white',
        }}>
          LayerNorm
        </div>
      </div>

      <div style={{
        opacity: fadeIn(frame, 55),
        marginTop: 50,
        textAlign: 'center',
        fontSize: 34,
        color: '#fbbf24',
      }}>
        인코더 블록 하나 완료! ✓
      </div>

      <div style={{
        opacity: fadeIn(frame, 70),
        marginTop: 20,
        textAlign: 'center',
        fontSize: 28,
        color: '#a5b4fc',
      }}>
        이걸 N번 반복! (보통 6번 또는 12번)
      </div>
      <GlobalOverlay />
    </AbsoluteFill>
  );
};

// Scene 9: Stacking
const Scene09_Stacking: React.FC = () => {
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
        블록 쌓기 🏗️
      </div>

      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 50,
      }}>
        {/* Stacked Blocks */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 10,
        }}>
          {[6, 5, 4, 3, 2, 1].map((n, i) => (
            <div key={n} style={{
              opacity: fadeIn(frame, 15 + i * 8),
              width: 200,
              height: 50,
              background: `linear-gradient(90deg, hsl(${260 + i * 10}, 70%, ${50 + i * 5}%), hsl(${270 + i * 10}, 70%, ${60 + i * 5}%))`,
              borderRadius: 10,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 22,
              color: 'white',
            }}>
              Block {n}
            </div>
          ))}
        </div>

        {/* Description */}
        <div style={{
          opacity: fadeIn(frame, 70),
          display: 'flex',
          flexDirection: 'column',
          gap: 20,
        }}>
          <div style={{
            background: 'rgba(99, 102, 241, 0.2)',
            borderRadius: 15,
            padding: 20,
            fontSize: 24,
            color: '#a5b4fc',
          }}>
            첫 번째 블록: 기본 패턴
          </div>
          <div style={{
            background: 'rgba(139, 92, 246, 0.2)',
            borderRadius: 15,
            padding: 20,
            fontSize: 24,
            color: '#c4b5fd',
          }}>
            중간 블록: 복잡한 관계
          </div>
          <div style={{
            background: 'rgba(236, 72, 153, 0.2)',
            borderRadius: 15,
            padding: 20,
            fontSize: 24,
            color: '#f9a8d4',
          }}>
            깊은 블록: 깊은 이해
          </div>
        </div>
      </div>
      <GlobalOverlay />
    </AbsoluteFill>
  );
};

// Scene 10: Dimensions
const Scene10_Dimensions: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const dims = [
    { name: 'd_model', value: '512 or 768', desc: '임베딩 차원' },
    { name: 'd_ff', value: '2048 or 3072', desc: 'FFN 내부 차원' },
    { name: 'heads', value: '8 or 12', desc: '헤드 수' },
    { name: 'layers', value: '6 or 12', desc: '블록 수' },
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
        주요 하이퍼파라미터 🔢
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: 30,
        maxWidth: 900,
        margin: '0 auto',
      }}>
        {dims.map((dim, i) => (
          <div key={i} style={{
            opacity: fadeIn(frame, 15 + i * 15),
            transform: `scale(${scaleIn(frame, fps, 15 + i * 15)})`,
            background: 'rgba(139, 92, 246, 0.2)',
            border: '2px solid #8b5cf6',
            borderRadius: 15,
            padding: 25,
            textAlign: 'center',
          }}>
            <div style={{
              fontSize: 28,
              fontWeight: 'bold',
              color: '#fbbf24',
              fontFamily: 'monospace',
              marginBottom: 10,
            }}>
              {dim.name}
            </div>
            <div style={{
              fontSize: 36,
              fontWeight: 'bold',
              color: 'white',
              marginBottom: 10,
            }}>
              {dim.value}
            </div>
            <div style={{
              fontSize: 22,
              color: '#a5b4fc',
            }}>
              {dim.desc}
            </div>
          </div>
        ))}
      </div>
      <GlobalOverlay />
    </AbsoluteFill>
  );
};

// Scene 11: Data Flow
const Scene11_Flow: React.FC = () => {
  const frame = useCurrentFrame();

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
        전체 데이터 흐름 🌊
      </div>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 15,
      }}>
        {/* Input */}
        <div style={{
          opacity: fadeIn(frame, 10),
          fontSize: 28,
          color: '#a5b4fc',
        }}>
          입력 문장
        </div>

        <div style={{ opacity: fadeIn(frame, 15), fontSize: 30, color: '#fbbf24' }}>↓</div>

        <div style={{
          opacity: fadeIn(frame, 20),
          background: 'linear-gradient(90deg, #3b82f6, #60a5fa)',
          borderRadius: 10,
          padding: '10px 30px',
          fontSize: 24,
          color: 'white',
        }}>
          토큰화 → 임베딩 → 위치 인코딩
        </div>

        <div style={{ opacity: fadeIn(frame, 30), fontSize: 30, color: '#fbbf24' }}>↓</div>

        {/* Encoder Block */}
        <div style={{
          opacity: fadeIn(frame, 35),
          background: 'rgba(139, 92, 246, 0.3)',
          border: '2px solid #8b5cf6',
          borderRadius: 15,
          padding: 20,
          textAlign: 'center',
        }}>
          <div style={{
            fontSize: 28,
            fontWeight: 'bold',
            color: 'white',
            marginBottom: 10,
          }}>
            인코더 블록 × N
          </div>
          <div style={{
            fontSize: 22,
            color: '#c4b5fd',
          }}>
            Attention → Add&Norm → FFN → Add&Norm
          </div>
        </div>

        <div style={{ opacity: fadeIn(frame, 50), fontSize: 30, color: '#fbbf24' }}>↓</div>

        {/* Output */}
        <div style={{
          opacity: fadeIn(frame, 55),
          background: 'linear-gradient(90deg, #10b981, #34d399)',
          borderRadius: 12,
          padding: '15px 40px',
          fontSize: 26,
          fontWeight: 'bold',
          color: 'white',
        }}>
          인코더 출력
        </div>

        <div style={{ opacity: fadeIn(frame, 65), fontSize: 30, color: '#fbbf24' }}>↓</div>

        <div style={{
          opacity: fadeIn(frame, 70),
          display: 'flex',
          gap: 30,
        }}>
          <div style={{
            background: 'rgba(236, 72, 153, 0.3)',
            borderRadius: 10,
            padding: '10px 20px',
            fontSize: 22,
            color: '#f9a8d4',
          }}>
            디코더로 전달
          </div>
          <div style={{
            background: 'rgba(245, 158, 11, 0.3)',
            borderRadius: 10,
            padding: '10px 20px',
            fontSize: 22,
            color: '#fcd34d',
          }}>
            또는 분류에 사용
          </div>
        </div>
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
    '인코더 = 여러 블록 쌓은 구조',
    '각 블록 = Self-Attention + FFN',
    '각 서브레이어 후 Add & Norm',
    '깊을수록 더 깊은 이해',
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
        gap: 18,
      }}>
        {summaryItems.map((item, i) => (
          <div key={i} style={{
            opacity: fadeIn(frame, 15 + i * 12),
            transform: `translateX(${interpolate(frame - (15 + i * 12), [0, 20], [-50, 0], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' })}px)`,
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: 15,
            padding: '15px 40px',
            fontSize: 30,
            color: 'white',
          }}>
            ✓ {item}
          </div>
        ))}
      </div>

      {/* Next Lesson */}
      <div style={{
        opacity: fadeIn(frame, 70),
        marginTop: 40,
        textAlign: 'center',
      }}>
        <div style={{
          fontSize: 30,
          color: '#c4b5fd',
          marginBottom: 15,
        }}>
          다음 레슨에서는...
        </div>
        <div style={{
          fontSize: 40,
          fontWeight: 'bold',
          color: '#fbbf24',
        }}>
          디코더 구조를 배워요! 🎯
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
export const Lesson7_7Video: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: '#1e1b4b' }}>
      {/* Audio tracks */}
      <Sequence from={SCENE_TIMINGS.scene01_intro.start} durationInFrames={SCENE_TIMINGS.scene01_intro.duration}>
        <Audio src={staticFile('audio/lesson-7-7/scene01_intro.mp3')} />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.scene02_overview.start} durationInFrames={SCENE_TIMINGS.scene02_overview.duration}>
        <Audio src={staticFile('audio/lesson-7-7/scene02_overview.mp3')} />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.scene03_input.start} durationInFrames={SCENE_TIMINGS.scene03_input.duration}>
        <Audio src={staticFile('audio/lesson-7-7/scene03_input.mp3')} />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.scene04_block.start} durationInFrames={SCENE_TIMINGS.scene04_block.duration}>
        <Audio src={staticFile('audio/lesson-7-7/scene04_block.mp3')} />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.scene05_attention.start} durationInFrames={SCENE_TIMINGS.scene05_attention.duration}>
        <Audio src={staticFile('audio/lesson-7-7/scene05_attention.mp3')} />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.scene06_addnorm1.start} durationInFrames={SCENE_TIMINGS.scene06_addnorm1.duration}>
        <Audio src={staticFile('audio/lesson-7-7/scene06_addnorm1.mp3')} />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.scene07_ffn.start} durationInFrames={SCENE_TIMINGS.scene07_ffn.duration}>
        <Audio src={staticFile('audio/lesson-7-7/scene07_ffn.mp3')} />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.scene08_addnorm2.start} durationInFrames={SCENE_TIMINGS.scene08_addnorm2.duration}>
        <Audio src={staticFile('audio/lesson-7-7/scene08_addnorm2.mp3')} />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.scene09_stacking.start} durationInFrames={SCENE_TIMINGS.scene09_stacking.duration}>
        <Audio src={staticFile('audio/lesson-7-7/scene09_stacking.mp3')} />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.scene10_dimensions.start} durationInFrames={SCENE_TIMINGS.scene10_dimensions.duration}>
        <Audio src={staticFile('audio/lesson-7-7/scene10_dimensions.mp3')} />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.scene11_flow.start} durationInFrames={SCENE_TIMINGS.scene11_flow.duration}>
        <Audio src={staticFile('audio/lesson-7-7/scene11_flow.mp3')} />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.scene12_outro.start} durationInFrames={SCENE_TIMINGS.scene12_outro.duration}>
        <Audio src={staticFile('audio/lesson-7-7/scene12_outro.mp3')} />
      </Sequence>

      {/* Visual Scenes */}
      <Sequence from={SCENE_TIMINGS.scene01_intro.start} durationInFrames={SCENE_TIMINGS.scene01_intro.duration}>
        <Scene01_Intro />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.scene02_overview.start} durationInFrames={SCENE_TIMINGS.scene02_overview.duration}>
        <Scene02_Overview />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.scene03_input.start} durationInFrames={SCENE_TIMINGS.scene03_input.duration}>
        <Scene03_Input />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.scene04_block.start} durationInFrames={SCENE_TIMINGS.scene04_block.duration}>
        <Scene04_Block />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.scene05_attention.start} durationInFrames={SCENE_TIMINGS.scene05_attention.duration}>
        <Scene05_Attention />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.scene06_addnorm1.start} durationInFrames={SCENE_TIMINGS.scene06_addnorm1.duration}>
        <Scene06_AddNorm1 />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.scene07_ffn.start} durationInFrames={SCENE_TIMINGS.scene07_ffn.duration}>
        <Scene07_FFN />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.scene08_addnorm2.start} durationInFrames={SCENE_TIMINGS.scene08_addnorm2.duration}>
        <Scene08_AddNorm2 />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.scene09_stacking.start} durationInFrames={SCENE_TIMINGS.scene09_stacking.duration}>
        <Scene09_Stacking />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.scene10_dimensions.start} durationInFrames={SCENE_TIMINGS.scene10_dimensions.duration}>
        <Scene10_Dimensions />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.scene11_flow.start} durationInFrames={SCENE_TIMINGS.scene11_flow.duration}>
        <Scene11_Flow />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.scene12_outro.start} durationInFrames={SCENE_TIMINGS.scene12_outro.duration}>
        <Scene12_Outro />
      </Sequence>
    </AbsoluteFill>
  );
};
