#!/usr/bin/env python3
"""Find ```text blocks in curriculum.ts lines 12500-13700"""

file_path = r"C:\todo\today\ai-education-web\src\data\curriculum.ts"

with open(file_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

print("Finding ```text blocks in lines 12500-13700:")
print("=" * 60)

for i in range(12499, min(13700, len(lines))):
    if '```text' in lines[i]:
        print(f"Line {i+1}: ```text block found")
        # Show context (next few lines)
        for j in range(i, min(i+5, len(lines))):
            print(f"  {j+1}: {lines[j].rstrip()}")
        print()
