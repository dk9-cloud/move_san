import Link from 'next/link';

// 로그인·회원가입 자리 — ⚠️ 인증 방식(Supabase Auth) 검토 중. 지금은 화면만 있음
export const metadata = { title: '로그인 | 무브산' };

export default function LoginPage() {
  return (
    <div className="page" style={{ paddingTop: 56 }}>
      <section className="card auth stack">
        <h1 style={{ fontSize: 26 }}>무브산 로그인</h1>
        <p className="muted small" style={{ margin: 0 }}>계산기와 동네 지도는 로그인 없이 쓸 수 있어요. 로그인은 커뮤니티와 결과 저장에 쓰일 예정이에요.</p>
        <input type="email" placeholder="이메일" disabled />
        <input type="password" placeholder="비밀번호" disabled />
        <button className="btn" disabled>로그인 (준비 중)</button>
        <Link href="/" className="btn btn-outline">계산기로 돌아가기</Link>
        <span className="small muted">인증은 Supabase Auth 연결을 검토 중이에요.</span>
      </section>
    </div>
  );
}
