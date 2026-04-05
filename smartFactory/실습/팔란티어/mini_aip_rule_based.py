"""
Mini AIP Example (Rule-Based) — API 키 없이 실행 가능한 버전

Palantir AIP 패턴을 규칙 기반으로 재현:
  1. 데이터 로드 (온톨로지 역할)
  2. 규칙 기반 분석 (LLM 대신)
  3. 판단에 따라 액션(Tool) 자동 실행
"""

import json
from datetime import datetime

# =============================================================
# 1) 데이터 정의 — AIP에서는 Foundry 온톨로지에서 가져오는 부분
# =============================================================
inventory_data = [
    {"product": "제품A", "stock": 5,   "daily_sales": 10, "lead_time": 3},
    {"product": "제품B", "stock": 200, "daily_sales": 3,  "lead_time": 5},
    {"product": "제품C", "stock": 0,   "daily_sales": 8,  "lead_time": 2},
    {"product": "제품D", "stock": 50,  "daily_sales": 12, "lead_time": 4},
]

# =============================================================
# 2) 도구(액션) 정의 — AIP에서는 Foundry Action으로 등록하는 부분
# =============================================================
order_counter = 0

def create_purchase_order(product: str, quantity: int, priority: str, reason: str) -> dict:
    """긴급 발주를 생성합니다."""
    global order_counter
    order_counter += 1
    order_id = f"PO-2026-{order_counter:04d}"

    print(f"  [발주 생성] {product} — {quantity}개, 우선순위: {priority}")
    print(f"    사유: {reason}")
    print(f"    → order_id: {order_id}")
    print()
    return {"status": "success", "order_id": order_id}


def send_alert(message: str, severity: str) -> dict:
    """담당자에게 알림을 전송합니다."""
    print(f"  [알림 전송] [{severity.upper()}] {message}")
    print()
    return {"status": "sent"}


# =============================================================
# 3) 분석 엔진 — AIP에서는 LLM이 하는 역할을 규칙으로 대체
# =============================================================
def analyze_inventory(data: list) -> list:
    """
    재고 데이터를 분석하여 필요한 액션 목록을 반환

    규칙:
    - 재고 소진일 < 리드타임 → 긴급 발주
    - 재고 소진일 < 리드타임 * 1.5 → 일반 발주
    - 재고 소진일 > 리드타임 * 10 → 과잉 재고 알림
    """
    actions = []

    for item in data:
        product = item["product"]
        stock = item["stock"]
        daily_sales = item["daily_sales"]
        lead_time = item["lead_time"]

        # 재고 소진일 계산
        if daily_sales > 0:
            days_left = stock / daily_sales
        else:
            days_left = float('inf')

        # 리드타임 동안 필요한 수량
        lead_time_demand = daily_sales * lead_time
        # 안전재고 (리드타임의 1.5배 분량)
        safety_stock = daily_sales * lead_time * 1.5
        # 발주 수량 = 안전재고 - 현재 재고
        order_qty = max(0, int(safety_stock - stock))

        # 판정
        if days_left == 0:
            # 재고 0 → 긴급
            actions.append({
                "type": "order",
                "product": product,
                "quantity": order_qty if order_qty > 0 else int(lead_time_demand),
                "priority": "긴급",
                "reason": f"재고 0개, 일판매 {daily_sales}개, 리드타임 {lead_time}일간 {lead_time_demand}개 필요",
                "days_left": days_left,
                "status": "CRITICAL",
            })
        elif days_left < lead_time:
            # 리드타임 내 소진 → 긴급
            actions.append({
                "type": "order",
                "product": product,
                "quantity": order_qty,
                "priority": "긴급",
                "reason": f"재고 {stock}개({days_left:.1f}일분), 리드타임 {lead_time}일 대비 부족",
                "days_left": days_left,
                "status": "CRITICAL",
            })
        elif days_left < lead_time * 1.5:
            # 리드타임의 1.5배 이내 → 일반 발주
            actions.append({
                "type": "order",
                "product": product,
                "quantity": order_qty,
                "priority": "일반",
                "reason": f"재고 {stock}개({days_left:.1f}일분), 리드타임 {lead_time}일과 근접하여 선제 발주",
                "days_left": days_left,
                "status": "WARNING",
            })
        elif days_left > lead_time * 10:
            # 리드타임의 10배 초과 → 과잉 재고
            actions.append({
                "type": "alert",
                "product": product,
                "message": f"{product} 재고 과잉 — 현재 {stock}개({days_left:.1f}일분) 보유 중. 발주 중단 및 재고 조정 검토 필요",
                "severity": "warning",
                "days_left": days_left,
                "status": "EXCESS",
            })
        else:
            # 정상
            actions.append({
                "type": "none",
                "product": product,
                "days_left": days_left,
                "status": "OK",
            })

    return actions


