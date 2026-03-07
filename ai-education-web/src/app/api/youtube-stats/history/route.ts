import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const YOUTUBE_CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID;
const HISTORY_FILE = path.join(process.cwd(), 'data', 'youtube-stats-history.json');
const UPDATE_INTERVAL = 60 * 60 * 1000; // 1시간 (밀리초)

interface StatsEntry {
  timestamp: string;
  subscriberCount: number;
  viewCount: number;
  videoCount: number;
}

// 히스토리 파일 읽기
function readHistory(): StatsEntry[] {
  try {
    // data 폴더 확인 및 생성
    const dataDir = path.dirname(HISTORY_FILE);
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    if (fs.existsSync(HISTORY_FILE)) {
      const data = fs.readFileSync(HISTORY_FILE, 'utf-8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Error reading history file:', error);
  }
  return [];
}

// 히스토리 파일 저장
function saveHistory(history: StatsEntry[]): void {
  try {
    const dataDir = path.dirname(HISTORY_FILE);
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    fs.writeFileSync(HISTORY_FILE, JSON.stringify(history, null, 2));
  } catch (error) {
    console.error('Error saving history file:', error);
  }
}

// YouTube API에서 현재 통계 가져오기
async function fetchCurrentStats(): Promise<StatsEntry | null> {
  if (!YOUTUBE_API_KEY || !YOUTUBE_CHANNEL_ID) {
    return null;
  }

  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${YOUTUBE_CHANNEL_ID}&key=${YOUTUBE_API_KEY}`
    );
    const data = await response.json();

    if (!data.items || data.items.length === 0) {
      return null;
    }

    const stats = data.items[0].statistics;
    return {
      timestamp: new Date().toISOString(),
      subscriberCount: parseInt(stats.subscriberCount) || 0,
      viewCount: parseInt(stats.viewCount) || 0,
      videoCount: parseInt(stats.videoCount) || 0,
    };
  } catch (error) {
    console.error('Error fetching YouTube stats:', error);
    return null;
  }
}

// GET: 히스토리 조회 및 필요시 업데이트
export async function GET() {
  let history = readHistory();

  // 마지막 업데이트 시간 확인
  const lastEntry = history[history.length - 1];
  const now = Date.now();
  const lastUpdate = lastEntry ? new Date(lastEntry.timestamp).getTime() : 0;

  // 1시간이 지났으면 새로운 데이터 수집
  if (now - lastUpdate >= UPDATE_INTERVAL) {
    const newStats = await fetchCurrentStats();
    if (newStats) {
      history.push(newStats);

      // 최근 7일(168시간) 데이터만 유지
      const sevenDaysAgo = now - (7 * 24 * 60 * 60 * 1000);
      history = history.filter(entry =>
        new Date(entry.timestamp).getTime() > sevenDaysAgo
      );

      saveHistory(history);
    }
  }

  // 일별로 그룹화하여 반환 (하루 중 마지막 값 사용)
  const dailyStats = new Map<string, StatsEntry>();
  history.forEach(entry => {
    const date = entry.timestamp.split('T')[0];
    dailyStats.set(date, entry);
  });

  const dailyHistory = Array.from(dailyStats.values()).sort((a, b) =>
    a.timestamp.localeCompare(b.timestamp)
  );

  return NextResponse.json({
    history: dailyHistory,
    lastUpdate: lastEntry?.timestamp || null,
    totalEntries: history.length,
  });
}

// POST: 강제 업데이트
export async function POST() {
  const newStats = await fetchCurrentStats();

  if (!newStats) {
    return NextResponse.json(
      { error: 'Failed to fetch YouTube stats' },
      { status: 500 }
    );
  }

  let history = readHistory();
  history.push(newStats);

  // 최근 7일 데이터만 유지
  const sevenDaysAgo = Date.now() - (7 * 24 * 60 * 60 * 1000);
  history = history.filter(entry =>
    new Date(entry.timestamp).getTime() > sevenDaysAgo
  );

  saveHistory(history);

  return NextResponse.json({
    message: 'Stats updated successfully',
    stats: newStats,
  });
}
