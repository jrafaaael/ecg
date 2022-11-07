export const CHART_OPTIONS = {
  animation: false,
  scales: {
    yAxis: {
      max: 750,
      min: 0,
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
    tooltip: {
      enabled: false,
    },
  },
  pointBackgroundColor: "rgba(0,0,0,0)",
  pointBorderColor: "rgba(0,0,0,0)",
  maintainAspectRatio: false,
};

export const INITIAL_DATA = {
  labels: [0],
  datasets: [
    {
      data: [300],
      borderColor: "#52E163",
    },
  ],
};
