import { io } from 'socket.io-client';

const socket = io(`${window.location.hostname}:8080`);

socket.on('data', (data) => {
  console.log(data);
});
