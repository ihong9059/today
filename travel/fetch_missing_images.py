#!/usr/bin/env python3
"""
이미지가 없는 관광지에 대해 다양한 검색어로 재시도
"""

import json
import requests
import urllib.parse
import time
import re

HEADERS = {'User-Agent': 'TravelGuideApp/1.0 (contact@example.com)'}

# 검색어 매핑 (Foursquare 이름 -> Wikipedia 검색어)
SEARCH_MAPPING = {
    # Korea
    "Gyeongbokgung Palace": "Gyeongbokgung",
    "L7 Myeongdong": "Myeongdong",
    "Lotte Hotel Seoul": "Lotte World Tower",
    "Cheonggyecheon Stream Fashion Plaza": "Cheonggyecheon",
    "The War Memorial of Korea": "War Memorial of Korea",
    "Hongdae District": "Hongdae",
    "Ichon Hangang Park": "Hangang Park",
    "Gamcheon Culture Village info": "Gamcheon Culture Village",
    "Haedong Yonggungsa Temple": "Haedong Yonggungsa",
    "Jagalchi Fish Market": "Jagalchi Market",
    "BIFF Square": "Busan International Film Festival",
    "Taejongdae Resort Park": "Taejongdae",
    "Seongsan ilchulbong": "Seongsan Ilchulbong",
    "Hallasan Eorimok": "Hallasan",
    "Manjanggul Lava Tubes": "Manjanggul",
    "Teddy Bear Museum": "Teddy Bear Museum Jeju",
    "Jeju Folk Village Museum": "Jeju Folk Village",
    "Udo Island": "Udo, South Korea",
    "Seopjikoji": "Seopjikoji",

    # Japan
    "Senso-ji Temple": "Sensō-ji",
    "Meiji Jingu Shrine": "Meiji Shrine",
    "Imperial Palace": "Tokyo Imperial Palace",
    "Shinjuku Gyoen": "Shinjuku Gyoen",
    "Dotonbori": "Dōtonbori",
    "Shitennoji Temple Kindo": "Shitennō-ji",
    "Sumiyoshi Taisha": "Sumiyoshi-taisha",
    "Kuromon Market": "Kuromon Market",
    "Dazaifu Tenmangu Shrine": "Dazaifu Tenman-gū",
    "Ohori Park": "Ōhori Park",
    "Canal City Hakata": "Canal City Hakata",
    "Fukuoka Castle Ruins": "Fukuoka Castle",
    "teamLab Borderless": "TeamLab Borderless",

    # China
    "Great Wall Of China": "Great Wall of China",
    "Ming Tombs": "Ming tombs",
    "Yonghegong Lama Temple": "Yonghe Temple",
    "Nanjing Road Pedestrian Street": "Nanjing Road",
    "Former French Concession": "Shanghai French Concession",
    "Zhujiajiao Ancient Town": "Zhujiajiao",
    "Shamian Island": "Shamian Island",
    "Baiyun Mountain": "Baiyun Mountain",
    "Great Buddha Temple": "Temple of the Six Banyan Trees",
    "Tian Tan Buddha": "Tian Tan Buddha",
    "Wong Tai Sin Temple": "Wong Tai Sin Temple",
    "Temple Street Night Market": "Temple Street, Hong Kong",
    "Ngong Ping 360 Tung Chung Station": "Ngong Ping 360",
    "Man Mo Temple": "Man Mo Temple",

    # Taiwan
    "Chiang Kai-Shek Memorial Hall": "Chiang Kai-shek Memorial Hall",
    "Longshan Temple": "Longshan Temple, Taipei",
    "Elephant Mountain": "Elephant Mountain, Taiwan",
    "Maokong Gondola Line": "Maokong Gondola",
    "Sun Yat-sen Memorial Hall Loop": "Sun Yat-sen Memorial Hall",

    # Thailand
    "Wat Arun Prang": "Wat Arun",
    "Khao San Road": "Khaosan Road",
    "The Jim Thompson House": "Jim Thompson House",
    "Chinatown Bangkok": "Chinatown, Bangkok",
    "Patong Beach": "Patong",
    "Blu Monkey Phuket Phangnga Road": "Phuket Old Town",
    "Kata Beach": "Kata Beach",
    "Phuket Old Town Hostel": "Phuket Old Town",
    "Wat Chaithararam": "Wat Chalong",
    "Wat Phrathat Doi Suthep": "Wat Phra That Doi Suthep",
    "Wat Phra Singh Waramahavihan": "Wat Phra Singh",
    "Old City Chiang Mai": "Chiang Mai",
    "doi inthanon": "Doi Inthanon",

    # Singapore
    "Sentosa Island": "Sentosa",
    "Hostel, Chinatown, Singapore": "Chinatown, Singapore",
    "little india singapore": "Little India, Singapore",

    # Vietnam
    "Notre Dame Cathedral": "Saigon Notre-Dame Basilica",
    "Ben Thanh Market": "Ben Thanh Market",
    "Cu Chi Tunnels": "Cu Chi tunnels",
    "Ha Long Bay": "Ha Long Bay",
    "Temple of Literature": "Temple of Literature, Hanoi",
    "Chùa Một Cột": "One Pillar Pagoda",
    "Tran Quoc Pagoda": "Tran Quoc Pagoda",
    "Old Quarter Hotel Hanoi": "Hanoi Old Quarter",

    # UK
    "The London Eye": "London Eye",
    "St Paul's Cathedral": "St Paul's Cathedral",
    "Hyde Park": "Hyde Park, London",
    "Natural History Museum": "Natural History Museum, London",
    "The Royal Mile": "Royal Mile",
    "Arthur's Seat": "Arthur's Seat",
    "Palace of Holyroodhouse": "Palace of Holyroodhouse",

    # France
    "Louvre Museum": "Louvre",
    "Cathedral of Notre-Dame de Paris": "Notre-Dame de Paris",
    "Sacré-Cœur Basilica": "Sacré-Cœur, Paris",
    "Orsay Museum": "Musée d'Orsay",
    "Luxembourg Gardens": "Luxembourg Gardens",
    "ibis Styles Nice Centre Gare": "Nice, France",
    "Castle Hill": "Castle Hill, Nice",
    "Muséum d'Histoire Naturelle de Nice": "Nice Natural History Museum",

    # Italy
    "Colosseum Bar": "Colosseum",
    "St. Peter's Basilica": "St. Peter's Basilica",
    "Inn At The Spanish Steps": "Spanish Steps",
    "Castle of the Holy Angel": "Castel Sant'Angelo",
    "Villa Borghese": "Villa Borghese gardens",
    "Milan Cathedral View": "Milan Cathedral",
    "Museum of the Last Supper": "The Last Supper (Leonardo)",
    "Porta Nuova Food District": "Porta Nuova, Milan",
    "Saint Mark's Square": "St Mark's Square",
    "Canal Grande": "Grand Canal (Venice)",
    "Doge's Palace": "Doge's Palace",
    "St Mark's Basilica": "St Mark's Basilica",
    "Burano Island": "Burano",
    "Faro di Murano": "Murano",
    "The St. Regis Florence": "Florence Cathedral",
    "Uffizi Gallery": "Uffizi",
    "Piazzale Michelangelo": "Piazzale Michelangelo",
    "Pitti Palace": "Palazzo Pitti",
    "Gallery of the Academy": "Galleria dell'Accademia",

    # Spain
    "Museo Nacional del Prado": "Museo del Prado",
    "Plaza Mayor": "Plaza Mayor, Madrid",
    "Retiro Park": "Buen Retiro Park",
    "Metro Gran Vía": "Gran Via, Madrid",
    "Reina Sofía Shuttle": "Museo Reina Sofía",
    "Santiago Bernabéu Stadium": "Santiago Bernabéu Stadium",
    "The Basilica of the Sagrada Familia": "Sagrada Familia",
    "La Rambla": "La Rambla, Barcelona",
    "La Pedrera": "Casa Milà",
    "Gothic Quarter": "Gothic Quarter, Barcelona",
    "La Boqueria Food Market": "La Boqueria",
    "Barceloneta Beach": "Barceloneta",
    "Montjuïc Mountain": "Montjuïc",

    # Germany
    "Städel Museum": "Städel",
    "English Garden": "English Garden, Munich",
    "Castle Eigentum GmbH": "Neuschwanstein Castle",
    "Cathedral of Our Dear Lady": "Munich Frauenkirche",
    "Brandenburg gate": "Brandenburg Gate",
    "Berlin Wall Memorial": "Berlin Wall",

    # Netherlands
    "De Jordaan": "Jordaan",
    "Amsterdam Canal Cruises": "Canals of Amsterdam",

    # Austria
    "St. Stephen's Cathedral": "St. Stephen's Cathedral, Vienna",
    "Upper Belvedere": "Belvedere, Vienna",
    "Wiener Prater": "Prater",
    "Vienna Museum of Art History": "Kunsthistorisches Museum",

    # Czech
    "Prague Astronomical Clock": "Prague astronomical clock",
    "St. Vitus Cathedral": "St. Vitus Cathedral",
    "Wenceslas Square Hotel": "Wenceslas Square",

    # USA
    "Empire State Building": "Empire State Building",
    "401 Broadway": "Broadway (Manhattan)",
    "J. Paul Getty Museum": "Getty Center",
    "Venice Beach": "Venice, Los Angeles",
    "Style Beverly Hills": "Beverly Hills",
    "Disneyland Park": "Disneyland",
    "The Grove": "The Grove (Los Angeles)",
    "Fisherman's Wharf": "Fisherman's Wharf, San Francisco",
    "Lombard Street": "Lombard Street (San Francisco)",
    "Chinatown San Francisco": "Chinatown, San Francisco",
    "Powell Street Cable Car Turnaround": "San Francisco cable car system",
    "The Las Vegas Strip": "Las Vegas Strip",
    "The Venetian Resort Las Vegas": "The Venetian Las Vegas",
    "High Roller Observation Wheel": "High Roller (Ferris wheel)",
    "Wynwood Arts District": "Wynwood",
    "HistoryMiami Museum": "HistoryMiami",
    "Wynwood Walls": "Wynwood Walls",
    "Walt Disney World Resort": "Walt Disney World",
    "Universal Orlando Resort": "Universal Orlando Resort",
    "Kennedy Space Center Fcu": "Kennedy Space Center",
    "Magic Kingdom Park": "Magic Kingdom",
    "The White House": "White House",
    "Thomas Jefferson Memorial": "Jefferson Memorial",

    # Australia
    "Royal Botanic Garden": "Royal Botanic Garden, Sydney",
    "The Rocks": "The Rocks, Sydney",
    "Royal Botanic Gardens": "Royal Botanic Gardens, Melbourne",
    "St Kilda Beach": "St Kilda, Victoria",
    "Ovolo Laneways": "Laneways of Melbourne",
    "Great Northern Hotel": "Great Ocean Road",

    # Dubai
    "dubai marina": "Dubai Marina",
    "Gold Souk": "Gold Souk",

    # Turkey
    "Old City Hagia Sophia Hotel": "Hagia Sophia",
    "Blue Mosque": "Sultan Ahmed Mosque",
    "Grand Bazaar": "Grand Bazaar, Istanbul",
    "Bosphorus": "Bosphorus",

    # Egypt
    "Great Pyramids of Giza": "Giza pyramid complex",
    "The Egyptian Museum": "Egyptian Museum",
    "Khan El Khalili Cafe": "Khan el-Khalili",
    "The Saladin Citadel of Cairo": "Citadel of Cairo",
    "Al Azhar Mosque": "Al-Azhar Mosque",
    "The Nile River": "Nile",
}

