import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause, Info, HelpCircle, Check, Shield, Cpu, RefreshCw, Layers } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const SLIDES = [
  {
    image: "/images/smart_arbitrage_hero_1782447648375.jpg",
    title: "1. Welcome to Oskayi Instant Capital",
    note: "Prices can differ across digital cryptocurrency exchanges. Our system instantly spots these price differences and secures risk-free trades for our users automatically.",
    tag: "MODULE 01 • WELCOME",
    badgeColor: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    icon: Layers
  },
  {
    image: "/images/flash_loan_diagram_1782447662278.jpg",
    title: "2. What is a Flash Loan?",
    note: "Need millions of dollars to complete a high-value trade? Flash loans let you borrow massive capital with zero collateral, as long as it is borrowed and repaid within a single block.",
    tag: "MODULE 02 • WEALTH GENERATION",
    badgeColor: "bg-amber-500/20 text-amber-400 border-amber-500/30",
    icon: HelpCircle
  },
  {
    image: "/images/smart_arbitrage_hero_1782447648375.jpg",
    title: "3. The Power of Atomic Trades",
    note: "All actions happen in one package. If we borrow capital, execute the swap, and repay the loan in a single step, the blockchain guarantees success or reverts everything safely.",
    tag: "MODULE 03 • ATOMIC FLOW",
    badgeColor: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    icon: Cpu
  },
  {
    image: "/images/blockchain_gas_chart_1782448006480.jpg",
    title: "4. Decentralized Arbitrage",
    note: "Decentralized exchanges like Aerodrome and Uniswap have separate liquidity pools. When a large trade happens on one, prices get out of sync. We capture that gap!",
    tag: "MODULE 04 • PRICE PARITY",
    badgeColor: "bg-purple-500/20 text-purple-400 border-purple-500/30",
    icon: RefreshCw
  },
  {
    image: "/images/risk_recovery_shield_1782447676975.jpg",
    title: "5. Zero Capital Loss Protection",
    note: "Your personal funds are never at risk. If a trade is not profitable enough to cover the loan repayment plus interest, the transaction cancels and no funds are ever lost.",
    tag: "MODULE 05 • RISK SAFEGUARD",
    badgeColor: "bg-red-500/20 text-red-400 border-red-500/30",
    icon: Shield
  },
  {
    image: "/images/multi_token_swap_vault_1782448020199.jpg",
    title: "6. Smart Routing Architecture",
    note: "Our smart algorithms automatically find the most efficient routing paths across diverse token pairs like USDC, Ethereum, and DAI to maximize output yield.",
    tag: "MODULE 06 • SMART ROUTER",
    badgeColor: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
    icon: Layers
  },
  {
    image: "/images/blockchain_gas_chart_1782448006480.jpg",
    title: "7. Powered by Base Network",
    note: "We run our engine exclusively on Base, Coinbase's Layer-2 network. This ensures transaction fees are fractions of a cent, ensuring high profit margins on every single run.",
    tag: "MODULE 07 • COINBASE L2",
    badgeColor: "bg-indigo-500/20 text-indigo-400 border-indigo-500/30",
    icon: Cpu
  },
  {
    image: "/images/multi_token_swap_vault_1782448020199.jpg",
    title: "8. Liquidity Pool Deep Analysis",
    note: "Our system measures the depth of various asset pools on-chain. This avoids price slippage, making sure large order executions get the exact price projected.",
    tag: "MODULE 08 • DEPTH SENSORS",
    badgeColor: "bg-pink-500/20 text-pink-400 border-pink-500/30",
    icon: Info
  },
  {
    image: "/images/smart_arbitrage_hero_1782447648375.jpg",
    title: "9. Superfast 2-Second Blocks",
    note: "Speed is everything in crypto trading. Because the Base network updates in just 2 seconds, our scanners run continuously to submit winning transactions ahead of others.",
    tag: "MODULE 09 • SPEED MATRIX",
    badgeColor: "bg-teal-500/20 text-teal-400 border-teal-500/30",
    icon: RefreshCw
  },
  {
    image: "/images/flash_loan_diagram_1782447662278.jpg",
    title: "10. Trustless Smart Contracts",
    note: "No human middlemen are needed. Immutable smart contract code enforces the rules, meaning the terms of loans and payouts cannot be manipulated or altered by anyone.",
    tag: "MODULE 10 • SMART ESCROW",
    badgeColor: "bg-orange-500/20 text-orange-400 border-orange-500/30",
    icon: Check
  },
  {
    image: "/images/blockchain_gas_chart_1782448006480.jpg",
    title: "11. Real-Time Gas Saving Matrix",
    note: "Gas costs fluctuate based on blockchain traffic. Our execution manager continuously optimizes smart contract calls, keeping overhead to an absolute minimum.",
    tag: "MODULE 11 • GAS SAVER",
    badgeColor: "bg-violet-500/20 text-violet-400 border-violet-500/30",
    icon: Cpu
  },
  {
    image: "/images/risk_recovery_shield_1782447676975.jpg",
    title: "12. Lending Pool Safeguards",
    note: "We safeguard decentralized lending markets like Aave and Morpho. By performing healthy pool liquidations, we prevent system collapse while collecting on-chain bonuses.",
    tag: "MODULE 12 • LIQUIDATION SHIELD",
    badgeColor: "bg-rose-500/20 text-rose-400 border-rose-500/30",
    icon: Shield
  },
  {
    image: "/images/smart_arbitrage_hero_1782447648375.jpg",
    title: "13. Premium Oracle Connection",
    note: "Our nodes connect directly to real-time decentralized price feeds. This guarantees our price data is accurate to the millisecond, avoiding outdated trade submissions.",
    tag: "MODULE 13 • ORACLE SYNCS",
    badgeColor: "bg-sky-500/20 text-sky-400 border-sky-500/30",
    icon: RefreshCw
  },
  {
    image: "/images/oskayi_gold_logo_1782447987080.jpg",
    title: "14. Institutional Capital for All",
    note: "Advanced trading strategies are usually locked behind wall-street funds. Oskayi opens up institutional-grade atomic capital to anyone with a connected Web3 wallet.",
    tag: "MODULE 14 • EQUITABLE DEFI",
    badgeColor: "bg-amber-500/20 text-yellow-400 border-yellow-500/30",
    icon: Check
  }
];

