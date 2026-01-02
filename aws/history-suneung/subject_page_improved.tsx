'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Brain, ChevronRight, CheckCircle, Castle, Scroll, Flag, Users, Target } from 'lucide-react';

const subjectInfo: { [key: string]: { name: string; color: string; colorLight: string; icon: any; description: string; totalDays: number } } = {
  'premodern': { name: '전근대사', color: 'from-amber-500 to-orange-600', colorLight: 'amber', icon: Castle, description: '선사시대부터 조선시대까지', totalDays: 20 },
  'modern': { name: '근대사', color: 'from-blue-500 to-indigo-600', colorLight: 'blue', icon: Scroll, description: '개항기부터 대한제국까지', totalDays: 15 },
  'colonial': { name: '일제강점기', color: 'from-red-500 to-rose-600', colorLight: 'red', icon: Flag, description: '무단통치부터 광복까지', totalDays: 20 },
  'contemporary': { name: '현대사', color: 'from-green-500 to-emerald-600', colorLight: 'green', icon: Users, description: '광복부터 현재까지', totalDays: 15 },
  'mock-test': { name: '실전 모의고사', color: 'from-purple-500 to-pink-600', colorLight: 'purple', icon: Target, description: '기출분석 및 실전훈련', totalDays: 20 },
};

