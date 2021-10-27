import React from "react";

import { Container, LoginContainer, Logo } from "./LoginElementos";
import Head from "next/head";
import { Button } from "@material-ui/core";
import { autenticacao, provider } from "../../firebase";

function Login() {
	const entrar = () => {
		autenticacao.signInWithPopup(provider).catch(alert);
	};

	return (
		<Container>
			<Head>
				<title>Login</title>
			</Head>
			<LoginContainer>
				<Logo src="https://logodownload.org/wp-content/uploads/2015/04/whatsapp-logo-1.png" />
				<Button onClick={entrar} variant="outlined">
					Sign in with Google
				</Button>
			</LoginContainer>
		</Container>
	);
}

export default Login;
