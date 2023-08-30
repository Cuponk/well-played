const express = require("express");
const router = express.Router();
const axios = require("axios");
const { body } = require("express-validator");

router.get("/", async (req, res) => {
    try {
        const response = await axios("https://api.igdb.com/v4/games", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Client-ID": process.env.CLIENT_ID,
                Authorization: `Bearer ${process.env.AUTH_TOKEN}`,
            },
            data: 'limit 20;'
        });
        return res.json(response.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            return res
                .status(error.response.status)
                .json({ error: "Failed to fetch data" });
        } else {
            return res.status(500).json({ error: "Internal Server Error" });
        }
    }
});

router.get("/:id", async (req, res) => {
    try {
        const response = await axios("https://api.igdb.com/v4/games", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Client-ID": process.env.CLIENT_ID,
                Authorization: `Bearer ${process.env.AUTH_TOKEN}`,
            },
            data: `fields name,summary,genres,first_release_date,involved_companies,cover.url,screenshots.url,videos; where id = ${req.params.id};`,
        });
        // debugger

        return res.json(response.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            return res
                .status(error.response.status)
                .json({ error: "Failed to fetch data" });
        } else {
            return res.status(500).json({ error: "Internal Server Error" });
        }
    }
});

module.exports = router;