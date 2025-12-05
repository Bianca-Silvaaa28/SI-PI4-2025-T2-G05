// src/main/java/com/ecolink/config/FirebaseConfig.java
//autor(a): Bianca
package com.ecolink.config; // define o pacote onde esta classe está localizada

import com.google.auth.oauth2.GoogleCredentials; // importa a classe para lidar com credenciais do google
import com.google.firebase.FirebaseApp; // importa a classe principal para inicializar o firebase
import com.google.firebase.FirebaseOptions; // importa a classe para configurar as opções de inicialização do firebase
import com.google.cloud.firestore.Firestore; // importa a interface principal para interagir com o firestore (banco de dados)
import com.google.firebase.cloud.FirestoreClient; // importa a classe para obter uma instância do firestore
import org.springframework.context.annotation.Bean; // importa a anotação @bean do spring para declarar um bean
import org.springframework.context.annotation.Configuration; // importa a anotação @configuration do spring para declarar uma classe de configuração

import java.io.FileInputStream; // importa a classe para ler dados de um arquivo
import java.io.IOException; // importa a classe para lidar com exceções de i/o (entrada/saída)

@Configuration // anotação que marca esta classe como uma fonte de definição de beans para o spring
public class FirebaseConfig { // declara a classe de configuração do firebase

    @Bean // anotação que indica que o valor de retorno deste método deve ser registrado como um bean no spring
    public Firestore firestore() throws IOException { // método que configura e retorna uma instância do firestore
        // arquivo json de credenciais !!
        // cria um fluxo de entrada para ler o arquivo json que contém a chave de conta de serviço
        FileInputStream serviceAccount = new FileInputStream("c:\\users\\silva\\onedrive\\área de trabalho\\ecolink\\ecolink-backend\\src\\main\\resources\\ecolink-admin-key.json"); 

        // constrói as opções necessárias para inicializar o firebase
        FirebaseOptions options = FirebaseOptions.builder()
                // define as credenciais usando o arquivo json lido
                .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                // define o id do projeto firebase
                .setProjectId("formulario-dc19e") // seu project id
                .build(); // finaliza a construção das opções

        // verifica se o firebase app ainda não foi inicializado
        if (FirebaseApp.getApps().isEmpty()) {
            // inicializa o firebase app com as opções configuradas
            FirebaseApp.initializeApp(options);
        }
        
        // obtém e retorna a instância do firestore associada ao firebase app inicializado
        return FirestoreClient.getFirestore();
    }
}