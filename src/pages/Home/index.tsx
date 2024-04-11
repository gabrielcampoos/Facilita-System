import AddIcon from '@mui/icons-material/Add';
import { Box, Divider, Fab, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Loading } from '../../shared-components/Loading';
import { SnackBarComp } from '../../shared-components/SnackBar';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { showModal } from '../../store/modules/ContextModal/contextModalSlice';
import { showNotification } from '../../store/modules/Notification/notificationSlice';
import { listAllTask, listTask } from '../../store/modules/Task/taskSlice';
import { logoutUser, getUser } from '../../store/modules/User/userSlice';
import MyAppBar from './components/AppBar';
import { Cards } from './components/Cards';
import { ModalTarefas } from './components/MessageModal';

export const Home = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const selector = useAppSelector((select) => select.task);

	const selectTarefas = useAppSelector(listAllTask);
	const selectUser = useAppSelector((select) => select.users);

	const [username, setUsername] = useState('');
	const [idUserLogged, setIdUserLogged] = useState('');
	const [tokenUserLogged, setTokenUserLogged] = useState('');

	useEffect(() => {
		setUsername(selectUser.user.username);
		setIdUserLogged(selectUser.user.id);
		setTokenUserLogged(selectUser.user.token);
	}, [
		selectUser.user.username,
		selectUser.user.id,
		selectUser.user.token,
		username,
		idUserLogged,
		tokenUserLogged,
	]);

	useEffect(() => {
		if (!localStorage.getItem('userLogged')) {
			dispatch(
				showNotification({
					success: false,
					message: 'You shall not pass!',
				}),
			);

			dispatch(logoutUser());
			localStorage.clear();
			navigate('/');
		}
		dispatch(getUser());
	}, [dispatch, navigate]);

	useEffect(() => {
		dispatch(listTask());
	}, [
		dispatch,
		navigate,
		selectUser.user.username,
		selectUser.user.id,
		selectUser.user.token,
	]);

	return (
		<>
			<Box
				display={'flex'}
				flexDirection={'column'}
				width={'100%'}
				top={0}
			>
				<MyAppBar />

				<Divider />

				<Grid container spacing={2} mt={2} px={2}>
					{selectTarefas
						.filter(
							(item) => item.author === selectUser.user.username,
						)
						.map(({ task, title, id, author }) => (
							<Cards
								key={id}
								id={id}
								title={title}
								task={task}
								author={author}
							/>
						))}
				</Grid>
			</Box>
			<Box
				sx={{
					position: 'fixed',
					bottom: '24px',
					right: '24px',
					display: 'flex',
					flexDirection: 'column-reverse',
					gap: 2,
				}}
			>
				<Fab
					color="primary"
					aria-label="add"
					onClick={() => {
						dispatch(showModal('create'));
					}}
				>
					<AddIcon />
				</Fab>
			</Box>

			<SnackBarComp />
			<ModalTarefas />
			<Loading open={selector.loading} />
		</>
	);
};
