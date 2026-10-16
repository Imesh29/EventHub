export type Category = 'Music' | 'Tech' | 'Sports' | 'Arts' | 'Business' | 'Food';

export interface TicketType {
  id: string;
  name: string;
  price: number;
  capacity: number;
  available: number;
  description: string;
  perks?: string[];
}

export interface Event {
  id: string;
  title: string;
  category: Category;
  date: string;
  time: string;
  venue: string;
  city: string;
  country: string;
  image: string;
  description: string;
  organizer: string;
  status: 'active' | 'cancelled' | 'sold_out';
  ticketTypes: TicketType[];
  tags: string[];
  featured?: boolean;
}

export interface Booking {
  id: string;
  eventId: string;
  eventTitle: string;
  date: string;
  venue: string;
  tickets: { type: string; qty: number; price: number }[];
  total: number;
  status: 'confirmed' | 'pending' | 'cancelled';
  bookedAt: string;
  image: string;
}

export const EVENTS: Event[] = [
  {
    id: 'evt-001',
    title: 'Neon Nights Music Festival',
    category: 'Music',
    date: 'Oct 18, 2026',
    time: '7:00 PM',
    venue: 'Skyline Arena',
    city: 'New York',
    country: 'US',
    image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=900&h=560&fit=crop&auto=format',
    description: 'Three nights of underground electronic and indie acts across four stages. Featuring headliners from Berlin, London, and Tokyo alongside the best local talent. Expect immersive light installations, curated street food, and an after-party that runs till dawn.',
    organizer: 'Pulse Events',
    status: 'active',
    featured: true,
    tags: ['Electronic', 'Indie', 'Multi-stage', 'After-party'],
    ticketTypes: [
      { id: 'tt-001', name: 'General Admission', price: 85, capacity: 2000, available: 342, description: 'Floor access to all four stages', perks: ['All stages', 'Street food village'] },
      { id: 'tt-002', name: 'VIP Lounge', price: 220, capacity: 200, available: 47, description: 'Elevated deck, open bar, meet & greet', perks: ['Private bar', 'Artist meet & greet', 'Dedicated entrance', 'Elevated viewing'] },
      { id: 'tt-003', name: 'Early Bird', price: 65, capacity: 500, available: 0, description: 'Limited early bird pricing' },
    ],
  },
  {
    id: 'evt-002',
    title: 'ReactConf 2026',
    category: 'Tech',
    date: 'Nov 3, 2026',
    time: '9:00 AM',
    venue: 'Convention Center Hall B',
    city: 'San Francisco',
    country: 'US',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=900&h=560&fit=crop&auto=format',
    description: 'The definitive React developer conference. Two days of talks, workshops, and deep-dives on React 20, server components, and the modern frontend ecosystem. 60+ speakers, 20+ workshops.',
    organizer: 'Meta DevRel',
    status: 'active',
    featured: true,
    tags: ['React', 'JavaScript', 'Frontend', 'Workshops'],
    ticketTypes: [
      { id: 'tt-004', name: 'Developer Pass', price: 399, capacity: 1500, available: 218, description: 'Full 2-day access + workshop sessions', perks: ['All talks', 'Workshops', 'Networking dinner', 'Swag bag'] },
      { id: 'tt-005', name: 'Workshop Only', price: 149, capacity: 300, available: 85, description: 'Hands-on afternoon workshops only' },
    ],
  },
  {
    id: 'evt-003',
    title: 'City Marathon 2026',
    category: 'Sports',
    date: 'Nov 15, 2026',
    time: '6:30 AM',
    venue: 'Central Park Start',
    city: 'New York',
    country: 'US',
    image: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?w=900&h=560&fit=crop&auto=format',
    description: 'Run through the iconic streets of New York in the annual city marathon. Choose your distance: 5K, 10K, half, or full marathon. Certified course, chip timing, finisher medal included.',
    organizer: 'NYC Road Runners',
    status: 'active',
    tags: ['Running', 'Outdoor', 'Community', 'All distances'],
    ticketTypes: [
      { id: 'tt-006', name: '5K Entry', price: 45, capacity: 3000, available: 1240, description: 'Casual 5K route through the park' },
      { id: 'tt-007', name: 'Half Marathon', price: 95, capacity: 1000, available: 340, description: '13.1 miles through Manhattan', perks: ['Chip timing', 'Finisher medal', 'Post-race party'] },
      { id: 'tt-008', name: 'Full Marathon', price: 140, capacity: 500, available: 72, description: '26.2 miles — full race experience', perks: ['Chip timing', 'Finisher medal', 'Elite corral access', 'Post-race party'] },
    ],
  },
  {
    id: 'evt-004',
    title: 'Immersive Art: Void & Light',
    category: 'Arts',
    date: 'Oct 24, 2026',
    time: '11:00 AM',
    venue: 'The Warehouse Gallery',
    city: 'Los Angeles',
    country: 'US',
    image: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=900&h=560&fit=crop&auto=format',
    description: 'A sensory journey through light sculpture and spatial sound. 12 rooms, 8 artists, unlimited imagination. Stay as long as you wish — the experience is designed to be different every time.',
    organizer: 'Form & Space Collective',
    status: 'active',
    tags: ['Installation', 'Immersive', 'Contemporary', 'Light art'],
    ticketTypes: [
      { id: 'tt-009', name: 'Standard Entry', price: 38, capacity: 400, available: 156, description: 'Open entry, choose your time slot' },
      { id: 'tt-010', name: 'Private Preview', price: 120, capacity: 30, available: 8, description: 'Friday evening exclusive viewing', perks: ['Champagne reception', 'Artist Q&A', 'Exhibition catalog'] },
    ],
  },
  {
    id: 'evt-005',
    title: 'Founders Summit 2026',
    category: 'Business',
    date: 'Dec 5, 2026',
    time: '8:00 AM',
    venue: 'Grand Ballroom, Marriott',
    city: 'Chicago',
    country: 'US',
    image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=900&h=560&fit=crop&auto=format',
    description: 'A curated gathering of 500 founders, operators, and investors. Structured networking, fireside chats, and pitch sessions with top-tier VCs. Strictly limited capacity.',
    organizer: 'Apex Ventures',
    status: 'active',
    featured: true,
    tags: ['Startups', 'VC', 'Networking', 'Pitch'],
    ticketTypes: [
      { id: 'tt-011', name: 'Founder Pass', price: 650, capacity: 400, available: 87, description: 'Full day access + networking dinner', perks: ['All sessions', 'Networking dinner', 'Investor introductions'] },
      { id: 'tt-012', name: 'Investor Pass', price: 1200, capacity: 100, available: 23, description: 'All-access + private investor roundtable', perks: ['All sessions', 'Private roundtable', 'Deal-flow materials', 'VIP dinner'] },
    ],
  },
  {
    id: 'evt-006',
    title: 'Street Food & Spirits Festival',
    category: 'Food',
    date: 'Oct 31, 2026',
    time: '12:00 PM',
    venue: 'Waterfront Pier 17',
    city: 'Boston',
    country: 'US',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=900&h=560&fit=crop&auto=format',
    description: 'Forty of the city\'s best chefs and artisan producers in one waterfront location. Street tacos, craft cocktails, ramen, wood-fired pizza, and dessert spanning every continent.',
    organizer: 'Taste Boston',
    status: 'active',
    tags: ['Food', 'Craft Cocktails', 'Outdoor', 'Artisan'],
    ticketTypes: [
      { id: 'tt-013', name: 'Tasting Entry', price: 28, capacity: 2000, available: 843, description: 'General entry — buy tokens for food' },
      { id: 'tt-014', name: 'All-Inclusive', price: 79, capacity: 400, available: 112, description: 'Unlimited tastings + 5 craft cocktails', perks: ['Unlimited food', '5 signature cocktails', 'Priority entry'] },
    ],
  },
];

