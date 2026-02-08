#!/usr/bin/env python3
"""
추가 공항들의 관광지 수집
"""

import json
import requests
import time

API_KEY = "KSLUXCUNDUD4NBZT5QFI0Y31SJOHBWK25Y2FC3JNGVRX0HAK"
BASE_URL = "https://places-api.foursquare.com"
HEADERS = {
    "Accept": "application/json",
    "Authorization": f"Bearer {API_KEY}",
    "X-Places-Api-Version": "2025-06-17"
}

TOURIST_CATEGORIES = [
    "16000", "10000", "12000", "16032", "16020", "10027", "12099",
]

# 추가 공항 좌표
ADDITIONAL_AIRPORTS = {
    # Asia - 추가
    "TAE": (35.8941, 128.6587),    # 대구
    "ITM": (34.7854, 135.4384),    # 오사카 이타미
    "NGO": (34.8584, 136.8054),    # 나고야
    "PKX": (39.5098, 116.4105),    # 베이징 다싱
    "SHA": (31.1979, 121.3363),    # 상하이 훙차오
    "SZX": (22.6393, 113.8108),    # 선전
    "CTU": (30.5785, 103.9471),    # 청두
    "XIY": (34.4471, 108.7515),    # 시안
    "HGH": (30.2295, 120.4344),    # 항저우
    "TSA": (25.0694, 121.5524),    # 타이페이 쑹산
    "KHH": (22.5771, 120.3500),    # 가오슝
    "DMK": (13.9126, 100.6068),    # 돈므앙
    "HKT": (8.1132, 98.3169),      # 푸켓
    "CNX": (18.7669, 98.9626),     # 치앙마이
    "PEN": (5.2972, 100.2766),     # 페낭
    "BKI": (5.9372, 116.0513),     # 코타키나발루
    "CXR": (11.9981, 109.2194),    # 나트랑
    "CRK": (15.1860, 120.5603),    # 클락
    "SUB": (-7.3798, 112.7876),    # 수라바야
    "BLR": (13.1986, 77.7066),     # 방갈로르
    "MAA": (12.9941, 80.1709),     # 첸나이
    "CCU": (22.6547, 88.4467),     # 콜카타
    "HYD": (17.2403, 78.4294),     # 하이데라바드
    "DWC": (24.8960, 55.1614),     # 알 막툼
    "AUH": (24.4330, 54.6511),     # 아부다비
    "SHJ": (25.3286, 55.5172),     # 샤르자
    "JED": (21.6796, 39.1565),     # 제다
    "RUH": (24.9576, 46.6988),     # 리야드
    "DMM": (26.4712, 49.7979),     # 담맘
    "TLV": (32.0055, 34.8854),     # 텔아비브
    "SAW": (40.8986, 29.3092),     # 사비하 괵첸
    "ESB": (40.1281, 32.9951),     # 앙카라
    "AYT": (36.8987, 30.8005),     # 안탈리아

    # Europe - 추가
    "LGW": (51.1537, -0.1821),     # 개트윅
    "STN": (51.8860, 0.2389),      # 스탠스테드
    "LTN": (51.8747, -0.3683),     # 루턴
    "LCY": (51.5048, 0.0495),      # 런던 시티
    "MAN": (53.3537, -2.2750),     # 맨체스터
    "BHX": (52.4539, -1.7480),     # 버밍엄
    "ORY": (48.7233, 2.3795),      # 오를리
    "NCE": (43.6584, 7.2159),      # 니스
    "LYS": (45.7256, 5.0811),      # 리옹
    "MRS": (43.4393, 5.2214),      # 마르세유
    "BER": (52.3667, 13.5033),     # 베를린
    "DUS": (51.2895, 6.7668),      # 뒤셀도르프
    "HAM": (53.6304, 9.9882),      # 함부르크
    "CGN": (50.8659, 7.1427),      # 쾰른
    "STR": (48.6899, 9.2220),      # 슈투트가르트
    "EIN": (51.4501, 5.3743),      # 에인트호번
    "RTM": (51.9569, 4.4372),      # 로테르담
    "BRU": (50.9014, 4.4844),      # 브뤼셀
    "CRL": (50.4592, 4.4538),      # 샤를루아
    "CIA": (41.7994, 12.5949),     # 치암피노
    "MXP": (45.6301, 8.7231),      # 말펜사
    "LIN": (45.4495, 9.2782),      # 리나테
    "VCE": (45.5053, 12.3519),     # 베니스
    "NAP": (40.8860, 14.2908),     # 나폴리
    "FLR": (43.8100, 11.2051),     # 피렌체
    "PMI": (39.5517, 2.7388),      # 팔마
    "AGP": (36.6749, -4.4991),     # 말라가
    "ALC": (38.2822, -0.5582),     # 알리칸테
    "VLC": (39.4893, -0.4816),     # 발렌시아
    "SVQ": (37.4180, -5.8931),     # 세비야
    "IBZ": (38.8729, 1.3731),      # 이비자
    "OPO": (41.2481, -8.6814),     # 포르투
    "FAO": (37.0144, -7.9659),     # 파루
    "GVA": (46.2381, 6.1089),      # 제네바
    "BSL": (47.5896, 7.5299),      # 바젤
    "SZG": (47.7933, 13.0043),     # 잘츠부르크
    "INN": (47.2602, 11.3439),     # 인스브루크
    "WAW": (52.1657, 20.9671),     # 바르샤바
    "KRK": (50.0777, 19.7848),     # 크라쿠프
    "GDN": (54.3776, 18.4662),     # 그단스크
    "SKG": (40.5197, 22.9709),     # 테살로니키
    "HER": (35.3397, 25.1803),     # 헤라클리온
    "JMK": (37.4351, 25.3481),     # 미코노스
    "JTR": (36.3992, 25.4793),     # 산토리니
    "ORK": (51.8413, -8.4912),     # 코크
    "SNN": (52.7020, -8.9248),     # 섀넌
    "GOT": (57.6628, 12.2798),     # 예테보리
    "BGO": (60.2934, 5.2181),      # 베르겐
    "SVO": (55.9726, 37.4146),     # 셰레메티예보
    "DME": (55.4088, 37.9063),     # 도모데도보
    "VKO": (55.5915, 37.2615),     # 브누코보
    "LED": (59.8003, 30.2625),     # 풀코보
    "KEF": (63.9850, -22.6056),    # 케플라비크

    # North America - 추가
    "EWR": (40.6895, -74.1745),    # 뉴어크
    "LGA": (40.7769, -73.8740),    # 라과디아
    "MDW": (41.7868, -87.7522),    # 미드웨이
    "PHX": (33.4373, -112.0078),   # 피닉스
    "IAH": (29.9902, -95.3368),    # 휴스턴
    "HNL": (21.3245, -157.9251),   # 호놀룰루
    "SAN": (32.7336, -117.1897),   # 샌디에이고
    "MCO": (28.4312, -81.3081),    # 올랜도
    "IAD": (38.9531, -77.4565),    # 덜레스
    "DCA": (38.8512, -77.0402),    # 내셔널
    "YUL": (45.4706, -73.7408),    # 몬트리올
    "YYC": (51.1215, -114.0076),   # 캘거리
    "YEG": (53.3097, -113.5800),   # 에드먼턴
    "YOW": (45.3225, -75.6692),    # 오타와
    "GDL": (20.5218, -103.3111),   # 과달라하라
    "SJD": (23.1518, -109.7211),   # 로스카보스

    # South America - 추가
    "BSB": (-15.8711, -47.9186),   # 브라질리아
    "CNF": (-19.6244, -43.9719),   # 벨루오리존치
    "AEP": (-34.5592, -58.4156),   # 호르헤 뉴베리
    "CUZ": (-13.5357, -71.9388),   # 쿠스코
    "MDE": (6.1645, -75.4231),     # 메데진
    "CTG": (10.4424, -75.5130),    # 카르타헤나

    # Oceania - 추가
    "PER": (-31.9403, 115.9672),   # 퍼스
    "ADL": (-34.9450, 138.5306),   # 애들레이드
    "OOL": (-28.1644, 153.5047),   # 골드코스트
    "CNS": (-16.8858, 145.7553),   # 케언스
    "WLG": (-41.3272, 174.8053),   # 웰링턴
    "ZQN": (-45.0211, 168.7392),   # 퀸스타운
    "NAN": (-17.7554, 177.4437),   # 난디

    # Africa - 추가
    "DUR": (-29.6144, 31.1197),    # 더반
    "HRG": (27.1783, 33.7994),     # 후르가다
    "SSH": (27.9773, 34.3950),     # 샤름 엘 셰이크
    "LXR": (25.6741, 32.7066),     # 룩소르
    "RAK": (31.6069, -8.0363),     # 마라케시
    "MBA": (-4.0348, 39.5942),     # 몸바사
    "ADD": (8.9779, 38.7993),      # 아디스아바바
    "LOS": (6.5774, 3.3212),       # 라고스
    "ABV": (9.0065, 7.2632),       # 아부자
    "DAR": (-6.8781, 39.2026),     # 다르에스살람
    "JRO": (-3.4294, 37.0745),     # 킬리만자로
}

