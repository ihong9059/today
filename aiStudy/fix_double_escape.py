# Fix double escape issue in curriculum.ts
# \\` -> \`

with open('ai-education-web/src/data/curriculum.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace double backslash before backtick with single backslash
fixed = content.replace('\\\\`', '\\`')

with open('ai-education-web/src/data/curriculum.ts', 'w', encoding='utf-8') as f:
    f.write(fixed)

print("Fixed double escapes!")

# Verify lines 58-65
with open('ai-education-web/src/data/curriculum.ts', 'r', encoding='utf-8') as f:
    lines = f.read().split('\n')

print("\nLines 58-68:")
for i in range(57, 68):
    if i < len(lines):
        print(f'{i+1}: {lines[i]}')
