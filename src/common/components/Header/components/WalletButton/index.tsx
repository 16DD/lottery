import { Box, styled } from "@mui/material";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useState } from "react";

//icon
import iconWallet from "assets/svg/icon-wallet.svg";
import iconAvatar from "assets/svg/icon-avatar.svg";
//cpn
import DrawerCustom, { DrawerCustomMobile } from "../CustomDrawer";

const Container = styled(Box)(({ theme }) => ({
	".walletbtn__img": {
		with: "40px",
		height: "40px",
		borderRadius: theme.shape.borderRadiusSm,
		padding: "6px 6px",
		cursor: "pointer",

		"&:hover": {
			border: "0.5px solid #fff",
		},
	},
}));

const WalletButton = () => {
	const [close, setClose] = useState(false);

	return (
		<ConnectButton.Custom>
			{({ account, chain, openAccountModal, openChainModal, openConnectModal, mounted }) => {
				const ready = mounted;
				const connected = ready && account && chain;

				return (
					<Container>
						{(() => {
							if (!connected) {
								return <Box className="walletbtn__img" component="img" src={iconWallet} onClick={openConnectModal}></Box>;
							}
							if (chain.unsupported) {
								openChainModal();
							}
							return (
								<>
									<Box className="walletbtn__img" component="img" src={iconAvatar} onClick={() => setClose(!close)}></Box>

									<DrawerCustom open={close} onClose={() => setClose(false)}></DrawerCustom>
								</>
							);
						})()}
					</Container>
				);
			}}
		</ConnectButton.Custom>
	);
};

export default WalletButton;
