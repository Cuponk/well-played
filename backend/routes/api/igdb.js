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

router.post("/search/advanced/", async (req, res) => {
    const genre = req.body.genre;
    const year = req.body.year;
    const name = req.body.search ? req.body.search : '';
    let queryString = `fields name,involved_companies.company.name,cover.url,genres.name,first_release_date; where parent_game=null;`;
    
    if (genre) {
        queryString += ` where genres = [${genre}];`
    }
    if (year && Array.isArray(year) && year.length > 0) {
        queryString += ` where first_release_date > ${year[0] / 1000} & first_release_date < ${year[1] / 1000};`
    }
    if (name) {
        queryString += ` search "${name}";`
    }

    queryString += ' limit 20;';
    console.log(queryString);
    try {
        const response = await axios("https://api.igdb.com/v4/games", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Client-ID": process.env.CLIENT_ID,
                Authorization: `Bearer ${process.env.AUTH_TOKEN}`,
            },
            data: queryString,
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

router.post("/search/advanced/page/:page", async (req, res) => {
    const genre = req.body.genre;
    const year = req.body.year;
    const name = req.body.search ? req.body.search : '';
    const page = req.params?.page ? req.params?.page : 21;

    let queryString = 'fields name,involved_companies.company.name,cover.url,genres.name,first_release_date; where parent_game=null;';

    if (genre) {
        queryString += ` where genres = [${genre}];`
    }
    if (!!year && year[0].length > 0) {
        queryString += ` where first_release_date > ${year[0] / 1000} & first_release_date < ${year[1] / 1000};`
    }
    if (name) {
        queryString += ` search "${name}";`
    }

    queryString += ` limit 20;`
    if (req.params?.page) {
        queryString += ` offset ${page * 20 + 1};`;
    }
    try {
        const response = await axios("https://api.igdb.com/v4/games", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Client-ID": process.env.CLIENT_ID,
                Authorization: `Bearer ${process.env.AUTH_TOKEN}`,
            },
            data: queryString,
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
//offset ${req.params.page * 20 + 1};




module.exports = router;
