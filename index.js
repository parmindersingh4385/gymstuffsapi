// server.js
import express from 'express';
import axios from 'axios';
import cors from 'cors';

const app = express();

app.use(cors());

const PORT = 3001;

app.get('/', function (req, res) {
    res.send({
        message: 'App working fine'
    });
});

app.get('/product/:id', async (req, res) => {
    const productId = req.params.id;

    try {
        const result = await axios.get(
            `https://affiliate-api.flipkart.net/affiliate/1.0/product.json?id=${productId}`,
            {
                headers: {
                    'Fk-Affiliate-Id': 'singh1par',
                    'Fk-Affiliate-Token': 'cae044e39c884134b64c164523a4ad51'
                }
            }
        );
        res.json(result.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () =>
    console.log(`Proxy running on http://localhost:${PORT}`)
);
