import type { Issue } from '../types';
import * as Utils from './utils';

// Re-export basic functions
export const getIssues = Utils.getIssues;
export const saveIssues = Utils.saveIssues;
export const addNewIssue = Utils.addNewIssue;
export const getVotes = Utils.getVotes;
export const saveVotes = Utils.saveVotes;

export const getFilteredIssues = (options?: {
    userId?: string;
    status?: 'pending' | 'in_progress' | 'resolved';
    location?: string;
}) => {
    const issues = getIssues();
    
    if (!options) return issues;
    
    // Filter issues based on provided options
    const filteredIssues = issues.filter(issue => {
        // User ID filter - exact match
        if (options.userId && issue.user_id !== options.userId) return false;
        
        // Status filter - exact match
        if (options.status && issue.status !== options.status) return false;
        
        // Location filter - case-insensitive partial match
        if (options.location && !issue.location?.toLowerCase().includes(options.location.toLowerCase())) return false;
        
        return true;
    });

    console.log('Filtered issues:', {
        total: issues.length,
        filtered: filteredIssues.length,
        options
    });

    return filteredIssues;
};

export const getIssueStatistics = () => {
    const issues = getIssues();
    
    return {
        totalIssues: issues.length,
        byStatus: {
            pending: issues.filter(i => i.status === 'pending').length,
            inProgress: issues.filter(i => i.status === 'in_progress').length,
            resolved: issues.filter(i => i.status === 'resolved').length,
        },
        byLocation: issues.reduce<{ [key: string]: number }>((acc, issue) => {
            if (issue.location) {
                acc[issue.location] = (acc[issue.location] || 0) + 1;
            }
            return acc;
        }, {}),
    };
};

export const getLocationData = () => {
    const issues = getIssues();
    const locationCount: { [key: string]: number } = {};

    issues.forEach(issue => {
        if (issue.location) {
            locationCount[issue.location] = (locationCount[issue.location] || 0) + 1;
        }
    });

    return Object.entries(locationCount)
        .map(([location, count]) => ({ location, count }))
        .sort((a, b) => b.count - a.count);
};

export const getStatusData = () => {
    const issues = getIssues();
    const statusCount: Record<'pending' | 'in_progress' | 'resolved', number> = {
        'pending': 0,
        'in_progress': 0,
        'resolved': 0,
    };

    issues.forEach(issue => {
        const status = (issue.status || 'pending') as 'pending' | 'in_progress' | 'resolved';
        statusCount[status]++;
    });

    return Object.entries(statusCount)
        .map(([status, count]) => ({ status, count }))
        .sort((a, b) => b.count - a.count);
};

export const updateIssueStatus = (issueId: number, newStatus: 'pending' | 'in_progress' | 'resolved') => {
    const issues = getIssues();
    const index = issues.findIndex(i => i.id === issueId);
    
    if (index === -1) return null;
    
    issues[index] = { ...issues[index], status: newStatus };
    saveIssues(issues);
    
    return issues[index];
};

export const upvoteIssue = (issueId: number, userId: string): boolean => {
    const issues = getIssues();
    const index = issues.findIndex(i => i.id === issueId);
    
    if (index === -1) return false;
    
    // Update issue upvotes
    issues[index] = { 
        ...issues[index], 
        upvotes: (issues[index].upvotes || 0) + 1 
    };
    saveIssues(issues);
    
    // Get votes set
    const votes = new Set(getVotes());
    if (!votes.has(issueId)) {
        votes.add(issueId);
        saveVotes(Array.from(votes));
    }
    
    return true;
};