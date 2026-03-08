import re

with open("src/Root.tsx", "r", encoding="utf-8") as f:
    content = f.read()

# Add imports
import_line = 'import { Lesson3_1Thumbnail } from "./Lesson3_1Thumbnail";'
new_imports = '''import { Lesson3_1Thumbnail } from "./Lesson3_1Thumbnail";
import { Lesson3_2Video, LESSON_3_2_DURATION } from "./Lesson3_2Video";
import { Lesson3_2Thumbnail } from "./Lesson3_2Thumbnail";'''

if "Lesson3_2Video" not in content:
    content = content.replace(import_line, new_imports)

# Add compositions
lesson_3_1_thumb = '''      <Still
        id="Lesson3-1-Thumbnail"
        component={Lesson3_1Thumbnail}
        width={1920}
        height={1080}
      />
      <Composition
        id="AIIntroVideo"'''

lesson_3_2_added = '''      <Still
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
        id="AIIntroVideo"'''

if "Lesson3-2" not in content:
    content = content.replace(lesson_3_1_thumb, lesson_3_2_added)

with open("src/Root.tsx", "w", encoding="utf-8") as f:
    f.write(content)

print("Root.tsx updated with Lesson 3-2")
