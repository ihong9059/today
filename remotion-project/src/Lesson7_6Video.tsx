import { AbsoluteFill, Audio, Img, interpolate, Sequence, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';

// Scene timings from audio analysis
const SCENE_TIMINGS = {
  scene01_intro: { start: 0, duration: 521 },
  scene02_position: { start: 521, duration: 737 },
  scene03_role: { start: 1258, duration: 709 },
  scene04_structure: { start: 1967, duration: 863 },
  scene05_expand: { start: 2830, duration: 695 },
  scene06_activation: { start: 3525, duration: 894 },
  scene07_contract: { start: 4419, duration: 743 },
  scene08_why_works: { start: 5162, duration: 768 },
  scene09_params: { start: 5930, duration: 824 },
  scene10_code: { start: 6754, duration: 1000 },
  scene11_variants: { start: 7754, duration: 780 },
  scene12_outro: { start: 8534, duration: 947 },
};

export const LESSON_7_6_DURATION = 9481;

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
          Lesson 7-6
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
          피드 포워드 네트워크
        </div>

        <div style={{
          opacity: fadeIn(frame, 30),
          transform: `translateY(${slideUp(frame, 30)}px)`,
          fontSize: 50,
          color: '#c4b5fd',
          marginBottom: 50,
        }}>
          Feed Forward Network (FFN)
        </div>

        {/* FFN Visual */}
        <div style={{
          opacity: fadeIn(frame, 45),
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 20,
        }}>
          <div style={{
            width: 100,
            height: 60,
            background: 'linear-gradient(45deg, #8b5cf6, #a78bfa)',
            borderRadius: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 24,
            color: 'white',
          }}>
            512
          </div>
          <div style={{ fontSize: 40, color: '#fbbf24' }}>→</div>
          <div style={{
            width: 150,
            height: 80,
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
          <div style={{ fontSize: 40, color: '#fbbf24' }}>→</div>
          <div style={{
            width: 100,
            height: 60,
            background: 'linear-gradient(45deg, #10b981, #34d399)',
            borderRadius: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 24,
            color: 'white',
          }}>
            512
          </div>
        </div>
      </div>
      <GlobalOverlay />
    </AbsoluteFill>
  );
};

// Scene 2: Position in Transformer
const Scene02_Position: React.FC = () => {
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
        트랜스포머에서 FFN의 위치 📍
      </div>

      <div style={{
        display: 'flex',
        justifyContent: 'center',
        marginTop: 20,
      }}>
        <div style={{
          background: 'rgba(99, 102, 241, 0.2)',
          border: '3px solid #6366f1',
          borderRadius: 20,
          padding: 30,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 15,
        }}>
          {/* Input */}
          <div style={{
            opacity: fadeIn(frame, 10),
            width: 200,
            height: 60,
            background: 'linear-gradient(45deg, #8b5cf6, #a78bfa)',
            borderRadius: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 26,
            color: 'white',
          }}>
            Input
          </div>

          <div style={{ fontSize: 30, color: '#a78bfa' }}>↓</div>

          {/* Self-Attention */}
          <div style={{
            opacity: fadeIn(frame, 20),
            width: 250,
            height: 70,
            background: 'linear-gradient(90deg, #f59e0b, #fbbf24)',
            borderRadius: 12,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 26,
            fontWeight: 'bold',
            color: 'white',
          }}>
            Self-Attention
          </div>

          <div style={{ fontSize: 30, color: '#a78bfa' }}>↓</div>

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

          <div style={{ fontSize: 30, color: '#a78bfa' }}>↓</div>

          {/* FFN - Highlighted */}
          <div style={{
            opacity: fadeIn(frame, 40),
            transform: `scale(${scaleIn(frame, fps, 40)})`,
            width: 280,
            height: 80,
            background: 'linear-gradient(90deg, #ec4899, #f472b6)',
            borderRadius: 12,
            border: '4px solid #fbbf24',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 30,
            fontWeight: 'bold',
            color: 'white',
            boxShadow: '0 0 30px rgba(236, 72, 153, 0.5)',
          }}>
            FFN ⭐
          </div>

          <div style={{ fontSize: 30, color: '#a78bfa' }}>↓</div>

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
        </div>
      </div>

      <div style={{
        opacity: fadeIn(frame, 60),
        marginTop: 30,
        textAlign: 'center',
        fontSize: 32,
        color: '#fbbf24',
      }}>
        Attention 다음에 FFN이 나와요!
      </div>
      <GlobalOverlay />
    </AbsoluteFill>
  );
};

