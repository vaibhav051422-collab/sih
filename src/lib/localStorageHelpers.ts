// src/lib/localStorageHelpers.ts
import type { User, AuthUser, Issue } from '../types';

// Generic localStorage functions
export const getFromLocalStorage = <T>(key: string): T | null => {
    try {
        const stored = localStorage.getItem(key);
        return stored ? JSON.parse(stored) : null;
    } catch (error) {
        console.error("Error reading from localStorage", error);
        return null;
    }
};

export const saveToLocalStorage = <T>(key: string, data: T): void => {
    try {
        localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
        console.error("Error saving to localStorage", error);
    }
};
export const getFromLocalStorage = (key: string) => {
    try {
        const stored = localStorage.getItem(key);
        return stored ? JSON.parse(stored) : null;
    } catch (error) {
        console.error("Error reading from localStorage", error);
        return null;
    }
};

export const saveToLocalStorage = (key: string, data: any) => {
    try {
        localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
        console.error("Error saving to localStorage", error);
    }
};

// User-related functions
export const getUsers = (): User[] => getFromLocalStorage('civic_users') || [];
export const saveUsers = (users: User[]) => saveToLocalStorage('civic_users', users);
export const getLoggedInUser = (): AuthUser | null => getFromLocalStorage('civic_logged_in_user');
export const saveLoggedInUser = (user: AuthUser) => saveToLocalStorage('civic_logged_in_user', user);
export const clearLoggedInUser = () => localStorage.removeItem('civic_logged_in_user');

// Issue-related functions
export const getVotes = (): number[] => getFromLocalStorage('civic_voted_issues') || [];
export const getIssues = (): Issue[] => getFromLocalStorage('civic_issues') || [];
export const saveIssues = (issues: Issue[]) => saveToLocalStorage('civic_issues', issues);

export const upvoteIssue = (issueId: number, userId: string): boolean => {
    const issues = getIssues();
    const issueToUpdate = issues.find((i: Issue) => i.id === issueId);
    if (!issueToUpdate) return false;
    issueToUpdate.upvotes = (issueToUpdate.upvotes || 0) + 1;
    saveIssues(issues);
    return true;
};

/**
 * Retrieves data from LocalStorage, parses it, and removes expired items.
 * @param {string} key - The key for the data in LocalStorage.
 * @returns {T[]} An array of items, or an empty array if not found.
 */
export const getFromLocalStorage = <T extends Storable>(key: string): T[] => {
  try {
    const item = window.localStorage.getItem(key);
    if (!item) return [];

    let items: T[] = JSON.parse(item);
    const now = Date.now();

    // Remove expired items
    items = items.filter((i) => !i.expiry || i.expiry > now);

    // Save back only valid items
    window.localStorage.setItem(key, JSON.stringify(items));

    return items;
  } catch (error) {
    console.error(`Error reading from LocalStorage for key "${key}":`, error);
    return [];
  }
};

/**
 * Saves a new item to an array in LocalStorage.
 * Optionally assigns an expiry time.
 * @param {string} key - The key under which to save the data.
 * @param {Omit<T, 'id'>} newItem - The new data object to add (without an 'id').
 * @param {number} [ttl] - Optional time-to-live in ms.
 * @returns {T} The newly created item with its ID.
 */
export const saveToLocalStorage = <T extends Storable>(
  key: string,
  newItem: Omit<T, 'id' | 'expiry'>,
  ttl?: number
): T => {
  const existingItems = getFromLocalStorage<T>(key);

  const itemWithId: T = {
    ...(newItem as T),
    id: new Date().getTime(),
    expiry: ttl ? Date.now() + ttl : undefined,
  };

  const updatedItems = [...existingItems, itemWithId];
  window.localStorage.setItem(key, JSON.stringify(updatedItems));

  return itemWithId;
};

/**
 * Updates an existing item in an array in LocalStorage.
 * @param {string} key - The key for the data array in LocalStorage.
 * @param {string | number} id - The ID of the item to update.
 * @param {Partial<T>} updatedData - An object with the fields to update.
 * @returns {T | undefined} The updated item, or undefined if not found.
 */
export const updateInLocalStorage = <T extends Storable>(
  key: string,
  id: T['id'],
  updatedData: Partial<T>
): T | undefined => {
  const items = getFromLocalStorage<T>(key);
  let updatedItem: T | undefined;

  const updatedItems = items.map((item) => {
    if (item.id === id) {
      updatedItem = { ...item, ...updatedData };
      return updatedItem as T;
    }
    return item;
  });

  if (updatedItem) {
    window.localStorage.setItem(key, JSON.stringify(updatedItems));
  }

  return updatedItem;
};

/**
 * Deletes an item from an array in LocalStorage by its ID.
 * @param {string} key - The key for the data array.
 * @param {string | number} id - The ID of the item to delete.
 */
export const deleteFromLocalStorage = <T extends Storable>(
  key: string,
  id: T['id']
): void => {
  const items = getFromLocalStorage<T>(key);
  const remainingItems = items.filter((item) => item.id !== id);
  window.localStorage.setItem(key, JSON.stringify(remainingItems));
};
