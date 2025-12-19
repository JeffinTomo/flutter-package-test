import type { MyPointsResponse, ActivitiesResponse, ActivityItem } from './types';

// Generate random integer
function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Generate random datetime (within last 30 days)
function randomDateTime(): string {
  const now = new Date();
  const daysAgo = randomInt(0, 30);
  const hoursAgo = randomInt(0, 23);
  const minutesAgo = randomInt(0, 59);
  
  const date = new Date(now);
  date.setDate(date.getDate() - daysAgo);
  date.setHours(date.getHours() - hoursAgo);
  date.setMinutes(date.getMinutes() - minutesAgo);
  
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

// Activity title list
const activityTitles = [
  'Daily Check-in',
  'Invite Friends',
  'New User Task',
  'Complete Transaction',
  'First Deposit',
  'Share on Social Media',
  'Follow Official Account',
  'Join Community Discussion',
];

// Status list
const statusList = ['completed', 'available', 'pending'];

// Generate random activity item
function generateActivityItem(id: string, isCompleted: boolean = false): ActivityItem {
  const title = activityTitles[randomInt(0, activityTitles.length - 1)];
  const points = randomInt(10, 1000);
  
  return {
    'activity-id': id,
    logo: `https://via.placeholder.com/40?text=${encodeURIComponent(title)}`,
    title,
    tx_time: isCompleted ? randomDateTime() : '',
    status: isCompleted ? 'completed' : statusList[randomInt(0, statusList.length - 1)],
    points,
  };
}

// Generate mock my points data (changes on each call)
export function generateMockMyPointsData(): MyPointsResponse {
  const basePoints = randomInt(10000, 50000);
  const listCount = randomInt(5, 15);
  const list: ActivityItem[] = [];
  
  for (let i = 0; i < listCount; i++) {
    list.push(generateActivityItem(String(i + 1), true));
  }
  
  return {
    code: 0,
    data: {
      points: basePoints,
      list,
      total: randomInt(100, 500),
      pageSize: 30,
      pageNumber: 0,
    },
  };
}

// Generate mock activities data (changes on each call)
export function generateMockActivitiesData(): ActivitiesResponse {
  const listCount = randomInt(3, 10);
  const list: ActivityItem[] = [];
  
  for (let i = 0; i < listCount; i++) {
    list.push(generateActivityItem(String(i + 1), false));
  }
  
  return {
    code: 0,
    data: {
      list,
      total: randomInt(10, 50),
      pageSize: 30,
      pageNumber: 0,
    },
  };
}

