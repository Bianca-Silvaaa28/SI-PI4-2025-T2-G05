import { useEffect, useState } from "react";
// 🛑 NOVO: Importe useNavigate do react-router-dom
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet"; 
import { useNavigate } from "react-router-dom"; 
import "leaflet/dist/leaflet.css"; 
import L from "leaflet"; 

// Corrige bug do ícone e define ícone padrão
import iconUrl from "leaflet/dist/images/marker-icon.png"; 
import iconShadow from "leaflet/dist/images/marker-shadow.png"; 

let DefaultIcon = L.icon({
    iconUrl, 
    shadowUrl: iconShadow, 
});
L.Marker.prototype.options.icon = DefaultIcon;


// ** Componente de Geolocalização (Centra o mapa) **
function UserLocation() {
    // ... (lógica useMap e useEffect para geolocalização) ...
    const map = useMap(); 
    
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    const { latitude, longitude } = pos.coords;
                    const userCoords = [latitude, longitude];

                    map.setView(userCoords, 15);
                    L.marker(userCoords, { icon: DefaultIcon })
                        .addTo(map)
                        .bindPopup("Você está aqui")
                        .openPopup();
                },
                () => {
                    alert("Permissão de geolocalização negada ou não disponível. Usando centro padrão.");
                }
            );
        } else {
            console.warn("Geolocalização não é suportada pelo seu navegador.");
        }
    }, [map]); 
    return null;
}


// Define o componente Map - Recebe dados filtrados via props
export default function Map({ coletas }) {
    // 🛑 INICIALIZA O HOOK DE NAVEGAÇÃO
    const navigate = useNavigate();
    
    const [locations, setLocations] = useState([]);
    
    // ATUALIZAÇÃO CRUCIAL: Usa as coordenadas diretamente
    useEffect(() => {
        const validLocations = coletas.filter(loc => loc.lat && loc.lon);
        setLocations(validLocations);
    }, [coletas]); 

    // ********** renderização do componente **********
    return (
        <div className="mt-6"> 
            
            <MapContainer
                center={[-23.55, -46.63]} 
                zoom={12}
                style={{ width: "100%", height: "400px", borderRadius: "12px" }}
            >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                <UserLocation />

                {/* Mapeia e renderiza markers usando as coordenadas já existentes */}
                {locations.map((loc) => ( 
                    <Marker key={loc.id} position={[loc.lat, loc.lon]}>
                        <Popup>
                            <div> {/* Usamos uma div simples para o layout */}
                                <strong>{loc.nome}</strong> <br />
                                📍 {loc.endereco} <br />
                                📮 cep: {loc.cep} <br />
                                📅 data: {loc.data} <br />
                                ⏰ hora: {loc.hora || "não informada"} <br />
                                ♻ material: {loc.material || "não informado"}
                                <br />
                                
                                {/* 🛑 BOTÃO DE AÇÃO: Chama useNavigate e passa os dados da cooperativa */}
                                <button 
                                    onClick={() => navigate("/coleta", { state: { cooperativa: loc } })}
                                    className="w-full py-2 px-4 mt-2 text-white font-semibold rounded-md hover:bg-green-700 transition"
                                    style={{ background: '#26c281', border: 'none' }}
                                >
                                    Agendar Coleta
                                </button>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
}