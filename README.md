# Goalvest - Goal-Oriented Asset Planning Tool

A free, privacy-focused financial planning tool that helps you analyze your financial situation, create scientific asset allocation plans, and project your future wealth growth.

## Features

### 📊 Financial Profile Analysis
- Track income and expenses (monthly/annual modes)
- Calculate savings rate with health assessment
- Visualize cash flow overview
- Emergency fund recommendations

### 💼 Asset Allocation
- Multiple preset templates (Conservative, Balanced, Growth)
- Custom allocation options
- 6 asset classes: Cash, Fixed Income, Index Funds, Stock Funds, Gold, Insurance
- Expected return calculations based on Modern Portfolio Theory
- Risk level indicators

### 📈 Future Projection
- Compound and simple interest modes
- Customizable projection years (1-50 years)
- Year-by-year breakdown
- Principal vs. return composition analysis
- Interactive charts powered by Recharts

### 🌐 Internationalization
- English and Chinese language support
- Automatic language detection
- Currency unit selection (USD/CNY)
- Language-aware default currency

### 🔒 Privacy First
- All data stored locally in your browser (localStorage)
- No server-side data storage
- No account registration required
- No personal information collected

### 🎯 SEO & AdSense Ready
- Semantic HTML structure
- Meta tags optimization
- Privacy Policy, Terms of Service, About Us pages
- Google AdSense compliant

## Tech Stack

- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **State Management**: Zustand (with persistence)
- **Internationalization**: react-i18next
- **Charts**: Recharts
- **Styling**: Tailwind CSS
- **SEO**: react-helmet-async
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/goalvest.git

# Navigate to project directory
cd goalvest

# Install dependencies
npm install

# Start development server
npm run dev
```

### Build for Production

```bash
# Build the project
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
goalvest/
├── public/              # Static assets
│   └── favicon.svg      # App icon
├── src/
│   ├── components/      # Reusable components
│   │   ├── AdBanner.tsx
│   │   ├── CurrencySwitcher.tsx
│   │   ├── Layout.tsx
│   │   └── NumberInput.tsx
│   ├── hooks/           # Custom React hooks
│   │   └── useCurrency.ts
│   ├── i18n/            # Internationalization
│   │   └── locales/
│   │       ├── en.json
│   │       └── zh.json
│   ├── lib/             # Utility functions
│   │   ├── calculations.ts
│   │   └── utils.ts
│   ├── pages/           # Page components
│   │   ├── About.tsx
│   │   ├── Allocation.tsx
│   │   ├── Finance.tsx
│   │   ├── Landing.tsx
│   │   ├── Privacy.tsx
│   │   ├── Projection.tsx
│   │   └── Terms.tsx
│   ├── store/           # Zustand store
│   │   ├── types.ts
│   │   └── useStore.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── index.html
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

## Core Concepts

### Asset Allocation Theory

The asset allocation recommendations are based on:

1. **Modern Portfolio Theory (MPT)**: Diversification to reduce risk while pursuing maximum returns at a given risk level.

2. **Lifecycle Investment Strategy**: Adjusting risk asset proportions based on age - higher risk tolerance when young, more conservative as you age.

3. **Goal-Oriented Planning**: Working backwards from financial goals to determine required savings and investment strategies.

### Calculation Methods

- **Compound Interest**: Returns are reinvested, earning interest on interest
- **Simple Interest**: Returns are not added to principal
- **Weighted Average Return**: Calculated based on allocation ratios and expected returns for each asset class

## Pages

| Page | Route | Description |
|------|-------|-------------|
| Landing | `/` | Homepage with feature overview |
| Financial Profile | `/finance` | Income, expenses, and savings analysis |
| Asset Allocation | `/allocation` | Portfolio allocation planning |
| Future Projection | `/projection` | Wealth growth projection |
| About Us | `/about` | Product information |
| Privacy Policy | `/privacy` | Data privacy information |
| Terms of Service | `/terms` | Usage terms |

## Data Storage

All user data is stored in the browser's localStorage with the key `goalvest-storage-v6`. This includes:

- Financial profile (income, expenses, assets, age)
- Asset allocation preferences
- Return rate settings
- Language and currency preferences

Users can clear their data at any time by clearing browser data.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).

## Disclaimer

This application does not provide investment advice. All information, analysis results, and asset allocation recommendations are for reference and educational purposes only. Before making any investment decisions, please consult a licensed financial advisor.

---

**Goalvest** - Smart Asset Allocation for Your Financial Goals
