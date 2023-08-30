import React from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useState, useEffect } from "react";
import jwtFetch from "../../store/jwt";

const GameShow = () => {
    const { id } = useParams();
    const [loaded, setLoaded] = useState(false);
    const [game, setGame] = useState({});
    const [cover, setCover] = useState('');
    const [background, setBackground] = useState('');
    const [screenshots, setScreenshots] = useState([]);

    const parseImages = (url, type) => {
        return url.replace("t_thumb", type);
    }

    useEffect(() => {
        jwtFetch(`/api/igdb/${id}`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data[0]);
                setGame(data[0]);
                setCover(parseImages(data[0].cover.url, "t_cover_big"));
                setBackground(parseImages(data[0].screenshots[0].url, "t_screenshot_huge"));
                setScreenshots(data[0].screenshots.slice(1).map((screenshot) => parseImages(screenshot.url, "t_screenshot_big")));
                setLoaded(true);
            });
    }, [id]);

    return (
        loaded && (
            <div>
                <h1>Game Show Page</h1>
                {game.name}
                <img src={cover} alt="" />
                {screenshots.map((screenshot) => (
                    <img src={screenshot} alt="" />
                ))}
            </div>
        )
    );
};

export default GameShow;