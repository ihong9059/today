import React from 'react';
import {
  AbsoluteFill,
  Audio,
  Sequence,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Easing,
} from 'remotion';

// 씬별 타이밍 (TTS 실제 길이 + 3초 버퍼)
export const SCENE_TIMINGS = {
  scene01_intro: { duration: 912, start: 0 },
  scene02_quality_items: { duration: 1147, start: 912 },
  scene03_fritsch: { duration: 1272, start: 2059 },
  scene04_inline: { duration: 1065, start: 3331 },
  scene05_ai_prediction: { duration: 1229, start: 4396 },
  scene06_bayesian: { duration: 1103, start: 5625 },
  scene07_spc: { duration: 1115, start: 6728 },
  scene08_architecture: { duration: 1041, start: 7843 },
  scene09_traceability: { duration: 1199, start: 8884 },
  scene10_roi: { duration: 1164, start: 10083 },
};

export const TOTAL_DURATION = 11247;

// 공통 스타일
const containerStyle: React.CSSProperties = {
  background: 'linear-gradient(135deg, #0c1929 0%, #1a3a5c 50%, #0d2137 100%)',
  fontFamily: '"Pretendard", "Noto Sans KR", sans-serif',
};

const titleStyle: React.CSSProperties = {
  fontSize: 56,
  fontWeight: 700,
  color: '#00d4ff',
  textAlign: 'center',
  textShadow: '0 0 30px rgba(0, 212, 255, 0.5)',
  marginBottom: 40,
};

const subtitleStyle: React.CSSProperties = {
  fontSize: 32,
  fontWeight: 500,
  color: '#e0e0e0',
  textAlign: 'center',
  lineHeight: 1.6,
};

const cardStyle: React.CSSProperties = {
  background: 'rgba(255, 255, 255, 0.05)',
  backdropFilter: 'blur(10px)',
  borderRadius: 20,
  border: '1px solid rgba(0, 212, 255, 0.3)',
  padding: 30,
  boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)',
};

