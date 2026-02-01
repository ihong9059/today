# -*- coding: utf-8 -*-
"""HTML 구조 분석 스크립트"""

from bs4 import BeautifulSoup
import re

html_path = r"C:\Users\lenovo\Downloads\쿠팡이 추천하는 서울우유 관련 혜택과 특가.html"

with open(html_path, 'r', encoding='utf-8', errors='ignore') as f:
    html = f.read()

soup = BeautifulSoup(html, 'html.parser')

print("=" * 60)
print("HTML 구조 분석")
print("=" * 60)

# 1. 상품 관련 클래스 찾기
print("\n1. 'product' 포함 클래스:")
product_elements = soup.find_all(class_=re.compile(r'product', re.I))
classes_found = set()
for elem in product_elements[:50]:
    if elem.get('class'):
        classes_found.update(elem.get('class'))
for cls in sorted(classes_found)[:20]:
    print(f"   - {cls}")

# 2. 리스트 아이템 찾기
print("\n2. <li> 태그 클래스:")
li_elements = soup.find_all('li')
li_classes = set()
for li in li_elements[:100]:
    if li.get('class'):
        li_classes.update(li.get('class'))
for cls in sorted(li_classes)[:20]:
    print(f"   - {cls}")

# 3. 가격 관련 요소 찾기
print("\n3. 'price' 포함 클래스:")
price_elements = soup.find_all(class_=re.compile(r'price', re.I))
price_classes = set()
for elem in price_elements[:50]:
    if elem.get('class'):
        price_classes.update(elem.get('class'))
for cls in sorted(price_classes)[:20]:
    print(f"   - {cls}")

# 4. 상품명 관련 요소 찾기
print("\n4. 'name' 또는 'title' 포함 클래스:")
name_elements = soup.find_all(class_=re.compile(r'name|title', re.I))
name_classes = set()
for elem in name_elements[:50]:
    if elem.get('class'):
        name_classes.update(elem.get('class'))
for cls in sorted(name_classes)[:20]:
    print(f"   - {cls}")

# 5. 서울우유 텍스트 찾기
print("\n5. '서울우유' 텍스트 포함 요소:")
seoul_milk = soup.find_all(string=re.compile(r'서울우유'))
print(f"   총 {len(seoul_milk)}개 발견")
for text in seoul_milk[:5]:
    parent = text.parent
    print(f"   - 태그: {parent.name}, 클래스: {parent.get('class')}")
    print(f"     텍스트: {str(text)[:80]}...")

# 6. 실제 상품 구조 확인
print("\n6. 상품 카드 구조 분석:")
# 여러 셀렉터 시도
selectors = [
    'li.search-product',
    'li[class*="search-product"]',
    'div.search-product',
    'li[data-product-id]',
    'div[data-product-id]',
    'li.baby-product',
    'div.baby-product',
    'article',
    'li[class*="item"]',
    'div[class*="item"]',
]

for sel in selectors:
    items = soup.select(sel)
    if items:
        print(f"\n   셀렉터 '{sel}': {len(items)}개 발견")
        if items:
            first = items[0]
            print(f"   첫번째 아이템 클래스: {first.get('class')}")
            # 내부 구조 확인
            names = first.select('[class*="name"]')
            prices = first.select('[class*="price"]')
            print(f"   - name 요소: {len(names)}개")
            print(f"   - price 요소: {len(prices)}개")
