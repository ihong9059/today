with open("src/Root.tsx", "r", encoding="utf-8") as f:
    content = f.read()

# Add imports
import_line = 'import { Lesson3_6Thumbnail } from "./Lesson3_6Thumbnail";'
new_imports = '''import { Lesson3_6Thumbnail } from "./Lesson3_6Thumbnail";
import { Lesson3_7Video, LESSON_3_7_DURATION } from "./Lesson3_7Video";
import { Lesson3_7Thumbnail } from "./Lesson3_7Thumbnail";'''

if "Lesson3_7Video" not in content:
    content = content.replace(import_line, new_imports)

# Add compositions
lesson_3_6_thumb = '''      <Still
        id="Lesson3-6-Thumbnail"
        component={Lesson3_6Thumbnail}
        width={1920}
        height={1080}
      />
      <Composition
        id="AIIntroVideo"'''

lesson_3_7_added = '''      <Still
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
        id="AIIntroVideo"'''

if "Lesson3-7" not in content:
    content = content.replace(lesson_3_6_thumb, lesson_3_7_added)

with open("src/Root.tsx", "w", encoding="utf-8") as f:
    f.write(content)

print("Root.tsx updated with Lesson 3-7")
