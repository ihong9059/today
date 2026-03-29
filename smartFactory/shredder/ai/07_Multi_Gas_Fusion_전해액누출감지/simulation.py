"""
Model 07: Multi-gas Fusion 전해액 누출 감지
- 다중 가스 센서(VOC, H₂, CO) 데이터 융합
- Bayesian-style 융합을 통한 누출 확률 산출
- 가스 종류 판별 (전해액 / 기타 / 정상)
"""
import sys, os
sys.path.append(os.path.join(os.path.dirname(__file__), '..'))

import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import matplotlib
matplotlib.rcParams['font.family'] = 'Malgun Gothic'
matplotlib.rcParams['axes.unicode_minus'] = False

from common_data import generate_shredder_full_data


# ──────────────────────────────────────────
# 1. 데이터 준비 — common_data 기반 가스 데이터 추출
# ──────────────────────────────────────────
def prepare_gas_data(base_df):
    """
    공통 데이터에서 가스 센서 컬럼과 누출 라벨을 추출합니다.

    Returns:
        DataFrame: timestamp, VOC_ppm, H2_ppm, CO_ppm, leak_label, gas_type_label
    """
    df = pd.DataFrame({
        'timestamp': base_df['timestamp'],
        'VOC_ppm': base_df['GAS_VOC'],
        'H2_ppm': base_df['GAS_H2'],
        'CO_ppm': base_df['GAS_CO'],
    })

    # 누출 라벨: gas_leak 이벤트
    df['leak_label'] = (base_df['event_label'] == 'gas_leak').astype(int)

    # 가스 종류 라벨: 0=정상, 1=전해액(gas_leak), 2=기타(fire_event 등)
    gas_type = np.zeros(len(df), dtype=int)
    gas_type[base_df['event_label'] == 'gas_leak'] = 1
    gas_type[base_df['event_label'] == 'fire_event'] = 2
    df['gas_type_label'] = gas_type

    return df