// Scene 3: Role of FFN
const Scene03_Role: React.FC = () => {
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
        FFN의 역할 🎯
      </div>

      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: 60,
        marginTop: 30,
      }}>
        {/* Attention */}
        <div style={{
          opacity: fadeIn(frame, 15),
          background: 'rgba(245, 158, 11, 0.2)',
          border: '3px solid #f59e0b',
          borderRadius: 20,
          padding: 40,
          textAlign: 'center',
          width: 400,
        }}>
          <div style={{
            fontSize: 50,
            marginBottom: 20,
          }}>
            🔗
          </div>
          <div style={{
            fontSize: 36,
            fontWeight: 'bold',
            color: '#fbbf24',
            marginBottom: 20,
          }}>
            Attention
          </div>
          <div style={{
            fontSize: 28,
            color: 'white',
            marginBottom: 15,
          }}>
            토큰들 사이의 관계
          </div>
          <div style={{
            fontSize: 24,
            color: '#a5b4fc',
            fontStyle: 'italic',
          }}>
            "어떤 토큰에 집중할까?"
          </div>
        </div>

        {/* FFN */}
        <div style={{
          opacity: fadeIn(frame, 30),
          background: 'rgba(236, 72, 153, 0.2)',
          border: '3px solid #ec4899',
          borderRadius: 20,
          padding: 40,
          textAlign: 'center',
          width: 400,
        }}>
          <div style={{
            fontSize: 50,
            marginBottom: 20,
          }}>
            🔄
          </div>
          <div style={{
            fontSize: 36,
            fontWeight: 'bold',
            color: '#f472b6',
            marginBottom: 20,
          }}>
            FFN
          </div>
          <div style={{
            fontSize: 28,
            color: 'white',
            marginBottom: 15,
          }}>
            각 토큰을 독립적 변환
          </div>
          <div style={{
            fontSize: 24,
            color: '#a5b4fc',
            fontStyle: 'italic',
          }}>
            "이 정보를 어떻게 해석할까?"
          </div>
        </div>
      </div>

      <div style={{
        opacity: fadeIn(frame, 50),
        marginTop: 50,
        textAlign: 'center',
        fontSize: 36,
        color: '#34d399',
      }}>
        둘이 협력해서 강력한 표현력! 💪
      </div>
      <GlobalOverlay />
    </AbsoluteFill>
  );
};

// Scene 4: Structure
const Scene04_Structure: React.FC = () => {
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
        FFN의 구조 🏗️
      </div>

      {/* FFN Structure Diagram */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 20,
        marginTop: 20,
      }}>
        {/* Input */}
        <div style={{
          opacity: fadeIn(frame, 10),
          width: 150,
          height: 60,
          background: 'linear-gradient(45deg, #8b5cf6, #a78bfa)',
          borderRadius: 10,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 28,
          color: 'white',
        }}>
          x
        </div>

        <div style={{ fontSize: 30, color: '#a78bfa' }}>↓</div>

        {/* Linear1 */}
        <div style={{
          opacity: fadeIn(frame, 20),
          width: 250,
          height: 70,
          background: 'linear-gradient(90deg, #3b82f6, #60a5fa)',
          borderRadius: 12,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 26,
          fontWeight: 'bold',
          color: 'white',
        }}>
          Linear 1 (확장)
        </div>

        <div style={{ fontSize: 30, color: '#a78bfa' }}>↓</div>

        {/* Activation */}
        <div style={{
          opacity: fadeIn(frame, 30),
          transform: `scale(${scaleIn(frame, fps, 30)})`,
          width: 200,
          height: 70,
          background: 'linear-gradient(90deg, #f59e0b, #fbbf24)',
          borderRadius: 12,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 26,
          fontWeight: 'bold',
          color: 'white',
        }}>
          Activation
        </div>

        <div style={{ fontSize: 30, color: '#a78bfa' }}>↓</div>

        {/* Linear2 */}
        <div style={{
          opacity: fadeIn(frame, 40),
          width: 250,
          height: 70,
          background: 'linear-gradient(90deg, #10b981, #34d399)',
          borderRadius: 12,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 26,
          fontWeight: 'bold',
          color: 'white',
        }}>
          Linear 2 (축소)
        </div>

        <div style={{ fontSize: 30, color: '#a78bfa' }}>↓</div>

        {/* Output */}
        <div style={{
          opacity: fadeIn(frame, 50),
          width: 150,
          height: 60,
          background: 'linear-gradient(45deg, #ec4899, #f472b6)',
          borderRadius: 10,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 28,
          color: 'white',
        }}>
          output
        </div>
      </div>

      {/* Formula */}
      <div style={{
        opacity: fadeIn(frame, 60),
        marginTop: 30,
        textAlign: 'center',
        fontSize: 32,
        color: '#c4b5fd',
        fontFamily: 'monospace',
      }}>
        FFN(x) = Linear2(Activation(Linear1(x)))
      </div>
      <GlobalOverlay />
    </AbsoluteFill>
  );
};

