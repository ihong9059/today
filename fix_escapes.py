import re

file_path = r"C:\todo\today\ai-education-web\src\data\curriculum.ts"

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace \\\` with \` (triple-escaped to single-escaped)
# In the file: \\\`\\\`\\\`python -> \`\`\`python
old_pattern = r'\\\`\\\`\\\`python'
new_pattern = r'\`\`\`python'

count = len(re.findall(old_pattern, content))
print(f"Found {count} occurrences of triple-escaped python blocks")

content = content.replace('\\\\\\`\\\\\\`\\\\\\`python', '\\`\\`\\`python')
content = content.replace('\\\\\\`\\\\\\`\\\\\\`', '\\`\\`\\`')

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Done!")
