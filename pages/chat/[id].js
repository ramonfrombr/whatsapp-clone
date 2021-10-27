import styled from "styled-components";
import Head from "next/head";
import MenuLateral from "../../componentes/menulateral/MenuLateral";
import ConversaJanela from "../../componentes/conversa_janela/ConversaJanela";
import { autenticacao, banco_de_dados } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import selecionarEmailDestinatario from "../../biblioteca/selecionarEmailDestinatario";

function Conversa({ conversa, mensagens }) {
	const [usuario] = useAuthState(autenticacao);

	return (
		<Container>
			<Head>
				<title>
					Chat with {selecionarEmailDestinatario(conversa.usuarios, usuario)}
				</title>
			</Head>

			<MenuLateral />
			<ConversaContainer>
				<ConversaJanela conversa={conversa} mensagens={mensagens} />
			</ConversaContainer>
		</Container>
	);
}

export default Conversa;

// Pré-carrega as mensagens no servidor
export async function getServerSideProps(context) {
	const referencia = banco_de_dados
		.collection("conversas")
		.doc(context.query.id);

	// Preparar as mensagens no servidor
	const respostaMensagens = await referencia
		.collection("mensagens")
		.orderBy("data_envio", "asc")
		.get();

	const mensagens = respostaMensagens.docs
		.map((doc) => ({
			id: doc.id,
			...doc.data(),
		}))
		.map((mensagens) => ({
			...mensagens,
			data_envio: mensagens.data_envio.toDate().getTime(),
		}));

	// Preparar os chats
	const respostaConversa = await referencia.get();
	const conversa = {
		id: respostaConversa.id,
		...respostaConversa.data(),
	};

	return {
		props: {
			mensagens: JSON.stringify(mensagens),
			conversa: conversa,
		},
	};
}

const Container = styled.div`
	display: flex;
`;

const ConversaContainer = styled.div`
	flex: 1;
	overflow: scroll;
	height: 100vh;

	::-webkit-scrollbar {
		display: none;
	}

	-ms-overflow-style: none;

	scrollbar-width: none;
`;
