import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; // Import Leaflet CSS
import './Weather.css';

const WeatherApp = () => {
    const [weatherData, setWeatherData] = useState(null);

    // Default Location
    const defaultLocation = { lat: 13.7424, lon: 78.6878 };

    // Mock weather data based on the API response provided
    const mockWeatherData = [
        { time: '2025-01-12T00:30:00Z', values: { humidity: 100, precipitationIntensity: 0, temperature: 28, windSpeed: 4.13, lat: 13.7424, lon: 78.6878 }},
        { time: '2025-01-13T00:30:00Z', values: { humidity: 97.77, precipitationIntensity: 1.07, temperature: 26.09, windSpeed: 5.18, lat: 13.7424, lon: 78.6878 }},
        { time: '2025-01-14T00:30:00Z', values: { humidity: 98.67, precipitationIntensity: 0.4, temperature: 27.91, windSpeed: 5.39, lat: 13.7424, lon: 78.6878 }},
        { time: '2025-01-15T00:30:00Z', values: { humidity: 99, precipitationIntensity: 0.04, temperature: 27.49, windSpeed: 5.21, lat: 13.7424, lon: 78.6878 }},
        { time: '2025-01-16T00:30:00Z', values: { humidity: 95.01, precipitationIntensity: 0, temperature: 26.33, windSpeed: 5.52, lat: 13.7424, lon: 78.6878 }},
        { time: '2025-01-17T00:30:00Z', values: { humidity: 92.06, precipitationIntensity: 0, temperature: 26.11, windSpeed: 6.47, lat: 13.7424, lon: 78.6878 }},
    ];

    useEffect(() => {
        // Set weather data
        setWeatherData(mockWeatherData);
    }, []);

    const populateWeatherData = (weatherData) => {
        return weatherData.map((entry) => {
            const time = new Date(entry.time).toLocaleString();
            const values = entry.values;
            return (
                <div key={time} className="weather-entry">
                    <div className="weather-time">{time}</div>
                    <div className="weather-condition">Condition: Unknown</div>
                    <div className="weather-humidity">Humidity: {values.humidity}%</div>
                    <div className="weather-precipitation">Precipitation: {values.precipitationIntensity}mm</div>
                    <div className="weather-wind-speed">Wind Speed: {values.windSpeed} m/s</div>
                </div>
            );
        });
    };

    const showWeatherSummary = (weatherData) => {
        const latestData = weatherData[weatherData.length - 1].values;
        return (
            <div className="weather-summary">
                <h3>Current Weather Summary</h3>
                <div className="summary-temperature">Temperature: {latestData.temperature}°C</div>
                <div className="summary-precipitation">Precipitation: {latestData.precipitationIntensity}mm</div>
                <div className="summary-wind-speed">Wind Speed: {latestData.windSpeed} m/s</div>
                <div className="summary-humidity">Humidity: {latestData.humidity}%</div>
            </div>
        );
    };

    const generateTemperatureChart = () => {
        if (!weatherData || weatherData.length === 0) return {}; // Ensure we have valid weather data
        const labels = weatherData.map((entry) => new Date(entry.time).toLocaleString());
        const temperatureData = weatherData.map((entry) => entry.values.temperature);
        const humidityData = weatherData.map((entry) => entry.values.humidity);

        return {
            options: {
                chart: {
                    id: 'temperature-chart',
                    toolbar: { show: false },
                },
                xaxis: {
                    categories: labels,
                },
                yaxis: {
                    title: {
                        text: 'Values',
                    },
                },
            },
            series: [
                {
                    name: 'Temperature (°C)',
                    data: temperatureData,
                },
                {
                    name: 'Humidity (%)',
                    data: humidityData,
                },
            ],
        };
    };

    const generatePrecipitationChart = () => {
        if (!weatherData || weatherData.length === 0) return {}; // Ensure we have valid weather data
        const labels = weatherData.map((entry) => new Date(entry.time).toLocaleString());
        const precipData = weatherData.map((entry) => entry.values.precipitationIntensity);

        return {
            options: {
                chart: {
                    id: 'precipitation-chart',
                    toolbar: { show: false },
                },
                xaxis: {
                    categories: labels,
                },
                yaxis: {
                    title: {
                        text: 'Precipitation (mm)',
                    },
                },
            },
            series: [
                {
                    name: 'Precipitation (mm)',
                    data: precipData,
                },
            ],
        };
    };

    return (
        <div className="weather-app">
            <h1 className="weather-title">Weather Forecast Application</h1>
            <p className="weather-description">Weather forecast details for the selected location</p>

            <div className="weather-data">
                {weatherData && populateWeatherData(weatherData)}
            </div>

            {/* Weather Summary */}
            <div className="weather-summary-container">
                {weatherData && showWeatherSummary(weatherData)}
            </div>

            {/* Visualization Charts */}
            <div className="weather-visualizations">
                <h3>Weather Visualizations</h3>
                <div className="chart-container">
                    {weatherData && (
                        <Chart
                            options={generateTemperatureChart().options}
                            series={generateTemperatureChart().series}
                            type="line"
                            height={350}
                        />
                    )}
                </div>
                <div className="chart-container">
                    {weatherData && (
                        <Chart
                            options={generatePrecipitationChart().options}
                            series={generatePrecipitationChart().series}
                            type="bar"
                            height={350}
                        />
                    )}
                </div>
            </div>

            {/* Weather Map */}
            <div className="weather-map-container">
                <h3>Weather Map</h3>
                <div>
                    {weatherData && (
                        <MapContainer center={defaultLocation} zoom={10} style={{ height: '400px', width: '100%' }}>
                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            {weatherData.map((entry, index) => (
                                <Marker key={index} position={[entry.values.lat, entry.values.lon]}>
                                    <Popup>
                                        <strong>Temperature:</strong> {entry.values.temperature}°C <br />
                                        <strong>Humidity:</strong> {entry.values.humidity}% <br />
                                        <strong>Wind Speed:</strong> {entry.values.windSpeed} m/s
                                    </Popup>
                                </Marker>
                            ))}
                        </MapContainer>
                    )}
                </div>
            </div>
        </div>
    );
};

export default WeatherApp;
