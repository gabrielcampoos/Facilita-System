import { Box } from '@mui/material';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { FormLogin } from './components/FormLogin';

export const Login = () => {
	const navigate = useNavigate();

	useEffect(() => {
		if (localStorage.getItem('userLogged')) {
			navigate('/home');
		}
	}, [navigate]);

	return (
		<Box
			sx={{
				width: '100%',
				height: '100vh',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<FormLogin />
		</Box>
	);
};
