import React from 'react';
import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame, useVideoConfig, Img, interpolate, spring } from 'remotion';

// Scene timings from audio analysis
const SCENE_TIMINGS = {
  scene01_intro: { start: 0, duration: 207 },
  scene02_compare: { start: 207, duration: 332 },
  scene03_structure: { start: 539, duration: 392 },
  scene04_masked: { start: 931, duration: 297 },
  scene05_cross: { start: 1228, duration: 308 },
  scene06_ffn: { start: 1536, duration: 303 },
  scene07_autoregressive: { start: 1839, duration: 307 },
  scene08_gpt: { start: 2146, duration: 400 },
  scene09_bert: { start: 2546, duration: 567 },
  scene10_t5: { start: 3113, duration: 594 },
  scene11_summary: { start: 3707, duration: 667 },
  scene12_outro: { start: 4374, duration: 909 },
};

export const LESSON_7_8_DURATION = 5283;

// Animation helpers
const fadeIn = (frame: number, delay = 0) => interpolate(frame - delay, [0, 20], [0, 1], { extrapolateRight: 'clamp' });
const slideUp = (frame: number, delay = 0) => interpolate(frame - delay, [0, 25], [50, 0], { extrapolateRight: 'clamp' });
const scaleIn = (frame: number, fps: number, delay = 0) => spring({ frame: frame - delay, fps, config: { damping: 12 } });

// GlobalOverlay Component
const GlobalOverlay: React.FC = () => {
  return (
    <>
      <div style={{ position: 'absolute', top: 30, left: 40, zIndex: 9999, display: 'flex', alignItems: 'center', gap: 15 }}>
        <Img src={staticFile('images/logo.png')} style={{ width: 60, height: 60, borderRadius: 8 }} />
        <span style={{ color: 'white', fontSize: 28, fontWeight: 'bold', textShadow: '2px 2px 4px rgba(0,0,0,0.7)' }}>UTTEC-Lab</span>
      </div>
      <div style={{ position: 'absolute', bottom: 30, left: '50%', transform: 'translateX(-50%)', zIndex: 9999, background: 'rgba(139, 92, 246, 0.9)', padding: '10px 30px', borderRadius: 25 }}>
        <span style={{ color: 'white', fontSize: 22, fontWeight: 'bold', letterSpacing: 1 }}>http://uttec-ai.duckdns.org</span>
      </div>
    </>
  );
};

// Scene 01: Intro
const Scene01_Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor: '#0f0f23', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ textAlign: 'center', opacity: fadeIn(frame), transform: `translateY(${slideUp(frame)}px)` }}>
        <div style={{ fontSize: 80, fontWeight: 'bold', color: '#8b5cf6', marginBottom: 30, transform: `scale(${scaleIn(frame, fps)})` }}>
          Lesson 7-8
        </div>
        <div style={{ fontSize: 50, color: 'white', marginBottom: 40 }}>
          디코더 구조
        </div>
        <div style={{ fontSize: 32, color: '#a78bfa', opacity: fadeIn(frame, 30) }}>
          트랜스포머를 완성하는 디코더!
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Scene 02: Encoder vs Decoder Comparison
const Scene02_Compare: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const items = [
    { title: '인코더', desc: '입력을 이해', color: '#3b82f6', icon: '📖' },
    { title: '디코더', desc: '출력을 생성', color: '#8b5cf6', icon: '✍️' },
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: '#0f0f23', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ textAlign: 'center', marginBottom: 50 }}>
        <div style={{ fontSize: 48, color: '#8b5cf6', fontWeight: 'bold', opacity: fadeIn(frame) }}>
          인코더 vs 디코더
        </div>
      </div>
      <div style={{ display: 'flex', gap: 100, justifyContent: 'center' }}>
        {items.map((item, i) => (
          <div key={i} style={{
            opacity: fadeIn(frame, 20 + i * 30),
            transform: `scale(${scaleIn(frame, fps, 20 + i * 30)})`,
            textAlign: 'center',
          }}>
            <div style={{ fontSize: 80, marginBottom: 20 }}>{item.icon}</div>
            <div style={{
              background: `linear-gradient(135deg, ${item.color}, ${item.color}88)`,
              padding: '40px 60px',
              borderRadius: 25,
              boxShadow: `0 10px 40px ${item.color}40`,
            }}>
              <div style={{ fontSize: 42, color: 'white', fontWeight: 'bold', marginBottom: 15 }}>{item.title}</div>
              <div style={{ fontSize: 28, color: 'rgba(255,255,255,0.9)' }}>{item.desc}</div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 50, fontSize: 32, color: '#a78bfa', opacity: fadeIn(frame, 100) }}>
        둘이 함께 일해요!
      </div>
    </AbsoluteFill>
  );
};