// Scene 5: Expand
const Scene05_Expand: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const expandProgress = interpolate(frame, [30, 80], [1, 4], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });

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
        첫 번째 레이어: 확장! 📈
      </div>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 30,
        marginTop: 30,
      }}>
        {/* Input dimension */}
        <div style={{
          opacity: fadeIn(frame, 15),
          display: 'flex',
          alignItems: 'center',
          gap: 20,
        }}>
          <div style={{
            fontSize: 32,
            color: '#a5b4fc',
          }}>
            입력:
          </div>
          <div style={{
            width: 120,
            height: 60,
            background: 'linear-gradient(45deg, #8b5cf6, #a78bfa)',
            borderRadius: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 32,
            fontWeight: 'bold',
            color: 'white',
          }}>
            512
          </div>
        </div>

        {/* Arrow with multiplier */}
        <div style={{
          opacity: fadeIn(frame, 30),
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
          <div style={{ fontSize: 40, color: '#fbbf24' }}>↓</div>
          <div style={{
            fontSize: 36,
            color: '#fbbf24',
            fontWeight: 'bold',
          }}>
            × {expandProgress.toFixed(1)}
          </div>
          <div style={{ fontSize: 40, color: '#fbbf24' }}>↓</div>
        </div>

        {/* Output dimension - animated */}
        <div style={{
          opacity: fadeIn(frame, 30),
          display: 'flex',
          alignItems: 'center',
          gap: 20,
        }}>
          <div style={{
            fontSize: 32,
            color: '#a5b4fc',
          }}>
            출력:
          </div>
          <div style={{
            width: 30 + expandProgress * 40,
            height: 60,
            background: 'linear-gradient(45deg, #f59e0b, #fbbf24)',
            borderRadius: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 32,
            fontWeight: 'bold',
            color: 'white',
            transition: 'width 0.1s',
          }}>
            {Math.round(512 * expandProgress)}
          </div>
        </div>
      </div>

      <div style={{
        opacity: fadeIn(frame, 50),
        marginTop: 50,
        textAlign: 'center',
      }}>
        <div style={{
          fontSize: 36,
          color: '#34d399',
          marginBottom: 15,
        }}>
          보통 4배로 확장해요!
        </div>
        <div style={{
          fontSize: 28,
          color: '#a5b4fc',
        }}>
          더 넓은 공간에서 복잡한 패턴 표현 가능!
        </div>
      </div>
      <GlobalOverlay />
    </AbsoluteFill>
  );
};

