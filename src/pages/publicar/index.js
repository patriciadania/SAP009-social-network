import Header from '../../components/header/index.js';
import Footer from '../../components/footer/index.js';
import { newPost } from '../../servicesFirebase/firebaseStore.js';
import { Auth } from '../../servicesFirebase/firebaseAuth';

export default () => {
  const container = document.createElement('div');
  container.append(Header());

  const sectionMain = document.createElement('section');
  sectionMain.classList.add('section-main2');

  const template = ` 
  <main class='display' >
  <div class='feed display'>
    <p class='username' id='username' >${Auth.currentUser.displayName}</p>
    <textarea class='textarea' placeholder='Digite aqui a sua mensagem'></textarea>
    <div class='icons display'>
      <button type='button' id='botao-postar' class='botao-postar'>Postar</button>
    </div>
  </div>   
  </main>
  `;
  sectionMain.innerHTML = template;

  container.append(sectionMain);
  container.append(Footer());
  class UserException {
    constructor(message) {
      this.message = message;
      this.name = 'UserException';
    }
  }
  const text = container.querySelector('.textarea');
  const buttonPost = container.querySelector('#botao-postar');
  buttonPost.addEventListener('click', () => {
    if (text.value !== '') {
      const timeElapsed = Date.now();
      const today = new Date(timeElapsed);
      const dataPostagem = today.toLocaleDateString();
      const username = Auth.currentUser.displayName;
      const idUser = Auth.currentUser.uid;
      newPost(text.value, dataPostagem, username, idUser);
      try {
        if (text.value === '') {
          const mensagemError = 'Por favor, escreva algo para publicar!';
          throw new UserException(mensagemError);
        }
        alert('Publicação efetuada com sucesso!');
        window.location.hash = '#Home';
      } catch (error) {
        alert(error.message);
      }
    } else {
      alert('Por favor, escreva algo para publicar!');
    }
  });
  return container;
};
