import { MapContainer, TileLayer } from 'react-leaflet';

function LeafletMap({ setMap }) {
  return (
    <MapContainer center={[45.4, -75.7]} zoom={12} whenCreated={setMap}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
    </MapContainer>
  );
}

export default LeafletMap;
