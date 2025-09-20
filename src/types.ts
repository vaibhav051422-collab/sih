export interface Issue {
    id: number;
    user_id: string;
    title: string;
    description: string;
    created_at: string;
    location?: string;
    tags?: string;
    upvotes: number;
    status: 'pending' | 'resolved' | 'in_progress';
}

export interface User {
    id: string;
    name: string;
    points: number;
}

export interface Vote {
    issueId: number;
    userId: string;
    timestamp: string;
}

export interface AuthUser extends User {
    email?: string;
    role?: 'user' | 'admin';
}