import {
  accessPost, editPost, likeCounter, deslikeCounter, deletePost,
} from '../../servicesFirebase/firebaseStore.js';
import { Auth } from '../../servicesFirebase/firebaseAuth.js';

export default (timelinePost) => {
  accessPost().then((allPosts) => {
    allPosts.forEach((post) => {
      const container = document.createElement('div');
      container.classList.add('timeline');
      let countLikes = post.likesUsers.length;
      const template = `
        <div class='feed display'>
          <div class='display userNameDate'>
            <p class='username'> ${post.userName} </p>
            <p class='date'> ${post.data} </p>
          </div>
          <textarea disabled class='textarea'> ${post.post} </textarea>
          <div class='icons display'>
            <div id='like' class='display'>
              <svg id='heart' xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-heart' viewBox='0 0 16 16'>
                  <path d='m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z'/>
              </svg>
              <svg id='heart-fill' class='hidden' xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart-fill" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
              </svg>
              <span id='likes-counter'>${countLikes}</span>
            </div>
            <div id='edit'>
              <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-pencil-square' viewBox='0 0 16 16'>
                  <path d='M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z'/>
                  <path fill-rule='evenodd' d='M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z'/>
              </svg>
            </div>
            <div id='delete'>
              <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-trash3' viewBox='0 0 16 16'>
                  <path d='M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z'/>
              </svg>
            </div>
            <button id='btn-salvar' class='hidden'> Salvar </button>
          </div>
        </div> 
      `;

      container.innerHTML = template;
      const btnDelete = container.querySelector('#delete');
      const btnLike = container.querySelector('#like');
      const heart = container.querySelector('#heart');
      const heartFill = container.querySelector('#heart-fill');
      const likesCounterTela = container.querySelector('#likes-counter');
      const postFeed = container.querySelector('.feed');
      const likesArray = post.likesUsers;

      if (likesArray.includes(Auth.currentUser.displayName)) {
        heart.classList.add('hidden');
        heartFill.classList.remove('hidden');
      }

      heart.addEventListener('click', () => {
        heart.classList.add('hidden');
        heartFill.classList.remove('hidden');
        countLikes += 1;
        likesCounterTela.innerHTML = countLikes;
        // const liked = countLikes;
        likeCounter(post.id, Auth.currentUser.displayName);
      });

      heartFill.addEventListener('click', () => {
        heart.classList.remove('hidden');
        heartFill.classList.add('hidden');
        countLikes -= 1;
        likesCounterTela.innerHTML = countLikes;
        // const deslike = countLikes;
        deslikeCounter(post.id, Auth.currentUser.displayName);
      });

      const btnEditPost = container.querySelector('#edit');
      const textArea = container.querySelector('.textarea');
      const btnSavePost = container.querySelector('#btn-salvar');
      if (post.idUser !== Auth.currentUser.uid) {
        btnEditPost.setAttribute('class', 'hidden');
        btnDelete.setAttribute('class', 'hidden');
      }
      btnEditPost.addEventListener('click', () => {
        textArea.removeAttribute('disabled');
        btnSavePost.removeAttribute('class');
        btnDelete.setAttribute('class', 'hidden');
        btnLike.setAttribute('class', 'hidden');
        btnEditPost.setAttribute('class', 'hidden');
      });

      btnSavePost.addEventListener('click', () => {
        editPost(post.id, textArea.value);
        btnDelete.removeAttribute('class');
        btnLike.removeAttribute('class');
        btnEditPost.removeAttribute('class');
        btnSavePost.setAttribute('class', 'hidden');
        textArea.setAttribute('disabled', 'disabled');
      });

      btnDelete.addEventListener('click', (e) => {
        e.preventDefault();
        if (window.confirm('Tem certeza de que deseja excluir a publicação?')) { //eslint-disable-line
          deletePost(post.id)
            .then(() => {
              postFeed.remove();
            });
        }
      });

      timelinePost.appendChild(container);
    });
  });
};
