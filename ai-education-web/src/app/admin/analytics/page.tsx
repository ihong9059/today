'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';

const YouTubeStatsChart = dynamic(() => import('@/components/charts/YouTubeStatsChart'), {
  ssr: false,
  loading: () => <div className="bg-white rounded-lg shadow-md p-6 h-96 animate-pulse" />,
});

interface YouTubeStats {
  viewCount: string;
  subscriberCount: string;
  videoCount: string;
}

interface VideoStats {
  id: string;
  title: string;
  viewCount: string;
  likeCount: string;
  commentCount: string;
  thumbnail: string;
}

export default function AdminAnalyticsPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [channelStats, setChannelStats] = useState<YouTubeStats | null>(null);
  const [videos, setVideos] = useState<VideoStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // 인증 확인
    const authStatus = sessionStorage.getItem('admin_auth');
    if (authStatus !== 'true') {
      router.push('/admin');
      return;
    }
    setIsAuthenticated(true);
    fetchYouTubeData();
  }, [router]);

  const fetchYouTubeData = async () => {
    try {
      const response = await fetch('/api/youtube-stats');
      if (!response.ok) throw new Error('Failed to fetch YouTube data');
      const data = await response.json();
      setChannelStats(data.channel);
      setVideos(data.videos || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  const formatNumber = (num: string) => {
    return parseInt(num).toLocaleString('ko-KR');
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* 헤더 */}
        <div className="flex items-center mb-8">
          <button
            onClick={() => router.push('/admin')}
            className="mr-4 text-gray-600 hover:text-gray-900"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-3xl font-bold text-gray-900">YouTube 통계</h1>
          <button
            onClick={fetchYouTubeData}
            className="ml-auto bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            새로고침
          </button>
        </div>

        {loading && (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            <p className="font-bold">Error</p>
            <p>{error}</p>
          </div>
        )}

        {channelStats && (
          <>
            {/* 채널 통계 카드 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-red-500">
                <h3 className="text-gray-500 text-sm font-medium">구독자 수</h3>
                <p className="text-3xl font-bold text-gray-900">
                  {formatNumber(channelStats.subscriberCount)}
                </p>
                <p className="text-sm text-gray-400 mt-1">명</p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
                <h3 className="text-gray-500 text-sm font-medium">총 조회수</h3>
                <p className="text-3xl font-bold text-gray-900">
                  {formatNumber(channelStats.viewCount)}
                </p>
                <p className="text-sm text-gray-400 mt-1">회</p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
                <h3 className="text-gray-500 text-sm font-medium">동영상 수</h3>
                <p className="text-3xl font-bold text-gray-900">
                  {formatNumber(channelStats.videoCount)}
                </p>
                <p className="text-sm text-gray-400 mt-1">개</p>
              </div>
            </div>

            {/* 통계 추이 그래프 */}
            <div className="mb-8">
              <YouTubeStatsChart currentStats={channelStats} />
            </div>

            {/* 최근 동영상 */}
            {videos.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold mb-4">최근 동영상</h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-2">썸네일</th>
                        <th className="text-left py-3 px-2">제목</th>
                        <th className="text-right py-3 px-2">조회수</th>
                        <th className="text-right py-3 px-2">좋아요</th>
                        <th className="text-right py-3 px-2">댓글</th>
                      </tr>
                    </thead>
                    <tbody>
                      {videos.map((video) => (
                        <tr key={video.id} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-2">
                            <img
                              src={video.thumbnail}
                              alt={video.title}
                              className="w-24 h-14 object-cover rounded"
                            />
                          </td>
                          <td className="py-3 px-2">
                            <a 
                              href={`https://www.youtube.com/watch?v=${video.id}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:underline line-clamp-2"
                            >
                              {video.title}
                            </a>
                          </td>
                          <td className="py-3 px-2 text-right">{formatNumber(video.viewCount)}</td>
                          <td className="py-3 px-2 text-right">{formatNumber(video.likeCount)}</td>
                          <td className="py-3 px-2 text-right">{formatNumber(video.commentCount)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
