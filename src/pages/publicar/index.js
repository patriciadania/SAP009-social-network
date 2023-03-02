// aqui exportaras las funciones que necesites

export const myFunction = () => {
  // aqui tu codigo
  console.log('Hola mundo!');
};

export default() => {
  const container = document.createElement('div');
  const template = ` 
  <div class="feed display">
    <p class="username">Username</p>
    <textarea class="textarea" placeholder="Digite aqui a sua mensagem"></textarea>
    <div class="icons display">
      <button type="button">Postar</button>
    </div>
  </div>   
  `;

  container.innerHTML = template;
  return container;
}


 
