"""
모델 9: PID Control RPM 최적화 시뮬레이션
- 룰 기반 Look-up Table + PID 피드백 제어
- 재료별 기본 RPM 결정 후 PID로 미세 조정
"""
import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

import numpy as np
import matplotlib.pyplot as plt
import matplotlib
matplotlib.rcParams['font.family'] = 'Malgun Gothic'
matplotlib.rcParams['axes.unicode_minus'] = False

from common_data import generate_shredder_full_data


# ============================================================
# 1. PID Controller
# ============================================================
class PIDController:
    """이산 PID 제어기"""

    def __init__(self, Kp=0.5, Ki=0.05, Kd=0.1,
                 output_min=-10, output_max=10):
        self.Kp = Kp
        self.Ki = Ki
        self.Kd = Kd
        self.output_min = output_min
        self.output_max = output_max

        self.integral = 0.0
        self.prev_error = 0.0

        # 기록용
        self.history_p = []
        self.history_i = []
        self.history_d = []
        self.history_output = []

    def compute(self, error, dt=60):
        """PID 출력: u(t) = Kp*e + Ki*integral(e) + Kd*de/dt"""
        # P (비례)
        p_term = self.Kp * error

        # I (적분) + Anti-windup
        self.integral += error * dt
        self.integral = np.clip(self.integral, -200, 200)
        i_term = self.Ki * self.integral

        # D (미분)
        derivative = (error - self.prev_error) / dt if dt > 0 else 0
        d_term = self.Kd * derivative
        self.prev_error = error

        output = p_term + i_term + d_term
        output = np.clip(output, self.output_min, self.output_max)

        # 기록
        self.history_p.append(p_term)
        self.history_i.append(i_term)
        self.history_d.append(d_term)
        self.history_output.append(output)

        return output

    def reset(self):
        self.integral = 0.0
        self.prev_error = 0.0


# ============================================================
# 2. RPM Look-up Table
# ============================================================
RPM_TABLE = {
    'battery': {30: (100, 100), 50: (80, 80), 80: (60, 60)},
    'plastic': {30: (120, 120), 50: (90, 90), 80: (70, 70)},
    'metal':   {30: (80, 80),   50: (65, 65), 80: (50, 50)},
    'mixed':   {30: (90, 90),   50: (75, 75), 80: (55, 55)},
}

RPM_MIN, RPM_MAX = 30, 140


def lookup_base_rpm(material, target_size):
    """Look-up Table에서 기본 RPM을 보간하여 결정"""
    table = RPM_TABLE.get(material, RPM_TABLE['mixed'])
    sizes = sorted(table.keys())

    if target_size in table:
        return table[target_size]

    for i in range(len(sizes) - 1):
        if sizes[i] <= target_size <= sizes[i + 1]:
            ratio = (target_size - sizes[i]) / (sizes[i + 1] - sizes[i])
            rpm_a = table[sizes[i]][0] + ratio * (table[sizes[i + 1]][0] - table[sizes[i]][0])
            rpm_b = table[sizes[i]][1] + ratio * (table[sizes[i + 1]][1] - table[sizes[i]][1])
            return rpm_a, rpm_b

    if target_size < sizes[0]:
        return table[sizes[0]]
    return table[sizes[-1]]


def clamp_rpm(rpm):
    return max(RPM_MIN, min(RPM_MAX, rpm))


# ============================================================
# 3. 파쇄 크기 시뮬레이션 (모델 8 출력 모사)
# ============================================================
def simulate_shred_size(rpm_a, rpm_b, material, noise_std=3.0, rng=None):
    """
    RPM이 높을수록 파쇄 크기가 작아지는 관계 시뮬레이션.
    실제로는 모델 8의 Random Forest 예측값을 사용.
    """
    if rng is None:
        rng = np.random.RandomState(0)

    hardness = {'battery': 1.0, 'plastic': 0.7, 'metal': 1.5, 'mixed': 1.1}
    h = hardness.get(material, 1.0)

    avg_rpm = (rpm_a + rpm_b) / 2.0
    # 기본 관계: 높은 RPM → 작은 파쇄 크기
    base_size = 150 - avg_rpm * 1.2
    # 경도 보정
    base_size *= h
    # 노이즈
    base_size += rng.normal(0, noise_std)
    return max(10, base_size)


