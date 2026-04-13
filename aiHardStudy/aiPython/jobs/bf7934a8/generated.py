import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import numpy as np

# 소수 판별 함수
def is_prime(n):
    if n < 2:
        return False
    for i in range(2, int(n**0.5) + 1):
        if n % i == 0:
            return False
    return True

# 1부터 100까지 소수 찾기
primes = [n for n in range(2, 101) if is_prime(n)]

# 결과 출력
print("1부터 100까지의 소수 목록:")
print(primes)
print(f"\n총 {len(primes)}개의 소수가 있습니다.")

# 시각화: 10x10 격자에 소수 표시
fig, ax = plt.subplots(figsize=(8, 8))

for num in range(1, 101):
    row = (num - 1) // 10
    col = (num - 1) % 10
    y = 9 - row  # 위에서 아래로

    if num in primes:
        color = '#FF6B6B'
        textcolor = 'white'
        fontweight = 'bold'
    else:
        color = '#E8E8E8'
        textcolor = '#888888'
        fontweight = 'normal'

    rect = plt.Rectangle((col, y), 0.9, 0.9, facecolor=color, edgecolor='white', linewidth=2)
    ax.add_patch(rect)
    ax.text(col + 0.45, y + 0.45, str(num), ha='center', va='center',
            fontsize=11, color=textcolor, fontweight=fontweight)

ax.set_xlim(-0.1, 10.1)
ax.set_ylim(-0.1, 10.1)
ax.set_aspect('equal')
ax.axis('off')
ax.set_title(f'Prime Numbers from 1 to 100 (Total: {len(primes)})', fontsize=16, fontweight='bold', pad=15)

# 범례
ax.add_patch(plt.Rectangle((0.5, -0.7), 0.5, 0.5, facecolor='#FF6B6B', edgecolor='white'))
ax.text(1.2, -0.45, 'Prime', fontsize=12, va='center')
ax.add_patch(plt.Rectangle((3.5, -0.7), 0.5, 0.5, facecolor='#E8E8E8', edgecolor='white'))
ax.text(4.2, -0.45, 'Not Prime', fontsize=12, va='center')

plt.savefig('/tmp/output.png', dpi=100, bbox_inches='tight', facecolor='white')