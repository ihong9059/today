import { AbsoluteFill, Audio, Sequence, staticFile } from "remotion";
import {
  L04_Scene1_Intro,
  L04_Scene2_FunctionBasics,
  L04_Scene3_ReLU,
  L04_Scene4_OtherActivations,
  L04_Scene5_LossFunction,
  L04_Scene6_Callback,
  L04_Scene7_Outro,
} from "./index";

// 오디오 타이밍 데이터 (분석 결과 기반)
// scene1: 54.05초 (1622 frames)
// scene2: 62.45초 (1874 frames)
// scene3: 66.86초 (2006 frames)
// scene4: 62.69초 (1881 frames)
// scene5: 76.10초 (2283 frames)
// scene6: 69.36초 (2081 frames)
// scene7: 72.72초 (2182 frames)
// Total: 464.23초 (13929 frames) = 약 7분 44초

const SCENE_TIMINGS = {
  scene1: { duration: 1622, start: 0 },
  scene2: { duration: 1874, start: 1622 },
  scene3: { duration: 2006, start: 3496 },
  scene4: { duration: 1881, start: 5502 },
  scene5: { duration: 2283, start: 7383 },
  scene6: { duration: 2081, start: 9666 },
  scene7: { duration: 2182, start: 11747 },
};

// 총 프레임 수 계산
export const LESSON04_DURATION =
  SCENE_TIMINGS.scene1.duration +
  SCENE_TIMINGS.scene2.duration +
  SCENE_TIMINGS.scene3.duration +
  SCENE_TIMINGS.scene4.duration +
  SCENE_TIMINGS.scene5.duration +
  SCENE_TIMINGS.scene6.duration +
  SCENE_TIMINGS.scene7.duration;

export const Lesson04Video: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#0f172a" }}>
      {/* Scene 1: Intro */}
      <Sequence from={SCENE_TIMINGS.scene1.start} durationInFrames={SCENE_TIMINGS.scene1.duration}>
        <L04_Scene1_Intro durationInFrames={SCENE_TIMINGS.scene1.duration} />
        <Audio src={staticFile("audio/lesson-0-4/scene1.mp3")} />
      </Sequence>

      {/* Scene 2: Function Basics */}
      <Sequence from={SCENE_TIMINGS.scene2.start} durationInFrames={SCENE_TIMINGS.scene2.duration}>
        <L04_Scene2_FunctionBasics durationInFrames={SCENE_TIMINGS.scene2.duration} />
        <Audio src={staticFile("audio/lesson-0-4/scene2.mp3")} />
      </Sequence>

      {/* Scene 3: ReLU */}
      <Sequence from={SCENE_TIMINGS.scene3.start} durationInFrames={SCENE_TIMINGS.scene3.duration}>
        <L04_Scene3_ReLU durationInFrames={SCENE_TIMINGS.scene3.duration} />
        <Audio src={staticFile("audio/lesson-0-4/scene3.mp3")} />
      </Sequence>

      {/* Scene 4: Other Activations */}
      <Sequence from={SCENE_TIMINGS.scene4.start} durationInFrames={SCENE_TIMINGS.scene4.duration}>
        <L04_Scene4_OtherActivations durationInFrames={SCENE_TIMINGS.scene4.duration} />
        <Audio src={staticFile("audio/lesson-0-4/scene4.mp3")} />
      </Sequence>

      {/* Scene 5: Loss Function */}
      <Sequence from={SCENE_TIMINGS.scene5.start} durationInFrames={SCENE_TIMINGS.scene5.duration}>
        <L04_Scene5_LossFunction durationInFrames={SCENE_TIMINGS.scene5.duration} />
        <Audio src={staticFile("audio/lesson-0-4/scene5.mp3")} />
      </Sequence>

      {/* Scene 6: Callback */}
      <Sequence from={SCENE_TIMINGS.scene6.start} durationInFrames={SCENE_TIMINGS.scene6.duration}>
        <L04_Scene6_Callback durationInFrames={SCENE_TIMINGS.scene6.duration} />
        <Audio src={staticFile("audio/lesson-0-4/scene6.mp3")} />
      </Sequence>

      {/* Scene 7: Outro */}
      <Sequence from={SCENE_TIMINGS.scene7.start} durationInFrames={SCENE_TIMINGS.scene7.duration}>
        <L04_Scene7_Outro durationInFrames={SCENE_TIMINGS.scene7.duration} />
        <Audio src={staticFile("audio/lesson-0-4/scene7.mp3")} />
      </Sequence>
    </AbsoluteFill>
  );
};
