# Fix backticks in curriculum.ts content fields
# Triple backticks inside template literals need to be escaped

import re

with open('ai-education-web/src/data/curriculum.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace ``` with \`\`\` (escaped backticks)
# But only inside content: ` ... ` sections

# First, let's find content sections and process them
result = []
i = 0
in_content = False
content_start_pattern = "content: `"

while i < len(content):
    if not in_content:
        # Look for content: `
        idx = content.find(content_start_pattern, i)
        if idx == -1:
            result.append(content[i:])
            break
        # Add everything up to and including "content: `"
        result.append(content[i:idx + len(content_start_pattern)])
        i = idx + len(content_start_pattern)
        in_content = True
    else:
        # Find the closing backtick (not escaped, not part of ```)
        # We need to find ` that closes the template literal
        # This is tricky - the closing ` will be followed by newline and spaces then }

        # Find the next lesson or end of array
        next_lesson = content.find('\n      },\n      {', i)
        next_end = content.find('\n      }\n    ]', i)

        if next_lesson == -1:
            next_lesson = float('inf')
        if next_end == -1:
            next_end = float('inf')

        end_marker = min(next_lesson, next_end)

        if end_marker == float('inf'):
            # Last content, find closing
            end_marker = len(content)

        # Find the closing backtick before end_marker
        # It should be just a ` followed by newline
        close_idx = content.rfind('\n`\n', i, int(end_marker) + 10)
        if close_idx == -1:
            close_idx = content.rfind('`\n      }', i, int(end_marker) + 20)
            if close_idx != -1:
                close_idx += 1  # Move past the newline before `

        if close_idx == -1:
            # Fallback: just copy as-is
            result.append(content[i:])
            break

        # Content section from i to close_idx
        content_section = content[i:close_idx]

        # Escape triple backticks
        # ``` -> \`\`\`
        escaped_section = content_section.replace('```', '\\`\\`\\`')

        result.append(escaped_section)
        i = close_idx
        in_content = False

final_content = ''.join(result)

with open('ai-education-web/src/data/curriculum.ts', 'w', encoding='utf-8') as f:
    f.write(final_content)

print("Done! Escaped backticks in content fields.")

# Verify
with open('ai-education-web/src/data/curriculum.ts', 'r', encoding='utf-8') as f:
    verify = f.read()

lines = verify.split('\n')
for i in range(55, 75):
    if i < len(lines):
        print(f'{i+1}: {lines[i][:80]}')
