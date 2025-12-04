export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: 'Anime' | 'Filmes' | 'Séries' | 'Games' | 'HQs' | 'Tecnologia';
  tags: string[];
  sizes: string[];
  images: string[];
  rating: number;
  reviews: number;
  inStock: boolean;
  featured: boolean;
  newArrival: boolean;
}

export interface CartItem extends Product {
  selectedSize: string;
  quantity: number;
}

export type SortOption = 'relevance' | 'price-asc' | 'price-desc' | 'newest';

export interface FilterState {
  category: string;
  priceRange: [number, number];
  search: string;
}