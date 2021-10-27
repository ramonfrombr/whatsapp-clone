import "../styles/globals.css";

import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

import firebase from "firebase";
import { autenticacao, banco_de_dados } from "../firebase";

import Carregamento from "../componentes/carregamento/Carregamento";
import Login from "../componentes/login/Login";

function MyApp({ Component, pageProps }) {
	// Selecione o usuário
	const [usuario, carregamento] = useAuthState(autenticacao);

	useEffect(() => {
		if (usuario) {
			banco_de_dados.collection("usuarios").doc(usuario.uid).set(
				{
					email: usuario.email,
					ultimaVisita: firebase.firestore.FieldValue.serverTimestamp(),
					fotoURL: usuario.photoURL,
				},
				{ merge: true }
			);
		}
	}, [usuario]);

	// Se houver carregamento, exiba o componente Carregamento
	if (carregamento) return <Carregamento />;

	// Se não houver usuário, exiba a página de login
	if (!usuario) return <Login />;

	// Se houver usuário, exiba o resto do app
	return <Component {...pageProps} />;
}

export default MyApp;
