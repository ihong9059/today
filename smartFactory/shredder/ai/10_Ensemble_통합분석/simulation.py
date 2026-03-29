"""
모델 10: Ensemble 통합 분석 시뮬레이션
- 모델 1~9 출력을 통합하여 건강 점수 산출
- Random Forest 상관관계 분석 + 가중 평균 건강 점수
- 교차 영역 상관관계 맵 + 인과관계 체인 시각화
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
# 1. 모델 1~9 Mock 출력 생성
# ============================================================
def generate_model_outputs(n_points=288, seed=42):
    """
    5분 간격 × 24시간 = 288 포인트.
    모델 1~9의 출력을 시뮬레이션하되 인과관계 체인을 반영.
    """
    rng = np.random.RandomState(seed)
    t = np.arange(n_points)
    hours = t * 5 / 60  # 시간 단위

    # --- 칼날 마모 (모델 2): 서서히 증가 ---
    blade_wear = 40 + 35 * (1 - np.exp(-2.5 * t / n_points)) + rng.normal(0, 1.5, n_points)
    blade_wear = np.clip(blade_wear, 0, 100)

    # --- 베어링 이상 (모델 1): 마모 70% 이후 급증 ---
    bearing = 0.05 + 0.7 * np.maximum(0, (blade_wear - 65) / 35) ** 1.5 + rng.normal(0, 0.03, n_points)
    bearing = np.clip(bearing, 0, 1)

    # --- 축 불균형 (모델 3): 마모 + 베어링에 비례 ---
    imbalance = 2.0 + blade_wear * 0.05 + bearing * 4 + rng.normal(0, 0.5, n_points)
    imbalance = np.clip(imbalance, 0, 20)

    # --- 끼임 확률 (모델 4): 간헐적 이벤트 ---
    jamming_base = 0.05 + blade_wear * 0.002
    jamming_events = (rng.random(n_points) < 0.03) * rng.uniform(0.3, 0.8, n_points)
    jamming = np.clip(jamming_base + jamming_events + rng.normal(0, 0.02, n_points), 0, 1)

    # --- 발화 확률 (모델 5): 온도(전류 증가)에 비례 ---
    fire_prob = 0.02 + blade_wear * 0.003 + bearing * 0.15 + rng.normal(0, 0.02, n_points)
    fire_prob = np.clip(fire_prob, 0, 1)

    # --- 분진 위험 (모델 6): 파쇄 활동에 비례 ---
    dust_risk = 0.15 + 0.003 * blade_wear + rng.normal(0, 0.05, n_points)
    # 특정 시점 분진 급증 이벤트
    dust_events = (rng.random(n_points) < 0.02) * rng.uniform(0.2, 0.5, n_points)
    dust_risk = np.clip(dust_risk + dust_events, 0, 1)

    # --- 누출 확률 (모델 7): 낮은 수준 유지 ---
    leak_prob = 0.03 + rng.normal(0, 0.02, n_points)
    leak_prob = np.clip(leak_prob, 0, 1)

    # --- 파쇄 크기 (모델 8): 마모 증가 → 크기 증가 ---
    predicted_size = 45 + blade_wear * 0.15 + rng.normal(0, 2, n_points)
    predicted_size = np.clip(predicted_size, 20, 120)

    # --- 품질 등급 (모델 8 부산물) ---
    quality_grade = np.where(predicted_size < 45, 0,
                    np.where(predicted_size < 55, 1,
                    np.where(predicted_size < 70, 2, 3))).astype(float)

    outputs = {
        'bearing_anomaly_score': bearing,
        'blade_wear_pct': blade_wear,
        'imbalance_level': imbalance,
        'jamming_probability': jamming,
        'fire_probability': fire_prob,
        'dust_risk': dust_risk,
        'leak_probability': leak_prob,
        'predicted_size_mm': predicted_size,
        'quality_grade': quality_grade,
    }

    return hours, outputs


# ============================================================
# 2. 영역별 점수 계산
# ============================================================
def compute_domain_scores(outputs):
    """영역별 건강 점수 (0~100, 높을수록 양호)"""
    n = len(outputs['bearing_anomaly_score'])

    # 고장예지 (모델 1~4)
    maintenance = 100 - (
        outputs['bearing_anomaly_score'] * 30 +
        outputs['blade_wear_pct'] * 0.3 +
        outputs['imbalance_level'] * 3 +
        outputs['jamming_probability'] * 20
    )
    maintenance = np.clip(maintenance, 0, 100)

    # 사고예방 (모델 5~7)
    safety = 100 - (
        outputs['fire_probability'] * 40 +
        outputs['dust_risk'] * 35 +
        outputs['leak_probability'] * 25
    )
    safety = np.clip(safety, 0, 100)

    # 품질관리 (모델 8~9)
    target_size = 50.0
    quality = 100 - (
        outputs['quality_grade'] * 20 +
        np.abs(outputs['predicted_size_mm'] - target_size) * 0.5
    )
    quality = np.clip(quality, 0, 100)

    return {
        'maintenance': maintenance,
        'safety': safety,
        'quality': quality,
    }


# ============================================================
# 3. 가중 평균 통합 건강 점수
# ============================================================
DOMAIN_WEIGHTS = {'maintenance': 0.40, 'safety': 0.35, 'quality': 0.25}


def compute_health_score(domain_scores):
    """가중 평균 통합 건강 점수"""
    score = (
        DOMAIN_WEIGHTS['maintenance'] * domain_scores['maintenance'] +
        DOMAIN_WEIGHTS['safety'] * domain_scores['safety'] +
        DOMAIN_WEIGHTS['quality'] * domain_scores['quality']
    )
    return np.clip(score, 0, 100)


# ============================================================
# 4. 교차 영역 상관관계 분석 (Random Forest Feature Importance)
# ============================================================
def compute_correlation_matrix(outputs):
    """모델 출력 간 상관관계 행렬"""
    keys = list(outputs.keys())
    n = len(keys)
    data = np.column_stack([outputs[k] for k in keys])
    corr = np.corrcoef(data, rowvar=False)
    return keys, corr


def compute_rf_importance(outputs, health_score):
    """Random Forest로 건강 점수에 대한 각 모델의 기여도 분석"""
    from sklearn.ensemble import RandomForestRegressor

    keys = list(outputs.keys())
    X = np.column_stack([outputs[k] for k in keys])
    y = health_score

    rf = RandomForestRegressor(n_estimators=100, max_depth=6, random_state=42)
    rf.fit(X, y)

    importances = rf.feature_importances_
    return dict(zip(keys, importances))


# ============================================================
# 5. 결과 시각화
# ============================================================
LABEL_MAP = {
    'bearing_anomaly_score': '베어링 이상',
    'blade_wear_pct': '칼날 마모',
    'imbalance_level': '축 불균형',
    'jamming_probability': '끼임 확률',
    'fire_probability': '발화 확률',
    'dust_risk': '분진 위험',
    'leak_probability': '누출 확률',
    'predicted_size_mm': '파쇄 크기',
    'quality_grade': '품질 등급',
}


def plot_results(hours, outputs, domain_scores, health_score, corr_keys, corr_matrix,
                 save_path='ensemble_result.png'):

    fig, axes = plt.subplots(2, 2, figsize=(18, 14))
    fig.suptitle('모델 10: Ensemble 통합 분석 시뮬레이션', fontsize=16, fontweight='bold', y=0.98)

    # --- 1) 통합 건강 점수 타임라인 ---
    ax1 = axes[0, 0]
    ax1.plot(hours, health_score, 'b-', linewidth=2, label='통합 건강 점수', alpha=0.9)
    ax1.plot(hours, domain_scores['maintenance'], '--', color='#2563eb', linewidth=1.2,
             label='고장예지 (40%)', alpha=0.7)
    ax1.plot(hours, domain_scores['safety'], '--', color='#dc2626', linewidth=1.2,
             label='사고예방 (35%)', alpha=0.7)
    ax1.plot(hours, domain_scores['quality'], '--', color='#059669', linewidth=1.2,
             label='품질관리 (25%)', alpha=0.7)

    # 경보 영역
    ax1.axhspan(0, 40, alpha=0.08, color='red', label='위험 구간')
    ax1.axhspan(40, 60, alpha=0.06, color='orange')
    ax1.axhspan(60, 80, alpha=0.04, color='yellow')

    ax1.set_xlabel('시간 (h)')
    ax1.set_ylabel('건강 점수 (0~100)')
    ax1.set_title('통합 건강 점수 타임라인', fontweight='bold')
    ax1.set_ylim(0, 105)
    ax1.legend(loc='lower left', fontsize=8, ncol=2)
    ax1.grid(True, alpha=0.3)

    # --- 2) 모델 1~9 개별 점수 히트맵 ---
    ax2 = axes[0, 1]
    keys = list(outputs.keys())
    labels_kr = [LABEL_MAP.get(k, k) for k in keys]

    # 정규화 (0~1 범위로)
    normalized = np.zeros((len(keys), len(hours)))
    for i, k in enumerate(keys):
        vals = outputs[k]
        vmin, vmax = vals.min(), vals.max()
        if vmax > vmin:
            normalized[i] = (vals - vmin) / (vmax - vmin)
        else:
            normalized[i] = 0.5

    # 시간축 다운샘플 (가독성)
    step = max(1, len(hours) // 48)
    hm_data = normalized[:, ::step]
    hm_hours = hours[::step]

    im = ax2.imshow(hm_data, aspect='auto', cmap='RdYlGn_r', interpolation='nearest',
                    extent=[hm_hours[0], hm_hours[-1], len(keys) - 0.5, -0.5])
    ax2.set_yticks(range(len(keys)))
    ax2.set_yticklabels(labels_kr, fontsize=9)
    ax2.set_xlabel('시간 (h)')
    ax2.set_title('모델 1~9 개별 출력 히트맵 (정규화)', fontweight='bold')
    cbar = plt.colorbar(im, ax=ax2, shrink=0.8)
    cbar.set_label('위험도 (0=양호, 1=위험)', fontsize=9)

    # --- 3) 교차 영역 상관관계 행렬 ---
    ax3 = axes[1, 0]
    corr_labels = [LABEL_MAP.get(k, k) for k in corr_keys]
    im3 = ax3.imshow(corr_matrix, cmap='RdBu_r', vmin=-1, vmax=1, interpolation='nearest')
    ax3.set_xticks(range(len(corr_keys)))
    ax3.set_xticklabels(corr_labels, rotation=45, ha='right', fontsize=8)
    ax3.set_yticks(range(len(corr_keys)))
    ax3.set_yticklabels(corr_labels, fontsize=8)
    ax3.set_title('교차 영역 상관관계 행렬', fontweight='bold')

    # 상관계수 텍스트
    for i in range(len(corr_keys)):
        for j in range(len(corr_keys)):
            val = corr_matrix[i, j]
            color = 'white' if abs(val) > 0.5 else 'black'
            ax3.text(j, i, f'{val:.2f}', ha='center', va='center', fontsize=7, color=color)

    cbar3 = plt.colorbar(im3, ax=ax3, shrink=0.8)
    cbar3.set_label('상관계수', fontsize=9)

    # --- 4) 인과관계 체인 시각화 ---
    ax4 = axes[1, 1]
    ax4.set_xlim(0, 10)
    ax4.set_ylim(0, 10)
    ax4.set_aspect('equal')
    ax4.axis('off')
    ax4.set_title('인과관계 체인 (Causal Chain)', fontweight='bold')

    # 노드 정의: (x, y, label, color)
    nodes = [
        (2, 8.5, '칼날 마모', '#2563eb'),
        (7, 8.5, '전류 증가', '#7c3aed'),
        (2, 5.5, '진동 증가', '#d97706'),
        (7, 5.5, '온도 상승', '#dc2626'),
        (2, 2.5, '베어링 손상', '#059669'),
        (7, 2.5, '발화 위험', '#dc2626'),
        (4.5, 0.5, '파쇄 품질 저하', '#d97706'),
    ]

    # 화살표 정의: (from_idx, to_idx)
    arrows = [
        (0, 1),  # 마모 → 전류
        (0, 2),  # 마모 → 진동
        (1, 3),  # 전류 → 온도
        (2, 4),  # 진동 → 베어링
        (3, 5),  # 온도 → 발화
        (0, 6),  # 마모 → 품질
        (4, 6),  # 베어링 → 품질
    ]

    # 노드 그리기
    for x, y, label, color in nodes:
        box = plt.Rectangle((x - 1.3, y - 0.5), 2.6, 1.0, facecolor=color,
                             alpha=0.2, edgecolor=color, linewidth=2, transform=ax4.transData,
                             zorder=2)
        ax4.add_patch(box)
        ax4.text(x, y, label, ha='center', va='center', fontsize=10, fontweight='bold',
                 color=color, zorder=3)

    # 화살표 그리기
    for fi, ti in arrows:
        fx, fy = nodes[fi][0], nodes[fi][1]
        tx, ty = nodes[ti][0], nodes[ti][1]
        # 시작/끝 오프셋
        dx, dy = tx - fx, ty - fy
        dist = np.sqrt(dx ** 2 + dy ** 2)
        offset = 0.7
        sx = fx + dx / dist * offset
        sy = fy + dy / dist * offset
        ex = tx - dx / dist * offset
        ey = ty - dy / dist * offset
        ax4.annotate('', xy=(ex, ey), xytext=(sx, sy),
                     arrowprops=dict(arrowstyle='->', color='#64748B', lw=2.5,
                                     connectionstyle='arc3,rad=0.1'),
                     zorder=1)

    # 범례 텍스트
    ax4.text(5, 10, '연쇄 관계: 하나의 이상이 여러 영역에 동시 영향', ha='center',
             fontsize=9, color='#94A3B8', style='italic')

    plt.tight_layout(rect=[0, 0, 1, 0.96])
    plt.savefig(save_path, dpi=150, bbox_inches='tight', facecolor='white')
    plt.close()
    print(f"[저장 완료] {save_path}")


# ============================================================
# 6. 메인 실행
# ============================================================
if __name__ == '__main__':
    print("=" * 60)
    print("  모델 10: Ensemble 통합 분석 시뮬레이션")
    print("=" * 60)

    # 1) 모델 1~9 Mock 출력 생성
    hours, outputs = generate_model_outputs(n_points=288, seed=42)
    print(f"\n[데이터] 5분 간격 × 24시간 = {len(hours)}개 데이터 포인트")

    # 2) 영역별 점수 계산
    domain_scores = compute_domain_scores(outputs)
    print(f"\n[영역별 건강 점수 (최종 시점)]")
    for domain, scores in domain_scores.items():
        domain_names = {'maintenance': '고장예지', 'safety': '사고예방', 'quality': '품질관리'}
        print(f"  {domain_names[domain]}: {scores[-1]:.1f}")

    # 3) 통합 건강 점수
    health_score = compute_health_score(domain_scores)
    print(f"\n[통합 건강 점수]")
    print(f"  초기: {health_score[0]:.1f}")
    print(f"  최종: {health_score[-1]:.1f}")
    print(f"  최저: {health_score.min():.1f}")
    print(f"  평균: {health_score.mean():.1f}")

    # 등급 판정
    final_score = health_score[-1]
    min_domain = min(d[-1] for d in domain_scores.values())
    if final_score >= 80 and min_domain >= 60:
        level = "양호"
    elif final_score >= 60 and min_domain >= 40:
        level = "주의"
    elif final_score >= 40 and min_domain >= 20:
        level = "경고"
    else:
        level = "위험"
    print(f"  판정: [{level}]")

    # 4) 상관관계 분석
    corr_keys, corr_matrix = compute_correlation_matrix(outputs)
    print(f"\n[상관관계 분석] 주요 강한 상관관계:")
    for i in range(len(corr_keys)):
        for j in range(i + 1, len(corr_keys)):
            r = corr_matrix[i, j]
            if abs(r) > 0.6:
                print(f"  {LABEL_MAP.get(corr_keys[i], corr_keys[i])} <-> "
                      f"{LABEL_MAP.get(corr_keys[j], corr_keys[j])}: r={r:.3f}")

    # 5) RF Feature Importance
    rf_importance = compute_rf_importance(outputs, health_score)
    print(f"\n[Random Forest 기여도 분석]")
    sorted_imp = sorted(rf_importance.items(), key=lambda x: -x[1])
    for k, v in sorted_imp:
        bar = '#' * int(v * 100)
        print(f"  {LABEL_MAP.get(k, k):>10s}: {v:.3f} {bar}")

    # 6) 인과관계 체인 요약
    print(f"\n[인과관계 체인]")
    print(f"  칼날 마모 -> 전류 증가 -> 온도 상승 -> 발화 위험 증가")
    print(f"  칼날 마모 -> 진동 증가 -> 베어링 손상 가속")
    print(f"  칼날 마모 -> 파쇄 품질 저하")

    # 시각화
    save_dir = os.path.dirname(os.path.abspath(__file__))
    save_path = os.path.join(save_dir, 'ensemble_result.png')
    plot_results(hours, outputs, domain_scores, health_score,
                 corr_keys, corr_matrix, save_path=save_path)

    print(f"\n시뮬레이션 완료.")
