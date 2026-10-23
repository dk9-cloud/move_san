'use client';

import { useState } from 'react';
import { BENEFITS, CATEGORIES, CAT_ICON } from '@/constants/benefits';
import { POLICY_DETAILS } from '@/constants/policyDetails';
import BenefitComparison from './BenefitComparison';
import styles from './BenefitBrowser.module.css';

// 정책 카테고리 아이콘
export function Thumb({ cat, size = 120 }) {
  return (
    <span
      className={styles.thumb}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <svg
        width={size * 0.36}
        height={size * 0.36}
        viewBox="0 0 24 24"
        fill="none"
        stroke="#fff"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d={CAT_ICON[cat] || CAT_ICON['생활 지원']} />
      </svg>
    </span>
  );
}

// 기존 Mock 데이터에만 적용되는 임시 분류
function getAgeGroup(age) {
  if (age <= 19) return '19세 이하';
  if (age <= 29) return '20대';
  if (age <= 39) return '30대';
  return null;
}

function getIncomeGroup(income) {
  if (income <= 2000) return '2천만원 이하';
  if (income < 4000) return '2~4천만원';
  return '4천만원 이상';
}

// 기존 공통 데이터를 변경하지 않고 상세정보 결합
const POLICY_LIST = BENEFITS.map((benefit) => ({
  ...benefit,
  policyDetail:
    POLICY_DETAILS.find((policy) => policy.id === benefit.id) || null,
}));

