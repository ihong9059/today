import { Composition, Still } from "remotion";
import { MyComposition } from "./Composition";
import { EconomyNews } from "./EconomyNews";
import { DumulmeoriTravel } from "./DumulmeoriTravel";
import { AIIntroVideo, INTRO_VIDEO_DURATION } from "./AIIntroVideo";
import { AIIntroThumbnail } from "./AIIntroThumbnail";
import { Lesson0_1Video, LESSON_0_1_DURATION } from "./Lesson0_1Video";
import { Lesson0_1Thumbnail } from "./Lesson0_1Thumbnail";
import { Lesson0_2Video, LESSON_0_2_DURATION } from "./Lesson0_2Video";
import { Lesson0_2Thumbnail } from "./Lesson0_2Thumbnail";
import { Lesson0_3Video, LESSON_0_3_DURATION } from "./Lesson0_3Video";
import { Lesson0_4Video, LESSON_0_4_DURATION } from "./Lesson0_4Video";
import { Lesson0_4Thumbnail } from "./Lesson0_4Thumbnail";
import { Lesson0_5Video, LESSON_0_5_DURATION } from "./Lesson0_5Video";
import { Lesson0_5Thumbnail } from "./Lesson0_5Thumbnail";
import { Lesson0_6Video, LESSON_0_6_DURATION } from "./Lesson0_6Video";
import { Lesson0_3Thumbnail } from "./Lesson0_3Thumbnail";
import { Lesson0_6Thumbnail } from "./Lesson0_6Thumbnail";
import { Lesson1_1Video, LESSON_1_1_DURATION } from "./Lesson1_1Video";
import { Lesson1_1Thumbnail } from "./Lesson1_1Thumbnail";
import { Lesson1_2Thumbnail } from "./Lesson1_2Thumbnail";
import { Lesson1_3Thumbnail } from "./Lesson1_3Thumbnail";
import { Lesson1_4Thumbnail } from "./Lesson1_4Thumbnail";
import { Lesson1_5Thumbnail } from "./Lesson1_5Thumbnail";
import { Lesson1_6Thumbnail } from "./Lesson1_6Thumbnail";
import { Lesson1_7Thumbnail } from "./Lesson1_7Thumbnail";
import { Lesson1_2Video, LESSON_1_2_DURATION } from "./Lesson1_2Video";
import { Lesson1_3Video, LESSON_1_3_DURATION } from "./Lesson1_3Video";
import { Lesson1_4Video, LESSON_1_4_DURATION } from "./Lesson1_4Video";
import { Lesson1_5Video, LESSON_1_5_DURATION } from "./Lesson1_5Video";
import { Lesson1_6Video, LESSON_1_6_DURATION } from "./Lesson1_6Video";
import { Lesson1_7Video, LESSON_1_7_DURATION } from "./Lesson1_7Video";
import { Lesson2_1Video, LESSON_2_1_DURATION } from "./Lesson2_1Video";
import { Lesson2_1Thumbnail } from "./Lesson2_1Thumbnail";
import { Lesson2_2Video, LESSON_2_2_DURATION } from "./Lesson2_2Video";
import { Lesson2_2Thumbnail } from "./Lesson2_2Thumbnail";
import { Lesson2_3Thumbnail } from "./Lesson2_3Thumbnail";
import { Lesson2_4Thumbnail } from "./Lesson2_4Thumbnail";
import { Lesson2_5Thumbnail } from "./Lesson2_5Thumbnail";
import { Lesson2_6Thumbnail } from "./Lesson2_6Thumbnail";
import { Lesson2_7Thumbnail } from "./Lesson2_7Thumbnail";
import { Lesson2_8Thumbnail } from "./Lesson2_8Thumbnail";
import { Lesson2_3Video, LESSON_2_3_DURATION } from "./Lesson2_3Video";
import { Lesson2_4Video, LESSON_2_4_DURATION } from "./Lesson2_4Video";
import { Lesson2_5Video, LESSON_2_5_DURATION } from "./Lesson2_5Video";
import { Lesson2_6Video, LESSON_2_6_DURATION } from "./Lesson2_6Video";
import { Lesson2_7Video, LESSON_2_7_DURATION } from "./Lesson2_7Video";
import { Lesson2_8Video, LESSON_2_8_DURATION } from "./Lesson2_8Video";
import { Lesson3_1Video, LESSON_3_1_DURATION } from "./Lesson3_1Video";
import { Lesson3_1Thumbnail } from "./Lesson3_1Thumbnail";
import { Lesson3_2Video, LESSON_3_2_DURATION } from "./Lesson3_2Video";
import { Lesson3_2Thumbnail } from "./Lesson3_2Thumbnail";
import { Lesson3_3Video, LESSON_3_3_DURATION } from "./Lesson3_3Video";
import { Lesson3_3Thumbnail } from "./Lesson3_3Thumbnail";
import { Lesson3_4Video, LESSON_3_4_DURATION } from "./Lesson3_4Video";
import { Lesson3_4Thumbnail } from "./Lesson3_4Thumbnail";
import { Lesson3_5Video, LESSON_3_5_DURATION } from "./Lesson3_5Video";
import { Lesson3_5Thumbnail } from "./Lesson3_5Thumbnail";
import { Lesson3_6Video, LESSON_3_6_DURATION } from "./Lesson3_6Video";
import { Lesson3_6Thumbnail } from "./Lesson3_6Thumbnail";
import { Lesson3_7Video, LESSON_3_7_DURATION } from "./Lesson3_7Video";
import { Lesson3_7Thumbnail } from "./Lesson3_7Thumbnail";
import { Lesson3_8Video, LESSON_3_8_DURATION } from "./Lesson3_8Video";
import { Lesson3_8Thumbnail } from "./Lesson3_8Thumbnail";
import { Lesson4_1Video, LESSON_4_1_DURATION } from "./Lesson4_1Video";
import { Lesson4_2Video, LESSON_4_2_DURATION } from "./Lesson4_2Video";
import { Lesson4_3Video, LESSON_4_3_DURATION } from "./Lesson4_3Video";
import { Lesson4_4Video, LESSON_4_4_DURATION } from "./Lesson4_4Video";
import { Lesson4_1Thumbnail } from "./Lesson4_1Thumbnail";
import { Lesson4_2Thumbnail } from "./Lesson4_2Thumbnail";
import { Lesson4_3Thumbnail } from "./Lesson4_3Thumbnail";
import { Lesson4_4Thumbnail } from "./Lesson4_4Thumbnail";
import { Lesson4_5Video, LESSON_4_5_DURATION } from "./Lesson4_5Video";
import { Lesson4_5Thumbnail } from "./Lesson4_5Thumbnail";
import { Lesson4_6Video, LESSON_4_6_DURATION } from "./Lesson4_6Video";
import { Lesson4_6Thumbnail } from "./Lesson4_6Thumbnail";
import { Lesson4_7Video, LESSON_4_7_DURATION } from "./Lesson4_7Video";
import { Lesson4_7Thumbnail } from "./Lesson4_7Thumbnail";
import { Lesson5_1Video, LESSON_5_1_DURATION } from "./Lesson5_1Video";
import { Lesson5_1Thumbnail } from "./Lesson5_1Thumbnail";
import { Lesson5_2Video, LESSON_5_2_DURATION } from "./Lesson5_2Video";
import { Lesson5_2Thumbnail } from "./Lesson5_2Thumbnail";
import { Lesson5_3Video, LESSON_5_3_DURATION } from "./Lesson5_3Video";
import { Lesson5_3Thumbnail } from "./Lesson5_3Thumbnail";
import { Lesson5_4Video, LESSON_5_4_DURATION } from "./Lesson5_4Video";
import { Lesson5_4Thumbnail } from "./Lesson5_4Thumbnail";
import { Lesson5_5Video, LESSON_5_5_DURATION } from "./Lesson5_5Video";
import { Lesson5_5Thumbnail } from "./Lesson5_5Thumbnail";
import { Lesson5_6Video, LESSON_5_6_DURATION } from "./Lesson5_6Video";
import { Lesson5_6Thumbnail } from "./Lesson5_6Thumbnail";
import { Lesson5_7Video, LESSON_5_7_DURATION } from "./Lesson5_7Video";
import { Lesson5_7Thumbnail } from "./Lesson5_7Thumbnail";
import { Lesson5_8Video, LESSON_5_8_DURATION } from "./Lesson5_8Video";
import { Lesson5_8Thumbnail } from "./Lesson5_8Thumbnail";
import { Lesson6_1Video, LESSON_6_1_DURATION } from "./Lesson6_1Video";
import { Lesson6_1Thumbnail } from "./Lesson6_1Thumbnail";
import { Lesson6_2Video, LESSON_6_2_DURATION } from "./Lesson6_2Video";
import { Lesson6_2Thumbnail } from "./Lesson6_2Thumbnail";
import { Lesson6_3Video, LESSON_6_3_DURATION } from "./Lesson6_3Video";
import { Lesson6_3Thumbnail } from "./Lesson6_3Thumbnail";
import { Lesson6_4Video, LESSON_6_4_DURATION } from "./Lesson6_4Video";
import { Lesson6_4Thumbnail } from "./Lesson6_4Thumbnail";
import { Lesson6_5Video, LESSON_6_5_DURATION } from "./Lesson6_5Video";
import { Lesson6_5Thumbnail } from "./Lesson6_5Thumbnail";
import { Lesson6_6Video, LESSON_6_6_DURATION } from "./Lesson6_6Video";
import { Lesson6_6Thumbnail } from "./Lesson6_6Thumbnail";
import { Lesson6_7Video, LESSON_6_7_DURATION } from "./Lesson6_7Video";
import { Lesson6_7Thumbnail } from "./Lesson6_7Thumbnail";
import { Lesson7_1Video, LESSON_7_1_DURATION } from "./Lesson7_1Video";
import { Lesson7_1Thumbnail } from "./Lesson7_1Thumbnail";
import { Lesson7_2Video, LESSON_7_2_DURATION } from "./Lesson7_2Video";
import { Lesson7_2Thumbnail } from "./Lesson7_2Thumbnail";
import { Lesson7_3Video, LESSON_7_3_DURATION } from "./Lesson7_3Video";
import { Lesson7_3Thumbnail } from "./Lesson7_3Thumbnail";
import { Lesson7_4Video, LESSON_7_4_DURATION } from "./Lesson7_4Video";
import { Lesson7_4Thumbnail } from "./Lesson7_4Thumbnail";
import { Lesson7_5Video, LESSON_7_5_DURATION } from "./Lesson7_5Video";
import { Lesson7_5Thumbnail } from "./Lesson7_5Thumbnail";
import { Lesson7_6Video, LESSON_7_6_DURATION } from "./Lesson7_6Video";
import { Lesson7_6Thumbnail } from "./Lesson7_6Thumbnail";
import { Lesson7_7Video, LESSON_7_7_DURATION } from "./Lesson7_7Video";
import { Lesson7_7Thumbnail } from "./Lesson7_7Thumbnail";
import { Lesson7_8Video, LESSON_7_8_DURATION } from "./Lesson7_8Video";
import { Lesson7_8Thumbnail } from "./Lesson7_8Thumbnail";
import { Lesson8_1Video, LESSON_8_1_DURATION } from "./Lesson8_1Video";
import { Lesson8_1Thumbnail } from "./Lesson8_1Thumbnail";
import { Lesson8_2Video, LESSON_8_2_DURATION } from "./Lesson8_2Video";
import { Lesson8_2Thumbnail } from "./Lesson8_2Thumbnail";
import { Lesson8_3Video, LESSON_8_3_DURATION } from "./Lesson8_3Video";
import { Lesson8_3Thumbnail } from "./Lesson8_3Thumbnail";
import { Lesson8_4Video, LESSON_8_4_DURATION } from "./Lesson8_4Video";
import { Lesson8_4Thumbnail } from "./Lesson8_4Thumbnail";
import { Lesson8_5Video, LESSON_8_5_DURATION } from "./Lesson8_5Video";
import { Lesson8_5Thumbnail } from "./Lesson8_5Thumbnail";
import { Lesson8_6Video, LESSON_8_6_DURATION } from "./Lesson8_6Video";
import { Lesson8_6Thumbnail } from "./Lesson8_6Thumbnail";
import { Lesson8_7Video, LESSON_8_7_DURATION } from "./Lesson8_7Video";
import { Lesson8_7Thumbnail } from "./Lesson8_7Thumbnail";
import { Lesson9_1Video, LESSON_9_1_DURATION } from "./Lesson9_1Video";
import { Lesson9_1Thumbnail } from "./Lesson9_1Thumbnail";
import { Lesson9_2Video, LESSON_9_2_DURATION } from "./Lesson9_2Video";
import { Lesson9_2Thumbnail } from "./Lesson9_2Thumbnail";
import { Lesson9_3Video, LESSON_9_3_DURATION } from "./Lesson9_3Video";
import { Lesson9_3Thumbnail } from "./Lesson9_3Thumbnail";
import { Lesson9_4Video, LESSON_9_4_DURATION } from "./Lesson9_4Video";
import { Lesson9_4Thumbnail } from "./Lesson9_4Thumbnail";
import { Lesson9_5Video, LESSON_9_5_DURATION } from "./Lesson9_5Video";
import { Lesson9_5Thumbnail } from "./Lesson9_5Thumbnail";
import { Lesson9_6Video, LESSON_9_6_DURATION } from "./Lesson9_6Video";
import { Lesson9_6Thumbnail } from "./Lesson9_6Thumbnail";
import { Lesson9_7Video, LESSON_9_7_DURATION } from "./Lesson9_7Video";
import { Lesson9_7Thumbnail } from "./Lesson9_7Thumbnail";
import { Lesson9_8Video, LESSON_9_8_DURATION } from "./Lesson9_8Video";
import { Lesson9_8Thumbnail } from "./Lesson9_8Thumbnail";
import { AIQualityVideo, AI_QUALITY_VIDEO_DURATION } from "./AIQualityVideo";
import { AIQualityVideoEN, AI_QUALITY_VIDEO_EN_DURATION } from "./AIQualityVideoEN";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="Lesson0-1"
        component={Lesson0_1Video}
        durationInFrames={LESSON_0_1_DURATION}
        fps={30}
        width={1920}
        height={1080}
      />
      <Still
        id="Lesson0-1-Thumbnail"
        component={Lesson0_1Thumbnail}
        width={1920}
        height={1080}
      />
      <Composition
        id="Lesson0-2"
        component={Lesson0_2Video}
        durationInFrames={LESSON_0_2_DURATION}
        fps={30}
        width={1920}
        height={1080}
      />
      <Still
        id="Lesson0-2-Thumbnail"
        component={Lesson0_2Thumbnail}
        width={1920}
        height={1080}
      />
      <Composition
        id="Lesson0-3"
        component={Lesson0_3Video}
        durationInFrames={LESSON_0_3_DURATION}
        fps={30}
        width={1920}
        height={1080}
      />
      <Still
        id="Lesson0-3-Thumbnail"
        component={Lesson0_3Thumbnail}
        width={1920}
        height={1080}
      />
      <Composition
        id="Lesson0-4"
        component={Lesson0_4Video}
        durationInFrames={LESSON_0_4_DURATION}
        fps={30}
        width={1920}
        height={1080}
      />
      <Still
        id="Lesson0-4-Thumbnail"
        component={Lesson0_4Thumbnail}
        width={1920}
        height={1080}
      />
      <Composition
        id="Lesson0-5"
        component={Lesson0_5Video}
        durationInFrames={LESSON_0_5_DURATION}
        fps={30}
        width={1920}
        height={1080}
      />
      <Still
        id="Lesson0-5-Thumbnail"
        component={Lesson0_5Thumbnail}
        width={1920}
        height={1080}
      />
      <Composition
        id="Lesson0-6"
        component={Lesson0_6Video}
        durationInFrames={LESSON_0_6_DURATION}
        fps={30}
        width={1920}
        height={1080}
      />
      <Still
        id="Lesson0-6-Thumbnail"
        component={Lesson0_6Thumbnail}
        width={1920}
        height={1080}
      />
      <Composition
        id="Lesson1-1"
        component={Lesson1_1Video}
        durationInFrames={LESSON_1_1_DURATION}
        fps={30}
        width={1920}
        height={1080}
      />
      <Still
        id="Lesson1-1-Thumbnail"
        component={Lesson1_1Thumbnail}
        width={1920}
        height={1080}
      />
      <Still
        id="Lesson1-2-Thumbnail"
        component={Lesson1_2Thumbnail}
        width={1920}
        height={1080}
      />
      <Composition
        id="Lesson1-2"
        component={Lesson1_2Video}
        durationInFrames={LESSON_1_2_DURATION}
        fps={30}
        width={1920}
        height={1080}
      />
      <Still
        id="Lesson1-3-Thumbnail"
        component={Lesson1_3Thumbnail}
        width={1920}
        height={1080}
      />
      <Composition
        id="Lesson1-3"
        component={Lesson1_3Video}
        durationInFrames={LESSON_1_3_DURATION}
        fps={30}
        width={1920}
        height={1080}
      />
      <Still
        id="Lesson1-4-Thumbnail"
        component={Lesson1_4Thumbnail}
        width={1920}
        height={1080}
      />
      <Composition
        id="Lesson1-4"
        component={Lesson1_4Video}
        durationInFrames={LESSON_1_4_DURATION}
        fps={30}
        width={1920}
        height={1080}
      />
      <Still
        id="Lesson1-5-Thumbnail"
        component={Lesson1_5Thumbnail}
        width={1920}
        height={1080}
      />
      <Composition
        id="Lesson1-5"
        component={Lesson1_5Video}
        durationInFrames={LESSON_1_5_DURATION}
        fps={30}
        width={1920}
        height={1080}
      />
      <Still
        id="Lesson1-6-Thumbnail"
        component={Lesson1_6Thumbnail}
        width={1920}
        height={1080}
      />
      <Composition
        id="Lesson1-6"
        component={Lesson1_6Video}
        durationInFrames={LESSON_1_6_DURATION}
        fps={30}
        width={1920}
        height={1080}
      />
      <Still
        id="Lesson1-7-Thumbnail"
        component={Lesson1_7Thumbnail}
        width={1920}
        height={1080}
      />
      <Composition
        id="Lesson1-7"
        component={Lesson1_7Video}
        durationInFrames={LESSON_1_7_DURATION}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="Lesson2-1"
        component={Lesson2_1Video}
        durationInFrames={LESSON_2_1_DURATION}
        fps={30}
        width={1920}
        height={1080}
      />
      <Still
        id="Lesson2-1-Thumbnail"
        component={Lesson2_1Thumbnail}
        width={1920}
        height={1080}
      />
      <Composition
        id="Lesson2-2"
        component={Lesson2_2Video}
        durationInFrames={LESSON_2_2_DURATION}
        fps={30}
        width={1920}
        height={1080}
      />
      <Still
        id="Lesson2-2-Thumbnail"
        component={Lesson2_2Thumbnail}
        width={1920}
        height={1080}
      />
      <Still
        id="Lesson2-3-Thumbnail"
        component={Lesson2_3Thumbnail}
        width={1920}
        height={1080}
      />
      <Still
        id="Lesson2-4-Thumbnail"
        component={Lesson2_4Thumbnail}
        width={1920}
        height={1080}
      />
      <Still
        id="Lesson2-5-Thumbnail"
        component={Lesson2_5Thumbnail}
        width={1920}
        height={1080}
      />
      <Still
        id="Lesson2-6-Thumbnail"
        component={Lesson2_6Thumbnail}
        width={1920}
        height={1080}
      />
      <Still
        id="Lesson2-7-Thumbnail"
        component={Lesson2_7Thumbnail}
        width={1920}
        height={1080}
      />
      <Still
        id="Lesson2-8-Thumbnail"
        component={Lesson2_8Thumbnail}
        width={1920}
        height={1080}
      />
      <Composition
        id="Lesson2-3"
        component={Lesson2_3Video}
        durationInFrames={LESSON_2_3_DURATION}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="Lesson2-4"
        component={Lesson2_4Video}
        durationInFrames={LESSON_2_4_DURATION}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="Lesson2-5"
        component={Lesson2_5Video}
        durationInFrames={LESSON_2_5_DURATION}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="Lesson2-6"
        component={Lesson2_6Video}
        durationInFrames={LESSON_2_6_DURATION}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="Lesson2-7"
        component={Lesson2_7Video}
        durationInFrames={LESSON_2_7_DURATION}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="Lesson2-8"
        component={Lesson2_8Video}
        durationInFrames={LESSON_2_8_DURATION}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="Lesson3-1"
        component={Lesson3_1Video}
        durationInFrames={LESSON_3_1_DURATION}
        fps={30}
        width={1920}
        height={1080}
      />
      <Still
        id="Lesson3-1-Thumbnail"
        component={Lesson3_1Thumbnail}
        width={1920}
        height={1080}
      />
      <Composition
        id="Lesson3-2"
        component={Lesson3_2Video}
        durationInFrames={LESSON_3_2_DURATION}
        fps={30}
        width={1920}
        height={1080}
      />
      <Still
        id="Lesson3-2-Thumbnail"
        component={Lesson3_2Thumbnail}
        width={1920}
        height={1080}
      />
      <Composition
        id="Lesson3-3"
        component={Lesson3_3Video}
        durationInFrames={LESSON_3_3_DURATION}
        fps={30}
        width={1920}
        height={1080}
      />
      <Still
        id="Lesson3-3-Thumbnail"
        component={Lesson3_3Thumbnail}
        width={1920}
        height={1080}
      />
      <Composition
        id="Lesson3-4"
        component={Lesson3_4Video}
        durationInFrames={LESSON_3_4_DURATION}
        fps={30}
        width={1920}
        height={1080}
      />
      <Still
        id="Lesson3-4-Thumbnail"
        component={Lesson3_4Thumbnail}
        width={1920}
        height={1080}
      />
      <Composition
        id="Lesson3-5"
        component={Lesson3_5Video}
        durationInFrames={LESSON_3_5_DURATION}
        fps={30}
        width={1920}
        height={1080}
      />
      <Still
        id="Lesson3-5-Thumbnail"
        component={Lesson3_5Thumbnail}
        width={1920}
        height={1080}
      />
      <Composition
        id="Lesson3-6"
        component={Lesson3_6Video}
        durationInFrames={LESSON_3_6_DURATION}
        fps={30}
        width={1920}
        height={1080}
      />
      <Still
        id="Lesson3-6-Thumbnail"
        component={Lesson3_6Thumbnail}
        width={1920}
        height={1080}
      />
      <Composition
        id="Lesson3-7"
        component={Lesson3_7Video}
        durationInFrames={LESSON_3_7_DURATION}
        fps={30}
        width={1920}
        height={1080}
      />
      <Still
        id="Lesson3-7-Thumbnail"
        component={Lesson3_7Thumbnail}
        width={1920}
        height={1080}
      />
      <Composition
        id="Lesson3-8"
        component={Lesson3_8Video}
        durationInFrames={LESSON_3_8_DURATION}
        fps={30}
        width={1920}
        height={1080}
      />
      <Still
        id="Lesson3-8-Thumbnail"
        component={Lesson3_8Thumbnail}
        width={1920}
        height={1080}
      />
      <Composition
        id="Lesson4-1"
        component={Lesson4_1Video}
        durationInFrames={LESSON_4_1_DURATION}
        fps={30}
        width={1920}
        height={1080}
      />
      <Still
        id="Lesson4-1-Thumbnail"
        component={Lesson4_1Thumbnail}
        width={1920}
        height={1080}
      />
      <Composition
        id="Lesson4-2"
        component={Lesson4_2Video}
        durationInFrames={LESSON_4_2_DURATION}
        fps={30}
        width={1920}
        height={1080}
      />
      <Still
        id="Lesson4-2-Thumbnail"
        component={Lesson4_2Thumbnail}
        width={1920}
        height={1080}
      />
      <Composition
        id="Lesson4-3"
        component={Lesson4_3Video}
        durationInFrames={LESSON_4_3_DURATION}
        fps={30}
        width={1920}
        height={1080}
      />
      <Still
        id="Lesson4-3-Thumbnail"
        component={Lesson4_3Thumbnail}
        width={1920}
        height={1080}
      />
      <Composition
        id="Lesson4-4"
        component={Lesson4_4Video}
        durationInFrames={LESSON_4_4_DURATION}
        fps={30}
        width={1920}
        height={1080}
      />
      <Still
        id="Lesson4-4-Thumbnail"
        component={Lesson4_4Thumbnail}
        width={1920}
        height={1080}
      />
      <Composition
        id="Lesson4-5"
        component={Lesson4_5Video}
        durationInFrames={LESSON_4_5_DURATION}
        fps={30}
        width={1920}
        height={1080}
      />
      <Still
        id="Lesson4-5-Thumbnail"
        component={Lesson4_5Thumbnail}
        width={1920}
        height={1080}
      />
      <Composition
        id="Lesson4-6"
        component={Lesson4_6Video}
        durationInFrames={LESSON_4_6_DURATION}
        fps={30}
        width={1920}
        height={1080}
      />
      <Still
        id="Lesson4-6-Thumbnail"
        component={Lesson4_6Thumbnail}
        width={1920}
        height={1080}
      />
      <Composition
        id="Lesson4-7"
        component={Lesson4_7Video}
        durationInFrames={LESSON_4_7_DURATION}
        fps={30}
        width={1920}
        height={1080}
      />
      <Still
        id="Lesson4-7-Thumbnail"
        component={Lesson4_7Thumbnail}
        width={1920}
        height={1080}
      />
      <Composition
        id="Lesson5-1"
        component={Lesson5_1Video}
        durationInFrames={LESSON_5_1_DURATION}
        fps={30}
        width={1920}
        height={1080}
      />
      <Still
        id="Lesson5-1-Thumbnail"
        component={Lesson5_1Thumbnail}
        width={1920}
        height={1080}
      />
      <Composition
        id="Lesson5-2"
        component={Lesson5_2Video}
        durationInFrames={LESSON_5_2_DURATION}
        fps={30}
        width={1920}
        height={1080}
      />
      <Still
        id="Lesson5-2-Thumbnail"
        component={Lesson5_2Thumbnail}
        width={1920}
        height={1080}
      />
      <Composition
        id="Lesson5-3"
        component={Lesson5_3Video}
        durationInFrames={LESSON_5_3_DURATION}
        fps={30}
        width={1920}
        height={1080}
      />
      <Still
        id="Lesson5-3-Thumbnail"
        component={Lesson5_3Thumbnail}
        width={1920}
        height={1080}
      />
      <Composition
        id="Lesson5-4"
        component={Lesson5_4Video}
        durationInFrames={LESSON_5_4_DURATION}
        fps={30}
        width={1920}
        height={1080}
      />
      <Still
        id="Lesson5-4-Thumbnail"
        component={Lesson5_4Thumbnail}
        width={1920}
        height={1080}
      />
      <Composition
        id="Lesson5-5"
        component={Lesson5_5Video}
        durationInFrames={LESSON_5_5_DURATION}
        fps={30}
        width={1920}
        height={1080}
      />
      <Still
        id="Lesson5-5-Thumbnail"
        component={Lesson5_5Thumbnail}
        width={1920}
        height={1080}
      />
      <Composition
        id="Lesson5-6"
        component={Lesson5_6Video}
        durationInFrames={LESSON_5_6_DURATION}
        fps={30}
        width={1920}
        height={1080}
      />
      <Still
        id="Lesson5-6-Thumbnail"
        component={Lesson5_6Thumbnail}
        width={1920}
        height={1080}
      />
      <Composition
        id="Lesson5-7"
        component={Lesson5_7Video}
        durationInFrames={LESSON_5_7_DURATION}
        fps={30}
        width={1920}
        height={1080}
      />
      <Still
        id="Lesson5-7-Thumbnail"
        component={Lesson5_7Thumbnail}
        width={1920}
        height={1080}
      />
      <Composition
        id="Lesson5-8"
        component={Lesson5_8Video}
        durationInFrames={LESSON_5_8_DURATION}
        fps={30}
        width={1920}
        height={1080}
      />
      <Still
        id="Lesson5-8-Thumbnail"
        component={Lesson5_8Thumbnail}
        width={1920}
        height={1080}
      />
      <Composition
        id="Lesson6-1"
        component={Lesson6_1Video}
        durationInFrames={LESSON_6_1_DURATION}
        fps={30}
        width={1920}
        height={1080}
      />
      <Still
        id="Lesson6-1-Thumbnail"
        component={Lesson6_1Thumbnail}
        width={1920}
        height={1080}
      />
      <Composition
        id="Lesson6-2"
        component={Lesson6_2Video}
        durationInFrames={LESSON_6_2_DURATION}
        fps={30}
        width={1920}
        height={1080}
      />
      <Still
        id="Lesson6-2-Thumbnail"
        component={Lesson6_2Thumbnail}
        width={1920}
        height={1080}
      />
      <Composition
        id="Lesson6-3"
        component={Lesson6_3Video}
        durationInFrames={LESSON_6_3_DURATION}
        fps={30}
        width={1920}
        height={1080}
      />
      <Still
        id="Lesson6-3-Thumbnail"
        component={Lesson6_3Thumbnail}
        width={1920}
        height={1080}
      />
      <Composition
        id="Lesson6-4"
        component={Lesson6_4Video}
        durationInFrames={LESSON_6_4_DURATION}
        fps={30}
        width={1920}
        height={1080}
      />
      <Still
        id="Lesson6-4-Thumbnail"
        component={Lesson6_4Thumbnail}
        width={1920}
        height={1080}
      />
      <Composition
        id="Lesson6-5"
        component={Lesson6_5Video}
        durationInFrames={LESSON_6_5_DURATION}
        fps={30}
        width={1920}
        height={1080}
      />
      <Still
        id="Lesson6-5-Thumbnail"
        component={Lesson6_5Thumbnail}
        width={1920}
        height={1080}
      />
      <Composition
        id="Lesson6-6"
        component={Lesson6_6Video}
        durationInFrames={LESSON_6_6_DURATION}
        fps={30}
        width={1920}
        height={1080}
      />
      <Still
        id="Lesson6-6-Thumbnail"
        component={Lesson6_6Thumbnail}
        width={1920}
        height={1080}
      />
      <Composition
        id="Lesson6-7"
        component={Lesson6_7Video}
        durationInFrames={LESSON_6_7_DURATION}
        fps={30}
        width={1920}
        height={1080}
      />
      <Still
        id="Lesson6-7-Thumbnail"
        component={Lesson6_7Thumbnail}
        width={1920}
        height={1080}
      />
      <Composition
        id="Lesson7-1"
        component={Lesson7_1Video}
        durationInFrames={LESSON_7_1_DURATION}
        fps={30}
        width={1920}
        height={1080}
      />
      <Still
        id="Lesson7-1-Thumbnail"
        component={Lesson7_1Thumbnail}
        width={1920}
        height={1080}
      />
      <Composition
        id="Lesson7-2"
        component={Lesson7_2Video}
        durationInFrames={LESSON_7_2_DURATION}
        fps={30}
        width={1920}
        height={1080}
      />
      <Still
        id="Lesson7-2-Thumbnail"
        component={Lesson7_2Thumbnail}
        width={1920}
        height={1080}
      />
      <Composition
        id="Lesson7-3"
        component={Lesson7_3Video}
        durationInFrames={LESSON_7_3_DURATION}
        fps={30}
        width={1920}
        height={1080}
      />
      <Still
        id="Lesson7-3-Thumbnail"
        component={Lesson7_3Thumbnail}
        width={1920}
        height={1080}
      />
      <Composition
        id="Lesson7-4"
        component={Lesson7_4Video}
        durationInFrames={LESSON_7_4_DURATION}
        fps={30}
        width={1920}
        height={1080}
      />
      <Still
        id="Lesson7-4-Thumbnail"
        component={Lesson7_4Thumbnail}
        width={1920}
        height={1080}
      />
      <Composition
        id="Lesson7-5"
        component={Lesson7_5Video}
        durationInFrames={LESSON_7_5_DURATION}
        fps={30}
        width={1920}
        height={1080}
      />
      <Still
        id="Lesson7-5-Thumbnail"
        component={Lesson7_5Thumbnail}
        width={1920}
        height={1080}
      />
      <Composition
        id="Lesson7-6"
        component={Lesson7_6Video}
        durationInFrames={LESSON_7_6_DURATION}
        fps={30}
        width={1920}
        height={1080}
      />
      <Still
        id="Lesson7-6-Thumbnail"
        component={Lesson7_6Thumbnail}
        width={1920}
        height={1080}
      />
      <Composition
        id="Lesson7-7"
        component={Lesson7_7Video}
        durationInFrames={LESSON_7_7_DURATION}
        fps={30}
        width={1920}
        height={1080}
      />
      <Still
        id="Lesson7-7-Thumbnail"
        component={Lesson7_7Thumbnail}
        width={1920}
        height={1080}
      />
      <Composition
        id="Lesson7-8"
        component={Lesson7_8Video}
        durationInFrames={LESSON_7_8_DURATION}
        fps={30}
        width={1920}
        height={1080}
      />
      <Still
        id="Lesson7-8-Thumbnail"
        component={Lesson7_8Thumbnail}
        width={1920}
        height={1080}
      />
      <Composition
        id="Lesson8-1"
        component={Lesson8_1Video}
        durationInFrames={LESSON_8_1_DURATION}
        fps={30}
        width={1920}
        height={1080}
      />
      <Still
        id="Lesson8-1-Thumbnail"
        component={Lesson8_1Thumbnail}
        width={1920}
        height={1080}
      />
      <Composition
        id="Lesson8-2"
        component={Lesson8_2Video}
        durationInFrames={LESSON_8_2_DURATION}
        fps={30}
        width={1920}
        height={1080}
      />
      <Still
        id="Lesson8-2-Thumbnail"
        component={Lesson8_2Thumbnail}
        width={1920}
        height={1080}
      />
      <Composition
        id="Lesson8-3"
        component={Lesson8_3Video}
        durationInFrames={LESSON_8_3_DURATION}
        fps={30}
        width={1920}
        height={1080}
      />
      <Still
        id="Lesson8-3-Thumbnail"
        component={Lesson8_3Thumbnail}
        width={1920}
        height={1080}
      />
      <Composition
        id="Lesson8-4"
        component={Lesson8_4Video}
        durationInFrames={LESSON_8_4_DURATION}
        fps={30}
        width={1920}
        height={1080}
      />
      <Still
        id="Lesson8-4-Thumbnail"
        component={Lesson8_4Thumbnail}
        width={1920}
        height={1080}
      />
      <Composition
        id="Lesson8-5"
        component={Lesson8_5Video}
        durationInFrames={LESSON_8_5_DURATION}
        fps={30}
        width={1920}
        height={1080}
      />
      <Still
        id="Lesson8-5-Thumbnail"
        component={Lesson8_5Thumbnail}
        width={1920}
        height={1080}
      />
      <Composition
        id="Lesson8-6"
        component={Lesson8_6Video}
        durationInFrames={LESSON_8_6_DURATION}
        fps={30}
        width={1920}
        height={1080}
      />
      <Still
        id="Lesson8-6-Thumbnail"
        component={Lesson8_6Thumbnail}
        width={1920}
        height={1080}
      />
      <Composition
        id="Lesson8-7"
        component={Lesson8_7Video}
        durationInFrames={LESSON_8_7_DURATION}
        fps={30}
        width={1920}
        height={1080}
      />
      <Still
        id="Lesson8-7-Thumbnail"
        component={Lesson8_7Thumbnail}
        width={1920}
        height={1080}
      />
      <Composition
        id="Lesson9-1"
        component={Lesson9_1Video}
        durationInFrames={LESSON_9_1_DURATION}
        fps={30}
        width={1920}
        height={1080}
      />
      <Still
        id="Lesson9-1-Thumbnail"
        component={Lesson9_1Thumbnail}
        width={1920}
        height={1080}
      />
      <Composition
        id="Lesson9-2"
        component={Lesson9_2Video}
        durationInFrames={LESSON_9_2_DURATION}
        fps={30}
        width={1920}
        height={1080}
      />
      <Still
        id="Lesson9-2-Thumbnail"
        component={Lesson9_2Thumbnail}
        width={1920}
        height={1080}
      />
      <Composition
        id="Lesson9-3"
        component={Lesson9_3Video}
        durationInFrames={LESSON_9_3_DURATION}
        fps={30}
        width={1920}
        height={1080}
      />
      <Still
        id="Lesson9-3-Thumbnail"
        component={Lesson9_3Thumbnail}
        width={1920}
        height={1080}
      />
      <Composition
        id="Lesson9-4"
        component={Lesson9_4Video}
        durationInFrames={LESSON_9_4_DURATION}
        fps={30}
        width={1920}
        height={1080}
      />
      <Still
        id="Lesson9-4-Thumbnail"
        component={Lesson9_4Thumbnail}
        width={1920}
        height={1080}
      />
      <Composition
        id="Lesson9-5"
        component={Lesson9_5Video}
        durationInFrames={LESSON_9_5_DURATION}
        fps={30}
        width={1920}
        height={1080}
      />
      <Still
        id="Lesson9-5-Thumbnail"
        component={Lesson9_5Thumbnail}
        width={1920}
        height={1080}
      />
      <Composition
        id="Lesson9-6"
        component={Lesson9_6Video}
        durationInFrames={LESSON_9_6_DURATION}
        fps={30}
        width={1920}
        height={1080}
      />
      <Still
        id="Lesson9-6-Thumbnail"
        component={Lesson9_6Thumbnail}
        width={1920}
        height={1080}
      />
      <Composition
        id="Lesson9-7"
        component={Lesson9_7Video}
        durationInFrames={LESSON_9_7_DURATION}
        fps={30}
        width={1920}
        height={1080}
      />
      <Still
        id="Lesson9-7-Thumbnail"
        component={Lesson9_7Thumbnail}
        width={1920}
        height={1080}
      />
      <Composition
        id="Lesson9-8"
        component={Lesson9_8Video}
        durationInFrames={LESSON_9_8_DURATION}
        fps={30}
        width={1920}
        height={1080}
      />
      <Still
        id="Lesson9-8-Thumbnail"
        component={Lesson9_8Thumbnail}
        width={1920}
        height={1080}
      />
      <Composition
        id="AIIntroVideo"
        component={AIIntroVideo}
        durationInFrames={INTRO_VIDEO_DURATION}
        fps={30}
        width={1920}
        height={1080}
      />
      <Still
        id="AIIntro-Thumbnail"
        component={AIIntroThumbnail}
        width={1920}
        height={1080}
      />
      <Composition
        id="AIQualityVideo"
        component={AIQualityVideo}
        durationInFrames={AI_QUALITY_VIDEO_DURATION}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="AIQualityVideoEN"
        component={AIQualityVideoEN}
        durationInFrames={AI_QUALITY_VIDEO_EN_DURATION}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="MyComp"
        component={MyComposition}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="EconomyNews"
        component={EconomyNews}
        durationInFrames={900}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="DumulmeoriTravel"
        component={DumulmeoriTravel}
        durationInFrames={8700}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
