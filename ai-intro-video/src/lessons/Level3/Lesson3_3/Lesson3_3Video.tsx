/**
 * Lesson 3-3: 경사하강법 변형
 * 메인 비디오 컴포넌트
 */

import { AbsoluteFill, Sequence } from "remotion";
import { Scene1_Intro } from "./Scene1_Intro";
import { Scene2_SGD } from "./Scene2_SGD";
import { Scene3_Momentum } from "./Scene3_Momentum";
import { Scene4_RMSprop } from "./Scene4_RMSprop";
import { Scene5_Adam } from "./Scene5_Adam";
import { Scene6_PyTorchCode } from "./Scene6_PyTorchCode";
import { Scene7_Outro } from "./Scene7_Outro";

// 오디오 분석 결과 기반 타이밍
export const SCENE_TIMINGS = {
  scene1: { duration: 920, start: 0 },
  scene2: { duration: 1260, start: 920 },
  scene3: { duration: 1228, start: 2180 },
  scene4: { duration: 1148, start: 3408 },
  scene5: { duration: 1346, start: 4556 },
  scene6: { duration: 1168, start: 5902 },
  scene7: { duration: 997, start: 7070 },
};

export const LESSON_3_3_DURATION = 8067;

export const Lesson3_3Video: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#111827" }}>
      {/* Scene 1: 인트로 */}
      <Sequence
        from={SCENE_TIMINGS.scene1.start}
        durationInFrames={SCENE_TIMINGS.scene1.duration}
      >
        <Scene1_Intro />
      </Sequence>

      {/* Scene 2: SGD */}
      <Sequence
        from={SCENE_TIMINGS.scene2.start}
        durationInFrames={SCENE_TIMINGS.scene2.duration}
      >
        <Scene2_SGD />
      </Sequence>

      {/* Scene 3: Momentum */}
      <Sequence
        from={SCENE_TIMINGS.scene3.start}
        durationInFrames={SCENE_TIMINGS.scene3.duration}
      >
        <Scene3_Momentum />
      </Sequence>

      {/* Scene 4: RMSprop */}
      <Sequence
        from={SCENE_TIMINGS.scene4.start}
        durationInFrames={SCENE_TIMINGS.scene4.duration}
      >
        <Scene4_RMSprop />
      </Sequence>

      {/* Scene 5: Adam */}
      <Sequence
        from={SCENE_TIMINGS.scene5.start}
        durationInFrames={SCENE_TIMINGS.scene5.duration}
      >
        <Scene5_Adam />
      </Sequence>

      {/* Scene 6: PyTorch 코드 */}
      <Sequence
        from={SCENE_TIMINGS.scene6.start}
        durationInFrames={SCENE_TIMINGS.scene6.duration}
      >
        <Scene6_PyTorchCode />
      </Sequence>

      {/* Scene 7: 아웃트로 */}
      <Sequence
        from={SCENE_TIMINGS.scene7.start}
        durationInFrames={SCENE_TIMINGS.scene7.duration}
      >
        <Scene7_Outro />
      </Sequence>
    </AbsoluteFill>
  );
};
