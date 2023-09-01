import "./GameIndexItem.css";
import defaultImage from "../../assets/images/drawing.jpg";

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

  return (
    <button onClick={handleRedirect} className="game-item">
      <img src={parseImages(game.cover?.url, 't_cover_small')} className="index-cover" />
      <p>{game.name}</p>
      <p>{game.involved_companies ? game.involved_companies[0].company.name : ''}</p>
      <p>{game.genres ? game.genres[0].name : ''}</p>
      <p>{parseDate(game.first_release_date)}</p>
    </button>
  )
}

export default GameIndexItem;
