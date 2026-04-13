import sys
import platform
import math

# Pyodide(브라우저) 환경에서 확인 가능한 정보를 수집합니다

print("=" * 50)
print("  🖥️  내 환경 정보 확인 결과")
print("=" * 50)

# 1. Python 환경 정보
print("\n📌 [Python 환경]")
print(f"  Python 버전: {platform.python_version()}")
print(f"  구현체: {platform.python_implementation()}")
print(f"  플랫폼: {sys.platform}")
print(f"  바이트 순서: {sys.byteorder} endian")
print(f"  최대 정수 크기: {sys.maxsize:,} (64bit)" if sys.maxsize > 2**32 else f"  최대 정수 크기: {sys.maxsize:,} (32bit)")
print(f"  float 최대값: {sys.float_info.max:.2e}")
print(f"  재귀 한도: {sys.getrecursionlimit()}")

# 2. 실행 환경 (Pyodide/브라우저)
print("\n📌 [실행 환경]")
print(f"  실행 환경: Pyodide (WebAssembly)")
print(f"  브라우저 내 Python 실행 중")

# 3. 사용 가능한 라이브러리 확인
print("\n📌 [사용 가능한 라이브러리]")
libraries = {
    'numpy': '수치 계산 (행렬, 배열 연산)',
    'matplotlib': '데이터 시각화 (그래프, 차트)',
    'PIL': '이미지 처리 (Pillow)',
    'pandas': '데이터 분석 (표, CSV)',
    'scipy': '과학 계산 (통계, 최적화)',
    'statistics': '기초 통계 (평균, 중앙값)',
    'json': 'JSON 데이터 처리',
    'math': '수학 함수 (삼각함수, 로그)',
    'random': '난수 생성',
    'collections': '고급 자료구조',
    'itertools': '반복자 도구',
    'functools': '함수형 프로그래밍 도구',
    'datetime': '날짜/시간 처리',
    're': '정규표현식',
    'hashlib': '해시 함수 (SHA, MD5)',
    'base64': 'Base64 인코딩/디코딩',
    'struct': '바이너리 데이터 처리',
    'csv': 'CSV 파일 처리',
}

available = []
unavailable = []

for lib, desc in libraries.items():
    try:
        __import__(lib)
        available.append((lib, desc))
    except ImportError:
        unavailable.append((lib, desc))

for lib, desc in available:
    print(f"  ✅ {lib:<14} - {desc}")

if unavailable:
    print("\n  --- 사용 불가 ---")
    for lib, desc in unavailable:
        print(f"  ❌ {lib:<14} - {desc}")

# 4. NumPy 상세 정보
print("\n📌 [NumPy 연산 능력]")
try:
    import numpy as np
    print(f"  NumPy 버전: {np.__version__}")
    print(f"  지원 자료형: int8, int16, int32, int64, float32, float64")
    # 연산 성능 간단 테스트
    import time
    size = 1_000_000
    a = np.random.rand(size)
    b = np.random.rand(size)
    start = time.time()
    c = a + b  # 벡터 덧셈
    elapsed = time.time() - start
    print(f"  100만개 벡터 덧셈: {elapsed*1000:.1f}ms")
    start = time.time()
    d = np.dot(a, b)  # 내적
    elapsed = time.time() - start
    print(f"  100만개 벡터 내적: {elapsed*1000:.1f}ms")
    # 행렬 연산
    m = np.random.rand(500, 500)
    start = time.time()
    result = np.dot(m, m)  # 500x500 행렬 곱셈
    elapsed = time.time() - start
    print(f"  500x500 행렬 곱셈: {elapsed*1000:.1f}ms")
except Exception as e:
    print(f"  NumPy 테스트 실패: {e}")

# 5. 센서 접근 가능 여부
print("\n📌 [센서 입력 지원]")
print("  📷 카메라: /tmp/input.jpg 이미지 입력 가능")
print("  📱 가속도: /tmp/input.json 센서 데이터 입력 가능")
print("  🌍 위치정보: /tmp/input.json (lat, lng, accuracy)")
print("  ⌨️  키보드/마우스: 브라우저 이벤트로 처리")

# 6. 메모리 관련
print("\n📌 [시스템 제한]")
print(f"  WebAssembly 메모리 한도: 브라우저에 따라 다름 (보통 2~4GB)")
print(f"  파일 시스템: 가상 파일시스템 (MEMFS)")
print(f"  네트워크: 직접 접근 불가 (보안 제한)")
print(f"  멀티스레딩: 제한적 (Web Worker 통해 가능)")

print("\n" + "=" * 50)
print("  💡 이 환경에서 할 수 있는 것들:")
print("=" * 50)
print("  • 데이터 분석 및 시각화 (그래프, 차트)")
print("  • 이미지 처리 및 필터 적용")
print("  • 수학/통계 계산")
print("  • 머신러닝 기초 (NumPy 기반)")
print("  • 알고리즘 학습 및 실습")
print("  • 센서 데이터 분석 (카메라, 가속도, GPS)")
print("=" * 50)