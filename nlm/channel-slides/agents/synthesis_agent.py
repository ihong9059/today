"""
Synthesis Agent - NotebookLM을 활용하여 채널별 영상 내용 종합 분석
NotebookLM 스킬 필수 사용
"""

import json
import subprocess
import time
from datetime import datetime
from pathlib import Path
from typing import Optional
import logging

logger = logging.getLogger(__name__)

# NotebookLM 스킬 경로
NOTEBOOKLM_SKILL_PATH = Path(__file__).parent.parent.parent.parent / ".claude" / "skills" / "notebooklm"


class SynthesisAgent:
    """NotebookLM 기반 채널별 종합 분석 에이전트"""

    def __init__(self, output_dir: str, notebooklm_skill_path: str = None):
        self.output_dir = Path(output_dir)
        self.slides_dir = self.output_dir / "slides"
        self.slides_dir.mkdir(parents=True, exist_ok=True)

        # NotebookLM 스킬 경로
        if notebooklm_skill_path:
            self.nlm_skill_path = Path(notebooklm_skill_path)
        else:
            self.nlm_skill_path = NOTEBOOKLM_SKILL_PATH

        # venv python 경로
        self.nlm_python = self.nlm_skill_path / ".venv" / "Scripts" / "python.exe"

    def _run_nlm_command(self, script: str, args: list[str], timeout: int = 180) -> tuple[bool, str]:
        """NotebookLM 스킬 스크립트 실행"""
        script_path = self.nlm_skill_path / "scripts" / script

        if not script_path.exists():
            logger.error(f"Script not found: {script_path}")
            return False, f"Script not found: {script}"

        if not self.nlm_python.exists():
            logger.error(f"NotebookLM venv not found at {self.nlm_python}")
            return False, "NotebookLM venv not configured"

        cmd = [str(self.nlm_python), str(script_path)] + args
        logger.debug(f"Running: {' '.join(cmd)}")

        try:
            result = subprocess.run(
                cmd,
                capture_output=True,
                text=True,
                timeout=timeout,
                cwd=str(self.nlm_skill_path)
            )

            if result.returncode != 0:
                logger.warning(f"Command returned non-zero: {result.stderr[:200]}")
                return False, result.stderr

            return True, result.stdout

        except subprocess.TimeoutExpired:
            return False, "Command timed out"
        except Exception as e:
            return False, str(e)

    def check_auth(self) -> bool:
        """NotebookLM 인증 상태 확인"""
        success, output = self._run_nlm_command('auth_manager.py', ['status'])

        if 'Authenticated: Yes' in output or 'authenticated' in output.lower():
            logger.info("✓ NotebookLM authenticated")
            return True

        logger.warning("✗ NotebookLM not authenticated")
        return False

    def ask_notebooklm(self, question: str, notebook_url: str) -> Optional[str]:
        """NotebookLM에 질문하여 답변 받기"""
        success, output = self._run_nlm_command(
            'ask_question.py',
            ['--question', question, '--notebook-url', notebook_url],
            timeout=120
        )

        if success and output.strip():
            # 답변 정제 (불필요한 시스템 메시지 제거)
            lines = output.strip().split('\n')
            clean_lines = [l for l in lines if not l.startswith('🔐') and not l.startswith('✅')]
            return '\n'.join(clean_lines).strip()

        return None

    def create_channel_document(self, channel_name: str, summaries: list[dict]) -> str:
        """채널별 통합 문서 생성"""
        today = datetime.now().strftime('%Y-%m-%d')

        doc_content = f"""# {channel_name} - Video Analysis
Date: {today}
Videos: {len(summaries)}

---

"""
        for i, summary in enumerate(summaries, 1):
            doc_content += f"""
## Video {i}: {summary.get('title', 'Untitled')}

**URL:** {summary.get('url', '')}
**Upload Date:** {summary.get('upload_date', 'Unknown')}
**Duration:** {summary.get('duration', 'N/A')}

### Transcript
{summary.get('transcript', 'No transcript available')[:15000]}

---

"""

        # 문서 저장
        safe_name = channel_name.replace(' ', '_').replace('/', '_')
        doc_path = self.output_dir / f"{safe_name}_document_{today.replace('-', '')}.md"
        with open(doc_path, 'w', encoding='utf-8') as f:
            f.write(doc_content)

        logger.info(f"Created document: {doc_path.name}")
        return str(doc_path)

    def analyze_with_notebooklm(self, channel_name: str, notebook_url: str) -> dict:
        """NotebookLM을 사용하여 채널 콘텐츠 분석"""
        analysis = {
            'channel': channel_name,
            'main_topics': '',
            'key_insights': '',
            'tools_mentioned': '',
            'actionable_tips': '',
            'summary': ''
        }

        # 1. 주요 주제 추출
        logger.info("  Asking NotebookLM: Main topics...")
        topics = self.ask_notebooklm(
            "What are the main topics and themes discussed in these videos? "
            "List the top 3-5 key topics with brief explanations.",
            notebook_url
        )
        if topics:
            analysis['main_topics'] = topics

        time.sleep(2)  # Rate limit

        # 2. 핵심 인사이트
        logger.info("  Asking NotebookLM: Key insights...")
        insights = self.ask_notebooklm(
            "What are the most important insights and takeaways from these videos? "
            "Provide 3-5 actionable insights.",
            notebook_url
        )
        if insights:
            analysis['key_insights'] = insights

        time.sleep(2)

        # 3. 언급된 도구/기술
        logger.info("  Asking NotebookLM: Tools mentioned...")
        tools = self.ask_notebooklm(
            "What specific tools, platforms, or technologies are mentioned in these videos? "
            "List them with brief descriptions of how they're used.",
            notebook_url
        )
        if tools:
            analysis['tools_mentioned'] = tools

        time.sleep(2)

        # 4. 실용적 팁
        logger.info("  Asking NotebookLM: Actionable tips...")
        tips = self.ask_notebooklm(
            "What practical tips or step-by-step advice is given in these videos? "
            "List specific actionable items viewers can implement.",
            notebook_url
        )
        if tips:
            analysis['actionable_tips'] = tips

        time.sleep(2)

        # 5. 전체 요약
        logger.info("  Asking NotebookLM: Overall summary...")
        summary = self.ask_notebooklm(
            "Provide a concise executive summary of all the content in these videos. "
            "What is the main message and value proposition?",
            notebook_url
        )
        if summary:
            analysis['summary'] = summary

        return analysis

    def generate_slide_content(self, channel_name: str, summaries: list[dict],
                                notebook_url: str = None, use_notebooklm: bool = True) -> dict:
        """
        채널별 슬라이드 콘텐츠 생성 (최대 10장)
        """
        today = datetime.now().strftime('%Y-%m-%d')

        slide_content = {
            'channel': channel_name,
            'title': f'{channel_name} - AI Insights',
            'date': today,
            'video_count': len(summaries),
            'videos': [],
            'slides': []  # 최대 10장
        }

        # 영상 정보
        for s in summaries:
            slide_content['videos'].append({
                'title': s.get('title'),
                'url': s.get('url'),
                'upload_date': s.get('upload_date')
            })

        if use_notebooklm and notebook_url:
            # NotebookLM 분석 사용
            analysis = self.analyze_with_notebooklm(channel_name, notebook_url)

            # 슬라이드 구성 (최대 10장)
            # 1. 타이틀
            slide_content['slides'].append({
                'type': 'title',
                'title': f'{channel_name}',
                'subtitle': f'AI Insights from {len(summaries)} Videos',
                'date': today
            })

            # 2. 영상 목록
            slide_content['slides'].append({
                'type': 'video_list',
                'title': 'Videos Analyzed',
                'items': [v['title'][:60] for v in slide_content['videos']]
            })

            # 3. 주요 주제
            if analysis.get('main_topics'):
                slide_content['slides'].append({
                    'type': 'content',
                    'title': 'Main Topics',
                    'content': analysis['main_topics']
                })

            # 4. 핵심 인사이트
            if analysis.get('key_insights'):
                slide_content['slides'].append({
                    'type': 'content',
                    'title': 'Key Insights',
                    'content': analysis['key_insights']
                })

            # 5. 도구 & 기술
            if analysis.get('tools_mentioned'):
                slide_content['slides'].append({
                    'type': 'content',
                    'title': 'Tools & Technologies',
                    'content': analysis['tools_mentioned']
                })

            # 6. 실용적 팁
            if analysis.get('actionable_tips'):
                slide_content['slides'].append({
                    'type': 'content',
                    'title': 'Actionable Tips',
                    'content': analysis['actionable_tips']
                })

            # 7. 요약
            if analysis.get('summary'):
                slide_content['slides'].append({
                    'type': 'content',
                    'title': 'Summary',
                    'content': analysis['summary']
                })

            # 8. 마무리
            slide_content['slides'].append({
                'type': 'closing',
                'title': 'Thank You',
                'subtitle': f'Analysis by NotebookLM'
            })

        else:
            # NotebookLM 없이 기본 슬라이드
            slide_content['slides'] = self._generate_basic_slides(channel_name, summaries, today)

        # 10장 제한
        if len(slide_content['slides']) > 10:
            slide_content['slides'] = slide_content['slides'][:10]

        # 저장
        safe_name = channel_name.replace(' ', '_').replace('/', '_')
        content_path = self.slides_dir / f"{safe_name}_slide_content_{today.replace('-', '')}.json"
        with open(content_path, 'w', encoding='utf-8') as f:
            json.dump(slide_content, f, ensure_ascii=False, indent=2)

        logger.info(f"Generated {len(slide_content['slides'])} slides for {channel_name}")
        return slide_content

    def _generate_basic_slides(self, channel_name: str, summaries: list[dict], date: str) -> list[dict]:
        """NotebookLM 없이 기본 슬라이드 생성"""
        slides = []

        # 타이틀
        slides.append({
            'type': 'title',
            'title': channel_name,
            'subtitle': f'{len(summaries)} Videos Analyzed',
            'date': date
        })

        # 영상 목록
        slides.append({
            'type': 'video_list',
            'title': 'Videos',
            'items': [s.get('title', '')[:60] for s in summaries]
        })

        # 각 영상별 요약 (최대 6개)
        for i, summary in enumerate(summaries[:6]):
            slides.append({
                'type': 'video_summary',
                'title': summary.get('title', 'Video')[:50],
                'content': summary.get('transcript', '')[:500] + '...'
            })

        # 마무리
        slides.append({
            'type': 'closing',
            'title': 'Thank You',
            'subtitle': date
        })

        return slides[:10]

    def run(self, channel_summaries: dict[str, list[dict]],
            notebook_urls: dict[str, str] = None) -> dict[str, dict]:
        """
        채널별 종합 분석 실행

        Args:
            channel_summaries: {channel_name: [summaries]}
            notebook_urls: {channel_name: notebook_url} (선택)

        Returns:
            {channel_name: slide_content}
        """
        if not channel_summaries:
            logger.warning("No summaries provided")
            return {}

        # NotebookLM 인증 확인
        use_notebooklm = self.check_auth()

        if not use_notebooklm:
            logger.warning("NotebookLM not available. Using basic analysis.")

        results = {}

        for channel_name, summaries in channel_summaries.items():
            if not summaries:
                logger.info(f"Skipping {channel_name}: no videos")
                continue

            logger.info(f"\n{'='*50}")
            logger.info(f"Synthesizing: {channel_name} ({len(summaries)} videos)")
            logger.info(f"{'='*50}")

            # 문서 생성
            doc_path = self.create_channel_document(channel_name, summaries)

            # NotebookLM URL 확인
            notebook_url = notebook_urls.get(channel_name) if notebook_urls else None

            # 슬라이드 콘텐츠 생성
            slide_content = self.generate_slide_content(
                channel_name,
                summaries,
                notebook_url=notebook_url,
                use_notebooklm=use_notebooklm and notebook_url is not None
            )

            slide_content['document_path'] = doc_path
            results[channel_name] = slide_content

        logger.info(f"\nSynthesis complete: {len(results)} channels processed")
        return results


if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO, format='%(message)s')

    # 테스트
    test_summaries = {
        'Test Channel': [
            {
                'title': 'Test Video',
                'transcript': 'This is a test transcript about AI and automation.',
                'url': 'https://youtube.com/test',
                'upload_date': '2026-02-18',
                'duration': '10:00'
            }
        ]
    }

    base_dir = Path(__file__).parent.parent
    agent = SynthesisAgent(output_dir=base_dir / "output")

    results = agent.run(test_summaries)
    print(json.dumps(results, indent=2, ensure_ascii=False))
