import { Close } from '@mui/icons-material';
import {
	Box,
	Button,
	CircularProgress,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Divider,
	IconButton,
	TextField,
} from '@mui/material';
import { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { createUser } from '../../../../store/modules/User/userSlice';
import { IsValidCredentials } from '../../../../store/types/IsValidCredentials';
import { User } from '../../../../store/types/User';
import { nameRegex } from '../../../../utils/validators/regexData';

export interface ModalSignUpUserProps {
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ModalSignUpUser = ({ open, setOpen }: ModalSignUpUserProps) => {
	const [name, setName] = useState('');
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const userState = useAppSelector((state) => state.users);
	const dispatch = useAppDispatch();

	const [errorName, setErrorName] = useState<IsValidCredentials>({
		helperText: '',
		isValid: true,
	});

	const [errorUsername, setErrorUsername] = useState<IsValidCredentials>({
		helperText: '',
		isValid: true,
	});

	const [errorPassword, setErrorPassword] = useState<IsValidCredentials>({
		helperText: '',
		isValid: true,
	});

	const handleClose = () => {
		setOpen(false);
	};

	const user: User = {
		name,
		username,
		password,
	};

	const handleSignupUser = (ev: React.FormEvent<HTMLFormElement>) => {
		ev.preventDefault();

		if (!ev.currentTarget.checkValidity()) {
			return;
		}

		dispatch(createUser(user));
		setTimeout(() => {
			setUsername('');
			setPassword('');
			setName('');

			handleClose();
		}, 3000);
	};

	useEffect(() => {
		if (!name.length && !nameRegex.test(name)) {
			setErrorName({
				helperText: 'Informe um nome.',
				isValid: false,
			});
		} else {
			setErrorName({
				helperText: 'Utilize seu nome para criar uma conta.',
				isValid: true,
			});
		}
	}, [name]);

	useEffect(() => {
		if (username.length && username.length < 3) {
			setErrorUsername({
				helperText: 'Informe um username válido.',
				isValid: false,
			});
		} else {
			setErrorUsername({
				helperText: 'Utilize um username para criar uma conta.',
				isValid: true,
			});
		}
	}, [username]);

	useEffect(() => {
		if (password.length && password.length < 6) {
			setErrorPassword({
				helperText: 'Cadastre uma senha com no mínimo 6 caracteres.',
				isValid: false,
			});
		} else {
			setErrorPassword({
				helperText:
					'Utilize uma senha fácil de lembrar e anote para não esquecer.',
				isValid: true,
			});
		}
	}, [password]);

	return (
		<Dialog
			open={open}
			onClose={handleClose}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
		>
			<IconButton
				aria-label="close"
				onClick={handleClose}
				sx={{
					position: 'absolute',
					right: 8,
					top: 8,
					color: (theme) => theme.palette.grey[500],
				}}
			>
				<Close />
			</IconButton>
			<DialogTitle id="alert-dialog-title">
				{'Criar uma conta'}
			</DialogTitle>
			<Divider />
			<Box component="form" onSubmit={handleSignupUser}>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						<TextField
							label="Nome"
							type="text"
							error={!errorName.isValid}
							helperText={errorName.helperText}
							fullWidth
							sx={{ marginY: 3 }}
							onChange={(event) => {
								setName(event.currentTarget.value);
							}}
							required
							value={name}
						/>
						<TextField
							label="Username"
							type="text"
							error={!errorUsername.isValid}
							helperText={errorUsername.helperText}
							fullWidth
							sx={{ marginY: 3 }}
							onChange={(event) => {
								setUsername(event.currentTarget.value);
							}}
							required
							value={username}
						/>
						<TextField
							label="Senha"
							error={!errorPassword.isValid}
							helperText={errorPassword.helperText}
							type="password"
							fullWidth
							sx={{ marginY: 3 }}
							onChange={(event) => {
								setPassword(event.currentTarget.value);
							}}
							required
							inputProps={{ minLength: 6 }}
							value={password}
						/>
					</DialogContentText>
				</DialogContent>
				<Divider />
				<DialogActions
					sx={{
						paddingY: 3,
					}}
				>
					<Button
						type="button"
						variant="outlined"
						onClick={handleClose}
					>
						Cancelar
					</Button>
					<Button
						disabled={
							!errorUsername.isValid || !errorPassword.isValid
						}
						type="submit"
						variant="contained"
						autoFocus
						startIcon={
							userState.loading ? (
								<CircularProgress color="inherit" />
							) : (
								<></>
							)
						}
					>
						Cadastrar
					</Button>
				</DialogActions>
			</Box>
		</Dialog>
	);
};
