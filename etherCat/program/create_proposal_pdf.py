#!/usr/bin/env python3
"""
현대자동차 EtherCAT + CAN FD 통합 제어 시스템 제안서 PDF 생성
"""

from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib.colors import HexColor, white, black
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_RIGHT
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, Image
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
import os

# 한글 폰트 등록
font_paths = [
    "C:/Windows/Fonts/malgun.ttf",      # 맑은 고딕
    "C:/Windows/Fonts/malgunbd.ttf",    # 맑은 고딕 Bold
]

try:
    pdfmetrics.registerFont(TTFont('MalgunGothic', font_paths[0]))
    pdfmetrics.registerFont(TTFont('MalgunGothicBold', font_paths[1]))
    FONT_NAME = 'MalgunGothic'
    FONT_BOLD = 'MalgunGothicBold'
except:
    FONT_NAME = 'Helvetica'
    FONT_BOLD = 'Helvetica-Bold'

# 색상 정의
HYUNDAI_BLUE = HexColor('#002C5F')
ACCENT_BLUE = HexColor('#00AAD2')
LIGHT_GRAY = HexColor('#F5F5F5')
DARK_GRAY = HexColor('#333333')

def create_styles():
    """스타일 생성"""
    styles = getSampleStyleSheet()

    styles.add(ParagraphStyle(
        name='KoreanTitle',
        fontName=FONT_BOLD,
        fontSize=24,
        leading=30,
        alignment=TA_CENTER,
        textColor=HYUNDAI_BLUE,
        spaceAfter=20,
    ))

    styles.add(ParagraphStyle(
        name='KoreanHeading1',
        fontName=FONT_BOLD,
        fontSize=16,
        leading=22,
        textColor=HYUNDAI_BLUE,
        spaceBefore=20,
        spaceAfter=10,
    ))

    styles.add(ParagraphStyle(
        name='KoreanHeading2',
        fontName=FONT_BOLD,
        fontSize=13,
        leading=18,
        textColor=DARK_GRAY,
        spaceBefore=15,
        spaceAfter=8,
    ))

    styles.add(ParagraphStyle(
        name='KoreanBody',
        fontName=FONT_NAME,
        fontSize=10,
        leading=16,
        textColor=DARK_GRAY,
        spaceAfter=6,
    ))

    styles.add(ParagraphStyle(
        name='KoreanBodyCenter',
        fontName=FONT_NAME,
        fontSize=10,
        leading=16,
        alignment=TA_CENTER,
        textColor=DARK_GRAY,
    ))

    styles.add(ParagraphStyle(
        name='KoreanSmall',
        fontName=FONT_NAME,
        fontSize=9,
        leading=12,
        textColor=DARK_GRAY,
    ))

    return styles

def add_header_footer(canvas, doc):
    """헤더/푸터 추가"""
    canvas.saveState()

    # 헤더 라인
    canvas.setStrokeColor(HYUNDAI_BLUE)
    canvas.setLineWidth(2)
    canvas.line(20*mm, A4[1] - 15*mm, A4[0] - 20*mm, A4[1] - 15*mm)

    # 푸터
    canvas.setFont(FONT_NAME, 8)
    canvas.setFillColor(DARK_GRAY)
    canvas.drawString(20*mm, 15*mm, "EtherCAT + CAN FD 통합 제어 시스템 제안서")
    canvas.drawRightString(A4[0] - 20*mm, 15*mm, f"Page {doc.page}")

    # 푸터 라인
    canvas.setLineWidth(1)
    canvas.line(20*mm, 20*mm, A4[0] - 20*mm, 20*mm)

    canvas.restoreState()

