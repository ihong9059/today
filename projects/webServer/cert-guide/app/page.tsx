'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';

// 모든 자격증 데이터
const allCertifications = [
  // 회계·세무
  { name: '공인회계사(CPA)', href: '/category/accounting/cpa', category: '회계·세무' },
  { name: '세무사', href: '/category/accounting/tax-accountant', category: '회계·세무' },
  { name: '관세사', href: '/category/accounting/customs-broker', category: '회계·세무' },
  { name: '전산회계 1급', href: '/category/accounting/computerized-accounting-1', category: '회계·세무' },
  { name: '전산회계 2급', href: '/category/accounting/computerized-accounting-2', category: '회계·세무' },
  { name: '전산세무 1급', href: '/category/accounting/computerized-tax-1', category: '회계·세무' },
  { name: '전산세무 2급', href: '/category/accounting/computerized-tax-2', category: '회계·세무' },
  { name: 'FAT 1급', href: '/category/accounting/fat-1', category: '회계·세무' },
  { name: 'FAT 2급', href: '/category/accounting/fat-2', category: '회계·세무' },
  { name: 'TAT 1급', href: '/category/accounting/tat-1', category: '회계·세무' },
  { name: 'TAT 2급', href: '/category/accounting/tat-2', category: '회계·세무' },
  { name: '재경관리사', href: '/category/accounting/financial-manager', category: '회계·세무' },

  // 농림·축산
  { name: '식물보호기사', href: '/category/agriculture/plant-protection-engineer', category: '농림·축산' },
  { name: '식물보호산업기사', href: '/category/agriculture/plant-protection-technician', category: '농림·축산' },
  { name: '유기농업기사', href: '/category/agriculture/organic-farming-engineer', category: '농림·축산' },
  { name: '유기농업산업기사', href: '/category/agriculture/organic-farming-technician', category: '농림·축산' },
  { name: '축산기사', href: '/category/agriculture/livestock-engineer', category: '농림·축산' },
  { name: '축산산업기사', href: '/category/agriculture/livestock-technician', category: '농림·축산' },
  { name: '농업기계기사', href: '/category/agriculture/agri-machine-engineer', category: '농림·축산' },
  { name: '농업기계산업기사', href: '/category/agriculture/agri-machine-technician', category: '농림·축산' },
  { name: '종자기사', href: '/category/agriculture/seed-engineer', category: '농림·축산' },
  { name: '종자산업기사', href: '/category/agriculture/seed-technician', category: '농림·축산' },

  // 화학·환경
  { name: '화공기사', href: '/category/chemistry/chemical-engineer', category: '화학·환경' },
  { name: '화학분석기사', href: '/category/chemistry/chemical-analyst', category: '화학·환경' },
  { name: '위험물산업기사', href: '/category/chemistry/hazardous-materials', category: '화학·환경' },
  { name: '환경기사', href: '/category/chemistry/environmental-engineer', category: '화학·환경' },
  { name: '대기환경기사', href: '/category/chemistry/air-environment', category: '화학·환경' },
  { name: '수질환경기사', href: '/category/chemistry/water-environment', category: '화학·환경' },

  // 공무원
  { name: '5급 공채(행정고시)', href: '/category/civil/civil-service-5', category: '공무원' },
  { name: '7급 공채', href: '/category/civil/civil-service-7', category: '공무원' },
  { name: '9급 공채', href: '/category/civil/civil-service-9', category: '공무원' },
  { name: '지방직 7급', href: '/category/civil/local-civil-7', category: '공무원' },
  { name: '지방직 9급', href: '/category/civil/local-civil-9', category: '공무원' },
  { name: '경찰공무원(순경)', href: '/category/civil/police-officer', category: '공무원' },
  { name: '소방공무원(소방사)', href: '/category/civil/firefighter', category: '공무원' },
  { name: '교정직(교도관)', href: '/category/civil/corrections-officer', category: '공무원' },
  { name: '군무원', href: '/category/civil/military-civil', category: '공무원' },

  // 건축·토목
  { name: '건축기사', href: '/category/construction/architect-engineer', category: '건축·토목' },
  { name: '토목기사', href: '/category/construction/civil-engineer', category: '건축·토목' },
  { name: '건설안전기사', href: '/category/construction/construction-safety', category: '건축·토목' },
  { name: '건설기계기사', href: '/category/construction/construction-machine', category: '건축·토목' },
  { name: '측량및지형공간정보기사', href: '/category/construction/surveying-geo', category: '건축·토목' },
  { name: '실내건축기사', href: '/category/construction/interior-architect', category: '건축·토목' },

  // 디자인·문화
  { name: '컴퓨터그래픽스운용기능사', href: '/category/design/computer-graphics', category: '디자인·문화' },
  { name: '웹디자인기능사', href: '/category/design/web-design', category: '디자인·문화' },
  { name: '시각디자인기사', href: '/category/design/visual-design-engineer', category: '디자인·문화' },
  { name: '시각디자인산업기사', href: '/category/design/visual-design-technician', category: '디자인·문화' },
  { name: '제품디자인기사', href: '/category/design/product-design-engineer', category: '디자인·문화' },
  { name: '제품디자인산업기사', href: '/category/design/product-design-technician', category: '디자인·문화' },
  { name: '컬러리스트기사', href: '/category/design/colorist-engineer', category: '디자인·문화' },
  { name: '컬러리스트산업기사', href: '/category/design/colorist-technician', category: '디자인·문화' },
  { name: 'GTQ(그래픽기술자격)', href: '/category/design/gtq', category: '디자인·문화' },
  { name: 'GTQi(일러스트)', href: '/category/design/gtqi', category: '디자인·문화' },

  // 운전·조종
  { name: '1종 보통면허', href: '/category/driving/driver-license-1-normal', category: '운전·조종' },
  { name: '2종 보통면허', href: '/category/driving/driver-license-2-normal', category: '운전·조종' },
  { name: '1종 대형면허', href: '/category/driving/driver-license-1-large', category: '운전·조종' },
  { name: '1종 특수면허', href: '/category/driving/driver-license-1-special', category: '운전·조종' },
  { name: '굴삭기운전기능사', href: '/category/driving/excavator-license', category: '운전·조종' },
  { name: '지게차운전기능사', href: '/category/driving/forklift-license', category: '운전·조종' },
  { name: '기중기운전기능사', href: '/category/driving/crane-license', category: '운전·조종' },
  { name: '소형선박조종사', href: '/category/driving/boat-license', category: '운전·조종' },
  { name: '요트조종면허', href: '/category/driving/yacht-license', category: '운전·조종' },
  { name: '자가용조종사', href: '/category/driving/pilot-license-private', category: '운전·조종' },
  { name: '사업용조종사', href: '/category/driving/pilot-license-commercial', category: '운전·조종' },
  { name: '항공운송조종사', href: '/category/driving/pilot-license-airline', category: '운전·조종' },
  { name: '경량항공기조종사', href: '/category/driving/light-sport-pilot', category: '운전·조종' },

  // 교육
  { name: '교원자격증', href: '/category/education/teacher-certificate', category: '교육' },
  { name: '유치원정교사', href: '/category/education/kindergarten-teacher', category: '교육' },
  { name: '사서교사', href: '/category/education/librarian-teacher', category: '교육' },
  { name: '평생교육사 1급', href: '/category/education/lifelong-educator-1', category: '교육' },
  { name: '평생교육사 2급', href: '/category/education/lifelong-educator-2', category: '교육' },
  { name: '청소년지도사 1급', href: '/category/education/youth-instructor-1', category: '교육' },
  { name: '청소년지도사 2급', href: '/category/education/youth-instructor-2', category: '교육' },
  { name: '직업상담사 1급', href: '/category/education/career-counselor-1', category: '교육' },
  { name: '직업상담사 2급', href: '/category/education/career-counselor-2', category: '교육' },

  // 금융
  { name: '공인중개사', href: '/category/finance/real-estate-agent', category: '금융' },
  { name: '펀드투자권유자문인력', href: '/category/finance/fund-advisor', category: '금융' },
  { name: '증권투자권유자문인력', href: '/category/finance/securities-advisor', category: '금융' },
  { name: '파생상품투자권유자문인력', href: '/category/finance/derivatives-advisor', category: '금융' },
  { name: '신용분석사', href: '/category/finance/credit-analyst', category: '금융' },
  { name: '재무위험관리사', href: '/category/finance/financial-risk-manager', category: '금융' },
  { name: '자산관리사(FP)', href: '/category/finance/fp', category: '금융' },

  // 보험·부동산
  { name: '손해평가사', href: '/category/insurance/damage-assessor', category: '보험·부동산' },
  { name: '주택관리사(보)', href: '/category/insurance/housing-manager', category: '보험·부동산' },
  { name: '보험계리사', href: '/category/insurance/actuary', category: '보험·부동산' },
  { name: '손해사정사', href: '/category/insurance/loss-adjuster', category: '보험·부동산' },
  { name: '보험중개사', href: '/category/insurance/insurance-broker', category: '보험·부동산' },

  // IT·정보통신
  { name: 'ADsP', href: '/category/it/adsp', category: 'IT·정보통신' },
  { name: '데이터분석준전문가', href: '/category/it/adsp', category: 'IT·정보통신' },
  { name: '정보처리기사', href: '/category/it/information-processor', category: 'IT·정보통신' },
  { name: '정보보안기사', href: '/category/it/information-security', category: 'IT·정보통신' },
  { name: '네트워크관리사', href: '/category/it/network-admin', category: 'IT·정보통신' },
  { name: '전자계산기조직응용기사', href: '/category/it/computer-organization', category: 'IT·정보통신' },
  { name: '컴퓨터시스템응용기술사', href: '/category/it/computer-system-pro', category: 'IT·정보통신' },
  { name: '정보관리기술사', href: '/category/it/information-management-pro', category: 'IT·정보통신' },
  { name: '빅데이터분석기사', href: '/category/it/big-data-analyst', category: 'IT·정보통신' },

  // 법률
  { name: '법무사', href: '/category/legal/judicial-scrivener', category: '법률' },
  { name: '변리사', href: '/category/legal/patent-attorney', category: '법률' },
  { name: '공인노무사', href: '/category/legal/labor-attorney', category: '법률' },
  { name: '감정평가사', href: '/category/legal/appraiser', category: '법률' },

  // 의료·보건
  { name: '보건교육사 1급', href: '/category/medical/health-educator-1', category: '의료·보건' },
  { name: '보건교육사 2급', href: '/category/medical/health-educator-2', category: '의료·보건' },
  { name: '보건교육사 3급', href: '/category/medical/health-educator-3', category: '의료·보건' },
  { name: '정신건강간호사', href: '/category/medical/mental-health-nurse', category: '의료·보건' },
  { name: '응급구조사 1급', href: '/category/medical/paramedic-1', category: '의료·보건' },
  { name: '응급구조사 2급', href: '/category/medical/paramedic-2', category: '의료·보건' },

  // 기계·전기·전자
  { name: '기계기사', href: '/category/mechanical/mechanical-engineer', category: '기계·전기·전자' },
  { name: '기계산업기사', href: '/category/mechanical/mechanical-craftsman', category: '기계·전기·전자' },
  { name: '전기기사', href: '/category/mechanical/electric-engineer', category: '기계·전기·전자' },
  { name: '전기산업기사', href: '/category/mechanical/electric-craftsman', category: '기계·전기·전자' },
  { name: '제어계측기사', href: '/category/mechanical/control-engineer', category: '기계·전기·전자' },
  { name: '용접기사', href: '/category/mechanical/welding-engineer', category: '기계·전기·전자' },
  { name: '태양광발전설비기사', href: '/category/mechanical/solar-power-engineer', category: '기계·전기·전자' },
  { name: '풍력발전설비기사', href: '/category/mechanical/wind-power-engineer', category: '기계·전기·전자' },
  { name: '굴삭기운전기능사', href: '/category/mechanical/excavator-operator', category: '기계·전기·전자' },
  { name: '지게차운전기능사', href: '/category/mechanical/forklift-operator', category: '기계·전기·전자' },
  { name: '기중기운전기능사', href: '/category/mechanical/crane-operator', category: '기계·전기·전자' },
  { name: '전기공사기사', href: '/category/mechanical/electrical-work-engineer', category: '기계·전기·전자' },
  { name: '전기기능사', href: '/category/mechanical/electrician-technician', category: '기계·전기·전자' },

  // 사무·경영
  { name: '워드프로세서', href: '/category/office/word-processor', category: '사무·경영' },
  { name: '컴퓨터활용능력 1급', href: '/category/office/computer-skills-1', category: '사무·경영' },
  { name: '컴퓨터활용능력 2급', href: '/category/office/computer-skills-2', category: '사무·경영' },
  { name: '사무자동화산업기사', href: '/category/office/office-automation', category: '사무·경영' },
  { name: '전자상거래관리사 1급', href: '/category/office/ecommerce-1', category: '사무·경영' },
  { name: '전자상거래관리사 2급', href: '/category/office/ecommerce-2', category: '사무·경영' },
  { name: '비서 1급', href: '/category/office/secretary-1', category: '사무·경영' },
  { name: '비서 2급', href: '/category/office/secretary-2', category: '사무·경영' },
  { name: '비서 3급', href: '/category/office/secretary-3', category: '사무·경영' },

  // 안전·소방
  { name: '산업안전기사', href: '/category/safety/industrial-safety', category: '안전·소방' },
  { name: '산업안전산업기사', href: '/category/safety/industrial-safety-technician', category: '안전·소방' },
  { name: '소방설비기사(기계)', href: '/category/safety/fire-equipment-mechanical', category: '안전·소방' },
  { name: '소방설비기사(전기)', href: '/category/safety/fire-equipment-electrical', category: '안전·소방' },
  { name: '위험물기능장', href: '/category/safety/hazardous-master', category: '안전·소방' },
  { name: '위험물기사', href: '/category/safety/hazardous-engineer', category: '안전·소방' },
  { name: '위험물산업기사', href: '/category/safety/hazardous-technician', category: '안전·소방' },
  { name: '가스기사', href: '/category/safety/gas-engineer', category: '안전·소방' },
  { name: '가스산업기사', href: '/category/safety/gas-technician', category: '안전·소방' },
  { name: '위험물기능사', href: '/category/safety/hazardous-craftsman', category: '안전·소방' },
  { name: '산업위생관리기사', href: '/category/safety/industrial-hygiene', category: '안전·소방' },

  // 서비스
  { name: '한식조리기능사', href: '/category/service/cook-korean', category: '서비스' },
  { name: '양식조리기능사', href: '/category/service/cook-western', category: '서비스' },
  { name: '중식조리기능사', href: '/category/service/cook-chinese', category: '서비스' },
  { name: '일식조리기능사', href: '/category/service/cook-japanese', category: '서비스' },
  { name: '복어조리기능사', href: '/category/service/cook-pufferfish', category: '서비스' },
  { name: '제과기능사', href: '/category/service/confectioner', category: '서비스' },
  { name: '제빵기능사', href: '/category/service/bakery', category: '서비스' },
  { name: '미용사(일반)', href: '/category/service/beauty-general', category: '서비스' },
  { name: '미용사(피부)', href: '/category/service/beauty-skin', category: '서비스' },
  { name: '미용사(네일)', href: '/category/service/beauty-nail', category: '서비스' },
  { name: '미용사(메이크업)', href: '/category/service/beauty-makeup', category: '서비스' },
  { name: '이용사', href: '/category/service/barber', category: '서비스' },
  { name: '호텔관리사', href: '/category/service/hotel-manager', category: '서비스' },
  { name: '호텔서비스사', href: '/category/service/hotel-service', category: '서비스' },
  { name: '호텔경영사', href: '/category/service/hotel-admin', category: '서비스' },
  { name: '관광통역안내사', href: '/category/service/tour-guide', category: '서비스' },
  { name: '컨벤션기획사 1급', href: '/category/service/convention-planner-1', category: '서비스' },
  { name: '컨벤션기획사 2급', href: '/category/service/convention-planner-2', category: '서비스' },

  // 무역·물류
  { name: '물류관리사', href: '/category/trade/logistics-manager', category: '무역·물류' },
  { name: '국제무역사', href: '/category/trade/international-trader', category: '무역·물류' },
  { name: '유통관리사 1급', href: '/category/trade/distribution-manager-1', category: '무역·물류' },
  { name: '유통관리사 2급', href: '/category/trade/distribution-manager-2', category: '무역·물류' },
  { name: '유통관리사 3급', href: '/category/trade/distribution-manager-3', category: '무역·물류' },
  { name: '무역영어 1급', href: '/category/trade/trade-english-1', category: '무역·물류' },
  { name: '무역영어 2급', href: '/category/trade/trade-english-2', category: '무역·물류' },
  { name: '무역영어 3급', href: '/category/trade/trade-english-3', category: '무역·물류' },

  // 언어
  { name: 'TOEIC', href: '/category/language/toeic', category: '언어' },
  { name: 'TOEIC Speaking', href: '/category/language/toeic-speaking', category: '언어' },
  { name: 'TEPS', href: '/category/language/teps', category: '언어' },
  { name: 'OPIc', href: '/category/language/opic', category: '언어' },
  { name: 'JLPT', href: '/category/language/jlpt', category: '언어' },
  { name: 'JPT', href: '/category/language/jpt', category: '언어' },
  { name: 'HSK', href: '/category/language/hsk', category: '언어' },
  { name: 'TOPIK', href: '/category/language/topik', category: '언어' },

  // 사회복지·상담
  { name: '사회복지사 1급', href: '/category/welfare/social-worker-1', category: '사회복지·상담' },
  { name: '사회복지사 2급', href: '/category/welfare/social-worker-2', category: '사회복지·상담' },
  { name: '청소년상담사 1급', href: '/category/welfare/youth-counselor-1', category: '사회복지·상담' },
  { name: '청소년상담사 2급', href: '/category/welfare/youth-counselor-2', category: '사회복지·상담' },
  { name: '청소년상담사 3급', href: '/category/welfare/youth-counselor-3', category: '사회복지·상담' },
  { name: '임상심리사 1급', href: '/category/welfare/clinical-psychologist-1', category: '사회복지·상담' },
  { name: '임상심리사 2급', href: '/category/welfare/clinical-psychologist-2', category: '사회복지·상담' },
];

