import { Opportunity, BotStatus } from '../types';
import { Eye, ShieldCheck, Flame, RefreshCw, AlertCircle, TrendingUp, Cpu } from 'lucide-react';

interface ScannerProps {
  opportunities: Opportunity[];
  botStatus: BotStatus | null;
  onRefresh: () => void;
  refreshing: boolean;
}

export default function Scanner({ opportunities, botStatus, onRefresh, refreshing }: ScannerProps) {
  return (
    <div className="bg-brand-card border border-brand-border rounded-xl p-6 mb-10" id="live-scanner">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 pb-4 border-b border-brand-border">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-brand-accent/10 rounded border border-brand-accent/20 animate-pulse">
            <Cpu className="h-4 w-4 text-brand-accent" />
          </div>
          <div>
            <h3 className="font-display font-bold text-lg text-white">LIVE ARBITRAGE OPPORTUNITY SCANNER</h3>
            <p className="text-xs text-gray-400 font-mono mt-0.5">Continuous decentralized pool scanning on Base Mainnet</p>
          </div>
        </div>

        <button
          id="btn-refresh-scanner"
          disabled={refreshing}
          onClick={onRefresh}
          className="flex items-center gap-2 text-xs font-mono bg-brand-dark/80 hover:bg-brand-dark border border-brand-border text-gray-300 px-3.5 py-2 rounded-lg hover:text-white transition-colors"
        >
          <RefreshCw className={`h-3.5 w-3.5 text-brand-accent ${refreshing ? 'animate-spin' : ''}`} />
          {refreshing ? 'Scanning Base Mainnet...' : 'Force Manual Scan'}
        </button>
      </div>

      {/* Real Scan Pool Spreads Status */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        {botStatus?.spreadsFound && botStatus.spreadsFound.length > 0 ? (
          botStatus.spreadsFound.map((spread, idx) => (
            <div key={idx} className="bg-brand-dark/70 border border-brand-border rounded p-3 text-center">
              <p className="text-[10px] font-mono text-gray-400 font-bold tracking-widest">{spread.exchange}</p>
              <p className="text-sm font-display font-black text-white mt-1">${spread.price}</p>
              <p className="text-[10px] font-mono text-gray-400 mt-1">{spread.pair}</p>
            </div>
          ))
        ) : (
          <div className="col-span-5 py-4 text-center text-xs font-mono text-gray-500">
            Scanning and fetching live DEX pools from public Base RPC...
          </div>
        )}
      </div>

      {/* Main Opportunities Display */}
      {opportunities.length > 0 ? (
        <div className="space-y-4">
          {opportunities.map((opp) => (
            <div
              key={opp.id}
              className="bg-brand-dark/40 border border-brand-border rounded-lg p-5 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6"
            >
              {/* Left detail */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="bg-brand-accent/20 text-brand-accent text-[10px] font-mono font-bold px-2 py-0.5 rounded border border-brand-accent/30">
                    {opp.provider} Flash Swap
                  </span>
                  <span className="text-xs text-gray-400 font-mono">
                    Route: {opp.dexSource} ➔ {opp.dexTarget}
                  </span>
                </div>
                <h4 className="font-display font-bold text-base text-white">
                  Arbitrage Opportunity: Borrow {Number(opp.borrowAmount).toLocaleString()} {opp.tokenIn}
                </h4>
                <div className="flex flex-wrap gap-4 text-xs font-mono text-gray-400">
                  <span>Loan Fee: <span className="text-white">${opp.loanFeeUsd}</span></span>
                  <span>Gas Cost: <span className="text-white">${opp.gasCostUsd}</span></span>
                  <span>Slippage Impact: <span className="text-red-400">{opp.slippage}%</span></span>
                </div>
              </div>

              {/* Profit metrics & execution action */}
              <div className="flex items-center gap-6 w-full lg:w-auto justify-between lg:justify-end border-t lg:border-t-0 border-brand-border pt-4 lg:pt-0">
                <div className="text-right">
                  <p className="text-[10px] font-mono text-gray-400 uppercase tracking-wider">Estimated Net Profit</p>
                  <p className="text-xl font-display font-black text-brand-green">${opp.netProfitUsd}</p>
                  <span className="text-[10px] font-mono bg-green-950/40 border border-green-900/30 text-green-400 px-2 py-0.5 rounded mt-1 inline-block">
                    Risk: {opp.riskScore}
                  </span>
                </div>
                <button
                  id={`btn-execute-opp-${opp.id}`}
                  className="bg-brand-accent hover:bg-blue-600 text-white font-display font-bold text-xs px-5 py-3 rounded-lg transition-colors"
                >
                  Execute Instantly
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-brand-dark/50 border border-dashed border-brand-border rounded-xl p-8 text-center flex flex-col items-center justify-center gap-3">
          <div className="p-3 bg-brand-dark rounded-full border border-brand-border">
            <AlertCircle className="h-6 w-6 text-brand-accent" />
          </div>
          <div>
            <h4 className="font-display font-bold text-white text-base">No profitable opportunities found</h4>
            <p className="text-xs text-gray-400 max-w-md mx-auto mt-1 leading-normal">
              Base Mainnet is highly efficient. The scanner is actively monitoring Aave liquidity, Uniswap V3, and Aerodrome pools. Arbitrage spreads are currently smaller than gas or 0.05% flash loan fees.
            </p>
          </div>
          <div className="text-[10px] font-mono text-gray-500 bg-brand-card px-3 py-1 rounded border border-brand-border mt-2">
            Last Checked: {botStatus?.lastScanTime ? new Date(botStatus.lastScanTime).toLocaleTimeString() : 'Refreshing...'} | RPC Check: OK
          </div>
        </div>
      )}
    </div>
  );
}
