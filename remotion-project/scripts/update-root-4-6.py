#!/usr/bin/env python3
"""Update Root.tsx to add Lesson 4-6 components"""

import re

ROOT_PATH = r"C:\todo\today\remotion-project\src\Root.tsx"

# Read the file
with open(ROOT_PATH, "r", encoding="utf-8") as f:
    content = f.read()

# Add import for Lesson4_6Video
import_video = 'import { Lesson4_6Video, LESSON_4_6_DURATION } from "./Lesson4_6Video";'
import_thumb = 'import { Lesson4_6Thumbnail } from "./Lesson4_6Thumbnail";'

# Find the last Lesson4_5 import and add after it
if "Lesson4_6Video" not in content:
    content = content.replace(
        'import { Lesson4_5Thumbnail } from "./Lesson4_5Thumbnail";',
        'import { Lesson4_5Thumbnail } from "./Lesson4_5Thumbnail";\n' + import_video + '\n' + import_thumb
    )

# Add Composition for Lesson4-6
composition_code = '''
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
      />'''

if "Lesson4-6" not in content:
    # Find the Lesson4-5-Thumbnail Still and add after it
    pattern = r'(<Still\s+id="Lesson4-5-Thumbnail"[^/]*/>)'
    match = re.search(pattern, content)
    if match:
        content = content.replace(match.group(1), match.group(1) + composition_code)

# Write back
with open(ROOT_PATH, "w", encoding="utf-8") as f:
    f.write(content)

print("Root.tsx updated with Lesson 4-6 components")
