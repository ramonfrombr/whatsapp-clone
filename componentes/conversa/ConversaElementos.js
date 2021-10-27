import { Avatar } from "@material-ui/core";
import styled from "styled-components";

export const Container = styled.div`
	display: flex;
	align-items: center;
	cursor: pointer;
	padding: 15px;
	word-break: break-word;

	:hover {
		background-color: #e9eaeb;
	}
`;

export const AvatarUsuario = styled(Avatar)`
	margin: 5px;
	margin-right: 15px;
`;