// Scene 03: Decoder Structure
const Scene03_Structure: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const layers = [
    { name: 'Masked Self-Attention', color: '#ef4444' },
    { name: 'Cross-Attention', color: '#f59e0b' },
    { name: 'Feed Forward Network', color: '#10b981' },
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: '#0f0f23', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ textAlign: 'center', marginBottom: 50 }}>
        <div style={{ fontSize: 48, color: '#8b5cf6', fontWeight: 'bold', opacity: fadeIn(frame) }}>
          디코더의 세 가지 서브레이어
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 25, alignItems: 'center' }}>
        {layers.map((layer, i) => (
          <div key={i} style={{
            opacity: fadeIn(frame, 30 + i * 40),
            transform: `translateX(${interpolate(frame - (30 + i * 40), [0, 25], [-100, 0], { extrapolateRight: 'clamp' })}px)`,
            background: `linear-gradient(135deg, ${layer.color}, ${layer.color}88)`,
            padding: '25px 80px',
            borderRadius: 20,
            boxShadow: `0 8px 30px ${layer.color}40`,
          }}>
            <div style={{ fontSize: 36, color: 'white', fontWeight: 'bold' }}>
              {i + 1}. {layer.name}
            </div>
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};

// Scene 04: Masked Self-Attention
const Scene04_Masked: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const tokens = ['나는', '밥을', '먹', '???'];
  const visible = [true, true, true, false];

  return (
    <AbsoluteFill style={{ backgroundColor: '#0f0f23', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ textAlign: 'center', marginBottom: 50 }}>
        <div style={{ fontSize: 48, color: '#ef4444', fontWeight: 'bold', opacity: fadeIn(frame) }}>
          Masked Self-Attention
        </div>
        <div style={{ fontSize: 28, color: '#a78bfa', marginTop: 15, opacity: fadeIn(frame, 20) }}>
          미래를 가려서 치팅 방지!
        </div>
      </div>
      <div style={{ display: 'flex', gap: 20, marginBottom: 40 }}>
        {tokens.map((token, i) => (
          <div key={i} style={{
            opacity: fadeIn(frame, 40 + i * 20),
            transform: `scale(${scaleIn(frame, fps, 40 + i * 20)})`,
            background: visible[i] ? '#8b5cf6' : '#374151',
            padding: '30px 40px',
            borderRadius: 15,
            position: 'relative',
          }}>
            <span style={{ fontSize: 36, color: 'white', fontWeight: 'bold' }}>{token}</span>
            {!visible[i] && (
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(0,0,0,0.7)',
                borderRadius: 15,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <span style={{ fontSize: 40 }}>🚫</span>
              </div>
            )}
          </div>
        ))}
      </div>
      <div style={{ fontSize: 30, color: 'white', opacity: fadeIn(frame, 120), textAlign: 'center' }}>
        현재까지만 봐요!
      </div>
    </AbsoluteFill>
  );
};

// Scene 05: Cross-Attention
const Scene05_Cross: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor: '#0f0f23', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ textAlign: 'center', marginBottom: 50 }}>
        <div style={{ fontSize: 48, color: '#f59e0b', fontWeight: 'bold', opacity: fadeIn(frame) }}>
          Cross-Attention
        </div>
      </div>
      <div style={{ display: 'flex', gap: 80, alignItems: 'center' }}>
        <div style={{
          opacity: fadeIn(frame, 20),
          transform: `scale(${scaleIn(frame, fps, 20)})`,
          background: 'linear-gradient(135deg, #3b82f6, #3b82f688)',
          padding: '40px 50px',
          borderRadius: 20,
          textAlign: 'center',
        }}>
          <div style={{ fontSize: 32, color: 'white', fontWeight: 'bold', marginBottom: 10 }}>인코더 출력</div>
          <div style={{ fontSize: 24, color: 'rgba(255,255,255,0.8)' }}>입력 정보</div>
        </div>
        <div style={{ fontSize: 60, color: '#f59e0b', opacity: fadeIn(frame, 60) }}>→</div>
        <div style={{
          opacity: fadeIn(frame, 80),
          transform: `scale(${scaleIn(frame, fps, 80)})`,
          background: 'linear-gradient(135deg, #8b5cf6, #8b5cf688)',
          padding: '40px 50px',
          borderRadius: 20,
          textAlign: 'center',
        }}>
          <div style={{ fontSize: 32, color: 'white', fontWeight: 'bold', marginBottom: 10 }}>디코더</div>
          <div style={{ fontSize: 24, color: 'rgba(255,255,255,0.8)' }}>정보 참조</div>
        </div>
      </div>
      <div style={{ marginTop: 50, fontSize: 30, color: '#a78bfa', opacity: fadeIn(frame, 120) }}>
        번역에 중요해요!
      </div>
    </AbsoluteFill>
  );
};

