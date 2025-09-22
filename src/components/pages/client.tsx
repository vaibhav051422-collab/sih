import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import type { SVGProps } from 'react';

// Types
import type { Issue, User, AuthUser } from '../../types';
import { AnimatedText } from "../ui/animated-underline-text-one";
import { getUsers, saveUsers, getLoggedInUser, saveLoggedInUser, clearLoggedInUser, getVotes, getIssues, saveIssues, upvoteIssue } from '../../lib/utils';

// Interfaces
interface SidebarProps {
    mainTab: string;
    setMainTab: (tab: string) => void;
}

interface HeaderProps {
    userPoints: number;
}

interface IssueCardProps {
    issue: Issue;
    onUpvote: (id: number) => void;
    hasVoted: boolean;
}

interface ProfilePageProps {
    user: User | null;
}

interface LeaderboardPageProps {
    users: User[];
    currentUserId: string;
}

// Icon Interfaces

// Icon Interfaces
interface IconProps extends SVGProps<SVGSVGElement> {
    className?: string;
}

// Icons
const MapPinIcon: React.FC<IconProps> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
        <circle cx="12" cy="10" r="3"/>
    </svg>
);

const PlusCircleIcon: React.FC<IconProps> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <line x1="12" y1="8" x2="12" y2="16"/>
        <line x1="8" y1="12" x2="16" y2="12"/>
    </svg>
);

const CalendarIcon: React.FC<IconProps> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
        <line x1="16" y1="2" x2="16" y2="6"></line>
        <line x1="8" y1="2" x2="8" y2="6"></line>
        <line x1="3" y1="10" x2="21" y2="10"></line>
    </svg>
);

const UpvoteIcon: React.FC<IconProps> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m18 15-6-6-6 6"/>
    </svg>
);

const TrophyIcon: React.FC<IconProps> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/>
        <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/>
        <path d="M4 22h16"/>
        <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/>
        <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/>
        <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>
    </svg>
);

const CommunityIcon: React.FC<IconProps> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
);

const MyIssuesIcon: React.FC<IconProps> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
        <path d="M12 18v-6"/>
        <path d="M9 15h6"/>
    </svg>
);

const LeaderboardIcon: React.FC<IconProps> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 16v-3a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v3M12 11V8M8 16v-1a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2v1"/>
    </svg>
);

const ProfileIcon: React.FC<IconProps> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
        <circle cx="12" cy="7" r="4"/>
    </svg>
);

const LogoutIcon: React.FC<IconProps> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
        <polyline points="16 17 21 12 16 7"/>
        <line x1="21" y1="12" x2="9" y2="12"/>
    </svg>
);

const CheckIcon: React.FC<IconProps> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
);

