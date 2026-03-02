/**
 * Lesson 1-5: AND, OR, NOT 게이트
 * 메인 비디오 컴포넌트
 */

import { AbsoluteFill, Sequence, Audio, staticFile } from "remotion";
import { Scene1_Intro } from "./Scene1_Intro";
import { Scene2_LogicGates } from "./Scene2_LogicGates";
import { Scene3_AndGate } from "./Scene3_AndGate";
import { Scene4_AndPerceptron } from "./Scene4_AndPerceptron";
import { Scene5_OrGate } from "./Scene5_OrGate";
import { Scene6_OrPerceptron } from "./Scene6_OrPerceptron";
import { Scene7_NotGate } from "./Scene7_NotGate";
import { Scene8_NotPerceptron } from "./Scene8_NotPerceptron";
import { Scene9_Outro } from "./Scene9_Outro";

// 오디오 분석 결과 기반 타이밍
export const SCENE_TIMINGS = {
  scene1_intro: { duration: 816, start: 0 },
  scene2_logic_gates: { duration: 1173, start: 816 },
  scene3_and_gate: { duration: 1374, start: 1989 },
  scene4_and_perceptron: { duration: 1684, start: 3363 },
  scene5_or_gate: { duration: 1254, start: 5047 },
  scene6_or_perceptron: { duration: 1584, start: 6301 },
  scene7_not_gate: { duration: 919, start: 7885 },
  scene8_not_perceptron: { duration: 1593, start: 8804 },
  scene9_outro: { duration: 1799, start: 10397 },
};

export const LESSON_1_5_DURATION = 12196;

export const Lesson1_5Video: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#111827" }}>
      {/* Scene 1: 인트로 */}
      <Sequence
        from={SCENE_TIMINGS.scene1_intro.start}
        durationInFrames={SCENE_TIMINGS.scene1_intro.duration}
      >
        <Scene1_Intro />
      </Sequence>

      {/* Scene 2: 논리 게이트란? */}
      <Sequence
        from={SCENE_TIMINGS.scene2_logic_gates.start}
        durationInFrames={SCENE_TIMINGS.scene2_logic_gates.duration}
      >
        <Scene2_LogicGates />
      </Sequence>

      {/* Scene 3: AND 게이트 */}
      <Sequence
        from={SCENE_TIMINGS.scene3_and_gate.start}
        durationInFrames={SCENE_TIMINGS.scene3_and_gate.duration}
      >
        <Scene3_AndGate />
      </Sequence>

      {/* Scene 4: 퍼셉트론으로 AND 구현 */}
      <Sequence
        from={SCENE_TIMINGS.scene4_and_perceptron.start}
        durationInFrames={SCENE_TIMINGS.scene4_and_perceptron.duration}
      >
        <Scene4_AndPerceptron />
      </Sequence>

      {/* Scene 5: OR 게이트 */}
      <Sequence
        from={SCENE_TIMINGS.scene5_or_gate.start}
        durationInFrames={SCENE_TIMINGS.scene5_or_gate.duration}
      >
        <Scene5_OrGate />
      </Sequence>

      {/* Scene 6: 퍼셉트론으로 OR 구현 */}
      <Sequence
        from={SCENE_TIMINGS.scene6_or_perceptron.start}
        durationInFrames={SCENE_TIMINGS.scene6_or_perceptron.duration}
      >
        <Scene6_OrPerceptron />
      </Sequence>

      {/* Scene 7: NOT 게이트 */}
      <Sequence
        from={SCENE_TIMINGS.scene7_not_gate.start}
        durationInFrames={SCENE_TIMINGS.scene7_not_gate.duration}
      >
        <Scene7_NotGate />
      </Sequence>

      {/* Scene 8: 퍼셉트론으로 NOT 구현 */}
      <Sequence
        from={SCENE_TIMINGS.scene8_not_perceptron.start}
        durationInFrames={SCENE_TIMINGS.scene8_not_perceptron.duration}
      >
        <Scene8_NotPerceptron />
      </Sequence>

      {/* Scene 9: 아웃트로 */}
      <Sequence
        from={SCENE_TIMINGS.scene9_outro.start}
        durationInFrames={SCENE_TIMINGS.scene9_outro.duration}
      >
        <Scene9_Outro />
      </Sequence>
    </AbsoluteFill>
  );
};
