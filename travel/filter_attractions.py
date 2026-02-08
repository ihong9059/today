#!/usr/bin/env python3
"""
수집된 데이터에서 음식점/카페 등 제외하고 진짜 관광지만 필터링
"""

import json

# 제외할 카테고리 키워드
EXCLUDE_KEYWORDS = [
    "Restaurant", "Café", "Coffee", "Bar", "Pub", "Bakery",
    "Food", "Pizza", "Burger", "Sushi", "BBQ", "Grill",
    "Seafood", "Korean", "Chinese", "Japanese", "Thai", "Italian",
    "Mexican", "Indian", "French", "American", "Vietnamese",
    "Noodle", "Ramen", "Gukbap", "Steakhouse", "Diner",
    "Fast Food", "Sandwich", "Ice Cream", "Dessert", "Snack",
    "Juice", "Tea Room", "Brewery", "Winery", "Liquor",
    "Convenience Store", "Grocery", "Supermarket", "Market",
    "Hotel", "Hostel", "Motel", "Inn", "Resort", "Bed and Breakfast",
    "Apartment", "Condo", "Rental",
    "Gym", "Fitness", "Spa", "Salon", "Barber",
    "Bank", "ATM", "Office", "Shop", "Store", "Retail",
    "Pharmacy", "Hospital", "Clinic", "Doctor", "Dentist",
    "Gas Station", "Parking", "Car Wash", "Auto",
    "Metro Station", "Bus Station", "Train Station",
    "Bookstore", "Library", "School", "University", "College"
]

# 포함해야 할 관광지 카테고리
INCLUDE_KEYWORDS = [
    "Museum", "Palace", "Temple", "Shrine", "Church", "Mosque", "Cathedral",
    "Castle", "Monument", "Memorial", "Historic", "Heritage",
    "Park", "Garden", "Beach", "Lake", "Mountain", "Waterfall", "Nature",
    "Zoo", "Aquarium", "Amusement", "Theme Park",
    "Tower", "Bridge", "Landmark", "Scenic", "Lookout", "View",
    "Plaza", "Square", "Art Gallery", "Theater", "Theatre", "Opera", "Movie Theater", "Cinema",
    "Planetarium", "Observatory", "Statue", "Fountain",
    "National", "Royal", "Imperial", "Ancient", "Ruins"
]

def should_include(category):
    """카테고리가 관광지인지 확인"""
    if not category:
        return False

    category_lower = category.lower()

    # 제외 키워드 체크
    for keyword in EXCLUDE_KEYWORDS:
        if keyword.lower() in category_lower:
            return False

    # 포함 키워드 체크
    for keyword in INCLUDE_KEYWORDS:
        if keyword.lower() in category_lower:
            return True

    return False

def filter_attractions():
    # 데이터 로드
    with open("attractions.json", "r", encoding="utf-8") as f:
        data = json.load(f)

    filtered_data = {}
    total_before = 0
    total_after = 0

    for airport_code, attractions in data.items():
        total_before += len(attractions)

        filtered = [a for a in attractions if should_include(a.get("category", ""))]

        if filtered:
            filtered_data[airport_code] = filtered
            total_after += len(filtered)

    # 저장
    with open("attractions_filtered.json", "w", encoding="utf-8") as f:
        json.dump(filtered_data, f, ensure_ascii=False, indent=2)

    print(f"Before: {total_before} attractions")
    print(f"After: {total_after} attractions")
    print(f"Removed: {total_before - total_after}")
    print(f"Airports with attractions: {len(filtered_data)}")

    # 샘플 확인
    print("\n=== ICN (Seoul) 필터링된 관광지 ===")
    for p in filtered_data.get("ICN", [])[:15]:
        print(f"  {p['name']} - {p['category']}")

if __name__ == "__main__":
    filter_attractions()
