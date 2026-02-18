from PIL import Image, ImageDraw
import os

def create_pilot_icon(size):
    """파일럿/비행기 테마 아이콘 생성"""
    img = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    center = size // 2
    radius = int(size * 0.45)

    # 배경 원 (빨간색 - 일본 테마)
    draw.ellipse([center - radius, center - radius,
                  center + radius, center + radius],
                 fill='#c41e3a')

    # 비행기 본체 (흰색)
    plane_scale = size / 108

    # 비행기 몸체
    body_points = [
        (center, int(center - 24 * plane_scale)),  # 앞
        (int(center + 4 * plane_scale), int(center - 5 * plane_scale)),
        (int(center + 4 * plane_scale), int(center + 16 * plane_scale)),
        (center, int(center + 20 * plane_scale)),  # 뒤
        (int(center - 4 * plane_scale), int(center + 16 * plane_scale)),
        (int(center - 4 * plane_scale), int(center - 5 * plane_scale)),
    ]
    draw.polygon(body_points, fill='white')

    # 날개 (좌우)
    wing_width = int(22 * plane_scale)
    wing_height = int(6 * plane_scale)
    wing_y = int(center - 2 * plane_scale)

    # 왼쪽 날개
    left_wing = [
        (int(center - 4 * plane_scale), wing_y - wing_height // 2),
        (int(center - 4 * plane_scale - wing_width), wing_y),
        (int(center - 4 * plane_scale), wing_y + wing_height // 2),
    ]
    draw.polygon(left_wing, fill='white')

    # 오른쪽 날개
    right_wing = [
        (int(center + 4 * plane_scale), wing_y - wing_height // 2),
        (int(center + 4 * plane_scale + wing_width), wing_y),
        (int(center + 4 * plane_scale), wing_y + wing_height // 2),
    ]
    draw.polygon(right_wing, fill='white')

    # 꼬리 날개
    tail_y = int(center + 14 * plane_scale)
    tail_width = int(10 * plane_scale)
    tail_height = int(4 * plane_scale)

    tail_left = [
        (int(center - 2 * plane_scale), tail_y),
        (int(center - 2 * plane_scale - tail_width), tail_y + tail_height),
        (int(center - 2 * plane_scale), tail_y + tail_height),
    ]
    draw.polygon(tail_left, fill='white')

    tail_right = [
        (int(center + 2 * plane_scale), tail_y),
        (int(center + 2 * plane_scale + tail_width), tail_y + tail_height),
        (int(center + 2 * plane_scale), tail_y + tail_height),
    ]
    draw.polygon(tail_right, fill='white')

    # 파일럿 윙 배지 (금색)
    badge_y = int(center + 22 * plane_scale)
    badge_width = int(14 * plane_scale)
    badge_height = int(4 * plane_scale)

    badge_points = [
        (int(center - badge_width), badge_y),
        (center, int(badge_y - badge_height)),
        (int(center + badge_width), badge_y),
        (center, int(badge_y + badge_height)),
    ]
    draw.polygon(badge_points, fill='#FFD700')

    # 일장기 마크 (빨간 원)
    flag_radius = int(3 * plane_scale)
    flag_y = int(center - 8 * plane_scale)
    draw.ellipse([center - flag_radius, flag_y - flag_radius,
                  center + flag_radius, flag_y + flag_radius],
                 fill='#c41e3a', outline='white', width=max(1, int(plane_scale)))

    return img

# 아이콘 크기별 생성
sizes = {
    'mipmap-mdpi': 48,
    'mipmap-hdpi': 72,
    'mipmap-xhdpi': 96,
    'mipmap-xxhdpi': 144,
    'mipmap-xxxhdpi': 192,
}

base_path = r'C:\todo\today\japan-app\app\src\main\res'

for folder, size in sizes.items():
    icon = create_pilot_icon(size)
    folder_path = os.path.join(base_path, folder)
    os.makedirs(folder_path, exist_ok=True)

    # 일반 아이콘
    icon.save(os.path.join(folder_path, 'ic_launcher.png'))
    # 둥근 아이콘
    icon.save(os.path.join(folder_path, 'ic_launcher_round.png'))
    print(f'Created {size}x{size} icons in {folder}')

print('All icons created successfully!')
