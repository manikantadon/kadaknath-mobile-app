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
  popularity?: number; // For sorting
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
    popularity: 98,
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
    popularity: 85,
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
    popularity: 92,
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
    popularity: 78,
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
    popularity: 45,
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
  { 
    id: '6', 
    name: 'Chicken Lollipop (10 pcs)', 
    price: 850, 
    unit: 'pack', 
    image: 'https://images.unsplash.com/photo-1567622345638-73e6eb82af9b?auto=format&fit=crop&q=80&w=800', 
    category: 'Cuts',
    description: 'Frenched chicken wings shaped into lollipops. Perfect for parties and appetizers.',
    rating: 4.6,
    reviews: 42,
    popularity: 60,
    nutrition: [
      { label: 'Protein', value: '22g' },
      { label: 'Fat', value: '1.2%' },
      { label: 'Flavor', value: 'Intense' },
      { label: 'Iron', value: 'High' },
    ],
    farm: {
      name: 'Sun-Kissed Poultry',
      location: 'Dhar, MP',
      certified: true
    }
  },
  { 
    id: '7', 
    name: 'Drumsticks (Premium)', 
    price: 950, 
    unit: 'kg', 
    image: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&q=80&w=800', 
    category: 'Cuts',
    description: 'Juicy and flavorful drumsticks from free-range Kadaknath chickens. Rich in minerals and protein.',
    rating: 4.8,
    reviews: 88,
    popularity: 82,
    nutrition: [
      { label: 'Protein', value: '23g' },
      { label: 'Iron', value: 'High' },
      { label: 'Collagen', value: 'Rich' },
      { label: 'Fat', value: 'Low' },
    ],
    farm: {
      name: 'Premium Roots Farm',
      location: 'Indore, MP',
      certified: true
    }
  },
  { 
    id: '8', 
    name: 'Kadaknath Ghee (250ml)', 
    price: 1800, 
    unit: 'bottle', 
    image: 'https://images.unsplash.com/photo-1589927986089-35812388d1f4?auto=format&fit=crop&q=80&w=800', 
    category: 'Gifts',
    description: 'Ultra-rare medicinal ghee prepared from Kadaknath nutrients. Used in traditional Ayurvedic preparations.',
    rating: 4.9,
    reviews: 15,
    popularity: 30,
    nutrition: [
      { label: 'Vitamins', value: 'A, D, E, K' },
      { label: 'CLA', value: 'High' },
      { label: 'Purity', value: '100%' },
      { label: 'Benefit', value: 'Healing' },
    ],
    farm: {
      name: 'Green Valley Organic Farm',
      location: 'Jhabua, MP',
      certified: true
    }
  },
  { 
    id: '9', 
    name: 'Bulk Eggs Tray', 
    price: 1100, 
    unit: '30 pcs', 
    image: 'https://images.unsplash.com/photo-1506976785307-8732e854ad03?auto=format&fit=crop&q=80&w=800', 
    category: 'Eggs',
    description: 'Value pack of 30 authentic Kadaknath eggs. Perfect for large families and fitness enthusiasts.',
    rating: 4.7,
    reviews: 56,
    popularity: 70,
    nutrition: [
      { label: 'Protein', value: '180g total' },
      { label: 'Iron', value: 'Extreme' },
      { label: 'Shelf Life', value: '21 days' },
      { label: 'Grade', value: 'AA' },
    ],
    farm: {
      name: 'Sun-Kissed Poultry',
      location: 'Dhar, MP',
      certified: true
    }
  },
];