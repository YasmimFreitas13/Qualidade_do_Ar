from flask import Flask, request, jsonify, send_from_directory
import requests
import os

app = Flask(__name__, static_folder='static')

API_KEY = "7TtIkTptTfqFGvgl1MfSfw==D48GmxZZKDQvBc4g"

@app.route('/')
def serve_index():
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/static/<path:filename>')
def serve_static(filename):
    return send_from_directory(app.static_folder, filename)

@app.route('/api/qualidade-do-ar')
def get_air_quality():
    cidade = request.args.get('city')

    if not cidade:
        return jsonify({"error": "Parâmetro 'city' é obrigatório."}), 400

    url = f"https://api.api-ninjas.com/v1/airquality?city={cidade}"
    headers = {"X-Api-Key": API_KEY}

    try:
        resposta = requests.get(url, headers=headers)
        resposta.raise_for_status()
        dados = resposta.json()

        if 'overall_aqi' not in dados:
            return jsonify({"error": f"Não foi possível encontrar dados para a cidade '{cidade}'."}), 404

        return jsonify(dados), 200

    except requests.exceptions.RequestException as e:
        print(f"Erro ao chamar a API externa: {e}")
        return jsonify({"error": f"Erro de comunicação com a API externa: {e}"}), 500
    except Exception as e:
        print(f"Ocorreu um erro inesperado no backend: {e}")
        return jsonify({"error": "Ocorreu um erro inesperado no servidor."}), 500

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))  # Importante para o Railway
    app.run(debug=False, host='0.0.0.0', port=port)
