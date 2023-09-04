import { useState } from "react";
import "./GamesIndex.css";
import GameIndexItem from "../GameIndexItem/GameIndexItem";
import jwtFetch from "../../store/jwt";
// import axios from "axios";


function GamesIndex() {
  const [dropdown, setDropdown] = useState(false);
  const [search, setSearch] = useState("");
  const [games, setGames] = useState([]);
  const [page, setPage] = useState(1);
  const [pageButton, setPageButton] = useState(false);
  const [genre, setGenre] = useState("");
  const [year, setYear] = useState("");
  const [wishlist, setWishlist] = useState(false);
  const [library, setLibrary] = useState(false);


  const handleSubmit = (e) => {
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
            <div className="advanced-dropdown">
              <div className="advanced-dropdown-content">
                <label className="genre"> 
                  <select className="genre-select" onChange={(e) => setGenre(e.target.value)}>
                    <option value="">Genre</option>
                    <option value="4">Action</option>
                    <option value="5">Adventure</option>
                    <option value="7">Puzzle</option>
                    <option value="8">Platform</option>
                    <option value="9">Racing</option>
                    <option value="10">Role-playing (RPG)</option>
                    <option value="11">Shooter</option>
                  </select>
                </label>
                <label className="year">
                  <input type="text" className="year-input" placeholder="Year" onChange={(e) => setYear(e.target.value)}/>
                </label>
                <label className="wishlist">
                  <input type="checkbox" className="wishlist-checkbox" onClick={() => setWishlist(!wishlist)}/>
                  <span className="wishlist-span">Wishlist</span>
                </label>
                <label className="library">
                  <input type="checkbox" className="library-checkbox" onClick={() => setLibrary(!library)}/>
                  <span className="library-span">Library</span>
                </label>

              </div>
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