// Scene 6: Activation Function
const Scene06_Activation: React.FC = () => {
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
        활성화 함수 ⚡
      </div>

      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: 40,
        marginTop: 30,
      }}>
        {/* ReLU */}
        <div style={{
          opacity: fadeIn(frame, 15),
          background: 'rgba(239, 68, 68, 0.2)',
          border: '2px solid #ef4444',
          borderRadius: 15,
          padding: 25,
          textAlign: 'center',
          width: 280,
        }}>
          <div style={{
            fontSize: 36,
            fontWeight: 'bold',
            color: '#fca5a5',
            marginBottom: 15,
          }}>
            ReLU
          </div>
          <div style={{
            fontSize: 28,
            color: 'white',
            fontFamily: 'monospace',
            marginBottom: 10,
          }}>
            max(0, x)
          </div>
          <div style={{
            fontSize: 22,
            color: '#a5b4fc',
          }}>
            원래 버전
          </div>
        </div>

        {/* GELU */}
        <div style={{
          opacity: fadeIn(frame, 30),
          transform: `scale(${scaleIn(frame, fps, 30)})`,
          background: 'rgba(16, 185, 129, 0.2)',
          border: '3px solid #10b981',
          borderRadius: 15,
          padding: 25,
          textAlign: 'center',
          width: 280,
        }}>
          <div style={{
            fontSize: 36,
            fontWeight: 'bold',
            color: '#6ee7b7',
            marginBottom: 15,
          }}>
            GELU ⭐
          </div>
          <div style={{
            fontSize: 28,
            color: 'white',
            marginBottom: 10,
          }}>
            부드러운 곡선
          </div>
          <div style={{
            fontSize: 22,
            color: '#fbbf24',
          }}>
            GPT에서 사용!
          </div>
        </div>

        {/* SiLU */}
        <div style={{
          opacity: fadeIn(frame, 45),
          background: 'rgba(139, 92, 246, 0.2)',
          border: '2px solid #8b5cf6',
          borderRadius: 15,
          padding: 25,
          textAlign: 'center',
          width: 280,
        }}>
          <div style={{
            fontSize: 36,
            fontWeight: 'bold',
            color: '#c4b5fd',
            marginBottom: 15,
          }}>
            SiLU
          </div>
          <div style={{
            fontSize: 28,
            color: 'white',
            marginBottom: 10,
          }}>
            x × σ(x)
          </div>
          <div style={{
            fontSize: 22,
            color: '#a5b4fc',
          }}>
            LLaMA에서 사용!
          </div>
        </div>
      </div>

      <div style={{
        opacity: fadeIn(frame, 60),
        marginTop: 50,
        textAlign: 'center',
        fontSize: 32,
        color: '#fbbf24',
      }}>
        모두 비선형성을 추가하는 역할!
      </div>
      <GlobalOverlay />
    </AbsoluteFill>
  );
};

// Scene 7: Contract
const Scene07_Contract: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const contractProgress = interpolate(frame, [30, 80], [4, 1], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });

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
        두 번째 레이어: 축소! 📉
      </div>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 30,
        marginTop: 30,
      }}>
        {/* Input dimension */}
        <div style={{
          opacity: fadeIn(frame, 15),
          display: 'flex',
          alignItems: 'center',
          gap: 20,
        }}>
          <div style={{
            fontSize: 32,
            color: '#a5b4fc',
          }}>
            입력:
          </div>
          <div style={{
            width: 30 + contractProgress * 40,
            height: 60,
            background: 'linear-gradient(45deg, #f59e0b, #fbbf24)',
            borderRadius: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 32,
            fontWeight: 'bold',
            color: 'white',
          }}>
            {Math.round(512 * contractProgress)}
          </div>
        </div>

        {/* Arrow */}
        <div style={{
          opacity: fadeIn(frame, 30),
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
          <div style={{ fontSize: 40, color: '#10b981' }}>↓</div>
          <div style={{
            fontSize: 36,
            color: '#10b981',
            fontWeight: 'bold',
          }}>
            ÷ 4
          </div>
          <div style={{ fontSize: 40, color: '#10b981' }}>↓</div>
        </div>

        {/* Output dimension */}
        <div style={{
          opacity: fadeIn(frame, 30),
          display: 'flex',
          alignItems: 'center',
          gap: 20,
        }}>
          <div style={{
            fontSize: 32,
            color: '#a5b4fc',
          }}>
            출력:
          </div>
          <div style={{
            width: 120,
            height: 60,
            background: 'linear-gradient(45deg, #10b981, #34d399)',
            borderRadius: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 32,
            fontWeight: 'bold',
            color: 'white',
          }}>
            512
          </div>
        </div>
      </div>

      <div style={{
        opacity: fadeIn(frame, 50),
        marginTop: 50,
        textAlign: 'center',
      }}>
        <div style={{
          fontSize: 36,
          color: '#34d399',
          marginBottom: 15,
        }}>
          원래 크기로 돌아가요!
        </div>
        <div style={{
          fontSize: 28,
          color: '#a5b4fc',
        }}>
          다음 레이어 및 잔차 연결과 맞추기 위해!
        </div>
      </div>
      <GlobalOverlay />
    </AbsoluteFill>
  );
};

