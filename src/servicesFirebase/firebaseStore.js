/* eslint-disable no-console */
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  deleteDoc,
  query,
  orderBy,
} from 'firebase/firestore';
import { app } from '../firebaseInit';

const db = getFirestore(app);

export const userData = (name, lastname) => addDoc(collection(db, 'infos-add'), {
  nome: name,
  sobrenome: lastname,
});

export const newPost = async (postagem, dataPostagem, username, id) => addDoc(collection(db, 'posts'), {
  userName: username,
  data: dataPostagem,
  post: postagem,
  idUser: id,
  likes: 0,
  likesUsers: [],
});

export const accessPost = async () => {
  const messages = [];
  const queryOrder = query(collection(db, 'posts'), orderBy('data'));
  const querySnapshot = await getDocs(queryOrder);
  querySnapshot.forEach((item) => {
    const data = item.data();
    data.id = item.id;
    messages.push(data);
  });
  return messages;
};

export const editPost = (postId, textArea) => updateDoc(doc(db, 'posts', postId), {
  post: textArea,
});

export const likeCounter = async (likePost, postId, usernameUser) => updateDoc(doc(db, 'posts', postId), {
  likes: likePost,
  likesUsers: arrayUnion(usernameUser),
});

export const deslikeCounter = async (likePost, postId, usernameUser) => updateDoc(doc(db, 'posts', postId), {
  likes: likePost,
  likesUsers: arrayRemove(usernameUser),
});

export const deletePost = async (postId) => deleteDoc(doc(db, 'posts', postId));
