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

jest.mock('firebase/firestore');

describe('firestore', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('teste userData', () => {
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
    it('deve acessar a publicacao criada e retornar um array', async () => {
      const mockOrderBy = 'order';
      orderBy.mockReturnValueOnce(mockOrderBy);
      const mockQuery = 'query';
      query.mockReturnValueOnce(mockQuery);
      const mockCollection = 'collection';
      collection.mockReturnValueOnce(mockCollection);
      getDocs.mockResolvedValueOnce([
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
      expect(orderBy).toHaveBeenCalledTimes(1);
      expect(orderBy).toHaveBeenCalledWith('data');
      expect(collection).toHaveBeenCalledTimes(1);
      expect(collection).toHaveBeenCalledWith(undefined, 'posts');
      expect(query).toHaveBeenCalledTimes(1);
      expect(query).toHaveBeenCalledWith(mockCollection, mockOrderBy);
      expect(getDocs).toHaveBeenCalledTimes(1);
      expect(getDocs).toHaveBeenCalledWith(mockQuery);
    });
  });

  describe('Função editPost', () => {
    it('Deve editar uma publicação', async () => {
      updateDoc.mockResolvedValue();
      const mockDoc = 'doc';
      doc.mockReturnValueOnce(mockDoc);
      const postId = 'idPost';
      const textArea = 'conteudoPost';
      const updatedPost = {
        post: textArea,
      };
      await editPost(postId, textArea);
      expect(doc).toHaveBeenCalledTimes(1);
      expect(doc).toHaveBeenCalledWith(undefined, 'posts', postId);
      expect(updateDoc).toHaveBeenCalledTimes(1);
      expect(updateDoc).toHaveBeenCalledWith(mockDoc, updatedPost);
    });
  });

  describe('Função contagem de likes', () => {
    it('deve contabilizar a quantidade de curtidas', async () => {
      updateDoc.mockResolvedValue();
      const mockDoc = 'doc';
      doc.mockReturnValueOnce(mockDoc);
      const mockUnion = 'union';
      arrayUnion.mockReturnValueOnce(mockUnion);
      const likePost = 1;
      const postId = 'id-post';
      const username = 'username';
      const updatedPost = {
        likes: likePost,
        likesUsers: mockUnion,
      };
      await likeCounter(likePost, postId, username);
      expect(doc).toHaveBeenCalledTimes(1);
      expect(doc).toHaveBeenCalledWith(undefined, 'posts', postId);
      expect(updateDoc).toHaveBeenCalledTimes(1);
      expect(updateDoc).toHaveBeenCalledWith(mockDoc, updatedPost);
      expect(arrayUnion).toHaveBeenCalledTimes(1);
      expect(arrayUnion).toHaveBeenCalledWith(username);
    });
  });

  describe('Função contagem de deslikes', () => {
    it('Deve descontabilizar a quantidade de curtidas', async () => {
      updateDoc.mockResolvedValue();
      const mockDoc = 'doc';
      doc.mockReturnValueOnce(mockDoc);
      const mockUnion = 'union';
      arrayRemove.mockReturnValueOnce(mockUnion);
      const likePost = 1;
      const postId = 'id-post';
      const username = 'username';
      const updatedPost = {
        likes: likePost,
        likesUsers: mockUnion,
      };
      await deslikeCounter(likePost, postId, username);
      expect(doc).toHaveBeenCalledTimes(1);
      expect(doc).toHaveBeenCalledWith(undefined, 'posts', postId);
      expect(updateDoc).toHaveBeenCalledTimes(1);
      expect(updateDoc).toHaveBeenCalledWith(mockDoc, updatedPost);
      expect(arrayRemove).toHaveBeenCalledTimes(1);
      expect(arrayRemove).toHaveBeenCalledWith(username);
    });
  });

  describe('Função delete', () => {
    it('Deve deletar uma publicação', async () => {
      const mockDoc = 'doc';
      doc.mockReturnValueOnce(mockDoc);
      deleteDoc.mockResolvedValueOnce();
      const postId = 'id-post';
      await deletePost(postId);
      expect(doc).toHaveBeenCalledTimes(1);
      expect(doc).toHaveBeenCalledWith(undefined, 'posts', postId);
      expect(deleteDoc).toHaveBeenCalledTimes(1);
      expect(deleteDoc).toHaveBeenCalledWith(mockDoc);
    });
  });
});
