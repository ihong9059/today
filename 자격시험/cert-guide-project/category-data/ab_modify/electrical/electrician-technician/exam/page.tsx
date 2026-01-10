'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ElectricianTechnicianExamPage() {
  const [activeTab, setActiveTab] = useState<'written' | 'practical'>('written');

  const writtenSubjects = [
    {
      name: '전기이론',
      weight: '33%',
      questionCount: 20,
      passRate: '48%',
      difficulty: 3,
      topics: [
        { name: '직류회로', detail: '옴의 법칙, 키르히호프 법칙, 저항의 직병렬 연결' },
        { name: '교류회로', detail: 'RLC 회로, 공진, 역률, 3상 회로' },
        { name: '정전기와 콘덴서', detail: '정전용량, 유전체, 콘덴서 직병렬 연결' },
        { name: '자기와 전자유도', detail: '자기회로, 전자유도, 인덕턴스' },
        { name: '전기계측', detail: '측정법, 오차, 각종 계기' },
        { name: '전기재료', detail: '도체, 반도체, 절연체, 자성체' },
      ],
      tips: '공식 암기보다 개념 이해가 중요합니다. 회로 해석 문제가 자주 출제됩니다.',
      href: '/category/electrical/electrician-technician/study/electrical-theory',
    },
    {
      name: '전기기기',
      weight: '33%',
      questionCount: 20,
      passRate: '42%',
      difficulty: 4,
      topics: [
        { name: '직류기', detail: 'DC 발전기, DC 전동기, 구조, 특성' },
        { name: '동기기', detail: '동기발전기, 동기전동기, 병렬운전' },
        { name: '변압기', detail: '원리, 구조, 결선법, 효율, 전압변동률' },
        { name: '유도기', detail: '3상 유도전동기, 기동법, 속도제어' },
        { name: '정류기', detail: '반파정류, 전파정류, 브리지정류' },
        { name: '특수기기', detail: '서보모터, 스테핑모터, 인버터' },
      ],
      tips: '변압기와 유도전동기 관련 문제가 매회 출제됩니다. 특성곡선 해석 연습이 필요합니다.',
      href: '/category/electrical/electrician-technician/study/electrical-machine',
    },
    {
      name: '전기설비',
      weight: '34%',
      questionCount: 20,
      passRate: '50%',
      difficulty: 3,
      topics: [
        { name: '배선설계', detail: '전선 규격, 허용전류, 전압강하 계산' },
        { name: '배선공사', detail: '금속관, 합성수지관, 케이블 배선' },
        { name: '조명설비', detail: '조명계산, 광원종류, 조명방식' },
        { name: '동력설비', detail: '전동기 용량, 기동방식, 보호장치' },
        { name: '접지공사', detail: '접지종류, 접지저항, 접지공사 방법' },
        { name: '전기안전', detail: '감전보호, 누전차단기, 과전류차단기' },
      ],
      tips: '접지공사와 배선공사가 가장 많이 출제됩니다. 전기설비기준(KEC)을 참조하세요.',
      href: '/category/electrical/electrician-technician/study/electrical-installation',
    },
  ];

  const practicalAreas = [
    {
      name: '배선작업',
      weight: '40%',
      difficulty: 4,
      items: [
        { task: '금속관 배선', points: '관 가공, 커넥터 설치, 전선 인입' },
        { task: '합성수지관 배선', points: 'PVC관 가공, 접착제 사용, 박스 연결' },
        { task: '케이블 배선', points: 'CV 케이블, 단말처리, 케이블 트레이' },
        { task: '덕트 배선', points: '금속덕트, 플로어덕트 시공' },
      ],
      frequency: '매회',
    },
    {
      name: '전기기기 결선',
      weight: '30%',
      difficulty: 4,
      items: [
        { task: '단상 전동기 결선', points: '콘덴서 기동형, 분상 기동형' },
        { task: '3상 전동기 결선', points: 'Y-Δ 결선, 정역운전' },
        { task: '변압기 결선', points: 'Δ-Y, Y-Δ, V결선' },
        { task: '차단기/개폐기 연결', points: 'MCCB, ELB, MC 연결' },
      ],
      frequency: '매회',
    },
    {
      name: '시퀀스 제어',
      weight: '20%',
      difficulty: 5,
      items: [
        { task: 'MC(전자접촉기) 회로', points: '자기유지, 인터록, 정역운전' },
        { task: '타이머 회로', points: 'ON 딜레이, OFF 딜레이' },
        { task: 'PLC 기초', points: '입출력 결선, 래더 프로그램' },
        { task: '기동/정지 회로', points: 'Y-Δ 기동, 리액터 기동' },
      ],
      frequency: '자주',
    },
    {
      name: '측정 및 검사',
      weight: '10%',
      difficulty: 3,
      items: [
        { task: '절연저항 측정', points: '메거 사용, 측정위치' },
        { task: '접지저항 측정', points: '접지저항계 사용법' },
        { task: '전압/전류 측정', points: '멀티미터 사용, CT/PT' },
        { task: '동작 확인', points: '시운전, 트러블슈팅' },
      ],
      frequency: '간헐',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-orange-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-yellow-600">홈</Link>
            <span>/</span>
            <Link href="/category/electrical" className="hover:text-yellow-600">기계·전기분야</Link>
            <span>/</span>
            <Link href="/category/electrical/electrician-technician" className="hover:text-yellow-600">전기기능사</Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">시험정보</span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Hero */}
        <div className="bg-gradient-to-r from-yellow-500 to-orange-600 rounded-2xl p-8 text-white mb-8">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-5xl">⚡</span>
            <div>
              <h1 className="text-3xl font-bold">전기기능사 시험 정보</h1>
              <p className="text-yellow-100">필기시험 + 실기시험 상세 안내</p>
            </div>
          </div>
          <div className="grid sm:grid-cols-4 gap-4 mt-6">
            <div className="bg-white/20 rounded-lg p-3 text-center">
              <p className="text-2xl font-bold">60문항</p>
              <p className="text-sm text-yellow-100">필기 문항수</p>
            </div>
            <div className="bg-white/20 rounded-lg p-3 text-center">
              <p className="text-2xl font-bold">60분</p>
              <p className="text-sm text-yellow-100">필기 시험시간</p>
            </div>
            <div className="bg-white/20 rounded-lg p-3 text-center">
              <p className="text-2xl font-bold">약 4시간</p>
              <p className="text-sm text-yellow-100">실기 시험시간</p>
            </div>
            <div className="bg-white/20 rounded-lg p-3 text-center">
              <p className="text-2xl font-bold">60점</p>
              <p className="text-sm text-yellow-100">합격 기준</p>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab('written')}
            className={`px-6 py-3 rounded-lg font-medium transition ${
              activeTab === 'written'
                ? 'bg-yellow-500 text-white'
                : 'bg-white text-gray-600 hover:bg-yellow-50'
            }`}
          >
            📝 필기시험
          </button>
          <button
            onClick={() => setActiveTab('practical')}
            className={`px-6 py-3 rounded-lg font-medium transition ${
              activeTab === 'practical'
                ? 'bg-orange-500 text-white'
                : 'bg-white text-gray-600 hover:bg-orange-50'
            }`}
          >
            🔧 실기시험
          </button>
        </div>

        {/* Written Exam Tab */}
        {activeTab === 'written' && (
          <div className="space-y-6">
            {/* Overview */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">필기시험 개요</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="p-4 bg-yellow-50 rounded-lg text-center">
                  <p className="text-sm text-gray-600">과목수</p>
                  <p className="text-2xl font-bold text-yellow-600">3과목</p>
                </div>
                <div className="p-4 bg-yellow-50 rounded-lg text-center">
                  <p className="text-sm text-gray-600">문항수</p>
                  <p className="text-2xl font-bold text-yellow-600">60문항</p>
                </div>
                <div className="p-4 bg-yellow-50 rounded-lg text-center">
                  <p className="text-sm text-gray-600">시험시간</p>
                  <p className="text-2xl font-bold text-yellow-600">60분</p>
                </div>
                <div className="p-4 bg-yellow-50 rounded-lg text-center">
                  <p className="text-sm text-gray-600">합격기준</p>
                  <p className="text-2xl font-bold text-yellow-600">60점 이상</p>
                </div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-700">
                  <strong>합격 기준:</strong> 전과목 평균 60점 이상 (과목당 과락 없음)
                </p>
                <p className="text-sm text-gray-700 mt-1">
                  <strong>시험 형식:</strong> 객관식 4지선다, CBT 방식
                </p>
                <p className="text-sm text-gray-700 mt-1">
                  <strong>합격 유효기간:</strong> 필기 합격일로부터 2년
                </p>
              </div>
            </div>

            {/* Subject Details */}
            {writtenSubjects.map((subject, idx) => (
              <div key={idx} className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-4">
                  <div className="flex items-center justify-between text-white">
                    <div>
                      <h3 className="text-xl font-bold">{subject.name}</h3>
                      <p className="text-sm text-yellow-100">배점 {subject.weight} · {subject.questionCount}문항</p>
                    </div>
                    <div className="text-right">
                      <div className="flex mb-1">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className={`text-lg ${i < subject.difficulty ? 'text-white' : 'text-white/30'}`}>★</span>
                        ))}
                      </div>
                      <p className="text-sm text-yellow-100">합격률 {subject.passRate}</p>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h4 className="font-medium text-gray-800 mb-3">출제 토픽</h4>
                  <div className="grid sm:grid-cols-2 gap-3 mb-4">
                    {subject.topics.map((topic, i) => (
                      <div key={i} className="p-3 bg-gray-50 rounded-lg">
                        <p className="font-medium text-gray-800 text-sm">{topic.name}</p>
                        <p className="text-xs text-gray-500 mt-1">{topic.detail}</p>
                      </div>
                    ))}
                  </div>
                  <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                    <p className="text-sm text-yellow-800">
                      <strong>💡 학습 TIP:</strong> {subject.tips}
                    </p>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <Link
                      href={subject.href}
                      className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition"
                    >
                      학습하기 →
                    </Link>
                  </div>
                </div>
              </div>
            ))}

            {/* Written Exam Strategy */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">필기시험 합격 전략</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-4 border border-yellow-200 rounded-lg bg-yellow-50">
                  <h3 className="font-bold text-yellow-800 mb-2">1. 기출문제 집중 학습</h3>
                  <p className="text-sm text-yellow-700">
                    최근 5개년 기출문제를 반복 학습하세요. 동일한 유형이 반복 출제되므로
                    기출 패턴 파악이 중요합니다.
                  </p>
                </div>
                <div className="p-4 border border-orange-200 rounded-lg bg-orange-50">
                  <h3 className="font-bold text-orange-800 mb-2">2. 공식 암기보다 개념 이해</h3>
                  <p className="text-sm text-orange-700">
                    전기이론의 경우 공식을 단순 암기하기보다 원리를 이해하면
                    응용 문제에도 대응할 수 있습니다.
                  </p>
                </div>
                <div className="p-4 border border-amber-200 rounded-lg bg-amber-50">
                  <h3 className="font-bold text-amber-800 mb-2">3. 계산 문제 연습</h3>
                  <p className="text-sm text-amber-700">
                    전압강하, 전력, 역률 계산 등 계산 문제는 반복 연습이 필요합니다.
                    계산기 사용법도 익혀두세요.
                  </p>
                </div>
                <div className="p-4 border border-red-200 rounded-lg bg-red-50">
                  <h3 className="font-bold text-red-800 mb-2">4. 시간 관리</h3>
                  <p className="text-sm text-red-700">
                    60분에 60문항을 풀어야 하므로 문항당 1분 내외로 풀어야 합니다.
                    어려운 문제는 표시 후 나중에 풀이하세요.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Practical Exam Tab */}
        {activeTab === 'practical' && (
          <div className="space-y-6">
            {/* Overview */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">실기시험 개요</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="p-4 bg-orange-50 rounded-lg text-center">
                  <p className="text-sm text-gray-600">시험유형</p>
                  <p className="text-2xl font-bold text-orange-600">작업형</p>
                </div>
                <div className="p-4 bg-orange-50 rounded-lg text-center">
                  <p className="text-sm text-gray-600">시험시간</p>
                  <p className="text-2xl font-bold text-orange-600">약 4시간</p>
                </div>
                <div className="p-4 bg-orange-50 rounded-lg text-center">
                  <p className="text-sm text-gray-600">합격기준</p>
                  <p className="text-2xl font-bold text-orange-600">60점 이상</p>
                </div>
                <div className="p-4 bg-orange-50 rounded-lg text-center">
                  <p className="text-sm text-gray-600">응시료</p>
                  <p className="text-2xl font-bold text-orange-600">57,300원</p>
                </div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-700">
                  <strong>시험 내용:</strong> 전기설비 작업을 실제로 수행하는 작업형 시험입니다.
                </p>
                <p className="text-sm text-gray-700 mt-1">
                  <strong>준비물:</strong> 작업복, 안전화, 안전모 (시험장에서 공구 및 재료 지급)
                </p>
                <p className="text-sm text-gray-700 mt-1">
                  <strong>합격 유효기간:</strong> 최종합격 시 자격증 영구 유효
                </p>
              </div>
            </div>

            {/* Practical Areas */}
            {practicalAreas.map((area, idx) => (
              <div key={idx} className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="bg-gradient-to-r from-orange-400 to-red-500 p-4">
                  <div className="flex items-center justify-between text-white">
                    <div>
                      <h3 className="text-xl font-bold">{area.name}</h3>
                      <p className="text-sm text-orange-100">배점 비중 {area.weight}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex mb-1">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className={`text-lg ${i < area.difficulty ? 'text-white' : 'text-white/30'}`}>★</span>
                        ))}
                      </div>
                      <span className={`text-sm px-2 py-1 rounded ${
                        area.frequency === '매회' ? 'bg-white/30' :
                        area.frequency === '자주' ? 'bg-white/20' : 'bg-white/10'
                      }`}>
                        {area.frequency} 출제
                      </span>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="grid sm:grid-cols-2 gap-3">
                    {area.items.map((item, i) => (
                      <div key={i} className="p-3 bg-gray-50 rounded-lg">
                        <p className="font-medium text-gray-800 text-sm">{item.task}</p>
                        <p className="text-xs text-gray-500 mt-1">{item.points}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}

            {/* Practical Exam Strategy */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">실기시험 합격 전략</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-4 border border-orange-200 rounded-lg bg-orange-50">
                  <h3 className="font-bold text-orange-800 mb-2">1. 반복 실습이 핵심</h3>
                  <p className="text-sm text-orange-700">
                    배선작업은 반복 연습으로 숙달해야 합니다. 직업전문학교나
                    학원에서 실습하거나 개인 실습 장비를 구비하세요.
                  </p>
                </div>
                <div className="p-4 border border-red-200 rounded-lg bg-red-50">
                  <h3 className="font-bold text-red-800 mb-2">2. 시퀀스 회로 이해</h3>
                  <p className="text-sm text-red-700">
                    MC 회로, 자기유지 회로, 타이머 회로 등 시퀀스 제어는
                    반드시 이해하고 결선할 수 있어야 합니다.
                  </p>
                </div>
                <div className="p-4 border border-amber-200 rounded-lg bg-amber-50">
                  <h3 className="font-bold text-amber-800 mb-2">3. 안전수칙 준수</h3>
                  <p className="text-sm text-amber-700">
                    작업 전 전원 차단 확인, 안전장구 착용 등 안전수칙을
                    지키지 않으면 감점 또는 실격될 수 있습니다.
                  </p>
                </div>
                <div className="p-4 border border-yellow-200 rounded-lg bg-yellow-50">
                  <h3 className="font-bold text-yellow-800 mb-2">4. 시간 배분</h3>
                  <p className="text-sm text-yellow-700">
                    4시간 동안 여러 작업을 수행해야 합니다. 각 작업별
                    시간을 미리 배분하고 연습하세요.
                  </p>
                </div>
              </div>
            </div>

            {/* Practical Exam Tips */}
            <div className="bg-orange-50 rounded-xl p-6 border border-orange-200">
              <h3 className="font-bold text-orange-800 mb-4">🔧 실기시험 당일 주의사항</h3>
              <ul className="space-y-2 text-sm text-orange-700">
                <li>• 작업복, 안전화, 안전모를 반드시 착용하세요</li>
                <li>• 시험 시작 전 지급된 공구와 재료를 확인하세요</li>
                <li>• 작업 전 반드시 전원 차단 여부를 확인하세요</li>
                <li>• 결선 완료 후 동작 확인을 반드시 수행하세요</li>
                <li>• 작업장 정리정돈도 평가 항목입니다</li>
                <li>• 모르는 부분은 감독관에게 질문할 수 있습니다</li>
              </ul>
            </div>

            {/* Practical Study Link */}
            <div className="flex justify-center">
              <Link
                href="/category/electrical/electrician-technician/study/practical"
                className="px-8 py-4 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-xl font-bold hover:from-orange-600 hover:to-red-700 transition shadow-lg"
              >
                🔧 실기 대비 학습하기 →
              </Link>
            </div>
          </div>
        )}

        {/* Bottom Navigation */}
        <div className="mt-8 flex justify-between items-center">
          <Link
            href="/category/electrical/electrician-technician"
            className="text-yellow-600 hover:text-yellow-700 flex items-center gap-2"
          >
            ← 전기기능사 메인으로
          </Link>
          <Link
            href="/category/electrical"
            className="text-gray-600 hover:text-gray-700 flex items-center gap-2"
          >
            기계·전기분야 전체보기 →
          </Link>
        </div>
      </div>
    </div>
  );
}