// 레슨 제목 데이터
const lessonTitles: { [subject: string]: { [day: number]: { title: string; desc: string } } } = {
  'premodern': {
    1: { title: '선사시대와 청동기·철기', desc: '구석기, 신석기, 청동기, 철기 시대의 특징' },
    2: { title: '고조선과 여러 나라의 성장', desc: '단군왕검, 위만조선, 부여, 고구려, 옥저, 동예, 삼한' },
    3: { title: '삼국의 성립과 발전', desc: '고구려, 백제, 신라의 건국과 전성기' },
    4: { title: '삼국의 문화와 대외관계', desc: '불교, 유학, 고분, 일본 전파' },
    5: { title: '신라의 삼국통일과 남북국시대', desc: '삼국통일, 통일신라, 발해' },
    6: { title: '고려의 건국과 정치 발전', desc: '왕건, 호족통합, 광종의 개혁' },
    7: { title: '고려의 통치체제', desc: '중앙정치, 지방행정, 군사제도' },
    8: { title: '문벌귀족사회와 무신정권', desc: '이자겸의 난, 묘청의 난, 무신정변' },
    9: { title: '몽골의 침입과 고려의 대응', desc: '대몽항쟁, 삼별초, 원 간섭기' },
    10: { title: '고려의 경제와 사회', desc: '토지제도, 신분제도, 사회 모습' },
    11: { title: '고려의 문화', desc: '불교, 유학, 역사서, 과학기술' },
    12: { title: '고려 말의 정치변동', desc: '공민왕의 개혁, 신진사대부, 위화도 회군' },
    13: { title: '조선의 건국과 통치체제', desc: '태조, 정도전, 의정부, 6조' },
    14: { title: '조선 전기의 정치', desc: '태종~성종, 사림과 훈구' },
    15: { title: '조선의 사회와 경제', desc: '신분제도, 토지제도, 조세제도' },
    16: { title: '조선 전기의 문화', desc: '훈민정음, 과학기술, 편찬사업' },
    17: { title: '사화와 붕당정치', desc: '4대 사화, 붕당의 형성과 전개' },
    18: { title: '임진왜란과 병자호란', desc: '왜란의 전개, 의병, 호란과 북벌론' },
    19: { title: '조선 후기의 정치', desc: '탕평책, 세도정치, 삼정의 문란' },
    20: { title: '조선 후기의 사회·경제·문화', desc: '신분제 동요, 상품화폐경제, 실학, 서민문화' },
  },
  'modern': {
    1: { title: '흥선대원군의 정치와 개항', desc: '대원군의 개혁과 강화도조약' },
    2: { title: '개화정책과 임오군란·갑신정변', desc: '통리기무아문, 별기군, 급진개화파' },
    3: { title: '동학농민운동', desc: '고부봉기부터 우금치전투까지' },
    4: { title: '갑오개혁과 을미사변', desc: '군국기무처, 홍범 14조, 명성황후 시해' },
    5: { title: '독립협회와 대한제국', desc: '독립문, 만민공동회, 광무개혁' },
    6: { title: '항일의병운동', desc: '을미의병, 을사의병, 정미의병' },
    7: { title: '애국계몽운동', desc: '보안회, 대한자강회, 신민회' },
    8: { title: '국권피탈 과정', desc: '을사늑약, 한일신협약, 경술국치' },
    9: { title: '근대 경제의 변화', desc: '열강의 경제침탈, 이권수호운동, 경제적 구국운동' },
    10: { title: '근대 사회의 변화', desc: '신분제 폐지, 여성지위 향상, 생활문화 변화' },
    11: { title: '근대 문화의 발전 (1)', desc: '신교육, 언론, 국학운동' },
    12: { title: '근대 문화의 발전 (2)', desc: '종교, 문학, 예술' },
    13: { title: '근대사 실전 연습 (1)', desc: '개항~갑오개혁 기출문제' },
    14: { title: '근대사 실전 연습 (2)', desc: '대한제국~국권피탈 기출문제' },
    15: { title: '근대사 종합 모의고사', desc: '근대사 전범위 실전 훈련' },
  },
  'colonial': {
    1: { title: '무단통치 (1910년대)', desc: '헌병경찰, 토지조사사업' },
    2: { title: '3.1운동', desc: '민족자결주의, 독립선언, 전개과정' },
    3: { title: '대한민국 임시정부', desc: '상해 임시정부, 활동, 한국광복군' },
    4: { title: '문화통치 (1920년대)', desc: '문화통치의 실상, 산미증식계획' },
    5: { title: '1920년대 국내 민족운동', desc: '물산장려운동, 민립대학설립운동' },
    6: { title: '1920년대 해외 무장투쟁', desc: '봉오동, 청산리, 자유시 참변' },
    7: { title: '의열단과 한인애국단', desc: '김원봉, 이봉창, 윤봉길' },
    8: { title: '사회운동의 성장', desc: '노동운동, 농민운동, 형평운동' },
    9: { title: '신간회와 민족유일당운동', desc: '좌우합작, 광주학생항일운동' },
    10: { title: '민족문화수호운동', desc: '국어, 역사, 한글학회' },
    11: { title: '민족말살통치 (1930~40년대)', desc: '황국신민화, 내선일체, 징용·위안부' },
    12: { title: '1930년대 무장독립투쟁', desc: '한중연합, 동북항일연군, 조선의용대' },
    13: { title: '1940년대 무장독립투쟁', desc: '한국광복군, 조선의용군, 국내진공작전' },
    14: { title: '건국준비활동과 광복', desc: '조선건국동맹, 8.15 광복' },
    15: { title: '일제강점기 경제 변화', desc: '식민지 수탈경제, 민족기업' },
    16: { title: '일제강점기 사회 변화', desc: '인구이동, 도시화, 생활문화' },
    17: { title: '일제강점기 문화 변화', desc: '문학, 예술, 종교' },
    18: { title: '일제강점기 실전 연습 (1)', desc: '1910~1920년대 기출문제' },
    19: { title: '일제강점기 실전 연습 (2)', desc: '1930~1940년대 기출문제' },
    20: { title: '일제강점기 종합 모의고사', desc: '일제강점기 전범위 실전 훈련' },
  },
  'contemporary': {
    1: { title: '8.15 광복과 분단', desc: '광복, 모스크바3상회의, 신탁통치' },
    2: { title: '대한민국 정부 수립과 6.25전쟁', desc: '5.10총선, 제헌헌법, 6.25전쟁' },
    3: { title: '4.19혁명과 5.16군사정변', desc: '이승만 하야, 장면 내각, 박정희' },
    4: { title: '민주화운동의 전개', desc: '유신체제, 5.18, 6월항쟁' },
    5: { title: '남북관계의 변화', desc: '7.4공동성명, 남북기본합의서, 6.15선언' },
    6: { title: '경제발전과 사회변화', desc: '경제개발5개년계획, 산업화, 도시화' },
    7: { title: '민주주의의 발전', desc: '민주화 이후 정치, 평화적 정권교체' },
    8: { title: '통일을 위한 노력', desc: '남북회담, 이산가족, 경협' },
    9: { title: '현대사 주요 사건 연표', desc: '연대기적 정리와 암기' },
    10: { title: '현대사 실전 연습 (1)', desc: '광복~1960년대 기출문제' },
    11: { title: '현대사 실전 연습 (2)', desc: '1970년대~현재 기출문제' },
    12: { title: '현대사 실전 연습 (3)', desc: '남북관계 기출문제' },
    13: { title: '현대사 실전 연습 (4)', desc: '경제·사회 기출문제' },
    14: { title: '현대사 종합 모의고사 (1)', desc: '현대사 전범위 실전 훈련' },
    15: { title: '현대사 종합 모의고사 (2)', desc: '현대사 고난도 문제' },
  },
  'mock-test': {
    1: { title: '시대별 기출분석 - 전근대 (1)', desc: '선사~삼국 주요 기출' },
    2: { title: '시대별 기출분석 - 전근대 (2)', desc: '고려 주요 기출' },
    3: { title: '시대별 기출분석 - 전근대 (3)', desc: '조선 전기 주요 기출' },
    4: { title: '시대별 기출분석 - 전근대 (4)', desc: '조선 후기 주요 기출' },
    5: { title: '시대별 기출분석 - 근대 (1)', desc: '개항~대한제국 주요 기출' },
    6: { title: '시대별 기출분석 - 근대 (2)', desc: '항일운동~국권피탈 주요 기출' },
    7: { title: '시대별 기출분석 - 일제강점기', desc: '일제강점기 주요 기출' },
    8: { title: '시대별 기출분석 - 현대', desc: '현대사 주요 기출' },
    9: { title: '유형별 문제풀이 - 자료분석형', desc: '사료, 지도, 그래프 해석' },
    10: { title: '유형별 문제풀이 - 연표형', desc: '시대순 배열, 연대 추론' },
    11: { title: '유형별 문제풀이 - 비교형', desc: '두 시대/인물/사건 비교' },
    12: { title: '유형별 문제풀이 - 종합형', desc: '통합적 사고력 문제' },
    13: { title: '유형별 문제풀이 - 고난도', desc: '킬러 문항 공략' },
    14: { title: '유형별 문제풀이 - 함정 유형', desc: '자주 틀리는 유형 분석' },
    15: { title: '실전 모의고사 (1)', desc: '20문항 50분 모의고사' },
    16: { title: '실전 모의고사 (2)', desc: '20문항 50분 모의고사' },
    17: { title: '실전 모의고사 (3)', desc: '20문항 50분 모의고사' },
    18: { title: '실전 모의고사 (4)', desc: '오답 분석과 취약점 보완' },
    19: { title: '실전 모의고사 (5)', desc: '최종 점검 모의고사' },
    20: { title: '수능 D-1 최종 정리', desc: '핵심 키워드와 연표 총정리' },
  },
};

