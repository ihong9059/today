#!/usr/bin/env python3
"""
Travel English 시나리오 생성기
템플릿을 조합하여 최종 시나리오를 생성합니다.

조합 규칙:
- 공통(50) + 도시(20) + 목적(20) + 예산(15) = 105개 scene
"""

import json
import os
from datetime import datetime

TEMPLATES_DIR = os.path.dirname(os.path.abspath(__file__))

def load_json(filename):
    """JSON 파일 로드"""
    filepath = os.path.join(TEMPLATES_DIR, filename)
    with open(filepath, 'r', encoding='utf-8') as f:
        return json.load(f)

def generate_scenario(city_id, budget_type, purpose_type):
    """
    시나리오 생성

    Args:
        city_id: 도시 ID (예: 'amsterdam')
        budget_type: 예산 타입 ('budget', 'economy', 'normal')
        purpose_type: 목적 타입 ('tourism', 'backpacking', 'business', 'study',
                                 'working_holiday', 'honeymoon', 'family', 'adventure')

    Returns:
        완성된 시나리오 JSON
    """

    # 1. 템플릿 로드
    common = load_json('common_template.json')
    budgets = load_json('budget_templates.json')
    transfers = load_json('transfer_templates.json')

    # 목적별 템플릿 로드 (1/2)
    purposes1 = load_json('purpose_templates_1.json')
    purposes2 = load_json('purpose_templates_2.json')

    # 목적 템플릿 병합
    all_purposes = {**purposes1['templates'], **purposes2['templates']}

    city = load_json(f'city_{city_id}.json')

    # 2. 각 템플릿에서 씬 추출
    common_scenes = common['scenes']  # 50개
    budget_scenes = budgets['templates'][budget_type]['scenes']  # 15개
    purpose_scenes = all_purposes[purpose_type]['scenes']  # 20개
    city_scenes = city['scenes']  # 20개

    # 예산에 따른 환승 씬 결정
    transfer_scenes = []
    if budget_type == 'budget':
        # 최저가: 베이징 + 모스크바 경유
        transfer_scenes.extend(transfers['transfers']['beijing']['scenes'])
        transfer_scenes.extend(transfers['transfers']['moscow']['scenes'])
    elif budget_type == 'economy':
        # 절감형: 이스탄불 경유
        transfer_scenes.extend(transfers['transfers']['istanbul']['scenes'])

    # 3. 씬 조합 및 Day 배정
    all_scenes = []
    scene_idx = 0

    # Day 1: 공항 출발 + 기내 (공통 1-18) - 첫 번째 비행
    for scene in common_scenes[:18]:
        scene_copy = scene.copy()
        scene_copy['sceneIndex'] = scene_idx
        all_scenes.append(scene_copy)
        scene_idx += 1

    # 환승 씬 삽입 (기내 씬 이후, 입국 전)
    for scene in transfer_scenes:
        scene_copy = scene.copy()
        scene_copy['day'] = 1
        scene_copy['sceneIndex'] = scene_idx
        all_scenes.append(scene_copy)
        scene_idx += 1

    # Day 1 후반: 입국/도착 + 호텔 체크인 (공통 19-31)
    for scene in common_scenes[18:31]:
        scene_copy = scene.copy()
        scene_copy['sceneIndex'] = scene_idx
        all_scenes.append(scene_copy)
        scene_idx += 1

    # Day 2-8: 도시별 관광 + 예산별 + 목적별 혼합
    # 도시별 씬을 Day 2-8에 분산
    for i, scene in enumerate(city_scenes):
        scene_copy = scene.copy()
        scene_copy['day'] = 2 + (i % 7)  # Day 2-8
        scene_copy['sceneIndex'] = scene_idx
        all_scenes.append(scene_copy)
        scene_idx += 1

    # 목적별 씬을 Day 2-9에 분산
    for i, scene in enumerate(purpose_scenes):
        scene_copy = scene.copy()
        scene_copy['day'] = 2 + (i % 8)  # Day 2-9
        scene_copy['sceneIndex'] = scene_idx
        all_scenes.append(scene_copy)
        scene_idx += 1

    # 예산별 씬을 전체에 분산 (숙박, 식사, 교통 관련)
    for i, scene in enumerate(budget_scenes):
        scene_copy = scene.copy()
        scene_copy['day'] = 2 + (i % 8)  # Day 2-9
        scene_copy['sceneIndex'] = scene_idx
        all_scenes.append(scene_copy)
        scene_idx += 1

    # Day 9-10: 호텔 + 귀국 (공통 32-50)
    for scene in common_scenes[31:]:
        scene_copy = scene.copy()
        if scene['id'].startswith('C04') or scene['id'].startswith('C05'):
            scene_copy['day'] = 10
        else:
            scene_copy['day'] = 9
        scene_copy['sceneIndex'] = scene_idx
        all_scenes.append(scene_copy)
        scene_idx += 1

    # 4. Day별로 정렬
    all_scenes.sort(key=lambda x: (x.get('day', 1), x.get('sceneIndex', 0)))

    # 5. 최종 sceneIndex 재할당
    for i, scene in enumerate(all_scenes):
        scene['sceneIndex'] = i

    # 6. 시나리오 메타데이터 생성
    budget_names = {'budget': '최저가', 'economy': '절감형', 'normal': '일반'}
    purpose_names = {
        'tourism': '관광', 'backpacking': '배낭여행', 'business': '출장',
        'study': '어학연수', 'working_holiday': '워홀', 'honeymoon': '신혼여행',
        'family': '가족여행', 'adventure': '모험'
    }

    # 도시별 좌표 (지도 표시용)
    city_coords = {
        'amsterdam': {'lat': 52.3676, 'lng': 4.9041}
    }

    # 경유지 좌표
    stopover_coords = {
        'beijing': {'city': '베이징', 'lat': 39.9042, 'lng': 116.4074},
        'shanghai': {'city': '상하이', 'lat': 31.2304, 'lng': 121.4737},
        'hongkong': {'city': '홍콩', 'lat': 22.3193, 'lng': 114.1694},
        'dubai': {'city': '두바이', 'lat': 25.2048, 'lng': 55.2708},
        'istanbul': {'city': '이스탄불', 'lat': 41.0082, 'lng': 28.9784},
        'frankfurt': {'city': '프랑크푸르트', 'lat': 50.1109, 'lng': 8.6821},
        'moscow': {'city': '모스크바', 'lat': 55.7558, 'lng': 37.6173},
    }

    dest_coord = city_coords.get(city_id, {'lat': 52.3676, 'lng': 4.9041})

    # 예산에 따른 경로 설정
    if budget_type == 'budget':
        # 최저가: 2회 경유 (중국/홍콩 + 중동)
        route = [
            {"city": "서울", "lat": 37.5665, "lng": 126.9780},
            {"city": "베이징", "lat": 39.9042, "lng": 116.4074},
            {"city": "모스크바", "lat": 55.7558, "lng": 37.6173},
            {"city": city['cityName'], "lat": dest_coord['lat'], "lng": dest_coord['lng']}
        ]
    elif budget_type == 'economy':
        # 절감형: 1회 경유 (두바이/이스탄불)
        route = [
            {"city": "서울", "lat": 37.5665, "lng": 126.9780},
            {"city": "이스탄불", "lat": 41.0082, "lng": 28.9784},
            {"city": city['cityName'], "lat": dest_coord['lat'], "lng": dest_coord['lng']}
        ]
    else:
        # 일반: 직항
        route = [
            {"city": "서울", "lat": 37.5665, "lng": 126.9780},
            {"city": city['cityName'], "lat": dest_coord['lat'], "lng": dest_coord['lng']}
        ]

    scenario = {
        "info": {
            "departure": "서울/인천",
            "destination": city['cityName'],
            "country": city['country'],
            "purpose": purpose_names[purpose_type],
            "budget": budget_names[budget_type],
            "duration": "10일",
            "sceneCount": len(all_scenes),
            "generatedAt": datetime.now().isoformat(),
            "templateVersion": "1.0"
        },
        "composition": {
            "common": len(common_scenes),
            "city": len(city_scenes),
            "purpose": len(purpose_scenes),
            "budget": len(budget_scenes),
            "transfer": len(transfer_scenes)
        },
        "route": route,
        "scenes": all_scenes
    }

    return scenario


