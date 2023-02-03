import "./DataTable.css";
function DataTable(props) {
  return (
    <div >
    <table style={{textAlign:"center", margin:"auto", marginTop:"60px"}}>
      <tbody>
        <tr>
          <th>Floor</th>
          <th>PM2.5</th>
          <th>CO</th>
          <th>O3</th>
          <th>NO2</th>
          <th>SO2</th>
        </tr>
        {props.dt.map((Sensor) => (
          <tr key={Sensor.mpd_Flr} data-testid="floor-each">
            <td>{Sensor.mpd_Flr}</td>
            <td>{Sensor.pm25.toFixed(2)}</td>
            <td>{Sensor.co.toFixed(2)}</td>
            <td>{Sensor.o3.toFixed(2)}</td>
            <td>{Sensor.no2.toFixed(2)}</td>
            <td>{Sensor.so2.toFixed(2)}</td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
}

export default DataTable;
