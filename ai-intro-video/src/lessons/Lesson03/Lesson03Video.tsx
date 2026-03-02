import { AbsoluteFill, Audio, Sequence, staticFile } from "remotion";
import {
  L03_Scene1_Intro,
  L03_Scene2_ForLoop,
  L03_Scene3_EarlyStopping,
  L03_Scene4_LRSchedule,
  L03_Scene5_WhileLoop,
  L03_Scene6_PyTorchCode,
  L03_Scene7_Outro,
} from "./index";

// 오디오 타이밍 데이터 (분석 결과 기반)
// scene1: 33.14초 (1024 frames)
// scene2: 70.97초 (2159 frames)
// scene3: 61.87초 (1886 frames)
// scene4: 41.64초 (1279 frames)
// scene5: 50.06초 (1531 frames)
// scene6: 67.61초 (2058 frames)
// scene7: 58.46초 (1783 frames)
// Total: 383.76초 (11720 frames) = 약 6분 24초

const SCENE_TIMINGS = {
  scene1: { duration: 1024, start: 0 },
  scene2: { duration: 2159, start: 1024 },
  scene3: { duration: 1886, start: 3183 },
  scene4: { duration: 1279, start: 5069 },
  scene5: { duration: 1531, start: 6348 },
  scene6: { duration: 2058, start: 7879 },
  scene7: { duration: 1783, start: 9937 },
};

// 총 프레임 수 계산
export const LESSON_03_TOTAL_FRAMES =
  SCENE_TIMINGS.scene1.duration +
  SCENE_TIMINGS.scene2.duration +
  SCENE_TIMINGS.scene3.duration +
  SCENE_TIMINGS.scene4.duration +
  SCENE_TIMINGS.scene5.duration +
  SCENE_TIMINGS.scene6.duration +
  SCENE_TIMINGS.scene7.duration;

export const Lesson03Video: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#0f172a" }}>
      {/* Scene 1: Intro */}
      <Sequence from={SCENE_TIMINGS.scene1.start} durationInFrames={SCENE_TIMINGS.scene1.duration}>
        <L03_Scene1_Intro durationInFrames={SCENE_TIMINGS.scene1.duration} />
        <Audio src={staticFile("audio/lesson-0-3/scene1.mp3")} />
      </Sequence>

      {/* Scene 2: For Loop - Epoch/Batch */}
      <Sequence from={SCENE_TIMINGS.scene2.start} durationInFrames={SCENE_TIMINGS.scene2.duration}>
        <L03_Scene2_ForLoop durationInFrames={SCENE_TIMINGS.scene2.duration} />
        <Audio src={staticFile("audio/lesson-0-3/scene2.mp3")} />
      </Sequence>

      {/* Scene 3: Early Stopping */}
      <Sequence from={SCENE_TIMINGS.scene3.start} durationInFrames={SCENE_TIMINGS.scene3.duration}>
        <L03_Scene3_EarlyStopping durationInFrames={SCENE_TIMINGS.scene3.duration} />
        <Audio src={staticFile("audio/lesson-0-3/scene3.mp3")} />
      </Sequence>

      {/* Scene 4: Learning Rate Schedule */}
      <Sequence from={SCENE_TIMINGS.scene4.start} durationInFrames={SCENE_TIMINGS.scene4.duration}>
        <L03_Scene4_LRSchedule durationInFrames={SCENE_TIMINGS.scene4.duration} />
        <Audio src={staticFile("audio/lesson-0-3/scene4.mp3")} />
      </Sequence>

      {/* Scene 5: While Loop */}
      <Sequence from={SCENE_TIMINGS.scene5.start} durationInFrames={SCENE_TIMINGS.scene5.duration}>
        <L03_Scene5_WhileLoop durationInFrames={SCENE_TIMINGS.scene5.duration} />
        <Audio src={staticFile("audio/lesson-0-3/scene5.mp3")} />
      </Sequence>

      {/* Scene 6: PyTorch Code */}
      <Sequence from={SCENE_TIMINGS.scene6.start} durationInFrames={SCENE_TIMINGS.scene6.duration}>
        <L03_Scene6_PyTorchCode durationInFrames={SCENE_TIMINGS.scene6.duration} />
        <Audio src={staticFile("audio/lesson-0-3/scene6.mp3")} />
      </Sequence>

      {/* Scene 7: Outro */}
      <Sequence from={SCENE_TIMINGS.scene7.start} durationInFrames={SCENE_TIMINGS.scene7.duration}>
        <L03_Scene7_Outro durationInFrames={SCENE_TIMINGS.scene7.duration} />
        <Audio src={staticFile("audio/lesson-0-3/scene7.mp3")} />
      </Sequence>
    </AbsoluteFill>
  );
};
