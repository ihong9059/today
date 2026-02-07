from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    # iPhone 12 에뮬레이션
    iphone = p.devices['iPhone 12']
    browser = p.chromium.launch(headless=True)
    context = browser.new_context(**iphone)
    page = context.new_page()

    # 콘솔 로그 캡처
    console_logs = []
    page.on("console", lambda msg: console_logs.append(f"{msg.type}: {msg.text}"))

    print("=== 모바일 지도 테스트 ===")

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

    # 지도까지 스크롤
    page.evaluate('document.getElementById("route-preview-map").scrollIntoView()')
    page.wait_for_timeout(1000)
    page.screenshot(path='mobile_map_scroll.png')
    print("지도까지 스크롤 후 스크린샷 저장")

    # 지도 내부 구조 확인
    map_html = page.evaluate('''() => {
        const map = document.getElementById("route-preview-map");
        return {
            innerHTML: map ? map.innerHTML.substring(0, 500) : "없음",
            style: map ? window.getComputedStyle(map).cssText : "없음",
            offsetHeight: map ? map.offsetHeight : 0,
            offsetWidth: map ? map.offsetWidth : 0,
            children: map ? map.children.length : 0
        };
    }''')
    print(f"\n지도 요소 정보:")
    print(f"  크기: {map_html['offsetWidth']}x{map_html['offsetHeight']}")
    print(f"  자식 요소 수: {map_html['children']}")
    print(f"  내부 HTML (500자): {map_html['innerHTML'][:200]}...")

    # Leaflet 객체 확인
    leaflet_check = page.evaluate('''() => {
        return {
            hasRoutePreviewMap: typeof routePreviewMap !== 'undefined' && routePreviewMap !== null,
            leafletLoaded: typeof L !== 'undefined'
        };
    }''')
    print(f"\nLeaflet 상태: {leaflet_check}")

    # 콘솔 에러 출력
    errors = [log for log in console_logs if 'error' in log.lower()]
    if errors:
        print(f"\n=== 콘솔 에러 ===")
        for err in errors:
            print(err)

    browser.close()
