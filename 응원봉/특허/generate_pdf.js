const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function generatePDF() {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    // HTML 콘텐츠 생성
    const htmlContent = `
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <title>AI FanStick 특허 출원서</title>
    <style>
        @page { size: A4; margin: 25mm; }
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Malgun Gothic', 'Apple SD Gothic Neo', sans-serif; font-size: 11pt; line-height: 1.6; }

        .page { page-break-after: always; }
        .page:last-child { page-break-after: auto; }

        h1 { font-size: 24pt; text-align: center; margin: 40px 0 30px; }
        h2 { font-size: 14pt; margin: 25px 0 15px; }
        h3 { font-size: 12pt; margin: 20px 0 10px; }

        .section-title { font-size: 13pt; font-weight: bold; margin: 25px 0 15px; }
        .claim-title { font-size: 11pt; font-weight: bold; margin: 20px 0 10px; }

        p { margin: 10px 0; text-align: justify; }
        .indent { margin-left: 20px; }
        .indent2 { margin-left: 40px; }

        table { width: 100%; border-collapse: collapse; margin: 15px 0; font-size: 10pt; }
        th, td { border: 1px solid #000; padding: 8px; text-align: center; }
        th { background: #e0e0e0; }
        td:first-child { text-align: left; }

        .info-table { width: 80%; margin: 30px auto; }
        .info-table th { width: 25%; background: #e8e8e8; }
        .info-table td { text-align: left; }

        .drawing-page { text-align: center; }
        .drawing-title { font-size: 14pt; font-weight: bold; margin: 20px 0; }
        .drawing-img { max-width: 100%; max-height: 700px; border: 1px solid #ccc; }

        .cover { text-align: center; padding-top: 100px; }
        .cover h1 { font-size: 36pt; margin-bottom: 50px; }
        .cover h2 { font-size: 20pt; font-weight: normal; }

        .footer { text-align: center; margin-top: 50px; font-weight: bold; }

        code { font-family: 'Consolas', monospace; background: #f5f5f5; padding: 2px 5px; }
    </style>
</head>
<body>

<!-- 표지 -->
<div class="page cover">
    <h1>특 허 출 원 서</h1>
    <h2>(명 세 서)</h2>

    <table class="info-table" style="margin-top: 80px;">
        <tr><th>출원인</th><td>UTTEC</td></tr>
        <tr><th>발명자</th><td>홍 광선</td></tr>
        <tr><th>대리인</th><td>(직접 출원)</td></tr>
        <tr><th>출원일</th><td>2026년 3월 3일</td></tr>
        <tr><th>문서 버전</th><td>2.1 (하이브리드 AI 추가)</td></tr>
    </table>
</div>

<!-- 발명의 명칭 -->
<div class="page">
    <div class="section-title">【발명의 명칭】</div>
    <p><b>한글:</b> 실시간 콘서트 정보를 시스템 프롬프트로 동적 주입하여 AI 응답을 생성하고 응원봉을 제어하는 스마트 응원봉 시스템 및 방법</p>
    <p><b>영문:</b> Smart Light Stick System and Method for Generating AI Responses and Controlling Light Stick by Dynamically Injecting Real-time Concert Information into System Prompts</p>

    <div class="section-title">【기술분야】</div>
    <p>본 발명은 스마트 응원봉 기술에 관한 것으로, 더욱 상세하게는 인공지능(AI) 기반 음성 비서 기능을 탑재하여 사용자의 음성 질문에 실시간 콘서트 정보를 기반으로 응답하고, 응답에 포함된 LED 제어 정보를 추출하여 응원봉의 LED를 자동으로 제어하는 시스템 및 방법에 관한 것이다.</p>

    <div class="section-title">【발명의 배경이 되는 기술】</div>
    <p>기존 응원봉은 다음과 같은 한계를 가진다:</p>
    <p class="indent">1. 일방향 통신: 중앙 제어 시스템에서 응원봉으로 LED 제어 신호만 전송하며, 사용자로부터의 피드백이나 질문을 처리할 수 없다.</p>
    <p class="indent">2. 정보 제공 불가: "다음 곡이 무엇인지", "현재 곡의 응원색이 무엇인지" 등 콘서트 진행 정보를 사용자에게 능동적으로 제공할 수 없다.</p>
    <p class="indent">3. 정적 제어 방식: 사전 프로그래밍된 LED 시퀀스만 실행 가능하며, 실시간 상황에 따른 동적 대응이 불가능하다.</p>

    <h3>【선행 기술 분석】</h3>
    <table>
        <tr><th>특허번호</th><th>명칭</th><th>한계점</th></tr>
        <tr><td>KR102447873B1</td><td>디지털 응원봉 응원 운영시스템</td><td>AI 기능 없음, 음성 인식 없음</td></tr>
        <tr><td>KR101822968B1</td><td>응원봉을 구비한 공연 연출 시스템</td><td>중앙 제어만, 양방향 대화 불가</td></tr>
        <tr><td>US20140184386A1</td><td>Interactive lighting effect wristband</td><td>LED 제어만, AI 없음</td></tr>
    </table>
    <p>상기 선행 기술들은 모두 AI 기반 음성 인터페이스, 실시간 콘텍스트 주입, AI 응답과 LED 제어의 자동 연동 기능이 없다.</p>
</div>

<!-- 발명의 내용 -->
<div class="page">
    <div class="section-title">【발명의 내용】</div>

    <h3>【해결하고자 하는 과제】</h3>
    <p>본 발명은 상기와 같은 종래 기술의 문제점을 해결하기 위하여 안출된 것으로, 다음과 같은 과제를 해결하고자 한다:</p>
    <p class="indent">1. 사용자가 음성으로 질문하면 현재 콘서트 상황에 맞는 정확한 정보를 AI가 제공하는 시스템 구현</p>
    <p class="indent">2. AI 응답에서 LED 색상 정보를 자동 추출하여 응원봉을 제어하는 자동화 시스템 구현</p>
    <p class="indent">3. 콘서트 셋리스트, 아티스트 정보, 현재 곡 인덱스 등을 실시간으로 AI에게 전달하는 동적 콘텍스트 주입 방법 제공</p>

    <h3>【과제의 해결 수단】</h3>
    <p>상기 과제를 해결하기 위한 본 발명의 스마트 응원봉 시스템은:</p>
    <p class="indent">1. 응원봉 장치: LED, 마이크로컨트롤러, BLE 통신 모듈을 포함</p>
    <p class="indent">2. 스마트폰 애플리케이션: 음성 인식, AI API 연동, BLE 통신을 처리</p>
    <p class="indent">3. 로컬 데이터베이스: 콘서트 셋리스트, 아티스트 정보, 현재 곡 인덱스 저장</p>
    <p class="indent">4. 시스템 프롬프트 생성기: 로컬 데이터를 기반으로 동적 프롬프트 생성</p>
    <p class="indent">5. AI 서버: 시스템 프롬프트와 사용자 질문을 처리하여 응답 생성</p>

    <h3>【발명의 효과】</h3>
    <p>본 발명에 따르면 다음과 같은 효과가 있다:</p>
    <p class="indent">1. 실시간 정보 제공: 사용자가 "다음 곡 뭐야?"라고 질문하면 현재 콘서트 상태를 기반으로 정확한 정보를 제공할 수 있다.</p>
    <p class="indent">2. 자연어 인터페이스: 다양한 표현의 질문을 AI가 자동으로 이해하고 처리할 수 있다.</p>
    <p class="indent">3. LED 자동 제어: AI 응답에서 LED 색상 정보를 자동 추출하여 응원봉을 제어함으로써, 사용자가 별도로 색상을 변경할 필요가 없다.</p>
    <p class="indent">4. 동적 콘텍스트 주입: 콘서트 진행에 따라 시스템 프롬프트가 동적으로 갱신되어, AI가 항상 최신 상태를 인지할 수 있다.</p>
    <p class="indent">5. 빠른 응답 시간: 전체 처리가 3초 이내에 완료되어 실시간 인터랙션이 가능하다.</p>
    <p class="indent">6. 오프라인 동작 지원: 온디바이스 경량 언어모델을 탑재하여 콘서트장의 불안정한 네트워크 환경에서도 AI 기능이 동작한다.</p>
    <p class="indent">7. 하이브리드 안정성: 클라우드 AI 우선, 온디바이스 AI 폴백, 규칙 기반 최종 폴백의 3단계 전략으로 어떤 상황에서도 서비스 연속성을 보장한다.</p>
    <p class="indent">8. 비용 절감: 오프라인 환경에서는 클라우드 API 호출 없이 동작하므로 API 사용 비용을 절감할 수 있다.</p>
    <p class="indent">9. 프라이버시 보호: 온디바이스 처리 시 사용자의 음성 데이터가 외부 서버로 전송되지 않아 개인정보 보호에 유리하다.</p>
</div>

<!-- 도면의 간단한 설명 & 구체적인 내용 -->
<div class="page">
    <div class="section-title">【도면의 간단한 설명】</div>
    <p><b>도 1</b>은 본 발명에 따른 AI FanStick 시스템의 전체 구성도이다.</p>
    <p><b>도 2</b>는 시스템 프롬프트 생성 흐름도이다.</p>
    <p><b>도 3</b>은 음성-AI-LED 파이프라인 시퀀스 다이어그램이다.</p>
    <p><b>도 4</b>는 BLE 명령 프로토콜 구조이다.</p>
    <p><b>도 5</b>는 AI 응답 파싱 알고리즘 흐름도이다.</p>
    <p><b>도 6</b>은 하이브리드 AI 아키텍처(클라우드 + 온디바이스) 구성도이다.</p>
    <p><b>도 7</b>은 온디바이스 AI 처리 상세 흐름도이다.</p>

    <div class="section-title">【발명을 실시하기 위한 구체적인 내용】</div>

    <h3>1. 시스템 프롬프트 동적 생성 메커니즘</h3>
    <p>본 발명의 시스템 프롬프트 생성부는 로컬 JSON 데이터를 기반으로 현재 콘서트 상태를 반영한 시스템 프롬프트를 동적으로 생성한다. 로컬 데이터에는 콘서트 셋리스트, 현재 곡 인덱스, 아티스트 정보, 곡별 응원색 RGB 값이 포함된다.</p>
    <p>시스템 프롬프트 템플릿은 다음과 같은 형식으로 구성된다:</p>
    <p class="indent" style="font-style: italic;">"당신은 {artist_name} 콘서트 AI 비서입니다.</p>
    <p class="indent" style="font-style: italic;">현재 곡: {current_song} (응원색: {current_color})</p>
    <p class="indent" style="font-style: italic;">다음 곡: {next_song} (응원색: {next_color})</p>
    <p class="indent" style="font-style: italic;">답변 마지막에 [LED:R,G,B] 형식으로 색상을 포함하세요."</p>

    <h3>2. 음성-AI-LED 통합 파이프라인</h3>
    <p>사용자 음성 입력부터 LED 제어까지의 전체 처리는 다음 단계로 구성된다:</p>
    <p class="indent">① 음성 입력: 사용자가 마이크를 통해 질문 (예: "다음 곡 뭐야?")</p>
    <p class="indent">② STT 변환: Google STT를 통해 음성을 텍스트로 변환 (~500ms)</p>
    <p class="indent">③ 프롬프트 결합: 시스템 프롬프트와 사용자 질문 결합</p>
    <p class="indent">④ AI API 호출: Gemini/GPT API로 전송하여 응답 수신 (~1500ms)</p>
    <p class="indent">⑤ 응답 파싱: AI 응답에서 텍스트와 LED 색상 정보 분리</p>
    <p class="indent">⑥ TTS 출력: 텍스트를 음성으로 변환하여 스피커 출력 (병렬 처리)</p>
    <p class="indent">⑦ LED 제어: BLE를 통해 응원봉에 색상 명령 전송 (~200ms, 병렬 처리)</p>
    <p>전체 처리 시간은 약 2.5초로, 3초 이내의 실시간 인터랙션이 가능하다.</p>

    <h3>3. AI 응답 LED 색상 추출 알고리즘</h3>
    <p>AI 응답에서 LED 색상 정보를 추출하기 위해 정규식 패턴 매칭을 사용한다:</p>
    <p class="indent"><code>패턴: \\[LED:(\\d{1,3}),(\\d{1,3}),(\\d{1,3})\\]</code></p>
    <p class="indent"><code>예시 입력: "다음 곡은 좋아좋아야! [LED:0,100,255]"</code></p>
    <p>패턴 매칭 실패 시에는 로컬 데이터베이스에서 현재 곡의 응원색을 조회하여 폴백 처리한다.</p>

    <h3>4. 하이브리드 AI 아키텍처</h3>
    <p>본 발명은 클라우드 AI와 온디바이스 AI를 병용하는 하이브리드 아키텍처를 채택한다:</p>
    <p class="indent">(a) 네트워크 연결 상태 감지</p>
    <p class="indent">(b) 온라인 시: 클라우드 AI (Gemini/OpenAI) 우선 사용</p>
    <p class="indent">(c) 오프라인 또는 클라우드 실패 시: 온디바이스 경량 LLM (Gemma 2B, 양자화 Q4) 폴백</p>
    <p class="indent">(d) 모든 AI 실패 시: 규칙 기반 템플릿 응답으로 최소 기능 보장</p>
    <p>온디바이스 모델은 약 1.2GB 크기로, 고성능 스마트폰(Pixel 8 Pro, Galaxy S24 Ultra 등)에서 3-4초 내 응답이 가능하다.</p>
</div>

<!-- 청구범위 1 -->
<div class="page">
    <div class="section-title">【청구범위】</div>

    <div class="claim-title">【청구항 1】 (독립항 - 방법)</div>
    <p>응원봉 장치와 연동된 스마트폰 애플리케이션에서 인공지능(AI) 기반으로 콘서트 정보를 안내하는 방법에 있어서,</p>
    <p class="indent">(a) 콘서트 셋리스트, 현재 곡 인덱스, 아티스트 정보, 곡별 응원색 RGB 값을 포함하는 로컬 데이터를 로드하는 단계;</p>
    <p class="indent">(b) 상기 로컬 데이터를 기반으로 현재 콘서트 상태를 반영한 시스템 프롬프트를 동적으로 생성하되, 상기 시스템 프롬프트는 현재 곡, 다음 곡, 남은 곡 수, 곡별 응원색 정보를 포함하는 단계;</p>
    <p class="indent">(c) 사용자의 음성 질문을 텍스트로 변환하는 음성 인식 단계;</p>
    <p class="indent">(d) 상기 시스템 프롬프트와 상기 변환된 텍스트를 AI 서버로 전송하여 응답을 수신하는 단계;</p>
    <p class="indent">(e) 상기 AI 응답에서 소정의 형식으로 포함된 LED 색상 정보를 추출하는 파싱 단계; 및</p>
    <p class="indent">(f) 상기 추출된 LED 색상 정보를 BLE(Bluetooth Low Energy)를 통해 응원봉 장치로 전송하여 LED를 제어하는 단계;</p>
    <p>를 포함하는 것을 특징으로 하는 AI 기반 콘서트 정보 안내 방법.</p>

    <div class="claim-title">【청구항 2】 (종속항)</div>
    <p>제1항에 있어서, 상기 시스템 프롬프트는 LED 색상 응답 형식으로 "[LED:R,G,B]" 형식을 지정하는 지시문을 포함하며, R, G, B는 각각 0-255 범위의 정수값인 것을 특징으로 하는 방법.</p>

    <div class="claim-title">【청구항 3】 (종속항)</div>
    <p>제1항에 있어서, 상기 (a) 단계의 로컬 데이터는 JSON 형식으로 저장되며, 셋리스트의 각 곡에 대하여 순서(order), 제목(title), 응원색 RGB 값(color_rgb), 응원색 이름(color_name), 팬 챈트(fan_chant) 정보를 포함하는 것을 특징으로 하는 방법.</p>

    <div class="claim-title">【청구항 4】 (종속항)</div>
    <p>제1항에 있어서, 상기 (c) 단계부터 상기 (f) 단계까지의 전체 처리 시간이 3초 이내인 것을 특징으로 하는 방법.</p>

    <div class="claim-title">【청구항 5】 (종속항)</div>
    <p>제1항에 있어서, 상기 (e) 단계에서 LED 색상 정보가 추출되지 않는 경우, 현재 곡의 응원색을 유지하거나 로컬 데이터에서 해당 곡의 응원색을 조회하여 적용하는 것을 특징으로 하는 방법.</p>
</div>

<!-- 청구범위 2 -->
<div class="page">
    <div class="claim-title">【청구항 6】 (독립항 - 시스템)</div>
    <p>스마트폰 애플리케이션과 응원봉 장치를 포함하는 AI 기반 스마트 응원봉 시스템에 있어서,</p>
    <p>상기 스마트폰 애플리케이션은:</p>
    <p class="indent">(a) 콘서트 셋리스트, 아티스트 정보, 현재 곡 인덱스를 저장하는 로컬 데이터 저장부;</p>
    <p class="indent">(b) 상기 로컬 데이터를 기반으로 현재 콘서트 상태를 반영한 시스템 프롬프트를 동적으로 생성하는 프롬프트 생성부;</p>
    <p class="indent">(c) 사용자 음성을 텍스트로 변환하는 음성 인식부;</p>
    <p class="indent">(d) 상기 시스템 프롬프트와 사용자 질문을 AI 서버로 전송하고 응답을 수신하는 AI 통신부;</p>
    <p class="indent">(e) 상기 AI 응답에서 LED 제어 정보를 추출하는 응답 파싱부; 및</p>
    <p class="indent">(f) 상기 응원봉 장치와 BLE 통신을 수행하는 BLE 통신부;</p>
    <p>를 포함하고,</p>
    <p>상기 응원봉 장치는:</p>
    <p class="indent">(g) 복수의 LED를 포함하는 발광부;</p>
    <p class="indent">(h) 상기 스마트폰 애플리케이션으로부터 명령을 수신하는 BLE 수신부; 및</p>
    <p class="indent">(i) 상기 수신된 명령에 따라 상기 발광부를 제어하는 마이크로컨트롤러;</p>
    <p>를 포함하는 것을 특징으로 하는 AI 기반 스마트 응원봉 시스템.</p>

    <div class="claim-title">【청구항 7】 (종속항)</div>
    <p>제6항에 있어서, 상기 프롬프트 생성부는 현재 곡 인덱스가 변경될 때마다 시스템 프롬프트를 재생성하여, AI 서버가 항상 최신 콘서트 상태를 인지할 수 있도록 하는 것을 특징으로 하는 시스템.</p>

    <div class="claim-title">【청구항 8】 (종속항)</div>
    <p>제6항에 있어서, 상기 BLE 통신부는 "&lt;명령타입&gt;:&lt;파라미터&gt;" 형식의 구조화된 명령 프로토콜을 사용하되,</p>
    <p class="indent">- "C:R,G,B"는 LED 색상 변경 명령;</p>
    <p class="indent">- "P:&lt;패턴명&gt;"은 LED 패턴 변경 명령;</p>
    <p class="indent">- "T:&lt;텍스트&gt;"는 텍스트 표시 명령;</p>
    <p>을 포함하는 것을 특징으로 하는 시스템.</p>

    <div class="claim-title">【청구항 9】 (독립항 - 장치)</div>
    <p>BLE 통신 모듈, 복수의 LED, 마이크로컨트롤러를 포함하는 스마트 응원봉 장치에 있어서,</p>
    <p>상기 마이크로컨트롤러는:</p>
    <p class="indent">(a) 상기 BLE 통신 모듈을 통해 스마트폰 애플리케이션으로부터 LED 제어 명령을 수신하되, 상기 LED 제어 명령은 AI 서버의 응답에서 추출된 색상 정보를 기반으로 생성된 것이고;</p>
    <p class="indent">(b) 상기 수신된 LED 제어 명령을 파싱하여 RGB 색상값을 추출하고;</p>
    <p class="indent">(c) 상기 추출된 RGB 색상값에 따라 상기 복수의 LED의 색상을 제어하는;</p>
    <p>것을 특징으로 하는 스마트 응원봉 장치.</p>

    <div class="claim-title">【청구항 10】 (종속항)</div>
    <p>제9항에 있어서, 상기 마이크로컨트롤러는 추가적으로 rainbow, pulse, blink, wave 패턴을 포함하는 복수의 LED 애니메이션 패턴을 저장하고, 패턴 명령 수신 시 해당 패턴을 실행하는 것을 특징으로 하는 장치.</p>
</div>

<!-- 청구범위 3 -->
<div class="page">
    <div class="claim-title">【청구항 11】 (독립항 - 하이브리드 AI 방법)</div>
    <p>클라우드 AI 서버와 온디바이스 AI를 병용하여 응원봉을 제어하는 하이브리드 AI 기반 스마트 응원봉 시스템의 동작 방법에 있어서,</p>
    <p class="indent">(a) 스마트폰 애플리케이션이 네트워크 연결 상태를 감지하는 단계;</p>
    <p class="indent">(b) 네트워크가 연결된 경우, 클라우드 AI 서버로 시스템 프롬프트와 사용자 질문을 전송하여 응답을 수신하는 단계;</p>
    <p class="indent">(c) 네트워크가 연결되지 않았거나 클라우드 AI 서버 응답 실패 시, 스마트폰에 탑재된 온디바이스 경량 언어모델(Local LLM)을 이용하여 응답을 생성하는 단계;</p>
    <p class="indent">(d) 상기 생성된 응답에서 LED 제어 정보를 추출하여 BLE를 통해 응원봉을 제어하는 단계;</p>
    <p>를 포함하고, 상기 온디바이스 경량 언어모델은 2B 이하 파라미터의 양자화된 모델이며, 오프라인 환경에서도 콘서트 정보 안내 및 LED 제어가 가능한 것을 특징으로 하는 하이브리드 AI 기반 스마트 응원봉 제어 방법.</p>

    <div class="claim-title">【청구항 12】 (종속항)</div>
    <p>제11항에 있어서, 상기 (c) 단계에서 온디바이스 AI 응답 생성도 실패하는 경우, 로컬 데이터베이스에 저장된 현재 곡 정보를 기반으로 규칙 기반(Rule-based) 응답을 생성하는 폴백 단계를 더 포함하는 것을 특징으로 하는 방법.</p>

    <div class="claim-title">【청구항 13】 (종속항)</div>
    <p>제11항에 있어서, 상기 온디바이스 경량 언어모델은 앱 최초 실행 시 원격 서버로부터 다운로드되어 로컬 저장소에 저장되며, 모델 버전 관리를 통해 업데이트가 가능한 것을 특징으로 하는 방법.</p>

    <div class="claim-title">【청구항 14】 (종속항)</div>
    <p>제11항에 있어서, 상기 온디바이스 경량 언어모델은 콘서트 도메인에 특화된 질의응답 데이터셋으로 파인튜닝(Fine-tuning)되어, 아티스트 정보, 셋리스트, 응원법 등에 대한 답변 품질이 향상된 것을 특징으로 하는 방법.</p>
</div>

<!-- 요약서 -->
<div class="page">
    <div class="section-title">【요약서】</div>

    <h3>【요약】</h3>
    <p>본 발명은 AI 기반 스마트 응원봉 시스템 및 방법에 관한 것으로, 콘서트 셋리스트, 현재 곡 인덱스, 아티스트 정보를 포함하는 로컬 데이터를 기반으로 시스템 프롬프트를 동적으로 생성하고, 사용자의 음성 질문과 함께 AI 서버로 전송하여 응답을 수신한다. AI 응답에서 [LED:R,G,B] 형식의 색상 정보를 추출하여 BLE를 통해 응원봉의 LED를 자동 제어한다. 클라우드 AI와 온디바이스 경량 언어모델을 병용하는 하이브리드 아키텍처를 채택하여, 오프라인 환경에서도 콘서트 정보 안내 및 LED 제어가 가능하다. 이를 통해 사용자는 음성으로 콘서트 정보를 질문하고, AI가 현재 상황에 맞는 정확한 정보와 함께 응원봉 색상을 자동으로 변경해주는 양방향 인터랙션이 가능하다.</p>

    <h3>【대표도】</h3>
    <p>도 1</p>

    <h3>【선행 기술 대비 신규성 요약】</h3>
    <table>
        <tr><th>구분</th><th>본 발명</th><th>KR1024...</th><th>KR1018...</th><th>US2014...</th></tr>
        <tr><td>AI 음성 비서</td><td>O</td><td>X</td><td>X</td><td>X</td></tr>
        <tr><td>시스템 프롬프트 동적 생성</td><td>O</td><td>X</td><td>X</td><td>X</td></tr>
        <tr><td>실시간 콘텍스트 주입</td><td>O</td><td>X</td><td>X</td><td>X</td></tr>
        <tr><td>AI 응답→LED 자동 연동</td><td>O</td><td>X</td><td>X</td><td>X</td></tr>
        <tr><td>양방향 대화형 인터페이스</td><td>O</td><td>X</td><td>X</td><td>X</td></tr>
        <tr><td>온디바이스 AI (로컬 LLM)</td><td>O</td><td>X</td><td>X</td><td>X</td></tr>
        <tr><td>하이브리드 AI 전환</td><td>O</td><td>X</td><td>X</td><td>X</td></tr>
        <tr><td>오프라인 AI 동작</td><td>O</td><td>X</td><td>X</td><td>X</td></tr>
        <tr><td>다단계 폴백 메커니즘</td><td>O</td><td>X</td><td>X</td><td>X</td></tr>
        <tr><td>BLE/RF LED 제어</td><td>O</td><td>O</td><td>O</td><td>O</td></tr>
        <tr><td>모바일 앱 연동</td><td>O</td><td>O</td><td>O</td><td>X</td></tr>
    </table>
</div>

<!-- 도면 -->
<div class="page drawing-page">
    <div class="section-title">【도면】</div>
    <div class="drawing-title">【도 1】 AI FanStick 전체 시스템 구성도</div>
    <img src="file://${path.join(__dirname, '도면', '도1_전체시스템구성도.png')}" class="drawing-img" />
</div>

<div class="page drawing-page">
    <div class="drawing-title">【도 2】 시스템 프롬프트 생성 흐름도</div>
    <img src="file://${path.join(__dirname, '도면', '도2_시스템프롬프트생성흐름도.png')}" class="drawing-img" />
</div>

<div class="page drawing-page">
    <div class="drawing-title">【도 3】 음성-AI-LED 파이프라인 시퀀스 다이어그램</div>
    <img src="file://${path.join(__dirname, '도면', '도3_음성AI_LED파이프라인시퀀스.png')}" class="drawing-img" />
</div>

<div class="page drawing-page">
    <div class="drawing-title">【도 4】 BLE 명령 프로토콜 구조</div>
    <img src="file://${path.join(__dirname, '도면', '도4_BLE명령프로토콜구조.png')}" class="drawing-img" />
</div>

<div class="page drawing-page">
    <div class="drawing-title">【도 5】 AI 응답 파싱 알고리즘 흐름도</div>
    <img src="file://${path.join(__dirname, '도면', '도5_AI응답파싱알고리즘흐름도.png')}" class="drawing-img" />
</div>

<div class="page drawing-page">
    <div class="drawing-title">【도 6】 하이브리드 AI 아키텍처 (클라우드 + 온디바이스)</div>
    <img src="file://${path.join(__dirname, '도면', '도6_하이브리드AI아키텍처.png')}" class="drawing-img" />
</div>

<div class="page drawing-page">
    <div class="drawing-title">【도 7】 온디바이스 AI 처리 상세 흐름도</div>
    <img src="file://${path.join(__dirname, '도면', '도7_온디바이스AI처리상세흐름도.png')}" class="drawing-img" />

    <div class="footer" style="margin-top: 100px;">- 끝 -</div>
</div>

</body>
</html>
`;

    await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

    // PDF 생성
    await page.pdf({
        path: path.join(__dirname, 'AI_FanStick_특허출원서_최종.pdf'),
        format: 'A4',
        printBackground: true,
        margin: { top: '20mm', right: '20mm', bottom: '20mm', left: '20mm' }
    });

    console.log('PDF 파일 생성 완료: AI_FanStick_특허출원서_최종.pdf');

    await browser.close();
}

generatePDF().catch(console.error);
