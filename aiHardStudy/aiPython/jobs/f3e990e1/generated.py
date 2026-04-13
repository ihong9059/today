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

# 1부터 100까지 소수 찾기
primes = [n for n in range(2, 101) if is_prime(n)]

# 결과 출력
print(f"1부터 100까지 소수 ({len(primes)}개):")
print(primes)

# 시각화: 숫자 격자에서 소수 표시
fig, ax = plt.subplots(figsize=(8, 8))

for num in range(1, 101):
    row = (num - 1) // 10
    col = (num - 1) % 10
    y = 9 - row  # 위에서 아래로

    if num in primes:
        color = '#e74c3c'
        fontweight = 'bold'
        # 소수 배경 원
        circle = plt.Circle((col, y), 0.4, color='#e74c3c', alpha=0.2)
        ax.add_patch(circle)
    else:
        color = '#bdc3c7'
        fontweight = 'normal'

    ax.text(col, y, str(num), ha='center', va='center',
            fontsize=12, color=color, fontweight=fontweight)

ax.set_xlim(-0.7, 9.7)
ax.set_ylim(-0.7, 9.7)
ax.set_aspect('equal')
ax.axis('off')
ax.set_title(f'Prime Numbers from 1 to 100 ({len(primes)} found)', fontsize=16, fontweight='bold', pad=15)

plt.tight_layout()
plt.savefig('/tmp/output.png', dpi=100, bbox_inches='tight')