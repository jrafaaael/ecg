import { io } from "socket.io-client";
import { Chart, registerables } from "chart.js";

import { CHART_OPTIONS, INITIAL_DATA } from "./utils/chart";
import "./fullscreen";

Chart.register(...registerables);

const socket = io(`${window.location.hostname}:8080`);
const ctx = document.getElementById("myChart").getContext("2d");
const pause = document.getElementById("pause");
const chart = new Chart(ctx, {
  type: "line",
  data: INITIAL_DATA,
  options: CHART_OPTIONS,
});
let isPaused = false;

pause.addEventListener("click", () => (isPaused = !isPaused));

socket.on("data", (data) => {
  if (!isPaused) {
    const values = data.map(({ value }) => value);
    const dates = data.map(({ date }) => date);

    chart.data.datasets[0].data.push(...values);
    chart.data.labels.push(...dates);

    chart.update();

    if (chart.data.datasets[0].data.length >= 100) {
      chart.data.datasets[0].data.splice(0, 10);
      chart.data.labels.splice(0, 10);
    }
  }
});
