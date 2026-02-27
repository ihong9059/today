const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
        Header, Footer, AlignmentType, BorderStyle, WidthType,
        PageNumber, PageBreak, HeadingLevel, ShadingType, VerticalAlign } = require('docx');
const fs = require('fs');

// 한국 특허청 제출 양식에 맞는 특허 명세서 생성
const doc = new Document({
  styles: {
    default: { document: { run: { font: "맑은 고딕", size: 22 } } }, // 11pt
    paragraphStyles: [
      { id: "Title", name: "Title", basedOn: "Normal",
        run: { size: 32, bold: true, font: "맑은 고딕" },
        paragraph: { spacing: { before: 400, after: 200 }, alignment: AlignmentType.CENTER } },
      { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 26, bold: true, font: "맑은 고딕" },
        paragraph: { spacing: { before: 300, after: 150 }, outlineLevel: 0 } },
      { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 24, bold: true, font: "맑은 고딕" },
        paragraph: { spacing: { before: 200, after: 100 }, outlineLevel: 1 } },
      { id: "PatentSection", name: "Patent Section", basedOn: "Normal",
        run: { size: 24, bold: true, font: "맑은 고딕" },
        paragraph: { spacing: { before: 300, after: 150 } } },
      { id: "ClaimTitle", name: "Claim Title", basedOn: "Normal",
        run: { size: 22, bold: true, font: "맑은 고딕" },
        paragraph: { spacing: { before: 200, after: 100 } } }
    ]
  },
  sections: [{
    properties: {
      page: { margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 } }
    },
    headers: {
      default: new Header({ children: [new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [new TextRun({ text: "특 허 출 원 서", bold: true, size: 28 })]
      })] })
    },
    footers: {
      default: new Footer({ children: [new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [new TextRun("- "), new TextRun({ children: [PageNumber.CURRENT] }), new TextRun(" -")]
      })] })
    },
    children: [
      // 표지
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 1000 }, children: [
        new TextRun({ text: "특 허 출 원 서", bold: true, size: 48 })
      ]}),
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 800 }, children: [
        new TextRun({ text: "(명 세 서)", size: 32 })
      ]}),
      new Paragraph({ spacing: { before: 1200 }, children: [] }),

      // 서지사항 테이블
      createInfoTable(),

      new Paragraph({ children: [new PageBreak()] }),

      // 【발명의 명칭】
      new Paragraph({ style: "PatentSection", children: [new TextRun("【발명의 명칭】")] }),
      new Paragraph({ spacing: { after: 100 }, children: [
        new TextRun({ text: "한글: ", bold: true }),
        new TextRun("실시간 콘서트 정보를 시스템 프롬프트로 동적 주입하여 AI 응답을 생성하고 응원봉을 제어하는 스마트 응원봉 시스템 및 방법")
      ]}),
      new Paragraph({ spacing: { after: 200 }, children: [
        new TextRun({ text: "영문: ", bold: true }),
        new TextRun("Smart Light Stick System and Method for Generating AI Responses and Controlling Light Stick by Dynamically Injecting Real-time Concert Information into System Prompts")
      ]}),

      // 【기술분야】
      new Paragraph({ style: "PatentSection", children: [new TextRun("【기술분야】")] }),
      new Paragraph({ spacing: { after: 200 }, children: [
        new TextRun("본 발명은 스마트 응원봉 기술에 관한 것으로, 더욱 상세하게는 인공지능(AI) 기반 음성 비서 기능을 탑재하여 사용자의 음성 질문에 실시간 콘서트 정보를 기반으로 응답하고, 응답에 포함된 LED 제어 정보를 추출하여 응원봉의 LED를 자동으로 제어하는 시스템 및 방법에 관한 것이다.")
      ]}),

      // 【발명의 배경이 되는 기술】
      new Paragraph({ style: "PatentSection", children: [new TextRun("【발명의 배경이 되는 기술】")] }),
      new Paragraph({ spacing: { after: 100 }, children: [
        new TextRun("기존 응원봉은 다음과 같은 한계를 가진다:")
      ]}),
      new Paragraph({ indent: { left: 360 }, spacing: { after: 50 }, children: [
        new TextRun("1. 일방향 통신: 중앙 제어 시스템에서 응원봉으로 LED 제어 신호만 전송하며, 사용자로부터의 피드백이나 질문을 처리할 수 없다.")
      ]}),
      new Paragraph({ indent: { left: 360 }, spacing: { after: 50 }, children: [
        new TextRun("2. 정보 제공 불가: \"다음 곡이 무엇인지\", \"현재 곡의 응원색이 무엇인지\" 등 콘서트 진행 정보를 사용자에게 능동적으로 제공할 수 없다.")
      ]}),
      new Paragraph({ indent: { left: 360 }, spacing: { after: 200 }, children: [
        new TextRun("3. 정적 제어 방식: 사전 프로그래밍된 LED 시퀀스만 실행 가능하며, 실시간 상황에 따른 동적 대응이 불가능하다.")
      ]}),

      // 선행기술 테이블
      new Paragraph({ spacing: { before: 100, after: 100 }, children: [
        new TextRun({ text: "【선행 기술 분석】", bold: true })
      ]}),
      createPriorArtTable(),
      new Paragraph({ spacing: { after: 200 }, children: [
        new TextRun("상기 선행 기술들은 모두 AI 기반 음성 인터페이스, 실시간 콘텍스트 주입, AI 응답과 LED 제어의 자동 연동 기능이 없다.")
      ]}),

      // 【발명의 내용】
      new Paragraph({ style: "PatentSection", children: [new TextRun("【발명의 내용】")] }),

      // 【해결하고자 하는 과제】
      new Paragraph({ style: "Heading2", children: [new TextRun("【해결하고자 하는 과제】")] }),
      new Paragraph({ spacing: { after: 100 }, children: [
        new TextRun("본 발명은 상기와 같은 종래 기술의 문제점을 해결하기 위하여 안출된 것으로, 다음과 같은 과제를 해결하고자 한다:")
      ]}),
      new Paragraph({ indent: { left: 360 }, spacing: { after: 50 }, children: [
        new TextRun("1. 사용자가 음성으로 질문하면 현재 콘서트 상황에 맞는 정확한 정보를 AI가 제공하는 시스템 구현")
      ]}),
      new Paragraph({ indent: { left: 360 }, spacing: { after: 50 }, children: [
        new TextRun("2. AI 응답에서 LED 색상 정보를 자동 추출하여 응원봉을 제어하는 자동화 시스템 구현")
      ]}),
      new Paragraph({ indent: { left: 360 }, spacing: { after: 200 }, children: [
        new TextRun("3. 콘서트 셋리스트, 아티스트 정보, 현재 곡 인덱스 등을 실시간으로 AI에게 전달하는 동적 콘텍스트 주입 방법 제공")
      ]}),

      // 【과제의 해결 수단】
      new Paragraph({ style: "Heading2", children: [new TextRun("【과제의 해결 수단】")] }),
      new Paragraph({ spacing: { after: 100 }, children: [
        new TextRun("상기 과제를 해결하기 위한 본 발명의 스마트 응원봉 시스템은:")
      ]}),
      new Paragraph({ indent: { left: 360 }, spacing: { after: 50 }, children: [
        new TextRun("1. 응원봉 장치: LED, 마이크로컨트롤러, BLE 통신 모듈을 포함")
      ]}),
      new Paragraph({ indent: { left: 360 }, spacing: { after: 50 }, children: [
        new TextRun("2. 스마트폰 애플리케이션: 음성 인식, AI API 연동, BLE 통신을 처리")
      ]}),
      new Paragraph({ indent: { left: 360 }, spacing: { after: 50 }, children: [
        new TextRun("3. 로컬 데이터베이스: 콘서트 셋리스트, 아티스트 정보, 현재 곡 인덱스 저장")
      ]}),
      new Paragraph({ indent: { left: 360 }, spacing: { after: 50 }, children: [
        new TextRun("4. 시스템 프롬프트 생성기: 로컬 데이터를 기반으로 동적 프롬프트 생성")
      ]}),
      new Paragraph({ indent: { left: 360 }, spacing: { after: 200 }, children: [
        new TextRun("5. AI 서버: 시스템 프롬프트와 사용자 질문을 처리하여 응답 생성")
      ]}),

      // 【발명의 효과】
      new Paragraph({ style: "Heading2", children: [new TextRun("【발명의 효과】")] }),
      new Paragraph({ spacing: { after: 100 }, children: [
        new TextRun("본 발명에 따르면 다음과 같은 효과가 있다:")
      ]}),
      new Paragraph({ indent: { left: 360 }, spacing: { after: 50 }, children: [
        new TextRun("1. 실시간 정보 제공: 사용자가 \"다음 곡 뭐야?\"라고 질문하면 현재 콘서트 상태를 기반으로 정확한 정보를 제공할 수 있다.")
      ]}),
      new Paragraph({ indent: { left: 360 }, spacing: { after: 50 }, children: [
        new TextRun("2. 자연어 인터페이스: 다양한 표현의 질문을 AI가 자동으로 이해하고 처리할 수 있다.")
      ]}),
      new Paragraph({ indent: { left: 360 }, spacing: { after: 50 }, children: [
        new TextRun("3. LED 자동 제어: AI 응답에서 LED 색상 정보를 자동 추출하여 응원봉을 제어함으로써, 사용자가 별도로 색상을 변경할 필요가 없다.")
      ]}),
      new Paragraph({ indent: { left: 360 }, spacing: { after: 50 }, children: [
        new TextRun("4. 동적 콘텍스트 주입: 콘서트 진행에 따라 시스템 프롬프트가 동적으로 갱신되어, AI가 항상 최신 상태를 인지할 수 있다.")
      ]}),
      new Paragraph({ indent: { left: 360 }, spacing: { after: 50 }, children: [
        new TextRun("5. 빠른 응답 시간: 전체 처리가 3초 이내에 완료되어 실시간 인터랙션이 가능하다.")
      ]}),
      new Paragraph({ indent: { left: 360 }, spacing: { after: 50 }, children: [
        new TextRun("6. 오프라인 동작 지원: 온디바이스 경량 언어모델을 탑재하여 콘서트장의 불안정한 네트워크 환경에서도 AI 기능이 동작한다.")
      ]}),
      new Paragraph({ indent: { left: 360 }, spacing: { after: 50 }, children: [
        new TextRun("7. 하이브리드 안정성: 클라우드 AI 우선, 온디바이스 AI 폴백, 규칙 기반 최종 폴백의 3단계 전략으로 어떤 상황에서도 서비스 연속성을 보장한다.")
      ]}),
      new Paragraph({ indent: { left: 360 }, spacing: { after: 50 }, children: [
        new TextRun("8. 비용 절감: 오프라인 환경에서는 클라우드 API 호출 없이 동작하므로 API 사용 비용을 절감할 수 있다.")
      ]}),
      new Paragraph({ indent: { left: 360 }, spacing: { after: 200 }, children: [
        new TextRun("9. 프라이버시 보호: 온디바이스 처리 시 사용자의 음성 데이터가 외부 서버로 전송되지 않아 개인정보 보호에 유리하다.")
      ]}),

      new Paragraph({ children: [new PageBreak()] }),

      // 【도면의 간단한 설명】
      new Paragraph({ style: "PatentSection", children: [new TextRun("【도면의 간단한 설명】")] }),
      new Paragraph({ spacing: { after: 50 }, children: [
        new TextRun({ text: "도 1", bold: true }), new TextRun("은 본 발명에 따른 AI FanStick 시스템의 전체 구성도이다.")
      ]}),
      new Paragraph({ spacing: { after: 50 }, children: [
        new TextRun({ text: "도 2", bold: true }), new TextRun("는 시스템 프롬프트 생성 흐름도이다.")
      ]}),
      new Paragraph({ spacing: { after: 50 }, children: [
        new TextRun({ text: "도 3", bold: true }), new TextRun("은 음성-AI-LED 파이프라인 시퀀스 다이어그램이다.")
      ]}),
      new Paragraph({ spacing: { after: 50 }, children: [
        new TextRun({ text: "도 4", bold: true }), new TextRun("는 BLE 명령 프로토콜 구조이다.")
      ]}),
      new Paragraph({ spacing: { after: 50 }, children: [
        new TextRun({ text: "도 5", bold: true }), new TextRun("는 AI 응답 파싱 알고리즘 흐름도이다.")
      ]}),
      new Paragraph({ spacing: { after: 50 }, children: [
        new TextRun({ text: "도 6", bold: true }), new TextRun("은 하이브리드 AI 아키텍처(클라우드 + 온디바이스) 구성도이다.")
      ]}),
      new Paragraph({ spacing: { after: 200 }, children: [
        new TextRun({ text: "도 7", bold: true }), new TextRun("은 온디바이스 AI 처리 상세 흐름도이다.")
      ]}),

      // 【발명을 실시하기 위한 구체적인 내용】
      new Paragraph({ style: "PatentSection", children: [new TextRun("【발명을 실시하기 위한 구체적인 내용】")] }),

      // 핵심 기술 1
      new Paragraph({ style: "Heading2", children: [new TextRun("1. 시스템 프롬프트 동적 생성 메커니즘")] }),
      new Paragraph({ spacing: { after: 100 }, children: [
        new TextRun("본 발명의 시스템 프롬프트 생성부는 로컬 JSON 데이터를 기반으로 현재 콘서트 상태를 반영한 시스템 프롬프트를 동적으로 생성한다. 로컬 데이터에는 콘서트 셋리스트, 현재 곡 인덱스, 아티스트 정보, 곡별 응원색 RGB 값이 포함된다.")
      ]}),
      new Paragraph({ spacing: { after: 100 }, children: [
        new TextRun("시스템 프롬프트 템플릿은 다음과 같은 형식으로 구성된다:")
      ]}),
      new Paragraph({ indent: { left: 360 }, spacing: { after: 50 }, children: [
        new TextRun({ text: "\"당신은 {artist_name} 콘서트 AI 비서입니다.", italics: true })
      ]}),
      new Paragraph({ indent: { left: 360 }, spacing: { after: 50 }, children: [
        new TextRun({ text: "현재 곡: {current_song} (응원색: {current_color})", italics: true })
      ]}),
      new Paragraph({ indent: { left: 360 }, spacing: { after: 50 }, children: [
        new TextRun({ text: "다음 곡: {next_song} (응원색: {next_color})", italics: true })
      ]}),
      new Paragraph({ indent: { left: 360 }, spacing: { after: 200 }, children: [
        new TextRun({ text: "답변 마지막에 [LED:R,G,B] 형식으로 색상을 포함하세요.\"", italics: true })
      ]}),

      // 핵심 기술 2
      new Paragraph({ style: "Heading2", children: [new TextRun("2. 음성-AI-LED 통합 파이프라인")] }),
      new Paragraph({ spacing: { after: 100 }, children: [
        new TextRun("사용자 음성 입력부터 LED 제어까지의 전체 처리는 다음 단계로 구성된다:")
      ]}),
      new Paragraph({ indent: { left: 360 }, spacing: { after: 50 }, children: [
        new TextRun("① 음성 입력: 사용자가 마이크를 통해 질문 (예: \"다음 곡 뭐야?\")")
      ]}),
      new Paragraph({ indent: { left: 360 }, spacing: { after: 50 }, children: [
        new TextRun("② STT 변환: Google STT를 통해 음성을 텍스트로 변환 (~500ms)")
      ]}),
      new Paragraph({ indent: { left: 360 }, spacing: { after: 50 }, children: [
        new TextRun("③ 프롬프트 결합: 시스템 프롬프트와 사용자 질문 결합")
      ]}),
      new Paragraph({ indent: { left: 360 }, spacing: { after: 50 }, children: [
        new TextRun("④ AI API 호출: Gemini/GPT API로 전송하여 응답 수신 (~1500ms)")
      ]}),
      new Paragraph({ indent: { left: 360 }, spacing: { after: 50 }, children: [
        new TextRun("⑤ 응답 파싱: AI 응답에서 텍스트와 LED 색상 정보 분리")
      ]}),
      new Paragraph({ indent: { left: 360 }, spacing: { after: 50 }, children: [
        new TextRun("⑥ TTS 출력: 텍스트를 음성으로 변환하여 스피커 출력 (병렬 처리)")
      ]}),
      new Paragraph({ indent: { left: 360 }, spacing: { after: 200 }, children: [
        new TextRun("⑦ LED 제어: BLE를 통해 응원봉에 색상 명령 전송 (~200ms, 병렬 처리)")
      ]}),
      new Paragraph({ spacing: { after: 200 }, children: [
        new TextRun("전체 처리 시간은 약 2.5초로, 3초 이내의 실시간 인터랙션이 가능하다.")
      ]}),

      // 핵심 기술 3
      new Paragraph({ style: "Heading2", children: [new TextRun("3. AI 응답 LED 색상 추출 알고리즘")] }),
      new Paragraph({ spacing: { after: 100 }, children: [
        new TextRun("AI 응답에서 LED 색상 정보를 추출하기 위해 정규식 패턴 매칭을 사용한다:")
      ]}),
      new Paragraph({ indent: { left: 360 }, spacing: { after: 50 }, children: [
        new TextRun({ text: "패턴: \\[LED:(\\d{1,3}),(\\d{1,3}),(\\d{1,3})\\]", font: "Consolas" })
      ]}),
      new Paragraph({ indent: { left: 360 }, spacing: { after: 100 }, children: [
        new TextRun({ text: "예시 입력: \"다음 곡은 좋아좋아야! [LED:0,100,255]\"", font: "Consolas" })
      ]}),
      new Paragraph({ spacing: { after: 200 }, children: [
        new TextRun("패턴 매칭 실패 시에는 로컬 데이터베이스에서 현재 곡의 응원색을 조회하여 폴백 처리한다.")
      ]}),

      // 핵심 기술 4
      new Paragraph({ style: "Heading2", children: [new TextRun("4. 하이브리드 AI 아키텍처")] }),
      new Paragraph({ spacing: { after: 100 }, children: [
        new TextRun("본 발명은 클라우드 AI와 온디바이스 AI를 병용하는 하이브리드 아키텍처를 채택한다:")
      ]}),
      new Paragraph({ indent: { left: 360 }, spacing: { after: 50 }, children: [
        new TextRun("(a) 네트워크 연결 상태 감지")
      ]}),
      new Paragraph({ indent: { left: 360 }, spacing: { after: 50 }, children: [
        new TextRun("(b) 온라인 시: 클라우드 AI (Gemini/OpenAI) 우선 사용")
      ]}),
      new Paragraph({ indent: { left: 360 }, spacing: { after: 50 }, children: [
        new TextRun("(c) 오프라인 또는 클라우드 실패 시: 온디바이스 경량 LLM (Gemma 2B, 양자화 Q4) 폴백")
      ]}),
      new Paragraph({ indent: { left: 360 }, spacing: { after: 200 }, children: [
        new TextRun("(d) 모든 AI 실패 시: 규칙 기반 템플릿 응답으로 최소 기능 보장")
      ]}),
      new Paragraph({ spacing: { after: 200 }, children: [
        new TextRun("온디바이스 모델은 약 1.2GB 크기로, 고성능 스마트폰(Pixel 8 Pro, Galaxy S24 Ultra 등)에서 3-4초 내 응답이 가능하다.")
      ]}),

      new Paragraph({ children: [new PageBreak()] }),

      // 【청구범위】
      new Paragraph({ style: "PatentSection", children: [new TextRun("【청구범위】")] }),

      // 청구항 1
      new Paragraph({ style: "ClaimTitle", children: [new TextRun("【청구항 1】 (독립항 - 방법)")] }),
      new Paragraph({ spacing: { after: 100 }, children: [
        new TextRun("응원봉 장치와 연동된 스마트폰 애플리케이션에서 인공지능(AI) 기반으로 콘서트 정보를 안내하는 방법에 있어서,")
      ]}),
      new Paragraph({ indent: { left: 360 }, spacing: { after: 50 }, children: [
        new TextRun("(a) 콘서트 셋리스트, 현재 곡 인덱스, 아티스트 정보, 곡별 응원색 RGB 값을 포함하는 로컬 데이터를 로드하는 단계;")
      ]}),
      new Paragraph({ indent: { left: 360 }, spacing: { after: 50 }, children: [
        new TextRun("(b) 상기 로컬 데이터를 기반으로 현재 콘서트 상태를 반영한 시스템 프롬프트를 동적으로 생성하되, 상기 시스템 프롬프트는 현재 곡, 다음 곡, 남은 곡 수, 곡별 응원색 정보를 포함하는 단계;")
      ]}),
      new Paragraph({ indent: { left: 360 }, spacing: { after: 50 }, children: [
        new TextRun("(c) 사용자의 음성 질문을 텍스트로 변환하는 음성 인식 단계;")
      ]}),
      new Paragraph({ indent: { left: 360 }, spacing: { after: 50 }, children: [
        new TextRun("(d) 상기 시스템 프롬프트와 상기 변환된 텍스트를 AI 서버로 전송하여 응답을 수신하는 단계;")
      ]}),
      new Paragraph({ indent: { left: 360 }, spacing: { after: 50 }, children: [
        new TextRun("(e) 상기 AI 응답에서 소정의 형식으로 포함된 LED 색상 정보를 추출하는 파싱 단계; 및")
      ]}),
      new Paragraph({ indent: { left: 360 }, spacing: { after: 100 }, children: [
        new TextRun("(f) 상기 추출된 LED 색상 정보를 BLE(Bluetooth Low Energy)를 통해 응원봉 장치로 전송하여 LED를 제어하는 단계;")
      ]}),
      new Paragraph({ spacing: { after: 200 }, children: [
        new TextRun("를 포함하는 것을 특징으로 하는 AI 기반 콘서트 정보 안내 방법.")
      ]}),

      // 청구항 2-5
      new Paragraph({ style: "ClaimTitle", children: [new TextRun("【청구항 2】 (종속항)")] }),
      new Paragraph({ spacing: { after: 200 }, children: [
        new TextRun("제1항에 있어서, 상기 시스템 프롬프트는 LED 색상 응답 형식으로 \"[LED:R,G,B]\" 형식을 지정하는 지시문을 포함하며, R, G, B는 각각 0-255 범위의 정수값인 것을 특징으로 하는 방법.")
      ]}),

      new Paragraph({ style: "ClaimTitle", children: [new TextRun("【청구항 3】 (종속항)")] }),
      new Paragraph({ spacing: { after: 200 }, children: [
        new TextRun("제1항에 있어서, 상기 (a) 단계의 로컬 데이터는 JSON 형식으로 저장되며, 셋리스트의 각 곡에 대하여 순서(order), 제목(title), 응원색 RGB 값(color_rgb), 응원색 이름(color_name), 팬 챈트(fan_chant) 정보를 포함하는 것을 특징으로 하는 방법.")
      ]}),

      new Paragraph({ style: "ClaimTitle", children: [new TextRun("【청구항 4】 (종속항)")] }),
      new Paragraph({ spacing: { after: 200 }, children: [
        new TextRun("제1항에 있어서, 상기 (c) 단계부터 상기 (f) 단계까지의 전체 처리 시간이 3초 이내인 것을 특징으로 하는 방법.")
      ]}),

      new Paragraph({ style: "ClaimTitle", children: [new TextRun("【청구항 5】 (종속항)")] }),
      new Paragraph({ spacing: { after: 200 }, children: [
        new TextRun("제1항에 있어서, 상기 (e) 단계에서 LED 색상 정보가 추출되지 않는 경우, 현재 곡의 응원색을 유지하거나 로컬 데이터에서 해당 곡의 응원색을 조회하여 적용하는 것을 특징으로 하는 방법.")
      ]}),

      // 청구항 6 (독립항 - 시스템)
      new Paragraph({ style: "ClaimTitle", children: [new TextRun("【청구항 6】 (독립항 - 시스템)")] }),
      new Paragraph({ spacing: { after: 100 }, children: [
        new TextRun("스마트폰 애플리케이션과 응원봉 장치를 포함하는 AI 기반 스마트 응원봉 시스템에 있어서,")
      ]}),
      new Paragraph({ spacing: { after: 50 }, children: [
        new TextRun("상기 스마트폰 애플리케이션은:")
      ]}),
      new Paragraph({ indent: { left: 360 }, spacing: { after: 50 }, children: [
        new TextRun("(a) 콘서트 셋리스트, 아티스트 정보, 현재 곡 인덱스를 저장하는 로컬 데이터 저장부;")
      ]}),
      new Paragraph({ indent: { left: 360 }, spacing: { after: 50 }, children: [
        new TextRun("(b) 상기 로컬 데이터를 기반으로 현재 콘서트 상태를 반영한 시스템 프롬프트를 동적으로 생성하는 프롬프트 생성부;")
      ]}),
      new Paragraph({ indent: { left: 360 }, spacing: { after: 50 }, children: [
        new TextRun("(c) 사용자 음성을 텍스트로 변환하는 음성 인식부;")
      ]}),
      new Paragraph({ indent: { left: 360 }, spacing: { after: 50 }, children: [
        new TextRun("(d) 상기 시스템 프롬프트와 사용자 질문을 AI 서버로 전송하고 응답을 수신하는 AI 통신부;")
      ]}),
      new Paragraph({ indent: { left: 360 }, spacing: { after: 50 }, children: [
        new TextRun("(e) 상기 AI 응답에서 LED 제어 정보를 추출하는 응답 파싱부; 및")
      ]}),
      new Paragraph({ indent: { left: 360 }, spacing: { after: 100 }, children: [
        new TextRun("(f) 상기 응원봉 장치와 BLE 통신을 수행하는 BLE 통신부;")
      ]}),
      new Paragraph({ spacing: { after: 50 }, children: [
        new TextRun("를 포함하고,")
      ]}),
      new Paragraph({ spacing: { after: 50 }, children: [
        new TextRun("상기 응원봉 장치는:")
      ]}),
      new Paragraph({ indent: { left: 360 }, spacing: { after: 50 }, children: [
        new TextRun("(g) 복수의 LED를 포함하는 발광부;")
      ]}),
      new Paragraph({ indent: { left: 360 }, spacing: { after: 50 }, children: [
        new TextRun("(h) 상기 스마트폰 애플리케이션으로부터 명령을 수신하는 BLE 수신부; 및")
      ]}),
      new Paragraph({ indent: { left: 360 }, spacing: { after: 100 }, children: [
        new TextRun("(i) 상기 수신된 명령에 따라 상기 발광부를 제어하는 마이크로컨트롤러;")
      ]}),
      new Paragraph({ spacing: { after: 200 }, children: [
        new TextRun("를 포함하는 것을 특징으로 하는 AI 기반 스마트 응원봉 시스템.")
      ]}),

      // 청구항 7-8
      new Paragraph({ style: "ClaimTitle", children: [new TextRun("【청구항 7】 (종속항)")] }),
      new Paragraph({ spacing: { after: 200 }, children: [
        new TextRun("제6항에 있어서, 상기 프롬프트 생성부는 현재 곡 인덱스가 변경될 때마다 시스템 프롬프트를 재생성하여, AI 서버가 항상 최신 콘서트 상태를 인지할 수 있도록 하는 것을 특징으로 하는 시스템.")
      ]}),

      new Paragraph({ style: "ClaimTitle", children: [new TextRun("【청구항 8】 (종속항)")] }),
      new Paragraph({ spacing: { after: 100 }, children: [
        new TextRun("제6항에 있어서, 상기 BLE 통신부는 \"<명령타입>:<파라미터>\" 형식의 구조화된 명령 프로토콜을 사용하되,")
      ]}),
      new Paragraph({ indent: { left: 360 }, spacing: { after: 50 }, children: [
        new TextRun("- \"C:R,G,B\"는 LED 색상 변경 명령;")
      ]}),
      new Paragraph({ indent: { left: 360 }, spacing: { after: 50 }, children: [
        new TextRun("- \"P:<패턴명>\"은 LED 패턴 변경 명령;")
      ]}),
      new Paragraph({ indent: { left: 360 }, spacing: { after: 100 }, children: [
        new TextRun("- \"T:<텍스트>\"는 텍스트 표시 명령;")
      ]}),
      new Paragraph({ spacing: { after: 200 }, children: [
        new TextRun("을 포함하는 것을 특징으로 하는 시스템.")
      ]}),

      // 청구항 9-10 (독립항 - 장치)
      new Paragraph({ style: "ClaimTitle", children: [new TextRun("【청구항 9】 (독립항 - 장치)")] }),
      new Paragraph({ spacing: { after: 100 }, children: [
        new TextRun("BLE 통신 모듈, 복수의 LED, 마이크로컨트롤러를 포함하는 스마트 응원봉 장치에 있어서,")
      ]}),
      new Paragraph({ spacing: { after: 50 }, children: [
        new TextRun("상기 마이크로컨트롤러는:")
      ]}),
      new Paragraph({ indent: { left: 360 }, spacing: { after: 50 }, children: [
        new TextRun("(a) 상기 BLE 통신 모듈을 통해 스마트폰 애플리케이션으로부터 LED 제어 명령을 수신하되, 상기 LED 제어 명령은 AI 서버의 응답에서 추출된 색상 정보를 기반으로 생성된 것이고;")
      ]}),
      new Paragraph({ indent: { left: 360 }, spacing: { after: 50 }, children: [
        new TextRun("(b) 상기 수신된 LED 제어 명령을 파싱하여 RGB 색상값을 추출하고;")
      ]}),
      new Paragraph({ indent: { left: 360 }, spacing: { after: 100 }, children: [
        new TextRun("(c) 상기 추출된 RGB 색상값에 따라 상기 복수의 LED의 색상을 제어하는;")
      ]}),
      new Paragraph({ spacing: { after: 200 }, children: [
        new TextRun("것을 특징으로 하는 스마트 응원봉 장치.")
      ]}),

      new Paragraph({ style: "ClaimTitle", children: [new TextRun("【청구항 10】 (종속항)")] }),
      new Paragraph({ spacing: { after: 200 }, children: [
        new TextRun("제9항에 있어서, 상기 마이크로컨트롤러는 추가적으로 rainbow, pulse, blink, wave 패턴을 포함하는 복수의 LED 애니메이션 패턴을 저장하고, 패턴 명령 수신 시 해당 패턴을 실행하는 것을 특징으로 하는 장치.")
      ]}),

      // 청구항 11-14 (하이브리드 AI)
      new Paragraph({ style: "ClaimTitle", children: [new TextRun("【청구항 11】 (독립항 - 하이브리드 AI 방법)")] }),
      new Paragraph({ spacing: { after: 100 }, children: [
        new TextRun("클라우드 AI 서버와 온디바이스 AI를 병용하여 응원봉을 제어하는 하이브리드 AI 기반 스마트 응원봉 시스템의 동작 방법에 있어서,")
      ]}),
      new Paragraph({ indent: { left: 360 }, spacing: { after: 50 }, children: [
        new TextRun("(a) 스마트폰 애플리케이션이 네트워크 연결 상태를 감지하는 단계;")
      ]}),
      new Paragraph({ indent: { left: 360 }, spacing: { after: 50 }, children: [
        new TextRun("(b) 네트워크가 연결된 경우, 클라우드 AI 서버로 시스템 프롬프트와 사용자 질문을 전송하여 응답을 수신하는 단계;")
      ]}),
      new Paragraph({ indent: { left: 360 }, spacing: { after: 50 }, children: [
        new TextRun("(c) 네트워크가 연결되지 않았거나 클라우드 AI 서버 응답 실패 시, 스마트폰에 탑재된 온디바이스 경량 언어모델(Local LLM)을 이용하여 응답을 생성하는 단계;")
      ]}),
      new Paragraph({ indent: { left: 360 }, spacing: { after: 100 }, children: [
        new TextRun("(d) 상기 생성된 응답에서 LED 제어 정보를 추출하여 BLE를 통해 응원봉을 제어하는 단계;")
      ]}),
      new Paragraph({ spacing: { after: 200 }, children: [
        new TextRun("를 포함하고, 상기 온디바이스 경량 언어모델은 2B 이하 파라미터의 양자화된 모델이며, 오프라인 환경에서도 콘서트 정보 안내 및 LED 제어가 가능한 것을 특징으로 하는 하이브리드 AI 기반 스마트 응원봉 제어 방법.")
      ]}),

      new Paragraph({ style: "ClaimTitle", children: [new TextRun("【청구항 12】 (종속항)")] }),
      new Paragraph({ spacing: { after: 200 }, children: [
        new TextRun("제11항에 있어서, 상기 (c) 단계에서 온디바이스 AI 응답 생성도 실패하는 경우, 로컬 데이터베이스에 저장된 현재 곡 정보를 기반으로 규칙 기반(Rule-based) 응답을 생성하는 폴백 단계를 더 포함하는 것을 특징으로 하는 방법.")
      ]}),

      new Paragraph({ style: "ClaimTitle", children: [new TextRun("【청구항 13】 (종속항)")] }),
      new Paragraph({ spacing: { after: 200 }, children: [
        new TextRun("제11항에 있어서, 상기 온디바이스 경량 언어모델은 앱 최초 실행 시 원격 서버로부터 다운로드되어 로컬 저장소에 저장되며, 모델 버전 관리를 통해 업데이트가 가능한 것을 특징으로 하는 방법.")
      ]}),

      new Paragraph({ style: "ClaimTitle", children: [new TextRun("【청구항 14】 (종속항)")] }),
      new Paragraph({ spacing: { after: 200 }, children: [
        new TextRun("제11항에 있어서, 상기 온디바이스 경량 언어모델은 콘서트 도메인에 특화된 질의응답 데이터셋으로 파인튜닝(Fine-tuning)되어, 아티스트 정보, 셋리스트, 응원법 등에 대한 답변 품질이 향상된 것을 특징으로 하는 방법.")
      ]}),

      new Paragraph({ children: [new PageBreak()] }),

      // 【요약서】
      new Paragraph({ style: "PatentSection", children: [new TextRun("【요약서】")] }),
      new Paragraph({ style: "Heading2", children: [new TextRun("【요약】")] }),
      new Paragraph({ spacing: { after: 200 }, children: [
        new TextRun("본 발명은 AI 기반 스마트 응원봉 시스템 및 방법에 관한 것으로, 콘서트 셋리스트, 현재 곡 인덱스, 아티스트 정보를 포함하는 로컬 데이터를 기반으로 시스템 프롬프트를 동적으로 생성하고, 사용자의 음성 질문과 함께 AI 서버로 전송하여 응답을 수신한다. AI 응답에서 [LED:R,G,B] 형식의 색상 정보를 추출하여 BLE를 통해 응원봉의 LED를 자동 제어한다. 클라우드 AI와 온디바이스 경량 언어모델을 병용하는 하이브리드 아키텍처를 채택하여, 오프라인 환경에서도 콘서트 정보 안내 및 LED 제어가 가능하다. 이를 통해 사용자는 음성으로 콘서트 정보를 질문하고, AI가 현재 상황에 맞는 정확한 정보와 함께 응원봉 색상을 자동으로 변경해주는 양방향 인터랙션이 가능하다.")
      ]}),

      new Paragraph({ style: "Heading2", children: [new TextRun("【대표도】")] }),
      new Paragraph({ spacing: { after: 200 }, children: [
        new TextRun("도 1")
      ]}),

      // 선행 기술 대비 표
      new Paragraph({ style: "Heading2", children: [new TextRun("【선행 기술 대비 신규성 요약】")] }),
      createComparisonTable()
    ]
  }]
});

