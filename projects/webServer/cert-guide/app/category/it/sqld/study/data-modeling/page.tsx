'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

export default function SQLDDataModelingPage() {
  const [openTopics, setOpenTopics] = useState<number[]>([0]);
  const [completedItems, setCompletedItems] = useState<string[]>([]);
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentQuestion, setCurrentQuestion] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('sqld-datamodeling-completed');
    if (saved) setCompletedItems(JSON.parse(saved));
  }, []);

  const saveProgress = (items: string[]) => {
    localStorage.setItem('sqld-datamodeling-completed', JSON.stringify(items));
    setCompletedItems(items);
  };

  const toggleItem = (id: string) => {
    const newItems = completedItems.includes(id)
      ? completedItems.filter(i => i !== id)
      : [...completedItems, id];
    saveProgress(newItems);
  };

  const toggleTopic = (index: number) => {
    setOpenTopics(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  const openAIHelper = (question: string) => {
    setCurrentQuestion(question);
    setShowAIModal(true);
  };

  const topics = [
    {
      title: "데이터 모델링의 이해",
      icon: "📊",
      items: [
        "데이터 모델링: 현실 세계의 데이터를 추상화하여 표현하는 과정",
        "모델링의 특징: 추상화, 단순화, 명확화",
        "모델링 3단계: 개념적 → 논리적 → 물리적 모델링",
        "데이터 모델링 3요소: 구조(Structure), 연산(Operation), 제약조건(Constraint)",
        "데이터 독립성: 논리적 독립성, 물리적 독립성",
        "3층 스키마: 외부 스키마, 개념 스키마, 내부 스키마",
        "데이터 모델링 유의점: 중복, 비유연성, 비일관성 최소화",
        "데이터 모델링의 목적: 업무 정보 수집, 분석, 저장 구조 설계",
        "좋은 데이터 모델 기준: 완전성, 중복배제, 업무규칙, 데이터 재사용",
        "ERD(Entity Relationship Diagram): 엔티티 간 관계를 도식화"
      ]
    },
    {
      title: "엔티티(Entity)",
      icon: "📦",
      items: [
        "엔티티 정의: 업무에 필요한 정보를 저장/관리하는 집합",
        "엔티티 특징: 업무 필요성, 식별자 존재, 인스턴스 집합, 속성 보유, 관계 존재",
        "유형 엔티티: 물리적 형태가 있는 엔티티 (예: 사원, 물품)",
        "개념 엔티티: 물리적 형태 없이 개념적으로 존재 (예: 조직, 보험상품)",
        "사건 엔티티: 업무 처리에 따라 발생하는 엔티티 (예: 주문, 청구)",
        "기본 엔티티: 독립적으로 생성되는 엔티티 (예: 고객, 상품)",
        "중심 엔티티: 기본 엔티티로부터 발생, 업무 중심 역할 (예: 계약, 주문)",
        "행위 엔티티: 2개 이상 엔티티로부터 발생 (예: 주문목록, 이력)",
        "엔티티 명명규칙: 현업 용어 사용, 단수 명사, 약어 자제",
        "엔티티-인스턴스-속성-속성값의 관계 이해하기"
      ]
    },
    {
      title: "속성(Attribute)",
      icon: "📝",
      items: [
        "속성 정의: 엔티티에서 관리해야 하는 최소 데이터 단위",
        "속성의 특성: 업무에서 필요한 정보, 의미상 더 이상 분리 불가",
        "기본 속성: 업무에서 추출한 원래의 속성 (예: 이름, 주민번호)",
        "설계 속성: 데이터 모델링 과정에서 발생 (예: 일련번호, 코드)",
        "파생 속성: 다른 속성으로부터 계산되어 생성 (예: 합계, 평균)",
        "단일값 속성: 하나의 값만 가지는 속성",
        "다중값 속성: 여러 값을 가지는 속성 (별도 엔티티로 분리)",
        "속성 명명규칙: 해당 업무의 용어 사용, 서술식 속성명 자제",
        "도메인(Domain): 속성이 가질 수 있는 값의 범위",
        "복합 속성: 여러 의미를 가진 속성 (주소 → 시/구/동)"
      ]
    },
    {
      title: "관계(Relationship)",
      icon: "🔗",
      items: [
        "관계 정의: 엔티티 간의 업무적 연관성",
        "관계의 페어링: 엔티티 인스턴스 간 실제 관계 표현",
        "존재적 관계: 한 엔티티의 존재가 다른 엔티티에 영향 (소속)",
        "행위적 관계: 업무 행위에 의해 발생 (주문)",
        "관계 차수(Cardinality): 1:1, 1:N, M:N 관계",
        "필수적 관계: 반드시 관계가 존재해야 함 (|로 표기)",
        "선택적 관계: 관계가 없을 수 있음 (○로 표기)",
        "관계 표기법: IE 표기법 vs Barker 표기법",
        "관계 읽기: 각 방향별로 관계를 명확히 정의",
        "재귀적 관계(Self Relationship): 자기 자신과의 관계 (상위부서)"
      ]
    },
    {
      title: "식별자(Identifier)",
      icon: "🔑",
      items: [
        "식별자 정의: 엔티티 내 인스턴스를 구분하는 속성 또는 속성 집합",
        "주식별자(PK): 엔티티를 대표하는 유일 식별자",
        "주식별자 특징: 유일성, 최소성, 불변성, 존재성(NOT NULL)",
        "보조식별자: 주식별자 외 인스턴스 식별 가능한 속성",
        "내부식별자: 엔티티 내에서 스스로 생성되는 식별자",
        "외부식별자(FK): 다른 엔티티와의 관계에서 받아오는 식별자",
        "단일식별자: 하나의 속성으로 식별",
        "복합식별자: 두 개 이상 속성의 조합으로 식별",
        "본질식별자: 업무에서 만들어지는 식별자",
        "인조식별자: 인위적으로 만든 식별자 (일련번호 등)"
      ]
    },
    {
      title: "식별자 관계와 비식별자 관계",
      icon: "↔️",
      items: [
        "식별자 관계: 부모 PK가 자식의 PK에 포함되는 관계",
        "비식별자 관계: 부모 PK가 자식의 일반 속성이 되는 관계",
        "식별자 관계 장점: 데이터 무결성 보장, 관계 명확성",
        "식별자 관계 단점: PK 속성 증가, SQL 복잡도 증가",
        "비식별자 관계 선택 기준: 부모 없이도 자식 존재 가능 시",
        "비식별자 관계 선택 기준: 부모의 PK 구성이 복잡할 때",
        "실선: 식별자 관계를 나타냄",
        "점선: 비식별자 관계를 나타냄",
        "ERD에서 관계선 표기 이해하기",
        "식별자 관계 과다 시 문제점: JOIN 복잡, 데이터 중복"
      ]
    },
    {
      title: "정규화(Normalization)",
      icon: "⚙️",
      items: [
        "정규화 정의: 데이터 중복 제거와 무결성 확보를 위한 과정",
        "정규화 목적: 이상현상(Anomaly) 방지",
        "삽입 이상: 원치 않는 데이터까지 삽입해야 함",
        "삭제 이상: 삭제 시 필요한 데이터까지 삭제됨",
        "갱신 이상: 일부만 수정되어 데이터 불일치 발생",
        "1정규형(1NF): 모든 속성값이 원자값(Atomic Value)",
        "2정규형(2NF): 1NF + 부분 함수적 종속 제거",
        "3정규형(3NF): 2NF + 이행적 함수적 종속 제거",
        "BCNF: 3NF + 결정자가 모두 후보키",
        "함수적 종속(FD): X→Y, X가 Y를 결정함"
      ]
    },
    {
      title: "반정규화(Denormalization)",
      icon: "🔄",
      items: [
        "반정규화 정의: 성능 향상을 위해 정규화된 테이블을 통합/분리",
        "반정규화 필요 시점: 조회 성능이 중요할 때",
        "테이블 병합: 1:1, 1:M 관계 테이블 통합",
        "테이블 분할: 수직(컬럼) 분할, 수평(행) 분할",
        "중복 테이블 추가: 집계 테이블, 진행 테이블, 특정 부분만 포함",
        "컬럼 중복: 조인 성능 향상을 위한 컬럼 추가",
        "파생 컬럼 추가: 미리 계산된 값 저장",
        "중복 관계 추가: 빈번한 경로에 관계 추가",
        "반정규화 주의점: 데이터 무결성 저하 가능",
        "반정규화 vs 정규화 트레이드오프 이해"
      ]
    },
    {
      title: "대량 데이터에 따른 성능",
      icon: "📈",
      items: [
        "파티셔닝: 대용량 테이블을 물리적으로 분리",
        "Range Partition: 범위 기준 분할 (날짜, 숫자 등)",
        "List Partition: 특정 값 기준 분할 (지역, 부서 등)",
        "Hash Partition: 해시 함수 기준 분할",
        "Composite Partition: 복합 파티션 (Range+Hash 등)",
        "파티션 인덱스: Local Index vs Global Index",
        "클러스터링: 동일 블록에 관련 데이터 저장",
        "IOT(Index Organized Table): 인덱스 구조로 테이블 저장",
        "대용량 테이블 설계 시 고려사항",
        "성능 분석: 실행계획, 통계정보 활용"
      ]
    },
    {
      title: "데이터베이스 구조와 성능",
      icon: "🏗️",
      items: [
        "슈퍼타입/서브타입 모델: 공통+개별 속성 분리",
        "슈퍼/서브타입 변환: One to One, Plus, Single Type",
        "인덱스 특성: B-Tree, 비트맵, 함수 기반 인덱스",
        "분산 데이터베이스: 분산 질의 처리, 투명성",
        "분산 DB 장단점: 지역 자치성 vs 복잡성",
        "데이터 복제(Replication): 동기/비동기 방식",
        "데이터 단편화: 수평/수직 단편화",
        "데이터 접근 패턴 분석 중요성",
        "자주 사용하는 컬럼 그룹화하기",
        "데이터 아키텍처 원칙 이해하기"
      ]
    }
  ];

  const totalItems = topics.reduce((sum, t) => sum + t.items.length, 0);
  const progress = Math.round((completedItems.length / totalItems) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/category/it/sqld" className="text-orange-600 hover:text-orange-800 flex items-center gap-2">
            <span>←</span>
            <span>SQLD로 돌아가기</span>
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-4xl">📐</span>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-800">데이터 모델링</h1>
              <p className="text-gray-600">1과목 핵심 개념 100문항</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex-1 bg-gray-200 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-orange-500 to-amber-600 h-3 rounded-full transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-sm font-medium text-gray-600">{completedItems.length}/{totalItems}</span>
          </div>
        </div>

        <div className="space-y-4">
          {topics.map((topic, topicIndex) => {
            const topicItems = topic.items.map((_, i) => `${topicIndex}-${i}`);
            const completedInTopic = topicItems.filter(id => completedItems.includes(id)).length;

            return (
              <div key={topicIndex} className="bg-white rounded-xl shadow-md overflow-hidden">
                <button
                  onClick={() => toggleTopic(topicIndex)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-orange-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{topic.icon}</span>
                    <div className="text-left">
                      <h3 className="font-semibold text-gray-800">{topic.title}</h3>
                      <p className="text-sm text-gray-500">{completedInTopic}/{topic.items.length} 완료</p>
                    </div>
                  </div>
                  <span className={`transform transition-transform ${openTopics.includes(topicIndex) ? 'rotate-180' : ''}`}>
                    ▼
                  </span>
                </button>

                {openTopics.includes(topicIndex) && (
                  <div className="px-6 pb-4 space-y-2">
                    {topic.items.map((item, itemIndex) => {
                      const itemId = `${topicIndex}-${itemIndex}`;
                      const isCompleted = completedItems.includes(itemId);

                      return (
                        <div
                          key={itemIndex}
                          className={`flex items-start gap-3 p-3 rounded-lg border transition-colors ${
                            isCompleted ? 'bg-orange-50 border-orange-200' : 'bg-gray-50 border-gray-200'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={isCompleted}
                            onChange={() => toggleItem(itemId)}
                            className="mt-1 w-5 h-5 text-orange-600 rounded cursor-pointer"
                          />
                          <span className={`flex-1 text-sm ${isCompleted ? 'text-gray-500 line-through' : 'text-gray-700'}`}>
                            {item}
                          </span>
                          <button
                            onClick={() => openAIHelper(item)}
                            className="text-orange-500 hover:text-orange-700 text-xs px-2 py-1 rounded bg-orange-100 hover:bg-orange-200"
                          >
                            AI
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-8 bg-orange-50 rounded-xl p-6 border border-orange-200">
          <h3 className="font-bold text-orange-800 mb-3">💡 1과목 학습 전략</h3>
          <ul className="space-y-2 text-orange-700 text-sm">
            <li>• <strong>배점</strong>: 10문항 (20%) - 과락 방지가 핵심</li>
            <li>• <strong>핵심</strong>: ERD 읽기, 정규화, 식별자 관계</li>
            <li>• <strong>암기</strong>: 정규화 단계별 특징, 용어 정의</li>
            <li>• <strong>시간</strong>: 15분 이내 마무리 목표</li>
          </ul>
        </div>
      </div>

      {showLoginModal && <LoginRequiredModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />}

      {showAIModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">AI에게 질문하기</h3>
            <p className="text-sm text-gray-600 mb-4 p-3 bg-gray-50 rounded-lg">{currentQuestion}</p>
            <div className="space-y-2">
              <a
                href={`https://claude.ai/new?q=${encodeURIComponent(`SQLD 데이터 모델링 관련 질문입니다: "${currentQuestion}" - 예시와 함께 자세히 설명해주세요.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-gradient-to-r from-orange-500 to-amber-500 text-white py-3 rounded-lg hover:from-orange-600 hover:to-amber-600"
              >
                Claude에게 질문
              </a>
              <a
                href={`https://chat.openai.com/?q=${encodeURIComponent(`SQLD 데이터 모델링 관련 질문입니다: "${currentQuestion}" - 예시와 함께 자세히 설명해주세요.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 rounded-lg hover:from-green-600 hover:to-emerald-600"
              >
                ChatGPT에게 질문
              </a>
              <a
                href={`https://gemini.google.com/?q=${encodeURIComponent(`SQLD 데이터 모델링 관련 질문입니다: "${currentQuestion}" - 예시와 함께 자세히 설명해주세요.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-3 rounded-lg hover:from-blue-600 hover:to-indigo-600"
              >
                Gemini에게 질문
              </a>
            </div>
            <button
              onClick={() => setShowAIModal(false)}
              className="w-full mt-4 py-2 text-gray-600 hover:text-gray-800"
            >
              닫기
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
