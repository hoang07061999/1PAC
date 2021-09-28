import React from "react";
import { Bar } from "react-chartjs-2";

const Chart = ({ data }) => (
  <div className="chart">
    {data && (
      <Bar
        data={{
          labels: data.labels,
          datasets: [
            {
              label: "Số ca đã ghi nhận",
              backgroundColor: ["#3e95cd"],
              data: data.confirmed,
            },
            {
              label: "Số ca tử vong",
              backgroundColor: ["#ed0716"],
              data: data.deaths,
            },
            {
              label: "Số ca phục hồi",
              backgroundColor: ["#00cf60"],
              data: data.recovered,
            },
          ],
        }}
        options={{
          barValueSpacing: 20,
          maintainAspectRatio: false,
        }}
      />
    )}
  </div>
);

export default Chart;
