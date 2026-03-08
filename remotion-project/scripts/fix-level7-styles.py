import re
import os

# Level 7 Video 파일들의 style 문법 오류 수정
src_dir = "src"

for i in range(1, 9):
    video_file = f"{src_dir}/Lesson7_{i}Video.tsx"

    if not os.path.exists(video_file):
        print(f"File not found: {video_file}")
        continue

    with open(video_file, 'r', encoding='utf-8') as f:
        content = f.read()

    # 문제가 되는 패턴: style={\n              width: 300, height: 300,
    # 수정할 패턴: style={{ width: 300, height: 300,

    # 멀티라인 style 블록을 찾아서 수정
    # style={\n  로 시작하는 패턴 찾기
    pattern = r'style=\{\s*\n\s*width:'
    replacement = 'style={{\n              width:'
    content = re.sub(pattern, replacement, content)

    # }}> 가 }}>로 되어있는 경우 수정 (이미 맞는 경우도 있으므로 주의)
    # transform: ... 뒤의 }}>를 }}}}>로 수정 (단 이미 }}}>는 건너뜀)
    content = re.sub(r'\}\}\}>', '}}}>', content)  # 이미 3개인 경우 임시 마킹
    content = re.sub(r'(\*\s*0\.05\)\s*\`)(\s*\}\}>)', r'\1\n            }}>', content)

    # 다른 방식으로 수정: 각 Scene 함수 내의 문제가 되는 div 블록 수정
    # <div style={
    #   width: 300, height: 300,
    #   ...
    #   transform: `scale(${1 + Math.sin(frame * 0.05) * 0.05})`
    # }}>

    # 전체적으로 다시 접근: 잘못된 패턴을 정확히 찾기
    # style={\s*\n\s*width: 300, height: 300, 로 시작하는 블록

    with open(video_file, 'w', encoding='utf-8') as f:
        f.write(content)

    print(f"Processed: {video_file}")

print("Done!")
