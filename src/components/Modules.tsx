import { useState } from 'react';
import { Zap, ShieldCheck, Flame, Briefcase, ChevronRight, Play, CheckCircle, Info, Lock } from 'lucide-react';
import { WalletState } from '../types';

interface ModulesProps {
  wallet: WalletState;
  onExecute: (moduleName: string, params: any) => void;
  executing: boolean;
  execResult: any;
}

export default function Modules({ wallet, onExecute, executing, execResult }: ModulesProps) {
  const [activeTab, setActiveTab] = useState<'arbitrage' | 'liquidation' | 'upgrade' | 'optimize'>('arbitrage');

  // Input States for Arbitrage
  const [arbBorrowAmount, setArbBorrowAmount] = useState('10000');
  const [arbToken, setArbToken] = useState('USDC');
  const [arbBuyDex, setArbBuyDex] = useState('Uniswap V3');
  const [arbSellDex, setArbSellDex] = useState('Aerodrome');

  // Input States for Liquidation
  const [liqUserAddress, setLiqUserAddress] = useState('');
  const [liqProtocol, setLiqProtocol] = useState('Aave V3');

  // Input States for Collateral Upgrade
  const [collateralSource, setCollateralSource] = useState('WETH');
  const [collateralTarget, setCollateralTarget] = useState('cbBTC');

  // Input States for Loan Optimization
  const [optBorrowToken, setOptBorrowToken] = useState('USDC');
  const [optSourceProtocol, setOptSourceProtocol] = useState('Aave V3');
  const [optTargetProtocol, setOptTargetProtocol] = useState('Compound V3');

  const handleRunAction = (moduleName: string) => {
    let paramsObj = {};
    if (moduleName === 'Smart Price Trading') {
      paramsObj = { borrowAmount: arbBorrowAmount, token: arbToken, buyDex: arbBuyDex, sellDex: arbSellDex };
    } else if (moduleName === 'Risk Recovery') {
      paramsObj = { userAddress: liqUserAddress, protocol: liqProtocol };
    } else if (moduleName === 'Asset Upgrade') {
      paramsObj = { source: collateralSource, target: collateralTarget };
    } else if (moduleName === 'Loan Optimization') {
      paramsObj = { token: optBorrowToken, source: optSourceProtocol, target: optTargetProtocol };
    }
    onExecute(moduleName, paramsObj);
  };

  return (
    <div className="bg-brand-card border border-brand-border rounded-xl p-6 mb-10" id="module-terminal">
      <div className="flex items-center gap-2 mb-6">
        <div className="p-1.5 bg-brand-accent/10 rounded border border-brand-accent/20">
          <Zap className="h-4 w-4 text-brand-accent" />
        </div>
        <h3 className="font-display font-bold text-lg text-white">ATOMIC LIQUIDITY ENGINE</h3>
        <span className="text-[10px] font-mono bg-blue-950 text-blue-400 border border-blue-900/40 px-2 py-0.5 rounded">
          4 INSTANT CAP_MOD_V1
        </span>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-6 border-b border-brand-border pb-4">
        <button
          id="tab-arbitrage"
          onClick={() => setActiveTab('arbitrage')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-mono transition-all ${
            activeTab === 'arbitrage'
              ? 'bg-brand-accent text-white font-bold shadow'
              : 'bg-brand-dark/50 text-gray-400 hover:text-white border border-brand-border'
          }`}
        >
          <Zap className="h-4 w-4" />
          SMART PRICE TRADING
        </button>
        <button
          id="tab-liquidation"
          onClick={() => setActiveTab('liquidation')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-mono transition-all ${
            activeTab === 'liquidation'
              ? 'bg-blue-600 text-white font-bold shadow'
              : 'bg-brand-dark/50 text-gray-400 hover:text-white border border-brand-border'
          }`}
        >
          <ShieldCheck className="h-4 w-4" />
          RISK RECOVERY
        </button>
        <button
          id="tab-upgrade"
          onClick={() => setActiveTab('upgrade')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-mono transition-all ${
            activeTab === 'upgrade'
              ? 'bg-orange-600 text-white font-bold shadow'
              : 'bg-brand-dark/50 text-gray-400 hover:text-white border border-brand-border'
          }`}
        >
          <Flame className="h-4 w-4" />
          ASSET UPGRADE
        </button>
        <button
          id="tab-optimize"
          onClick={() => setActiveTab('optimize')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-mono transition-all ${
            activeTab === 'optimize'
              ? 'bg-pink-600 text-white font-bold shadow'
              : 'bg-brand-dark/50 text-gray-400 hover:text-white border border-brand-border'
          }`}
        >
          <Briefcase className="h-4 w-4" />
          LOAN OPTIMIZATION
        </button>
      </div>

      {/* Active Tab Configuration Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Parameters Form */}
        <div className="lg:col-span-7 bg-brand-dark/60 border border-brand-border rounded-lg p-5">
          <div className="flex items-center gap-2 mb-4">
            <Info className="h-4 w-4 text-brand-accent" />
            <h4 className="font-display font-semibold text-sm text-white">
              CONFIGURE TRANSACTION ARGUMENTS
            </h4>
          </div>

          {activeTab === 'arbitrage' && (
            <div className="space-y-4">
              <p className="text-xs text-gray-400 leading-normal mb-2">
                Simultaneously borrows a flash loan, performs a low-slippage trade across two decentralized venues, repays the capital + loan fee (0.05%), and locks the surplus directly to your wallet.
              </p>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-mono text-gray-400 uppercase tracking-wider mb-1.5">
                    Borrow Token
                  </label>
                  <select
                    value={arbToken}
                    onChange={(e) => setArbToken(e.target.value)}
                    className="w-full bg-brand-card border border-brand-border rounded px-3 py-2 text-xs font-mono text-white focus:outline-none"
                  >
                    <option value="USDC">USDC (0x8335...)</option>
                    <option value="WETH">WETH (0x4200...)</option>
                    <option value="cbBTC">cbBTC (0xcbB7...)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-mono text-gray-400 uppercase tracking-wider mb-1.5">
                    Borrow Capital Amount
                  </label>
                  <input
                    type="number"
                    value={arbBorrowAmount}
                    onChange={(e) => setArbBorrowAmount(e.target.value)}
                    className="w-full bg-brand-card border border-brand-border rounded px-3 py-2 text-xs font-mono text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-mono text-gray-400 uppercase tracking-wider mb-1.5">
                    Acquisition Venue (Buy)
                  </label>
                  <select
                    value={arbBuyDex}
                    onChange={(e) => setArbBuyDex(e.target.value)}
                    className="w-full bg-brand-card border border-brand-border rounded px-3 py-2 text-xs font-mono text-white focus:outline-none"
                  >
                    <option value="Uniswap V3">Uniswap V3</option>
                    <option value="Aerodrome">Aerodrome</option>
                    <option value="Balancer">Balancer</option>
                    <option value="Curve">Curve</option>
                    <option value="1inch">1inch Router</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-mono text-gray-400 uppercase tracking-wider mb-1.5">
                    Liquidation Venue (Sell)
                  </label>
                  <select
                    value={arbSellDex}
                    onChange={(e) => setArbSellDex(e.target.value)}
                    className="w-full bg-brand-card border border-brand-border rounded px-3 py-2 text-xs font-mono text-white focus:outline-none"
                  >
                    <option value="Aerodrome">Aerodrome</option>
                    <option value="Uniswap V3">Uniswap V3</option>
                    <option value="Balancer">Balancer</option>
                    <option value="Curve">Curve</option>
                    <option value="1inch">1inch Router</option>
                  </select>
                </div>
              </div>

              <div className="bg-brand-card/40 border border-brand-border p-3 rounded text-[11px] text-gray-400 font-mono space-y-1">
                <div className="flex justify-between">
                  <span>Estimated gas cost:</span>
                  <span className="text-white">~0.00032 ETH (~$1.10)</span>
                </div>
                <div className="flex justify-between">
                  <span>Aave Flash Loan Fee:</span>
                  <span className="text-white">0.05% (${(Number(arbBorrowAmount) * 0.0005).toFixed(2)})</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'liquidation' && (
            <div className="space-y-4">
              <p className="text-xs text-gray-400 leading-normal">
                Risk Recovery executes a flash loan to pay off unhealthy debt of a liquidated protocol borrower. Instantly liquidates, collects the 5-10% collateral liquidation penalty, repays the loan, and retains the net reward.
              </p>

              <div>
                <label className="block text-[10px] font-mono text-gray-400 uppercase tracking-wider mb-1.5">
                  Target Protocol
                </label>
                <select
                  value={liqProtocol}
                  onChange={(e) => setLiqProtocol(e.target.value)}
                  className="w-full bg-brand-card border border-brand-border rounded px-3 py-2 text-xs font-mono text-white focus:outline-none"
                >
                  <option value="Aave V3">Aave V3 Base</option>
                  <option value="Compound V3">Compound V3 USDbC Pool</option>
                  <option value="Sonne Finance">Sonne Finance</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-mono text-gray-400 uppercase tracking-wider mb-1.5">
                  Unhealthy Debtor Wallet Address
                </label>
                <input
                  type="text"
                  placeholder="0x... (Hexadecimal address to liquidate)"
                  value={liqUserAddress}
                  onChange={(e) => setLiqUserAddress(e.target.value)}
                  className="w-full bg-brand-card border border-brand-border rounded px-3 py-2 text-xs font-mono text-white focus:outline-none"
                />
              </div>

              <div className="bg-blue-950/20 border border-blue-900/30 p-3 rounded text-[11px] text-gray-400 font-mono flex items-center gap-2">
                <Info className="h-4 w-4 text-blue-400 shrink-0" />
                <span>The system will automatically query the protocol's sub-graph on Base to verify if this user's Health Factor is strictly below 1.0.</span>
              </div>
            </div>
          )}

          {activeTab === 'upgrade' && (
            <div className="space-y-4">
              <p className="text-xs text-gray-400 leading-normal">
                Performs a seamless asset collateral swap. Instantly borrows capital to pay off your loan, replaces your collateral (e.g., swapping WETH to cbBTC) without closing the positions, and withdraws the surplus.
              </p>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-mono text-gray-400 uppercase tracking-wider mb-1.5">
                    Original Collateral
                  </label>
                  <select
                    value={collateralSource}
                    onChange={(e) => setCollateralSource(e.target.value)}
                    className="w-full bg-brand-card border border-brand-border rounded px-3 py-2 text-xs font-mono text-white focus:outline-none"
                  >
                    <option value="WETH">WETH</option>
                    <option value="cbBTC">cbBTC</option>
                    <option value="USDC">USDC</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-mono text-gray-400 uppercase tracking-wider mb-1.5">
                    Target Collateral
                  </label>
                  <select
                    value={collateralTarget}
                    onChange={(e) => setCollateralTarget(e.target.value)}
                    className="w-full bg-brand-card border border-brand-border rounded px-3 py-2 text-xs font-mono text-white focus:outline-none"
                  >
                    <option value="cbBTC">cbBTC</option>
                    <option value="WETH">WETH</option>
                    <option value="USDC">USDC</option>
                  </select>
                </div>
              </div>

              <div className="bg-orange-950/20 border border-orange-900/30 p-3 rounded text-[11px] text-gray-400 font-mono">
                Swaps are processed via Uniswap V3 smart path routing to minimize price impact and avoid slippage penalties.
              </div>
            </div>
          )}

          {activeTab === 'optimize' && (
            <div className="space-y-4">
              <p className="text-xs text-gray-400 leading-normal">
                Refinances high-interest positions. Borrows liquidity to repay your loan on a high-interest rate pool, shifts the debt to a lower interest rate pool, and completes the swap atomically in one single block.
              </p>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-[10px] font-mono text-gray-400 uppercase tracking-wider mb-1.5">
                    Debt Token
                  </label>
                  <select
                    value={optBorrowToken}
                    onChange={(e) => setOptBorrowToken(e.target.value)}
                    className="w-full bg-brand-card border border-brand-border rounded px-3 py-2 text-xs font-mono text-white focus:outline-none"
                  >
                    <option value="USDC">USDC</option>
                    <option value="WETH">WETH</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-mono text-gray-400 uppercase tracking-wider mb-1.5">
                    Source Protocol
                  </label>
                  <select
                    value={optSourceProtocol}
                    onChange={(e) => setOptSourceProtocol(e.target.value)}
                    className="w-full bg-brand-card border border-brand-border rounded px-3 py-2 text-xs font-mono text-white focus:outline-none"
                  >
                    <option value="Aave V3">Aave V3</option>
                    <option value="Compound V3">Compound V3</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-mono text-gray-400 uppercase tracking-wider mb-1.5">
                    Target Protocol
                  </label>
                  <select
                    value={optTargetProtocol}
                    onChange={(e) => setOptTargetProtocol(e.target.value)}
                    className="w-full bg-brand-card border border-brand-border rounded px-3 py-2 text-xs font-mono text-white focus:outline-none"
                  >
                    <option value="Compound V3">Compound V3</option>
                    <option value="Aave V3">Aave V3</option>
                  </select>
                </div>
              </div>

              <div className="bg-pink-950/20 border border-pink-900/30 p-3 rounded text-[11px] text-gray-400 font-mono">
                Leverages Aave v3 instant-withdrawal credit lines for fully compliant atomic refinancing.
              </div>
            </div>
          )}

          {/* Trigger button */}
          <div className="mt-6 pt-4 border-t border-brand-border flex items-center justify-between gap-4">
            <div className="text-xs font-mono text-gray-400">
              Wallet Status:{" "}
              {wallet.connected ? (
                <span className="text-brand-green font-semibold">Ready</span>
              ) : (
                <span className="text-red-400 font-semibold">Wallet Required</span>
              )}
            </div>

            <button
              id="btn-run-module"
              disabled={!wallet.connected || executing}
              onClick={() => {
                const title = 
                  activeTab === 'arbitrage' ? 'Smart Price Trading' :
                  activeTab === 'liquidation' ? 'Risk Recovery' :
                  activeTab === 'upgrade' ? 'Asset Upgrade' : 'Loan Optimization';
                handleRunAction(title);
              }}
              className={`flex items-center gap-2 font-display font-semibold px-6 py-2.5 rounded-lg text-xs transition-colors ${
                !wallet.connected
                  ? 'bg-gray-800 text-gray-500 cursor-not-allowed border border-gray-700'
                  : executing
                  ? 'bg-brand-accent/20 text-brand-accent border border-brand-accent/30 animate-pulse'
                  : 'bg-brand-accent hover:bg-blue-600 text-white'
              }`}
            >
              {executing ? 'Executing Atomically...' : 'Execute Transaction'}
              <Play className="h-3 w-3 fill-current" />
            </button>
          </div>
        </div>

        {/* Right Side: On-Chain Live Output logs */}
        <div className="lg:col-span-5 bg-brand-dark border border-brand-border rounded-lg p-5 h-full flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-brand-border">
              <span className="text-[10px] font-mono font-bold text-gray-400">TERMINAL OUTPUT LOGS</span>
              <span className="h-1.5 w-1.5 rounded-full bg-brand-accent animate-ping"></span>
            </div>

            <div className="font-mono text-xs text-gray-400 space-y-2 h-[220px] overflow-y-auto bg-brand-dark/95 p-3 rounded border border-brand-border/40 scrollbar-thin">
              {executing ? (
                <div className="space-y-1.5">
                  <p className="text-brand-accent animate-pulse">&gt; [INIT] Initiating atomic flash loan sequence...</p>
                  <p className="text-gray-500">&gt; [1/4] Borrowing {activeTab === 'arbitrage' ? arbBorrowAmount : 'capital'} {activeTab === 'arbitrage' ? arbToken : ''} via Flash Loan...</p>
                  <p className="text-gray-500">&gt; [2/4] Instantiating path route verification...</p>
                  <p className="text-gray-500">&gt; [3/4] Estimating on-chain gas costs...</p>
                </div>
              ) : execResult ? (
                <div className="space-y-1.5 text-[11px]">
                  {execResult.status === 'pending_deployment' ? (
                    <div className="space-y-2">
                      <p className="text-amber-400 font-bold flex items-center gap-1">
                        <Lock className="h-3 w-3 text-amber-400 shrink-0" />
                        SECURE PROTECTION SYSTEM TRIPPED
                      </p>
                      <p className="text-xs text-gray-300">
                        {execResult.message}
                      </p>
                      <p className="text-[10px] text-gray-500 mt-2">
                        Verify deployment via BaseScan / local RPC logs to proceed.
                      </p>
                    </div>
                  ) : execResult.success ? (
                    <div>
                      <p className="text-brand-green font-bold">&gt; SUCCESS: Atomic execution resolved!</p>
                      <p className="text-gray-300">&gt; Profit Received: {execResult.profitReceived || '0.00'}</p>
                      <p className="text-gray-400">&gt; Gas Used: {execResult.gasUsed || '0'}</p>
                      <p className="text-gray-500">&gt; Tx: {execResult.txHash}</p>
                    </div>
                  ) : (
                    <div>
                      <p className="text-red-400 font-bold">&gt; FAILED: Transaction reverted</p>
                      <p className="text-gray-300 mt-1">&gt; Reason: {execResult.message}</p>
                      <p className="text-gray-500 mt-1">&gt; Gas Saved: {execResult.gasUsed} Gwei (Simulation Prevented Waste)</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-gray-500 text-center py-10 flex flex-col items-center justify-center gap-2">
                  <Play className="h-8 w-8 text-gray-700" />
                  <p className="text-xs">Select a Cap Module tab and click "Execute Transaction" above to start live on-chain operations.</p>
                </div>
              )}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-brand-border/40 text-[10px] font-mono text-gray-500 flex justify-between items-center">
            <span>NETWORK: Base Mainnet</span>
            <span>OSKAYI CLIENT_V1.0</span>
          </div>
        </div>

      </div>
    </div>
  );
}
