import React, { useState } from 'react'

import { MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import { Icon } from 'leaflet';

function LeafMap() {

  const [message, setActiveMessage] = useState(null);

  const position = [39.781710, -84.063274]

  return (
    <MapContainer center={position} zoom={16}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
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