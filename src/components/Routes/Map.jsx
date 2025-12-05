//autor(a): Beatriz e Bianca

import { useEffect, useState } from "react"; // importa hooks do react (useeffect e usestate)
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"; // importa componentes específicos do react-leaflet
import "leaflet/dist/leaflet.css"; // importa o css básico do leaflet para o estilo do mapa
import L from "leaflet"; // importa a biblioteca leaflet principal

// corrige bug do ícone no react (problema comum ao usar leaflet em ambientes react)
import iconUrl from "leaflet/dist/images/marker-icon.png"; // importa o caminho do ícone padrão
import iconShadow from "leaflet/dist/images/marker-shadow.png"; // importa o caminho da sombra do ícone

// cria um objeto ícone padrão do leaflet usando os caminhos de imagem importados
let DefaultIcon = L.icon({
    iconUrl, // url do ícone
    shadowUrl: iconShadow, // url da sombra
});

// redefine o ícone padrão de todos os markers do leaflet para o ícone customizado
L.Marker.prototype.options.icon = DefaultIcon;

// define o componente map, que recebe 'coletas' como propriedade (props)
export default function Map({ coletas }) {
    // estado para armazenar as coletas que foram geocodificadas (com lat/lon)
    const [locations, setLocations] = useState([]);

    // função para converter endereço em coordenadas geográficas (geocodificação usando nominatim - openstreetmap)
    async function getCoordinates(endereco) {
        try {
            // url da api nominatim para geocodificação
            const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeuricomponent(
                endereco // codifica o endereço para ser seguro na url
            )}`;

            const response = await fetch(url); // faz a requisição à api
            const data = await response.json(); // converte a resposta para json

            if (data.length === 0) return null; // se não houver resultados, retorna null

            // retorna um objeto com latitude e longitude (convertidas para float)
            return {
                lat: parseFloat(data[0].lat),
                lon: parseFloat(data[0].lon),
            };
        } catch (err) {
            console.error("erro ao buscar coordenadas:", err); // loga o erro
            return null; // retorna null em caso de falha
        }
    }

    // useeffect para processar todas as coletas e obter as coordenadas
    useEffect(() => {
        // função assíncrona para iterar e converter todos os endereços
        async function convertAll() {
            const mapped = []; // array temporário para armazenar coletas com coordenadas

            // itera sobre cada coleta recebida via props
            for (let coleta of coletas) {
                // monta o endereço completo para melhorar a precisão da geocodificação
                const enderecoCompleto = `${coleta.endereco || ""}, ${coleta.cep || ""}`;

                // chama a função para obter as coordenadas do endereço
                const coords = await getCoordinates(enderecoCompleto);

                // se as coordenadas foram encontradas
                if (coords) {
                    // adiciona a coleta no array 'mapped' junto com as novas coordenadas
                    mapped.push({
                        ...coleta, // copia todos os outros dados da coleta
                        lat: coords.lat,
                        lon: coords.lon,
                    });
                }
            }

            setLocations(mapped); // atualiza o estado com as coletas geocodificadas
        }

        // só executa a conversão se houver coletas recebidas
        if (coletas.length > 0) {
            convertAll();
        }
    }, [coletas]); // dependência: executa sempre que a lista 'coletas' mudar

    // ********** renderização do componente **********
    return (
        <div className="mt-6"> {/* container do mapa */}
            <h2 className="text-2xl font-semibold mb-3">🗺️ mapa das coletas</h2>

            {/* componente principal do mapa */}
            <MapContainer
                center={[-23.55, -46.63]} // ponto central inicial (são paulo)
                zoom={12} // nível de zoom inicial
                style={{ width: "100%", height: "400px", borderRadius: "12px" }} // estilos css do container
            >
                {/* camada de tiles (mapa base) - usando openstreetmap */}
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                {/* mapeia e renderiza um marker para cada localização geocodificada */}
                {locations.map((loc) => (
                    <Marker key={loc.id} position={[loc.lat, loc.lon]}> {/* marker na latitude e longitude encontradas */}
                        <Popup> {/* popup que aparece ao clicar no marker */}
                            <strong>{loc.nome}</strong> <br />
                            📍 {loc.endereco} <br />
                            📮 cep: {loc.cep} <br />
                            📅 data: {loc.data} <br />
                            ⏰ hora: {loc.hora || "não informada"} <br />
                            ♻ material: {loc.material || "não informado"}
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
}
