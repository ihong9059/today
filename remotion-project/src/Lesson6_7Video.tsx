import React from 'react';
import { AbsoluteFill, Audio, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';

export const LESSON_6_7_DURATION = 21635;

const SCENE_TIMINGS = {
  scene01_intro: { start: 0, duration: 1420 },
  scene02_what: { start: 1420, duration: 1556 },
  scene03_data: { start: 2976, duration: 1837 },
  scene04_preprocess: { start: 4813, duration: 1819 },
  scene05_embedding: { start: 6632, duration: 1796 },
  scene06_model: { start: 8428, duration: 1781 },
  scene07_code_class: { start: 10209, duration: 1898 },
  scene08_code_forward: { start: 12107, duration: 1956 },
  scene09_training: { start: 14063, duration: 2009 },
  scene10_eval: { start: 16072, duration: 1740 },
  scene11_tips: { start: 17812, duration: 1901 },
  scene12_outro: { start: 19713, duration: 1922 },
};

const COLORS = {
  background: '#0f172a',
  primary: '#06b6d4',
  secondary: '#8b5cf6',
  positive: '#22c55e',
  negative: '#ef4444',
  embedding: '#f97316',
  lstm: '#3b82f6',
  classifier: '#ec4899',
  text: '#f8fafc',
  textSecondary: '#94a3b8',
  cardBg: 'rgba(30, 41, 59, 0.8)',
  accent: '#fbbf24',
};

const fadeIn = (frame: number, delay: number = 0) => {
  return interpolate(frame - delay, [0, 20], [0, 1], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });
};

const slideUp = (frame: number, delay: number = 0) => {
  return interpolate(frame - delay, [0, 25], [40, 0], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });
};

const scaleIn = (frame: number, fps: number, delay: number = 0) => {
  return spring({ frame: frame - delay, fps, config: { damping: 12, stiffness: 100 } });
};

const GlobalOverlay: React.FC = () => {
  return (
    <>
      <Img
        src={staticFile('images/logo.png')}
        style={{
          position: 'absolute',
          top: 30,
          left: 30,
          width: 120,
          height: 120,
          objectFit: 'contain',
          zIndex: 1000,
          opacity: 0.9,
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 50,
          background: 'linear-gradient(90deg, rgba(6,182,212,0.9), rgba(139,92,246,0.9))',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
        }}
      >
        <span style={{ color: 'white', fontSize: 24, fontWeight: 'bold', fontFamily: 'Arial, sans-serif' }}>
          http://uttec-ai.duckdns.org
        </span>
      </div>
    </>
  );
};

