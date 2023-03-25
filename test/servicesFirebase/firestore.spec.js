import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  deleteDoc,
} from 'firebase/firestore';

import {
  accessPost,
  newPost,
  userData,
  editPost,
  likeCounter,
  deslikeCounter,
  deletePost,
} from '../../src/servicesFirebase/firebaseStore';

jest.mock('firebase/firestore', () => ({
  addDoc: jest.fn(),
  collection: jest.fn(),
  getDocs: jest.fn(),
  db: jest.fn(),
  getFirestore: jest.fn(),
  orderBy: jest.fn(),
  query: jest.fn(),
  updateDoc: jest.fn(),
  doc: jest.fn(),
  arrayUnion: jest.fn(),
  arrayRemove: jest.fn(),
}));

describe('firestore', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('teste userData', () => {
    it('deve ser uma função', () => {
      expect(typeof userData).toBe('function');
    });

    it('deve acessar os dados do usuário e guardar na coleção', async () => {
      addDoc.mockResolvedValueOnce();
      const mockCollection = 'collection';
      collection.mockReturnValueOnce(mockCollection);
      const name = 'nome';
      const lastname = 'sobrenome';
      const infosAdd = {
        nome: name,
        sobrenome: lastname,
      };
      await userData(name, lastname);

      expect(addDoc).toHaveBeenCalledTimes(1);
      expect(addDoc).toHaveBeenCalledWith(mockCollection, infosAdd);
      expect(collection).toHaveBeenCalledTimes(1);
      expect(collection).toHaveBeenCalledWith(undefined, 'infos-add');
    });
  });

  describe('Função newPost', () => {
    it('deve ser uma função', () => {
      expect(typeof newPost).toBe('function');
    });

    it('deve criar um post e guardar na coleção', async () => {
      addDoc.mockResolvedValueOnce();
      const mockCollection = 'collection';
      collection.mockReturnValueOnce(mockCollection);

      const dataPostagem = 'xx/xx/xxxx';
      const postagem = 'texto';
      const username = 'usernameTeste';
      const userId = 'usernameteste';
      const like = 0;
      const likesArray = [];
      const posts = {
        userName: username,
        data: dataPostagem,
        post: postagem,
        idUser: userId,
        likes: like,
        likesUsers: likesArray,
      };
      await newPost(postagem, dataPostagem, username, userId);

      expect(addDoc).toHaveBeenCalledTimes(1);
      expect(addDoc).toHaveBeenCalledWith(mockCollection, posts);
      expect(collection).toHaveBeenCalledTimes(1);
      expect(collection).toHaveBeenCalledWith(undefined, 'posts');
    });
  });

  describe('function accessPost', () => {
    it('deve ser uma função', () => {
      expect(typeof accessPost).toBe('function');
    });

    it('deve acessar a publicacao criada e retornar um array', async () => {
      orderBy.mockReturnValue();
      query.mockResolvedValue();
      getDocs.mockResolvedValue([
        {
          id: '1',
          data: () => ({ texto: 'Primeiro post' }),
        },
        {
          id: '2',
          data: () => ({ texto: 'Segundo Post' }),
        },
        {
          id: '3',
          data: () => ({ texto: 'Terceiro Post' }),
        },
      ]);
      const acessoPost = await accessPost();
      expect(acessoPost).toEqual([
        { id: '1', texto: 'Primeiro post' },
        { id: '2', texto: 'Segundo Post' },
        { id: '3', texto: 'Terceiro Post' },
      ]);
      expect(getDocs).toHaveBeenCalledWith(query(collection(undefined, 'posts'), orderBy('data')));
      expect(query).toHaveBeenCalledWith(collection(undefined, 'posts'), orderBy('data'));
    });
  });

  describe('Função editPost', () => {
    it('Deve ser uma função', () => {
      expect(typeof editPost).toBe('function');
    });

    it('Deve editar uma publicação', async () => {
      updateDoc.mockResolvedValue();
      const postId = 'idPost';
      const textArea = 'conteudoPost';
      const posts = {
        post: textArea,
      };
      await editPost(postId, textArea);
      expect(updateDoc).toHaveBeenCalledWith(doc(undefined, 'posts', postId), posts);
    });
  });

  describe('Função contagem de likes', () => {
    it('Deve ser uma função', () => {
      expect(typeof likeCounter).toBe('function');
    });

    it('deve contabilizar a quantidade de curtidas', async () => {
      updateDoc.mockResolvedValue();
      const likePost = 1;
      const postId = 'id-usuer';
      const usernameUser = 'username-user';
      const counterLike = {
        likes: likePost,
        likesUsers: arrayUnion(usernameUser),
      };
      await likeCounter(likePost, postId, usernameUser);
      expect(updateDoc).toHaveBeenCalledWith(doc(undefined, 'posts', postId), counterLike);
    });
  });

  describe('Função contagem de deslikes', () => {
    it('Deve ser uma função', () => {
      expect(typeof deslikeCounter).toBe('function');
    });

    it('Deve descontabilizar a quantidade de curtidas', async () => {
      updateDoc.mockResolvedValue();
      const likePost = 1;
      const postId = 'id-post';
      const usernameUser = 'username-user';
      const counterUnlike = {
        likes: likePost,
        likesUsers: arrayRemove(usernameUser),
      };
      await deslikeCounter(likePost, postId, usernameUser);
      expect(updateDoc).toHaveBeenCalledWith(doc(undefined, 'posts', postId), counterUnlike);
    });
  });

  describe('Função delete', () => {
    it('Deve ser uma função', () => {
      expect(typeof deletePost).toBe('function');
    });

    it('Deve deletar uma publicação', async () => {
      deleteDoc.mockResolvedValue();
      const postId = 'id-post';
      await deletePost(postId);
      expect(deleteDoc).toHaveBeenCalledWith(doc(undefined, 'posts', postId));
    });
  });
});
