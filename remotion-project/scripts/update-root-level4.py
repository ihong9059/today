import re

ROOT_FILE = "src/Root.tsx"

with open(ROOT_FILE, "r", encoding="utf-8") as f:
    content = f.read()

# Add import for Lesson4_1 if not exists
import_line = 'import { Lesson4_1Video, LESSON_4_1_DURATION } from "./Lesson4_1Video";\nimport { Lesson4_1Thumbnail } from "./Lesson4_1Thumbnail";'

if "Lesson4_1Video" not in content:
    # Find the last Lesson3 import
    pattern = r'(import \{ Lesson3_8Thumbnail \} from "./Lesson3_8Thumbnail";)'
    replacement = r'\1\n' + import_line
    content = re.sub(pattern, replacement, content)

# Add compositions if not exists
composition_code = '''      <Composition
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
      />'''

if "Lesson4-1" not in content:
    # Find after Lesson3-8-Thumbnail and add
    pattern = r'(<Still\s+id="Lesson3-8-Thumbnail"[^/]+/>)'
    replacement = r'\1\n' + composition_code
    content = re.sub(pattern, replacement, content, flags=re.DOTALL)

with open(ROOT_FILE, "w", encoding="utf-8") as f:
    f.write(content)

print("Root.tsx updated with Lesson 4-1")
