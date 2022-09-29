import { Box, Drawer, DrawerProps, useTheme, styled, Typography } from "@mui/material";
import { iconChainId } from "pages/home/utils";
import { useAccount, useBalance, useDisconnect, useNetwork } from "wagmi";
//icon
import iconEthGold from "assets/svg/icon-eth-gold.svg";
import iconToken from "assets/svg/icon-token.svg";
//abi
import LotteryToken from "abi/LotteryToken.json";
//cpn
import ButtonCustom from "common/components/ButtonCustom";

export interface IDrawerCustom extends DrawerProps {}

const Container = styled(Box)(({ theme }) => ({
	".drawer__head": {
		display: "flex",
		height: "77px",
		alignItems: "center",
		justifyContent: "space-around",

		"#drawer__head__address": {
			textDecoration: "none",
			color: theme.palette.text.primary,

			"&:hover": {
				color: theme.palette.action.hover,
			},
		},
	},

	".drawer__body": {
		display: "flex",
		flexDirection: "column",

		"#drawer__body__list": {
			width: "336px",
			alignSelf: "center",
			marginTop: "10px",

			".drawer__body__list__text": {
				marginTop: "10px",
				fontStyle: "italic",
				cursor: "pointer",
				"&:hover": {
					color: theme.palette.action.hover,
				},
			},
		},

		"#drawer__body__form": {
			width: "336px",
			height: "262px",
			borderRadius: theme.shape.borderRadiusSm,
			marginTop: "40px",
			border: "solid 1px rgba(0, 0, 0, 0.1)",
			alignSelf: "center",
			display: "flex",
			flexDirection: "column",

			"#drawer__body__form__head": {
				display: "flex",
				padding: "10px",
			},

			"#drawer__body__form__body": {
				width: "301px",
				height: "132px",
				borderRadius: theme.shape.borderRadiusSm,
				border: "solid 1px rgba(0, 0, 0, 0.1)",
				alignSelf: "center",
				marginTop: "10px",
			},
			"#drawer__body__form_bottom": {
				display: "flex",
			},
		},
	},
}));

const DrawerCustom = (props: IDrawerCustom) => {
	const theme = useTheme();
	const { address } = useAccount();
	const { chain } = useNetwork();
	const { data: balanceETH } = useBalance({
		addressOrName: address,
	});
	const { data: balanceTL } = useBalance({
		addressOrName: address,
		token: LotteryToken.address,
	});

	const { disconnect } = useDisconnect();

	return (
		<Box>
			<Drawer
				anchor={"right"}
				open={props.open}
				onClose={props.onClose}
				sx={{ marginTop: "88px" }}
				PaperProps={{
					sx: {
						width: "418px",
						height: "100vh",
						marginTop: "88px",
						backgroundColor: theme.palette.background.default,
						boxShadow: "none",
						backgroundImage: "none",
					},
				}}
				BackdropProps={{
					sx: {
						marginTop: "88px",
						backgroundColor: "rgba(0, 0, 0, 0.06)",
					},
				}}
			>
				<Container>
					<Box className="drawer__head">
						<Typography variant="h5" sx={{ fontWeight: "bold" }}>
							My Wallet
						</Typography>
						<Typography id="drawer__head__address" component={"a"} href={chain?.blockExplorers?.default.url + "/address/" + address} variant="h6">
							{address?.slice(0, 6) + "..." + address?.slice(-4)}
						</Typography>
					</Box>

					<Box className="drawer__body">
						<Box id="drawer__body__list">
							<Typography className="drawer__body__list__text" variant="h5">
								My profile
							</Typography>
							<Typography className="drawer__body__list__text" variant="h5">
								My token
							</Typography>
							<Typography className="drawer__body__list__text" variant="h5">
								My activity
							</Typography>
						</Box>
						<Box id="drawer__body__form">
							<Box id="drawer__body__form__head">
								<Typography variant="h6" sx={{ width: "200px" }}>
									Network:
								</Typography>
								<Box component={"img"} src={iconChainId(chain?.id)} sx={{ width: "26px", height: "26px" }}></Box>
								<Typography variant="h6" sx={{ width: "200px", marginLeft: "10px" }}>
									{chain?.name}
								</Typography>
							</Box>
							<Box id="drawer__body__form__body">
								<Box sx={{ display: "flex", padding: "14px" }}>
									<Box component={"img"} src={iconEthGold} sx={{ width: "20px", height: "20px" }}></Box>
									<Typography variant="subtitle1" sx={{ width: "200px" }}>
										{Number(balanceETH?.formatted).toFixed(5)} ETH
									</Typography>
								</Box>
								<Box sx={{ display: "flex", padding: "14px" }}>
									<Box component={"img"} src={iconToken} sx={{ width: "20px", height: "20px" }}></Box>
									<Typography variant="subtitle1" sx={{ width: "200px" }}>
										{Number(balanceTL?.formatted).toFixed(2)} LT(Lottery Token)
									</Typography>
								</Box>
							</Box>
							<ButtonCustom onClick={() => disconnect()} sx={{ alignSelf: "center", marginTop: "10px", width: "200px" }}>
								Disconnect
							</ButtonCustom>
						</Box>
					</Box>
				</Container>
			</Drawer>
		</Box>
	);
};

export default DrawerCustom;

const DrawerCustomMobile = (props: IDrawerCustom) => {
	const theme = useTheme();
	return (
		<Box>
			<Drawer
				anchor={"bottom"}
				open={props.open}
				onClose={props.onClose}
				PaperProps={{
					sx: {
						height: "250px",
						backgroundColor: theme.palette.background.default,
						boxShadow: "none",
						backgroundImage: "none",
						borderTopLeftRadius: "16px",
						borderTopRightRadius: "16px",
					},
				}}
				BackdropProps={{
					sx: {
						backgroundColor: "rgba(0, 0, 0, 0.06)",
					},
				}}
			></Drawer>
		</Box>
	);
};

export { DrawerCustomMobile };
