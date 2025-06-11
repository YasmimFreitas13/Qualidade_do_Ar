# Qualidade do Ar 🌬️

Este projeto é uma aplicação web simples que permite consultar a qualidade do ar em diferentes cidades, utilizando dados de poluição atmosférica. É uma ferramenta útil para verificar os níveis de poluentes e entender o impacto na saúde respiratória.

## Visão Geral

A aplicação é construída com Python (Flask) para o backend e HTML, CSS e JavaScript para o frontend, proporcionando uma interface intuitiva para o usuário.

### Funcionalidades:
- **Consulta por Cidade:** Digite o nome de uma cidade e obtenha informações atualizadas sobre a qualidade do ar.
- **Detalhamento de Poluentes:** Visualize os níveis de poluentes específicos como PM2.5, NO2, O3, entre outros.
- **Classificação da Qualidade:** Entenda a classificação da qualidade do ar (Ótimo, Bom, Moderado, Ruim, etc.) para cada poluente e para o índice geral.
- **Design Responsivo:** Interface amigável e adaptável a diferentes tamanhos de tela.

## Tecnologias Utilizadas

- **Backend:**
    - Python (linguagem de programação)
    - Flask (framework web para Python)
- **Frontend:**
    - HTML5 (estrutura da página)
    - CSS3 (estilização e design)
    - JavaScript (interatividade e lógica de consulta)

## Como Rodar o Projeto Localmente

Siga os passos abaixo para configurar e executar a aplicação em sua máquina local.

### Pré-requisitos

Certifique-se de ter instalado:
- [Python 3.x](https://www.python.org/downloads/)
- [pip](https://pip.pypa.io/en/stable/installation/) (gerenciador de pacotes do Python, geralmente vem com o Python)

### Instalação

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/YasmimFreitas13/Qualidade_do_Ar.git](https://github.com/YasmimFreitas13/Qualidade_do_Ar.git)
    ```

2.  **Navegue até o diretório do projeto:**
    ```bash
    cd Qualidade_do_Ar
    ```

3.  **Crie e ative um ambiente virtual (recomendado):**
    ```bash
    python -m venv venv
    # No Windows:
    .\venv\Scripts\activate
    # No macOS/Linux:
    source venv/bin/activate
    ```

4.  **Instale as dependências do backend:**
    Se você tiver um arquivo `requirements.txt` (com `Flask` listado, por exemplo):
    ```bash
    pip install -r requirements.txt
    ```
    Se não tiver, instale o Flask diretamente:
    ```bash
    pip install Flask
    ```

### Execução

1.  **Inicie o servidor Flask:**
    ```bash
    python app.py
    ```
    Você deverá ver uma mensagem no terminal indicando que o servidor está rodando, algo como:
    `* Running on http://127.0.0.1:5000/`

2.  **Acesse a aplicação no navegador:**
    Abra seu navegador e vá para:
    [http://127.0.0.1:5000/](http://127.0.0.1:5000/)

## Estrutura do Projeto