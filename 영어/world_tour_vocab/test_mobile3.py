from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    # iPhone 12 에뮬레이션
    iphone = p.devices['iPhone 12']
    browser = p.chromium.launch(headless=True)
    context = browser.new_context(**iphone)
    page = context.new_page()

    print("=== 모바일 전체 페이지 테스트 ===")

    page.goto('http://178.128.90.37:10000')
    page.wait_for_load_state('networkidle')
    page.wait_for_timeout(2000)

    # 새 게임 시작 클릭
    page.click('button.new-game')
    page.wait_for_timeout(1000)

    # 초급 선택
    page.click('[data-level="beginner"]')
    page.wait_for_timeout(500)

    # 다음 버튼 클릭
    page.click('#to-route-btn')
    page.wait_for_timeout(2000)

    # 전체 페이지 스크린샷 (스크롤 포함)
    page.screenshot(path='mobile_full_page.png', full_page=True)
    print("전체 페이지 스크린샷 저장: mobile_full_page.png")

    # route-card 요소들 확인
    route_cards = page.query_selector_all('.route-card')
    print(f"\n경로 카드 수: {len(route_cards)}")

    for i, card in enumerate(route_cards):
        box = card.bounding_box()
        visible = card.is_visible()
        print(f"  카드 {i+1}: visible={visible}, box={box}")

    browser.close()
