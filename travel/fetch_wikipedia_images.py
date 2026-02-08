#!/usr/bin/env python3
"""
Wikipedia API를 사용하여 관광지 이미지 수집
"""

import json
import requests
import urllib.parse
import time
import re

HEADERS = {'User-Agent': 'TravelGuideApp/1.0 (contact@example.com)'}

def clean_name_for_search(name):
    """검색용 이름 정리 - 한글/일본어/중국어 등 제거하고 영문만"""
    # 괄호 안의 내용 제거
    name = re.sub(r'\s*\([^)]*\)', '', name)
    # 특수문자 제거
    name = re.sub(r'[^\w\s-]', '', name)
    return name.strip()

def search_wikipedia_image(query, fallback_queries=None):
    """Wikipedia에서 이미지 검색"""
    queries_to_try = [query]
    if fallback_queries:
        queries_to_try.extend(fallback_queries)

    for q in queries_to_try:
        clean_q = clean_name_for_search(q)
        if not clean_q:
            continue

        url = f'https://en.wikipedia.org/w/api.php?action=query&titles={urllib.parse.quote(clean_q)}&prop=pageimages&format=json&pithumbsize=600'

        try:
            response = requests.get(url, headers=HEADERS, timeout=10)
            if response.status_code == 200:
                data = response.json()
                pages = data.get('query', {}).get('pages', {})

                for page_id, page in pages.items():
                    if page_id != '-1' and 'thumbnail' in page:
                        return page['thumbnail']['source']
        except Exception as e:
            print(f"    Error: {e}")
            continue

    return None

def main():
    # 기존 데이터 로드
    with open("attractions_famous.json", "r", encoding="utf-8") as f:
        data = json.load(f)

    total = 0
    found = 0

    for airport_code, attractions in data.items():
        print(f"\n=== {airport_code} ===")

        for attraction in attractions:
            total += 1
            name = attraction.get('name', '')

            # 검색어 준비 (원래 이름 + 정리된 이름)
            image_url = search_wikipedia_image(name)

            if image_url:
                attraction['image'] = image_url
                found += 1
                print(f"  ✓ {name[:40]}")
            else:
                print(f"  ✗ {name[:40]}")

            time.sleep(0.2)  # Rate limiting

    # 저장
    with open("attractions_with_images.json", "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

    print(f"\n\nTotal: {total} attractions")
    print(f"Found images: {found} ({found*100//total}%)")
    print("Saved to attractions_with_images.json")

if __name__ == "__main__":
    main()
