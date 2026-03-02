"""
Unsplash Source에서 두물머리 여행 관련 이미지 다운로드
"""
import urllib.request
import os
from pathlib import Path

# 이미지 저장 경로
output_dir = Path(__file__).parent / "public" / "images"
output_dir.mkdir(parents=True, exist_ok=True)

# 씬별 검색 키워드와 Unsplash 이미지 URL
# Unsplash Source 사용 (API 키 불필요)
images = {
    "intro": "https://images.unsplash.com/photo-1522383225653-ed111181a951?w=1920&h=1080&fit=crop",  # 벚꽃
    "dumulmeori": "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1920&h=1080&fit=crop",  # 강 풍경
    "breakfast": "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=1920&h=1080&fit=crop",  # 한국 음식
    "netinamu": "https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=1920&h=1080&fit=crop",  # 큰 나무
    "hwangpo": "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1920&h=1080&fit=crop",  # 전통 배
    "lunch": "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&h=1080&fit=crop",  # 피크닉
    "semiwon": "https://images.unsplash.com/photo-1474557157379-8aa74a6ef541?w=1920&h=1080&fit=crop",  # 연꽃 정원
    "mulraegil": "https://images.unsplash.com/photo-1551632811-561732d1e306?w=1920&h=1080&fit=crop",  # 산책로
    "sunset": "https://images.unsplash.com/photo-1507400492013-162706c8c05e?w=1920&h=1080&fit=crop",  # 일몰
    "outro": "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1920&h=1080&fit=crop",  # 친구들
}

def download_images():
    for name, url in images.items():
        output_path = output_dir / f"{name}.jpg"
        print(f"다운로드 중: {name}...")
        try:
            # User-Agent 헤더 추가
            request = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
            with urllib.request.urlopen(request, timeout=30) as response:
                with open(output_path, 'wb') as f:
                    f.write(response.read())
            print(f"  완료: {output_path}")
        except Exception as e:
            print(f"  실패: {e}")

    print(f"\n총 {len(images)}개 이미지 다운로드 완료!")
    print(f"저장 위치: {output_dir}")

if __name__ == "__main__":
    download_images()
