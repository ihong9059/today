import re

root_path = "src/Root.tsx"

with open(root_path, "r", encoding="utf-8") as f:
    content = f.read()

# Add imports for Lesson 3-8
import_line = 'import { Lesson3_7Thumbnail } from "./Lesson3_7Thumbnail";'
new_imports = '''import { Lesson3_7Thumbnail } from "./Lesson3_7Thumbnail";
import { Lesson3_8Video, LESSON_3_8_DURATION } from "./Lesson3_8Video";
import { Lesson3_8Thumbnail } from "./Lesson3_8Thumbnail";'''

content = content.replace(import_line, new_imports)

# Add Composition for Lesson 3-8 Video
video_comp_line = '''<Composition
        id="Lesson3_7Video"
        component={Lesson3_7Video}
        durationInFrames={LESSON_3_7_DURATION}
        fps={30}
        width={1920}
        height={1080}
      />'''

new_video_comp = '''<Composition
        id="Lesson3_7Video"
        component={Lesson3_7Video}
        durationInFrames={LESSON_3_7_DURATION}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="Lesson3_8Video"
        component={Lesson3_8Video}
        durationInFrames={LESSON_3_8_DURATION}
        fps={30}
        width={1920}
        height={1080}
      />'''

content = content.replace(video_comp_line, new_video_comp)

# Add Composition for Lesson 3-8 Thumbnail
thumb_comp_line = '''<Composition
        id="Lesson3_7Thumbnail"
        component={Lesson3_7Thumbnail}
        durationInFrames={1}
        fps={30}
        width={1920}
        height={1080}
      />'''

new_thumb_comp = '''<Composition
        id="Lesson3_7Thumbnail"
        component={Lesson3_7Thumbnail}
        durationInFrames={1}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="Lesson3_8Thumbnail"
        component={Lesson3_8Thumbnail}
        durationInFrames={1}
        fps={30}
        width={1920}
        height={1080}
      />'''

content = content.replace(thumb_comp_line, new_thumb_comp)

with open(root_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Root.tsx updated with Lesson 3-8!")
