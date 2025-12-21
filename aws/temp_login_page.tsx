'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Lock, Eye, EyeOff, Brain } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // 테스트 계정 확인
    if (formData.email === 'test@test.com' && formData.password === 'admin') {
      // 테스트 사용자 정보 저장
      const testUser = {
        id: 1,
        email: 'test@test.com',
        name: '테스트 사용자',
        role: 'user'
      };
      localStorage.setItem('token', 'test-token-12345');
      localStorage.setItem('user', JSON.stringify(testUser));

      // 대시보드로 이동
      setTimeout(() => {
        setLoading(false);
        router.push('/dashboard');
      }, 500);
      return;
    }

    // 잘못된 계정
    setTimeout(() => {
      setError('이메일 또는 비밀번호가 올바르지 않습니다.');
      setLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-blue-100">
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
              <Link href="/about" className="text-gray-300 hover:text-white transition">
                소개
              </Link>
              <Link href="/mbti" className="text-gray-300 hover:text-white transition">
                MBTI
              </Link>
              <Link href="/courses" className="text-gray-300 hover:text-white transition">
                강좌 목록
              </Link>
              <Link href="/faq" className="text-gray-300 hover:text-white transition">
                FAQ
              </Link>
              <Link href="/login" className="text-white font-semibold">
                Log In
              </Link>
              <Link
                href="/register"
                className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition font-semibold"
              >
                회원가입
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* 메인 콘텐츠 - 2컬럼 레이아웃 */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-8">
          {/* 왼쪽: 로그인 폼 */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h1 className="text-3xl font-bold text-center text-gray-900 mb-2">
              로그인
            </h1>
            <p className="text-center text-gray-600 mb-8">
              AI 기반 진로교육 플랫폼에 오신 것을 환영합니다
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              {/* 이메일 */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <Mail className="w-4 h-4 text-gray-500" />
                  이메일
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  placeholder="your@email.com"
                />
              </div>

              {/* 비밀번호 */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <Lock className="w-4 h-4 text-gray-500" />
                  비밀번호
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition pr-12"
                    placeholder="비밀번호를 입력하세요"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* 비밀번호 찾기 링크 */}
              <div className="text-right">
                <Link href="/forgot-password" className="text-sm text-blue-600 hover:text-blue-700">
                  비밀번호를 잊으셨나요?
                </Link>
              </div>

              {/* 로그인 버튼 */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-blue-800 focus:ring-4 focus:ring-blue-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                {loading ? '로그인 중...' : '로그인'}
              </button>

              {/* 회원가입 링크 */}
              <p className="text-center text-gray-600 text-sm">
                계정이 없으신가요?{' '}
                <Link href="/register" className="text-blue-600 hover:text-blue-700 font-semibold">
                  회원가입
                </Link>
              </p>
            </form>

            {/* 테스트 계정 안내 */}
            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-800 font-medium mb-2">🔑 테스트 계정</p>
              <p className="text-xs text-yellow-700">
                이메일: <code className="bg-yellow-100 px-1 rounded">test@test.com</code><br />
                비밀번호: <code className="bg-yellow-100 px-1 rounded">admin</code>
              </p>
            </div>
          </div>

          {/* 오른쪽: 혜택 안내 */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-blue-600 mb-6">
              UTTEC Edu에서 얻을 수 있는 것
            </h2>

            <div className="space-y-5">
              <div className="flex items-start gap-3">
                <span className="text-2xl">🧠</span>
                <p className="text-gray-700">
                  <span className="text-blue-600 font-semibold">AI 활용 능력 습득</span><br />
                  <span className="text-sm text-gray-500">ChatGPT, Claude 등 AI 도구 활용법</span>
                </p>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-2xl">🎯</span>
                <p className="text-gray-700">
                  <span className="text-blue-600 font-semibold">진로 간접 경험</span><br />
                  <span className="text-sm text-gray-500">다양한 직업을 AI와 함께 시뮬레이션</span>
                </p>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-2xl">📋</span>
                <p className="text-gray-700">
                  <span className="text-blue-600 font-semibold">실무 포트폴리오 완성</span><br />
                  <span className="text-sm text-gray-500">취업에 바로 활용 가능한 결과물</span>
                </p>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-2xl">🏆</span>
                <p className="text-gray-700">
                  <span className="text-blue-600 font-semibold">수료증 발급</span><br />
                  <span className="text-sm text-gray-500">과정 완료 시 공식 수료증 제공</span>
                </p>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-2xl">👥</span>
                <p className="text-gray-700">
                  <span className="text-blue-600 font-semibold">커뮤니티 참여</span><br />
                  <span className="text-sm text-gray-500">동료 학습자들과 네트워킹</span>
                </p>
              </div>
            </div>

            {/* 대상별 트랙 안내 */}
            <div className="mt-8 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl">
              <h3 className="font-semibold text-gray-800 mb-3">🎯 교육 트랙</h3>
              <div className="flex flex-wrap gap-2">
                {['학부형', '사회초년생', '코딩전문가', '교사/교육자', '진로전환자'].map((track) => (
                  <span key={track} className="px-3 py-1 bg-white rounded-full text-sm text-gray-700 shadow-sm">
                    {track}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
