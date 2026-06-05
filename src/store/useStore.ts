import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { AppState, RiskProfile, UserProfile, AssetAllocation, AssetReturns, Language, Currency } from './types'

const defaultProfile: UserProfile = {
  annualIncome: 180000,
  annualExpense: 96000,
  incomeMode: 'monthly',
  expenseMode: 'monthly',
  currentAssets: 100000,
  age: 30,
  ignoreExistingAssets: false,
}

const defaultRiskProfile: RiskProfile = {
  score: 50,
  level: 'moderate',
}

const defaultAllocation: AssetAllocation = {
  cash: 15,
  fixed_income: 30,
  index_fund: 35,
  stock_fund: 10,
  gold: 5,
  insurance: 5,
}

const defaultAssetReturns: AssetReturns = {
  cash: 2.0,
  fixed_income: 3.5,
  index_fund: 8.0,
  stock_fund: 10.0,
  gold: 5.0,
  insurance: 3.0,
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      language: 'en' as Language,
      currency: 'USD' as Currency,
      profile: defaultProfile,
      riskProfile: defaultRiskProfile,
      allocation: defaultAllocation,
      assetReturns: defaultAssetReturns,

      setLanguage: (language) => set({ language }),

      setCurrency: (currency) => set({ currency }),

      setProfile: (updates) =>
        set((state) => ({
          profile: { ...state.profile, ...updates },
        })),

      setRiskProfile: (updates) =>
        set((state) => ({
          riskProfile: { ...state.riskProfile, ...updates },
        })),

      setAllocation: (allocation) => set({ allocation }),

      setAssetReturns: (assetReturns) => set({ assetReturns }),

      resetAll: () =>
        set({
          language: 'en',
          currency: 'USD',
          profile: defaultProfile,
          riskProfile: defaultRiskProfile,
          allocation: defaultAllocation,
          assetReturns: defaultAssetReturns,
        }),
    }),
    {
      name: 'goalvest-storage-v6',
    }
  )
)
