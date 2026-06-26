require('dotenv').config();
const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, '/public')));

app.get('/api/weather', async (req, res) => {
    const city = req.query.city;
    const apiKey = process.env.OPENWEATHER_API_KEY;

    console.log("Chave carregada pelo Node:", apiKey);

    if (!city) {
        return res.status(400).json({ error: 'Cidade é obrigatória' });
    }

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric&lang=pt_br`;

    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            console.error(`OpenWeather respondeu com status: ${response.status}`);
            return res.status(response.status).json({ error: 'Erro ao buscar clima' });
        }

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error("Erro interno no Node:", error);
        res.status(500).json({ error: 'Erro interno no servidor' });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});