//autor(a): Bianca
// src/main/java/com/ecolink/config/FirebaseConfig.java
package com.ecolink.config; 

import com.google.auth.oauth2.GoogleCredentials; 
import com.google.firebase.FirebaseApp; 
import com.google.firebase.FirebaseOptions; 
import com.google.cloud.firestore.Firestore; 
import com.google.firebase.cloud.FirestoreClient; 
import org.springframework.context.annotation.Bean; 
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource; 

import java.io.InputStream;
import java.io.IOException; 

@Configuration 
public class FirebaseConfig { 

    @Bean 
    public Firestore firestore() throws IOException { 
        
        // Usa ClassPathResource para ler o recurso dentro do JAR
        // Ele busca 'ecolink-admin-key.json' no classpath (src/main/resources)
        InputStream serviceAccount = new ClassPathResource("ecolink-admin-key.json").getInputStream();

        if (serviceAccount == null) {
            throw new IOException("O arquivo ecolink-admin-key.json não foi encontrado no classpath.");
        }

        // Constrói as opções de inicialização
        FirebaseOptions options = FirebaseOptions.builder()
                .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                .setProjectId("formulario-dc19e")
                .build();

        if (FirebaseApp.getApps().isEmpty()) {
            FirebaseApp.initializeApp(options);
        }
        
        return FirestoreClient.getFirestore();
    }
}