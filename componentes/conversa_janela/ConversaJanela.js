import { useState } from "react";

import styled from "styled-components";

import { autenticacao, banco_de_dados } from "../../firebase";

import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";

import Mensagem from "../../componentes/mensagem/Mensagem";

import { Avatar, IconButton } from "@material-ui/core";

import MoreVertIcon from "@material-ui/icons/MoreVert";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import MicIcon from "@material-ui/icons/Mic";

import firebase from "firebase";
import selecionarEmailDestinatario from "../../biblioteca/selecionarEmailDestinatario";

function ConversaJanela({ conversa, mensagens }) {
	console.log("Conversa");
	console.log(conversa);
	console.log("Mensagens");
	console.log(mensagens);

	const [usuario] = useAuthState(autenticacao);

	const [input, definirInput] = useState("");

	const router = useRouter();

	const [mensagensSnapshot] = useCollection(
		banco_de_dados
			.collection("conversas")
			.doc(router.query.id)
			.collection("mensagens")
			.orderBy("data_criacao", "asc")
	);

	const exibirMensagens = () => {
		if (mensagensSnapshot) {
			return mensagensSnapshot.docs.map((mensagem) => (
				<Mensagem
					key={mensagem.id}
					usuario={mensagem.data().usuario}
					mensagem={{
						...mensagem.data(),
						data_criacao: mensagem.data().data_criacao?.toDate().getTime(),
					}}
				/>
			));
		} else {
			return JSON.parse(mensagens).map((mensagem) => (
				<Mensagem
					key={mensagem.id}
					usuario={mensagem.usuario}
					mensagem={mensagem}
				/>
			));
		}
	};

	const enviarMensagem = (e) => {
		e.preventDefault();

		console.log("Função enviar mensagem chamada.");

		// Atualiza  o dado 'último visto' do usuário
		banco_de_dados.collection("usuarios").doc(usuario.uid).set(
			{
				ultimaVisita: firebase.firestore.FieldValue.serverTimestamp(),
			},
			{ merge: true }
		);

		banco_de_dados
			.collection("conversas")
			.doc(router.query.id)
			.collection("mensagens")
			.add({
				data_criacao: firebase.firestore.FieldValue.serverTimestamp(),
				mensagem: input,
				usuario: usuario.email,
				fotoURL: usuario.photoURL,
			});

		definirInput("");

		console.log("Função enviar mensagem finalizada.");
	};

	const emailDestinatario = selecionarEmailDestinatario(
		conversa.usuarios,
		usuario
	);

	return (
		<Container>
			<Cabecalho>
				<Avatar />

				<InformacaoCabecalho>
					<h3>{emailDestinatario}</h3>
					<p>Last seen ...</p>
				</InformacaoCabecalho>

				<IconesCabecalho>
					<IconButton>
						<AttachFileIcon />
					</IconButton>
					<IconButton>
						<MoreVertIcon />
					</IconButton>
				</IconesCabecalho>
			</Cabecalho>

			<MensagensContainer>
				{exibirMensagens()}
				<FimDaMensagem />
			</MensagensContainer>

			<InputContainer>
				<InsertEmoticonIcon />

				<Input value={input} onChange={(e) => definirInput(e.target.value)} />

				<button hidden disabled={!input} type="submit" onClick={enviarMensagem}>
					Send Message
				</button>
				<MicIcon />
			</InputContainer>
		</Container>
	);
}

export default ConversaJanela;

const Container = styled.div``;

const Cabecalho = styled.div`
	position: sticky;
	background-color: white;
	z-index: 100;
	top: 0;
	display: flex;
	padding: 11px;
	height: 80px;
	align-items: center;
	border-bottom: 1px solid whitesmoke;
`;

const InformacaoCabecalho = styled.div`
	margin-left: 15px;
	flex: 1;

	> h3 {
		margin-bottom: 3px;
	}

	> p {
		font-size: 14px;
		color: grey;
	}
`;

const IconesCabecalho = styled.div``;

const MensagensContainer = styled.div`
	padding: 30px;
	background-color: #e5ded8;
	min-height: 90vh;
`;

const FimDaMensagem = styled.div``;

const InputContainer = styled.form`
	display: flex;
	align-items: center;
	padding: 10px;
	position: sticky;
	bottom: 0;
	background-color: white;
	z-index: 100;
`;

const Input = styled.input`
	flex: 1;
	outline: 0;
	border: none;
	border-radius: 10px;
	background-color: whitesmoke;
	padding: 20px;
	margin-left: 15px;
	margin-right: 15px;
`;
