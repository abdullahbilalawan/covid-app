import React from "react";
import './Map.css'
import {
   MapContainer as MapLeaflet,
   MapContainer,
   TileLayer,
   Marker,
   Popup,
} from "react-leaflet";
import {showDataOnMap} from "./utils";

export default function Map({countries, casesType, center,zoom}) {
   return (
      <div className="map">
         <h1>Map</h1>

         <MapLeaflet center = {center} zoom={zoom}>
            <TileLayer
               attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
               url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {/* loop thorugh and draw circles */}
            {showDataOnMap(countries,casesType)}
            
         </MapLeaflet>
      </div>
   );
}
