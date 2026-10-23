import './globals.css';
import { AppProvider } from '@/components/AppProvider';
import Header from '@/components/Header';
import AiChat from '@/components/AiChat';

export const metadata = {
  title: '무브산 — 같은 월급, 부산에서는 얼마나 남을까?',
  description: '서울에서 부산으로 이직·이주를 고민하는 청년을 위해 월급·월세·생활비·교통비를 비교해 1년에 얼마나 더 모을 수 있는지 계산하고, 부산 구·군별 원룸 월세를 지도로 보여줍니다.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css" />
      </head>
      <body>
        <AppProvider>
          <Header />
          <main className="main">{children}</main>
          <footer className="footer">
            본 결과는 공개 자료 기준 추정치이며, 원룸 구분은 면적 기준에 따른 추정입니다. 실제 지원 여부와 금액은 각 기관 심사와 개인 상황에 따라 달라집니다.
          </footer>
          <AiChat />
        </AppProvider>
      </body>
    </html>
  );
}
