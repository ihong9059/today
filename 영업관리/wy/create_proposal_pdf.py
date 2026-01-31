from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import mm, cm
from reportlab.lib.colors import HexColor, white, black
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, Image
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_JUSTIFY
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
import os

# 색상 정의
PRIMARY_COLOR = HexColor('#667eea')
SECONDARY_COLOR = HexColor('#764ba2')
DARK_COLOR = HexColor('#1a1a2e')
LIGHT_BG = HexColor('#f8f9fa')
SUCCESS_COLOR = HexColor('#38a169')
DANGER_COLOR = HexColor('#e53e3e')
TEXT_COLOR = HexColor('#333333')
GRAY_COLOR = HexColor('#666666')

# 폰트 등록 시도
try:
    pdfmetrics.registerFont(TTFont('NanumGothic', 'C:/Windows/Fonts/malgun.ttf'))
    pdfmetrics.registerFont(TTFont('NanumGothicBold', 'C:/Windows/Fonts/malgunbd.ttf'))
    FONT_NAME = 'NanumGothic'
    FONT_BOLD = 'NanumGothicBold'
except:
    FONT_NAME = 'Helvetica'
    FONT_BOLD = 'Helvetica-Bold'

class NumberedCanvas(canvas.Canvas):
    def __init__(self, *args, **kwargs):
        canvas.Canvas.__init__(self, *args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_page_number(num_pages)
            canvas.Canvas.showPage(self)
        canvas.Canvas.save(self)

    def draw_page_number(self, page_count):
        self.setFont(FONT_NAME, 9)
        self.setFillColor(GRAY_COLOR)
        page_num = self._pageNumber
        text = f"{page_num} / {page_count}"
        self.drawCentredString(A4[0]/2, 15*mm, text)

def create_styles():
    styles = getSampleStyleSheet()

    # 커버 타이틀
    styles.add(ParagraphStyle(
        name='CoverTitle',
        fontName=FONT_BOLD,
        fontSize=32,
        textColor=white,
        alignment=TA_CENTER,
        spaceAfter=20,
        leading=40
    ))

    # 커버 서브타이틀
    styles.add(ParagraphStyle(
        name='CoverSubtitle',
        fontName=FONT_NAME,
        fontSize=16,
        textColor=white,
        alignment=TA_CENTER,
        spaceAfter=10,
        leading=24
    ))

    # 섹션 타이틀
    styles.add(ParagraphStyle(
        name='SectionTitle',
        fontName=FONT_BOLD,
        fontSize=24,
        textColor=PRIMARY_COLOR,
        alignment=TA_LEFT,
        spaceBefore=0,
        spaceAfter=20,
        leading=30
    ))

    # 서브섹션 타이틀
    styles.add(ParagraphStyle(
        name='SubsectionTitle',
        fontName=FONT_BOLD,
        fontSize=16,
        textColor=DARK_COLOR,
        alignment=TA_LEFT,
        spaceBefore=20,
        spaceAfter=12,
        leading=22
    ))

    # 본문
    styles.add(ParagraphStyle(
        name='BodyTextCustom',
        fontName=FONT_NAME,
        fontSize=11,
        textColor=TEXT_COLOR,
        alignment=TA_JUSTIFY,
        spaceBefore=6,
        spaceAfter=6,
        leading=18
    ))

    # 불릿 리스트
    styles.add(ParagraphStyle(
        name='BulletText',
        fontName=FONT_NAME,
        fontSize=11,
        textColor=TEXT_COLOR,
        alignment=TA_LEFT,
        spaceBefore=4,
        spaceAfter=4,
        leftIndent=20,
        leading=16
    ))

    # 표 헤더
    styles.add(ParagraphStyle(
        name='TableHeader',
        fontName=FONT_BOLD,
        fontSize=10,
        textColor=white,
        alignment=TA_CENTER,
        leading=14
    ))

    # 표 내용
    styles.add(ParagraphStyle(
        name='TableBody',
        fontName=FONT_NAME,
        fontSize=10,
        textColor=TEXT_COLOR,
        alignment=TA_LEFT,
        leading=14
    ))

    return styles

def draw_cover_background(c, doc):
    """커버 페이지 배경 그리기"""
    width, height = A4

    # 전체 배경 - 진한 남색
    c.setFillColor(HexColor('#0a192f'))
    c.rect(0, 0, width, height, fill=1, stroke=0)

    # 상단 그라데이션 효과 영역
    c.setFillColor(HexColor('#1a365d'))
    c.rect(0, height*0.6, width, height*0.4, fill=1, stroke=0)

    # 장식 - 대각선 패턴
    c.setStrokeColor(HexColor('#2d4a6f'))
    c.setLineWidth(0.5)
    for i in range(-10, 30):
        c.line(i*30, 0, i*30 + height, height)

    # 원형 장식 요소들
    c.setFillColor(HexColor('#38a169'))
    c.setFillAlpha(0.3)
    c.circle(width*0.85, height*0.75, 80, fill=1, stroke=0)
    c.setFillColor(HexColor('#667eea'))
    c.setFillAlpha(0.2)
    c.circle(width*0.1, height*0.2, 60, fill=1, stroke=0)
    c.circle(width*0.9, height*0.3, 40, fill=1, stroke=0)
    c.setFillAlpha(1)

    # 하단 액센트 바
    c.setFillColor(HexColor('#38a169'))
    c.rect(0, 0, width, 8, fill=1, stroke=0)

    # 우측 세로 액센트
    c.setFillColor(HexColor('#667eea'))
    c.rect(width-5, height*0.3, 5, height*0.4, fill=1, stroke=0)

def draw_cover_page(canvas, doc):
    """커버 페이지 배경"""
    width, height = A4

    # 그라데이션 효과 (단색으로 대체)
    canvas.setFillColor(PRIMARY_COLOR)
    canvas.rect(0, height/2, width, height/2, fill=1, stroke=0)

    canvas.setFillColor(SECONDARY_COLOR)
    canvas.rect(0, 0, width, height/2, fill=1, stroke=0)

    # 장식 패턴
    canvas.setFillColor(HexColor('#ffffff'))
    canvas.setFillAlpha(0.1)
    for i in range(20):
        for j in range(30):
            if (i + j) % 3 == 0:
                canvas.circle(i*30, j*30, 3, fill=1, stroke=0)
    canvas.setFillAlpha(1)

def create_cover_page(styles):
    """커버 페이지 생성 - 새로운 디자인"""
    from reportlab.platypus import Flowable

    class CoverPage(Flowable):
        def __init__(self, page_width, page_height):
            Flowable.__init__(self)
            self.page_width = page_width
            self.page_height = page_height
            self.width = 0
            self.height = 0

        def draw(self):
            c = self.canv
            width = self.page_width
            height = self.page_height
            # 캔버스 원점 조정 (마진 고려)
            c.saveState()
            c.translate(-20*mm, -25*mm)

            # 배경 - 진한 남색/보라 그라데이션 효과
            c.setFillColor(HexColor('#0a192f'))
            c.rect(0, 0, width, height, fill=1, stroke=0)

            # 상단 영역 - 약간 밝은 색
            c.setFillColor(HexColor('#112240'))
            c.rect(0, height*0.55, width, height*0.45, fill=1, stroke=0)

            # 대각선 장식 패턴
            c.setStrokeColor(HexColor('#1d3557'))
            c.setLineWidth(0.3)
            for i in range(-5, 25):
                c.line(i*40, 0, i*40 + height*0.7, height*0.7)

            # 원형 장식 - 녹색 (스마트팜 느낌)
            c.setFillColor(HexColor('#38a169'))
            c.setFillAlpha(0.15)
            c.circle(width*0.85, height*0.7, 100, fill=1, stroke=0)
            c.circle(width*0.75, height*0.15, 60, fill=1, stroke=0)

            # 원형 장식 - 보라색
            c.setFillColor(HexColor('#667eea'))
            c.setFillAlpha(0.12)
            c.circle(width*0.08, height*0.25, 70, fill=1, stroke=0)
            c.circle(width*0.92, height*0.45, 50, fill=1, stroke=0)

            c.setFillAlpha(1)

            # 하단 녹색 액센트 바
            c.setFillColor(HexColor('#38a169'))
            c.rect(0, 0, width, 10, fill=1, stroke=0)

            # 좌측 보라색 세로 바
            c.setFillColor(HexColor('#667eea'))
            c.rect(0, height*0.35, 6, height*0.3, fill=1, stroke=0)

            # 상단 로고/회사명 영역
            c.setFillColor(HexColor('#64ffda'))
            c.setFont(FONT_NAME, 14)
            c.drawString(40, height - 50, "UTTEC × WHYBIZ")

            c.setFillColor(HexColor('#8892b0'))
            c.setFont(FONT_NAME, 10)
            c.drawString(40, height - 70, "Smart Farm Solution Provider")

            # 메인 타이틀 영역 (중앙)
            c.setFillColor(white)
            c.setFont(FONT_BOLD, 38)
            c.drawCentredString(width/2, height*0.58, "스마트팜")
            c.drawCentredString(width/2, height*0.50, "현장관리 시스템")

            # 서브타이틀
            c.setFillColor(HexColor('#a8b2d1'))
            c.setFont(FONT_NAME, 14)
            c.drawCentredString(width/2, height*0.42, "Smart Farm Field Management System")

            # 구분선
            c.setStrokeColor(HexColor('#38a169'))
            c.setLineWidth(2)
            c.line(width*0.3, height*0.38, width*0.7, height*0.38)

            # 설명 텍스트
            c.setFillColor(HexColor('#ccd6f6'))
            c.setFont(FONT_NAME, 12)
            c.drawCentredString(width/2, height*0.32, "현장 데이터의 체계적 수집과 분석을 통한")
            c.drawCentredString(width/2, height*0.29, "업무 효율화 및 영업 활동 지원 솔루션")

            # 핵심 기능 아이콘 영역
            features = [
                ("📱", "모바일 수집"),
                ("📍", "GPS 추적"),
                ("📷", "사진 기록"),
                ("📊", "데이터 분석")
            ]

            start_x = width * 0.15
            spacing = width * 0.23
            y_pos = height * 0.18

            for i, (icon, text) in enumerate(features):
                x = start_x + (i * spacing)
                # 배경 원
                c.setFillColor(HexColor('#1d3557'))
                c.circle(x, y_pos, 25, fill=1, stroke=0)
                # 텍스트
                c.setFillColor(HexColor('#64ffda'))
                c.setFont(FONT_NAME, 9)
                c.drawCentredString(x, y_pos - 40, text)

            # 하단 정보
            c.setFillColor(HexColor('#8892b0'))
            c.setFont(FONT_NAME, 11)
            c.drawCentredString(width/2, 60, "제안서 v1.0  |  2026년 01월 29일")

            # 회사 정보
            c.setFillColor(HexColor('#64ffda'))
            c.setFont(FONT_NAME, 9)
            c.drawString(40, 25, "UTTEC  |  T. 02-853-1112  |  whybiz@whybiz.net")

            c.restoreState()

    story = []
    # 커버 페이지는 전체 페이지 크기로 그리되, Flowable 크기는 0으로
    cover = CoverPage(A4[0], A4[1])
    cover.width = 0
    cover.height = 0
    story.append(cover)
    story.append(PageBreak())
    return story

def create_toc_page(styles):
    """목차 페이지"""
    story = []
    story.append(Paragraph("목 차", styles['SectionTitle']))
    story.append(Spacer(1, 10*mm))

    toc_items = [
        ("1. Executive Summary", "시스템 핵심 요약"),
        ("2. 도입 필요성", "현재 문제점 및 도입 배경"),
        ("3. 시스템 구성", "아키텍처 및 기술 스택"),
        ("4. 주요 기능", "Android 앱 및 웹 대시보드"),
        ("5. 사용 방법", "데이터 입력 및 조회 절차"),
        ("6. 기대 효과", "도입 시 예상 효과"),
        ("7. 활용 시나리오", "실제 업무 활용 방안"),
        ("8. 기술 사양", "서버 및 API 명세"),
    ]

    toc_data = [["번호", "제목", "설명"]]
    for i, (title, desc) in enumerate(toc_items):
        toc_data.append([str(i+1), title.split(". ")[1], desc])

    toc_table = Table(toc_data, colWidths=[20*mm, 50*mm, 90*mm])
    toc_table.setStyle(TableStyle([
        ('FONTNAME', (0, 0), (-1, 0), FONT_BOLD),
        ('FONTNAME', (0, 1), (-1, -1), FONT_NAME),
        ('FONTSIZE', (0, 0), (-1, -1), 11),
        ('BACKGROUND', (0, 0), (-1, 0), PRIMARY_COLOR),
        ('TEXTCOLOR', (0, 0), (-1, 0), white),
        ('ALIGN', (0, 0), (0, -1), 'CENTER'),
        ('ALIGN', (1, 0), (-1, -1), 'LEFT'),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('GRID', (0, 0), (-1, -1), 0.5, HexColor('#dddddd')),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [white, LIGHT_BG]),
        ('TOPPADDING', (0, 0), (-1, -1), 10),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 10),
        ('LEFTPADDING', (0, 0), (-1, -1), 10),
    ]))
    story.append(toc_table)

    story.append(PageBreak())
    return story

