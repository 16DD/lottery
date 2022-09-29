import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "store/store";
export interface ThemeState {
	mode: string;
}

const initialState: ThemeState = {
	mode: "light",
};

const slice = createSlice({
	name: "theme",
	initialState,
	reducers: {
		changeTheme(state) {
			state.mode === "light" ? (state.mode = "dark") : (state.mode = "light");
		},
	},
});

//action
export const { changeTheme } = slice.actions;
//selector
export const selectTheme = (state: RootState) => state.theme.mode;
//reducer
export default slice.reducer;
