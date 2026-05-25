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

type BarChartProps = {
  data: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor: string;
      borderRadius: number;
      borderSkipped?: boolean;
    }[];
  };
};

export default function BarChart({ data }: BarChartProps) {
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
