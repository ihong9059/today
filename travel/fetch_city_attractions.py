#!/usr/bin/env python3
"""
도시 중심 좌표를 사용하여 진짜 관광지 수집
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

# 진짜 관광지 카테고리만
TOURIST_CATEGORIES = [
    "16032",  # Historic and Protected Site
    "10027",  # Museum
    "16020",  # Park
    "10039",  # Theater
    "16034",  # Monument
    "16011",  # Garden
    "10024",  # Performing Arts Venue
    "16030",  # Castle
    "16025",  # Temple
    "16026",  # Church
    "16027",  # Mosque
    "16028",  # Shrine
    "16029",  # Synagogue
    "10025",  # Art Gallery
    "16022",  # Beach
    "16014",  # Lake
    "16016",  # Mountain
    "16019",  # Nature Preserve
    "10045",  # Zoo
    "10046",  # Aquarium
    "10031",  # Amusement Park
    "12089",  # Sculpture Garden
    "16036",  # Palace
]

# 도시 중심 좌표 (공항이 아닌 도심)
CITY_COORDS = {
    # Asia
    "ICN": {"city": "Seoul", "lat": 37.5665, "lng": 126.9780},
    "GMP": {"city": "Seoul", "lat": 37.5665, "lng": 126.9780},
    "PUS": {"city": "Busan", "lat": 35.1796, "lng": 129.0756},
    "CJU": {"city": "Jeju", "lat": 33.4996, "lng": 126.5312},
    "TAE": {"city": "Daegu", "lat": 35.8714, "lng": 128.6014},
    "NRT": {"city": "Tokyo", "lat": 35.6762, "lng": 139.6503},
    "HND": {"city": "Tokyo", "lat": 35.6762, "lng": 139.6503},
    "KIX": {"city": "Osaka", "lat": 34.6937, "lng": 135.5023},
    "ITM": {"city": "Osaka", "lat": 34.6937, "lng": 135.5023},
    "NGO": {"city": "Nagoya", "lat": 35.1815, "lng": 136.9066},
    "FUK": {"city": "Fukuoka", "lat": 33.5904, "lng": 130.4017},
    "CTS": {"city": "Sapporo", "lat": 43.0618, "lng": 141.3545},
    "OKA": {"city": "Naha", "lat": 26.2124, "lng": 127.6809},
    "PEK": {"city": "Beijing", "lat": 39.9042, "lng": 116.4074},
    "PKX": {"city": "Beijing", "lat": 39.9042, "lng": 116.4074},
    "PVG": {"city": "Shanghai", "lat": 31.2304, "lng": 121.4737},
    "SHA": {"city": "Shanghai", "lat": 31.2304, "lng": 121.4737},
    "CAN": {"city": "Guangzhou", "lat": 23.1291, "lng": 113.2644},
    "SZX": {"city": "Shenzhen", "lat": 22.5431, "lng": 114.0579},
    "CTU": {"city": "Chengdu", "lat": 30.5728, "lng": 104.0668},
    "XIY": {"city": "Xi'an", "lat": 34.3416, "lng": 108.9398},
    "HGH": {"city": "Hangzhou", "lat": 30.2741, "lng": 120.1551},
    "HKG": {"city": "Hong Kong", "lat": 22.3193, "lng": 114.1694},
    "TPE": {"city": "Taipei", "lat": 25.0330, "lng": 121.5654},
    "TSA": {"city": "Taipei", "lat": 25.0330, "lng": 121.5654},
    "KHH": {"city": "Kaohsiung", "lat": 22.6273, "lng": 120.3014},
    "BKK": {"city": "Bangkok", "lat": 13.7563, "lng": 100.5018},
    "DMK": {"city": "Bangkok", "lat": 13.7563, "lng": 100.5018},
    "HKT": {"city": "Phuket", "lat": 7.8804, "lng": 98.3923},
    "CNX": {"city": "Chiang Mai", "lat": 18.7883, "lng": 98.9853},
    "SIN": {"city": "Singapore", "lat": 1.3521, "lng": 103.8198},
    "KUL": {"city": "Kuala Lumpur", "lat": 3.1390, "lng": 101.6869},
    "PEN": {"city": "Penang", "lat": 5.4141, "lng": 100.3288},
    "BKI": {"city": "Kota Kinabalu", "lat": 5.9788, "lng": 116.0753},
    "SGN": {"city": "Ho Chi Minh City", "lat": 10.8231, "lng": 106.6297},
    "HAN": {"city": "Hanoi", "lat": 21.0278, "lng": 105.8342},
    "DAD": {"city": "Da Nang", "lat": 16.0544, "lng": 108.2022},
    "CXR": {"city": "Nha Trang", "lat": 12.2388, "lng": 109.1967},
    "MNL": {"city": "Manila", "lat": 14.5995, "lng": 120.9842},
    "CEB": {"city": "Cebu", "lat": 10.3157, "lng": 123.8854},
    "CRK": {"city": "Angeles City", "lat": 15.1450, "lng": 120.5887},
    "CGK": {"city": "Jakarta", "lat": -6.2088, "lng": 106.8456},
    "DPS": {"city": "Bali", "lat": -8.4095, "lng": 115.1889},
    "SUB": {"city": "Surabaya", "lat": -7.2575, "lng": 112.7521},
    "DEL": {"city": "Delhi", "lat": 28.6139, "lng": 77.2090},
    "BOM": {"city": "Mumbai", "lat": 19.0760, "lng": 72.8777},
    "BLR": {"city": "Bangalore", "lat": 12.9716, "lng": 77.5946},
    "MAA": {"city": "Chennai", "lat": 13.0827, "lng": 80.2707},
    "CCU": {"city": "Kolkata", "lat": 22.5726, "lng": 88.3639},
    "HYD": {"city": "Hyderabad", "lat": 17.3850, "lng": 78.4867},
    "DXB": {"city": "Dubai", "lat": 25.2048, "lng": 55.2708},
    "DWC": {"city": "Dubai", "lat": 25.2048, "lng": 55.2708},
    "AUH": {"city": "Abu Dhabi", "lat": 24.4539, "lng": 54.3773},
    "SHJ": {"city": "Sharjah", "lat": 25.3575, "lng": 55.3908},
    "DOH": {"city": "Doha", "lat": 25.2854, "lng": 51.5310},
    "JED": {"city": "Jeddah", "lat": 21.4858, "lng": 39.1925},
    "RUH": {"city": "Riyadh", "lat": 24.7136, "lng": 46.6753},
    "DMM": {"city": "Dammam", "lat": 26.4207, "lng": 50.0888},
    "TLV": {"city": "Tel Aviv", "lat": 32.0853, "lng": 34.7818},
    "IST": {"city": "Istanbul", "lat": 41.0082, "lng": 28.9784},
    "SAW": {"city": "Istanbul", "lat": 41.0082, "lng": 28.9784},
    "ESB": {"city": "Ankara", "lat": 39.9334, "lng": 32.8597},
    "AYT": {"city": "Antalya", "lat": 36.8969, "lng": 30.7133},

    # Europe
    "LHR": {"city": "London", "lat": 51.5074, "lng": -0.1278},
    "LGW": {"city": "London", "lat": 51.5074, "lng": -0.1278},
    "STN": {"city": "London", "lat": 51.5074, "lng": -0.1278},
    "LTN": {"city": "London", "lat": 51.5074, "lng": -0.1278},
    "LCY": {"city": "London", "lat": 51.5074, "lng": -0.1278},
    "MAN": {"city": "Manchester", "lat": 53.4808, "lng": -2.2426},
    "EDI": {"city": "Edinburgh", "lat": 55.9533, "lng": -3.1883},
    "BHX": {"city": "Birmingham", "lat": 52.4862, "lng": -1.8904},
    "CDG": {"city": "Paris", "lat": 48.8566, "lng": 2.3522},
    "ORY": {"city": "Paris", "lat": 48.8566, "lng": 2.3522},
    "NCE": {"city": "Nice", "lat": 43.7102, "lng": 7.2620},
    "LYS": {"city": "Lyon", "lat": 45.7640, "lng": 4.8357},
    "MRS": {"city": "Marseille", "lat": 43.2965, "lng": 5.3698},
    "FRA": {"city": "Frankfurt", "lat": 50.1109, "lng": 8.6821},
    "MUC": {"city": "Munich", "lat": 48.1351, "lng": 11.5820},
    "BER": {"city": "Berlin", "lat": 52.5200, "lng": 13.4050},
    "DUS": {"city": "Dusseldorf", "lat": 51.2277, "lng": 6.7735},
    "HAM": {"city": "Hamburg", "lat": 53.5511, "lng": 9.9937},
    "CGN": {"city": "Cologne", "lat": 50.9375, "lng": 6.9603},
    "STR": {"city": "Stuttgart", "lat": 48.7758, "lng": 9.1829},
    "AMS": {"city": "Amsterdam", "lat": 52.3676, "lng": 4.9041},
    "EIN": {"city": "Eindhoven", "lat": 51.4416, "lng": 5.4697},
    "RTM": {"city": "Rotterdam", "lat": 51.9244, "lng": 4.4777},
    "BRU": {"city": "Brussels", "lat": 50.8503, "lng": 4.3517},
    "CRL": {"city": "Brussels", "lat": 50.8503, "lng": 4.3517},
    "FCO": {"city": "Rome", "lat": 41.9028, "lng": 12.4964},
    "CIA": {"city": "Rome", "lat": 41.9028, "lng": 12.4964},
    "MXP": {"city": "Milan", "lat": 45.4642, "lng": 9.1900},
    "LIN": {"city": "Milan", "lat": 45.4642, "lng": 9.1900},
    "VCE": {"city": "Venice", "lat": 45.4408, "lng": 12.3155},
    "NAP": {"city": "Naples", "lat": 40.8518, "lng": 14.2681},
    "FLR": {"city": "Florence", "lat": 43.7696, "lng": 11.2558},
    "MAD": {"city": "Madrid", "lat": 40.4168, "lng": -3.7038},
    "BCN": {"city": "Barcelona", "lat": 41.3851, "lng": 2.1734},
    "PMI": {"city": "Palma", "lat": 39.5696, "lng": 2.6502},
    "AGP": {"city": "Malaga", "lat": 36.7213, "lng": -4.4214},
    "ALC": {"city": "Alicante", "lat": 38.3452, "lng": -0.4810},
    "VLC": {"city": "Valencia", "lat": 39.4699, "lng": -0.3763},
    "SVQ": {"city": "Seville", "lat": 37.3891, "lng": -5.9845},
    "IBZ": {"city": "Ibiza", "lat": 38.9067, "lng": 1.4206},
    "LIS": {"city": "Lisbon", "lat": 38.7223, "lng": -9.1393},
    "OPO": {"city": "Porto", "lat": 41.1579, "lng": -8.6291},
    "FAO": {"city": "Faro", "lat": 37.0179, "lng": -7.9304},
    "ZRH": {"city": "Zurich", "lat": 47.3769, "lng": 8.5417},
    "GVA": {"city": "Geneva", "lat": 46.2044, "lng": 6.1432},
    "BSL": {"city": "Basel", "lat": 47.5596, "lng": 7.5886},
    "VIE": {"city": "Vienna", "lat": 48.2082, "lng": 16.3738},
    "SZG": {"city": "Salzburg", "lat": 47.8095, "lng": 13.0550},
    "INN": {"city": "Innsbruck", "lat": 47.2692, "lng": 11.4041},
    "PRG": {"city": "Prague", "lat": 50.0755, "lng": 14.4378},
    "WAW": {"city": "Warsaw", "lat": 52.2297, "lng": 21.0122},
    "KRK": {"city": "Krakow", "lat": 50.0647, "lng": 19.9450},
    "GDN": {"city": "Gdansk", "lat": 54.3520, "lng": 18.6466},
    "BUD": {"city": "Budapest", "lat": 47.4979, "lng": 19.0402},
    "ATH": {"city": "Athens", "lat": 37.9838, "lng": 23.7275},
    "SKG": {"city": "Thessaloniki", "lat": 40.6401, "lng": 22.9444},
    "HER": {"city": "Heraklion", "lat": 35.3387, "lng": 25.1442},
    "JMK": {"city": "Mykonos", "lat": 37.4467, "lng": 25.3289},
    "JTR": {"city": "Santorini", "lat": 36.3932, "lng": 25.4615},
    "DUB": {"city": "Dublin", "lat": 53.3498, "lng": -6.2603},
    "ORK": {"city": "Cork", "lat": 51.8985, "lng": -8.4756},
    "SNN": {"city": "Limerick", "lat": 52.6638, "lng": -8.6267},
    "CPH": {"city": "Copenhagen", "lat": 55.6761, "lng": 12.5683},
    "ARN": {"city": "Stockholm", "lat": 59.3293, "lng": 18.0686},
    "GOT": {"city": "Gothenburg", "lat": 57.7089, "lng": 11.9746},
    "OSL": {"city": "Oslo", "lat": 59.9139, "lng": 10.7522},
    "BGO": {"city": "Bergen", "lat": 60.3913, "lng": 5.3221},
    "HEL": {"city": "Helsinki", "lat": 60.1699, "lng": 24.9384},
    "SVO": {"city": "Moscow", "lat": 55.7558, "lng": 37.6173},
    "DME": {"city": "Moscow", "lat": 55.7558, "lng": 37.6173},
    "VKO": {"city": "Moscow", "lat": 55.7558, "lng": 37.6173},
    "LED": {"city": "St Petersburg", "lat": 59.9343, "lng": 30.3351},
    "KEF": {"city": "Reykjavik", "lat": 64.1466, "lng": -21.9426},

    # North America
    "JFK": {"city": "New York", "lat": 40.7128, "lng": -74.0060},
    "EWR": {"city": "New York", "lat": 40.7128, "lng": -74.0060},
    "LGA": {"city": "New York", "lat": 40.7128, "lng": -74.0060},
    "LAX": {"city": "Los Angeles", "lat": 34.0522, "lng": -118.2437},
    "ORD": {"city": "Chicago", "lat": 41.8781, "lng": -87.6298},
    "MDW": {"city": "Chicago", "lat": 41.8781, "lng": -87.6298},
    "SFO": {"city": "San Francisco", "lat": 37.7749, "lng": -122.4194},
    "MIA": {"city": "Miami", "lat": 25.7617, "lng": -80.1918},
    "ATL": {"city": "Atlanta", "lat": 33.7490, "lng": -84.3880},
    "DFW": {"city": "Dallas", "lat": 32.7767, "lng": -96.7970},
    "SEA": {"city": "Seattle", "lat": 47.6062, "lng": -122.3321},
    "BOS": {"city": "Boston", "lat": 42.3601, "lng": -71.0589},
    "LAS": {"city": "Las Vegas", "lat": 36.1699, "lng": -115.1398},
    "DEN": {"city": "Denver", "lat": 39.7392, "lng": -104.9903},
    "PHX": {"city": "Phoenix", "lat": 33.4484, "lng": -112.0740},
    "IAH": {"city": "Houston", "lat": 29.7604, "lng": -95.3698},
    "HNL": {"city": "Honolulu", "lat": 21.3069, "lng": -157.8583},
    "SAN": {"city": "San Diego", "lat": 32.7157, "lng": -117.1611},
    "MCO": {"city": "Orlando", "lat": 28.5383, "lng": -81.3792},
    "IAD": {"city": "Washington DC", "lat": 38.9072, "lng": -77.0369},
    "DCA": {"city": "Washington DC", "lat": 38.9072, "lng": -77.0369},
    "YYZ": {"city": "Toronto", "lat": 43.6532, "lng": -79.3832},
    "YVR": {"city": "Vancouver", "lat": 49.2827, "lng": -123.1207},
    "YUL": {"city": "Montreal", "lat": 45.5017, "lng": -73.5673},
    "YYC": {"city": "Calgary", "lat": 51.0447, "lng": -114.0719},
    "YEG": {"city": "Edmonton", "lat": 53.5461, "lng": -113.4938},
    "YOW": {"city": "Ottawa", "lat": 45.4215, "lng": -75.6972},
    "MEX": {"city": "Mexico City", "lat": 19.4326, "lng": -99.1332},
    "CUN": {"city": "Cancun", "lat": 21.1619, "lng": -86.8515},
    "GDL": {"city": "Guadalajara", "lat": 20.6597, "lng": -103.3496},
    "SJD": {"city": "Los Cabos", "lat": 22.8905, "lng": -109.9167},

    # South America
    "GRU": {"city": "Sao Paulo", "lat": -23.5505, "lng": -46.6333},
    "GIG": {"city": "Rio de Janeiro", "lat": -22.9068, "lng": -43.1729},
    "BSB": {"city": "Brasilia", "lat": -15.7975, "lng": -47.8919},
    "CNF": {"city": "Belo Horizonte", "lat": -19.9167, "lng": -43.9345},
    "EZE": {"city": "Buenos Aires", "lat": -34.6037, "lng": -58.3816},
    "AEP": {"city": "Buenos Aires", "lat": -34.6037, "lng": -58.3816},
    "SCL": {"city": "Santiago", "lat": -33.4489, "lng": -70.6693},
    "LIM": {"city": "Lima", "lat": -12.0464, "lng": -77.0428},
    "CUZ": {"city": "Cusco", "lat": -13.5319, "lng": -71.9675},
    "BOG": {"city": "Bogota", "lat": 4.7110, "lng": -74.0721},
    "MDE": {"city": "Medellin", "lat": 6.2442, "lng": -75.5812},
    "CTG": {"city": "Cartagena", "lat": 10.3910, "lng": -75.4794},

    # Oceania
    "SYD": {"city": "Sydney", "lat": -33.8688, "lng": 151.2093},
    "MEL": {"city": "Melbourne", "lat": -37.8136, "lng": 144.9631},
    "BNE": {"city": "Brisbane", "lat": -27.4698, "lng": 153.0251},
    "PER": {"city": "Perth", "lat": -31.9505, "lng": 115.8605},
    "ADL": {"city": "Adelaide", "lat": -34.9285, "lng": 138.6007},
    "OOL": {"city": "Gold Coast", "lat": -28.0167, "lng": 153.4000},
    "CNS": {"city": "Cairns", "lat": -16.9186, "lng": 145.7781},
    "AKL": {"city": "Auckland", "lat": -36.8485, "lng": 174.7633},
    "WLG": {"city": "Wellington", "lat": -41.2865, "lng": 174.7762},
    "CHC": {"city": "Christchurch", "lat": -43.5321, "lng": 172.6362},
    "ZQN": {"city": "Queenstown", "lat": -45.0312, "lng": 168.6626},
    "NAN": {"city": "Nadi", "lat": -17.7765, "lng": 177.4356},

    # Africa
    "JNB": {"city": "Johannesburg", "lat": -26.2041, "lng": 28.0473},
    "CPT": {"city": "Cape Town", "lat": -33.9249, "lng": 18.4241},
    "DUR": {"city": "Durban", "lat": -29.8587, "lng": 31.0218},
    "CAI": {"city": "Cairo", "lat": 30.0444, "lng": 31.2357},
    "HRG": {"city": "Hurghada", "lat": 27.2579, "lng": 33.8116},
    "SSH": {"city": "Sharm El Sheikh", "lat": 27.9158, "lng": 34.3300},
    "LXR": {"city": "Luxor", "lat": 25.6872, "lng": 32.6396},
    "CMN": {"city": "Casablanca", "lat": 33.5731, "lng": -7.5898},
    "RAK": {"city": "Marrakech", "lat": 31.6295, "lng": -7.9811},
    "NBO": {"city": "Nairobi", "lat": -1.2921, "lng": 36.8219},
    "MBA": {"city": "Mombasa", "lat": -4.0435, "lng": 39.6682},
    "ADD": {"city": "Addis Ababa", "lat": 9.0320, "lng": 38.7423},
    "LOS": {"city": "Lagos", "lat": 6.5244, "lng": 3.3792},
    "ABV": {"city": "Abuja", "lat": 9.0765, "lng": 7.3986},
    "DAR": {"city": "Dar es Salaam", "lat": -6.7924, "lng": 39.2083},
    "JRO": {"city": "Kilimanjaro", "lat": -3.3869, "lng": 37.3439},
}

def search_places(airport_code, city_info, limit=15):
    """도시 중심에서 관광지 검색"""
    url = f"{BASE_URL}/places/search"
    params = {
        "ll": f"{city_info['lat']},{city_info['lng']}",
        "radius": 30000,  # 30km 반경
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
                "description": f"{category_name} in {city_info['city']}",
                "transport": f"Located in {city_info['city']}, accessible from {airport_code} airport"
            }
            attractions.append(attraction)

        return attractions

    except requests.exceptions.RequestException as e:
        print(f"Error fetching {airport_code}: {e}")
        return []

def main():
    all_attractions = {}
    total_count = 0

    for airport_code, city_info in CITY_COORDS.items():
        print(f"Fetching attractions for {airport_code} ({city_info['city']})...")
        attractions = search_places(airport_code, city_info, limit=15)

        if attractions:
            all_attractions[airport_code] = attractions
            total_count += len(attractions)
            print(f"  Found {len(attractions)} attractions")
        else:
            print(f"  No attractions found")

        time.sleep(0.3)

    # 저장
    with open("attractions_city.json", "w", encoding="utf-8") as f:
        json.dump(all_attractions, f, ensure_ascii=False, indent=2)

    print(f"\nTotal: {total_count} attractions for {len(all_attractions)} airports")
    print(f"Saved to attractions_city.json")

if __name__ == "__main__":
    main()
