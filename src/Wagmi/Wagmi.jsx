import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi/react';
import { WagmiConfig } from 'wagmi';
// import {  mainnet } from 'wagmi';

import { arbitrum, sepolia, mainnet } from 'wagmi/chains';
// import { publicProvider } from 'wagmi/providers/public';

const { VITE_PROJECT_ID } = import.meta.env;
const projectId = VITE_PROJECT_ID;
const chains = [mainnet, arbitrum, sepolia];

// const { chains } = configureChains(
//   [mainnet, arbitrum, sepolia],

//   [publicProvider()]
// );

// const config = createConfig({
//   publicClient,
//   webSocketPublicClient,
// });
// console.log('🚀 ~ config:', config);

const wagmiConfig = defaultWagmiConfig({
  chains,
  projectId,
  appName: 'Web3Modal',
  // publicClient,
  // webSocketPublicClient,
});
console.log('🚀 ~ wagmiConfig:', wagmiConfig);

createWeb3Modal({ wagmiConfig, projectId, chains });

export const Wagmi = ({ children }) => {
  return <WagmiConfig config={wagmiConfig}>{children}</WagmiConfig>;
};
