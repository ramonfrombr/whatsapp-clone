import moment from "moment";
import { useAuthState } from "react-firebase-hooks/auth";
import { autenticacao } from "../../firebase";
import {
	Container,
	Autor,
	Destinatario,
	HorarioMensagem,
} from "./MensagemElementos";

function Mensagem({ usuario, mensagem }) {
	const [usuarioConectado] = useAuthState(autenticacao);

	const TipoDaMensagem =
		usuario === usuarioConectado.email ? Autor : Destinatario;

	return (
		<Container>
			<TipoDaMensagem>
				{mensagem.mensagem}
				<HorarioMensagem>
					{mensagem.data_criacao
						? moment(mensagem.data_criacao).format("LT")
						: "..."}
				</HorarioMensagem>
			</TipoDaMensagem>
		</Container>
	);
}

export default Mensagem;
