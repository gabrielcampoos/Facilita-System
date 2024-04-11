import { Alert } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import * as React from 'react';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { hideNotification } from '../../store/modules/Notification/notificationSlice';

export const SnackBarComp: React.FC = () => {
	const notification = useAppSelector((state) => state.notification);

	// disparar actions
	const dispatch = useAppDispatch();

	return (
		<div>
			<Snackbar
				open={notification.show}
				onClose={() => dispatch(hideNotification())}
				autoHideDuration={4000}
			>
				<Alert severity={notification.success ? 'success' : 'error'}>
					{notification.message}
				</Alert>
			</Snackbar>
		</div>
	);
};
