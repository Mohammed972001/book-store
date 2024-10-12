import { useEffect, useState } from "react";
import {
  LuDollarSign,
  LuPackage,
  LuShoppingCart,
  LuUsers,
} from "react-icons/lu";
import axios from "../config/axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import LoadingSpinner from "./LoadingSpinner";

const Analytics = () => {
  const [analyticsData, setAnalyticsData] = useState({
    users: 0,
    products: 0,
    totalSales: 0,
    totalRevenue: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [dailySalesData, setDailySalesData] = useState([]);

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        const response = await axios.get("/analytics");
        setAnalyticsData(response.data.analyticsData);
        setDailySalesData(response.data.dailySalesData);
      } catch (error) {
        console.error("Error fetching analytics data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnalyticsData();
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <AnalyticsCard
          title="Total Users"
          value={analyticsData.users.toLocaleString()}
          icon={LuUsers}
        />
        <AnalyticsCard
          title="Total Books"
          value={analyticsData.authorBooks.toLocaleString()}
          icon={LuPackage}
        />
        <AnalyticsCard
          title="Total Sales"
          value={analyticsData.totalSales.toLocaleString()}
          icon={LuShoppingCart}
        />
        <AnalyticsCard
          title="Total Revenue"
          value={`$${analyticsData.totalRevenue.toLocaleString()}`}
          icon={LuDollarSign}
        />
      </div>
      <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={dailySalesData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" stroke="#fff" />
            <YAxis yAxisId="left" stroke="#fff" />
            <YAxis yAxisId="right" orientation="right" stroke="#fff" />
            <Tooltip />
            <Legend />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="sales"
              stroke="#10B981"
              activeDot={{ r: 8 }}
              name="Sales"
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="revenue"
              stroke="#3B82F6"
              activeDot={{ r: 8 }}
              name="Revenue"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
export default Analytics;

const AnalyticsCard = ({ title, value, icon: Icon }) => (
  <div
    className={`bg-gray-800 rounded-lg p-6 shadow-lg overflow-hidden relative`}
  >
    <div className="flex justify-between items-center">
      <div className="z-10">
        <p className="text-blue-300 text-sm mb-1 font-semibold">{title}</p>
        <h3 className="text-white text-3xl font-bold">{value}</h3>
      </div>
    </div>
    <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-900 opacity-30" />
    <div className="absolute -bottom-4 -right-4 text-blue-800 opacity-50">
      <Icon className="h-32 w-32" />
    </div>
  </div>
);
