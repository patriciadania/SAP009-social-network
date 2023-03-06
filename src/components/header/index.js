
export default () => {
const headerContainer = document.createElement('header');
headerContainer.classList.add("display");

const headerContent = `
    <section class="display section-topo">
      <img class="logo" src="./imagens/logo3.png" alt="logo-code-girls">
      <nav class="nav">

        <div class="container">
          <div class="btn">
            <div class="btn-left"></div>
            <div class="btn-right"></div>
          </div>
        </div> 

        <ul class="display">
          <li> 
            <a href="#Home">Home</a> 
          </li>
          <li> 
            <a href="#Publicar">Publicar</a> 
          </li>
          <li> 
            <a href="#Sair">Login</a> 
          </li>
        </ul>
      </nav>
  </section>
  <hr class="hr">
  </div>
  <p class="user-name"> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
    <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
  </svg> <span id="user-name">Fulana</span></p>
`;

    headerContainer.innerHTML += headerContent;

    //responsividade
    const btn = headerContainer.querySelector('.container');
    btn.addEventListener('click', () => {
    const nav = headerContainer.querySelector('.nav');
    nav.classList.toggle('active');
    });

    return headerContainer;
}





