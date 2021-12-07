import {
  collection,
  getDocs,
  query,
  where,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';
import { auth, db } from './firebase';
import { WishlistItem } from './types';

export const getWishlistsForUser = async () => {
  const userId = auth.currentUser?.uid;

  console.log('userId', auth.currentUser);
  if (!userId) {
    return [];
  }

  const wishlistCol = collection(db, 'wishlists');
  const wishlistQuery = query(wishlistCol, where('userId', '==', userId));

  const snapshot = await getDocs(wishlistQuery);
  const data = snapshot.docs.map(async (doc) => {
    const itemsRef = collection(db, 'wishlists', doc.id, 'items');
    const itemsSnapshot = await getDocs(itemsRef);

    const items = itemsSnapshot.docs.map((itemDoc) => {
      return {
        id: itemDoc.id,
        ...itemDoc.data(),
      };
    });

    return {
      ...doc.data(),
      id: doc.id,
      items,
    };
  });

  const result = await Promise.all(data);
  return result;
};

export const addNewItemToList = async (listId: string, item: WishlistItem) => {
  const userId = auth.currentUser?.uid;

  if (!userId) {
    return;
  }

  const ref = await addDoc(collection(db, 'wishlists', listId, 'items'), item);
  return ref.id;
};

export const updateWishlistName = async (listId: string, name: string) => {
  return updateDoc(doc(db, 'wishlists', listId), { title: name });
};

export const deleteItemFromList = async (listId: string, itemId: string) => {
  return deleteDoc(doc(db, 'wishlists', listId, 'items', itemId));
};

export const updateItemInList = async (listId: string, item: WishlistItem) => {
  return updateDoc(doc(db, 'wishlists', listId, 'items', item.id), {
    title: item.title,
  });
};

export const addNewWishlist = async (data: { title: string }) => {
  const userId = auth.currentUser?.uid;

  if (!userId) {
    return;
  }

  const item = {
    title: data.title,
    userId,
  };

  const ref = await addDoc(collection(db, 'wishlists'), item);
  return {
    id: ref.id,
    ...item,
  };
};

export const deleteWishlist = async (listId: string) => {
  return deleteDoc(doc(db, 'wishlists', listId));
};
