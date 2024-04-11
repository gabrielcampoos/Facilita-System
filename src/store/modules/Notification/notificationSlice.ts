import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface Notification {
	show: boolean;
	message: string;
	success: boolean;
}

const initialState: Notification = {
	show: false,
	message: '',
	success: false,
};

const notificationSlice = createSlice({
	name: 'notification',
	initialState,
	reducers: {
		showNotification(
			state,
			action: PayloadAction<Omit<Notification, 'show'>>,
		) {
			return {
				show: true,
				...action.payload,
			};
		},
		hideNotification() {
			return initialState;
		},
	},
});

export const { showNotification, hideNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
