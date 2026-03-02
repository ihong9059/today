import { AbsoluteFill, Sequence } from "remotion";
import { Scene1_Intro } from "./Scene1_Intro";
import { Scene2_BasicProbability } from "./Scene2_BasicProbability";
import { Scene3_ConditionalProbability } from "./Scene3_ConditionalProbability";
import { Scene4_BayesTheorem } from "./Scene4_BayesTheorem";
import { Scene5_AIApplications } from "./Scene5_AIApplications";
import { Scene6_Outro } from "./Scene6_Outro";

const SCENE_DURATIONS = {
  scene1: 722,
  scene2: 1102,
  scene3: 1115,
  scene4: 1063,
  scene5: 1038,
  scene6: 1079,
};

export const LESSON_2_6_DURATION =
  SCENE_DURATIONS.scene1 +
  SCENE_DURATIONS.scene2 +
  SCENE_DURATIONS.scene3 +
  SCENE_DURATIONS.scene4 +
  SCENE_DURATIONS.scene5 +
  SCENE_DURATIONS.scene6;

export const Lesson2_6Video: React.FC = () => {
  let currentFrame = 0;

  return (
    <AbsoluteFill style={{ backgroundColor: "#0f0a1e" }}>
      <Sequence from={currentFrame} durationInFrames={SCENE_DURATIONS.scene1}>
        <Scene1_Intro />
      </Sequence>

      <Sequence from={(currentFrame += SCENE_DURATIONS.scene1)} durationInFrames={SCENE_DURATIONS.scene2}>
        <Scene2_BasicProbability />
      </Sequence>

      <Sequence from={(currentFrame += SCENE_DURATIONS.scene2)} durationInFrames={SCENE_DURATIONS.scene3}>
        <Scene3_ConditionalProbability />
      </Sequence>

      <Sequence from={(currentFrame += SCENE_DURATIONS.scene3)} durationInFrames={SCENE_DURATIONS.scene4}>
        <Scene4_BayesTheorem />
      </Sequence>

      <Sequence from={(currentFrame += SCENE_DURATIONS.scene4)} durationInFrames={SCENE_DURATIONS.scene5}>
        <Scene5_AIApplications />
      </Sequence>

      <Sequence from={(currentFrame += SCENE_DURATIONS.scene5)} durationInFrames={SCENE_DURATIONS.scene6}>
        <Scene6_Outro />
      </Sequence>
    </AbsoluteFill>
  );
};
