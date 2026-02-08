#!/usr/bin/env python3
"""
Foursquare Places API를 사용하여 공항 주변 관광지 수집
"""

import json
import requests
import time
import os

# Foursquare API 설정
API_KEY = "KSLUXCUNDUD4NBZT5QFI0Y31SJOHBWK25Y2FC3JNGVRX0HAK"
BASE_URL = "https://places-api.foursquare.com"
HEADERS = {
    "Accept": "application/json",
    "Authorization": f"Bearer {API_KEY}",
    "X-Places-Api-Version": "2025-06-17"
}

# 관광지 카테고리 (Foursquare category IDs)
TOURIST_CATEGORIES = [
    "16000",  # Landmarks and Outdoors
    "10000",  # Arts and Entertainment
    "12000",  # Landmarks
    "16032",  # Historic Site
    "16020",  # National Park
    "10027",  # Museum
    "12099",  # Monument / Landmark
]

# 공항 좌표 (주요 공항들)
AIRPORT_COORDS = {
    # Asia
    "ICN": (37.4602, 126.4407),
    "GMP": (37.5583, 126.7906),
    "PUS": (35.1796, 128.9383),
    "CJU": (33.5067, 126.4928),
    "NRT": (35.7720, 140.3929),
    "HND": (35.5494, 139.7798),
    "KIX": (34.4347, 135.2440),
    "FUK": (33.5859, 130.4511),
    "CTS": (42.7752, 141.6924),
    "OKA": (26.1958, 127.6458),
    "PEK": (40.0799, 116.6031),
    "PVG": (31.1443, 121.8083),
    "CAN": (23.3924, 113.2988),
    "HKG": (22.3080, 113.9185),
    "TPE": (25.0777, 121.2322),
    "BKK": (13.6900, 100.7501),
    "SIN": (1.3644, 103.9915),
    "KUL": (2.7456, 101.7099),
    "SGN": (10.8188, 106.6520),
    "HAN": (21.2212, 105.8070),
    "DAD": (16.0439, 108.1994),
    "MNL": (14.5086, 121.0197),
    "CEB": (10.3074, 123.9793),
    "CGK": (-6.1256, 106.6558),
    "DPS": (-8.7482, 115.1670),
    "DEL": (28.5562, 77.1000),
    "BOM": (19.0896, 72.8656),
    "DXB": (25.2532, 55.3657),
    "DOH": (25.2609, 51.6138),
    "IST": (41.2608, 28.7418),

    # Europe
    "LHR": (51.4700, -0.4543),
    "CDG": (49.0097, 2.5479),
    "FRA": (50.0379, 8.5622),
    "AMS": (52.3105, 4.7683),
    "FCO": (41.8003, 12.2389),
    "MAD": (40.4983, -3.5676),
    "BCN": (41.2971, 2.0785),
    "MUC": (48.3537, 11.7750),
    "ZRH": (47.4582, 8.5555),
    "VIE": (48.1103, 16.5697),
    "PRG": (50.1008, 14.2600),
    "BUD": (47.4369, 19.2556),
    "ATH": (37.9356, 23.9484),
    "LIS": (38.7756, -9.1354),
    "CPH": (55.6180, 12.6508),
    "ARN": (59.6519, 17.9186),
    "OSL": (60.1976, 11.1004),
    "HEL": (60.3172, 24.9633),
    "DUB": (53.4264, -6.2499),
    "EDI": (55.9508, -3.3615),

    # North America
    "JFK": (40.6413, -73.7781),
    "LAX": (33.9416, -118.4085),
    "ORD": (41.9742, -87.9073),
    "SFO": (37.6213, -122.3790),
    "MIA": (25.7959, -80.2870),
    "ATL": (33.6407, -84.4277),
    "DFW": (32.8998, -97.0403),
    "SEA": (47.4502, -122.3088),
    "BOS": (42.3656, -71.0096),
    "LAS": (36.0840, -115.1537),
    "DEN": (39.8561, -104.6737),
    "YYZ": (43.6777, -79.6248),
    "YVR": (49.1947, -123.1792),
    "MEX": (19.4361, -99.0719),
    "CUN": (21.0365, -86.8771),

    # South America
    "GRU": (-23.4356, -46.4731),
    "GIG": (-22.8099, -43.2506),
    "EZE": (-34.8222, -58.5358),
    "SCL": (-33.3930, -70.7858),
    "LIM": (-12.0219, -77.1143),
    "BOG": (4.7016, -74.1469),

    # Oceania
    "SYD": (-33.9399, 151.1753),
    "MEL": (-37.6690, 144.8410),
    "BNE": (-27.3842, 153.1175),
    "AKL": (-37.0082, 174.7850),
    "CHC": (-43.4894, 172.5322),

    # Africa
    "JNB": (-26.1392, 28.2460),
    "CPT": (-33.9715, 18.6021),
    "CAI": (30.1219, 31.4056),
    "CMN": (33.3675, -7.5898),
    "NBO": (-1.3192, 36.9278),
}

def search_places_near_airport(airport_code, lat, lng, limit=20):
    """공항 주변 관광지 검색 (도심 중심으로)"""

    # 도심 좌표 조정 (공항은 보통 도심에서 떨어져 있으므로)
    # 실제로는 도시 중심 좌표를 사용하는 것이 좋음

    url = f"{BASE_URL}/places/search"
    params = {
        "ll": f"{lat},{lng}",
        "radius": 50000,  # 50km 반경
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
            # 카테고리 아이콘 URL 생성
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
                "image": "",  # 사진은 추후 추가
                "description": f"{category_name} in {place.get('location', {}).get('locality', '')}",
                "transport": f"Approximately {place.get('distance', 0) // 1000}km from {airport_code}"
            }
            attractions.append(attraction)

        return attractions

    except requests.exceptions.RequestException as e:
        print(f"Error fetching {airport_code}: {e}")
        return []

def main():
    """모든 공항에 대해 관광지 수집"""

    all_attractions = {}
    total_count = 0

    for airport_code, (lat, lng) in AIRPORT_COORDS.items():
        print(f"Fetching attractions for {airport_code}...")

        attractions = search_places_near_airport(airport_code, lat, lng, limit=15)

        if attractions:
            all_attractions[airport_code] = attractions
            total_count += len(attractions)
            print(f"  Found {len(attractions)} attractions")
        else:
            print(f"  No attractions found")

        # API rate limiting 방지
        time.sleep(0.5)

    # JSON 파일로 저장
    output_file = "attractions_foursquare.json"
    with open(output_file, "w", encoding="utf-8") as f:
        json.dump(all_attractions, f, ensure_ascii=False, indent=2)

    print(f"\nTotal: {total_count} attractions for {len(all_attractions)} airports")
    print(f"Saved to {output_file}")

if __name__ == "__main__":
    main()
