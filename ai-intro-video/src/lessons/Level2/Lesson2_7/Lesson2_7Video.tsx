import { AbsoluteFill, Sequence } from "remotion";
import { Scene1_Intro } from "./Scene1_Intro";
import { Scene2_DiscreteDistribution } from "./Scene2_DiscreteDistribution";
import { Scene3_ContinuousDistribution } from "./Scene3_ContinuousDistribution";
import { Scene4_NormalDistribution } from "./Scene4_NormalDistribution";
import { Scene5_AIApplications } from "./Scene5_AIApplications";
import { Scene6_Outro } from "./Scene6_Outro";

const SCENE_DURATIONS = {
  scene1: 717,
  scene2: 969,
  scene3: 986,
  scene4: 1118,
  scene5: 953,
  scene6: 1163,
};

export const LESSON_2_7_DURATION = 5906;

export const Lesson2_7Video: React.FC = () => {
  let currentFrame = 0;

  return (
    <AbsoluteFill style={{ backgroundColor: "#0f0a1e" }}>
      <Sequence from={currentFrame} durationInFrames={SCENE_DURATIONS.scene1}>
        <Scene1_Intro />
      </Sequence>

      <Sequence from={(currentFrame += SCENE_DURATIONS.scene1)} durationInFrames={SCENE_DURATIONS.scene2}>
        <Scene2_DiscreteDistribution />
      </Sequence>

      <Sequence from={(currentFrame += SCENE_DURATIONS.scene2)} durationInFrames={SCENE_DURATIONS.scene3}>
        <Scene3_ContinuousDistribution />
      </Sequence>

      <Sequence from={(currentFrame += SCENE_DURATIONS.scene3)} durationInFrames={SCENE_DURATIONS.scene4}>
        <Scene4_NormalDistribution />
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