const unitInfo: { [key: string]: { units: { name: string; days: number[] }[] } } = {
  'premodern': {
    units: [
      { name: '1단원: 선사~고대', days: [1, 2, 3, 4, 5] },
      { name: '2단원: 고려', days: [6, 7, 8, 9, 10, 11, 12] },
      { name: '3단원: 조선', days: [13, 14, 15, 16, 17, 18, 19, 20] },
    ],
  },
  'modern': {
    units: [
      { name: '1단원: 개항과 개화운동', days: [1, 2, 3, 4, 5] },
      { name: '2단원: 근대국가 수립 노력', days: [6, 7, 8, 9, 10] },
      { name: '3단원: 근대 사회·경제·문화', days: [11, 12, 13, 14, 15] },
    ],
  },
  'colonial': {
    units: [
      { name: '1단원: 일제의 식민통치', days: [1, 2, 3, 4, 5] },
      { name: '2단원: 3.1운동과 임시정부', days: [6, 7, 8, 9, 10] },
      { name: '3단원: 무장독립투쟁', days: [11, 12, 13, 14, 15] },
      { name: '4단원: 실력양성과 사회운동', days: [16, 17, 18, 19, 20] },
    ],
  },
  'contemporary': {
    units: [
      { name: '1단원: 광복과 정부수립', days: [1, 2, 3, 4] },
      { name: '2단원: 민주주의 발전', days: [5, 6, 7, 8, 9, 10] },
      { name: '3단원: 경제성장과 남북관계', days: [11, 12, 13, 14, 15] },
    ],
  },
  'mock-test': {
    units: [
      { name: '1단원: 시대별 기출분석', days: [1, 2, 3, 4, 5, 6, 7, 8] },
      { name: '2단원: 유형별 문제풀이', days: [9, 10, 11, 12, 13, 14] },
      { name: '3단원: 실전 모의고사', days: [15, 16, 17, 18, 19, 20] },
    ],
  },
};

