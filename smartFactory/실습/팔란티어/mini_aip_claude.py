"""
Mini AIP — Claude API를 활용한 스마트 팩토리 의사결정 시스템

Palantir AIP 핵심 패턴을 Claude Tool Use로 구현:
  1. 온톨로지(데이터) 로드 — Foundry 역할
  2. Claude가 데이터 분석 + 판단 — AIP LLM 역할
  3. Tool Use로 액션 자동 실행 — Foundry Action 역할

실행 방법:
  1. .env 파일에 ANTHROPIC_API_KEY 설정
  2. pip install anthropic python-dotenv
  3. python mini_aip_claude.py
"""

import anthropic
import json
import os
from datetime import datetime
from dotenv import load_dotenv

# .env 파일에서 API 키 로드
load_dotenv()

# =============================================================
# 1) 온톨로지 — 스마트 팩토리 데이터 모델
#    실제 AIP에서는 Foundry 온톨로지에서 실시간 연동
# =============================================================

# 제품 재고 데이터
inventory_data = [
    {"product": "알루미늄 프레임 A-100", "stock": 5,   "daily_usage": 10, "lead_time_days": 3, "unit_cost": 15000, "supplier": "한국금속공업"},
    {"product": "서보모터 SM-200",       "stock": 200, "daily_usage": 3,  "lead_time_days": 5, "unit_cost": 85000, "supplier": "삼성전기부품"},
    {"product": "PCB 보드 P-300",        "stock": 0,   "daily_usage": 8,  "lead_time_days": 2, "unit_cost": 5500,  "supplier": "대한회로"},
    {"product": "베어링 BR-400",         "stock": 50,  "daily_usage": 12, "lead_time_days": 4, "unit_cost": 3200,  "supplier": "NSK코리아"},
    {"product": "전원모듈 PW-500",       "stock": 30,  "daily_usage": 5,  "lead_time_days": 7, "unit_cost": 42000, "supplier": "미쓰비시파워"},
]

# 설비 상태 데이터
equipment_data = [
    {"name": "CNC 가공기 #1", "status": "운전중", "uptime_hours": 1847, "next_maintenance": "2026-04-10", "error_count_30d": 2},
    {"name": "CNC 가공기 #2", "status": "알람",   "uptime_hours": 2105, "next_maintenance": "2026-04-03", "error_count_30d": 12},
    {"name": "조립 로봇 #1",  "status": "운전중", "uptime_hours": 956,  "next_maintenance": "2026-04-20", "error_count_30d": 0},
    {"name": "조립 로봇 #2",  "status": "정지",   "uptime_hours": 1523, "next_maintenance": "2026-04-05", "error_count_30d": 8},
    {"name": "검사장비 QC-1", "status": "운전중", "uptime_hours": 420,  "next_maintenance": "2026-05-01", "error_count_30d": 1},
]

# 생산 계획
production_plan = {
    "product": "스마트 센서 유닛 v2.0",
    "daily_target": 100,
    "today_produced": 67,
    "defect_rate": 2.3,
    "target_defect_rate": 1.5,
    "deadline": "2026-04-15",
    "total_order": 1000,
    "total_produced": 580,
}


# =============================================================
# 2) 도구(액션) 정의 — AIP Foundry Action에 해당
#    Claude가 분석 결과에 따라 자동으로 호출
# =============================================================

tools = [
    {
        "name": "create_purchase_order",
        "description": "자재 긴급/일반 발주를 생성합니다. 재고 부족이 예상되는 자재에 사용합니다.",
        "input_schema": {
            "type": "object",
            "properties": {
                "product": {"type": "string", "description": "발주할 자재명"},
                "quantity": {"type": "integer", "description": "발주 수량"},
                "priority": {"type": "string", "enum": ["긴급", "일반", "낮음"], "description": "발주 우선순위"},
                "supplier": {"type": "string", "description": "공급업체명"},
                "reason": {"type": "string", "description": "발주 사유"},
                "estimated_cost": {"type": "integer", "description": "예상 비용 (원)"},
            },
            "required": ["product", "quantity", "priority", "supplier", "reason"],
        },
    },
    {
        "name": "create_maintenance_request",
        "description": "설비 점검/수리 요청을 생성합니다. 설비 이상이 감지되거나 예방 정비가 필요할 때 사용합니다.",
        "input_schema": {
            "type": "object",
            "properties": {
                "equipment": {"type": "string", "description": "설비명"},
                "maintenance_type": {"type": "string", "enum": ["긴급수리", "예방정비", "정기점검"], "description": "정비 유형"},
                "description": {"type": "string", "description": "상세 내용"},
                "priority": {"type": "string", "enum": ["긴급", "높음", "보통"], "description": "우선순위"},
            },
            "required": ["equipment", "maintenance_type", "description", "priority"],
        },
    },
    {
        "name": "send_alert",
        "description": "담당자에게 알림을 전송합니다. 재고 과잉, 품질 이슈, 생산 지연 등 주의가 필요한 상황에 사용합니다.",
        "input_schema": {
            "type": "object",
            "properties": {
                "recipient": {"type": "string", "description": "수신 대상 (예: 구매팀, 생산팀, 품질팀, 설비팀)"},
                "severity": {"type": "string", "enum": ["critical", "warning", "info"], "description": "알림 심각도"},
                "title": {"type": "string", "description": "알림 제목"},
                "message": {"type": "string", "description": "알림 상세 내용"},
            },
            "required": ["recipient", "severity", "title", "message"],
        },
    },
    {
        "name": "adjust_production_schedule",
        "description": "생산 계획을 조정합니다. 자재 부족, 설비 고장, 납기 위험 등으로 인해 생산 일정 변경이 필요할 때 사용합니다.",
        "input_schema": {
            "type": "object",
            "properties": {
                "action": {"type": "string", "enum": ["증산", "감산", "라인전환", "잔업투입"], "description": "조정 내용"},
                "reason": {"type": "string", "description": "조정 사유"},
                "details": {"type": "string", "description": "상세 실행 계획"},
            },
            "required": ["action", "reason", "details"],
        },
    },
]