def create_cover_page(styles):
    """표지 생성"""
    elements = []

    elements.append(Spacer(1, 60*mm))

    # 제목
    elements.append(Paragraph("EtherCAT + CAN FD", styles['KoreanTitle']))
    elements.append(Paragraph("통합 제어 시스템 제안서", styles['KoreanTitle']))

    elements.append(Spacer(1, 20*mm))

    # 부제
    subtitle_style = ParagraphStyle(
        name='Subtitle',
        fontName=FONT_NAME,
        fontSize=14,
        leading=20,
        alignment=TA_CENTER,
        textColor=ACCENT_BLUE,
    )
    elements.append(Paragraph("스마트 팩토리 생산라인 고속 제어 솔루션", subtitle_style))

    elements.append(Spacer(1, 40*mm))

    # 수신자 정보
    info_data = [
        ['수신', '현대자동차그룹 제조솔루션본부'],
        ['부서', '제조관제&물류개발팀 / 제조부문'],
        ['부서', '제조관제&물류개발팀 / 제조부문 / 제조솔루션본부'],
        ['', ''],
        ['발신', '(주)OOO 기술팀'],
        ['일자', '2026년 2월 14일'],
    ]

    info_table = Table(info_data, colWidths=[30*mm, 100*mm])
    info_table.setStyle(TableStyle([
        ('FONTNAME', (0, 0), (-1, -1), FONT_NAME),
        ('FONTSIZE', (0, 0), (-1, -1), 11),
        ('TEXTCOLOR', (0, 0), (0, -1), HYUNDAI_BLUE),
        ('TEXTCOLOR', (1, 0), (1, -1), DARK_GRAY),
        ('ALIGN', (0, 0), (0, -1), 'RIGHT'),
        ('ALIGN', (1, 0), (1, -1), 'LEFT'),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 8),
    ]))
    elements.append(info_table)

    elements.append(PageBreak())
    return elements

def create_executive_summary(styles):
    """Executive Summary 섹션"""
    elements = []

    elements.append(Paragraph("1. 제안 요약 (Executive Summary)", styles['KoreanHeading1']))

    elements.append(Paragraph("1.1 제안 개요", styles['KoreanHeading2']))

    overview_text = """
    본 제안서는 현대자동차 생산라인의 <b>고속 모션 제어</b>와 <b>분산 센서 통합</b>을 위한
    EtherCAT + CAN FD 복합 통신 시스템 구축 방안을 제시합니다.
    """
    elements.append(Paragraph(overview_text, styles['KoreanBody']))

    # 핵심 가치 테이블
    elements.append(Paragraph("1.2 핵심 가치", styles['KoreanHeading2']))

    value_data = [
        ['구분', '내용', '효과'],
        ['비용 절감', '브랜드 제품 대비 저비용 구성', '70% 절감'],
        ['고성능', 'EtherCAT 기반 <500μs 사이클', '정밀 동기화'],
        ['확장성', '센서 78개 + 서보 39축 통합', '유연한 확장'],
        ['기술 지원', '국내 개발, 커스터마이징', '빠른 대응'],
    ]

    value_table = Table(value_data, colWidths=[35*mm, 70*mm, 40*mm])
    value_table.setStyle(TableStyle([
        ('FONTNAME', (0, 0), (-1, 0), FONT_BOLD),
        ('FONTNAME', (0, 1), (-1, -1), FONT_NAME),
        ('FONTSIZE', (0, 0), (-1, -1), 10),
        ('BACKGROUND', (0, 0), (-1, 0), HYUNDAI_BLUE),
        ('TEXTCOLOR', (0, 0), (-1, 0), white),
        ('BACKGROUND', (0, 1), (-1, -1), LIGHT_GRAY),
        ('TEXTCOLOR', (0, 1), (-1, -1), DARK_GRAY),
        ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('GRID', (0, 0), (-1, -1), 0.5, HYUNDAI_BLUE),
        ('TOPPADDING', (0, 0), (-1, -1), 8),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 8),
    ]))
    elements.append(value_table)
    elements.append(Spacer(1, 10*mm))

    # 비용 비교
    elements.append(Paragraph("1.3 비용 비교 (브랜드 vs 당사 제안)", styles['KoreanHeading2']))

    cost_data = [
        ['구성요소', '브랜드 (USD)', '당사 (USD)', '절감율'],
        ['서보 시스템 (39축)', '$30,000+', '$7,800', '74%'],
        ['I/O 모듈 (12개)', '$2,500+', '$840', '66%'],
        ['센서 네트워크 (78개)', '$3,000+', '$1,085', '64%'],
        ['컨트롤러/게이트웨이', '$2,500+', '$1,200', '52%'],
        ['총계', '$39,500+', '$11,780', '70%'],
    ]

    cost_table = Table(cost_data, colWidths=[50*mm, 35*mm, 35*mm, 25*mm])
    cost_table.setStyle(TableStyle([
        ('FONTNAME', (0, 0), (-1, 0), FONT_BOLD),
        ('FONTNAME', (0, 1), (-1, -1), FONT_NAME),
        ('FONTNAME', (0, -1), (-1, -1), FONT_BOLD),
        ('FONTSIZE', (0, 0), (-1, -1), 10),
        ('BACKGROUND', (0, 0), (-1, 0), HYUNDAI_BLUE),
        ('TEXTCOLOR', (0, 0), (-1, 0), white),
        ('BACKGROUND', (0, -1), (-1, -1), ACCENT_BLUE),
        ('TEXTCOLOR', (0, -1), (-1, -1), white),
        ('ALIGN', (1, 0), (-1, -1), 'CENTER'),
        ('ALIGN', (0, 0), (0, -1), 'LEFT'),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('GRID', (0, 0), (-1, -1), 0.5, HYUNDAI_BLUE),
        ('TOPPADDING', (0, 0), (-1, -1), 6),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 6),
    ]))
    elements.append(cost_table)

    elements.append(PageBreak())
    return elements

