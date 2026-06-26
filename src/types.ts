export interface WalletState {
  address: string;
  connected: boolean;
  ethBalance: string;
  usdcBalance: string;
  chainId: number;
  networkName: string;
  error?: string;
}

export interface BaseNetworkInfo {
  blockNumber: string;
  gasPriceGwei: string;
  chainId: number;
  rpcStatus: 'online' | 'offline';
  timestamp: string;
}

export interface Opportunity {
  id: string;
  provider: string; // 'Aave' | 'Balancer' | 'ERC3156'
  dexSource: string; // 'Aerodrome' | 'Uniswap' | 'Balancer' | 'Curve' | '1inch'
  dexTarget: string;
  tokenIn: string; // 'USDC'
  tokenOut: string; // 'WETH'
  borrowAmount: string;
  estimatedProfitUsd: string;
  loanFeeUsd: string;
  gasCostUsd: string;
  netProfitUsd: string;
  riskScore: 'Low' | 'Medium' | 'High';
  slippage: string;
  timestamp: string;
}

export interface BotStatus {
  isScanning: boolean;
  lastScanTime: string;
  scannedPoolsCount: number;
  spreadsFound: Array<{
    pair: string;
    exchange: string;
    price: string;
    spreadPercent: string;
  }>;
}

export interface SystemStatus {
  database: 'online' | 'offline' | 'pending';
  redis: 'offline' | 'online' | 'not_configured';
  rpc: 'online' | 'offline';
  sse: 'active' | 'inactive';
  contract: 'pending_deployment' | 'active';
  contractAddress: string;
  treasuryBalanceEth: string;
  protocolFeesCollectedUsd: string;
  successfulExecutions: number;
  failedExecutions: number;
  totalVolumeUsd: string;
  approvedProviders: string[];
  supportedDexs: string[];
}
