import React, { useEffect, useState } from "react";
import L from "leaflet";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../Api";
import { useNavigate } from "react-router-dom";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import "leaflet/dist/leaflet.css";

// Corrige ícones do Leaflet
const defaultIcon = L.icon({
  iconUrl,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

export default function MapPage() {
  const navigate = useNavigate();

  const [map, setMap] = useState(null);
  const [markersLayer, setMarkersLayer] = useState(null);

  const [cooperativas, setCooperativas] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("");

  const tiposMateriais = [
    "Recicláveis",
    "Eletronico",
    "Orgânicos",
    "Vidro",
    "Metal",
    "Papel",
    "Plástico",
  ];

  // ------------------------------
  // 1. BUSCAR COOPERATIVAS DO FIREBASE
  // ------------------------------
  useEffect(() => {
    const fetchCooperativas = async () => {
      try {
        const snap = await getDocs(collection(db, "cooperativas"));
        const lista = snap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCooperativas(lista);
      } catch (err) {
        console.error("Erro ao buscar cooperativas:", err);
      }
    };

    fetchCooperativas();
  }, []);

  // ------------------------------
  // 2. CRIAR MAPA E PEGAR LOCALIZAÇÃO DO USUÁRIO
  // ------------------------------
  useEffect(() => {
    const mapInstance = L.map("map", {
      center: [-22.90556, -47.06083], // fallback Campinas
      zoom: 14,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
    }).addTo(mapInstance);

    setMap(mapInstance);

    // Camada de marcadores
    const layer = L.layerGroup().addTo(mapInstance);
    setMarkersLayer(layer);

    // Pega localização real do usuário
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          mapInstance.setView([latitude, longitude], 15);

          L.marker([latitude, longitude], {
            icon: defaultIcon,
          })
            .addTo(mapInstance)
            .bindPopup("Você está aqui");
        },
        () => {
          alert("Permissão negada. Usando centro de Campinas.");
        }
      );
    }

    return () => mapInstance.remove();
  }, []);

  // ------------------------------
  // 3. ATUALIZAR MARCADORES AO MUDAR FILTRO
  // ------------------------------
  useEffect(() => {
    if (!map || !markersLayer) return;

    markersLayer.clearLayers();

    cooperativas
      .filter((coop) =>
        selectedFilter === ""
          ? true
          : coop.materiais?.includes(selectedFilter)
      )
      .forEach((coop) => {
        if (!coop.lat || !coop.lon) return;

        const marker = L.marker([coop.lat, coop.lon], {
          icon: defaultIcon,
        }).addTo(markersLayer);

marker.bindPopup(`
  <div style="
    font-family: Arial;
    width: 260px;
  ">
    <h3 style="margin: 0; font-size: 18px;">${coop.nome}</h3>

    <p style="margin: 6px 0; font-size: 14px;">
      <span style="font-size:16px;">📍</span>
      ${coop.endereco}
    </p>

    <p style="margin: 6px 0; font-size: 14px;">
      <span style="font-size:16px;">📞</span>
      ${coop.telefone ?? "(sem telefone)"}
    </p>

    <p style="margin: 6px 0; font-size: 14px;">
      <span style="font-size:16px;">♻️</span>
      Materiais: ${coop.materiais.join(", ")}
    </p>

    <button id="btn-${coop.id}" style="
      width: 100%;
      padding: 10px;
      background: #26c281;
      color: white;
      border: none;
      border-radius: 8px;
      margin-top: 8px;
      font-size: 15px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
    ">
      ➕ Agendar Coleta
    </button>
  </div>
`);


        // Listener do botão de popup
        marker.on("popupopen", () => {
          document
            .getElementById(`btn-${coop.id}`)
            .addEventListener("click", () => {
              navigate("/coleta", { state: { cooperativa: coop } });
            });
        });
      });
  }, [selectedFilter, cooperativas, map, markersLayer]);

  // ------------------------------
  // 4. COMPONENTE JSX
  // ------------------------------
  return (
    <div style={{ padding: "20px" }}>
      <h2>Mapa de Cooperativas</h2>

      {/* FILTRO */}
      <select
        value={selectedFilter}
        onChange={(e) => setSelectedFilter(e.target.value)}
        style={{
          padding: "8px",
          width: "200px",
          marginBottom: "15px",
        }}
      >
        <option value="">Mostrar todas</option>
        {tiposMateriais.map((tipo, i) => (
          <option key={i} value={tipo}>
            {tipo}
          </option>
        ))}
      </select>

      {/* MAPA */}
      <div
        id="map"
        style={{
          width: "100%",
          height: "500px",
          borderRadius: "10px",
          marginTop: "10px",
        }}
      ></div>
    </div>
  );
}
