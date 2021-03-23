import React, {useState, useEffect, useContext, useRef, render, useCallback} from "react";
import { useHttp } from "../hooks/http.hook";
import {AuthContext} from '../context/AuthContext'
import {CoordinatesList} from "../components/CoordinatesList"
import {Loader} from "../components/Loader"
import '../styles/Map.css'

export const AnalysisPage = () => {
  const auth = useContext(AuthContext)
  const {request, loading} = useHttp()
  const {token} = useContext(AuthContext)
  const [coordinates, setCoordinates] = useState([])
  const fetchCoordinates = useCallback ( async () => {
    try{
      const fetched = await request ('api/latlng/getLatLng', 'GET', null, {
        Authorization: `Bearer ${token}`
      })
      setCoordinates(fetched)
      console.log(fetched)
    }
    catch(e){
      
    }
  }, [token, request])

  useEffect(()=> {
    fetchCoordinates()
  }, [fetchCoordinates])


  if (loading) {
    return <Loader/>
  }
  return (
   <>
    {!loading && <CoordinatesList coordinates={coordinates}/>}
   </>
  );
};
