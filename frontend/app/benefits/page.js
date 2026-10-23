
import Hero from '@/components/Hero';
import BenefitsComparison from './BenefitsComparison';

export const metadata = {
  title: '청년 혜택 비교 | 무브산',
  description: '서울과 부산의 청년 정책 및 경제적 혜택을 비교합니다.',
};

export default function BenefitsPage() {
  return (
    <>
      <Hero
        compact
        eyebrow="YOUTH BENEFITS"
        title={
          <>
            서울과 부산,<br />
            <em>청년 혜택을 비교해 보세요</em>
          </>
        }
        subtitle="나의 조건에 맞는 청년 정책을 살펴보고, 부산 이주 시 달라지는 경제적 혜택을 확인해 보세요."
      />
      <div className="page">
        <div className="lift">
          <BenefitsComparison />
        </div>
      </div>
    </>
  );
}