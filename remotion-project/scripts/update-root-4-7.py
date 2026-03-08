#!/usr/bin/env python3
"""Update Root.tsx to add Lesson 4-7 components"""

import re

ROOT_PATH = r"C:\todo\today\remotion-project\src\Root.tsx"

# Read the file
with open(ROOT_PATH, "r", encoding="utf-8") as f:
    content = f.read()

# Add import for Lesson4_7Video
import_video = 'import { Lesson4_7Video, LESSON_4_7_DURATION } from "./Lesson4_7Video";'
import_thumb = 'import { Lesson4_7Thumbnail } from "./Lesson4_7Thumbnail";'

# Find the last Lesson4_6 import and add after it
if "Lesson4_7Video" not in content:
    content = content.replace(
        'import { Lesson4_6Thumbnail } from "./Lesson4_6Thumbnail";',
        'import { Lesson4_6Thumbnail } from "./Lesson4_6Thumbnail";\n' + import_video + '\n' + import_thumb
    )

# Add Composition for Lesson4-7
composition_code = '''
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
      />'''

if "Lesson4-7" not in content:
    # Find the Lesson4-6-Thumbnail Still and add after it
    pattern = r'(<Still\s+id="Lesson4-6-Thumbnail"[^/]*/>)'
    match = re.search(pattern, content)
    if match:
        content = content.replace(match.group(1), match.group(1) + composition_code)

# Write back
with open(ROOT_PATH, "w", encoding="utf-8") as f:
    f.write(content)

print("Root.tsx updated with Lesson 4-7 components")
