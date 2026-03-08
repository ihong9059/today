#!/usr/bin/env python3
"""Convert ```text blocks to appropriate markdown formats in curriculum.ts"""

file_path = r"C:\todo\today\ai-education-web\src\data\curriculum.ts"

# Read the file
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

conversions_made = 0

# Conversion 1: Scaling Laws
old_scaling = r"""`\`\`text
2020년 OpenAI의 연구에서 발견:

모델 성능(Loss)은 세 가지에 의해 예측 가능하게 개선됩니다:

1) 모델 크기 (N): 파라미터 수
2) 데이터 크기 (D): 학습 토큰 수
3) 컴퓨팅 (C): 학습에 투입한 연산량

L(N, D) ~ a/N^alpha + b/D^beta + c

핵심 통찰:
- 세 요소를 동시에 늘려야 효과적
- 모델만 키우고 데이터가 부족하면 비효율
- 데이터만 많고 모델이 작으면 한계
- 로그 스케일에서 거의 직선적으로 개선
`\`\`"""

new_scaling = """**2020년 OpenAI의 연구에서 발견:**

모델 성능(Loss)은 세 가지에 의해 예측 가능하게 개선됩니다:

| 요소 | 기호 | 의미 |
|------|------|------|
| 모델 크기 | N | 파라미터 수 |
| 데이터 크기 | D | 학습 토큰 수 |
| 컴퓨팅 | C | 학습에 투입한 연산량 |

**수식:** $L(N, D) \\sim \\frac{a}{N^{\\alpha}} + \\frac{b}{D^{\\beta}} + c$

**핵심 통찰:**
- 세 요소를 동시에 늘려야 효과적
- 모델만 키우고 데이터가 부족하면 비효율
- 데이터만 많고 모델이 작으면 한계
- 로그 스케일에서 거의 직선적으로 개선"""

if old_scaling in content:
    content = content.replace(old_scaling, new_scaling)
    conversions_made += 1
    print("✓ Converted Scaling Laws block")
else:
    print("⚠ Scaling Laws block not found")

# Conversion 2: Prompt Engineering techniques
old_prompt = r"""`\`\`text
1) Zero-shot: 예시 없이 직접 질문
   "다음 문장의 감성을 분석하세요: 이 영화 재미있어요"

2) Few-shot: 예시를 몇 개 제공
   "감성 분석을 합니다.
    입력: 맛있다 -> 긍정
    입력: 별로다 -> 부정
    입력: 최고다 -> ???"

3) Chain-of-Thought (CoT): 단계적 사고 유도
   "Step by step으로 생각해보세요.
    철수는 사과 3개를 가지고 있었습니다.
    영희에게 1개를 주고, 가게에서 2개를 샀습니다.
    철수가 가진 사과는 몇 개인가요?"

4) 역할 부여:
   "당신은 경험 많은 Python 개발자입니다.
    초보자에게 리스트 컴프리헨션을 설명해주세요."

5) 형식 지정:
   "다음 텍스트를 분석하고, JSON 형식으로 결과를 출력하세요."
`\`\`"""

new_prompt = """| 기법 | 설명 | 예시 |
|------|------|------|
| **Zero-shot** | 예시 없이 직접 질문 | "다음 문장의 감성을 분석하세요: 이 영화 재미있어요" |
| **Few-shot** | 예시를 몇 개 제공 | "감성 분석을 합니다.<br>입력: 맛있다 → 긍정<br>입력: 별로다 → 부정<br>입력: 최고다 → ???" |
| **Chain-of-Thought (CoT)** | 단계적 사고 유도 | "Step by step으로 생각해보세요.<br>철수는 사과 3개를 가지고 있었습니다.<br>영희에게 1개를 주고, 가게에서 2개를 샀습니다.<br>철수가 가진 사과는 몇 개인가요?" |
| **역할 부여** | AI에게 특정 역할 지정 | "당신은 경험 많은 Python 개발자입니다.<br>초보자에게 리스트 컴프리헨션을 설명해주세요." |
| **형식 지정** | 출력 형식 명시 | "다음 텍스트를 분석하고, JSON 형식으로 결과를 출력하세요." |"""

if old_prompt in content:
    content = content.replace(old_prompt, new_prompt)
    conversions_made += 1
    print("✓ Converted Prompt Engineering techniques")
