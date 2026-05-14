import { weeklyLabels } from "@/data/labels.data";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const data = {
  labels: weeklyLabels,
  datasets: [
    {
      label: "Income",
      data: [10, 20, 30, 40, 50, 60, 70].reverse(),
      backgroundColor: "#baf49d",
      borderRadius: 8, // rounded bars
      borderSkipped: false,
    },
    {
      label: "Expenses",
      data: [60, 70, 10, 15, 100, 12, 50],
      backgroundColor: "#1e483f",
      borderRadius: 8,
      // borderSkipped: false,
    },
  ],
};

export default function BarChart() {
  return (
    <div className="w-full h-full aspect-[2/1] grid grid-cols-1 overflow-hidden">
      <Bar
        data={data}
        options={{
          responsive: true,
          maintainAspectRatio: false,

          plugins: {
            legend: {
              display: false,
            },
          },
          scales: {
            y: {
              ticks: {
                maxTicksLimit: 5, // only ~5 points on Y axis
              },
              grid: {
                // drawBorder: false,
              },
            },

            x: {
              grid: {
                display: false,
                // drawBorder: false,
              },
            },
          },
        }}
      />
    </div>
  );
}
