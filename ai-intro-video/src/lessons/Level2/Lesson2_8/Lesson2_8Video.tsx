import { AbsoluteFill, Sequence } from "remotion";
import { Scene1_Intro } from "./Scene1_Intro";
import { Scene2_CentralTendency } from "./Scene2_CentralTendency";
import { Scene3_Dispersion } from "./Scene3_Dispersion";
import { Scene4_Correlation } from "./Scene4_Correlation";
import { Scene5_Normalization } from "./Scene5_Normalization";
import { Scene6_AIApplication } from "./Scene6_AIApplication";
import { Scene7_Outro } from "./Scene7_Outro";

const SCENE_DURATIONS = {
  scene1: 1101,
  scene2: 2161,
  scene3: 2194,
  scene4: 2058,
  scene5: 2631,
  scene6: 1196,
  scene7: 1703,
};

export const LESSON_2_8_DURATION = 13044;

export const Lesson2_8Video: React.FC = () => {
  let currentFrame = 0;

  return (
    <AbsoluteFill style={{ backgroundColor: "#0f0a1e" }}>
      <Sequence from={currentFrame} durationInFrames={SCENE_DURATIONS.scene1}>
        <Scene1_Intro />
      </Sequence>

      <Sequence from={(currentFrame += SCENE_DURATIONS.scene1)} durationInFrames={SCENE_DURATIONS.scene2}>
        <Scene2_CentralTendency />
      </Sequence>

      <Sequence from={(currentFrame += SCENE_DURATIONS.scene2)} durationInFrames={SCENE_DURATIONS.scene3}>
        <Scene3_Dispersion />
      </Sequence>

      <Sequence from={(currentFrame += SCENE_DURATIONS.scene3)} durationInFrames={SCENE_DURATIONS.scene4}>
        <Scene4_Correlation />
      </Sequence>

      <Sequence from={(currentFrame += SCENE_DURATIONS.scene4)} durationInFrames={SCENE_DURATIONS.scene5}>
        <Scene5_Normalization />
      </Sequence>

      <Sequence from={(currentFrame += SCENE_DURATIONS.scene5)} durationInFrames={SCENE_DURATIONS.scene6}>
        <Scene6_AIApplication />
      </Sequence>

      <Sequence from={(currentFrame += SCENE_DURATIONS.scene6)} durationInFrames={SCENE_DURATIONS.scene7}>
        <Scene7_Outro />
      </Sequence>
    </AbsoluteFill>
  );
};
