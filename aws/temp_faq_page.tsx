'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ChevronDown, Search, MessageCircle } from 'lucide-react';

// FAQ 데이터
const faqData = [
  {
    category: '수강 관련',
    questions: [
      {
        q: '강의는 어떻게 수강하나요?',
        a: '회원가입 후 원하는 강의를 구매하시면 "내강의" 페이지에서 바로 수강하실 수 있습니다. 강의는 구매일로부터 1년간 무제한 반복 수강이 가능합니다.',
      },
      {
        q: '수강 기간은 얼마인가요?',
        a: '모든 강의는 구매일로부터 1년간 수강 가능합니다. 수강 기간 내에는 횟수 제한 없이 반복 학습하실 수 있습니다.',
      },
      {
        q: '모바일에서도 수강할 수 있나요?',
        a: '네, PC와 모바일 모두에서 수강 가능합니다. 별도의 앱 설치 없이 웹브라우저를 통해 언제 어디서나 학습하실 수 있습니다.',
      },
    ],
  },
  {
    category: '결제 관련',
    questions: [
      {
        q: '어떤 결제 방법을 지원하나요?',
        a: '신용카드, 체크카드, 계좌이체, 카카오페이, 네이버페이 등 다양한 결제 수단을 지원합니다.',
      },
      {
        q: '환불은 어떻게 하나요?',
        a: '구매 후 7일 이내, 강의 진도율 10% 미만인 경우 전액 환불이 가능합니다. "내강의" 페이지에서 환불 신청을 하시거나 고객센터로 문의해 주세요.',
      },
      {
        q: '할인 쿠폰은 어떻게 사용하나요?',
        a: '결제 페이지에서 쿠폰 코드를 입력하시면 자동으로 할인이 적용됩니다. 쿠폰은 중복 사용이 불가하며, 유효기간을 확인해 주세요.',
      },
    ],
  },
  {
    category: '계정 관련',
    questions: [
      {
        q: '비밀번호를 잊어버렸어요.',
        a: '로그인 페이지의 "비밀번호를 잊으셨나요?" 링크를 클릭하시면 가입한 이메일로 비밀번호 재설정 링크를 보내드립니다.',
      },
      {
        q: '회원 탈퇴는 어떻게 하나요?',
        a: '마이페이지 > 설정 > 회원탈퇴에서 진행하실 수 있습니다. 탈퇴 시 수강 중인 강의와 학습 데이터가 모두 삭제되며 복구할 수 없으니 신중하게 결정해 주세요.',
      },
    ],
  },
  {
    category: '기술 지원',
    questions: [
      {
        q: '영상이 재생되지 않아요.',
        a: '먼저 인터넷 연결 상태를 확인해 주세요. 문제가 지속되면 브라우저 캐시를 삭제하거나 다른 브라우저에서 시도해 보세요. Chrome 최신 버전을 권장합니다.',
      },
      {
        q: '하드웨어(보드)는 어디서 구매하나요?',
        a: '강의에서 사용하는 STM32, Arduino, ESP32 등의 하드웨어는 각 강의 소개 페이지에서 구매 링크를 제공합니다. 또는 전자부품 온라인 쇼핑몰에서 구매하실 수 있습니다.',
      },
    ],
  },
];

// FAQ 아이템 컴포넌트
function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-5 flex items-center justify-between text-left hover:text-blue-600 transition"
      >
        <span className="font-medium text-gray-900 pr-4">{question}</span>
        <ChevronDown className={`w-5 h-5 text-gray-500 flex-shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className="pb-5 text-gray-600 leading-relaxed">
          {answer}
        </div>
      )}
    </div>
  );
}

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // 검색 필터링
  const filteredFAQ = faqData.map(category => ({
    ...category,
    questions: category.questions.filter(q =>
      q.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.a.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  })).filter(category =>
    (!selectedCategory || category.category === selectedCategory) &&
    category.questions.length > 0
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* 히어로 섹션 */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">자주 묻는 질문</h1>
          <p className="text-blue-200 mb-8">궁금한 점을 빠르게 찾아보세요</p>

          {/* 검색창 */}
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="질문을 검색해보세요..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-xl text-gray-900 focus:ring-4 focus:ring-blue-500/50 outline-none"
            />
          </div>
        </div>
      </section>

      <main className="max-w-4xl mx-auto px-4 py-12">
        {/* 카테고리 필터 */}
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-4 py-2 rounded-full transition ${
              !selectedCategory
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            전체
          </button>
          {faqData.map((category) => (
            <button
              key={category.category}
              onClick={() => setSelectedCategory(category.category)}
              className={`px-4 py-2 rounded-full transition ${
                selectedCategory === category.category
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {category.category}
            </button>
          ))}
        </div>

        {/* FAQ 목록 */}
        {filteredFAQ.length > 0 ? (
          <div className="space-y-8">
            {filteredFAQ.map((category) => (
              <div key={category.category} className="bg-white rounded-2xl shadow-sm p-6">
                <h2 className="text-lg font-bold text-blue-600 mb-4 flex items-center gap-2">
                  <MessageCircle className="w-5 h-5" />
                  {category.category}
                </h2>
                <div>
                  {category.questions.map((faq, index) => (
                    <FAQItem key={index} question={faq.q} answer={faq.a} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500">
            <p>검색 결과가 없습니다.</p>
          </div>
        )}

        {/* 추가 문의 안내 */}
        <div className="mt-12 bg-blue-50 rounded-2xl p-8 text-center">
          <h3 className="text-xl font-bold text-gray-900 mb-2">원하는 답변을 찾지 못하셨나요?</h3>
          <p className="text-gray-600 mb-6">고객센터로 문의해 주시면 빠르게 답변드리겠습니다.</p>
          <a
            href="mailto:support@uttec.com"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            문의하기
          </a>
        </div>
      </main>

      <Footer />
    </div>
  );
}