export default function HistorySuneungSubjectPage() {
  const params = useParams();
  const subject = params.subject as string;
  const info = subjectInfo[subject];
  const units = unitInfo[subject]?.units || [];
  const titles = lessonTitles[subject] || {};

  const [completedDays, setCompletedDays] = useState<number[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem(`history-suneung-${subject}-completed`);
    if (saved) {
      setCompletedDays(JSON.parse(saved));
    }
  }, [subject]);

  if (!info) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">과목을 찾을 수 없습니다</h1>
          <Link href="/course/history-suneung" className="text-amber-600 hover:underline">
            한국사 코스로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  const IconComponent = info.icon;
  const progress = Math.round((completedDays.length / info.totalDays) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-amber-50">
      {/* 헤더 */}
      <nav className="bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-2">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">UTTEC Edu</span>
              </Link>
            </div>
            <div className="flex items-center space-x-6">
              <Link href="/course/history-suneung" className="text-gray-300 hover:text-white transition">
                한국사 코스
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* 과목 헤더 */}
      <section className={`bg-gradient-to-r ${info.color} text-white py-12`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 text-sm mb-4">
            <Link href="/course/history-suneung" className="hover:underline">한국사 코스</Link>
            <ChevronRight className="w-4 h-4" />
            <span>{info.name}</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
              <IconComponent className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">{info.name}</h1>
              <p className="text-white/80 mt-1">{info.description}</p>
            </div>
          </div>

          {/* 진행률 */}
          <div className="mt-6 bg-white/10 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm">학습 진행률</span>
              <span className="text-sm font-medium">{completedDays.length} / {info.totalDays}일 완료</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-3">
              <div
                className="bg-white rounded-full h-3 transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 단원별 레슨 목록 */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="space-y-6">
          {units.map((unit, unitIdx) => (
            <div key={unitIdx} className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="bg-gray-50 px-6 py-4 border-b">
                <h2 className="font-bold text-gray-900">{unit.name}</h2>
                <p className="text-sm text-gray-500 mt-1">
                  {unit.days.filter(d => completedDays.includes(d)).length} / {unit.days.length}일 완료
                </p>
              </div>
              <div className="p-4">
                <div className="space-y-2">
                  {unit.days.map((day) => {
                    const isCompleted = completedDays.includes(day);
                    const lessonInfo = titles[day] || { title: `Day ${day}`, desc: '학습 콘텐츠' };
                    return (
                      <Link
                        key={day}
                        href={`/course/history-suneung/${subject}/lesson/${day}`}
                        className={`
                          block p-4 rounded-xl transition border-l-4
                          ${isCompleted
                            ? 'bg-green-50 border-green-500 hover:bg-green-100'
                            : 'bg-gray-50 border-gray-200 hover:bg-amber-50 hover:border-amber-400'
                          }
                        `}
                      >
                        <div className="flex items-center gap-4">
                          <div className={`
                            w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 font-bold
                            ${isCompleted ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}
                          `}>
                            {isCompleted ? <CheckCircle className="w-6 h-6" /> : day}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className={`font-semibold truncate ${isCompleted ? 'text-green-800' : 'text-gray-900'}`}>
                              {lessonInfo.title}
                            </h3>
                            <p className={`text-sm truncate ${isCompleted ? 'text-green-600' : 'text-gray-500'}`}>
                              {lessonInfo.desc}
                            </p>
                          </div>
                          <ChevronRight className={`w-5 h-5 flex-shrink-0 ${isCompleted ? 'text-green-400' : 'text-gray-400'}`} />
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 학습 안내 */}
        <div className="mt-8 bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-6">
          <h3 className="font-bold text-gray-900 mb-4">학습 방법</h3>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-xl shadow-sm text-center">
              <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-lg">1</span>
              </div>
              <p className="text-sm text-gray-600">AI 프롬프트를 복사하여 ChatGPT/Claude에 붙여넣기</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm text-center">
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-lg">2</span>
              </div>
              <p className="text-sm text-gray-600">AI의 설명을 읽고 핵심 키워드 정리</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm text-center">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-lg">3</span>
              </div>
              <p className="text-sm text-gray-600">연표와 주요 사건 암기하기</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm text-center">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-lg">4</span>
              </div>
              <p className="text-sm text-gray-600">유튜브 참고 영상으로 심화 학습</p>
            </div>
          </div>
        </div>
      </main>

      {/* 푸터 */}
      <footer className="bg-slate-900 text-gray-400 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm">© 2025 UTTEC Lab. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