// 서지사항 테이블 생성
function createInfoTable() {
  const tableBorder = { style: BorderStyle.SINGLE, size: 1, color: "000000" };
  const cellBorders = { top: tableBorder, bottom: tableBorder, left: tableBorder, right: tableBorder };

  return new Table({
    columnWidths: [2500, 6860],
    rows: [
      createInfoRow("출원인", "UTTEC", cellBorders),
      createInfoRow("발명자", "(발명자 성명 기재)", cellBorders),
      createInfoRow("대리인", "(변리사 성명 기재 - 직접 출원 시 생략)", cellBorders),
      createInfoRow("출원일", "2026년   월   일", cellBorders),
      createInfoRow("문서 버전", "2.1 (하이브리드 AI 추가)", cellBorders)
    ]
  });
}

function createInfoRow(label, value, borders) {
  return new TableRow({
    children: [
      new TableCell({
        borders: borders,
        width: { size: 2500, type: WidthType.DXA },
        shading: { fill: "E8E8E8", type: ShadingType.CLEAR },
        verticalAlign: VerticalAlign.CENTER,
        children: [new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: label, bold: true })]
        })]
      }),
      new TableCell({
        borders: borders,
        width: { size: 6860, type: WidthType.DXA },
        verticalAlign: VerticalAlign.CENTER,
        children: [new Paragraph({ children: [new TextRun(value)] })]
      })
    ]
  });
}

