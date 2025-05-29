import { Donation, Animal, User } from '../types';

// Storage keys
const STORAGE_KEYS = {
  DONATIONS: 'animal_welfare_donations',
  ANIMALS: 'animal_welfare_animals',
  USERS: 'animal_welfare_users',
  AUTH_USER: 'animal_welfare_auth_user',
  SESSION_DATA: 'animal_welfare_session_data',
  NAV_ITEMS: 'navItems', // Add navigation items key
};

// Initialize localStorage with default data structure if needed
export function initializeLocalStorage(): void {
  // Only run in browser environment
  if (typeof window === 'undefined') return;
  
  // Initialize donations
  if (!localStorage.getItem(STORAGE_KEYS.DONATIONS)) {
    localStorage.setItem(STORAGE_KEYS.DONATIONS, JSON.stringify([]));
  }
  
  // Initialize navigation items if they don't exist
  if (!localStorage.getItem(STORAGE_KEYS.NAV_ITEMS)) {
    const defaultNavItems = [
      { label: 'Home', path: '/' },
      { label: 'About', path: '/about' },
      { label: 'Animals', path: '/animals' },
      { label: 'Gaushala', path: '/gaushala' },
      { label: 'Child Welfare', path: '/child-welfare' },
      { label: 'Environmental', path: '/environmental' },
      { label: 'Donate', path: '/donate' }
    ];
    localStorage.setItem(STORAGE_KEYS.NAV_ITEMS, JSON.stringify(defaultNavItems));
  }
  
  // Initialize animals with some default data if none exists
  if (!localStorage.getItem(STORAGE_KEYS.ANIMALS)) {
    const defaultAnimals = [
      {
        id: '1',
        name: 'Max',
        image: '/images/animals/dog1.jpg',
        breed: 'Golden Retriever',
        age: '3 years',
        description: 'Max is a friendly and energetic dog who loves playing fetch and going for walks.',
        story: 'Max was found wandering alone near a highway. After medical care and rehabilitation, he\'s now ready for his forever home.',
        status: 'available'
      },
      {
        id: '2',
        name: 'Luna',
        image: '/images/animals/cat1.jpg',
        breed: 'Domestic Shorthair',
        age: '2 years',
        description: 'Luna is a sweet cat who enjoys cuddles and playing with toys.',
        story: 'Luna was rescued from a hoarding situation. Despite her difficult past, she\'s incredibly affectionate.',
        status: 'available'
      },
      {
        id: '3',
        name: 'Buddy',
        image: '/images/animals/dog2.jpg',
        breed: 'Labrador Mix',
        age: '1 year',
        description: 'Buddy is a playful puppy looking for an active family.',
        story: 'Buddy was surrendered when his previous family moved to a place that didn\'t allow pets.',
        status: 'available'
      }
    ];
    localStorage.setItem(STORAGE_KEYS.ANIMALS, JSON.stringify(defaultAnimals));
  }
  
  // Initialize users
  if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify([]));
  }

  // Initialize session data
  if (!localStorage.getItem(STORAGE_KEYS.SESSION_DATA)) {
    localStorage.setItem(STORAGE_KEYS.SESSION_DATA, JSON.stringify({}));
  }
}

// Generic function to get data from localStorage
function getFromStorage<T>(key: string, defaultValue: T): T {
  if (typeof window === 'undefined') return defaultValue;
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error retrieving ${key} from localStorage:`, error);
    return defaultValue;
  }
}

// Generic function to set data in localStorage
function setToStorage<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error saving ${key} to localStorage:`, error);
  }
}

// Donation related functions
export function saveDonation(donation: Donation): void {
  const donations = getDonations();
  donations.push(donation);
  setToStorage(STORAGE_KEYS.DONATIONS, donations);
}

export function getDonations(): Donation[] {
  return getFromStorage<Donation[]>(STORAGE_KEYS.DONATIONS, []);
}

export function getDonationById(id: string): Donation | undefined {
  const donations = getDonations();
  return donations.find(donation => donation.id === id);
}

export function getRecentDonors(limit = 5): Donation[] {
  const donations = getDonations();
  // Sort by date descending and take the most recent ones
  return [...donations]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);
}

export function getDonationStats(): { total: number; count: number; average: number } {
  const donations = getDonations();
  const total = donations.reduce((sum, donation) => sum + donation.amount, 0);
  return {
    total,
    count: donations.length,
    average: donations.length > 0 ? total / donations.length : 0
  };
}

// Animal related functions
export function getAnimals(): Animal[] {
  return getFromStorage<Animal[]>(STORAGE_KEYS.ANIMALS, []);
}

export function getAnimalById(id: string): Animal | undefined {
  const animals = getAnimals();
  return animals.find(animal => animal.id === id);
}

export function saveAnimal(animal: Animal): void {
  const animals = getAnimals();
  const index = animals.findIndex(a => a.id === animal.id);
  
  if (index >= 0) {
    // Update existing animal
    animals[index] = animal;
  } else {
    // Add new animal
    animals.push(animal);
  }
  
  setToStorage(STORAGE_KEYS.ANIMALS, animals);
}

// User related functions
export function saveUser(user: User): void {
  const users = getFromStorage<User[]>(STORAGE_KEYS.USERS, []);
  const index = users.findIndex(u => u.id === user.id);
  
  if (index >= 0) {
    // Update existing user
    users[index] = user;
  } else {
    // Add new user
    users.push(user);
  }
  
  setToStorage(STORAGE_KEYS.USERS, users);
}

export function getUserInfo(id: string): User | null {
  const users = getFromStorage<User[]>(STORAGE_KEYS.USERS, []);
  return users.find(user => user.id === id) || null;
}

export function getUserByEmail(email: string): User | null {
  const users = getFromStorage<User[]>(STORAGE_KEYS.USERS, []);
  return users.find(user => user.email === email) || null;
}

export function setAuthUser(user: User | null): void {
  setToStorage(STORAGE_KEYS.AUTH_USER, user);
}

export function getAuthUser(): User | null {
  return getFromStorage<User | null>(STORAGE_KEYS.AUTH_USER, null);
}

// Session data functions
export function saveToSession<T>(key: string, value: T): void {
  const sessionData = getSessionData();
  sessionData[key] = value;
  setToStorage(STORAGE_KEYS.SESSION_DATA, sessionData);
}

export function getFromSession<T>(key: string, defaultValue: T = null as unknown as T): T {
  const sessionData = getSessionData();
  return Object.prototype.hasOwnProperty.call(sessionData, key) ? sessionData[key] as T : defaultValue;
}

export function getSessionData(): Record<string, unknown> {
  return getFromStorage<Record<string, unknown>>(STORAGE_KEYS.SESSION_DATA, {});
}

export function clearSessionData(): void {
  setToStorage(STORAGE_KEYS.SESSION_DATA, {});
}