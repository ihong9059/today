'use client';

import Link from 'next/link';

export default function CategoryPage() {
  const certifications = [
    {
      id: 'computer-graphics',
      name: '컴퓨터그래픽스운용기능사',
      desc: '그래픽 디자인 실무 능력',
      icon: '🖥️',
      href: '/category/design/computer-graphics'
    },
    {
      id: 'web-design',
      name: '웹디자인기능사',
      desc: '웹페이지 디자인 및 코딩',
      icon: '🌐',
      href: '/category/design/web-design'
    },
    {
      id: 'product-design-engineer',
      name: '제품디자인기사',
      desc: '제품 디자인 전문가',
      icon: '📦',
      href: '/category/design/product-design-engineer'
    },
    {
      id: 'product-design-technician',
      name: '제품디자인산업기사',
      desc: '제품 디자인 기술자',
      icon: '📦',
      href: '/category/design/product-design-technician'
    },
    {
      id: 'visual-design-engineer',
      name: '시각디자인기사',
      desc: '시각매체 디자인 전문가',
      icon: '🎨',
      href: '/category/design/visual-design-engineer'
    },
    {
      id: 'visual-design-technician',
      name: '시각디자인산업기사',
      desc: '시각매체 디자인 기술자',
      icon: '🎨',
      href: '/category/design/visual-design-technician'
    },
    {
      id: 'gtq',
      name: 'GTQ(그래픽기술자격)',
      desc: '포토샵 자격증',
      icon: '🖼️',
      href: '/category/design/gtq'
    },
    {
      id: 'gtqi',
      name: 'GTQi(일러스트)',
      desc: '일러스트레이터 자격증',
      icon: '✏️',
      href: '/category/design/gtqi'
    },
    {
      id: 'colorist-engineer',
      name: '컬러리스트기사',
      desc: '색채 관리 전문가',
      icon: '🎨',
      href: '/category/design/colorist-engineer'
    },
    {
      id: 'colorist-technician',
      name: '컬러리스트산업기사',
      desc: '색채 관리 기술자',
      icon: '🎨',
      href: '/category/design/colorist-technician'
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-100">
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">📜</span>
            <span className="font-bold text-gray-800">자격시험 가이드</span>
          </Link>
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-600 hover:text-pink-600">홈</Link>
            <span className="text-gray-300">›</span>
            <span className="text-pink-600 font-medium">디자인·문화</span>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-r from-pink-500 to-rose-500 text-white py-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <span className="text-5xl mb-4 block">🎨</span>
          <h1 className="text-3xl font-bold mb-2">디자인·문화 분야</h1>
          <p className="text-pink-100">그래픽, 웹, 제품, 색채 디자인 자격시험 학습 가이드</p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert) => (
            <Link
              key={cert.id}
              href={cert.href}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all p-6 border-l-4 border-pink-500 hover:-translate-y-1"
            >
              <div className="flex items-center gap-4 mb-3">
                <span className="text-4xl">{cert.icon}</span>
                <div>
                  <h3 className="font-bold text-lg text-gray-800">{cert.name}</h3>
                  <p className="text-sm text-gray-500">{cert.desc}</p>
                </div>
              </div>
              <div className="text-right text-pink-500 text-sm font-medium">
                학습하기 →
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