# ──────────────────────────────────────────
# 2. Multi-gas Fusion 알고리즘
# ──────────────────────────────────────────
class MultiGasFusionDetector:
    """다중 가스 센서 융합 전해액 누출 감지기"""

    # 개별 가스 임계값 (common_data 분포 기반 설정)
    THRESHOLDS = {
        'VOC': {'normal': 12, 'warning': 30, 'critical': 60},
        'H2':  {'normal': 3,  'warning': 10, 'critical': 25},
        'CO':  {'normal': 5,  'warning': 12, 'critical': 25},
    }

    # 융합 가중치 (전해액 누출 특성 반영)
    WEIGHTS = {
        'VOC': 0.50,  # VOC가 전해액 누출의 가장 강한 지표
        'H2':  0.30,  # H2도 전해액 분해 부산물
        'CO':  0.20,  # CO는 다양한 원인 가능
    }

    # 전해액 가스 프로필 (정규화된 비율)
    ELECTROLYTE_PROFILE = {'VOC': 0.65, 'H2': 0.25, 'CO': 0.10}
    OTHER_PROFILE = {'VOC': 0.15, 'H2': 0.05, 'CO': 0.80}

    def __init__(self):
        self.prior_leak = 0.02  # 사전 누출 확률 2%

    def _individual_score(self, value, gas_type):
        """개별 가스 임계값 기반 점수 (0~1)"""
        th = self.THRESHOLDS[gas_type]
        if value <= th['normal']:
            return 0.0
        elif value <= th['warning']:
            return (value - th['normal']) / (th['warning'] - th['normal']) * 0.5
        elif value <= th['critical']:
            return 0.5 + (value - th['warning']) / (th['critical'] - th['warning']) * 0.4
        else:
            return min(0.9 + (value - th['critical']) / th['critical'] * 0.1, 1.0)

    def _weighted_fusion(self, scores):
        """가중 융합 점수"""
        fusion = 0.0
        for gas, score in scores.items():
            fusion += self.WEIGHTS[gas] * score
        return fusion

    def _gas_type_likelihood(self, voc_norm, h2_norm, co_norm):
        """
        가스 종류 판별 — 관측된 가스 비율과 프로필 비교
        Returns: (electrolyte_likelihood, other_likelihood)
        """
        total = voc_norm + h2_norm + co_norm + 1e-8
        obs = {'VOC': voc_norm / total, 'H2': h2_norm / total, 'CO': co_norm / total}

        # 코사인 유사도 기반 likelihood
        def cosine_sim(profile):
            dot = sum(obs[g] * profile[g] for g in ['VOC', 'H2', 'CO'])
            mag_obs = sum(obs[g] ** 2 for g in ['VOC', 'H2', 'CO']) ** 0.5
            mag_prof = sum(profile[g] ** 2 for g in ['VOC', 'H2', 'CO']) ** 0.5
            return dot / (mag_obs * mag_prof + 1e-8)

        elec_sim = cosine_sim(self.ELECTROLYTE_PROFILE)
        other_sim = cosine_sim(self.OTHER_PROFILE)

        return elec_sim, other_sim

    def _bayesian_update(self, fusion_score, elec_likelihood, other_likelihood):
        """
        Bayesian 스타일 누출 확률 갱신

        P(leak | evidence) ∝ P(evidence | leak) * P(leak)
        """
        # 적응적 사전확률: 융합점수가 높으면 사전확률도 높여 반응성 향상
        if fusion_score > 0.5:
            prior = 0.15
        elif fusion_score > 0.3:
            prior = 0.08
        else:
            prior = self.prior_leak

        # likelihood: fusion_score가 높을수록, 전해액 유사도가 높을수록 누출 가능성 ↑
        p_evidence_given_leak = (fusion_score ** 0.8) * elec_likelihood
        p_evidence_given_no_leak = max((1 - fusion_score) * 0.4,
                                       fusion_score * other_likelihood * 0.3)

        numerator = p_evidence_given_leak * prior
        denominator = numerator + p_evidence_given_no_leak * (1 - prior) + 1e-10

        posterior = numerator / denominator

        # 융합 점수가 매우 높으면 추가 부스트
        if fusion_score > 0.7:
            posterior = min(posterior * 1.8, 1.0)
        elif fusion_score > 0.4:
            posterior = min(posterior * 1.3, 1.0)

        return np.clip(posterior, 0, 1)

    def detect(self, df):
        """
        전체 시계열에 대해 Multi-gas Fusion 감지 수행

        Returns:
            결과 컬럼이 추가된 DataFrame
        """
        n = len(df)
        individual_scores = {'VOC': np.zeros(n), 'H2': np.zeros(n), 'CO': np.zeros(n)}
        fusion_scores = np.zeros(n)
        leak_probs = np.zeros(n)
        gas_types = np.zeros(n, dtype=int)  # 0=정상, 1=전해액, 2=기타

        for i in range(n):
            voc = df['VOC_ppm'].iloc[i]
            h2 = df['H2_ppm'].iloc[i]
            co = df['CO_ppm'].iloc[i]

            # Step 1: 개별 점수
            scores = {
                'VOC': self._individual_score(voc, 'VOC'),
                'H2':  self._individual_score(h2, 'H2'),
                'CO':  self._individual_score(co, 'CO'),
            }
            for gas in scores:
                individual_scores[gas][i] = scores[gas]

            # Step 2: 가중 융합
            fusion = self._weighted_fusion(scores)
            fusion_scores[i] = fusion

            # Step 3: 가스 종류 판별
            voc_norm = scores['VOC']
            h2_norm = scores['H2']
            co_norm = scores['CO']
            elec_lk, other_lk = self._gas_type_likelihood(voc_norm, h2_norm, co_norm)

            # Step 4: Bayesian 확률 갱신
            leak_prob = self._bayesian_update(fusion, elec_lk, other_lk)
            leak_probs[i] = leak_prob

            # 가스 종류 분류
            if fusion < 0.15:
                gas_types[i] = 0  # 정상
            elif elec_lk > other_lk and scores['VOC'] > 0.3:
                gas_types[i] = 1  # 전해액
            else:
                gas_types[i] = 2  # 기타

        df = df.copy()
        df['score_VOC'] = np.round(individual_scores['VOC'], 4)
        df['score_H2'] = np.round(individual_scores['H2'], 4)
        df['score_CO'] = np.round(individual_scores['CO'], 4)
        df['fusion_score'] = np.round(fusion_scores, 4)
        df['leak_prob'] = np.round(leak_probs, 4)
        df['gas_type_pred'] = gas_types

        return df


