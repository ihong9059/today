import re

# Read the file
with open("src/Root.tsx", "r", encoding="utf-8") as f:
    content = f.read()

# Add imports for Level 3
import_line = 'import { Lesson2_8Video, LESSON_2_8_DURATION } from "./Lesson2_8Video";'
new_imports = '''import { Lesson2_8Video, LESSON_2_8_DURATION } from "./Lesson2_8Video";
import { Lesson3_1Video, LESSON_3_1_DURATION } from "./Lesson3_1Video";
import { Lesson3_1Thumbnail } from "./Lesson3_1Thumbnail";'''

if "Lesson3_1Video" not in content:
    content = content.replace(import_line, new_imports)

# Add Composition and Still for Lesson3-1 before AIIntroVideo
lesson_2_8_comp = '''      <Composition
        id="Lesson2-8"
        component={Lesson2_8Video}
        durationInFrames={LESSON_2_8_DURATION}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="AIIntroVideo"'''

lesson_3_1_added = '''      <Composition
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
        id="AIIntroVideo"'''

if "Lesson3-1" not in content:
    content = content.replace(lesson_2_8_comp, lesson_3_1_added)

# Write back
with open("src/Root.tsx", "w", encoding="utf-8") as f:
    f.write(content)

print("Root.tsx updated with Lesson 3-1")