export default function BenefitBrowser() {
  const [cat, setCat] = useState('전체');

  const [age, setAge] = useState('');
  const [income, setIncome] = useState('');
  const [applied, setApplied] = useState(null);

  const [open, setOpen] = useState('');

  // 나의 정착 혜택 바구니
  const [basketIds, setBasketIds] = useState([]);

  const handleSearch = () => {
    const ageNumber = Number(age);
    const incomeNumber = Number(income);

    if (
      age.trim() === '' ||
      income.trim() === '' ||
      !Number.isInteger(ageNumber) ||
      ageNumber < 0 ||
      ageNumber > 120 ||
      !Number.isFinite(incomeNumber) ||
      incomeNumber < 0
    ) {
      alert('올바른 만 나이와 연 소득을 입력해 주세요.');
      return;
    }

    setApplied({
      ageGroup: getAgeGroup(ageNumber),
      incomeGroup: getIncomeGroup(incomeNumber),
    });
  };

  const handleReset = () => {
    setAge('');
    setIncome('');
    setApplied(null);
    setOpen('');
  };

  // 혜택 바구니 담기 및 빼기
  const toggleBasket = (id) => {
    setBasketIds((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };

  // 기존 연령·소득 기준으로 정책 후보 검색
  const list = POLICY_LIST.filter((benefit) => {
    const categoryMatch =
      cat === '전체' || benefit.cat === cat;

    if (!categoryMatch) return false;
    if (!applied) return true;

    const ageMatch =
      applied.ageGroup !== null &&
      benefit.ages.includes(applied.ageGroup);

    const incomeMatch =
      benefit.income.includes(applied.incomeGroup);

    return ageMatch && incomeMatch;
  });

  // 담긴 혜택은 현재 카테고리 필터와 관계없이 유지
  const basketBenefits = basketIds
    .map((id) => POLICY_LIST.find((benefit) => benefit.id === id))
    .filter(Boolean);

  return (
    <>
      {/* 카테고리 선택 */}
      <div className="chips filter-chips">
        {['전체', ...CATEGORIES].map((category) => (
          <button
            key={category}
            type="button"
            className={
              cat === category ? 'chip big on' : 'chip big'
            }
            onClick={() => setCat(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className={styles.layout}>
        {/* 사용자 조건 */}
        <aside className={`card ${styles.filter}`}>
          <h2 style={{ fontSize: 18 }}>조건으로 찾기</h2>

          <div className={styles.inputGroup}>
            <label htmlFor="benefit-age">만 나이</label>

            <div className={styles.inputWrap}>
              <input
                id="benefit-age"
                type="number"
                min="0"
                max="120"
                step="1"
                placeholder="예: 26"
                value={age}
                onChange={(event) =>
                  setAge(event.target.value)
                }
              />
              <span>세</span>
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="benefit-income">
              연 소득 (세전)
            </label>

            <div className={styles.inputWrap}>
              <input
                id="benefit-income"
                type="number"
                min="0"
                step="1"
                placeholder="예: 3200"
                value={income}
                onChange={(event) =>
                  setIncome(event.target.value)
                }
              />
              <span>만원</span>
            </div>
          </div>

          <button
            type="button"
            className="btn"
            style={{ width: '100%' }}
            onClick={handleSearch}
          >
            맞춤 혜택 조회하기
          </button>

          {applied && (
            <button
              type="button"
              className="btn-ghost"
              style={{ width: '100%', marginTop: 8 }}
              onClick={handleReset}
            >
              조건 초기화
            </button>
          )}

          <p className="small muted">
            현재는 예시 데이터의 연령·소득 구간을 기준으로
            정책 후보를 검색합니다. 실제 수급 자격은
            추가 확인이 필요합니다.
          </p>
        </aside>

        {/* 정책 목록 및 정착 혜택 바구니 */}
        <div className="stack" style={{ gap: 14 }}>
          <span className="small muted">
            {applied
              ? `입력 조건과 일치하는 예시 지원사업 ${list.length}개`
              : `총 ${list.length}개의 예시 지원사업이 있어요.`}
          </span>

          {/* 담은 혜택 요약 */}
          {basketBenefits.length > 0 && (
            <BenefitComparison
              benefits={basketBenefits}
              onRemove={(id) =>
                setBasketIds((prev) =>
                  prev.filter((item) => item !== id)
                )
              }
              onClear={() => setBasketIds([])}
            />
          )}

          {list.length === 0 && (
            <div className="card muted">
              입력한 조건에 맞는 예시 지원사업이 없어요.
              조건을 다시 확인해 주세요.
            </div>
          )}

          {/* 정책 카드 */}
          {list.map((benefit) => {
            const isInBasket = basketIds.includes(benefit.id);

            return (
              <article
                key={benefit.id}
                className={styles.card}
              >
                <Thumb cat={benefit.cat} />

                <div
                  className="stack"
                  style={{ gap: 6, minWidth: 0 }}
                >
                  <span
                    className="tag"
                    style={{ alignSelf: 'flex-start' }}
                  >
                    {benefit.cat}
                  </span>

                  <h3>{benefit.title}</h3>

                  <span className="small muted">
                    {benefit.desc}
                  </span>

                  <span
                    className="small"
                    style={{ fontWeight: 600 }}
                  >
                    {benefit.info}
                  </span>

                  {/* 상세정보 */}
                  {open === benefit.id && (
                    <div className={`${styles.detail} small`}>
                      <div>
                        <b>대상</b>{' '}
                        {benefit.ages.join(', ')}
                      </div>

                      <div>
                        <b>소득</b>{' '}
                        {benefit.income.join(', ')}
                      </div>

                      <div>
                        <b>주관</b>{' '}
                        {benefit.org}
                      </div>

                      <div>
                        <b>신청</b>{' '}
                        신청 방법·링크 확인 필요
                      </div>

                      {benefit.policyDetail?.benefit?.cycle && (
                        <div>
                          <b>주기</b>{' '}
                          {benefit.policyDetail.benefit.cycle}
                        </div>
                      )}

                      {benefit.applicationUrl ? (
                        <a
                          href={benefit.applicationUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            color: 'var(--brand)',
                            fontWeight: 700,
                          }}
                        >
                          공식 정책 페이지 바로가기 ↗
                        </a>
                      ) : (
                        <span className="muted">
                          공식 신청 링크 확인 중
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* 담기 / 자세히 보기 */}
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 10,
                    alignItems: 'stretch',
                  }}
                >
                  <button
                    type="button"
                    className="btn btn-outline btn-sm"
                    aria-pressed={isInBasket}
                    onClick={() => toggleBasket(benefit.id)}
                    style={
                      isInBasket
                        ? {
                            borderColor: 'var(--brand)',
                            color: 'var(--brand)',
                          }
                        : undefined
                    }
                  >
                    {isInBasket
                      ? '담기 취소 ✓'
                      : '혜택 담기 +'}
                  </button>

                  <button
                    type="button"
                    className="btn btn-outline btn-sm"
                    onClick={() =>
                      setOpen(
                        open === benefit.id ? '' : benefit.id
                      )
                    }
                  >
                    {open === benefit.id
                      ? '접기 ▲'
                      : '자세히 보기 →'}
                  </button>
                </div>
              </article>
            );
          })}

          <p className="small warn" style={{ margin: 0 }}>
            표시된 정책은 화면 확인용 예시입니다.
            검색 결과는 실제 지원 자격 충족을
            의미하지 않습니다. 주거 요건 등 추가 조건을
            확인해야 하며, 지원 금액은 아직
            계산에 포함하지 않습니다.
          </p>
        </div>
      </div>
    </>
  );
}