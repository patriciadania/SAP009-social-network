import register from "../cadastrar/index.js"
import { login } from "../../firebaseInit.js";



export default () => {
    const loginContainer = document.createElement('div');
    loginContainer.classList.add('login-container');

    const content = `
    
        <header class='header-login display'>
            <img src='./imagens/logo3.png' alt='logo-code-girls' class='logo-code-girls'>
            <p> CONECTANDO MULHERES NA TECNOLOGIA </p>
        </header>
        <form class='section-login display'>
            <h1> LOGIN </h1>
            <input type='email' name="email" id="email-login"  placeholder='Email'>
            <input type='password' name="password" id="senha-login" placeholder='Senha'>
            <button class='button-login' id='button-login' type='button'> LOGIN </button>
            <span class='txt-login'> ou faça login com sua conta Google: </span>
            <button type='button' class='button-google'>
                <img class='icon-google' alt='logo-google' src='./imagens/googlelogo.png'>
            </button>
            <hr class='hr-login'> 
            <span class='txt-conta'> ainda não tem conta? </span>
            <button class='button-login' id='button-cadastro' type='button'> CADASTRE-SE </button>


        </form>
   
    `;
    loginContainer.innerHTML = content;

    const buttonRegister = loginContainer.querySelector("#button-cadastro");
    buttonRegister.addEventListener('click', () => {
        window.location.hash = "#Register";
    });

    const buttonLogin = loginContainer.querySelector("#button-login");
    buttonLogin.addEventListener('click', () => {
        const email = loginContainer.querySelector("#email-login");
        const senha = loginContainer.querySelector("#senha-login");
        login(email.value, senha.value);
        console.log(email.value, senha.value);
        alert("login ok");
    });

    const googleButton = loginContainer.querySelector('.button-google');
    googleButton.addEventListener('click', () => {
        alert('botão google ok');
    });

    return loginContainer;
};


