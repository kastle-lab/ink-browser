import React, { useState } from 'react'

import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { Icon } from 'leaflet';

function ChangeCenter(coordinates) {

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
        <Popup>
          <div>
            <h2>Wright State University</h2>
            <p>Main Campus in Dayton, Ohio</p>
          </div>
        </Popup>
      </Marker>
      <ChangeCenter coordinates={coordinates} />
    </MapContainer>
  )
}

export default LeafMap