else:
    print("⚠ Prompt Engineering techniques block not found")

# Conversion 3: LLM common structure
old_llm_struct = r"""`\`\`text
거의 모든 현대 LLM은 동일한 기본 구조를 공유합니다:

1) Decoder-only Transformer (GPT 스타일)
2) Next Token Prediction으로 Pre-training
3) SFT + RLHF (또는 유사한 정렬 기법)

차이점:
  - 모델 크기와 아키텍처 세부 사항
  - 학습 데이터의 구성과 양
  - 정렬(Alignment) 방법의 차이
  - 컨텍스트 윈도우 크기
  - 멀티모달 지원 여부
`\`\`"""

new_llm_struct = """> **거의 모든 현대 LLM은 동일한 기본 구조를 공유합니다:**
>
> 1. Decoder-only Transformer (GPT 스타일)
> 2. Next Token Prediction으로 Pre-training
> 3. SFT + RLHF (또는 유사한 정렬 기법)
>
> **차이점:**
> - 모델 크기와 아키텍처 세부 사항
> - 학습 데이터의 구성과 양
> - 정렬(Alignment) 방법의 차이
> - 컨텍스트 윈도우 크기
> - 멀티모달 지원 여부"""

if old_llm_struct in content:
    content = content.replace(old_llm_struct, new_llm_struct)
    conversions_made += 1
    print("✓ Converted LLM common structure")
else:
    print("⚠ LLM common structure block not found")

# Conversion 4: LLM limitations
old_limitations = r"""`\`\`text
1) 환각 (Hallucination)
   - 사실이 아닌 정보를 자신있게 생성
   - "서울 타워는 1975년에 건설되었습니다" (실제: 1969년 착공, 1975년 완공은 맞지만 세부 사실 오류 가능)

2) 지식 기한 (Knowledge Cutoff)
   - 학습 데이터 이후의 정보를 모름
   - 해결: RAG (검색 증강 생성), 웹 검색 연동

3) 추론 한계
   - 복잡한 수학, 논리 문제에서 실수
   - 해결: Chain-of-Thought, 도구 사용 (계산기 등)

4) 컨텍스트 길이 제한
   - 한 번에 처리할 수 있는 텍스트 양에 한계
   - 현재: 128K ~ 1M 토큰까지 확장 중
`\`\`"""

new_limitations = """> **1. 환각 (Hallucination)**
> - 사실이 아닌 정보를 자신있게 생성
> - 예: "서울 타워는 1975년에 건설되었습니다" (실제: 1969년 착공, 1975년 완공은 맞지만 세부 사실 오류 가능)
>
> **2. 지식 기한 (Knowledge Cutoff)**
> - 학습 데이터 이후의 정보를 모름
> - 해결: RAG (검색 증강 생성), 웹 검색 연동
>
> **3. 추론 한계**
> - 복잡한 수학, 논리 문제에서 실수
> - 해결: Chain-of-Thought, 도구 사용 (계산기 등)
>
> **4. 컨텍스트 길이 제한**
> - 한 번에 처리할 수 있는 텍스트 양에 한계
> - 현재: 128K ~ 1M 토큰까지 확장 중"""

if old_limitations in content:
    content = content.replace(old_limitations, new_limitations)
    conversions_made += 1
    print("✓ Converted LLM limitations")
else:
    print("⚠ LLM limitations block not found")

# Conversion 5: LLM development directions
old_development = r"""`\`\`text
1) 멀티모달 (Multimodal)
   - 텍스트 + 이미지 + 오디오 + 비디오 통합 처리
   - GPT-4o, Gemini 등이 선도

2) Agent (에이전트)
   - LLM이 도구를 사용하고, 계획을 세우고, 실행
   - 코드 실행, 웹 검색, 파일 조작 등

3) 더 효율적인 학습
   - 적은 데이터/컴퓨팅으로 더 좋은 성능
   - Mixture of Experts (MoE), 지식 증류

4) 더 나은 정렬 (Alignment)
   - RLHF를 넘어선 새로운 정렬 기법
   - Constitutional AI, Direct Preference Optimization (DPO)

5) 온디바이스 (On-device)
   - 스마트폰에서 직접 실행 가능한 소형 LLM
   - 프라이버시 보호, 오프라인 사용
`\`\`"""

