# -*- coding: utf-8 -*-
"""API 테스트"""
import requests

html_path = r"C:\Users\lenovo\Downloads\쿠팡이 추천하는 서울우유 관련 혜택과 특가.html"

with open(html_path, 'rb') as f:
    files = {'file': ('test.html', f, 'text/html')}
    response = requests.post('http://localhost:5000/api/upload', files=files)

data = response.json()
print(f"Success: {data.get('success')}")
print(f"Count: {data.get('count')}")
print(f"Threshold: {data.get('threshold')}")

if data.get('products'):
    print("\n300원 이하 상품:")
    for p in data['products']:
        print(f"  - {p['name'][:50]}... | {p['price_per_100ml']}원/100ml")