// Scene 8: Why It Works
const Scene08_WhyWorks: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const reasons = [
    { icon: '📊', title: '표현력 증가', desc: '넓은 공간에서 복잡한 변환' },
    { icon: '〰️', title: '비선형성', desc: '활성화 함수 덕분!' },
    { icon: '🔲', title: '독립 처리', desc: 'Attention과 역할 분담' },
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
        왜 이렇게 설계했을까요? 🤔
      </div>

      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: 40,
      }}>
        {reasons.map((reason, i) => (
          <div key={i} style={{
            opacity: fadeIn(frame, 15 + i * 20),
            transform: `scale(${scaleIn(frame, fps, 15 + i * 20)})`,
            background: 'rgba(139, 92, 246, 0.2)',
            border: '2px solid #8b5cf6',
            borderRadius: 20,
            padding: 35,
            textAlign: 'center',
            width: 320,
          }}>
            <div style={{
              fontSize: 60,
              marginBottom: 20,
            }}>
              {reason.icon}
            </div>
            <div style={{
              fontSize: 32,
              fontWeight: 'bold',
              color: 'white',
              marginBottom: 15,
            }}>
              {reason.title}
            </div>
            <div style={{
              fontSize: 26,
              color: '#c4b5fd',
            }}>
              {reason.desc}
            </div>
          </div>
        ))}
      </div>
      <GlobalOverlay />
    </AbsoluteFill>
  );
};

// Scene 9: Parameters
const Scene09_Params: React.FC = () => {
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
        파라미터 계산 🔢
      </div>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 30,
        marginTop: 30,
      }}>
        {/* Linear 1 */}
        <div style={{
          opacity: fadeIn(frame, 15),
          display: 'flex',
          alignItems: 'center',
          gap: 20,
        }}>
          <div style={{
            background: 'rgba(59, 130, 246, 0.3)',
            borderRadius: 10,
            padding: '15px 25px',
            fontSize: 28,
            color: '#60a5fa',
          }}>
            Linear 1:
          </div>
          <div style={{
            fontSize: 32,
            color: 'white',
            fontFamily: 'monospace',
          }}>
            512 × 2048 = <span style={{ color: '#fbbf24', fontWeight: 'bold' }}>1,048,576</span>
          </div>
        </div>

        {/* Linear 2 */}
        <div style={{
          opacity: fadeIn(frame, 30),
          display: 'flex',
          alignItems: 'center',
          gap: 20,
        }}>
          <div style={{
            background: 'rgba(16, 185, 129, 0.3)',
            borderRadius: 10,
            padding: '15px 25px',
            fontSize: 28,
            color: '#34d399',
          }}>
            Linear 2:
          </div>
          <div style={{
            fontSize: 32,
            color: 'white',
            fontFamily: 'monospace',
          }}>
            2048 × 512 = <span style={{ color: '#fbbf24', fontWeight: 'bold' }}>1,048,576</span>
          </div>
        </div>

        {/* Total */}
        <div style={{
          opacity: fadeIn(frame, 45),
          transform: `scale(${scaleIn(frame, fps, 45)})`,
          background: 'linear-gradient(90deg, #ec4899, #f472b6)',
          borderRadius: 15,
          padding: '20px 40px',
          marginTop: 20,
        }}>
          <div style={{
            fontSize: 36,
            fontWeight: 'bold',
            color: 'white',
          }}>
            합계: 약 200만 개! 🤯
          </div>
        </div>
      </div>

      <div style={{
        opacity: fadeIn(frame, 60),
        marginTop: 50,
        textAlign: 'center',
        fontSize: 32,
        color: '#fca5a5',
      }}>
        FFN이 트랜스포머 파라미터의 대부분을 차지해요!
      </div>
      <GlobalOverlay />
    </AbsoluteFill>
  );
};