// Scene 06: FFN
const Scene06_FFN: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor: '#0f0f23', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ textAlign: 'center', marginBottom: 50 }}>
        <div style={{ fontSize: 48, color: '#10b981', fontWeight: 'bold', opacity: fadeIn(frame) }}>
          Feed Forward Network
        </div>
      </div>
      <div style={{ display: 'flex', gap: 40, alignItems: 'center' }}>
        <div style={{
          opacity: fadeIn(frame, 20),
          background: '#8b5cf6',
          padding: '30px 40px',
          borderRadius: 15,
        }}>
          <span style={{ fontSize: 28, color: 'white' }}>512</span>
        </div>
        <div style={{ fontSize: 40, color: '#10b981', opacity: fadeIn(frame, 40) }}>→</div>
        <div style={{
          opacity: fadeIn(frame, 60),
          background: '#10b981',
          padding: '40px 60px',
          borderRadius: 15,
        }}>
          <span style={{ fontSize: 32, color: 'white', fontWeight: 'bold' }}>2048</span>
        </div>
        <div style={{ fontSize: 40, color: '#10b981', opacity: fadeIn(frame, 80) }}>→</div>
        <div style={{
          opacity: fadeIn(frame, 100),
          background: '#8b5cf6',
          padding: '30px 40px',
          borderRadius: 15,
        }}>
          <span style={{ fontSize: 28, color: 'white' }}>512</span>
        </div>
      </div>
      <div style={{ marginTop: 50, fontSize: 30, color: '#a78bfa', opacity: fadeIn(frame, 130) }}>
        확장 → 축소로 표현력 향상!
      </div>
    </AbsoluteFill>
  );
};

