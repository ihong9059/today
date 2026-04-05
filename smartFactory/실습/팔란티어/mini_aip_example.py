"""
Mini AIP Example — Palantir AIP 핵심 패턴 재현

AIP의 핵심: "데이터 기반 LLM 의사결정 + 액션 실행"
  1. 데이터 로드 (온톨로지 역할)
  2. LLM에 컨텍스트로 전달
  3. LLM 판단에 따라 액션(Tool) 실행

필요 패키지: pip install anthropic
"""

import anthropic
import json

# =============================================================
# 1) 데이터 정의 — AIP에서는 Foundry 온톨로지에서 가져오는 부분
# =============================================================
inventory_data = """
| 제품   | 현재 재고 | 일평균 판매 | 리드타임(일) |
|--------|-----------|-------------|-------------|
| 제품A  | 5개       | 10개        | 3일         |
| 제품B  | 200개     | 3개         | 5일         |
| 제품C  | 0개       | 8개         | 2일         |
| 제품D  | 50개      | 12개        | 4일         |
"""

# =============================================================
# 2) 도구(액션) 정의 — AIP에서는 Foundry Action으로 등록하는 부분
# =============================================================
tools = [
    {
        "name": "create_purchase_order",
        "description": "긴급 발주를 생성합니다. 재고 부족이 예상되는 제품에 사용합니다.",
        "input_schema": {
            "type": "object",
            "properties": {
                "product": {
                    "type": "string",
                    "description": "발주할 제품명",
                },
                "quantity": {
                    "type": "integer",
                    "description": "발주 수량",
                },
                "priority": {
                    "type": "string",
                    "enum": ["긴급", "일반", "낮음"],
                    "description": "발주 우선순위",
                },
                "reason": {
                    "type": "string",
                    "description": "발주 사유",
                },
            },
            "required": ["product", "quantity", "priority", "reason"],
        },
    },
    {
        "name": "send_alert",
        "description": "담당자에게 알림을 전송합니다.",
        "input_schema": {
            "type": "object",
            "properties": {
                "message": {
                    "type": "string",
                    "description": "알림 메시지 내용",
                },
                "severity": {
                    "type": "string",
                    "enum": ["critical", "warning", "info"],
                    "description": "알림 심각도",
                },
            },
            "required": ["message", "severity"],
        },
    },
]


# =============================================================
# 3) 액션 핸들러 — 실제 시스템 연동 시 API 호출로 대체
# =============================================================
def handle_tool_call(tool_name: str, tool_input: dict) -> str:
    if tool_name == "create_purchase_order":
        print(f"  [발주 생성] {tool_input['product']} — "
              f"{tool_input['quantity']}개, 우선순위: {tool_input['priority']}")
        print(f"    사유: {tool_input['reason']}")
        return json.dumps({"status": "success", "order_id": f"PO-2026-{hash(tool_input['product']) % 10000:04d}"})

    elif tool_name == "send_alert":
        print(f"  [알림 전송] [{tool_input['severity'].upper()}] {tool_input['message']}")
        return json.dumps({"status": "sent"})

    return json.dumps({"status": "error", "message": "unknown tool"})


# =============================================================
# 4) AIP 루프 — LLM이 데이터를 분석하고 필요한 액션을 실행
# =============================================================
def run_mini_aip():
    client = anthropic.Anthropic()

    print("=" * 60)
    print("Mini AIP — 재고 분석 및 자동 발주 시스템")
    print("=" * 60)
    print()

    messages = [
        {
            "role": "user",
            "content": (
                "아래 재고 데이터를 분석해주세요.\n"
                "재고가 리드타임 내 소진될 제품은 긴급 발주를 생성하고,\n"
                "재고 과잉 제품은 알림을 보내주세요.\n\n"
                f"{inventory_data}"
            ),
        }
    ]

    # 도구 호출이 끝날 때까지 반복 (Agentic Loop)
    while True:
        response = client.messages.create(
            model="claude-sonnet-4-20250514",
            max_tokens=2048,
            tools=tools,
            messages=messages,
        )

        # 텍스트 응답 출력
        for block in response.content:
            if block.type == "text":
                print(f"\n[AI 분석]\n{block.text}\n")

        # 도구 호출 처리
        if response.stop_reason == "tool_use":
            tool_results = []
            for block in response.content:
                if block.type == "tool_use":
                    result = handle_tool_call(block.name, block.input)
                    tool_results.append({
                        "type": "tool_result",
                        "tool_use_id": block.id,
                        "content": result,
                    })

            # 대화 히스토리에 추가하고 다음 턴 진행
            messages.append({"role": "assistant", "content": response.content})
            messages.append({"role": "user", "content": tool_results})
        else:
            # 도구 호출 없이 종료
            break

    print("\n" + "=" * 60)
    print("처리 완료")
    print("=" * 60)


if __name__ == "__main__":
    run_mini_aip()
