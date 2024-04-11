export const usernameValidator = (username: string): boolean => {
	if (!username) {
		return false;
	}

	if (username.length > 50) {
		return false;
	}

	return true;
};

export const passwordValidator = (password: string): boolean => {
	if (!password) {
		return false;
	}

	if (password.length < 3) {
		return false;
	}

	return true;
};
