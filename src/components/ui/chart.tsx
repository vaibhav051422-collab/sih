import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { supabase } from "../../supabase/supabaseClient";
import { useState, useEffect } from "react";

export default function SimpleCharts() {
  const [chartData, setChartData] = useState({
    locations: [],
    counts: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLocationData();
  }, []);

  const fetchLocationData = async () => {
    try {
      setLoading(true);

      // Fetch all issues from Supabase
      const { data: issues, error } = await supabase
        .from("issues")
        .select("location")
        .not("location", "is", null); // Only get issues with location data

      if (error) {
        console.error("Error fetching issues:", error);
        return;
      }

      // Process the data to count issues by location
      const locationCounts = {};

      issues?.forEach((issue) => {
        const location = issue.location || "Unknown";
        locationCounts[location] = (locationCounts[location] || 0) + 1;
      });

      // Convert to arrays for the chart
      const locations = Object.keys(locationCounts);
      const counts = Object.values(locationCounts);

      setChartData({ locations, counts });
    } catch (error) {
      console.error("Error processing data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-48">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
        <span className="ml-2 text-gray-400">Loading chart data...</span>
      </div>
    );
  }

  if (chartData.locations.length === 0) {
    return (
      <div className="flex items-center justify-center h-48 text-gray-400">
        No location data available
      </div>
    );
  }

  return (
    <div className="w-full">
      <h3 className="text-lg font-semibold text-white mb-4">
        Issues by Location
      </h3>
      <BarChart
        xAxis={[
          {
            id: "barCategories",
            data: chartData.locations,
            scaleType: "band",
          },
        ]}
        series={[
          {
            data: chartData.counts,
            color: "#3b82f6", // Blue color to match your theme
          },
        ]}
        height={300}
        width={600}
      />
    </div>
  );
}
