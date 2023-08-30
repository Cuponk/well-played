const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const CustomGame = mongoose.model("CustomGame");

router.get("/", async (req, res, next) => {
    try {
        const customGames = await CustomGame.find()
            // .populate('author', '_id username')
            .sort({ releaseYear: -1 });

        return res.json(customGames);
    } catch (err) {
        res.json([]);
    }
});


// router.post('/', async(req, res, next) => {

// })

module.exports = router;
