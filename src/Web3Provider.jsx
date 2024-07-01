import { WagmiProvider, createConfig, http } from "wagmi";
import { mainnet, sepolia, localhost } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";

const config = createConfig(
  getDefaultConfig({
    // Your dApps chains
    chains: [localhost],
    transports: {
      // RPC URL for each chain
      [localhost.id]: http('http://127.0.0.1:8545/')
    },

    // Required API Keys
    walletConnectProjectId: '63df2a800927e5eb27673ce437398ae3',

    // Required App Info
    appName: "DEB",
  }),
);

const queryClient = new QueryClient();

export const Web3Provider = ({ children }) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider theme="retro">{children}</ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};