def save_scenario(scenario, output_path):
    """시나리오를 JSON 파일로 저장"""
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(scenario, f, ensure_ascii=False, indent=2)
    print(f"시나리오 저장: {output_path}")
    print(f"총 {scenario['info']['sceneCount']}개 scene")


def generate_all_combinations(city_id):
    """특정 도시의 모든 예산/목적 조합 생성"""
    budgets = ['budget', 'economy', 'normal']
    purposes = ['tourism', 'backpacking', 'business', 'study',
                'working_holiday', 'honeymoon', 'family', 'adventure']

    output_dir = os.path.join(TEMPLATES_DIR, '..', 'scenarios', 'generated')
    os.makedirs(output_dir, exist_ok=True)

    count = 0
    for budget in budgets:
        for purpose in purposes:
            scenario = generate_scenario(city_id, budget, purpose)
            filename = f"{city_id}_{budget}_{purpose}.json"
            output_path = os.path.join(output_dir, filename)
            save_scenario(scenario, output_path)
            count += 1

    print(f"\n총 {count}개 시나리오 생성 완료!")


if __name__ == '__main__':
    import sys

    if len(sys.argv) < 2:
        print("사용법:")
        print("  python scenario_generator.py <city_id> [budget] [purpose]")
        print("  python scenario_generator.py amsterdam tourism normal")
        print("  python scenario_generator.py amsterdam --all  # 모든 조합 생성")
        sys.exit(1)

    city_id = sys.argv[1]

    if len(sys.argv) == 3 and sys.argv[2] == '--all':
        generate_all_combinations(city_id)
    elif len(sys.argv) >= 4:
        budget = sys.argv[2]
        purpose = sys.argv[3]
        scenario = generate_scenario(city_id, budget, purpose)

        output_dir = os.path.join(TEMPLATES_DIR, '..', 'scenarios')
        os.makedirs(output_dir, exist_ok=True)
        output_path = os.path.join(output_dir, f"{city_id}_{budget}_{purpose}.json")
        save_scenario(scenario, output_path)
    else:
        # 기본값: 암스테르담 관광 일반
        scenario = generate_scenario(city_id, 'normal', 'tourism')
        output_dir = os.path.join(TEMPLATES_DIR, '..', 'scenarios')
        os.makedirs(output_dir, exist_ok=True)
        output_path = os.path.join(output_dir, f"{city_id}_tourism.json")
        save_scenario(scenario, output_path)
