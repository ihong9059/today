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
  { name: '정보처리기사', href: '/category/it/information-processor', category: 'IT·정보통신' },
  { name: '정보보안기사', href: '/category/it/information-security', category: 'IT·정보통신' },
  { name: '네트워크관리사', href: '/category/it/network-admin', category: 'IT·정보통신' },
  { name: '전자계산기조직응용기사', href: '/category/it/computer-organization', category: 'IT·정보통신' },
  { name: '컴퓨터시스템응용기술사', href: '/category/it/computer-system-pro', category: 'IT·정보통신' },
  { name: '정보관리기술사', href: '/category/it/information-management-pro', category: 'IT·정보통신' },

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
  { name: '굴삭기운전기능사', href: '/category/mechanical/excavator-operator', category: '기계·전기·전자' },
  { name: '지게차운전기능사', href: '/category/mechanical/forklift-operator', category: '기계·전기·전자' },
  { name: '기중기운전기능사', href: '/category/mechanical/crane-operator', category: '기계·전기·전자' },

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

  // 사회복지·상담
  { name: '사회복지사 1급', href: '/category/welfare/social-worker-1', category: '사회복지·상담' },
  { name: '사회복지사 2급', href: '/category/welfare/social-worker-2', category: '사회복지·상담' },
  { name: '청소년상담사 1급', href: '/category/welfare/youth-counselor-1', category: '사회복지·상담' },
  { name: '청소년상담사 2급', href: '/category/welfare/youth-counselor-2', category: '사회복지·상담' },
  { name: '청소년상담사 3급', href: '/category/welfare/youth-counselor-3', category: '사회복지·상담' },
  { name: '임상심리사 1급', href: '/category/welfare/clinical-psychologist-1', category: '사회복지·상담' },
  { name: '임상심리사 2급', href: '/category/welfare/clinical-psychologist-2', category: '사회복지·상담' },

  // 언어
  { name: 'TOEIC', href: '/category/language/toeic', category: '언어' },
  { name: '토익', href: '/category/language/toeic', category: '언어' },
  { name: 'TOEIC Speaking', href: '/category/language/toeic-speaking', category: '언어' },
  { name: '토익스피킹', href: '/category/language/toeic-speaking', category: '언어' },
  { name: 'TEPS', href: '/category/language/teps', category: '언어' },
  { name: '텝스', href: '/category/language/teps', category: '언어' },
  { name: 'OPIc', href: '/category/language/opic', category: '언어' },
  { name: '오픽', href: '/category/language/opic', category: '언어' },
  { name: 'JLPT', href: '/category/language/jlpt', category: '언어' },
  { name: '일본어능력시험', href: '/category/language/jlpt', category: '언어' },
  { name: 'JPT', href: '/category/language/jpt', category: '언어' },
  { name: '일본어시험', href: '/category/language/jpt', category: '언어' },
  { name: 'HSK', href: '/category/language/hsk', category: '언어' },
  { name: '중국어시험', href: '/category/language/hsk', category: '언어' },
  { name: 'TOPIK', href: '/category/language/topik', category: '언어' },
  { name: '한국어능력시험', href: '/category/language/topik', category: '언어' },

  // 데이터
  { name: 'ADsP', href: '/category/it/adsp', category: 'IT·정보통신' },
  { name: '데이터분석준전문가', href: '/category/it/adsp', category: 'IT·정보통신' },
  { name: '데이터분석 준전문가', href: '/category/it/adsp', category: 'IT·정보통신' },
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
    { id: 'it', name: 'IT·정보통신', icon: '💻', color: 'from-blue-500 to-cyan-500', count: 12, hasPage: true, href: '/category/it' },
    { id: 'construction', name: '건축·토목', icon: '🏗️', color: 'from-orange-500 to-red-500', count: 5, hasPage: true, href: '/category/construction' },
    { id: 'mechanical', name: '기계·전기·전자', icon: '⚙️', color: 'from-orange-500 to-amber-500', count: 15, hasPage: true, href: '/category/mechanical' },
    { id: 'chemistry', name: '화학·환경', icon: '🧪', color: 'from-green-500 to-emerald-600', count: 5, hasPage: true, href: '/category/chemistry' },
    { id: 'safety', name: '안전·소방', icon: '🛡️', color: 'from-red-500 to-orange-500', count: 10, hasPage: true, href: '/category/safety' },
    { id: 'medical', name: '의료·보건', icon: '🏥', color: 'from-pink-500 to-rose-500', count: 6, hasPage: true, href: '/category/medical' },
    { id: 'education', name: '교육', icon: '📚', color: 'from-indigo-500 to-purple-500', count: 5, hasPage: true, href: '/category/education' },
    { id: 'welfare', name: '사회복지·상담', icon: '🤝', color: 'from-violet-500 to-purple-600', count: 13, hasPage: true, href: '/category/welfare' },
    { id: 'language', name: '언어', icon: '🗣️', color: 'from-sky-500 to-blue-600', count: 8, hasPage: true, href: '/category/language' },
    { id: 'driving', name: '운전·조종', icon: '🚗', color: 'from-gray-500 to-slate-600', count: 10, hasPage: true, href: '/category/driving' },
    { id: 'service', name: '서비스', icon: '🍳', color: 'from-rose-500 to-pink-500', count: 17, hasPage: true, href: '/category/service' },
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

              {/* Search Results Dropdown */}
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

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">한국 자격시험 종합 가이드</h2>
          <p className="text-lg md:text-xl text-blue-100 mb-6">20개 분야 200+ 자격시험 정보와 AI 학습 도우미</p>

          {/* Mobile Search */}
          <div className="sm:hidden relative max-w-md mx-auto mb-6" ref={searchRef}>
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

            {showResults && searchQuery && searchResults.length === 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border rounded-lg shadow-lg p-4 text-center text-gray-500">
                검색 결과가 없습니다
              </div>
            )}
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            <div className="bg-white/20 px-4 py-2 rounded-full text-sm">
              🤖 Claude · ChatGPT · Gemini
            </div>
            <div className="bg-white/20 px-4 py-2 rounded-full text-sm">
              📖 체계적 학습 가이드
            </div>
            <div className="bg-white/20 px-4 py-2 rounded-full text-sm">
              ✅ 진행률 추적
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="max-w-7xl mx-auto px-4 py-10">
        <h3 className="text-2xl font-bold text-gray-800 mb-2 text-center">분야별 자격시험</h3>
        <p className="text-gray-500 text-center mb-8">원하는 분야를 선택하세요</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {categories.map((cat) => (
            cat.hasPage ? (
              <Link
                key={cat.id}
                href={cat.href!}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1 overflow-hidden group"
              >
                <div className={`bg-gradient-to-r ${cat.color} p-4 text-center`}>
                  <span className="text-4xl">{cat.icon}</span>
                </div>
                <div className="p-4 text-center">
                  <h4 className="font-bold text-gray-800 group-hover:text-blue-600 transition text-sm md:text-base">{cat.name}</h4>
                  <p className="text-gray-400 text-xs mt-1">{cat.count}개 자격증</p>
                  <div className="mt-2 text-blue-500 text-xs font-medium">
                    보기 →
                  </div>
                </div>
              </Link>
            ) : (
              <div
                key={cat.id}
                className="bg-white rounded-xl shadow-md overflow-hidden opacity-75"
              >
                <div className={`bg-gradient-to-r ${cat.color} p-4 text-center`}>
                  <span className="text-4xl">{cat.icon}</span>
                </div>
                <div className="p-4 text-center">
                  <h4 className="font-bold text-gray-800 text-sm md:text-base">{cat.name}</h4>
                  <p className="text-gray-400 text-xs mt-1">{cat.count}개 자격증</p>
                  <div className="mt-2 text-gray-400 text-xs font-medium">
                    준비중
                  </div>
                </div>
              </div>
            )
          ))}
        </div>
      </section>

      {/* Active Categories Highlight */}
      <section className="bg-white py-10">
        <div className="max-w-5xl mx-auto px-4">
          <h3 className="text-2xl font-bold text-gray-800 mb-2 text-center">지금 학습 가능한 분야</h3>
          <p className="text-gray-500 text-center mb-8">AI 기반 학습 시스템이 준비되어 있습니다</p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link
              href="/category/mechanical"
              className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-xl p-6 text-white hover:shadow-lg transition transform hover:-translate-y-1"
            >
              <div className="flex items-center gap-4">
                <span className="text-5xl">⚙️</span>
                <div>
                  <h4 className="font-bold text-xl">기계</h4>
                  <p className="text-orange-100 text-sm">기계기사, 전기기사 등</p>
                </div>
              </div>
              <div className="mt-4 text-right text-orange-100 font-medium">
                6개 자격증 →
              </div>
            </Link>

            <Link
              href="/category/chemistry"
              className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl p-6 text-white hover:shadow-lg transition transform hover:-translate-y-1"
            >
              <div className="flex items-center gap-4">
                <span className="text-5xl">🧪</span>
                <div>
                  <h4 className="font-bold text-xl">화학·환경</h4>
                  <p className="text-green-100 text-sm">환경기사, 대기환경기사 등</p>
                </div>
              </div>
              <div className="mt-4 text-right text-green-100 font-medium">
                5개 자격증 →
              </div>
            </Link>

            <Link
              href="/category/safety"
              className="bg-gradient-to-r from-red-500 to-orange-500 rounded-xl p-6 text-white hover:shadow-lg transition transform hover:-translate-y-1"
            >
              <div className="flex items-center gap-4">
                <span className="text-5xl">🛡️</span>
                <div>
                  <h4 className="font-bold text-xl">안전·소방</h4>
                  <p className="text-red-100 text-sm">산업안전, 위험물, 가스기사 등</p>
                </div>
              </div>
              <div className="mt-4 text-right text-red-100 font-medium">
                8개 자격증 →
              </div>
            </Link>

            <Link
              href="/category/education"
              className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl p-6 text-white hover:shadow-lg transition transform hover:-translate-y-1"
            >
              <div className="flex items-center gap-4">
                <span className="text-5xl">📚</span>
                <div>
                  <h4 className="font-bold text-xl">교육</h4>
                  <p className="text-indigo-100 text-sm">평생교육사, 직업상담사 등</p>
                </div>
              </div>
              <div className="mt-4 text-right text-indigo-100 font-medium">
                5개 자격증 →
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-10">
        <div className="max-w-5xl mx-auto px-4">
          <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">주요 기능</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-md text-center">
              <span className="text-4xl">🤖</span>
              <h4 className="font-semibold text-lg mt-4 mb-2">AI 학습 도우미</h4>
              <p className="text-gray-600 text-sm">Claude, ChatGPT, Gemini 3가지 AI와 함께 학습</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md text-center">
              <span className="text-4xl">📊</span>
              <h4 className="font-semibold text-lg mt-4 mb-2">상세 시험 정보</h4>
              <p className="text-gray-600 text-sm">응시자격, 시험과목, 합격률 등 모든 정보 제공</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md text-center">
              <span className="text-4xl">📖</span>
              <h4 className="font-semibold text-lg mt-4 mb-2">과목별 체계적 학습</h4>
              <p className="text-gray-600 text-sm">AI 프롬프트 기반 효율적인 학습 시스템</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2026 자격시험 가이드. UTTEC</p>
          <p className="text-gray-500 text-sm mt-2">본 사이트는 자격시험 정보 제공 목적으로 운영됩니다.</p>
        </div>
      </footer>
    </div>
  );
}
