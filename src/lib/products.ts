export interface Product {
  id: string;
  name: string;
  price: number;
  unit: string;
  image: string;
  category: string;
  isSubscription?: boolean;
  description?: string;
  nutrition?: { label: string; value: string }[];
  farm?: {
    name: string;
    location: string;
    certified: boolean;
  };
  rating?: number;
  reviews?: number;
}

export const PRODUCTS: Product[] = [
  { 
    id: '1', 
    name: 'Premium Kadaknath Whole', 
    price: 1200, 
    unit: 'kg', 
    image: 'https://images.unsplash.com/photo-1587593810167-a84920ea0781?auto=format&fit=crop&q=80&w=800', 
    category: 'Whole',
    description: 'Our signature Kadaknath chicken is raised in a stress-free environment, fed with organic grains, and aged to perfection for the most authentic flavor and medicinal properties.',
    rating: 4.9,
    reviews: 128,
    nutrition: [
      { label: 'Protein', value: '25g' },
      { label: 'Fat', value: '0.73%' },
      { label: 'Iron', value: 'High' },
      { label: 'Cholesterol', value: 'Low' },
    ],
    farm: {
      name: 'Green Valley Organic Farm',
      location: 'Jhabua, MP',
      certified: true
    }
  },
  { 
    id: '2', 
    name: 'Curry Cut (Skinless)', 
    price: 1350, 
    unit: 'kg', 
    image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&q=80&w=800', 
    category: 'Cuts', 
    isSubscription: true,
    description: 'Perfectly sized curry cuts from premium Kadaknath chicken. High in protein and iron, ideal for traditional recipes.',
    rating: 4.8,
    reviews: 95,
    nutrition: [
      { label: 'Protein', value: '24g' },
      { label: 'Fat', value: '0.75%' },
      { label: 'Iron', value: 'High' },
      { label: 'Cholesterol', value: 'Low' },
    ],
    farm: {
      name: 'Sun-Kissed Poultry',
      location: 'Dhar, MP',
      certified: true
    }
  },
  { 
    id: '3', 
    name: 'Kadaknath Eggs (Case)', 
    price: 450, 
    unit: '12 pcs', 
    image: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?auto=format&fit=crop&q=80&w=800', 
    category: 'Eggs',
    description: 'Nutrient-dense black Kadaknath eggs. Known for their high protein content and traditional health benefits.',
    rating: 4.7,
    reviews: 210,
    nutrition: [
      { label: 'Protein', value: '6g/egg' },
      { label: 'Fat', value: 'Low' },
      { label: 'Iron', value: 'High' },
      { label: 'Amino Acids', value: 'Rich' },
    ],
    farm: {
      name: 'Green Valley Organic Farm',
      location: 'Jhabua, MP',
      certified: true
    }
  },
  { 
    id: '4', 
    name: 'Breast Fillets', 
    price: 1500, 
    unit: 'kg', 
    image: 'https://images.unsplash.com/photo-1602491673980-73aa38de027a?auto=format&fit=crop&q=80&w=800', 
    category: 'Cuts',
    description: 'Lean and tender Kadaknath breast fillets. The healthiest cut for fitness enthusiasts and gourmet cooking.',
    rating: 4.9,
    reviews: 64,
    nutrition: [
      { label: 'Protein', value: '27g' },
      { label: 'Fat', value: '0.65%' },
      { label: 'Iron', value: 'High' },
      { label: 'Cholesterol', value: 'Lowest' },
    ],
    farm: {
      name: 'Premium Roots Farm',
      location: 'Indore, MP',
      certified: true
    }
  },
  { 
    id: '5', 
    name: 'Kadaknath Premium Gift Box', 
    price: 3500, 
    unit: 'box', 
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=800', 
    category: 'Gifts',
    description: 'A luxurious assortment of premium Kadaknath products including whole cuts and gourmet seasoning. Perfect for health-conscious friends and family.',
    rating: 5.0,
    reviews: 12,
    nutrition: [
      { label: 'Protein', value: 'Mixed' },
      { label: 'Contents', value: 'Premium' },
      { label: 'Packaging', value: 'Elite' },
      { label: 'Health', value: 'Maximum' },
    ],
    farm: {
      name: 'Kadaknath Pro Selection',
      location: 'Curated',
      certified: true
    }
  },
];