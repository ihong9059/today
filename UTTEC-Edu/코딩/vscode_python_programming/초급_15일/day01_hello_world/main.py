# -*- coding: utf-8 -*-
"""
Day 1: 자기소개 프로그램 - 메인 실행 파일

이 파일은 프로그램의 진입점입니다.
사용자로부터 정보를 입력받고, 다른 모듈의 함수를 호출합니다.
"""

# 다른 모듈에서 함수 가져오기
from greeting import say_hello_korean, say_hello_english, say_hello_japanese
from utils import create_intro_card, print_separator

def main():
    """메인 함수: 프로그램의 시작점"""

    # 프로그램 시작 메시지
    print_separator()
    print("🎈 자기소개 프로그램에 오신 것을 환영합니다! 🎈")
    print_separator()
    print()

    # 사용자 입력 받기
    name = input("이름을 입력하세요: ")
    age = input("나이를 입력하세요: ")
    hobby = input("취미를 입력하세요: ")

    print()  # 빈 줄 추가

    # 자기소개 카드 출력
    create_intro_card(name, age, hobby)

    print()  # 빈 줄 추가

    # 다국어 인사 출력
    say_hello_korean(name)
    say_hello_english(name)
    say_hello_japanese(name)

    print()
    print_separator()
    print("프로그램을 이용해 주셔서 감사합니다! 👋")
    print_separator()

# 이 파일이 직접 실행될 때만 main() 함수 호출
if __name__ == "__main__":
    main()
