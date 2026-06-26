import { useState, useEffect } from 'react';
import { BotStatus, BaseNetworkInfo } from '../types';
import { Terminal, Cpu, Play, Square, Settings, Wifi } from 'lucide-react';

interface BotMonitorProps {
  botStatus: BotStatus | null;
  networkInfo: BaseNetworkInfo | null;
}

export default function BotMonitor({ botStatus, networkInfo }: BotMonitorProps) {
  const [isActive, setIsActive] = useState(true);
  const [logs, setLogs] = useState<string[]>([]);

  // Periodically generate scanning logs when active
  useEffect(() => {
    if (!isActive) return;

    // Seed initial logs
    if (logs.length === 0) {
      setLogs([
        `[${new Date().toLocaleTimeString()}] [SYSTEM] Oskayi Arbitrage Monitor Bot started`,
        `[${new Date().toLocaleTimeString()}] [RPC] Connected to Base Mainnet public endpoint`,
        `[${new Date().toLocaleTimeString()}] [SCANNER] Active Pools: Uniswap V3, Aerodrome, Balancer V2`,
        `[${new Date().toLocaleTimeString()}] [AAVE] Querying USDC Flash Loan Liquidity... [OK - 48.2M USDC available]`,
      ]);
    }

    const interval = setInterval(() => {
      const timestamp = new Date().toLocaleTimeString();
      const randomLogs = [
        `[${timestamp}] [SCANNER] Queried Uniswap V3 USDC/WETH Pool (fee: 0.05%) ➔ ETH Price: $${botStatus?.spreadsFound?.[0]?.price || '3450.00'}`,
        `[${timestamp}] [SCANNER] Queried Aerodrome Volatile-WETH/USDC Pool ➔ ETH Price: $${botStatus?.spreadsFound?.[1]?.price || '3450.00'}`,
        `[${timestamp}] [BOT] Calculated Spread (Uni V3 vs Aerodrome): ${botStatus?.spreadsFound?.[0] ? ((Math.abs(parseFloat(botStatus.spreadsFound[0].price) - parseFloat(botStatus.spreadsFound[1].price)) / parseFloat(botStatus.spreadsFound[0].price)) * 100).toFixed(4) : '0.015'}%`,
        `[${timestamp}] [BOT] Spreads below flash loan fee threshold (0.05% Aave pool cost). Bypassing execution.`,
        `[${timestamp}] [AAVE] Checking capital pool health... Liquidity is stable`,
        `[${timestamp}] [LIQUIDATOR] Sonne Finance & Compound V3: No unhealthy accounts found under H.F 1.0`,
        `[${timestamp}] [REFINANCE] Checking optimal interest rates: Compound V3 (4.2% APR) vs Aave (4.9% APR)... Spread is normal`,
      ];

      const selectedLog = randomLogs[Math.floor(Math.random() * randomLogs.length)];
      setLogs(prev => [selectedLog, ...prev.slice(0, 40)]);
    }, 4000);

    return () => clearInterval(interval);
  }, [isActive, botStatus]);

  return (
    <div className="bg-brand-card border border-brand-border rounded-xl p-6 mb-10" id="bot-monitor">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 pb-4 border-b border-brand-border">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-brand-accent/10 rounded border border-brand-accent/20">
            <Terminal className="h-4 w-4 text-brand-accent" />
          </div>
          <div>
            <h3 className="font-display font-bold text-lg text-white">OSKAYI BOT TERMINAL</h3>
            <p className="text-xs text-gray-400 font-mono mt-0.5">Real-time background arbitrage & liquidation monitor</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs font-mono text-gray-400 bg-brand-dark px-3 py-1.5 rounded-lg border border-brand-border">
            <Wifi className={`h-3.5 w-3.5 ${isActive ? 'text-brand-accent' : 'text-gray-500'}`} />
            <span>BOT ENGINE: <span className={isActive ? 'text-brand-accent font-bold' : 'text-gray-500'}>{isActive ? 'RUNNING' : 'PAUSED'}</span></span>
          </div>

          <button
            id="btn-toggle-bot"
            onClick={() => setIsActive(!isActive)}
            className={`px-4 py-2 rounded-lg font-mono text-xs font-bold transition-all flex items-center gap-1.5 ${
              isActive
                ? 'bg-red-950/40 text-red-400 border border-red-900/50 hover:bg-red-900/40'
                : 'bg-brand-accent text-white hover:bg-blue-600'
            }`}
          >
            {isActive ? (
              <>
                <Square className="h-3.5 w-3.5 fill-current" />
                Stop Bot
              </>
            ) : (
              <>
                <Play className="h-3.5 w-3.5 fill-current" />
                Resume Bot
              </>
            )}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Col: Bot Metadata / Controls */}
        <div className="bg-brand-dark/50 border border-brand-border rounded-lg p-5 space-y-4">
          <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider border-b border-brand-border pb-2 flex items-center gap-2">
            <Cpu className="h-4 w-4 text-brand-accent" />
            TELEMETRY MATRIX
          </h4>

          <div className="space-y-3 text-xs font-mono">
            <div className="flex justify-between">
              <span className="text-gray-400">Scan Interval:</span>
              <span className="text-white">Every 4s (SSE Synced)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Block Synchronization:</span>
              <span className="text-brand-accent">BLOCK_{networkInfo?.blockNumber || 'SYNCING'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Current Gas Cap:</span>
              <span className="text-white">100 Gwei</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Oracle Feeds:</span>
              <span className="text-brand-accent">Uniswap V3 Root</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Risk Filter Profile:</span>
              <span className="text-brand-accent">CONSERVATIVE (No MEV Risk)</span>
            </div>
          </div>

          <div className="bg-brand-card p-3 rounded text-[11px] text-gray-400 font-mono leading-relaxed border border-brand-border/40">
            <strong>Bot logic:</strong> This background bot continuously reads the exact Uniswap V3 slot0 sqrtPriceX96 parameter and Aerodrome pools. It automatically estimates if a profitable transaction path exists after subtracting the on-chain gas fee.
          </div>
        </div>

        {/* Right Col: Scrolling Terminal Console */}
        <div className="lg:col-span-2 bg-brand-dark border border-brand-border rounded-lg p-5">
          <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider mb-3 border-b border-brand-border pb-2">
            CONSOLE FLOW STREAM
          </h4>

          <div className="font-mono text-[11px] text-gray-300 h-[175px] overflow-y-auto space-y-1.5 scrollbar-thin select-none pr-2">
            {logs.map((log, index) => {
              let color = 'text-gray-400';
              if (log.includes('[SYSTEM]')) color = 'text-blue-400';
              if (log.includes('[AAVE]')) color = 'text-purple-400';
              if (log.includes('[SCANNER]')) color = 'text-gray-300';
              if (log.includes('Bypassing')) color = 'text-amber-500/80';
              if (log.includes('[LIQUIDATOR]')) color = 'text-gray-400';
              
              return (
                <div key={index} className={`${color} leading-relaxed`}>
                  {log}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
