'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV = [
  { href: '/', label: '생활비 계산기', match: ['/', '/result'] },
  { href: '/benefits', label: '청년 혜택', match: ['/benefits'] },
  { href: '/map', label: '동네 탐색', match: ['/map'] },
  { href: '/culture', label: '컬처라이프', match: ['/culture'] },
  { href: '/community', label: '커뮤니티', match: ['/community'] },
];

export default function Header() {
  const path = usePathname();
  return (
    <header className="header">
      <div className="header-inner">
        <Link href="/" className="logo" aria-label="무브산 홈">
          {/* 로고 원본: public/logo.png (가로형) · public/logo-mark.png (아이콘) */}
          <img src="/logo.png" alt="무브산 MOVESAN" className="logo-img" />
        </Link>
        <nav className="nav">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className={n.match.includes(path) ? 'nav-item active' : 'nav-item'}>
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="header-actions">
          <button className="icon-btn" aria-label="검색 (준비 중)" title="검색 (준비 중)">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" /></svg>
          </button>
          <Link href="/login" className="text-link">로그인</Link>
          <Link href="/login" className="pill-btn">회원가입</Link>
        </div>
      </div>
    </header>
  );
}
