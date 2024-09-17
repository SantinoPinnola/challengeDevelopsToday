import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const PopulationChart = ({ populationData }) => {
  const formattedData = populationData.populationCounts.map((entry) => ({
    year: entry.year,
    population: entry.value,
  }));

  return (
    <LineChart width={500} height={300} data={formattedData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="year" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="population" stroke="#8884d8" />
    </LineChart>
  );
};

export default PopulationChart;
