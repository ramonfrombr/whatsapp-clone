import styled from "styled-components";

import { autenticacao, banco_de_dados } from "../../firebase";

import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";

import { Mensagem } from "../../componentes/mensagem/Mensagem";

import { Avatar, IconButton } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import MicIcon from "@material-ui/icons/Mic";

function ConversaJanela({ conversa, mensagens }) {
	const [usuario] = useAuthState(autenticacao);

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
					key={mensagem.key}
					usuario={mensagem.data().usuario}
					mensagem={{
						...mensagem.data(),
						data_criacao: mensagem.data().data_criacao?.toDate().getTime(),
					}}
				/>
			));
		}
	};

	return (
		<Container>
			<Cabecalho>
				<Avatar />

				<InformacaoCabecalho>
					<h3>Recipient Email</h3>
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
				<Input />
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