// Scene 10: Code
const Scene10_Code: React.FC = () => {
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
        코드로 보면 간단해요! 💻
      </div>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 30,
      }}>
        {/* Class Definition */}
        <div style={{
          opacity: fadeIn(frame, 15),
          background: '#1a1a2e',
          borderRadius: 15,
          padding: 30,
          border: '2px solid #4c4c6d',
          fontFamily: 'monospace',
          fontSize: 26,
        }}>
          <div style={{ color: '#ff79c6' }}>class <span style={{ color: '#8be9fd' }}>FFN</span>:</div>
          <div style={{ marginLeft: 30, color: '#f8f8f2' }}>
            <span style={{ color: '#8be9fd' }}>self</span>.linear1 = <span style={{ color: '#ffb86c' }}>Linear</span>(<span style={{ color: '#bd93f9' }}>512</span>, <span style={{ color: '#bd93f9' }}>2048</span>)
          </div>
          <div style={{ marginLeft: 30, color: '#f8f8f2' }}>
            <span style={{ color: '#8be9fd' }}>self</span>.linear2 = <span style={{ color: '#ffb86c' }}>Linear</span>(<span style={{ color: '#bd93f9' }}>2048</span>, <span style={{ color: '#bd93f9' }}>512</span>)
          </div>
          <div style={{ marginLeft: 30, color: '#f8f8f2' }}>
            <span style={{ color: '#8be9fd' }}>self</span>.gelu = <span style={{ color: '#ffb86c' }}>GELU</span>()
          </div>
        </div>

        {/* Forward Function */}
        <div style={{
          opacity: fadeIn(frame, 40),
          background: '#1a1a2e',
          borderRadius: 15,
          padding: 30,
          border: '2px solid #4c4c6d',
          fontFamily: 'monospace',
          fontSize: 26,
        }}>
          <div style={{ color: '#6272a4' }}># forward 함수</div>
          <div style={{ color: '#f8f8f2' }}>
            <span style={{ color: '#ff79c6' }}>x</span> = <span style={{ color: '#8be9fd' }}>self</span>.gelu(<span style={{ color: '#8be9fd' }}>self</span>.linear1(<span style={{ color: '#ff79c6' }}>x</span>))
          </div>
          <div style={{ color: '#f8f8f2' }}>
            <span style={{ color: '#ff79c6' }}>x</span> = <span style={{ color: '#8be9fd' }}>self</span>.linear2(<span style={{ color: '#ff79c6' }}>x</span>)
          </div>
          <div style={{ color: '#ff79c6' }}>return <span style={{ color: '#f8f8f2' }}>x</span></div>
        </div>
      </div>

      <div style={{
        opacity: fadeIn(frame, 60),
        marginTop: 40,
        textAlign: 'center',
        fontSize: 36,
        color: '#34d399',
      }}>
        정말 간단하죠? ✨
      </div>
      <GlobalOverlay />
    </AbsoluteFill>
  );
};

