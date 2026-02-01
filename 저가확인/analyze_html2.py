# -*- coding: utf-8 -*-
"""상품 구조 상세 분석"""

from bs4 import BeautifulSoup
import re

html_path = r"C:\Users\lenovo\Downloads\쿠팡이 추천하는 서울우유 관련 혜택과 특가.html"

with open(html_path, 'r', encoding='utf-8', errors='ignore') as f:
    html = f.read()

soup = BeautifulSoup(html, 'html.parser')

print("=" * 60)
print("상품 구조 상세 분석")
print("=" * 60)

# ProductUnit 클래스로 상품 찾기
products = soup.select('[class*="ProductUnit_productUnit"]')
print(f"\nProductUnit 발견: {len(products)}개")

if products:
    print("\n첫 번째 상품 구조:")
    first = products[0]
    print(f"태그: {first.name}")
    print(f"클래스: {first.get('class')}")

    # 상품명 찾기
    name_elem = first.select_one('[class*="productName"]')
    if name_elem:
        print(f"\n상품명 요소:")
        print(f"  태그: {name_elem.name}")
        print(f"  클래스: {name_elem.get('class')}")
        print(f"  텍스트: {name_elem.get_text(strip=True)[:100]}")

    # 가격 찾기
    price_elem = first.select_one('[class*="Price"]')
    if price_elem:
        print(f"\n가격 요소:")
        print(f"  태그: {price_elem.name}")
        print(f"  클래스: {price_elem.get('class')}")
        print(f"  텍스트: {price_elem.get_text(strip=True)[:50]}")

    # 링크 찾기
    link_elem = first.select_one('a[href*="/products/"]')
    if not link_elem:
        link_elem = first.select_one('a')
    if link_elem:
        print(f"\n링크 요소:")
        print(f"  href: {link_elem.get('href')[:100] if link_elem.get('href') else 'None'}")

    # 전체 내부 텍스트 확인
    print(f"\n전체 텍스트:")
    print(first.get_text(strip=True, separator=' | ')[:300])

# 모든 상품 출력
print("\n" + "=" * 60)
print("모든 상품 목록:")
print("=" * 60)

for i, product in enumerate(products[:10]):
    name_elem = product.select_one('[class*="productName"]')
    name = name_elem.get_text(strip=True) if name_elem else "이름 없음"

    # 가격 찾기 - 여러 방법 시도
    price_text = ""
    price_elem = product.select_one('[class*="price"]')
    if price_elem:
        price_text = price_elem.get_text(strip=True)

    print(f"\n{i+1}. {name[:60]}")
    print(f"   가격: {price_text}")
