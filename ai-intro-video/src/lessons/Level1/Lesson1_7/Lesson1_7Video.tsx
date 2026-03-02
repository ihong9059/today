/**
 * Lesson 1-7: 다층 퍼셉트론
 * 메인 비디오 컴포넌트
 */

import { AbsoluteFill, Sequence } from "remotion";
import { Scene1_Intro } from "./Scene1_Intro";
import { Scene2_Review } from "./Scene2_Review";
import { Scene3_Idea } from "./Scene3_Idea";
import { Scene4_Structure } from "./Scene4_Structure";
import { Scene5_XorSolution } from "./Scene5_XorSolution";
import { Scene6_Calculation } from "./Scene6_Calculation";
import { Scene7_WhyWorks } from "./Scene7_WhyWorks";
import { Scene8_DeepLearning } from "./Scene8_DeepLearning";
import { Scene9_KeyInsights } from "./Scene9_KeyInsights";
import { Scene10_Outro } from "./Scene10_Outro";

// 오디오 분석 결과 기반 타이밍
export const SCENE_TIMINGS = {
  scene1_intro: { duration: 619, start: 0 },
  scene2_review: { duration: 653, start: 619 },
  scene3_idea: { duration: 573, start: 1272 },
  scene4_structure: { duration: 824, start: 1845 },
  scene5_xor_solution: { duration: 918, start: 2669 },
  scene6_calculation: { duration: 1037, start: 3587 },
  scene7_why_works: { duration: 648, start: 4624 },
  scene8_deep_learning: { duration: 896, start: 5272 },
  scene9_key_insights: { duration: 841, start: 6168 },
  scene10_outro: { duration: 680, start: 7009 },
};

export const LESSON_1_7_DURATION = 7689;

export const Lesson1_7Video: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#111827" }}>
      {/* Scene 1: 인트로 */}
      <Sequence
        from={SCENE_TIMINGS.scene1_intro.start}
        durationInFrames={SCENE_TIMINGS.scene1_intro.duration}
      >
        <Scene1_Intro />
      </Sequence>

      {/* Scene 2: XOR 복습 */}
      <Sequence
        from={SCENE_TIMINGS.scene2_review.start}
        durationInFrames={SCENE_TIMINGS.scene2_review.duration}
      >
        <Scene2_Review />
      </Sequence>

      {/* Scene 3: 다층 퍼셉트론 아이디어 */}
      <Sequence
        from={SCENE_TIMINGS.scene3_idea.start}
        durationInFrames={SCENE_TIMINGS.scene3_idea.duration}
      >
        <Scene3_Idea />
      </Sequence>

      {/* Scene 4: 구조 설명 */}
      <Sequence
        from={SCENE_TIMINGS.scene4_structure.start}
        durationInFrames={SCENE_TIMINGS.scene4_structure.duration}
      >
        <Scene4_Structure />
      </Sequence>

      {/* Scene 5: XOR 해결 */}
      <Sequence
        from={SCENE_TIMINGS.scene5_xor_solution.start}
        durationInFrames={SCENE_TIMINGS.scene5_xor_solution.duration}
      >
        <Scene5_XorSolution />
      </Sequence>

      {/* Scene 6: 계산 예제 */}
      <Sequence
        from={SCENE_TIMINGS.scene6_calculation.start}
        durationInFrames={SCENE_TIMINGS.scene6_calculation.duration}
      >
        <Scene6_Calculation />
      </Sequence>

      {/* Scene 7: 왜 작동하는가 */}
      <Sequence
        from={SCENE_TIMINGS.scene7_why_works.start}
        durationInFrames={SCENE_TIMINGS.scene7_why_works.duration}
      >
        <Scene7_WhyWorks />
      </Sequence>

      {/* Scene 8: 딥러닝 연결 */}
      <Sequence
        from={SCENE_TIMINGS.scene8_deep_learning.start}
        durationInFrames={SCENE_TIMINGS.scene8_deep_learning.duration}
      >
        <Scene8_DeepLearning />
      </Sequence>

      {/* Scene 9: 핵심 포인트 */}
      <Sequence
        from={SCENE_TIMINGS.scene9_key_insights.start}
        durationInFrames={SCENE_TIMINGS.scene9_key_insights.duration}
      >
        <Scene9_KeyInsights />
      </Sequence>

      {/* Scene 10: 아웃트로 */}
      <Sequence
        from={SCENE_TIMINGS.scene10_outro.start}
        durationInFrames={SCENE_TIMINGS.scene10_outro.duration}
      >
        <Scene10_Outro />
      </Sequence>
    </AbsoluteFill>
  );
};
