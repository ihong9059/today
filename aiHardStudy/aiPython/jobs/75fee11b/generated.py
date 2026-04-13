import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import numpy as np

# BMI 계산 함수 정의
def calculate_bmi(weight_kg, height_cm):
    """BMI를 계산하는 함수"""
    height_m = height_cm / 100  # cm를 m로 변환
    bmi = weight_kg / (height_m ** 2)  # BMI 공식
    return round(bmi, 1)

# BMI 판정 함수
def get_bmi_category(bmi):
    """BMI 수치에 따른 판정"""
    if bmi < 18.5:
        return "저체중"
    elif bmi < 23.0:
        return "정상"
    elif bmi < 25.0:
        return "과체중"
    elif bmi < 30.0:
        return "비만"
    else:
        return "고도비만"

# 다양한 예시로 BMI 계산
print("=" * 40)
print("  BMI 계산기 (Body Mass Index)")
print("=" * 40)
print(f"  공식: BMI = 체중(kg) / 신장(m)^2")
print("=" * 40)

# 예시 데이터
examples = [
    ("철수", 60, 170),
    ("영희", 55, 163),
    ("민수", 85, 175),
    ("지현", 48, 160),
    ("동훈", 95, 168),
]

bmis = []
names = []
colors = []

# 판정별 색상
color_map = {
    "저체중": "#3498db",
    "정상": "#2ecc71",
    "과체중": "#f39c12",
    "비만": "#e74c3c",
    "고도비만": "#8e44ad",
}

print()
for name, weight, height in examples:
    bmi = calculate_bmi(weight, height)
    category = get_bmi_category(bmi)
    bmis.append(bmi)
    names.append(name)
    colors.append(color_map[category])
    print(f"  {name}: {weight}kg, {height}cm → BMI {bmi} ({category})")

print()
print("-" * 40)
print("  [BMI 기준표 - WHO 아시아태평양]")
print("  저체중:   BMI < 18.5")
print("  정상:     18.5 <= BMI < 23.0")
print("  과체중:   23.0 <= BMI < 25.0")
print("  비만:     25.0 <= BMI < 30.0")
print("  고도비만: BMI >= 30.0")
print("-" * 40)

# 시각화
fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(12, 5))

# 왼쪽: 막대 그래프
bars = ax1.bar(names, bmis, color=colors, edgecolor='white', linewidth=1.5)
ax1.set_title('BMI Comparison by Person', fontsize=14, fontweight='bold')
ax1.set_xlabel('Person', fontsize=11)
ax1.set_ylabel('BMI', fontsize=11)

# BMI 기준선 표시
ax1.axhline(y=18.5, color='#3498db', linestyle='--', alpha=0.5, label='Underweight (18.5)')
ax1.axhline(y=23.0, color='#2ecc71', linestyle='--', alpha=0.5, label='Normal (23.0)')
ax1.axhline(y=25.0, color='#f39c12', linestyle='--', alpha=0.5, label='Overweight (25.0)')
ax1.axhline(y=30.0, color='#e74c3c', linestyle='--', alpha=0.5, label='Obese (30.0)')

# 막대 위에 수치 표시
for bar, bmi in zip(bars, bmis):
    ax1.text(bar.get_x() + bar.get_width()/2, bar.get_height() + 0.3,
             f'{bmi}', ha='center', fontsize=11, fontweight='bold')

ax1.set_ylim(0, max(bmis) + 5)
ax1.legend(fontsize=8, loc='upper left')
ax1.grid(axis='y', alpha=0.3)

# 오른쪽: BMI 범위 차트
categories = ['Underweight', 'Normal', 'Overweight', 'Obese', 'Severe']
ranges = [18.5, 4.5, 2.0, 5.0, 10.0]  # 각 구간 크기
cat_colors = ['#3498db', '#2ecc71', '#f39c12', '#e74c3c', '#8e44ad']
bottom = [0, 18.5, 23.0, 25.0, 30.0]

for i in range(len(categories)):
    ax2.barh(0, ranges[i], left=bottom[i], height=0.5,
             color=cat_colors[i], edgecolor='white', label=categories[i])
    ax2.text(bottom[i] + ranges[i]/2, 0, f'{categories[i]}\n{bottom[i]}~',
             ha='center', va='center', fontsize=8, fontweight='bold', color='white')

# 각 사람의 BMI를 점으로 표시
for i, (name, bmi) in enumerate(zip(names, bmis)):
    ax2.plot(bmi, 0.35, 'v', markersize=12, color='black')
    ax2.text(bmi, 0.42, name, ha='center', fontsize=9, fontweight='bold')

ax2.set_title('BMI Scale with Individual Positions', fontsize=14, fontweight='bold')
ax2.set_xlabel('BMI Value', fontsize=11)
ax2.set_xlim(10, 40)
ax2.set_yticks([])
ax2.grid(axis='x', alpha=0.3)

plt.tight_layout()
plt.savefig('/tmp/output.png', dpi=100, bbox_inches='tight')
print("\n  [BMI 비교 차트가 생성되었습니다]")