# -*- coding: utf-8 -*-
"""Playwright 테스트"""

from playwright.sync_api import sync_playwright
from bs4 import BeautifulSoup
import time

def test():
    search_url = "https://www.coupang.com/np/search?component=&q=서울우유&channel=user"

    with sync_playwright() as p:
        # headless=False로 실제 브라우저 사용
        browser = p.chromium.launch(headless=False)
        context = browser.new_context(
            viewport={'width': 1920, 'height': 1080},
            locale='ko-KR',
            user_agent='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        )
        page = context.new_page()

        try:
            page.goto(search_url, wait_until='networkidle', timeout=30000)
            time.sleep(3)

            # 스크롤
            for _ in range(3):
                page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
                time.sleep(1)

            page_source = page.content()

            # HTML 저장
            with open("debug_playwright.html", "w", encoding="utf-8") as f:
                f.write(page_source)
            print("Saved HTML to debug_playwright.html")

            soup = BeautifulSoup(page_source, 'html.parser')

            # 다양한 셀렉터 시도
            selectors = [
                'li.search-product',
                'li[class*="search-product"]',
                'ul.search-product-list li',
                'div.search-product',
                '[class*="product"]',
                'li[data-product-id]',
            ]

            for sel in selectors:
                products = soup.select(sel)
                print(f"Selector '{sel}': {len(products)} items")

            # 페이지 타이틀 확인
            print(f"\nPage title: {page.title()}")

        finally:
            browser.close()

if __name__ == "__main__":
    test()
