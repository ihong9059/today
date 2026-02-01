# 간단한 아이콘 생성 스크립트
# PIL이 없으면 설치: pip install Pillow

try:
    from PIL import Image, ImageDraw
except ImportError:
    print("Pillow가 필요합니다. 설치 중...")
    import subprocess
    subprocess.run(['pip', 'install', 'Pillow', '-q'])
    from PIL import Image, ImageDraw

def create_icon(size, filename):
    # 이미지 생성
    img = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    # 배경 원 (보라색 그라데이션 효과)
    margin = size // 10
    draw.ellipse([margin, margin, size - margin, size - margin],
                 fill=(102, 126, 234, 255))

    # 우유병 모양 (흰색)
    bottle_width = size // 3
    bottle_height = size // 2
    bottle_x = (size - bottle_width) // 2
    bottle_y = (size - bottle_height) // 2

    # 병 몸통
    draw.rectangle([bottle_x, bottle_y + size//8,
                    bottle_x + bottle_width, bottle_y + bottle_height],
                   fill=(255, 255, 255, 255))

    # 병 목
    neck_width = bottle_width // 2
    neck_x = (size - neck_width) // 2
    draw.rectangle([neck_x, bottle_y,
                    neck_x + neck_width, bottle_y + size//6],
                   fill=(255, 255, 255, 255))

    # 경고 표시 (빨간 원)
    alert_size = size // 4
    alert_x = size - alert_size - margin
    alert_y = size - alert_size - margin
    draw.ellipse([alert_x, alert_y, alert_x + alert_size, alert_y + alert_size],
                 fill=(231, 76, 60, 255))

    # 저장
    img.save(filename, 'PNG')
    print(f"Created: {filename}")

# 아이콘 생성
create_icon(16, 'icon16.png')
create_icon(48, 'icon48.png')
create_icon(128, 'icon128.png')

print("아이콘 생성 완료!")
