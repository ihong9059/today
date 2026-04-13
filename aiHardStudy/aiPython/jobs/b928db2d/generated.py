import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import random

# 주사위 100번 굴리기
results = [random.randint(1, 6) for _ in range(100)]

# 각 눈의 횟수 계산
counts = [results.count(i) for i in range(1, 7)]

# 히스토그램 그리기
plt.figure(figsize=(8, 5))
colors = ['#FF6B6B', '#FFD93D', '#6BCB77', '#4D96FF', '#9B59B6', '#FF8C42']
bars = plt.bar(range(1, 7), counts, color=colors, edgecolor='black', linewidth=1.2)

# 막대 위에 횟수 표시
for bar, count in zip(bars, counts):
    plt.text(bar.get_x() + bar.get_width()/2, bar.get_height() + 0.5,
             str(count), ha='center', va='bottom', fontsize=14, fontweight='bold')

plt.rcParams['font.family'] = 'sans-serif'
plt.title('주사위 100번 굴리기 결과', fontsize=16, fontweight='bold')
plt.xlabel('주사위 눈', fontsize=13)
plt.ylabel('횟수', fontsize=13)
plt.xticks(range(1, 7), ['⚀ 1', '⚁ 2', '⚂ 3', '⚃ 4', '⚄ 5', '⚅ 6'], fontsize=12)
plt.ylim(0, max(counts) + 5)
plt.grid(axis='y', alpha=0.3)
plt.tight_layout()

plt.savefig('/tmp/output.png', dpi=100, bbox_inches='tight')

# 결과 출력
print(f"총 {len(results)}번 굴린 결과:")
for i in range(1, 7):
    print(f"  {i}번 눈: {counts[i-1]}회 ({counts[i-1]}%)")
print(f"평균: {sum(results)/len(results):.2f}")