def create_summary_page(styles):
    """Executive Summary 페이지"""
    story = []
    story.append(Paragraph("1. Executive Summary", styles['SectionTitle']))

    story.append(Paragraph(
        "WhyBiz 현장관리 시스템은 스마트팜 점검 담당자가 현장에서 수집한 데이터를 "
        "<b>체계적으로 데이터베이스화</b>하여, 업무 진행의 효율성을 높이고 "
        "문제점 분석 및 영업 활동을 지원하는 통합 솔루션입니다.",
        styles['BodyTextCustom']
    ))

    story.append(Spacer(1, 10*mm))
    story.append(Paragraph("핵심 가치", styles['SubsectionTitle']))

    summary_data = [
        ["항목", "내용"],
        ["📱 모바일 수집", "Android 앱으로 현장에서 즉시 데이터 수집"],
        ["📍 위치 추적", "GPS 자동 기록으로 정확한 위치 정보 확보"],
        ["📷 시각적 기록", "사진 첨부로 현장 상황을 명확하게 기록"],
        ["📊 데이터 분석", "웹 대시보드로 수집된 데이터 통합 분석"],
    ]

    summary_table = Table(summary_data, colWidths=[50*mm, 110*mm])
    summary_table.setStyle(TableStyle([
        ('FONTNAME', (0, 0), (-1, 0), FONT_BOLD),
        ('FONTNAME', (0, 1), (-1, -1), FONT_NAME),
        ('FONTSIZE', (0, 0), (-1, -1), 11),
        ('BACKGROUND', (0, 0), (-1, 0), PRIMARY_COLOR),
        ('TEXTCOLOR', (0, 0), (-1, 0), white),
        ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('GRID', (0, 0), (-1, -1), 0.5, HexColor('#dddddd')),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [white, LIGHT_BG]),
        ('TOPPADDING', (0, 0), (-1, -1), 12),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 12),
        ('LEFTPADDING', (0, 0), (-1, -1), 10),
    ]))
    story.append(summary_table)

    story.append(Spacer(1, 10*mm))
    story.append(Paragraph("시스템 목적", styles['SubsectionTitle']))

    purposes = [
        "• <b>업무 기록 체계화</b>: 모든 현장 활동이 GPS, 사진, 텍스트로 자동 기록",
        "• <b>문제점 추이 분석</b>: 이슈 발생 패턴, 빈도, 위치별 분포 파악 가능",
        "• <b>시스템 상태 추적</b>: 장비/시설의 상태 변화 이력 관리",
        "• <b>영업 활동 지원</b>: 축적된 데이터로 고객 맞춤형 제안 가능",
    ]

    for purpose in purposes:
        story.append(Paragraph(purpose, styles['BulletText']))

    story.append(PageBreak())
    return story

