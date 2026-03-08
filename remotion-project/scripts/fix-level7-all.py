import os

# 잘못된 JSX 스타일 블록
wrong_style = '''            <div style={
              width: 300, height: 300,
              background: "rgba(139,92,246,0.2)",
              borderRadius: 20,
              display: "flex", justifyContent: "center", alignItems: "center",
              border: `3px solid ${COLORS.primary}`,
              transform: `scale(${1 + Math.sin(frame * 0.05) * 0.05})`
            }}>'''

# 올바른 JSX 스타일 블록
correct_style = '''            <div style={{
              width: 300, height: 300,
              background: "rgba(139,92,246,0.2)",
              borderRadius: 20,
              display: "flex", justifyContent: "center", alignItems: "center",
              border: `3px solid ${COLORS.primary}`,
              transform: `scale(${1 + Math.sin(frame * 0.05) * 0.05})`
            }}>'''

src_dir = "src"

for i in range(2, 9):  # 2-8 (1은 이미 수정됨)
    video_file = f"{src_dir}/Lesson7_{i}Video.tsx"

    if not os.path.exists(video_file):
        print(f"File not found: {video_file}")
        continue

    with open(video_file, 'r', encoding='utf-8') as f:
        content = f.read()

    if wrong_style in content:
        content = content.replace(wrong_style, correct_style)
        with open(video_file, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Fixed: {video_file}")
    else:
        print(f"Pattern not found in: {video_file}")

print("\nDone!")