// Scene 07: Autoregressive
const Scene07_Autoregressive: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const outputs = ['I', 'eat', 'rice'];

  return (
    <AbsoluteFill style={{ backgroundColor: '#0f0f23', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ textAlign: 'center', marginBottom: 50 }}>
        <div style={{ fontSize: 48, color: '#8b5cf6', fontWeight: 'bold', opacity: fadeIn(frame) }}>
          자기회귀 생성
        </div>
        <div style={{ fontSize: 28, color: '#a78bfa', marginTop: 15, opacity: fadeIn(frame, 20) }}>
          하나씩 순차적으로!
        </div>
      </div>
      <div style={{ display: 'flex', gap: 30, alignItems: 'center' }}>
        {outputs.map((output, i) => (
          <React.Fragment key={i}>
            <div style={{
              opacity: fadeIn(frame, 40 + i * 40),
              transform: `scale(${scaleIn(frame, fps, 40 + i * 40)})`,
              background: '#8b5cf6',
              padding: '30px 50px',
              borderRadius: 15,
            }}>
              <span style={{ fontSize: 36, color: 'white', fontWeight: 'bold' }}>{output}</span>
            </div>
            {i < outputs.length - 1 && (
              <div style={{ fontSize: 40, color: '#a78bfa', opacity: fadeIn(frame, 70 + i * 40) }}>→</div>
            )}
          </React.Fragment>
        ))}
        <div style={{ fontSize: 40, color: '#a78bfa', opacity: fadeIn(frame, 160) }}>→</div>
        <div style={{
          opacity: fadeIn(frame, 180),
          background: '#374151',
          padding: '30px 50px',
          borderRadius: 15,
          border: '3px dashed #8b5cf6',
        }}>
          <span style={{ fontSize: 36, color: '#a78bfa' }}>?</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Scene 08: GPT
const Scene08_GPT: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor: '#0f0f23', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ textAlign: 'center', marginBottom: 40 }}>
        <div style={{ fontSize: 60, color: '#10b981', fontWeight: 'bold', opacity: fadeIn(frame), transform: `scale(${scaleIn(frame, fps)})` }}>
          GPT
        </div>
        <div style={{ fontSize: 28, color: '#a78bfa', marginTop: 10, opacity: fadeIn(frame, 20) }}>
          Generative Pre-trained Transformer
        </div>
      </div>
      <div style={{
        opacity: fadeIn(frame, 40),
        background: 'linear-gradient(135deg, #8b5cf6, #8b5cf688)',
        padding: '50px 100px',
        borderRadius: 25,
        textAlign: 'center',
        marginBottom: 40,
      }}>
        <div style={{ fontSize: 42, color: 'white', fontWeight: 'bold', marginBottom: 15 }}>디코더만!</div>
        <div style={{ fontSize: 26, color: 'rgba(255,255,255,0.8)' }}>인코더 없이 디코더만 사용</div>
      </div>
      <div style={{ display: 'flex', gap: 60, opacity: fadeIn(frame, 80) }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 50, marginBottom: 10 }}>✍️</div>
          <div style={{ fontSize: 24, color: 'white' }}>자기회귀 생성</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 50, marginBottom: 10 }}>💬</div>
          <div style={{ fontSize: 24, color: 'white' }}>텍스트 생성 특화</div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Scene 09: BERT
const Scene09_BERT: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor: '#0f0f23', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ textAlign: 'center', marginBottom: 40 }}>
        <div style={{ fontSize: 60, color: '#3b82f6', fontWeight: 'bold', opacity: fadeIn(frame), transform: `scale(${scaleIn(frame, fps)})` }}>
          BERT
        </div>
        <div style={{ fontSize: 28, color: '#a78bfa', marginTop: 10, opacity: fadeIn(frame, 20) }}>
          Bidirectional Encoder Representations
        </div>
      </div>
      <div style={{
        opacity: fadeIn(frame, 40),
        background: 'linear-gradient(135deg, #3b82f6, #3b82f688)',
        padding: '50px 100px',
        borderRadius: 25,
        textAlign: 'center',
        marginBottom: 40,
      }}>
        <div style={{ fontSize: 42, color: 'white', fontWeight: 'bold', marginBottom: 15 }}>인코더만!</div>
        <div style={{ fontSize: 26, color: 'rgba(255,255,255,0.8)' }}>디코더 없이 인코더만 사용</div>
      </div>
      <div style={{ display: 'flex', gap: 60, opacity: fadeIn(frame, 80) }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 50, marginBottom: 10 }}>↔️</div>
          <div style={{ fontSize: 24, color: 'white' }}>양방향</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 50, marginBottom: 10 }}>📖</div>
          <div style={{ fontSize: 24, color: 'white' }}>문맥 이해</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 50, marginBottom: 10 }}>❓</div>
          <div style={{ fontSize: 24, color: 'white' }}>분류/QA</div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Scene 10: T5