def create_problem_page(styles):
    """도입 필요성 페이지"""
    story = []
    story.append(Paragraph("2. 도입 필요성", styles['SectionTitle']))

    story.append(Paragraph(
        "스마트팜 시스템 운영 현장에서는 정기적인 점검, 장비 상태 확인, 이슈 발생 시 대응 등 "
        "다양한 업무가 발생합니다. 그러나 이러한 현장 업무들이 체계적으로 기록되지 않으면 "
        "다음과 같은 문제가 발생합니다.",
        styles['BodyTextCustom']
    ))

    story.append(Spacer(1, 8*mm))
    story.append(Paragraph("현재의 문제점", styles['SubsectionTitle']))

    problems_data = [
        ["문제점", "영향"],
        ["📝 기록 부재", "현장 점검 내용이 체계적으로 기록되지 않아 이력 추적 어려움"],
        ["📊 분석 불가", "문제점의 발생 추이와 패턴을 파악할 수 있는 데이터 부재"],
        ["🔄 인수인계 어려움", "담당자 변경 시 업무 히스토리 전달이 어려움"],
        ["💼 영업 지원 부족", "고객 제안에 활용할 수 있는 근거 데이터 부족"],
    ]

    problems_table = Table(problems_data, colWidths=[50*mm, 110*mm])
    problems_table.setStyle(TableStyle([
        ('FONTNAME', (0, 0), (-1, 0), FONT_BOLD),
        ('FONTNAME', (0, 1), (-1, -1), FONT_NAME),
        ('FONTSIZE', (0, 0), (-1, -1), 11),
        ('BACKGROUND', (0, 0), (-1, 0), DANGER_COLOR),
        ('TEXTCOLOR', (0, 0), (-1, 0), white),
        ('BACKGROUND', (0, 1), (-1, -1), HexColor('#fff5f5')),
        ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('GRID', (0, 0), (-1, -1), 0.5, HexColor('#ffcccc')),
        ('TOPPADDING', (0, 0), (-1, -1), 12),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 12),
        ('LEFTPADDING', (0, 0), (-1, -1), 10),
    ]))
    story.append(problems_table)

    story.append(Spacer(1, 10*mm))
    story.append(Paragraph("WhyBiz 솔루션", styles['SubsectionTitle']))

    solutions_data = [
        ["해결책", "효과"],
        ["✅ 업무 기록 체계화", "모든 현장 활동이 GPS, 사진, 텍스트로 자동 기록"],
        ["📈 문제점 추이 분석", "이슈 발생 패턴, 빈도, 위치별 분포 파악 가능"],
        ["🔍 시스템 상태 추적", "장비/시설의 상태 변화 이력 체계적 관리"],
        ["💼 영업 활동 지원", "축적된 데이터로 고객 맞춤형 제안 가능"],
    ]

    solutions_table = Table(solutions_data, colWidths=[50*mm, 110*mm])
    solutions_table.setStyle(TableStyle([
        ('FONTNAME', (0, 0), (-1, 0), FONT_BOLD),
        ('FONTNAME', (0, 1), (-1, -1), FONT_NAME),
        ('FONTSIZE', (0, 0), (-1, -1), 11),
        ('BACKGROUND', (0, 0), (-1, 0), SUCCESS_COLOR),
        ('TEXTCOLOR', (0, 0), (-1, 0), white),
        ('BACKGROUND', (0, 1), (-1, -1), HexColor('#f0fff4')),
        ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('GRID', (0, 0), (-1, -1), 0.5, HexColor('#c6f6d5')),
        ('TOPPADDING', (0, 0), (-1, -1), 12),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 12),
        ('LEFTPADDING', (0, 0), (-1, -1), 10),
    ]))
    story.append(solutions_table)

    story.append(PageBreak())
    return story

