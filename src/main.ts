import { auth } from "./firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const form = document.getElementById("loginForm") as HTMLFormElement;

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = (document.getElementById("email") as HTMLInputElement).value;
  const senha = (document.getElementById("senha") as HTMLInputElement).value;

  try {
    await signInWithEmailAndPassword(auth, email, senha);
    alert("Login realizado com sucesso!");
    // Redirecionar para uma página principal
    window.location.href = "home.html";
  } catch (error: any) {
    alert("Erro no login: " + error.message);
  }
});
