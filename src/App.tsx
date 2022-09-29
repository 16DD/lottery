//page
import HomePage from "pages/home";
//wallet
import { WagmiConfig } from "wagmi";
import { chains, wagmiClient } from "setup/wagmi/wagmiConfig";
import "@rainbow-me/rainbowkit/styles.css";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
//store
import { Provider } from "react-redux";
import { store, persistor } from "store/store";
import { PersistGate } from "redux-persist/integration/react";

//theme
import ThemeConfig from "setup/theme";

function App() {
	return (
		<Provider store={store}>
			<PersistGate persistor={persistor}>
				<ThemeConfig>
					<WagmiConfig client={wagmiClient}>
						<RainbowKitProvider chains={chains} modalSize="compact">
							<HomePage></HomePage>
						</RainbowKitProvider>
					</WagmiConfig>
				</ThemeConfig>
			</PersistGate>
		</Provider>
	);
}

export default App;
