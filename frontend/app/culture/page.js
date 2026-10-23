import ComingSoon from '@/components/ComingSoon';

export const metadata = { title: '컬처라이프 | 무브산' };

export default function CulturePage() {
  return (
    <ComingSoon
      eyebrow="CULTURE LIFE"
      title={<>퇴근 후 부산,<br /><em>이렇게</em> 즐겨요</>}
      subtitle="축제, 공연, 바다 액티비티까지 부산의 일상을 소개할 예정이에요."
      items={[
        '이달의 부산 축제·공연 일정',
        '동네별 바다·산책 코스',
        '청년 문화 할인·이용권 정보 연결',
      ]}
    />
  );
}
