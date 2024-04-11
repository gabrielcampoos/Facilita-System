import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	TextField,
	Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { hideModal } from '../../../../store/modules/ContextModal/contextModalSlice';
import {
	createTask,
	editTask,
	deleteTask,
	refresh,
} from '../../../../store/modules/Task/taskSlice';
import { deleteId } from '../../../../store/modules/TaskModal/taskModalSlice';

export const ModalTarefas = () => {
	const [title, setTitle] = useState('');
	const [task, setTask] = useState('');

	const dispatch = useAppDispatch();
	const { context, isOpen } = useAppSelector((state) => state.context);
	const userLogged = useAppSelector((state) => state.users);

	const taskSelected = useAppSelector((state) => state.id);

	useEffect(() => {
		if (isOpen) {
			if (context === 'edit' && taskSelected.title && taskSelected.task) {
				setTitle(taskSelected.title);
				setTask(taskSelected.task);
			}
		}
	}, [taskSelected, context, isOpen, dispatch]);

	const closeModal = () => {
		dispatch(hideModal());
	};

	const handleSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
		ev.preventDefault();

		switch (context) {
			case 'create':
				dispatch(
					createTask({
						id: '',
						title: title,
						task: task,
						author: userLogged.user.username,
					}),
				);
				setTitle('');
				setTask('');
				closeModal();
				break;
			case 'edit':
				if (taskSelected.id) {
					dispatch(
						editTask({
							id: taskSelected.id,
							title: title,
							task: task,
							author: userLogged.user.username,
						}),
					);
				}
				setTask('');
				setTitle('');

				dispatch(deleteId());
				closeModal();

				break;
			case 'delete':
				if (taskSelected.id) {
					dispatch(deleteTask(taskSelected.id));
				}
				dispatch(deleteId());
				closeModal();
				dispatch(refresh());
				break;
		}
	};

	return (
		<Dialog open={isOpen}>
			<Box component={'form'} onSubmit={handleSubmit}>
				<DialogTitle>
					{context === 'create' && 'Adicionar tarefa'}
					{context === 'edit' && 'Editar tarefa'}
					{context === 'delete' && 'Excluir tarefa'}
				</DialogTitle>
				{context !== 'delete' && (
					<>
						<DialogContent>
							<TextField
								autoFocus
								margin="dense"
								name="title"
								id="title"
								label="Título"
								type="text"
								fullWidth
								variant="filled"
								onChange={(ev) => setTitle(ev.target.value)}
								value={title}
							/>
							<TextField
								autoFocus
								margin="dense"
								id="task"
								name="task"
								label="Escreva aqui sua tarefa..."
								type="text"
								fullWidth
								variant="filled"
								onChange={(ev) => setTask(ev.target.value)}
								value={task}
								multiline
								minRows={3}
							/>
						</DialogContent>
						<DialogActions>
							<Button
								type="button"
								variant="outlined"
								onClick={closeModal}
							>
								Cancelar
							</Button>
							<Button
								type="submit"
								color="success"
								variant="contained"
							>
								Salvar
							</Button>
						</DialogActions>
					</>
				)}

				{context === 'delete' && (
					<>
						<DialogContent>
							<Typography variant="body1">
								Você deseja mesmo excluir esse recado?
							</Typography>
						</DialogContent>

						<DialogActions>
							<Button
								type="button"
								variant="outlined"
								onClick={closeModal}
							>
								Cancelar
							</Button>
							<Button
								type="submit"
								color="error"
								variant="contained"
							>
								Excluir
							</Button>
						</DialogActions>
					</>
				)}
			</Box>
		</Dialog>
	);
};
