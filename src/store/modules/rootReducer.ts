import { combineReducers } from '@reduxjs/toolkit';

import contextoModalSlice from './ContextModal/contextModalSlice';
import loadingSlice from './Loading/loadingSlice';
import notificationSlice from './Notification/notificationSlice';
import taskSlice from './Task/taskSlice';
import TaskModal from './TaskModal/taskModalSlice';
import userSlice from './User/userSlice';

const rootReducer = combineReducers({
	notification: notificationSlice,
	users: userSlice,
	task: taskSlice,
	loading: loadingSlice,
	context: contextoModalSlice,
	id: TaskModal,
});

export default rootReducer;
