import { doc, setDoc, deleteDoc, getDocs, collection, onSnapshot, addDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

export const subscribeToItems = (uid, callbackFn) => {
    const userCollectionRef = collection(db, 'users', uid, 'items');
    const unsubscribe = onSnapshot(userCollectionRef, (querySnapshot) => {
        const items = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        callbackFn(items);
    }, (error) => {
        console.error("Error listening to items: ", error);
    });
    return unsubscribe;
};

export const addItem = async () => {

};

export const updateItem = async () => {

};

export const deleteItem = async () => {

};

export const toggleFavorite = async () => {

};