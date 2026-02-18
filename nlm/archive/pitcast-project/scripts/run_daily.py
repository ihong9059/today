"""
Daily Pitcast Generator - 메인 실행 스크립트

매일 오전 8시에 실행되어:
1. 등록된 유튜버 채널에서 24시간 이내 영상 수집
2. 자막 추출 및 요약 생성
3. NotebookLM으로 종합 팟캐스트 생성

Usage:
    python run_daily.py
    python run_daily.py --hours 48  # 48시간 이내 영상 수집
    python run_daily.py --test      # 테스트 모드 (팟캐스트 생성 건너뛰기)
"""

import argparse
import logging
import sys
from datetime import datetime
from pathlib import Path

# 프로젝트 루트를 path에 추가
PROJECT_ROOT = Path(__file__).parent.parent
sys.path.insert(0, str(PROJECT_ROOT))

from agents.research_agent import ResearchAgent
from agents.synthesis_agent import SynthesisAgent


def setup_logging(log_dir: Path) -> logging.Logger:
    """로깅 설정"""
    log_dir.mkdir(parents=True, exist_ok=True)

    log_file = log_dir / f"{datetime.now().strftime('%Y-%m-%d')}.log"

    logging.basicConfig(
        level=logging.INFO,
        format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
        handlers=[
            logging.FileHandler(log_file, encoding='utf-8'),
            logging.StreamHandler()
        ]
    )

    return logging.getLogger(__name__)


def main():
    parser = argparse.ArgumentParser(description='Daily Pitcast Generator')
    parser.add_argument('--hours', type=int, default=24,
                        help='Hours to look back for videos (default: 24)')
    parser.add_argument('--test', action='store_true',
                        help='Test mode - skip podcast generation')
    parser.add_argument('--channels', type=str,
                        help='Path to channels.json (default: config/channels.json)')

    args = parser.parse_args()

    # 경로 설정
    config_path = Path(args.channels) if args.channels else PROJECT_ROOT / "config" / "channels.json"
    output_dir = PROJECT_ROOT / "output"
    log_dir = PROJECT_ROOT / "logs"

    # 로깅 설정
    logger = setup_logging(log_dir)
    logger.info("=" * 60)
    logger.info(f"Daily Pitcast Generator started at {datetime.now()}")
    logger.info(f"Looking back {args.hours} hours for videos")
    logger.info("=" * 60)

    # 설정 파일 확인
    if not config_path.exists():
        logger.error(f"Config file not found: {config_path}")
        sys.exit(1)

    try:
        # Phase 1: Research - 영상 수집 및 자막 추출
        logger.info("Phase 1: Research Agent - Collecting videos and transcripts")
        research_agent = ResearchAgent(
            config_path=str(config_path),
            output_dir=str(output_dir)
        )

        # 설정에서 lookback 시간 오버라이드
        research_agent.config['settings']['hours_lookback'] = args.hours

        summaries = research_agent.run()

        if not summaries:
            logger.warning("No videos found in the specified time period")
            logger.info("Exiting - no content to create podcast from")
            return

        logger.info(f"Research complete: {len(summaries)} videos processed")

        # 테스트 모드면 여기서 종료
        if args.test:
            logger.info("Test mode - skipping podcast generation")
            logger.info("Collected videos:")
            for s in summaries:
                logger.info(f"  - [{s.get('channel')}] {s.get('title')}")
            return

        # Phase 2: Synthesis - 팟캐스트 생성
        logger.info("Phase 2: Synthesis Agent - Creating podcast")
        synthesis_agent = SynthesisAgent(output_dir=str(output_dir))

        today = datetime.now().strftime('%Y-%m-%d')
        podcast_title = f"AI Creators Daily - {today}"

        podcast_path = synthesis_agent.run(summaries, podcast_title)

        if podcast_path:
            logger.info(f"SUCCESS! Podcast created: {podcast_path}")
        else:
            logger.error("Failed to create podcast")
            sys.exit(1)

    except Exception as e:
        logger.exception(f"Fatal error: {e}")
        sys.exit(1)

    logger.info("=" * 60)
    logger.info(f"Daily Pitcast Generator completed at {datetime.now()}")
    logger.info("=" * 60)


if __name__ == "__main__":
    main()
