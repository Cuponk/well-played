const express = require("express");
const router = express.Router();
const axios = require('axios');
const { body } = require("express-validator");

router.post("/", async (req, res) => {
    try {
        const response = await axios.post('https://api.igdb.com/v4/games',
            
        {
            headers: {
                // 'Accept': 'application/json',
                'Client-ID': process.env.CLIENT_ID,
                'Authorization': `Bearer ${process.env.AUTH_TOKEN}`
            },
        }
        );
        
        return res.json(response.data);
        
    } catch (error) {
        console.error(error);
        if (error.response) {
    
            return res.status(error.response.status).json({ error: 'Failed to fetch data' });
        } else {
    
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
});

router.post("/:id", async (req, res) => {
    try {
        const response = await axios.post('https://api.igdb.com/v4/games', 
            `fields name description release_date cover.url; where id = ${req.params.id};`,
            {
                headers: {
                    'Accept': 'application/json',
                    'Client-ID': process.env.CLIENT_ID,
                    'Authorization': `Bearer ${process.env.AUTH_TOKEN}`
                },
            }
        );

        return res.json(response.data);

    } catch (error) {
        console.error(error);
        if (error.response) {

            return res.status(error.response.status).json({ error: 'Failed to fetch data' });
        } else {
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
});

module.exports = router;
