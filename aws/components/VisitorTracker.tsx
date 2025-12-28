'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

interface VisitorLog {
  id: string;
  timestamp: string;
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

function parseUserAgent(ua: string) {
  let browser = 'Unknown';
  let os = 'Unknown';
  let device = 'Desktop';

  // Browser detection
  if (ua.includes('Chrome') && !ua.includes('Edg')) browser = 'Chrome';
  else if (ua.includes('Safari') && !ua.includes('Chrome')) browser = 'Safari';
  else if (ua.includes('Firefox')) browser = 'Firefox';
  else if (ua.includes('Edg')) browser = 'Edge';
  else if (ua.includes('Opera') || ua.includes('OPR')) browser = 'Opera';

  // OS detection
  if (ua.includes('Windows')) os = 'Windows';
  else if (ua.includes('Mac')) os = 'macOS';
  else if (ua.includes('Linux') && !ua.includes('Android')) os = 'Linux';
  else if (ua.includes('Android')) os = 'Android';
  else if (ua.includes('iOS') || ua.includes('iPhone') || ua.includes('iPad')) os = 'iOS';

  // Device detection
  if (ua.includes('Mobile') || ua.includes('Android') || ua.includes('iPhone')) {
    device = 'Mobile';
  } else if (ua.includes('Tablet') || ua.includes('iPad')) {
    device = 'Tablet';
  }

  return { browser, os, device };
}

function getOrCreateSessionId(): string {
  let sessionId = sessionStorage.getItem('visitorSessionId');
  if (!sessionId) {
    sessionId = 'sess_' + Math.random().toString(36).substring(2, 15) + Date.now().toString(36);
    sessionStorage.setItem('visitorSessionId', sessionId);
  }
  return sessionId;
}

export default function VisitorTracker() {
  const pathname = usePathname();

  useEffect(() => {
    // 관리자 페이지는 추적하지 않음
    if (pathname.startsWith('/admin')) {
      return;
    }

    const userAgent = navigator.userAgent;
    const { browser, os, device } = parseUserAgent(userAgent);

    const log: VisitorLog = {
      id: 'log_' + Math.random().toString(36).substring(2, 15) + Date.now().toString(36),
      timestamp: new Date().toISOString(),
      page: pathname,
      referrer: document.referrer || '',
      userAgent: userAgent,
      device: device,
      browser: browser,
      os: os,
      screenSize: `${window.screen.width}x${window.screen.height}`,
      language: navigator.language,
      sessionId: getOrCreateSessionId(),
    };

    // 로컬 스토리지에 로그 저장
    const existingLogs = localStorage.getItem('visitorLogs');
    const logs: VisitorLog[] = existingLogs ? JSON.parse(existingLogs) : [];

    // 최대 1000개 로그 유지 (오래된 것 삭제)
    if (logs.length >= 1000) {
      logs.shift();
    }

    logs.push(log);
    localStorage.setItem('visitorLogs', JSON.stringify(logs));
  }, [pathname]);

  return null; // 이 컴포넌트는 UI를 렌더링하지 않음
}
