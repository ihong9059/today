# -*- coding: utf-8 -*-
"""용인 3차 강의 슬라이드 → 광주판 재브랜딩 (기관·날짜·강사·슬로건)."""
import io, re, sys

def patch(path, repls):
    with io.open(path, encoding='utf-8') as f:
        s = f.read()
    for a, b in repls:
        if a not in s:
            print(f"  [MISS] {path}: {a[:40]}")
        s = s.replace(a, b)
    with io.open(path, 'w', encoding='utf-8') as f:
        f.write(s)
    print(f"  [OK] {path}")

INSTR_OLD = '"홍광선 대표 · 홍광삼 팀장"'
INSTR_NEW = '"홍광선 대표 · UTTEC 교육팀"'
FOOT_OLD = '"UTTEC · 미래창의 아카데미  |  AI·IoT 스마트팩토리 실습 3차"'
FOOT_NEW = '"UTTEC · 광주 AI·IoT 스마트팩토리 실습 과정"'

# ppt_common.py — PROGRAM, 브랜드, 슬로건 삽입
patch('ppt_common.py', [
    ('PROGRAM = "AI·IoT 기반 스마트팩토리 실습 과정 (3차)"',
     'PROGRAM = "AI·IoT 스마트팩토리 실습 과정 · 광주"'),
    ('("   미래창의 아카데미", {"color": RGBColor(0xBF,0xD2,0xE0), "size": 18})',
     '("   광주 AI·IoT 스마트팩토리 실습", {"color": RGBColor(0xBF,0xD2,0xE0), "size": 18})'),
    ('    # 일자·강사\n',
     '    # 슬로건\n'
     '    text(s, Inches(0.9), Inches(6.02), Inches(9), Inches(0.4),\n'
     '         "百見不如一習   ·   직접 익히는 교육", size=13, color=ORANGE, bold=True)\n'
     '    # 일자·강사\n'),
])

# build_00 ~ 05
patch('build_00.py', [
    ('"2026. 7. 15.(수) · 1회차 시작 전 사전 세팅 (약 30분)"',
     '"개강일 · 1회차 시작 전 사전 세팅 (약 30분)"'),
    (INSTR_OLD, INSTR_NEW),
])
patch('build_01.py', [
    ('"2026. 7. 15.(수) 13:00~17:00"', '"제1주차 · 13:00~17:00"'),
    (INSTR_OLD, INSTR_NEW), (FOOT_OLD, FOOT_NEW),
])
patch('build_02.py', [
    ('"2026. 7. 22.(수) 13:00~17:00"', '"제2주차 · 13:00~17:00"'),
    (INSTR_OLD, INSTR_NEW),
])
patch('build_03.py', [
    ('"2026. 7. 29.(수) 13:00~17:00"', '"제3주차 · 13:00~17:00"'),
    (INSTR_OLD, INSTR_NEW),
])
patch('build_04.py', [
    ('"2026. 8. 5.(수) 13:00~17:00"', '"제4주차 · 13:00~17:00"'),
    (INSTR_OLD, INSTR_NEW),
])
patch('build_05.py', [
    ('"2026. 8. 12.(수) 13:00~17:00 · 수료"', '"제5주차 · 13:00~17:00 · 수료"'),
    (INSTR_OLD, INSTR_NEW), (FOOT_OLD, FOOT_NEW),
])
print("재브랜딩 완료")
