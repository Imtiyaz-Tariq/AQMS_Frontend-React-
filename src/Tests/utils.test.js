import {
  avg,
  get_PM25_subindex,
  get_SO2_subindex,
  get_CO_subindex,
  get_O3_subindex,
  get_NOx_subindex,
  get_AQI_bucket,
  getAveragePerFloor,
} from "../Components/utils.js";
describe("utility functions", () => {
  test("avg function calculates avg of an array", () => {
    // Arrange
    const testArray = [1, 2, 3, 4, 5];

    //Act
    const avgOfTestArray = avg(testArray);

    //Assert
    expect(avgOfTestArray).toEqual(3);
  });

  test("get_PM25_subindex function calculates sub Index of an array", () => {
    // Arrange
    const testPM25 = 120;

    //Act
    const subIndexPM25 = get_PM25_subindex(testPM25);

    //Assert
    expect(subIndexPM25).toEqual(300);
  });

  test("get_SO2_subindex function calculates sub Index of an array", () => {
    // Arrange
    const testSO2 = 120;

    //Act
    const subIndexSO2 = get_SO2_subindex(testSO2);

    //Assert
    expect(+subIndexSO2.toFixed(2)).toEqual(113.33);
  });

  test("get_CO_subindex function calculates sub Index of an array", () => {
    // Arrange
    const testCO = 120;

    //Act
    const subIndexCO = get_CO_subindex(testCO);

    //Assert
    expect(+subIndexCO.toFixed(2)).toEqual(905.88);
  });

  test("get_O3_subindex function calculates sub Index of an array", () => {
    // Arrange
    const testO3 = 120;

    //Act
    const subIndexO3 = get_O3_subindex(testO3);

    //Assert
    expect(+subIndexO3.toFixed(2)).toEqual(129.41);
  });

  test("get_NOx_subindex function calculates sub Index of an array", () => {
    // Arrange
    const testO3 = 120;

    //Act
    const subIndexNOx = get_NOx_subindex(testO3);

    //Assert
    expect(+subIndexNOx.toFixed(2)).toEqual(140);
  });

  test("get_AQI_bucket function gets the bucket according to Index", () => {
    //Arrange
    const testAQI = ["#e68a00", "Poor"];

    //Act
    const testBucket = get_AQI_bucket(testAQI);

    //Assert
    const actualBucket = ["#e68a00", "Poor"];
    expect(testAQI).toEqual(actualBucket);
  });

  test("getAveragePerFloor gets floorwise average of pollutants", () => {
    //Arrange
    const testData = [
      {id: 1,sensorId: 1,mpd_Flr: 1,streamTime: null,pm25: 43,o3: 23.4,co: 67.4,no2: 23.4,so2: 23.1},
      {id: 1,sensorId: 1,mpd_Flr: 1,streamTime: null,pm25: 34,o3: 22,co: 67.4,no2: 65,so2: 23.1},
      {id: 1,sensorId: 1,mpd_Flr: 2,streamTime: null,pm25: 85,o3: 23.4,co: 67.4,no2: 23.4,so2: 71},
      {id: 1,sensorId: 1,mpd_Flr: 2,streamTime: null,pm25: 84,o3: 68,co: 67.4,no2: 79,so2: 78},
      {id: 1,sensorId: 1,mpd_Flr: 3,streamTime: null,pm25: 86,o3: 23.4,co: 67.4,no2: 23.4,so2: 23.1},
      {id: 1,sensorId: 1,mpd_Flr: 3,streamTime: null,pm25: 35,o3: 69,co: 67.4,no2: 70,so2: 74},
      {id: 1,sensorId: 1,mpd_Flr: 3,streamTime: null,pm25: 75,o3: 23.4,co: 67.4,no2: 66,so2: 23.1}];

    //Act
    const testFloorwiseAvg = getAveragePerFloor(testData);

    //Assert
    const actualFloorwiseAvg = [
      { co: 67.4, mpd_Flr: 1, no2: 44.2, o3: 22.7, pm25: 38.5, so2: 23.1 },
      { co: 67.4, mpd_Flr: 2, no2: 51.2, o3: 45.7, pm25: 84.5, so2: 74.5 },
      {
        co: 67.4,
        mpd_Flr: 3,
        no2: 53.13333333333333,
        o3: 38.6,
        pm25: 65.33333333333333,
        so2: 40.06666666666666,
      },
    ];
    expect(testFloorwiseAvg).toEqual(actualFloorwiseAvg);
  });
});
