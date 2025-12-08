# Projeto_integrador4
Projeto Integrador do 4º semestre de Sistemas de Informação da PUC Campinas - Sistema com mapa de pontos de coletas próximo a empresas possibilitando agendamento para a retirada dos resíduos com as cooperativas de reciclagem 
=======
# ♻️ EcoLink: Plataforma de Coleta e Reciclagem Inteligente

## Descrição do Projeto

O **EcoLink** é uma plataforma web desenvolvida para otimizar o processo de gestão e agendamento de coleta de resíduos recicláveis. O sistema conecta **empresas geradoras de resíduos** a **cooperativas de reciclagem**, oferecendo um **Mapa Interativo** para localização de pontos de coleta e um **Dashboard** com indicadores.

O projeto adota uma arquitetura de **Três Camadas** (Front-End, Servidor Java e Banco de Dados), onde o Servidor Java atua como *middleware* de segurança, processando a lógica de negócios e o acesso filtrado ao banco de dados.

---

## 🛠️ Stack Tecnológica

| Camada | Tecnologia | Versão | Justificativa de Uso |
| :--- | :--- | :--- | :--- |
| **Front-End** | **React** | v19.2.0 | Criação de interface de usuário baseada em componentes. |
| **Build Tool** | **Vite** | Latest | Ambiente de desenvolvimento rápido. |
| **Estilização** | **Tailwind CSS** | Latest | Framework de CSS para design responsivo. |
| **Mapa** | **Leaflet** | v1.9.4 | Biblioteca eficiente para visualização de mapas interativos. |
| **Back-End** | **Java** | v17+ | Linguagem robusta para lógica de negócios. |
| **Framework BE** | **Spring Boot** | v3.3.1 | Criação rápida e eficiente da API RESTful. |
| **Banco de Dados** | **Firebase Firestore** | NoSQL | Persistência de dados escalável. |

---

## 👥 Equipe de Desenvolvimento

* Beatriz Marinello de Almeida – 24000134
* Bianca Vitória da Silva  – 24788820
* Miquéias Berne da Silva – 24014654
* Nayla izis Mendes Ferreira – 25007828 
* Vitor Hugo Cruz Costa  – 24014950


---

## 📋 Guia de Implantação e Testes (Ambiente Local)

Para implantar o projeto em um ambiente de testes, você deve inicializar e configurar os dois projetos (Back-End e Front-End) separadamente.

### 1. Pré-Requisitos

Certifique-se de ter instalado:
* **Git**
* **Node.js** (v18+) e **npm**
* **Java Development Kit (JDK)** v17 ou superior (configurado com a variável `JAVA_HOME`)
* **Apache Maven** (O projeto está configurado para usar Maven via `pom.xml`).
* **Acesso ao Firebase Console** (Projeto ID: `formulario-dc19e`).

### 2. Configuração de Credenciais (Passo Crítico)

O Servidor Java precisa de uma chave privada do Firebase para autenticar e acessar o Firestore.

1.  **Obtenha a Chave:** No Console do Firebase (Configurações > Contas de Serviço), baixe o arquivo **Chave de Conta de Serviço** (`Service Account Key`) no formato JSON.
2.  **Salve:** Renomeie o arquivo para **`ecolink-admin-key.json`**.
3.  **Posicione:** Coloque este arquivo dentro da pasta de recursos do Back-End:
    ```
    ./ecolink-backend/src/main/resources/
    ```
    ⚠️ **ATENÇÃO:** Este arquivo é privado e está no `.gitignore`.

### 3. Inicialização do Back-End (Servidor Java)

O servidor Java expõe a API REST em `http://localhost:8080`.

1.  **Navegue para o diretório do Back-End:**
    ```bash
    cd ecolink-backend
    ```
2.  **Instale as dependências (Maven):**
    ```bash
    mvn clean install
    ```
3.  **Execute o Servidor:**
    ```bash
    mvn spring-boot:run
    ```
    *Resultado Esperado:* O servidor deve iniciar e exibir a mensagem `Tomcat started on port 8080 (http)`.

### 4. Inicialização do Front-End (React)

O Front-End rodará na porta padrão do Vite (geralmente `5173`).

1.  **Navegue para a pasta raiz do Front-End:**
    ```bash
    cd ..
    # Agora você está na pasta SI-PI4-2025-T2-G05
    ```
2.  **Instale as dependências:**
    ```bash
    npm install
    ```
3.  **Execute a Aplicação:**
    ```bash
    npm run dev
    ```
    *Resultado Esperado:* A aplicação deve abrir no navegador (ex: `http://localhost:5173/`).

### 5. Cenários de Teste e Validação

| Cenário de Teste | Ação | Resultado Esperado |
| :--- | :--- | :--- |
| **API Pública** | Acesse `http://localhost:8080/api/cooperativas` no navegador. | Deve retornar **JSON 200 OK** com os dados das cooperativas. |
| **Interface/Mapa** | Visite a página inicial (`/`). | O **Mapa dos Pontos de Coleta** deve carregar os marcadores, confirmando que o Front-End consome a API Java. |
| **Segurança por Usuário** | 1. Faça login. 2. Visite a Home. | A lista "Coletas Agendadas" deve exibir **APENAS** as coletas registradas com o seu login (filtragem segura feita pelo Servidor Java usando o JWT). |
