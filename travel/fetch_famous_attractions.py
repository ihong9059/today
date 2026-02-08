#!/usr/bin/env python3
"""
유명 관광지를 이름으로 직접 검색하여 수집
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

# 공항별 유명 관광지 목록
FAMOUS_ATTRACTIONS = {
    # Korea
    "ICN": {
        "city": "Seoul",
        "lat": 37.5665, "lng": 126.9780,
        "attractions": [
            "Gyeongbokgung Palace",
            "Changdeokgung Palace",
            "Changgyeonggung Palace",
            "Deoksugung Palace",
            "Gyeonghuigung Palace",
            "N Seoul Tower",
            "Bukchon Hanok Village",
            "Myeongdong",
            "Insadong",
            "Dongdaemun Design Plaza",
            "Lotte World Tower",
            "Cheonggyecheon Stream",
            "War Memorial of Korea",
            "National Museum of Korea",
            "Jogyesa Temple",
        ]
    },
    "GMP": {
        "city": "Seoul",
        "lat": 37.5665, "lng": 126.9780,
        "attractions": [
            "Gyeongbokgung Palace",
            "N Seoul Tower",
            "Hongdae",
            "Yeouido Park",
            "Han River Park",
        ]
    },
    "PUS": {
        "city": "Busan",
        "lat": 35.1796, "lng": 129.0756,
        "attractions": [
            "Haeundae Beach",
            "Gamcheon Culture Village",
            "Haedong Yonggungsa Temple",
            "Jagalchi Fish Market",
            "Gwangalli Beach",
            "Beomeosa Temple",
            "Busan Tower",
            "BIFF Square",
            "Taejongdae Park",
            "Songdo Beach",
        ]
    },
    "CJU": {
        "city": "Jeju",
        "lat": 33.4996, "lng": 126.5312,
        "attractions": [
            "Seongsan Ilchulbong",
            "Hallasan Mountain",
            "Manjanggul Cave",
            "Cheonjiyeon Waterfall",
            "Jeongbang Waterfall",
            "Teddy Bear Museum",
            "Jeju Folk Village",
            "Udo Island",
            "Seopjikoji",
        ]
    },

    # Japan
    "NRT": {
        "city": "Tokyo",
        "lat": 35.6762, "lng": 139.6503,
        "attractions": [
            "Senso-ji Temple",
            "Tokyo Tower",
            "Tokyo Skytree",
            "Meiji Shrine",
            "Shibuya Crossing",
            "Imperial Palace",
            "Ueno Park",
            "Akihabara",
            "Shinjuku Gyoen",
            "Harajuku",
            "Ginza",
            "Asakusa",
            "Tokyo DisneySea",
            "teamLab Borderless",
        ]
    },
    "HND": {
        "city": "Tokyo",
        "lat": 35.6762, "lng": 139.6503,
        "attractions": [
            "Senso-ji Temple",
            "Tokyo Tower",
            "Meiji Shrine",
            "Shibuya Crossing",
        ]
    },
    "KIX": {
        "city": "Osaka",
        "lat": 34.6937, "lng": 135.5023,
        "attractions": [
            "Osaka Castle",
            "Dotonbori",
            "Universal Studios Japan",
            "Shitennoji Temple",
            "Osaka Aquarium Kaiyukan",
            "Sumiyoshi Taisha",
            "Shinsekai",
            "Umeda Sky Building",
            "Kuromon Market",
        ]
    },
    "FUK": {
        "city": "Fukuoka",
        "lat": 33.5904, "lng": 130.4017,
        "attractions": [
            "Fukuoka Tower",
            "Dazaifu Tenmangu",
            "Ohori Park",
            "Canal City Hakata",
            "Fukuoka Castle Ruins",
            "Kushida Shrine",
        ]
    },

    # China
    "PEK": {
        "city": "Beijing",
        "lat": 39.9042, "lng": 116.4074,
        "attractions": [
            "Forbidden City",
            "Great Wall of China",
            "Temple of Heaven",
            "Summer Palace",
            "Tiananmen Square",
            "Beihai Park",
            "Ming Tombs",
            "798 Art District",
            "Lama Temple",
            "Jingshan Park",
        ]
    },
    "PVG": {
        "city": "Shanghai",
        "lat": 31.2304, "lng": 121.4737,
        "attractions": [
            "The Bund",
            "Oriental Pearl Tower",
            "Yu Garden",
            "Shanghai Tower",
            "Nanjing Road",
            "Shanghai Museum",
            "Jade Buddha Temple",
            "French Concession",
            "Zhujiajiao Water Town",
            "Shanghai Disneyland",
        ]
    },
    "CAN": {
        "city": "Guangzhou",
        "lat": 23.1291, "lng": 113.2644,
        "attractions": [
            "Canton Tower",
            "Chen Clan Ancestral Hall",
            "Shamian Island",
            "Baiyun Mountain",
            "Temple of the Six Banyan Trees",
            "Guangdong Museum",
        ]
    },
    "HKG": {
        "city": "Hong Kong",
        "lat": 22.3193, "lng": 114.1694,
        "attractions": [
            "Victoria Peak",
            "Tian Tan Buddha",
            "Hong Kong Disneyland",
            "Ocean Park",
            "Victoria Harbour",
            "Wong Tai Sin Temple",
            "Star Ferry",
            "Temple Street Night Market",
            "Ngong Ping 360",
            "Man Mo Temple",
        ]
    },

    # Taiwan
    "TPE": {
        "city": "Taipei",
        "lat": 25.0330, "lng": 121.5654,
        "attractions": [
            "Taipei 101",
            "National Palace Museum",
            "Chiang Kai-shek Memorial Hall",
            "Longshan Temple",
            "Shilin Night Market",
            "Jiufen Old Street",
            "Elephant Mountain",
            "Beitou Hot Springs",
            "Maokong Gondola",
            "Sun Yat-sen Memorial Hall",
        ]
    },

    # Thailand
    "BKK": {
        "city": "Bangkok",
        "lat": 13.7563, "lng": 100.5018,
        "attractions": [
            "Grand Palace",
            "Wat Pho",
            "Wat Arun",
            "Chatuchak Weekend Market",
            "Khao San Road",
            "Jim Thompson House",
            "Wat Saket",
            "Lumphini Park",
            "Erawan Shrine",
            "Chinatown Bangkok",
        ]
    },
    "HKT": {
        "city": "Phuket",
        "lat": 7.8804, "lng": 98.3923,
        "attractions": [
            "Patong Beach",
            "Big Buddha Phuket",
            "Kata Beach",
            "Old Phuket Town",
            "Phi Phi Islands",
            "Phang Nga Bay",
            "Wat Chalong",
        ]
    },
    "CNX": {
        "city": "Chiang Mai",
        "lat": 18.7883, "lng": 98.9853,
        "attractions": [
            "Doi Suthep",
            "Chiang Mai Night Bazaar",
            "Wat Phra Singh",
            "Elephant Nature Park",
            "Old City Chiang Mai",
            "Doi Inthanon",
        ]
    },

    # Singapore
    "SIN": {
        "city": "Singapore",
        "lat": 1.3521, "lng": 103.8198,
        "attractions": [
            "Marina Bay Sands",
            "Gardens by the Bay",
            "Sentosa Island",
            "Singapore Zoo",
            "Merlion Park",
            "Orchard Road",
            "Chinatown Singapore",
            "Little India Singapore",
            "Universal Studios Singapore",
            "Clarke Quay",
        ]
    },

    # Vietnam
    "SGN": {
        "city": "Ho Chi Minh City",
        "lat": 10.8231, "lng": 106.6297,
        "attractions": [
            "Notre-Dame Cathedral Basilica",
            "Ben Thanh Market",
            "Cu Chi Tunnels",
            "War Remnants Museum",
            "Reunification Palace",
            "Saigon Central Post Office",
            "Jade Emperor Pagoda",
        ]
    },
    "HAN": {
        "city": "Hanoi",
        "lat": 21.0278, "lng": 105.8342,
        "attractions": [
            "Hoan Kiem Lake",
            "Ho Chi Minh Mausoleum",
            "Temple of Literature",
            "Old Quarter Hanoi",
            "Ha Long Bay",
            "One Pillar Pagoda",
            "Tran Quoc Pagoda",
        ]
    },

    # UK
    "LHR": {
        "city": "London",
        "lat": 51.5074, "lng": -0.1278,
        "attractions": [
            "Big Ben",
            "Tower of London",
            "British Museum",
            "Buckingham Palace",
            "London Eye",
            "Tower Bridge",
            "Westminster Abbey",
            "St. Paul's Cathedral",
            "Hyde Park",
            "Trafalgar Square",
            "Piccadilly Circus",
            "The Shard",
            "Natural History Museum",
        ]
    },
    "EDI": {
        "city": "Edinburgh",
        "lat": 55.9533, "lng": -3.1883,
        "attractions": [
            "Edinburgh Castle",
            "Royal Mile",
            "Arthur's Seat",
            "Holyrood Palace",
            "Scottish National Museum",
            "Calton Hill",
        ]
    },

    # France
    "CDG": {
        "city": "Paris",
        "lat": 48.8566, "lng": 2.3522,
        "attractions": [
            "Eiffel Tower",
            "Louvre Museum",
            "Notre-Dame Cathedral",
            "Arc de Triomphe",
            "Champs-Élysées",
            "Sacré-Cœur",
            "Musée d'Orsay",
            "Palace of Versailles",
            "Moulin Rouge",
            "Montmartre",
            "Luxembourg Gardens",
            "Sainte-Chapelle",
        ]
    },
    "NCE": {
        "city": "Nice",
        "lat": 43.7102, "lng": 7.2620,
        "attractions": [
            "Promenade des Anglais",
            "Old Town Nice",
            "Castle Hill",
            "Matisse Museum",
            "Marc Chagall National Museum",
        ]
    },

    # Italy
    "FCO": {
        "city": "Rome",
        "lat": 41.9028, "lng": 12.4964,
        "attractions": [
            "Colosseum",
            "Vatican City",
            "Trevi Fountain",
            "Pantheon",
            "Roman Forum",
            "St. Peter's Basilica",
            "Sistine Chapel",
            "Spanish Steps",
            "Piazza Navona",
            "Castel Sant'Angelo",
            "Villa Borghese",
        ]
    },
    "MXP": {
        "city": "Milan",
        "lat": 45.4642, "lng": 9.1900,
        "attractions": [
            "Milan Cathedral",
            "Galleria Vittorio Emanuele II",
            "The Last Supper",
            "Sforza Castle",
            "La Scala",
            "Brera District",
            "Navigli District",
        ]
    },
    "VCE": {
        "city": "Venice",
        "lat": 45.4408, "lng": 12.3155,
        "attractions": [
            "St. Mark's Square",
            "Rialto Bridge",
            "Grand Canal",
            "Doge's Palace",
            "St. Mark's Basilica",
            "Burano Island",
            "Murano Island",
        ]
    },
    "FLR": {
        "city": "Florence",
        "lat": 43.7696, "lng": 11.2558,
        "attractions": [
            "Florence Cathedral",
            "Uffizi Gallery",
            "Ponte Vecchio",
            "Piazzale Michelangelo",
            "Palazzo Pitti",
            "Galleria dell'Accademia",
        ]
    },

    # Spain
    "MAD": {
        "city": "Madrid",
        "lat": 40.4168, "lng": -3.7038,
        "attractions": [
            "Royal Palace of Madrid",
            "Prado Museum",
            "Plaza Mayor",
            "Retiro Park",
            "Puerta del Sol",
            "Gran Via",
            "Reina Sofia Museum",
            "Santiago Bernabeu Stadium",
        ]
    },
    "BCN": {
        "city": "Barcelona",
        "lat": 41.3851, "lng": 2.1734,
        "attractions": [
            "Sagrada Familia",
            "Park Güell",
            "La Rambla",
            "Casa Batlló",
            "Casa Milà",
            "Gothic Quarter",
            "La Boqueria Market",
            "Camp Nou",
            "Barceloneta Beach",
            "Montjuïc",
        ]
    },

    # Germany
    "FRA": {
        "city": "Frankfurt",
        "lat": 50.1109, "lng": 8.6821,
        "attractions": [
            "Römerberg",
            "Frankfurt Cathedral",
            "Palmengarten",
            "Main Tower",
            "Städel Museum",
        ]
    },
    "MUC": {
        "city": "Munich",
        "lat": 48.1351, "lng": 11.5820,
        "attractions": [
            "Marienplatz",
            "Nymphenburg Palace",
            "English Garden",
            "BMW Museum",
            "Neuschwanstein Castle",
            "Frauenkirche",
            "Viktualienmarkt",
        ]
    },
    "BER": {
        "city": "Berlin",
        "lat": 52.5200, "lng": 13.4050,
        "attractions": [
            "Brandenburg Gate",
            "Berlin Wall Memorial",
            "Reichstag Building",
            "Museum Island",
            "Checkpoint Charlie",
            "Berlin Cathedral",
            "East Side Gallery",
            "Alexanderplatz",
        ]
    },

    # Netherlands
    "AMS": {
        "city": "Amsterdam",
        "lat": 52.3676, "lng": 4.9041,
        "attractions": [
            "Anne Frank House",
            "Van Gogh Museum",
            "Rijksmuseum",
            "Royal Palace Amsterdam",
            "Dam Square",
            "Vondelpark",
            "Jordaan District",
            "Canal Belt",
            "Heineken Experience",
        ]
    },

    # Austria
    "VIE": {
        "city": "Vienna",
        "lat": 48.2082, "lng": 16.3738,
        "attractions": [
            "Schönbrunn Palace",
            "St. Stephen's Cathedral",
            "Belvedere Palace",
            "Hofburg Palace",
            "Vienna State Opera",
            "Prater",
            "Kunsthistorisches Museum",
        ]
    },

    # Czech Republic
    "PRG": {
        "city": "Prague",
        "lat": 50.0755, "lng": 14.4378,
        "attractions": [
            "Charles Bridge",
            "Prague Castle",
            "Old Town Square",
            "Astronomical Clock",
            "St. Vitus Cathedral",
            "Wenceslas Square",
            "John Lennon Wall",
        ]
    },

    # USA
    "JFK": {
        "city": "New York",
        "lat": 40.7128, "lng": -74.0060,
        "attractions": [
            "Statue of Liberty",
            "Empire State Building",
            "Central Park",
            "Times Square",
            "Brooklyn Bridge",
            "Metropolitan Museum of Art",
            "One World Trade Center",
            "Grand Central Terminal",
            "Rockefeller Center",
            "Broadway",
            "Fifth Avenue",
            "Museum of Modern Art",
        ]
    },
    "LAX": {
        "city": "Los Angeles",
        "lat": 34.0522, "lng": -118.2437,
        "attractions": [
            "Hollywood Sign",
            "Universal Studios Hollywood",
            "Santa Monica Pier",
            "Griffith Observatory",
            "Hollywood Walk of Fame",
            "Getty Center",
            "Venice Beach",
            "Beverly Hills",
            "Disneyland",
            "The Grove",
        ]
    },
    "SFO": {
        "city": "San Francisco",
        "lat": 37.7749, "lng": -122.4194,
        "attractions": [
            "Golden Gate Bridge",
            "Alcatraz Island",
            "Fisherman's Wharf",
            "Pier 39",
            "Lombard Street",
            "Chinatown San Francisco",
            "Cable Cars",
            "Golden Gate Park",
            "Palace of Fine Arts",
        ]
    },
    "LAS": {
        "city": "Las Vegas",
        "lat": 36.1699, "lng": -115.1398,
        "attractions": [
            "Las Vegas Strip",
            "Bellagio Fountains",
            "Fremont Street",
            "Grand Canyon",
            "Hoover Dam",
            "The Venetian",
            "High Roller",
        ]
    },
    "MIA": {
        "city": "Miami",
        "lat": 25.7617, "lng": -80.1918,
        "attractions": [
            "South Beach",
            "Art Deco Historic District",
            "Vizcaya Museum",
            "Wynwood Walls",
            "Little Havana",
            "Everglades National Park",
        ]
    },
    "MCO": {
        "city": "Orlando",
        "lat": 28.5383, "lng": -81.3792,
        "attractions": [
            "Walt Disney World",
            "Universal Orlando Resort",
            "SeaWorld Orlando",
            "Kennedy Space Center",
            "Magic Kingdom",
            "EPCOT",
        ]
    },
    "IAD": {
        "city": "Washington DC",
        "lat": 38.9072, "lng": -77.0369,
        "attractions": [
            "Lincoln Memorial",
            "Washington Monument",
            "White House",
            "Capitol Building",
            "National Mall",
            "Smithsonian Museums",
            "Jefferson Memorial",
            "Arlington National Cemetery",
        ]
    },

    # Australia
    "SYD": {
        "city": "Sydney",
        "lat": -33.8688, "lng": 151.2093,
        "attractions": [
            "Sydney Opera House",
            "Sydney Harbour Bridge",
            "Bondi Beach",
            "Darling Harbour",
            "Taronga Zoo",
            "Royal Botanic Garden",
            "The Rocks",
            "Manly Beach",
        ]
    },
    "MEL": {
        "city": "Melbourne",
        "lat": -37.8136, "lng": 144.9631,
        "attractions": [
            "Federation Square",
            "Melbourne Cricket Ground",
            "Royal Botanic Gardens Melbourne",
            "Queen Victoria Market",
            "St Kilda Beach",
            "Laneways",
            "Great Ocean Road",
        ]
    },

    # UAE
    "DXB": {
        "city": "Dubai",
        "lat": 25.2048, "lng": 55.2708,
        "attractions": [
            "Burj Khalifa",
            "Dubai Mall",
            "Palm Jumeirah",
            "Burj Al Arab",
            "Dubai Marina",
            "Gold Souk",
            "Dubai Frame",
            "Jumeirah Beach",
            "Museum of the Future",
            "Dubai Creek",
        ]
    },

    # Turkey
    "IST": {
        "city": "Istanbul",
        "lat": 41.0082, "lng": 28.9784,
        "attractions": [
            "Hagia Sophia",
            "Blue Mosque",
            "Topkapi Palace",
            "Grand Bazaar",
            "Galata Tower",
            "Bosphorus",
            "Basilica Cistern",
            "Dolmabahce Palace",
            "Spice Bazaar",
            "Istiklal Avenue",
        ]
    },

    # Egypt
    "CAI": {
        "city": "Cairo",
        "lat": 30.0444, "lng": 31.2357,
        "attractions": [
            "Pyramids of Giza",
            "Egyptian Museum",
            "Sphinx",
            "Khan el-Khalili",
            "Citadel of Saladin",
            "Al-Azhar Mosque",
            "Nile River",
        ]
    },
}


def search_attraction(query, lat, lng):
    """특정 관광지 이름으로 검색"""
    url = f"{BASE_URL}/places/search"
    params = {
        "query": query,
        "ll": f"{lat},{lng}",
        "radius": 50000,  # 50km
        "limit": 1
    }

    try:
        response = requests.get(url, headers=HEADERS, params=params)
        response.raise_for_status()
        data = response.json()

        results = data.get("results", [])
        if results:
            place = results[0]
            category_icon = ""
            category_name = ""
            if place.get("categories"):
                cat = place["categories"][0]
                category_name = cat.get("name", "")
                icon = cat.get("icon", {})
                if icon:
                    category_icon = f"{icon.get('prefix', '')}64{icon.get('suffix', '')}"

            return {
                "fsq_id": place.get("fsq_place_id", ""),
                "name": place.get("name", query),
                "category": category_name,
                "category_icon": category_icon,
                "lat": place.get("latitude"),
                "lng": place.get("longitude"),
                "address": place.get("location", {}).get("formatted_address", ""),
                "distance": place.get("distance", 0),
                "image": "",
                "description": f"{category_name}",
                "transport": f"Famous attraction"
            }
    except Exception as e:
        print(f"  Error searching '{query}': {e}")

    return None


def main():
    all_attractions = {}
    total_count = 0

    for airport_code, info in FAMOUS_ATTRACTIONS.items():
        print(f"\n=== {airport_code} ({info['city']}) ===")
        attractions = []

        for attraction_name in info["attractions"]:
            result = search_attraction(attraction_name, info["lat"], info["lng"])
            if result:
                attractions.append(result)
                print(f"  ✓ {result['name']}")
            else:
                print(f"  ✗ {attraction_name} (not found)")
            time.sleep(0.2)

        if attractions:
            all_attractions[airport_code] = attractions
            total_count += len(attractions)

    # 저장
    with open("attractions_famous.json", "w", encoding="utf-8") as f:
        json.dump(all_attractions, f, ensure_ascii=False, indent=2)

    print(f"\n\nTotal: {total_count} attractions for {len(all_attractions)} airports")
    print("Saved to attractions_famous.json")


if __name__ == "__main__":
    main()
