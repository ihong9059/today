#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
HTML에서 Base64 이미지 추출
"""

import re
import base64
import os

HTML_PATH = "/Users/maeg/Downloads/Object Foundry-saved (2).html"
OUTPUT_DIR = "/Users/maeg/todo/today/aiTest/boltTest/sample/extracted"

os.makedirs(OUTPUT_DIR, exist_ok=True)

# HTML 파일 읽기
with open(HTML_PATH, 'r', encoding='utf-8') as f:
    content = f.read()

# Base64 이미지 패턴 찾기
pattern = r'data:image/(png|jpeg|jpg|webp);base64,([A-Za-z0-9+/=]+)'
matches = re.findall(pattern, content)

print(f"총 {len(matches)}개의 이미지 발견")
print("-" * 50)

for i, (img_type, img_data) in enumerate(matches, 1):
    try:
        # Base64 디코딩
        img_bytes = base64.b64decode(img_data)

        # 파일 저장
        ext = 'jpg' if img_type == 'jpeg' else img_type
        filename = f"image_{i:02d}.{ext}"
        filepath = os.path.join(OUTPUT_DIR, filename)

        with open(filepath, 'wb') as f:
            f.write(img_bytes)

        # 파일 크기
        size_kb = len(img_bytes) / 1024
        print(f"  [{i:02d}] {filename} ({size_kb:.1f} KB)")

    except Exception as e:
        print(f"  [{i:02d}] Error: {e}")

print("-" * 50)
print(f"저장 위치: {OUTPUT_DIR}")
