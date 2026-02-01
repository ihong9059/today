# -*- coding: utf-8 -*-
"""파싱 테스트"""

from bs4 import BeautifulSoup
import re

html_path = r"C:\Users\lenovo\Downloads\쿠팡이 추천하는 서울우유 관련 혜택과 특가.html"

with open(html_path, 'r', encoding='utf-8', errors='ignore') as f:
    html = f.read()

soup = BeautifulSoup(html, 'html.parser')

def extract_unit_price(text):
    pattern = r'\(100ml당\s*(\d+(?:,\d+)?)\s*원\)'
    match = re.search(pattern, text)
    if match:
        price_str = match.group(1).replace(',', '')
        return float(price_str)
    return None

def extract_sale_price(text):
    text = text.replace(',', '').replace(' ', '')
    discount_pattern = r'\d+%(\d+)원'
    match = re.search(discount_pattern, text)
    if match:
        return int(match.group(1))
    price_pattern = r'(\d+)원'
    matches = re.findall(price_pattern, text)
    if matches:
        return int(matches[-1])
    return None

# ProductUnit 클래스로 상품 찾기
products = soup.select('[class*="ProductUnit_productUnit"]')
print(f"Found {len(products)} products")

max_price_per_100ml = 300
matching = []

for product in products:
    # 상품명
    name_elem = product.select_one('[class*="productName"]')
    name = name_elem.get_text(strip=True) if name_elem else ''

    if not name:
        continue

    # 서울우유만
    if '서울우유' not in name:
        continue

    # 가격
    price_elem = product.select_one('[class*="PriceArea"]')
    price_text = price_elem.get_text(strip=True) if price_elem else ''

    # 100ml당 가격
    unit_price = extract_unit_price(price_text)
    sale_price = extract_sale_price(price_text)

    # 링크
    link_elem = product.select_one('a[href*="/products/"]')
    link = link_elem.get('href') if link_elem else ''

    print(f"\n상품: {name[:50]}...")
    print(f"  가격 텍스트: {price_text[:60]}...")
    print(f"  판매가: {sale_price}원")
    print(f"  100ml당: {unit_price}원")
    print(f"  링크: {link[:60]}..." if link else "  링크: 없음")

    if unit_price and unit_price <= max_price_per_100ml:
        matching.append({
            'name': name,
            'price': sale_price,
            'price_per_100ml': unit_price,
            'link': link
        })

print(f"\n\n{'='*60}")
print(f"300원 이하 상품: {len(matching)}개")
print('='*60)
for m in matching:
    print(f"  - {m['name'][:40]}... | {m['price_per_100ml']}원/100ml")