# =============================================================
# 3) 액션 핸들러 — 실제 시스템에서는 ERP/MES API 호출
# =============================================================

action_log = []
order_counter = 0

def handle_tool_call(tool_name: str, tool_input: dict) -> str:
    global order_counter
    timestamp = datetime.now().strftime("%H:%M:%S")

    if tool_name == "create_purchase_order":
        order_counter += 1
        order_id = f"PO-2026-{order_counter:04d}"
        cost_str = f"{tool_input.get('estimated_cost', 0):,}원" if tool_input.get('estimated_cost') else "미정"
        print(f"  [{timestamp}] 📦 발주 생성")
        print(f"    자재: {tool_input['product']}")
        print(f"    수량: {tool_input['quantity']}개 | 우선순위: {tool_input['priority']} | 공급사: {tool_input['supplier']}")
        print(f"    예상비용: {cost_str}")
        print(f"    사유: {tool_input['reason']}")
        print(f"    → {order_id}")
        print()
        action_log.append({"type": "발주", "id": order_id, **tool_input})
        return json.dumps({"status": "success", "order_id": order_id})

    elif tool_name == "create_maintenance_request":
        mr_id = f"MR-2026-{len(action_log)+1:04d}"
        print(f"  [{timestamp}] 🔧 정비 요청")
        print(f"    설비: {tool_input['equipment']}")
        print(f"    유형: {tool_input['maintenance_type']} | 우선순위: {tool_input['priority']}")
        print(f"    내용: {tool_input['description']}")
        print(f"    → {mr_id}")
        print()
        action_log.append({"type": "정비", "id": mr_id, **tool_input})
        return json.dumps({"status": "success", "request_id": mr_id})

    elif tool_name == "send_alert":
        severity_icon = {"critical": "🔴", "warning": "🟡", "info": "🔵"}
        icon = severity_icon.get(tool_input['severity'], "⚪")
        print(f"  [{timestamp}] {icon} 알림 전송 → {tool_input['recipient']}")
        print(f"    제목: {tool_input['title']}")
        print(f"    내용: {tool_input['message']}")
        print()
        action_log.append({"type": "알림", **tool_input})
        return json.dumps({"status": "sent"})

    elif tool_name == "adjust_production_schedule":
        print(f"  [{timestamp}] 📋 생산 계획 조정")
        print(f"    조정: {tool_input['action']}")
        print(f"    사유: {tool_input['reason']}")
        print(f"    계획: {tool_input['details']}")
        print()
        action_log.append({"type": "생산조정", **tool_input})
        return json.dumps({"status": "adjusted"})

    return json.dumps({"status": "error", "message": "unknown tool"})


# =============================================================
# 4) 데이터를 시스템 프롬프트로 변환 (온톨로지 → 컨텍스트)
# =============================================================

def build_factory_context() -> str:
    """팩토리 데이터를 Claude가 분석할 수 있는 텍스트로 변환"""
    today = datetime.now().strftime("%Y-%m-%d")

    context = f"=== 스마트 팩토리 현황 ({today}) ===\n\n"

    # 재고 현황
    context += "【자재 재고 현황】\n"
    context += f"{'자재명':<25} {'재고':>6} {'일소모':>6} {'리드타임':>8} {'단가':>10} {'공급사':<15}\n"
    context += "-" * 85 + "\n"
    for item in inventory_data:
        context += (f"{item['product']:<25} {item['stock']:>4}개 {item['daily_usage']:>4}개/일 "
                   f"{item['lead_time_days']:>5}일 {item['unit_cost']:>8,}원 {item['supplier']:<15}\n")

    # 설비 현황
    context += "\n【설비 현황】\n"
    context += f"{'설비명':<18} {'상태':<8} {'가동시간':>10} {'다음정비':>12} {'30일오류':>8}\n"
    context += "-" * 65 + "\n"
    for eq in equipment_data:
        context += (f"{eq['name']:<18} {eq['status']:<8} {eq['uptime_hours']:>7}시간 "
                   f"{eq['next_maintenance']:>12} {eq['error_count_30d']:>5}건\n")

    # 생산 현황
    p = production_plan
    remaining = p['total_order'] - p['total_produced']
    days_left = (datetime.strptime(p['deadline'], '%Y-%m-%d') - datetime.now()).days
    daily_needed = remaining / max(days_left, 1)

    context += f"\n【생산 현황】\n"
    context += f"  제품: {p['product']}\n"
    context += f"  오늘 목표: {p['daily_target']}대 / 실적: {p['today_produced']}대 (달성률 {p['today_produced']/p['daily_target']*100:.0f}%)\n"
    context += f"  불량률: {p['defect_rate']}% (목표: {p['target_defect_rate']}%)\n"
    context += f"  총 수주: {p['total_order']}대 / 생산완료: {p['total_produced']}대 / 잔여: {remaining}대\n"
    context += f"  납기: {p['deadline']} (D-{days_left}) → 필요 일생산량: {daily_needed:.0f}대/일\n"

    return context


