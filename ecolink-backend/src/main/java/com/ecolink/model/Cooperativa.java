// src/main/java/com/ecolink/model/Cooperativa.java
//autor(a): Bianca

package com.ecolink.model; // define o pacote onde esta classe de modelo (model/pojo) está localizada

import java.util.List; // importa a interface list para usar uma lista de strings

// esta é uma classe pojo (plain old java object) que representa a estrutura de dados de uma cooperativa
public class Cooperativa {
    private String nome; // campo para armazenar o nome da cooperativa
    private String endereco; // campo para armazenar o endereço
    private double lat; // campo para armazenar a latitude (coordenada geográfica)
    private double lon; // campo para armazenar a longitude (coordenada geográfica)
    private List<String> materiais; // campo para armazenar uma lista dos tipos de materiais que a cooperativa coleta (ex: "plástico", "vidro")
    private String telefone; // campo para armazenar o telefone de contato

    // construtor vazio (necessário para serialização do firestore/jackson)
    // o firestore (e muitas bibliotecas json como jackson) usa este construtor para criar o objeto antes de preencher os campos
    public Cooperativa() {}

    // getters e setters (essenciais para o spring boot e firestore)
    // esses métodos permitem que o firestore e o spring acessem e modifiquem os campos privados da classe

    public String getNome() { return nome; } // método getter para o nome
    public void setNome(String nome) { this.nome = nome; } // método setter para o nome
    
    public String getEndereco() { return endereco; } // método getter para o endereço
    public void setEndereco(String endereco) { this.endereco = endereco; } // método setter para o endereço

    public double getLat() { return lat; } // método getter para a latitude
    public void setLat(double lat) { this.lat = lat; } // método setter para a latitude

    public double getLon() { return lon; } // método getter para a longitude
    public void setLon(double lon) { this.lon = lon; } // método setter para a longitude

    public List<String> getMateriais() { return materiais; } // método getter para a lista de materiais
    public void setMateriais(List<String> materiais) { this.materiais = materiais; } // método setter para a lista de materiais

    public String getTelefone() { return telefone; } // método getter para o telefone
    public void setTelefone(String telefone) { this.telefone = telefone; } // método setter para o telefone
}