# ============================================================
# 4. PID 제어 시뮬레이션 (Step Response)
# ============================================================
def run_pid_simulation(material='battery', target_size=50, n_steps=60,
                       dt=60, Kp=0.5, Ki=0.05, Kd=0.1):
    """
    PID 제어 시뮬레이션 실행.
    매 스텝마다:
      1) Look-up Table에서 기본 RPM 결정
      2) 현재 파쇄 크기와 목표의 차이(error) 계산
      3) PID로 RPM 보정
      4) 보정된 RPM로 파쇄 크기 시뮬레이션
    """
    rng = np.random.RandomState(42)
    pid = PIDController(Kp=Kp, Ki=Ki, Kd=Kd, output_min=-10, output_max=10)

    base_rpm_a, base_rpm_b = lookup_base_rpm(material, target_size)

    # 초기 상태: 목표보다 큰 파쇄 크기 (튜닝 전)
    current_size = target_size + 15  # 15mm 초과에서 시작

    # 기록
    times = []
    sizes = []
    targets = []
    rpm_a_hist = []
    rpm_b_hist = []
    errors = []

    for step in range(n_steps):
        t = step * dt / 60.0  # 분 단위

        # 오차 계산 (양수 = 현재가 목표보다 큼 → RPM 올려야 함)
        error = current_size - target_size

        # PID 조정
        pid_adj = pid.compute(error, dt=dt)

        # RPM 적용 (error 양수 → RPM 증가 → 더 잘게 파쇄)
        rpm_a = clamp_rpm(base_rpm_a + pid_adj)
        rpm_b = clamp_rpm(base_rpm_b + pid_adj)

        # 기록
        times.append(t)
        sizes.append(current_size)
        targets.append(target_size)
        rpm_a_hist.append(rpm_a)
        rpm_b_hist.append(rpm_b)
        errors.append(error)

        # 다음 스텝 파쇄 크기 (RPM 변경 효과 반영)
        current_size = simulate_shred_size(rpm_a, rpm_b, material, noise_std=2.0, rng=rng)

    return {
        'times': np.array(times),
        'sizes': np.array(sizes),
        'targets': np.array(targets),
        'rpm_a': np.array(rpm_a_hist),
        'rpm_b': np.array(rpm_b_hist),
        'errors': np.array(errors),
        'pid_p': np.array(pid.history_p),
        'pid_i': np.array(pid.history_i),
        'pid_d': np.array(pid.history_d),
        'pid_output': np.array(pid.history_output),
        'material': material,
        'target_size': target_size,
        'base_rpm_a': base_rpm_a,
        'base_rpm_b': base_rpm_b,
    }


# ============================================================
# 5. 결과 시각화
# ============================================================
def plot_results(result, save_path='pid_control_result.png'):
    fig, axes = plt.subplots(2, 2, figsize=(16, 12))
    fig.suptitle('모델 9: PID Control RPM 최적화 시뮬레이션', fontsize=16, fontweight='bold', y=0.98)

    material_names = {'battery': '폐배터리', 'plastic': '플라스틱', 'metal': '금속', 'mixed': '혼합물'}
    mat_name = material_names.get(result['material'], result['material'])

    # --- 1) Setpoint vs 실제 파쇄 크기 ---
    ax1 = axes[0, 0]
    ax1.plot(result['times'], result['sizes'], 'b-', linewidth=2, label='실제 파쇄 크기', alpha=0.9)
    ax1.axhline(y=result['target_size'], color='r', linestyle='--', linewidth=2, label=f'목표 크기 ({result["target_size"]}mm)')
    ax1.fill_between(result['times'],
                     result['target_size'] - 3, result['target_size'] + 3,
                     alpha=0.15, color='green', label='허용 범위 (±3mm)')
    ax1.set_xlabel('시간 (분)')
    ax1.set_ylabel('파쇄 크기 (mm)')
    ax1.set_title(f'Setpoint 추종 — 재료: {mat_name}', fontweight='bold')
    ax1.legend(loc='upper right', fontsize=9)
    ax1.grid(True, alpha=0.3)

    # 수렴 시간 표시
    within_tol = np.abs(result['sizes'] - result['target_size']) < 3
    settle_idx = None
    for i in range(len(within_tol)):
        if all(within_tol[i:min(i + 5, len(within_tol))]):
            settle_idx = i
            break
    if settle_idx is not None:
        ax1.axvline(x=result['times'][settle_idx], color='green', linestyle=':', alpha=0.7)
        ax1.annotate(f'수렴 시점: {result["times"][settle_idx]:.0f}분',
                     xy=(result['times'][settle_idx], result['sizes'][settle_idx]),
                     xytext=(result['times'][settle_idx] + 3, result['sizes'][settle_idx] + 5),
                     arrowprops=dict(arrowstyle='->', color='green'),
                     fontsize=9, color='green', fontweight='bold')

    # --- 2) RPM 조정 추이 ---
    ax2 = axes[0, 1]
    ax2.plot(result['times'], result['rpm_a'], 'b-', linewidth=2, label='RPM A축', alpha=0.9)
    ax2.plot(result['times'], result['rpm_b'], 'r--', linewidth=2, label='RPM B축', alpha=0.9)
    ax2.axhline(y=result['base_rpm_a'], color='gray', linestyle=':', alpha=0.5,
                label=f'기본 RPM ({result["base_rpm_a"]:.0f})')
    ax2.fill_between(result['times'], RPM_MIN, RPM_MAX, alpha=0.05, color='blue', label='안전 범위')
    ax2.set_xlabel('시간 (분)')
    ax2.set_ylabel('RPM')
    ax2.set_title('RPM 조정 추이', fontweight='bold')
    ax2.legend(loc='upper right', fontsize=9)
    ax2.grid(True, alpha=0.3)

    # --- 3) PID 구성 요소 ---
    ax3 = axes[1, 0]
    ax3.plot(result['times'], result['pid_p'], 'b-', linewidth=1.5, label='P (비례)', alpha=0.8)
    ax3.plot(result['times'], result['pid_i'], 'g-', linewidth=1.5, label='I (적분)', alpha=0.8)
    ax3.plot(result['times'], result['pid_d'], 'r-', linewidth=1.5, label='D (미분)', alpha=0.8)
    ax3.plot(result['times'], result['pid_output'], 'k-', linewidth=2.5, label='PID 출력 (합)', alpha=0.9)
    ax3.axhline(y=0, color='gray', linestyle='-', alpha=0.3)
    ax3.set_xlabel('시간 (분)')
    ax3.set_ylabel('RPM 보정값')
    ax3.set_title('PID 구성 요소 (P / I / D)', fontweight='bold')
    ax3.legend(loc='upper right', fontsize=9)
    ax3.grid(True, alpha=0.3)

    # --- 4) 재료별 RPM Look-up Table ---
    ax4 = axes[1, 1]
    materials = ['battery', 'plastic', 'metal', 'mixed']
    mat_labels = ['폐배터리', '플라스틱', '금속', '혼합물']
    target_sizes = [30, 50, 80]
    colors_map = ['#2563eb', '#7c3aed', '#059669', '#d97706']

    x_pos = np.arange(len(target_sizes))
    width = 0.18
    for i, (mat, label, color) in enumerate(zip(materials, mat_labels, colors_map)):
        rpms = [RPM_TABLE[mat][sz][0] for sz in target_sizes]
        bars = ax4.bar(x_pos + i * width, rpms, width, label=label, color=color, alpha=0.85,
                       edgecolor='white', linewidth=0.5)
        for bar, rpm in zip(bars, rpms):
            ax4.text(bar.get_x() + bar.get_width() / 2, bar.get_height() + 1,
                     f'{rpm}', ha='center', va='bottom', fontsize=8, fontweight='bold')

    ax4.set_xlabel('목표 파쇄 크기 (mm)')
    ax4.set_ylabel('기본 RPM (A축)')
    ax4.set_title('재료별 RPM Look-up Table', fontweight='bold')
    ax4.set_xticks(x_pos + width * 1.5)
    ax4.set_xticklabels([f'{sz}mm' for sz in target_sizes])
    ax4.legend(fontsize=9)
    ax4.grid(True, alpha=0.3, axis='y')

    plt.tight_layout(rect=[0, 0, 1, 0.96])
    plt.savefig(save_path, dpi=150, bbox_inches='tight', facecolor='white')
    plt.close()
    print(f"[저장 완료] {save_path}")


