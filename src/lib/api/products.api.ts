export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  image: string;
  category: string;
  active: boolean;
  unit: string;
}

let products: Product[] = [
  {
    id: 'kadaknath-whole',
    name: 'Premium Kadaknath Whole',
    description: 'Whole Kadaknath chicken, farm fresh',
    price: 850,
    stock: 50,
    image: '/placeholder.svg',
    category: 'Whole Chicken',
    active: true,
    unit: 'kg',
  },
  {
    id: 'kadaknath-curry',
    name: 'Kadaknath Curry Cut',
    description: 'Curry cut Kadaknath chicken pieces',
    price: 450,
    stock: 100,
    image: '/placeholder.svg',
    category: 'Curry Cut',
    active: true,
    unit: 'kg',
  },
  {
    id: 'kadaknath-eggs',
    name: 'Kadaknath Eggs (6 pcs)',
    description: 'Fresh Kadaknath eggs, pack of 6',
    price: 150,
    stock: 200,
    image: '/placeholder.svg',
    category: 'Eggs',
    active: true,
    unit: 'pack',
  },
  {
    id: 'kadaknath-breast',
    name: 'Kadaknath Breast Fillets',
    description: 'Boneless breast fillets',
    price: 600,
    stock: 30,
    image: '/placeholder.svg',
    category: 'Fillets',
    active: true,
    unit: 'kg',
  },
];

export const productsApi = {
  getProducts: (): Product[] => {
    return [...products];
  },

  getProductById: (id: string): Product | undefined => {
    return products.find((p) => p.id === id);
  },

  getActiveProducts: (): Product[] => {
    return products.filter((p) => p.active);
  },

  createProduct: (product: Omit<Product, 'id'>): Product => {
    const newProduct: Product = {
      ...product,
      id: `prod-${Date.now()}`,
    };
    products.unshift(newProduct);
    return newProduct;
  },

  updateProduct: (id: string, updates: Partial<Product>): Product | null => {
    const index = products.findIndex((p) => p.id === id);
    if (index === -1) return null;

    products[index] = { ...products[index], ...updates };
    return products[index];
  },

  deleteProduct: (id: string): boolean => {
    const index = products.findIndex((p) => p.id === id);
    if (index === -1) return false;

    products.splice(index, 1);
    return true;
  },

  toggleProductActive: (id: string): Product | null => {
    const index = products.findIndex((p) => p.id === id);
    if (index === -1) return null;

    products[index].active = !products[index].active;
    return products[index];
  },
};
