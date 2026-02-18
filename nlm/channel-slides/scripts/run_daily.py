"""
Channel Slides Daily Runner
유튜버별 슬라이드 자동 생성 스크립트

사용법:
    python scripts/run_daily.py
    python scripts/run_daily.py --no-notebooklm
"""

import argparse
import json
import logging
import sys
from datetime import datetime
from pathlib import Path

# 프로젝트 경로 추가
PROJECT_ROOT = Path(__file__).parent.parent
sys.path.insert(0, str(PROJECT_ROOT))

from agents import ResearchAgent, SynthesisAgent, SlideGenerator

# 로깅 설정
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s | %(message)s',
    datefmt='%H:%M:%S'
)
logger = logging.getLogger(__name__)


def run_pipeline(use_notebooklm: bool = True, notebook_urls: dict = None):
    """
    전체 파이프라인 실행

    1. ResearchAgent: 채널별 영상 수집 및 자막 추출
    2. SynthesisAgent: NotebookLM으로 종합 분석 (또는 기본 분석)
    3. SlideGenerator: 채널별 PPTX 생성 (최대 10장)
    """
    config_path = PROJECT_ROOT / "config" / "channels.json"
    output_dir = PROJECT_ROOT / "output"

    logger.info("=" * 60)
    logger.info("Channel Slides Pipeline Started")
    logger.info(f"Date: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    logger.info(f"NotebookLM: {'Enabled' if use_notebooklm else 'Disabled'}")
    logger.info("=" * 60)

    # 1. Research Phase
    logger.info("\n[Phase 1] Research - Collecting videos and transcripts")
    logger.info("-" * 50)

    research_agent = ResearchAgent(
        config_path=str(config_path),
        output_dir=str(output_dir)
    )
    channel_summaries = research_agent.run()

    if not channel_summaries:
        logger.error("No videos collected. Aborting.")
        return None

    total_videos = sum(len(s) for s in channel_summaries.values())
    logger.info(f"\nResearch complete: {total_videos} videos from {len(channel_summaries)} channels")

    # 2. Synthesis Phase
    logger.info("\n[Phase 2] Synthesis - Analyzing content")
    logger.info("-" * 50)

    synthesis_agent = SynthesisAgent(output_dir=str(output_dir))

    slide_contents = synthesis_agent.run(
        channel_summaries=channel_summaries,
        notebook_urls=notebook_urls
    )

    if not slide_contents:
        logger.error("Synthesis failed. Aborting.")
        return None

    # 3. Slide Generation Phase
    logger.info("\n[Phase 3] Slide Generation - Creating PPTX files")
    logger.info("-" * 50)

    slide_generator = SlideGenerator(output_dir=str(output_dir))
    pptx_paths = slide_generator.create_all_presentations(slide_contents)

    # 결과 요약
    logger.info("\n" + "=" * 60)
    logger.info("Pipeline Complete!")
    logger.info("=" * 60)

    logger.info(f"\nGenerated {len(pptx_paths)} presentations:")
    for channel, path in pptx_paths.items():
        logger.info(f"  ✓ {channel}: {Path(path).name}")

    # 결과 저장
    result = {
        'timestamp': datetime.now().isoformat(),
        'channels_processed': len(channel_summaries),
        'total_videos': total_videos,
        'presentations': pptx_paths,
        'use_notebooklm': use_notebooklm
    }

    result_path = output_dir / f"pipeline_result_{datetime.now().strftime('%Y%m%d_%H%M%S')}.json"
    with open(result_path, 'w', encoding='utf-8') as f:
        json.dump(result, f, ensure_ascii=False, indent=2)

    logger.info(f"\nResult saved: {result_path.name}")
    logger.info(f"Output directory: {output_dir}")

    return result


def main():
    parser = argparse.ArgumentParser(description='Channel Slides Daily Runner')
    parser.add_argument(
        '--no-notebooklm',
        action='store_true',
        help='Skip NotebookLM analysis (use basic analysis instead)'
    )

    args = parser.parse_args()

    try:
        result = run_pipeline(
            use_notebooklm=not args.no_notebooklm
        )

        if result:
            logger.info("\n✓ All tasks completed successfully!")
            sys.exit(0)
        else:
            logger.error("\n✗ Pipeline failed")
            sys.exit(1)

    except KeyboardInterrupt:
        logger.info("\nPipeline interrupted by user")
        sys.exit(130)
    except Exception as e:
        logger.exception(f"\nPipeline error: {e}")
        sys.exit(1)


if __name__ == "__main__":
    main()
