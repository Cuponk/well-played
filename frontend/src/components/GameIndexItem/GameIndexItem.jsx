import "./GameIndexItem.css";
import defaultImage from "../../assets/images/drawing.jpg";
import { ReactComponent as LibraryAdd } from "../../assets/images/add-to-library.svg";
import { ReactComponent as Wishlist } from "../../assets/images/wishlist.svg";

function GameIndexItem({ game, id }) {

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

  const handleclick = (e) => {
    e.stopPropagation();
    console.log('clicked');
  }

  return (
    <div className="game-item-all">
      <button onClick={handleRedirect} className="game-item">
        <div className="game-content">
          <img src={parseImages(game.cover?.url, 't_cover_small')} className="index-cover" />
          <div className="game-readable">
            <div className="game-details">
              <p>{game.name}</p>
              <p>{game.involved_companies ? game.involved_companies[0].company.name : 'No Company Found'}</p>
              <p>{game.genres ? game.genres[0].name : ''}</p>
              <p>{parseDate(game.first_release_date)}</p>
            </div>
          </div>
            <div className="game-buttons">
              <LibraryAdd onClick={handleclick} className="game-button" />
              <Wishlist onClick={handleclick} className="game-button" />
            </div>
        </div>
        <div className="game-border"/>
      </button>
    </div>
  )
}

export default GameIndexItem;
