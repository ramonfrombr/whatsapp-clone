import { AvatarUsuario, Container } from "./ConversaElementos";
import { autenticacao, banco_de_dados } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import selecionarEmailDestinatario from "../../biblioteca/selecionarEmailDestinatario";
import { useRouter } from "next/router";

function Conversa({ id, usuarios }) {
	const router = useRouter();

	const [usuario] = useAuthState(autenticacao);

	const [destinatarioSnapshot] = useCollection(
		banco_de_dados
			.collection("usuarios")
			.where("email", "==", selecionarEmailDestinatario(usuarios, usuario))
	);

	const entrarConversa = () => {
		router.push(`/chat/${id}`);
	};

	const destinatario = destinatarioSnapshot?.docs?.[0]?.data();

	const destinatarioEmail = selecionarEmailDestinatario(usuarios, usuario);

	return (
		<Container onClick={entrarConversa}>
			{destinatario ? (
				<AvatarUsuario src={destinatario?.fotoURL} />
			) : (
				<AvatarUsuario>{destinatarioEmail[0]}</AvatarUsuario>
			)}

			<p>{destinatarioEmail}</p>
		</Container>
	);
}

export default Conversa;
