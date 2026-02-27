const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
        Header, Footer, AlignmentType, BorderStyle, WidthType,
        PageNumber, PageBreak, ShadingType, VerticalAlign,
        ImageRun } = require('docx');
const fs = require('fs');
const path = require('path');

// 도면 이미지 로드
const drawingsPath = path.join(__dirname, '도면');

// 이미지 데이터와 크기 정보
const imageFiles = [
    { name: '도1_전체시스템구성도.png', title: '【도 1】 AI FanStick 전체 시스템 구성도' },
    { name: '도2_시스템프롬프트생성흐름도.png', title: '【도 2】 시스템 프롬프트 생성 흐름도' },
    { name: '도3_음성AI_LED파이프라인시퀀스.png', title: '【도 3】 음성-AI-LED 파이프라인 시퀀스 다이어그램' },
    { name: '도4_BLE명령프로토콜구조.png', title: '【도 4】 BLE 명령 프로토콜 구조' },
    { name: '도5_AI응답파싱알고리즘흐름도.png', title: '【도 5】 AI 응답 파싱 알고리즘 흐름도' },
    { name: '도6_하이브리드AI아키텍처.png', title: '【도 6】 하이브리드 AI 아키텍처 (클라우드 + 온디바이스)' },
    { name: '도7_온디바이스AI처리상세흐름도.png', title: '【도 7】 온디바이스 AI 처리 상세 흐름도' }
];

// 도면 페이지 생성 함수
function createDrawingPages() {
    const pages = [];

    for (let i = 0; i < imageFiles.length; i++) {
        const img = imageFiles[i];
        const imgPath = path.join(drawingsPath, img.name);
        const imgData = fs.readFileSync(imgPath);

        // 페이지 나누기
        pages.push(new Paragraph({ children: [new PageBreak()] }));

        // 도면 제목
        pages.push(new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 200, after: 200 },
            children: [new TextRun({ text: img.title, bold: true, size: 26 })]
        }));

        // 도면 이미지 - 더 큰 크기로 설정하고 altText 추가
        pages.push(new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
                new ImageRun({
                    type: "png",
                    data: imgData,
                    transformation: { width: 500, height: 600 },
                    altText: {
                        title: `도 ${i + 1}`,
                        description: img.title,
                        name: img.name
                    }
                })
            ]
        }));
    }

    return pages;
}

// 테이블 생성 함수들
function createInfoTable() {
    const border = { style: BorderStyle.SINGLE, size: 1, color: "000000" };
    const borders = { top: border, bottom: border, left: border, right: border };

    return new Table({
        columnWidths: [2500, 6860],
        rows: [
            createRow("출원인", "UTTEC", borders),
            createRow("발명자", "홍 광선", borders),
            createRow("대리인", "(직접 출원)", borders),
            createRow("출원일", "2026년 3월 3일", borders),
            createRow("문서 버전", "2.1 (하이브리드 AI 추가)", borders)
        ]
    });
}

function createRow(label, value, borders) {
    return new TableRow({
        children: [
            new TableCell({
                borders, width: { size: 2500, type: WidthType.DXA },
                shading: { fill: "E8E8E8", type: ShadingType.CLEAR },
                verticalAlign: VerticalAlign.CENTER,
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: label, bold: true })] })]
            }),
            new TableCell({
                borders, width: { size: 6860, type: WidthType.DXA },
                verticalAlign: VerticalAlign.CENTER,
                children: [new Paragraph({ children: [new TextRun(value)] })]
            })
        ]
    });
}

