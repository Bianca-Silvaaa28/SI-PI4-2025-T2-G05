import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Corrige bug do ícone no React
import iconUrl from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
  iconUrl,
  shadowUrl: iconShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;

export default function Map({ coletas }) {
  const [locations, setLocations] = useState([]);

  // Função para converter endereço → coordenadas (gratuito)
  async function getCoordinates(endereco) {
    try {
      const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        endereco
      )}`;

      const response = await fetch(url);
      const data = await response.json();

      if (data.length === 0) return null;

      return {
        lat: parseFloat(data[0].lat),
        lon: parseFloat(data[0].lon),
      };
    } catch (err) {
      console.error("Erro ao buscar coordenadas:", err);
      return null;
    }
  }

  // Converter todas as coletas
  useEffect(() => {
    async function convertAll() {
      const mapped = [];

      for (let coleta of coletas) {
        const enderecoCompleto = `${coleta.endereco || ""}, ${coleta.cep || ""}`;

        const coords = await getCoordinates(enderecoCompleto);

        if (coords) {
          mapped.push({
            ...coleta,
            lat: coords.lat,
            lon: coords.lon,
          });
        }
      }

      setLocations(mapped);
    }

    if (coletas.length > 0) {
      convertAll();
    }
  }, [coletas]);

  return (
    <div className="mt-6">
      <h2 className="text-2xl font-semibold mb-3">🗺️ Mapa das Coletas</h2>

      <MapContainer
        center={[-23.55, -46.63]} // Centro inicial SP
        zoom={12}
        style={{ width: "100%", height: "400px", borderRadius: "12px" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {locations.map((loc) => (
          <Marker key={loc.id} position={[loc.lat, loc.lon]}>
            <Popup>
              <strong>{loc.nome}</strong> <br />
              📍 {loc.endereco} <br />
              📮 CEP: {loc.cep} <br />
              📅 Data: {loc.data} <br />
              ⏰ Hora: {loc.hora || "Não informada"} <br />
              ♻ Material: {loc.material || "Não informado"}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
