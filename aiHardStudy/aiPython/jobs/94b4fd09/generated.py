# 1부터 100까지 소수 찾기
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

# 1~100에서 소수 찾기
primes = [n for n in range(1, 101) if is_prime(n)]

# 결과 출력
print("=" * 40)
print("  1부터 100까지의 소수")
print("=" * 40)
print(f"총 {len(primes)}개의 소수를 찾았습니다!\n")
for i in range(0, len(primes), 5):
    row = primes[i:i+5]
    print("  ".join(f"{p:4d}" for p in row))
print()

# 시각화: 1~100 숫자 격자에서 소수 표시
fig, ax = plt.subplots(figsize=(8, 8))

# 10x10 격자 생성
for num in range(1, 101):
    row = (num - 1) // 10
    col = (num - 1) % 10
    y = 9 - row  # 위에서 아래로

    if is_prime(num):
        # 소수는 주황색 원
        circle = plt.Circle((col, y), 0.4, color='#FF6B35', alpha=0.85)
        ax.add_patch(circle)
        ax.text(col, y, str(num), ha='center', va='center',
                fontsize=11, fontweight='bold', color='white')
    else:
        # 소수가 아닌 수는 회색 사각형
        rect = plt.Rectangle((col-0.4, y-0.4), 0.8, 0.8,
                              color='#E8E8E8', alpha=0.5)
        ax.add_patch(rect)
        ax.text(col, y, str(num), ha='center', va='center',
                fontsize=9, color='#AAAAAA')

ax.set_xlim(-0.6, 9.6)
ax.set_ylim(-0.6, 9.6)
ax.set_aspect('equal')
ax.set_title('Prime Numbers from 1 to 100', fontsize=16, fontweight='bold', pad=15)
ax.text(4.5, -1.2, f'Orange = Prime ({len(primes)} found)  |  Gray = Not Prime',
        ha='center', fontsize=11, color='#555555')
ax.axis('off')

plt.tight_layout()
plt.savefig('/tmp/output.png', dpi=100, bbox_inches='tight')
print("소수 분포 격자 이미지를 생성했습니다.")