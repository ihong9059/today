with open("src/Root.tsx", "r", encoding="utf-8") as f:
    content = f.read()

# Add imports
import_line = 'import { Lesson3_3Thumbnail } from "./Lesson3_3Thumbnail";'
new_imports = '''import { Lesson3_3Thumbnail } from "./Lesson3_3Thumbnail";
import { Lesson3_4Video, LESSON_3_4_DURATION } from "./Lesson3_4Video";
import { Lesson3_4Thumbnail } from "./Lesson3_4Thumbnail";'''

if "Lesson3_4Video" not in content:
    content = content.replace(import_line, new_imports)

# Add compositions
lesson_3_3_thumb = '''      <Still
        id="Lesson3-3-Thumbnail"
        component={Lesson3_3Thumbnail}
        width={1920}
        height={1080}
      />
      <Composition
        id="AIIntroVideo"'''

lesson_3_4_added = '''      <Still
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
        id="AIIntroVideo"'''

if "Lesson3-4" not in content:
    content = content.replace(lesson_3_3_thumb, lesson_3_4_added)

with open("src/Root.tsx", "w", encoding="utf-8") as f:
    f.write(content)

print("Root.tsx updated with Lesson 3-4")