# ============================================================
# 6. 메인 실행
# ============================================================
if __name__ == '__main__':
    print("=" * 60)
    print("  모델 9: PID Control RPM 최적화 시뮬레이션")
    print("=" * 60)

    # 시뮬레이션 실행 (폐배터리, 목표 50mm)
    result = run_pid_simulation(
        material='battery',
        target_size=50,
        n_steps=60,
        dt=60,
        Kp=0.5,
        Ki=0.05,
        Kd=0.1,
    )

    # 결과 요약
    print(f"\n[설정]")
    print(f"  재료: 폐배터리")
    print(f"  목표 파쇄 크기: {result['target_size']}mm")
    print(f"  기본 RPM (Look-up): A축={result['base_rpm_a']}, B축={result['base_rpm_b']}")
    print(f"  PID 파라미터: Kp=0.5, Ki=0.05, Kd=0.1")

    print(f"\n[결과]")
    final_sizes = result['sizes'][-10:]
    print(f"  초기 파쇄 크기: {result['sizes'][0]:.1f}mm")
    print(f"  최종 파쇄 크기 (마지막 10분 평균): {final_sizes.mean():.1f}mm")
    print(f"  최종 오차: ±{np.std(final_sizes):.1f}mm")
    print(f"  최종 RPM A축: {result['rpm_a'][-1]:.1f}")
    print(f"  최종 RPM B축: {result['rpm_b'][-1]:.1f}")

    # 수렴 시간
    within_tol = np.abs(result['sizes'] - result['target_size']) < 3
    for i in range(len(within_tol)):
        if all(within_tol[i:min(i + 5, len(within_tol))]):
            print(f"  수렴 시간 (±3mm 이내): {result['times'][i]:.0f}분")
            break

    # 추가: 다른 재료 테스트
    print(f"\n[재료별 Look-up Table 기본 RPM]")
    for mat, label in [('battery', '폐배터리'), ('plastic', '플라스틱'),
                       ('metal', '금속'), ('mixed', '혼합물')]:
        for sz in [30, 50, 80]:
            rpm_a, rpm_b = lookup_base_rpm(mat, sz)
            print(f"  {label} / {sz}mm → RPM A={rpm_a:.0f}, B={rpm_b:.0f}")

    # 시각화
    save_dir = os.path.dirname(os.path.abspath(__file__))
    save_path = os.path.join(save_dir, 'pid_control_result.png')
    plot_results(result, save_path=save_path)

    print(f"\n시뮬레이션 완료.")
