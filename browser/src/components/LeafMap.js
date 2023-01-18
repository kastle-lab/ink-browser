import React, { useEffect, useState } from 'react'

import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";

function ChangeCenter(coordinates) {

  console.log(coordinates.coordinates)

  const map = useMap()
  map.setView(coordinates.coordinates)
  map.setZoom(8)
  
  return null;

}

function LeafMap({coordinates}) {

  return (
    <MapContainer center={coordinates} zoom={8}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={coordinates}>
      </Marker>
      <ChangeCenter coordinates={coordinates} />
    </MapContainer>
  )
}

export default LeafMap