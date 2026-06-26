import { WalletState, SystemStatus } from '../types';
import { DollarSign, ShieldAlert, CheckCircle, BarChart3, Database, Coins } from 'lucide-react';

interface DashboardStatsProps {
  wallet: WalletState;
  systemStats: SystemStatus | null;
}

export default function DashboardStats({ wallet, systemStats }: DashboardStatsProps) {
  // Safe defaults
  const totalExecutions = (systemStats?.successfulExecutions || 0) + (systemStats?.failedExecutions || 0);

  const statsList = [
    {
      title: "CONNECTED WALLET BALANCE",
      value: wallet.connected ? `${wallet.ethBalance} ETH` : "Disconnected",
      desc: wallet.connected ? `${wallet.usdcBalance} USDC balance` : "Connect standard wallet above",
      icon: Coins,
      color: "text-brand-accent"
    },
    {
      title: "PROTOCOL TREASURY",
      value: systemStats ? `${systemStats.treasuryBalanceEth} ETH` : "0.00000 ETH",
      desc: systemStats?.contract === 'active' ? "Deployed address balance" : "Pending custom contract",
      icon: Database,
      color: "text-blue-400"
    },
    {
      title: "COLLECTED PROTOCOL FEES",
      value: systemStats ? `$${systemStats.protocolFeesCollectedUsd}` : "$0.00",
      desc: "Prisma DB persistent fees",
      icon: DollarSign,
      color: "text-yellow-400"
    },
    {
      title: "SUCCESSFUL EXECUTIONS",
      value: systemStats ? systemStats.successfulExecutions : 0,
      desc: "Real blockchain events logged",
      icon: CheckCircle,
      color: "text-green-400"
    },
    {
      title: "FAILED EXECUTIONS",
      value: systemStats ? systemStats.failedExecutions : 0,
      desc: "Reverted on-chain gas costs",
      icon: ShieldAlert,
      color: "text-red-400"
    },
    {
      title: "TOTAL FLASH LOAN VOLUME",
      value: systemStats ? `$${systemStats.totalVolumeUsd}` : "$0.00",
      desc: "All historical liquidity borrowed",
      icon: BarChart3,
      color: "text-pink-400"
    }
  ];

  return (
    <div className="mb-10">
      <div className="flex items-center gap-2 mb-6">
        <h3 className="font-display font-bold text-lg text-white">CORE PROTOCOL TELEMETRY</h3>
        <span className="text-[10px] font-mono bg-brand-accent/10 text-brand-accent border border-brand-accent/20 px-2 py-0.5 rounded">
          REAL-TIME STATE
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {statsList.map((stat, idx) => (
          <div
            key={idx}
            id={`stat-tile-${idx}`}
            className="bg-brand-card border border-brand-border rounded-xl p-5 hover:border-brand-accent/40 transition-colors"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-mono font-bold uppercase text-gray-400 tracking-wider">
                {stat.title}
              </span>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </div>
            <div className="text-2xl font-display font-black text-white tracking-tight">
              {stat.value}
            </div>
            <div className="text-xs text-gray-400 mt-1.5 flex items-center gap-1">
              <span className="inline-block h-1 w-1 bg-gray-500 rounded-full"></span>
              {stat.desc}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
