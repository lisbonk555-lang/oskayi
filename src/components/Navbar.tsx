import React, { useState, useEffect } from 'react';
import { Wallet, Activity, ShieldCheck, Zap, AlertTriangle, Cpu, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { WalletState, BaseNetworkInfo } from '../types';

interface NavbarProps {
  wallet: WalletState;
  onConnectWallet: (address: string) => void;
  onDisconnect: () => void;
  networkInfo: BaseNetworkInfo | null;
}

export default function Navbar({ wallet, onConnectWallet, onDisconnect, networkInfo }: NavbarProps) {
  const [showConnectModal, setShowConnectModal] = useState(false);
  const [manualAddress, setManualAddress] = useState('');
  const [connecting, setConnecting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Handle standard EIP-1193 MetaMask/Coinbase Wallet connection
  const handleInjectedConnect = async () => {
    setConnecting(true);
    setErrorMsg('');
    try {
      if (typeof window !== 'undefined' && (window as any).ethereum) {
        const provider = (window as any).ethereum;
        const accounts = await provider.request({ method: 'eth_requestAccounts' });
        if (accounts && accounts.length > 0) {
          onConnectWallet(accounts[0]);
          setShowConnectModal(false);
        } else {
          setErrorMsg('No accounts returned from your wallet extension.');
        }
      } else {
        setErrorMsg('No injected Web3 provider (MetaMask, Coinbase Wallet) found in this browser context. Please use the manual watch-address loader below to connect.');
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Connection requested but was rejected.');
    } finally {
      setConnecting(false);
    }
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    if (!manualAddress || !manualAddress.startsWith('0x') || manualAddress.length !== 42) {
      setErrorMsg('Invalid Ethereum address format. Address must begin with 0x and be 42 characters long.');
      return;
    }
    onConnectWallet(manualAddress);
    setShowConnectModal(false);
    setManualAddress('');
  };

  return (
    <>
      <header id="oskayi-nav" className="border-b border-brand-border bg-brand-dark/90 backdrop-blur-md sticky top-0 z-40 w-full px-4 sm:px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-3.5">
            <div className="relative h-11 w-11 rounded-full border-2 border-amber-400/80 shadow-lg shadow-amber-500/20 overflow-hidden shrink-0">
              <img
                src="/images/oskayi_gold_logo_1782447987080.jpg"
                alt="Oskayi Logo"
                className="h-full w-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/10 to-transparent"></div>
            </div>
            <div>
              <h1 className="font-display font-black text-xl tracking-wider text-white flex items-center gap-2">
                OSKAYI <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-brand-accent">INSTANT CAPITAL</span>
              </h1>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <p className="text-xs font-bold text-amber-300 tracking-wider font-mono">MULTI-CHAIN PROD_V1</p>
              </div>
              <p className="text-[10px] text-gray-400 mt-1 max-w-sm leading-normal">
                No capital? No problem. Borrow instantly to execute profitable opportunities across multiple blockchain networks.
              </p>
            </div>
          </div>

          {/* Live Blockchain Health Status */}
          <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-gray-300 bg-brand-card/80 border border-brand-border px-4 py-2 rounded-lg">
            <div className="flex items-center gap-1.5">
              <Activity className="h-3.5 w-3.5 text-brand-accent" />
              <span>RPC: <span className="text-brand-accent font-semibold">ONLINE</span></span>
            </div>
            <div className="h-4 w-[1px] bg-brand-border hidden sm:block"></div>
            <div className="flex items-center gap-1.5">
              <Cpu className="h-3.5 w-3.5 text-brand-accent" />
              <span>BLOCK: <span className="text-white font-semibold">{networkInfo ? networkInfo.blockNumber : 'Reading...'}</span></span>
            </div>
            <div className="h-4 w-[1px] bg-brand-border hidden sm:block"></div>
            <div className="flex items-center gap-1.5">
              <span>GAS: <span className="text-brand-accent font-semibold">{networkInfo ? `${networkInfo.gasPriceGwei} Gwei` : 'Reading...'}</span></span>
            </div>
          </div>

          {/* Wallet Actions */}
          <div className="flex items-center gap-3">
            {wallet.connected ? (
              <div className="flex items-center gap-2 bg-brand-card border border-brand-border px-3 py-1.5 rounded-lg">
                <div className="text-right">
                  <p className="text-xs font-mono text-gray-400">
                    {wallet.address.slice(0, 6)}...{wallet.address.slice(-4)}
                  </p>
                  <p className="text-[10px] font-mono text-brand-accent">
                    {wallet.ethBalance} ETH | {wallet.usdcBalance} USDC
                  </p>
                </div>
                <button
                  id="btn-disconnect"
                  onClick={onDisconnect}
                  className="text-xs bg-red-950/40 text-red-400 border border-red-900/50 hover:bg-red-900/40 px-2.5 py-1 rounded transition-colors"
                >
                  Disconnect
                </button>
              </div>
            ) : (
              <button
                id="btn-connect"
                onClick={() => setShowConnectModal(true)}
                className="flex items-center gap-2 font-display bg-brand-accent hover:bg-blue-600 text-white font-semibold px-5 py-2 rounded-lg transition-all duration-200 transform hover:scale-[1.02] shadow-lg shadow-brand-accent/20"
              >
                <Wallet className="h-4 w-4" />
                Connect Wallet
              </button>
            )}
          </div>

        </div>
      </header>

      {/* Connection Modal */}
      <AnimatePresence>
        {showConnectModal && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-brand-card border border-brand-border rounded-xl p-6 w-full max-w-md relative shadow-2xl"
            >
              <button
                id="modal-close"
                onClick={() => setShowConnectModal(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
              >
                ✕
              </button>

              <h3 className="font-display font-bold text-xl text-white mb-2 flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-brand-accent" />
                Connect Multi-Chain Wallet
              </h3>
              <p className="text-xs text-gray-400 mb-6">
                Connect your favorite Web3 wallet or load any public Ethereum-compatible address to view assets and run simulations.
              </p>

              {errorMsg && (
                <div className="bg-red-950/40 border border-red-900/50 text-red-400 text-xs p-3 rounded-lg mb-4 flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Option 1: Browser Injected Wallet */}
              <button
                id="btn-modal-injected"
                onClick={handleInjectedConnect}
                disabled={connecting}
                className="w-full flex items-center justify-between p-4 bg-brand-dark border border-brand-border hover:border-brand-accent/50 rounded-lg text-left transition-all mb-4 group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-brand-accent/10 rounded group-hover:bg-brand-accent/20 transition-colors">
                    <Wallet className="h-5 w-5 text-brand-accent" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">Injected Web3 Provider</p>
                    <p className="text-xs text-gray-400">MetaMask, Coinbase Wallet, etc.</p>
                  </div>
                </div>
                {connecting ? (
                  <span className="text-xs text-brand-accent animate-pulse">Requesting...</span>
                ) : (
                  <span className="text-xs text-gray-500 group-hover:text-brand-accent transition-colors">Connect ➔</span>
                )}
              </button>

              <div className="relative flex py-2 items-center">
                <div className="flex-grow border-t border-brand-border"></div>
                <span className="flex-shrink mx-4 text-[10px] font-mono text-gray-500 uppercase tracking-wider">OR ENTER MANUAL WATCH-ADDRESS</span>
                <div className="flex-grow border-t border-brand-border"></div>
              </div>

              {/* Option 2: Watch Address */}
              <form onSubmit={handleManualSubmit} className="mt-4">
                <label className="block text-xs font-mono text-gray-400 mb-2">
                  Ethereum-Compatible Wallet Address
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    required
                    placeholder="0x833589fCD6eDb6E08f4c7C32... (any EVM account)"
                    value={manualAddress}
                    onChange={(e) => setManualAddress(e.target.value)}
                    className="flex-1 bg-brand-dark border border-brand-border rounded px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-brand-accent"
                  />
                  <button
                    type="submit"
                    className="bg-brand-accent hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded text-xs transition-colors shrink-0"
                  >
                    Load State
                  </button>
                </div>
                <p className="text-[10px] text-gray-400 mt-2 flex items-center gap-1 leading-normal">
                  <HelpCircle className="h-3.5 w-3.5 text-gray-500 shrink-0" />
                  Allows viewing real ETH and USDC balances on supported networks directly from our multi-chain node connectors.
                </p>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