# ──────────────────────────────────────────
# 3. 시뮬레이션 실행 및 시각화
# ──────────────────────────────────────────
def run_simulation():
    print("=" * 60)
    print("  Model 07: Multi-gas Fusion 전해액 누출 감지")
    print("=" * 60)

    # 데이터 생성
    print("\n[1] 슈레더 공통 데이터 생성 중...")
    base_df = generate_shredder_full_data(days=90, freq_minutes=10)
    print(f"    기본 데이터: {len(base_df)}건")

    print("\n[2] 가스 센서 데이터 추출 중...")
    gas_df = prepare_gas_data(base_df)
    print(f"    가스 데이터: {len(gas_df)}건")
    print(f"    전해액 누출 구간: {gas_df['leak_label'].sum()}건")
    print(f"    기타 가스 구간: {(gas_df['gas_type_label'] == 2).sum()}건")
    print(f"    VOC 범위: {gas_df['VOC_ppm'].min():.1f} ~ {gas_df['VOC_ppm'].max():.1f} ppm")
    print(f"    H2  범위: {gas_df['H2_ppm'].min():.1f} ~ {gas_df['H2_ppm'].max():.1f} ppm")
    print(f"    CO  범위: {gas_df['CO_ppm'].min():.1f} ~ {gas_df['CO_ppm'].max():.1f} ppm")

    # 감지 실행
    print("\n[3] Multi-gas Fusion 감지 실행 중...")
    detector = MultiGasFusionDetector()
    result_df = detector.detect(gas_df)

    # 성능 요약
    leak_threshold = 0.3
    pred_leak = (result_df['leak_prob'] >= leak_threshold).astype(int)
    actual_leak = result_df['leak_label']

    tp = ((pred_leak == 1) & (actual_leak == 1)).sum()
    fp = ((pred_leak == 1) & (actual_leak == 0)).sum()
    fn = ((pred_leak == 0) & (actual_leak == 1)).sum()
    tn = ((pred_leak == 0) & (actual_leak == 0)).sum()

    precision = tp / (tp + fp + 1e-10)
    recall = tp / (tp + fn + 1e-10)
    f1 = 2 * precision * recall / (precision + recall + 1e-10)

    print(f"\n[4] 감지 성능 (임계값={leak_threshold})")
    print(f"    정밀도 (Precision): {precision:.3f}")
    print(f"    재현율 (Recall):    {recall:.3f}")
    print(f"    F1 Score:           {f1:.3f}")
    print(f"    TP={tp}, FP={fp}, FN={fn}, TN={tn}")

    # 가스 종류 판별 정확도
    type_mask = result_df['gas_type_label'] > 0  # 이벤트 구간만
    if type_mask.sum() > 0:
        type_acc = (result_df.loc[type_mask, 'gas_type_pred'] ==
                    result_df.loc[type_mask, 'gas_type_label']).mean()
        print(f"\n    가스 종류 판별 정확도 (이벤트 구간): {type_acc:.3f}")

    # 시각화
    print("\n[5] 결과 그래프 생성 중...")
    plot_results(result_df, leak_threshold)
    print("    → multi_gas_result.png 저장 완료")

    return result_df