def create_company_intro(styles):
    """회사 소개 섹션"""
    elements = []

    elements.append(Paragraph("2. 회사 소개 및 핵심 역량", styles['KoreanHeading1']))

    elements.append(Paragraph("2.1 보유 핵심 기술", styles['KoreanHeading2']))

    tech_data = [
        ['분야', '기술', '수준'],
        ['EtherCAT', 'EtherCAT 컨트롤러 개발 (CM4 기반)', '양산 실적'],
        ['임베디드 HW', '회로설계 (OrCAD, EasyEDA)', '25년+ 경력'],
        ['PCB 설계', 'PCB Artwork (PADS, EasyEDA)', '상급'],
        ['펌웨어', 'C/C++, Linux, FreeRTOS', '상급'],
        ['FPGA', 'Verilog HDL', '중급'],
        ['프로토콜', 'EtherCAT, CAN FD, Modbus, RS485', '상급'],
    ]

    tech_table = Table(tech_data, colWidths=[35*mm, 80*mm, 30*mm])
    tech_table.setStyle(TableStyle([
        ('FONTNAME', (0, 0), (-1, 0), FONT_BOLD),
        ('FONTNAME', (0, 1), (-1, -1), FONT_NAME),
        ('FONTSIZE', (0, 0), (-1, -1), 10),
        ('BACKGROUND', (0, 0), (-1, 0), HYUNDAI_BLUE),
        ('TEXTCOLOR', (0, 0), (-1, 0), white),
        ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
        ('ALIGN', (2, 0), (2, -1), 'CENTER'),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('GRID', (0, 0), (-1, -1), 0.5, HYUNDAI_BLUE),
        ('TOPPADDING', (0, 0), (-1, -1), 6),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 6),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [white, LIGHT_GRAY]),
    ]))
    elements.append(tech_table)
    elements.append(Spacer(1, 10*mm))

    # 핵심 인력
    elements.append(Paragraph("2.2 핵심 인력", styles['KoreanHeading2']))

    # 홍광선 수석
    elements.append(Paragraph("<b>HW/FW 총괄</b>", styles['KoreanBody']))

    hong_data = [
        ['경력', '25년+ (회로설계/임베디드 전문)'],
        ['역할', '하드웨어 설계, PCB Artwork, 펌웨어 개발'],
        ['핵심 기술', 'EtherCAT, RS485, 모션제어, STM32, Linux'],
    ]
    hong_table = Table(hong_data, colWidths=[30*mm, 115*mm])
    hong_table.setStyle(TableStyle([
        ('FONTNAME', (0, 0), (-1, -1), FONT_NAME),
        ('FONTSIZE', (0, 0), (-1, -1), 9),
        ('TEXTCOLOR', (0, 0), (0, -1), HYUNDAI_BLUE),
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('TOPPADDING', (0, 0), (-1, -1), 4),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 4),
    ]))
    elements.append(hong_table)
    elements.append(Spacer(1, 5*mm))

    # 임호균 수석
    elements.append(Paragraph("<b>시스템/FW</b>", styles['KoreanBody']))

    lim_data = [
        ['경력', '38년+ (삼성전자 출신)'],
        ['해외 경험', '일본 4년, 미국 8년+ (AuthenTec, QuickLogic)'],
        ['역할', '시스템 아키텍처, 임베디드 개발'],
        ['핵심 기술', 'ARM Cortex, EtherCAT, CAN, Linux, RTOS'],
    ]
    lim_table = Table(lim_data, colWidths=[30*mm, 115*mm])
    lim_table.setStyle(TableStyle([
        ('FONTNAME', (0, 0), (-1, -1), FONT_NAME),
        ('FONTSIZE', (0, 0), (-1, -1), 9),
        ('TEXTCOLOR', (0, 0), (0, -1), HYUNDAI_BLUE),
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('TOPPADDING', (0, 0), (-1, -1), 4),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 4),
    ]))
    elements.append(lim_table)
    elements.append(Spacer(1, 8*mm))

    # 개발 실적
    elements.append(Paragraph("2.3 주요 개발 실적", styles['KoreanHeading2']))

    project_data = [
        ['프로젝트', '내용', '현황'],
        ['EtherCAT 컨트롤러', 'CM4 + Gbit LAN + RS485, 다축 제어', '국내 양산 중'],
        ['V-Cut 컨트롤러', '라즈베리파이3 + 2축 제어 + Qt GUI', '국내 양산 중'],
        ['컴프레샤 컨트롤러', 'STM32F756 + 4-20mA + 인버터 통신', '국내 양산 중'],
        ['세탁기 컨트롤러', 'STM32F407 + 릴레이 + 인버터', '국내 납품 중'],
    ]

    project_table = Table(project_data, colWidths=[45*mm, 70*mm, 30*mm])
    project_table.setStyle(TableStyle([
        ('FONTNAME', (0, 0), (-1, 0), FONT_BOLD),
        ('FONTNAME', (0, 1), (-1, -1), FONT_NAME),
        ('FONTSIZE', (0, 0), (-1, -1), 9),
        ('BACKGROUND', (0, 0), (-1, 0), HYUNDAI_BLUE),
        ('TEXTCOLOR', (0, 0), (-1, 0), white),
        ('ALIGN', (2, 0), (2, -1), 'CENTER'),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('GRID', (0, 0), (-1, -1), 0.5, HYUNDAI_BLUE),
        ('TOPPADDING', (0, 0), (-1, -1), 5),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 5),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [white, LIGHT_GRAY]),
    ]))
    elements.append(project_table)

    elements.append(PageBreak())
    return elements

