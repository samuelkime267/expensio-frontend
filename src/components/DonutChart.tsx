import { ArcElement, Chart as ChartJS, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

type DonutChartProps = {
  data: {
    labels: string[];
    datasets: {
      data: number[];
      backgroundColor: string[];
      borderWidth?: number;
    }[];
  };
};

export default function DonutChart({ data }: DonutChartProps) {
  return (
    <div className="w-full h-full aspect-square max-w-56 mx-auto overflow-hidden">
      <Doughnut
        data={data}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false,
            },
          },
          cutout: "62%",
        }}
      />
    </div>
  );
}