function createPriorArtTable() {
    const border = { style: BorderStyle.SINGLE, size: 1, color: "000000" };
    const borders = { top: border, bottom: border, left: border, right: border };

    return new Table({
        columnWidths: [2500, 3500, 3360],
        rows: [
            new TableRow({
                children: [
                    new TableCell({ borders, shading: { fill: "D5E8F0", type: ShadingType.CLEAR }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "특허번호", bold: true })] })] }),
                    new TableCell({ borders, shading: { fill: "D5E8F0", type: ShadingType.CLEAR }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "명칭", bold: true })] })] }),
                    new TableCell({ borders, shading: { fill: "D5E8F0", type: ShadingType.CLEAR }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "한계점", bold: true })] })] })
                ]
            }),
            new TableRow({ children: [
                new TableCell({ borders, children: [new Paragraph({ children: [new TextRun({ text: "KR102447873B1", size: 18 })] })] }),
                new TableCell({ borders, children: [new Paragraph({ children: [new TextRun({ text: "디지털 응원봉 응원 운영시스템", size: 18 })] })] }),
                new TableCell({ borders, children: [new Paragraph({ children: [new TextRun({ text: "AI 기능 없음, 음성 인식 없음", size: 18 })] })] })
            ]}),
            new TableRow({ children: [
                new TableCell({ borders, children: [new Paragraph({ children: [new TextRun({ text: "KR101822968B1", size: 18 })] })] }),
                new TableCell({ borders, children: [new Paragraph({ children: [new TextRun({ text: "응원봉을 구비한 공연 연출 시스템", size: 18 })] })] }),
                new TableCell({ borders, children: [new Paragraph({ children: [new TextRun({ text: "중앙 제어만, 양방향 대화 불가", size: 18 })] })] })
            ]}),
            new TableRow({ children: [
                new TableCell({ borders, children: [new Paragraph({ children: [new TextRun({ text: "US20140184386A1", size: 18 })] })] }),
                new TableCell({ borders, children: [new Paragraph({ children: [new TextRun({ text: "Interactive lighting effect wristband", size: 18 })] })] }),
                new TableCell({ borders, children: [new Paragraph({ children: [new TextRun({ text: "LED 제어만, AI 없음", size: 18 })] })] })
            ]})
        ]
    });
}

function createComparisonTable() {
    const border = { style: BorderStyle.SINGLE, size: 1, color: "000000" };
    const borders = { top: border, bottom: border, left: border, right: border };
    const features = [
        ["AI 음성 비서", "O", "X", "X", "X"],
        ["시스템 프롬프트 동적 생성", "O", "X", "X", "X"],
        ["실시간 콘텍스트 주입", "O", "X", "X", "X"],
        ["AI 응답→LED 자동 연동", "O", "X", "X", "X"],
        ["온디바이스 AI (로컬 LLM)", "O", "X", "X", "X"],
        ["하이브리드 AI 전환", "O", "X", "X", "X"],
        ["오프라인 AI 동작", "O", "X", "X", "X"],
        ["BLE/RF LED 제어", "O", "O", "O", "O"],
        ["모바일 앱 연동", "O", "O", "O", "X"]
    ];

    return new Table({
        columnWidths: [2800, 1200, 1600, 1600, 2160],
        rows: [
            new TableRow({
                children: ["구분", "본 발명", "KR1024...", "KR1018...", "US2014..."].map(t =>
                    new TableCell({ borders, shading: { fill: "D5E8F0", type: ShadingType.CLEAR },
                        children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: t, bold: true, size: 18 })] })] }))
            }),
            ...features.map(row => new TableRow({
                children: row.map((cell, i) => new TableCell({ borders,
                    children: [new Paragraph({ alignment: i === 0 ? AlignmentType.LEFT : AlignmentType.CENTER, children: [new TextRun({ text: cell, size: 18 })] })] }))
            }))
        ]
    });
}

// 섹션 제목 생성
const sectionTitle = (text) => new Paragraph({ spacing: { before: 300, after: 150 }, children: [new TextRun({ text, bold: true, size: 26 })] });
const subTitle = (text) => new Paragraph({ spacing: { before: 200, after: 100 }, children: [new TextRun({ text, bold: true, size: 24 })] });
const claimTitle = (text) => new Paragraph({ spacing: { before: 200, after: 100 }, children: [new TextRun({ text, bold: true, size: 22 })] });
const para = (text, indent = false) => new Paragraph({ indent: indent ? { left: 360 } : undefined, spacing: { after: 50 }, children: [new TextRun(text)] });
const paraLast = (text) => new Paragraph({ spacing: { after: 200 }, children: [new TextRun(text)] });

