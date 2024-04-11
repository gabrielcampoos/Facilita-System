export interface TaskDTO {
	id: string;
	title: string;
	task: string;
	author: string;
}

export interface TaskState {
	id: string;
	title: string;
	task: string;
	author: string;
	createdAt: string;
}

export interface TaskFilter {
	id: string;
	username: string;
}