// 선행기술 테이블 생성
function createPriorArtTable() {
  const tableBorder = { style: BorderStyle.SINGLE, size: 1, color: "000000" };
  const cellBorders = { top: tableBorder, bottom: tableBorder, left: tableBorder, right: tableBorder };

  return new Table({
    columnWidths: [2500, 3500, 3360],
    rows: [
      new TableRow({
        tableHeader: true,
        children: [
          new TableCell({
            borders: cellBorders,
            shading: { fill: "D5E8F0", type: ShadingType.CLEAR },
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "특허번호", bold: true })] })]
          }),
          new TableCell({
            borders: cellBorders,
            shading: { fill: "D5E8F0", type: ShadingType.CLEAR },
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "명칭", bold: true })] })]
          }),
          new TableCell({
            borders: cellBorders,
            shading: { fill: "D5E8F0", type: ShadingType.CLEAR },
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "한계점", bold: true })] })]
          })
        ]
      }),
      createPriorArtRow("KR102447873B1", "디지털 응원봉 응원 운영시스템", "AI 기능 없음, 음성 인식 없음", cellBorders),
      createPriorArtRow("KR101822968B1", "응원봉을 구비한 공연 연출 시스템", "중앙 제어만, 양방향 대화 불가", cellBorders),
      createPriorArtRow("US20140184386A1", "Interactive lighting effect wristband", "LED 제어만, AI 없음", cellBorders)
    ]
  });
}

