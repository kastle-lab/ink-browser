import React, { useEffect, useState, useCallback } from 'react'

import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";

const zoom = 8



function MoveMap({ map, coordinates, zoomLevel }) {

  useEffect(() => {
    map.setView(coordinates, zoomLevel)
  }, [coordinates])

  return null;

}

function LeafMap({coordinates, zoomLevel}) {

  console.log(zoomLevel)

  const [map, setMap] = useState(null)

  return (
    <>
      {map ? <MoveMap map={map} coordinates={coordinates} zoomLevel={zoomLevel}/> : null}
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