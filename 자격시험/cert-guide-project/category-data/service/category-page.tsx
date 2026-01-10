import Link from 'next/link';

export default function ServiceCategoryPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">📜</span>
            <span className="font-bold text-gray-800">자격시험 가이드</span>
          </Link>
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-600 hover:text-rose-600">홈</Link>
            <span className="text-gray-300">›</span>
            <span className="text-rose-600 font-medium">서비스</span>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-r from-rose-500 to-pink-500 text-white py-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <span className="text-6xl mb-4 block">🍳</span>
          <h1 className="text-3xl font-bold mb-2">서비스</h1>
          <p className="text-rose-100">조리, 미용, 관광, 호텔 분야 자격증 17개</p>
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          
            <Link href="/category/service/cook-korean" className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1 overflow-hidden group">
              <div className="bg-gradient-to-r from-rose-500 to-pink-500 p-6 text-center">
                <span className="text-5xl">🍚</span>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg text-gray-800 group-hover:text-rose-600">한식조리기능사</h3>
                <p className="text-gray-500 text-sm mt-1">한식 조리 전문 자격증</p>
                <div className="mt-3 text-rose-500 text-sm font-medium">학습하기 →</div>
              </div>
            </Link>
            <Link href="/category/service/cook-western" className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1 overflow-hidden group">
              <div className="bg-gradient-to-r from-rose-500 to-pink-500 p-6 text-center">
                <span className="text-5xl">🍝</span>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg text-gray-800 group-hover:text-rose-600">양식조리기능사</h3>
                <p className="text-gray-500 text-sm mt-1">양식 조리 전문 자격증</p>
                <div className="mt-3 text-rose-500 text-sm font-medium">학습하기 →</div>
              </div>
            </Link>
            <Link href="/category/service/cook-chinese" className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1 overflow-hidden group">
              <div className="bg-gradient-to-r from-rose-500 to-pink-500 p-6 text-center">
                <span className="text-5xl">🥡</span>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg text-gray-800 group-hover:text-rose-600">중식조리기능사</h3>
                <p className="text-gray-500 text-sm mt-1">중식 조리 전문 자격증</p>
                <div className="mt-3 text-rose-500 text-sm font-medium">학습하기 →</div>
              </div>
            </Link>
            <Link href="/category/service/cook-japanese" className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1 overflow-hidden group">
              <div className="bg-gradient-to-r from-rose-500 to-pink-500 p-6 text-center">
                <span className="text-5xl">🍣</span>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg text-gray-800 group-hover:text-rose-600">일식조리기능사</h3>
                <p className="text-gray-500 text-sm mt-1">일식 조리 전문 자격증</p>
                <div className="mt-3 text-rose-500 text-sm font-medium">학습하기 →</div>
              </div>
            </Link>
            <Link href="/category/service/cook-puffer" className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1 overflow-hidden group">
              <div className="bg-gradient-to-r from-rose-500 to-pink-500 p-6 text-center">
                <span className="text-5xl">🐡</span>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg text-gray-800 group-hover:text-rose-600">복어조리기능사</h3>
                <p className="text-gray-500 text-sm mt-1">복어 조리 전문 자격증</p>
                <div className="mt-3 text-rose-500 text-sm font-medium">학습하기 →</div>
              </div>
            </Link>
            <Link href="/category/service/pastry" className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1 overflow-hidden group">
              <div className="bg-gradient-to-r from-rose-500 to-pink-500 p-6 text-center">
                <span className="text-5xl">🍰</span>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg text-gray-800 group-hover:text-rose-600">제과기능사</h3>
                <p className="text-gray-500 text-sm mt-1">과자류 제조 전문 자격증</p>
                <div className="mt-3 text-rose-500 text-sm font-medium">학습하기 →</div>
              </div>
            </Link>
            <Link href="/category/service/bakery" className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1 overflow-hidden group">
              <div className="bg-gradient-to-r from-rose-500 to-pink-500 p-6 text-center">
                <span className="text-5xl">🍞</span>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg text-gray-800 group-hover:text-rose-600">제빵기능사</h3>
                <p className="text-gray-500 text-sm mt-1">빵류 제조 전문 자격증</p>
                <div className="mt-3 text-rose-500 text-sm font-medium">학습하기 →</div>
              </div>
            </Link>
            <Link href="/category/service/beauty-general" className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1 overflow-hidden group">
              <div className="bg-gradient-to-r from-rose-500 to-pink-500 p-6 text-center">
                <span className="text-5xl">💇</span>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg text-gray-800 group-hover:text-rose-600">미용사(일반)</h3>
                <p className="text-gray-500 text-sm mt-1">헤어 미용 전문 자격증</p>
                <div className="mt-3 text-rose-500 text-sm font-medium">학습하기 →</div>
              </div>
            </Link>
            <Link href="/category/service/beauty-skin" className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1 overflow-hidden group">
              <div className="bg-gradient-to-r from-rose-500 to-pink-500 p-6 text-center">
                <span className="text-5xl">✨</span>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg text-gray-800 group-hover:text-rose-600">미용사(피부)</h3>
                <p className="text-gray-500 text-sm mt-1">피부 미용 전문 자격증</p>
                <div className="mt-3 text-rose-500 text-sm font-medium">학습하기 →</div>
              </div>
            </Link>
            <Link href="/category/service/beauty-nail" className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1 overflow-hidden group">
              <div className="bg-gradient-to-r from-rose-500 to-pink-500 p-6 text-center">
                <span className="text-5xl">💅</span>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg text-gray-800 group-hover:text-rose-600">미용사(네일)</h3>
                <p className="text-gray-500 text-sm mt-1">네일 미용 전문 자격증</p>
                <div className="mt-3 text-rose-500 text-sm font-medium">학습하기 →</div>
              </div>
            </Link>
            <Link href="/category/service/beauty-makeup" className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1 overflow-hidden group">
              <div className="bg-gradient-to-r from-rose-500 to-pink-500 p-6 text-center">
                <span className="text-5xl">💄</span>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg text-gray-800 group-hover:text-rose-600">미용사(메이크업)</h3>
                <p className="text-gray-500 text-sm mt-1">메이크업 전문 자격증</p>
                <div className="mt-3 text-rose-500 text-sm font-medium">학습하기 →</div>
              </div>
            </Link>
            <Link href="/category/service/barber" className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1 overflow-hidden group">
              <div className="bg-gradient-to-r from-rose-500 to-pink-500 p-6 text-center">
                <span className="text-5xl">💈</span>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg text-gray-800 group-hover:text-rose-600">이용사</h3>
                <p className="text-gray-500 text-sm mt-1">이발 및 면도 전문 자격증</p>
                <div className="mt-3 text-rose-500 text-sm font-medium">학습하기 →</div>
              </div>
            </Link>
            <Link href="/category/service/tour-guide" className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1 overflow-hidden group">
              <div className="bg-gradient-to-r from-rose-500 to-pink-500 p-6 text-center">
                <span className="text-5xl">🗺️</span>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg text-gray-800 group-hover:text-rose-600">관광통역안내사</h3>
                <p className="text-gray-500 text-sm mt-1">외국인 관광안내 전문 자격증</p>
                <div className="mt-3 text-rose-500 text-sm font-medium">학습하기 →</div>
              </div>
            </Link>
            <Link href="/category/service/hotel-manager" className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1 overflow-hidden group">
              <div className="bg-gradient-to-r from-rose-500 to-pink-500 p-6 text-center">
                <span className="text-5xl">🏨</span>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg text-gray-800 group-hover:text-rose-600">호텔경영사</h3>
                <p className="text-gray-500 text-sm mt-1">호텔 운영 관리 전문 자격증</p>
                <div className="mt-3 text-rose-500 text-sm font-medium">학습하기 →</div>
              </div>
            </Link>
            <Link href="/category/service/hotel-service" className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1 overflow-hidden group">
              <div className="bg-gradient-to-r from-rose-500 to-pink-500 p-6 text-center">
                <span className="text-5xl">🛎️</span>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg text-gray-800 group-hover:text-rose-600">호텔관리사</h3>
                <p className="text-gray-500 text-sm mt-1">호텔 실무 관리 전문 자격증</p>
                <div className="mt-3 text-rose-500 text-sm font-medium">학습하기 →</div>
              </div>
            </Link>
            <Link href="/category/service/convention-planner-1" className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1 overflow-hidden group">
              <div className="bg-gradient-to-r from-rose-500 to-pink-500 p-6 text-center">
                <span className="text-5xl">🎪</span>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg text-gray-800 group-hover:text-rose-600">컨벤션기획사1급</h3>
                <p className="text-gray-500 text-sm mt-1">국제회의 기획 전문 자격증</p>
                <div className="mt-3 text-rose-500 text-sm font-medium">학습하기 →</div>
              </div>
            </Link>
            <Link href="/category/service/convention-planner-2" className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1 overflow-hidden group">
              <div className="bg-gradient-to-r from-rose-500 to-pink-500 p-6 text-center">
                <span className="text-5xl">📋</span>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg text-gray-800 group-hover:text-rose-600">컨벤션기획사2급</h3>
                <p className="text-gray-500 text-sm mt-1">국제회의 실무 자격증</p>
                <div className="mt-3 text-rose-500 text-sm font-medium">학습하기 →</div>
              </div>
            </Link>
        </div>
      </main>

      <footer className="bg-gray-800 text-white py-8 mt-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2026 자격시험 가이드. UTTEC</p>
        </div>
      </footer>
    </div>
  );
}
