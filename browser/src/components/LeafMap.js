import React, { useEffect, useState} from 'react'

import { MapContainer, Marker, TileLayer} from "react-leaflet";

function MoveMap({ map, coordinates, zoomLevel }) {

  useEffect(() => {
    map.setView(coordinates, zoomLevel)
  }, [coordinates, map, zoomLevel])

  return null;

}

function LeafMap({coordinates, zoomLevel}) {

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