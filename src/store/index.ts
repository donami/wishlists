import { InjectionKey } from 'vue';
import { createStore, Store, useStore as baseUseStore } from 'vuex';
import {
  addNewItemToList,
  addNewWishlist,
  deleteItemFromList,
  deleteWishlist,
  getWishlistsForUser,
  updateItemInList,
  updateWishlistName,
} from '../api';
// import wishlistModule from './modules/wishlist';

export interface WishlistData {
  id: string;
  title: string;
  items: WishlistItem[];
}

interface WishlistItem {
  id: string;
  title: string;
  userId: string;
}

// define your typings for the store state
export interface State {
  count: number;
  wishlists: WishlistData[];
  loading: boolean;
  loaded: boolean;
  selectedId: string | null;
  // wishlists: WishlistItem[];
}

// define injection key
export const key: InjectionKey<Store<State>> = Symbol();

const getList = (listId: string, lists: WishlistData[]) => {
  const indexOfList = lists.findIndex((item) => item.id === listId);

  return {
    indexOfList,
    list: lists[indexOfList] || null,
  };
};

const mutationTypes = {
  CREATE_WISHLIST_REQUEST: 'CREATE_WISHLIST_REQUEST',
  CREATE_WISHLIST_SUCCESS: 'CREATE_WISHLIST_SUCCESS',
  CREATE_WISHLIST_FAILURE: 'CREATE_WISHLIST_FAILURE',
  DELETE_WISHLIST_REQUEST: 'DELETE_WISHLIST_REQUEST',
  DELETE_WISHLIST_SUCCESS: 'DELETE_WISHLIST_SUCCESS',
  DELETE_WISHLIST_FAILURE: 'DELETE_WISHLIST_FAILURE',
};