// Scene 01: 인트로
const Scene01Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: 'clamp' });
  const titleY = interpolate(frame, [0, 30], [50, 0], { extrapolateRight: 'clamp' });
  const subtitleOpacity = interpolate(frame, [30, 60], [0, 1], { extrapolateRight: 'clamp' });

  const pulseScale = interpolate(
    frame % 60,
    [0, 30, 60],
    [1, 1.05, 1],
    { extrapolateRight: 'clamp' }
  );

  return (
    <AbsoluteFill style={{...containerStyle, justifyContent: 'center', alignItems: 'center'}}>
      {/* 배경 장식 */}
      <div style={{
        position: 'absolute',
        width: 600,
        height: 600,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0, 212, 255, 0.1) 0%, transparent 70%)',
        transform: `scale(${pulseScale})`,
      }} />

      {/* 메인 콘텐츠 */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        opacity: titleOpacity,
        transform: `translateY(${titleY}px)`,
      }}>
        <div style={{
          fontSize: 24,
          color: '#00d4ff',
          letterSpacing: 8,
          marginBottom: 20,
        }}>
          AI SMART FACTORY
        </div>

        <h1 style={{
          ...titleStyle,
          fontSize: 72,
          marginBottom: 30,
        }}>
          품질관리 시스템
        </h1>

        <div style={{
          width: 200,
          height: 4,
          background: 'linear-gradient(90deg, transparent, #00d4ff, transparent)',
          marginBottom: 40,
        }} />

        <p style={{
          ...subtitleStyle,
          opacity: subtitleOpacity,
          maxWidth: 900,
        }}>
          FRITSCH 정밀 분석 장비 + AI 예측 모델<br/>
          블랙매스 품질 최적화 솔루션
        </p>

        <div style={{
          display: 'flex',
          gap: 40,
          marginTop: 60,
          opacity: subtitleOpacity,
        }}>
          {['D50 = 50μm', 'Span < 2.0', '원형도 > 0.85'].map((text, i) => (
            <div key={i} style={{
              ...cardStyle,
              padding: '20px 40px',
              fontSize: 24,
              color: '#00d4ff',
            }}>
              {text}
            </div>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Scene 02: 품질관리 항목
const Scene02QualityItems: React.FC = () => {
  const frame = useCurrentFrame();

  const qualityItems = [
    { category: '입도 분포', items: ['D10: 10μm', 'D50: 50μm (±10%)', 'D90: 150μm', 'Span: < 2.0'] },
    { category: '입자 형상', items: ['원형도: > 0.85', '종횡비: < 1.5', '볼록도: > 0.90'] },
    { category: '공정 품질', items: ['회수율: > 95%', '불순물: < 0.5%', '수분: < 0.3%'] },
  ];

  return (
    <AbsoluteFill style={{...containerStyle, padding: 60}}>
      <h2 style={titleStyle}>핵심 품질 지표 (KQI)</h2>

      <div style={{
        display: 'flex',
        gap: 40,
        justifyContent: 'center',
        marginTop: 40,
      }}>
        {qualityItems.map((group, groupIdx) => {
          const delay = groupIdx * 20;
          const opacity = interpolate(frame, [delay, delay + 30], [0, 1], { extrapolateRight: 'clamp' });
          const translateY = interpolate(frame, [delay, delay + 30], [30, 0], { extrapolateRight: 'clamp' });

          return (
            <div key={groupIdx} style={{
              ...cardStyle,
              width: 350,
              opacity,
              transform: `translateY(${translateY}px)`,
            }}>
              <h3 style={{
                fontSize: 28,
                color: '#00d4ff',
                marginBottom: 25,
                textAlign: 'center',
                borderBottom: '2px solid rgba(0, 212, 255, 0.3)',
                paddingBottom: 15,
              }}>
                {group.category}
              </h3>

              {group.items.map((item, itemIdx) => {
                const itemDelay = delay + 30 + itemIdx * 10;
                const itemOpacity = interpolate(frame, [itemDelay, itemDelay + 20], [0, 1], { extrapolateRight: 'clamp' });

                return (
                  <div key={itemIdx} style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: 15,
                    opacity: itemOpacity,
                  }}>
                    <div style={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      background: '#00d4ff',
                      marginRight: 15,
                    }} />
                    <span style={{ fontSize: 22, color: '#e0e0e0' }}>{item}</span>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>

      {/* 하단 설명 */}
      <div style={{
        position: 'absolute',
        bottom: 80,
        left: 0,
        right: 0,
        textAlign: 'center',
        opacity: interpolate(frame, [90, 120], [0, 1], { extrapolateRight: 'clamp' }),
      }}>
        <p style={{ fontSize: 24, color: '#aaa' }}>
          ※ 후공정 침출 효율과 직접적 상관관계
        </p>
      </div>
    </AbsoluteFill>
  );
};

// Scene 03: FRITSCH 분석 장비
const Scene03Fritsch: React.FC = () => {
  const frame = useCurrentFrame();

  const equipment = [
    {
      name: 'ANALYSETTE 22 NeXT',
      type: '레이저 회절',
      range: '0.01 ~ 3,800 μm',
      features: ['건식/습식 분산', 'ISO 13320 준수', '자동 측정'],
      color: '#00d4ff',
    },
    {
      name: 'ANALYSETTE 28',
      type: '동적 이미지 분석',
      range: '20 ~ 20,000 μm',
      features: ['원형도 측정', '종횡비 분석', '볼록도 정량화'],
      color: '#00ff88',
    },
    {
      name: 'ANALYSETTE 3 PRO',
      type: '마이크로 체가름',
      range: '20 ~ 63,000 μm',
      features: ['3D 진동', '정밀 분급', '재현성 우수'],
      color: '#ff6b35',
    },
  ];

  return (
    <AbsoluteFill style={{...containerStyle, padding: 60}}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 40 }}>
        <h2 style={{...titleStyle, marginBottom: 0}}>FRITSCH 정밀 분석 장비</h2>
        <span style={{
          marginLeft: 20,
          padding: '8px 16px',
          background: 'rgba(0, 212, 255, 0.2)',
          borderRadius: 20,
          fontSize: 18,
          color: '#00d4ff',
        }}>
          독일 정밀 기술
        </span>
      </div>

      <div style={{
        display: 'flex',
        gap: 30,
        justifyContent: 'center',
      }}>
        {equipment.map((eq, idx) => {
          const delay = idx * 25;
          const opacity = interpolate(frame, [delay, delay + 40], [0, 1], { extrapolateRight: 'clamp' });
          const scale = interpolate(frame, [delay, delay + 40], [0.9, 1], { extrapolateRight: 'clamp' });

          return (
            <div key={idx} style={{
              ...cardStyle,
              width: 380,
              opacity,
              transform: `scale(${scale})`,
              borderColor: eq.color,
              borderWidth: 2,
            }}>
              {/* 헤더 */}
              <div style={{
                background: `linear-gradient(135deg, ${eq.color}20, transparent)`,
                margin: -30,
                marginBottom: 20,
                padding: 25,
                borderRadius: '20px 20px 0 0',
              }}>
                <h3 style={{ fontSize: 26, color: eq.color, marginBottom: 8 }}>{eq.name}</h3>
                <p style={{ fontSize: 18, color: '#aaa' }}>{eq.type}</p>
              </div>

              {/* 측정 범위 */}
              <div style={{
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: 10,
                padding: 15,
                marginBottom: 20,
                textAlign: 'center',
              }}>
                <span style={{ fontSize: 16, color: '#888' }}>측정 범위</span>
                <div style={{ fontSize: 24, color: '#fff', marginTop: 5 }}>{eq.range}</div>
              </div>

              {/* 특징 */}
              {eq.features.map((feature, fIdx) => (
                <div key={fIdx} style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: 12,
                }}>
                  <div style={{
                    width: 6,
                    height: 6,
                    background: eq.color,
                    borderRadius: '50%',
                    marginRight: 12,
                  }} />
                  <span style={{ fontSize: 18, color: '#d0d0d0' }}>{feature}</span>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// Scene 04: 인라인 모니터링
const Scene04Inline: React.FC = () => {
  const frame = useCurrentFrame();

  const stages = [
    { name: '1차 파쇄기', measurement: '조대 입자 분포', sensor: '레이저 센서' },
    { name: '2차 분쇄기', measurement: '미세 입자 분포', sensor: '입도 분석기' },
    { name: '박리기', measurement: '형상 분석', sensor: '이미지 센서' },
    { name: '분급기', measurement: '분급 효율', sensor: '중량 센서' },
  ];

  return (
    <AbsoluteFill style={{...containerStyle, padding: 60}}>
      <h2 style={titleStyle}>실시간 인라인 모니터링</h2>

      {/* 공정 흐름 */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 40,
      }}>
        {stages.map((stage, idx) => {
          const delay = idx * 20;
          const opacity = interpolate(frame, [delay, delay + 30], [0, 1], { extrapolateRight: 'clamp' });

          return (
            <React.Fragment key={idx}>
              <div style={{
                ...cardStyle,
                width: 240,
                textAlign: 'center',
                opacity,
              }}>
                <div style={{
                  width: 60,
                  height: 60,
                  margin: '0 auto 15px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #00d4ff, #0088cc)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 24,
                  fontWeight: 700,
                  color: '#fff',
                }}>
                  {idx + 1}
                </div>
                <h4 style={{ fontSize: 22, color: '#00d4ff', marginBottom: 15 }}>{stage.name}</h4>
                <p style={{ fontSize: 18, color: '#e0e0e0', marginBottom: 10 }}>{stage.measurement}</p>
                <p style={{ fontSize: 16, color: '#888' }}>{stage.sensor}</p>
              </div>

              {idx < stages.length - 1 && (
                <div style={{
                  width: 60,
                  height: 4,
                  background: 'linear-gradient(90deg, #00d4ff, #00d4ff80)',
                  margin: '0 10px',
                  opacity: interpolate(frame, [delay + 20, delay + 40], [0, 1], { extrapolateRight: 'clamp' }),
                }} />
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* 데이터 수집 정보 */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: 60,
        marginTop: 60,
        opacity: interpolate(frame, [100, 130], [0, 1], { extrapolateRight: 'clamp' }),
      }}>
        {[
          { label: '수집 주기', value: '100ms' },
          { label: '이상 감지', value: '실시간' },
          { label: '경보 발생', value: '즉시' },
        ].map((item, idx) => (
          <div key={idx} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 36, color: '#00d4ff', fontWeight: 700 }}>{item.value}</div>
            <div style={{ fontSize: 18, color: '#888', marginTop: 5 }}>{item.label}</div>
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};

// Scene 05: AI 품질 예측
const Scene05AIPrediction: React.FC = () => {
  const frame = useCurrentFrame();

  const models = [
    { name: 'Random Forest', metric: 'R² > 0.92', use: '입도 분포 예측', icon: '🌲' },
    { name: 'Gradient Boosting', metric: 'R² > 0.88', use: '비선형 관계 모델링', icon: '📈' },
    { name: 'XGBoost', metric: 'R² > 0.90', use: '품질 이탈 예측', icon: '⚡' },
    { name: 'LSTM', metric: 'AUC > 0.95', use: '이상 사전 감지 (15분 전)', icon: '🔮' },
  ];

  return (
    <AbsoluteFill style={{...containerStyle, padding: 60}}>
      <h2 style={titleStyle}>AI 품질 예측 모델</h2>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: 30,
        maxWidth: 1100,
        margin: '40px auto 0',
      }}>
        {models.map((model, idx) => {
          const delay = idx * 15;
          const opacity = interpolate(frame, [delay, delay + 30], [0, 1], { extrapolateRight: 'clamp' });
          const translateX = interpolate(frame, [delay, delay + 30], [idx % 2 === 0 ? -50 : 50, 0], { extrapolateRight: 'clamp' });

          return (
            <div key={idx} style={{
              ...cardStyle,
              display: 'flex',
              alignItems: 'center',
              gap: 25,
              opacity,
              transform: `translateX(${translateX}px)`,
            }}>
              <div style={{
                width: 80,
                height: 80,
                borderRadius: 15,
                background: 'linear-gradient(135deg, #00d4ff20, #0088cc20)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 40,
                flexShrink: 0,
              }}>
                {model.icon}
              </div>

              <div style={{ flex: 1 }}>
                <h4 style={{ fontSize: 24, color: '#00d4ff', marginBottom: 8 }}>{model.name}</h4>
                <div style={{
                  display: 'inline-block',
                  padding: '4px 12px',
                  background: 'rgba(0, 255, 136, 0.2)',
                  borderRadius: 15,
                  fontSize: 18,
                  color: '#00ff88',
                  marginBottom: 8,
                }}>
                  {model.metric}
                </div>
                <p style={{ fontSize: 18, color: '#aaa' }}>{model.use}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Neural Network 추가 정보 */}
      <div style={{
        textAlign: 'center',
        marginTop: 40,
        opacity: interpolate(frame, [80, 110], [0, 1], { extrapolateRight: 'clamp' }),
      }}>
        <div style={{
          ...cardStyle,
          display: 'inline-block',
          padding: '20px 50px',
        }}>
          <span style={{ fontSize: 20, color: '#888' }}>Neural Network 분류 정확도: </span>
          <span style={{ fontSize: 28, color: '#00ff88', fontWeight: 700 }}>93%</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Scene 06: Bayesian 최적화
const Scene06Bayesian: React.FC = () => {
  const frame = useCurrentFrame();

  const objectives = [
    { name: 'D50 목표값 달성', weight: '40%' },
    { name: '에너지 효율 최대화', weight: '30%' },
    { name: '처리량 극대화', weight: '30%' },
  ];

  const parameters = [
    '분쇄기 RPM',
    '분급기 풍량',
    '체류 시간',
    '투입량',
  ];

  return (
    <AbsoluteFill style={{...containerStyle, padding: 60}}>
      <h2 style={titleStyle}>Bayesian Optimization</h2>
      <p style={{...subtitleStyle, marginBottom: 40}}>공정 파라미터 자동 최적화</p>

      <div style={{
        display: 'flex',
        gap: 50,
        justifyContent: 'center',
      }}>
        {/* 목적 함수 */}
        <div style={{
          ...cardStyle,
          width: 400,
          opacity: interpolate(frame, [0, 30], [0, 1], { extrapolateRight: 'clamp' }),
        }}>
          <h3 style={{ fontSize: 24, color: '#00d4ff', marginBottom: 25, textAlign: 'center' }}>
            목적 함수 (Objective)
          </h3>

          {objectives.map((obj, idx) => {
            const barWidth = interpolate(frame, [30 + idx * 15, 60 + idx * 15], [0, parseFloat(obj.weight)], { extrapolateRight: 'clamp' });

            return (
              <div key={idx} style={{ marginBottom: 20 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{ fontSize: 18, color: '#e0e0e0' }}>{obj.name}</span>
                  <span style={{ fontSize: 18, color: '#00d4ff' }}>{obj.weight}</span>
                </div>
                <div style={{ height: 8, background: 'rgba(255,255,255,0.1)', borderRadius: 4 }}>
                  <div style={{
                    width: `${barWidth}%`,
                    height: '100%',
                    background: 'linear-gradient(90deg, #00d4ff, #00ff88)',
                    borderRadius: 4,
                  }} />
                </div>
              </div>
            );
          })}
        </div>

        {/* 탐색 공간 */}
        <div style={{
          ...cardStyle,
          width: 400,
          opacity: interpolate(frame, [20, 50], [0, 1], { extrapolateRight: 'clamp' }),
        }}>
          <h3 style={{ fontSize: 24, color: '#00d4ff', marginBottom: 25, textAlign: 'center' }}>
            탐색 공간 (Search Space)
          </h3>

          {parameters.map((param, idx) => (
            <div key={idx} style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: 18,
              opacity: interpolate(frame, [40 + idx * 10, 60 + idx * 10], [0, 1], { extrapolateRight: 'clamp' }),
            }}>
              <div style={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                background: '#00ff88',
                marginRight: 15,
              }} />
              <span style={{ fontSize: 20, color: '#e0e0e0' }}>{param}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Gaussian Process */}
      <div style={{
        textAlign: 'center',
        marginTop: 40,
        opacity: interpolate(frame, [80, 110], [0, 1], { extrapolateRight: 'clamp' }),
      }}>
        <div style={{
          ...cardStyle,
          display: 'inline-flex',
          alignItems: 'center',
          gap: 30,
          padding: '20px 40px',
        }}>
          <span style={{ fontSize: 20, color: '#e0e0e0' }}>Gaussian Process 대리 모델</span>
          <span style={{ fontSize: 20, color: '#888' }}>+</span>
          <span style={{ fontSize: 20, color: '#00d4ff' }}>Expected Improvement 획득 함수</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Scene 07: SPC
const Scene07SPC: React.FC = () => {
  const frame = useCurrentFrame();

  const charts = [
    { name: 'X-bar R', desc: '평균/산포 모니터링', type: '계량형' },
    { name: 'P 관리도', desc: '불량률 추이', type: '계수형' },
    { name: 'CUSUM', desc: '누적합 관리', type: '미세 변화' },
    { name: 'EWMA', desc: '지수가중이동평균', type: '추세 감지' },
  ];

  // 시뮬레이션 관리도 데이터
  const chartData = Array.from({ length: 20 }, (_, i) => ({
    x: i,
    y: 50 + Math.sin(i * 0.5) * 5 + (Math.random() - 0.5) * 3,
  }));

  return (
    <AbsoluteFill style={{...containerStyle, padding: 60}}>
      <h2 style={titleStyle}>SPC 통계적 공정 관리</h2>

      <div style={{ display: 'flex', gap: 40, marginTop: 30 }}>
        {/* 왼쪽: 관리도 시각화 */}
        <div style={{
          ...cardStyle,
          flex: 1,
          opacity: interpolate(frame, [0, 30], [0, 1], { extrapolateRight: 'clamp' }),
        }}>
          <h3 style={{ fontSize: 22, color: '#00d4ff', marginBottom: 20, textAlign: 'center' }}>
            X-bar R 관리도
          </h3>

          {/* 관리도 */}
          <div style={{ position: 'relative', height: 200, marginBottom: 20 }}>
            {/* UCL */}
            <div style={{
              position: 'absolute',
              top: 20,
              left: 0,
              right: 0,
              height: 2,
              background: '#ff4444',
              opacity: 0.7,
            }} />
            <span style={{
              position: 'absolute',
              top: 5,
              right: 10,
              fontSize: 14,
              color: '#ff4444',
            }}>UCL (3σ)</span>

            {/* CL */}
            <div style={{
              position: 'absolute',
              top: 100,
              left: 0,
              right: 0,
              height: 2,
              background: '#00d4ff',
            }} />
            <span style={{
              position: 'absolute',
              top: 85,
              right: 10,
              fontSize: 14,
              color: '#00d4ff',
            }}>CL</span>

            {/* LCL */}
            <div style={{
              position: 'absolute',
              top: 180,
              left: 0,
              right: 0,
              height: 2,
              background: '#ff4444',
              opacity: 0.7,
            }} />
            <span style={{
              position: 'absolute',
              top: 165,
              right: 10,
              fontSize: 14,
              color: '#ff4444',
            }}>LCL (3σ)</span>

            {/* 데이터 포인트 */}
            {chartData.map((point, idx) => {
              const pointFrame = idx * 3;
              const opacity = interpolate(frame, [pointFrame, pointFrame + 15], [0, 1], { extrapolateRight: 'clamp' });

              return (
                <div key={idx} style={{
                  position: 'absolute',
                  left: `${5 + idx * 4.5}%`,
                  top: `${20 + (60 - point.y) * 1.6}%`,
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  background: '#00ff88',
                  opacity,
                }} />
              );
            })}
          </div>

          <div style={{ textAlign: 'center', color: '#888', fontSize: 16 }}>
            관리 한계: 3σ | 경고 한계: 2σ
          </div>
        </div>

        {/* 오른쪽: 관리도 종류 */}
        <div style={{
          width: 400,
          opacity: interpolate(frame, [30, 60], [0, 1], { extrapolateRight: 'clamp' }),
        }}>
          {charts.map((chart, idx) => {
            const delay = 30 + idx * 15;
            const opacity = interpolate(frame, [delay, delay + 20], [0, 1], { extrapolateRight: 'clamp' });

            return (
              <div key={idx} style={{
                ...cardStyle,
                marginBottom: 15,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: 20,
                opacity,
              }}>
                <div>
                  <h4 style={{ fontSize: 20, color: '#00d4ff', marginBottom: 5 }}>{chart.name}</h4>
                  <p style={{ fontSize: 16, color: '#aaa' }}>{chart.desc}</p>
                </div>
                <span style={{
                  padding: '6px 12px',
                  background: 'rgba(0, 255, 136, 0.2)',
                  borderRadius: 10,
                  fontSize: 14,
                  color: '#00ff88',
                }}>
                  {chart.type}
                </span>
              </div>
            );
          })}

          {/* Nelson Rules */}
          <div style={{
            ...cardStyle,
            textAlign: 'center',
            marginTop: 20,
            opacity: interpolate(frame, [90, 120], [0, 1], { extrapolateRight: 'clamp' }),
          }}>
            <span style={{ fontSize: 18, color: '#e0e0e0' }}>Nelson Rules </span>
            <span style={{ fontSize: 22, color: '#00d4ff', fontWeight: 700 }}>8가지 패턴</span>
            <span style={{ fontSize: 18, color: '#e0e0e0' }}> 자동 분석</span>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Scene 08: 시스템 아키텍처
const Scene08Architecture: React.FC = () => {
  const frame = useCurrentFrame();

  const layers = [
    {
      name: '데이터 수집',
      items: ['OPC UA', 'Modbus', 'RS232'],
      color: '#ff6b35',
    },
    {
      name: '데이터베이스',
      items: ['InfluxDB (시계열)', 'PostgreSQL (입자)', 'MinIO (이미지)'],
      color: '#00d4ff',
    },
    {
      name: '분석 엔진',
      items: ['AI 모델', 'SPC 엔진', '최적화'],
      color: '#00ff88',
    },
    {
      name: '시각화/연동',
      items: ['Grafana', 'MES', 'ERP'],
      color: '#aa88ff',
    },
  ];

  return (
    <AbsoluteFill style={{...containerStyle, padding: 60}}>
      <h2 style={titleStyle}>시스템 아키텍처</h2>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 25,
        maxWidth: 1100,
        margin: '40px auto 0',
      }}>
        {layers.map((layer, idx) => {
          const delay = idx * 20;
          const opacity = interpolate(frame, [delay, delay + 30], [0, 1], { extrapolateRight: 'clamp' });
          const translateX = interpolate(frame, [delay, delay + 30], [-100, 0], { extrapolateRight: 'clamp' });

          return (
            <div key={idx} style={{
              ...cardStyle,
              display: 'flex',
              alignItems: 'center',
              gap: 30,
              opacity,
              transform: `translateX(${translateX}px)`,
              borderLeftWidth: 4,
              borderLeftColor: layer.color,
            }}>
              <div style={{
                width: 150,
                textAlign: 'center',
              }}>
                <h4 style={{ fontSize: 20, color: layer.color }}>{layer.name}</h4>
              </div>

              <div style={{
                width: 2,
                height: 50,
                background: 'rgba(255,255,255,0.2)',
              }} />

              <div style={{
                display: 'flex',
                gap: 20,
                flex: 1,
              }}>
                {layer.items.map((item, itemIdx) => (
                  <div key={itemIdx} style={{
                    padding: '12px 25px',
                    background: 'rgba(255,255,255,0.05)',
                    borderRadius: 10,
                    fontSize: 18,
                    color: '#e0e0e0',
                  }}>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* 화살표 */}
      {[0, 1, 2].map((idx) => (
        <div key={idx} style={{
          position: 'absolute',
          left: '50%',
          top: `${225 + idx * 100}px`,
          transform: 'translateX(-50%)',
          width: 0,
          height: 0,
          borderLeft: '15px solid transparent',
          borderRight: '15px solid transparent',
          borderTop: '20px solid rgba(0, 212, 255, 0.5)',
          opacity: interpolate(frame, [60 + idx * 20, 80 + idx * 20], [0, 1], { extrapolateRight: 'clamp' }),
        }} />
      ))}
    </AbsoluteFill>
  );
};

// Scene 09: 추적성
const Scene09Traceability: React.FC = () => {
  const frame = useCurrentFrame();

  const traceItems = [
    { icon: '🏭', name: '원료 투입', data: '공급처, LOT번호' },
    { icon: '⚙️', name: '공정 데이터', data: '파라미터, 품질값' },
    { icon: '📊', name: '분석 결과', data: 'D50, Span, 원형도' },
    { icon: '📦', name: '최종 제품', data: '배치ID, 성적서' },
  ];

  const certifications = ['ISO 9001', 'IATF 16949'];

  return (
    <AbsoluteFill style={{...containerStyle, padding: 60}}>
      <h2 style={titleStyle}>품질 추적성 (Traceability)</h2>

      {/* 추적 흐름 */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 50,
      }}>
        {traceItems.map((item, idx) => {
          const delay = idx * 20;
          const opacity = interpolate(frame, [delay, delay + 30], [0, 1], { extrapolateRight: 'clamp' });

          return (
            <React.Fragment key={idx}>
              <div style={{
                ...cardStyle,
                width: 200,
                textAlign: 'center',
                opacity,
              }}>
                <div style={{ fontSize: 48, marginBottom: 15 }}>{item.icon}</div>
                <h4 style={{ fontSize: 20, color: '#00d4ff', marginBottom: 10 }}>{item.name}</h4>
                <p style={{ fontSize: 16, color: '#aaa' }}>{item.data}</p>
              </div>

              {idx < traceItems.length - 1 && (
                <div style={{
                  width: 50,
                  height: 4,
                  background: 'linear-gradient(90deg, #00d4ff, #00ff88)',
                  margin: '0 15px',
                  opacity: interpolate(frame, [delay + 15, delay + 35], [0, 1], { extrapolateRight: 'clamp' }),
                }} />
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* 하단 정보 */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: 60,
        marginTop: 60,
        opacity: interpolate(frame, [90, 120], [0, 1], { extrapolateRight: 'clamp' }),
      }}>
        <div style={{
          ...cardStyle,
          display: 'flex',
          alignItems: 'center',
          gap: 20,
          padding: '20px 40px',
        }}>
          <span style={{ fontSize: 30 }}>🔗</span>
          <div>
            <div style={{ fontSize: 20, color: '#00d4ff' }}>블록체인 기반</div>
            <div style={{ fontSize: 16, color: '#aaa' }}>데이터 무결성 검증</div>
          </div>
        </div>

        <div style={{
          ...cardStyle,
          display: 'flex',
          alignItems: 'center',
          gap: 20,
          padding: '20px 40px',
        }}>
          <span style={{ fontSize: 30 }}>✅</span>
          <div>
            <div style={{ fontSize: 20, color: '#00ff88' }}>인증 호환</div>
            <div style={{ fontSize: 16, color: '#aaa' }}>{certifications.join(' / ')}</div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Scene 10: ROI
const Scene10ROI: React.FC = () => {
  const frame = useCurrentFrame();

  const benefits = [
    { name: '품질 불량률 감소', value: '1.2억원' },
    { name: '공정 최적화', value: '0.8억원' },
    { name: '검사 자동화', value: '0.7억원' },
    { name: '에너지 절감', value: '0.6억원' },
  ];

  return (
    <AbsoluteFill style={{...containerStyle, padding: 60}}>
      <h2 style={titleStyle}>투자 대비 효과 (ROI)</h2>

      <div style={{ display: 'flex', gap: 50, justifyContent: 'center', marginTop: 40 }}>
        {/* 왼쪽: 투자/효과 */}
        <div style={{
          ...cardStyle,
          width: 450,
          opacity: interpolate(frame, [0, 30], [0, 1], { extrapolateRight: 'clamp' }),
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: 30,
            padding: 20,
            background: 'rgba(0, 212, 255, 0.1)',
            borderRadius: 15,
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 18, color: '#888', marginBottom: 5 }}>초기 투자</div>
              <div style={{ fontSize: 32, color: '#ff6b35', fontWeight: 700 }}>2.5억원</div>
            </div>
            <div style={{ fontSize: 40, color: '#00d4ff', alignSelf: 'center' }}>→</div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 18, color: '#888', marginBottom: 5 }}>연간 효과</div>
              <div style={{ fontSize: 32, color: '#00ff88', fontWeight: 700 }}>3.3억원</div>
            </div>
          </div>

          {/* 세부 효과 */}
          {benefits.map((benefit, idx) => {
            const delay = 30 + idx * 15;
            const barWidth = interpolate(frame, [delay, delay + 30], [0, (parseFloat(benefit.value) / 1.2) * 100], { extrapolateRight: 'clamp' });

            return (
              <div key={idx} style={{ marginBottom: 18 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{ fontSize: 18, color: '#e0e0e0' }}>{benefit.name}</span>
                  <span style={{ fontSize: 18, color: '#00ff88' }}>{benefit.value}</span>
                </div>
                <div style={{ height: 8, background: 'rgba(255,255,255,0.1)', borderRadius: 4 }}>
                  <div style={{
                    width: `${barWidth}%`,
                    height: '100%',
                    background: 'linear-gradient(90deg, #00d4ff, #00ff88)',
                    borderRadius: 4,
                  }} />
                </div>
              </div>
            );
          })}
        </div>

        {/* 오른쪽: 핵심 지표 */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 25,
          opacity: interpolate(frame, [30, 60], [0, 1], { extrapolateRight: 'clamp' }),
        }}>
          {[
            { label: '투자 회수 기간', value: '9개월', icon: '⏱️' },
            { label: '5년 ROI', value: '560%', icon: '📈' },
          ].map((item, idx) => (
            <div key={idx} style={{
              ...cardStyle,
              width: 300,
              textAlign: 'center',
              padding: 30,
            }}>
              <div style={{ fontSize: 50, marginBottom: 15 }}>{item.icon}</div>
              <div style={{ fontSize: 18, color: '#888', marginBottom: 10 }}>{item.label}</div>
              <div style={{ fontSize: 48, color: '#00ff88', fontWeight: 700 }}>{item.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 하단 메시지 */}
      <div style={{
        position: 'absolute',
        bottom: 60,
        left: 0,
        right: 0,
        textAlign: 'center',
        opacity: interpolate(frame, [100, 130], [0, 1], { extrapolateRight: 'clamp' }),
      }}>
        <div style={{
          display: 'inline-block',
          padding: '20px 50px',
          background: 'linear-gradient(90deg, #00d4ff20, #00ff8820)',
          borderRadius: 30,
          fontSize: 24,
          color: '#e0e0e0',
        }}>
          AI 기반 품질관리로 <span style={{ color: '#00ff88', fontWeight: 700 }}>경쟁력 있는 블랙매스 생산</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// 메인 컴포지션
export const QualityControlVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: '#0c1929' }}>
      {/* Scene 01: 인트로 */}
      <Sequence from={SCENE_TIMINGS.scene01_intro.start} durationInFrames={SCENE_TIMINGS.scene01_intro.duration}>
        <Scene01Intro />
        <Audio src={staticFile('qualitycontrol/scene01_intro.mp3')} />
      </Sequence>

      {/* Scene 02: 품질관리 항목 */}
      <Sequence from={SCENE_TIMINGS.scene02_quality_items.start} durationInFrames={SCENE_TIMINGS.scene02_quality_items.duration}>
        <Scene02QualityItems />
        <Audio src={staticFile('qualitycontrol/scene02_quality_items.mp3')} />
      </Sequence>

      {/* Scene 03: FRITSCH 장비 */}
      <Sequence from={SCENE_TIMINGS.scene03_fritsch.start} durationInFrames={SCENE_TIMINGS.scene03_fritsch.duration}>
        <Scene03Fritsch />
        <Audio src={staticFile('qualitycontrol/scene03_fritsch.mp3')} />
      </Sequence>

      {/* Scene 04: 인라인 모니터링 */}
      <Sequence from={SCENE_TIMINGS.scene04_inline.start} durationInFrames={SCENE_TIMINGS.scene04_inline.duration}>
        <Scene04Inline />
        <Audio src={staticFile('qualitycontrol/scene04_inline.mp3')} />
      </Sequence>

      {/* Scene 05: AI 예측 */}
      <Sequence from={SCENE_TIMINGS.scene05_ai_prediction.start} durationInFrames={SCENE_TIMINGS.scene05_ai_prediction.duration}>
        <Scene05AIPrediction />
        <Audio src={staticFile('qualitycontrol/scene05_ai_prediction.mp3')} />
      </Sequence>

      {/* Scene 06: Bayesian */}
      <Sequence from={SCENE_TIMINGS.scene06_bayesian.start} durationInFrames={SCENE_TIMINGS.scene06_bayesian.duration}>
        <Scene06Bayesian />
        <Audio src={staticFile('qualitycontrol/scene06_bayesian.mp3')} />
      </Sequence>

      {/* Scene 07: SPC */}
      <Sequence from={SCENE_TIMINGS.scene07_spc.start} durationInFrames={SCENE_TIMINGS.scene07_spc.duration}>
        <Scene07SPC />
        <Audio src={staticFile('qualitycontrol/scene07_spc.mp3')} />
      </Sequence>

      {/* Scene 08: 아키텍처 */}
      <Sequence from={SCENE_TIMINGS.scene08_architecture.start} durationInFrames={SCENE_TIMINGS.scene08_architecture.duration}>
        <Scene08Architecture />
        <Audio src={staticFile('qualitycontrol/scene08_architecture.mp3')} />
      </Sequence>

      {/* Scene 09: 추적성 */}
      <Sequence from={SCENE_TIMINGS.scene09_traceability.start} durationInFrames={SCENE_TIMINGS.scene09_traceability.duration}>
        <Scene09Traceability />
        <Audio src={staticFile('qualitycontrol/scene09_traceability.mp3')} />
      </Sequence>

      {/* Scene 10: ROI */}
      <Sequence from={SCENE_TIMINGS.scene10_roi.start} durationInFrames={SCENE_TIMINGS.scene10_roi.duration}>
        <Scene10ROI />
        <Audio src={staticFile('qualitycontrol/scene10_roi.mp3')} />
      </Sequence>
    </AbsoluteFill>
  );
};
