import { render, screen } from '@testing-library/react';
import DataTable from '../Components/DataTable';
test('renders correct number of table rows', () => {
    // Arrange
    const testSensorData = [
        { co: 67.4, mpd_Flr: 1, no2: 44.2, o3: 22.7, pm25: 38.5, so2: 23.1 },
        { co: 67.4, mpd_Flr: 2, no2: 51.2, o3: 45.7, pm25: 84.5, so2: 74.5 },
        { co: 67.4, mpd_Flr: 3, no2: 53.13, o3: 38.6, pm25: 65.33, so2: 40.06 },
      ];
      render(<DataTable dt={testSensorData} />);;

    // Act
    // ... nothing

    // Assert
    const helloWorldElement = screen.getAllByTestId('floor-each');
    expect(helloWorldElement).toHaveLength(3);
  });