//mui
import { styled, Box, Typography } from "@mui/material";

//icon
import iconLight from "assets/svg/logo-light.svg";
import iconDark from "assets/svg/logo-dark.svg";
import iconSun from "assets/svg/icon-sun.svg";
import iconMoon from "assets/svg/icon-moon.svg";

//action and select
import { changeTheme, selectTheme } from "store/slices/themeSlices";

//state
import { useDispatch, useSelector } from "react-redux";
import WalletButton from "./components/WalletButton";

type Props = {};

const Container = styled(Box)(({ theme }) => ({
	width: "auto",
	height: "88px",
	backgroundColor: theme.palette.background.default,
	padding: "24px 136px",
	backgroundClip: "border-box",
	display: "flex",
	justifyContent: "space-between",
	borderBottom: "solid 1px rgba(0, 0, 0, 0.1)",
	[theme.breakpoints.down("md")]: {
		padding: "24px 68px",
	},
	[theme.breakpoints.down("sm")]: {
		padding: "24px 32px",
	},

	".header__container": {
		display: "flex",
	},

	"#header__container__img": {
		borderRadius: theme.shape.borderRadiusSm,
	},

	"#header__container__name": {
		fontSize: "20px",
		marginTop: "4px",
		marginLeft: "6px",
	},
	"#header__container__toggle": {
		width: "40px",
		height: "40px",
		padding: "6px 6px",
		borderRadius: theme.shape.borderRadiusSm,
		cursor: "pointer",
		margin: "0px 10px",
		"&:hover": {
			border: "0.5px solid #fff",
		},
	},
}));
const Header = (props: Props) => {
	const distpatch = useDispatch();
	const stateTheme = useSelector(selectTheme);

	const toggleTheme = () => {
		distpatch(changeTheme());
	};

	return (
		<Container>
			<Box className="header__container">
				<Box id="header__container__img" component="img" src={stateTheme === "light" ? iconLight : iconDark}></Box>
				<Typography id="header__container__name">Lottery</Typography>
			</Box>
			<Box className="header__container">
				<Box id="header__container__toggle" component="img" src={stateTheme === "light" ? iconSun : iconMoon} onClick={toggleTheme}></Box>
				<WalletButton></WalletButton>
			</Box>
		</Container>
	);
};

export default Header;
