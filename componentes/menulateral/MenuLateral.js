import {
	AvatarUsuario,
	Cabecalho,
	Container,
	IconesContainer,
	IconeUsuario,
	Pesquisa,
	PesquisaIcone,
	PesquisaInput,
	BotaoLateral,
} from "./MenuLateralElementos";

import MoreVertIcon from "@material-ui/icons/MoreVert";
import ChatIcon from "@material-ui/icons/Chat";
import { IconButton } from "@material-ui/core";

import * as ValidadorEmail from "email-validator";
import { autenticacao, banco_de_dados } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import Conversa from "../conversa/Conversa";

function MenuLateral() {
	const [usuario] = useAuthState(autenticacao);

	const referenciaUsuarioConversa = banco_de_dados
		.collection("conversas")
		.where("usuarios", "array-contains", usuario.email);

	const [conversasSnapshot] = useCollection(referenciaUsuarioConversa);

	const criarChat = () => {
		const input = prompt(
			"Please enter an email address for the user you wish to chat with"
		);

		if (!input) return;

		if (
			ValidadorEmail.validate(input) &&
			!conversaJaExiste(input) &&
			input !== usuario.email
		) {
			// Adicionar o chat ao banco de dados caso não exista e seja válido
			banco_de_dados.collection("conversas").add({
				usuarios: [usuario.email, input],
			});
		}
	};

	// Checa se uma conversa com um contato já existe
	const conversaJaExiste = (destinatarioEmail) => {
		!!conversasSnapshot?.docs.find(
			(conversa) =>
				conversa
					.data()
					.usuarios.find((usuario) => usuario === destinatarioEmail)?.length > 0
		);
	};

	return (
		<Container>
			<Cabecalho>
				{usuario.photoURL ? (
					<IconeUsuario
						onClick={() => autenticacao.signOut()}
						src={usuario.photoURL}
					/>
				) : (
					<AvatarUsuario onClick={() => autenticacao.signOut()} />
				)}

				{/* NÃO ESTÁ FUNCIONANDO. ICONE NÃO ESTÁ SENDO SUBSTITUIDO PELA IMAGEM */}

				<IconesContainer>
					<IconButton>
						<ChatIcon />
					</IconButton>

					<IconButton>
						<MoreVertIcon />
					</IconButton>
				</IconesContainer>
			</Cabecalho>

			<Pesquisa>
				<PesquisaIcone />
				<PesquisaInput placeholder="Search in chats" />
			</Pesquisa>

			<BotaoLateral onClick={criarChat}>Start a new chat</BotaoLateral>

			{/* List of chats */}
			{conversasSnapshot?.docs.map((conversa) => (
				<Conversa
					key={conversa.id}
					id={conversa.id}
					usuarios={conversa.data().usuarios}
				/>
			))}
		</Container>
	);
}

export default MenuLateral;
