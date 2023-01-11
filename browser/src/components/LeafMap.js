import React, { useState } from 'react'

import { MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import { Icon } from 'leaflet';

function LeafMap({coordinates}) {

  return (
    <MapContainer center={coordinates} zoom={16}>
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
    </MapContainer>
  )
}

export default LeafMap