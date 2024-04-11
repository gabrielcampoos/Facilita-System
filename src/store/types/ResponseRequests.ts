import { TaskState } from './Task';
import { UserState } from './User';

export interface CreateResponse {
	success: boolean;
	message: string;
	data?: UserState & { id: string };
}

export interface LoginResponse {
	success: boolean;
	message: string;
	data?: { id: string; name: string; username: string; token: string };
}

export interface TaskResponse {
	success: boolean;
	message: string;
	data?: TaskState[];
}