// Scene 11: Variants
const Scene11_Variants: React.FC = () => {
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
        FFN의 변형들 🔄
      </div>

      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: 50,
      }}>
        {/* SwiGLU */}
        <div style={{
          opacity: fadeIn(frame, 15),
          transform: `scale(${scaleIn(frame, fps, 15)})`,
          background: 'rgba(245, 158, 11, 0.2)',
          border: '3px solid #f59e0b',
          borderRadius: 20,
          padding: 35,
          textAlign: 'center',
          width: 400,
        }}>
          <div style={{
            fontSize: 40,
            fontWeight: 'bold',
            color: '#fbbf24',
            marginBottom: 20,
          }}>
            SwiGLU
          </div>
          <div style={{
            fontSize: 28,
            color: 'white',
            marginBottom: 15,
          }}>
            게이팅 메커니즘 추가
          </div>
          <div style={{
            fontSize: 24,
            color: '#a5b4fc',
          }}>
            LLaMA에서 사용!
          </div>
        </div>

        {/* MoE */}
        <div style={{
          opacity: fadeIn(frame, 35),
          transform: `scale(${scaleIn(frame, fps, 35)})`,
          background: 'rgba(139, 92, 246, 0.2)',
          border: '3px solid #8b5cf6',
          borderRadius: 20,
          padding: 35,
          textAlign: 'center',
          width: 400,
        }}>
          <div style={{
            fontSize: 40,
            fontWeight: 'bold',
            color: '#c4b5fd',
            marginBottom: 20,
          }}>
            MoE
          </div>
          <div style={{
            fontSize: 28,
            color: 'white',
            marginBottom: 15,
          }}>
            Mixture of Experts
          </div>
          <div style={{
            fontSize: 24,
            color: '#a5b4fc',
          }}>
            여러 FFN 중 선택!
          </div>
        </div>
      </div>

      <div style={{
        opacity: fadeIn(frame, 55),
        marginTop: 50,
        textAlign: 'center',
        fontSize: 32,
        color: '#34d399',
      }}>
        기본 구조는 같지만 조금씩 발전 중!
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
    'FFN = Linear1 + Activation + Linear2',
    '512 → 2048 → 512 (확장 후 축소)',
    '각 토큰을 독립적으로 변환',
    'Attention과 협력!',
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
          전체 인코더 구조 복습! 🏛️
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
export const Lesson7_6Video: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: '#1e1b4b' }}>
      {/* Audio tracks */}
      <Sequence from={SCENE_TIMINGS.scene01_intro.start} durationInFrames={SCENE_TIMINGS.scene01_intro.duration}>
        <Audio src={staticFile('audio/lesson-7-6/scene01_intro.mp3')} />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.scene02_position.start} durationInFrames={SCENE_TIMINGS.scene02_position.duration}>
        <Audio src={staticFile('audio/lesson-7-6/scene02_position.mp3')} />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.scene03_role.start} durationInFrames={SCENE_TIMINGS.scene03_role.duration}>
        <Audio src={staticFile('audio/lesson-7-6/scene03_role.mp3')} />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.scene04_structure.start} durationInFrames={SCENE_TIMINGS.scene04_structure.duration}>
        <Audio src={staticFile('audio/lesson-7-6/scene04_structure.mp3')} />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.scene05_expand.start} durationInFrames={SCENE_TIMINGS.scene05_expand.duration}>
        <Audio src={staticFile('audio/lesson-7-6/scene05_expand.mp3')} />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.scene06_activation.start} durationInFrames={SCENE_TIMINGS.scene06_activation.duration}>
        <Audio src={staticFile('audio/lesson-7-6/scene06_activation.mp3')} />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.scene07_contract.start} durationInFrames={SCENE_TIMINGS.scene07_contract.duration}>
        <Audio src={staticFile('audio/lesson-7-6/scene07_contract.mp3')} />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.scene08_why_works.start} durationInFrames={SCENE_TIMINGS.scene08_why_works.duration}>
        <Audio src={staticFile('audio/lesson-7-6/scene08_why_works.mp3')} />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.scene09_params.start} durationInFrames={SCENE_TIMINGS.scene09_params.duration}>
        <Audio src={staticFile('audio/lesson-7-6/scene09_params.mp3')} />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.scene10_code.start} durationInFrames={SCENE_TIMINGS.scene10_code.duration}>
        <Audio src={staticFile('audio/lesson-7-6/scene10_code.mp3')} />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.scene11_variants.start} durationInFrames={SCENE_TIMINGS.scene11_variants.duration}>
        <Audio src={staticFile('audio/lesson-7-6/scene11_variants.mp3')} />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.scene12_outro.start} durationInFrames={SCENE_TIMINGS.scene12_outro.duration}>
        <Audio src={staticFile('audio/lesson-7-6/scene12_outro.mp3')} />
      </Sequence>

      {/* Visual Scenes */}
      <Sequence from={SCENE_TIMINGS.scene01_intro.start} durationInFrames={SCENE_TIMINGS.scene01_intro.duration}>
        <Scene01_Intro />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.scene02_position.start} durationInFrames={SCENE_TIMINGS.scene02_position.duration}>
        <Scene02_Position />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.scene03_role.start} durationInFrames={SCENE_TIMINGS.scene03_role.duration}>
        <Scene03_Role />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.scene04_structure.start} durationInFrames={SCENE_TIMINGS.scene04_structure.duration}>
        <Scene04_Structure />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.scene05_expand.start} durationInFrames={SCENE_TIMINGS.scene05_expand.duration}>
        <Scene05_Expand />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.scene06_activation.start} durationInFrames={SCENE_TIMINGS.scene06_activation.duration}>
        <Scene06_Activation />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.scene07_contract.start} durationInFrames={SCENE_TIMINGS.scene07_contract.duration}>
        <Scene07_Contract />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.scene08_why_works.start} durationInFrames={SCENE_TIMINGS.scene08_why_works.duration}>
        <Scene08_WhyWorks />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.scene09_params.start} durationInFrames={SCENE_TIMINGS.scene09_params.duration}>
        <Scene09_Params />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.scene10_code.start} durationInFrames={SCENE_TIMINGS.scene10_code.duration}>
        <Scene10_Code />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.scene11_variants.start} durationInFrames={SCENE_TIMINGS.scene11_variants.duration}>
        <Scene11_Variants />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.scene12_outro.start} durationInFrames={SCENE_TIMINGS.scene12_outro.duration}>
        <Scene12_Outro />
      </Sequence>
    </AbsoluteFill>
  );
};
