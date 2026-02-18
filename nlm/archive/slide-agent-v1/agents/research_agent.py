"""
Research Agent - 유튜브 채널에서 최신 영상 수집 및 자막 추출
"""

import json
import subprocess
import os
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

    def get_recent_videos(self, channel_url: str, hours_lookback: int = 24) -> list[dict]:
        """
        채널에서 최근 영상 목록 가져오기
        yt-dlp를 사용하여 채널의 최신 영상들을 조회
        """
        try:
            # Step 1: 채널에서 최근 영상 ID 목록 가져오기 (flat-playlist)
            cmd = [
                'yt-dlp',
                '--flat-playlist',
                '--playlist-end', '10',
                '--print', '%(id)s',
                f'{channel_url}/videos'
            ]

            result = subprocess.run(
                cmd,
                capture_output=True,
                text=True,
                timeout=60
            )

            if result.returncode != 0:
                logger.error(f"yt-dlp error: {result.stderr}")
                return []

            video_ids = [vid.strip() for vid in result.stdout.strip().split('\n') if vid.strip()]

            if not video_ids:
                return []

            # Step 2: 각 영상의 상세 정보 가져오기 (날짜 포함)
            videos = []
            cutoff_date = datetime.now() - timedelta(hours=hours_lookback)
            max_videos = self.config.get('settings', {}).get('max_videos_per_channel', 5)

            for video_id in video_ids[:max_videos]:
                video_url = f'https://www.youtube.com/watch?v={video_id}'

                # 개별 영상 정보 가져오기
                info_cmd = [
                    'yt-dlp',
                    '--skip-download',
                    '--print', '%(id)s|%(title)s|%(upload_date)s|%(duration_string)s|%(channel)s',
                    video_url
                ]

                info_result = subprocess.run(
                    info_cmd,
                    capture_output=True,
                    text=True,
                    timeout=30
                )

                if info_result.returncode != 0:
                    logger.warning(f"Failed to get info for {video_id}")
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
                    channel_name = parts[4] if len(parts) > 4 else 'Unknown'

                    # 업로드 날짜 파싱 (YYYYMMDD 형식)
                    try:
                        if upload_date_str and upload_date_str != 'NA':
                            upload_date = datetime.strptime(upload_date_str, '%Y%m%d')

                            # hours_lookback 이내 영상만 필터링
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
                                logger.info(f"  Found recent video: {title} ({upload_date_str})")
                            else:
                                logger.debug(f"  Skipping old video: {title} ({upload_date_str})")
                    except ValueError as e:
                        logger.warning(f"Date parsing error for {video_id}: {e}")
                        continue

            return videos

        except subprocess.TimeoutExpired:
            logger.error(f"Timeout while fetching videos from {channel_url}")
            return []
        except Exception as e:
            logger.error(f"Error fetching videos: {e}")
            return []

    def extract_transcript(self, video_url: str, video_id: str, lang: str = 'en') -> Optional[str]:
        """
        영상에서 자막 추출
        """
        output_path = self.transcripts_dir / f"{video_id}"

        try:
            # 자막 다운로드 (자동 생성 자막 포함)
            # VTT 형식으로 다운로드 (ffmpeg 없이도 동작)
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

            result = subprocess.run(
                cmd,
                capture_output=True,
                text=True,
                timeout=120
            )

            # 자막 파일 찾기 (다양한 패턴)
            srt_files = list(self.transcripts_dir.glob(f"{video_id}*.srt"))
            vtt_files = list(self.transcripts_dir.glob(f"{video_id}*.vtt"))

            all_sub_files = srt_files + vtt_files

            if all_sub_files:
                sub_path = all_sub_files[0]
                if sub_path.suffix == '.vtt':
                    transcript = self._parse_vtt(sub_path)
                else:
                    transcript = self._parse_srt(sub_path)
                return transcript
            else:
                # 다른 언어로 재시도
                fallback_lang = self.config.get('settings', {}).get('fallback_language', 'ko')
                if lang != fallback_lang:
                    logger.info(f"Trying fallback language: {fallback_lang}")
                    return self.extract_transcript(video_url, video_id, fallback_lang)

                logger.warning(f"No subtitles found for {video_id}")
                return None

        except subprocess.TimeoutExpired:
            logger.error(f"Timeout while extracting transcript for {video_id}")
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
            # 타임스탬프 라인 건너뛰기
            if '-->' in line or line.startswith('WEBVTT') or line.startswith('Kind:') or line.startswith('Language:'):
                continue
            # 숫자만 있는 라인 건너뛰기
            if line.strip().isdigit():
                continue
            # HTML 태그 제거
            text = re.sub(r'<[^>]+>', '', line)
            if text.strip():
                lines.append(text.strip())

        return ' '.join(lines)

    def _parse_srt(self, srt_path: Path) -> str:
        """SRT 파일을 텍스트로 변환"""
        with open(srt_path, 'r', encoding='utf-8') as f:
            content = f.read()

        # SRT 형식에서 텍스트만 추출
        lines = []
        for block in content.split('\n\n'):
            block_lines = block.strip().split('\n')
            if len(block_lines) >= 3:
                # 첫 번째 줄: 번호, 두 번째 줄: 타임스탬프, 나머지: 텍스트
                text_lines = block_lines[2:]
                text = ' '.join(text_lines)
                # HTML 태그 제거
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

    def run(self) -> list[dict]:
        """
        리서치 에이전트 실행
        모든 채널에서 최신 영상 수집 및 자막 추출
        """
        all_summaries = []
        settings = self.config.get('settings', {})
        hours_lookback = settings.get('hours_lookback', 24)
        subtitle_lang = settings.get('subtitle_language', 'en')

        for channel in self.config.get('channels', []):
            if not channel.get('enabled', True):
                logger.info(f"Skipping disabled channel: {channel['name']}")
                continue

            logger.info(f"Processing channel: {channel['name']}")

            # 최근 영상 가져오기
            videos = self.get_recent_videos(channel['url'], hours_lookback)
            logger.info(f"Found {len(videos)} recent videos in {channel['name']}")

            for video in videos:
                logger.info(f"Processing video: {video['title']}")

                # 자막 추출
                transcript = self.extract_transcript(
                    video['url'],
                    video['id'],
                    subtitle_lang
                )

                if transcript:
                    # 요약 생성
                    summary = self.create_summary(video, transcript)
                    all_summaries.append(summary)
                    logger.info(f"Successfully processed: {video['title']}")
                else:
                    logger.warning(f"No transcript available for: {video['title']}")

        # 전체 결과 저장
        result_path = self.output_dir / f"research_result_{datetime.now().strftime('%Y%m%d_%H%M%S')}.json"
        with open(result_path, 'w', encoding='utf-8') as f:
            json.dump({
                'processed_at': datetime.now().isoformat(),
                'total_videos': len(all_summaries),
                'summaries': all_summaries
            }, f, ensure_ascii=False, indent=2)

        logger.info(f"Research complete. Total videos processed: {len(all_summaries)}")
        return all_summaries


if __name__ == "__main__":
    # 테스트 실행
    logging.basicConfig(level=logging.INFO)

    base_dir = Path(__file__).parent.parent
    agent = ResearchAgent(
        config_path=base_dir / "config" / "channels.json",
        output_dir=base_dir / "output"
    )

    results = agent.run()
    print(f"Processed {len(results)} videos")