def create_system_config(styles):
    """시스템 구성 섹션"""
    elements = []

    elements.append(Paragraph("3. 제안 시스템 구성", styles['KoreanHeading1']))

    elements.append(Paragraph("3.1 시스템 아키텍처", styles['KoreanHeading2']))

    arch_text = """
    <b>EtherCAT 영역</b> (고속 실시간 제어)<br/>
    • 6축 로봇 6대 (조립 4대 + 용접 2대) = 36축<br/>
    • 컨베이어 서보 3축<br/>
    • I/O 모듈 12개<br/>
    • 비전 시스템 2대<br/>
    • 사이클 타임: 500μs<br/><br/>

    <b>CAN FD 영역</b> (분산 센서 네트워크)<br/>
    • 온도 센서: 20개 (모터 온도 모니터링)<br/>
    • 진동 센서: 8개 (예지보전용)<br/>
    • 근접 센서: 30개 (위치 감지)<br/>
    • 압력/유량 센서: 20개 (환경 모니터링)<br/>
    • 업데이트 주기: 10~100ms
    """
    elements.append(Paragraph(arch_text, styles['KoreanBody']))
    elements.append(Spacer(1, 5*mm))

    elements.append(Paragraph("3.2 프로토콜 역할 분담", styles['KoreanHeading2']))

    protocol_data = [
        ['프로토콜', '역할', '특성', '적용 대상'],
        ['EtherCAT', '고속 실시간 제어', '<100μs, 나노초 동기화', '로봇, 서보, 고속 I/O'],
        ['CAN FD', '분산 센서 통합', '64바이트, 8Mbps, 저비용', '온도, 진동, 환경 센서'],
        ['게이트웨이', '프로토콜 변환', '1ms 동기화, PDO 매핑', '양 네트워크 연결'],
    ]

    protocol_table = Table(protocol_data, colWidths=[30*mm, 40*mm, 45*mm, 40*mm])
    protocol_table.setStyle(TableStyle([
        ('FONTNAME', (0, 0), (-1, 0), FONT_BOLD),
        ('FONTNAME', (0, 1), (-1, -1), FONT_NAME),
        ('FONTSIZE', (0, 0), (-1, -1), 9),
        ('BACKGROUND', (0, 0), (-1, 0), HYUNDAI_BLUE),
        ('TEXTCOLOR', (0, 0), (-1, 0), white),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('GRID', (0, 0), (-1, -1), 0.5, HYUNDAI_BLUE),
        ('TOPPADDING', (0, 0), (-1, -1), 5),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 5),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [white, LIGHT_GRAY]),
    ]))
    elements.append(protocol_table)
    elements.append(Spacer(1, 8*mm))

    # 상세 BOM
    elements.append(Paragraph("3.3 상세 구성품 (BOM)", styles['KoreanHeading2']))

    bom_data = [
        ['구분', '품목', '수량', '단가(USD)', '소계(USD)'],
        ['서보', '조립 로봇 서보 (400W~2KW)', '24축', '$180', '$4,320'],
        ['서보', '용접 로봇 서보 (750W~2KW)', '12축', '$220', '$2,640'],
        ['서보', '컨베이어 서보 (1.5KW)', '3축', '$280', '$840'],
        ['I/O', '디지털 I/O (16DI/16DO)', '6개', '$65', '$390'],
        ['I/O', '디지털 입력 (32DI)', '2개', '$55', '$110'],
        ['I/O', '아날로그 입력 (8AI)', '2개', '$90', '$180'],
        ['센서', '온도 센서 모듈 (4ch)', '5개', '$50', '$250'],
        ['센서', '진동 센서 노드', '8개', '$60', '$480'],
        ['센서', '근접 센서 I/O (8DI)', '4개', '$40', '$160'],
        ['센서', '압력/유량 아날로그', '3개', '$65', '$195'],
        ['컨트롤러', '마스터 컨트롤러 (당사)', '1대', '$800', '$800'],
        ['게이트웨이', 'EtherCAT-CAN FD (당사)', '1대', '$400', '$400'],
        ['기타', '케이블, 전원, 예비부품', '-', '-', '$1,015'],
        ['', '', '', '총계', '$11,780'],
    ]

    bom_table = Table(bom_data, colWidths=[25*mm, 60*mm, 20*mm, 25*mm, 25*mm])
    bom_table.setStyle(TableStyle([
        ('FONTNAME', (0, 0), (-1, 0), FONT_BOLD),
        ('FONTNAME', (0, 1), (-1, -1), FONT_NAME),
        ('FONTNAME', (0, -1), (-1, -1), FONT_BOLD),
        ('FONTSIZE', (0, 0), (-1, -1), 8),
        ('BACKGROUND', (0, 0), (-1, 0), HYUNDAI_BLUE),
        ('TEXTCOLOR', (0, 0), (-1, 0), white),
        ('BACKGROUND', (0, -1), (-1, -1), ACCENT_BLUE),
        ('TEXTCOLOR', (0, -1), (-1, -1), white),
        ('ALIGN', (2, 0), (-1, -1), 'CENTER'),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('GRID', (0, 0), (-1, -1), 0.5, HYUNDAI_BLUE),
        ('TOPPADDING', (0, 0), (-1, -1), 4),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 4),
    ]))
    elements.append(bom_table)

    elements.append(PageBreak())
    return elements

