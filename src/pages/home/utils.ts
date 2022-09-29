//icon
import iconBinance from "assets/svg/chain/icon-binance.svg";
import iconEthereum from "assets/svg/chain/icon-ethereum.svg";
import iconPolygon from "assets/svg/chain/icon-polygon.svg";
import iconAvax from "assets/svg/chain/icon-avax.svg";
import { BigNumber, ethers } from "ethers";
export const iconChainId = (chainId: number | undefined) => {
	let iconChain;
	switch (chainId) {
		case 1: {
			iconChain = iconEthereum;
			break;
		}
		case 4: {
			iconChain = iconEthereum;
			break;
		}
		case 137: {
			iconChain = iconPolygon;
			break;
		}
		case 80001: {
			iconChain = iconPolygon;
			break;
		}
		case 56: {
			iconChain = iconBinance;
			break;
		}
		case 43114: {
			iconChain = iconAvax;
			break;
		}
		default: {
			iconChain = iconAvax;
			break;
		}
	}
	return iconChain;
};

export const weiToEther = (amount:BigNumber) => {
	return ethers.utils.formatEther(amount).toString();
}
