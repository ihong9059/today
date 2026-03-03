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
import { Lesson4_1Video, LESSON_4_1_DURATION, Lesson4_1Thumbnail } from "./lessons/Level4/Lesson4_1";
import { Lesson4_2Video, LESSON_4_2_DURATION, Lesson4_2Thumbnail } from "./lessons/Level4/Lesson4_2";
import { Lesson4_3Video, LESSON_4_3_DURATION, Lesson4_3Thumbnail } from "./lessons/Level4/Lesson4_3";
import { Lesson4_4Video, LESSON_4_4_DURATION, Lesson4_4Thumbnail } from "./lessons/Level4/Lesson4_4";
import { Lesson4_5Video, LESSON_4_5_DURATION, Lesson4_5Thumbnail } from "./lessons/Level4/Lesson4_5";
import { Lesson4_6Video, LESSON_4_6_DURATION, Lesson4_6Thumbnail } from "./lessons/Level4/Lesson4_6";
import { Lesson4_7Video, LESSON_4_7_DURATION, Lesson4_7Thumbnail } from "./lessons/Level4/Lesson4_7";
import { Lesson51Video, LESSON51_DURATION, Lesson51Thumbnail } from "./lessons/Level5/Lesson51";
import { Lesson52Video, LESSON52_DURATION, Lesson52Thumbnail } from "./lessons/Level5/Lesson52";
import { Lesson53Video, LESSON53_DURATION, Lesson53Thumbnail } from "./lessons/Level5/Lesson53";
import { Lesson54Video, LESSON54_DURATION, Lesson54Thumbnail } from "./lessons/Level5/Lesson54";
import { Lesson55Video, LESSON55_DURATION, Lesson55Thumbnail } from "./lessons/Level5/Lesson55";
import { Lesson56Video, LESSON56_DURATION, Lesson56Thumbnail } from "./lessons/Level5/Lesson56";
import { Lesson57Video, LESSON57_DURATION, Lesson57Thumbnail } from "./lessons/Level5/Lesson57";
import { Lesson58Video, LESSON58_DURATION, Lesson58Thumbnail } from "./lessons/Level5/Lesson58";
import { Lesson61Video, LESSON61_DURATION, Lesson61Thumbnail } from "./lessons/Level6/Lesson61";
import { Lesson62Video, LESSON62_DURATION, Lesson62Thumbnail } from "./lessons/Level6/Lesson62";
import { Lesson63Video, LESSON63_DURATION, Lesson63Thumbnail } from "./lessons/Level6/Lesson63";
import { Lesson64Video, LESSON64_DURATION, Lesson64Thumbnail } from "./lessons/Level6/Lesson64";
import { Lesson65Video, LESSON65_DURATION, Lesson65Thumbnail } from "./lessons/Level6/Lesson65";
import { Lesson66Video, LESSON66_DURATION, Lesson66Thumbnail } from "./lessons/Level6/Lesson66";
import { Lesson71Video, LESSON71_DURATION, Lesson71Thumbnail } from "./lessons/Level7/Lesson71";
import { Lesson72Video, LESSON72_DURATION, Lesson72Thumbnail } from "./lessons/Level7/Lesson72";
import { Lesson73Video, LESSON73_DURATION, Lesson73Thumbnail } from "./lessons/Level7/Lesson73";
import { Lesson74Video, LESSON74_DURATION, Lesson74Thumbnail } from "./lessons/Level7/Lesson74";
import { Lesson75Video, LESSON75_DURATION, Lesson75Thumbnail } from "./lessons/Level7/Lesson75";
import { Lesson76Video, LESSON76_DURATION, Lesson76Thumbnail } from "./lessons/Level7/Lesson76";
import { Lesson77Video, LESSON77_DURATION, Lesson77Thumbnail } from "./lessons/Level7/Lesson77";
import { Lesson78Video, LESSON78_DURATION, Lesson78Thumbnail } from "./lessons/Level7/Lesson78";
import { Lesson67Video, LESSON67_DURATION, Lesson67Thumbnail } from "./lessons/Level6/Lesson67";
import { Lesson81Video, LESSON81_DURATION, Lesson81Thumbnail } from "./lessons/Level8/Lesson81";
import { Lesson82Video, LESSON82_DURATION, Lesson82Thumbnail } from "./lessons/Level8/Lesson82";
import { Lesson83Video, LESSON83_DURATION, Lesson83Thumbnail } from "./lessons/Level8/Lesson83";
import { Lesson84Video, LESSON84_DURATION, Lesson84Thumbnail } from "./lessons/Level8/Lesson84";
import { Lesson85Video, LESSON85_DURATION, Lesson85Thumbnail } from "./lessons/Level8/Lesson85";
import { Lesson86Video, LESSON86_DURATION, Lesson86Thumbnail } from "./lessons/Level8/Lesson86";
import { Lesson87Video, LESSON87_DURATION, Lesson87Thumbnail } from "./lessons/Level8/Lesson87";
import { Lesson91Video, LESSON91_DURATION, Lesson91Thumbnail } from "./lessons/Level9/Lesson91";
import { Lesson92Video, LESSON92_DURATION, Lesson92Thumbnail } from "./lessons/Level9/Lesson92";
import { Lesson93Video, LESSON93_DURATION, Lesson93Thumbnail } from "./lessons/Level9/Lesson93";
import { Lesson94Video, LESSON94_DURATION, Lesson94Thumbnail } from "./lessons/Level9/Lesson94";
import { Lesson95Video, LESSON95_DURATION, Lesson95Thumbnail } from "./lessons/Level9/Lesson95";
import { Lesson96Video, LESSON96_DURATION, Lesson96Thumbnail } from "./lessons/Level9/Lesson96";
import { Lesson97Video, LESSON97_DURATION, Lesson97Thumbnail } from "./lessons/Level9/Lesson97";
import { Lesson98Video, LESSON98_DURATION, Lesson98Thumbnail } from "./lessons/Level9/Lesson98";

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
      {/* ============ Level 4: PyTorch 실전 ============ */}
      {/* Lesson 4-1: MNIST 손글씨 분류 */}
      <Composition
        id="Lesson4-1"
        component={Lesson4_1Video}
        durationInFrames={LESSON_4_1_DURATION}
        fps={FPS}
        width={1920}
        height={1080}
      />
      <Composition
        id="Lesson4-1Thumbnail"
        component={Lesson4_1Thumbnail}
        durationInFrames={1}
        fps={30}
        width={1280}
        height={720}
      />
      {/* Lesson 4-2: 이미지 분류 CNN */}
      <Composition
        id="Lesson4-2"
        component={Lesson4_2Video}
        durationInFrames={LESSON_4_2_DURATION}
        fps={FPS}
        width={1920}
        height={1080}
      />
      <Composition
        id="Lesson4-2Thumbnail"
        component={Lesson4_2Thumbnail}
        durationInFrames={1}
        fps={30}
        width={1280}
        height={720}
      />
      {/* Lesson 4-3: 텍스트 분류 */}
      <Composition
        id="Lesson4-3"
        component={Lesson4_3Video}
        durationInFrames={LESSON_4_3_DURATION}
        fps={FPS}
        width={1920}
        height={1080}
      />
      <Composition
        id="Lesson4-3Thumbnail"
        component={Lesson4_3Thumbnail}
        durationInFrames={1}
        fps={30}
        width={1280}
        height={720}
      />
      {/* Lesson 4-4: nn.Module 기초 */}
      <Composition
        id="Lesson4-4"
        component={Lesson4_4Video}
        durationInFrames={LESSON_4_4_DURATION}
        fps={FPS}
        width={1920}
        height={1080}
      />
      <Composition
        id="Lesson4-4Thumbnail"
        component={Lesson4_4Thumbnail}
        durationInFrames={1}
        fps={30}
        width={1280}
        height={720}
      />
      {/* Lesson 4-5: 데이터 로딩 */}
      <Composition
        id="Lesson4-5"
        component={Lesson4_5Video}
        durationInFrames={LESSON_4_5_DURATION}
        fps={FPS}
        width={1920}
        height={1080}
      />
      <Composition
        id="Lesson4-5Thumbnail"
        component={Lesson4_5Thumbnail}
        durationInFrames={1}
        fps={30}
        width={1280}
        height={720}
      />
      {/* Lesson 4-6: 학습 루프 */}
      <Composition
        id="Lesson4-6"
        component={Lesson4_6Video}
        durationInFrames={LESSON_4_6_DURATION}
        fps={FPS}
        width={1920}
        height={1080}
      />
      <Composition
        id="Lesson4-6Thumbnail"
        component={Lesson4_6Thumbnail}
        durationInFrames={1}
        fps={30}
        width={1280}
        height={720}
      />
      {/* Lesson 4-7: 모델 저장과 로드 */}
      <Composition
        id="Lesson4-7"
        component={Lesson4_7Video}
        durationInFrames={LESSON_4_7_DURATION}
        fps={FPS}
        width={1920}
        height={1080}
      />
      <Composition
        id="Lesson4-7Thumbnail"
        component={Lesson4_7Thumbnail}
        durationInFrames={1}
        fps={30}
        width={1280}
        height={720}
      />
      {/* ============ Level 5: CNN & 이미지 처리 ============ */}
      {/* Lesson 5-1: 컴퓨터 비전 소개 */}
      <Composition
        id="Lesson5-1"
        component={Lesson51Video}
        durationInFrames={LESSON51_DURATION}
        fps={FPS}
        width={1920}
        height={1080}
      />
      <Composition
        id="Lesson5-1Thumbnail"
        component={Lesson51Thumbnail}
        durationInFrames={1}
        fps={30}
        width={1280}
        height={720}
      />
      {/* Lesson 5-2: 합성곱 연산 이해하기 */}
      <Composition
        id="Lesson5-2"
        component={Lesson52Video}
        durationInFrames={LESSON52_DURATION}
        fps={FPS}
        width={1920}
        height={1080}
      />
      <Composition
        id="Lesson5-2Thumbnail"
        component={Lesson52Thumbnail}
        durationInFrames={1}
        fps={30}
        width={1280}
        height={720}
      />
      {/* Lesson 5-3: 풀링과 정규화 */}
      <Composition
        id="Lesson5-3"
        component={Lesson53Video}
        durationInFrames={LESSON53_DURATION}
        fps={FPS}
        width={1920}
        height={1080}
      />
      <Composition
        id="Lesson5-3Thumbnail"
        component={Lesson53Thumbnail}
        durationInFrames={1}
        fps={30}
        width={1280}
        height={720}
      />
      {/* Lesson 5-4: CNN 아키텍처 */}
      <Composition
        id="Lesson5-4"
        component={Lesson54Video}
        durationInFrames={LESSON54_DURATION}
        fps={FPS}
        width={1920}
        height={1080}
      />
      <Composition
        id="Lesson5-4Thumbnail"
        component={Lesson54Thumbnail}
        durationInFrames={1}
        fps={30}
        width={1280}
        height={720}
      />
      {/* Lesson 5-5: CNN 구현 (MNIST) */}
      <Composition
        id="Lesson5-5"
        component={Lesson55Video}
        durationInFrames={LESSON55_DURATION}
        fps={FPS}
        width={1920}
        height={1080}
      />
      <Composition
        id="Lesson5-5Thumbnail"
        component={Lesson55Thumbnail}
        durationInFrames={1}
        fps={30}
        width={1280}
        height={720}
      />
      {/* Lesson 5-6: CNN 구현 (CIFAR-10) */}
      <Composition
        id="Lesson5-6"
        component={Lesson56Video}
        durationInFrames={LESSON56_DURATION}
        fps={FPS}
        width={1920}
        height={1080}
      />
      <Composition
        id="Lesson5-6Thumbnail"
        component={Lesson56Thumbnail}
        durationInFrames={1}
        fps={30}
        width={1280}
        height={720}
      />
      {/* Lesson 5-7: 전이 학습 (Transfer Learning) */}
      <Composition
        id="Lesson5-7"
        component={Lesson57Video}
        durationInFrames={LESSON57_DURATION}
        fps={FPS}
        width={1920}
        height={1080}
      />
      <Composition
        id="Lesson5-7Thumbnail"
        component={Lesson57Thumbnail}
        durationInFrames={1}
        fps={30}
        width={1280}
        height={720}
      />
      {/* Lesson 5-8: 데이터 증강 (Data Augmentation) */}
      <Composition
        id="Lesson5-8"
        component={Lesson58Video}
        durationInFrames={LESSON58_DURATION}
        fps={FPS}
        width={1920}
        height={1080}
      />
      <Composition
        id="Lesson5-8Thumbnail"
        component={Lesson58Thumbnail}
        durationInFrames={1}
        fps={30}
        width={1280}
        height={720}
      />
      {/* ============ Level 6: 시퀀스 모델 (RNN/LSTM) ============ */}
      {/* Lesson 6-1: 시퀀스 데이터 */}
      <Composition
        id="Lesson6-1"
        component={Lesson61Video}
        durationInFrames={LESSON61_DURATION}
        fps={FPS}
        width={1920}
        height={1080}
      />
      <Composition
        id="Lesson6-1Thumbnail"
        component={Lesson61Thumbnail}
        durationInFrames={1}
        fps={30}
        width={1280}
        height={720}
      />
      {/* Lesson 6-2: RNN 기본 구조 */}
      <Composition
        id="Lesson6-2"
        component={Lesson62Video}
        durationInFrames={LESSON62_DURATION}
        fps={FPS}
        width={1920}
        height={1080}
      />
      <Composition
        id="Lesson6-2Thumbnail"
        component={Lesson62Thumbnail}
        durationInFrames={1}
        fps={30}
        width={1280}
        height={720}
      />
      {/* Lesson 6-3: RNN의 문제점 */}
      <Composition
        id="Lesson6-3"
        component={Lesson63Video}
        durationInFrames={LESSON63_DURATION}
        fps={FPS}
        width={1920}
        height={1080}
      />
      <Composition
        id="Lesson6-3Thumbnail"
        component={Lesson63Thumbnail}
        durationInFrames={1}
        fps={30}
        width={1280}
        height={720}
      />
      {/* Lesson 6-4: LSTM */}
      <Composition
        id="Lesson6-4"
        component={Lesson64Video}
        durationInFrames={LESSON64_DURATION}
        fps={FPS}
        width={1920}
        height={1080}
      />
      <Composition
        id="Lesson6-4Thumbnail"
        component={Lesson64Thumbnail}
        durationInFrames={1}
        fps={30}
        width={1280}
        height={720}
      />
      {/* Lesson 6-5: GRU */}
      <Composition
        id="Lesson6-5"
        component={Lesson65Video}
        durationInFrames={LESSON65_DURATION}
        fps={FPS}
        width={1920}
        height={1080}
      />
      <Composition
        id="Lesson6-5Thumbnail"
        component={Lesson65Thumbnail}
        durationInFrames={1}
        fps={30}
        width={1280}
        height={720}
      />
      {/* Lesson 6-6: 텍스트 전처리 */}
      <Composition
        id="Lesson6-6"
        component={Lesson66Video}
        durationInFrames={LESSON66_DURATION}
        fps={FPS}
        width={1920}
        height={1080}
      />
      <Composition
        id="Lesson6-6Thumbnail"
        component={Lesson66Thumbnail}
        durationInFrames={1}
        fps={30}
        width={1280}
        height={720}
      />
      {/* Lesson 6-7: 감성 분석 구현 */}
      <Composition
        id="Lesson6-7"
        component={Lesson67Video}
        durationInFrames={LESSON67_DURATION}
        fps={FPS}
        width={1920}
        height={1080}
      />
      <Composition
        id="Lesson6-7Thumbnail"
        component={Lesson67Thumbnail}
        durationInFrames={1}
        fps={30}
        width={1280}
        height={720}
      />
      {/* ============ Level 7: Transformer & LLM 원리 ============ */}
      {/* Lesson 7-1: Attention 메커니즘 */}
      <Composition
        id="Lesson7-1"
        component={Lesson71Video}
        durationInFrames={LESSON71_DURATION}
        fps={FPS}
        width={1920}
        height={1080}
      />
      <Composition
        id="Lesson7-1Thumbnail"
        component={Lesson71Thumbnail}
        durationInFrames={1}
        fps={30}
        width={1920}
        height={1080}
      />
      {/* Lesson 7-2: Self-Attention */}
      <Composition
        id="Lesson7-2"
        component={Lesson72Video}
        durationInFrames={LESSON72_DURATION}
        fps={FPS}
        width={1920}
        height={1080}
      />
      <Composition
        id="Lesson7-2Thumbnail"
        component={Lesson72Thumbnail}
        durationInFrames={1}
        fps={30}
        width={1280}
        height={720}
      />
      {/* Lesson 7-3: Multi-Head Attention */}
      <Composition
        id="Lesson7-3"
        component={Lesson73Video}
        durationInFrames={LESSON73_DURATION}
        fps={FPS}
        width={1920}
        height={1080}
      />
      <Composition
        id="Lesson7-3Thumbnail"
        component={Lesson73Thumbnail}
        durationInFrames={1}
        fps={30}
        width={1920}
        height={1080}
      />
      {/* Lesson 7-4: Positional Encoding */}
      <Composition
        id="Lesson7-4"
        component={Lesson74Video}
        durationInFrames={LESSON74_DURATION}
        fps={FPS}
        width={1920}
        height={1080}
      />
      <Composition
        id="Lesson7-4Thumbnail"
        component={Lesson74Thumbnail}
        durationInFrames={1}
        fps={30}
        width={1280}
        height={720}
      />
      {/* Lesson 7-5: Transformer 구조 */}
      <Composition
        id="Lesson7-5"
        component={Lesson75Video}
        durationInFrames={LESSON75_DURATION}
        fps={FPS}
        width={1920}
        height={1080}
      />
      <Composition
        id="Lesson7-5Thumbnail"
        component={Lesson75Thumbnail}
        durationInFrames={1}
        fps={30}
        width={1280}
        height={720}
      />
      {/* Lesson 7-6: BERT 개요 */}
      <Composition
        id="Lesson7-6"
        component={Lesson76Video}
        durationInFrames={LESSON76_DURATION}
        fps={FPS}
        width={1920}
        height={1080}
      />
      <Composition
        id="Lesson7-6Thumbnail"
        component={Lesson76Thumbnail}
        durationInFrames={1}
        fps={30}
        width={1280}
        height={720}
      />
      {/* Lesson 7-7: GPT 개요 */}
      <Composition
        id="Lesson7-7"
        component={Lesson77Video}
        durationInFrames={LESSON77_DURATION}
        fps={FPS}
        width={1920}
        height={1080}
      />
      <Composition
        id="Lesson7-7Thumbnail"
        component={Lesson77Thumbnail}
        durationInFrames={1}
        fps={30}
        width={1280}
        height={720}
      />
      {/* Lesson 7-8: LLM 작동 원리 */}
      <Composition
        id="Lesson7-8"
        component={Lesson78Video}
        durationInFrames={LESSON78_DURATION}
        fps={FPS}
        width={1920}
        height={1080}
      />
      <Composition
        id="Lesson7-8Thumbnail"
        component={Lesson78Thumbnail}
        durationInFrames={1}
        fps={30}
        width={1280}
        height={720}
      />
      {/* ============ Level 9: 종합 프로젝트 (번호판 인식) ============ */}
            {/* Lesson 8-1: GPU vs CPU */}
      <Composition
        id="Lesson8-1"
        component={Lesson81Video}
        durationInFrames={LESSON81_DURATION}
        fps={FPS}
        width={1920}
        height={1080}
      />
      <Composition
        id="Lesson8-1Thumbnail"
        component={Lesson81Thumbnail}
        durationInFrames={1}
        fps={30}
        width={1280}
        height={720}
      />
            {/* Lesson 8-2: CUDA 개요 */}
      <Composition
        id="Lesson8-2"
        component={Lesson82Video}
        durationInFrames={LESSON82_DURATION}
        fps={FPS}
        width={1920}
        height={1080}
      />
      <Composition
        id="Lesson8-2Thumbnail"
        component={Lesson82Thumbnail}
        durationInFrames={1}
        fps={30}
        width={1280}
        height={720}
      />
      {/* Lesson 8-3: CUDA 환경 설정 */}
      <Composition
        id="Lesson8-3"
        component={Lesson83Video}
        durationInFrames={LESSON83_DURATION}
        fps={FPS}
        width={1920}
        height={1080}
      />
      <Composition
        id="Lesson8-3Thumbnail"
        component={Lesson83Thumbnail}
        durationInFrames={1}
        fps={30}
        width={1280}
        height={720}
      />
      {/* Lesson 8-4: 첫 CUDA 프로그램 */}
      <Composition
        id="Lesson8-4"
        component={Lesson84Video}
        durationInFrames={LESSON84_DURATION}
        fps={FPS}
        width={1920}
        height={1080}
      />
      <Composition
        id="Lesson8-4Thumbnail"
        component={Lesson84Thumbnail}
        durationInFrames={1}
        fps={30}
        width={1280}
        height={720}
      />
      {/* Lesson 8-5: CUDA 메모리 관리 */}
      <Composition
        id="Lesson8-5"
        component={Lesson85Video}
        durationInFrames={LESSON85_DURATION}
        fps={FPS}
        width={1920}
        height={1080}
      />
      <Composition
        id="Lesson8-5Thumbnail"
        component={Lesson85Thumbnail}
        durationInFrames={1}
        fps={30}
        width={1280}
        height={720}
      />
      {/* Lesson 8-6: CUDA 스트림과 비동기 실행 */}
      <Composition
        id="Lesson8-6"
        component={Lesson86Video}
        durationInFrames={LESSON86_DURATION}
        fps={FPS}
        width={1920}
        height={1080}
      />
      <Composition
        id="Lesson8-6Thumbnail"
        component={Lesson86Thumbnail}
        durationInFrames={1}
        fps={30}
        width={1280}
        height={720}
      />
      {/* Lesson 8-7: CUDA 성능 최적화 */}
      <Composition
        id="Lesson8-7"
        component={Lesson87Video}
        durationInFrames={LESSON87_DURATION}
        fps={FPS}
        width={1920}
        height={1080}
      />
      <Composition
        id="Lesson8-7Thumbnail"
        component={Lesson87Thumbnail}
        durationInFrames={1}
        fps={30}
        width={1280}
        height={720}
      />
      {/* Lesson 9-1: 프로젝트 개요 */}
      <Composition
        id="Lesson9-1"
        component={Lesson91Video}
        durationInFrames={LESSON91_DURATION}
        fps={FPS}
        width={1920}
        height={1080}
      />
      <Composition
        id="Lesson9-1Thumbnail"
        component={Lesson91Thumbnail}
        durationInFrames={1}
        fps={30}
        width={1280}
        height={720}
      />
      {/* Lesson 9-2: 데이터 수집/준비 */}
      <Composition
        id="Lesson9-2"
        component={Lesson92Video}
        durationInFrames={LESSON92_DURATION}
        fps={FPS}
        width={1920}
        height={1080}
      />
      <Composition
        id="Lesson9-2Thumbnail"
        component={Lesson92Thumbnail}
        durationInFrames={1}
        fps={30}
        width={1280}
        height={720}
      />
      {/* Lesson 9-3: 번호판 검출 모델 */}
      <Composition
        id="Lesson9-3"
        component={Lesson93Video}
        durationInFrames={LESSON93_DURATION}
        fps={FPS}
        width={1920}
        height={1080}
      />
      <Composition
        id="Lesson9-3Thumbnail"
        component={Lesson93Thumbnail}
        durationInFrames={1}
        fps={30}
        width={1280}
        height={720}
      />
      {/* Lesson 9-4: 문자 인식 모델 */}
      <Composition
        id="Lesson9-4"
        component={Lesson94Video}
        durationInFrames={LESSON94_DURATION}
        fps={FPS}
        width={1920}
        height={1080}
      />
      <Composition
        id="Lesson9-4Thumbnail"
        component={Lesson94Thumbnail}
        durationInFrames={1}
        fps={30}
        width={1280}
        height={720}
      />
      {/* Lesson 9-5: 모델 통합 */}
      <Composition
        id="Lesson9-5"
        component={Lesson95Video}
        durationInFrames={LESSON95_DURATION}
        fps={FPS}
        width={1920}
        height={1080}
      />
      <Composition
        id="Lesson9-5Thumbnail"
        component={Lesson95Thumbnail}
        durationInFrames={1}
        fps={30}
        width={1280}
        height={720}
      />
      {/* Lesson 9-6: 성능 평가 */}
      <Composition
        id="Lesson9-6"
        component={Lesson96Video}
        durationInFrames={LESSON96_DURATION}
        fps={FPS}
        width={1920}
        height={1080}
      />
      <Composition
        id="Lesson9-6Thumbnail"
        component={Lesson96Thumbnail}
        durationInFrames={1}
        fps={30}
        width={1280}
        height={720}
      />
      {/* Lesson 9-7: 실제 배포 */}
      <Composition
        id="Lesson9-7"
        component={Lesson97Video}
        durationInFrames={LESSON97_DURATION}
        fps={FPS}
        width={1920}
        height={1080}
      />
      <Composition
        id="Lesson9-7Thumbnail"
        component={Lesson97Thumbnail}
        durationInFrames={1}
        fps={30}
        width={1280}
        height={720}
      />
      {/* Lesson 9-8: 프로젝트 회고 */}
      <Composition
        id="Lesson9-8"
        component={Lesson98Video}
        durationInFrames={LESSON98_DURATION}
        fps={FPS}
        width={1920}
        height={1080}
      />
      <Composition
        id="Lesson9-8Thumbnail"
        component={Lesson98Thumbnail}
        durationInFrames={1}
        fps={30}
        width={1280}
        height={720}
      />
    </>
  );
};
