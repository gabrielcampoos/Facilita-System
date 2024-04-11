import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

interface ILoading {
	open: boolean;
}

export const Loading: React.FC<ILoading> = ({ open }) => {
	return (
		<Backdrop
			sx={{
				color: '#fff',
				zIndex: (theme) => theme.zIndex.drawer + 1,
			}}
			open={open}
		>
			<CircularProgress color="inherit" />
		</Backdrop>
	);
};
