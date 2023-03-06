  import Header from "../../components/header/index.js"
  import Footer from "../../components/footer/index.js"

  export default() => {
  const container = document.createElement('div');

  container.append(Header());

  const sectionMain = document.createElement('section');

  const template = ` 
  <main class="display" >
  <div class="feed display">
    <p class="username">Username</p>
    <textarea class="textarea" placeholder="Digite aqui a sua mensagem"></textarea>
    <div class="icons display">
      <button type="button">Postar</button>
    </div>
  </div>   
  </main>
  `;
    
  sectionMain.innerHTML = template;

  container.append(sectionMain);
  container.append(Footer());
  
  return container;
  }


 
