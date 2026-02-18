#!/usr/bin/env python3
"""
YouTube Slide Agent - 일일 실행 스크립트

유튜브 채널에서 최신 영상을 수집하고 NotebookLM으로 분석하여
PPTX 슬라이드를 자동 생성합니다.
"""

import argparse
import json
import logging
import sys
from datetime import datetime
from pathlib import Path

# 프로젝트 루트를 path에 추가
project_root = Path(__file__).parent.parent
sys.path.insert(0, str(project_root))

from agents.research_agent import ResearchAgent
from agents.synthesis_agent import SynthesisAgent
from agents.slide_generator import SlideGenerator


def setup_logging(log_dir: Path, verbose: bool = False):
    """로깅 설정"""
    log_dir.mkdir(parents=True, exist_ok=True)

    log_level = logging.DEBUG if verbose else logging.INFO
    log_file = log_dir / f"{datetime.now().strftime('%Y-%m-%d')}.log"

    logging.basicConfig(
        level=log_level,
        format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
        handlers=[
            logging.FileHandler(log_file, encoding='utf-8'),
            logging.StreamHandler()
        ]
    )

    return logging.getLogger(__name__)


def run_pipeline(
    config_path: Path,
    output_dir: Path,
    notebook_url: str = None,
    use_notebooklm: bool = True,
    skip_research: bool = False,
    research_result_path: str = None
):
    """
    전체 파이프라인 실행

    Args:
        config_path: 채널 설정 파일 경로
        output_dir: 출력 디렉토리
        notebook_url: NotebookLM 노트북 URL (선택)
        use_notebooklm: NotebookLM 사용 여부
        skip_research: 리서치 단계 건너뛰기 (이전 결과 사용)
        research_result_path: 사용할 리서치 결과 파일 경로
    """
    logger = logging.getLogger(__name__)
    logger.info("=" * 60)
    logger.info("YouTube Slide Agent - Starting Pipeline")
    logger.info("=" * 60)

    summaries = []

    # 1. Research Agent 실행
    if skip_research and research_result_path:
        logger.info(f"Loading previous research result: {research_result_path}")
        with open(research_result_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
            summaries = data.get('summaries', [])
    else:
        logger.info("Step 1: Running Research Agent...")
        research_agent = ResearchAgent(
            config_path=str(config_path),
            output_dir=str(output_dir)
        )
        summaries = research_agent.run()

    if not summaries:
        logger.warning("No videos found in the specified time range. Exiting.")
        return None

    logger.info(f"Found {len(summaries)} videos to process")

    # 2. Synthesis Agent 실행
    logger.info("Step 2: Running Synthesis Agent...")
    synthesis_agent = SynthesisAgent(output_dir=str(output_dir))
    slide_content = synthesis_agent.run(
        summaries=summaries,
        notebook_url=notebook_url,
        use_notebooklm=use_notebooklm
    )

    if not slide_content:
        logger.error("Failed to generate slide content")
        return None

    # 3. Slide Generator 실행
    logger.info("Step 3: Generating PPTX slides...")
    slide_generator = SlideGenerator(output_dir=str(output_dir))
    pptx_path = slide_generator.create_presentation(slide_content)

    if pptx_path:
        logger.info(f"Successfully created presentation: {pptx_path}")

        # 결과 요약
        result = {
            'date': datetime.now().isoformat(),
            'videos_processed': len(summaries),
            'pptx_path': pptx_path,
            'combined_document': slide_content.get('combined_document'),
            'channels': list(set(s.get('channel') for s in summaries if s.get('channel')))
        }

        result_path = output_dir / f"pipeline_result_{datetime.now().strftime('%Y%m%d_%H%M%S')}.json"
        with open(result_path, 'w', encoding='utf-8') as f:
            json.dump(result, f, ensure_ascii=False, indent=2)

        logger.info("=" * 60)
        logger.info("Pipeline Complete!")
        logger.info(f"- Videos processed: {len(summaries)}")
        logger.info(f"- Presentation: {pptx_path}")
        logger.info("=" * 60)

        return result

    logger.error("Failed to create presentation")
    return None


def main():
    parser = argparse.ArgumentParser(
        description='YouTube Slide Agent - 유튜브 영상 분석 및 슬라이드 생성'
    )

    parser.add_argument(
        '--config',
        type=str,
        default='config/channels.json',
        help='채널 설정 파일 경로 (default: config/channels.json)'
    )

    parser.add_argument(
        '--output',
        type=str,
        default='output',
        help='출력 디렉토리 (default: output)'
    )

    parser.add_argument(
        '--notebook-url',
        type=str,
        help='NotebookLM 노트북 URL (선택)'
    )

    parser.add_argument(
        '--no-notebooklm',
        action='store_true',
        help='NotebookLM 사용 안함 (직접 분석)'
    )

    parser.add_argument(
        '--skip-research',
        action='store_true',
        help='리서치 단계 건너뛰기'
    )

    parser.add_argument(
        '--research-result',
        type=str,
        help='사용할 리서치 결과 파일 경로 (--skip-research와 함께 사용)'
    )

    parser.add_argument(
        '--verbose', '-v',
        action='store_true',
        help='상세 로그 출력'
    )

    args = parser.parse_args()

    # 경로 설정
    project_root = Path(__file__).parent.parent
    config_path = project_root / args.config
    output_dir = project_root / args.output
    log_dir = project_root / "logs"

    # 로깅 설정
    logger = setup_logging(log_dir, args.verbose)

    # 설정 파일 확인
    if not config_path.exists():
        logger.error(f"Config file not found: {config_path}")
        sys.exit(1)

    # 파이프라인 실행
    result = run_pipeline(
        config_path=config_path,
        output_dir=output_dir,
        notebook_url=args.notebook_url,
        use_notebooklm=not args.no_notebooklm,
        skip_research=args.skip_research,
        research_result_path=args.research_result
    )

    if result:
        print(f"\n✅ Presentation created: {result['pptx_path']}")
        sys.exit(0)
    else:
        print("\n❌ Failed to create presentation")
        sys.exit(1)


if __name__ == "__main__":
    main()
