//wagmi
import { chain, configureChains, createClient } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
//connector

import { connectorsForWallets, wallet } from "@rainbow-me/rainbowkit";

//init chain support
export const CHAINS = [chain.polygonMumbai];

//config chains
export const { chains, provider, webSocketProvider } = configureChains(CHAINS, [publicProvider()]);

//connectors
const connectors = connectorsForWallets([
	{
		groupName: "Recommended",
		wallets: [wallet.metaMask({ chains }), wallet.coinbase({ chains, appName: "MyApp" }), wallet.walletConnect({ chains })],
	},
]);

export const wagmiClient = createClient({
	autoConnect: true,
	provider,
	webSocketProvider,
	connectors,
});