// Sub-Components
const Sidebar: React.FC<SidebarProps> = ({ mainTab, setMainTab }) => {
    const { t, i18n } = useTranslation();
    const navItems = [
        { id: 'community', label: t('sidebar.community'), icon: <CommunityIcon className="h-5 w-5" /> },
        { id: 'my_issues', label: t('sidebar.my_issues'), icon: <MyIssuesIcon className="h-5 w-5" /> },
        { id: 'leaderboard', label: t('sidebar.leaderboard'), icon: <LeaderboardIcon className="h-5 w-5" /> },
        { id: 'profile', label: t('sidebar.my_profile'), icon: <ProfileIcon className="h-5 w-5" /> },
    ];
    const toggleLanguage = () => { i18n.changeLanguage(i18n.language === 'en' ? 'hi' : 'en'); };
    const handleLogout = () => {
        clearLoggedInUser();
        window.location.href = "/";
    };
    return (
        <aside className="w-64 flex-shrink-0 bg-black/30 border-r border-blue-500/20 p-6 flex flex-col">
            <div className="flex items-center space-x-3 mb-10">
                <svg className="w-8 h-8 text-blue-400" viewBox="0 0 24 24" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                <AnimatedText text="CivicSense" textClassName="text-2xl font-bold" />
            </div>
            <nav className="flex flex-col space-y-2">
                {navItems.map(item => (
                    <button 
                        key={item.id} 
                        onClick={() => setMainTab(item.id)} 
                        className={`
                            flex items-center space-x-3 px-4 py-3 rounded-lg 
                            transition-all duration-300 
                            ${mainTab === item.id 
                                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' 
                                : 'text-gray-400 hover:bg-white/10 hover:text-white hover:shadow-md hover:shadow-blue-500/20'
                            }
                        `}
                    >
                        {React.cloneElement(item.icon, {
                            className: `${mainTab === item.id ? 'text-white' : 'text-gray-400 group-hover:text-white'} h-5 w-5 transition-colors duration-300`
                        })}
                        <span className="font-semibold">{item.label}</span>
                    </button>
                ))}
            </nav>
            <div className="mt-4"><button onClick={toggleLanguage} className="flex items-center justify-center w-full space-x-3 px-4 py-3 rounded-lg text-gray-400 hover:bg-white/10 hover:text-white transition-colors duration-200"><span className="font-bold text-lg">A→अ</span></button></div>
            <div className="mt-auto"><button onClick={handleLogout} className="flex items-center space-x-3 w-full px-4 py-3 rounded-lg text-gray-400 hover:bg-red-900/50 hover:text-red-300 transition-colors duration-200"><LogoutIcon className="h-5 w-5" /><span className="font-semibold">{t('sidebar.logout')}</span></button></div>
        </aside>
    );
};

const Header: React.FC<HeaderProps> = ({ userPoints }) => {
    const { t } = useTranslation();
    return (
    <header className="bg-black/50 backdrop-blur-sm p-4 border-b border-blue-500/20 flex justify-end items-center">
        <div className="flex items-center space-x-4">
            <div className="flex items-center gap-2 bg-yellow-600/20 text-yellow-300 px-3 py-2 rounded-lg text-sm font-medium">
                <TrophyIcon className="w-5 h-5 text-yellow-400"/>
                <span>{userPoints.toLocaleString('en-IN')} {t('header.points')}</span>
            </div>
            <button onClick={() => { window.location.href = "/issue"; }} className="flex items-center justify-center gap-2 bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-300 text-sm shadow-md shadow-blue-500/30 ring-1 ring-blue-500/50 cursor-pointer">
                <PlusCircleIcon className="w-5 h-5" /> {t('header.report_issue')}
            </button>
        </div>
    </header>
)};