export default function SlidingGallery() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % SLIDES.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % SLIDES.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  };

  const IconComponent = SLIDES[currentIndex].icon;

  return (
    <div className="bg-brand-card border-2 border-brand-accent/35 rounded-2xl overflow-hidden shadow-2xl relative group mb-10" id="sliding-gallery">
      {/* Background colorful ambient glow */}
      <div className="absolute -top-12 -left-12 w-48 h-48 bg-brand-accent/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl pointer-events-none"></div>

      {/* Slide Navigation Top bar */}
      <div className="bg-brand-dark/90 px-6 py-3 border-b border-brand-border flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-brand-accent animate-pulse"></span>
          <span className="font-mono text-gray-300">EXPLORE DEFI CONCEPTS</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-gray-400 font-mono bg-brand-card px-2.5 py-1 rounded border border-brand-border">
            SLIDE <strong className="text-white font-black">{currentIndex + 1}</strong> OF 14
          </span>
        </div>
      </div>

      {/* Main Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        
        {/* Left Side: Sliding Image Canvas */}
        <div className="lg:col-span-7 relative h-[300px] sm:h-[400px] bg-brand-dark/85 overflow-hidden border-b lg:border-b-0 lg:border-r border-brand-border">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 w-full h-full"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-transparent z-10"></div>
              <img
                src={SLIDES[currentIndex].image}
                alt={SLIDES[currentIndex].title}
                className="w-full h-full object-cover select-none transition-transform duration-1000 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </AnimatePresence>

          {/* Carousel Manual Controls Overlaid */}
          <div className="absolute bottom-4 left-4 right-4 z-20 flex justify-between items-center bg-brand-dark/80 backdrop-blur-md px-4 py-2.5 rounded-xl border border-brand-border">
            <div className="flex gap-1 overflow-x-auto max-w-[150px] sm:max-w-none py-1 scrollbar-none">
              {SLIDES.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-2 h-2 rounded-full transition-all shrink-0 ${
                    idx === currentIndex ? 'bg-brand-accent scale-150 shadow-lg shadow-brand-accent/50' : 'bg-gray-600 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <div className="flex gap-2">
              <button
                onClick={handlePrev}
                className="p-1.5 hover:bg-gray-800 rounded transition-colors text-white border border-brand-border/60 bg-brand-dark/50"
                aria-label="Previous slide"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-1.5 hover:bg-gray-800 rounded transition-colors text-white border border-brand-border/60 bg-brand-dark/50"
                aria-label={isPlaying ? "Pause autoplay" : "Start autoplay"}
              >
                {isPlaying ? <Pause className="h-4 w-4 text-brand-accent" /> : <Play className="h-4 w-4 text-emerald-400" />}
              </button>
              <button
                onClick={handleNext}
                className="p-1.5 hover:bg-gray-800 rounded transition-colors text-white border border-brand-border/60 bg-brand-dark/50"
                aria-label="Next slide"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Side: Simple English Explanations */}
        <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between bg-brand-card/95 relative">
          <div className="space-y-5">
            <div className="flex items-center gap-2">
              <span className={`text-[10px] font-mono font-bold px-3 py-1 rounded-full border ${SLIDES[currentIndex].badgeColor} tracking-wider`}>
                {SLIDES[currentIndex].tag}
              </span>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2.5 bg-brand-accent/10 rounded-xl border border-brand-accent/25 text-brand-accent shrink-0 mt-1">
                    <IconComponent className="h-5 w-5" />
                  </div>
                  <h3 className="font-display font-black text-2xl text-white uppercase tracking-tight leading-none pt-1">
                    {SLIDES[currentIndex].title}
                  </h3>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed font-sans font-normal border-l-2 border-brand-accent/20 pl-4 py-1">
                  {SLIDES[currentIndex].note}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="pt-6 border-t border-brand-border mt-6 space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono text-gray-400">
              <span className="flex h-2 w-2 rounded-full bg-brand-accent animate-ping"></span>
              <span>Fully Automated Multi-Pool System</span>
            </div>
            <p className="text-[11px] text-gray-500 font-normal leading-relaxed">
              *The code guarantees atomic completion of your trades. This keeps transactions clean, safe, and lightning fast. Enjoy seamless institutional-grade finance without intermediate steps.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
