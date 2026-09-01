"use client"

import React from "react"
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'

// Fix Leaflet's default icon paths when bundlers (like Next.js) change asset locations
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
})

type FieldMapProps = {
  lat?: number
  lng?: number
  zoom?: number
}

// Placeholder interactive map for the SmartFarm card.
// NOTE: The coordinates and content here are generic placeholders — replace with real field data later.
const FieldMap: React.FC<FieldMapProps> = ({ lat = 30.0444, lng = 31.2357, zoom = 13 }) => {
  return (
    <MapContainer
      center={[lat, lng]}
      zoom={zoom}
      scrollWheelZoom={false}
      className="h-full w-full rounded-2xl"
      style={{ height: '100%', borderRadius: '0.75rem' }}
    >
      {/* Clean, minimal CARTO Light tiles to match the site's muted/premium aesthetic */}
      <TileLayer
        attribution='&copy; <a href="https://carto.com/attributions">CARTO</a> &copy; OpenStreetMap'
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
      />

      <Marker position={[lat, lng]}>
        <Popup>Placeholder field location — replace with real coordinates.</Popup>
      </Marker>
    </MapContainer>
  )
}

export default FieldMap
