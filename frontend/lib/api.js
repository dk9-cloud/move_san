// 백엔드(Flask) 연결 지점
// 프로젝트 폴더에 .env.local 파일을 만들고 NEXT_PUBLIC_API_URL=http://localhost:5000 처럼 적으면 Flask API를 사용한다.
// 없으면 아래 가상 JSON(팀 합의 테스트용 응답 예시)을 사용한다.
import { compare } from './calc';

export const API_BASE = process.env.NEXT_PUBLIC_API_URL || '';

// 팀 합의 규격 테스트용 응답 예시 (가상 데이터)
export const SAMPLE_RENT = [
  { region_code: '26230', region_name: '부산진구', median_rent: 48 },
  { region_code: '26350', region_name: '해운대구', median_rent: 62 },
  { region_code: '26410', region_name: '금정구', median_rent: 39 },
];

// GET {API_BASE}/api/rent → { status: 'success', data: [{ region_code, region_name, median_rent(만원) }, ...] }
// 반환: { rows, source: 'api' | 'sample', error }
export async function fetchRent() {
  if (!API_BASE) return { rows: SAMPLE_RENT, source: 'sample', error: null };
  try {
    const res = await fetch(`${API_BASE}/api/rent`, { cache: 'no-store' });
    if (!res.ok) throw new Error(`서버 응답 오류 (HTTP ${res.status})`);
    const body = await res.json();
    // 백엔드 응답 형식: { status: 'success', data: [...] } (배열만 오는 경우도 허용)
    if (body && body.status === 'error') throw new Error(body.message || '백엔드에서 오류를 보냈어요');
    const data = Array.isArray(body) ? body : body && Array.isArray(body.data) ? body.data : null;
    if (!data) throw new Error('응답 형식이 달라요 (data 배열이 없어요)');
    const rows = data
      .filter((r) => r && r.region_name != null && r.median_rent != null)
      .map((r) => ({ region_code: String(r.region_code ?? ''), region_name: String(r.region_name), median_rent: Number(r.median_rent) }));
    return { rows, source: 'api', error: null };
  } catch (e) {
    const msg = e instanceof TypeError ? 'Flask 서버에 연결할 수 없어요 (서버가 꺼져 있거나 CORS 설정 문제)' : e.message;
    return { rows: [], source: 'api', error: msg };
  }
}

// POST {API_BASE}/api/compare — 계산 API (아직 팀 규격 미정, 없으면 프론트 계산식 사용)
export async function fetchCompare(input) {
  if (!API_BASE) return compare(input);
  try {
    const res = await fetch(`${API_BASE}/api/compare`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    });
    if (!res.ok) throw new Error(String(res.status));
    return await res.json();
  } catch {
    return compare(input);
  }
}

// POST {API_BASE}/api/chat — AI 챗봇 (Flask에서 LLM API 호출)
// body: { messages: [{ role: 'user' | 'assistant', content }], context: { 계산기 입력값 } } → { reply: '답변 텍스트' }
// 주소가 없거나 실패하면 null → 화면에서 규칙 기반 답변(lib/chatbot.js)으로 대신함
export async function sendChat(messages, context) {
  if (!API_BASE) return null;
  try {
    const res = await fetch(`${API_BASE}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages, context }),
    });
    if (!res.ok) throw new Error(String(res.status));
    const data = await res.json();
    return typeof data.reply === 'string' && data.reply.trim() ? data.reply : null;
  } catch {
    return null;
  }
}