export const store = createStore<State>({
  state: {
    count: 0,
    wishlists: [],
    loading: false,
    loaded: false,
    selectedId: null,
    // wishlists: [
    //   {
    //     title: 'initial wishitem',
    //     userId: '123213',
    //   },
    // ],
  },
  mutations: {
    setItems(state, payload) {
      state.wishlists = payload.lists;
    },
    fetchWishlistsRequest(state) {
      state.loading = true;
      state.loaded = false;
    },
    fetchWishlistsSuccess(state, payload) {
      state.loading = false;
      state.loaded = true;
      state.wishlists = payload.lists;
    },
    fetchWishlistsFailure(state) {
      state.loading = false;
    },
    setSelectedId(state, payload) {
      state.selectedId = payload.id;
    },
    addItemRequest(state, payload) {
      state.loading = true;
    },
    addItemSuccess(state, payload: { listId: string; item: WishlistItem }) {
      const indexOfList = state.wishlists.findIndex(
        (item) => item.id === payload.listId
      );

      if (indexOfList === -1) {
        return;
      }

      state.wishlists = [
        ...state.wishlists.slice(0, indexOfList),
        {
          ...state.wishlists[indexOfList],
          items: [...state.wishlists[indexOfList].items, payload.item],
        },
        ...state.wishlists.slice(indexOfList + 1),
      ];
      state.loading = false;
    },
    addItemFailure(state, payload) {
      state.loading = false;
    },
    updateWishlistNameRequest(state) {
      state.loading = true;
    },
    updateWishlistNameSuccess(
      state,
      payload: { name: string; listId: string }
    ) {
      state.loading = false;
      const { list, indexOfList } = getList(payload.listId, state.wishlists);

      if (indexOfList === -1) {
        return;
      }

      state.wishlists = [
        ...state.wishlists.slice(0, indexOfList),
        {
          ...list,
          title: payload.name,
        },
        ...state.wishlists.slice(indexOfList + 1),
      ];
    },
    updateWishlistNameFailure(state) {
      state.loading = false;
    },
    deleteItemFromListRequest(state) {
      state.loading = true;
    },
    deleteItemFromListSuccess(
      state,
      payload: { listId: string; itemId: string }
    ) {
      state.loading = false;
      const { list, indexOfList } = getList(payload.listId, state.wishlists);

      if (indexOfList === -1) {
        return;
      }

      const newItems = list.items.filter((item) => item.id !== payload.itemId);
      state.wishlists = [
        ...state.wishlists.slice(0, indexOfList),
        {
          ...list,
          items: [...newItems],
        },
        ...state.wishlists.slice(indexOfList + 1),
      ];
    },
    deleteItemFromListFailure(state) {
      state.loading = false;
    },
    updateItemInListRequest(state) {
      state.loading = true;
    },
    updateItemInListSuccess(
      state,
      payload: { listId: string; item: WishlistItem }
    ) {
      state.loading = false;
      const { list, indexOfList } = getList(payload.listId, state.wishlists);

      if (indexOfList === -1) {
        return;
      }

      const newItems = list.items.map((other) => {
        if (other.id === payload.item.id) {
          return {
            ...other,
            ...payload.item,
          };
        }
        return other;
      });

      state.wishlists = [
        ...state.wishlists.slice(0, indexOfList),
        {
          ...list,
          items: [...newItems],
        },
        ...state.wishlists.slice(indexOfList + 1),
      ];
    },
    updateItemInListFailure(state) {
      state.loading = false;
    },
    [mutationTypes.CREATE_WISHLIST_REQUEST](state) {
      state.loading = true;
    },
    [mutationTypes.CREATE_WISHLIST_SUCCESS](
      state,
      payload: { data: WishlistData }
    ) {
      state.wishlists = [...state.wishlists, payload.data];

      state.loading = false;
    },
    [mutationTypes.CREATE_WISHLIST_FAILURE](state) {
      state.loading = false;
    },
    [mutationTypes.DELETE_WISHLIST_REQUEST](state) {
      state.loading = true;
    },
    [mutationTypes.DELETE_WISHLIST_SUCCESS](
      state,
      payload: { listId: string }
    ) {
      state.loading = false;
      const { indexOfList } = getList(payload.listId, state.wishlists);

      state.wishlists = [
        ...state.wishlists.slice(0, indexOfList),
        ...state.wishlists.slice(indexOfList + 1),
      ];
    },
    [mutationTypes.DELETE_WISHLIST_FAILURE](state) {
      state.loading = false;
    },
  },
  actions: {
    selectWishlist({ commit }, payload) {
      commit('setSelectedId', { id: payload.id });
    },
    addItemToList({ commit }, payload) {
      commit('addItemRequest');

      addNewItemToList(payload.listId, payload.item)
        .then((addedId) => {
          commit('addItemSuccess', {
            item: {
              id: addedId,
              ...payload.item,
            },
            listId: payload.listId,
          });
        })
        .catch((e) => {
          commit('addItemFailure');
        });
    },
    fetchWishlists({ commit, state }) {
      if (state.loaded) {
        return;
      }

      commit('fetchWishlistsRequest');

      getWishlistsForUser()
        .then((lists) => {
          commit('fetchWishlistsSuccess', { lists });
        })
        .catch((e) => {
          commit('fetchWishlistsFailure', { error: 'Something went wrong' });
        });
    },
    updateWishlistName({ commit }, payload: { listId: string; name: string }) {
      commit('updateWishlistNameRequest');

      updateWishlistName(payload.listId, payload.name)
        .then((response) => {
          commit('updateWishlistNameSuccess', payload);
        })
        .catch(() => {
          commit('updateWishlistNameFailure');
        });
    },
    deleteItemFromList(
      { commit },
      payload: { listId: string; itemId: string }
    ) {
      commit('deleteItemFromListRequest');

      deleteItemFromList(payload.listId, payload.itemId)
        .then(() => {
          commit('deleteItemFromListSuccess', payload);
        })
        .catch(() => {
          commit('deleteItemFromListFailure');
        });
    },
    updateItemInList(
      { commit },
      payload: { listId: string; item: WishlistItem }
    ) {
      commit('updateItemInListRequest');

      updateItemInList(payload.listId, payload.item)
        .then(() => {
          commit('updateItemInListSuccess', payload);
        })
        .catch((e) => {
          commit('updateItemInListFailure');
        });
    },
    createWishlist({ commit }, payload: { title: string }) {
      commit(mutationTypes.CREATE_WISHLIST_REQUEST);

      addNewWishlist(payload)
        .then((response) => {
          if (!response) {
            return;
          }
          const item: WishlistData = {
            id: response.id,
            title: response.title,
            items: [],
          };
          commit(mutationTypes.CREATE_WISHLIST_SUCCESS, { data: item });
        })
        .catch(() => {
          commit(mutationTypes.CREATE_WISHLIST_FAILURE);
        });
    },
    deleteWishlist({ commit }, payload: { listId: string }) {
      commit(mutationTypes.DELETE_WISHLIST_REQUEST);

      deleteWishlist(payload.listId)
        .then(() => {
          commit(mutationTypes.DELETE_WISHLIST_SUCCESS, payload);
        })
        .catch(() => {
          commit(mutationTypes.DELETE_WISHLIST_FAILURE);
        });
    },
  },
  getters: {
    getSelectedList(state) {
      if (!state.selectedId) {
        return null;
      }
      const selected = state.wishlists.find(
        (list) => list.id === state.selectedId
      );

      return selected || null;
    },
    getIsLoading(state) {
      return state.loading;
    },
  },
});

export function useStore() {
  return baseUseStore(key);
}
// export interface StoreType {
//   wishlist: typeof wishlistModule;
// }

// export default new Store<StoreType>({});

// // define your typings for the store state
// export interface State {
//   count: number;
// }

// // define injection key
// export const key: InjectionKey<Store<State>> = Symbol();

// export default createStore<State>({
//   state: {
//     count: 1,
//   },
//   mutations: {},
//   actions: {},
//   modules: {
//     wishlist: wishlistModule,
//   },
// });
