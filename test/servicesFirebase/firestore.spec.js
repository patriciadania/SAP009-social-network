import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
  doc,
  updateDoc,
  // deleteDoc,
  // postId,
  // textArea,
  // likePost,
  // usernameUser,
} from 'firebase/firestore';
import { describe } from 'yargs';

import {
  accessPost,
  newPost,
  userData,
  // accessPost,
  editPost,
//   // likeCounter,
//   // deslikeCounter,
//   // deletePost,
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
});