def create_architecture_page(styles):
    """시스템 구성 페이지"""
    story = []
    story.append(Paragraph("3. 시스템 구성", styles['SectionTitle']))

    story.append(Paragraph("시스템 아키텍처", styles['SubsectionTitle']))

    story.append(Paragraph(
        "WhyBiz 시스템은 Android 앱, 클라우드 서버, 웹 대시보드로 구성되어 "
        "현장 데이터 수집부터 분석까지 통합 관리합니다.",
        styles['BodyTextCustom']
    ))

    story.append(Spacer(1, 5*mm))

    # 아키텍처 다이어그램을 표로 표현
    arch_data = [
        ["Android 앱", "→", "WhyBiz Server", "→", "웹 대시보드"],
        ["📱", "", "🖥️", "", "🌐"],
        ["GPS 자동 수집\n사진 촬영\n데이터 입력\n검색 조회", "",
         "REST API\n이미지 저장\nSQLite DB\nPM2 관리", "",
         "통계 현황\n지도 표시\n검색 기능\n상세 보기"],
    ]

    arch_table = Table(arch_data, colWidths=[45*mm, 10*mm, 45*mm, 10*mm, 45*mm])
    arch_table.setStyle(TableStyle([
        ('FONTNAME', (0, 0), (-1, -1), FONT_NAME),
        ('FONTSIZE', (0, 0), (-1, 0), 12),
        ('FONTSIZE', (0, 1), (-1, -1), 10),
        ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('BACKGROUND', (0, 0), (0, -1), LIGHT_BG),
        ('BACKGROUND', (2, 0), (2, -1), PRIMARY_COLOR),
        ('TEXTCOLOR', (2, 0), (2, -1), white),
        ('BACKGROUND', (4, 0), (4, -1), LIGHT_BG),
        ('BOX', (0, 0), (0, -1), 1, PRIMARY_COLOR),
        ('BOX', (2, 0), (2, -1), 1, PRIMARY_COLOR),
        ('BOX', (4, 0), (4, -1), 1, PRIMARY_COLOR),
        ('TOPPADDING', (0, 0), (-1, -1), 10),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 10),
    ]))
    story.append(arch_table)

    story.append(Spacer(1, 10*mm))
    story.append(Paragraph("기술 스택", styles['SubsectionTitle']))

    tech_data = [
        ["구분", "기술", "설명"],
        ["서버", "DigitalOcean VPS", "클라우드 서버 (178.128.90.37)"],
        ["백엔드", "Node.js + Express", "REST API 서버"],
        ["데이터베이스", "SQLite (sql.js)", "경량 내장 데이터베이스"],
        ["프론트엔드", "HTML5 + JavaScript", "Leaflet 지도 라이브러리"],
        ["모바일", "Android Native", "WebView 하이브리드 앱"],
        ["프로세스 관리", "PM2", "무중단 서비스 운영"],
    ]

    tech_table = Table(tech_data, colWidths=[40*mm, 50*mm, 70*mm])
    tech_table.setStyle(TableStyle([
        ('FONTNAME', (0, 0), (-1, 0), FONT_BOLD),
        ('FONTNAME', (0, 1), (-1, -1), FONT_NAME),
        ('FONTSIZE', (0, 0), (-1, -1), 10),
        ('BACKGROUND', (0, 0), (-1, 0), PRIMARY_COLOR),
        ('TEXTCOLOR', (0, 0), (-1, 0), white),
        ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('GRID', (0, 0), (-1, -1), 0.5, HexColor('#dddddd')),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [white, LIGHT_BG]),
        ('TOPPADDING', (0, 0), (-1, -1), 10),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 10),
        ('LEFTPADDING', (0, 0), (-1, -1), 8),
    ]))
    story.append(tech_table)

    story.append(PageBreak())
    return story

