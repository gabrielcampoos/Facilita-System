import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { ContextState } from '../../types/Context';

const initialState: ContextState = {
	isOpen: false,
	contexto: 'create',
};

export const contextSlice = createSlice({
	name: 'contextModal',
	initialState,
	reducers: {
		showModal: (
			state,
			action: PayloadAction<'create' | 'edit' | 'delete'>,
		) => {
			return {
				isOpen: true,
				context: action.payload,
			};
		},
		hideModal: (state) => {
			return {
				...state,
				isOpen: false,
			};
		},
	},
});

export const { showModal, hideModal } = contextSlice.actions;

export default contextSlice.reducer;