def create_technical_advantages(styles):
    """기술적 장점 섹션"""
    elements = []

    elements.append(Paragraph("4. 기술적 장점", styles['KoreanHeading1']))

    elements.append(Paragraph("4.1 당사 개발 게이트웨이의 차별점", styles['KoreanHeading2']))

    gw_text = """
    당사가 개발하는 EtherCAT-CAN FD 게이트웨이는 다음과 같은 차별점을 갖습니다:
    """
    elements.append(Paragraph(gw_text, styles['KoreanBody']))

    gw_data = [
        ['항목', 'HMS Anybus ($900)', '당사 개발 ($400)'],
        ['커스터마이징', '제한적', '완전 맞춤 가능'],
        ['기술 지원', '해외 (영어)', '국내 (한국어)'],
        ['납기', '4~8주', '2~3주'],
        ['펌웨어 수정', '불가', '가능'],
        ['현장 대응', '어려움', '즉시 가능'],
    ]

    gw_table = Table(gw_data, colWidths=[40*mm, 50*mm, 55*mm])
    gw_table.setStyle(TableStyle([
        ('FONTNAME', (0, 0), (-1, 0), FONT_BOLD),
        ('FONTNAME', (0, 1), (-1, -1), FONT_NAME),
        ('FONTSIZE', (0, 0), (-1, -1), 10),
        ('BACKGROUND', (0, 0), (-1, 0), HYUNDAI_BLUE),
        ('TEXTCOLOR', (0, 0), (-1, 0), white),
        ('BACKGROUND', (2, 1), (2, -1), HexColor('#E8F4F8')),
        ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('GRID', (0, 0), (-1, -1), 0.5, HYUNDAI_BLUE),
        ('TOPPADDING', (0, 0), (-1, -1), 6),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 6),
    ]))
    elements.append(gw_table)
    elements.append(Spacer(1, 8*mm))

    elements.append(Paragraph("4.2 시스템 성능 사양", styles['KoreanHeading2']))

    spec_data = [
        ['항목', '사양', '비고'],
        ['EtherCAT 사이클', '500μs ~ 1ms', '다축 동기화'],
        ['동기화 정밀도', '<1μs', '분산 클럭(DC)'],
        ['CAN FD 속도', '2~8 Mbps', '64바이트/메시지'],
        ['최대 EtherCAT 노드', '100개+', '확장 가능'],
        ['최대 CAN FD 노드', '64개/버스', '멀티 버스 지원'],
        ['게이트웨이 지연', '<1ms', '실시간 변환'],
    ]

    spec_table = Table(spec_data, colWidths=[50*mm, 50*mm, 45*mm])
    spec_table.setStyle(TableStyle([
        ('FONTNAME', (0, 0), (-1, 0), FONT_BOLD),
        ('FONTNAME', (0, 1), (-1, -1), FONT_NAME),
        ('FONTSIZE', (0, 0), (-1, -1), 10),
        ('BACKGROUND', (0, 0), (-1, 0), HYUNDAI_BLUE),
        ('TEXTCOLOR', (0, 0), (-1, 0), white),
        ('ALIGN', (1, 0), (-1, -1), 'CENTER'),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('GRID', (0, 0), (-1, -1), 0.5, HYUNDAI_BLUE),
        ('TOPPADDING', (0, 0), (-1, -1), 6),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 6),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [white, LIGHT_GRAY]),
    ]))
    elements.append(spec_table)

    elements.append(PageBreak())
    return elements

