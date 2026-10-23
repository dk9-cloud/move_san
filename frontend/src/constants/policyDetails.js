// 부산살림 청년 정책 상세 데이터
// 현재는 구조 검증용 Mock 데이터입니다.
// 실제 정책 금액 및 자격 조건으로 해석하면 안 됩니다.

export const POLICY_DETAILS = [
  {
    id: 'rent',
    title: '청년 월세 지원',
    category: '주거 지원',

    dataStatus: 'mock',

    eligibility: {
      minAge: null,
      maxAge: null,
      incomeType: null,
      incomeLimit: null,
      additionalConditions: [],
    },

    benefit: {
      type: 'cash',
      amount: null,
      cycle: null,
      durationMonths: null,
      maxTotalAmount: null,
    },

    overlap: {
      groupId: null,
      ruleVerified: false,
    },

    application: {
      url: null,
      startDate: null,
      endDate: null,
    },

    source: {
      organization: null,
      url: null,
      verifiedAt: null,
    },
  },
];