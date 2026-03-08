#!/usr/bin/env python3
"""
Update Root.tsx to add Lesson 4-2 components
"""

import re

ROOT_PATH = r"C:\todo\today\remotion-project\src\Root.tsx"

# Read current file
with open(ROOT_PATH, "r", encoding="utf-8") as f:
    content = f.read()

# Check if already has Lesson 4-2
if "Lesson4_2Video" in content:
    print("Lesson 4-2 already exists in Root.tsx")
else:
    # Add imports after Lesson4_1Video import
    import_pattern = r'(import \{ Lesson4_1Video, LESSON_4_1_DURATION \} from "\./Lesson4_1Video";)'
    import_replacement = r'''\1
import { Lesson4_2Video, LESSON_4_2_DURATION } from "./Lesson4_2Video";'''
    content = re.sub(import_pattern, import_replacement, content)

    # Add thumbnail import after Lesson4_1Thumbnail
    thumb_pattern = r'(import \{ Lesson4_1Thumbnail \} from "\./Lesson4_1Thumbnail";)'
    thumb_replacement = r'''\1
import { Lesson4_2Thumbnail } from "./Lesson4_2Thumbnail";'''
    content = re.sub(thumb_pattern, thumb_replacement, content)

    # Add video composition after Lesson4-1 video composition
    video_comp_pattern = r'(<Composition\s+id="Lesson4-1"[^>]*>[\s\S]*?</Composition>)'
    video_comp_replacement = r'''\1

      <Composition
        id="Lesson4-2"
        component={Lesson4_2Video}
        durationInFrames={LESSON_4_2_DURATION}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />'''
    content = re.sub(video_comp_pattern, video_comp_replacement, content)

    # Add thumbnail composition after Lesson4-1-Thumbnail
    thumb_comp_pattern = r'(<Composition\s+id="Lesson4-1-Thumbnail"[^>]*/>)'
    thumb_comp_replacement = r'''\1
      <Composition
        id="Lesson4-2-Thumbnail"
        component={Lesson4_2Thumbnail}
        durationInFrames={1}
        fps={30}
        width={1920}
        height={1080}
      />'''
    content = re.sub(thumb_comp_pattern, thumb_comp_replacement, content)

    # Write updated file
    with open(ROOT_PATH, "w", encoding="utf-8") as f:
        f.write(content)

    print("Root.tsx updated successfully with Lesson 4-2")
