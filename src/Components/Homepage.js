import { useState, useEffect, useCallback } from "react";
//import { useLoaderData, json, redirect } from "react-router-dom";
import AqiMeter from "./AqiMeter";
import DataTable from "./DataTable";
import "./DataTable.css";
import { getAveragePerFloor, getAuthToken, checkAuthLoader } from "./utils";
function Homepage() {
  const [sensorData, setSensorData] = useState([]); // Array to store incoming sensor data
  const [isLoading, setIsLoading] = useState();
  const [error, setError] = useState(true);
  //const loaderData = useLoaderData();
  //setSensorData(loaderData);
  // Function to handle HTTPS request to fetch sensors data
  const token = getAuthToken();
  const fetchSensorsDataHandler = useCallback(async () => {
    setError(null);
    //const token = getAuthToken();
    
    try {
      //setIsLoading(true);
      //const response = await fetch("https://localhost:44309/api/Sensors/GetBySpan?sec=5", {
        const response = await fetch("https://aqms.azurewebsites.net/api/Sensors/GetBySpan?sec=5", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const data = await response.json();
      setSensorData(data);
      //console.log(data)
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  // Making HTTPS request after set iterval
  useEffect(() => {
    setInterval(function () {
      fetchSensorsDataHandler();
    }, 6000);
  }, [fetchSensorsDataHandler]);
  var flrWiseAvg = null;
  if (sensorData != null) {
    flrWiseAvg = getAveragePerFloor(sensorData);
    console.log(flrWiseAvg);
  }

  //console.log(SenDat);
  //Get the styling to a different sheet

  return (
    <div className="outer_div">
      <div className="center"> Air Quality Management System </div>
      {sensorData != null && <AqiMeter data1={sensorData} />}
      {isLoading && <p style={{ color: "white" }}>...Loading</p>}
      {Error && <p style={{ color: "white" }}>{error}</p>}
      {!token && <div className="center"> You're not logged in. Log in to see data. </div>}

      {flrWiseAvg != null && <DataTable dt={flrWiseAvg} />}
    </div>
  );
}

export default Homepage;

/*export async function loader() {  
    const token = getAuthToken();
    
      //setIsLoading(true);
      const response = await fetch("https://localhost:44309/api/Sensors", {
        headers: {
          'Authorization' : 'Bearer ' + token
        }
      });
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const data = await response.json();
      return data;
  //const response = await fetch('http://localhost:8080/events');

  /*if (!response.ok) {
    // return { isError: true, message: 'Could not fetch events.' };
    // throw new Response(JSON.stringify({ message: 'Could not fetch events.' }), {
    //   status: 500,
    // });
    throw json(
      { message: 'Could not fetch events.' },
      {
        status: 500,
      }
    );
  } else {
    return response;
  }
}*/
