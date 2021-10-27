import styled from "styled-components";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import SearchIcon from "@material-ui/icons/Search";
import { Button } from "@material-ui/core";

export const Container = styled.div`
	flex: 0.45;
	border-right: 1px solid whitesmoke;
	height: 100vh;
	min-width: 300px;
	max-width: 300px;
	overflow-y: scroll;

	::-webkit-scrollbar {
		display: none;
	}

	-ms-overflow-style: none;

	scrollbar-width: none;
`;

export const Cabecalho = styled.div`
	display: flex;
	position: sticky;
	top: 0;
	background-color: white;
	z-index: 1;
	justify-content: space-between;
	align-items: center;
	padding: 15px;
	height: 50px;
	border-bottom: 1px solid whitesmoke;
`;

export const IconesContainer = styled.div``;

export const IconeUsuario = styled.img`
	height: 30px;
	width: 30px;
	border-radius: 50%;

	:hover {
		cursor: pointer;
	}
`;

export const AvatarUsuario = styled(AccountCircleIcon)`
	width: 100px;
	height: 100px;
	cursor: pointer;

	:hover {
		opacity: 0.8;
	}
`;

export const Pesquisa = styled.div`
	display: flex;
	align-items: center;
	padding: 20px;
	border-radius: 2px;
`;

export const PesquisaIcone = styled(SearchIcon)``;

export const PesquisaInput = styled.input`
	outline-width: 0;
	border: none;
	flex: 1;
`;

export const BotaoLateral = styled(Button)`
	width: 100%;

	&&& {
		border-top: 1 solid whitesmoke;
		border-bottom: 1 solid whitesmoke;
	}
`;
