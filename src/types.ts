export interface WishlistItem {
  id: string;
  title: string;
  price?: number;
  url?: string;
}

// export interface LocalWishlistItem extends Omit<WishlistItem, 'id'> {}

export type LocalWishlistItem = Omit<WishlistItem, 'id'>;