def search_places_near_airport(airport_code, lat, lng, limit=15):
    """공항 주변 관광지 검색"""
    url = f"{BASE_URL}/places/search"
    params = {
        "ll": f"{lat},{lng}",
        "radius": 50000,
        "categories": ",".join(TOURIST_CATEGORIES),
        "sort": "RELEVANCE",
        "limit": limit
    }

    try:
        response = requests.get(url, headers=HEADERS, params=params)
        response.raise_for_status()
        data = response.json()

        attractions = []
        for place in data.get("results", []):
            category_icon = ""
            category_name = ""
            if place.get("categories"):
                cat = place["categories"][0]
                category_name = cat.get("name", "")
                icon = cat.get("icon", {})
                if icon:
                    category_icon = f"{icon.get('prefix', '')}64{icon.get('suffix', '')}"

            attraction = {
                "fsq_id": place.get("fsq_place_id", ""),
                "name": place.get("name", ""),
                "category": category_name,
                "category_icon": category_icon,
                "lat": place.get("latitude"),
                "lng": place.get("longitude"),
                "address": place.get("location", {}).get("formatted_address", ""),
                "distance": place.get("distance", 0),
                "image": "",
                "description": f"{category_name} in {place.get('location', {}).get('locality', '')}",
                "transport": f"Approximately {place.get('distance', 0) // 1000}km from {airport_code}"
            }
            attractions.append(attraction)

        return attractions

    except requests.exceptions.RequestException as e:
        print(f"Error fetching {airport_code}: {e}")
        return []

def main():
    # 기존 데이터 로드
    try:
        with open("attractions_foursquare.json", "r", encoding="utf-8") as f:
            all_attractions = json.load(f)
    except FileNotFoundError:
        all_attractions = {}

    total_new = 0

    for airport_code, (lat, lng) in ADDITIONAL_AIRPORTS.items():
        if airport_code in all_attractions:
            print(f"Skipping {airport_code} (already exists)")
            continue

        print(f"Fetching attractions for {airport_code}...")
        attractions = search_places_near_airport(airport_code, lat, lng, limit=15)

        if attractions:
            all_attractions[airport_code] = attractions
            total_new += len(attractions)
            print(f"  Found {len(attractions)} attractions")
        else:
            print(f"  No attractions found")

        time.sleep(0.5)

    # 저장
    with open("attractions_foursquare.json", "w", encoding="utf-8") as f:
        json.dump(all_attractions, f, ensure_ascii=False, indent=2)

    total_attractions = sum(len(v) for v in all_attractions.values())
    print(f"\nAdded {total_new} new attractions")
    print(f"Total: {total_attractions} attractions for {len(all_attractions)} airports")

if __name__ == "__main__":
    main()
