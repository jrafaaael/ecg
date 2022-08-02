import serial

arduino = serial.Serial(port='/dev/ttyACM0', baudrate=9600)


if __name__ == '__main__':
    while True:
        while arduino.in_waiting == 0:
            pass

        line = arduino.readline().strip()

        if line and line.isdigit():
            data = int(line.decode())
            print(data)
