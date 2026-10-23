# 무브산 (movesan-web)

서울 → 부산 이주를 고민하는 청년을 위한 "한 달에 남는 돈" 비교 서비스의 프론트엔드 (Next.js · React)

## 처음 실행하기

1. [Node.js](https://nodejs.org) LTS 설치 (한 번만)
2. VS Code에서 이 폴더 열기 → 위 메뉴 **터미널 → 새 터미널**
3. 아래 두 줄을 차례로 붙여 넣기

```
npm install
npm run dev
```

4. 브라우저에서 http://localhost:3000 열기

`npm install`은 처음 한 번만 하면 되고, 다음부터는 `npm run dev`만 하면 돼요.

## 화면

| 주소 | 화면 | PRD |
|---|---|---|
| `/` | 생활비 비교 계산기 (서울 vs 부산 입력) | F-01 |
| `/result` | 계산 결과 (1년 기준, 항목별 비교, 금융상품) | F-02 |
| `/map` | 동네 지도 (구·군별 월세 중앙값, 원룸/투룸) | F-03 |
| `/benefits` | 청년 혜택 (카테고리·조건 필터) | — |
| `/culture` | 컬처라이프 (준비 중 화면) | — |
| `/community` | 커뮤니티 (예시 글) | P2 |
| `/login` | 로그인·회원가입 자리 (Supabase Auth 검토 중) | — |
| `/rent-test` | Flask `GET /api/rent` 연동 테스트 | — |

`/start`는 예전 주소라 `/`로 이동시켜요.

## 로고

`public/logo.png`(가로형), `public/logo-mark.png`(아이콘), `app/icon.png`(브라우저 탭 아이콘). 디자인 원본 파일이 있으면 같은 이름으로 덮어쓰면 됨.

## 폴더 구조

```
app/            화면(페이지)
components/     화면 조각 (입력, 결과, 지도 등)
lib/calc.js     계산식 (물가비율 0.952) ← 지수가 바뀌면 여기 한 줄만 수정
lib/busan.js    부산 구·군 지도·월세·동네·명소 데이터 (월세는 예시 값)
lib/api.js      백엔드(Flask) 연결 지점
```

## 백엔드(Flask) 연결

프로젝트 폴더에 `.env.local` 파일을 만들고 아래처럼 적으면 Flask API를 사용해요. 없으면 프론트의 예시 데이터와 계산식을 사용해요.

```
NEXT_PUBLIC_API_URL=http://localhost:5000
```

- `GET /api/rent` (팀 합의 규격) → `[{ "region_code": "26350", "region_name": "해운대구", "median_rent": 62 }, ...]` (월세 단위: 만원)
  - 연동 테스트 화면: `http://localhost:3001/rent-test` (로딩·오류·성공 상태 표시, [다시 불러오기] 버튼)
  - 동네 지도(`/map`)도 같은 API를 써서, 받은 구만 DB 값으로 바꿔 보여줌
- Flask CORS 허용 주소: `http://localhost:3001` (3000 포트가 사용 중이면 Next.js가 3001로 뜸 — 둘 다 허용 추천)
- `POST /api/chat` — AI 챗봇. body: `{ messages: [{ role, content }], context: { 계산기 입력값 } }` → `{ reply: "답변" }`. Flask에서 LLM API(OpenAI·Claude 등)를 호출해 답하면 됨. 없으면 `lib/chatbot.js`의 규칙 기반 데모 답변 사용
- `POST /api/compare` — 계산 API (규격 미정, 없으면 프론트 계산식 사용)

## 교체해야 할 예시 값

- `lib/busan.js`의 `rent`, `count` → 주거 담당의 구·군별 원룸 월세 중앙값 (housing_area_mart)
- `lib/benefits.js` (청년 혜택 목록 + 결과 화면 금융상품 카드 `featured`) → 혜택 담당의 정책·금융상품 데이터
- `components/BusanMap.js`의 `TWO_ROOM` (투룸 = 원룸 × 1.5 예시) → 주거 담당의 투룸 중앙값
- `components/Community.js`의 예시 글 → 게시판 기능 (P2, 지금은 글쓰기가 화면에만 저장됨)