def create_features_page(styles):
    """주요 기능 페이지"""
    story = []
    story.append(Paragraph("4. 주요 기능", styles['SectionTitle']))

    story.append(Paragraph("Android 앱 기능", styles['SubsectionTitle']))

    app_data = [
        ["기능", "설명"],
        ["📍 GPS 자동 수집", "앱 실행 시 자동으로 현재 위치를 수집하여 표시"],
        ["📝 카테고리 선택", "매장/시설/장비/이슈/기타 중 선택"],
        ["✏️ 제목/내용 입력", "점검 항목 또는 이슈에 대한 상세 내용 기술"],
        ["📷 사진 촬영/선택", "카메라로 촬영하거나 갤러리에서 선택"],
        ["🔍 검색 기능", "키워드, 카테고리, 기기별 검색 지원"],
        ["📊 통계 표시", "전체/오늘/사진 포함 건수 통계"],
    ]

    app_table = Table(app_data, colWidths=[45*mm, 115*mm])
    app_table.setStyle(TableStyle([
        ('FONTNAME', (0, 0), (-1, 0), FONT_BOLD),
        ('FONTNAME', (0, 1), (-1, -1), FONT_NAME),
        ('FONTSIZE', (0, 0), (-1, -1), 10),
        ('BACKGROUND', (0, 0), (-1, 0), PRIMARY_COLOR),
        ('TEXTCOLOR', (0, 0), (-1, 0), white),
        ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('GRID', (0, 0), (-1, -1), 0.5, HexColor('#dddddd')),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [white, LIGHT_BG]),
        ('TOPPADDING', (0, 0), (-1, -1), 10),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 10),
        ('LEFTPADDING', (0, 0), (-1, -1), 8),
    ]))
    story.append(app_table)

    story.append(Spacer(1, 8*mm))
    story.append(Paragraph("웹 대시보드 기능", styles['SubsectionTitle']))

    web_data = [
        ["기능", "설명"],
        ["📊 통계 카드", "전체 데이터, 오늘 수집, 사진 포함, 기기 수 현황"],
        ["🗺️ 지도 표시", "Leaflet 지도에 모든 데이터를 마커로 표시"],
        ["🔍 검색/필터", "키워드 검색 및 카테고리 필터링"],
        ["🔄 자동 새로고침", "30초마다 자동으로 데이터 갱신"],
        ["📋 상세 보기", "사진, 지도, 전체 내용 확인 모달"],
    ]

    web_table = Table(web_data, colWidths=[45*mm, 115*mm])
    web_table.setStyle(TableStyle([
        ('FONTNAME', (0, 0), (-1, 0), FONT_BOLD),
        ('FONTNAME', (0, 1), (-1, -1), FONT_NAME),
        ('FONTSIZE', (0, 0), (-1, -1), 10),
        ('BACKGROUND', (0, 0), (-1, 0), PRIMARY_COLOR),
        ('TEXTCOLOR', (0, 0), (-1, 0), white),
        ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('GRID', (0, 0), (-1, -1), 0.5, HexColor('#dddddd')),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [white, LIGHT_BG]),
        ('TOPPADDING', (0, 0), (-1, -1), 10),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 10),
        ('LEFTPADDING', (0, 0), (-1, -1), 8),
    ]))
    story.append(web_table)

    story.append(Spacer(1, 8*mm))
    story.append(Paragraph("데이터 카테고리", styles['SubsectionTitle']))

    cat_data = [
        ["카테고리", "용도", "예시"],
        ["매장", "고객사 매장/농장 방문", "A농장 정기 점검"],
        ["시설", "건물, 하우스, 구조물", "3동 하우스 비닐 상태"],
        ["장비", "센서, 제어기 등", "온습도 센서 교체"],
        ["이슈", "문제점, 고장", "환기팬 이상 소음"],
        ["기타", "그 외 사항", "교육 참석, 자재 수령"],
    ]

    cat_table = Table(cat_data, colWidths=[35*mm, 55*mm, 70*mm])
    cat_table.setStyle(TableStyle([
        ('FONTNAME', (0, 0), (-1, 0), FONT_BOLD),
        ('FONTNAME', (0, 1), (-1, -1), FONT_NAME),
        ('FONTSIZE', (0, 0), (-1, -1), 10),
        ('BACKGROUND', (0, 0), (-1, 0), PRIMARY_COLOR),
        ('TEXTCOLOR', (0, 0), (-1, 0), white),
        ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('GRID', (0, 0), (-1, -1), 0.5, HexColor('#dddddd')),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [white, LIGHT_BG]),
        ('TOPPADDING', (0, 0), (-1, -1), 8),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 8),
        ('LEFTPADDING', (0, 0), (-1, -1), 8),
    ]))
    story.append(cat_table)

    story.append(PageBreak())
    return story

