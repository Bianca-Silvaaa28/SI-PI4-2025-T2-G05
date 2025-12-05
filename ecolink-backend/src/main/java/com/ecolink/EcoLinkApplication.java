//autor(a): Bianca

package com.ecolink; // define o pacote principal da aplicação

import org.springframework.boot.SpringApplication; // importa a classe principal para iniciar uma aplicação spring boot
import org.springframework.boot.autoconfigure.SpringBootApplication; // importa a anotação que marca a classe de configuração principal

/**
 * ponto de entrada da aplicação spring boot.
 * a anotação @springbootapplication combina @configuration, 
 * @enableautoconfiguration e @componentscan.
 */
@SpringBootApplication // anotação que marca esta classe como a classe de inicialização da aplicação spring boot
public class EcoLinkApplication { // declara a classe principal da aplicação

    public static void main(String[] args) { // método principal (ponto de partida da jvm)
        // método principal que executa a aplicação spring boot
        // executa a aplicação chamando o método run() estático da classe springapplication
        SpringApplication.run(EcoLinkApplication.class, args);
        // ele inicializa o contexto do spring, configura o servidor web e inicia a aplicação
    }

}