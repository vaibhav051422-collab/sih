export function cn(
  ...classList: Array<string | undefined | null | false>
): string {
  return classList.filter(Boolean).join(" ");
}

// Storage Keys
const STORAGE_KEYS = {
  ISSUES: 'civic_issues',
  USERS: 'civic_users',
  LOGGED_IN_USER: 'loggedInUser',
  VOTES: 'civic_voted_issues'
};

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
  return getFromStorage<Issue[]>(STORAGE_KEYS.ISSUES) || [];
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
  };
  issues.push(newIssue as Issue);
  saveIssues(issues);
  return newIssue as Issue;
};

// User functions
export const getUsers = (): User[] => {
  return getFromStorage<User[]>(STORAGE_KEYS.USERS) || [];
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
export const getLoggedInUser = () => {
  return getFromStorage(STORAGE_KEYS.LOGGED_IN_USER);
};

export const saveLoggedInUser = (user: any): void => {
  saveToStorage(STORAGE_KEYS.LOGGED_IN_USER, user);
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

export const addVote = (issueId: number, userId: string): void => {
  const votes = getVotes();
  if (!votes.includes(issueId)) {
    votes.push(issueId);
    saveVotes(votes);

    // Update issue upvotes
    const issues = getIssues();
    const issue = issues.find(i => i.id === issueId);
    if (issue) {
      issue.upvotes = (issue.upvotes || 0) + 1;
      saveIssues(issues);

      // Award points to issue creator
      const POINTS_PER_UPVOTE = 10;
      updateUserPoints(issue.user_id, POINTS_PER_UPVOTE);
    }
  }
};

// Points system
export const POINTS = {
  REPORT_ISSUE: 50,
  UPVOTE_RECEIVED: 10
};

export const awardPointsForNewIssue = (userId: string): void => {
  updateUserPoints(userId, POINTS.REPORT_ISSUE);
};
