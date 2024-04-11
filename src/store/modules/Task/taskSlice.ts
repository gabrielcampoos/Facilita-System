import {
	createAsyncThunk,
	createEntityAdapter,
	createSlice,
} from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { RootState } from '../..';
import serviceApi from '../../../configs/services/taskApi';
import { TaskResponse } from '../../types/ResponseRequests';
import { TaskDTO, TaskState } from '../../types/Task';
import { showNotification } from '../Notification/notificationSlice';

export const createTask = createAsyncThunk(
	'task/create',
	async (data: TaskDTO, { dispatch }) => {
		try {
			const headers = {
				'Content-Type': 'application/json',
				token: localStorage.getItem('userLogged'),
			};
			const response = await serviceApi.post('/task', data, {
				headers,
			});

			dispatch(
				showNotification({
					success: response.data.success,
					message: response.data.message,
				}),
			);

			return response.data;
		} catch (error) {
			if (error instanceof AxiosError) {
				const response: TaskResponse = {
					success: error.response?.data.success,
					message: error.response?.data.message,
				};
				dispatch(
					showNotification({
						message: error.response?.data.message,
						success: false,
					}),
				);
				return response;
			}
			return {
				sucesso: false,
				message: 'Algo de errado não está certo. A requisição falhou.',
			};
		}
	},
);

export const editTask = createAsyncThunk(
	'task/edit',
	async (data: TaskDTO, { dispatch }) => {
		try {
			const headers = {
				'Content-Type': 'application/json',
				token: localStorage.getItem('userLogged'),
			};
			const response = await serviceApi.put(`/task/${data.id}`, data, {
				headers,
			});
			dispatch(
				showNotification({
					success: response.data.success,
					message: response.data.message,
				}),
			);
			return response.data;
		} catch (error) {
			if (error instanceof AxiosError) {
				const response: TaskResponse = {
					success: error.response?.data.success,
					message: error.response?.data.message,
				};
				dispatch(
					showNotification({
						message: error.response?.data.message,
						success: false,
					}),
				);
				return response;
			}
			return {
				success: false,
				message: 'Algo de errado não está certo. A requisição falhou.',
			};
		}
	},
);

export const deleteTask = createAsyncThunk(
	'task/delete',
	async (id: string, { dispatch }) => {
		try {
			const headers = {
				'Content-Type': 'application/json',
				token: localStorage.getItem('userLogged'),
			};
			const response = await serviceApi.delete(`/task/${id}`, {
				headers,
			});
			dispatch(
				showNotification({
					message: response.data.message,
					success: response.data.success,
				}),
			);
			return response.data;
		} catch (error) {
			if (error instanceof AxiosError) {
				const response: TaskResponse = {
					success: error.response?.data.success,
					message: error.response?.data.message,
				};
				dispatch(
					showNotification({
						message: error.response?.data.message,
						success: false,
					}),
				);
				return response;
			}
			return {
				success: false,
				message: 'Algo de errado não está certo. A requisição falhou.',
			};
		}
	},
);

export const listTask = createAsyncThunk(
	'task/list',
	async (_, { dispatch }) => {
		try {
			const headers = {
				'Content-Type': 'application/json',
				token: localStorage.getItem('userLogged'),
			};
			const response = await serviceApi(`/task`, { headers });

			dispatch(
				showNotification({
					success: response.data.success,
					message: response.data.message,
				}),
			);

			return response.data;
		} catch (error) {
			if (error instanceof AxiosError) {
				const response: TaskResponse = {
					success: error.response?.data.success,
					message: error.response?.data.message,
				};
				dispatch(
					showNotification({
						message: error.response?.data.message,
						success: false,
					}),
				);
				return response;
			}
			return {
				success: false,
				message: 'Algo de errado não está certo. A requisição falhou.',
			};
		}
	},
);

const taskAdapter = createEntityAdapter<TaskState>({
	selectId: (state) => state.id,
});

export const { selectAll: listAllTask } = taskAdapter.getSelectors(
	(global: RootState) => global.task,
);

const taskSlice = createSlice({
	name: 'task',
	initialState: taskAdapter.getInitialState({
		loading: false,
		message: '',
	}),
	reducers: {
		refresh(state) {
			return { ...state };
		},
	},
	extraReducers: (builder) => {
		builder.addCase(listTask.pending, (state) => {
			state.loading = true;
			state.message = 'Carregando tarefas.';
		});

		builder.addCase(listTask.fulfilled, (state, action) => {
			const { message, data } = action.payload;
			state.loading = false;
			state.message = message;

			if (!data || data.length === 0) {
				state.message = 'Nada encontrado';
				return;
			}
			taskAdapter.setAll(state, data);
		});

		builder.addCase(createTask.pending, (state) => {
			state.loading = true;
			state.message = 'Criando tarefa...';
		});

		builder.addCase(createTask.fulfilled, (state, action) => {
			const { data, message } = action.payload;
			state.loading = false;
			state.message = message;

			if (!data?.id) {
				return;
			}

			taskAdapter.addOne(state, data);
		});

		builder.addCase(createTask.rejected, (state) => {
			state.loading = false;
			state.message = 'Tarefa não criada.';
		});

		builder.addCase(editTask.pending, (state) => {
			state.loading = true;
			state.message = 'Atualizando tarefa...';
		});
		builder.addCase(editTask.fulfilled, (state, action) => {
			const { message, data } = action.payload;
			state.loading = false;
			state.message = message;

			if (!data || !data.id) {
				return;
			}

			taskAdapter.updateOne(state, {
				id: data.id,
				changes: data,
			});
		});
		builder.addCase(editTask.rejected, (state) => {
			state.loading = false;
			state.message = 'Tarefa não atualizada.';
		});

		builder.addCase(deleteTask.pending, (state) => {
			state.loading = true;
			state.message = 'Apagando tarefa...';
		});
		builder.addCase(deleteTask.fulfilled, (state, action) => {
			const { message, success, data } = action.payload;
			state.loading = false;
			state.message = message;

			if (success) {
				taskAdapter.removeOne(state, data);
			}
		});
		builder.addCase(deleteTask.rejected, (state) => {
			state.loading = false;
			state.message = 'Tarefa não apagada.';
		});
	},
});

export default taskSlice.reducer;
export const { refresh } = taskSlice.actions;
