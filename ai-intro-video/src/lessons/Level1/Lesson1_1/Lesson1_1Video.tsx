/**
 * Lesson 1-1: AI란 무엇인가?
 * 메인 비디오 컴포넌트
 */

import { AbsoluteFill, Sequence } from "remotion";
import { Scene1_Intro } from "./Scene1_Intro";
import { Scene2_DailyAI } from "./Scene2_DailyAI";
import { Scene3_Definition } from "./Scene3_Definition";
import { Scene4_VsProgram } from "./Scene4_VsProgram";
import { Scene5_History } from "./Scene5_History";
import { Scene6_WhyNow } from "./Scene6_WhyNow";
import { Scene7_Approaches } from "./Scene7_Approaches";
import { Scene8_CurrentLevel } from "./Scene8_CurrentLevel";
import { Scene9_Summary } from "./Scene9_Summary";
import { Scene10_Outro } from "./Scene10_Outro";

// 오디오 분석 결과 기반 타이밍
export const SCENE_TIMINGS = {
  scene1_intro: { duration: 711, start: 0 },
  scene2_daily_ai: { duration: 960, start: 711 },
  scene3_definition: { duration: 1001, start: 1671 },
  scene4_vs_program: { duration: 1034, start: 2672 },
  scene5_history: { duration: 1681, start: 3706 },
  scene6_why_now: { duration: 1243, start: 5387 },
  scene7_approaches: { duration: 1547, start: 6630 },
  scene8_current_level: { duration: 1557, start: 8177 },
  scene9_summary: { duration: 854, start: 9734 },
  scene10_outro: { duration: 837, start: 10588 },
};

export const LESSON_1_1_DURATION = 11425;

export const Lesson1_1Video: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#111827" }}>
      <Sequence from={SCENE_TIMINGS.scene1_intro.start} durationInFrames={SCENE_TIMINGS.scene1_intro.duration}>
        <Scene1_Intro />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene2_daily_ai.start} durationInFrames={SCENE_TIMINGS.scene2_daily_ai.duration}>
        <Scene2_DailyAI />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene3_definition.start} durationInFrames={SCENE_TIMINGS.scene3_definition.duration}>
        <Scene3_Definition />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene4_vs_program.start} durationInFrames={SCENE_TIMINGS.scene4_vs_program.duration}>
        <Scene4_VsProgram />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene5_history.start} durationInFrames={SCENE_TIMINGS.scene5_history.duration}>
        <Scene5_History />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene6_why_now.start} durationInFrames={SCENE_TIMINGS.scene6_why_now.duration}>
        <Scene6_WhyNow />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene7_approaches.start} durationInFrames={SCENE_TIMINGS.scene7_approaches.duration}>
        <Scene7_Approaches />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene8_current_level.start} durationInFrames={SCENE_TIMINGS.scene8_current_level.duration}>
        <Scene8_CurrentLevel />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene9_summary.start} durationInFrames={SCENE_TIMINGS.scene9_summary.duration}>
        <Scene9_Summary />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene10_outro.start} durationInFrames={SCENE_TIMINGS.scene10_outro.duration}>
        <Scene10_Outro />
      </Sequence>
    </AbsoluteFill>
  );
};