def create_usage_page(styles):
    """사용 방법 페이지"""
    story = []
    story.append(Paragraph("5. 사용 방법", styles['SectionTitle']))

    story.append(Paragraph("데이터 입력 프로세스", styles['SubsectionTitle']))

    process_data = [
        ["단계", "작업", "설명"],
        ["1", "📱 앱 실행", "WhyBiz 앱을 실행합니다"],
        ["2", "📍 GPS 확인", "화면 상단에서 현재 위치가 자동으로 표시됩니다"],
        ["3", "📝 카테고리 선택", "매장/시설/장비/이슈/기타 중 선택합니다"],
        ["4", "✏️ 내용 입력", "제목과 상세 내용을 입력합니다"],
        ["5", "📷 사진 촬영", "사진 영역을 탭하여 촬영하거나 갤러리에서 선택"],
        ["6", "📤 전송", "데이터 전송 버튼을 클릭하여 서버로 전송"],
    ]

    process_table = Table(process_data, colWidths=[20*mm, 40*mm, 100*mm])
    process_table.setStyle(TableStyle([
        ('FONTNAME', (0, 0), (-1, 0), FONT_BOLD),
        ('FONTNAME', (0, 1), (-1, -1), FONT_NAME),
        ('FONTSIZE', (0, 0), (-1, -1), 10),
        ('BACKGROUND', (0, 0), (-1, 0), PRIMARY_COLOR),
        ('TEXTCOLOR', (0, 0), (-1, 0), white),
        ('ALIGN', (0, 0), (0, -1), 'CENTER'),
        ('ALIGN', (1, 0), (-1, -1), 'LEFT'),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('GRID', (0, 0), (-1, -1), 0.5, HexColor('#dddddd')),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [white, LIGHT_BG]),
        ('TOPPADDING', (0, 0), (-1, -1), 10),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 10),
        ('LEFTPADDING', (0, 0), (-1, -1), 8),
    ]))
    story.append(process_table)

    story.append(Spacer(1, 10*mm))
    story.append(Paragraph("접속 정보", styles['SubsectionTitle']))

    access_data = [
        ["구분", "URL / 정보", "비고"],
        ["웹 대시보드", "http://178.128.90.37:3000", "웹 브라우저에서 접속"],
        ["API 서버", "http://178.128.90.37:3000/api/", "REST API 엔드포인트"],
        ["Android 앱", "WhyBiz.apk", "APK 파일 설치"],
    ]

    access_table = Table(access_data, colWidths=[40*mm, 80*mm, 40*mm])
    access_table.setStyle(TableStyle([
        ('FONTNAME', (0, 0), (-1, 0), FONT_BOLD),
        ('FONTNAME', (0, 1), (-1, -1), FONT_NAME),
        ('FONTSIZE', (0, 0), (-1, -1), 10),
        ('BACKGROUND', (0, 0), (-1, 0), PRIMARY_COLOR),
        ('TEXTCOLOR', (0, 0), (-1, 0), white),
        ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('GRID', (0, 0), (-1, -1), 0.5, HexColor('#dddddd')),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [white, LIGHT_BG]),
        ('TOPPADDING', (0, 0), (-1, -1), 10),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 10),
        ('LEFTPADDING', (0, 0), (-1, -1), 8),
    ]))
    story.append(access_table)

    story.append(Spacer(1, 10*mm))
    story.append(Paragraph("효과적인 데이터 입력 팁", styles['SubsectionTitle']))

    tips = [
        "• <b>제목은 간결하고 명확하게</b>: 예) \"A농장 1동 온도센서 교체\"",
        "• <b>내용에는 상세 정보 포함</b>: 점검 결과, 조치 사항, 후속 조치 필요 여부",
        "• <b>사진은 필수로 첨부</b>: 현장 상황, 장비 상태, 작업 전/후 비교",
    ]

    for tip in tips:
        story.append(Paragraph(tip, styles['BulletText']))

    story.append(PageBreak())
    return story

def create_benefit_page(styles):
    """기대 효과 페이지"""
    story = []
    story.append(Paragraph("6. 기대 효과", styles['SectionTitle']))

    benefit_data = [
        ["효과", "설명"],
        ["📋 업무 이력 관리", "모든 현장 활동이 기록되어 이력 추적이 용이합니다"],
        ["📊 데이터 기반 분석", "축적된 데이터로 패턴과 추이를 분석할 수 있습니다"],
        ["🔄 인수인계 용이", "담당자 변경 시에도 업무 연속성을 확보합니다"],
        ["💼 영업 제안 근거", "실제 데이터를 기반으로 고객 맞춤 제안이 가능합니다"],
        ["⏱️ 시간 절약", "별도 보고서 작성 없이 자동으로 기록됩니다"],
        ["🗺️ 위치 기반 관리", "GPS로 정확한 위치 정보를 확보합니다"],
    ]

    benefit_table = Table(benefit_data, colWidths=[50*mm, 110*mm])
    benefit_table.setStyle(TableStyle([
        ('FONTNAME', (0, 0), (-1, 0), FONT_BOLD),
        ('FONTNAME', (0, 1), (-1, -1), FONT_NAME),
        ('FONTSIZE', (0, 0), (-1, -1), 11),
        ('BACKGROUND', (0, 0), (-1, 0), SUCCESS_COLOR),
        ('TEXTCOLOR', (0, 0), (-1, 0), white),
        ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('GRID', (0, 0), (-1, -1), 0.5, HexColor('#c6f6d5')),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [HexColor('#f0fff4'), white]),
        ('TOPPADDING', (0, 0), (-1, -1), 12),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 12),
        ('LEFTPADDING', (0, 0), (-1, -1), 10),
    ]))
    story.append(benefit_table)

    story.append(PageBreak())
    return story

