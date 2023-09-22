import { defaultWagmiConfig } from '@web3modal/wagmi/react';
import { sepolia, mainnet } from 'wagmi/chains';
const { VITE_PROJECT_ID } = import.meta.env;
const projectId = VITE_PROJECT_ID;
const chains = [mainnet, sepolia];
export const wagmiConfig = defaultWagmiConfig({
  chains,
  projectId,
  appName: 'Web3Modal',
});