const Scene10_T5: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor: '#0f0f23', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ textAlign: 'center', marginBottom: 40 }}>
        <div style={{ fontSize: 60, color: '#f59e0b', fontWeight: 'bold', opacity: fadeIn(frame), transform: `scale(${scaleIn(frame, fps)})` }}>
          T5
        </div>
        <div style={{ fontSize: 28, color: '#a78bfa', marginTop: 10, opacity: fadeIn(frame, 20) }}>
          Text-to-Text Transfer Transformer
        </div>
      </div>
      <div style={{ display: 'flex', gap: 50, alignItems: 'center', marginBottom: 40 }}>
        <div style={{
          opacity: fadeIn(frame, 40),
          background: 'linear-gradient(135deg, #3b82f6, #3b82f688)',
          padding: '35px 50px',
          borderRadius: 20,
          textAlign: 'center',
        }}>
          <div style={{ fontSize: 32, color: 'white', fontWeight: 'bold' }}>인코더</div>
        </div>
        <div style={{ fontSize: 50, color: '#f59e0b', opacity: fadeIn(frame, 60) }}>+</div>
        <div style={{
          opacity: fadeIn(frame, 80),
          background: 'linear-gradient(135deg, #8b5cf6, #8b5cf688)',
          padding: '35px 50px',
          borderRadius: 20,
          textAlign: 'center',
        }}>
          <div style={{ fontSize: 32, color: 'white', fontWeight: 'bold' }}>디코더</div>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 60, opacity: fadeIn(frame, 120) }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 50, marginBottom: 10 }}>🌐</div>
          <div style={{ fontSize: 24, color: 'white' }}>번역</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 50, marginBottom: 10 }}>📝</div>
          <div style={{ fontSize: 24, color: 'white' }}>요약</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 50, marginBottom: 10 }}>🔄</div>
          <div style={{ fontSize: 24, color: 'white' }}>Seq2Seq</div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Scene 11: Summary
const Scene11_Summary: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const models = [
    { name: 'BERT', type: '인코더만', features: '양방향, 문맥 이해', color: '#3b82f6' },
    { name: 'GPT', type: '디코더만', features: '자기회귀, 텍스트 생성', color: '#10b981' },
    { name: 'T5', type: '인코더+디코더', features: '번역, 요약', color: '#f59e0b' },
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: '#0f0f23', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ textAlign: 'center', marginBottom: 50 }}>
        <div style={{ fontSize: 48, color: '#8b5cf6', fontWeight: 'bold', opacity: fadeIn(frame) }}>
          구조별 특징 정리
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 25 }}>
        {models.map((model, i) => (
          <div key={i} style={{
            opacity: fadeIn(frame, 30 + i * 50),
            transform: `translateX(${interpolate(frame - (30 + i * 50), [0, 25], [-100, 0], { extrapolateRight: 'clamp' })}px)`,
            display: 'flex',
            alignItems: 'center',
            gap: 25,
            background: `linear-gradient(135deg, ${model.color}40, ${model.color}20)`,
            padding: '20px 40px',
            borderRadius: 15,
            borderLeft: `5px solid ${model.color}`,
          }}>
            <div style={{ fontSize: 36, color: model.color, fontWeight: 'bold', width: 100 }}>{model.name}</div>
            <div style={{ fontSize: 26, color: 'white', width: 180 }}>{model.type}</div>
            <div style={{ fontSize: 24, color: '#a78bfa' }}>{model.features}</div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 50, fontSize: 28, color: '#a78bfa', opacity: fadeIn(frame, 200) }}>
        용도에 맞게 선택해요!
      </div>
    </AbsoluteFill>
  );
};

