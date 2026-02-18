"""
Synthesis Agent - NotebookLM을 사용하여 종합 팟캐스트 생성
"""

import json
import subprocess
import time
import os
from datetime import datetime
from pathlib import Path
from typing import Optional
import logging

logger = logging.getLogger(__name__)


class SynthesisAgent:
    """NotebookLM 기반 종합 팟캐스트 생성 에이전트"""

    def __init__(self, output_dir: str):
        self.output_dir = Path(output_dir)
        self.podcasts_dir = self.output_dir / "podcasts"
        self.podcasts_dir.mkdir(parents=True, exist_ok=True)

    def _run_nlm_command(self, args: list[str], timeout: int = 300) -> tuple[bool, str]:
        """nlm CLI 명령 실행"""
        cmd = ['nlm'] + args
        logger.info(f"Running: {' '.join(cmd)}")

        try:
            result = subprocess.run(
                cmd,
                capture_output=True,
                text=True,
                timeout=timeout
            )

            if result.returncode != 0:
                logger.error(f"nlm command failed: {result.stderr}")
                return False, result.stderr

            return True, result.stdout

        except subprocess.TimeoutExpired:
            logger.error(f"Command timed out: {' '.join(cmd)}")
            return False, "Command timed out"
        except FileNotFoundError:
            logger.error("nlm CLI not found. Install with: pip install notebooklm-mcp-cli")
            return False, "nlm CLI not found"
        except Exception as e:
            logger.error(f"Error running nlm command: {e}")
            return False, str(e)

    def check_auth(self) -> bool:
        """인증 상태 확인"""
        success, output = self._run_nlm_command(['login', '--check'])
        # 'Authentication valid!' 또는 'authenticated' 체크
        if success and ('valid' in output.lower() or 'authenticated' in output.lower()):
            logger.info("NotebookLM authentication verified")
            return True
        logger.warning(f"NotebookLM authentication required. Output: {output}")
        return False

    def create_notebook(self, title: str) -> Optional[str]:
        """새 노트북 생성"""
        success, output = self._run_nlm_command(['notebook', 'create', title])

        if success:
            # 출력에서 ID 추출: "ID: 3ce9684a-a72b-4ab6-85e4-4f6d1405792d" 형식
            lines = output.strip().split('\n')
            for line in lines:
                if 'ID:' in line:
                    # "ID: xxx" 또는 "  ID: xxx" 형식 처리
                    parts = line.split('ID:')
                    if len(parts) >= 2:
                        notebook_id = parts[-1].strip()
                        if notebook_id:
                            logger.info(f"Created notebook: {notebook_id}")
                            return notebook_id

        logger.error(f"Failed to create notebook: {output}")
        return None

    def add_text_source(self, notebook_id: str, title: str, content: str) -> bool:
        """텍스트 소스 추가 (임시 파일 사용)"""
        import tempfile

        # 임시 텍스트 파일 생성 (긴 텍스트 명령줄 문제 방지)
        temp_file = None
        try:
            # .txt 파일로 임시 저장
            temp_file = self.output_dir / f"temp_source_{hash(title) % 10000}.txt"
            with open(temp_file, 'w', encoding='utf-8') as f:
                f.write(f"# {title}\n\n{content}")

            success, output = self._run_nlm_command([
                'source', 'add', notebook_id,
                '--file', str(temp_file),
                '--title', title,
                '--wait'
            ], timeout=120)

            if success:
                logger.info(f"Added source: {title}")
                return True

            logger.error(f"Failed to add source: {output}")
            return False

        finally:
            # 임시 파일 정리
            if temp_file and temp_file.exists():
                try:
                    temp_file.unlink()
                except:
                    pass

    def create_audio_overview(self, notebook_id: str, format: str = 'deep_dive', length: str = 'default', max_retries: int = 3) -> Optional[str]:
        """
        오디오 팟캐스트 생성
        format: deep_dive, brief, critique, debate
        length: short, default, long
        """
        for attempt in range(max_retries):
            success, output = self._run_nlm_command([
                'audio', 'create', notebook_id,
                '--format', format,
                '--length', length,
                '--confirm'
            ], timeout=60)

            if success:
                logger.info("Audio creation started, waiting for completion...")
                return notebook_id

            logger.warning(f"Audio creation attempt {attempt + 1}/{max_retries} failed: {output}")

            if attempt < max_retries - 1:
                wait_time = (attempt + 1) * 30  # 30, 60, 90초 대기
                logger.info(f"Waiting {wait_time}s before retry...")
                time.sleep(wait_time)

        logger.error(f"Failed to create audio after {max_retries} attempts")
        return None

    def wait_for_audio(self, notebook_id: str, max_wait: int = 600, poll_interval: int = 30) -> Optional[str]:
        """
        오디오 생성 완료 대기 및 artifact_id 반환
        """
        start_time = time.time()

        while time.time() - start_time < max_wait:
            success, output = self._run_nlm_command(['studio', 'status', notebook_id, '--json'])

            if success:
                try:
                    data = json.loads(output)

                    # data가 리스트인 경우 (artifacts 직접 반환)
                    if isinstance(data, list):
                        artifacts = data
                    else:
                        # 딕셔너리인 경우 (artifacts 키가 있을 수 있음)
                        artifacts = data.get('artifacts', [data] if isinstance(data, dict) else [])

                    for artifact in artifacts:
                        if artifact.get('type') == 'audio' or artifact.get('type_code') == 1:
                            status = artifact.get('status', '').lower()
                            artifact_id = artifact.get('id') or artifact.get('artifact_id')

                            if status == 'completed' or 'completed' in status:
                                logger.info(f"Audio completed: {artifact_id}")
                                return artifact_id
                            elif 'error' in status or 'failed' in status:
                                logger.error(f"Audio generation failed: {status}")
                                return None
                            # in_progress 또는 unknown은 계속 대기

                except json.JSONDecodeError:
                    pass

            logger.info(f"Waiting for audio... ({int(time.time() - start_time)}s / {max_wait}s)")
            time.sleep(poll_interval)

        logger.error("Audio generation timed out")
        return None

    def download_audio(self, notebook_id: str, artifact_id: str, output_filename: str) -> Optional[str]:
        """오디오 파일 다운로드"""
        output_path = self.podcasts_dir / output_filename

        # nlm download audio NOTEBOOK_ID --id ARTIFACT_ID --output PATH 형식
        success, output = self._run_nlm_command([
            'download', 'audio', notebook_id,
            '--id', artifact_id,
            '--output', str(output_path)
        ], timeout=300)

        if success and output_path.exists():
            logger.info(f"Downloaded audio: {output_path}")
            return str(output_path)

        logger.error(f"Failed to download audio: {output}")
        return None

    def cleanup_notebook(self, notebook_id: str) -> bool:
        """노트북 삭제 (선택적)"""
        success, _ = self._run_nlm_command([
            'notebook', 'delete', notebook_id, '--confirm'
        ])
        return success

    def run(self, summaries: list[dict], podcast_title: str = None) -> Optional[str]:
        """
        종합 팟캐스트 생성 실행

        Args:
            summaries: Research Agent에서 생성된 요약 목록
            podcast_title: 팟캐스트 제목 (없으면 자동 생성)

        Returns:
            생성된 팟캐스트 파일 경로
        """
        if not summaries:
            logger.warning("No summaries provided, skipping podcast generation")
            return None

        # 인증 확인
        if not self.check_auth():
            logger.error("NotebookLM authentication failed")
            return None

        # 날짜 기반 제목 생성
        today = datetime.now().strftime('%Y-%m-%d')
        if not podcast_title:
            podcast_title = f"AI News Digest - {today}"

        # 1. 노트북 생성
        logger.info(f"Creating notebook: {podcast_title}")
        notebook_id = self.create_notebook(podcast_title)
        if not notebook_id:
            return None

        # 2. 각 영상 요약을 소스로 추가
        for summary in summaries:
            channel = summary.get('channel', 'Unknown')
            title = summary.get('title', 'Untitled')
            transcript = summary.get('transcript', '')
            url = summary.get('url', '')

            # 소스 내용 구성
            source_content = f"""
# {title}
**Channel:** {channel}
**URL:** {url}
**Date:** {summary.get('upload_date', 'Unknown')}

## Transcript
{transcript}
"""
            source_title = f"{channel}: {title}"[:100]  # 제목 길이 제한

            if not self.add_text_source(notebook_id, source_title, source_content):
                logger.warning(f"Failed to add source: {source_title}")
                continue

            # API 속도 제한 방지
            time.sleep(2)

        # 3. 오디오 팟캐스트 생성
        logger.info("Creating audio podcast...")
        if not self.create_audio_overview(notebook_id, format='deep_dive', length='default'):
            logger.error("Failed to start audio creation")
            return None

        # 4. 완료 대기
        artifact_id = self.wait_for_audio(notebook_id, max_wait=600)
        if not artifact_id:
            logger.error("Audio creation did not complete")
            return None

        # 5. 다운로드
        output_filename = f"pitcast_{today}.m4a"
        podcast_path = self.download_audio(notebook_id, artifact_id, output_filename)

        if podcast_path:
            logger.info(f"Podcast created successfully: {podcast_path}")

            # 결과 메타데이터 저장
            metadata_path = self.podcasts_dir / f"pitcast_{today}_metadata.json"
            with open(metadata_path, 'w', encoding='utf-8') as f:
                json.dump({
                    'title': podcast_title,
                    'date': today,
                    'notebook_id': notebook_id,
                    'artifact_id': artifact_id,
                    'podcast_path': podcast_path,
                    'sources': [
                        {
                            'channel': s.get('channel'),
                            'title': s.get('title'),
                            'url': s.get('url')
                        }
                        for s in summaries
                    ],
                    'created_at': datetime.now().isoformat()
                }, f, ensure_ascii=False, indent=2)

        return podcast_path


if __name__ == "__main__":
    # 테스트 실행
    logging.basicConfig(level=logging.INFO)

    # 테스트용 더미 데이터
    test_summaries = [
        {
            'channel': 'Test Channel',
            'title': 'Test Video',
            'transcript': 'This is a test transcript for the podcast generator.',
            'url': 'https://youtube.com/watch?v=test',
            'upload_date': '2025-02-18'
        }
    ]

    base_dir = Path(__file__).parent.parent
    agent = SynthesisAgent(output_dir=base_dir / "output")

    # 인증 확인만 테스트
    if agent.check_auth():
        print("Authentication OK")
    else:
        print("Please authenticate with: nlm login")
