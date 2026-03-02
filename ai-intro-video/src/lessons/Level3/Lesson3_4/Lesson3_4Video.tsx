/**
 * Lesson 3-4: 순전파
 * 메인 비디오 컴포넌트
 */

import { AbsoluteFill, Sequence } from "remotion";
import { Scene1_Intro } from "./Scene1_Intro";
import { Scene2_Overview } from "./Scene2_Overview";
import { Scene3_LinearTransform } from "./Scene3_LinearTransform";
import { Scene4_Activation } from "./Scene4_Activation";
import { Scene5_Example } from "./Scene5_Example";
import { Scene6_PyTorchCode } from "./Scene6_PyTorchCode";
import { Scene7_Outro } from "./Scene7_Outro";

// 오디오 분석 결과 기반 타이밍
export const SCENE_TIMINGS = {
  scene1: { duration: 823, start: 0 },
  scene2: { duration: 1209, start: 823 },
  scene3: { duration: 1206, start: 2032 },
  scene4: { duration: 1180, start: 3238 },
  scene5: { duration: 1326, start: 4418 },
  scene6: { duration: 1147, start: 5744 },
  scene7: { duration: 1073, start: 6891 },
};

export const LESSON_3_4_DURATION = 7964;

export const Lesson3_4Video: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#111827" }}>
      {/* Scene 1: 인트로 */}
      <Sequence
        from={SCENE_TIMINGS.scene1.start}
        durationInFrames={SCENE_TIMINGS.scene1.duration}
      >
        <Scene1_Intro />
      </Sequence>

      {/* Scene 2: 전체 흐름 */}
      <Sequence
        from={SCENE_TIMINGS.scene2.start}
        durationInFrames={SCENE_TIMINGS.scene2.duration}
      >
        <Scene2_Overview />
      </Sequence>

      {/* Scene 3: 선형 변환 */}
      <Sequence
        from={SCENE_TIMINGS.scene3.start}
        durationInFrames={SCENE_TIMINGS.scene3.duration}
      >
        <Scene3_LinearTransform />
      </Sequence>

      {/* Scene 4: 활성화 함수 */}
      <Sequence
        from={SCENE_TIMINGS.scene4.start}
        durationInFrames={SCENE_TIMINGS.scene4.duration}
      >
        <Scene4_Activation />
      </Sequence>

      {/* Scene 5: 계산 예시 */}
      <Sequence
        from={SCENE_TIMINGS.scene5.start}
        durationInFrames={SCENE_TIMINGS.scene5.duration}
      >
        <Scene5_Example />
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
