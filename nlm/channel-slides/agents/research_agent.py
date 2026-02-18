"""
Research Agent - 유튜브 채널에서 최신 영상 수집 및 자막 추출
3일 이내 영상 5개 이하시 7일로 자동 확대
"""

import json
import subprocess
import re
from datetime import datetime, timedelta
from pathlib import Path
from typing import Optional
import logging

logger = logging.getLogger(__name__)


class ResearchAgent:
    """유튜브 채널 리서치 에이전트"""

    def __init__(self, config_path: str, output_dir: str):
        self.config_path = Path(config_path)
        self.output_dir = Path(output_dir)
        self.transcripts_dir = self.output_dir / "transcripts"
        self.summaries_dir = self.output_dir / "summaries"
        self.config = self._load_config()

        # 출력 디렉토리 생성
        self.transcripts_dir.mkdir(parents=True, exist_ok=True)
        self.summaries_dir.mkdir(parents=True, exist_ok=True)

    def _load_config(self) -> dict:
        """채널 설정 로드"""
        with open(self.config_path, 'r', encoding='utf-8') as f:
            return json.load(f)

    def get_recent_videos(self, channel_url: str, channel_name: str,
                          hours_lookback: int = 72, min_videos: int = 5) -> tuple[list[dict], int]:
        """
        채널에서 최근 영상 목록 가져오기
        3일(72시간) 이내 영상이 min_videos 이하면 7일(168시간)로 확대

        Returns:
            tuple: (영상 목록, 실제 사용된 hours_lookback)
        """
        videos = self._fetch_videos(channel_url, channel_name, hours_lookback)

        # 3일 이내 영상이 min_videos 이하면 7일로 확대
        if len(videos) < min_videos and hours_lookback < 168:
            logger.info(f"  Only {len(videos)} videos in {hours_lookback}h. Expanding to 168h (7 days)...")
            videos = self._fetch_videos(channel_url, channel_name, 168)
            return videos, 168

        return videos, hours_lookback

    def _fetch_videos(self, channel_url: str, channel_name: str, hours_lookback: int) -> list[dict]:
        """실제 영상 목록 가져오기"""
        try:
            # 채널에서 최근 영상 ID 목록 가져오기
            cmd = [
                'yt-dlp',
                '--flat-playlist',
                '--playlist-end', '15',
                '--print', '%(id)s',
                f'{channel_url}/videos'
            ]

            result = subprocess.run(cmd, capture_output=True, text=True, timeout=60)

            if result.returncode != 0:
                logger.error(f"yt-dlp error: {result.stderr}")
                return []

            video_ids = [vid.strip() for vid in result.stdout.strip().split('\n') if vid.strip()]

            if not video_ids:
                return []

            # 각 영상의 상세 정보 가져오기
            videos = []
            cutoff_date = datetime.now() - timedelta(hours=hours_lookback)
            max_videos = self.config.get('settings', {}).get('max_videos_per_channel', 10)

            for video_id in video_ids[:max_videos]:
                video_url = f'https://www.youtube.com/watch?v={video_id}'

                info_cmd = [
                    'yt-dlp',
                    '--skip-download',
                    '--print', '%(id)s|%(title)s|%(upload_date)s|%(duration_string)s',
                    video_url
                ]

                info_result = subprocess.run(info_cmd, capture_output=True, text=True, timeout=30)

                if info_result.returncode != 0:
                    continue

                line = info_result.stdout.strip()
                if not line or '|' not in line:
                    continue

                parts = line.split('|')
                if len(parts) >= 3:
                    vid = parts[0]
                    title = parts[1]
                    upload_date_str = parts[2]
                    duration = parts[3] if len(parts) > 3 else 'N/A'

                    try:
                        if upload_date_str and upload_date_str != 'NA':
                            upload_date = datetime.strptime(upload_date_str, '%Y%m%d')

                            if upload_date >= cutoff_date:
                                videos.append({
                                    'id': vid,
                                    'title': title,
                                    'upload_date': upload_date.isoformat(),
                                    'upload_date_str': upload_date_str,
                                    'duration': duration,
                                    'channel': channel_name,
                                    'url': video_url
                                })
                                logger.info(f"    Found: {title[:50]}... ({upload_date_str})")
                    except ValueError:
                        continue

            return videos

        except subprocess.TimeoutExpired:
            logger.error(f"Timeout while fetching videos from {channel_url}")
            return []
        except Exception as e:
            logger.error(f"Error fetching videos: {e}")
            return []

    def extract_transcript(self, video_url: str, video_id: str, lang: str = 'en') -> Optional[str]:
        """영상에서 자막 추출"""
        output_path = self.transcripts_dir / f"{video_id}"

        try:
            cmd = [
                'yt-dlp',
                '--write-subs',
                '--write-auto-subs',
                '--sub-langs', f'{lang},-live_chat',
                '--sub-format', 'vtt',
                '--skip-download',
                '-o', str(output_path),
                video_url
            ]

            subprocess.run(cmd, capture_output=True, text=True, timeout=120)

            # 자막 파일 찾기
            vtt_files = list(self.transcripts_dir.glob(f"{video_id}*.vtt"))
            srt_files = list(self.transcripts_dir.glob(f"{video_id}*.srt"))

            all_sub_files = vtt_files + srt_files

            if all_sub_files:
                sub_path = all_sub_files[0]
                if sub_path.suffix == '.vtt':
                    return self._parse_vtt(sub_path)
                else:
                    return self._parse_srt(sub_path)
            else:
                # fallback 언어
                fallback_lang = self.config.get('settings', {}).get('fallback_language', 'ko')
                if lang != fallback_lang:
                    return self.extract_transcript(video_url, video_id, fallback_lang)
                return None

        except Exception as e:
            logger.error(f"Error extracting transcript: {e}")
            return None

    def _parse_vtt(self, vtt_path: Path) -> str:
        """VTT 파일을 텍스트로 변환"""
        with open(vtt_path, 'r', encoding='utf-8') as f:
            content = f.read()

        lines = []
        for line in content.split('\n'):
            if '-->' in line or line.startswith('WEBVTT') or line.startswith('Kind:') or line.startswith('Language:'):
                continue
            if line.strip().isdigit():
                continue
            text = re.sub(r'<[^>]+>', '', line)
            if text.strip():
                lines.append(text.strip())

        return ' '.join(lines)

    def _parse_srt(self, srt_path: Path) -> str:
        """SRT 파일을 텍스트로 변환"""
        with open(srt_path, 'r', encoding='utf-8') as f:
            content = f.read()

        lines = []
        for block in content.split('\n\n'):
            block_lines = block.strip().split('\n')
            if len(block_lines) >= 3:
                text_lines = block_lines[2:]
                text = ' '.join(text_lines)
                text = re.sub(r'<[^>]+>', '', text)
                if text.strip():
                    lines.append(text.strip())

        return ' '.join(lines)

    def create_summary(self, video_info: dict, transcript: str) -> dict:
        """영상 요약 정보 생성"""
        summary = {
            'video_id': video_info['id'],
            'title': video_info['title'],
            'channel': video_info.get('channel', 'Unknown'),
            'url': video_info['url'],
            'upload_date': video_info['upload_date'],
            'duration': video_info.get('duration', 'N/A'),
            'transcript': transcript,
            'transcript_length': len(transcript),
            'processed_at': datetime.now().isoformat()
        }

        # 요약 파일 저장
        summary_path = self.summaries_dir / f"{video_info['id']}_summary.json"
        with open(summary_path, 'w', encoding='utf-8') as f:
            json.dump(summary, f, ensure_ascii=False, indent=2)

        return summary

    def run(self) -> dict[str, list[dict]]:
        """
        리서치 에이전트 실행
        채널별로 영상 수집 및 자막 추출

        Returns:
            dict: {channel_name: [summaries]}
        """
        channel_summaries = {}
        settings = self.config.get('settings', {})
        hours_lookback = settings.get('hours_lookback', 72)  # 기본 3일
        min_videos = settings.get('min_videos_for_expand', 5)
        subtitle_lang = settings.get('subtitle_language', 'en')

        for channel in self.config.get('channels', []):
            if not channel.get('enabled', True):
                logger.info(f"Skipping disabled channel: {channel['name']}")
                continue

            channel_name = channel['name']
            logger.info(f"\n{'='*50}")
            logger.info(f"Processing channel: {channel_name}")
            logger.info(f"{'='*50}")

            # 최근 영상 가져오기 (자동 확대 포함)
            videos, actual_hours = self.get_recent_videos(
                channel['url'],
                channel_name,
                hours_lookback,
                min_videos
            )
            logger.info(f"Found {len(videos)} videos (lookback: {actual_hours}h)")

            summaries = []
            for video in videos:
                logger.info(f"  Processing: {video['title'][:40]}...")

                # 자막 추출
                transcript = self.extract_transcript(
                    video['url'],
                    video['id'],
                    subtitle_lang
                )

                if transcript:
                    summary = self.create_summary(video, transcript)
                    summaries.append(summary)
                    logger.info(f"    ✓ Transcript extracted ({len(transcript)} chars)")
                else:
                    logger.warning(f"    ✗ No transcript available")

            channel_summaries[channel_name] = summaries
            logger.info(f"Channel complete: {len(summaries)} videos processed")

        # 전체 결과 저장
        result_path = self.output_dir / f"research_result_{datetime.now().strftime('%Y%m%d_%H%M%S')}.json"
        with open(result_path, 'w', encoding='utf-8') as f:
            json.dump({
                'processed_at': datetime.now().isoformat(),
                'channels': {name: len(sums) for name, sums in channel_summaries.items()},
                'channel_summaries': channel_summaries
            }, f, ensure_ascii=False, indent=2)

        total = sum(len(s) for s in channel_summaries.values())
        logger.info(f"\n{'='*50}")
        logger.info(f"Research complete. Total: {total} videos from {len(channel_summaries)} channels")
        logger.info(f"{'='*50}")

        return channel_summaries


if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO, format='%(message)s')

    base_dir = Path(__file__).parent.parent
    agent = ResearchAgent(
        config_path=base_dir / "config" / "channels.json",
        output_dir=base_dir / "output"
    )

    results = agent.run()
    for channel, summaries in results.items():
        print(f"{channel}: {len(summaries)} videos")
