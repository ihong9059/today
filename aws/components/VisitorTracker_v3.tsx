'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

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
  if (typeof window === 'undefined') return '';
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

    const logData = {
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

    // Next.js API route로 로그 전송 (같은 도메인)
    fetch('/api/visitor', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(logData),
    }).catch(err => {
      console.error('Failed to send visitor log:', err);
    });
  }, [pathname]);

  return null;
}