export const MY_BOOKINGS: Booking[] = [
  {
    id: 'BKG-10241',
    eventId: 'evt-001',
    eventTitle: 'Neon Nights Music Festival',
    date: 'Oct 18, 2026 · 7:00 PM',
    venue: 'Skyline Arena, New York',
    tickets: [{ type: 'VIP Lounge', qty: 2, price: 220 }],
    total: 440,
    status: 'confirmed',
    bookedAt: 'Sep 10, 2026',
    image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&h=240&fit=crop&auto=format',
  },
  {
    id: 'BKG-10198',
    eventId: 'evt-002',
    eventTitle: 'ReactConf 2026',
    date: 'Nov 3, 2026 · 9:00 AM',
    venue: 'Convention Center, San Francisco',
    tickets: [{ type: 'Developer Pass', qty: 1, price: 399 }],
    total: 399,
    status: 'confirmed',
    bookedAt: 'Aug 22, 2026',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=240&fit=crop&auto=format',
  },
  {
    id: 'BKG-10312',
    eventId: 'evt-006',
    eventTitle: 'Street Food & Spirits Festival',
    date: 'Oct 31, 2026 · 12:00 PM',
    venue: 'Waterfront Pier 17, Boston',
    tickets: [{ type: 'All-Inclusive', qty: 3, price: 79 }],
    total: 237,
    status: 'pending',
    bookedAt: 'Sep 18, 2026',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=240&fit=crop&auto=format',
  },
];

