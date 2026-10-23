import Hero from '@/components/Hero';
import Community from '@/components/Community';

export const metadata = { title: '커뮤니티 | 무브산' };

export default function CommunityPage() {
  return (
    <>
      <Hero
        compact
        eyebrow="COMMUNITY"
        title={<>부산에서의 <em>이야기</em>를 나눠요</>}
        subtitle="이주 후기부터 생활 정보까지, 다양한 경험을 공유해 주세요."
      />
      <div className="page">
        <div className="lift">
          <Community />
        </div>
      </div>
    </>
  );
}
