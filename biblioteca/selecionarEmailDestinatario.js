const selecionarEmailDestinatario = (usuarios, usuarioConectado) =>
	usuarios?.filter(
		(usuarioParaFiltrar) => usuarioParaFiltrar !== usuarioConectado?.email
	)[0];

export default selecionarEmailDestinatario;
