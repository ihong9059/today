"use client";

import { useState } from "react";
import Link from "next/link";

export default function CookKoreanExamPage() {
  const [activeTab, setActiveTab] = useState<"written" | "practical">("written");

  const writtenSubjects = [
    {
      name: "식품위생 및 법규",
      items: 15,
      passRate: "52%",
      difficulty: "중",
      topics: ["식품위생법", "HACCP 제도", "식품표시기준", "식중독 예방", "개인위생관리", "조리장 위생", "식품첨가물", "유통기한 관리"],
      tips: "식품위생법 조문과 HACCP 7원칙이 핵심. 식중독균 종류와 예방법 필수 암기.",
      href: "/category/service/cook-korean/study/food-hygiene"
    },
    {
      name: "식품학",
      items: 15,
      passRate: "48%",
      difficulty: "중상",
      topics: ["탄수화물", "단백질", "지방", "비타민", "무기질", "식품의 색", "식품의 맛", "식품의 저장"],
      tips: "영양소별 특성, 식품 성분의 변화, 조리 시 변화 이해 필요.",
      href: "/category/service/cook-korean/study/food-science"
    },
    {
      name: "조리이론과 원가계산",
      items: 15,
      passRate: "55%",
      difficulty: "중",
      topics: ["한식 조리법", "양념 배합", "계량 단위", "원가계산 공식", "손익분기점", "재료비 계산", "조리기기 관리", "메뉴 관리"],
      tips: "원가계산 공식 완벽 암기. 한식 기본 조리법과 양념 비율 숙지.",
      href: "/category/service/cook-korean/study/cooking-theory"
    },
    {
      name: "공중보건학",
      items: 15,
      passRate: "58%",
      difficulty: "중하",
      topics: ["보건행정", "역학개론", "감염병관리", "환경위생", "산업보건", "식품과 건강", "보건통계", "건강증진"],
      tips: "감염병 종류와 관리, 환경위생 기준이 자주 출제. 기초 개념 확실히.",
      href: "/category/service/cook-korean/study/public-health"
    }
  ];

  const practicalItems = [
    {
      category: "밥류",
      items: ["비빔밥", "콩나물밥", "장국밥"],
      points: "밥의 물 조절, 고명 배치, 양념장 농도"
    },
    {
      category: "국/탕류",
      items: ["완자탕", "생선찌개", "두부젓국찌개"],
      points: "육수 맛내기, 건더기 크기, 간 맞추기"
    },
    {
      category: "찌개/전골",
      items: ["김치찌개", "된장찌개", "순두부찌개"],
      points: "재료 투입 순서, 끓이는 시간, 양념 배합"
    },
    {
      category: "볶음/조림",
      items: ["제육볶음", "오징어볶음", "두부조림", "감자조림"],
      points: "불 조절, 소스 농도, 재료 익힘 정도"
    },
    {
      category: "구이/전",
      items: ["생선양념구이", "더덕구이", "육원전", "생선전", "풋고추전"],
      points: "밑간, 기름 온도, 뒤집는 타이밍"
    },
    {
      category: "찜/선",
      items: ["생선찜", "섭산적", "화양적"],
      points: "찌는 시간, 양념장 배합, 모양내기"
    },
    {
      category: "회/숙채",
      items: ["미나리강회", "탕평채", "잡채"],
      points: "재료 손질, 초장 비율, 색감 조화"
    },
    {
      category: "김치/젓갈",
      items: ["배추김치", "오이소박이", "나박김치"],
      points: "소금 절임, 양념 배합, 숙성도"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-gray-700">홈</Link>
            <span className="text-gray-300">/</span>
            <Link href="/category/service" className="text-gray-500 hover:text-gray-700">서비스</Link>
            <span className="text-gray-300">/</span>
            <Link href="/category/service/cook-korean" className="text-gray-500 hover:text-gray-700">한식조리기능사</Link>
            <span className="text-gray-300">/</span>
            <span className="text-orange-600 font-medium">시험 상세</span>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-r from-orange-600 to-amber-500 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <Link href="/category/service/cook-korean" className="inline-flex items-center text-orange-200 hover:text-white mb-4 transition">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            한식조리기능사 메인으로
          </Link>
          <h1 className="text-3xl font-bold mb-2">시험 상세 정보</h1>
          <p className="text-orange-100">필기시험과 실기시험의 상세 구성 및 합격 전략</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-4 mb-8">
          <button onClick={() => setActiveTab("written")} className={`px-6 py-3 rounded-xl font-bold transition ${activeTab === "written" ? "bg-orange-600 text-white shadow-lg" : "bg-white text-gray-600 hover:bg-orange-50"}`}>📝 필기시험</button>
          <button onClick={() => setActiveTab("practical")} className={`px-6 py-3 rounded-xl font-bold transition ${activeTab === "practical" ? "bg-orange-600 text-white shadow-lg" : "bg-white text-gray-600 hover:bg-orange-50"}`}>👨‍🍳 실기시험</button>
        </div>

        {activeTab === "written" && (
          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">필기시험 개요</h2>
              <div className="grid md:grid-cols-4 gap-4">
                <div className="bg-orange-50 rounded-lg p-4 text-center">
                  <p className="text-gray-600 text-sm">과목 수</p>
                  <p className="text-2xl font-bold text-orange-600">4과목</p>
                </div>
                <div className="bg-orange-50 rounded-lg p-4 text-center">
                  <p className="text-gray-600 text-sm">총 문항</p>
                  <p className="text-2xl font-bold text-orange-600">60문항</p>
                </div>
                <div className="bg-orange-50 rounded-lg p-4 text-center">
                  <p className="text-gray-600 text-sm">시험 시간</p>
                  <p className="text-2xl font-bold text-orange-600">60분</p>
                </div>
                <div className="bg-orange-50 rounded-lg p-4 text-center">
                  <p className="text-gray-600 text-sm">응시료</p>
                  <p className="text-2xl font-bold text-orange-600">14,500원</p>
                </div>
              </div>
              <div className="mt-4 p-4 bg-amber-50 rounded-lg">
                <p className="text-amber-800"><strong>합격 기준:</strong> 과목당 40점 이상(과락), 전 과목 평균 60점 이상</p>
              </div>
            </div>

            <div className="space-y-6">
              {writtenSubjects.map((subject, i) => (
                <div key={i} className="bg-white rounded-xl shadow-md overflow-hidden">
                  <div className="bg-gradient-to-r from-orange-500 to-amber-500 p-4 text-white">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-xl font-bold">{i + 1}과목. {subject.name}</h3>
                        <p className="text-orange-100 text-sm">{subject.items}문항 | 난이도: {subject.difficulty} | 평균합격률: {subject.passRate}</p>
                      </div>
                      <Link href={subject.href} className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm font-medium transition">학습하기 →</Link>
                    </div>
                  </div>
                  <div className="p-6">
                    <h4 className="font-bold text-gray-800 mb-3">출제 토픽</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
                      {subject.topics.map((topic, j) => (
                        <span key={j} className="bg-gray-100 text-gray-700 px-3 py-1.5 rounded-lg text-sm text-center">{topic}</span>
                      ))}
                    </div>
                    <div className="bg-orange-50 rounded-lg p-4">
                      <p className="text-sm text-orange-700"><strong>💡 합격 TIP:</strong> {subject.tips}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">📊 필기시험 합격 전략</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-bold text-orange-600">✅ 효율적인 학습법</h3>
                  <ul className="space-y-2 text-gray-600 text-sm">
                    <li className="flex gap-2"><span className="text-orange-500">•</span>기출문제 최근 5개년 반복 풀이</li>
                    <li className="flex gap-2"><span className="text-orange-500">•</span>식품위생법 조문 암기 (출제빈도 높음)</li>
                    <li className="flex gap-2"><span className="text-orange-500">•</span>원가계산 공식 완벽 숙지</li>
                    <li className="flex gap-2"><span className="text-orange-500">•</span>식중독균 종류와 예방법 정리</li>
                    <li className="flex gap-2"><span className="text-orange-500">•</span>오답노트 작성 및 복습</li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h3 className="font-bold text-amber-600">⚠️ 주의사항</h3>
                  <ul className="space-y-2 text-gray-600 text-sm">
                    <li className="flex gap-2"><span className="text-amber-500">•</span>과락(40점 미만) 주의 - 한 과목이라도 40점 미만이면 불합격</li>
                    <li className="flex gap-2"><span className="text-amber-500">•</span>식품학은 암기량이 많아 충분한 시간 필요</li>
                    <li className="flex gap-2"><span className="text-amber-500">•</span>법규 개정사항 확인 필수</li>
                    <li className="flex gap-2"><span className="text-amber-500">•</span>계산문제는 단위 환산 실수 주의</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "practical" && (
          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">실기시험 개요</h2>
              <div className="grid md:grid-cols-4 gap-4">
                <div className="bg-orange-50 rounded-lg p-4 text-center">
                  <p className="text-gray-600 text-sm">시험 형태</p>
                  <p className="text-2xl font-bold text-orange-600">작업형</p>
                </div>
                <div className="bg-orange-50 rounded-lg p-4 text-center">
                  <p className="text-gray-600 text-sm">시험 시간</p>
                  <p className="text-2xl font-bold text-orange-600">70분 내외</p>
                </div>
                <div className="bg-orange-50 rounded-lg p-4 text-center">
                  <p className="text-gray-600 text-sm">출제 품목</p>
                  <p className="text-2xl font-bold text-orange-600">31종</p>
                </div>
                <div className="bg-orange-50 rounded-lg p-4 text-center">
                  <p className="text-gray-600 text-sm">응시료</p>
                  <p className="text-2xl font-bold text-orange-600">29,600원</p>
                </div>
              </div>
              <div className="mt-4 p-4 bg-amber-50 rounded-lg">
                <p className="text-amber-800"><strong>합격 기준:</strong> 100점 만점 중 60점 이상</p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">📋 출제 품목 (31종)</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {practicalItems.map((group, i) => (
                  <div key={i} className="border border-orange-200 rounded-lg p-4">
                    <h3 className="font-bold text-orange-600 mb-2">{group.category}</h3>
                    <div className="flex flex-wrap gap-1 mb-2">
                      {group.items.map((item, j) => (
                        <span key={j} className="bg-orange-100 text-orange-700 px-2 py-0.5 rounded text-sm">{item}</span>
                      ))}
                    </div>
                    <p className="text-xs text-gray-500">💡 {group.points}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">⚖️ 실기시험 채점 기준</h2>
              <div className="space-y-4">
                {[
                  { name: "위생상태", weight: 20, desc: "복장, 개인위생, 조리대 청결" },
                  { name: "조리과정", weight: 30, desc: "재료손질, 조리순서, 불조절, 시간관리" },
                  { name: "완성품 평가", weight: 40, desc: "맛, 색, 형태, 분량, 온도" },
                  { name: "정리정돈", weight: 10, desc: "조리 후 정리, 설거지, 쓰레기 처리" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-24 text-sm font-medium text-gray-700">{item.name}</div>
                    <div className="flex-1">
                      <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-orange-500 to-amber-500 rounded-full" style={{ width: `${item.weight}%` }} />
                      </div>
                    </div>
                    <div className="w-12 text-right font-bold text-orange-600">{item.weight}%</div>
                    <div className="w-48 text-xs text-gray-500">{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">🎯 실기시험 합격 전략</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-bold text-orange-600">✅ 필수 준비사항</h3>
                  <ul className="space-y-2 text-gray-600 text-sm">
                    <li className="flex gap-2"><span className="text-orange-500">•</span>31종 품목 레시피 완전 암기</li>
                    <li className="flex gap-2"><span className="text-orange-500">•</span>시간 배분 연습 (70분 내 완성)</li>
                    <li className="flex gap-2"><span className="text-orange-500">•</span>칼질 연습 (균일한 크기 중요)</li>
                    <li className="flex gap-2"><span className="text-orange-500">•</span>불 조절 연습 (가스레인지 사용)</li>
                    <li className="flex gap-2"><span className="text-orange-500">•</span>계량 없이 양념 배합 연습</li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h3 className="font-bold text-amber-600">⚠️ 감점 주의사항</h3>
                  <ul className="space-y-2 text-gray-600 text-sm">
                    <li className="flex gap-2"><span className="text-red-500">•</span>위생복, 위생모 미착용 시 실격</li>
                    <li className="flex gap-2"><span className="text-red-500">•</span>요리 미완성 시 채점 불가</li>
                    <li className="flex gap-2"><span className="text-red-500">•</span>재료 낭비 시 감점</li>
                    <li className="flex gap-2"><span className="text-red-500">•</span>조리 중 맛보기 금지</li>
                    <li className="flex gap-2"><span className="text-red-500">•</span>정해진 시간 초과 시 감점</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-orange-100 to-amber-100 rounded-xl p-6 border border-orange-200">
              <h3 className="font-bold text-orange-800 mb-3">📝 실기시험 당일 체크리스트</h3>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div>
                  <h4 className="font-medium text-orange-700 mb-2">복장</h4>
                  <ul className="text-orange-600 space-y-1">
                    <li>☐ 위생복 (흰색 상의)</li>
                    <li>☐ 위생모 (머리카락 완전 덮음)</li>
                    <li>☐ 앞치마</li>
                    <li>☐ 미끄럼 방지 신발</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-orange-700 mb-2">준비물</h4>
                  <ul className="text-orange-600 space-y-1">
                    <li>☐ 신분증</li>
                    <li>☐ 수험표</li>
                    <li>☐ 개인 칼 (선택)</li>
                    <li>☐ 행주, 수건</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-orange-700 mb-2">마인드셋</h4>
                  <ul className="text-orange-600 space-y-1">
                    <li>☐ 시간 배분 계획</li>
                    <li>☐ 침착하게 진행</li>
                    <li>☐ 위생 항상 체크</li>
                    <li>☐ 정리정돈 습관화</li>
                  </ul>
                </div>
              </div>
            </div>

            <Link href="/category/service/cook-korean/study/practical" className="block bg-orange-600 text-white text-center py-4 rounded-xl font-bold hover:bg-orange-700 transition shadow-lg">실기 대비 학습하기 →</Link>
          </div>
        )}
      </div>

      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2026 자격시험 가이드. UTTEC</p>
        </div>
      </footer>
    </div>
  );
}
