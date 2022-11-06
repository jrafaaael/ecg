import os from 'os'

export function getLocalIP() {
  for (let addresses of Object.values(os.networkInterfaces())) {
    for (let add of addresses) {
      if (add.address.startsWith("192.168.")) {
        return add.address;
      }
    }
  }
}
