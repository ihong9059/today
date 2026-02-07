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

    print("=== 모바일 테스트 시작 ===")
    print(f"Viewport: {iphone['viewport']}")

    page.goto('http://178.128.90.37:10000')
    page.wait_for_load_state('networkidle')
    page.wait_for_timeout(2000)

    # 스크린샷 저장
    page.screenshot(path='mobile_test_1_main.png')
    print("1. 메인 화면 스크린샷 저장")

    # 새 게임 시작 클릭
    page.click('button.new-game')
    page.wait_for_timeout(1000)
    page.screenshot(path='mobile_test_2_level.png')
    print("2. 난이도 선택 화면 스크린샷 저장")

    # 초급 선택
    page.click('[data-level="beginner"]')
    page.wait_for_timeout(500)

    # 다음 버튼 클릭
    page.click('#to-route-btn')
    page.wait_for_timeout(2000)
    page.screenshot(path='mobile_test_3_route.png')
    print("3. 경로 선택 화면 스크린샷 저장")

    # 지도 요소 확인
    route_map = page.query_selector('#route-preview-map')
    if route_map:
        box = route_map.bounding_box()
        print(f"route-preview-map 크기: {box}")
    else:
        print("route-preview-map 요소를 찾을 수 없음")

    # Leaflet 지도 컨테이너 확인
    leaflet_container = page.query_selector('#route-preview-map .leaflet-container')
    if leaflet_container:
        print("Leaflet 컨테이너 존재함")
    else:
        print("Leaflet 컨테이너 없음 - 지도 초기화 실패")

    # 타일 레이어 확인
    tiles = page.query_selector('#route-preview-map .leaflet-tile-pane img')
    if tiles:
        print("지도 타일 로드됨")
    else:
        print("지도 타일 없음")

    # 콘솔 에러 출력
    print("\n=== 콘솔 로그 ===")
    for log in console_logs:
        print(log)

    browser.close()
