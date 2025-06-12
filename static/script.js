async function consultarAr() {
    const cidadeInput = document.getElementById('cidade');
    const resultadoDiv = document.getElementById('resultado');
    const cidade = cidadeInput.value.trim(); // Remove espaços em branco

    if (cidade === '') {
        resultadoDiv.innerHTML = '<p style="color: #E74C3C;">Por favor, digite o nome da cidade.</p>';
        resultadoDiv.style.display = 'block';
        return;
    }

    resultadoDiv.innerHTML = '<p>Consultando a qualidade do ar para ' + cidade + '...</p>';
    resultadoDiv.style.display = 'block';

    try {
        // --- ESTE É O TRECHO CRÍTICO QUE VOCÊ PRECISA MUDAR ---

        // A URL da sua API no Render será algo como: https://seu-nome-do-app.onrender.com/api/qualidade-do-ar
        // Para deploy local ou para o Render, você pode usar uma URL relativa ou uma URL completa.
        // Vamos usar uma URL relativa para ser mais flexível, assumindo que o front-end
        // e o back-end estão no mesmo domínio (o que acontece no Render).
        const apiUrl = `/api/qualidade-do-ar?city=${encodeURIComponent(cidade)}`; // Usa encodeURIComponent para cidades com espaços/caracteres especiais

        const response = await fetch(apiUrl);
        const data = await response.json(); // Converte a resposta para JSON

        // Verifique se a API retornou um erro
        if (response.status !== 200) {
            resultadoDiv.innerHTML = `<p style="color: #E74C3C;">Erro: ${data.error || 'Não foi possível obter dados para a cidade.'}</p>`;
            resultadoDiv.style.display = 'block';
            return;
        }

        // Se 'overall_aqi' não estiver nos dados (caso a API não encontre a cidade), ou se faltar dados
        if (!data || !data.overall_aqi) {
            resultadoDiv.innerHTML = `<p style="color: #E74C3C;">Não foi possível encontrar dados de qualidade do ar para "${cidade}".</p>`;
            resultadoDiv.style.display = 'block';
            return;
        }

        // Os dados que você vai usar são os 'data' que vêm da sua API real
        // Eles têm uma estrutura diferente do mockData.
        // Você vai precisar adaptar a montagem do HTML para a estrutura da sua API.
        // A API Ninjas retorna: overall_aqi, PM2.5, PM10, CO, SO2, O3, NO2
        // Exemplo de como acessar: data['PM2.5'].concentration

        // Função auxiliar para obter a classe CSS da classificação (baseada nos dados da API Ninjas)
        function getClassificacaoClass(aqi) {
            if (aqi <= 50) return 'otimo';
            if (aqi <= 100) return 'bom';
            if (aqi <= 150) return 'moderado';
            if (aqi <= 200) return 'ruim';
            if (aqi <= 300) return 'muito-ruim';
            return 'pessimo';
        }
        
        // Função para obter o status em português (exemplo, baseada no AQI geral)
        function getStatusTexto(aqi) {
            if (aqi <= 50) return 'Ótimo';
            if (aqi <= 100) return 'Bom';
            if (aqi <= 150) return 'Moderado';
            if (aqi <= 200) return 'Ruim';
            if (aqi <= 300) return 'Muito Ruim';
            return 'Péssimo';
        }


        // Montar o HTML para a div de resultado com os DADOS REAIS DA API
        let htmlContent = `
            <h2>Qualidade do ar em ${cidade.charAt(0).toUpperCase() + cidade.slice(1).toLowerCase()}</h2>
            <p class="indice">Índice Geral (AQI): <span class="${getClassificacaoClass(data.overall_aqi)}">${data.overall_aqi} - ${getStatusTexto(data.overall_aqi)}</span></p>
            <div class="detalhe-poluente-container">
                ${data['PM2.5'] ? `
                <div class="detalhe-poluente">
                    <h3>Partículas finas (PM2.5)</h3>
                    <span class="valor">${data['PM2.5'].concentration.toFixed(2)} ${data['PM2.5'].unit}</span>
                    <span class="classificacao ${getClassificacaoClass(data['PM2.5'].aqi)}">Classificação: ${getStatusTexto(data['PM2.5'].aqi).toUpperCase()}</span>
                </div>` : ''}
                ${data.NO2 ? `
                <div class="detalhe-poluente">
                    <h3>Dióxido de Nitrogênio (NO2)</h3>
                    <span class="valor">${data.NO2.concentration.toFixed(2)} ${data.NO2.unit}</span>
                    <span class="classificacao ${getClassificacaoClass(data.NO2.aqi)}">Classificação: ${getStatusTexto(data.NO2.aqi).toUpperCase()}</span>
                </div>` : ''}
                ${data.O3 ? `
                <div class="detalhe-poluente">
                    <h3>Ozônio (O3)</h3>
                    <span class="valor">${data.O3.concentration.toFixed(2)} ${data.O3.unit}</span>
                    <span class="classificacao ${getClassificacaoClass(data.O3.aqi)}">Classificação: ${getStatusTexto(data.O3.aqi).toUpperCase()}</span>
                </div>` : ''}
                ${data.CO ? `
                <div class="detalhe-poluente">
                    <h3>Monóxido de Carbono (CO)</h3>
                    <span class="valor">${data.CO.concentration.toFixed(2)} ${data.CO.unit}</span>
                    <span class="classificacao ${getClassificacaoClass(data.CO.aqi)}">Classificação: ${getStatusTexto(data.CO.aqi).toUpperCase()}</span>
                </div>` : ''}
                ${data.SO2 ? `
                <div class="detalhe-poluente">
                    <h3>Dióxido de Enxofre (SO2)</h3>
                    <span class="valor">${data.SO2.concentration.toFixed(2)} ${data.SO2.unit}</span>
                    <span class="classificacao ${getClassificacaoClass(data.SO2.aqi)}">Classificação: ${getStatusTexto(data.SO2.aqi).toUpperCase()}</span>
                </div>` : ''}
            </div>
            <p class="explicacao">
                Dados fornecidos pela API Ninjas. Os valores podem variar e representam a qualidade do ar no momento da consulta.
            </p>
        `;
        resultadoDiv.innerHTML = htmlContent;
        resultadoDiv.style.display = 'block';

    } catch (error) {
        console.error('Erro ao consultar a qualidade do ar:', error);
        resultadoDiv.innerHTML = '<p style="color: #E74C3C;">Erro ao consultar a qualidade do ar. Verifique o nome da cidade e tente novamente.</p>';
        resultadoDiv.style.display = 'block';
    }
}