/**
 * Lesson 0-5: NumPy 기초 - 메인 비디오 컴포넌트
 * 총 13114 프레임 (약 7.3분)
 */

import { AbsoluteFill, Audio, Sequence, staticFile } from "remotion";
import {
  L05_Scene1_Intro,
  L05_Scene2_Tensor,
  L05_Scene3_ArrayCreation,
  L05_Scene4_Shape,
  L05_Scene5_Broadcasting,
  L05_Scene6_AIUsage,
  L05_Scene7_Outro,
} from "./index";

// 오디오 분석 결과 (analyze-lesson-0-5-audio.py)
// Scene 1: 52.01s = 1560 frames
// Scene 2: 60.05s = 1801 frames
// Scene 3: 67.30s = 2018 frames
// Scene 4: 70.34s = 2110 frames
// Scene 5: 56.83s = 1704 frames
// Scene 6: 70.54s = 2116 frames
// Scene 7: 60.17s = 1805 frames
// Total: 437.23s = 13114 frames

const SCENE_TIMINGS = {
  scene1: { duration: 1560, start: 0 },
  scene2: { duration: 1801, start: 1560 },
  scene3: { duration: 2018, start: 3361 },
  scene4: { duration: 2110, start: 5379 },
  scene5: { duration: 1704, start: 7489 },
  scene6: { duration: 2116, start: 9193 },
  scene7: { duration: 1805, start: 11309 },
};

// 총 프레임 수
export const LESSON05_DURATION =
  SCENE_TIMINGS.scene1.duration +
  SCENE_TIMINGS.scene2.duration +
  SCENE_TIMINGS.scene3.duration +
  SCENE_TIMINGS.scene4.duration +
  SCENE_TIMINGS.scene5.duration +
  SCENE_TIMINGS.scene6.duration +
  SCENE_TIMINGS.scene7.duration;

export const Lesson05Video: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#0f172a" }}>
      {/* Scene 1: Intro - NumPy 소개 */}
      <Sequence from={SCENE_TIMINGS.scene1.start} durationInFrames={SCENE_TIMINGS.scene1.duration}>
        <L05_Scene1_Intro durationInFrames={SCENE_TIMINGS.scene1.duration} />
        <Audio src={staticFile("audio/lesson-0-5/scene1.mp3")} />
      </Sequence>

      {/* Scene 2: 텐서란 무엇인가 */}
      <Sequence from={SCENE_TIMINGS.scene2.start} durationInFrames={SCENE_TIMINGS.scene2.duration}>
        <L05_Scene2_Tensor durationInFrames={SCENE_TIMINGS.scene2.duration} />
        <Audio src={staticFile("audio/lesson-0-5/scene2.mp3")} />
      </Sequence>

      {/* Scene 3: 배열 생성 */}
      <Sequence from={SCENE_TIMINGS.scene3.start} durationInFrames={SCENE_TIMINGS.scene3.duration}>
        <L05_Scene3_ArrayCreation durationInFrames={SCENE_TIMINGS.scene3.duration} />
        <Audio src={staticFile("audio/lesson-0-5/scene3.mp3")} />
      </Sequence>

      {/* Scene 4: Shape과 Reshape */}
      <Sequence from={SCENE_TIMINGS.scene4.start} durationInFrames={SCENE_TIMINGS.scene4.duration}>
        <L05_Scene4_Shape durationInFrames={SCENE_TIMINGS.scene4.duration} />
        <Audio src={staticFile("audio/lesson-0-5/scene4.mp3")} />
      </Sequence>

      {/* Scene 5: 브로드캐스팅 */}
      <Sequence from={SCENE_TIMINGS.scene5.start} durationInFrames={SCENE_TIMINGS.scene5.duration}>
        <L05_Scene5_Broadcasting durationInFrames={SCENE_TIMINGS.scene5.duration} />
        <Audio src={staticFile("audio/lesson-0-5/scene5.mp3")} />
      </Sequence>

      {/* Scene 6: AI에서의 실제 사용 */}
      <Sequence from={SCENE_TIMINGS.scene6.start} durationInFrames={SCENE_TIMINGS.scene6.duration}>
        <L05_Scene6_AIUsage durationInFrames={SCENE_TIMINGS.scene6.duration} />
        <Audio src={staticFile("audio/lesson-0-5/scene6.mp3")} />
      </Sequence>

      {/* Scene 7: Outro */}
      <Sequence from={SCENE_TIMINGS.scene7.start} durationInFrames={SCENE_TIMINGS.scene7.duration}>
        <L05_Scene7_Outro durationInFrames={SCENE_TIMINGS.scene7.duration} />
        <Audio src={staticFile("audio/lesson-0-5/scene7.mp3")} />
      </Sequence>
    </AbsoluteFill>
  );
};
