import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import random

# 주사위 100번 굴리기
results = [random.randint(1, 6) for _ in range(100)]

# 각 눈의 횟수 세기
counts = [results.count(i) for i in range(1, 7)]

# 히스토그램 그리기
fig, ax = plt.subplots(figsize=(8, 5))
colors = ['#FF6B6B', '#FFD93D', '#6BCB77', '#4D96FF', '#9B59B6', '#FF8C42']
bars = ax.bar(range(1, 7), counts, color=colors, edgecolor='white', linewidth=2)

# 막대 위에 횟수 표시
for bar, count in zip(bars, counts):
    ax.text(bar.get_x() + bar.get_width()/2, bar.get_height() + 0.5,
            str(count), ha='center', va='bottom', fontsize=14, fontweight='bold')

ax.set_xlabel('Dice Face', fontsize=13)
ax.set_ylabel('Frequency', fontsize=13)
ax.set_title('Rolling a Dice 100 Times', fontsize=16, fontweight='bold')
ax.set_xticks(range(1, 7))
ax.set_ylim(0, max(counts) + 5)
ax.grid(axis='y', alpha=0.3)

plt.tight_layout()
plt.savefig('/tmp/output.png', dpi=100, bbox_inches='tight')

# 결과 출력
print("주사위 100번 굴리기 결과:")
for i in range(1, 7):
    print(f"  {i}번: {counts[i-1]}회")
print(f"\n평균: {sum(results)/len(results):.2f}")
print(f"이론적 평균: 3.50")