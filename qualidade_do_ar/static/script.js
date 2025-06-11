async function consultarAr() {
    const cidadeInput = document.getElementById('cidade');
    const resultadoDiv = document.getElementById('resultado');
    const cidade = cidadeInput.value.trim(); // Remove espaços em branco

    if (cidade === '') {
        resultadoDiv.innerHTML = '<p style="color: #E74C3C;">Por favor, digite o nome da cidade.</p>';
        resultadoDiv.style.display = 'block'; // Mostra a caixa de resultado
        return;
    }

    resultadoDiv.innerHTML = '<p>Consultando a qualidade do ar para ' + cidade + '...</p>';
    resultadoDiv.style.display = 'block'; // Mostra a caixa de resultado

    try {
        // Simulação de chamada de API.
        // Você substituirá isso pela sua lógica real de chamada à API de qualidade do ar.
        // Use uma API como OpenWeatherMap, AQICN, etc.
        // Exemplo: const response = await fetch(`SUA_API_URL?cidade=${cidade}`);
        // const data = await response.json();

        // Dados de exemplo (substitua pelos dados reais da sua API)
        const mockData = {
            cidade: cidade.charAt(0).toUpperCase() + cidade.slice(1).toLowerCase(), // Capitaliza a primeira letra
            aqi: 28,
            pm25: { valor: 0.82, unidade: 'µg/m³', classificacao: 'ótimo', explicacao: 'Essas partículas finas penetram nos pulmões e podem afetar a saúde respiratória.' },
            no2: { valor: 1.55, unidade: 'µg/m³', classificacao: 'ótimo', explicacao: 'Gás comum em áreas urbanas com tráfego intenso. Pode causar irritações.' },
            o3: { valor: 33.07, unidade: 'µg/m³', classificacao: 'ótimo', explicacao: 'Em excesso, pode causar desconforto respiratório e afetar grupos sensíveis.' }
            // Adicione outros poluentes conforme sua API retornar
        };

        // Função auxiliar para obter a classe CSS da classificação
        function getClassificacaoClass(classificacao) {
            switch (classificacao.toLowerCase()) {
                case 'ótimo': return 'otimo'; // Usando a classe 'otimo' no CSS para cor verde
                case 'bom': return 'bom';
                case 'moderado': return 'moderado';
                case 'ruim': return 'ruim';
                case 'muito ruim': return 'muito-ruim';
                case 'péssimo': return 'pessimo';
                default: return '';
            }
        }

        // Montar o HTML para a div de resultado
        let htmlContent = `
            <h2>Qualidade do ar em ${mockData.cidade}</h2>
            <p class="indice">Índice Geral (AQI): ${mockData.aqi} - Quanto menor, melhor.</p>
            <div class="detalhe-poluente-container">
                <div class="detalhe-poluente">
                    <h3>Partículas finas (PM2.5)</h3>
                    <span class="valor">${mockData.pm25.valor} ${mockData.pm25.unidade}</span>
                    <span class="classificacao ${getClassificacaoClass(mockData.pm25.classificacao)}">Classificação: ${mockData.pm25.classificacao.toUpperCase()}</span>
                </div>
                <div class="detalhe-poluente">
                    <h3>Dióxido de Nitrogênio (NO2)</h3>
                    <span class="valor">${mockData.no2.valor} ${mockData.no2.unidade}</span>
                    <span class="classificacao ${getClassificacaoClass(mockData.no2.classificacao)}">Classificação: ${mockData.no2.classificacao.toUpperCase()}</span>
                </div>
                <div class="detalhe-poluente">
                    <h3>Ozônio ao nível do solo (O3)</h3>
                    <span class="valor">${mockData.o3.valor} ${mockData.o3.unidade}</span>
                    <span class="classificacao ${getClassificacaoClass(mockData.o3.classificacao)}">Classificação: ${mockData.o3.classificacao.toUpperCase()}</span>
                </div>
                </div>
            <p class="explicacao">
                Essas partículas finas penetram nos pulmões e podem afetar a saúde respiratória.
                Gás comum em áreas urbanas com tráfego intenso. Pode causar irritações.
                Em excesso, pode causar desconforto respiratório e afetar grupos sensíveis.
            </p>
        `;
        resultadoDiv.innerHTML = htmlContent;
        resultadoDiv.style.display = 'block'; // Garante que a caixa de resultado esteja visível
    } catch (error) {
        console.error('Erro ao consultar a qualidade do ar:', error);
        resultadoDiv.innerHTML = '<p style="color: #E74C3C;">Erro ao consultar a qualidade do ar. Tente novamente.</p>';
        resultadoDiv.style.display = 'block'; // Mostra a caixa de resultado
    }
}