import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  Timestamp,
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { formatDate } from './formatDate';

const addDocument = async (collectionName, data) => {
  const docRef = await addDoc(collection(db, collectionName), data);
  return docRef;
};

const getDocuments = async collectionName => {
  const querySnapshot = await getDocs(collection(db, collectionName));
  const documents = querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));
  return documents;
};

const addLecture = async (collectionName, data) => {
  const ref = await addDocument(collectionName, data);
  return ref;
};

const getLectures = async emotionalSkill => {
  const documents = await getDocuments(emotionalSkill);
  documents.forEach(doc => {
    let date;
    if (doc.lastModified instanceof Timestamp) {
      date = doc.lastModified.toDate();
    } else if (doc.lastModified instanceof Date) {
      date = doc.lastModified;
    }

    if (date) {
      const dateString = formatDate(date);
      doc.lastModified = dateString;
    }
  });
  return documents;
};

const findLecture = async (collectionName, lectureId) => {
  const docRef = doc(db, collectionName, lectureId);
  const docSnapshot = await getDoc(docRef);
  if (docSnapshot.exists()) {
    let date;
    const doc = docSnapshot.data();
    if (doc.lastModified instanceof Timestamp) {
      date = doc.lastModified.toDate();
    } else if (doc.lastModified instanceof Date) {
      date = doc.lastModified;
    }

    if (date) {
      const dateString = formatDate(date);
      doc.lastModified = dateString;
    }
    return { id: docSnapshot.id, ...doc };
  } else {
    return null;
  }
};

const addSuggestion = async data => {
  const ref = await addDocument('suggestions', data);
  return ref;
};

const getSuggestions = async () => {
  const documents = await getDocuments('suggestions');
  return documents;
};

export { addLecture, getLectures, addSuggestion, getSuggestions, findLecture };
