import styles from './BenefitComparison.module.css';

export default function BenefitComparison({
  benefits,
  onRemove,
  onClear,
}) {
  if (benefits.length === 0) return null;

  // 현재는 Mock 데이터이므로 모든 정책의 수혜 자격 확인 필요
  const unverifiedCount = benefits.length;

  return (
    <section
      className={styles.section}
      aria-label="나의 정착 혜택 바구니"
    >
      <div className={styles.heading}>
        <div>
          <span className={styles.eyebrow}>
            MY SETTLEMENT BENEFITS
          </span>

          <h2>나의 정착 혜택 바구니</h2>

          <p>
            관심 있는 정책을 모아서 확인해 보세요.
          </p>
        </div>

        <button
          type="button"
          className={styles.clear}
          onClick={onClear}
        >
          전체 비우기
        </button>
      </div>

      {/* 바구니 요약 */}
      <div className={styles.summary}>
        <div className={styles.summaryItem}>
          <span className={styles.summaryLabel}>
            담은 정책
          </span>
          <strong>{benefits.length}개</strong>
        </div>

        <div className={styles.summaryItem}>
          <span className={styles.summaryLabel}>
            추가 확인이 필요한 정책
          </span>
          <strong>{unverifiedCount}개</strong>
        </div>

        <div className={styles.summaryItem}>
          <span className={styles.summaryLabel}>
            총 예상 정착 혜택
          </span>
          <strong className={styles.pending}>
            산정 전
          </strong>
        </div>
      </div>

      {/* 담은 정책 목록 */}
      <div className={styles.list}>
        {benefits.map((benefit) => {
          const detail = benefit.policyDetail;
          const cycle = detail?.benefit?.cycle;

          return (
            <article
              key={benefit.id}
              className={styles.item}
            >
              <div className={styles.itemMain}>
                <span className={styles.category}>
                  {benefit.cat}
                </span>

                <h3>{benefit.title}</h3>

                <p>{benefit.desc}</p>

                <div className={styles.meta}>
                  <span>
                    지급 주기: {cycle || '확인 필요'}
                  </span>

                  <span>
                    자격: 추가 확인 필요
                  </span>
                </div>
              </div>

              <div className={styles.itemAction}>
                <span className={styles.amount}>
                  금액 확인 필요
                </span>

                <button
                  type="button"
                  className={styles.remove}
                  onClick={() => onRemove(benefit.id)}
                  aria-label={`${benefit.title} 바구니에서 삭제`}
                >
                  <span aria-hidden="true">×</span>
                  삭제
                </button>
              </div>
            </article>
          );
        })}
      </div>

      {/* 안내 문구 */}
      <div className={styles.notice}>
        <strong>예상 혜택 산정 안내</strong>

        <p>
          현재는 화면 검증용 Mock 정책입니다.
          정책을 담았다고 수혜 자격이 확정되는 것은
          아닙니다. 실제 지원 금액, 지급 주기,
          중복 수혜 가능 여부가 검증되기 전까지
          총 혜택 금액을 계산하지 않습니다.
        </p>
      </div>
    </section>
  );
}