

// Mock data for ticket listings
export const mockTickets= [
  {
    id: '1',
    sellerId: 'user1',
    eventName: 'Spartan Race World Championship',
    raceType: 'OCR',
    eventDateTime: '2025-12-10T09:00:00Z',
    location: {
      city: 'Sparta',
      country: 'Greece',
      isOnline: false
    },
    price: {
      currency: 'USD',
      amount: 250
    },
    ticketType: 'VIP',
    sellerNotes: 'Prime viewing location and athlete meet-and-greet included.',
    imageUrl: '/placeholder.svg',
    status: 'live',
    createdAt: '2025-04-15T14:23:00Z',
    updatedAt: '2025-04-15T14:23:00Z'
  },
  {
    id: '2',
    sellerId: 'user2',
    eventName: 'Hyrox World Series - London',
    raceType: 'Hyrox',
    eventDateTime: '2025-05-23T10:30:00Z',
    location: {
      city: 'London',
      country: 'UK',
      isOnline: false
    },
    price: {
      currency: 'GBP',
      amount: 180
    },
    ticketType: 'Standard',
    sellerNotes: 'Cannot attend due to injury. Official ticket with all benefits.',
    imageUrl: '/placeholder.svg',
    status: 'live',
    createdAt: '2025-04-10T09:15:00Z',
    updatedAt: '2025-04-10T09:15:00Z'
  },
  {
    id: '3',
    sellerId: 'user3',
    eventName: 'Berlin Marathon',
    raceType: 'Marathon',
    eventDateTime: '2025-09-28T08:00:00Z',
    location: {
      city: 'Berlin',
      country: 'Germany',
      isOnline: false
    },
    price: {
      currency: 'EUR',
      amount: 120
    },
    ticketType: 'Standard',
    sellerNotes: '',
    imageUrl: '/placeholder.svg',
    status: 'live',
    createdAt: '2025-03-28T11:45:00Z',
    updatedAt: '2025-03-28T11:45:00Z'
  },
  {
    id: '4',
    sellerId: 'user4',
    eventName: 'CrossFit Games',
    raceType: 'Crossfit',
    eventDateTime: '2025-08-15T13:00:00Z',
    location: {
      city: 'Madison',
      country: 'USA',
      isOnline: false
    },
    price: {
      currency: 'USD',
      amount: 350
    },
    ticketType: 'VIP',
    sellerNotes: 'Full weekend pass with premium seating.',
    imageUrl: '/placeholder.svg',
    status: 'live',
    createdAt: '2025-04-05T16:30:00Z',
    updatedAt: '2025-04-05T16:30:00Z'
  },
  {
    id: '5',
    sellerId: 'user5',
    eventName: 'Tough Mudder - California',
    raceType: 'OCR',
    eventDateTime: '2025-06-12T08:30:00Z',
    location: {
      city: 'Los Angeles',
      country: 'USA',
      isOnline: false
    },
    price: {
      currency: 'USD',
      amount: 95
    },
    ticketType: 'Standard',
    sellerNotes: 'Includes free parking pass',
    imageUrl: '/placeholder.svg',
    status: 'live',
    createdAt: '2025-04-08T13:20:00Z',
    updatedAt: '2025-04-08T13:20:00Z'
  },
  {
    id: '6',
    sellerId: 'user6',
    eventName: 'Tour de France - Paris Final Stage',
    raceType: 'Cycling',
    eventDateTime: '2025-07-19T10:00:00Z',
    location: {
      city: 'Paris',
      country: 'France',
      isOnline: false
    },
    price: {
      currency: 'EUR',
      amount: 220
    },
    ticketType: 'VIP',
    sellerNotes: 'Champs-Élysées viewing platform with refreshments included.',
    imageUrl: '/placeholder.svg',
    status: 'live',
    createdAt: '2025-04-12T10:00:00Z',
    updatedAt: '2025-04-12T10:00:00Z'
  },
  {
    id: '7',
    sellerId: 'user7',
    eventName: 'Ironman World Championship',
    raceType: 'Triathlon',
    eventDateTime: '2025-10-08T06:00:00Z',
    location: {
      city: 'Kona',
      country: 'USA',
      isOnline: false
    },
    price: {
      currency: 'USD',
      amount: 275
    },
    ticketType: 'Standard',
    sellerNotes: 'Finish line viewing area access.',
    imageUrl: '/placeholder.svg',
    status: 'live',
    createdAt: '2025-04-01T09:45:00Z',
    updatedAt: '2025-04-01T09:45:00Z'
  }
];

// Mock data for user tickets (tickets the current user is selling)
export const mockUserTickets = [
  {
    id: '101',
    sellerId: 'currentUser',
    eventName: 'Spartan Race - Miami Sprint',
    raceType: 'OCR',
    eventDateTime: '2025-06-05T08:00:00Z',
    location: {
      city: 'Miami',
      country: 'USA',
      isOnline: false
    },
    price: {
      currency: 'USD',
      amount: 120
    },
    ticketType: 'Standard',
    sellerNotes: 'Morning wave start time',
    imageUrl: '/placeholder.svg',
    status: 'pending',
    createdAt: '2025-04-20T15:30:00Z',
    updatedAt: '2025-04-20T15:30:00Z'
  },
  {
    id: '102',
    sellerId: 'currentUser',
    eventName: 'Hyrox Chicago',
    raceType: 'Hyrox',
    eventDateTime: '2025-07-15T09:30:00Z',
    location: {
      city: 'Chicago',
      country: 'USA',
      isOnline: false
    },
    price: {
      currency: 'USD',
      amount: 150
    },
    ticketType: 'VIP',
    sellerNotes: 'Includes warmup area access and merchandise discount',
    imageUrl: '/placeholder.svg',
    status: 'live',
    createdAt: '2025-04-10T12:15:00Z',
    updatedAt: '2025-04-11T09:00:00Z'
  },
  {
    id: '103',
    sellerId: 'currentUser',
    eventName: 'London Marathon',
    raceType: 'Marathon',
    eventDateTime: '2025-05-02T08:00:00Z',
    location: {
      city: 'London',
      country: 'UK',
      isOnline: false
    },
    price: {
      currency: 'GBP',
      amount: 95
    },
    ticketType: 'Standard',
    sellerNotes: '',
    imageUrl: '/placeholder.svg',
    status: 'sold',
    createdAt: '2025-03-15T10:45:00Z',
    updatedAt: '2025-03-30T14:20:00Z'
  }
];
