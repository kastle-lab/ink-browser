import React from 'react'

import { MapContainer, Marker, Popop, TileLayer} from "react-leaflet";
import { Icon } from 'leaflet';

function LeafMap() {
  return (
    <MapContainer center={[39.784098, -84.056762]} zoom={15}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
    </MapContainer>
  )
}

export default LeafMap