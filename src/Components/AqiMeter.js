import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {
  get_PM25_subindex,
  get_SO2_subindex,
  get_CO_subindex,
  get_O3_subindex,
  get_NOx_subindex,
  get_AQI_bucket,
} from "./utils";

function AqiMeter(props) {
  function avg(array) {
    const total = array.reduce((acc, c) => acc + c, 0);
    return total / array.length;
  }

  // Assigning pollutant values
  var pm25 = avg(props.data1.map((Sensor) => Sensor.dst_Prt)); //change this later
  var co = avg(props.data1.map((Sensor) => Sensor.co));
  var o3 = avg(props.data1.map((Sensor) => Sensor.cO2));
  var no2 = avg(props.data1.map((Sensor) => Sensor.nO2));
  var so2 = avg(props.data1.map((Sensor) => Sensor.sO2));

  // Calculating subindex
  var siPm25 = get_PM25_subindex(pm25);
  var siCo = get_CO_subindex(co);
  var siO3 = get_O3_subindex(o3);
  var siNo2 = get_NOx_subindex(no2);
  var siSo2 = get_SO2_subindex(so2);

  // Calculating AQI by taking the max sub index
  var aqi = Math.floor(Math.max(siPm25, siCo, siO3, siNo2, siSo2));
  var color = get_AQI_bucket(aqi);

  return (
    <div style={{height:150,width:150,margin: "auto", marginTop: 5,marginBottom:10,backgroundColor:"black",borderRadius:"10px"}}>
      <CircularProgressbar
        value={aqi}
        maxValue={1000}
        styles={buildStyles({ pathColor: color[0] })}
        text={aqi}
        
      />
      <div style={{color:"white" , marginTop:"15px", textAlign:"center"}}>Air quality : {color[1]}</div>
    </div>
  );
}

export default AqiMeter;
