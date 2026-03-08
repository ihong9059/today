#!/usr/bin/env python3
"""Simple script to convert specific ```text blocks in curriculum.ts"""

file_path = r"C:\todo\today\ai-education-web\src\data\curriculum.ts"

# Read the file
with open(file_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

conversions = 0

# Target lines (from Grep search): 13501, 13531, 13565, 13638, 13700, 13788, 13809, 13829, 14427, 15940, 16011, 16132
# We need to check these and convert them appropriately

target_conversions = [
    # Line 13501: Explanation block → plain block
    (13501, '\\`\\`\\`text\n', '\\`\\`\\`\n'),

    # Line 13531: Explanation block → plain block
    (13531, '\\`\\`\\`text\n', '\\`\\`\\`\n'),

    # Line 13565: Explanation block → plain block
    (13565, '\\`\\`\\`text\n', '\\`\\`\\`\n'),

    # Line 13700: Prompt techniques → plain block
    (13700, '\\`\\`\\`text\n', '\\`\\`\\`\n'),

    # Line 13809: Limitations → plain block
    (13809, '\\`\\`\\`text\n', '\\`\\`\\`\n'),

    # Line 13829: Development → plain block
    (13829, '\\`\\`\\`text\n', '\\`\\`\\`\n'),

    # Line 14427: Python code → ```python
    (14427, '\\`\\`\\`text\n', '\\`\\`\\`python\n'),

    # Line 15940: ASCII diagram → plain block
    (15940, '\\`\\`\\`text\n', '\\`\\`\\`\n'),

    # Line 16011: ASCII diagram → plain block
    (16011, '\\`\\`\\`text\n', '\\`\\`\\`\n'),

    # Line 16132: Bash commands → ```bash
    (16132, '\\`\\`\\`text\n', '\\`\\`\\`bash\n'),
]

for line_num, old_text, new_text in target_conversions:
    idx = line_num - 1  # Convert to 0-indexed
    if idx < len(lines) and old_text in lines[idx]:
        lines[idx] = lines[idx].replace(old_text, new_text)
        conversions += 1
        print(f"✓ Line {line_num}: {old_text.strip()} → {new_text.strip()}")
    else:
        print(f"⚠ Line {line_num}: Pattern not found or already converted")

# Special conversion for line 13638: Scaling Laws (needs multi-line replacement with blockquote + LaTeX)
scaling_law_start_idx = 13638 - 1
if scaling_law_start_idx < len(lines) and '\\`\\`\\`text\n' in lines[scaling_law_start_idx]:
    # Find the closing ```
    end_idx = scaling_law_start_idx + 1
    while end_idx < len(lines) and '\\`\\`\\`\n' not in lines[end_idx]:
        end_idx += 1

    if end_idx < len(lines):
        # Extract content
        content_lines = lines[scaling_law_start_idx + 1:end_idx]
        content = ''.join(content_lines)

        # Check if this is the Scaling Laws block
        if '2020년 OpenAI의 연구에서 발견:' in content and 'L(N, D) ~ a/N^alpha' in content:
            # Replace with blockquote version
            new_content = [
                '> 2020년 OpenAI의 연구에서 발견:\n',
                '>\n',
                '> 모델 성능(Loss)은 세 가지에 의해 예측 가능하게 개선됩니다:\n',
                '>\n',
                '> 1) 모델 크기 (N): 파라미터 수\n',
                '> 2) 데이터 크기 (D): 학습 토큰 수\n',
                '> 3) 컴퓨팅 (C): 학습에 투입한 연산량\n',
                '>\n',
                '> $L(N, D) \\\\sim a/N^{\\\\alpha} + b/D^{\\\\beta} + c$\n',
                '>\n',
                '> 핵심 통찰:\n',
                '> - 세 요소를 동시에 늘려야 효과적\n',
                '> - 모델만 키우고 데이터가 부족하면 비효율\n',
                '> - 데이터만 많고 모델이 작으면 한계\n',
                '> - 로그 스케일에서 거의 직선적으로 개선\n',
            ]
            # Replace lines
            lines[scaling_law_start_idx:end_idx+1] = new_content
            conversions += 1
            print(f"✓ Line 13638: Scaling Laws converted to blockquote with LaTeX")

# Special conversion for line 13788: LLM structure (convert to blockquote)
llm_struct_idx = 13788 - 1
if llm_struct_idx < len(lines) and '\\`\\`\\`text\n' in lines[llm_struct_idx]:
    end_idx = llm_struct_idx + 1
    while end_idx < len(lines) and '\\`\\`\\`\n' not in lines[end_idx]:
        end_idx += 1

    if end_idx < len(lines):
        content_lines = lines[llm_struct_idx + 1:end_idx]
        content = ''.join(content_lines)

        if '거의 모든 현대 LLM은 동일한 기본 구조를 공유합니다:' in content:
            new_content = [
                '> 거의 모든 현대 LLM은 동일한 기본 구조를 공유합니다:\n',
                '>\n',
                '> 1) Decoder-only Transformer (GPT 스타일)\n',
                '> 2) Next Token Prediction으로 Pre-training\n',
                '> 3) SFT + RLHF (또는 유사한 정렬 기법)\n',
                '>\n',
                '> 차이점:\n',
                '>   - 모델 크기와 아키텍처 세부 사항\n',
                '>   - 학습 데이터의 구성과 양\n',
                '>   - 정렬(Alignment) 방법의 차이\n',
                '>   - 컨텍스트 윈도우 크기\n',
                '>   - 멀티모달 지원 여부\n',
            ]
            lines[llm_struct_idx:end_idx+1] = new_content
            conversions += 1
            print(f"✓ Line 13788: LLM structure converted to blockquote")

# Write back
with open(file_path, 'w', encoding='utf-8') as f:
    f.writelines(lines)

print(f"\n✅ Completed {conversions} conversions!")
print(f"Updated file: {file_path}")
