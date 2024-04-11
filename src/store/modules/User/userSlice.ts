import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import serviceApi from '../../../configs/services/taskApi';
import { CreateResponse, LoginResponse } from '../../types/ResponseRequests';
import { User } from '../../types/User';
import { showNotification } from '../Notification/notificationSlice';

export interface UserLogged {
	id: string;
	name: string;
	isLogged: boolean;
}

const initialState = {
	user: {
		id: '',
		name: '',
		username: '',
		token: '',
		isLogged: false,
	},

	loading: false,
};

export const createUser = createAsyncThunk(
	'user/create',
	async (newUser: User, { dispatch }) => {
		try {
			const response = await serviceApi.post('/user', newUser);

			const responseApi = response.data as CreateResponse;

			dispatch(
				showNotification({
					message: responseApi.message,
					success: responseApi.success ? true : false,
				}),
			);

			return responseApi;
		} catch (error) {
			if (error instanceof AxiosError) {
				const response = error.response?.data as CreateResponse;

				dispatch(
					showNotification({
						message: response.message,
						success: response.success,
					}),
				);

				return response;
			}

			return {
				sucesso: false,
				mensagem: 'Erro inesperado.',
			};
		}
	},
);

export const loginUser = createAsyncThunk(
	'user/login',
	async (login: Omit<User, 'name'>, { dispatch }) => {
		try {
			const response = await serviceApi.post('/login', login);

			const responseApi = response.data as LoginResponse;

			dispatch(
				showNotification({
					message: responseApi.message,
					success: responseApi.success,
				}),
			);

			return responseApi;
		} catch (error) {
			if (error instanceof AxiosError) {
				const response = error.response?.data as LoginResponse;

				dispatch(
					showNotification({
						message: response.message,
						success: response.success,
					}),
				);

				return response;
			}

			return {
				success: false,
				message: 'Erro inesperado.',
			};
		}
	},
);

export const getUser = createAsyncThunk(
	'user/getUser',
	async (_, { dispatch }) => {
		try {
			const headers = {
				'Content-Type': 'application/json',
				token: localStorage.getItem('userLogged'),
			};
			const response = await serviceApi.get('/validateDataUser', {
				headers,
			});

			const responseApi = response.data as LoginResponse;

			dispatch(
				showNotification({
					message: responseApi.message,
					success: responseApi.success,
				}),
			);

			return responseApi;
		} catch (error) {
			if (error instanceof AxiosError) {
				const response = error.response?.data as LoginResponse;

				dispatch(
					showNotification({
						message: response.message,
						success: response.success,
					}),
				);

				return response;
			}

			return {
				success: false,
				message: 'Erro inesperado.',
			};
		}
	},
);

export const userSlice = createSlice({
	name: 'user',
	initialState: initialState,
	reducers: {
		setUser: (state, action) => {
			return {
				...state,
				user: {
					id: action.payload.id,
					name: action.payload.name,
					username: action.payload.username,
					token: action.payload.token,
					isLogged: true,
				},
			};
		},
		logoutUser: () => {
			return initialState;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(createUser.pending, (state) => {
			return {
				...state,
				loading: true,
			};
		});
		builder.addCase(createUser.fulfilled, (state, action) => {
			const payload = action.payload as CreateResponse;

			if (payload.success && payload.data) {
				return {
					user: {
						id: payload.data?.id,
						name: payload.data?.name,
						username: payload.data?.username,
						token: payload.data?.token,
						isLogged: false,
					},
					loading: false,
				};
			}

			if (!payload.success) {
				return {
					...state,
					loading: false,
				};
			}
		});
		builder.addCase(createUser.rejected, (state) => {
			return {
				...state,
				loading: false,
			};
		});

		builder.addCase(loginUser.pending, (state) => {
			return {
				...state,
				loading: true,
			};
		});

		builder.addCase(loginUser.fulfilled, (state, action) => {
			const payload = action.payload as LoginResponse;

			if (payload.success && payload.data) {
				localStorage.setItem('userLogged', payload.data.token);

				return {
					user: {
						id: payload.data.id,
						name: payload.data.name,
						username: payload.data.username,
						token: payload.data.token,
						isLogged: true,
					},
					loading: false,
				};
			}

			if (!payload.success) {
				return initialState;
			}
		});
		builder.addCase(loginUser.rejected, () => {
			return initialState;
		});

		builder.addCase(getUser.pending, (state) => {
			return {
				...state,
				loading: true,
			};
		});

		builder.addCase(getUser.fulfilled, (state, action) => {
			const payload = action.payload as LoginResponse;

			if (payload.success && payload.data) {
				return {
					user: {
						id: payload.data.id,
						name: payload.data.name,
						username: payload.data.username,
						token: payload.data.token,
						isLogged: true,
					},
					loading: false,
				};
			}

			if (!payload.success) {
				return initialState;
			}
		});

		builder.addCase(getUser.rejected, () => {
			return initialState;
		});
	},
});

export const { setUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