def create_project_plan(styles):
    """프로젝트 계획 섹션"""
    elements = []

    elements.append(Paragraph("5. 프로젝트 진행 계획", styles['KoreanHeading1']))

    elements.append(Paragraph("5.1 단계별 진행 계획", styles['KoreanHeading2']))

    phase_data = [
        ['단계', '내용', '산출물'],
        ['Phase 1', '요구사항 분석 및 설계', '상세 설계서'],
        ['Phase 2', '하드웨어 개발', '게이트웨이, 컨트롤러'],
        ['Phase 3', '펌웨어/SW 개발', 'EtherCAT/CAN FD 스택'],
        ['Phase 4', '시스템 통합 및 테스트', '통합 시스템'],
        ['Phase 5', '현장 설치 및 안정화', '운영 시스템'],
    ]

    phase_table = Table(phase_data, colWidths=[30*mm, 70*mm, 45*mm])
    phase_table.setStyle(TableStyle([
        ('FONTNAME', (0, 0), (-1, 0), FONT_BOLD),
        ('FONTNAME', (0, 1), (-1, -1), FONT_NAME),
        ('FONTSIZE', (0, 0), (-1, -1), 10),
        ('BACKGROUND', (0, 0), (-1, 0), HYUNDAI_BLUE),
        ('TEXTCOLOR', (0, 0), (-1, 0), white),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('GRID', (0, 0), (-1, -1), 0.5, HYUNDAI_BLUE),
        ('TOPPADDING', (0, 0), (-1, -1), 6),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 6),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [white, LIGHT_GRAY]),
    ]))
    elements.append(phase_table)
    elements.append(Spacer(1, 8*mm))

    elements.append(Paragraph("5.2 투입 인력", styles['KoreanHeading2']))

    team_data = [
        ['역할', '담당자', '주요 업무'],
        ['PM/HW 설계', 'HW/FW 총괄', '하드웨어 설계, PCB, 게이트웨이 개발'],
        ['시스템/FW', '시스템/FW', '아키텍처 설계, EtherCAT/CAN 펌웨어'],
        ['테스트', '공동', '시스템 통합, 현장 설치 지원'],
    ]

    team_table = Table(team_data, colWidths=[35*mm, 35*mm, 75*mm])
    team_table.setStyle(TableStyle([
        ('FONTNAME', (0, 0), (-1, 0), FONT_BOLD),
        ('FONTNAME', (0, 1), (-1, -1), FONT_NAME),
        ('FONTSIZE', (0, 0), (-1, -1), 10),
        ('BACKGROUND', (0, 0), (-1, 0), HYUNDAI_BLUE),
        ('TEXTCOLOR', (0, 0), (-1, 0), white),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('GRID', (0, 0), (-1, -1), 0.5, HYUNDAI_BLUE),
        ('TOPPADDING', (0, 0), (-1, -1), 6),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 6),
    ]))
    elements.append(team_table)
    elements.append(Spacer(1, 8*mm))

    elements.append(Paragraph("5.3 지원 및 유지보수", styles['KoreanHeading2']))

    support_text = """
    • <b>보증 기간:</b> 납품 후 1년 무상 보증<br/>
    • <b>기술 지원:</b> 전화/이메일/현장 방문 지원<br/>
    • <b>응답 시간:</b> 긴급 4시간 내 / 일반 24시간 내<br/>
    • <b>예비 부품:</b> 주요 부품 재고 확보<br/>
    • <b>확장 지원:</b> 추가 라인 확장 시 동일 아키텍처 적용 가능
    """
    elements.append(Paragraph(support_text, styles['KoreanBody']))

    elements.append(PageBreak())
    return elements

