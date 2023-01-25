import React, { useEffect, useState} from 'react'

import { MapContainer, Marker, TileLayer} from "react-leaflet";

// Function to handle changes to the map view location
function MoveMap({ map, coordinates, zoomLevel }) {

  // Updates the view when coordinates change
  useEffect(() => {
    map.setView(coordinates, zoomLevel)
  }, [coordinates, map, zoomLevel])

  return null;

}

function LeafMap({coordinates, zoomLevel}) {

  // Initialize map variable and state
  const [map, setMap] = useState(null)

  return (
    <>
      {/* Component that handles moving the map */}
      {map ? <MoveMap map={map} coordinates={coordinates} zoomLevel={zoomLevel}/> : null}

      {/* Map component itself */}
      <MapContainer center={coordinates} zoom={8} ref={setMap}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={coordinates} />
      </MapContainer>
    </>
  )
}

export default LeafMap