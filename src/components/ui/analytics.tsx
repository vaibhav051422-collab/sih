import React from "react";
import { BarChart, PieChart } from "@mui/x-charts";

// The component now accepts 'issues' as a prop
export default function Analytics({ issues }) {
  
  // If there's no data, show a message
  if (!issues || issues.length === 0) {
    return (
      <div className="bg-gray-950/50 border border-gray-800 p-6 rounded-xl">
        <h3 className="text-lg font-semibold text-white mb-4">
          Analytics
        </h3>
        <p className="text-gray-400">No data available to generate charts.</p>
      </div>
    );
  }

  const totalIssues = issues.length;

  // Process location data from the 'issues' prop
  const locationCounts = issues.reduce((acc, issue) => {
    const location = issue.location || "Unknown";
    acc[location] = (acc[location] || 0) + 1;
    return acc;
  }, {});

  const locationStats = Object.entries(locationCounts).map(([location, count]) => ({
    location,
    count,
    percentage: Math.round((count / totalIssues) * 100),
  }));

  // Process status data from the 'issues' prop
  const statusCounts = issues.reduce((acc, issue) => {
    const status = issue.status || "New";
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {});

  const statusStats = Object.entries(statusCounts).map(([status, count]) => ({
    status,
    count,
    percentage: Math.round((count / totalIssues) * 100),
  }));

  return (
    <div className="space-y-8">
      {/* Location Chart */}
      <div className="bg-gray-950/50 border border-gray-800 p-6 rounded-xl">
        <h3 className="text-lg font-semibold text-white mb-4">Issues by Location</h3>
        <div className="space-y-4">
          <BarChart
            xAxis={[{
              id: "locations",
              data: locationStats.map((s) => s.location),
              scaleType: "band",
            }]}
            series={[{
              data: locationStats.map((s) => s.count),
              color: "#3b82f6",
            }]}
            height={300}
            margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
          />
          <div className="mt-4">
            <h4 className="text-sm font-medium text-gray-300 mb-2">Location Breakdown</h4>
            {locationStats.map((stat, i) => (
              <div key={i} className="flex justify-between items-center text-sm">
                <span className="text-gray-400">{stat.location}</span>
                <div className="flex items-center space-x-2">
                  <span className="text-white">{stat.count}</span>
                  <span className="text-gray-500">({stat.percentage}%)</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Status Chart */}
      <div className="bg-gray-950/50 border border-gray-800 p-6 rounded-xl">
        <h3 className="text-lg font-semibold text-white mb-4">Issues by Status</h3>
        <div className="space-y-4">
          <PieChart
            series={[{
              data: statusStats.map((s, i) => ({
                id: i,
                value: s.count,
                label: s.status,
              })),
            }]}
            height={200}
          />
           <div className="mt-4">
            <h4 className="text-sm font-medium text-gray-300 mb-2">Status Breakdown</h4>
            {statusStats.map((stat, i) => (
              <div key={i} className="flex justify-between items-center text-sm">
                <span className="text-gray-400">{stat.status}</span>
                <div className="flex items-center space-x-2">
                  <span className="text-white">{stat.count}</span>
                  <span className="text-gray-500">({stat.percentage}%)</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}