const validIncomingObj = data =>
  Object.entries(data).length !== 0 && data.constructor === Object;

const validateFlower = flower =>
  isNaN(parseInt(flower.package_id)) ? false : validIncomingObj(flower);

const validateSensors = sensors => {
  return sensors.sensorErr || sensors.socketErr ? false : true;
};

let current = {};
const fetchDataFromSensors = (sensors, flower) => {
  if (validateFlower(flower)) {
    if (validateSensors(sensors)) {
      for (let sensor of sensors) {
        if (validIncomingObj(sensor)) {
          if (sensor.pack.package_id === parseInt(flower.package_id)) {
            current = sensor.pack;
          }
        }
      }

      if (validIncomingObj(current)) {
        const { humidity, light, soilMoisture, temperature } = current.sensors;
        return {
          currentFlower: flower,
          sensorHumidity: parseFloat(humidity),
          sensorLight: parseFloat(light),
          sensorSoilmoisture: parseFloat(soilMoisture["Sensor data"]),
          sensorTemperature: parseFloat(temperature),
          connected: true
        };
      }
    }
  }
  return {
    sensorHumidity: 0,
    sensorLight: 0,
    sensorSoilmoisture: 0,
    sensorTemperature: 0,
    currentFlower: flower,
    connected: false
  };
};

export { fetchDataFromSensors, validIncomingObj };
