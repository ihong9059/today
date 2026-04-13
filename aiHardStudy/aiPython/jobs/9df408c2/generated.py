import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import random

# 랜덤 숫자 50개 생성
random.seed()
numbers = [random.randint(1, 100) for _ in range(50)]

# 꺾은선 그래프 그리기
plt.figure(figsize=(10, 5))
plt.plot(range(1, 51), numbers, marker='o', markersize=4, linewidth=1.5, color='dodgerblue')

# 평균선 표시
avg = sum(numbers) / len(numbers)
plt.axhline(y=avg, color='red', linestyle='--', linewidth=1, label=f'Average: {avg:.1f}')

plt.title('Line Graph of 50 Random Numbers', fontsize=14)
plt.xlabel('Index', fontsize=12)
plt.ylabel('Value', fontsize=12)
plt.legend(fontsize=11)
plt.grid(True, alpha=0.3)
plt.tight_layout()

plt.savefig('/tmp/output.png', dpi=100, bbox_inches='tight')

# 결과 출력
print(f"랜덤 숫자 50개 생성 완료!")
print(f"최솟값: {min(numbers)}, 최댓값: {max(numbers)}, 평균: {avg:.1f}")