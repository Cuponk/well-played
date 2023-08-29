const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Game = mongoose.model("Game");

router.get("/", async (req, res, next) => {
    try {
        const games = await Game.find()
            // .populate('author', '_id username')
            .sort({ releaseYear: -1 });

        return res.json(games);
    } catch (err) {
        res.json([]);
    }
});


// router.post('/', async(req, res, next) => {

// })

module.exports = router;
