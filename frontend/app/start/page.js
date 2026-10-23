import { redirect } from 'next/navigation';

// 예전 단계별 입력 화면 주소 → 이제 첫 화면의 계산기로 이동
export default function StartPage() {
  redirect('/');
}