export type EventStatus = 'draft' | 'pending_review' | 'published' | 'sold_out' | 'cancelled' | 'completed';

export const ORGANIZER_EVENTS = [
  { id: 'evt-001', title: 'Neon Nights Music Festival', date: 'Oct 18', sales: 1658, revenue: 212540, capacity: 2700, status: 'published' as EventStatus },
  { id: 'evt-007', title: 'Pulse Underground DJ Night', date: 'Sep 27', sales: 480, revenue: 24000, capacity: 600, status: 'completed' as EventStatus },
  { id: 'evt-008', title: 'Ambient Sessions Vol.3', date: 'Oct 5', sales: 320, revenue: 16000, capacity: 400, status: 'published' as EventStatus },
  { id: 'evt-009', title: 'AI Summit 2026', date: 'Dec 10', sales: 0, revenue: 0, capacity: 900, status: 'draft' as EventStatus },
];

export interface Notification {
  id: string;
  type: 'BOOKING_CONFIRMED' | 'PAYMENT_SUCCESS' | 'PAYMENT_FAILED' | 'TICKET_ISSUED' | 'EVENT_REMINDER' | 'EVENT_CANCELLED';
  title: string;
  message: string;
  time: string;
  read: boolean;
}

export const NOTIFICATIONS: Notification[] = [
  { id: 'n-001', type: 'BOOKING_CONFIRMED', title: 'Booking Confirmed', message: 'Your booking BKG-10241 has been confirmed.', time: '2 minutes ago', read: false },
  { id: 'n-002', type: 'TICKET_ISSUED', title: 'Ticket Ready', message: 'Your ticket for Neon Nights is ready.', time: '5 minutes ago', read: false },
  { id: 'n-003', type: 'EVENT_REMINDER', title: 'Event Reminder', message: 'Neon Nights starts tomorrow at 7 PM.', time: '1 day ago', read: false },
  { id: 'n-004', type: 'PAYMENT_SUCCESS', title: 'Payment Successful', message: 'Payment of $440 for Neon Nights confirmed.', time: '2 days ago', read: true },
  { id: 'n-005', type: 'BOOKING_CONFIRMED', title: 'Booking Confirmed', message: 'Your booking BKG-10198 for ReactConf 2026 is confirmed.', time: '1 month ago', read: true },
];

export const ADMIN_STATS = {
  totalUsers: 48320,
  totalOrganizers: 342,
  totalEvents: 1847,
  totalRevenue: 3_820_450,
  pendingModeration: 14,
  activeEvents: 218,
};

export const CAT_COLORS: Record<string, { bg: string; text: string }> = {
  Music: { bg: 'rgba(139,92,246,0.18)', text: '#c4b5fd' },
  Tech: { bg: 'rgba(59,130,246,0.18)', text: '#93c5fd' },
  Sports: { bg: 'rgba(16,185,129,0.18)', text: '#6ee7b7' },
  Arts: { bg: 'rgba(236,72,153,0.18)', text: '#f9a8d4' },
  Business: { bg: 'rgba(245,158,11,0.18)', text: '#fcd34d' },
  Food: { bg: 'rgba(239,68,68,0.18)', text: '#fca5a5' },
};