export default function Home() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<typeof allCertifications>([]);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const handleResultClick = (href: string) => {
    setShowResults(false);
    setSearchQuery('');
    router.push(href);
  };

  const categories = [
    { id: 'legal', name: '법률', icon: '⚖️', color: 'from-violet-500 to-purple-600', count: 4, hasPage: true, href: '/category/legal' },
    { id: 'accounting', name: '회계·세무', icon: '📊', color: 'from-emerald-500 to-teal-600', count: 11, hasPage: true, href: '/category/accounting' },
    { id: 'finance', name: '금융', icon: '💰', color: 'from-yellow-500 to-amber-600', count: 7, hasPage: true, href: '/category/finance' },
    { id: 'it', name: 'IT·정보통신', icon: '💻', color: 'from-blue-500 to-cyan-500', count: 9, hasPage: true, href: '/category/it' },
    { id: 'construction', name: '건축·토목', icon: '🏗️', color: 'from-orange-500 to-red-500', count: 6, hasPage: true, href: '/category/construction' },
    { id: 'mechanical', name: '기계·전기·전자', icon: '⚙️', color: 'from-orange-500 to-amber-500', count: 11, hasPage: true, href: '/category/mechanical' },
    { id: 'chemistry', name: '화학·환경', icon: '🧪', color: 'from-green-500 to-emerald-600', count: 5, hasPage: true, href: '/category/chemistry' },
    { id: 'safety', name: '안전·소방', icon: '🛡️', color: 'from-red-500 to-orange-500', count: 11, hasPage: true, href: '/category/safety' },
    { id: 'medical', name: '의료·보건', icon: '🏥', color: 'from-pink-500 to-rose-500', count: 6, hasPage: true, href: '/category/medical' },
    { id: 'education', name: '교육', icon: '📚', color: 'from-indigo-500 to-purple-500', count: 12, hasPage: true, href: '/category/education' },
    { id: 'welfare', name: '사회복지·상담', icon: '🤝', color: 'from-violet-500 to-purple-600', count: 6, hasPage: true, href: '/category/welfare' },
    { id: 'language', name: '언어', icon: '🗣️', color: 'from-sky-500 to-blue-600', count: 8, hasPage: true, href: '/category/language' },
    { id: 'driving', name: '운전·조종', icon: '🚗', color: 'from-gray-500 to-slate-600', count: 13, hasPage: true, href: '/category/driving' },
    { id: 'service', name: '서비스', icon: '🍳', color: 'from-rose-500 to-pink-500', count: 18, hasPage: true, href: '/category/service' },
    { id: 'trade', name: '무역·물류', icon: '📦', color: 'from-teal-500 to-cyan-500', count: 8, hasPage: true, href: '/category/trade' },
    { id: 'office', name: '사무·경영', icon: '💼', color: 'from-violet-500 to-purple-500', count: 9, hasPage: true, href: '/category/office' },
    { id: 'civil', name: '공무원', icon: '🏛️', color: 'from-slate-500 to-gray-700', count: 9, hasPage: true, href: '/category/civil' },
    { id: 'agriculture', name: '농림·축산', icon: '🌾', color: 'from-lime-500 to-green-600', count: 10, hasPage: true, href: '/category/agriculture' },
    { id: 'design', name: '디자인·문화', icon: '🎨', color: 'from-pink-500 to-rose-500', count: 10, hasPage: true, href: '/category/design' },
    { id: 'insurance', name: '보험·부동산', icon: '🏠', color: 'from-cyan-500 to-teal-500', count: 5, hasPage: true, href: '/category/insurance' },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setSearchResults([]);
      setShowResults(false);
      return;
    }

    const results = allCertifications.filter(cert =>
      cert.name.toLowerCase().includes(query.toLowerCase()) ||
      cert.category.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(results.slice(0, 10));
    setShowResults(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-3xl">📜</span>
            <h1 className="text-2xl font-bold text-gray-800">자격시험 가이드</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative hidden sm:block" ref={searchRef}>
              <input
                type="text"
                placeholder="자격증 검색..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                onFocus={() => searchQuery && setShowResults(true)}
                className="w-64 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span className="absolute right-3 top-2.5 text-gray-400">🔍</span>

              {showResults && searchResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border rounded-lg shadow-lg max-h-80 overflow-y-auto z-50">
                  {searchResults.map((cert, idx) => (
                    <div
                      key={idx}
                      onClick={() => handleResultClick(cert.href)}
                      className="block px-4 py-3 hover:bg-blue-50 border-b last:border-b-0 transition cursor-pointer"
                    >
                      <div className="font-medium text-gray-800">{cert.name}</div>
                      <div className="text-xs text-gray-500">{cert.category}</div>
                    </div>
                  ))}
                </div>
              )}

              {showResults && searchQuery && searchResults.length === 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border rounded-lg shadow-lg p-4 text-center text-gray-500">
                  검색 결과가 없습니다
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section - Enhanced */}
      <section className="relative bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 text-white py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-30" style={{backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"}}></div>
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm mb-6">
            <span className="animate-pulse">🔥</span>
            <span>AI 시대, 스마트한 자격증 준비의 시작</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            AI와 함께하는<br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-orange-300">자격시험 합격 전략</span>
          </h2>
          <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            20개 분야 165개 자격시험을 Claude, ChatGPT, Gemini와 함께 준비하세요.<br />
            체계적인 AI 프롬프트로 학습 효율을 극대화합니다.
          </p>

          {/* Mobile Search */}
          <div className="sm:hidden relative max-w-md mx-auto mb-8">
            <input
              type="text"
              placeholder="자격증 검색..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              onFocus={() => searchQuery && setShowResults(true)}
              className="w-full px-4 py-3 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-white text-gray-800"
            />
            <span className="absolute right-3 top-3 text-gray-400">🔍</span>

            {showResults && searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border rounded-lg shadow-lg max-h-60 overflow-y-auto z-50">
                {searchResults.map((cert, idx) => (
                  <div
                    key={idx}
                    onClick={() => handleResultClick(cert.href)}
                    className="block px-4 py-3 hover:bg-blue-50 border-b last:border-b-0 transition cursor-pointer"
                  >
                    <div className="font-medium text-gray-800">{cert.name}</div>
                    <div className="text-xs text-gray-500">{cert.category}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-6 md:gap-12">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-yellow-300">165+</div>
              <div className="text-blue-200 text-sm">자격시험</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-yellow-300">20</div>
              <div className="text-blue-200 text-sm">전문 분야</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-yellow-300">3</div>
              <div className="text-blue-200 text-sm">AI 플랫폼 지원</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-yellow-300">8,000+</div>
              <div className="text-blue-200 text-sm">학습 문제</div>
            </div>
          </div>
        </div>
      </section>

      {/* Why AI Learning Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-sm font-medium mb-4">왜 AI 학습인가?</span>
            <h3 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">자격시험 준비, AI가 필수인 이유</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">기존 학습 방식의 한계를 넘어, AI와 함께 더 빠르고 효율적으로 합격하세요</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Traditional vs AI Learning */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 border border-gray-200">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl">📚</span>
                <h4 className="text-xl font-bold text-gray-700">기존 학습 방식</h4>
              </div>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="text-red-500 mt-1">✗</span>
                  <span className="text-gray-600">정해진 교재와 강의에 의존</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-500 mt-1">✗</span>
                  <span className="text-gray-600">질문에 대한 즉각적인 답변 어려움</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-500 mt-1">✗</span>
                  <span className="text-gray-600">개인 수준에 맞춘 학습 불가능</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-500 mt-1">✗</span>
                  <span className="text-gray-600">반복 학습에 많은 시간 소요</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-8 border border-blue-200">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl">🤖</span>
                <h4 className="text-xl font-bold text-blue-700">AI 기반 학습</h4>
              </div>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="text-green-500 mt-1">✓</span>
                  <span className="text-gray-700">24시간 맞춤형 1:1 과외</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 mt-1">✓</span>
                  <span className="text-gray-700">모르는 개념 즉시 설명 요청 가능</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 mt-1">✓</span>
                  <span className="text-gray-700">약점 분석 및 맞춤 문제 생성</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 mt-1">✓</span>
                  <span className="text-gray-700">효율적인 반복 학습으로 시간 절약</span>
                </li>
              </ul>
            </div>
          </div>

          {/* AI Benefits Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h5 className="font-bold text-lg text-gray-800 mb-2">학습 시간 50% 단축</h5>
              <p className="text-gray-600 text-sm">AI가 핵심 내용을 요약하고, 이해가 부족한 부분만 집중 학습하여 시간을 절약합니다.</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition">
              <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h5 className="font-bold text-lg text-gray-800 mb-2">맞춤형 문제 풀이</h5>
              <p className="text-gray-600 text-sm">틀린 문제 유형을 분석하여 유사 문제를 자동 생성, 약점을 집중 보완합니다.</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition">
              <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl">💡</span>
              </div>
              <h5 className="font-bold text-lg text-gray-800 mb-2">즉각적인 피드백</h5>
              <p className="text-gray-600 text-sm">답변에 대한 상세한 해설과 추가 설명을 즉시 받아볼 수 있습니다.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Pattern Section */}
      <section className="py-16 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block bg-yellow-500/20 text-yellow-300 px-4 py-1 rounded-full text-sm font-medium mb-4">학습 시스템</span>
            <h3 className="text-3xl md:text-4xl font-bold mb-4">체계적인 5단계 학습 패턴</h3>
            <p className="text-gray-400 max-w-2xl mx-auto">각 자격증별로 최적화된 AI 학습 프롬프트를 제공합니다</p>
          </div>

          <div className="grid md:grid-cols-5 gap-4 mb-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-white/15 transition group">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition">
                <span className="text-xl font-bold">1</span>
              </div>
              <h5 className="font-bold mb-2">개념 학습</h5>
              <p className="text-gray-400 text-sm">핵심 이론과 개념을 AI가 쉽게 설명</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-white/15 transition group">
              <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition">
                <span className="text-xl font-bold">2</span>
              </div>
              <h5 className="font-bold mb-2">문제 풀이</h5>
              <p className="text-gray-400 text-sm">유형별 문제 연습 및 해설 확인</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-white/15 transition group">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition">
                <span className="text-xl font-bold">3</span>
              </div>
              <h5 className="font-bold mb-2">오답 분석</h5>
              <p className="text-gray-400 text-sm">틀린 문제의 원인 파악 및 보완</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-white/15 transition group">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition">
                <span className="text-xl font-bold">4</span>
              </div>
              <h5 className="font-bold mb-2">심화 학습</h5>
              <p className="text-gray-400 text-sm">고난도 문제와 응용력 향상</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-white/15 transition group">
              <div className="w-12 h-12 bg-gradient-to-br from-red-400 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition">
                <span className="text-xl font-bold">5</span>
              </div>
              <h5 className="font-bold mb-2">실전 모의</h5>
              <p className="text-gray-400 text-sm">실제 시험과 동일한 환경 연습</p>
            </div>
          </div>

          {/* Example Prompt */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-2xl">💬</span>
              <h5 className="text-xl font-bold">AI 학습 프롬프트 예시</h5>
            </div>
            <div className="bg-black/30 rounded-xl p-6 font-mono text-sm text-gray-300 overflow-x-auto">
              <p className="text-green-400 mb-2"># 전기기사 - 전력공학 개념 학습 프롬프트</p>
              <p className="mb-4">당신은 전기기사 시험 전문 튜터입니다. 전력공학 과목의 핵심 개념을 설명해주세요.</p>
              <p className="text-yellow-300">학습 주제: 송전선로의 코로나 현상</p>
              <p className="text-gray-400 mt-4">1. 코로나 현상의 정의와 발생 원인을 설명해주세요</p>
              <p className="text-gray-400">2. 코로나 임계전압 계산 공식을 유도해주세요</p>
              <p className="text-gray-400">3. 코로나 방지 대책 5가지를 알려주세요</p>
              <p className="text-gray-400">4. 관련 기출문제 3개를 제시하고 풀이해주세요</p>
            </div>
          </div>
        </div>
      </section>

      {/* AI Platforms Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block bg-purple-100 text-purple-700 px-4 py-1 rounded-full text-sm font-medium mb-4">AI 플랫폼</span>
            <h3 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">3가지 AI와 함께 학습하세요</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">각 AI의 장점을 활용하여 최적의 학습 경험을 제공합니다</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-8 border border-orange-200 hover:shadow-xl transition group">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-amber-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-3xl">🤖</span>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-800">Claude</h4>
                  <p className="text-orange-600 text-sm">by Anthropic</p>
                </div>
              </div>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center gap-2">
                  <span className="text-orange-500">●</span>
                  논리적이고 체계적인 설명
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-orange-500">●</span>
                  긴 문맥 이해력 우수
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-orange-500">●</span>
                  복잡한 개념 분석에 강점
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border border-green-200 hover:shadow-xl transition group">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-3xl">💬</span>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-800">ChatGPT</h4>
                  <p className="text-green-600 text-sm">by OpenAI</p>
                </div>
              </div>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center gap-2">
                  <span className="text-green-500">●</span>
                  다양한 예시와 비유 활용
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">●</span>
                  창의적인 문제 해결
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">●</span>
                  대화형 학습에 최적화
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-200 hover:shadow-xl transition group">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-3xl">✨</span>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-800">Gemini</h4>
                  <p className="text-blue-600 text-sm">by Google</p>
                </div>
              </div>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center gap-2">
                  <span className="text-blue-500">●</span>
                  최신 정보 검색 연동
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-blue-500">●</span>
                  멀티모달 학습 지원
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-blue-500">●</span>
                  빠른 응답 속도
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <span className="inline-block bg-indigo-100 text-indigo-700 px-4 py-1 rounded-full text-sm font-medium mb-4">자격시험 카테고리</span>
          <h3 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">20개 분야별 자격시험</h3>
          <p className="text-gray-600">원하는 분야를 선택하여 AI 학습을 시작하세요</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={cat.href}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all transform hover:-translate-y-2 overflow-hidden group"
            >
              <div className={`bg-gradient-to-r ${cat.color} p-4 text-center group-hover:scale-105 transition`}>
                <span className="text-4xl">{cat.icon}</span>
              </div>
              <div className="p-4 text-center">
                <h4 className="font-bold text-gray-800 group-hover:text-blue-600 transition text-sm md:text-base">{cat.name}</h4>
                <p className="text-gray-400 text-xs mt-1">{cat.count}개 자격증</p>
                <div className="mt-2 text-blue-500 text-xs font-medium group-hover:text-blue-700">
                  학습 시작 →
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* How to Use Section */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block bg-green-100 text-green-700 px-4 py-1 rounded-full text-sm font-medium mb-4">이용 방법</span>
            <h3 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">3단계로 시작하는 AI 학습</h3>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="relative">
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition h-full">
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg">1</div>
                <div className="text-5xl mb-4 mt-4">🎯</div>
                <h5 className="font-bold text-xl text-gray-800 mb-3">자격증 선택</h5>
                <p className="text-gray-600">원하는 분야와 자격증을 선택하세요. 165개 이상의 자격시험 정보가 준비되어 있습니다.</p>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition h-full">
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg">2</div>
                <div className="text-5xl mb-4 mt-4">📋</div>
                <h5 className="font-bold text-xl text-gray-800 mb-3">학습 프롬프트 복사</h5>
                <p className="text-gray-600">과목별로 최적화된 AI 학습 프롬프트를 복사하세요. 클릭 한 번으로 간편하게!</p>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition h-full">
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg">3</div>
                <div className="text-5xl mb-4 mt-4">🚀</div>
                <h5 className="font-bold text-xl text-gray-800 mb-3">AI와 학습 시작</h5>
                <p className="text-gray-600">Claude, ChatGPT, Gemini 중 선호하는 AI에 붙여넣기하고 학습을 시작하세요!</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-indigo-600 to-purple-700 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h3 className="text-3xl md:text-4xl font-bold mb-6">지금 바로 AI 학습을 시작하세요!</h3>
          <p className="text-indigo-200 text-lg mb-8">회원가입 없이 무료로 모든 학습 자료를 이용할 수 있습니다</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/category/it" className="bg-white text-indigo-700 px-8 py-4 rounded-xl font-bold hover:bg-indigo-50 transition shadow-lg">
              IT 자격증 보기
            </Link>
            <Link href="/category/accounting" className="bg-indigo-500 text-white px-8 py-4 rounded-xl font-bold hover:bg-indigo-400 transition border border-indigo-400">
              회계·세무 보기
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">📜</span>
                <span className="text-xl font-bold">자격시험 가이드</span>
              </div>
              <p className="text-gray-400 text-sm">AI와 함께하는 스마트한 자격시험 준비 플랫폼</p>
            </div>
            <div>
              <h5 className="font-bold mb-4">인기 분야</h5>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><Link href="/category/it" className="hover:text-white transition">IT·정보통신</Link></li>
                <li><Link href="/category/accounting" className="hover:text-white transition">회계·세무</Link></li>
                <li><Link href="/category/mechanical" className="hover:text-white transition">기계·전기·전자</Link></li>
                <li><Link href="/category/safety" className="hover:text-white transition">안전·소방</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold mb-4">AI 플랫폼</h5>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="https://claude.ai" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">Claude</a></li>
                <li><a href="https://chat.openai.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">ChatGPT</a></li>
                <li><a href="https://gemini.google.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">Gemini</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold mb-4">안내</h5>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>무료 이용 가능</li>
                <li>회원가입 불필요</li>
                <li>24시간 접속 가능</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-gray-500">© 2026 자격시험 가이드. UTTEC</p>
            <p className="text-gray-600 text-sm mt-2">본 사이트는 자격시험 정보 및 AI 학습 가이드 제공 목적으로 운영됩니다.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