def create_scenario_page(styles):
    """활용 시나리오 페이지"""
    story = []
    story.append(Paragraph("7. 활용 시나리오", styles['SectionTitle']))

    story.append(Paragraph("1. 문제점 추이 분석", styles['SubsectionTitle']))
    story.append(Paragraph(
        "이슈 카테고리 데이터를 분석하여 월별 이슈 발생 건수 추이, 위치별 분포, "
        "이슈 유형 분류를 통해 빈발하는 문제점을 도출하고 예방 대책을 수립합니다.",
        styles['BodyTextCustom']
    ))

    analysis1 = [
        "• 월별 이슈 발생 건수 추이 파악",
        "• 지도에서 이슈 마커 밀집 지역 확인",
        "• 센서/통신/시설 관련 이슈 유형 분류",
    ]
    for item in analysis1:
        story.append(Paragraph(item, styles['BulletText']))

    story.append(Spacer(1, 5*mm))
    story.append(Paragraph("2. 시스템 상태 추적", styles['SubsectionTitle']))
    story.append(Paragraph(
        "장비 카테고리 데이터를 분석하여 장비별 점검 이력, 교체 주기 분석, "
        "사진을 통한 시각적 변화 추적으로 예방 정비 계획을 수립합니다.",
        styles['BodyTextCustom']
    ))

    analysis2 = [
        "• 장비별 점검/교체 이력 추적",
        "• 평균 교체 주기 산출",
        "• 사진을 통한 시각적 변화 추적",
    ]
    for item in analysis2:
        story.append(Paragraph(item, styles['BulletText']))

    story.append(Spacer(1, 5*mm))
    story.append(Paragraph("3. 영업 활동 지원", styles['SubsectionTitle']))
    story.append(Paragraph(
        "고객별 방문 이력, 이슈 해결 실적을 바탕으로 서비스 품질을 입증하고 "
        "데이터 기반의 개선 방안을 제시합니다.",
        styles['BodyTextCustom']
    ))

    analysis3 = [
        "• 고객별 방문 빈도 및 점검 내용 확인",
        "• 문제 발생 → 해결까지의 이력 관리",
        "• 누적 데이터로 문제점 분석 및 개선 방안 제시",
    ]
    for item in analysis3:
        story.append(Paragraph(item, styles['BulletText']))

    story.append(PageBreak())
    return story

def create_technical_page(styles):
    """기술 사양 페이지"""
    story = []
    story.append(Paragraph("8. 기술 사양", styles['SectionTitle']))

    story.append(Paragraph("주요 API", styles['SubsectionTitle']))

    api_data = [
        ["메서드", "엔드포인트", "설명"],
        ["POST", "/api/data", "데이터 제출 (사진 포함)"],
        ["GET", "/api/data", "데이터 조회 (검색/필터)"],
        ["POST", "/api/search", "상세 검색"],
        ["GET", "/api/search/stats", "통계 조회"],
        ["GET", "/api/dashboard/summary", "대시보드 요약"],
        ["GET", "/api/dashboard/recent", "최근 활동"],
    ]

    api_table = Table(api_data, colWidths=[25*mm, 55*mm, 80*mm])
    api_table.setStyle(TableStyle([
        ('FONTNAME', (0, 0), (-1, 0), FONT_BOLD),
        ('FONTNAME', (0, 1), (-1, -1), FONT_NAME),
        ('FONTSIZE', (0, 0), (-1, -1), 10),
        ('BACKGROUND', (0, 0), (-1, 0), DARK_COLOR),
        ('TEXTCOLOR', (0, 0), (-1, 0), white),
        ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('GRID', (0, 0), (-1, -1), 0.5, HexColor('#dddddd')),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [white, LIGHT_BG]),
        ('TOPPADDING', (0, 0), (-1, -1), 10),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 10),
        ('LEFTPADDING', (0, 0), (-1, -1), 8),
    ]))
    story.append(api_table)

    story.append(Spacer(1, 10*mm))
    story.append(Paragraph("데이터 제출 파라미터", styles['SubsectionTitle']))

    param_data = [
        ["파라미터", "타입", "필수", "설명"],
        ["device_id", "string", "Y", "기기 식별자"],
        ["title", "string", "Y", "제목"],
        ["category", "string", "Y", "카테고리 (store/facility/equipment/issue/other)"],
        ["content", "string", "N", "상세 내용"],
        ["photo", "file", "N", "사진 파일"],
        ["latitude", "number", "N", "위도"],
        ["longitude", "number", "N", "경도"],
    ]

    param_table = Table(param_data, colWidths=[35*mm, 25*mm, 15*mm, 85*mm])
    param_table.setStyle(TableStyle([
        ('FONTNAME', (0, 0), (-1, 0), FONT_BOLD),
        ('FONTNAME', (0, 1), (-1, -1), FONT_NAME),
        ('FONTSIZE', (0, 0), (-1, -1), 10),
        ('BACKGROUND', (0, 0), (-1, 0), DARK_COLOR),
        ('TEXTCOLOR', (0, 0), (-1, 0), white),
        ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
        ('ALIGN', (2, 0), (2, -1), 'CENTER'),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('GRID', (0, 0), (-1, -1), 0.5, HexColor('#dddddd')),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [white, LIGHT_BG]),
        ('TOPPADDING', (0, 0), (-1, -1), 8),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 8),
        ('LEFTPADDING', (0, 0), (-1, -1), 8),
    ]))
    story.append(param_table)

    story.append(Spacer(1, 10*mm))
    story.append(Paragraph("서버 관리 명령어", styles['SubsectionTitle']))

    cmd_data = [
        ["명령어", "설명"],
        ["ssh root@178.128.90.37", "SSH 서버 접속"],
        ["pm2 status", "서비스 상태 확인"],
        ["pm2 restart wh", "서비스 재시작"],
        ["pm2 logs wh", "로그 확인"],
    ]

    cmd_table = Table(cmd_data, colWidths=[70*mm, 90*mm])
    cmd_table.setStyle(TableStyle([
        ('FONTNAME', (0, 0), (-1, 0), FONT_BOLD),
        ('FONTNAME', (0, 1), (-1, -1), FONT_NAME),
        ('FONTSIZE', (0, 0), (-1, -1), 10),
        ('BACKGROUND', (0, 0), (-1, 0), DARK_COLOR),
        ('TEXTCOLOR', (0, 0), (-1, 0), white),
        ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('GRID', (0, 0), (-1, -1), 0.5, HexColor('#dddddd')),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [white, LIGHT_BG]),
        ('TOPPADDING', (0, 0), (-1, -1), 10),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 10),
        ('LEFTPADDING', (0, 0), (-1, -1), 8),
    ]))
    story.append(cmd_table)

    story.append(PageBreak())
    return story

