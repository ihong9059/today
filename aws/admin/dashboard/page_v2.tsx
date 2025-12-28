'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Brain,
  LogOut,
  Users,
  Eye,
  Clock,
  Globe,
  Monitor,
  Smartphone,
  MapPin,
  RefreshCw,
  ChevronDown,
  ChevronUp,
  TrendingUp
} from 'lucide-react';

interface VisitorLog {
  id: string;
  timestamp: string;
  ip: string;
  page: string;
  referrer: string;
  userAgent: string;
  device: string;
  browser: string;
  os: string;
  screenSize: string;
  language: string;
  sessionId: string;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [logs, setLogs] = useState<VisitorLog[]>([]);
  const [expandedLog, setExpandedLog] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'today' | 'week'>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 로그인 확인
    const loggedIn = sessionStorage.getItem('adminLoggedIn');
    if (loggedIn !== 'true') {
      router.push('/login');
      return;
    }
    setIsLoggedIn(true);
    loadLogs();
  }, [router]);

  const loadLogs = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://13.125.148.58:3000/api/visitor/logs');
      if (response.ok) {
        const data = await response.json();
        setLogs(data);
      }
    } catch (error) {
      console.error('Failed to load logs:', error);
    }
    setLoading(false);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('adminLoggedIn');
    sessionStorage.removeItem('adminEmail');
    sessionStorage.removeItem('adminLoginTime');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/login');
  };

  const clearLogs = async () => {
    if (confirm('모든 접속 로그를 삭제하시겠습니까?')) {
      try {
        await fetch('http://13.125.148.58:3000/api/visitor/logs', {
          method: 'DELETE',
        });
        setLogs([]);
      } catch (error) {
        console.error('Failed to delete logs:', error);
      }
    }
  };

  // 필터링된 로그
  const filteredLogs = logs.filter(log => {
    const logDate = new Date(log.timestamp);
    const now = new Date();

    if (filter === 'today') {
      return logDate.toDateString() === now.toDateString();
    } else if (filter === 'week') {
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      return logDate >= weekAgo;
    }
    return true;
  });

  // 통계 계산
  const stats = {
    totalVisits: logs.length,
    todayVisits: logs.filter(l => new Date(l.timestamp).toDateString() === new Date().toDateString()).length,
    uniqueSessions: new Set(logs.map(l => l.sessionId)).size,
    uniqueIPs: new Set(logs.map(l => l.ip)).size,
    topPages: Object.entries(
      logs.reduce((acc, log) => {
        acc[log.page] = (acc[log.page] || 0) + 1;
        return acc;
      }, {} as Record<string, number>)
    ).sort((a, b) => b[1] - a[1]).slice(0, 5),
    browsers: Object.entries(
      logs.reduce((acc, log) => {
        acc[log.browser] = (acc[log.browser] || 0) + 1;
        return acc;
      }, {} as Record<string, number>)
    ).sort((a, b) => b[1] - a[1]),
    devices: Object.entries(
      logs.reduce((acc, log) => {
        acc[log.device] = (acc[log.device] || 0) + 1;
        return acc;
      }, {} as Record<string, number>)
    ).sort((a, b) => b[1] - a[1]),
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* 헤더 */}
      <header className="bg-slate-900 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link href="/" className="flex items-center gap-2">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold">UTTEC Edu</span>
              </Link>
              <span className="text-gray-400 mx-2">|</span>
              <span className="text-gray-300">관리자 대시보드</span>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition"
            >
              <LogOut className="w-4 h-4" />
              로그아웃
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* 통계 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Eye className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">총 페이지 뷰</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalVisits}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">오늘 방문</p>
                <p className="text-2xl font-bold text-gray-900">{stats.todayVisits}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">고유 세션</p>
                <p className="text-2xl font-bold text-gray-900">{stats.uniqueSessions}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                <MapPin className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">고유 IP</p>
                <p className="text-2xl font-bold text-gray-900">{stats.uniqueIPs}</p>
              </div>
            </div>
          </div>
        </div>

        {/* 요약 정보 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* 인기 페이지 */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Globe className="w-5 h-5 text-blue-600" />
              인기 페이지 Top 5
            </h3>
            <div className="space-y-3">
              {stats.topPages.length > 0 ? (
                stats.topPages.map(([page, count], idx) => (
                  <div key={page} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        idx === 0 ? 'bg-yellow-100 text-yellow-700' :
                        idx === 1 ? 'bg-gray-100 text-gray-700' :
                        idx === 2 ? 'bg-orange-100 text-orange-700' :
                        'bg-gray-50 text-gray-500'
                      }`}>
                        {idx + 1}
                      </span>
                      <span className="text-sm text-gray-700 truncate max-w-[180px]">{page}</span>
                    </div>
                    <span className="text-sm font-medium text-gray-500">{count}회</span>
                  </div>
                ))
              ) : (
                <p className="text-gray-400 text-sm">데이터 없음</p>
              )}
            </div>
          </div>

          {/* 브라우저 통계 */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Monitor className="w-5 h-5 text-green-600" />
              브라우저
            </h3>
            <div className="space-y-3">
              {stats.browsers.length > 0 ? (
                stats.browsers.map(([browser, count]) => (
                  <div key={browser} className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">{browser}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-green-500 rounded-full"
                          style={{ width: `${(count / logs.length) * 100}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-gray-500 w-8">{count}</span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-400 text-sm">데이터 없음</p>
              )}
            </div>
          </div>

          {/* 디바이스 통계 */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Smartphone className="w-5 h-5 text-purple-600" />
              디바이스
            </h3>
            <div className="space-y-3">
              {stats.devices.length > 0 ? (
                stats.devices.map(([device, count]) => (
                  <div key={device} className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">{device}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-purple-500 rounded-full"
                          style={{ width: `${(count / logs.length) * 100}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-gray-500 w-8">{count}</span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-400 text-sm">데이터 없음</p>
              )}
            </div>
          </div>
        </div>

        {/* 접속 로그 테이블 */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-600" />
                접속 이력 ({filteredLogs.length}건)
              </h3>
              <div className="flex items-center gap-3">
                {/* 필터 */}
                <div className="flex bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setFilter('all')}
                    className={`px-3 py-1 text-sm rounded-md transition ${
                      filter === 'all' ? 'bg-white shadow text-blue-600' : 'text-gray-600'
                    }`}
                  >
                    전체
                  </button>
                  <button
                    onClick={() => setFilter('today')}
                    className={`px-3 py-1 text-sm rounded-md transition ${
                      filter === 'today' ? 'bg-white shadow text-blue-600' : 'text-gray-600'
                    }`}
                  >
                    오늘
                  </button>
                  <button
                    onClick={() => setFilter('week')}
                    className={`px-3 py-1 text-sm rounded-md transition ${
                      filter === 'week' ? 'bg-white shadow text-blue-600' : 'text-gray-600'
                    }`}
                  >
                    최근 7일
                  </button>
                </div>
                <button
                  onClick={loadLogs}
                  disabled={loading}
                  className="flex items-center gap-1 text-gray-600 hover:text-blue-600 transition"
                >
                  <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                  새로고침
                </button>
                <button
                  onClick={clearLogs}
                  className="text-red-600 hover:text-red-700 text-sm"
                >
                  로그 삭제
                </button>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="p-12 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="text-gray-500 mt-4">로딩 중...</p>
            </div>
          ) : filteredLogs.length > 0 ? (
            <div className="divide-y divide-gray-100 max-h-[600px] overflow-y-auto">
              {filteredLogs.map((log) => (
                <div key={log.id} className="hover:bg-gray-50 transition">
                  <div
                    className="p-4 cursor-pointer"
                    onClick={() => setExpandedLog(expandedLog === log.id ? null : log.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          log.device === 'Mobile' ? 'bg-purple-100' :
                          log.device === 'Tablet' ? 'bg-orange-100' : 'bg-blue-100'
                        }`}>
                          {log.device === 'Mobile' ? (
                            <Smartphone className="w-5 h-5 text-purple-600" />
                          ) : (
                            <Monitor className="w-5 h-5 text-blue-600" />
                          )}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-medium text-gray-900">{log.page}</p>
                            <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full font-mono">
                              {log.ip}
                            </span>
                          </div>
                          <p className="text-sm text-gray-500">
                            {log.browser} • {log.os}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-sm font-medium text-gray-700">
                            {new Date(log.timestamp).toLocaleDateString('ko-KR')}
                          </p>
                          <p className="text-xs text-gray-400">
                            {new Date(log.timestamp).toLocaleTimeString('ko-KR')}
                          </p>
                        </div>
                        {expandedLog === log.id ? (
                          <ChevronUp className="w-5 h-5 text-gray-400" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-400" />
                        )}
                      </div>
                    </div>
                  </div>

                  {/* 확장 정보 */}
                  {expandedLog === log.id && (
                    <div className="px-4 pb-4 bg-gray-50">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-gray-500">IP 주소</p>
                          <p className="font-mono text-gray-700">{log.ip}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">세션 ID</p>
                          <p className="font-mono text-gray-700">{log.sessionId?.slice(0, 12)}...</p>
                        </div>
                        <div>
                          <p className="text-gray-500">화면 크기</p>
                          <p className="text-gray-700">{log.screenSize}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">언어</p>
                          <p className="text-gray-700">{log.language}</p>
                        </div>
                        <div className="col-span-2">
                          <p className="text-gray-500">유입 경로</p>
                          <p className="text-gray-700 truncate">{log.referrer || '직접 접속'}</p>
                        </div>
                        <div className="col-span-2">
                          <p className="text-gray-500">User Agent</p>
                          <p className="text-gray-700 text-xs truncate">{log.userAgent}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="p-12 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Eye className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-500">접속 이력이 없습니다</p>
              <p className="text-gray-400 text-sm mt-1">사이트에 방문자가 있으면 이곳에 표시됩니다</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
