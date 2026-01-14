# -*- coding: utf-8 -*-
"""
Day 1: 자기소개 프로그램 - 유틸리티 모듈

화면 출력을 꾸미는 데 사용되는 유틸리티 함수들입니다.
박스 그리기, 구분선 등의 기능을 제공합니다.
"""

def create_intro_card(name, age, hobby):
    """
    자기소개 정보를 예쁜 카드 형태로 출력하는 함수

    Args:
        name (str): 사용자 이름
        age (str): 사용자 나이
        hobby (str): 사용자 취미

    Returns:
        None: 화면에 카드를 출력합니다
    """
    # 카드 너비 설정 (한글 고려)
    card_width = 40

    # 상단 테두리
    print("╔" + "═" * card_width + "╗")

    # 타이틀
    title = "🎉 자기소개 카드 🎉"
    title_padding = (card_width - len(title) + 6) // 2  # 이모지 보정
    print("║" + " " * title_padding + title + " " * (card_width - title_padding - len(title) + 6) + "║")

    # 구분선
    print("╠" + "═" * card_width + "╣")

    # 이름 출력
    name_line = f"  이름: {name}"
    name_padding = card_width - len(name_line) - len(name)  # 한글 보정
    print("║" + name_line + " " * name_padding + "║")

    # 나이 출력
    age_line = f"  나이: {age}세"
    age_padding = card_width - len(age_line) - 1
    print("║" + age_line + " " * age_padding + "║")

    # 취미 출력
    hobby_line = f"  취미: {hobby}"
    hobby_padding = card_width - len(hobby_line) - len(hobby)  # 한글 보정
    print("║" + hobby_line + " " * hobby_padding + "║")

    # 하단 테두리
    print("╚" + "═" * card_width + "╝")


def print_separator(char="─", length=50):
    """
    구분선을 출력하는 함수

    Args:
        char (str): 구분선에 사용할 문자 (기본값: ─)
        length (int): 구분선 길이 (기본값: 50)

    Returns:
        None: 화면에 구분선을 출력합니다
    """
    print(char * length)


def print_box_message(message):
    """
    메시지를 박스 안에 넣어 출력하는 함수

    Args:
        message (str): 출력할 메시지

    Returns:
        None: 화면에 박스와 함께 메시지를 출력합니다
    """
    box_width = len(message) + 4

    print("┌" + "─" * box_width + "┐")
    print("│  " + message + "  │")
    print("└" + "─" * box_width + "┘")


def clear_screen():
    """
    화면을 지우는 함수 (Windows/Linux/Mac 호환)

    Returns:
        None: 터미널 화면을 지웁니다
    """
    import os
    # Windows는 'cls', Unix 계열은 'clear' 명령 사용
    os.system('cls' if os.name == 'nt' else 'clear')