def create_closing_page(styles):
    """마무리 페이지 - 새로운 디자인"""
    from reportlab.platypus import Flowable

    class ClosingPage(Flowable):
        def __init__(self, page_width, page_height):
            Flowable.__init__(self)
            self.page_width = page_width
            self.page_height = page_height
            self.width = 0
            self.height = 0

        def draw(self):
            c = self.canv
            width = self.page_width
            height = self.page_height
            c.saveState()
            c.translate(-20*mm, -25*mm)

            # 배경
            c.setFillColor(HexColor('#0a192f'))
            c.rect(0, 0, width, height, fill=1, stroke=0)

            # 상단 영역
            c.setFillColor(HexColor('#112240'))
            c.rect(0, height*0.5, width, height*0.5, fill=1, stroke=0)

            # 장식 원
            c.setFillColor(HexColor('#38a169'))
            c.setFillAlpha(0.1)
            c.circle(width*0.8, height*0.7, 120, fill=1, stroke=0)
            c.setFillColor(HexColor('#667eea'))
            c.circle(width*0.15, height*0.3, 80, fill=1, stroke=0)
            c.setFillAlpha(1)

            # 메인 메시지
            c.setFillColor(white)
            c.setFont(FONT_BOLD, 32)
            c.drawCentredString(width/2, height*0.65, "스마트팜 현장관리의")
            c.drawCentredString(width/2, height*0.58, "새로운 기준")

            # 서브 메시지
            c.setFillColor(HexColor('#64ffda'))
            c.setFont(FONT_NAME, 16)
            c.drawCentredString(width/2, height*0.48, "UTTEC × WHYBIZ")

            # 구분선
            c.setStrokeColor(HexColor('#38a169'))
            c.setLineWidth(2)
            c.line(width*0.35, height*0.43, width*0.65, height*0.43)

            # 설명
            c.setFillColor(HexColor('#a8b2d1'))
            c.setFont(FONT_NAME, 12)
            c.drawCentredString(width/2, height*0.36, "체계적인 데이터 수집과 분석으로")
            c.drawCentredString(width/2, height*0.33, "업무 효율을 높이고, 고객에게 더 나은 서비스를 제공합니다.")

            # 연락처 박스
            box_y = height * 0.12
            box_height = 80
            c.setFillColor(HexColor('#1d3557'))
            c.roundRect(width*0.15, box_y, width*0.7, box_height, 10, fill=1, stroke=0)

            c.setFillColor(HexColor('#64ffda'))
            c.setFont(FONT_BOLD, 11)
            c.drawCentredString(width/2, box_y + 55, "문의 및 상담")

            c.setFillColor(white)
            c.setFont(FONT_NAME, 10)
            c.drawCentredString(width/2, box_y + 35, "T. 02-853-1112  |  M. whybiz@whybiz.net")
            c.drawCentredString(width/2, box_y + 18, "서울시 동작구 상도로 369 숭실대학교 벤처중소기업센터 501호")

            # 하단 카피라이트
            c.setFillColor(HexColor('#8892b0'))
            c.setFont(FONT_NAME, 9)
            c.drawCentredString(width/2, 25, "© 2026 UTTEC × WHYBIZ. All rights reserved.")

            # 하단 액센트
            c.setFillColor(HexColor('#38a169'))
            c.rect(0, 0, width, 8, fill=1, stroke=0)

            c.restoreState()

    story = []
    closing = ClosingPage(A4[0], A4[1])
    closing.width = 0
    closing.height = 0
    story.append(closing)
    return story

def create_pdf():
    """PDF 생성"""
    output_path = r"C:\todo\today\wy\WhyBiz_스마트팜_현장관리_시스템_제안서.pdf"

    doc = SimpleDocTemplate(
        output_path,
        pagesize=A4,
        rightMargin=20*mm,
        leftMargin=20*mm,
        topMargin=25*mm,
        bottomMargin=25*mm
    )

    styles = create_styles()
    story = []

    # 각 페이지 생성
    story.extend(create_cover_page(styles))
    story.extend(create_toc_page(styles))
    story.extend(create_summary_page(styles))
    story.extend(create_problem_page(styles))
    story.extend(create_architecture_page(styles))
    story.extend(create_features_page(styles))
    story.extend(create_usage_page(styles))
    story.extend(create_benefit_page(styles))
    story.extend(create_scenario_page(styles))
    story.extend(create_technical_page(styles))
    story.extend(create_closing_page(styles))

    # PDF 빌드
    doc.build(story, canvasmaker=NumberedCanvas)
    print(f"PDF 생성 완료: {output_path}")

if __name__ == "__main__":
    create_pdf()
