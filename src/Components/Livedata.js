import { useState, useEffect, useCallback } from "react";
//import { useLoaderData, json } from "react-router-dom";
import "./DataTable.css";
import { getAveragePerFloor, getAuthToken } from "./utils";

function Livedata() {
  const [sensorData, setSensorData] = useState([]); // Array to store incoming sensor data
  const [isLoading, setIsLoading] = useState();
  const [error, setError] = useState(true);
  let id = 0;
  const fetchSensorsDataHandler = useCallback(async () => {
    setError(null);
    const token = getAuthToken();
    try {
      setIsLoading(true);
      const response = await fetch(
        //"https://localhost:44309/api/Sensors/GetBySpan?sec=5",
        "https://aqms.azurewebsites.net/api/Sensors/GetBySpan?sec=6",
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const data = await response.json();
      setSensorData(data);
      console.log(data);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);
  useEffect(() => {
    setInterval(function () {
      fetchSensorsDataHandler();
    }, 5000);
  }, [fetchSensorsDataHandler]);
  //sensorData.map((sensor) => );
  let idfilteredSensors;
  let idSet = new Set();
  idfilteredSensors = sensorData.filter((sensor) => {
    if (!idSet.has(sensor.sensorId)) {
      idSet.add(sensor.sensorId);
      return true;
    } else {
      return false;
    }
  });

  let idSetArr = Array.from(idSet);
  console.log(idfilteredSensors);
  console.log(idSetArr);
  return (
    <>
      <div className="outer_div">
        <div className="center">ACTIVE SENSORS</div>
        <div className="grid-container">
          {idSetArr.map((id) => (
            <div key={id} className="grid-item">
              {id}
            </div>
          ))}
        </div>
        <div className="center">LIVE SENSOR DATA</div>
        <table
          style={{
            textAlign: "center",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <tbody>
            <tr>
              <th>ID</th>
              <th>Time</th>
              <th>Floor</th>
              <th>PM2.5</th>
              <th>CO</th>
              <th>O3</th>
              <th>NO2</th>
              <th>SO2</th>
            </tr>
            {idfilteredSensors.map((Sensor) => (
              <tr key={Sensor.sensorId} data-testid="floor-each">
                <td>{Sensor.sensorId}</td>
                <td>{Sensor.streamTime.substr(11,8)}</td>
                <td>{Sensor.mpd_Flr}</td>
                {Sensor.pm25 > 15 ? (
                  <td style={{ backgroundColor: "red" }}>
                    {Sensor.pm25.toFixed(2)}
                  </td>
                ) : (
                  <td>{Sensor.pm25.toFixed(2)}</td>
                )}
                {Sensor.co > 60 ? (
                  <td style={{ backgroundColor: "red" }}>
                    {Sensor.co.toFixed(2)}
                  </td>
                ) : (
                  <td>{Sensor.co.toFixed(2)}</td>
                )}
                {Sensor.o3 > 60 ? (
                  <td style={{ backgroundColor: "red" }}>
                    {Sensor.o3.toFixed(2)}
                  </td>
                ) : (
                  <td>{Sensor.o3.toFixed(2)}</td>
                )}
                {Sensor.no2 > 60 ? (
                  <td style={{ backgroundColor: "red" }}>
                    {Sensor.no2.toFixed(2)}
                  </td>
                ) : (
                  <td>{Sensor.no2.toFixed(2)}</td>
                )}
                {Sensor.so2 > 60 ? (
                  <td style={{ backgroundColor: "red" }}>
                    {Sensor.so2.toFixed(2)}
                  </td>
                ) : (
                  <td>{Sensor.so2.toFixed(2)}</td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Livedata;