const IssueCard: React.FC<IssueCardProps> = ({ issue, onUpvote, hasVoted }) => {
    const { t } = useTranslation();
    const tags = issue.tags ? issue.tags.split(",").map((tag) => tag.trim()) : [];
    const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString('en-IN', { year: "numeric", month: "long", day: "numeric" });
    const getStatusText = (status: Issue['status']) => {
        const key = `issue_card.status_${status}`;
        return t(key, { defaultValue: status });
    };
    const getStatusColor = (status: Issue['status']) => {
        switch (status) {
            case "resolved":
                return "bg-green-900/50 text-green-300 border border-green-500/20";
            case "pending":
                return "bg-yellow-900/50 text-yellow-300 border border-yellow-500/20";
            case "in_progress":
                return "bg-sky-900/50 text-sky-300 border border-blue-500/20";
            default:
                return "bg-gray-900/50 text-gray-300 border border-gray-500/20";
        }
    };
    const [showPoints, setShowPoints] = useState(false);
    const [pointsText, setPointsText] = useState("");

    const handleButtonClick = () => {
        if (!hasVoted) {
            onUpvote(issue.id);
            setPointsText('+10 points');
            setShowPoints(true);
            setTimeout(() => {
                setShowPoints(false);
            }, 2000);
        }
    };
    
    return (
        <div className="bg-black/50 rounded-2xl overflow-hidden border border-blue-500/20 shadow-lg flex flex-col">
            <div className="p-6 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold text-gray-100 flex-1">{issue.title}</h3>
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(issue.status)} ml-2 shrink-0 flex items-center gap-2`}>
                        {issue.status === 'resolved' && (
                            <svg className="w-3 h-3" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                            </svg>
                        )}
                        {getStatusText(issue.status)}
                    </span>
                </div>
                <div className="space-y-3 text-gray-400 text-sm mb-4">
                    <div className="flex items-center"><CalendarIcon className="h-4 w-4 mr-3 shrink-0" /><span>{formatDate(issue.created_at)}</span></div>
                    {issue.location && (<div className="flex items-center"><MapPinIcon className="h-4 w-4 mr-3 shrink-0" /><span>{issue.location}</span></div>)}
                </div>
                <p className="text-gray-400 text-sm mb-5 flex-grow">{issue.description}</p>
                <div className="flex flex-wrap gap-2 pt-5 border-t border-white/10">
                    {tags.map((tag, i) => (<span key={i} className="bg-blue-900/50 text-blue-300 text-xs font-semibold px-3 py-1 rounded-full">{tag}</span>))}
                </div>
                <div className="mt-4 pt-4 border-t border-white/10 relative">
                    <button 
                        onClick={handleButtonClick} 
                        disabled={hasVoted || issue.status === 'resolved'} 
                        className={`
                            flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 text-sm font-semibold
                            ${
                                hasVoted
                                    ? 'bg-green-500/20 text-green-400 cursor-not-allowed border border-green-500/50'
                                    : issue.status === 'resolved'
                                    ? 'bg-gray-500/20 text-gray-400 cursor-not-allowed border border-gray-500/50'
                                    : 'bg-gradient-to-r from-blue-600/20 to-blue-500/20 text-blue-300 hover:from-blue-600 hover:to-blue-700 hover:text-white hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300'
                            }
                        `}
                    >
                        {hasVoted ? <CheckIcon className="w-5 h-5 transition-all duration-300" /> : <UpvoteIcon className="w-5 h-5 transition-all duration-300" />}
                        <span>{hasVoted ? t('issue_card.voted') : t('issue_card.upvote')}</span>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold transition-all duration-300
                            ${hasVoted ? 'bg-green-900/50 text-green-300' : 'bg-white/10 text-white'}`}
                        >
                            {issue.upvotes || 0}
                        </span>
                    </button>
                    {showPoints && (
                        <span className="absolute left-0 bottom-full mb-2 text-sm text-green-400 animate-fade-in-up">
                            {pointsText}
                        </span>
                    )}
                </div>
            </div>
            {/* Tailwind CSS keyframes for a simple animation */}
            <style>{`
                @keyframes fade-in-up {
                    from {
                        opacity: 0;
                        transform: translateY(10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-fade-in-up {
                    animation: fade-in-up 0.5s ease-out forwards;
                }
            `}</style>
        </div>
    );
};

