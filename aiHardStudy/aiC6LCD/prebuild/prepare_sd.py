#!/usr/bin/env python3
"""
SD 카드 데이터 준비 스크립트
firmware_db/ → sd_card/ 구조로 복사 (firmware + code + guide + catalog)

Usage:
    python prepare_sd.py                    # sd_card/ 폴더에 준비
    python prepare_sd.py --sd-path D:/      # 실제 SD 카드 경로 지정
    python prepare_sd.py --gen-guides       # guide.json도 생성 (간단 버전)
"""
import argparse, json, shutil
from pathlib import Path

SCRIPT_DIR = Path(__file__).parent
FIRMWARE_DB = SCRIPT_DIR / "firmware_db"
CATALOG_FILE = SCRIPT_DIR / "catalog_source.json"


def generate_simple_guide(item: dict, code: str) -> dict:
    """Claude 호출 없이 간단한 가이드 생성"""
    lines = [l.strip() for l in code.split("\n") if l.strip() and not l.strip().startswith("//")]
    highlights = []
    for l in code.split("\n"):
        if "//" in l and "[" in l:
            comment = l.split("//")[1].strip()
            highlights.append({"line": l.split("//")[0].strip(), "comment": comment})
    if not highlights and lines:
        highlights = [{"line": lines[min(3, len(lines)-1)], "comment": "핵심 코드"}]

    components = item.get("components", [])
    concepts = []
    comp_concepts = {
        "ws2812": {"term": "WS2812 RGB LED", "explanation": "빨강/초록/파랑을 섞어서 모든 색을 만드는 LED"},
        "lcd": {"term": "LCD 디스플레이", "explanation": "작은 화면에 글자와 그림을 보여주는 장치"},
        "button": {"term": "버튼 입력", "explanation": "버튼을 누르면 보드에 신호를 보내는 장치"},
        "wifi": {"term": "WiFi 무선통신", "explanation": "인터넷 없이도 기기끼리 무선으로 연결하는 기술"},
        "ble": {"term": "BLE 블루투스", "explanation": "스마트폰과 가까운 거리에서 무선 통신하는 기술"},
        "sd": {"term": "SD 카드 저장", "explanation": "데이터를 파일로 저장하는 작은 메모리 카드"},
    }
    for c in components:
        if c in comp_concepts:
            concepts.append(comp_concepts[c])

    return {
        "result_description": item["description"],
        "what_happens": [
            "보드가 초기화됩니다 (LCD, LED, BLE 시작)",
            item["description"],
            "프로그램이 계속 실행됩니다"
        ],
        "concepts": concepts,
        "code_highlights": highlights[:3],
        "try_next": [{"reason": "색상이나 숫자를 바꿔보세요"}, {"reason": "다른 예시와 비교해보세요"}],
        "quiz": {
            "question": f"이 프로그램은 무엇을 하나요?",
            "options": [
                item["description"],
                "아무것도 하지 않습니다",
                "보드를 끕니다",
                "인터넷에 연결합니다"
            ],
            "answer": 0,
            "explanation": item["description"]
        }
    }


def prepare_sd(sd_path: Path, gen_guides: bool = True):
    sd_path.mkdir(parents=True, exist_ok=True)

    # 카탈로그 로드
    catalog_path = FIRMWARE_DB / "catalog.json"
    if not catalog_path.exists():
        print("ERROR: catalog.json not found. Run build first.")
        return

    catalog = json.loads(catalog_path.read_text(encoding="utf-8"))
    source_items = {}
    with open(CATALOG_FILE, "r", encoding="utf-8") as f:
        for item in json.load(f)["items"]:
            source_items[item["no"]] = item

    # 디렉토리 생성
    (sd_path / "firmware").mkdir(exist_ok=True)
    (sd_path / "code").mkdir(exist_ok=True)
    (sd_path / "guide").mkdir(exist_ok=True)

    copied = 0
    for item in catalog["items"]:
        no = item["no"]
        item_dir = FIRMWARE_DB / no

        # firmware.bin → /firmware/{no}.bin
        fw = item_dir / "firmware.bin"
        if fw.exists():
            shutil.copy2(fw, sd_path / "firmware" / f"{no}.bin")
        else:
            print(f"  SKIP {no}: no firmware.bin")
            continue

        # code.ino → /code/{no}.ino
        code_file = item_dir / "code.ino"
        if code_file.exists():
            shutil.copy2(code_file, sd_path / "code" / f"{no}.ino")

        # guide.json → /guide/{no}.json
        guide_file = item_dir / "guide.json"
        if guide_file.exists():
            shutil.copy2(guide_file, sd_path / "guide" / f"{no}.json")
        elif gen_guides and code_file.exists():
            # 간단 가이드 자동 생성
            src = source_items.get(no, item)
            code = code_file.read_text(encoding="utf-8")
            guide = generate_simple_guide(src, code)
            guide_path = sd_path / "guide" / f"{no}.json"
            guide_path.write_text(json.dumps(guide, ensure_ascii=False, indent=2), encoding="utf-8")
            # firmware_db에도 저장
            (item_dir / "guide.json").write_text(
                json.dumps(guide, ensure_ascii=False, indent=2), encoding="utf-8")

        copied += 1

    # catalog.json 복사
    shutil.copy2(catalog_path, sd_path / "catalog.json")

    # 통계
    fw_count = len(list((sd_path / "firmware").glob("*.bin")))
    code_count = len(list((sd_path / "code").glob("*.ino")))
    guide_count = len(list((sd_path / "guide").glob("*.json")))
    total_size = sum(f.stat().st_size for f in sd_path.rglob("*") if f.is_file())

    print(f"\nSD Card prepared: {sd_path}")
    print(f"  Firmware: {fw_count} files")
    print(f"  Code:     {code_count} files")
    print(f"  Guide:    {guide_count} files")
    print(f"  Total:    {total_size / 1024 / 1024:.1f} MB")


def main():
    parser = argparse.ArgumentParser(description="Prepare SD card data")
    parser.add_argument("--sd-path", type=str, default=None, help="SD card path (default: sd_card/ in prebuild)")
    parser.add_argument("--gen-guides", action="store_true", default=True, help="Generate simple guides")
    parser.add_argument("--no-guides", action="store_true", help="Skip guide generation")
    args = parser.parse_args()

    sd_path = Path(args.sd_path) if args.sd_path else SCRIPT_DIR / "sd_card"
    gen_guides = not args.no_guides

    print("=" * 50)
    print("UTTEC C6-LCD SD Card Preparation")
    print("=" * 50)
    prepare_sd(sd_path, gen_guides)


if __name__ == "__main__":
    main()
