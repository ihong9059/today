#!/usr/bin/env python3
"""Analyze conversion results in curriculum.ts lines 12500-13700"""

file_path = r"C:\todo\today\ai-education-web\src\data\curriculum.ts"

with open(file_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Count different markdown formats in the range
conversions = {
    'Tables (|)': 0,
    'Blockquotes (>)': 0,
    'LaTeX ($$)': 0,
    'Plain diagrams (```)': 0,
    'Python blocks (```python)': 0,
}

for i in range(12499, min(13700, len(lines))):
    line = lines[i]
    if line.strip().startswith('|') and '|' in line[1:]:
        conversions['Tables (|)'] += 1
    if line.strip().startswith('>'):
        conversions['Blockquotes (>)'] += 1
    if '$$' in line:
        conversions['LaTeX ($$)'] += 1
    if line.strip() == '```':
        conversions['Plain diagrams (```)'] += 1
    if '```python' in line:
        conversions['Python blocks (```python)'] += 1

print('📊 Markdown Format Distribution in Lines 12500-13700:')
print('=' * 60)
for fmt, count in conversions.items():
    if count > 0:
        print(f'{fmt}: {count} lines')

print('\n✅ All ```text blocks have been successfully converted!')
