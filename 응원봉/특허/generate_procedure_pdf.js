const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const html = `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        body { font-family: 'Malgun Gothic', sans-serif; padding: 40px; line-height: 1.6; font-size: 11pt; }
        h1 { text-align: center; border-bottom: 3px solid #333; padding-bottom: 15px; font-size: 22pt; }
        h2 { color: #1a5f7a; border-left: 4px solid #1a5f7a; padding-left: 10px; margin-top: 30px; font-size: 14pt; }
        h3 { color: #333; margin-top: 20px; font-size: 12pt; }
        h4 { color: #555; margin-top: 15px; font-size: 11pt; }
        table { border-collapse: collapse; width: 100%; margin: 15px 0; font-size: 10pt; }
        th, td { border: 1px solid #ccc; padding: 8px 12px; text-align: left; }
        th { background: #f0f0f0; font-weight: bold; }
        .center { text-align: center; }
        .highlight { background: #fffde7; padding: 10px; border-left: 3px solid #ffc107; margin: 15px 0; }
        .warning { background: #ffebee; padding: 10px; border-left: 3px solid #f44336; margin: 15px 0; }
        .checklist { list-style: none; padding-left: 0; }
        .checklist li { padding: 5px 0; }
        .checklist li:before { content: "☐ "; font-size: 14pt; }
        pre { background: #f5f5f5; padding: 15px; border-radius: 5px; font-size: 10pt; overflow-x: auto; }
        .flow { text-align: center; background: #e3f2fd; padding: 15px; border-radius: 8px; margin: 15px 0; }
        .info-box { background: #e8f5e9; padding: 15px; border-radius: 8px; margin: 15px 0; }
        .cost-total { font-weight: bold; background: #fff3e0; }
        hr { border: none; border-top: 1px solid #ddd; margin: 30px 0; }
        .footer { text-align: center; color: #666; font-size: 9pt; margin-top: 40px; padding-top: 20px; border-top: 1px solid #ddd; }
        @media print { body { padding: 20px; } }
    </style>
</head>
<body>

<h1>AI FanStick 특허출원 절차서</h1>

<h2>기본 정보</h2>
<table>
    <tr><th width="25%">항목</th><th>내용</th></tr>
    <tr><td>발명의 명칭</td><td>실시간 콘서트 정보를 시스템 프롬프트로 동적 주입하여 AI 응답을 생성하고 응원봉을 제어하는 스마트 응원봉 시스템 및 방법</td></tr>
    <tr><td>출원인</td><td>UTTEC</td></tr>
    <tr><td>발명자</td><td>홍 광선</td></tr>
    <tr><td>출원 예정일</td><td>2026년 3월 3일</td></tr>
</table>

<hr>

<h2>1. 출원 전 준비사항</h2>

<h3>1.1 필수 서류 확인</h3>
<table>
    <tr><th>서류명</th><th>파일명</th><th>상태</th></tr>
    <tr><td>특허출원서 (명세서 포함)</td><td>AI_FanStick_특허출원서_최종.pdf</td><td class="center">✅ 완료</td></tr>
    <tr><td>도면 (7개)</td><td>도면 폴더 내 PNG 파일</td><td class="center">✅ 완료</td></tr>
    <tr><td>요약서</td><td>명세서 내 포함</td><td class="center">✅ 완료</td></tr>
</table>

<h3>1.2 선행기술 조사 (완료)</h3>
<ul>
    <li><strong>KIPRIS</strong> (www.kipris.or.kr) 에서 검색 완료</li>
    <li>검토된 선행기술:
        <ul>
            <li>KR102447873B1: 디지털 응원봉 응원 운영시스템</li>
            <li>KR101822968B1: 응원봉을 구비한 공연 연출 시스템</li>
            <li>US20140184386A1: Interactive lighting effect wristband</li>
        </ul>
    </li>
</ul>
<div class="info-box">
    <strong>결론:</strong> 본 발명의 AI 음성 비서 + 동적 프롬프트 주입 + LED 자동 제어 기능은 선행기술에 없음
</div>

<hr>

<h2>2. 출원 절차</h2>

<h3>2.1 단계별 진행</h3>
<div class="flow">
<pre style="background: transparent; text-align: left; display: inline-block;">
[1단계] 특허로 회원가입
        ↓
[2단계] 공동인증서 등록
        ↓
[3단계] 출원서 작성 및 파일 첨부
        ↓
[4단계] 출원료 납부
        ↓
[5단계] 출원번호 수령
        ↓
[6단계] 심사청구 (3년 이내)
        ↓
[7단계] 심사 대응 (거절이유 통지 시)
        ↓
[8단계] 등록료 납부 및 등록
</pre>
</div>

<h3>2.2 상세 절차</h3>

<h4>[1단계] 특허로 회원가입</h4>
<ul>
    <li><strong>사이트:</strong> https://www.patent.go.kr</li>
    <li><strong>필요사항:</strong>
        <ul>
            <li>개인: 주민등록번호, 휴대폰</li>
            <li>법인: 사업자등록번호, 법인인감증명서</li>
        </ul>
    </li>
</ul>

<h4>[2단계] 공동인증서 등록</h4>
<ul>
    <li>기존 은행/범용 공동인증서 사용 가능</li>
    <li>특허로 로그인 → 인증서 등록</li>
</ul>

<h4>[3단계] 출원서 작성</h4>
<ul>
    <li><strong>경로:</strong> 특허로 → 출원 → 특허출원</li>
    <li><strong>첨부 파일:</strong>
        <ul>
            <li>명세서: AI_FanStick_특허출원서_최종.pdf</li>
            <li>도면: 개별 PNG 파일 또는 PDF 내 포함</li>
        </ul>
    </li>
</ul>

<div class="highlight">
    <strong>PDF 제출:</strong> 특허로 시스템에서 명세서 및 도면을 PDF 형식으로 첨부 가능합니다.<br>
    단, 출원서 양식은 시스템 내에서 직접 작성해야 합니다.
</div>

<h4>[4단계] 출원료 납부</h4>
<table>
    <tr><th>구분</th><th>기본료</th><th>가산료 (청구항당)</th></tr>
    <tr><td>전자출원</td><td>46,000원</td><td>1,000원/항</td></tr>
    <tr><td>서면출원</td><td>66,000원</td><td>1,000원/항</td></tr>
</table>
<p><strong>본 발명 예상 출원료:</strong> 46,000원 + (14항 × 1,000원) = <strong>60,000원</strong></p>

<h4>[5단계] 출원번호 수령</h4>
<ul>
    <li>출원 완료 후 즉시 출원번호 부여</li>
    <li>형식: 10-2026-0XXXXXX</li>
</ul>

<hr>

<h2>3. 출원 후 절차</h2>

<h3>3.1 심사청구</h3>
<table>
    <tr><th width="30%">항목</th><th>내용</th></tr>
    <tr><td>기한</td><td>출원일로부터 <strong>3년 이내</strong></td></tr>
    <tr><td>수수료</td><td>143,000원 + (44,000원 × 청구항 수)</td></tr>
    <tr><td>본 발명 예상</td><td>143,000원 + (44,000원 × 14항) = <strong>759,000원</strong></td></tr>
</table>

<div class="warning">
    <strong>주의:</strong> 심사청구를 하지 않으면 출원이 자동 취하됩니다.
</div>

<h3>3.2 심사 진행</h3>
<div class="flow">
<pre style="background: transparent; text-align: left; display: inline-block;">
심사청구 → 심사대기 (12~18개월) → 심사관 심사
        ↓
[등록결정] 또는 [거절이유통지]
        ↓
거절이유통지 시 → 의견서/보정서 제출 (2개월 이내)
        ↓
재심사 → 등록결정 또는 최종거절
</pre>
</div>

<h3>3.3 등록료 납부</h3>
<p>등록결정 후 3개월 이내 납부:</p>
<table>
    <tr><th>연차</th><th>금액 (매년)</th></tr>
    <tr><td>1~3년</td><td>매년 40,000원 + (22,000원 × 청구항수)</td></tr>
    <tr><td>4~6년</td><td>매년 100,000원 + (38,000원 × 청구항수)</td></tr>
    <tr><td>7~9년</td><td>매년 240,000원 + (55,000원 × 청구항수)</td></tr>
    <tr><td>10~25년</td><td>매년 360,000원 + (55,000원 × 청구항수)</td></tr>
</table>

<hr>

<h2>4. 주요 일정 요약</h2>
<table>
    <tr><th>단계</th><th>예상 일정</th><th>비고</th></tr>
    <tr><td>출원</td><td>2026년 3월 3일</td><td></td></tr>
    <tr><td>심사청구</td><td>2026년 3월 ~ 2029년 3월</td><td>3년 이내 필수</td></tr>
    <tr><td>심사결과</td><td>심사청구 후 12~18개월</td><td></td></tr>
    <tr><td>등록</td><td>심사 통과 후 3개월 이내</td><td>등록료 납부</td></tr>
</table>

<hr>

<h2>5. 연락처 및 참고사이트</h2>
<table>
    <tr><th>용도</th><th>연락처/사이트</th></tr>
    <tr><td>특허출원</td><td>https://www.patent.go.kr (특허로)</td></tr>
    <tr><td>선행기술 검색</td><td>https://www.kipris.or.kr (KIPRIS)</td></tr>
    <tr><td>고객상담</td><td>1544-8080 (특허청 고객상담센터)</td></tr>
    <tr><td>출원 절차 안내</td><td>https://www.easylaw.go.kr (찾기쉬운 생활법령)</td></tr>
</table>

<hr>

<h2>6. 체크리스트</h2>

<h3>출원 전</h3>
<ul class="checklist">
    <li>특허로 회원가입 완료</li>
    <li>공동인증서 등록 완료</li>
    <li>출원서류 최종 검토 (명세서, 도면, 요약서)</li>
    <li>출원료 준비 (60,000원)</li>
</ul>

<h3>출원 시</h3>
<ul class="checklist">
    <li>출원서 양식 작성</li>
    <li>명세서 PDF 첨부</li>
    <li>도면 첨부</li>
    <li>출원료 납부</li>
    <li>출원번호 확인 및 저장</li>
</ul>

<h3>출원 후</h3>
<ul class="checklist">
    <li>출원번호 보관</li>
    <li>심사청구 일정 기록 (3년 이내)</li>
    <li>심사청구 수수료 준비</li>
</ul>

<hr>

<h2>7. 비용 총정리</h2>
<table>
    <tr><th>단계</th><th>금액</th><th>시기</th></tr>
    <tr><td>출원료</td><td>60,000원</td><td>출원 시</td></tr>
    <tr><td>심사청구료</td><td>759,000원</td><td>출원 후 3년 이내</td></tr>
    <tr><td>1~3년 등록료</td><td>348,000원/년</td><td>등록 시</td></tr>
    <tr class="cost-total"><td><strong>총 초기비용</strong></td><td colspan="2"><strong>약 120만원</strong></td></tr>
</table>

<div class="footer">
    <p><strong>작성일:</strong> 2026년 2월 27일 | <strong>작성자:</strong> Claude Code</p>
    <p><em>본 절차서는 2026년 2월 기준 한국 특허청 규정을 기반으로 작성되었습니다.<br>
    정확한 수수료 및 절차는 특허로(www.patent.go.kr)에서 확인하시기 바랍니다.</em></p>
</div>

</body>
</html>`;

(async () => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'networkidle0' });

    await page.pdf({
        path: path.join(__dirname, '특허출원_절차서.pdf'),
        format: 'A4',
        printBackground: true,
        margin: { top: '15mm', right: '15mm', bottom: '15mm', left: '15mm' }
    });

    await browser.close();
    console.log('PDF 생성 완료: 특허출원_절차서.pdf');
})();
