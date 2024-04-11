import DeleteIcon from '@mui/icons-material/Delete';
import EditNoteIcon from '@mui/icons-material/EditNote';
import {
	Card,
	CardActions,
	CardContent,
	CardHeader,
	Grid,
	IconButton,
	Typography,
} from '@mui/material';

import { useAppDispatch } from '../../../../store/hooks';
import { getId } from '../../../../store/modules/TaskModal/taskModalSlice';
import { showModal } from '../../../../store/modules/ContextModal/contextModalSlice';

interface CardsProps {
	id: string;
	title: string;
	task: string;
	author: string;
}

export const Cards = ({ task, title, id, author }: CardsProps) => {
	const dispatch = useAppDispatch();

	const openModal = (type: string) => {
		switch (type) {
			case 'edit':
				dispatch(showModal('edit'));
				dispatch(
					getId({
						id: id,
						title: title,
						task: task,
						author: author,
					}),
				);

				break;
			case 'delete':
				dispatch(showModal('delete'));
				dispatch(
					getId({
						id: id,
						title: title,
						task: task,
						author: author,
					}),
				);
		}
	};

	const newDate = new Date();
	const formatedDate =
		newDate.getDate() +
		'/' +
		(newDate.getMonth() + 1) +
		'/' +
		newDate.getFullYear();

	return (
		<>
			<Grid item xs={12} md={6} lg={4}>
				<Card
					variant="outlined"
					id={id}
					sx={{
						boxShadow: '1px 1px 10px  #6e5fa2',
					}}
				>
					<CardHeader title={title} />

					<CardContent>
						<Typography>{task}</Typography>
					</CardContent>
					<CardContent>
						<Typography>
							Criado por: {author}
							<Typography>{formatedDate}</Typography>
						</Typography>
					</CardContent>
					<CardActions>
						<IconButton onClick={() => openModal('edit')}>
							<EditNoteIcon />
						</IconButton>
						<IconButton onClick={() => openModal('delete')}>
							<DeleteIcon />
						</IconButton>
					</CardActions>
				</Card>
			</Grid>
		</>
	);
};
