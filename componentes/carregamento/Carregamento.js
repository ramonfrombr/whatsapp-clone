import {
	ChasingDots,
	Circle,
	CubeGrid,
	DoubleBounce,
	FadingCircle,
	FoldingCube,
	Pulse,
	RotatingPlane,
	ThreeBounce,
	WanderingCubes,
	Wave,
} from "better-react-spinkit";

function Carregamento() {
	return (
		<center style={{ display: "grid", placeItems: "center", height: "100vh" }}>
			<div>
				<img
					src="https://logodownload.org/wp-content/uploads/2015/04/whatsapp-logo-1.png"
					alt=""
					style={{ marginBottom: 10 }}
					height={200}
				/>

				<Circle color="#3CBC28" size={60} />
			</div>
		</center>
	);
}

export default Carregamento;
