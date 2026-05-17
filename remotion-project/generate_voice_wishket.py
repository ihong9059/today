"""
위시캣 #155381 제안 동영상 TTS 합성
edge_tts — Microsoft Edge TTS 무료 한국어 여성 음성 (ko-KR-SunHiNeural)
9 Scene MP3 파일 생성 → public/audio/wishket155381/
"""
import edge_tts
import asyncio
from pathlib import Path

VOICE = "ko-KR-SunHiNeural"  # 여성 자연스러운 톤
RATE = "-5%"                  # 약간 천천히 (산업 자료 톤)

# 9 Scene 나레이션 (시나리오 md § 5와 동일)
SCRIPTS = {
    "scene1_opening": """
부스바 한 장에 들어가는 그 정밀한 결정을, 누가 책임지고 있습니까. 영 점 일 밀리미터 오차가 발열과 화재로 이어지는 산업 자동화 영역에서, 저희가 38년 누적한 양산 자산을 본 프로젝트에 그대로 이식할 수 있는 이유를, 5분만 시간 내어 주십시오.
""",

    "scene2_problem": """
현재 많은 부스바 가공 라인은 네 가지 한계를 가지고 있습니다. 첫째, 수동 좌표 입력에서 오기와 실수가 발생합니다. 둘째, 시각 검증이 없어 가공 후에야 재작업이 필요해집니다. 셋째, PC와 PLC 간 통신이 없어 모든 부담이 작업자에게 갑니다. 넷째, 산업 안전 인증이 부재하여 사고 위험이 누적됩니다. 부스바는 전기 배전반의 핵심 부품으로, 천공 위치 오차 영 점 삼 밀리미터가 발열과 화재로 이어집니다.
""",

    "scene3_solution": """
해결은 2-Layer 협업입니다. 위 층은 윈도우 PC 응용이 작업자 친화 UI 영역을 담당합니다. 좌표 입력, 시각화, 레시피 관리 영역입니다. 아래 층은 이미 세팅 완료된 LS XGT PLC가 실시간 모터 제어와 안전 인터록을 담당합니다. 두 시스템이 LS XGT FEnet 이더넷 프로토콜로 통신합니다. 각자 잘하는 영역에 집중하는, 산업 자동화 표준 구조입니다.
""",

    "scene4_vcut": """
본 프로젝트의 차별화 핵심은, 저희가 이미 양산 운영하고 있는 라즈베리파이 3 V-Cut 컨트롤러입니다. PCB 패널을 X와 Y 2축 좌표로 입력받아 절단하는 양산 제품입니다. 부스바 천공 가공과 X·Y 좌표 입력, 모터 제어, 시뮬레이션 검증, 작업자 확인 워크플로우가 100퍼센트 동일한 패턴입니다. 절단 가공을 천공 가공으로 변환하는 응용으로, 양산 코드의 약 60퍼센트를 그대로 재사용할 수 있습니다. 신규 개발이 30퍼센트로 줄어드는 만큼, 30일 일정의 신뢰성이 보장됩니다.
""",

    "scene5_lsxgt": """
공고 우대 사항인 LS산전 통신 프로토콜에 직접 대응 가능합니다. LS XGT FEnet 프로토콜은 헤더 20바이트와 ASCII 직접 변수 표기로 구성된 표준 산업 이더넷입니다. 공고에 명시된 M, K, L 비트 영역과 D 워드 영역은 LS XGT 표준이며, FEnet 모듈 TCP 포트 2004로 직접 통신합니다. 저희는 더 엄격한 실시간성을 요구하는 EtherCAT 100마이크로초 사이클을 라즈베리파이 CM4에서 양산 운영하고 있고, STM32F756 Modbus RTU는 KC 인증 양산까지 받은 상태입니다. LS XGT FEnet 1~10밀리초는 훨씬 단순한 처리에 해당합니다.
""",

    "scene6_visualization": """
또 하나의 우대 사항은 좌표 데이터 시각화 도구 개발 경험입니다. 저희 양산 자산 세 가지가 이 항목에 정확히 매칭됩니다. 첫째, 라즈베리파이 3 V-Cut 컨트롤러는 좌표 시각화 양산 운영 중입니다. 둘째, Three 점 제이에스 3D 모니터링 사이트는 24시간 무중단 운영입니다. 셋째, Canvas 2D 좌표 편집기도 양산 라인에 적용되어 있습니다. 본 프로젝트는 2D 시각화로 충분하므로, V-Cut 양산 자산을 그대로 이식하여 Week 2 안에 1차 모듈을 완성할 수 있습니다.
""",

    "scene7_safety": """
부스바 가공은 단순 제작이 아닌 전기 안전 직결 작업입니다. 천공 위치 오차, 지름 오차, 가장자리 거칠음 모두가 접촉 저항 증가와 발열, 그리고 화재로 이어질 수 있습니다. 저희는 양산 5종, 일본 시장 3,800대 운영, 한국 KC, 일본 TELEC, 유럽 CE 3개국 안전 인증을 보유하고 있습니다. 24시간 무중단 산업 모니터링도 1년 이상 운영 중입니다. 본 프로젝트의 시뮬레이션과 검증 워크플로우가 단순 편의가 아닌 안전 핵심 기능임을 정확히 이해하고 있습니다.
""",

    "scene8_schedule": """
30일 일정은 4주로 나뉘고, 매주 마일스톤별 25퍼센트씩 분할 청구합니다. Week 1은 설계, Week 2는 통신과 시각화 모듈 구현, Week 3은 통합과 시뮬레이션, Week 4는 인수와 매뉴얼입니다. 본 프로젝트는 2인 팀 수직 통합으로 진행됩니다. 임호균 38년 경력이 MFC GUI 프레임과 좌표 편집기를 담당하고, 홍광선 40년 경력이 LS XGT 통신과 Recipe 데이터베이스, 좌표 변환을 담당합니다. 양산 자산 70퍼센트 재사용으로 1인 60일 일정을 30일에 압축할 수 있습니다.
""",

    "scene9_closing": """
양산 자산이 부스바로. V-Cut 컨트롤러 60퍼센트 이식, LS XGT FEnet 직접 구현, KC와 CE 안전 인증 양산. 30일 후 인도드립니다. 미팅에서 뵙겠습니다.
""",
}


async def synthesize_one(name: str, text: str, out_dir: Path):
    out_path = out_dir / f"{name}.mp3"
    communicate = edge_tts.Communicate(text.strip(), VOICE, rate=RATE)
    await communicate.save(str(out_path))
    print(f"  ✓ {name}.mp3 — {len(text.strip())} chars")
    return out_path


async def main():
    out_dir = Path(__file__).parent / "public" / "audio" / "wishket155381"
    out_dir.mkdir(parents=True, exist_ok=True)

    print(f"위시캣 #155381 TTS 합성 시작 — 음성: {VOICE} · 속도: {RATE}")
    print(f"출력: {out_dir}")
    print()

    for name, script in SCRIPTS.items():
        await synthesize_one(name, script, out_dir)

    print()
    print(f"✓ 9개 MP3 파일 생성 완료 — {out_dir}")


if __name__ == "__main__":
    asyncio.run(main())
