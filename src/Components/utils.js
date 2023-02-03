import { redirect } from 'react-router-dom';
export function avg(array) {
  const total = array.reduce((acc, c) => acc + c, 0);
  return total / array.length;
}

// PM2.5 Sub-Index calculation ug / m3
export function get_PM25_subindex(x) {
  if (x <= 30) {
    return (x * 50) / 30;
  } else if (x <= 60) {
    return 50 + ((x - 30) * 50) / 30;
  } else if (x <= 90) {
    return 100 + ((x - 60) * 100) / 30;
  } else if (x <= 120) {
    return 200 + ((x - 90) * 100) / 30;
  } else if (x <= 250) {
    return 300 + ((x - 120) * 100) / 130;
  } else if (x > 250) {
    return 400 + ((x - 250) * 100) / 130;
  } else {
    return 0;
  }
}

// SO2 Sub-Index calculation ug / m3 (micrograms per cubic meter of air)
export function get_SO2_subindex(x) {
  if (x <= 40) {
    return (x * 50) / 40;
  } else if (x <= 80) {
    return 50 + ((x - 40) * 50) / 40;
  } else if (x <= 380) {
    return 100 + ((x - 80) * 100) / 300;
  } else if (x <= 800) {
    return 200 + ((x - 380) * 100) / 420;
  } else if (x <= 1600) {
    return 300 + ((x - 800) * 100) / 800;
  } else if (x > 1600) {
    return 400 + ((x - 1600) * 100) / 800;
  } else {
    return 0;
  }
}

// CO Sub-Index calculation mg / m3 (milligrams per cubic meter of air)
export function get_CO_subindex(x) {
  if (x <= 1) {
    return (x * 50) / 1;
  } else if (x <= 2) {
    return 50 + ((x - 1) * 50) / 1;
  } else if (x <= 10) {
    return 100 + ((x - 2) * 100) / 8;
  } else if (x <= 17) {
    return 200 + ((x - 10) * 100) / 7;
  } else if (x <= 34) {
    return 300 + ((x - 17) * 100) / 17;
  } else if (x > 34) {
    return 400 + ((x - 34) * 100) / 17;
  } else {
    return 0;
  }
}

// O3 Sub-Index calculation ug / m3 (micrograms per cubic meter of air)
export function get_O3_subindex(x) {
  if (x <= 50) {
    return (x * 50) / 50;
  } else if (x <= 100) {
    return 50 + ((x - 50) * 50) / 50;
  } else if (x <= 168) {
    return 100 + ((x - 100) * 100) / 68;
  } else if (x <= 208) {
    return 200 + ((x - 168) * 100) / 40;
  } else if (x <= 748) {
    return 300 + ((x - 208) * 100) / 539;
  } else if (x > 748) {
    return 400 + ((x - 400) * 100) / 539;
  } else {
    return 0;
  }
}

// NOx Sub-Index calculation ppb (parts per billion)
export function get_NOx_subindex(x) {
  if (x <= 40) {
    return (x * 50) / 40;
  } else if (x <= 80) {
    return 50 + ((x - 40) * 50) / 40;
  } else if (x <= 180) {
    return 100 + ((x - 80) * 100) / 100;
  } else if (x <= 280) {
    return 200 + ((x - 180) * 100) / 100;
  } else if (x <= 400) {
    return 300 + ((x - 280) * 100) / 120;
  } else if (x > 400) {
    return 400 + ((x - 400) * 100) / 120;
  } else {
    return 0;
  }
}

// AQI bucketing
export function get_AQI_bucket(x) {
  if (x <= 50) {
    return ["#00cc00","Good"]; //"Good";
  } else if (x <= 100) {
    return ["#80ff80","Satisfactory"]; // "Satisfactory";
  } else if (x <= 200) {
    return ["#ffb84d","Moderate"]; //"Moderate";
  } else if (x <= 300) {
    return ["#e68a00","Poor"]; //"Poor";
  } else if (x <= 400) {
    return ["#d279a6","Very Poor"]; // "Very Poor";
  } else if (x > 400) {
    return ["#862d59","Severe"]; //"Severe";
  } else {
    return NaN;
  }
}


//Average data for a particular floor by taking data of each sensor
export function getAveragePerFloor(temp) {
  let filteredSensors;
  const floorAveragedData = [];
  let mySet = new Set(temp.map((temp) => temp.mpd_Flr));
  const mySetIterator = mySet.values();
  for (const entry of mySetIterator) {
    filteredSensors = temp.filter((sensor) => {
      return sensor.mpd_Flr === entry;
    });
    //console.log(filteredSensors);
    var pm25 = avg(filteredSensors.map((Sensor) => Sensor.pm25)); //change this later
    var co = avg(filteredSensors.map((Sensor) => Sensor.co));
    var o3 = avg(filteredSensors.map((Sensor) => Sensor.o3));
    var so2 = avg(filteredSensors.map((Sensor) => Sensor.so2));
    var no2 = avg(filteredSensors.map((Sensor) => Sensor.no2));
    var dictSensors = {};
    dictSensors.mpd_Flr = entry;
    dictSensors.pm25 = pm25;
    dictSensors.co = co;
    dictSensors.o3 = o3;
    dictSensors.so2 = so2;
    dictSensors.no2 = no2;
    //console.log(filteredSensors);
    floorAveragedData.push(dictSensors);
  }
  return floorAveragedData;
}

export function getTokenDuration() {
  const storedExpirationDate = localStorage.getItem('expiration');
  const expirationDate = new Date(storedExpirationDate);
  const now = new Date();
  const duration = expirationDate.getTime() - now.getTime();
  return duration;
}

export function getAuthToken() {
  const token = localStorage.getItem('token');

  if (!token) {
    return null;
  }

  const tokenDuration = getTokenDuration();

  if (tokenDuration < 0) {
    return 'EXPIRED';
  }

  return token;
}

export function tokenLoader() {
  const token = getAuthToken();
  return token;
}

export function checkAuthLoader() {
  const token = getAuthToken();

  if (!token) {
    alert("you need to login first");
    return redirect('/auth');
  }
  return null;
}