import { Composition } from "remotion";
import { AIIntroVideo } from "./AIIntroVideo";
import { Thumbnail } from "./Thumbnail";
import { Lesson01Video, LESSON_01_TOTAL_FRAMES, Lesson01Thumbnail } from "./lessons/Lesson01";
import { Lesson02Video, LESSON_02_TOTAL_FRAMES, Lesson02Thumbnail } from "./lessons/Lesson02";
import { Lesson03Video, LESSON_03_TOTAL_FRAMES, Lesson03Thumbnail } from "./lessons/Lesson03";
import { Lesson04Video, LESSON04_DURATION, Lesson04Thumbnail } from "./lessons/Lesson04";
import { Lesson05Video, LESSON05_DURATION, Lesson05Thumbnail } from "./lessons/Lesson05";
import { Lesson06Video, LESSON06_DURATION, Lesson06Thumbnail } from "./lessons/Lesson06";
import { Lesson1_1Video, LESSON_1_1_DURATION, Lesson1_1Thumbnail } from "./lessons/Level1/Lesson1_1";
import { Lesson1_2Video, LESSON_1_2_DURATION, Lesson1_2Thumbnail } from "./lessons/Level1/Lesson1_2";
import { Lesson1_3Video, LESSON_1_3_DURATION, Lesson1_3Thumbnail } from "./lessons/Level1/Lesson1_3";
import { Lesson1_4Video, LESSON_1_4_DURATION, Lesson1_4Thumbnail } from "./lessons/Level1/Lesson1_4";
import { Lesson1_5Video, LESSON_1_5_DURATION, Lesson1_5Thumbnail } from "./lessons/Level1/Lesson1_5";
import { Lesson1_6Video, LESSON_1_6_DURATION, Lesson1_6Thumbnail } from "./lessons/Level1/Lesson1_6";
import { Lesson1_7Video, LESSON_1_7_DURATION, Lesson1_7Thumbnail } from "./lessons/Level1/Lesson1_7";
import { Lesson2_1Video, LESSON_2_1_DURATION, Lesson2_1Thumbnail } from "./lessons/Level2/Lesson2_1";
import { Lesson2_2Video, LESSON_2_2_DURATION, Lesson2_2Thumbnail } from "./lessons/Level2/Lesson2_2";
import { Lesson2_3Video, LESSON_2_3_DURATION, Lesson2_3Thumbnail } from "./lessons/Level2/Lesson2_3";
import { Lesson2_4Video, LESSON_2_4_DURATION, Lesson2_4Thumbnail } from "./lessons/Level2/Lesson2_4";
import { Lesson2_5Video, LESSON_2_5_DURATION, Lesson2_5Thumbnail } from "./lessons/Level2/Lesson2_5";
import { Lesson2_6Video, LESSON_2_6_DURATION, Lesson2_6Thumbnail } from "./lessons/Level2/Lesson2_6";
import { Lesson2_7Video, LESSON_2_7_DURATION, Lesson2_7Thumbnail } from "./lessons/Level2/Lesson2_7";
import { Lesson2_8Video, LESSON_2_8_DURATION, Lesson2_8Thumbnail } from "./lessons/Level2/Lesson2_8";
import { Lesson3_1Video, LESSON_3_1_DURATION, Lesson3_1Thumbnail } from "./lessons/Level3/Lesson3_1";
import { Lesson3_2Video, LESSON_3_2_DURATION, Lesson3_2Thumbnail } from "./lessons/Level3/Lesson3_2";
import { Lesson3_3Video, LESSON_3_3_DURATION, Lesson3_3Thumbnail } from "./lessons/Level3/Lesson3_3";
import { Lesson3_4Video, LESSON_3_4_DURATION, Lesson3_4Thumbnail } from "./lessons/Level3/Lesson3_4";
import { Lesson3_5Video, LESSON_3_5_DURATION, Lesson3_5Thumbnail } from "./lessons/Level3/Lesson3_5";
import { Lesson3_6Video, LESSON_3_6_DURATION, Lesson3_6Thumbnail } from "./lessons/Level3/Lesson3_6";
import { Lesson3_7Video, LESSON_3_7_DURATION, Lesson3_7Thumbnail } from "./lessons/Level3/Lesson3_7";
import { Lesson3_8Video, LESSON_3_8_DURATION, Lesson3_8Thumbnail } from "./lessons/Level3/Lesson3_8";

