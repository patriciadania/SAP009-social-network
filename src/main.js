// import { myFunction } from './pages/index.js';
// myFunction();

import home from './pages/home/index.js';
import publicar from './pages/publicar/index.js';
import login from './pages/login/index.js';
import register from './pages/cadastrar/index.js';

const main = document.querySelector('#root');

const init = () => {
  window.addEventListener('hashchange', () => {
    main.innerHTML = " ";
    switch(window.location.hash){
      case "#Home":
        main.appendChild(home());
        break;
      case "#Publicar":
        main.appendChild(publicar());
        break;
      case "#Login":
        main.appendChild(login());
        break;
      case "#Register":
        main.appendChild(register());
    }
  });
}


window.addEventListener('load', () => {
  main.appendChild(home());
  init(); 
  
});


