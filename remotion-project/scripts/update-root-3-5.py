with open("src/Root.tsx", "r", encoding="utf-8") as f:
    content = f.read()

# Add imports
import_line = 'import { Lesson3_4Thumbnail } from "./Lesson3_4Thumbnail";'
new_imports = '''import { Lesson3_4Thumbnail } from "./Lesson3_4Thumbnail";
import { Lesson3_5Video, LESSON_3_5_DURATION } from "./Lesson3_5Video";
import { Lesson3_5Thumbnail } from "./Lesson3_5Thumbnail";'''

if "Lesson3_5Video" not in content:
    content = content.replace(import_line, new_imports)

# Add compositions
lesson_3_4_thumb = '''      <Still
        id="Lesson3-4-Thumbnail"
        component={Lesson3_4Thumbnail}
        width={1920}
        height={1080}
      />
      <Composition
        id="AIIntroVideo"'''

lesson_3_5_added = '''      <Still
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
        id="AIIntroVideo"'''

if "Lesson3-5" not in content:
    content = content.replace(lesson_3_4_thumb, lesson_3_5_added)

with open("src/Root.tsx", "w", encoding="utf-8") as f:
    f.write(content)

print("Root.tsx updated with Lesson 3-5")
