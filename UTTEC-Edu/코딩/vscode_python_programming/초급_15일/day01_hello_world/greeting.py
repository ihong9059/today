# -*- coding: utf-8 -*-
"""
Day 1: 자기소개 프로그램 - 인사 모듈

다양한 언어로 인사하는 함수들을 모아놓은 모듈입니다.
각 함수는 사용자 이름을 받아서 해당 언어로 인사합니다.
"""

def say_hello_korean(name):
    """
    한국어로 인사하는 함수

    Args:
        name (str): 사용자 이름

    Returns:
        None: 화면에 인사 메시지를 출력합니다
    """
    message = f"🇰🇷 안녕하세요, {name}님! 만나서 반갑습니다!"
    print(message)


def say_hello_english(name):
    """
    영어로 인사하는 함수

    Args:
        name (str): 사용자 이름

    Returns:
        None: 화면에 인사 메시지를 출력합니다
    """
    message = f"🇺🇸 Hello, {name}! Nice to meet you!"
    print(message)


def say_hello_japanese(name):
    """
    일본어로 인사하는 함수

    Args:
        name (str): 사용자 이름

    Returns:
        None: 화면에 인사 메시지를 출력합니다
    """
    message = f"🇯🇵 こんにちは、{name}さん! はじめまして!"
    print(message)


def say_hello_chinese(name):
    """
    중국어로 인사하는 함수 (확장용)

    Args:
        name (str): 사용자 이름

    Returns:
        None: 화면에 인사 메시지를 출력합니다
    """
    message = f"🇨🇳 你好，{name}！很高兴认识你！"
    print(message)


def say_hello_spanish(name):
    """
    스페인어로 인사하는 함수 (확장용)

    Args:
        name (str): 사용자 이름

    Returns:
        None: 화면에 인사 메시지를 출력합니다
    """
    message = f"🇪🇸 ¡Hola, {name}! ¡Mucho gusto!"
    print(message)