function createPriorArtRow(num, name, limitation, borders) {
  return new TableRow({
    children: [
      new TableCell({ borders: borders, children: [new Paragraph({ children: [new TextRun({ text: num, size: 18 })] })] }),
      new TableCell({ borders: borders, children: [new Paragraph({ children: [new TextRun({ text: name, size: 18 })] })] }),
      new TableCell({ borders: borders, children: [new Paragraph({ children: [new TextRun({ text: limitation, size: 18 })] })] })
    ]
  });
}

// 신규성 비교 테이블 생성
function createComparisonTable() {
  const tableBorder = { style: BorderStyle.SINGLE, size: 1, color: "000000" };
  const cellBorders = { top: tableBorder, bottom: tableBorder, left: tableBorder, right: tableBorder };

  const features = [
    ["AI 음성 비서", "O", "X", "X", "X"],
    ["시스템 프롬프트 동적 생성", "O", "X", "X", "X"],
    ["실시간 콘텍스트 주입", "O", "X", "X", "X"],
    ["AI 응답→LED 자동 연동", "O", "X", "X", "X"],
    ["양방향 대화형 인터페이스", "O", "X", "X", "X"],
    ["온디바이스 AI (로컬 LLM)", "O", "X", "X", "X"],
    ["하이브리드 AI 전환", "O", "X", "X", "X"],
    ["오프라인 AI 동작", "O", "X", "X", "X"],
    ["다단계 폴백 메커니즘", "O", "X", "X", "X"],
    ["BLE/RF LED 제어", "O", "O", "O", "O"],
    ["모바일 앱 연동", "O", "O", "O", "X"]
  ];

  return new Table({
    columnWidths: [2800, 1200, 1600, 1600, 2160],
    rows: [
      new TableRow({
        tableHeader: true,
        children: [
          new TableCell({ borders: cellBorders, shading: { fill: "D5E8F0", type: ShadingType.CLEAR }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "구분", bold: true, size: 18 })] })] }),
          new TableCell({ borders: cellBorders, shading: { fill: "D5E8F0", type: ShadingType.CLEAR }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "본 발명", bold: true, size: 18 })] })] }),
          new TableCell({ borders: cellBorders, shading: { fill: "D5E8F0", type: ShadingType.CLEAR }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "KR1024...", bold: true, size: 18 })] })] }),
          new TableCell({ borders: cellBorders, shading: { fill: "D5E8F0", type: ShadingType.CLEAR }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "KR1018...", bold: true, size: 18 })] })] }),
          new TableCell({ borders: cellBorders, shading: { fill: "D5E8F0", type: ShadingType.CLEAR }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "US2014...", bold: true, size: 18 })] })] })
        ]
      }),
      ...features.map(row => new TableRow({
        children: row.map((cell, i) => new TableCell({
          borders: cellBorders,
          children: [new Paragraph({
            alignment: i === 0 ? AlignmentType.LEFT : AlignmentType.CENTER,
            children: [new TextRun({ text: cell, size: 18 })]
          })]
        }))
      }))
    ]
  });
}

// 문서 저장
Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync("/Users/maeg/todo/today/응원봉/특허/AI_FanStick_특허출원서_KIPO양식.docx", buffer);
  console.log("특허 출원서 DOCX 파일 생성 완료: AI_FanStick_특허출원서_KIPO양식.docx");
});
