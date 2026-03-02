# Fix ALL backticks in curriculum.ts content fields
# Both triple backticks (```) and single backticks (`) need to be escaped

import re

with open('ai-education-web/src/data/curriculum.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Find all content: ` ... ` sections and escape backticks within them
result = []
i = 0
content_start_pattern = "content: `"

while i < len(content):
    # Look for content: `
    idx = content.find(content_start_pattern, i)
    if idx == -1:
        result.append(content[i:])
        break

    # Add everything up to "content: `"
    result.append(content[i:idx + len(content_start_pattern)])
    i = idx + len(content_start_pattern)

    # Now find the closing backtick for this content field
    # We need to find unescaped ` that ends the template literal
    # It should be followed by newline and closing brace

    # Find next lesson marker or end of lessons array
    depth = 1
    j = i
    content_chars = []

    while j < len(content) and depth > 0:
        char = content[j]

        # Check for end of template literal
        if char == '`':
            # Check if this is the closing backtick
            # Look ahead to see if followed by typical end pattern
            remaining = content[j+1:j+20]
            if remaining.startswith('\n      },') or remaining.startswith('\n      }\n    ]') or remaining.startswith('\n    },') or remaining.startswith('\n    }\n  ]'):
                # This is the closing backtick
                depth = 0
                break
            else:
                # This is a backtick inside content - escape it
                content_chars.append('\\`')
                j += 1
                continue

        content_chars.append(char)
        j += 1

    # Add escaped content
    result.append(''.join(content_chars))
    i = j

final_content = ''.join(result)

with open('ai-education-web/src/data/curriculum.ts', 'w', encoding='utf-8') as f:
    f.write(final_content)

print("Done! All backticks escaped.")

# Verify line 76
with open('ai-education-web/src/data/curriculum.ts', 'r', encoding='utf-8') as f:
    lines = f.read().split('\n')

print("\nLines 74-80:")
for i in range(73, 80):
    if i < len(lines):
        print(f'{i+1}: {lines[i]}')
