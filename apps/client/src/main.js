import { io } from "socket.io-client";
import { Chart, registerables } from "chart.js";

import { CHART_OPTIONS, INITIAL_DATA } from "./utils/chart";
import "./fullscreen";

Chart.register(...registerables);

const ctx = document.getElementById("myChart").getContext("2d");
const pause = document.getElementById("pause");
const slider = document.querySelector("input[type='range']");
const dataQuantity = document.querySelector("output");

const socket = io(`${window.location.hostname}:8080`);
const chart = new Chart(ctx, {
  type: "line",
  data: INITIAL_DATA,
  options: CHART_OPTIONS,
});
let isPaused = false;

slider.addEventListener("input", (e) => {
  const quantity = Number(e.target.value);
  const currentDataQuantity = chart.data.datasets[0].data.length;
  dataQuantity.textContent = quantity;

  chart.data.datasets[0].data.splice(0, currentDataQuantity - quantity);
  chart.data.labels.splice(0, currentDataQuantity - quantity);
  chart.update();
});

pause.addEventListener("click", () => (isPaused = !isPaused));

socket.on("data", (data) => {
  if (isPaused) return;

  const values = data.map(({ value }) => value);
  const dates = data.map(({ date }) => date);

  chart.data.datasets[0].data.push(...values);
  chart.data.labels.push(...dates);

  chart.update();

  if (chart.data.datasets[0].data.length >= Number(dataQuantity.value)) {
    chart.data.datasets[0].data.splice(0, 10);
    chart.data.labels.splice(0, 10);
  }
});
