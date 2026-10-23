'use client';

// 화면 사이에서 사용자 입력값을 공유하는 상태 (계산기 → 결과 → 동네 지도)
import { createContext, useContext, useEffect, useState } from 'react';

export const EMPTY = {
  seoulPay: '', seoulRent: '', living: '', seoulTransport: '',
  busanPay: '', busanRent: '', busanLiving: '', busanTransport: '',
  age: '',
};
// 꼭 필요한 값 (교통비·부산 생활비·나이는 선택)
export const REQUIRED = ['seoulPay', 'seoulRent', 'living', 'busanPay', 'busanRent'];
export const LABELS = {
  seoulPay: '서울 세후 월급', seoulRent: '서울 월세', living: '서울 생활비', seoulTransport: '서울 교통비',
  busanPay: '부산 세후 월급', busanRent: '부산 월세', busanLiving: '부산 생활비', busanTransport: '부산 교통비', age: '나이',
};

const KEY = 'busansallim-inputs';
const Ctx = createContext(null);

export function AppProvider({ children }) {
  const [inputs, setInputs] = useState(EMPTY);
  const [loaded, setLoaded] = useState(false);

  // 새로고침해도 입력값이 남도록 브라우저에 임시 저장 (서버로 보내지 않음)
  useEffect(() => {
    try {
      const saved = JSON.parse(sessionStorage.getItem(KEY) || 'null');
      if (saved) setInputs({ ...EMPTY, ...saved });
    } catch {}
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try { sessionStorage.setItem(KEY, JSON.stringify(inputs)); } catch {}
  }, [inputs, loaded]);

  const setField = (key, value) => setInputs((prev) => ({ ...prev, [key]: value }));
  const reset = () => setInputs(EMPTY);

  return <Ctx.Provider value={{ inputs, setField, setInputs, reset, loaded }}>{children}</Ctx.Provider>;
}

export function useApp() {
  return useContext(Ctx);
}

// 숫자로 바꾼 입력값 (빈 칸은 null)과 빠진 필수 항목
export function useNumbers() {
  const { inputs } = useApp();
  const num = (v) => (String(v ?? '').trim() === '' ? null : Number(v));
  const values = Object.fromEntries(Object.entries(inputs).map(([k, v]) => [k, num(v)]));
  const missing = REQUIRED.filter((k) => values[k] === null || Number.isNaN(values[k]));
  return { values, missing, complete: missing.length === 0 };
}