# =============================================================
# 5) AIP 메인 루프 — Claude가 데이터 분석 → 도구 호출 반복
# =============================================================

def run_mini_aip():
    api_key = os.getenv("ANTHROPIC_API_KEY", "")
    if not api_key:
        print("❌ ANTHROPIC_API_KEY가 설정되지 않았습니다.")
        print("   .env 파일에 ANTHROPIC_API_KEY=sk-ant-... 를 추가하세요.")
        return

    client = anthropic.Anthropic(api_key=api_key)

    print("=" * 65)
    print("  Mini AIP — 스마트 팩토리 AI 의사결정 시스템")
    print(f"  실행 시각: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print(f"  AI 엔진: Claude (Anthropic API)")
    print("=" * 65)

    # 팩토리 데이터를 컨텍스트로 변환
    factory_context = build_factory_context()

    print("\n[1] 팩토리 데이터 로드 완료")
    print(f"    자재: {len(inventory_data)}종 | 설비: {len(equipment_data)}대 | 생산 계획: 1건")

    # 시스템 프롬프트 — AIP의 AI 엔진 역할 설정
    system_prompt = """당신은 스마트 팩토리 AI 운영 관리자입니다.

주어진 팩토리 데이터를 분석하고, 필요한 액션을 도구를 통해 실행하세요.

분석 기준:
- 자재: 재고 소진일이 리드타임보다 짧으면 긴급 발주, 리드타임의 1.5배 이내면 일반 발주, 10배 초과면 과잉 경고
- 설비: 알람/정지 상태이거나 오류 횟수가 많으면 정비 요청, 정비일 초과 시 점검 요청
- 생산: 일 목표 미달, 불량률 초과, 납기 위험 시 생산 조정 및 알림
- 비용: 발주 시 예상 비용(수량 × 단가) 계산

모든 액션을 도구로 실행한 뒤, 마지막에 종합 분석 리포트를 작성하세요."""

    user_message = f"""아래 스마트 팩토리 현황을 분석하고, 필요한 모든 조치를 실행해주세요.

{factory_context}

모든 이상 항목에 대해 적절한 도구(발주, 정비요청, 알림, 생산조정)를 호출하세요."""

    messages = [{"role": "user", "content": user_message}]

    print("\n[2] Claude AI 분석 시작...")
    print("-" * 65)

    # Agentic Loop — 도구 호출이 끝날 때까지 반복
    turn = 0
    while True:
        turn += 1
        response = client.messages.create(
            model="claude-sonnet-4-20250514",
            max_tokens=4096,
            system=system_prompt,
            tools=tools,
            messages=messages,
        )

        # 텍스트 응답 출력
        for block in response.content:
            if block.type == "text" and block.text.strip():
                print(f"\n[AI 분석{'(계속)' if turn > 1 else ''}]\n{block.text}\n")

        # 도구 호출 처리
        if response.stop_reason == "tool_use":
            print(f"\n[3] 액션 실행 (Turn {turn})")
            print("-" * 65)

            tool_results = []
            for block in response.content:
                if block.type == "tool_use":
                    result = handle_tool_call(block.name, block.input)
                    tool_results.append({
                        "type": "tool_result",
                        "tool_use_id": block.id,
                        "content": result,
                    })

            # 대화 히스토리에 추가 → 다음 턴 진행
            messages.append({"role": "assistant", "content": response.content})
            messages.append({"role": "user", "content": tool_results})
        else:
            # 모든 도구 호출 완료
            break

    # 결과 요약
    print("\n" + "=" * 65)
    print(f"  처리 완료 — 총 {len(action_log)}건의 액션 실행됨")
    print("=" * 65)
    print(f"  {'유형':<10} {'건수':>4}")
    print("-" * 20)
    for action_type in ["발주", "정비", "알림", "생산조정"]:
        count = sum(1 for a in action_log if a["type"] == action_type)
        if count > 0:
            print(f"  {action_type:<10} {count:>3}건")
    print("=" * 65)


# =============================================================
# 6) 실행
# =============================================================

if __name__ == "__main__":
    run_mini_aip()
