import React, {useState, useEffect, useContext, useCallback} from "react";
import { useHttp } from "../hooks/http.hook";
import {AuthContext} from '../context/AuthContext'
import { useParams } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents} from 'react-leaflet'
import '../styles/Map.css'
import {Loader} from '../components/Loader'


export const CoordinatesDetailPage = () => {
  const {token} = useContext(AuthContext)
  const {request, loading} = useHttp()
  const [coordinates, setCoordinates] = useState([])
  const coordinateId = useParams().id

  const getCoordinates = useCallback(async () => {
    try {
      const fetched = await request(`/api/latlng/${coordinateId}`, 'GET', null, {
        Authorization: `Bearer ${token}`
      })
      setCoordinates(fetched)
    } catch (e) {}
  }, [token, coordinateId, request])

  useEffect(() => {
    getCoordinates()
  }, [getCoordinates])

  function LocationMarker() {
  
    const latlng = [coordinates.lat, coordinates.lng]
    console.log(latlng)

    const map = useMapEvents({
      click() {
        map.flyTo(latlng, map.getZoom())
      }
    })
  
    return latlng === null ? null : (
      <Marker position={latlng}>
        <Popup>You are here</Popup>
      </Marker>
    )

  }

  if (loading) {
    return <Loader />
  }

  return (
    
    <MapContainer
    center={{ lat: 51.505, lng: -0.09 }}
    zoom={16}
    scrollWheelZoom={false}>
    <TileLayer
      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <LocationMarker />
  </MapContainer>
  )
}