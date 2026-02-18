"""
Synthesis Agent - NotebookLM을 활용하여 영상 내용 종합 분석 및 슬라이드 콘텐츠 생성
"""

import json
import subprocess
import os
from datetime import datetime
from pathlib import Path
from typing import Optional
import logging

logger = logging.getLogger(__name__)

# NotebookLM 스킬 경로
NOTEBOOKLM_SKILL_PATH = Path(__file__).parent.parent.parent.parent / ".claude" / "skills" / "notebooklm"


class SynthesisAgent:
    """NotebookLM 기반 종합 분석 및 슬라이드 콘텐츠 생성 에이전트"""

    def __init__(self, output_dir: str, notebooklm_skill_path: str = None):
        self.output_dir = Path(output_dir)
        self.slides_dir = self.output_dir / "slides"
        self.slides_dir.mkdir(parents=True, exist_ok=True)

        # NotebookLM 스킬 경로 설정
        if notebooklm_skill_path:
            self.nlm_skill_path = Path(notebooklm_skill_path)
        else:
            self.nlm_skill_path = NOTEBOOKLM_SKILL_PATH

    def _run_nlm_command(self, script: str, args: list[str], timeout: int = 300) -> tuple[bool, str]:
        """NotebookLM 스킬 스크립트 실행"""
        run_script = self.nlm_skill_path / "scripts" / "run.py"

        if not run_script.exists():
            logger.error(f"NotebookLM run.py not found at {run_script}")
            return False, "NotebookLM skill not found"

        cmd = ['python', str(run_script), script] + args
        logger.info(f"Running: {' '.join(cmd)}")

        try:
            result = subprocess.run(
                cmd,
                capture_output=True,
                text=True,
                timeout=timeout,
                cwd=str(self.nlm_skill_path)
            )

            if result.returncode != 0:
                logger.error(f"NotebookLM command failed: {result.stderr}")
                return False, result.stderr

            return True, result.stdout

        except subprocess.TimeoutExpired:
            logger.error(f"Command timed out")
            return False, "Command timed out"
        except Exception as e:
            logger.error(f"Error running NotebookLM command: {e}")
            return False, str(e)

    def check_auth(self) -> bool:
        """NotebookLM 인증 상태 확인"""
        success, output = self._run_nlm_command('auth_manager.py', ['status'])

        if success and 'authenticated' in output.lower():
            logger.info("NotebookLM authentication verified")
            return True

        logger.warning(f"NotebookLM authentication required. Output: {output}")
        return False

    def ask_notebooklm(self, question: str, notebook_url: str = None, notebook_id: str = None) -> Optional[str]:
        """NotebookLM에 질문하여 답변 받기"""
        args = ['--question', question]

        if notebook_url:
            args.extend(['--notebook-url', notebook_url])
        elif notebook_id:
            args.extend(['--notebook-id', notebook_id])

        success, output = self._run_nlm_command('ask_question.py', args, timeout=120)

        if success:
            return output

        logger.error(f"Failed to get answer from NotebookLM")
        return None

    def create_combined_document(self, summaries: list[dict]) -> str:
        """수집된 영상들을 하나의 문서로 통합"""
        today = datetime.now().strftime('%Y-%m-%d')

        doc_content = f"""# AI YouTube Digest - {today}

## Overview
This document contains transcripts and summaries from {len(summaries)} recent AI-related YouTube videos.

---

"""
        for i, summary in enumerate(summaries, 1):
            doc_content += f"""
## {i}. {summary.get('title', 'Untitled')}

**Channel:** {summary.get('channel', 'Unknown')}
**URL:** {summary.get('url', '')}
**Upload Date:** {summary.get('upload_date', 'Unknown')}
**Duration:** {summary.get('duration', 'N/A')}

### Transcript
{summary.get('transcript', 'No transcript available')}

---

"""

        # 문서 저장
        doc_path = self.output_dir / f"combined_document_{today.replace('-', '')}.md"
        with open(doc_path, 'w', encoding='utf-8') as f:
            f.write(doc_content)

        logger.info(f"Created combined document: {doc_path}")
        return str(doc_path)

    def generate_slide_content(self, summaries: list[dict], use_notebooklm: bool = True, notebook_url: str = None) -> dict:
        """
        슬라이드용 콘텐츠 생성
        NotebookLM을 사용하거나 직접 분석하여 슬라이드 구조 생성
        """
        today = datetime.now().strftime('%Y-%m-%d')

        # 기본 슬라이드 구조
        slide_content = {
            'title': f'AI News Digest - {today}',
            'date': today,
            'sources': [],
            'sections': [],
            'key_insights': [],
            'action_items': []
        }

        # 소스 정보 수집
        for summary in summaries:
            slide_content['sources'].append({
                'title': summary.get('title'),
                'channel': summary.get('channel'),
                'url': summary.get('url')
            })

        if use_notebooklm and notebook_url:
            # NotebookLM을 통한 분석
            slide_content = self._analyze_with_notebooklm(summaries, notebook_url, slide_content)
        else:
            # 직접 분석 (NotebookLM 없이)
            slide_content = self._analyze_directly(summaries, slide_content)

        # 슬라이드 콘텐츠 저장
        content_path = self.slides_dir / f"slide_content_{today.replace('-', '')}.json"
        with open(content_path, 'w', encoding='utf-8') as f:
            json.dump(slide_content, f, ensure_ascii=False, indent=2)

        logger.info(f"Generated slide content: {content_path}")
        return slide_content

    def _analyze_with_notebooklm(self, summaries: list[dict], notebook_url: str, slide_content: dict) -> dict:
        """NotebookLM을 사용하여 콘텐츠 분석"""

        # 핵심 주제 추출
        topics_answer = self.ask_notebooklm(
            "What are the main topics and themes discussed across all these videos? "
            "List the top 5 most important topics with brief descriptions.",
            notebook_url=notebook_url
        )

        if topics_answer:
            slide_content['sections'].append({
                'title': 'Key Topics',
                'content': topics_answer,
                'type': 'topics'
            })

        # 핵심 인사이트 추출
        insights_answer = self.ask_notebooklm(
            "What are the most important insights and takeaways from these videos? "
            "Provide 5-7 actionable insights that viewers should know.",
            notebook_url=notebook_url
        )

        if insights_answer:
            slide_content['key_insights'].append(insights_answer)

        # 트렌드 분석
        trends_answer = self.ask_notebooklm(
            "What AI trends and developments are being discussed? "
            "Identify emerging patterns and future predictions mentioned.",
            notebook_url=notebook_url
        )

        if trends_answer:
            slide_content['sections'].append({
                'title': 'AI Trends & Developments',
                'content': trends_answer,
                'type': 'trends'
            })

        # 실용적 조언
        tips_answer = self.ask_notebooklm(
            "What practical tips, tools, or techniques are recommended in these videos? "
            "List specific actionable items that viewers can implement.",
            notebook_url=notebook_url
        )

        if tips_answer:
            slide_content['action_items'].append(tips_answer)

        return slide_content

    def _analyze_directly(self, summaries: list[dict], slide_content: dict) -> dict:
        """직접 분석하여 콘텐츠 구조화 (NotebookLM 없이)"""

        # 채널별 영상 그룹화
        channels = {}
        for summary in summaries:
            channel = summary.get('channel', 'Unknown')
            if channel not in channels:
                channels[channel] = []
            channels[channel].append(summary)

        # 채널별 섹션 생성
        for channel, videos in channels.items():
            section = {
                'title': f'From {channel}',
                'type': 'channel_summary',
                'videos': []
            }

            for video in videos:
                video_summary = {
                    'title': video.get('title'),
                    'url': video.get('url'),
                    'transcript_preview': video.get('transcript', '')[:500] + '...' if video.get('transcript') else ''
                }
                section['videos'].append(video_summary)

            slide_content['sections'].append(section)

        # 기본 인사이트 추출 (간단한 키워드 기반)
        all_transcripts = ' '.join([s.get('transcript', '') for s in summaries])

        # AI 관련 키워드 탐지
        ai_keywords = ['AI', 'artificial intelligence', 'machine learning', 'GPT', 'LLM',
                       'automation', 'neural network', 'deep learning', 'Claude', 'ChatGPT']

        found_keywords = [kw for kw in ai_keywords if kw.lower() in all_transcripts.lower()]

        if found_keywords:
            slide_content['key_insights'].append({
                'type': 'keywords',
                'content': f"Key AI topics mentioned: {', '.join(found_keywords)}"
            })

        return slide_content

    def run(self, summaries: list[dict], notebook_url: str = None, use_notebooklm: bool = True) -> dict:
        """
        종합 에이전트 실행

        Args:
            summaries: Research Agent에서 생성된 요약 목록
            notebook_url: NotebookLM 노트북 URL (선택)
            use_notebooklm: NotebookLM 사용 여부

        Returns:
            슬라이드 콘텐츠 딕셔너리
        """
        if not summaries:
            logger.warning("No summaries provided")
            return {}

        # 1. 통합 문서 생성
        logger.info("Creating combined document...")
        doc_path = self.create_combined_document(summaries)

        # 2. NotebookLM 인증 확인 (사용 시)
        if use_notebooklm:
            if not self.check_auth():
                logger.warning("NotebookLM not authenticated. Using direct analysis.")
                use_notebooklm = False

        # 3. 슬라이드 콘텐츠 생성
        logger.info("Generating slide content...")
        slide_content = self.generate_slide_content(
            summaries,
            use_notebooklm=use_notebooklm,
            notebook_url=notebook_url
        )

        # 4. 결과에 문서 경로 추가
        slide_content['combined_document'] = doc_path

        logger.info("Synthesis complete")
        return slide_content


if __name__ == "__main__":
    # 테스트 실행
    logging.basicConfig(level=logging.INFO)

    # 테스트 데이터
    test_summaries = [
        {
            'channel': 'Test Channel',
            'title': 'Test Video about AI',
            'transcript': 'This is a test transcript discussing artificial intelligence and machine learning trends.',
            'url': 'https://youtube.com/watch?v=test',
            'upload_date': '2026-02-18',
            'duration': '10:00'
        }
    ]

    base_dir = Path(__file__).parent.parent
    agent = SynthesisAgent(output_dir=base_dir / "output")

    result = agent.run(test_summaries, use_notebooklm=False)
    print(json.dumps(result, indent=2, ensure_ascii=False))
