/**
 * Lesson 1-6: XOR 문제와 한계
 * 메인 비디오 컴포넌트
 */

import { AbsoluteFill, Sequence } from "remotion";
import { Scene1_Intro } from "./Scene1_Intro";
import { Scene2_XorGate } from "./Scene2_XorGate";
import { Scene3_Problem } from "./Scene3_Problem";
import { Scene4_LinearSeparation } from "./Scene4_LinearSeparation";
import { Scene5_XorPlot } from "./Scene5_XorPlot";
import { Scene6_Historical } from "./Scene6_Historical";
import { Scene7_SolutionHint } from "./Scene7_SolutionHint";
import { Scene8_KeyInsight } from "./Scene8_KeyInsight";
import { Scene9_Outro } from "./Scene9_Outro";

// 오디오 분석 결과 기반 타이밍
export const SCENE_TIMINGS = {
  scene1_intro: { duration: 829, start: 0 },
  scene2_xor_gate: { duration: 1416, start: 829 },
  scene3_problem: { duration: 914, start: 2245 },
  scene4_linear_separation: { duration: 1092, start: 3159 },
  scene5_xor_plot: { duration: 1138, start: 4251 },
  scene6_historical: { duration: 1071, start: 5389 },
  scene7_solution_hint: { duration: 1002, start: 6460 },
  scene8_key_insight: { duration: 1025, start: 7462 },
  scene9_outro: { duration: 1300, start: 8487 },
};

export const LESSON_1_6_DURATION = 9787;

export const Lesson1_6Video: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#111827" }}>
      {/* Scene 1: 인트로 */}
      <Sequence
        from={SCENE_TIMINGS.scene1_intro.start}
        durationInFrames={SCENE_TIMINGS.scene1_intro.duration}
      >
        <Scene1_Intro />
      </Sequence>

      {/* Scene 2: XOR 게이트란? */}
      <Sequence
        from={SCENE_TIMINGS.scene2_xor_gate.start}
        durationInFrames={SCENE_TIMINGS.scene2_xor_gate.duration}
      >
        <Scene2_XorGate />
      </Sequence>

      {/* Scene 3: 퍼셉트론으로 XOR 구현 문제 */}
      <Sequence
        from={SCENE_TIMINGS.scene3_problem.start}
        durationInFrames={SCENE_TIMINGS.scene3_problem.duration}
      >
        <Scene3_Problem />
      </Sequence>

      {/* Scene 4: 선형 분리 개념 */}
      <Sequence
        from={SCENE_TIMINGS.scene4_linear_separation.start}
        durationInFrames={SCENE_TIMINGS.scene4_linear_separation.duration}
      >
        <Scene4_LinearSeparation />
      </Sequence>

      {/* Scene 5: XOR 좌표 플롯 */}
      <Sequence
        from={SCENE_TIMINGS.scene5_xor_plot.start}
        durationInFrames={SCENE_TIMINGS.scene5_xor_plot.duration}
      >
        <Scene5_XorPlot />
      </Sequence>

      {/* Scene 6: 역사적 의미 */}
      <Sequence
        from={SCENE_TIMINGS.scene6_historical.start}
        durationInFrames={SCENE_TIMINGS.scene6_historical.duration}
      >
        <Scene6_Historical />
      </Sequence>

      {/* Scene 7: 해결책 힌트 */}
      <Sequence
        from={SCENE_TIMINGS.scene7_solution_hint.start}
        durationInFrames={SCENE_TIMINGS.scene7_solution_hint.duration}
      >
        <Scene7_SolutionHint />
      </Sequence>

      {/* Scene 8: 핵심 통찰 */}
      <Sequence
        from={SCENE_TIMINGS.scene8_key_insight.start}
        durationInFrames={SCENE_TIMINGS.scene8_key_insight.duration}
      >
        <Scene8_KeyInsight />
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
