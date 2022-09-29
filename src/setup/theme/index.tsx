import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { ReactNode } from "react";
//theme
import { useSelector } from "react-redux";
import { selectTheme } from "store/slices/themeSlices";
import palette from "./palette";
import breakpoints from "./breakpoints";
import shape from "./shape";
import typography from "./typography";

type ThemeConfigProps = {
	children: ReactNode;
};

const ThemeConfig = ({ children }: ThemeConfigProps) => {
	const stateTheme = useSelector(selectTheme);
	const stateMode = () => (stateTheme === "light" ? palette.light : palette.dark);

	const theme = createTheme({
		palette: stateMode(),
		breakpoints: breakpoints,
		typography: typography,
		shape: shape,
	});
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline></CssBaseline>
			{children}
		</ThemeProvider>
	);
};

export default ThemeConfig;
