import axios from 'axios';

const serviceApi = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
});

export const useAPI = () => ({
	validateToken: async (token: string) => {
		const response = await serviceApi.post('/login', { token });
		return response.data;
	},

	signIn: async (username: string, password: string) => {
		const response = await serviceApi.post('/login', {
			username,
			password,
		});
		return response.data;
	},

	logout: async () => {
		const response = await serviceApi.post('/');
		return response.data;
	},
});

export default serviceApi;
