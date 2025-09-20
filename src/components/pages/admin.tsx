import React, { useState, useEffect } from "react";
import { supabase } from "../../supabase/supabaseClient";
import Analytics from "../ui/analytics";
import { AnimatedText } from "../ui/animated-underline-text-one";
import { ChartContainer } from '@mui/x-charts/ChartContainer';
import { BarPlot } from '@mui/x-charts/BarChart';
import { getLocationData, getStatusData, updateIssueStatus, getIssues } from "../../lib/issueHelpers";
import type { Issue } from "../../types";

// Using imported Issue type

interface IconProps extends React.SVGProps<SVGSVGElement> {}
// --- SVG ICONS ---
const LogOutIcon: React.FC<IconProps> = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);

const MapPinIcon: React.FC<IconProps> = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const CalendarIcon: React.FC<IconProps> = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
  </svg>
);

const UpvoteIcon: React.FC<IconProps> = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m18 15-6-6-6 6" />
  </svg>
);

interface LocationData {
    location: string;
    count: number;
}

interface StatusData {
    status: string;
    count: number;
}

// --- MAIN DASHBOARD COMPONENT ---
export default function Dashboard() {
  const [locationData, setLocationData] = useState<LocationData[]>([]);
  const [statusData, setStatusData] = useState<StatusData[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    resolved: 0,
    pending: 0,
    inProgress: 0
  });
  const [issues, setIssues] = useState<Issue[]>([]);

  useEffect(() => {
    fetchIssuesData();
  }, []);

  const fetchIssuesData = () => {
    try {
      setLoading(true);
      const issues = getIssues();
      setIssues(issues);
      setLocationData(getLocationData());
      setStatusData(getStatusData());

      // Calculate stats
      const totalIssues = issues.length;
      const resolvedIssues = issues.filter(i => i.status === 'resolved').length;
      const pendingIssues = issues.filter(i => i.status === 'pending').length;
      const inProgressIssues = issues.filter(i => i.status === 'in_progress').length;

      setStats({
        total: totalIssues,
        resolved: resolvedIssues,
        pending: pendingIssues,
        inProgress: inProgressIssues
      });

    } catch (error) {
      console.error("Error fetching issues data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    fetchIssuesData();
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getStatusColor = (status: Issue['status']) => {
    switch (status) {
      case "resolved":
        return "bg-green-900 text-green-300";
      case "pending":
        return "bg-yellow-900 text-yellow-300";
      case "in_progress":
        return "bg-sky-900 text-sky-300";
      default:
        return "bg-gray-900 text-gray-300";
    }
  };

  const getStatusText = (status: Issue['status']) => {
    switch (status) {
      case "resolved":
        return "Resolved";
      case "pending":
        return "Pending";
      case "in_progress":
        return "In Progress";
      default:
        return "New";
    }
  };

  return (
    <div className="min-h-screen bg-black text-gray-200 font-sans">
      <div className="w-full flex flex-col flex-1">
     
        <header className="sticky top-0 z-10 flex items-center justify-between h-16 px-4 md:px-8 bg-black/80 backdrop-blur-sm border-b border-gray-800">
         
          <AnimatedText
            text="Admin Dashboard"
            textClassName="text-3xl font-bold mb-2"
            underlinePath="M 0,10 Q 75,0 150,10 Q 225,20 300,10"
            underlineHoverPath="M 0,10 Q 75,20 150,10 Q 225,0 300,10"
            underlineDuration={1.5}
          />

          <div className="flex items-center space-x-4">
            <button
              onClick={() => {
                supabase.auth.signOut();
                window.location.href = "/";
              }}
              className="flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-lg bg-gray-800 text-gray-300 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50 transition-colors duration-200 cursor-pointer"
            >
              <LogOutIcon className="w-4 h-4" />
              Logout
            </button>
          </div>
        </header>

    
        <main className="flex-1 p-6 lg:p-8 max-w-7xl mx-auto w-full">
          <h1 className="text-2xl font-bold text-white mb-6">Overview</h1>

        
          {/* <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">

            <div className="bg-black/30 p-6 rounded-xl border border-blue-500/20">
              <h2 className="text-xl font-bold mb-4 text-white">Issues by Location</h2>
              <ChartContainer
                width={600}
                height={400}
                series={[{
                  data: locationData.map(d => d.count),
                  label: 'Number of Issues',
                  type: 'bar',
                  color: '#3b82f6'
                }]}
                xAxis={[{
                  scaleType: 'band',
                  data: locationData.map(d => d.location),
                  tickLabelStyle: {
                    fill: '#fff',
                    fontSize: 12,
                    angle: 45,
                    textAnchor: 'start'
                  }
                }]}
                yAxis={[{
                  tickLabelStyle: {
                    fill: '#fff',
                    fontSize: 12
                  }
                }]}
              >
                <BarPlot />
              </ChartContainer>
            </div>

         
            <div className="bg-black/30 p-6 rounded-xl border border-blue-500/20">
              <h2 className="text-xl font-bold mb-4 text-white">Issues by Status</h2>
              <ChartContainer
                width={600}
                height={400}
                series={[{
                  data: statusData.map(d => d.count),
                  label: 'Number of Issues',
                  type: 'bar',
                  color: '#3b82f6'
                }]}
                xAxis={[{
                  scaleType: 'band',
                  data: statusData.map(d => d.status),
                  tickLabelStyle: {
                    fill: '#fff',
                    fontSize: 12
                  }
                }]}
                yAxis={[{
                  tickLabelStyle: {
                    fill: '#fff',
                    fontSize: 12
                  }
                }]}
              >
                <BarPlot />
              </ChartContainer>
            </div>
          </div>  */}

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="bg-gray-950/50 border border-gray-800 p-6 rounded-xl">
              <h2 className="text-lg font-semibold text-white">
                Total Reports
              </h2>
              <p className="mt-2 text-3xl font-bold text-sky-400">
                {stats.total}
              </p>
              <p className="mt-1 text-sm text-gray-400">All submitted issues</p>
            </div>
            <div className="bg-gray-950/50 border border-gray-800 p-6 rounded-xl">
              <h2 className="text-lg font-semibold text-white">
                Resolved Issues
              </h2>
              <p className="mt-2 text-3xl font-bold text-green-400">
                {stats.resolved}
              </p>
              <p className="mt-1 text-sm text-gray-400">
                {stats.total > 0
                  ? Math.round((stats.resolved / stats.total) * 100)
                  : 0}
                % resolution rate
              </p>
            </div>
            <div className="bg-gray-950/50 border border-gray-800 p-6 rounded-xl">
              <h2 className="text-lg font-semibold text-white">
                Pending Issues
              </h2>
              <p className="mt-2 text-3xl font-bold text-yellow-400">
                {stats.pending}
              </p>
              <p className="mt-1 text-sm text-gray-400">Awaiting review</p>
            </div>
          </div>

          {/* Analytics Section */}
          <div className="mb-8">
            <Analytics issues={issues} />
          </div>

          {/* Issues Table */}
          <div className="bg-gray-950/50 border border-gray-800 p-6 rounded-xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-white">
                Recent Issues (Sorted by Upvotes)
              </h2>
              <button
                onClick={handleRefresh}
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                Refresh
              </button>
            </div>

            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-4"></div>
                <p className="text-gray-400">Loading issues...</p>
              </div>
            ) : issues.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-400">
                  <thead className="text-xs text-gray-300 uppercase bg-gray-900">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        ID
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Title
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Location
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Tags
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Upvotes
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Date
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {issues.map((issue) => (
                      <tr
                        key={issue.id}
                        className="border-b border-gray-800 hover:bg-gray-800/50"
                      >
                        <td className="px-6 py-4 font-medium text-white">
                          #{issue.id}
                        </td>
                        <td className="px-6 py-4">
                          <div
                            className="max-w-xs truncate"
                            title={issue.title}
                          >
                            {issue.title}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <MapPinIcon className="h-4 w-4 mr-2 text-gray-500" />
                            <span
                              className="max-w-xs truncate"
                              title={issue.location}
                            >
                              {issue.location || "Not specified"}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-wrap gap-1">
                            {issue.tags
                              ? issue.tags
                                  .split(",")
                                  .slice(0, 2)
                                  .map((tag, index) => (
                                    <span
                                      key={index}
                                      className="bg-blue-900/50 text-blue-300 text-xs px-2 py-1 rounded"
                                    >
                                      {tag.trim()}
                                    </span>
                                  ))
                              : "-"}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                              issue.status
                            )}`}
                          >
                            {getStatusText(issue.status)}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <UpvoteIcon className="h-4 w-4 mr-2 text-blue-400" />
                            <span className="text-white font-medium">
                              {issue.upvotes || 0}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <CalendarIcon className="h-4 w-4 mr-2 text-gray-500" />
                            {formatDate(issue.created_at)}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex space-x-2">
                            <button className="text-blue-400 hover:text-blue-300 text-xs">
                              View
                            </button>
                            <button className="text-green-400 hover:text-green-300 text-xs">
                              Resolve
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-400">No issues found</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}