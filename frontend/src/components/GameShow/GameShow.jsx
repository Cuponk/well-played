import React from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import defaultImage from "../../assets/images/drawing-large.png";
import { useState, useEffect } from "react";
import jwtFetch from "../../store/jwt";
import "./GameShow.css";
import AddButton from "../../assets/images/add-to-library.svg";
import Wishlist from "../../assets/images/wishlist.svg";
import { useDispatch, useSelector } from 'react-redux';
import { addOwnedGamesItem } from "../../store/ownedGames";
import { addWishlistItem } from "../../store/wishlist";

const GameShow = () => {
    const { id } = useParams();
    const [loaded, setLoaded] = useState(false);
    const [game, setGame] = useState({});
    const [cover, setCover] = useState("");
    const [background, setBackground] = useState("");
    const [screenshots, setScreenshots] = useState([]);
	const dispatch = useDispatch();
	const user = useSelector(state => state.user);
    const parseImages = (url, type) => {
        if (!url) {
          return defaultImage;
        }
        return url.replace("t_thumb", type);
      }

    const parseDate = (date) => {
        let newDate = new Date(date * 1000);
        if (newDate.getFullYear()) {
            return newDate.getFullYear();
        } else {
            return "No Date Found";
        }
    };

	const handleAddToGamesList = e => {
		const gameData = {
			gameId: game?.id,
			name: game?.name,
			coverUrl: game?.cover.url,
			releaseYear: parseDate(game?.first_release_date)
		}
		dispatch(addOwnedGamesItem(user.id, gameData));
	}

	const handleAddtoWishlist = e => {
		const gameData = {
			gameId: game?.id,
			name: game?.name,
			coverUrl: game?.cover.url,
			releaseYear: parseDate(game?.first_release_date)
		}
		dispatch(addWishlistItem(user.id, gameData));
	}


    useEffect(() => {
        jwtFetch(`/api/igdb/${id}`)
            .then((res) => res.json())
            .then((data) => {
                // console.log(data[0]);
                setGame(data[0]);
                setCover(parseImages(data[0].cover?.url, "t_cover_big"));
                if (data[0].screenshots) {
                    setBackground(
                            parseImages(data[0].screenshots[0].url, "t_1080p") 
                    );
                    setScreenshots(
                    data[0].screenshots
                        .slice(1)
                        .map((screenshot) =>
                            parseImages(screenshot.url, "t_screenshot_big")
                        )
                    );
                    setLoaded(true);
                } else {
                    setBackground(defaultImage);
                    setScreenshots([]);
                    setLoaded(true);
                };
        });
    }, [id]);

    return (
        loaded && (
            <>
                <div className="top-half">
                    <img src={background} className="hero-image" />
                    <div className="game-header">
                        <img src={cover} className="game-cover" />
                        <div className="game-info">
                            <h1 className="game-title">{game.name}</h1>
                            <p className="game-dev-release">
                                {game.involved_companies ? game.involved_companies[0].company.name : ""}
                                &nbsp;|&nbsp;
                                {parseDate(game.first_release_date)}
                            </p>
                            <p className="game-description">{game.summary}</p>
                            <div className="buttons">
                                <img src={AddButton} alt="" className="owned-game-button" onClick={handleAddToGamesList}/>

                                <img src={Wishlist} alt="" className="wishlist-button" onClick={handleAddtoWishlist}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bottom-half"></div>
            </>
        )
    );
};

export default GameShow;
