import React, { useEffect, useState } from 'react';
import { getIssues } from '../../lib/utils';
import type { Issue } from '../../types';
import { ChartContainer } from '@mui/x-charts/ChartContainer';
import { BarPlot } from '@mui/x-charts/BarChart';

interface LocationData {
    location: string;
    count: number;
}

export const AnalyticsPage: React.FC = () => {
    const [locationData, setLocationData] = useState<LocationData[]>([]);

    useEffect(() => {
        const issues = getIssues();
        const locationCounts: Record<string, number> = issues.reduce((acc: Record<string, number>, issue: Issue) => {
            const location = issue.location || 'Unknown';
            acc[location] = (acc[location] || 0) + 1;
            return acc;
        }, {});

        const data: LocationData[] = Object.entries(locationCounts)
            .map(([location, count]): LocationData => ({ location, count }))
            .sort((a, b) => b.count - a.count);

        setLocationData(data);
    }, []);

    // Prepare data for the chart
    const counts = locationData.map(item => item.count);
    const locations = locationData.map(item => item.location);

    return (
        <div className="p-8">
            <h2 className="text-3xl font-bold mb-8 text-white">Issues by Location</h2>
            <div className="bg-black/30 p-6 rounded-lg border border-blue-500/20">
                <ChartContainer
                    width={800}
                    height={400}
                    series={[
                        {
                            data: counts,
                            label: 'Number of Issues',
                            type: 'bar',
                            color: '#3b82f6'
                        }
                    ]}
                    xAxis={[{
                        scaleType: 'band',
                        data: locations,
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
            
            {/* Data Table */}
            <div className="mt-8 bg-black/30 p-6 rounded-lg border border-blue-500/20">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-blue-500/20">
                            <th className="text-left p-2 text-gray-300">Location</th>
                            <th className="text-right p-2 text-gray-300">Number of Issues</th>
                        </tr>
                    </thead>
                    <tbody>
                        {locationData.map((item, index) => (
                            <tr key={index} className="border-b border-blue-500/10">
                                <td className="p-2 text-white">{item.location}</td>
                                <td className="p-2 text-right text-white">{item.count}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AnalyticsPage;