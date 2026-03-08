import re

file_path = r"C:\todo\today\ai-education-web\src\data\curriculum.ts"

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Count current occurrences
triple_escape_count = content.count('\\\\\\`')
print(f"Found {triple_escape_count} occurrences of triple-escaped backticks (\\\\\\`)")

# Replace all \\\` with \` (triple backslash-backtick to single backslash-backtick)
# In the file: \\\` -> \`
content = content.replace('\\\\\\`', '\\`')

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Done! All triple-escaped backticks converted to single-escaped.")
