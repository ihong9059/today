# -*- coding: utf-8 -*-
"""undetected-chromedriver 테스트"""

import undetected_chromedriver as uc
from bs4 import BeautifulSoup
import time

def test():
    search_url = "https://www.coupang.com/np/search?component=&q=서울우유&channel=user"

    options = uc.ChromeOptions()
    options.add_argument('--lang=ko-KR')
    options.add_argument('--window-size=1920,1080')

    driver = uc.Chrome(options=options, use_subprocess=True)

    try:
        driver.get(search_url)
        time.sleep(5)

        # 스크롤
        for _ in range(3):
            driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
            time.sleep(1)

        page_source = driver.page_source

        # HTML 저장
        with open("debug_page2.html", "w", encoding="utf-8") as f:
            f.write(page_source)
        print("Saved HTML to debug_page2.html")

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
        print(f"\nPage title: {driver.title}")

    finally:
        driver.quit()

if __name__ == "__main__":
    test()