def create_conclusion(styles):
    """결론 섹션"""
    elements = []

    elements.append(Paragraph("6. 결론", styles['KoreanHeading1']))

    elements.append(Paragraph("6.1 제안의 핵심 가치", styles['KoreanHeading2']))

    value_data = [
        ['핵심 가치', '내용'],
        ['비용 절감 70%', '브랜드 제품 대비 대폭 절감, 동일 성능 보장'],
        ['검증된 기술력', 'EtherCAT 컨트롤러 양산 실적, 25년+ 임베디드 경험'],
        ['맞춤 개발', '현대차 요구사항에 최적화된 커스터마이징'],
        ['국내 기술 지원', '빠른 대응, 한국어 지원, 현장 방문 가능'],
        ['기술 내재화', '핵심 기술 이전, 장기적 파트너십'],
    ]

    value_table = Table(value_data, colWidths=[45*mm, 100*mm])
    value_table.setStyle(TableStyle([
        ('FONTNAME', (0, 0), (-1, 0), FONT_BOLD),
        ('FONTNAME', (0, 1), (-1, -1), FONT_NAME),
        ('FONTSIZE', (0, 0), (-1, -1), 10),
        ('BACKGROUND', (0, 0), (-1, 0), HYUNDAI_BLUE),
        ('TEXTCOLOR', (0, 0), (-1, 0), white),
        ('TEXTCOLOR', (0, 1), (0, -1), HYUNDAI_BLUE),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('GRID', (0, 0), (-1, -1), 0.5, HYUNDAI_BLUE),
        ('TOPPADDING', (0, 0), (-1, -1), 8),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 8),
    ]))
    elements.append(value_table)
    elements.append(Spacer(1, 15*mm))

    # 마무리 멘트
    closing = """
    본 제안서에 대한 문의사항이 있으시면 언제든지 연락 주시기 바랍니다.<br/><br/>
    <b>감사합니다.</b>
    """
    elements.append(Paragraph(closing, styles['KoreanBodyCenter']))

    return elements

def create_pdf():
    """PDF 생성"""
    output_path = "C:/todo/today/etherCat/현대자동차_EtherCAT_CAN_FD_제안서.pdf"

    doc = SimpleDocTemplate(
        output_path,
        pagesize=A4,
        rightMargin=20*mm,
        leftMargin=20*mm,
        topMargin=25*mm,
        bottomMargin=25*mm
    )

    styles = create_styles()

    # 문서 구성
    elements = []
    elements.extend(create_cover_page(styles))
    elements.extend(create_executive_summary(styles))
    elements.extend(create_company_intro(styles))
    elements.extend(create_system_config(styles))
    elements.extend(create_technical_advantages(styles))
    elements.extend(create_project_plan(styles))
    elements.extend(create_conclusion(styles))

    # PDF 생성
    doc.build(elements, onFirstPage=add_header_footer, onLaterPages=add_header_footer)

    print(f"PDF 생성 완료: {output_path}")
    return output_path

if __name__ == "__main__":
    create_pdf()