# =============================================================
# 4) AIP 루프 — 분석 → 판단 → 액션 실행
# =============================================================
def run_mini_aip():
    print("=" * 60)
    print("  Mini AIP — 재고 분석 및 자동 발주 시스템 (Rule-Based)")
    print(f"  실행 시각: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print("=" * 60)

    # --- Step 1: 데이터 표시 ---
    print("\n[1] 입력 데이터 (온톨로지)")
    print("-" * 55)
    print(f"  {'제품':<8} {'현재재고':>8} {'일판매':>8} {'리드타임':>8}")
    print("-" * 55)
    for item in inventory_data:
        print(f"  {item['product']:<8} {item['stock']:>6}개 {item['daily_sales']:>6}개 {item['lead_time']:>6}일")
    print()

    # --- Step 2: 분석 ---
    print("[2] AI 분석 결과")
    print("-" * 55)
    actions = analyze_inventory(inventory_data)

    for a in actions:
        product = a["product"]
        days = a["days_left"]
        status = a["status"]

        if days == float('inf'):
            days_str = "∞"
        elif days == 0:
            days_str = "0일 (재고 없음)"
        else:
            days_str = f"{days:.1f}일"

        icon = {"CRITICAL": "🔴", "WARNING": "🟡", "EXCESS": "🟠", "OK": "🟢"}[status]
        print(f"  {icon} {product}: 재고 소진까지 {days_str} [{status}]")

    # --- Step 3: 액션 실행 ---
    print()
    print("[3] 액션 실행")
    print("-" * 55)

    order_results = []
    alert_results = []

    # 긴급 → 일반 순으로 정렬하여 실행
    sorted_actions = sorted(actions, key=lambda x: {"긴급": 0, "일반": 1}.get(x.get("priority", ""), 2))

    for a in sorted_actions:
        if a["type"] == "order":
            result = create_purchase_order(
                product=a["product"],
                quantity=a["quantity"],
                priority=a["priority"],
                reason=a["reason"],
            )
            order_results.append({"product": a["product"], **result})

        elif a["type"] == "alert":
            result = send_alert(
                message=a["message"],
                severity=a["severity"],
            )
            alert_results.append({"product": a["product"], **result})

    # --- Step 4: 결과 요약 ---
    print("[4] 처리 요약")
    print("=" * 55)
    print(f"  {'액션':<12} {'대상':<8} {'수량':>6} {'우선순위':<8}")
    print("-" * 55)

    for a in sorted_actions:
        if a["type"] == "order":
            print(f"  {'발주 생성':<12} {a['product']:<8} {a['quantity']:>4}개 {a['priority']:<8}")
        elif a["type"] == "alert":
            print(f"  {'과잉 알림':<12} {a['product']:<8} {'—':>6} {a['severity']:<8}")
        elif a["type"] == "none":
            print(f"  {'정상 (패스)':<12} {a['product']:<8} {'—':>6} {'—':<8}")

    print("-" * 55)
    print(f"  발주: {len(order_results)}건 / 알림: {len(alert_results)}건")
    print("=" * 55)


if __name__ == "__main__":
    run_mini_aip()
