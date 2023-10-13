import { createWeb3Modal } from '@web3modal/wagmi/react';
import { WagmiConfig } from 'wagmi';
import { wagmiConfig } from './wagmiConfig';

const { VITE_VERCEL_PROJECT_ID } = import.meta.env;

// console.log('🚀 ~ import.meta.env:', VITE_VERCEL_PROJECT_ID);
const projectId = VITE_VERCEL_PROJECT_ID;
// console.log('🚀 ~ projectId:', projectId);

createWeb3Modal({ wagmiConfig, projectId });

export const Wagmi = ({ children }) => {
  return <WagmiConfig config={wagmiConfig}>{children}</WagmiConfig>;
};