const LeaderboardPage: React.FC<LeaderboardPageProps> = ({ users, currentUserId }) => {
    const { t } = useTranslation();
    const sortedUsers = [...users].sort((a, b) => b.points - a.points);

    // Function to determine the style of the list item based on rank and if it's the current user
    const getItemStyle = (user: User, index: number) => {
        const isCurrentUser = user.id === currentUserId;
        const isTopThree = index < 3;

        if (isCurrentUser && !isTopThree) {
            return "flex items-center p-5 rounded-lg transition-all duration-300 shadow-xl bg-blue-600 ring-2 ring-blue-500/50";
        } else if (isTopThree) {
            switch (index) {
                case 0: return 'flex items-center p-5 rounded-lg transition-all duration-300 shadow-xl bg-gradient-to-r from-yellow-500/10 to-transparent border border-yellow-400/30';
                case 1: return 'flex items-center p-5 rounded-lg transition-all duration-300 shadow-xl bg-gradient-to-r from-gray-500/10 to-transparent border border-gray-400/30';
                case 2: return 'flex items-center p-5 rounded-lg transition-all duration-300 shadow-xl bg-gradient-to-r from-orange-500/10 to-transparent border border-orange-400/30';
                default: return '';
            }
        } else {
            return 'flex items-center p-5 rounded-lg transition-all duration-300 bg-black/30 border border-blue-500/10 hover:bg-blue-950/30';
        }
    };

    // Function to determine the style of the rank number circle
    const getRankCircleStyle = (index: number) => {
        switch (index) {
            case 0: return 'bg-yellow-400 text-black';
            case 1: return 'bg-gray-400 text-black';
            case 2: return 'bg-orange-400 text-black';
            default: return 'bg-gray-600/20 border-2 border-gray-500/20 text-gray-400';
        }
    };

    const getUserRank = (points: number) => {
        if (points >= 2000) return t('ranks.expert');
        if (points >= 1500) return t('ranks.pro');
        if (points >= 1000) return t('ranks.veteran');
        if (points >= 500) return t('ranks.regular');
        return t('ranks.newcomer');
    };

    return (
        <div className="max-w-xl mx-auto space-y-4">
            {sortedUsers.map((user, index) => {
                const isCurrentUser = user.id === currentUserId;
                const isTopThree = index < 3;
                return (
                    <div
                        key={user.id}
                        className={getItemStyle(user, index)}
                    >
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg mr-4 ${getRankCircleStyle(index)}`}>
                            {index + 1}
                        </div>
                        <div className="flex-grow">
                            <div className="flex items-center gap-2">
                                <p className={`font-semibold text-lg ${isTopThree ? 'text-gray-100' : 'text-white'}`}>{user.name}</p>
                            </div>
                            {isCurrentUser && (
                                <p className="text-sm text-blue-400 font-semibold">{t('misc.you')}</p>
                            )}
                        </div>
                        <div className="flex items-center gap-2">
                            {isTopThree && <TrophyIcon className={`w-6 h-6 ${index === 0 ? 'text-yellow-400' : index === 1 ? 'text-gray-400' : 'text-orange-400'}`} />}
                            <span className={`font-bold text-xl ${isTopThree ? 'text-yellow-300' : 'text-white'}`}>
                                {user.points.toLocaleString('en-IN')}
                            </span>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

const ProfilePage: React.FC<ProfilePageProps> = ({ user }) => {
    const { t } = useTranslation();

    if (!user) {
        return (
            <div className="text-center py-16 px-6 bg-black/30 rounded-xl border border-blue-500/20">
                <h3 className="text-xl font-semibold text-white">{t('profile_page.not_found_title')}</h3>
                <p className="text-gray-500 mt-2">{t('profile_page.not_found_subtitle')}</p>
            </div>
        );
    }

    const getUserLevel = (points: number) => {
        if (points >= 2000) return t('levels.expert');
        if (points >= 1500) return t('levels.pro');
        if (points >= 1000) return t('levels.veteran');
        if (points >= 500) return t('levels.regular');
        return t('levels.newcomer');
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="bg-black/30 rounded-xl border border-blue-500/20 backdrop-blur-sm p-8 mb-8">
                <div className="text-center">
                    <h3 className="text-4xl font-bold text-white mb-2">{user.name}</h3>
                    <p className="text-lg text-blue-400">{getUserLevel(user.points)}</p>
                    <div className="mt-6 inline-flex items-center gap-3 bg-yellow-500/10 px-6 py-3 rounded-lg">
                        <TrophyIcon className="w-8 h-8 text-yellow-400" />
                        <span className="text-yellow-300 font-bold text-3xl">
                            {user.points.toLocaleString('en-IN')} {t('header.points')}
                        </span>
                    </div>
                </div>
            </div>

            <div className="bg-black/30 rounded-xl border border-blue-500/20 backdrop-blur-sm p-8">
                <div className="flex items-center gap-3 mb-6">
                    <h4 className="text-2xl font-bold text-white">{t('profile_page.achievements_title')}</h4>
                    <div className="bg-blue-500/10 px-3 py-1 rounded-full">
                        <span className="text-blue-400 text-sm font-semibold">Coming Soon</span>
                    </div>
                </div>
                <p className="text-gray-400">{t('profile_page.achievements_soon')}</p>
            </div>
        </div>
    );
};

export default function App() {
    const { t } = useTranslation();
    const [issues, setIssues] = useState<Issue[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [votedIssues, setVotedIssues] = useState<Set<number>>(new Set());
    const [loading, setLoading] = useState(true);
    const [mainTab, setMainTab] = useState('community');
    const [authUser, setAuthUser] = useState<AuthUser | null>(null);

    const currentUserId = authUser?.id || "";
    const currentUser = users.find(u => u.id === currentUserId);
    const userPoints = currentUser?.points || 0;

    useEffect(() => {
        fetchLocalData();
    }, []);

    const fetchLocalData = async () => {
        try {
            setLoading(true);
            
            // First, ensure we have users initialized
            const existingUsers = getUsers();
            setUsers(existingUsers);
            console.log('Initialized users:', existingUsers);

            // Then handle logged in user
            let loggedInUser = getLoggedInUser();
            console.log('Got logged in user:', loggedInUser);
            
            // Always use user-3 (Siddhima) as the demo user
            const demoUser = existingUsers.find(u => u.id === 'user-3');
            if (demoUser) {
                const updatedUser = {
                    ...(loggedInUser || {}),
                    id: demoUser.id,
                    name: demoUser.name,
                    points: demoUser.points,
                    email: loggedInUser?.email || 'demo@example.com'
                };
                setAuthUser(updatedUser);
                saveLoggedInUser(updatedUser);
                console.log('Set demo user:', updatedUser);
            }

            // Initialize mock issues if needed
            const currentIssues = getIssues() || [];
            if (currentIssues.length === 0) {
                const initialMockIssues = [
                    { 
                        id: 1, 
                        user_id: 'user-3', 
                        title: "Community Waste Management", 
                        description: "Setting up waste segregation and composting units in residential areas to promote sustainable waste management.", 
                        created_at: "2025-09-16T09:15:00Z", 
                        location: "Dwarka", 
                        tags: "waste-management,environment,community", 
                        upvotes: 72, 
                        status: 'in_progress' as const 
                    },
                    { 
                        id: 2, 
                        user_id: 'user-3', 
                        title: "Urban Forest Initiative", 
                        description: "Creating mini forests in urban areas using Miyawaki technique to improve air quality and biodiversity.", 
                        created_at: "2025-09-18T11:20:00Z", 
                        location: "Vasant Kunj", 
                        tags: "environment,green-spaces,air-quality", 
                        upvotes: 95, 
                        status: 'pending' as const 
                    }
                ];
                saveIssues(initialMockIssues);
                setIssues(initialMockIssues);
            } else {
                setIssues(currentIssues);
            }

            // Initialize votes
            const savedVotes = getVotes();
            setVotedIssues(new Set(savedVotes));

        } catch (error) {
            console.error("Error fetching local data:", error);
        } finally {
            setLoading(false);
        }
    };

    // Effect to refresh issues when tab or user changes
    useEffect(() => {
        const refreshIssues = async () => {
            if (mainTab === 'my_issues' || mainTab === 'community') {
                const allIssuesFromStorage = getIssues();
                if (allIssuesFromStorage) {
                    setIssues(allIssuesFromStorage);
                }
            }
        };

        refreshIssues();
    }, [mainTab, currentUserId]);

    const handleUpvote = (issueId: number) => {
        if (!authUser || votedIssues.has(issueId)) return;

        if (upvoteIssue(issueId)) {
            // Update issues list
            setIssues(getIssues());
            
            // Update voted issues set
            setVotedIssues(new Set([...Array.from(votedIssues), issueId]));

            // Update user points
            const pointsToAward = 10;
            setUsers(prevUsers => {
                const updatedUsers = prevUsers.map(user => 
                    user.id === currentUserId
                        ? { ...user, points: user.points + pointsToAward }
                        : user
                );
                saveUsers(updatedUsers);
                return updatedUsers;
            });
        }
    };

    useEffect(() => {
        const refreshIssues = async () => {
            const allIssuesFromStorage = getIssues();
            if (allIssuesFromStorage) {
                setIssues(allIssuesFromStorage);
            }
        };

        refreshIssues();
    }, [mainTab, currentUserId]);

    const getDisplayedIssues = () => {
        if (mainTab === 'my_issues') {
            if (!currentUserId) {
                return [];
            }
            // Filter issues where user_id matches currentUserId (Siddhima's ID: user-3)
            console.log('Filtering issues for user:', currentUserId);
            const myIssues = issues.filter(issue => {
                const isUsersIssue = issue.user_id === currentUserId;
                console.log(`Issue ${issue.id} - ${issue.title}:`, isUsersIssue ? 'belongs to user' : 'not users');
                return isUsersIssue;
            });
            console.log('Found user issues:', myIssues);
            return myIssues;
        }
        
        // For community tab, show all issues sorted by upvotes
        return [...issues].sort((a, b) => (b.upvotes || 0) - (a.upvotes || 0));
    };

    const displayedIssues = getDisplayedIssues();
    const pageTitleKey = `sidebar.${mainTab}`;
    const pageSubtitleKey = `${mainTab}_page.subtitle`;

    const renderContent = () => {
        if (loading) { return <div className="text-center text-blue-400"><p>{t('misc.loading')}</p></div>; }
        switch (mainTab) {
            case 'leaderboard': return <LeaderboardPage users={users} currentUserId={currentUserId} />;
            case 'profile': return <ProfilePage user={currentUser || null} />;
            case 'my_issues':
            case 'community':
                if (displayedIssues.length > 0) {
                    return (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                            {displayedIssues.map((issue) => (<IssueCard key={issue.id} issue={issue} onUpvote={handleUpvote} hasVoted={votedIssues.has(issue.id)}/>))}
                        </div>
                    );
                }
                return (
                    <div className="text-center py-16 px-6 bg-black/30 rounded-lg border border-blue-500/20 backdrop-blur-sm">
                        <h3 className="text-xl font-semibold text-white">
                            {mainTab === 'my_issues' 
                                ? t('misc.no_my_issues_title', 'No Issues Found')
                                : t('misc.no_issues_title')}
                        </h3>
                        <p className="text-gray-500 mt-2">
                            {mainTab === 'my_issues'
                                ? t('misc.no_my_issues_subtitle', 'You haven\'t submitted any issues yet. Click the "Report Issue" button to get started!')
                                : t('misc.no_issues_subtitle')}
                        </p>
                        {mainTab === 'my_issues' && (
                            <button 
                                onClick={() => { window.location.href = "/issue"; }} 
                                className="mt-6 flex items-center justify-center gap-2 bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 transition-all duration-300 mx-auto shadow-md shadow-blue-500/30 ring-1 ring-blue-500/50"
                            >
                                <PlusCircleIcon className="w-5 h-5" /> 
                                {t('header.report_issue')}
                            </button>
                        )}
                    </div>
                );
            default: return null;
        }
    };

    return (
        <div className="bg-black bg-grid-pattern min-h-screen text-gray-200 font-inter flex">
            <div className="absolute inset-0 -z-10 h-full w-full bg-black bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px]"></div>
            <Sidebar mainTab={mainTab} setMainTab={setMainTab} />
            <div className="flex-1 flex flex-col h-screen">
                <Header userPoints={userPoints} />
                <main className="flex-1 overflow-y-auto p-8">
                    <div className="text-left mb-8">
                        <h2 className="text-4xl font-extrabold text-white tracking-tight title-glow">{t(pageTitleKey, {defaultValue: mainTab})}</h2>
                        <p className="text-md text-gray-400 mt-2">{t(pageSubtitleKey, {defaultValue: ''})}</p>
                    </div>
                    {renderContent()}
                </main>
            </div>
            <style>{`body { background-color: #000; font-family: 'Inter', sans-serif; } .bg-grid-pattern { position: relative; z-index: 1; } .title-glow { text-shadow: 0 0 15px rgba(59, 130, 246, 0.5), 0 0 30px rgba(59, 130, 246, 0.3); }`}</style>
        </div>
    );
}