def search_wikipedia_image(query):
    """Wikipedia에서 이미지 검색"""
    url = f'https://en.wikipedia.org/w/api.php?action=query&titles={urllib.parse.quote(query)}&prop=pageimages&format=json&pithumbsize=600'

    try:
        response = requests.get(url, headers=HEADERS, timeout=10)
        if response.status_code == 200:
            data = response.json()
            pages = data.get('query', {}).get('pages', {})

            for page_id, page in pages.items():
                if page_id != '-1' and 'thumbnail' in page:
                    return page['thumbnail']['source']
    except Exception as e:
        print(f"    Error: {e}")

    return None

def main():
    # 기존 데이터 로드
    with open("attractions_with_images.json", "r", encoding="utf-8") as f:
        data = json.load(f)

    missing = 0
    found = 0

    for airport_code, attractions in data.items():
        for attraction in attractions:
            if attraction.get('image'):
                continue  # 이미 이미지 있음

            missing += 1
            name = attraction.get('name', '')

            # 매핑된 검색어 찾기
            search_query = None
            for key, value in SEARCH_MAPPING.items():
                if key in name:
                    search_query = value
                    break

            if search_query:
                image_url = search_wikipedia_image(search_query)
                if image_url:
                    attraction['image'] = image_url
                    found += 1
                    print(f"✓ {name[:40]} -> {search_query}")
                else:
                    print(f"✗ {name[:40]} -> {search_query}")
            else:
                print(f"? {name[:40]} (no mapping)")

            time.sleep(0.2)

    # 저장
    with open("attractions_with_images.json", "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

    print(f"\n\nMissing images: {missing}")
    print(f"Found new images: {found}")

if __name__ == "__main__":
    main()
