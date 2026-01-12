// Mock data for the KenyaSentinel app

export interface Incident {
  id: string;
  type: string;
  description: string;
  location: string;
  locationCoords?: { lat: number; lng: number };
  priority: 'low' | 'medium' | 'high' | 'critical';
  timestamp: string;
  status: 'reported' | 'investigating' | 'resolved';
  comments?: number;
}

export interface TrendingTopic {
  title: string;
  location: string;
  reports: number;
}

export const mockIncidents: Incident[] = [
  {
    id: '1',
    type: 'Theft',
    description: 'Mobile phone stolen from parked car',
    location: 'Westlands, Nairobi',
    priority: 'medium',
    timestamp: '2024-11-07T10:30:00Z',
    status: 'investigating',
    comments: 5,
  },
  {
    id: '2',
    type: 'Assault',
    description: 'Physical altercation in public space',
    location: 'Koinange Street, Nairobi',
    priority: 'high',
    timestamp: '2024-11-07T09:15:00Z',
    status: 'reported',
    comments: 12,
  },
  {
    id: '3',
    type: 'Burglary',
    description: 'Residential break-in during daytime',
    location: 'Karen, Nairobi',
    priority: 'high',
    timestamp: '2024-11-07T08:45:00Z',
    status: 'resolved',
    comments: 8,
  },
  {
    id: '4',
    type: 'Traffic Accident',
    description: 'Multi-vehicle collision on highway',
    location: 'Mombasa Road, Nairobi',
    priority: 'critical',
    timestamp: '2024-11-07T07:20:00Z',
    status: 'investigating',
    comments: 15,
  },
  {
    id: '5',
    type: 'Fraud',
    description: 'Online scam targeting elderly residents',
    location: 'Various locations',
    priority: 'medium',
    timestamp: '2024-11-07T06:00:00Z',
    status: 'reported',
    comments: 3,
  },
];

export const trendingTopics: TrendingTopic[] = [
  {
    title: 'Increased theft in CBD',
    location: 'Central Business District, Nairobi',
    reports: 23,
  },
  {
    title: 'Road safety concerns',
    location: 'Major highways',
    reports: 18,
  },
  {
    title: 'Online fraud alerts',
    location: 'Digital platforms',
    reports: 15,
  },
  {
    title: 'Public transport delays',
    location: 'Matatu routes',
    reports: 12,
  },
  {
    title: 'Power outages',
    location: 'Residential areas',
    reports: 9,
  },
];