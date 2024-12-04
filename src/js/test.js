//ts-worksheet

class ElectronicDevice {
  #voltage = 0;
  /**
   * Creates an instance of an electronic device
   *
   * @param {string} serialNumber Represents the devices serial number
   * @param {number} voltage Input Voltage
   */
  constructor(serialNumber, voltage) {
    this.serialNumber = serialNumber;
    this.voltage = voltage;
  }

  get voltageUsa() {
    return this.voltage * ElectronicDevice.US_VOLTAGE;
  }

  get voltageEU() {
    return this.voltage * ElectronicDevice.EU_VOLTAGE;
  }

  // ! TODO WHY IS THIS HAPPENING?
  set voltage(newVolt) {
    if (newVolt <= 0) {
      throw new Error("Voltage cant be negative!");
    } else this.#voltage = newVolt;
  }

  get voltage() {
    return this.#voltage;
  }

  printVolt() {
    console.log(this.voltage);
  }

  static generateUUID() {
    return crypto.randomUUID();
  }

  static DEFAULT_VOLTAGE = 5;
  static PC_VOLTAGE = 12;
  static EU_VOLTAGE = 240;
  static US_VOLTAGE = 110;
}

class Computer extends ElectronicDevice {
  constructor(serialNumber, ramAmount, cpuCores) {
    super(serialNumber, ElectronicDevice.PC_VOLTAGE);
    // for computers only
    this.ramAmount = ramAmount;
    this.cpuCores = cpuCores;
  }

  shutdown() {
    console.log("I am shutting down...:(");
  }

  static generateUUID() {
    return Math.ceil(Math.random() * 1000000000000000000000);
  }
}

const fridge = new ElectronicDevice("ABSJDF8888388", 240);

const macbook = new Computer(Computer.generateUUID(), 16, 18);

console.log(macbook);
