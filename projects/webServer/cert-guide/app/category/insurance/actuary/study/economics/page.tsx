'use client';

import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';
import { useState, useEffect } from 'react';

export default function EconomicsStudyPage() {
  const [openTopic, setOpenTopic] = useState<number | null>(0);
  const [completedQuestions, setCompletedQuestions] = useState<Set<number>>(new Set());
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentPrompt, setCurrentPrompt] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('actuary-economics-completed');
    if (saved) setCompletedQuestions(new Set(JSON.parse(saved)));
  }, []);

  const toggleComplete = (id: number) => {
    const newCompleted = new Set(completedQuestions);
    if (newCompleted.has(id)) newCompleted.delete(id);
    else newCompleted.add(id);
    setCompletedQuestions(newCompleted);
    localStorage.setItem('actuary-economics-completed', JSON.stringify([...newCompleted]));
  };

  const handleAIClick = (prompt: string) => {
    setCurrentPrompt(prompt);
    setShowAIModal(true);
  };

  const topics = [
    {
      title: '미시경제학 기초',
      questions: [
        { id: 1, question: '수요의 법칙과 수요곡선의 이동을 설명하시오.', answer: '가격이 상승하면 수요량이 감소하는 것이 수요의 법칙입니다. 가격 변화는 곡선 위 이동, 소득·기호 등 변화는 곡선 자체를 이동시킵니다.', prompt: '수요의 법칙, 수요량 변화와 수요 변화의 차이, 수요곡선 이동요인을 설명해주세요' },
        { id: 2, question: '수요의 가격탄력성과 총수입의 관계를 설명하시오.', answer: '탄력적(|Ed|>1)이면 가격인하 시 총수입 증가, 비탄력적(|Ed|<1)이면 가격인상 시 총수입 증가합니다.', prompt: '수요의 가격탄력성의 정의, 계산, 그리고 총수입 극대화 조건을 설명해주세요' },
        { id: 3, question: '한계효용체감의 법칙과 소비자 균형을 설명하시오.', answer: '재화 소비량이 증가할수록 추가적 만족(한계효용)이 감소합니다. MU/P가 모든 재화에 대해 같을 때 소비자 균형이 달성됩니다.', prompt: '한계효용체감의 법칙, 소비자 균형조건, 그리고 효용극대화를 설명해주세요' },
        { id: 4, question: '무차별곡선과 예산선을 이용한 소비자 선택을 설명하시오.', answer: '무차별곡선은 동일 효용을 주는 재화조합, 예산선은 구입가능한 조합입니다. 두 선의 접점에서 효용 극대화됩니다.', prompt: '무차별곡선의 성질, 예산선, 그리고 효용극대화 균형을 설명해주세요' },
        { id: 5, question: '대체효과와 소득효과를 설명하시오.', answer: '가격변화 효과를 대체효과(상대가격 변화)와 소득효과(실질소득 변화)로 분해합니다. 기펜재는 소득효과가 대체효과를 압도합니다.', prompt: '대체효과와 소득효과의 분리, 힉스 분해, 기펜재를 설명해주세요' },
        { id: 6, question: '생산함수와 한계생산체감의 법칙을 설명하시오.', answer: '생산함수는 투입요소와 산출량의 관계입니다. 다른 요소가 고정될 때 한 요소의 투입 증가에 따라 한계생산이 체감합니다.', prompt: '생산함수의 종류, 한계생산·평균생산, 한계생산체감의 법칙을 설명해주세요' },
        { id: 7, question: '등량곡선과 등비용선을 이용한 비용최소화를 설명하시오.', answer: '등량곡선은 동일 산출량을 내는 요소조합, 등비용선은 동일 비용의 요소조합입니다. 접점에서 비용 최소화됩니다.', prompt: '등량곡선, 한계기술대체율, 비용최소화 조건을 설명해주세요' },
        { id: 8, question: '단기비용곡선과 장기비용곡선의 관계를 설명하시오.', answer: '단기에는 일부 요소가 고정, 장기에는 모든 요소가 가변입니다. 장기비용곡선은 단기비용곡선들의 포락선입니다.', prompt: '고정비용과 가변비용, 단기·장기비용곡선, 규모의 경제를 설명해주세요' },
        { id: 9, question: '완전경쟁시장의 특성과 이윤극대화를 설명하시오.', answer: '다수의 생산자, 동질적 상품, 자유로운 진입·퇴출이 특성입니다. P=MC에서 이윤극대화, 장기에는 P=AC로 초과이윤 소멸합니다.', prompt: '완전경쟁시장의 가정, 단기·장기균형, 기업의 공급곡선을 설명해주세요' },
        { id: 10, question: '독점시장의 가격결정과 사회적 비용을 설명하시오.', answer: '독점기업은 MR=MC에서 가격결정하며, 완전경쟁보다 높은 가격·낮은 산출량으로 자중손실(deadweight loss)이 발생합니다.', prompt: '독점의 이윤극대화, 가격차별, 자중손실을 설명해주세요' }
      ]
    },
    {
      title: '시장균형이론',
      questions: [
        { id: 11, question: '일반균형이론의 개념과 파레토 효율성을 설명하시오.', answer: '일반균형은 모든 시장이 동시에 균형인 상태입니다. 파레토 효율은 누군가를 악화시키지 않고는 누구도 개선할 수 없는 상태입니다.', prompt: '일반균형과 부분균형의 차이, 파레토 효율성의 조건을 설명해주세요' },
        { id: 12, question: '후생경제학의 제1정리와 제2정리를 설명하시오.', answer: '제1정리: 경쟁균형은 파레토 효율적입니다. 제2정리: 적절한 초기부존 재배분으로 어떤 파레토 효율 배분도 경쟁균형으로 달성 가능합니다.', prompt: '후생경제학의 기본정리들과 그 함의를 설명해주세요' },
        { id: 13, question: '외부성의 개념과 해결방법을 설명하시오.', answer: '외부성은 시장거래 외부에서 제3자에게 미치는 영향입니다. 피구세, 보조금, 코즈 정리에 의한 협상 등으로 해결합니다.', prompt: '외부성의 정의와 종류, 피구세와 코즈 정리를 설명해주세요' },
        { id: 14, question: '공공재의 특성과 효율적 공급조건을 설명하시오.', answer: '비배제성, 비경합성이 특성입니다. 효율적 공급조건은 ΣMB = MC (개인 한계편익의 합 = 한계비용)입니다.', prompt: '공공재의 정의, 사적재와의 차이, 효율적 공급조건을 설명해주세요' },
        { id: 15, question: '정보비대칭과 역선택, 도덕적 해이를 설명하시오.', answer: '정보비대칭은 거래당사자 간 정보 차이입니다. 역선택은 사전적 정보비대칭, 도덕적 해이는 사후적 정보비대칭으로 인한 문제입니다.', prompt: '정보비대칭의 유형, 역선택과 도덕적 해이의 차이, 보험시장에서의 영향을 설명해주세요' },
        { id: 16, question: '게임이론의 기초와 내쉬균형을 설명하시오.', answer: '게임이론은 전략적 상황에서의 의사결정을 분석합니다. 내쉬균형은 상대방 전략이 주어질 때 어느 누구도 전략을 바꿀 유인이 없는 상태입니다.', prompt: '게임이론의 기본개념, 우월전략, 내쉬균형을 설명해주세요' },
        { id: 17, question: '죄수의 딜레마와 반복게임을 설명하시오.', answer: '죄수의 딜레마는 개별합리성이 집단비효율로 이어지는 상황입니다. 반복게임에서는 협조가 균형으로 나타날 수 있습니다.', prompt: '죄수의 딜레마의 구조, 1회게임과 반복게임의 차이를 설명해주세요' },
        { id: 18, question: '과점시장의 특성과 쿠르노 모형을 설명하시오.', answer: '소수 기업이 시장을 지배하는 형태입니다. 쿠르노 모형에서 각 기업은 상대방 산출량을 주어진 것으로 보고 이윤극대화합니다.', prompt: '과점시장의 특성, 쿠르노 균형과 베르트랑 균형을 설명해주세요' },
        { id: 19, question: '시장실패의 원인과 정부개입의 정당성을 설명하시오.', answer: '외부성, 공공재, 정보비대칭, 독과점 등이 시장실패 원인입니다. 정부개입으로 효율성을 개선할 수 있으나, 정부실패도 고려해야 합니다.', prompt: '시장실패의 유형, 정부개입의 방법과 한계를 설명해주세요' },
        { id: 20, question: '소득분배와 형평성 기준을 설명하시오.', answer: '지니계수, 로렌츠곡선으로 소득분배를 측정합니다. 형평성 기준으로 공리주의, 롤스의 정의론, 노직의 자유지상주의 등이 있습니다.', prompt: '소득분배 측정방법과 다양한 형평성 기준을 설명해주세요' }
      ]
    },
    {
      title: '거시경제학',
      questions: [
        { id: 21, question: 'GDP의 개념과 측정방법을 설명하시오.', answer: 'GDP는 일정 기간 국내에서 생산된 최종재화·서비스의 시장가치입니다. 생산, 지출, 소득 측면에서 측정하며 모두 동일합니다.', prompt: 'GDP의 정의, 3면등가의 원칙, GDP와 GNP의 차이를 설명해주세요' },
        { id: 22, question: '명목GDP와 실질GDP의 차이를 설명하시오.', answer: '명목GDP는 당해연도 가격, 실질GDP는 기준연도 가격으로 평가합니다. GDP디플레이터 = 명목GDP/실질GDP × 100입니다.', prompt: '명목GDP와 실질GDP, GDP디플레이터, 인플레이션 측정을 설명해주세요' },
        { id: 23, question: '케인즈의 소비함수와 승수효과를 설명하시오.', answer: 'C = C₀ + cY (c는 한계소비성향). 정부지출 승수 = 1/(1-c)로, 지출 증가가 소득에 미치는 확대효과를 나타냅니다.', prompt: '케인즈 소비함수, 한계소비성향, 정부지출 승수를 설명해주세요' },
        { id: 24, question: '투자의 결정요인과 가속도 원리를 설명하시오.', answer: '투자는 이자율, 기대수익률, GDP 성장률 등에 의존합니다. 가속도 원리에 따르면 투자는 GDP 변화에 비례합니다.', prompt: '투자 결정이론, 토빈의 q, 가속도 원리를 설명해주세요' },
        { id: 25, question: 'IS-LM 모형의 구조와 균형을 설명하시오.', answer: 'IS곡선은 재화시장 균형, LM곡선은 화폐시장 균형을 나타냅니다. 두 곡선의 교점에서 이자율과 국민소득이 동시 결정됩니다.', prompt: 'IS곡선과 LM곡선의 도출, 재정정책과 금융정책의 효과를 설명해주세요' },
        { id: 26, question: '총수요-총공급 모형을 설명하시오.', answer: '총수요곡선은 물가와 총지출의 관계, 총공급곡선은 물가와 총생산의 관계입니다. 교점에서 균형 물가와 산출량이 결정됩니다.', prompt: '총수요곡선과 총공급곡선의 도출과 이동요인, 단기와 장기의 차이를 설명해주세요' },
        { id: 27, question: '인플레이션의 원인과 비용을 설명하시오.', answer: '수요견인, 비용인상, 통화량 증가가 원인입니다. 인플레이션 비용으로 메뉴비용, 신발가죽비용, 자원배분 왜곡 등이 있습니다.', prompt: '인플레이션의 원인과 종류, 비용과 재분배효과를 설명해주세요' },
        { id: 28, question: '필립스곡선과 자연실업률 가설을 설명하시오.', answer: '단기 필립스곡선은 인플레이션과 실업의 상충관계를 보여줍니다. 장기에는 자연실업률에서 수직이 됩니다.', prompt: '필립스곡선, 자연실업률, 적응적 기대와 합리적 기대를 설명해주세요' },
        { id: 29, question: '경기변동의 특성과 경기순환이론을 설명하시오.', answer: '경기변동은 확장과 수축이 반복되는 현상입니다. 실물적 경기변동론, 케인즈적 경기변동론 등이 있습니다.', prompt: '경기변동의 특성, 주요 경기순환이론을 설명해주세요' },
        { id: 30, question: '경제성장이론(솔로우 모형)을 설명하시오.', answer: '솔로우 모형에서 1인당 소득의 장기 성장은 기술진보에 의존합니다. 저축률 증가는 수준효과만 있고 성장률 효과는 없습니다.', prompt: '솔로우 모형의 구조, 정상상태, 수렴가설을 설명해주세요' }
      ]
    },
    {
      title: '금융시장론',
      questions: [
        { id: 31, question: '화폐의 기능과 통화량 측정을 설명하시오.', answer: '화폐는 교환매개, 가치저장, 회계단위 기능을 합니다. M1은 협의통화, M2는 광의통화로 측정합니다.', prompt: '화폐의 기능, 통화지표(M1, M2), 통화승수를 설명해주세요' },
        { id: 32, question: '중앙은행의 통화정책 수단을 설명하시오.', answer: '공개시장조작, 재할인율, 지급준비율 정책이 주요 수단입니다. 공개시장조작이 가장 빈번히 사용됩니다.', prompt: '중앙은행의 통화정책 수단과 각각의 효과를 설명해주세요' },
        { id: 33, question: '이자율의 결정이론을 설명하시오.', answer: '대부자금설은 저축과 투자에 의해, 유동성선호설은 화폐수요와 공급에 의해 이자율이 결정된다고 봅니다.', prompt: '대부자금설과 유동성선호설, 이자율 결정 메커니즘을 설명해주세요' },
        { id: 34, question: '이자율 기간구조와 수익률곡선을 설명하시오.', answer: '기간에 따른 이자율의 관계를 기간구조라 합니다. 기대가설, 유동성프리미엄가설 등으로 설명합니다.', prompt: '이자율 기간구조, 수익률곡선의 형태, 기대가설과 유동성프리미엄가설을 설명해주세요' },
        { id: 35, question: '피셔효과와 실질이자율을 설명하시오.', answer: '피셔효과: 명목이자율 = 실질이자율 + 기대인플레이션. 명목이자율이 인플레이션을 반영하여 조정됩니다.', prompt: '피셔효과, 실질이자율과 명목이자율의 관계를 설명해주세요' },
        { id: 36, question: '채권가격과 이자율의 관계를 설명하시오.', answer: '채권가격과 이자율은 역의 관계입니다. 이자율 상승 시 채권의 현재가치가 하락하여 채권가격이 하락합니다.', prompt: '채권가격 결정, 이자율과의 역관계, 듀레이션을 설명해주세요' },
        { id: 37, question: '주식가치평가의 배당할인모형을 설명하시오.', answer: '주식가치는 미래 배당금의 현재가치입니다. 고든 모형: P = D/(r-g), 배당성장률 g가 일정할 때 적용합니다.', prompt: '배당할인모형, 고든 성장모형, 주가수익비율(PER)을 설명해주세요' },
        { id: 38, question: '환율의 결정이론을 설명하시오.', answer: '구매력평가설은 물가수준, 이자율평가설은 이자율 차이로 환율을 설명합니다. 단기에는 이자율, 장기에는 물가가 중요합니다.', prompt: '환율 결정이론, 구매력평가설, 이자율평가설을 설명해주세요' },
        { id: 39, question: '국제수지와 환율제도를 설명하시오.', answer: '국제수지는 경상수지와 자본수지로 구성됩니다. 고정환율제, 변동환율제, 관리변동환율제 등이 있습니다.', prompt: '국제수지의 구성, 환율제도의 종류와 장단점을 설명해주세요' },
        { id: 40, question: '금융위기의 원인과 전파메커니즘을 설명하시오.', answer: '과잉유동성, 금융혁신, 규제실패 등이 원인입니다. 신용경색, 자산가격 폭락을 통해 실물경제로 전파됩니다.', prompt: '금융위기의 원인, 전파메커니즘, 대처방안을 설명해주세요' }
      ]
    },
    {
      title: '금융경제학',
      questions: [
        { id: 41, question: '포트폴리오 이론의 기본개념을 설명하시오.', answer: '마코위츠의 포트폴리오 이론은 기대수익률과 위험(분산)으로 투자를 평가합니다. 분산투자로 비체계적 위험을 줄일 수 있습니다.', prompt: '마코위츠 포트폴리오 이론, 효율적 프론티어, 분산투자 효과를 설명해주세요' },
        { id: 42, question: 'CAPM(자본자산가격결정모형)을 설명하시오.', answer: 'E(Ri) = Rf + βi[E(Rm) - Rf]. 자산의 기대수익률은 체계적 위험(베타)에 비례합니다.', prompt: 'CAPM의 가정과 공식, 베타의 의미, 증권시장선(SML)을 설명해주세요' },
        { id: 43, question: '차익거래 가격결정이론(APT)을 설명하시오.', answer: 'APT는 여러 요인으로 수익률을 설명합니다. CAPM과 달리 시장포트폴리오 가정이 불필요합니다.', prompt: 'APT의 가정과 공식, CAPM과의 차이를 설명해주세요' },
        { id: 44, question: '효율적 시장가설(EMH)을 설명하시오.', answer: '시장가격이 모든 정보를 반영한다는 가설입니다. 약형, 준강형, 강형 효율성으로 구분됩니다.', prompt: '효율적 시장가설의 세 가지 형태와 검증방법을 설명해주세요' },
        { id: 45, question: '기대효용이론과 위험회피를 설명하시오.', answer: '불확실성 하 의사결정에서 기대효용을 극대화합니다. 효용함수가 오목하면 위험회피적입니다.', prompt: '기대효용이론, 위험회피 정도의 측정, 확실성등가를 설명해주세요' },
        { id: 46, question: '행동재무학의 주요 개념을 설명하시오.', answer: '인간의 제한된 합리성과 심리적 편향을 분석합니다. 과신, 손실회피, 정신계정 등이 주요 개념입니다.', prompt: '행동재무학의 주요 개념(과신, 손실회피, 프레이밍 효과)을 설명해주세요' },
        { id: 47, question: '옵션가격결정(블랙-숄즈 모형)의 기본개념을 설명하시오.', answer: '블랙-숄즈 공식은 주가, 행사가격, 잔존기간, 이자율, 변동성으로 옵션가격을 산출합니다.', prompt: '옵션의 기본개념, 블랙-숄즈 모형의 가정과 공식을 설명해주세요' },
        { id: 48, question: '리스크 관리와 VaR를 설명하시오.', answer: 'VaR는 일정 신뢰수준에서 최대 손실가능액입니다. 분산-공분산법, 역사적 시뮬레이션, 몬테카를로 시뮬레이션으로 계산합니다.', prompt: 'VaR의 정의, 계산방법, 한계점을 설명해주세요' },
        { id: 49, question: '금리리스크와 듀레이션 매칭을 설명하시오.', answer: '듀레이션은 채권 현금흐름의 가중평균 만기입니다. 자산과 부채의 듀레이션을 일치시켜 금리리스크를 관리합니다.', prompt: '듀레이션의 정의와 계산, 면역전략(immunization)을 설명해주세요' },
        { id: 50, question: '파생상품의 종류와 활용을 설명하시오.', answer: '선물, 옵션, 스왑이 대표적입니다. 헤지, 투기, 차익거래 목적으로 활용되며, 보험회사도 위험관리에 활용합니다.', prompt: '파생상품의 종류, 특성, 보험회사의 활용을 설명해주세요' }
      ]
    }
  ];

  const totalQuestions = topics.reduce((sum, t) => sum + t.questions.length, 0);
  const completedCount = completedQuestions.size;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-gray-700">홈</Link>
            <span className="text-gray-300">/</span>
            <Link href="/category/insurance" className="text-gray-500 hover:text-gray-700">보험·부동산</Link>
            <span className="text-gray-300">/</span>
            <Link href="/category/insurance/actuary" className="text-gray-500 hover:text-gray-700">보험계리사</Link>
            <span className="text-gray-300">/</span>
            <span className="text-indigo-600 font-medium">경제학</span>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">경제학</h1>
          <p className="text-gray-600">Economics - 미시경제학, 거시경제학, 금융경제학</p>
          <div className="mt-4 flex items-center gap-4">
            <div className="flex-1 bg-gray-200 rounded-full h-3">
              <div className="bg-indigo-600 h-3 rounded-full transition-all" style={{ width: `${(completedCount / totalQuestions) * 100}%` }} />
            </div>
            <span className="text-sm text-gray-500">{completedCount}/{totalQuestions} 완료</span>
          </div>
        </div>

        <div className="space-y-4">
          {topics.map((topic, topicIdx) => (
            <div key={topicIdx} className="bg-white rounded-2xl shadow-sm border overflow-hidden">
              <button onClick={() => setOpenTopic(openTopic === topicIdx ? null : topicIdx)} className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">📈</span>
                  <div className="text-left">
                    <h2 className="font-bold">{topic.title}</h2>
                    <p className="text-sm text-gray-500">{topic.questions.length}문항</p>
                  </div>
                </div>
                <span className={`transform transition-transform ${openTopic === topicIdx ? 'rotate-180' : ''}`}>▼</span>
              </button>

              {openTopic === topicIdx && (
                <div className="px-6 pb-4 space-y-3">
                  {topic.questions.map((q) => (
                    <div key={q.id} className={`p-4 rounded-xl border ${completedQuestions.has(q.id) ? 'bg-indigo-50 border-indigo-200' : 'bg-gray-50'}`}>
                      <div className="flex items-start gap-3">
                        <button onClick={() => toggleComplete(q.id)} className={`mt-1 w-5 h-5 rounded border-2 flex items-center justify-center ${completedQuestions.has(q.id) ? 'bg-indigo-600 border-indigo-600 text-white' : 'border-gray-300'}`}>
                          {completedQuestions.has(q.id) && '✓'}
                        </button>
                        <div className="flex-1">
                          <p className="font-medium mb-2">Q{q.id}. {q.question}</p>
                          <p className="text-sm text-gray-600 mb-3">{q.answer}</p>
                          <button onClick={() => handleAIClick(q.prompt)} className="text-sm text-indigo-600 hover:text-indigo-700">🤖 AI에게 더 자세히 질문하기</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link href="/category/insurance/actuary" className="text-indigo-600 hover:text-indigo-700 font-medium">← 보험계리사 메인으로</Link>
        </div>
      </main>

      {showLoginModal && <LoginRequiredModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />}

      {showAIModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">AI에게 질문하기</h3>
              <button onClick={() => setShowAIModal(false)} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 mb-4">
              <p className="text-gray-700">{currentPrompt}</p>
            </div>
            <div className="grid gap-3">
              <a href={`https://claude.ai/new?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 p-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700">Claude에게 질문하기</a>
              <a href={`https://chat.openai.com/?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 p-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700">ChatGPT에게 질문하기</a>
              <a href={`https://gemini.google.com/app?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 p-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700">Gemini에게 질문하기</a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
