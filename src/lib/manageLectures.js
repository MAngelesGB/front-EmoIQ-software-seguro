import { collection, addDoc, getDocs, getDoc, doc, Timestamp } from 'firebase/firestore';
import { db } from '../config/firebase';
import { formatDate } from './formatDate';

const addDocument = async (collectionName, data) => {
  try {
    const docRef = await addDoc(collection(db, collectionName), data);
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

const getDocuments = async (collectionName) => {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    const documents = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return documents;
  } catch (err) {
    console.error(err);
  }
};

const addLecture = async (collectionName, data) => {
  const ref = await addDocument(collectionName, data);
  return ref;
};

const getLectures = async (emotionalSkill) => {
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
  try {
    const docRef = doc(db, collectionName, lectureId);
    const docSnapshot = await getDoc(docRef);
    if (docSnapshot.exists()) {
      return { id: docSnapshot.id, ...docSnapshot.data() };
    } else {
      console.log('No such document!');
      return null;
    }
  } catch (err) {
    console.error('Error finding lecture:', err);
  }
}

// const findLectureById = async (lectureId) => {
//   try {
//     const parentCollection = collection(db, 'lectures');
//     const parentDocsSnapshot = await getDocs(parentCollection);

//     for (const parentDoc of parentDocsSnapshot.docs) {
//       const nestedCollection = collection(parentDoc.ref, 'docs');
//       const nestedDocRef = doc(nestedCollection, lectureId);
//       const docSnapshot = await getDoc(nestedDocRef);

//       if (docSnapshot.exists) {
//         console.log(`Found nested document in parent document ID: ${parentDoc.id}`);
//         console.log(`Nested document data: `, docSnapshot.data());
//         return docSnapshot.data();  // Or return nestedDoc if you need the whole document reference
//       }
//     }

//     console.log('Nested document not found');
//     return null;
//   } catch (error) {
//     console.error('Error searching document:', error);
//   }
// };

const addSuggestion = async (data) => {
  const ref = await addDocument('suggestions', data);
  return ref;
};

const getSuggestions = async () => {
  const documents = await getDocuments('suggestions');
  return documents;
};

export { addLecture, getLectures, addSuggestion, getSuggestions, findLecture };
