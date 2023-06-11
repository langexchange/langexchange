import { useEffect, useState } from "react";
import { useGetStaticLearningQuery } from "../../services/tracking/trackingServices";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Sơ đồ thống kê số lượng từng vựng bạn đã học",
    },
  },
  scales: {
    y: {
      ticks: {
        stepSize: 1,
      },
    },
  },
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

const VocabularyStaticChart: React.FC = () => {
  const { data: trackingData, isLoading: isLoadingTracking } =
    useGetStaticLearningQuery();
  const [datasets, setDatasets] = useState<any>([]);

  useEffect(() => {
    console.log(trackingData);
    if (trackingData) {
      let data1: any = [];
      let data2: any = [];
      trackingData.forEach((item) => {
        data1.push({ x: labels[item.month - 1], y: item.totalvocabs });
        data2.push({
          x: labels[item.month - 1],
          y: item.totalvocabs - item.currentvocabs,
        });
      });
      setDatasets([
        {
          label: "Total target vocabularies",
          data: data1,
          borderColor: "rgb(255, 99, 132)",
          backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
        {
          label: "Total learned vocabularies",
          data: data2,
          borderColor: "rgb(53, 162, 235)",
          backgroundColor: "rgba(53, 162, 235, 0.5)",
        },
      ]);
    }
  }, [trackingData, isLoadingTracking]);

  return (
    <Line options={options} data={{ labels, datasets }} className="mb-4" />
  );
};

export default VocabularyStaticChart;
