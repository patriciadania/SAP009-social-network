// import header from '../../components/header/index.js';
import { createUser } from '../../servicesFirebase/firebaseAuth.js';
import { userData } from '../../servicesFirebase/firebaseStore.js';
// import {changeName } from '../../components/header/index.js' ;

export default () => {
  const loginContainer = document.createElement('div');
  loginContainer.classList.add('login-container');

  const content = `
    
    <header class='header-login display' >
        <img src='./imagens/logo3.png' alt='logo-code-girls' class='logo-code-girls'>
        <p> CONECTANDO MULHERES NA TECNOLOGIA </p>
    </header>
    <img class='girl-login' src='../../imagens/girlRegister.svg' alt='Desenho-de-desenvolvedora'>
    <form class='section-login section-register display'>
        <h1> CADASTRE-SE </h1>
        <input type='text' placeholder='Nome' id='nome-fulana'>
        <input type='text' placeholder='Sobrenome' id='sobrenome-fulana'>
        <input type='text' placeholder='Usuário' id='usuario-fulana'>
        <input type='email' placeholder='Email' id='email-cadastro'>
        <input type='password' placeholder='Senha' id='senha-cadastro'>           
        <button class='button-login' id='cadastro-firebase' type='button' > CADASTRAR </button>          
    </form>
    `;
  loginContainer.innerHTML = content;

  const register = loginContainer.querySelector('#cadastro-firebase');
  register.addEventListener('click', () => {
    const nome = loginContainer.querySelector('#nome-fulana');
    const sobrenome = loginContainer.querySelector('#sobrenome-fulana');
    const usuario = loginContainer.querySelector('#usuario-fulana');
    const email = loginContainer.querySelector('#email-cadastro');
    const senha = loginContainer.querySelector('#senha-cadastro');
    if (usuario.value === '' || nome.value === '' || sobrenome.value === '') {
      alert('Por favor, preencha todos os campos.');
    } else {
      // const emailfulana = loginContainer.querySelector('#email-cadastro');
      userData(nome.value, sobrenome.value, usuario.value, email.value);
      createUser(email.value, senha.value, nome.value, sobrenome.value, usuario.value)
        .then(() => {
          window.location.hash = '#login';
        })
        .catch((error) => {
          // eslint-disable-next-line no-console, no-alert
          console.error(error.message);
          if (error.message === 'Firebase: Error (auth/invalid-email).') {
            alert('Email inválido!');
          } else if (error.message === 'index.js?t=1679521157275:46 Firebase: Error (auth/internal-error).') {
            alert('Senha inválida');
          }
          alert('Erro ao cadastrar usuário, verifique os campos preenchidos!');
        });
    }
  });
  // console.log(email.value, senha.value);
  // alert('ok!');
  return loginContainer;
};
