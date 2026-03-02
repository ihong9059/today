import re

with open('C:/todo/today/aiStudy/ai-education-web/src/data/curriculum.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace escaped backticks patterns
# \\\` -> ` (escaped backtick to backtick)
# The file shows \`  which means a backslash followed by backtick

# Replace backslash-backtick with just backtick
content = content.replace('\\`', '`')

with open('C:/todo/today/aiStudy/ai-education-web/src/data/curriculum.ts', 'w', encoding='utf-8') as f:
    f.write(content)

print('Fixed escaped backticks')
