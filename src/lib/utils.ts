import type { Issue, User, AuthUser } from '../types';

// Helper function for className concatenation
export function cn(...classList: Array<string | undefined | null | false>): string {
  return classList.filter(Boolean).join(" ");
}

// Storage Keys
const STORAGE_KEYS = {
  ISSUES: 'civic_issues',
  USERS: 'civic_users',
  LOGGED_IN_USER: 'civic_logged_in_user',
  VOTES: 'civic_voted_issues'
};

// Initial leaderboard data
const initialUsers: User[] = [
  { id: 'user-1', name: 'Pragya Mishra', points: 2100 },
  { id: 'user-2', name: 'Rohan Verma', points: 1850 },
  { id: 'user-3', name: 'Siddhima', points: 1260 },
  { id: 'user-4', name: 'Rahul Sharma', points: 950 },
  { id: 'user-5', name: 'Ananya Gupta', points: 780 },
  { id: 'user-6', name: 'Vikram Singh', points: 520 }
];

// Generic localStorage functions
const getFromStorage = <T>(key: string): T | null => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error(`Error reading ${key} from localStorage:`, error);
    return null;
  }
};

const saveToStorage = <T>(key: string, data: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Error saving ${key} to localStorage:`, error);
  }
};

// Issue functions
export const getIssues = (): Issue[] => {
  const issues = getFromStorage<Issue[]>(STORAGE_KEYS.ISSUES);
  return issues || [];
};

export const saveIssues = (issues: Issue[]): void => {
  saveToStorage(STORAGE_KEYS.ISSUES, issues);
};

export const addNewIssue = (issue: Omit<Issue, 'id'>): Issue => {
  const issues = getIssues();
  const newIssue = {
    ...issue,
    id: issues.length > 0 ? Math.max(...issues.map(i => i.id)) + 1 : 1,
    upvotes: 0
  } as Issue;
  const updatedIssues = [...issues, newIssue];
  saveIssues(updatedIssues);
  return newIssue;
};

// User functions
export const getUsers = (): User[] => {
  console.log('Getting users from storage');
  const users = getFromStorage<User[]>(STORAGE_KEYS.USERS);
  console.log('Retrieved users:', users);

  // Initialize with default users if no users exist
  if (!users || users.length === 0) {
    console.log('No users found, initializing with default users:', initialUsers);
    saveToStorage(STORAGE_KEYS.USERS, initialUsers);
    return initialUsers;
  }

  // Force initialize all initial users
  console.log('Ensuring all initial users are present');
  const updatedUsers = [...initialUsers];
  
  // Add any additional users that might exist in storage
  users.forEach(user => {
    if (!initialUsers.some(i => i.id === user.id)) {
      updatedUsers.push(user);
    }
  });

  console.log('Final user list:', updatedUsers);
  saveToStorage(STORAGE_KEYS.USERS, updatedUsers);
  return updatedUsers;
};

export const saveUsers = (users: User[]): void => {
  saveToStorage(STORAGE_KEYS.USERS, users);
};

export const updateUserPoints = (userId: string, pointsToAdd: number): void => {
  const users = getUsers();
  const userIndex = users.findIndex(u => u.id === userId);
  if (userIndex !== -1) {
    users[userIndex].points += pointsToAdd;
    saveUsers(users);
  }
};

// Authentication functions
export const getLoggedInUser = (): AuthUser | null => {
  console.log('Getting logged in user');
  const user = getFromStorage<AuthUser>(STORAGE_KEYS.LOGGED_IN_USER);
  console.log('Retrieved logged in user:', user);

  if (!user) return null;

  // Always ensure we're using user-3 (Siddhima) for the demo
  const users = getUsers();
  const demoUser = users.find(u => u.id === 'user-3');
  
  if (demoUser) {
    const syncedUser: AuthUser = {
      ...user,
      id: demoUser.id,
      name: demoUser.name,
      points: demoUser.points
    };
    console.log('Synced demo user:', syncedUser);
    saveLoggedInUser(syncedUser);
    return syncedUser;
  }

  return user;
};

export const saveLoggedInUser = (user: AuthUser): void => {
  console.log('Saving logged in user:', user);
  saveToStorage(STORAGE_KEYS.LOGGED_IN_USER, user);
  
  // Ensure demo user exists in the users list with correct points
  const users = getUsers();
  const demoUser = users.find(u => u.id === 'user-3');
  
  if (demoUser) {
    demoUser.points = user.points || demoUser.points;
    saveUsers(users);
  }
};

export const clearLoggedInUser = (): void => {
  localStorage.removeItem(STORAGE_KEYS.LOGGED_IN_USER);
};

// Vote functions
export const getVotes = (): number[] => {
  return getFromStorage<number[]>(STORAGE_KEYS.VOTES) || [];
};

export const saveVotes = (votes: number[]): void => {
  saveToStorage(STORAGE_KEYS.VOTES, votes);
};

export const upvoteIssue = (issueId: number): boolean => {
  const issues = getIssues();
  const issueToUpdate = issues.find((i: Issue) => i.id === issueId);
  if (!issueToUpdate) return false;

  const votes = getVotes();
  if (!votes.includes(issueId)) {
    votes.push(issueId);
    saveVotes(votes);

    issueToUpdate.upvotes = (issueToUpdate.upvotes || 0) + 1;
    saveIssues(issues);

    // Award points to issue creator
    const POINTS_PER_UPVOTE = 10;
    if (issueToUpdate.user_id) {
      updateUserPoints(issueToUpdate.user_id, POINTS_PER_UPVOTE);
    }
  }
  return true;
};

// Points system
export const POINTS = {
  REPORT_ISSUE: 50,
  UPVOTE_RECEIVED: 10
};

export const awardPointsForNewIssue = (userId: string): void => {
  updateUserPoints(userId, POINTS.REPORT_ISSUE);
};
