import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface TaskModalProps {
	id: string | undefined;
	title: string | undefined;
	task: string | undefined;
	author: string | undefined;
}

const initialState: TaskModalProps = {
	id: '',
	title: '',
	task: '',
	author: '',
};

export const idTaskSlice = createSlice({
	name: 'taskModal',
	initialState,
	reducers: {
		getId: (state, action: PayloadAction<TaskModalProps>) => {
			return {
				id: action.payload.id ?? '',
				title: action.payload.title ?? '',
				task: action.payload.task ?? '',
				author: action.payload.author ?? '',
			};
		},
		deleteId: (state) => {
			return initialState;
		},
	},
});

export const { deleteId, getId } = idTaskSlice.actions;

export default idTaskSlice.reducer;
