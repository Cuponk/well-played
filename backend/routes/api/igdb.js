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
            data: `fields name,summary,genres,first_release_date,involved_companies.company.name,cover.url,screenshots.url,videos; where id = ${req.params.id};`,
        });
        // debugger

        const data = res.json(response.data);
        return data;
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

router.get("/search/:query", async (req, res) => {
    try {
        const response = await axios("https://api.igdb.com/v4/games", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Client-ID": process.env.CLIENT_ID,
                Authorization: `Bearer ${process.env.AUTH_TOKEN}`,
            },
            data: `fields name,involved_companies.company.name,cover.url,genres.name,first_release_date; search "${req.params.query}"; where parent_game=null; limit 20;`,

    });
    return res.json(response.data)
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

router.get("/search/:query/:page", async (req, res) => {
    try {
        const response = await axios("https://api.igdb.com/v4/games", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Client-ID": process.env.CLIENT_ID,
                Authorization: `Bearer ${process.env.AUTH_TOKEN}`,
            },
            data: `fields name,involved_companies.company.name,cover.url,genres.name,first_release_date; search "${req.params.query}"; where parent_game=null; limit 20; offset ${req.params.page * 20 + 1};`,
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



module.exports = router;
