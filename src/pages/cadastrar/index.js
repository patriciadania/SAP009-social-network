

export default () => {
    const loginContainer = document.createElement('div');
    loginContainer.classList.add('login-container')

    const content = `
    
        <header class='header-login display' >
            <img src='./imagens/logo3.png' alt='logo-code-girls' class='logo-code-girls'>
            <p> CONECTANDO MULHERES NA TECNOLOGIA </p>
        </header>
        <section class='section-login section-register display'>
            <h1> CADASTRE-SE </h1>
            <input type='text' placeholder='Nome'>
            <input type='text' placeholder='Sobrenome'>
            <input type='text' placeholder='Usuário'>
            <input type='text' placeholder='Email'>
            <input type='text' placeholder='Senha'>           
            <button class='button-login' id'=cadastro-firebase' type='button'> CADASTRAR </button>    
             
        </section>
    `;
    loginContainer.innerHTML = content;

    return loginContainer;
};

