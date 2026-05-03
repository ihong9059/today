# Antigravity PayPal MCP 서버 설정 가이드

**작성일:** 2026년 02월 11일

---

## 개요

Antigravity IDE에서 PayPal MCP(Model Context Protocol) 서버를 설정하여 AI 에이전트가 PayPal API를 사용할 수 있도록 구성하는 방법을 설명합니다.

---

## 1. PayPal Access Token 발급

### 1.1 PayPal Developer Dashboard 접속
- [PayPal Developer Dashboard](https://developer.paypal.com/dashboard/)에서 로그인
- **Apps & Credentials** 메뉴에서 앱 생성 또는 선택
- **Client ID**와 **Client Secret** 확인

### 1.2 Access Token 발급 명령어

```bash
curl -s -X POST "https://api-m.sandbox.paypal.com/v1/oauth2/token" \
  -u "CLIENT_ID:CLIENT_SECRET" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "grant_type=client_credentials"
```

### 1.3 응답 예시

```json
{
  "scope": "...",
  "access_token": "A21AAK7z02RgSkPUzAlVpBjYG2HfXFmMKVRe60Rxt5GF5_r7sPG5cwmkNLddeTEP-cjxoPBxX_XFbzQhrVqqolaQnLeRyo3fQ",
  "token_type": "Bearer",
  "app_id": "APP-XXXXXXXXX",
  "expires_in": 32400,
  "nonce": "..."
}
```

**중요**: 토큰은 약 9시간(32,400초) 후 만료됩니다. 만료 시 위 명령어를 다시 실행하여 새 토큰을 발급받으세요.

---

## 2. MCP 설정 파일 위치

Antigravity의 MCP 설정 파일 경로:

```
C:\Users\{사용자명}\.gemini\antigravity\mcp_config.json
```

---

## 3. 발생한 에러 및 원인

### 3.1 에러 메시지

```
🚨 Error initializing PayPal MCP server:
The --tools arguments must be provided.
```

### 3.2 원인

1. Antigravity UI에서 **PayPal Access Token**과 **PayPal Environment** 필드만 제공
2. **`--tools` 옵션 입력 필드가 없음** (UI 제한사항)
3. 환경변수 방식(`PAYPAL_ACCESS_TOKEN`)이 아닌 **CLI 인수 방식** 필요

### 3.3 올바른 CLI 인수 형식

| 잘못된 형식 | 올바른 형식 |
|------------|------------|
| `--tools all` | `--tools=invoices.create,orders.create,...` |
| 환경변수 `PAYPAL_ACCESS_TOKEN` | `--access-token=토큰값` |
| 환경변수 `PAYPAL_ENVIRONMENT` | `--paypal-environment=SANDBOX` |

---

## 4. 사용 가능한 도구(Tools) 목록

```
invoices.create, invoices.list, invoices.get, invoices.send,
invoices.sendReminder, invoices.cancel, invoices.generateQRC,
orders.create, orders.get, orders.capture,
disputes.list, disputes.get, disputes.create,
shipment.create, shipment.get,
products.create, products.list, products.update, products.show,
subscriptionPlans.create, subscriptionPlans.list, subscriptionPlans.show,
subscriptions.create, subscriptions.show, subscriptions.cancel,
transactions.list,
payments.createRefund, payments.getRefunds
```

---

## 5. 올바른 MCP 설정 파일

```json
{
  "mcpServers": {
    "paypal": {
      "command": "npx",
      "args": [
        "-y",
        "@paypal/mcp",
        "--tools=invoices.create,invoices.list,invoices.get,invoices.send,invoices.sendReminder,invoices.cancel,invoices.generateQRC,orders.create,orders.get,orders.capture,disputes.list,disputes.get,products.create,products.list,products.show,subscriptionPlans.create,subscriptionPlans.list,subscriptions.create,subscriptions.show,subscriptions.cancel,transactions.list,payments.createRefund",
        "--access-token=YOUR_ACCESS_TOKEN_HERE",
        "--paypal-environment=SANDBOX"
      ],
      "env": {}
    }
  }
}
```

---

## 6. 설정 적용 방법

### 6.1 단계별 절차

1. **Antigravity 완전 종료**
2. **설정 파일 편집**
   - `C:\Users\{사용자명}\.gemini\antigravity\mcp_config.json` 열기
   - 위 내용으로 수정 (Access Token 값 교체)
3. **파일 저장**
4. **Antigravity 재시작**
5. **MCP Extensions에서 PayPal 확인**
   - Tools 탭에 도구 목록이 표시되면 성공

### 6.2 정상 작동 확인

터미널에서 테스트:

```bash
npx -y @paypal/mcp \
  --tools=invoices.create,invoices.list,orders.create,orders.get \
  --access-token="YOUR_TOKEN" \
  --paypal-environment=SANDBOX
```

성공 시 출력:
```
✅ PayPal MCP Server running on stdio
   Mode: Sandbox
```

---

## 7. 토큰 갱신 방법

토큰이 만료되면 (약 9시간 후):

1. **새 토큰 발급** (1.2 명령어 재실행)
2. **설정 파일에서 `--access-token` 값 교체**
3. **Antigravity 재시작**

### 자동화 권장사항

- 토큰 만료 전 5-10분 여유를 두고 갱신
- 애플리케이션에서 `expires_in` 값을 추적하여 자동 갱신 구현
- API 호출 시 `401 Unauthorized` 응답 시 토큰 갱신 후 재시도

---

## 8. 환경(Environment) 설정

| 환경 | 값 | API URL |
|------|-----|---------|
| 테스트(샌드박스) | `SANDBOX` | `api-m.sandbox.paypal.com` |
| 실제(프로덕션) | `PRODUCTION` | `api-m.paypal.com` |

---

## 9. 참고 자료

- [PayPal Agent Toolkit GitHub](https://github.com/paypal/agent-toolkit)
- [PayPal Developer Documentation](https://developer.paypal.com/docs/)
- [@paypal/mcp NPM Package](https://www.npmjs.com/package/@paypal/mcp)

---

## 10. 문제 해결

### Q: "No tools found" 표시됨
**A**: 설정 파일에서 `--tools` 옵션이 올바르게 지정되었는지 확인

### Q: "Cannot read properties of undefined" 에러
**A**: 도구 이름이 `invoices.create` 형식인지 확인 (`invoices`만 사용 불가)

### Q: 토큰이 작동하지 않음
**A**: 토큰이 만료되었을 수 있음. 새로 발급받아 교체

---

*작성일: 2026-02-11*
