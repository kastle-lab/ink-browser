import React, { useEffect, useState, useCallback } from 'react'

import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";

const zoom = 18

function MoveMap({ map, coordinates }) {

  useEffect(() => {
    map.setView(coordinates, zoom)
  }, [coordinates])

  return null;

}

function LeafMap({coordinates}) {

  const [map, setMap] = useState(null)

  return (
    <>
      {map ? <MoveMap map={map} coordinates={coordinates} /> : null}
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