// 30fps, 12분 5초 = 725초 = 21750 프레임 (나레이션 길이 기반)
const FPS = 30;
const DURATION_SECONDS = 725;

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="AIIntroVideo"
        component={AIIntroVideo}
        durationInFrames={FPS * DURATION_SECONDS}
        fps={FPS}
        width={1920}
        height={1080}
      />
      <Composition
        id="Thumbnail"
        component={Thumbnail}
        durationInFrames={1}
        fps={30}
        width={1280}
        height={720}
      />
      {/* Lesson 0-1: Python 환경 설정 */}
      <Composition
        id="Lesson01"
        component={Lesson01Video}
        durationInFrames={LESSON_01_TOTAL_FRAMES}
        fps={FPS}
        width={1920}
        height={1080}
      />
      <Composition
        id="Lesson01Thumbnail"
        component={Lesson01Thumbnail}
        durationInFrames={1}
        fps={30}
        width={1280}
        height={720}
      />
      {/* Lesson 0-2: 변수와 자료형 */}
      <Composition
        id="Lesson02"
        component={Lesson02Video}
        durationInFrames={LESSON_02_TOTAL_FRAMES}
        fps={FPS}
        width={1920}
        height={1080}
      />
      <Composition
        id="Lesson02Thumbnail"
        component={Lesson02Thumbnail}
        durationInFrames={1}
        fps={30}
        width={1280}
        height={720}
      />
      {/* Lesson 0-3: 조건문과 반복문 */}
      <Composition
        id="Lesson03"
        component={Lesson03Video}
        durationInFrames={LESSON_03_TOTAL_FRAMES}
        fps={FPS}
        width={1920}
        height={1080}
      />
      <Composition
        id="Lesson03Thumbnail"
        component={Lesson03Thumbnail}
        durationInFrames={1}
        fps={30}
        width={1280}
        height={720}
      />
      {/* Lesson 0-4: 함수 */}
      <Composition
        id="Lesson04"
        component={Lesson04Video}
        durationInFrames={LESSON04_DURATION}
        fps={FPS}
        width={1920}
        height={1080}
      />
      <Composition
        id="Lesson04Thumbnail"
        component={Lesson04Thumbnail}
        durationInFrames={1}
        fps={30}
        width={1280}
        height={720}
      />
      {/* Lesson 0-5: NumPy 기초 */}
      <Composition
        id="Lesson05"
        component={Lesson05Video}
        durationInFrames={LESSON05_DURATION}
        fps={FPS}
        width={1920}
        height={1080}
      />
      <Composition
        id="Lesson05Thumbnail"
        component={Lesson05Thumbnail}
        durationInFrames={1}
        fps={30}
        width={1280}
        height={720}
      />
      {/* Lesson 0-6: Matplotlib 기초 - Level 0 마지막! */}
      <Composition
        id="Lesson06"
        component={Lesson06Video}
        durationInFrames={LESSON06_DURATION}
        fps={FPS}
        width={1920}
        height={1080}
      />
      <Composition
        id="Lesson06Thumbnail"
        component={Lesson06Thumbnail}
        durationInFrames={1}
        fps={30}
        width={1280}
        height={720}
      />
      {/* ============ Level 1: AI 기초 이론 ============ */}
      {/* Lesson 1-1: AI란 무엇인가? */}
      <Composition
        id="Lesson1-1"
        component={Lesson1_1Video}
        durationInFrames={LESSON_1_1_DURATION}
        fps={FPS}
        width={1920}
        height={1080}
      />
      <Composition
        id="Lesson1-1Thumbnail"
        component={Lesson1_1Thumbnail}
        durationInFrames={1}
        fps={30}
        width={1280}
        height={720}
      />
      {/* Lesson 1-2: 뉴런에서 퍼셉트론으로 */}
      <Composition
        id="Lesson1-2"
        component={Lesson1_2Video}
        durationInFrames={LESSON_1_2_DURATION}
        fps={FPS}
        width={1920}
        height={1080}
      />
      <Composition
        id="Lesson1-2Thumbnail"
        component={Lesson1_2Thumbnail}
        durationInFrames={1}
        fps={30}
        width={1280}
        height={720}
      />
      {/* Lesson 1-3: 퍼셉트론 구조 */}
      <Composition
        id="Lesson1-3"
        component={Lesson1_3Video}
        durationInFrames={LESSON_1_3_DURATION}
        fps={FPS}
        width={1920}
        height={1080}
      />
      <Composition
        id="Lesson1-3Thumbnail"
        component={Lesson1_3Thumbnail}
        durationInFrames={1}
        fps={30}
        width={1280}
        height={720}
      />
      {/* Lesson 1-4: 퍼셉트론 학습 */}
      <Composition
        id="Lesson1-4"
        component={Lesson1_4Video}
        durationInFrames={LESSON_1_4_DURATION}
        fps={FPS}
        width={1920}
        height={1080}
      />
      <Composition
        id="Lesson1-4Thumbnail"
        component={Lesson1_4Thumbnail}
        durationInFrames={1}
        fps={30}
        width={1280}
        height={720}
      />
      {/* Lesson 1-5: AND, OR, NOT 게이트 */}
      <Composition
        id="Lesson1-5"
        component={Lesson1_5Video}
        durationInFrames={LESSON_1_5_DURATION}
        fps={FPS}
        width={1920}
        height={1080}
      />
      <Composition
        id="Lesson1-5Thumbnail"
        component={Lesson1_5Thumbnail}
        durationInFrames={1}
        fps={30}
        width={1280}
        height={720}
      />
      {/* Lesson 1-6: XOR 문제와 한계 */}
      <Composition
        id="Lesson1-6"
        component={Lesson1_6Video}
        durationInFrames={LESSON_1_6_DURATION}
        fps={FPS}
        width={1920}
        height={1080}
      />
      <Composition
        id="Lesson1-6Thumbnail"
        component={Lesson1_6Thumbnail}
        durationInFrames={1}
        fps={30}
        width={1280}
        height={720}
      />
      {/* Lesson 1-7: 다층 퍼셉트론 */}
      <Composition
        id="Lesson1-7"
        component={Lesson1_7Video}
        durationInFrames={LESSON_1_7_DURATION}
        fps={FPS}
        width={1920}
        height={1080}
      />
      <Composition
        id="Lesson1-7Thumbnail"
        component={Lesson1_7Thumbnail}
        durationInFrames={1}
        fps={30}
        width={1280}
        height={720}
      />
      {/* ============ Level 2: 수학 기초 ============ */}
      {/* Lesson 2-1: 함수와 그래프 */}
      <Composition
        id="Lesson2-1"
        component={Lesson2_1Video}
        durationInFrames={LESSON_2_1_DURATION}
        fps={FPS}
        width={1920}
        height={1080}
      />
      <Composition
        id="Lesson2-1Thumbnail"
        component={Lesson2_1Thumbnail}
        durationInFrames={1}
        fps={30}
        width={1280}
        height={720}
      />
      {/* Lesson 2-2: 미분의 기초 */}
      <Composition
        id="Lesson2-2"
        component={Lesson2_2Video}
        durationInFrames={LESSON_2_2_DURATION}
        fps={FPS}
        width={1920}
        height={1080}
      />
      <Composition
        id="Lesson2-2Thumbnail"
        component={Lesson2_2Thumbnail}
        durationInFrames={1}
        fps={30}
        width={1280}
        height={720}
      />
      {/* Lesson 2-3: 편미분 */}
      <Composition
        id="Lesson2-3"
        component={Lesson2_3Video}
        durationInFrames={LESSON_2_3_DURATION}
        fps={FPS}
        width={1920}
        height={1080}
      />
      <Composition
        id="Lesson2-3Thumbnail"
        component={Lesson2_3Thumbnail}
        durationInFrames={1}
        fps={30}
        width={1280}
        height={720}
      />
      {/* Lesson 2-4: 연쇄법칙 */}
      <Composition
        id="Lesson2-4"
        component={Lesson2_4Video}
        durationInFrames={LESSON_2_4_DURATION}
        fps={FPS}
        width={1920}
        height={1080}
      />
      <Composition
        id="Lesson2-4Thumbnail"
        component={Lesson2_4Thumbnail}
        durationInFrames={1}
        fps={30}
        width={1280}
        height={720}
      />
      {/* Lesson 2-5: 벡터와 행렬 기초 + GPU/HBM */}
      <Composition
        id="Lesson2-5"
        component={Lesson2_5Video}
        durationInFrames={LESSON_2_5_DURATION}
        fps={FPS}
        width={1920}
        height={1080}
      />
      <Composition
        id="Lesson2-5Thumbnail"
        component={Lesson2_5Thumbnail}
        durationInFrames={1}
        fps={30}
        width={1280}
        height={720}
      />
      {/* Lesson 2-6: 확률의 기초 */}
      <Composition
        id="Lesson2-6"
        component={Lesson2_6Video}
        durationInFrames={LESSON_2_6_DURATION}
        fps={FPS}
        width={1920}
        height={1080}
      />
      <Composition
        id="Lesson2-6Thumbnail"
        component={Lesson2_6Thumbnail}
        durationInFrames={1}
        fps={30}
        width={1280}
        height={720}
      />
      {/* Lesson 2-7: 확률분포 */}
      <Composition
        id="Lesson2-7"
        component={Lesson2_7Video}
        durationInFrames={LESSON_2_7_DURATION}
        fps={FPS}
        width={1920}
        height={1080}
      />
      <Composition
        id="Lesson2-7Thumbnail"
        component={Lesson2_7Thumbnail}
        durationInFrames={1}
        fps={30}
        width={1280}
        height={720}
      />
      {/* Lesson 2-8: 통계 기초 - Level 2 마지막! */}
      <Composition
        id="Lesson2-8"
        component={Lesson2_8Video}
        durationInFrames={LESSON_2_8_DURATION}
        fps={FPS}
        width={1920}
        height={1080}
      />
      <Composition
        id="Lesson2-8Thumbnail"
        component={Lesson2_8Thumbnail}
        durationInFrames={1}
        fps={30}
        width={1280}
        height={720}
      />
      {/* ============ Level 3: 딥러닝 핵심 ============ */}
      {/* Lesson 3-1: 손실 함수 */}
      <Composition
        id="Lesson3-1"
        component={Lesson3_1Video}
        durationInFrames={LESSON_3_1_DURATION}
        fps={FPS}
        width={1920}
        height={1080}
      />
      <Composition
        id="Lesson3-1Thumbnail"
        component={Lesson3_1Thumbnail}
        durationInFrames={1}
        fps={30}
        width={1280}
        height={720}
      />
      {/* Lesson 3-2: 경사하강법 기본 */}
      <Composition
        id="Lesson3-2"
        component={Lesson3_2Video}
        durationInFrames={LESSON_3_2_DURATION}
        fps={FPS}
        width={1920}
        height={1080}
      />
      <Composition
        id="Lesson3-2Thumbnail"
        component={Lesson3_2Thumbnail}
        durationInFrames={1}
        fps={30}
        width={1280}
        height={720}
      />
      {/* Lesson 3-3: 경사하강법 변형 */}
      <Composition
        id="Lesson3-3"
        component={Lesson3_3Video}
        durationInFrames={LESSON_3_3_DURATION}
        fps={FPS}
        width={1920}
        height={1080}
      />
      <Composition
        id="Lesson3-3Thumbnail"
        component={Lesson3_3Thumbnail}
        durationInFrames={1}
        fps={30}
        width={1280}
        height={720}
      />
      {/* Lesson 3-4: 순전파 */}
      <Composition
        id="Lesson3-4"
        component={Lesson3_4Video}
        durationInFrames={LESSON_3_4_DURATION}
        fps={FPS}
        width={1920}
        height={1080}
      />
      <Composition
        id="Lesson3-4Thumbnail"
        component={Lesson3_4Thumbnail}
        durationInFrames={1}
        fps={30}
        width={1280}
        height={720}
      />
      {/* Lesson 3-5: 역전파 이론 */}
      <Composition
        id="Lesson3-5"
        component={Lesson3_5Video}
        durationInFrames={LESSON_3_5_DURATION}
        fps={FPS}
        width={1920}
        height={1080}
      />
      <Composition
        id="Lesson3-5Thumbnail"
        component={Lesson3_5Thumbnail}
        durationInFrames={1}
        fps={30}
        width={1280}
        height={720}
      />
      {/* Lesson 3-6: 역전파 구현 */}
      <Composition
        id="Lesson3-6"
        component={Lesson3_6Video}
        durationInFrames={LESSON_3_6_DURATION}
        fps={FPS}
        width={1920}
        height={1080}
      />
      <Composition
        id="Lesson3-6Thumbnail"
        component={Lesson3_6Thumbnail}
        durationInFrames={1}
        fps={30}
        width={1280}
        height={720}
      />
      {/* Lesson 3-7: 활성화 함수 */}
      <Composition
        id="Lesson3-7"
        component={Lesson3_7Video}
        durationInFrames={LESSON_3_7_DURATION}
        fps={FPS}
        width={1920}
        height={1080}
      />
      <Composition
        id="Lesson3-7Thumbnail"
        component={Lesson3_7Thumbnail}
        durationInFrames={1}
        fps={30}
        width={1280}
        height={720}
      />
      {/* Lesson 3-8: 과적합과 정규화 - Level 3 마지막! */}
      <Composition
        id="Lesson3-8"
        component={Lesson3_8Video}
        durationInFrames={LESSON_3_8_DURATION}
        fps={FPS}
        width={1920}
        height={1080}
      />
      <Composition
        id="Lesson3-8Thumbnail"
        component={Lesson3_8Thumbnail}
        durationInFrames={1}
        fps={30}
        width={1280}
        height={720}
      />
    </>
  );
};
