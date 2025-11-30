import { auth, db } from "./firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

const form = document.getElementById("cadastroForm") as HTMLFormElement;

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const nome = (document.getElementById("nome") as HTMLInputElement).value;
  const email = (document.getElementById("email") as HTMLInputElement).value;
  const senha = (document.getElementById("senha") as HTMLInputElement).value;

  try {
    const cred = await createUserWithEmailAndPassword(auth, email, senha);
    const user = cred.user;

    await updateProfile(user, { displayName: nome });

    await setDoc(doc(db, "usuarios", user.uid), {
      nome,
      email,
      criadoEm: new Date().toISOString(),
    });

    alert("Cadastro realizado com sucesso!");
    window.location.href = "index.html";
  } catch (error: any) {
    let mensagem = "Erro no cadastro: ";

    // erros mais comuns
    switch (error.code) {
      case "auth/email-already-in-use":
        mensagem += "Esse usuário já existe.";
        break;
      case "auth/invalid-email":
        mensagem += "O email informado é inválido.";
        break;
      case "auth/weak-password":
        mensagem += "A senha deve ter pelo menos 6 caracteres.";
        break;
      default:
        mensagem += "Ocorreu um erro inesperado. Tente novamente.";
        console.error("Erro detalhado:", error);
    }

    alert(mensagem);
  }
});
