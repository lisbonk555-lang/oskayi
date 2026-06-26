import { Zap, ShieldCheck, ArrowUpRight, CheckCircle, Flame, Briefcase } from 'lucide-react';
import { motion } from 'motion/react';
import SlidingGallery from './SlidingGallery';

interface HeroProps {
  onEnterApp: () => void;
  walletConnected: boolean;
}

export default function Hero({ onEnterApp, walletConnected }: HeroProps) {
  const services = [
    {
      title: "Smart Price Trading",
      desc: "Buy where the price is lower. Sell where the price is higher. Repay the flash loan. Keep the profit.",
      icon: Zap,
      color: "text-brand-accent"
    },
    {
      title: "Risk Recovery",
      desc: "Liquidate unhealthy lending positions and receive risk recovery fees instantly.",
      icon: ShieldCheck,
      color: "text-blue-400"
    },
    {
      title: "Asset Upgrade",
      desc: "Replace collateral on lending protocols instantly without closing your active positions.",
      icon: Flame,
      color: "text-orange-400"
    },
    {
      title: "Loan Optimization",
      desc: "Move your active loans instantly to a lower interest rate pool to optimize yield.",
      icon: Briefcase,
      color: "text-pink-400"
    }
  ];

  const providers = ["Aave V3", "Balancer Pool", "ERC3156 FlashSwap"];
  const dexs = ["Aerodrome", "Uniswap V3", "Balancer", "Curve", "1inch"];

  return (
    <div className="py-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Main Title Banner */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          {/* Large Stunning Logo */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
            className="flex justify-center mb-8"
          >
            <div className="relative p-1 rounded-full bg-gradient-to-tr from-amber-400 via-brand-accent to-pink-500 shadow-2xl shadow-brand-accent/25 animate-pulse">
              <div className="relative h-28 w-28 rounded-full border-4 border-brand-dark overflow-hidden bg-brand-dark">
                <img
                  src="/images/oskayi_gold_logo_1782447987080.jpg"
                  alt="Oskayi Gold Logo"
                  className="h-full w-full object-cover select-none"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block bg-brand-accent/10 border border-brand-accent/30 text-brand-accent px-4 py-1.5 rounded-full text-xs font-mono tracking-wider mb-6"
          >
            INSTITUTIONAL GRADE MULTI-CHAIN PROTOCOL
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="font-display font-black text-5xl sm:text-7xl tracking-tight leading-none text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-rose-400 to-brand-accent"
          >
            OSKAYI INSTANT CAPITAL
          </motion.h2>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-4 text-center"
          >
            <p className="text-xs font-bold tracking-widest text-amber-300 font-mono uppercase bg-amber-500/10 border border-amber-500/20 px-4 py-1.5 rounded-full inline-block">
              "Any Wallet • Any Token • Any Chain"
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-6 flex flex-col sm:flex-row justify-center items-center gap-x-2 gap-y-1 font-display font-medium text-lg sm:text-2xl text-gray-300"
          >
            <span className="text-white font-black bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">No Personal Funds Needed.</span>
            <span className="text-brand-accent font-black">Zero Risk Strategy.</span>
            <span className="text-amber-300 font-black">Keep 100% of Payouts.</span>
          </motion.div>

          <p className="mt-6 text-gray-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed font-sans">
            Borrow millions of dollars instantly from top-tier liquidity pools across leading blockchains. Our zero-risk automated framework buys low on one exchange and sells high on another. If the trade doesn't make a profit, the loan cancels automatically—keeping you 100% safe!
          </p>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-8"
          >
            <button
              id="hero-launch-app"
              onClick={onEnterApp}
              className="px-8 py-4 bg-brand-accent hover:bg-blue-600 text-white font-display font-bold text-base rounded-xl transition-all shadow-xl shadow-brand-accent/10 flex items-center gap-2 mx-auto"
            >
              Launch Core Terminal
              <ArrowUpRight className="h-5 w-5" />
            </button>
          </motion.div>
        </div>

        {/* Stunning Interactive Slideshow with Notes */}
        <div className="mb-16">
          <SlidingGallery />
        </div>

        {/* 4 Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {services.map((srv, idx) => (
            <div
              key={idx}
              id={`service-card-${idx}`}
              className="bg-brand-card/60 hover:bg-brand-card border border-brand-border hover:border-brand-accent/30 rounded-xl p-6 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className={`p-3 bg-brand-dark rounded-lg w-fit border border-brand-border mb-4`}>
                  <srv.icon className={`h-6 w-6 ${srv.color}`} />
                </div>
                <h4 className="font-display font-bold text-lg text-white mb-2">{srv.title}</h4>
                <p className="text-xs text-gray-400 leading-relaxed">{srv.desc}</p>
              </div>
              <div className="mt-4 pt-4 border-t border-brand-border flex items-center gap-1.5 text-xs font-mono text-brand-accent">
                <CheckCircle className="h-3.5 w-3.5" />
                <span>Base Production Ready</span>
              </div>
            </div>
          ))}
        </div>

        {/* Integration Support Footnote */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-brand-border">
          
          {/* Supported Flash Loan Providers */}
          <div>
            <h5 className="text-xs font-mono uppercase tracking-widest text-gray-400 mb-4">Supported Capital Providers</h5>
            <div className="flex flex-wrap gap-3">
              {providers.map((p, idx) => (
                <div
                  key={idx}
                  className="bg-brand-dark/80 border border-brand-border px-4 py-2 rounded-lg text-xs font-semibold text-white flex items-center gap-2"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-accent"></span>
                  {p}
                </div>
              ))}
            </div>
          </div>

          {/* Supported DEXs */}
          <div>
            <h5 className="text-xs font-mono uppercase tracking-widest text-gray-400 mb-4">Atomic Liquidity DEX Aggregators</h5>
            <div className="flex flex-wrap gap-3">
              {dexs.map((d, idx) => (
                <div
                  key={idx}
                  className="bg-brand-dark/80 border border-brand-border px-4 py-2 rounded-lg text-xs font-semibold text-white flex items-center gap-2"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-400"></span>
                  {d}
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
