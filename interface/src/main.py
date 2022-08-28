import serial
import matplotlib.pyplot as plt
import config

ecg = []
x_axis = []
x = 0
run = True

arduino = serial.Serial(port='/dev/ttyUSB0', baudrate=115200)


def on_close(_):
    global run
    run = False


fig = plt.figure()
plt.ion()
# fig.canvas.draw()
plt.show(block=False)

fig.canvas.mpl_connect('close_event', on_close)

if __name__ == '__main__':
    while run:
        while arduino.in_waiting == 0:
            continue

        line = arduino.readline().strip()

        if line and line.isdigit():
            data = int(line.decode())
            ecg.append(data)
            x_axis.append(x)
            plt.plot(x_axis, ecg, 'red')
            plt.pause(.000001)
            plt.draw()

            if x > 100:
                ecg = []
                x_axis = []
                plt.clf()
                x = 0

            x = x + 1
