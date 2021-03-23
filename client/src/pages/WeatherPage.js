import React, { useState, useEffect, useContext, useCallback } from "react";
import { useHttp } from "../hooks/http.hook";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { fetchWeather } from "../components/FetchWeather";
import "../styles/Weather.css";

export const WeatherPage = () => {
  const { token } = useContext(AuthContext);
  const { request, loading } = useHttp();
  const [coordinates, setCoordinates] = useState([]);
  const coordinateId = useParams().id;
  const [weather, setWeather] = useState({});

  const getCoordinates = useCallback(async () => {
    try {
      const fetched = await request(
        `/api/latlng/${coordinateId}`,
        "GET",
        null,
        {
          Authorization: `Bearer ${token}`,
        }
      );
      setCoordinates(fetched);
    } catch (e) {}
  }, [token, coordinateId, request]);

  useEffect(() => {
    getCoordinates();
  }, [getCoordinates]);

  const search = async (e) => {
    {
      const data = await fetchWeather(coordinates.lat, coordinates.lng);

      setWeather(data);
    }
  };

  return (
    <div className="main-container">
      <button onClick={search}>Получить</button>
      {weather.main && (
        <div className="city">
          <h2 className="city-name">
            <span>{weather.name}</span>
            <sup>{weather.sys.country}</sup>
          </h2>
          <div className="city-temp">
            {Math.round(weather.main.temp)}
            <sup>&deg;C</sup>
          </div>
          <div className="info">
            <img
              className="city-icon"
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt={weather.weather[0].description}
            />
            <p>{weather.weather[0].description}</p>
          </div>
        </div>
      )}
    </div>
  );
};