// 문서 생성
const doc = new Document({
    styles: {
        default: { document: { run: { font: "맑은 고딕", size: 22 } } }
    },
    sections: [{
        properties: { page: { margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 } } },
        headers: { default: new Header({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "특 허 출 원 서", bold: true, size: 28 })] })] }) },
        footers: { default: new Footer({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun("- "), new TextRun({ children: [PageNumber.CURRENT] }), new TextRun(" -")] })] }) },
        children: [
            // 표지
            new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 1000 }, children: [new TextRun({ text: "특 허 출 원 서", bold: true, size: 48 })] }),
            new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 800 }, children: [new TextRun({ text: "(명 세 서)", size: 32 })] }),
            new Paragraph({ spacing: { before: 800 }, children: [] }),
            createInfoTable(),

            new Paragraph({ children: [new PageBreak()] }),

            // 발명의 명칭
            sectionTitle("【발명의 명칭】"),
            new Paragraph({ spacing: { after: 100 }, children: [new TextRun({ text: "한글: ", bold: true }), new TextRun("실시간 콘서트 정보를 시스템 프롬프트로 동적 주입하여 AI 응답을 생성하고 응원봉을 제어하는 스마트 응원봉 시스템 및 방법")] }),
            new Paragraph({ spacing: { after: 200 }, children: [new TextRun({ text: "영문: ", bold: true }), new TextRun("Smart Light Stick System and Method for Generating AI Responses and Controlling Light Stick by Dynamically Injecting Real-time Concert Information into System Prompts")] }),

            // 기술분야
            sectionTitle("【기술분야】"),
            paraLast("본 발명은 스마트 응원봉 기술에 관한 것으로, 더욱 상세하게는 인공지능(AI) 기반 음성 비서 기능을 탑재하여 사용자의 음성 질문에 실시간 콘서트 정보를 기반으로 응답하고, 응답에 포함된 LED 제어 정보를 추출하여 응원봉의 LED를 자동으로 제어하는 시스템 및 방법에 관한 것이다."),

            // 배경기술
            sectionTitle("【발명의 배경이 되는 기술】"),
            para("기존 응원봉은 다음과 같은 한계를 가진다:"),
            para("1. 일방향 통신: 중앙 제어 시스템에서 응원봉으로 LED 제어 신호만 전송하며, 사용자로부터의 피드백이나 질문을 처리할 수 없다.", true),
            para("2. 정보 제공 불가: \"다음 곡이 무엇인지\", \"현재 곡의 응원색이 무엇인지\" 등 콘서트 진행 정보를 사용자에게 능동적으로 제공할 수 없다.", true),
            para("3. 정적 제어 방식: 사전 프로그래밍된 LED 시퀀스만 실행 가능하며, 실시간 상황에 따른 동적 대응이 불가능하다.", true),
            subTitle("【선행 기술 분석】"),
            createPriorArtTable(),
            paraLast("상기 선행 기술들은 모두 AI 기반 음성 인터페이스, 실시간 콘텍스트 주입, AI 응답과 LED 제어의 자동 연동 기능이 없다."),

            // 발명의 내용
            sectionTitle("【발명의 내용】"),
            subTitle("【해결하고자 하는 과제】"),
            para("본 발명은 상기와 같은 종래 기술의 문제점을 해결하기 위하여 안출된 것으로, 다음과 같은 과제를 해결하고자 한다:"),
            para("1. 사용자가 음성으로 질문하면 현재 콘서트 상황에 맞는 정확한 정보를 AI가 제공하는 시스템 구현", true),
            para("2. AI 응답에서 LED 색상 정보를 자동 추출하여 응원봉을 제어하는 자동화 시스템 구현", true),
            paraLast("3. 콘서트 셋리스트, 아티스트 정보, 현재 곡 인덱스 등을 실시간으로 AI에게 전달하는 동적 콘텍스트 주입 방법 제공"),

            subTitle("【과제의 해결 수단】"),
            para("상기 과제를 해결하기 위한 본 발명의 스마트 응원봉 시스템은:"),
            para("1. 응원봉 장치: LED, 마이크로컨트롤러, BLE 통신 모듈을 포함", true),
            para("2. 스마트폰 애플리케이션: 음성 인식, AI API 연동, BLE 통신을 처리", true),
            para("3. 로컬 데이터베이스: 콘서트 셋리스트, 아티스트 정보, 현재 곡 인덱스 저장", true),
            para("4. 시스템 프롬프트 생성기: 로컬 데이터를 기반으로 동적 프롬프트 생성", true),
            paraLast("5. AI 서버: 시스템 프롬프트와 사용자 질문을 처리하여 응답 생성"),

            subTitle("【발명의 효과】"),
            para("본 발명에 따르면 다음과 같은 효과가 있다:"),
            para("1. 실시간 정보 제공, 2. 자연어 인터페이스, 3. LED 자동 제어, 4. 동적 콘텍스트 주입, 5. 빠른 응답 시간(3초 이내)", true),
            paraLast("6. 오프라인 동작 지원, 7. 하이브리드 안정성, 8. 비용 절감, 9. 프라이버시 보호"),

            new Paragraph({ children: [new PageBreak()] }),

            // 도면의 간단한 설명
            sectionTitle("【도면의 간단한 설명】"),
            para("도 1은 본 발명에 따른 AI FanStick 시스템의 전체 구성도이다."),
            para("도 2는 시스템 프롬프트 생성 흐름도이다."),
            para("도 3은 음성-AI-LED 파이프라인 시퀀스 다이어그램이다."),
            para("도 4는 BLE 명령 프로토콜 구조이다."),
            para("도 5는 AI 응답 파싱 알고리즘 흐름도이다."),
            para("도 6은 하이브리드 AI 아키텍처(클라우드 + 온디바이스) 구성도이다."),
            paraLast("도 7은 온디바이스 AI 처리 상세 흐름도이다."),

            // 구체적인 내용
            sectionTitle("【발명을 실시하기 위한 구체적인 내용】"),
            subTitle("1. 시스템 프롬프트 동적 생성 메커니즘"),
            paraLast("본 발명의 시스템 프롬프트 생성부는 로컬 JSON 데이터를 기반으로 현재 콘서트 상태를 반영한 시스템 프롬프트를 동적으로 생성한다. 템플릿: \"당신은 {artist_name} 콘서트 AI 비서입니다. 현재 곡: {current_song}, 다음 곡: {next_song}, 답변에 [LED:R,G,B] 포함\""),

            subTitle("2. 음성-AI-LED 통합 파이프라인"),
            paraLast("① 음성 입력 → ② STT 변환(~500ms) → ③ 프롬프트 결합 → ④ AI API 호출(~1500ms) → ⑤ 응답 파싱 → ⑥ TTS 출력 + ⑦ LED 제어(병렬, ~200ms). 전체 처리 시간 약 2.5초."),

            subTitle("3. AI 응답 LED 색상 추출 알고리즘"),
            paraLast("정규식 패턴: \\[LED:(\\d{1,3}),(\\d{1,3}),(\\d{1,3})\\]. 패턴 매칭 실패 시 로컬 DB에서 현재 곡 응원색 조회하여 폴백 처리."),

            subTitle("4. 하이브리드 AI 아키텍처"),
            paraLast("(a) 네트워크 상태 감지 → (b) 온라인: 클라우드 AI 우선 → (c) 오프라인: 온디바이스 LLM(Gemma 2B, Q4) 폴백 → (d) 모든 AI 실패: 규칙 기반 템플릿 응답"),

            new Paragraph({ children: [new PageBreak()] }),

            // 청구범위
            sectionTitle("【청구범위】"),

            claimTitle("【청구항 1】 (독립항 - 방법)"),
            para("응원봉 장치와 연동된 스마트폰 애플리케이션에서 AI 기반으로 콘서트 정보를 안내하는 방법에 있어서,"),
            para("(a) 콘서트 셋리스트, 현재 곡 인덱스, 아티스트 정보, 곡별 응원색 RGB 값을 포함하는 로컬 데이터를 로드하는 단계;", true),
            para("(b) 상기 로컬 데이터를 기반으로 현재 콘서트 상태를 반영한 시스템 프롬프트를 동적으로 생성하는 단계;", true),
            para("(c) 사용자의 음성 질문을 텍스트로 변환하는 음성 인식 단계;", true),
            para("(d) 상기 시스템 프롬프트와 상기 변환된 텍스트를 AI 서버로 전송하여 응답을 수신하는 단계;", true),
            para("(e) 상기 AI 응답에서 소정의 형식으로 포함된 LED 색상 정보를 추출하는 파싱 단계; 및", true),
            para("(f) 상기 추출된 LED 색상 정보를 BLE를 통해 응원봉 장치로 전송하여 LED를 제어하는 단계;", true),
            paraLast("를 포함하는 것을 특징으로 하는 AI 기반 콘서트 정보 안내 방법."),

            claimTitle("【청구항 2】 (종속항)"),
            paraLast("제1항에 있어서, 상기 시스템 프롬프트는 LED 색상 응답 형식으로 \"[LED:R,G,B]\" 형식을 지정하는 지시문을 포함하며, R, G, B는 각각 0-255 범위의 정수값인 것을 특징으로 하는 방법."),

            claimTitle("【청구항 3】 (종속항)"),
            paraLast("제1항에 있어서, 상기 (a) 단계의 로컬 데이터는 JSON 형식으로 저장되며, 셋리스트의 각 곡에 대하여 순서, 제목, 응원색 RGB 값, 응원색 이름, 팬 챈트 정보를 포함하는 것을 특징으로 하는 방법."),

            claimTitle("【청구항 4】 (종속항)"),
            paraLast("제1항에 있어서, 상기 (c) 단계부터 상기 (f) 단계까지의 전체 처리 시간이 3초 이내인 것을 특징으로 하는 방법."),

            claimTitle("【청구항 5】 (종속항)"),
            paraLast("제1항에 있어서, 상기 (e) 단계에서 LED 색상 정보가 추출되지 않는 경우, 현재 곡의 응원색을 유지하거나 로컬 데이터에서 해당 곡의 응원색을 조회하여 적용하는 것을 특징으로 하는 방법."),

            claimTitle("【청구항 6】 (독립항 - 시스템)"),
            paraLast("스마트폰 애플리케이션과 응원봉 장치를 포함하는 AI 기반 스마트 응원봉 시스템에 있어서, 상기 스마트폰 애플리케이션은: (a) 로컬 데이터 저장부; (b) 프롬프트 생성부; (c) 음성 인식부; (d) AI 통신부; (e) 응답 파싱부; 및 (f) BLE 통신부;를 포함하고, 상기 응원봉 장치는: (g) 발광부; (h) BLE 수신부; 및 (i) 마이크로컨트롤러;를 포함하는 것을 특징으로 하는 AI 기반 스마트 응원봉 시스템."),

            claimTitle("【청구항 7】 (종속항)"),
            paraLast("제6항에 있어서, 상기 프롬프트 생성부는 현재 곡 인덱스가 변경될 때마다 시스템 프롬프트를 재생성하여, AI 서버가 항상 최신 콘서트 상태를 인지할 수 있도록 하는 것을 특징으로 하는 시스템."),

            claimTitle("【청구항 8】 (종속항)"),
            paraLast("제6항에 있어서, 상기 BLE 통신부는 \"C:R,G,B\"(색상), \"P:패턴명\"(패턴), \"T:텍스트\"(표시) 형식의 구조화된 명령 프로토콜을 사용하는 것을 특징으로 하는 시스템."),

            claimTitle("【청구항 9】 (독립항 - 장치)"),
            paraLast("BLE 통신 모듈, 복수의 LED, 마이크로컨트롤러를 포함하는 스마트 응원봉 장치에 있어서, 상기 마이크로컨트롤러는: (a) AI 서버 응답에서 추출된 색상 정보 기반 LED 제어 명령 수신; (b) 명령 파싱하여 RGB 값 추출; (c) LED 색상 제어;를 수행하는 것을 특징으로 하는 스마트 응원봉 장치."),

            claimTitle("【청구항 10】 (종속항)"),
            paraLast("제9항에 있어서, 상기 마이크로컨트롤러는 rainbow, pulse, blink, wave 패턴을 포함하는 복수의 LED 애니메이션 패턴을 저장하고 실행하는 것을 특징으로 하는 장치."),

            claimTitle("【청구항 11】 (독립항 - 하이브리드 AI)"),
            paraLast("클라우드 AI 서버와 온디바이스 AI를 병용하여 응원봉을 제어하는 방법에 있어서, (a) 네트워크 상태 감지; (b) 온라인 시 클라우드 AI 호출; (c) 오프라인 시 온디바이스 경량 LLM(2B 이하 파라미터, 양자화) 호출; (d) 응답에서 LED 제어 정보 추출;을 포함하는 것을 특징으로 하는 하이브리드 AI 기반 스마트 응원봉 제어 방법."),

            claimTitle("【청구항 12】 (종속항)"),
            paraLast("제11항에 있어서, 온디바이스 AI도 실패 시 규칙 기반 응답을 생성하는 폴백 단계를 더 포함하는 것을 특징으로 하는 방법."),

            claimTitle("【청구항 13】 (종속항)"),
            paraLast("제11항에 있어서, 상기 온디바이스 경량 언어모델은 앱 최초 실행 시 원격 서버로부터 다운로드되어 로컬 저장소에 저장되며, 버전 관리를 통해 업데이트가 가능한 것을 특징으로 하는 방법."),

            claimTitle("【청구항 14】 (종속항)"),
            paraLast("제11항에 있어서, 상기 온디바이스 경량 언어모델은 콘서트 도메인에 특화된 데이터셋으로 파인튜닝되어 답변 품질이 향상된 것을 특징으로 하는 방법."),

            new Paragraph({ children: [new PageBreak()] }),

            // 요약서
            sectionTitle("【요약서】"),
            subTitle("【요약】"),
            paraLast("본 발명은 AI 기반 스마트 응원봉 시스템 및 방법에 관한 것으로, 콘서트 셋리스트, 현재 곡 인덱스, 아티스트 정보를 포함하는 로컬 데이터를 기반으로 시스템 프롬프트를 동적으로 생성하고, 사용자의 음성 질문과 함께 AI 서버로 전송하여 응답을 수신한다. AI 응답에서 [LED:R,G,B] 형식의 색상 정보를 추출하여 BLE를 통해 응원봉의 LED를 자동 제어한다. 클라우드 AI와 온디바이스 경량 언어모델을 병용하는 하이브리드 아키텍처를 채택하여, 오프라인 환경에서도 콘서트 정보 안내 및 LED 제어가 가능하다."),

            subTitle("【대표도】"),
            paraLast("도 1"),

            subTitle("【선행 기술 대비 신규성 요약】"),
            createComparisonTable(),

            // 도면 섹션
            new Paragraph({ children: [new PageBreak()] }),
            new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 200 }, children: [new TextRun({ text: "【도 면】", bold: true, size: 32 })] }),

            // 도면 페이지들
            ...createDrawingPages(),

            // 마무리
            new Paragraph({ spacing: { before: 400 }, alignment: AlignmentType.CENTER, children: [new TextRun({ text: "- 끝 -", bold: true, size: 24 })] })
        ]
    }]
});

// 문서 저장
Packer.toBuffer(doc).then(buffer => {
    fs.writeFileSync(path.join(__dirname, 'AI_FanStick_특허출원서_최종.docx'), buffer);
    console.log('DOCX 파일 생성 완료: AI_FanStick_특허출원서_최종.docx');
}).catch(err => {
    console.error('오류:', err);
});