const Scene01Intro: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const titleScale = scaleIn(frame, fps, 10);

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.background }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        padding: 60,
      }}>
        <div style={{
          fontSize: 36,
          color: COLORS.primary,
          fontWeight: 'bold',
          marginBottom: 20,
          opacity: fadeIn(frame, 0),
        }}>
          Level 6 - Lesson 7
        </div>

        <div style={{
          fontSize: 72,
          color: COLORS.text,
          fontWeight: 'bold',
          textAlign: 'center',
          transform: `scale(${titleScale})`,
          marginBottom: 40,
        }}>
          감성 분석 구현 실습
        </div>

        <div style={{
          fontSize: 32,
          color: COLORS.textSecondary,
          textAlign: 'center',
          opacity: fadeIn(frame, 30),
          marginBottom: 50,
        }}>
          LSTM으로 텍스트 감정을 분류하는 모델 만들기
        </div>

        <div style={{
          display: 'flex',
          gap: 40,
          opacity: fadeIn(frame, 50),
          transform: `translateY(${slideUp(frame, 50)}px)`,
        }}>
          <div style={{
            background: COLORS.cardBg,
            borderRadius: 20,
            padding: 30,
            borderLeft: `4px solid ${COLORS.positive}`,
          }}>
            <div style={{ fontSize: 28, color: COLORS.text, marginBottom: 10 }}>
              "이 영화 정말 재미있어요!"
            </div>
            <div style={{
              fontSize: 24,
              color: COLORS.positive,
              fontWeight: 'bold',
            }}>
              긍정 (Positive)
            </div>
          </div>

          <div style={{
            background: COLORS.cardBg,
            borderRadius: 20,
            padding: 30,
            borderLeft: `4px solid ${COLORS.negative}`,
          }}>
            <div style={{ fontSize: 28, color: COLORS.text, marginBottom: 10 }}>
              "서비스가 너무 별로였어요."
            </div>
            <div style={{
              fontSize: 24,
              color: COLORS.negative,
              fontWeight: 'bold',
            }}>
              부정 (Negative)
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const Scene02What: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const applications = [
    { icon: '🛒', title: '상품 리뷰 분석', desc: '고객 만족도 파악' },
    { icon: '📱', title: 'SNS 모니터링', desc: '브랜드 여론 추적' },
    { icon: '📊', title: '비즈니스 인사이트', desc: '불만 사항 자동 감지' },
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.background }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        padding: 60,
        height: '100%',
      }}>
        <div style={{
          fontSize: 52,
          color: COLORS.primary,
          fontWeight: 'bold',
          marginBottom: 40,
          opacity: fadeIn(frame, 0),
        }}>
          감성 분석이 왜 중요할까요?
        </div>

        <div style={{
          display: 'flex',
          gap: 40,
          marginBottom: 50,
        }}>
          {applications.map((app, i) => (
            <div
              key={i}
              style={{
                flex: 1,
                background: COLORS.cardBg,
                borderRadius: 20,
                padding: 40,
                textAlign: 'center',
                opacity: fadeIn(frame, 20 + i * 20),
                transform: `translateY(${slideUp(frame, 20 + i * 20)}px) scale(${scaleIn(frame, fps, 20 + i * 20)})`,
              }}
            >
              <div style={{ fontSize: 60, marginBottom: 20 }}>{app.icon}</div>
              <div style={{ fontSize: 28, color: COLORS.text, fontWeight: 'bold', marginBottom: 10 }}>
                {app.title}
              </div>
              <div style={{ fontSize: 22, color: COLORS.textSecondary }}>
                {app.desc}
              </div>
            </div>
          ))}
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 30,
          opacity: fadeIn(frame, 80),
          marginTop: 30,
        }}>
          <div style={{
            background: COLORS.cardBg,
            borderRadius: 15,
            padding: '20px 40px',
            fontSize: 24,
            color: COLORS.text,
          }}>
            텍스트 데이터
          </div>
          <div style={{ fontSize: 40, color: COLORS.primary }}>→</div>
          <div style={{
            background: `linear-gradient(135deg, ${COLORS.lstm}, ${COLORS.secondary})`,
            borderRadius: 15,
            padding: '20px 40px',
            fontSize: 24,
            color: COLORS.text,
            fontWeight: 'bold',
          }}>
            AI 모델
          </div>
          <div style={{ fontSize: 40, color: COLORS.primary }}>→</div>
          <div style={{
            background: COLORS.cardBg,
            borderRadius: 15,
            padding: '20px 40px',
            fontSize: 24,
            color: COLORS.text,
          }}>
            감정 분류
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const Scene03Data: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const reviews = [
    { text: '"이 영화는 정말 감동적이었습니다."', label: 1, type: '긍정' },
    { text: '"스토리가 지루하고 재미없었어요."', label: 0, type: '부정' },
    { text: '"연기력이 훌륭해요!"', label: 1, type: '긍정' },
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.background }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        padding: 60,
        height: '100%',
      }}>
        <div style={{
          fontSize: 52,
          color: COLORS.primary,
          fontWeight: 'bold',
          marginBottom: 30,
          opacity: fadeIn(frame, 0),
        }}>
          데이터 준비: IMDB 영화 리뷰
        </div>

        <div style={{
          display: 'flex',
          gap: 30,
          marginBottom: 40,
        }}>
          <div style={{
            flex: 1,
            background: COLORS.cardBg,
            borderRadius: 15,
            padding: 30,
            textAlign: 'center',
            opacity: fadeIn(frame, 20),
          }}>
            <div style={{ fontSize: 48, color: COLORS.accent, fontWeight: 'bold' }}>50,000</div>
            <div style={{ fontSize: 24, color: COLORS.textSecondary }}>총 리뷰 개수</div>
          </div>
          <div style={{
            flex: 1,
            background: COLORS.cardBg,
            borderRadius: 15,
            padding: 30,
            textAlign: 'center',
            opacity: fadeIn(frame, 30),
          }}>
            <div style={{ fontSize: 48, color: COLORS.positive, fontWeight: 'bold' }}>25,000</div>
            <div style={{ fontSize: 24, color: COLORS.textSecondary }}>긍정 리뷰</div>
          </div>
          <div style={{
            flex: 1,
            background: COLORS.cardBg,
            borderRadius: 15,
            padding: 30,
            textAlign: 'center',
            opacity: fadeIn(frame, 40),
          }}>
            <div style={{ fontSize: 48, color: COLORS.negative, fontWeight: 'bold' }}>25,000</div>
            <div style={{ fontSize: 24, color: COLORS.textSecondary }}>부정 리뷰</div>
          </div>
        </div>

        <div style={{
          background: COLORS.cardBg,
          borderRadius: 20,
          padding: 30,
          opacity: fadeIn(frame, 50),
        }}>
          <div style={{ fontSize: 28, color: COLORS.text, fontWeight: 'bold', marginBottom: 20 }}>
            데이터 예시
          </div>
          {reviews.map((review, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '15px 20px',
                marginBottom: 10,
                background: 'rgba(15, 23, 42, 0.6)',
                borderRadius: 10,
                opacity: fadeIn(frame, 60 + i * 15),
              }}
            >
              <div style={{ fontSize: 24, color: COLORS.text }}>{review.text}</div>
              <div style={{ display: 'flex', gap: 20 }}>
                <div style={{
                  fontSize: 22,
                  color: review.label === 1 ? COLORS.positive : COLORS.negative,
                  fontWeight: 'bold',
                }}>
                  {review.type}
                </div>
                <div style={{
                  background: review.label === 1 ? COLORS.positive : COLORS.negative,
                  color: 'white',
                  padding: '5px 15px',
                  borderRadius: 8,
                  fontSize: 20,
                  fontWeight: 'bold',
                }}>
                  Label: {review.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};

const Scene04Preprocess: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const steps = [
    { num: 1, title: '토큰화', desc: '문장 → 단어로 분리', example: '"영화가 재미있다" → ["영화가", "재미있다"]' },
    { num: 2, title: '어휘 사전', desc: '단어 → 숫자 ID', example: '"영화가"=1, "재미있다"=2' },
    { num: 3, title: '패딩', desc: '길이 통일', example: '[1, 2, 0, 0, 0] (길이 5로 맞춤)' },
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.background }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        padding: 60,
        height: '100%',
      }}>
        <div style={{
          fontSize: 52,
          color: COLORS.primary,
          fontWeight: 'bold',
          marginBottom: 40,
          opacity: fadeIn(frame, 0),
        }}>
          데이터 전처리 과정
        </div>

        {steps.map((step, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 30,
              marginBottom: 30,
              opacity: fadeIn(frame, 20 + i * 30),
              transform: `translateX(${interpolate(frame - (20 + i * 30), [0, 20], [-50, 0], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' })}px)`,
            }}
          >
            <div style={{
              width: 70,
              height: 70,
              borderRadius: '50%',
              background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.secondary})`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 32,
              fontWeight: 'bold',
              color: 'white',
            }}>
              {step.num}
            </div>
            <div style={{
              flex: 1,
              background: COLORS.cardBg,
              borderRadius: 15,
              padding: 25,
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: 28, color: COLORS.text, fontWeight: 'bold', marginBottom: 5 }}>
                    {step.title}
                  </div>
                  <div style={{ fontSize: 22, color: COLORS.textSecondary }}>
                    {step.desc}
                  </div>
                </div>
                <div style={{
                  background: 'rgba(6, 182, 212, 0.2)',
                  borderRadius: 10,
                  padding: '10px 20px',
                  fontSize: 20,
                  color: COLORS.primary,
                  fontFamily: 'monospace',
                }}>
                  {step.example}
                </div>
              </div>
            </div>
          </div>
        ))}

        <div style={{
          marginTop: 20,
          background: COLORS.cardBg,
          borderRadius: 15,
          padding: 30,
          opacity: fadeIn(frame, 110),
        }}>
          <div style={{ fontSize: 24, color: COLORS.accent, fontWeight: 'bold', textAlign: 'center' }}>
            결과: 모든 문장이 동일한 길이의 숫자 시퀀스로 변환됨
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const Scene05Embedding: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const words = ['좋다', '훌륭하다', '나쁘다'];
  const vectors = [
    [0.8, 0.6, 0.2],
    [0.75, 0.65, 0.25],
    [-0.7, -0.5, 0.8],
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.background }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        padding: 60,
        height: '100%',
      }}>
        <div style={{
          fontSize: 52,
          color: COLORS.primary,
          fontWeight: 'bold',
          marginBottom: 20,
          opacity: fadeIn(frame, 0),
        }}>
          임베딩 레이어 (Embedding Layer)
        </div>

        <div style={{
          fontSize: 28,
          color: COLORS.textSecondary,
          marginBottom: 40,
          opacity: fadeIn(frame, 15),
        }}>
          단어를 의미 있는 벡터로 변환합니다
        </div>

        <div style={{
          display: 'flex',
          gap: 40,
          marginBottom: 40,
        }}>
          {words.map((word, i) => (
            <div
              key={i}
              style={{
                flex: 1,
                opacity: fadeIn(frame, 30 + i * 20),
                transform: `scale(${scaleIn(frame, fps, 30 + i * 20)})`,
              }}
            >
              <div style={{
                background: COLORS.cardBg,
                borderRadius: 15,
                padding: 25,
                textAlign: 'center',
                marginBottom: 15,
              }}>
                <div style={{
                  fontSize: 32,
                  color: i === 2 ? COLORS.negative : COLORS.positive,
                  fontWeight: 'bold',
                }}>
                  "{word}"
                </div>
              </div>
              <div style={{ textAlign: 'center', fontSize: 32, color: COLORS.embedding }}>↓</div>
              <div style={{
                background: COLORS.cardBg,
                borderRadius: 15,
                padding: 20,
                textAlign: 'center',
              }}>
                <div style={{
                  fontSize: 20,
                  color: COLORS.text,
                  fontFamily: 'monospace',
                }}>
                  [{vectors[i].map(v => v.toFixed(2)).join(', ')}]
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{
          background: COLORS.cardBg,
          borderRadius: 20,
          padding: 30,
          opacity: fadeIn(frame, 90),
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 30 }}>
            <div style={{
              flex: 1,
              textAlign: 'center',
              borderRight: `1px solid ${COLORS.textSecondary}`,
              paddingRight: 30,
            }}>
              <div style={{ fontSize: 26, color: COLORS.positive, fontWeight: 'bold', marginBottom: 10 }}>
                "좋다" ≈ "훌륭하다"
              </div>
              <div style={{ fontSize: 22, color: COLORS.textSecondary }}>
                비슷한 의미 → 가까운 벡터
              </div>
            </div>
            <div style={{
              flex: 1,
              textAlign: 'center',
              paddingLeft: 30,
            }}>
              <div style={{ fontSize: 26, color: COLORS.negative, fontWeight: 'bold', marginBottom: 10 }}>
                "좋다" ≠ "나쁘다"
              </div>
              <div style={{ fontSize: 22, color: COLORS.textSecondary }}>
                반대 의미 → 먼 벡터
              </div>
            </div>
          </div>
        </div>

        <div style={{
          marginTop: 30,
          textAlign: 'center',
          opacity: fadeIn(frame, 110),
        }}>
          <div style={{
            display: 'inline-block',
            background: 'rgba(139, 92, 246, 0.2)',
            borderRadius: 10,
            padding: '15px 30px',
            fontSize: 24,
            color: COLORS.secondary,
            fontFamily: 'monospace',
          }}>
            nn.Embedding(vocab_size=10000, embedding_dim=100)
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const Scene06Model: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const layers = [
    { name: '임베딩', color: COLORS.embedding, desc: '단어 → 벡터' },
    { name: 'LSTM', color: COLORS.lstm, desc: '시퀀스 이해' },
    { name: '분류기', color: COLORS.classifier, desc: '긍정/부정 확률' },
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.background }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        padding: 60,
        height: '100%',
      }}>
        <div style={{
          fontSize: 52,
          color: COLORS.primary,
          fontWeight: 'bold',
          marginBottom: 40,
          opacity: fadeIn(frame, 0),
        }}>
          모델 구조
        </div>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 20,
        }}>
          <div style={{
            background: COLORS.cardBg,
            borderRadius: 15,
            padding: '20px 60px',
            opacity: fadeIn(frame, 20),
            transform: `scale(${scaleIn(frame, fps, 20)})`,
          }}>
            <div style={{ fontSize: 24, color: COLORS.text }}>입력: 정수 시퀀스 [12, 345, 67, ...]</div>
          </div>

          <div style={{ fontSize: 40, color: COLORS.primary, opacity: fadeIn(frame, 35) }}>↓</div>

          {layers.map((layer, i) => (
            <React.Fragment key={i}>
              <div style={{
                background: `linear-gradient(135deg, ${layer.color}dd, ${layer.color}88)`,
                borderRadius: 20,
                padding: '30px 80px',
                textAlign: 'center',
                opacity: fadeIn(frame, 40 + i * 25),
                transform: `scale(${scaleIn(frame, fps, 40 + i * 25)})`,
              }}>
                <div style={{ fontSize: 32, color: 'white', fontWeight: 'bold', marginBottom: 5 }}>
                  {layer.name}
                </div>
                <div style={{ fontSize: 22, color: 'rgba(255,255,255,0.8)' }}>
                  {layer.desc}
                </div>
              </div>
              {i < layers.length - 1 && (
                <div style={{ fontSize: 40, color: COLORS.primary, opacity: fadeIn(frame, 55 + i * 25) }}>↓</div>
              )}
            </React.Fragment>
          ))}

          <div style={{ fontSize: 40, color: COLORS.primary, opacity: fadeIn(frame, 115) }}>↓</div>

          <div style={{
            display: 'flex',
            gap: 40,
            opacity: fadeIn(frame, 125),
          }}>
            <div style={{
              background: COLORS.cardBg,
              borderRadius: 15,
              padding: '20px 40px',
              textAlign: 'center',
            }}>
              <div style={{ fontSize: 28, color: COLORS.positive, fontWeight: 'bold' }}>&gt; 0.5</div>
              <div style={{ fontSize: 22, color: COLORS.textSecondary }}>긍정</div>
            </div>
            <div style={{
              background: COLORS.cardBg,
              borderRadius: 15,
              padding: '20px 40px',
              textAlign: 'center',
            }}>
              <div style={{ fontSize: 28, color: COLORS.negative, fontWeight: 'bold' }}>&lt; 0.5</div>
              <div style={{ fontSize: 22, color: COLORS.textSecondary }}>부정</div>
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const Scene07CodeClass: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const codeLines = [
    'class SentimentLSTM(nn.Module):',
    '    def __init__(self, vocab_size, embed_dim, hidden_dim):',
    '        super().__init__()',
    '',
    '        # 임베딩 레이어',
    '        self.embedding = nn.Embedding(vocab_size, embed_dim)',
    '',
    '        # LSTM 레이어',
    '        self.lstm = nn.LSTM(',
    '            input_size=embed_dim,',
    '            hidden_size=hidden_dim,',
    '            num_layers=2,',
    '            batch_first=True,',
    '            dropout=0.3',
    '        )',
    '',
    '        # 분류기',
    '        self.fc = nn.Linear(hidden_dim, 1)',
    '        self.sigmoid = nn.Sigmoid()',
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.background }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        padding: 60,
        height: '100%',
      }}>
        <div style={{
          fontSize: 48,
          color: COLORS.primary,
          fontWeight: 'bold',
          marginBottom: 30,
          opacity: fadeIn(frame, 0),
        }}>
          PyTorch 코드: 클래스 정의
        </div>

        <div style={{
          background: '#1e293b',
          borderRadius: 20,
          padding: 30,
          flex: 1,
          overflow: 'hidden',
        }}>
          <pre style={{
            margin: 0,
            fontFamily: '"Fira Code", monospace',
            fontSize: 22,
            lineHeight: 1.5,
          }}>
            {codeLines.map((line, i) => {
              const delay = 10 + i * 5;
              const opacity = fadeIn(frame, delay);
              const highlight = line.includes('nn.Embedding') ? COLORS.embedding :
                               line.includes('nn.LSTM') ? COLORS.lstm :
                               line.includes('nn.Linear') || line.includes('Sigmoid') ? COLORS.classifier :
                               COLORS.text;

              return (
                <div key={i} style={{ opacity }}>
                  <span style={{ color: COLORS.textSecondary, marginRight: 20 }}>
                    {String(i + 1).padStart(2, ' ')}
                  </span>
                  <span style={{ color: line.startsWith('        #') ? COLORS.textSecondary : highlight }}>
                    {line}
                  </span>
                </div>
              );
            })}
          </pre>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const Scene08CodeForward: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const codeLines = [
    'def forward(self, x):',
    '    # x: 정수 시퀀스 (batch, seq_len)',
    '',
    '    # 1. 임베딩 적용',
    '    embedded = self.embedding(x)',
    '    # (batch, seq_len, embed_dim)',
    '',
    '    # 2. LSTM 통과',
    '    lstm_out, (hidden, cell) = self.lstm(embedded)',
    '    # hidden: (num_layers, batch, hidden_dim)',
    '',
    '    # 3. 마지막 레이어 은닉 상태 추출',
    '    hidden = hidden[-1]',
    '    # (batch, hidden_dim)',
    '',
    '    # 4. 분류기 통과',
    '    out = self.fc(hidden)',
    '    out = self.sigmoid(out)',
    '',
    '    return out  # (batch, 1): 확률값',
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.background }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        padding: 60,
        height: '100%',
      }}>
        <div style={{
          fontSize: 48,
          color: COLORS.primary,
          fontWeight: 'bold',
          marginBottom: 30,
          opacity: fadeIn(frame, 0),
        }}>
          PyTorch 코드: forward 함수
        </div>

        <div style={{
          background: '#1e293b',
          borderRadius: 20,
          padding: 30,
          flex: 1,
          overflow: 'hidden',
        }}>
          <pre style={{
            margin: 0,
            fontFamily: '"Fira Code", monospace',
            fontSize: 20,
            lineHeight: 1.45,
          }}>
            {codeLines.map((line, i) => {
              const delay = 10 + i * 4;
              const opacity = fadeIn(frame, delay);
              const isComment = line.trim().startsWith('#');

              return (
                <div key={i} style={{ opacity }}>
                  <span style={{ color: COLORS.textSecondary, marginRight: 20 }}>
                    {String(i + 1).padStart(2, ' ')}
                  </span>
                  <span style={{ color: isComment ? COLORS.textSecondary : COLORS.text }}>
                    {line}
                  </span>
                </div>
              );
            })}
          </pre>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const Scene09Training: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const steps = [
    { num: 1, code: 'criterion = nn.BCELoss()', desc: 'Binary Cross Entropy 손실' },
    { num: 2, code: 'optimizer = Adam(lr=0.001)', desc: 'Adam 옵티마이저' },
    { num: 3, code: 'outputs = model(inputs)', desc: '예측 수행' },
    { num: 4, code: 'loss = criterion(outputs, labels)', desc: '손실 계산' },
    { num: 5, code: 'loss.backward()', desc: '그래디언트 계산' },
    { num: 6, code: 'optimizer.step()', desc: '가중치 업데이트' },
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.background }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        padding: 60,
        height: '100%',
      }}>
        <div style={{
          fontSize: 48,
          color: COLORS.primary,
          fontWeight: 'bold',
          marginBottom: 30,
          opacity: fadeIn(frame, 0),
        }}>
          학습 과정
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 20,
        }}>
          {steps.map((step, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 20,
                background: COLORS.cardBg,
                borderRadius: 15,
                padding: 25,
                opacity: fadeIn(frame, 20 + i * 15),
                transform: `translateX(${slideUp(frame, 20 + i * 15) / 2}px)`,
              }}
            >
              <div style={{
                width: 50,
                height: 50,
                borderRadius: '50%',
                background: COLORS.lstm,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 24,
                fontWeight: 'bold',
                color: 'white',
              }}>
                {step.num}
              </div>
              <div>
                <div style={{
                  fontSize: 22,
                  color: COLORS.accent,
                  fontFamily: 'monospace',
                  marginBottom: 5,
                }}>
                  {step.code}
                </div>
                <div style={{ fontSize: 20, color: COLORS.textSecondary }}>
                  {step.desc}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{
          marginTop: 30,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 20,
          opacity: fadeIn(frame, 110),
        }}>
          {['Epoch 1', 'Epoch 2', '...', 'Epoch N'].map((epoch, i) => (
            <React.Fragment key={i}>
              <div style={{
                background: COLORS.cardBg,
                borderRadius: 10,
                padding: '15px 25px',
                fontSize: 22,
                color: COLORS.text,
              }}>
                {epoch}
              </div>
              {i < 3 && <div style={{ color: COLORS.primary, fontSize: 28 }}>→</div>}
            </React.Fragment>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};

const Scene10Eval: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const accuracy = Math.min(frame / 2, 87);

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.background }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        padding: 60,
        height: '100%',
      }}>
        <div style={{
          fontSize: 48,
          color: COLORS.primary,
          fontWeight: 'bold',
          marginBottom: 40,
          opacity: fadeIn(frame, 0),
        }}>
          모델 평가
        </div>

        <div style={{ display: 'flex', gap: 40 }}>
          <div style={{
            flex: 1,
            background: '#1e293b',
            borderRadius: 20,
            padding: 30,
            opacity: fadeIn(frame, 20),
          }}>
            <pre style={{
              margin: 0,
              fontFamily: '"Fira Code", monospace',
              fontSize: 22,
              lineHeight: 1.6,
              color: COLORS.text,
            }}>
{`model.eval()

with torch.no_grad():
    outputs = model(test_inputs)
    predictions = (outputs > 0.5)

    accuracy = (predictions == labels)
    accuracy = accuracy.float().mean()`}
            </pre>
          </div>

          <div style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: fadeIn(frame, 50),
          }}>
            <div style={{ fontSize: 28, color: COLORS.textSecondary, marginBottom: 20 }}>
              테스트 정확도
            </div>
            <div style={{
              width: 200,
              height: 200,
              borderRadius: '50%',
              background: `conic-gradient(${COLORS.positive} ${accuracy * 3.6}deg, ${COLORS.cardBg} 0deg)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <div style={{
                width: 150,
                height: 150,
                borderRadius: '50%',
                background: COLORS.background,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <span style={{ fontSize: 48, color: COLORS.positive, fontWeight: 'bold' }}>
                  {accuracy.toFixed(0)}%
                </span>
              </div>
            </div>
          </div>
        </div>

        <div style={{
          display: 'flex',
          gap: 30,
          marginTop: 40,
          opacity: fadeIn(frame, 80),
        }}>
          {['Precision', 'Recall', 'F1 Score'].map((metric, i) => (
            <div
              key={i}
              style={{
                flex: 1,
                background: COLORS.cardBg,
                borderRadius: 15,
                padding: 25,
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: 24, color: COLORS.text, fontWeight: 'bold' }}>
                {metric}
              </div>
              <div style={{ fontSize: 20, color: COLORS.textSecondary, marginTop: 10 }}>
                더 자세한 평가 지표
              </div>
            </div>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};

const Scene11Tips: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const tips = [
    { title: '양방향 LSTM', desc: 'bidirectional=True로 앞뒤 문맥 활용', icon: '↔️' },
    { title: '드롭아웃', desc: 'dropout=0.2~0.5로 과적합 방지', icon: '🎯' },
    { title: '사전 학습 임베딩', desc: 'Word2Vec, GloVe 사용', icon: '📚' },
    { title: '하이퍼파라미터 튜닝', desc: '학습률, 은닉 크기 최적화', icon: '⚙️' },
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.background }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        padding: 60,
        height: '100%',
      }}>
        <div style={{
          fontSize: 48,
          color: COLORS.primary,
          fontWeight: 'bold',
          marginBottom: 40,
          opacity: fadeIn(frame, 0),
        }}>
          성능 향상 팁
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 30,
        }}>
          {tips.map((tip, i) => (
            <div
              key={i}
              style={{
                background: COLORS.cardBg,
                borderRadius: 20,
                padding: 35,
                opacity: fadeIn(frame, 20 + i * 20),
                transform: `scale(${scaleIn(frame, fps, 20 + i * 20)})`,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 15 }}>
                <span style={{ fontSize: 40 }}>{tip.icon}</span>
                <div style={{ fontSize: 28, color: COLORS.text, fontWeight: 'bold' }}>
                  {tip.title}
                </div>
              </div>
              <div style={{ fontSize: 22, color: COLORS.textSecondary }}>
                {tip.desc}
              </div>
            </div>
          ))}
        </div>

        <div style={{
          marginTop: 30,
          background: '#1e293b',
          borderRadius: 15,
          padding: 25,
          opacity: fadeIn(frame, 100),
        }}>
          <pre style={{
            margin: 0,
            fontFamily: '"Fira Code", monospace',
            fontSize: 22,
            color: COLORS.accent,
            textAlign: 'center',
          }}>
            self.lstm = nn.LSTM(..., bidirectional=True, dropout=0.3)
          </pre>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const Scene12Outro: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const summaryPoints = [
    '감성 분석: 텍스트에서 감정 판단',
    '전처리: 토큰화 → 어휘 사전 → 패딩',
    '모델: 임베딩 + LSTM + 분류기',
    'BCE Loss로 학습, 테스트로 평가',
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.background }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        padding: 60,
      }}>
        <div style={{
          fontSize: 52,
          color: COLORS.primary,
          fontWeight: 'bold',
          marginBottom: 40,
          opacity: fadeIn(frame, 0),
        }}>
          Level 6 정리
        </div>

        <div style={{
          background: COLORS.cardBg,
          borderRadius: 20,
          padding: 40,
          width: '80%',
          marginBottom: 40,
        }}>
          {summaryPoints.map((point, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 20,
                marginBottom: i < summaryPoints.length - 1 ? 20 : 0,
                opacity: fadeIn(frame, 20 + i * 15),
              }}
            >
              <div style={{
                width: 12,
                height: 12,
                borderRadius: '50%',
                background: COLORS.positive,
              }} />
              <div style={{ fontSize: 28, color: COLORS.text }}>
                {point}
              </div>
            </div>
          ))}
        </div>

        <div style={{
          fontSize: 36,
          color: COLORS.accent,
          fontWeight: 'bold',
          textAlign: 'center',
          opacity: fadeIn(frame, 80),
        }}>
          RNN의 기초부터 실전 응용까지!
        </div>

        <div style={{
          fontSize: 28,
          color: COLORS.textSecondary,
          textAlign: 'center',
          marginTop: 30,
          opacity: fadeIn(frame, 100),
        }}>
          다음 레벨에서 더 발전된 내용을 배워봅시다
        </div>

        <div style={{
          fontSize: 40,
          color: COLORS.text,
          fontWeight: 'bold',
          marginTop: 50,
          opacity: fadeIn(frame, 120),
        }}>
          감사합니다!
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const Lesson6_7Video: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const getSceneComponent = () => {
    const { scene01_intro, scene02_what, scene03_data, scene04_preprocess, scene05_embedding,
            scene06_model, scene07_code_class, scene08_code_forward, scene09_training,
            scene10_eval, scene11_tips, scene12_outro } = SCENE_TIMINGS;

    if (frame < scene02_what.start) {
      return <Scene01Intro frame={frame - scene01_intro.start} fps={fps} />;
    } else if (frame < scene03_data.start) {
      return <Scene02What frame={frame - scene02_what.start} fps={fps} />;
    } else if (frame < scene04_preprocess.start) {
      return <Scene03Data frame={frame - scene03_data.start} fps={fps} />;
    } else if (frame < scene05_embedding.start) {
      return <Scene04Preprocess frame={frame - scene04_preprocess.start} fps={fps} />;
    } else if (frame < scene06_model.start) {
      return <Scene05Embedding frame={frame - scene05_embedding.start} fps={fps} />;
    } else if (frame < scene07_code_class.start) {
      return <Scene06Model frame={frame - scene06_model.start} fps={fps} />;
    } else if (frame < scene08_code_forward.start) {
      return <Scene07CodeClass frame={frame - scene07_code_class.start} fps={fps} />;
    } else if (frame < scene09_training.start) {
      return <Scene08CodeForward frame={frame - scene08_code_forward.start} fps={fps} />;
    } else if (frame < scene10_eval.start) {
      return <Scene09Training frame={frame - scene09_training.start} fps={fps} />;
    } else if (frame < scene11_tips.start) {
      return <Scene10Eval frame={frame - scene10_eval.start} fps={fps} />;
    } else if (frame < scene12_outro.start) {
      return <Scene11Tips frame={frame - scene11_tips.start} fps={fps} />;
    } else {
      return <Scene12Outro frame={frame - scene12_outro.start} fps={fps} />;
    }
  };

  return (
    <AbsoluteFill>
      {getSceneComponent()}
      <GlobalOverlay />
      {Object.entries(SCENE_TIMINGS).map(([name, timing]) => (
        <Audio
          key={name}
          src={staticFile(`audio/lesson-6-7/${name}.mp3`)}
          startFrom={0}
          endAt={timing.duration}
          volume={frame >= timing.start && frame < timing.start + timing.duration ? 1 : 0}
        />
      ))}
    </AbsoluteFill>
  );
};
