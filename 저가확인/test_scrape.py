# -*- coding: utf-8 -*-
"""쿠팡 스크래핑 테스트"""

from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager
from bs4 import BeautifulSoup
import time

def get_chrome_driver():
    """Chrome 드라이버 생성 (headless 우회)"""
    options = Options()
    # headless 모드 끔 - 쿠팡이 차단하므로
    options.add_argument('--no-sandbox')
    options.add_argument('--disable-dev-shm-usage')
    options.add_argument('--disable-gpu')
    options.add_argument('--window-size=1920,1080')
    options.add_argument('--disable-blink-features=AutomationControlled')
    options.add_argument('--lang=ko-KR')
    options.add_experimental_option('excludeSwitches', ['enable-automation', 'enable-logging'])
    options.add_experimental_option('useAutomationExtension', False)

    service = Service(ChromeDriverManager().install())
    driver = webdriver.Chrome(service=service, options=options)

    # 자동화 탐지 우회
    driver.execute_cdp_cmd('Page.addScriptToEvaluateOnNewDocument', {
        'source': '''
            Object.defineProperty(navigator, 'webdriver', {
                get: () => undefined
            })
        '''
    })

    return driver

def test():
    search_url = "https://www.coupang.com/np/search?component=&q=서울우유&channel=user"
    driver = get_chrome_driver()

    try:
        driver.get(search_url)
        time.sleep(5)

        # 스크롤
        for _ in range(3):
            driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
            time.sleep(1)

        page_source = driver.page_source

        # HTML 저장
        with open("debug_page.html", "w", encoding="utf-8") as f:
            f.write(page_source)
        print("Saved HTML to debug_page.html")

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
            if products and len(products) > 0:
                print(f"  First item class: {products[0].get('class')}")

        # 상품명 찾기
        names = soup.select('[class*="name"]')
        print(f"\nElements with 'name' in class: {len(names)}")
        for name in names[:5]:
            print(f"  - {name.get('class')}: {name.get_text(strip=True)[:50]}")

        # 가격 찾기
        prices = soup.select('[class*="price"]')
        print(f"\nElements with 'price' in class: {len(prices)}")
        for price in prices[:5]:
            print(f"  - {price.get('class')}: {price.get_text(strip=True)[:30]}")

    finally:
        driver.quit()

if __name__ == "__main__":
    test()
