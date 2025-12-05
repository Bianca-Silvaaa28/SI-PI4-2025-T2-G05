//autor(a): Bianca

package com.ecolink.controller; // define o pacote onde a classe controladora está localizada

import com.ecolink.model.Cooperativa; // importa a classe de modelo (pojo) para 'cooperativa'
import com.google.api.core.ApiFuture; // importa a classe para lidar com operações assíncronas do google cloud
import com.google.cloud.firestore.Firestore; // importa a interface principal para interagir com o firestore
import com.google.cloud.firestore.QueryDocumentSnapshot; // importa a classe que representa um documento retornado de uma consulta
import com.google.cloud.firestore.QuerySnapshot; // importa a classe que representa o resultado de uma consulta
import org.springframework.beans.factory.annotation.Autowired; // importa a anotação @autowired para injeção de dependência
import org.springframework.web.bind.annotation.CrossOrigin; // importa a anotação para configurar o compartilhamento de recursos de origem cruzada (cors)
import org.springframework.web.bind.annotation.GetMapping; // importa a anotação para mapear solicitações http get
import org.springframework.web.bind.annotation.RequestMapping; // importa a anotação para mapear solicitações web
import org.springframework.web.bind.annotation.RestController; // importa a anotação para declarar esta classe como um controlador rest

import java.util.ArrayList; // importa a classe arraylist para criar listas dinâmicas
import java.util.List; // importa a interface list
import java.util.concurrent.ExecutionException; // importa a exceção que pode ocorrer durante a recuperação do resultado de uma tarefa assíncrona

@RestController // anotação que marca esta classe como um controlador rest, combinando @controller e @responsebody
@RequestMapping("/api/cooperativas") // mapeia todas as solicitações web para esta classe para o caminho base "/api/cooperativas"
// permite que o front-end na porta 5173 acesse esta api
@CrossOrigin(origins = "http://localhost:5173") // permite solicitações de origem cruzada (cors) apenas do endereço especificado (front-end local)
public class CooperativaController { // declara a classe controladora para manipular endpoints relacionados a cooperativas

    @Autowired // injeção de dependência: o spring injetará a instância de firestore configurada em firebaseconfig
    private Firestore firestore; // armazena a instância do firestore para interagir com o banco de dados

    @GetMapping // mapeia solicitações http get para o caminho base (/api/cooperativas) para este método
    public List<Cooperativa> getAllCooperativas() throws ExecutionException, InterruptedException { // método para buscar todas as cooperativas
        
        // coleção alvo no firestore
        // inicia uma operação assíncrona para obter todos os documentos da coleção "cooperativas"
        ApiFuture<QuerySnapshot> future = firestore.collection("cooperativas").get();
        // bloqueia a execução até que o resultado da consulta esteja pronto (future.get())
        // e, em seguida, obtém a lista de documentos do resultado (getdocuments())
        List<QueryDocumentSnapshot> documents = future.get().getDocuments();
        
        // cria uma lista vazia para armazenar os objetos cooperativa
        List<Cooperativa> cooperativas = new ArrayList<>();
        
        // itera sobre cada documento retornado do firestore
        for (QueryDocumentSnapshot document : documents) {
            // converte o documento do firestore para o objeto cooperativa
            // o firestore mapeia automaticamente os campos do documento para os atributos da classe cooperativa
            cooperativas.add(document.toObject(Cooperativa.class));
        }
        
        // retorna a lista de objetos cooperativa, que será serializada como json e enviada na resposta http
        return cooperativas;
    }
}