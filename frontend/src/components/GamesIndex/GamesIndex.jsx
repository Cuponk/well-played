import { useEffect, useState } from "react";
import "./GamesIndex.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchGames } from "../../store/games";
import GameIndexItem from "../GameIndexItem/GameIndexItem";
import jwtFetch from "../../store/jwt";


function GamesIndex() {
  const [dropdown, setDropdown] = useState(false);
  const [search, setSearch] = useState("");
  const [games, setGames] = useState([]);
  const [page, setPage] = useState(1);
  const [pageButton, setPageButton] = useState(false);

  const handleSubmit = (e) => {
    //adding the fetch method here for now, will add to redux later
    e.preventDefault();
    jwtFetch(`/api/igdb/search/${search}`)
      .then((res) => res.json())
      .then((fin) => {
        setGames(fin);
      })
    setPageButton(true);
  }

  const handleDrop = (e) => {
    e.preventDefault();
    setDropdown(!dropdown);
    console.log("clicked");
  }

  //igdb has offset option for pagination :D
  const handlePaginate = (e) => {
    e.preventDefault();
    setPage(page + 1);
    jwtFetch(`/api/igdb/search/${search}/${page}`)
      .then((res) => res.json())
      .then((fin) => {
        setGames([...games, ...fin]);
      })
  }

  return (
    <>
      <div className="games-index-container">
        <form className="search-form" onSubmit={handleSubmit}>
              <h2>Search for a game</h2>
              <div className="search-form-top">
                <button onClick={handleSubmit} className="submit-button"><i className="fa-solid fa-search"/></button>
                <input
                  className="search-input"
                  type="text"
                  placeholder="Search for a game"
                  onChange={(e) => setSearch(e.target.value)}
                  value={search}
                />
                <span className="checkbox">
                  <input type="checkbox" className="actual-checkbox" id="dropdown-checkbox" onClick={handleDrop}/>
                  <label htmlFor="dropdown-checkbox">
                  <i className={`fa-solid fa-caret-left ${dropdown ? "rotate" : ""}`}/>
                  </label>
                </span>
              </div>
          { dropdown && (
            <div className="dropdown">
              not yet
            </div>)}
        </form>
        <ul className="games-index">
            {games.map((game) => 
              <>
            
                <GameIndexItem game={game} key={game.id}/>
                
              </>
            )}
        </ul>
        <button onClick={handlePaginate} className={"load-more " + (pageButton ? "" : "hidden")}>Load More Results</button>
      </div>
    </>
  )
}

export default GamesIndex;
