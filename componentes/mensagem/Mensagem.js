import { Container } from "./MensagemElementos";

function Mensagem(usuario, mensagem) {
	return (
		<Container>
			<p>{mensagem}</p>
		</Container>
	);
}

export default Mensagem;