// Scene 12: Outro
const Scene12_Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const items = [
    'Masked Attention',
    'Cross-Attention',
    'FFN',
    'GPT: 디코더만',
    'BERT: 인코더만',
    'T5: 둘 다',
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: '#0f0f23', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ textAlign: 'center', marginBottom: 40 }}>
        <div style={{ fontSize: 52, color: '#8b5cf6', fontWeight: 'bold', opacity: fadeIn(frame), transform: `scale(${scaleIn(frame, fps)})` }}>
          Level 7 완료!
        </div>
        <div style={{ fontSize: 30, color: '#a78bfa', marginTop: 15, opacity: fadeIn(frame, 20) }}>
          트랜스포머 마스터!
        </div>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 15, justifyContent: 'center', maxWidth: 800, marginBottom: 40 }}>
        {items.map((item, i) => (
          <div key={i} style={{
            opacity: fadeIn(frame, 40 + i * 15),
            background: '#8b5cf6',
            padding: '15px 30px',
            borderRadius: 25,
          }}>
            <span style={{ fontSize: 24, color: 'white' }}>{item}</span>
          </div>
        ))}
      </div>
      <div style={{ fontSize: 36, color: 'white', marginTop: 30, opacity: fadeIn(frame, 150) }}>
        다음 레벨에서 더 배워요!
      </div>
      <div style={{ fontSize: 50, marginTop: 30, opacity: fadeIn(frame, 200) }}>
        🎉
      </div>
    </AbsoluteFill>
  );
};

// Main Component
export const Lesson7_8Video: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: '#0f0f23' }}>
      {/* Audio tracks */}
      {Object.entries(SCENE_TIMINGS).map(([key, timing]) => (
        <Sequence key={key} from={timing.start} durationInFrames={timing.duration}>
          <Audio src={staticFile(`audio/lesson-7-8/${key}.mp3`)} />
        </Sequence>
      ))}

      {/* Visual scenes */}
      <Sequence from={SCENE_TIMINGS.scene01_intro.start} durationInFrames={SCENE_TIMINGS.scene01_intro.duration}>
        <Scene01_Intro />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.scene02_compare.start} durationInFrames={SCENE_TIMINGS.scene02_compare.duration}>
        <Scene02_Compare />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.scene03_structure.start} durationInFrames={SCENE_TIMINGS.scene03_structure.duration}>
        <Scene03_Structure />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.scene04_masked.start} durationInFrames={SCENE_TIMINGS.scene04_masked.duration}>
        <Scene04_Masked />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.scene05_cross.start} durationInFrames={SCENE_TIMINGS.scene05_cross.duration}>
        <Scene05_Cross />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.scene06_ffn.start} durationInFrames={SCENE_TIMINGS.scene06_ffn.duration}>
        <Scene06_FFN />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.scene07_autoregressive.start} durationInFrames={SCENE_TIMINGS.scene07_autoregressive.duration}>
        <Scene07_Autoregressive />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.scene08_gpt.start} durationInFrames={SCENE_TIMINGS.scene08_gpt.duration}>
        <Scene08_GPT />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.scene09_bert.start} durationInFrames={SCENE_TIMINGS.scene09_bert.duration}>
        <Scene09_BERT />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.scene10_t5.start} durationInFrames={SCENE_TIMINGS.scene10_t5.duration}>
        <Scene10_T5 />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.scene11_summary.start} durationInFrames={SCENE_TIMINGS.scene11_summary.duration}>
        <Scene11_Summary />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.scene12_outro.start} durationInFrames={SCENE_TIMINGS.scene12_outro.duration}>
        <Scene12_Outro />
      </Sequence>

      {/* Global Overlay */}
      <GlobalOverlay />
    </AbsoluteFill>
  );
};
