import { createWeb3Modal } from '@web3modal/wagmi/react';
import { WagmiConfig } from 'wagmi';
import { wagmiConfig } from './wagmiConfig';

const { VITE_PROJECT_ID } = import.meta.env;
console.log('🚀 ~ process.env:', process.env);

console.log('🚀 ~ import.meta.env:', import.meta.env);
const projectId = VITE_PROJECT_ID;

createWeb3Modal({ wagmiConfig, projectId });

export const Wagmi = ({ children }) => {
  return <WagmiConfig config={wagmiConfig}>{children}</WagmiConfig>;
};
