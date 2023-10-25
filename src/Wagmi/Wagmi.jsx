import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi/react';
import { WagmiConfig } from 'wagmi';
import { sepolia, mainnet } from 'wagmi/chains';

const { VITE_VERCEL_PROJECT_ID } = import.meta.env;

const projectId = VITE_VERCEL_PROJECT_ID;
if (!projectId) {
  throw new Error('VITE_PROJECT_ID is not set');
}
const chains = [sepolia, mainnet];
const wagmiConfig = defaultWagmiConfig({
  chains,
  projectId,
  metadata: {
    name: 'Web3Modal React',
  },
});
createWeb3Modal({ wagmiConfig, projectId, chains });

export const Wagmi = ({ children }) => {
  return <WagmiConfig config={wagmiConfig}>{children}</WagmiConfig>;
};
