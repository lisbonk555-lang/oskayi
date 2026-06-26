import React, { useState } from 'react';
import { SystemStatus } from '../types';
import { Shield, Server, Coins, Database, RefreshCw, Key, Settings, Trash2, ArrowRight } from 'lucide-react';

interface AdminPanelProps {
  systemStats: SystemStatus | null;
  onRegisterContract: (address: string) => Promise<void>;
  onResetStats: () => Promise<void>;
  updating: boolean;
}

export default function AdminPanel({ systemStats, onRegisterContract, onResetStats, updating }: AdminPanelProps) {
  const [contractInput, setContractInput] = useState('');
  const [message, setMessage] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setErrorMsg('');

    if (!contractInput || !contractInput.startsWith('0x') || contractInput.length !== 42) {
      setErrorMsg('Invalid contract address format. Must be a 42-character hex address beginning with 0x.');
      return;
    }

    try {
      await onRegisterContract(contractInput);
      setMessage('Flash Loan Manager contract address successfully updated in Prisma SQL Database!');
      setContractInput('');
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to update contract address.');
    }
  };

  const handleReset = async () => {
    if (!window.confirm('Are you sure you want to reset all execution statistics in the database back to zero? This action is irreversible.')) {
      return;
    }
    setMessage('');
    setErrorMsg('');
    try {
      await onResetStats();
      setMessage('Local Prisma Database metrics successfully cleared!');
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to reset statistics.');
    }
  };

  return (
    <div className="bg-brand-card border border-brand-border rounded-xl p-6 mb-10" id="admin-panel">
      <div className="flex items-center gap-2 mb-6 pb-4 border-b border-brand-border">
        <div className="p-1.5 bg-brand-accent/10 rounded border border-brand-accent/20">
          <Shield className="h-4 w-4 text-brand-accent" />
        </div>
        <div>
          <h3 className="font-display font-bold text-lg text-white">OSKAYI INSTANT CAPITAL ADMIN CONTROL</h3>
          <p className="text-xs text-gray-400 font-mono mt-0.5">Manage deployed smart contracts and database connection variables</p>
        </div>
      </div>

      {message && (
        <div className="bg-blue-950/40 border border-blue-900/50 text-brand-accent text-xs p-3 rounded-lg mb-6">
          ✓ {message}
        </div>
      )}

      {errorMsg && (
        <div className="bg-red-950/40 border border-red-900/50 text-red-400 text-xs p-3 rounded-lg mb-6">
          ✕ {errorMsg}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Connection Variables & Database Systems */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-brand-dark/50 border border-brand-border rounded-lg p-5">
            <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
              <Server className="h-4 w-4 text-brand-accent" />
              INFRASTRUCTURE CONNECTORS
            </h4>

            <div className="grid grid-cols-2 gap-4 text-xs font-mono">
              <div className="p-3 bg-brand-dark rounded border border-brand-border/40 flex justify-between items-center">
                <span className="text-gray-400">Database (Prisma):</span>
                <span className="text-brand-accent font-bold uppercase">ONLINE (SQLite)</span>
              </div>
              <div className="p-3 bg-brand-dark rounded border border-brand-border/40 flex justify-between items-center">
                <span className="text-gray-400">Redis Cache:</span>
                <span className="text-amber-500 font-bold uppercase">LOCAL_FALLBACK</span>
              </div>
              <div className="p-3 bg-brand-dark rounded border border-brand-border/40 flex justify-between items-center">
                <span className="text-gray-400">Base RPC Node:</span>
                <span className="text-brand-accent font-bold uppercase">ONLINE (Base Org)</span>
              </div>
              <div className="p-3 bg-brand-dark rounded border border-brand-border/40 flex justify-between items-center">
                <span className="text-gray-400">Live SSE Stream:</span>
                <span className="text-brand-accent font-bold uppercase">ACTIVE</span>
              </div>
              <div className="p-3 bg-brand-dark rounded border border-brand-border/40 flex justify-between items-center col-span-2">
                <span className="text-gray-400">Deployed Contract:</span>
                <span className={`font-bold ${systemStats?.contract === 'active' ? 'text-brand-accent' : 'text-amber-500'}`}>
                  {systemStats?.contract === 'active' ? 'ACTIVE_ON_CHAIN' : 'PENDING_REGISTRATION'}
                </span>
              </div>
            </div>
          </div>

          {/* Smart Contract Registration Form */}
          <div className="bg-brand-dark/50 border border-brand-border rounded-lg p-5">
            <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
              <Key className="h-4 w-4 text-brand-accent" />
              REGISTER DEPLOYED CONTRACT
            </h4>

            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label className="block text-[10px] font-mono text-gray-400 uppercase tracking-wider mb-1.5">
                  Flash Loan Manager Smart Contract Address (Base Mainnet)
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    required
                    placeholder="0x... (Deployed contract address)"
                    value={contractInput}
                    onChange={(e) => setContractInput(e.target.value)}
                    className="flex-1 bg-brand-card border border-brand-border rounded px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-brand-accent"
                  />
                  <button
                    type="submit"
                    disabled={updating}
                    className="bg-brand-accent hover:bg-blue-600 text-white font-display font-semibold text-xs px-4 py-2 rounded transition-colors shrink-0"
                  >
                    {updating ? 'Registering...' : 'Register'}
                  </button>
                </div>
                <p className="text-[10px] text-gray-400 mt-2 leading-relaxed">
                  Registering a deployed contract connects the Dashboard directly to your on-chain Solidity bytecode, authorizing atomic flash swaps on Base Mainnet.
                </p>
              </div>
            </form>
          </div>
        </div>

        {/* Right: Supported tokens / DEX, and reset button */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-brand-dark/50 border border-brand-border rounded-lg p-5">
            <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
              <Coins className="h-4 w-4 text-brand-accent" />
              APPROVED ON-CHAIN ENTITIES
            </h4>

            <div className="space-y-3 text-xs font-mono">
              <div>
                <span className="text-gray-400 text-[10px] uppercase">Approved Capital Providers:</span>
                <div className="flex flex-wrap gap-1.5 mt-1.5">
                  {systemStats?.approvedProviders?.map((p, idx) => (
                    <span key={idx} className="bg-brand-card border border-brand-border text-white text-[10px] px-2.5 py-1 rounded">
                      {p}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <span className="text-gray-400 text-[10px] uppercase">Supported Liquidity DEXs:</span>
                <div className="flex flex-wrap gap-1.5 mt-1.5">
                  {systemStats?.supportedDexs?.map((d, idx) => (
                    <span key={idx} className="bg-brand-card border border-brand-border text-white text-[10px] px-2.5 py-1 rounded">
                      {d}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-brand-dark/50 border border-brand-border rounded-lg p-5">
            <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider mb-3 flex items-center gap-2">
              <Settings className="h-4 w-4 text-red-400" />
              MAINTENANCE & PURGE
            </h4>
            <p className="text-[11px] text-gray-400 leading-normal mb-4">
              Clear local statistics stored inside the SQLite database. This does not modify on-chain logs.
            </p>
            <button
              id="btn-purge-db"
              onClick={handleReset}
              className="flex items-center gap-2 text-xs font-mono bg-red-950/40 text-red-400 border border-red-900/50 hover:bg-red-900/40 px-4 py-2.5 rounded transition-colors w-full justify-center"
            >
              <Trash2 className="h-3.5 w-3.5" />
              Purge Database Stats
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
