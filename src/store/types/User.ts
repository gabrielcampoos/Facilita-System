export interface User {
	name: string;
	username: string;
	password: string;
}

export interface UserState {
	name: string;
	username: string;
	password: string;
	token: string;
	isLogged: boolean;
}
