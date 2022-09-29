import { dispatch, getState } from "store/store";
import { changeTheme } from "store/slices/themeSlices";

export function switchTheme() {
	return async () => {
		try {
			dispatch(changeTheme());
		} catch (err) {
			console.log(err);
		}
	};
}
