import {
  addDoc,
  collection,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  postId,
  textArea,
  likePost,
  usernameUser,

} from 'firebase/firestore';
import {
  newPost,
  userData,
  accessPost,
  editPost,
  likeCounter,
  deslikeCounter,
  deletePost,
} from '../../src/servicesFirebase/firebaseStore';

jest.mock('firebase/firestore');

it('deve acessar os dados do usuário e guardar na coleção', async () => {
  // userData
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

it('deve criar um post e guardar na coleção', async () => {
  // newPost
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

it('deve acessar a publicação criada', async () => {
  // accessPost
  getDocs.mockResolvedValueOnce();
  const mockCollection = ['1', '2', '3'];
  collection.mockReturnValueOnce(mockCollection);
  await accessPost();
  expect(getDocs).toHaveBeenCalledTimes(1);
  expect(getDocs).toHaveBeenCalledWith(mockCollection);
  expect(collection).toHaveBeenCalledTimes(1);
  expect(collection).toHaveBeenCalledWith(undefined, 'posts');
});

it('deve editar uma publicação', async () => {
  // edit Post
  updateDoc.mockResolvedValueOnce();
  const mockDoc = 'doc';
  doc.mockReturnValueOnce(mockDoc);
  const posts = {
    post: textArea,
    idPost: postId,
  };

  await editPost(postId, textArea);
  expect(updateDoc).toHaveBeenCalledTimes(1);
  expect(updateDoc).toHaveBeenCalledWith(mockDoc, posts);
  expect(doc).toHaveBeenCalledTimes(1);
  expect(doc).toHaveBeenCalledWith(undefined, 'posts');
});

it('deve curtir uma publicação', async () => {
  // like Post
  updateDoc.mockResolvedValueOnce();
  const mockDoc = 'doc';
  doc.mockReturnValueOnce(mockDoc);
  const posts = {
    likes: likePost,
    post: textArea,
    idPost: postId,
    username: usernameUser,
  };

  await likeCounter(likePost, postId, usernameUser);
  expect(updateDoc).toHaveBeenCalledTimes(1);
  expect(updateDoc).toHaveBeenCalledWith(mockDoc, posts);
  expect(doc).toHaveBeenCalledTimes(1);
  expect(doc).toHaveBeenCalledWith(undefined, 'posts');
});

it('deve descurtir uma publicação', async () => {
  // delsike Post
  updateDoc.mockResolvedValueOnce();
  const mockDoc = 'doc';
  doc.mockReturnValueOnce(mockDoc);
  const posts = {
    likes: likePost,
    post: textArea,
    idPost: postId,
    username: usernameUser,
  };
  await deslikeCounter(likePost, postId, usernameUser);
  expect(updateDoc).toHaveBeenCalledTimes(1);
  expect(updateDoc).toHaveBeenCalledWith(mockDoc, posts);
  expect(doc).toHaveBeenCalledTimes(1);
  expect(doc).toHaveBeenCalledWith(undefined, 'posts');
});

it('deve deletar uma publicação', async () => {
  // delete Post
  deleteDoc.mockResolvedValueOnce();
  const mockDoc = 'doc';
  doc.mockReturnValueOnce(mockDoc);
  // const snap = {

  // };
  await deletePost(postId);
  expect(deleteDoc).toHaveBeenCalledTimes(1);
  expect(deleteDoc).toHaveBeenCalledWith(mockDoc, posts);
  expect(doc).toHaveBeenCalledTimes(1);
  expect(doc).toHaveBeenCalledWith(undefined, 'posts');
});
