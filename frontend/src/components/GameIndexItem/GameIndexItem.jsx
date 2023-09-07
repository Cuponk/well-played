import { useState } from "react";
import "./GameIndexItem.css";
import defaultImage from "../../assets/images/drawing.jpg";
import OwnedGamesButton from "../OwnedGamesButton/OwnedGamesButton";
import WishlistButton from "../WishlistButton/WishlistButton";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWishlist } from "../../store/wishlist";
import { fetchOwnedGames } from "../../store/ownedGames";
import LibraryButton from "../../assets/images/add-to-library.svg";
import FilledLibraryButton from "../../assets/images/filled-library.svg";
import wishlistButton from "../../assets/images/wishlist.svg";
import FilledWishlistButton from "../../assets/images/filled-heart.svg";


function GameIndexItem({ game, id, wishlist, ownedGames }) {
  const [ownedIcon, setOwnedIcon] = useState(() => {
    return game?.id.toString() in ownedGames ? FilledLibraryButton : LibraryButton;
  });

  const [wishlistIcon, setWishlistIcon] = useState(() => {
    return game?.id.toString() in wishlist ? FilledWishlistButton : wishlistButton;
  });

  const parseImages = (url, type) => {
    if (!url) {
      return defaultImage;
    }
    return url.replace("t_thumb", type);
  }

  const handleRedirect = (id) => {
    //github copilot told me to do this and it worked
    window.location.href = `/games/${game.id}`;
  }

  const parseDate = (date) => {
    let newDate = new Date(date * 1000);
    if (newDate.getFullYear()) {
      return newDate.getFullYear();
    } else {
      return 'No Date Found'
    }
  }

  const gameData = {
    gameId: game?.id,
    name: game?.name,
    coverUrl: parseImages(game?.cover?.url, "t_1080p"),
    releaseYear: parseDate(game?.first_release_date)
  }

  return (
    <div className="game-item-all">
      <button className="game-item">
        <div className="game-content">
          <img src={parseImages(game.cover?.url, 't_1080p')} className="index-cover" onClick={handleRedirect}/>
          <div className="game-readable">
            <div className="game-details">
              <p>{game.name}</p>
              <p>{game.involved_companies ? game.involved_companies[0].company.name : 'No Company Found'}</p>
              <p>{game.genres ? game.genres[0].name : ''}</p>
              <p>{parseDate(game.first_release_date)}</p>
            </div>
          </div>
            <div className="game-buttons">
              <OwnedGamesButton gameData={gameData} icon={ownedIcon} setIcon={setOwnedIcon}/>
              <WishlistButton gameData={gameData} icon={wishlistIcon} setIcon={setWishlistIcon}/>
            </div>
        </div>
        <div className="game-border"/>
      </button>
    </div>
  )
}

export default GameIndexItem;
