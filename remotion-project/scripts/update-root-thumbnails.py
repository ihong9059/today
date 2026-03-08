# Update Root.tsx to add thumbnail imports and Still components
import re

with open('src/Root.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Add thumbnail imports after Lesson2_2Thumbnail
old_import = 'import { Lesson2_2Thumbnail } from "./Lesson2_2Thumbnail";'
new_imports = '''import { Lesson2_2Thumbnail } from "./Lesson2_2Thumbnail";
import { Lesson2_3Thumbnail } from "./Lesson2_3Thumbnail";
import { Lesson2_4Thumbnail } from "./Lesson2_4Thumbnail";
import { Lesson2_5Thumbnail } from "./Lesson2_5Thumbnail";
import { Lesson2_6Thumbnail } from "./Lesson2_6Thumbnail";
import { Lesson2_7Thumbnail } from "./Lesson2_7Thumbnail";
import { Lesson2_8Thumbnail } from "./Lesson2_8Thumbnail";'''

content = content.replace(old_import, new_imports)

# Find where Lesson2-2-Thumbnail Still is and add after it
old_still = '''<Still
        id="Lesson2-2-Thumbnail"
        component={Lesson2_2Thumbnail}
        width={1920}
        height={1080}
      />'''

new_stills = '''<Still
        id="Lesson2-2-Thumbnail"
        component={Lesson2_2Thumbnail}
        width={1920}
        height={1080}
      />
      <Still
        id="Lesson2-3-Thumbnail"
        component={Lesson2_3Thumbnail}
        width={1920}
        height={1080}
      />
      <Still
        id="Lesson2-4-Thumbnail"
        component={Lesson2_4Thumbnail}
        width={1920}
        height={1080}
      />
      <Still
        id="Lesson2-5-Thumbnail"
        component={Lesson2_5Thumbnail}
        width={1920}
        height={1080}
      />
      <Still
        id="Lesson2-6-Thumbnail"
        component={Lesson2_6Thumbnail}
        width={1920}
        height={1080}
      />
      <Still
        id="Lesson2-7-Thumbnail"
        component={Lesson2_7Thumbnail}
        width={1920}
        height={1080}
      />
      <Still
        id="Lesson2-8-Thumbnail"
        component={Lesson2_8Thumbnail}
        width={1920}
        height={1080}
      />'''

content = content.replace(old_still, new_stills)

with open('src/Root.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Root.tsx updated successfully!")
