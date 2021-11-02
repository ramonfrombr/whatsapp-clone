import styled from "styled-components";

export const Container = styled.div``;

export const MensagemElemento = styled.p`
	width: fit-content;
	padding: 15px;
	border-radius: 8px;
	margin: 10px;
	min-width: 60px;
	padding-bottom: 26px;
	position: relative;
	text-align: right;
`;

export const Autor = styled(MensagemElemento)`
	margin-left: auto;
	background-color: #dcf8c8;
`;

export const Destinatario = styled(MensagemElemento)`
	background-color: whitesmoke;
	text-align: left;
`;

export const HorarioMensagem = styled.span`
	color: grey;
	padding: 10px;
	font-size: 9px;
	position: absolute;
	bottom: 0;
	text-align: right;
	right: 0;
`;