new_development = """> **1. 멀티모달 (Multimodal)**
> - 텍스트 + 이미지 + 오디오 + 비디오 통합 처리
> - GPT-4o, Gemini 등이 선도
>
> **2. Agent (에이전트)**
> - LLM이 도구를 사용하고, 계획을 세우고, 실행
> - 코드 실행, 웹 검색, 파일 조작 등
>
> **3. 더 효율적인 학습**
> - 적은 데이터/컴퓨팅으로 더 좋은 성능
> - Mixture of Experts (MoE), 지식 증류
>
> **4. 더 나은 정렬 (Alignment)**
> - RLHF를 넘어선 새로운 정렬 기법
> - Constitutional AI, Direct Preference Optimization (DPO)
>
> **5. 온디바이스 (On-device)**
> - 스마트폰에서 직접 실행 가능한 소형 LLM
> - 프라이버시 보호, 오프라인 사용"""

if old_development in content:
    content = content.replace(old_development, new_development)
    conversions_made += 1
    print("✓ Converted LLM development directions")
else:
    print("⚠ LLM development directions block not found")

# Conversion 6: PyTorch CUDA check - change to python
old_pytorch = r"""`\`\`text
import torch

# CUDA 사용 가능 여부
print(f"CUDA available: {torch.cuda.is_available()}")

# CUDA 버전
print(f"CUDA version: {torch.version.cuda}")

# GPU 정보
if torch.cuda.is_available():
    print(f"GPU: {torch.cuda.get_device_name(0)}")
    print(f"GPU count: {torch.cuda.device_count()}")
`\`\`"""

new_pytorch = r"""`\`\`python
import torch

# CUDA 사용 가능 여부
print(f"CUDA available: {torch.cuda.is_available()}")

# CUDA 버전
print(f"CUDA version: {torch.version.cuda}")

# GPU 정보
if torch.cuda.is_available():
    print(f"GPU: {torch.cuda.get_device_name(0)}")
    print(f"GPU count: {torch.cuda.device_count()}")
`\`\`"""

if old_pytorch in content:
    content = content.replace(old_pytorch, new_pytorch)
    conversions_made += 1
    print("✓ Converted PyTorch CUDA check to python")
else:
    print("⚠ PyTorch CUDA check block not found")

# Conversion 7: Pipeline flow diagram - keep as plain ``` (no language)
old_pipeline = r"""`\`\`text
[입력 이미지] → [1단계: 번호판 검출] → [2단계: 문자 인식] → [결과 출력]
                  (Detection)            (Recognition)
                  YOLO 모델               CNN 모델
                  "어디에 있나?"           "뭐라고 쓰여 있나?"
`\`\`"""

new_pipeline = r"""`\`\`
[입력 이미지] → [1단계: 번호판 검출] → [2단계: 문자 인식] → [결과 출력]
                  (Detection)            (Recognition)
                  YOLO 모델               CNN 모델
                  "어디에 있나?"           "뭐라고 쓰여 있나?"
`\`\`"""

if old_pipeline in content:
    content = content.replace(old_pipeline, new_pipeline)
    conversions_made += 1
    print("✓ Converted pipeline flow diagram")
else:
    print("⚠ Pipeline flow diagram block not found")

# Conversion 8: LPR code structure - change to python
old_lpr_code = r"""`\`\`text
# 전체 파이프라인의 뼈대 (PyTorch + Ultralytics)
class LPRSystem:
    def __init__(self):
        self.detector = YOLO("best_detector.pt")
        self.recognizer = CharClassifier(num_classes=50)
        self.recognizer.load_state_dict(
            torch.load("char_classifier.pth")
        )
"""

new_lpr_code = r"""`\`\`python
# 전체 파이프라인의 뼈대 (PyTorch + Ultralytics)
class LPRSystem:
    def __init__(self):
        self.detector = YOLO("best_detector.pt")
        self.recognizer = CharClassifier(num_classes=50)
        self.recognizer.load_state_dict(
            torch.load("char_classifier.pth")
        )
"""

if old_lpr_code in content:
    content = content.replace(old_lpr_code, new_lpr_code)
    conversions_made += 1
    print("✓ Converted LPR code structure to python")
else:
    print("⚠ LPR code structure block not found")

# Write the file back
with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print(f"\n✅ Completed {conversions_made}/8 conversions!")
print(f"Updated file: {file_path}")
