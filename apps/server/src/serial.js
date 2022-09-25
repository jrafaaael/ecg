import { ReadlineParser, SerialPort } from 'serialport';

const port = new SerialPort({
  path: '/dev/ttyUSB0',
  baudRate: 9600,
});
const parser = new ReadlineParser();

port.pipe(parser);

export default parser;