def plot_results(df, threshold=0.3):
    """4-panel 결과 시각화"""
    fig, axes = plt.subplots(4, 1, figsize=(16, 14), sharex=True)
    fig.suptitle('Model 07: Multi-gas Fusion 전해액 누출 감지',
                 fontsize=16, fontweight='bold', y=0.98)

    x = df['timestamp']
    n = len(df)

    # 누출 구간 하이라이트 함수
    def highlight_leaks(ax):
        leak_starts = []
        in_leak = False
        for i in range(n):
            if df['leak_label'].iloc[i] == 1 and not in_leak:
                leak_starts.append(i)
                in_leak = True
            elif df['leak_label'].iloc[i] == 0 and in_leak:
                ax.axvspan(x.iloc[leak_starts[-1]], x.iloc[i],
                          alpha=0.15, color='red',
                          label='전해액 누출' if len(leak_starts) == 1 else '')
                in_leak = False
        if in_leak:
            ax.axvspan(x.iloc[leak_starts[-1]], x.iloc[-1], alpha=0.15, color='red')

    # --- 패널 1: 개별 가스 농도 ---
    ax1 = axes[0]
    ax1.plot(x, df['VOC_ppm'], color='#e74c3c', alpha=0.7, linewidth=0.5, label='VOC (ppm)')
    ax1.plot(x, df['H2_ppm'], color='#3498db', alpha=0.7, linewidth=0.5, label='H₂ (ppm)')
    ax1.plot(x, df['CO_ppm'], color='#2ecc71', alpha=0.7, linewidth=0.5, label='CO (ppm)')
    highlight_leaks(ax1)
    ax1.set_ylabel('가스 농도 (ppm)')
    ax1.set_title('① 개별 가스 센서 판독값', fontweight='bold')
    ax1.legend(loc='upper right', fontsize=9)
    ax1.grid(True, alpha=0.3)

    # --- 패널 2: 융합 점수 ---
    ax2 = axes[1]
    ax2.fill_between(x, 0, df['fusion_score'], alpha=0.4, color='#8e44ad')
    ax2.plot(x, df['fusion_score'], color='#8e44ad', linewidth=0.7, label='융합 점수')
    ax2.axhline(y=0.5, color='orange', linestyle='--', alpha=0.7, label='경고 기준 (0.5)')
    highlight_leaks(ax2)
    ax2.set_ylabel('융합 점수')
    ax2.set_title('② 다중 가스 가중 융합 점수', fontweight='bold')
    ax2.legend(loc='upper right', fontsize=9)
    ax2.grid(True, alpha=0.3)
    ax2.set_ylim(-0.05, 1.05)

    # --- 패널 3: 누출 확률 ---
    ax3 = axes[2]
    colors_prob = np.where(df['leak_prob'] >= threshold, '#e74c3c', '#3498db')
    ax3.bar(x, df['leak_prob'], color=colors_prob, alpha=0.6, width=0.01)
    ax3.axhline(y=threshold, color='red', linestyle='--', linewidth=1.5,
               label=f'판정 임계값 ({threshold})')
    highlight_leaks(ax3)
    ax3.set_ylabel('누출 확률')
    ax3.set_title('③ Bayesian 누출 확률', fontweight='bold')
    ax3.legend(loc='upper right', fontsize=9)
    ax3.grid(True, alpha=0.3)
    ax3.set_ylim(-0.05, 1.05)

    # --- 패널 4: 가스 종류 분류 ---
    ax4 = axes[3]
    type_colors = {0: '#2ecc71', 1: '#e74c3c', 2: '#f39c12'}
    type_labels = {0: '정상', 1: '전해액 누출', 2: '기타 가스'}
    for t_val in [0, 1, 2]:
        mask = df['gas_type_pred'] == t_val
        if mask.any():
            ax4.scatter(x[mask], df['gas_type_pred'][mask], c=type_colors[t_val],
                       s=2, alpha=0.5, label=type_labels[t_val])
    highlight_leaks(ax4)
    ax4.set_ylabel('분류 결과')
    ax4.set_yticks([0, 1, 2])
    ax4.set_yticklabels(['정상', '전해액', '기타'])
    ax4.set_title('④ 가스 종류 판별 결과', fontweight='bold')
    ax4.legend(loc='upper right', fontsize=9)
    ax4.grid(True, alpha=0.3)
    ax4.set_xlabel('시간')

    plt.tight_layout(rect=[0, 0, 1, 0.96])
    save_path = os.path.join(os.path.dirname(__file__), 'multi_gas_result.png')
    plt.savefig(save_path, dpi=150, bbox_inches='tight', facecolor='white')
    plt.close()
    print(f"    저장 경로: {save_path}")


if __name__ == "__main__":
    result = run_simulation()
