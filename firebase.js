import firebase from "firebase";

const firebaseConfig = {
	apiKey: "AIzaSyBE1OqYyvcoOVeshzbnFRXPIchA6h5Jl_Y",
	authDomain: "whatsapp-clone-97365.firebaseapp.com",
	projectId: "whatsapp-clone-97365",
	storageBucket: "whatsapp-clone-97365.appspot.com",
	messagingSenderId: "801908945261",
	appId: "1:801908945261:web:26ea38a22a0154333e6a64",
};

const app = !firebase.apps.length
	? firebase.initializeApp(firebaseConfig)
	: firebase.app();

const banco_de_dados = app.firestore();

const autenticacao = app.auth();

const provider = new firebase.auth.GoogleAuthProvider();

export { banco_de_dados, autenticacao, provider };
