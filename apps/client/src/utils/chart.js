export const CHART_OPTIONS = {
  animation: false,
  // scales: {
  //   yAxis: {
  //     max: 50,
  //   }
  // },
  plugins: {
    legend: {
      display: false,
    },
  },
  pointBackgroundColor: 'rgba(0,0,0,0)',
  pointBorderColor: 'rgba(0,0,0,0)',
};

export const INITIAL_DATA = {
  labels: [0],
  datasets: [
    {
      data: [0],
      borderColor: 'rgb(75, 192, 192)',
    },
  ],
};
