export const CHART_OPTIONS = {
  animation: false,
  scales: {
    yAxis: {
      max: 650,
      grid: {
        color: "#333",
      },
    },
    xAxis: {
      grid: {
        color: "#333",
      },
    },
  },
  plugins: {
    legend: {
      display: false,
    },
  },
  pointBackgroundColor: "rgba(0,0,0,0)",
  pointBorderColor: "rgba(0,0,0,0)",
};

export const INITIAL_DATA = {
  labels: [0],
  datasets: [
    {
      data: [0],
      borderColor: "rgb(0, 255, 0)",
    },
  ],
};
