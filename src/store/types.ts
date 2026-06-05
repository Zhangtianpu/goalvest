export type Language = 'en' | 'zh'
export type Currency = 'USD' | 'CNY'

export interface RiskProfile {
  score: number
  level: 'conservative' | 'moderate' | 'aggressive'
}

export interface AssetAllocation {
  cash: number
  fixed_income: number
  index_fund: number
  stock_fund: number
  gold: number
  insurance: number
}

export interface AssetReturns {
  cash: number
  fixed_income: number
  index_fund: number
  stock_fund: number
  gold: number
  insurance: number
}

export interface UserProfile {
  annualIncome: number
  annualExpense: number
  incomeMode: 'monthly' | 'annual'
  expenseMode: 'monthly' | 'annual'
  currentAssets: number
  age: number
  ignoreExistingAssets: boolean
}

export interface AppState {
  language: Language
  currency: Currency
  profile: UserProfile
  riskProfile: RiskProfile
  allocation: AssetAllocation
  assetReturns: AssetReturns

  setLanguage: (language: Language) => void
  setCurrency: (currency: Currency) => void
  setProfile: (profile: Partial<UserProfile>) => void
  setRiskProfile: (profile: Partial<RiskProfile>) => void
  setAllocation: (allocation: AssetAllocation) => void
  setAssetReturns: (returns: AssetReturns) => void
  resetAll: () => void
}
