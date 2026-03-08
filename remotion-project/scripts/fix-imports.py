# Fix imports and add GlobalOverlay/LevelBadge components to Lesson2_5~2_8
import re

files_to_fix = [
    ("src/Lesson2_5Video.tsx", "#ff6b35", "Level 2-5"),
    ("src/Lesson2_6Video.tsx", "#e040fb", "Level 2-6"),
    ("src/Lesson2_7Video.tsx", "#4caf50", "Level 2-7"),
    ("src/Lesson2_8Video.tsx", "#ff6b35", "Level 2-8"),
]

# GlobalOverlay and LevelBadge components template
components_template = '''
// ============ COLORS ============
const colors = {{
  primary: "{primary_color}",
  secondary: "#8b5cf6",
  white: "#ffffff",
  gray: {{
    300: "#d1d5db",
  }},
  math: "#10b981",
}};

// ============ HELPER FUNCTIONS ============
const fadeIn = (frame: number, delay: number = 0, duration: number = 30) =>
  Math.min(Math.max((frame - delay) / duration, 0), 1);

// ============ GLOBAL OVERLAY ============
const GlobalOverlay: React.FC = () => {{
  const frame = useCurrentFrame();
  const logoOpacity = fadeIn(frame, 0, 30);

  return (
    <>
      {{/* 왼쪽 상단 UTTEC-Lab 로고 */}}
      <div
        style={{{{
          position: "absolute",
          top: 30,
          left: 40,
          zIndex: 1000,
          opacity: logoOpacity,
          display: "flex",
          alignItems: "center",
          gap: 12,
        }}}}
      >
        <div
          style={{{{
            width: 50,
            height: 50,
            borderRadius: 12,
            background: `linear-gradient(135deg, ${{colors.primary}} 0%, ${{colors.secondary}} 100%)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: `0 4px 15px ${{colors.primary}}60`,
          }}}}
        >
          <span style={{{{ fontSize: 28, fontWeight: "bold", color: colors.white }}}}>U</span>
        </div>
        <span
          style={{{{
            fontSize: 32,
            fontWeight: "bold",
            color: colors.white,
            textShadow: `0 2px 10px rgba(0,0,0,0.5)`,
            letterSpacing: 1,
          }}}}
        >
          UTTEC-Lab
        </span>
      </div>

      {{/* 오른쪽 하단 URL */}}
      <div
        style={{{{
          position: "absolute",
          bottom: 30,
          right: 40,
          zIndex: 1000,
          opacity: logoOpacity,
          fontSize: 22,
          color: colors.gray[300],
          fontWeight: 500,
        }}}}
      >
        ai-first-step.uttec-lab.com
      </div>
    </>
  );
}};

// ============ LEVEL BADGE ============
const LevelBadge: React.FC = () => (
  <div
    style={{{{
      position: "absolute",
      top: 30,
      right: 40,
      backgroundColor: colors.math,
      padding: "10px 25px",
      borderRadius: 25,
      fontSize: 22,
      fontWeight: "bold",
      color: colors.white,
      boxShadow: `0 4px 15px ${{colors.math}}60`,
      zIndex: 1000,
    }}}}
  >
    {level}
  </div>
);

'''

for filepath, primary_color, level in files_to_fix:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Remove the import statements
    content = content.replace('import { GlobalOverlay } from "./components/GlobalOverlay";\n', '')
    content = content.replace('import { LevelBadge } from "./components/LevelBadge";\n', '')

    # Add React import if not present
    if 'import React from "react"' not in content:
        content = 'import React from "react";\n' + content

    # Find the position after LESSON_X_X_DURATION export
    match = re.search(r'(export const LESSON_\d_\d_DURATION = \d+;)', content)
    if match:
        insert_pos = match.end()
        components = components_template.format(primary_color=primary_color, level=level)
        content = content[:insert_pos] + '\n' + components + content[insert_pos:]

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

    print(f"Fixed {filepath}")

print("All files fixed!")
