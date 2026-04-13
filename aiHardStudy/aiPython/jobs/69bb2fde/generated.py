# 1부터 100까지 소수 찾기
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import math

# 소수 판별 함수
def is_prime(n):
    if n < 2:
        return False
    for i in range(2, int(math.sqrt(n)) + 1):
        if n % i == 0:
            return False
    return True

# 1~100에서 소수 찾기
primes = [n for n in range(1, 101) if is_prime(n)]

# 결과 출력
print("=" * 40)
print("1부터 100까지의 소수")
print("=" * 40)
print(f"총 {len(primes)}개: {primes}")

# 10x10 격자로 시각화
fig, ax = plt.subplots(figsize=(8, 8))

for num in range(1, 101):
    row = (num - 1) // 10
    col = (num - 1) % 10
    y = 9 - row  # 위에서 아래로

    if is_prime(num):
        color = '#FF6B6B'
        fontweight = 'bold'
        # 소수 배경 원
        circle = plt.Circle((col, y), 0.4, color=color, alpha=0.3)
        ax.add_patch(circle)
    else:
        color = '#AAAAAA'
        fontweight = 'normal'

    ax.text(col, y, str(num), ha='center', va='center',
            fontsize=11, fontweight=fontweight, color=color)

ax.set_xlim(-0.6, 9.6)
ax.set_ylim(-0.6, 9.6)
ax.set_aspect('equal')
ax.set_title(f'Prime Numbers from 1 to 100 (Total: {len(primes)})', fontsize=16, fontweight='bold')
ax.axis('off')

# 범례 표시
ax.text(4.5, -0.5, 'Red = Prime / Gray = Not Prime', ha='center', fontsize=10, color='#666666')

plt.savefig('/tmp/output.png', dpi=100, bbox_inches='tight', facecolor='white')