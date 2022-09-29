import { Button, styled } from "@mui/material";

const ButtonCustom = styled(Button)(({ theme }) => ({
	backgroundColor: theme.palette.mode === "dark" ? "#dee3f4" : "#45527e",
	color: theme.palette.mode === "dark" ? "#45527e" : "#dee3f4",
	borderRadius: theme.shape.borderRadiusSm,
	padding: "8px 8px",

	"&:hover": {
		backgroundColor: theme.palette.mode === "dark" ? "#bac7f0" : "#3b4a7b",
	},
}));

export default ButtonCustom;
