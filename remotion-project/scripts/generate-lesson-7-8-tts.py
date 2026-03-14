import edge_tts
import asyncio
import os

VOICE = "ko-KR-SunHiNeural"
OUTPUT_DIR = "public/audio/lesson-7-8"

scripts = {
    "scene01_intro": "디코더 구조를 배워요! 인코더와 함께 트랜스포머를 완성하죠!",
    "scene02_compare": "인코더와 디코더 비교! 인코더는 입력을 이해해요! 디코더는 출력을 생성해요! 둘이 함께 일해요!",
    "scene03_structure": "디코더는 세 개의 서브레이어! Masked Self-Attention! Cross-Attention! Feed Forward Network! 각각 역할이 있어요!",
    "scene04_masked": "마스크드 셀프 어텐션! 미래를 가려요! 현재까지만 봐요! 치팅 방지에요!",
    "scene05_cross": "크로스 어텐션! 인코더 출력을 참조해요! 입력 정보를 가져와요! 번역에 중요해요!",
    "scene06_ffn": "피드포워드 네트워크! 인코더와 같아요! 확장하고 축소해요! 표현력을 높여요!",
    "scene07_autoregressive": "자기회귀 생성! 하나씩 출력해요! 이전 출력을 입력으로! 순차적으로 생성해요!",
    "scene08_gpt": "GPT는 디코더만 사용해요! 인코더가 없어요! 디코더만으로 구성돼요! 자기회귀로 생성해요! 텍스트 생성에 특화돼요!",
    "scene09_bert": "BERT는 인코더만 사용해요! 디코더가 없어요! 인코더만으로 구성돼요! 마스킹 없이 양방향! 문맥을 다 봐요! 문장 이해에 특화돼요! 분류, 질의응답에 좋아요!",
    "scene10_t5": "T5는 둘 다 사용해요! 인코더와 디코더 모두! 원래 트랜스포머 구조! 번역, 요약에 좋아요! 입력을 받아서 출력을 생성! 인코더-디코더 구조는요. Seq2Seq 작업에 적합해요!",
    "scene11_summary": "구조별 특징 정리! 인코더만: BERT! 양방향, 문맥 이해! 디코더만: GPT! 자기회귀, 텍스트 생성! 인코더-디코더: T5! 번역, 요약 등! 용도에 맞게 선택해요!",
    "scene12_outro": "오늘 배운 내용을 정리해요! 디코더는 세 개 서브레이어! Masked Attention, Cross-Attention, FFN! 마스킹으로 미래를 가려요! 자기회귀로 생성해요! GPT는 디코더만! BERT는 인코더만! T5는 둘 다! Level 7 트랜스포머 완료! 다음 레벨에서 더 배워요! 감사합니다!",
}

async def generate_tts():
    os.makedirs(OUTPUT_DIR, exist_ok=True)

    for name, text in scripts.items():
        output_path = os.path.join(OUTPUT_DIR, f"{name}.mp3")
        print(f"Generating: {name}")

        communicate = edge_tts.Communicate(text, VOICE)
        await communicate.save(output_path)
        print(f"  Saved: {output_path}")

if __name__ == "__main__":
    asyncio.run(generate_tts())
    print("\nAll audio files generated!")
