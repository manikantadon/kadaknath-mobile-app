export interface Driver {
  id: string;
  name: string;
  phone: string;
  vehicle: string;
  licensePlate?: string;
  active: boolean;
  currentOrders: number;
  totalDeliveries: number;
  rating: number;
}

let drivers: Driver[] = [
  {
    id: 'driver',
    name: 'Mike Driver',
    phone: '+91 91234 56789',
    vehicle: 'Motorcycle',
    licensePlate: 'MH 01 AB 1234',
    active: true,
    currentOrders: 2,
    totalDeliveries: 156,
    rating: 4.8,
  },
  {
    id: 'driver-2',
    name: 'Suresh Kumar',
    phone: '+91 92345 67890',
    vehicle: 'Scooter',
    licensePlate: 'MH 02 CD 5678',
    active: true,
    currentOrders: 1,
    totalDeliveries: 203,
    rating: 4.9,
  },
  {
    id: 'driver-3',
    name: 'Amit Singh',
    phone: '+91 93456 78901',
    vehicle: 'Bicycle',
    licensePlate: 'N/A',
    active: true,
    currentOrders: 0,
    totalDeliveries: 89,
    rating: 4.6,
  },
  {
    id: 'driver-4',
    name: 'Rahul Verma',
    phone: '+91 94567 89012',
    vehicle: 'Motorcycle',
    licensePlate: 'DL 01 EF 9012',
    active: false,
    currentOrders: 0,
    totalDeliveries: 45,
    rating: 4.3,
  },
];

export const driversApi = {
  getDrivers: (): Driver[] => {
    return [...drivers];
  },

  getDriverById: (id: string): Driver | undefined => {
    return drivers.find((d) => d.id === id);
  },

  getActiveDrivers: (): Driver[] => {
    return drivers.filter((d) => d.active);
  },

  createDriver: (driver: Omit<Driver, 'id'>): Driver => {
    const newDriver: Driver = {
      ...driver,
      id: `driver-${Date.now()}`,
    };
    drivers.push(newDriver);
    return newDriver;
  },

  updateDriver: (id: string, updates: Partial<Driver>): Driver | null => {
    const index = drivers.findIndex((d) => d.id === id);
    if (index === -1) return null;

    drivers[index] = { ...drivers[index], ...updates };
    return drivers[index];
  },

  toggleDriverActive: (id: string): Driver | null => {
    const index = drivers.findIndex((d) => d.id === id);
    if (index === -1) return null;

    drivers[index].active = !drivers[index].active;
    return drivers[index];
  },

  assignOrder: (driverId: string): Driver | null => {
    const index = drivers.findIndex((d) => d.id === driverId);
    if (index === -1) return null;

    drivers[index].currentOrders += 1;
    return drivers[index];
  },

  completeDelivery: (driverId: string): Driver | null => {
    const index = drivers.findIndex((d) => d.id === driverId);
    if (index === -1) return null;

    if (drivers[index].currentOrders > 0) {
      drivers[index].currentOrders -= 1;
      drivers[index].totalDeliveries += 1;
    }
    return drivers[index];
  },
};
